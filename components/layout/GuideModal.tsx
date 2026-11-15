"use client";

import React, { useEffect } from "react";
import { X, ArrowRight, BookOpen } from "lucide-react";

interface GuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGetStarted: () => void;
}

export function GuideModal({ isOpen, onClose, onGetStarted }: GuideModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const specialists = [
    {
      stage: "Stage 1",
      name: "Idea Strategist & Framing Agent",
      role: "Deconstructs the founder hypothesis, identifies startup archetype, target geography, and initial search queries.",
    },
    {
      stage: "Stage 2A",
      name: "Market Intelligence Specialist",
      role: "Performs bottom-up TAM/SAM sizing, calculates CAGR, and maps market maturity with live research grounding.",
    },
    {
      stage: "Stage 2B",
      name: "Competitor Reconnaissance Agent",
      role: "Discovers incumbents and alternatives, maps 2x2 positioning axes, and evaluates feature white spaces.",
    },
    {
      stage: "Stage 2C",
      name: "Customer Profiling & Discovery Agent",
      role: "Synthesizes ICP personas, day-in-the-life workflows, and non-leading Mom-Test interview questions.",
    },
    {
      stage: "Stage 3",
      name: "Venture Stress Tester & Risk Agent",
      role: "Scores 0–100 viability, pinpoints fatal venture flaws, and simulates 3-year unit economics.",
    },
    {
      stage: "Stage 4",
      name: "Launch Execution Architect",
      role: "Builds a 30-to-90 day execution roadmap, MoSCoW MVP feature scope, and 10-slide pitch outline.",
    },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-150"
      role="dialog"
      aria-modal="true"
      aria-labelledby="guide-title"
    >
      <div className="w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8 relative transition-colors">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#ecfdf5] dark:bg-[#064e3b]/40 border border-[#a7f3d0] dark:border-[#065f46] flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-[#059669] dark:text-[#34d399]" />
            </div>
            <div>
              <h2 id="guide-title" className="text-lg font-bold text-[#0f172a] dark:text-white">
                VentureArchitect Guide
              </h2>
              <p className="text-xs text-[#64748b] dark:text-slate-400">
                How our 6 autonomous AI specialists validate your venture
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close guide modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-5 space-y-4">
          <div className="p-4 rounded-2xl bg-[#f0fdf4] dark:bg-[#064e3b]/20 border border-[#bbf7d0]/70 dark:border-[#065f46] text-xs text-[#166534] dark:text-emerald-300 leading-relaxed">
            <span className="font-bold">Autonomous Validation Engine:</span> Simply type your idea in the console. Six autonomous AI agents collaborate through a directed acyclic graph (DAG) to generate an investor-grade dossier in ~60 seconds.
          </div>

          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#64748b] dark:text-slate-400">
              The 6 Specialist Agents
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {specialists.map((s, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-[#f8fafc] dark:bg-[#090d16] border border-slate-200/80 dark:border-slate-800">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold text-[#059669] dark:text-[#34d399] uppercase tracking-wider">
                      {s.stage}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-[#0f172a] dark:text-white mb-1">{s.name}</h4>
                  <p className="text-[11px] text-[#64748b] dark:text-slate-400 leading-normal">{s.role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            Close
          </button>
          <button
            type="button"
            onClick={() => {
              onClose();
              onGetStarted();
            }}
            className="px-5 py-2.5 rounded-full bg-[#059669] hover:bg-[#047857] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
          >
            <span>Start Validation</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

