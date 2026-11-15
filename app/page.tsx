"use client";

import React, { useState } from "react";
import { Sidebar, type NavTab } from "@/components/layout/Sidebar";
import { TopHeader } from "@/components/layout/TopHeader";
import { IntakeConsole } from "@/components/IntakeConsole";
import { AgentMissionControl } from "@/components/AgentMissionControl";
import { ReportWorkspace } from "@/components/report/ReportWorkspace";
import { WarRoomDrawer } from "@/components/warroom/WarRoomDrawer";
import { HistoryModal } from "@/components/history/HistoryModal";
import { GuideModal } from "@/components/layout/GuideModal";
import { SettingsModal } from "@/components/layout/SettingsModal";
import { PresetsModal } from "@/components/layout/PresetsModal";
import type { FounderInput, SourceCitation, VentureDossier } from "@/lib/types/domain";
import type { AgentRole, VentureSSEEvent } from "@/lib/types/agent-events";
import type { ShowcasePreset } from "@/lib/presets/showcase-ventures";
import { useSavedDossiers } from "@/lib/storage";
import { AlertCircle, X } from "lucide-react";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<NavTab>("home");
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const [activeDossier, setActiveDossier] = useState<VentureDossier | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [progressPercent, setProgressPercent] = useState(0);
  const [statusMessage, setStatusMessage] = useState("");
  const [activeAgent, setActiveAgent] = useState<AgentRole>("orchestrator");
  const [citations, setCitations] = useState<SourceCitation[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [isWarRoomOpen, setIsWarRoomOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isPresetsOpen, setIsPresetsOpen] = useState(false);

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
    setActiveTab("dashboard");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNewAnalysis = () => {
    setActiveDossier(null);
    setErrorMessage(null);
    setIsLoading(false);
    setProgressPercent(0);
    setStatusMessage("");
    setActiveTab("home");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavSelect = (tab: NavTab) => {
    setActiveTab(tab);
    if (tab === "home") {
      handleNewAnalysis();
    } else if (tab === "dashboard") {
      if (!activeDossier) {
        setIsHistoryOpen(true);
      }
    } else if (tab === "insights") {
      setIsPresetsOpen(true);
    } else if (tab === "guide") {
      setIsGuideOpen(true);
    } else if (tab === "settings") {
      setIsSettingsOpen(true);
    }
  };

  const handleGetStarted = () => {
    setActiveTab("home");
    setActiveDossier(null);
    setTimeout(() => {
      const textarea = document.getElementById("startup-idea");
      if (textarea) {
        textarea.focus();
        textarea.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 50);
  };

  return (
    <div className="min-h-screen flex bg-[#f8fcfa] dark:bg-[#090d16] text-[#0f172a] dark:text-[#f8fafc] font-sans relative overflow-x-hidden transition-colors">
      {/* Soft Organic Ambient Mint Gradients in Background */}
      <div
        className="pointer-events-none fixed top-0 right-0 w-[550px] h-[450px] bg-gradient-to-bl from-[#a7f3d0]/30 dark:from-emerald-950/30 via-[#d1fae5]/15 dark:via-transparent to-transparent rounded-bl-[160px] filter blur-2xl z-0 transition-all"
        aria-hidden="true"
      />
      {/* Bottom-Right Layered Organic Mint Wave Contours */}
      <div
        className="pointer-events-none fixed bottom-0 right-0 w-[420px] h-[260px] overflow-hidden z-0 select-none dark:opacity-25 transition-opacity"
        aria-hidden="true"
      >
        <svg viewBox="0 0 420 260" fill="none" className="w-full h-full">
          {/* Base Wave Layer */}
          <path
            d="M120 260 C180 210 250 220 330 160 C370 130 400 90 420 70 L420 260 Z"
            fill="#a7f3d0"
            fillOpacity="0.22"
          />
          {/* Mid Wave Layer */}
          <path
            d="M200 260 C260 220 310 210 370 170 C395 150 410 130 420 115 L420 260 Z"
            fill="#34d399"
            fillOpacity="0.18"
          />
          {/* Foreground Wave Contour */}
          <path
            d="M280 260 C330 230 365 220 420 185 L420 260 Z"
            fill="#10b981"
            fillOpacity="0.12"
          />
        </svg>
      </div>

      {/* Desktop Sidebar (Fixed on the Left) */}
      <div className="hidden lg:block shrink-0 z-30">
        <Sidebar
          activeTab={activeTab}
          onSelectTab={handleNavSelect}
          onGetStarted={handleGetStarted}
        />
      </div>

      {/* Mobile Sidebar Drawer Overlay */}
      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 z-50 flex lg:hidden bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-150"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-64 bg-white dark:bg-[#0f172a] h-full shadow-2xl flex flex-col">
            <button
              onClick={() => setIsMobileSidebarOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 z-50"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
            <Sidebar
              activeTab={activeTab}
              onSelectTab={handleNavSelect}
              onGetStarted={handleGetStarted}
              onCloseMobile={() => setIsMobileSidebarOpen(false)}
            />
          </div>
          <div
            className="flex-1"
            onClick={() => setIsMobileSidebarOpen(false)}
            aria-hidden="true"
          />
        </div>
      )}

      {/* Main Content Area (Right of Sidebar) */}
      <div className="flex-1 flex flex-col min-w-0 z-10">
        {/* Top Header Bar */}
        <TopHeader
          onToggleSidebar={() => setIsMobileSidebarOpen(true)}
          onSelectPresetModal={() => setIsPresetsOpen(true)}
        />

        {/* Error Alert Banner */}
        {errorMessage && (
          <div className="max-w-4xl mx-auto px-4 mt-2 w-full">
            <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-800 dark:text-rose-200 text-xs flex items-center justify-between gap-3 shadow-md">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600 dark:text-rose-400" />
                <span>{errorMessage}</span>
              </div>
              <button
                onClick={() => setErrorMessage(null)}
                className="text-rose-600 dark:text-rose-400 hover:text-rose-900 dark:hover:text-rose-200 text-xs underline font-semibold shrink-0 cursor-pointer"
              >
                Dismiss
              </button>
            </div>
          </div>
        )}

        {/* Dynamic Main Body Content */}
        <main className="flex-1 w-full pb-8">
          {/* 1. Loading / Multi-Agent Streaming State */}
          {isLoading && (
            <AgentMissionControl
              progressPercent={progressPercent}
              statusMessage={statusMessage}
              activeAgent={activeAgent}
              citations={citations}
            />
          )}

          {/* 2. Finished Dossier View */}
          {!isLoading && activeDossier && (
            <ReportWorkspace
              dossier={activeDossier}
              onOpenWarRoom={() => setIsWarRoomOpen(true)}
            />
          )}

          {/* 3. Idle Home / Intake Console State (Exact Match to Reference Image) */}
          {!isLoading && !activeDossier && (
            <IntakeConsole
              onSubmit={handleStartAnalysis}
              isLoading={isLoading}
            />
          )}
        </main>
      </div>

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
          setActiveTab("dashboard");
        }}
        savedDossiers={savedDossiers}
        onDeleteDossier={handleDeleteDossier}
      />

      {/* Guide Modal */}
      <GuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
        onGetStarted={handleGetStarted}
      />

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />

      {/* Showcase Presets Modal */}
      <PresetsModal
        isOpen={isPresetsOpen}
        onClose={() => setIsPresetsOpen(false)}
        onSelectPreset={handleSelectPreset}
      />
    </div>
  );
}
