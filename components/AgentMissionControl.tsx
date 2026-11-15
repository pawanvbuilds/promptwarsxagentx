"use client";

import React from "react";
import { CheckCircle2, Clock, Globe, Loader2, Sparkles } from "lucide-react";
import type { AgentRole, AgentStatus } from "@/lib/types/agent-events";
import type { SourceCitation } from "@/lib/types/domain";

interface AgentStageUI {
  id: AgentRole;
  title: string;
  roleDescription: string;
  status: AgentStatus;
  durationMs?: number;
}

interface AgentMissionControlProps {
  progressPercent: number;
  statusMessage: string;
  activeAgent: AgentRole;
  citations: SourceCitation[];
}

export function AgentMissionControl({
  progressPercent,
  statusMessage,
  activeAgent,
  citations,
}: AgentMissionControlProps) {
  const stages: AgentStageUI[] = [
    {
      id: "framing",
      title: "1. Idea Strategist",
      roleDescription: "Deconstructs hypothesis, market archetype & search queries",
      status:
        progressPercent >= 25
          ? "completed"
          : activeAgent === "framing"
          ? "running"
          : "pending",
    },
    {
      id: "market",
      title: "2A. Market Intelligence",
      roleDescription: "Calculates bottom-up TAM/SAM/SOM & regulatory landscape",
      status:
        progressPercent >= 65
          ? "completed"
          : activeAgent === "market" || (progressPercent > 25 && progressPercent < 65)
          ? "running"
          : "pending",
    },
    {
      id: "competitors",
      title: "2B. Competitor Recon",
      roleDescription: "2x2 positioning matrix, pricing teardown & defensible moats",
      status:
        progressPercent >= 65
          ? "completed"
          : activeAgent === "competitors" || (progressPercent > 25 && progressPercent < 65)
          ? "running"
          : "pending",
    },
    {
      id: "customers",
      title: "2C. Customer Profiler",
      roleDescription: "Dual ICP personas, JTBD framework & Mom-Test interview script",
      status:
        progressPercent >= 65
          ? "completed"
          : activeAgent === "customers" || (progressPercent > 25 && progressPercent < 65)
          ? "running"
          : "pending",
    },
    {
      id: "validation",
      title: "3. Venture Stress Tester",
      roleDescription: "0–100 Viability Score, CAC/LTV simulation & kill-risks",
      status:
        progressPercent >= 85
          ? "completed"
          : activeAgent === "validation" || (progressPercent >= 65 && progressPercent < 85)
          ? "running"
          : "pending",
    },
    {
      id: "execution",
      title: "4. Launch Architect",
      roleDescription: "90-day sprints, MoSCoW MVP scope & 10-slide pitch deck",
      status:
        progressPercent >= 100
          ? "completed"
          : activeAgent === "execution" || progressPercent >= 85
          ? "running"
          : "pending",
    },
  ];

  return (
    <div
      role="region"
      aria-label="Autonomous Multi-Agent Mission Control"
      className="max-w-4xl mx-auto px-4 sm:px-6 py-6"
    >
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 p-6 shadow-2xl backdrop-blur-md">
        {/* Mission Control Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <Sparkles className="w-4 h-4 animate-spin text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-white tracking-wide uppercase">
                Multi-Agent Mission Control
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Parallel DAG execution with real-time web grounding
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs">
            {citations.length > 0 && (
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-500/20 font-medium">
                <Globe className="w-3.5 h-3.5" />
                <span>{citations.length} Web Sources Grounded</span>
              </span>
            )}
            <span className="font-mono font-semibold text-emerald-600 dark:text-emerald-400 text-sm">
              {progressPercent}%
            </span>
          </div>
        </div>

        {/* Real-time Progress Bar */}
        <div className="w-full bg-slate-50 dark:bg-slate-950 rounded-full h-2 mb-4 overflow-hidden border border-slate-200 dark:border-slate-800">
          <div
            className="bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 h-2 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${Math.min(100, Math.max(5, progressPercent))}%` }}
          />
        </div>

        {/* Live Status Ticker */}
        <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 rounded-xl px-4 py-2.5 mb-6 flex items-center gap-2 text-xs font-mono text-slate-700 dark:text-slate-300">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping shrink-0" />
          <span className="truncate">{statusMessage || "Initializing multi-agent pipeline..."}</span>
        </div>

        {/* Agent Stage Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {stages.map((st) => {
            const isDone = st.status === "completed";
            const isRun = st.status === "running";

            return (
              <div
                key={st.id}
                className={`p-3.5 rounded-xl border transition-all ${
                  isRun
                    ? "bg-emerald-50 dark:bg-emerald-950/20 border-emerald-400 dark:border-emerald-500/50 shadow-sm shadow-emerald-500/10"
                    : isDone
                    ? "bg-slate-100/60 dark:bg-slate-950/40 border-slate-200/80 dark:border-slate-800/60"
                    : "bg-slate-100/40 dark:bg-slate-950/20 border-slate-200/60 dark:border-slate-800/30 opacity-60"
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-semibold text-xs text-slate-800 dark:text-slate-200">
                    {st.title}
                  </span>
                  {isDone ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  ) : isRun ? (
                    <Loader2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 animate-spin" />
                  ) : (
                    <Clock className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                  )}
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2">
                  {st.roleDescription}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
