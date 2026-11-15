"use client";

import React, { useRef } from "react";
import {
  Compass,
  BarChart3,
  Crosshair,
  Users,
  Calculator,
  CalendarCheck,
} from "lucide-react";

export type ReportTabId =
  | "overview"
  | "market"
  | "competitors"
  | "customers"
  | "economics"
  | "roadmap";

interface TabItem {
  id: ReportTabId;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const TABS: TabItem[] = [
  { id: "overview", label: "Overview & Viability", icon: Compass },
  { id: "market", label: "Market Intelligence", icon: BarChart3 },
  { id: "competitors", label: "Competitors & 2x2", icon: Crosshair },
  { id: "customers", label: "Customers & Mom-Test", icon: Users },
  { id: "economics", label: "Unit Economics", icon: Calculator },
  { id: "roadmap", label: "Launch Roadmap", icon: CalendarCheck },
];

interface ReportNavTabsProps {
  activeTab: ReportTabId;
  onChangeTab: (tab: ReportTabId) => void;
}

export function ReportNavTabs({ activeTab, onChangeTab }: ReportNavTabsProps) {
  const tabsListRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent, currentIndex: number) => {
    let nextIndex = currentIndex;
    if (e.key === "ArrowRight") {
      nextIndex = (currentIndex + 1) % TABS.length;
    } else if (e.key === "ArrowLeft") {
      nextIndex = (currentIndex - 1 + TABS.length) % TABS.length;
    } else {
      return;
    }
    e.preventDefault();
    const nextTab = TABS[nextIndex];
    onChangeTab(nextTab.id);

    // Focus the target tab button
    const buttons = tabsListRef.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]');
    buttons?.[nextIndex]?.focus();
  };

  return (
    <div className="w-full border-b border-slate-800 mb-6 overflow-x-auto">
      <div
        ref={tabsListRef}
        role="tablist"
        aria-label="Venture Dossier Sections"
        className="flex items-center gap-1 min-w-max pb-px"
      >
        {TABS.map((tab, idx) => {
          const isActive = tab.id === activeTab;
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              role="tab"
              id={`tab-${tab.id}`}
              aria-controls={`tabpanel-${tab.id}`}
              aria-selected={isActive}
              tabIndex={isActive ? 0 : -1}
              onClick={() => onChangeTab(tab.id)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              className={`flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-semibold border-b-2 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-t-lg ${
                isActive
                  ? "border-emerald-400 text-emerald-400 bg-emerald-500/5 font-bold"
                  : "border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-700"
              }`}
            >
              <Icon
                className={`w-4 h-4 ${
                  isActive ? "text-emerald-400" : "text-slate-400"
                }`}
              />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
