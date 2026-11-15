"use client";

import React from "react";
import { Sparkles, Layers, History, PlusCircle, Sun, Moon } from "lucide-react";
import { SHOWCASE_PRESETS, type ShowcasePreset } from "@/lib/presets/showcase-ventures";

interface NavbarProps {
  onSelectPreset: (preset: ShowcasePreset) => void;
  onOpenHistory: () => void;
  onNewAnalysis: () => void;
  historyCount: number;
}

function subscribeTheme(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function getThemeSnapshot(): "dark" | "light" {
  if (typeof window === "undefined") return "dark";
  return (localStorage.getItem("va_theme") as "dark" | "light") || "dark";
}

function getServerThemeSnapshot(): "dark" | "light" {
  return "dark";
}

export function Navbar({
  onSelectPreset,
  onOpenHistory,
  onNewAnalysis,
  historyCount,
}: NavbarProps) {
  const theme = React.useSyncExternalStore(
    subscribeTheme,
    getThemeSnapshot,
    getServerThemeSnapshot
  );
  const [isPresetsOpen, setIsPresetsOpen] = React.useState(false);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    try {
      localStorage.setItem("va_theme", nextTheme);
    } catch {
      // Safe fallback
    }
    document.documentElement.setAttribute("data-theme", nextTheme);
    if (nextTheme === "light") {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <header
      role="banner"
      className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-slate-800/80 bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-md"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand / Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={onNewAnalysis}
            className="flex items-center gap-2.5 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-lg p-1"
            aria-label="VentureArchitect Homepage"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-slate-950 shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 fill-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg tracking-tight text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  VentureArchitect
                </span>
                <span className="px-1.5 py-0.5 text-[10px] font-semibold tracking-wider uppercase rounded bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20">
                  PS08
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">
                Autonomous Startup Co-Pilot Engine
              </p>
            </div>
          </button>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Showcase Presets Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsPresetsOpen(!isPresetsOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-lg transition-colors focus:ring-2 focus:ring-emerald-500"
              aria-expanded={isPresetsOpen}
              aria-haspopup="true"
              aria-label="Browse Sample Ventures"
            >
              <Layers className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span className="hidden sm:inline">Showcase</span> Ventures
            </button>

            {isPresetsOpen && (
              <div
                className="absolute right-0 mt-2 w-72 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-100"
                role="menu"
              >
                <div className="px-2 py-1.5 text-[11px] font-semibold tracking-wider text-slate-500 dark:text-slate-400 uppercase">
                  Pre-Loaded Case Studies
                </div>
                {SHOWCASE_PRESETS.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => {
                      onSelectPreset(preset);
                      setIsPresetsOpen(false);
                    }}
                    className="w-full text-left p-2.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors group flex flex-col gap-1"
                    role="menuitem"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-xs text-slate-800 dark:text-slate-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                        {preset.title}
                      </span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-300 dark:border-slate-700">
                        {preset.badge}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
                      {preset.tagline}
                    </p>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* History Button */}
          <button
            onClick={onOpenHistory}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-lg transition-colors focus:ring-2 focus:ring-emerald-500"
            aria-label={historyCount > 0 ? `View saved history (${historyCount} saved)` : "View saved history"}
          >
            <History className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
            <span className="hidden sm:inline">Dossiers</span>
            {historyCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30">
                {historyCount}
              </span>
            )}
          </button>

          {/* New Venture CTA */}
          <button
            onClick={onNewAnalysis}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg shadow-sm shadow-emerald-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] focus:ring-2 focus:ring-white"
            aria-label="Start New Venture Validation"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>New Co-Pilot</span>
          </button>

          {/* Dark / Light Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-lg transition-colors focus:ring-2 focus:ring-emerald-500"
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
