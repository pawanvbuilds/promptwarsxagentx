"use client";

import React, { useState } from "react";
import { Download, Presentation, MessageSquare, Copy, Check } from "lucide-react";
import type { VentureDossier } from "@/lib/types/domain";
import { dossierToInvestmentMemo } from "@/lib/export/markdown";
import { dossierToPitchDeckSlides } from "@/lib/export/pitch-deck";

interface ReportHeaderProps {
  dossier: VentureDossier;
  onOpenWarRoom: () => void;
}

export function ReportHeader({ dossier, onOpenWarRoom }: ReportHeaderProps) {
  const [copied, setCopied] = useState(false);
  const { framing, validation } = dossier;

  const score = validation.overallViabilityScore;
  const isStrong = score >= 80;
  const isModerate = score >= 65 && score < 80;

  const handleDownloadMemo = () => {
    const md = dossierToInvestmentMemo(dossier);
    const blob = new Blob([md], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${framing.ventureName.toLowerCase().replace(/\s+/g, "-")}-investment-memo.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDownloadDeck = () => {
    const deck = dossierToPitchDeckSlides(dossier);
    const blob = new Blob([deck], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${framing.ventureName.toLowerCase().replace(/\s+/g, "-")}-pitch-deck.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCopySummary = async () => {
    const text = `Venture: ${framing.ventureName} (${framing.category})
Viability Score: ${score}/100 [${validation.verdict}]
One-Liner: ${framing.oneLiner}
Market TAM: ${dossier.market.tam.valueFormatted} (CAGR: ${dossier.market.cagrPercent}%)
Validated by VentureArchitect Autonomous Multi-Agent Co-Pilot`;

    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 sm:p-8 shadow-2xl backdrop-blur-md mb-8">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        {/* Title & Metadata */}
        <div className="space-y-2 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              {framing.category}
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Geo: {framing.targetGeography}
            </span>
            <span className="text-slate-600">•</span>
            <span className="text-xs text-slate-400 font-mono">
              Model: {dossier.input.businessModel}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            {framing.ventureName}
          </h1>

          <p className="text-sm sm:text-base text-slate-300 font-medium">
            {framing.oneLiner}
          </p>
        </div>

        {/* Viability Verdict Scorecard Badge */}
        <div className="flex items-center gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800 shrink-0">
          <div className="text-right">
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Viability Index
            </div>
            <div className="text-xs font-bold text-slate-300 mt-0.5">
              {validation.verdict}
            </div>
          </div>

          <div
            className={`w-14 h-14 rounded-xl flex items-center justify-center font-mono font-black text-2xl border shadow-lg ${
              isStrong
                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30 shadow-emerald-500/10"
                : isModerate
                ? "bg-teal-500/10 text-teal-400 border-teal-500/30 shadow-teal-500/10"
                : "bg-amber-500/10 text-amber-400 border-amber-500/30 shadow-amber-500/10"
            }`}
          >
            {score}
          </div>
        </div>
      </div>

      {/* Action Toolbar */}
      <div className="mt-6 pt-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-2">
          {/* Download Memo */}
          <button
            onClick={handleDownloadMemo}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-200 hover:text-white border border-slate-700 transition-colors focus:ring-2 focus:ring-emerald-500 font-medium"
          >
            <Download className="w-3.5 h-3.5 text-emerald-400" />
            <span>Investment Memo (.md)</span>
          </button>

          {/* Download Pitch Deck */}
          <button
            onClick={handleDownloadDeck}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-200 hover:text-white border border-slate-700 transition-colors focus:ring-2 focus:ring-emerald-500 font-medium"
          >
            <Presentation className="w-3.5 h-3.5 text-cyan-400" />
            <span>Pitch Deck Outline</span>
          </button>

          {/* Copy Brief */}
          <button
            onClick={handleCopySummary}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-200 hover:text-white border border-slate-700 transition-colors focus:ring-2 focus:ring-emerald-500 font-medium"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-400" />
                <span>Copy Summary</span>
              </>
            )}
          </button>
        </div>

        {/* War Room Consult CTA */}
        <button
          onClick={onOpenWarRoom}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold shadow-md shadow-emerald-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] focus:ring-2 focus:ring-white"
        >
          <MessageSquare className="w-4 h-4" />
          <span>Consult War Room Co-Pilot</span>
        </button>
      </div>
    </div>
  );
}
