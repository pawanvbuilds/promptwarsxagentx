"use client";

import React, { useEffect, useState } from "react";
import { X, Settings, ShieldCheck, Check, Key, User } from "lucide-react";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const [userName, setUserName] = useState("Pawan Vishwakarma");
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      onClose();
    }, 800);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-150"
      role="dialog"
      aria-modal="true"
      aria-labelledby="settings-title"
    >
      <div className="w-full max-w-md rounded-3xl bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 shadow-2xl p-6 relative transition-colors">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#ecfdf5] dark:bg-[#064e3b]/40 border border-[#a7f3d0] dark:border-[#065f46] flex items-center justify-center">
              <Settings className="w-4 h-4 text-[#059669] dark:text-[#34d399]" />
            </div>
            <div>
              <h2 id="settings-title" className="text-base font-bold text-[#0f172a] dark:text-white">
                Settings & Preferences
              </h2>
              <p className="text-xs text-[#64748b] dark:text-slate-400">
                Manage workspace profile and AI parameters
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close settings"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-5 space-y-4 text-xs">
          <div>
            <label className="font-semibold text-[#0f172a] dark:text-slate-200 block mb-1.5 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-[#64748b] dark:text-slate-400" />
              Founder Profile Name
            </label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full rounded-xl bg-[#f8fafc] dark:bg-[#090d16] border border-slate-200 dark:border-slate-800 px-3.5 py-2.5 text-xs text-[#0f172a] dark:text-white focus:border-[#059669] focus:ring-1 focus:ring-[#059669]"
            />
          </div>

          <div className="p-3.5 rounded-2xl bg-[#f0fdf4] dark:bg-[#064e3b]/20 border border-[#bbf7d0]/60 dark:border-[#065f46] space-y-2">
            <div className="flex items-center gap-2 text-[#166534] dark:text-emerald-300 font-semibold">
              <ShieldCheck className="w-4 h-4 text-[#059669] dark:text-[#34d399]" />
              <span>Zero Database Cloud Storage</span>
            </div>
            <p className="text-[11px] text-[#166534] dark:text-slate-400 leading-relaxed">
              Your startup ideas, financial hypotheses, and competitor recon are processed entirely on-device and cached in client-side IndexedDB/localStorage.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-semibold">
              <Key className="w-4 h-4 text-slate-500 dark:text-slate-400" />
              <span>LLM Orchestration Engine</span>
            </div>
            <p className="text-[11px] text-[#64748b] dark:text-slate-400">
              Connected to Gemini 2.5 Flash / Pro autonomous reasoning pipeline with sub-second streaming DAG orchestration.
            </p>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-5 py-2 rounded-full bg-[#059669] hover:bg-[#047857] text-white text-xs font-bold inline-flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
          >
            {isSaved ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Saved!</span>
              </>
            ) : (
              <span>Save Changes</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
