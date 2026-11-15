"use client";

import React, { useState, useSyncExternalStore } from "react";
import { Zap, Bell, Moon, Sun, Menu, X, Sparkles } from "lucide-react";

interface TopHeaderProps {
  onToggleSidebar?: () => void;
  onOpenNotifications?: () => void;
  onSelectPresetModal?: () => void;
}

type Theme = "dark" | "light";

function subscribeToTheme(callback: () => void) {
  window.addEventListener("va_theme_change", callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener("va_theme_change", callback);
    window.removeEventListener("storage", callback);
  };
}

function getThemeSnapshot(): Theme {
  return document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
}

function getServerThemeSnapshot(): Theme {
  return "light";
}

export function TopHeader({
  onToggleSidebar,
  onOpenNotifications,
  onSelectPresetModal,
}: TopHeaderProps) {
  const theme = useSyncExternalStore(subscribeToTheme, getThemeSnapshot, getServerThemeSnapshot);
  const [hasNotification, setHasNotification] = useState(true);
  const [showNotificationToast, setShowNotificationToast] = useState(false);

  const toggleTheme = () => {
    const nextTheme: Theme = theme === "dark" ? "light" : "dark";
    try {
      localStorage.setItem("va_theme", nextTheme);
    } catch {
      // safe fallback
    }
    document.documentElement.setAttribute("data-theme", nextTheme);
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
    document.documentElement.classList.toggle("light", nextTheme === "light");
    window.dispatchEvent(new Event("va_theme_change"));
  };

  const handleBellClick = () => {
    setHasNotification(false);
    setShowNotificationToast((prev) => !prev);
    if (onOpenNotifications) onOpenNotifications();
  };

  return (
    <header className="w-full h-16 px-4 sm:px-8 flex items-center justify-between select-none z-20">
      {/* Mobile Sidebar Toggle Button */}
      <div className="flex items-center gap-2 lg:hidden">
        <button
          type="button"
          onClick={onToggleSidebar}
          className="p-2 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-hidden"
          aria-label="Toggle navigation menu"
        >
          <Menu className="w-6 h-6 text-[#0f172a] dark:text-white" />
        </button>
        <span className="font-extrabold text-[#0f172a] dark:text-white text-base">
          Venture<span className="text-[#059669]">Architect</span>
        </span>
      </div>

      {/* Spacer for desktop layout */}
      <div className="hidden lg:block" />

      {/* Right-Aligned Action Badges & Controls */}
      <div className="flex items-center gap-3 sm:gap-4 ml-auto">
        {/* 2x Faster Insights Pill Badge */}
        <button
          type="button"
          onClick={onSelectPresetModal}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f0fdf4] dark:bg-[#064e3b]/30 border border-[#bbf7d0] dark:border-[#065f46] hover:border-[#86efac] dark:hover:border-emerald-500 text-xs font-semibold text-[#0f172a] dark:text-white shadow-2xs hover:shadow-xs transition-all focus:outline-hidden cursor-pointer"
          title="Browse fast-tracked sample cases"
        >
          <Zap className="w-3.5 h-3.5 text-[#059669] dark:text-[#34d399] fill-[#059669]/20" />
          <span>2x Faster Insights</span>
        </button>

        {/* Vertical Divider */}
        <div className="h-5 w-[1px] bg-slate-200 dark:bg-slate-800 transition-colors" aria-hidden="true" />

        {/* Notification Bell */}
        <div className="relative">
          <button
            type="button"
            onClick={handleBellClick}
            className="p-2 rounded-full text-[#334155] dark:text-slate-300 hover:text-[#0f172a] dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors relative focus:outline-hidden cursor-pointer"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
            {hasNotification && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white dark:ring-slate-900" />
            )}
          </button>

          {/* Simple Dropdown Notification Popover */}
          {showNotificationToast && (
            <div className="absolute right-0 mt-2 w-72 rounded-2xl bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 shadow-xl p-3 z-50 animate-in fade-in zoom-in-95 duration-100">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800 mb-2">
                <span className="text-xs font-bold text-[#0f172a] dark:text-white">Updates & Signals</span>
                <button
                  onClick={() => setShowNotificationToast(false)}
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 text-xs cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="flex items-start gap-2.5 p-2 rounded-xl bg-[#f0fdf4] dark:bg-[#064e3b]/20 text-xs">
                <Sparkles className="w-4 h-4 text-[#059669] dark:text-[#34d399] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-[#0f172a] dark:text-white">Autonomous Engine Ready</p>
                  <p className="text-[#64748b] dark:text-slate-400 mt-0.5 text-[11px]">
                    Six multi-agent specialists initialized with real-time web grounding.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Theme Toggle Button */}
        <button
          type="button"
          onClick={toggleTheme}
          className="p-2 rounded-full text-[#334155] dark:text-slate-300 hover:text-[#0f172a] dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-hidden cursor-pointer"
          aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
        >
          {theme === "dark" ? (
            <Sun className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-amber-400" />
          ) : (
            <Moon className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
          )}
        </button>
      </div>
    </header>
  );
}

