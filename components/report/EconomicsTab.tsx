"use client";

import React from "react";
import { ShieldCheck } from "lucide-react";
import type { VentureDossier } from "@/lib/types/domain";
import { EconomicsCalculator } from "../economics/EconomicsCalculator";

interface EconomicsTabProps {
  dossier: VentureDossier;
}

export function EconomicsTab({ dossier }: EconomicsTabProps) {
  const { validation } = dossier;
  const proj = validation.unitEconomicsProjection;

  return (
    <div
      role="tabpanel"
      id="tabpanel-economics"
      aria-labelledby="tab-economics"
      className="space-y-8 animate-in fade-in duration-150"
    >
      {/* Interactive Sensitivity Calculator */}
      <EconomicsCalculator initialEconomics={proj} />

      {/* Baseline Unit Economics Projections Card */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Venture Model Baseline Unit Economics</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
            <div className="text-xs text-slate-400 mb-1">Estimated CAC</div>
            <div className="text-base font-bold text-white font-mono">
              {proj.estimatedCAC}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
            <div className="text-xs text-slate-400 mb-1">Estimated Customer LTV</div>
            <div className="text-base font-bold text-emerald-400 font-mono">
              {proj.estimatedLTV}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
            <div className="text-xs text-slate-400 mb-1">Gross Margin</div>
            <div className="text-base font-bold text-cyan-400 font-mono">
              {proj.grossMarginPercent}%
            </div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 text-xs text-slate-300 leading-relaxed">
          <strong className="text-emerald-400">Economic Health Verdict:</strong>{" "}
          {proj.economicHealthVerdict}
        </div>
      </div>
    </div>
  );
}
