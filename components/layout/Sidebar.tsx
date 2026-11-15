"use client";

import React from "react";
import {
  Home,
  BarChart2,
  Lightbulb,
  BookOpen,
  Settings,
  ChevronDown,
  ArrowRight,
} from "lucide-react";
import { RocketIllustration } from "../ui/RocketIllustration";

export type NavTab = "home" | "dashboard" | "insights" | "guide" | "settings";

interface SidebarProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  onGetStarted?: () => void;
  className?: string;
  onCloseMobile?: () => void;
}

export function Sidebar({
  activeTab = "home",
  onSelectTab,
  onGetStarted,
  className = "",
  onCloseMobile,
}: SidebarProps) {
  const navItems = [
    { id: "home" as NavTab, label: "Home", icon: Home },
    { id: "dashboard" as NavTab, label: "Dashboard", icon: BarChart2 },
    { id: "insights" as NavTab, label: "Insights", icon: Lightbulb },
    { id: "guide" as NavTab, label: "Guide", icon: BookOpen },
    { id: "settings" as NavTab, label: "Settings", icon: Settings },
  ];

  const handleNavClick = (id: NavTab) => {
    onSelectTab(id);
    if (onCloseMobile) onCloseMobile();
  };

  return (
    <aside
      className={`w-64 min-w-[256px] h-screen sticky top-0 bg-white dark:bg-[#0f172a] border-r border-[#e8f1ec] dark:border-slate-800 flex flex-col justify-between p-5 z-30 select-none transition-colors ${className}`}
      aria-label="Application Navigation"
    >
      {/* Top Section: Brand Logo & Navigation */}
      <div className="flex flex-col gap-6">
        {/* Brand Logo Header */}
        <button
          type="button"
          onClick={() => handleNavClick("home")}
          className="flex items-center gap-3 text-left focus:outline-hidden group"
          aria-label="VentureArchitect Homepage"
        >
          {/* Stylized Faceted Emerald 'V' Logo */}
          <div className="w-10 h-10 shrink-0">
            <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              {/* Left Facet (Deep Emerald) */}
              <path
                d="M8 8 L18 34 L21 34 L14 8 Z"
                fill="#047857"
              />
              {/* Right Facet (Bright Emerald / Mint) */}
              <path
                d="M21 34 L32 8 L25 8 L17.5 28 Z"
                fill="#10b981"
              />
              {/* Center Fold Accent */}
              <path
                d="M17.5 28 L21 34 L18 34 Z"
                fill="#065f46"
              />
            </svg>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center text-lg leading-tight font-extrabold tracking-tight">
              <span className="text-[#0f172a] dark:text-white">Venture</span>
              <span className="text-[#059669]">Architect</span>
            </div>
            <span className="text-[11px] text-[#64748b] dark:text-slate-400 font-medium tracking-wide mt-0.5">
              Plan. Validate. Build.
            </span>
          </div>
        </button>

        {/* Primary Navigation Menu */}
        <nav className="flex flex-col gap-1.5" aria-label="Main Navigation">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors text-left focus:outline-hidden ${
                  isActive
                    ? "bg-[#e8f8f2] dark:bg-[#064e3b]/50 text-[#059669] dark:text-[#34d399]"
                    : "text-[#475569] dark:text-slate-400 hover:text-[#0f172a] dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/60 font-medium"
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                <Icon
                  className={`w-5 h-5 shrink-0 ${
                    isActive ? "text-[#059669] dark:text-[#34d399]" : "text-[#64748b] dark:text-slate-400"
                  }`}
                />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Middle-to-Bottom Section: Promo / CTA Card */}
      <div className="my-auto pt-4 pb-2">
        <div className="rounded-2xl bg-gradient-to-b from-[#eaf8f1] to-[#ddf4e9] dark:from-[#0d2219] dark:to-[#071710] border border-[#c3eed7] dark:border-[#065f46] p-4 flex flex-col items-center text-center shadow-xs relative overflow-hidden transition-colors">
          {/* 3D Rocket Illustration */}
          <RocketIllustration className="w-24 h-24 mb-1" />

          {/* Card Text */}
          <h3 className="font-bold text-[#0f172a] dark:text-white text-sm leading-snug">
            Turn Your Idea Into Impact
          </h3>
          <p className="text-xs text-[#64748b] dark:text-slate-400 mt-1 whitespace-pre-line leading-relaxed font-normal">
            Validate smarter.{"\n"}Build better.
          </p>

          {/* CTA Pill Button */}
          <button
            type="button"
            onClick={() => {
              if (onGetStarted) {
                onGetStarted();
              } else {
                handleNavClick("home");
              }
            }}
            className="mt-3.5 px-4 py-2 rounded-full bg-[#059669] hover:bg-[#047857] text-white font-semibold text-xs inline-flex items-center gap-1.5 shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98] focus:outline-hidden cursor-pointer"
          >
            <span>Get Started</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Bottom Section: User Profile Row */}
      <div className="pt-3 border-t border-[#edf4f0] dark:border-slate-800 transition-colors">
        <button
          type="button"
          onClick={() => handleNavClick("settings")}
          className="w-full flex items-center gap-3 p-1.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors text-left focus:outline-hidden group cursor-pointer"
          aria-label="User Profile: Pawan Vishwakarma"
        >
          {/* Deep Forest Green Circle Avatar */}
          <div className="w-9 h-9 rounded-full bg-[#064e3b] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
            PV
          </div>

          <div className="flex flex-col min-w-0 flex-1">
            <span className="text-sm font-semibold text-[#0f172a] dark:text-white truncate group-hover:text-[#059669] dark:group-hover:text-[#34d399] transition-colors">
              Pawan Vishwakarma
            </span>
          </div>

          <ChevronDown className="w-4 h-4 text-slate-400 shrink-0 ml-auto" />
        </button>
      </div>
    </aside>
  );
}
