"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { IntakeConsole } from "@/components/IntakeConsole";
import { AgentMissionControl } from "@/components/AgentMissionControl";
import { ReportWorkspace } from "@/components/report/ReportWorkspace";
import { WarRoomDrawer } from "@/components/warroom/WarRoomDrawer";
import { HistoryModal } from "@/components/history/HistoryModal";
import type { FounderInput, SourceCitation, VentureDossier } from "@/lib/types/domain";
import type { AgentRole, VentureSSEEvent } from "@/lib/types/agent-events";
import type { ShowcasePreset } from "@/lib/presets/showcase-ventures";
import { useSavedDossiers } from "@/lib/storage";
import { AlertCircle } from "lucide-react";

export default function HomePage() {
  const [activeDossier, setActiveDossier] = useState<VentureDossier | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [progressPercent, setProgressPercent] = useState(0);
  const [statusMessage, setStatusMessage] = useState("");
  const [activeAgent, setActiveAgent] = useState<AgentRole>("orchestrator");
  const [citations, setCitations] = useState<SourceCitation[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [isWarRoomOpen, setIsWarRoomOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const { savedDossiers, saveDossier, deleteDossier } = useSavedDossiers();

  const handleDeleteDossier = (id: string) => {
    deleteDossier(id);
    if (activeDossier?.id === id) {
      setActiveDossier(null);
    }
  };

  // SSE Pipeline Execution
  const handleStartAnalysis = async (input: FounderInput) => {
    setIsLoading(true);
    setErrorMessage(null);
    setProgressPercent(5);
    setStatusMessage("Establishing connection with multi-agent coordinator...");
    setActiveAgent("orchestrator");
    setCitations([]);
    setActiveDossier(null);

    // Announce to screen reader
    const announcer = document.getElementById("live-announcer");
    if (announcer) {
      announcer.textContent = "Multi-agent validation pipeline initiated.";
    }

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
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

              if (announcer) {
                announcer.textContent = `${event.agent} stage: ${event.message}`;
              }
            } else if (event.type === "citations_discovered") {
              setCitations(event.citations);
            } else if (event.type === "complete") {
              setActiveDossier(event.dossier);
              saveDossier(event.dossier);
              setIsLoading(false);
              setProgressPercent(100);

              if (announcer) {
                announcer.textContent = `Validation dossier complete for ${event.dossier.framing.ventureName}. Overall viability score ${event.dossier.validation.overallViabilityScore}.`;
              }
            } else if (event.type === "error") {
              setErrorMessage(event.message);
              setIsLoading(false);
            }
          } catch {
            // Ignore partial SSE framing
          }
        }
      }
    } catch (err) {
      setErrorMessage(
        err instanceof Error ? err.message : "Pipeline encountered an unexpected error."
      );
      setIsLoading(false);
    }
  };

  const handleSelectPreset = (preset: ShowcasePreset) => {
    setActiveDossier(preset.precompiledDossier);
    saveDossier(preset.precompiledDossier);
    setErrorMessage(null);
    setIsLoading(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNewAnalysis = () => {
    setActiveDossier(null);
    setErrorMessage(null);
    setIsLoading(false);
    setProgressPercent(0);
    setStatusMessage("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Top Navigation */}
      <Navbar
        onSelectPreset={handleSelectPreset}
        onOpenHistory={() => setIsHistoryOpen(true)}
        onNewAnalysis={handleNewAnalysis}
        historyCount={savedDossiers.length}
      />

      {/* Error Alert Banner */}
      {errorMessage && (
        <div className="max-w-4xl mx-auto px-4 mt-4 w-full">
          <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center justify-between gap-3 shadow-lg">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{errorMessage}</span>
            </div>
            <button
              onClick={() => setErrorMessage(null)}
              className="text-slate-400 hover:text-white text-xs underline shrink-0"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Loading / Streaming State */}
        {isLoading && (
          <AgentMissionControl
            progressPercent={progressPercent}
            statusMessage={statusMessage}
            activeAgent={activeAgent}
            citations={citations}
          />
        )}

        {/* Finished Dossier View */}
        {!isLoading && activeDossier && (
          <ReportWorkspace
            dossier={activeDossier}
            onOpenWarRoom={() => setIsWarRoomOpen(true)}
          />
        )}

        {/* Idle Intake Console */}
        {!isLoading && !activeDossier && (
          <IntakeConsole
            onSubmit={handleStartAnalysis}
            isLoading={isLoading}
          />
        )}
      </main>

      {/* Interactive War Room Drawer */}
      <WarRoomDrawer
        isOpen={isWarRoomOpen}
        onClose={() => setIsWarRoomOpen(false)}
        dossier={activeDossier || undefined}
      />

      {/* Saved History Modal */}
      <HistoryModal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        onSelectDossier={(d) => {
          setActiveDossier(d);
          setIsHistoryOpen(false);
        }}
        savedDossiers={savedDossiers}
        onDeleteDossier={handleDeleteDossier}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
