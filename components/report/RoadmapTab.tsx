"use client";

import React from "react";
import { Calendar, CheckSquare, Users, Presentation } from "lucide-react";
import type { VentureDossier } from "@/lib/types/domain";

interface RoadmapTabProps {
  dossier: VentureDossier;
}

export function RoadmapTab({ dossier }: RoadmapTabProps) {
  const { execution } = dossier;

  return (
    <div
      role="tabpanel"
      id="tabpanel-roadmap"
      aria-labelledby="tab-roadmap"
      className="space-y-8 animate-in fade-in duration-150"
    >
      {/* 90-Day Execution Sprints */}
      <div>
        <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4 flex items-center gap-2">
          <Calendar className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>90-Day Phased Execution Sprints</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {execution.ninetyDayRoadmap.map((sprint) => (
            <div
              key={sprint.sprintNumber}
              className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-4 shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20 uppercase tracking-wider">
                    Sprint {sprint.sprintNumber}
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300">
                    {sprint.timeframeDays}
                  </span>
                </div>

                <h4 className="text-base font-bold text-slate-900 dark:text-white mb-3">
                  {sprint.focusTheme}
                </h4>

                <div className="space-y-3 mb-4">
                  <div>
                    <div className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                      Key Milestones
                    </div>
                    <ul className="text-xs text-slate-700 dark:text-slate-300 space-y-1">
                      {sprint.keyMilestones.map((m, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-emerald-600 dark:text-emerald-400 text-xs">•</span>
                          <span>{m}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <div className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                      Concrete Deliverables
                    </div>
                    <ul className="text-xs text-slate-700 dark:text-slate-300 space-y-1">
                      {sprint.concreteDeliverables.map((d, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-cyan-600 dark:text-cyan-400 text-xs">•</span>
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Validation Gate */}
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-emerald-200 dark:border-emerald-500/20 text-xs">
                <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block mb-0.5">
                  Validation Gate Metric:
                </span>
                <span className="text-slate-800 dark:text-slate-200">{sprint.stageGateMetric}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MoSCoW MVP Feature Scoping */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
          <CheckSquare className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>MoSCoW MVP Feature Scope Matrix</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          {/* Must Have */}
          <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-emerald-200 dark:border-emerald-500/30">
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block mb-2">
              Must-Have (Day 1 Non-Negotiable)
            </span>
            <ul className="space-y-2 text-slate-800 dark:text-slate-200">
              {execution.moscowScope.mustHave.map((f, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">✓</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Should Have */}
          <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
            <span className="text-xs font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider block mb-2">
              Should-Have (Fast Follow Iteration)
            </span>
            <ul className="space-y-2 text-slate-700 dark:text-slate-300">
              {execution.moscowScope.shouldHave.map((f, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-cyan-600 dark:text-cyan-400 font-bold">→</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Won't Have V1 */}
          <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 opacity-80">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-2">
              Won&apos;t-Have V1 (Scope Creep Defense)
            </span>
            <ul className="space-y-2 text-slate-500 dark:text-slate-400">
              {execution.moscowScope.wontHaveV1.map((f, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-slate-400 dark:text-slate-600 font-bold">✕</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* First 100 Customers Tactical Playbook */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
          <Users className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>First 100 Customers Tactical Acquisition Playbook</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {execution.first100CustomersPlaybook.map((play, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2.5 text-xs"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 dark:text-white">{play.channel}</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 font-semibold">
                  {play.playType}
                </span>
              </div>
              <p className="text-slate-700 dark:text-slate-300">{play.tacticalAction}</p>
              <div className="p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 text-emerald-700 dark:text-emerald-300 italic">
                &ldquo;{play.messagingHook}&rdquo;
              </div>
              <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 pt-1">
                Target: {play.targetCount}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 10-Slide Pitch Deck Structure */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
          <Presentation className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
          <span>10-Slide Seed Pitch Deck Narrative</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          {execution.pitchDeckOutline.map((slide) => (
            <div
              key={slide.slideNumber}
              className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-emerald-600 dark:text-emerald-400 text-xs">
                  Slide {slide.slideNumber}: {slide.title}
                </span>
              </div>
              <div className="font-medium text-slate-800 dark:text-slate-200 mb-1 leading-snug">
                {slide.coreHook}
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">
                <strong className="text-slate-700 dark:text-slate-300">Proof Point:</strong>{" "}
                {slide.keyEvidence}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
