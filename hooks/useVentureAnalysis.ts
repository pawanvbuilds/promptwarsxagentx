"use client";

import { useState, useCallback, useRef } from "react";
import type { FounderInput, SourceCitation, VentureDossier } from "@/lib/types/domain";
import type { AgentRole, VentureSSEEvent } from "@/lib/types/agent-events";

export interface UseVentureAnalysisOptions {
  onDossierComplete?: (dossier: VentureDossier) => void;
}

export interface UseVentureAnalysisReturn {
  activeDossier: VentureDossier | null;
  setActiveDossier: (dossier: VentureDossier | null) => void;
  isLoading: boolean;
  progressPercent: number;
  statusMessage: string;
  activeAgent: AgentRole;
  citations: SourceCitation[];
  errorMessage: string | null;
  setErrorMessage: (msg: string | null) => void;
  startAnalysis: (input: FounderInput) => Promise<void>;
  resetAnalysis: () => void;
  loadDossier: (dossier: VentureDossier) => void;
}

/**
 * Custom React hook managing the multi-agent SSE streaming pipeline,
 * state machine transitions, screen reader announcements, and error recovery.
 *
 * @param options - Optional lifecycle callbacks such as onDossierComplete.
 * @returns State and handlers for controlling the venture validation lifecycle.
 */
export function useVentureAnalysis(
  options: UseVentureAnalysisOptions = {}
): UseVentureAnalysisReturn {
  const [activeDossier, setActiveDossier] = useState<VentureDossier | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [progressPercent, setProgressPercent] = useState(0);
  const [statusMessage, setStatusMessage] = useState("");
  const [activeAgent, setActiveAgent] = useState<AgentRole>("orchestrator");
  const [citations, setCitations] = useState<SourceCitation[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const abortControllerRef = useRef<AbortController | null>(null);

  const announce = (message: string) => {
    if (typeof document === "undefined") return;
    const announcer = document.getElementById("live-announcer");
    if (announcer) {
      announcer.textContent = message;
    }
  };

  const resetAnalysis = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setActiveDossier(null);
    setErrorMessage(null);
    setIsLoading(false);
    setProgressPercent(0);
    setStatusMessage("");
    setActiveAgent("orchestrator");
    setCitations([]);
  }, []);

  const loadDossier = useCallback((dossier: VentureDossier) => {
    setActiveDossier(dossier);
    setErrorMessage(null);
    setIsLoading(false);
    setProgressPercent(100);
    setStatusMessage("Dossier loaded successfully.");
    setActiveAgent("orchestrator");
  }, []);

  const startAnalysis = useCallback(
    async (input: FounderInput) => {
      // Cancel any ongoing analysis
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      const controller = new AbortController();
      abortControllerRef.current = controller;

      setIsLoading(true);
      setErrorMessage(null);
      setProgressPercent(5);
      setStatusMessage("Establishing connection with multi-agent coordinator...");
      setActiveAgent("orchestrator");
      setCitations([]);
      setActiveDossier(null);

      announce("Multi-agent validation pipeline initiated.");

      try {
        const res = await fetch("/api/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(input),
          signal: controller.signal,
        });

        if (!res.ok) {
          const errJson = await res.json().catch(() => ({}));
          throw new Error(errJson.error || errJson.message || `HTTP ${res.status}`);
        }

        if (!res.body) {
          throw new Error("No response stream received from analysis engine.");
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n\n");
          buffer = lines.pop() || "";

          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed.startsWith("data:")) continue;

            try {
              const rawJson = trimmed.slice(5).trim();
              const event = JSON.parse(rawJson) as VentureSSEEvent;

              if (event.type === "stage_transition") {
                setActiveAgent(event.agent);
                setProgressPercent(event.progressPercent);
                setStatusMessage(event.message);
                announce(`${event.agent} stage: ${event.message}`);
              } else if (event.type === "citations_discovered") {
                setCitations(event.citations);
              } else if (event.type === "complete") {
                setActiveDossier(event.dossier);
                setIsLoading(false);
                setProgressPercent(100);
                options.onDossierComplete?.(event.dossier);
                announce(
                  `Validation dossier complete for ${event.dossier.framing.ventureName}. Overall viability score ${event.dossier.validation.overallViabilityScore}.`
                );
              } else if (event.type === "error") {
                setErrorMessage(event.message);
                setIsLoading(false);
              }
            } catch {
              // Gracefully bypass partial SSE framing
            }
          }
        }
      } catch (err) {
        if (controller.signal.aborted) return;
        setErrorMessage(
          err instanceof Error ? err.message : "Pipeline encountered an unexpected error."
        );
        setIsLoading(false);
      } finally {
        if (abortControllerRef.current === controller) {
          abortControllerRef.current = null;
        }
      }
    },
    [options]
  );

  return {
    activeDossier,
    setActiveDossier,
    isLoading,
    progressPercent,
    statusMessage,
    activeAgent,
    citations,
    errorMessage,
    setErrorMessage,
    startAnalysis,
    resetAnalysis,
    loadDossier,
  };
}
