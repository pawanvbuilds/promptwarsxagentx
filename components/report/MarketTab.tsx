"use client";

import React from "react";
import { TrendingUp, Shield, AlertCircle, Compass, CheckCircle } from "lucide-react";
import type { VentureDossier } from "@/lib/types/domain";

interface MarketTabProps {
  dossier: VentureDossier;
}

export function MarketTab({ dossier }: MarketTabProps) {
  const { market } = dossier;

  return (
    <div
      role="tabpanel"
      id="tabpanel-market"
      aria-labelledby="tab-market"
      className="space-y-8 animate-in fade-in duration-150"
    >
      {/* Sizing Hierarchy Cards: TAM / SAM / SOM */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* TAM */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg relative overflow-hidden">
          <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
            Total Addressable Market (TAM)
          </div>
          <div className="text-3xl font-extrabold text-slate-900 dark:text-white font-mono mb-2">
            {market.tam.valueFormatted}
          </div>
          <p className="text-xs text-slate-700 dark:text-slate-300 leading-snug mb-3">
            {market.tam.formula}
          </p>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 pt-3 border-t border-slate-200 dark:border-slate-800">
            <strong>Methodology:</strong> {market.tam.methodology}
          </div>
        </div>

        {/* SAM */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg relative overflow-hidden">
          <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
            Serviceable Addressable Market (SAM)
          </div>
          <div className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono mb-2">
            {market.sam.valueFormatted}
          </div>
          <p className="text-xs text-slate-700 dark:text-slate-300 leading-snug mb-3">
            {market.sam.rationale}
          </p>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 pt-3 border-t border-slate-200 dark:border-slate-800">
            Target segment & geography filter applied
          </div>
        </div>

        {/* SOM */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg relative overflow-hidden">
          <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
            Serviceable Obtainable (SOM - {market.som.milestoneYear})
          </div>
          <div className="text-3xl font-extrabold text-teal-600 dark:text-teal-400 font-mono mb-2">
            {market.som.valueFormatted}
          </div>
          <p className="text-xs text-slate-700 dark:text-slate-300 leading-snug mb-3">
            {market.som.rationale}
          </p>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 pt-3 border-t border-slate-200 dark:border-slate-800">
            Realistic Year 3–5 market capture target
          </div>
        </div>
      </div>

      {/* Market Dynamics: CAGR & Maturity */}
      <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-500 dark:text-slate-400">5-Year Growth Trajectory</div>
            <div className="text-base font-bold text-slate-900 dark:text-white">
              {market.cagrPercent}% Annual CAGR
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-50 dark:bg-cyan-500/10 border border-cyan-200 dark:border-cyan-500/20 flex items-center justify-center text-cyan-600 dark:text-cyan-400">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-500 dark:text-slate-400">Market Maturity Stage</div>
            <div className="text-base font-bold text-slate-800 dark:text-slate-200">
              {market.marketMaturity}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-500 dark:text-slate-400">Compliance Friction</div>
            <div className="text-base font-bold text-slate-800 dark:text-slate-200">
              {market.regulatoryLandscape.complianceDifficulty}
            </div>
          </div>
        </div>
      </div>

      {/* Tailwinds & Headwinds */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Tailwinds */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Macro Tailwinds & Growth Drivers</span>
          </h3>
          <div className="space-y-3">
            {market.tailwinds.map((t, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800/60">
                <div className="font-semibold text-xs text-slate-800 dark:text-slate-200 mb-1">
                  {t.trend}
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">{t.impact}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Headwinds */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <span>Market Headwinds & Barriers</span>
          </h3>
          <div className="space-y-3">
            {market.headwinds.map((h, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800/60">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-xs text-slate-800 dark:text-slate-200">
                    {h.barrier}
                  </span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded font-bold uppercase ${
                      h.threatLevel === "Severe"
                        ? "bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-500/20"
                        : "bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-500/20"
                    }`}
                  >
                    {h.threatLevel}
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">{h.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Regulatory & Compliance Landscape */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
          <Shield className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          <span>Regulatory Compliance & Legal Framework</span>
        </h3>
        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          {market.regulatoryLandscape.summary}
        </p>
        <div className="flex flex-wrap items-center gap-2 pt-2">
          <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold mr-1">
            Governing Standards:
          </span>
          {market.regulatoryLandscape.keyRegulations.map((reg, idx) => (
            <span
              key={idx}
              className="px-2.5 py-1 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-xs font-mono"
            >
              {reg}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
