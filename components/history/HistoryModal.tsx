"use client";

import React, { useState, useEffect } from "react";
import { X, History, Trash2, ArrowRight, Download, Search } from "lucide-react";
import type { VentureDossier } from "@/lib/types/domain";
import { dossierToInvestmentMemo } from "@/lib/export/markdown";

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectDossier: (dossier: VentureDossier) => void;
  savedDossiers: VentureDossier[];
  onDeleteDossier: (id: string) => void;
}

export function HistoryModal({
  isOpen,
  onClose,
  onSelectDossier,
  savedDossiers,
  onDeleteDossier,
}: HistoryModalProps) {
  const [searchTerm, setSearchTerm] = useState("");

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filtered = savedDossiers.filter((d) => {
    const term = searchTerm.toLowerCase();
    return (
      d.framing.ventureName.toLowerCase().includes(term) ||
      d.framing.category.toLowerCase().includes(term) ||
      d.framing.oneLiner.toLowerCase().includes(term)
    );
  });

  const handleDownloadMemo = (dossier: VentureDossier, e: React.MouseEvent) => {
    e.stopPropagation();
    const md = dossierToInvestmentMemo(dossier);
    const blob = new Blob([md], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${dossier.framing.ventureName.toLowerCase().replace(/\s+/g, "-")}-memo.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="history-modal-title"
      className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl rounded-2xl bg-slate-950 border border-slate-800 shadow-2xl p-6 sm:p-8 z-10 space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <History className="w-4 h-4" />
            </div>
            <div>
              <h2 id="history-modal-title" className="text-base font-bold text-white">
                Saved Venture Dossiers
              </h2>
              <p className="text-xs text-slate-400">
                Stored privately in your browser ({savedDossiers.length} saved)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            aria-label="Close Saved History"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Filter */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search saved dossiers by name, vertical, or keyword..."
            className="w-full rounded-xl bg-slate-900 border border-slate-800 pl-9 pr-4 py-2.5 text-xs text-slate-100 placeholder:text-slate-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
          />
        </div>

        {/* Dossiers List */}
        <div className="max-h-96 overflow-y-auto space-y-3 pr-1">
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-slate-400 text-xs">
              {searchTerm ? "No saved dossiers matched your search query." : "No saved venture dossiers found yet. Run an analysis or explore presets."}
            </div>
          ) : (
            filtered.map((d) => (
              <div
                key={d.id}
                onClick={() => {
                  onSelectDossier(d);
                  onClose();
                }}
                className="p-4 rounded-xl bg-slate-900/80 hover:bg-slate-850 border border-slate-800/80 hover:border-slate-700 transition-all cursor-pointer flex items-center justify-between gap-4 group"
              >
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-white group-hover:text-emerald-400 truncate">
                      {d.framing.ventureName}
                    </span>
                    <span className="text-[10px] px-2 py-0.2 rounded bg-slate-800 text-slate-400 border border-slate-700 font-mono">
                      {d.framing.category}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 line-clamp-1">
                    {d.framing.oneLiner}
                  </p>
                  <div className="text-[10px] text-slate-400 font-mono">
                    {new Date(d.createdAt).toLocaleDateString()} • TAM {d.market.tam.valueFormatted}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {/* Viability score */}
                  <span className="font-mono text-xs font-bold px-2 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    {d.validation.overallViabilityScore}/100
                  </span>

                  {/* Download */}
                  <button
                    onClick={(e) => handleDownloadMemo(d, e)}
                    className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
                    title="Download Memo"
                    aria-label={`Download memo for ${d.framing.ventureName}`}
                  >
                    <Download className="w-3.5 h-3.5" />
                  </button>

                  {/* Delete */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteDossier(d.id);
                    }}
                    className="p-2 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-slate-800"
                    title="Delete dossier"
                    aria-label={`Delete ${d.framing.ventureName}`}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>

                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-400 transition-transform group-hover:translate-x-0.5" />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
