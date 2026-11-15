import React from "react";
import { ShieldCheck, Cpu, Zap, Lock } from "lucide-react";

export function Footer() {
  return (
    <footer
      role="contentinfo"
      className="w-full border-t border-slate-800/80 bg-slate-950/90 py-8 px-4 sm:px-6 lg:px-8 text-xs text-slate-400 mt-16"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col gap-1.5 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 text-slate-300 font-medium">
            <span>VentureArchitect</span>
            <span className="text-slate-600">•</span>
            <span className="text-emerald-400">Theme PS08: Startup Co-Pilot Agent</span>
          </div>
          <p className="text-slate-400 max-w-xl">
            Autonomous multi-agent orchestration for early-stage founders. Real-time market sizing, competitor recon, customer profiling, viability stress-testing, and 90-day launch execution.
          </p>
        </div>

        {/* Feature Badges */}
        <div className="flex flex-wrap items-center justify-center gap-3 text-[11px]">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-300">
            <Cpu className="w-3.5 h-3.5 text-emerald-400" />
            4-Stage Multi-Agent DAG
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-300">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            Sub-50ms Crypto LRU Cache
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-300">
            <Lock className="w-3.5 h-3.5 text-cyan-400" />
            Zero-Cloud DB Privacy
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-300">
            <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
            OWASP & Injection Guarded
          </span>
        </div>
      </div>
    </footer>
  );
}
