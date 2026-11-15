"use client";

import React, { useEffect } from "react";
import { X, Sparkles, ArrowRight, Zap } from "lucide-react";
import { SHOWCASE_PRESETS, type ShowcasePreset } from "@/lib/presets/showcase-ventures";

interface PresetsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPreset: (preset: ShowcasePreset) => void;
}

export function PresetsModal({
  isOpen,
  onClose,
  onSelectPreset,
}: PresetsModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-150"
      role="dialog"
      aria-modal="true"
      aria-labelledby="presets-modal-title"
    >
      <div className="w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8 relative transition-colors">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#ecfdf5] dark:bg-[#064e3b]/40 border border-[#a7f3d0] dark:border-[#065f46] flex items-center justify-center">
              <Zap className="w-4 h-4 text-[#059669] dark:text-[#34d399]" />
            </div>
            <div>
              <h2 id="presets-modal-title" className="text-lg font-bold text-[#0f172a] dark:text-white">
                Verified Venture Presets
              </h2>
              <p className="text-xs text-[#64748b] dark:text-slate-400">
                Instant pre-compiled dossiers and benchmark architectures
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-3.5">
          {SHOWCASE_PRESETS.map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => {
                onSelectPreset(preset);
                onClose();
              }}
              className="p-4 rounded-2xl bg-[#f8fafc] dark:bg-[#090d16] hover:bg-[#f0fdf4] dark:hover:bg-[#064e3b]/20 border border-slate-200 dark:border-slate-800 hover:border-[#86efac] dark:hover:border-emerald-600 text-left transition-all group flex flex-col gap-1.5 focus:outline-hidden cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#e2f7ed] dark:bg-[#064e3b]/40 text-[#059669] dark:text-[#34d399] border border-[#a7f3d0]/60 dark:border-[#065f46] uppercase tracking-wider">
                  {preset.badge}
                </span>
                <span className="text-xs text-[#059669] dark:text-[#34d399] font-semibold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  Load Dossier <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
              <h3 className="text-sm font-bold text-[#0f172a] dark:text-white group-hover:text-[#059669] dark:group-hover:text-[#34d399] transition-colors">
                {preset.title}
              </h3>
              <p className="text-xs text-[#64748b] dark:text-slate-400 leading-relaxed line-clamp-2">
                {preset.tagline}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

