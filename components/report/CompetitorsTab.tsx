"use client";

import React from "react";
import { ExternalLink, ShieldCheck, Crosshair, Sparkles } from "lucide-react";
import type { VentureDossier } from "@/lib/types/domain";
import { PositioningMatrixCanvas } from "../matrix/PositioningMatrixCanvas";

interface CompetitorsTabProps {
  dossier: VentureDossier;
}

export function CompetitorsTab({ dossier }: CompetitorsTabProps) {
  const { competitors } = dossier;

  return (
    <div
      role="tabpanel"
      id="tabpanel-competitors"
      aria-labelledby="tab-competitors"
      className="space-y-8 animate-in fade-in duration-150"
    >
      {/* 2x2 Positioning Matrix & Moat Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* SVG Canvas (7 cols) */}
        <div className="lg:col-span-7">
          <PositioningMatrixCanvas matrix={competitors.positioningMatrix} />
        </div>

        {/* Moat & Defensibility (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Defensive Moat Assessment
              </span>
              <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                {competitors.moatAssessment.moatScoreOutOfTen}/10
              </span>
            </div>

            <div className="text-lg font-bold text-white">
              Primary Moat: {competitors.moatAssessment.primaryMoatType}
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {competitors.moatAssessment.durabilityVerdict}
            </p>
          </div>

          {/* White Space Gaps */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 shadow-xl">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              White-Space Market Voids
            </span>
            <div className="space-y-3">
              {competitors.whiteSpaceOpportunities.map((gap, i) => (
                <div key={i} className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 text-xs">
                  <div className="font-bold text-slate-200 mb-1">{gap.gap}</div>
                  <p className="text-slate-400 mb-2">{gap.whyUnaddressed}</p>
                  <div className="text-emerald-400 text-[11px] font-semibold">
                    Tactical Play: {gap.tacticalExploitation}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Direct Competitor Teardown Grid */}
      <div>
        <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
          <Crosshair className="w-4 h-4 text-emerald-400" />
          <span>Direct Competitor Intel Teardown</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {competitors.directCompetitors.map((comp) => (
            <div
              key={comp.name}
              className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold text-sm text-white">{comp.name}</h4>
                  {comp.url && (
                    <a
                      href={comp.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-emerald-400 p-1"
                      aria-label={`Visit ${comp.name} website`}
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>

                <p className="text-xs text-slate-300 line-clamp-2 mb-3">
                  {comp.tagline}
                </p>

                <div className="space-y-1.5 text-xs text-slate-400 mb-4 pb-4 border-b border-slate-800">
                  <div>
                    <strong className="text-slate-300">Pricing:</strong> {comp.pricingModel}
                  </div>
                  <div>
                    <strong className="text-slate-300">Funding / Scale:</strong>{" "}
                    {comp.estimatedStageOrFunding}
                  </div>
                </div>

                {/* Strengths */}
                <div className="mb-3">
                  <div className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider mb-1">
                    Key Strengths
                  </div>
                  <ul className="text-xs text-slate-300 space-y-1">
                    {comp.coreStrengths.map((s, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-emerald-400 text-xs">•</span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Vulnerabilities */}
                <div>
                  <div className="text-[10px] font-bold text-rose-400 uppercase tracking-wider mb-1">
                    Critical Vulnerabilities
                  </div>
                  <ul className="text-xs text-slate-300 space-y-1">
                    {comp.criticalWeaknesses.map((w, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-rose-400 text-xs">•</span>
                        <span>{w}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Feature Comparison Teardown Matrix */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <span>Feature & Capability Teardown Benchmark</span>
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] font-bold tracking-wider">
              <tr>
                <th className="p-3 rounded-l-lg">Capability</th>
                <th className="p-3">Our Venture Advantage</th>
                <th className="p-3 rounded-r-lg">Incumbent Benchmark</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {competitors.featureComparisonMatrix.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-3 font-semibold text-white">{item.capability}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        item.ourAdvantage === "High"
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          : item.ourAdvantage === "Medium"
                          ? "bg-teal-500/10 text-teal-400 border border-teal-500/20"
                          : "bg-slate-800 text-slate-400"
                      }`}
                    >
                      {item.ourAdvantage} Advantage
                    </span>
                  </td>
                  <td className="p-3 text-slate-400">{item.incumbentBenchmark}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
