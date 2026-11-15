"use client";

import React from "react";
import { AlertTriangle, Lightbulb, ShieldAlert, Sparkles, TrendingUp } from "lucide-react";
import type { VentureDossier } from "@/lib/types/domain";

interface OverviewTabProps {
  dossier: VentureDossier;
}

export function OverviewTab({ dossier }: OverviewTabProps) {
  const { framing, validation } = dossier;
  const scores = validation.dimensionalScores;

  const scoreBars = [
    { label: "Problem Urgency", val: scores.problemUrgency, desc: "Hair-on-fire severity of customer pain" },
    { label: "Market Timing & Window", val: scores.marketTiming, desc: "Macro catalysts & 'Why Now?' tailwinds" },
    { label: "Moat Defensibility", val: scores.moatDefensibility, desc: "Resistance to cloning by big tech incumbents" },
    { label: "Technical Feasibility", val: scores.technicalFeasibility, desc: "Ease of building stable MVP in < 60 days" },
    { label: "Unit Economics", val: scores.unitEconomics, desc: "LTV/CAC ratio, payback speed & gross margin" },
    { label: "Regulatory Ease", val: scores.regulatoryEase, desc: "Absence of fatal legal/compliance bottlenecks" },
  ];

  return (
    <div
      role="tabpanel"
      id="tabpanel-overview"
      aria-labelledby="tab-overview"
      className="space-y-8 animate-in fade-in duration-150"
    >
      {/* Core Falsifiable Hypothesis Card */}
      <div className="rounded-2xl bg-gradient-to-br from-white dark:from-slate-900 to-slate-50 dark:to-slate-950 border border-emerald-200 dark:border-emerald-500/30 p-6 sm:p-8 shadow-xl">
        <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-3">
          <Lightbulb className="w-4 h-4" />
          <span>Core Falsifiable Venture Hypothesis</span>
        </div>
        <blockquote className="text-lg sm:text-xl font-medium text-slate-900 dark:text-slate-100 leading-relaxed italic border-l-2 border-emerald-400 pl-4 my-2">
          &ldquo;{framing.coreHypothesis}&rdquo;
        </blockquote>
        <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800/80 flex flex-wrap items-center justify-between text-xs text-slate-500 dark:text-slate-400 gap-2">
          <span>
            <strong>Value Proposition:</strong> {framing.valueProposition}
          </span>
          <span className="font-mono text-emerald-600 dark:text-emerald-400">
            Archetype: {framing.archetype}
          </span>
        </div>
      </div>

      {/* 6-Dimensional Scorecard */}
      <div>
        <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>6-Axis Venture Viability Breakdown</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {scoreBars.map((bar) => {
            const isHigh = bar.val >= 80;
            const isMedium = bar.val >= 65 && bar.val < 80;

            return (
              <div
                key={bar.label}
                className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-xs text-slate-800 dark:text-slate-200">
                      {bar.label}
                    </span>
                    <span
                      className={`font-mono font-bold text-sm ${
                        isHigh
                          ? "text-emerald-600 dark:text-emerald-400"
                          : isMedium
                          ? "text-teal-600 dark:text-teal-400"
                          : "text-amber-600 dark:text-amber-400"
                      }`}
                    >
                      {bar.val}/100
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-3">{bar.desc}</p>
                </div>

                <div className="w-full bg-slate-50 dark:bg-slate-950 rounded-full h-1.5 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      isHigh
                        ? "bg-emerald-400"
                        : isMedium
                        ? "bg-teal-400"
                        : "bg-amber-400"
                    }`}
                    style={{ width: `${bar.val}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lethal Kill-Risks & Countermeasures */}
      <div>
        <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4 flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-rose-600 dark:text-rose-400" />
          <span>Existential Kill-Risks & Tactical Countermeasures</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {validation.killRisks.map((k, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-slate-900 dark:text-white flex items-center gap-2">
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
                  {k.threat}
                </span>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                    k.severity === "Critical"
                      ? "bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-500/20"
                      : "bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-500/20"
                  }`}
                >
                  {k.severity}
                </span>
              </div>

              <div className="text-xs text-slate-700 dark:text-slate-300">
                <strong className="text-slate-500 dark:text-slate-400">Early Warning Indicator:</strong>{" "}
                {k.leadIndicator}
              </div>

              <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 text-xs text-emerald-700 dark:text-emerald-300 leading-snug">
                <strong className="text-emerald-600 dark:text-emerald-400">De-Risking Action:</strong>{" "}
                {k.countermeasure}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Strategic Pivots */}
      <div>
        <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
          <span>High-Leverage Strategic Pivots</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {validation.strategicPivots.map((p, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2"
            >
              <span className="text-xs font-bold text-cyan-600 dark:text-cyan-400 tracking-wide uppercase">
                {p.pivotAngle}
              </span>
              <p className="text-xs text-slate-800 dark:text-slate-200">{p.shiftSummary}</p>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">
                <strong>Why it works:</strong> {p.rationale}
              </div>
              <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
                Strategic Advantage: {p.projectedAdvantage}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
