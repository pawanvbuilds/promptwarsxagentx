"use client";

import React, { useState } from "react";
import type { VentureDossier } from "@/lib/types/domain";
import { ReportHeader } from "./ReportHeader";
import { ReportNavTabs, type ReportTabId } from "./ReportNavTabs";
import { OverviewTab } from "./OverviewTab";
import { MarketTab } from "./MarketTab";
import { CompetitorsTab } from "./CompetitorsTab";
import { CustomersTab } from "./CustomersTab";
import { EconomicsTab } from "./EconomicsTab";
import { RoadmapTab } from "./RoadmapTab";
import { Globe, ExternalLink } from "lucide-react";

interface ReportWorkspaceProps {
  dossier: VentureDossier;
  onOpenWarRoom: () => void;
}

export function ReportWorkspace({ dossier, onOpenWarRoom }: ReportWorkspaceProps) {
  const [activeTab, setActiveTab] = useState<ReportTabId>("overview");

  return (
    <article
      aria-label={`Venture Dossier: ${dossier.framing.ventureName}`}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      {/* Executive Header */}
      <ReportHeader dossier={dossier} onOpenWarRoom={onOpenWarRoom} />

      {/* Accessible Navigation Tabs */}
      <ReportNavTabs activeTab={activeTab} onChangeTab={setActiveTab} />

      {/* Active Tab Panel */}
      <main id="main-content" tabIndex={-1} className="focus:outline-none">
        {activeTab === "overview" && <OverviewTab dossier={dossier} />}
        {activeTab === "market" && <MarketTab dossier={dossier} />}
        {activeTab === "competitors" && <CompetitorsTab dossier={dossier} />}
        {activeTab === "customers" && <CustomersTab dossier={dossier} />}
        {activeTab === "economics" && <EconomicsTab dossier={dossier} />}
        {activeTab === "roadmap" && <RoadmapTab dossier={dossier} />}
      </main>

      {/* Citations Grounding Appendix */}
      {dossier.citations && dossier.citations.length > 0 && (
        <section
          aria-labelledby="citations-heading"
          className="mt-16 pt-8 border-t border-slate-800 text-xs text-slate-400"
        >
          <div className="flex items-center gap-2 mb-3">
            <Globe className="w-4 h-4 text-emerald-400" />
            <h3 id="citations-heading" className="font-bold text-slate-300 uppercase tracking-wider">
              Real-Time Web Grounding Citations ({dossier.citations.length})
            </h3>
          </div>
          <p className="mb-4 text-slate-400">
            Market sizing estimates and competitor features are cross-referenced with public industry filings and web disclosures.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {dossier.citations.map((c, idx) => (
              <a
                key={idx}
                href={c.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors flex items-start justify-between gap-2 group"
              >
                <div>
                  <div className="font-semibold text-slate-200 group-hover:text-emerald-400 line-clamp-1">
                    {c.title}
                  </div>
                  <div className="text-[11px] font-mono text-slate-400">{c.domain}</div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-400 shrink-0 mt-0.5" />
              </a>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
