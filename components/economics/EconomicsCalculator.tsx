"use client";

import React, { useState } from "react";
import { DollarSign, TrendingUp, Clock, Percent } from "lucide-react";
import type { ValidationOutput } from "@/lib/types/domain";

interface EconomicsCalculatorProps {
  initialEconomics: ValidationOutput["unitEconomicsProjection"];
}

export function EconomicsCalculator({ initialEconomics }: EconomicsCalculatorProps) {
  // Parse baseline heuristics
  const [aspMonthly, setAspMonthly] = useState<number>(120);
  const [cac, setCac] = useState<number>(1200);
  const [monthlyChurnPercent, setMonthlyChurnPercent] = useState<number>(2.5);
  const [grossMarginPercent, setGrossMarginPercent] = useState<number>(
    initialEconomics.grossMarginPercent || 80
  );

  // Dynamic calculations
  const grossMarginDecimal = grossMarginPercent / 100;
  const churnDecimal = Math.max(0.005, monthlyChurnPercent / 100);
  const avgLifetimeMonths = Math.round(1 / churnDecimal);
  const calculatedLtv = Math.round(aspMonthly * grossMarginDecimal * avgLifetimeMonths);
  const calculatedLtvCac = parseFloat((calculatedLtv / Math.max(1, cac)).toFixed(2));
  const paybackMonths = parseFloat(
    (cac / Math.max(1, aspMonthly * grossMarginDecimal)).toFixed(1)
  );

  const isHealthyRatio = calculatedLtvCac >= 3.0;
  const isExceptional = calculatedLtvCac >= 5.0;

  return (
    <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
        <div>
          <h3 className="text-sm font-bold text-white tracking-wide uppercase flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-emerald-400" />
            Dynamic Unit Economics & LTV/CAC Simulator
          </h3>
          <p className="text-xs text-slate-400">
            Slide parameters to stress-test your cash payback horizon and pricing resilience
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold border ${
              isExceptional
                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                : isHealthyRatio
                ? "bg-teal-500/10 text-teal-400 border-teal-500/30"
                : "bg-amber-500/10 text-amber-400 border-amber-500/30"
            }`}
          >
            {isExceptional
              ? "🚀 Exceptional Scalability"
              : isHealthyRatio
              ? "✅ Venture Viable"
              : "⚠️ High Churn / Margin Strain"}
          </span>
        </div>
      </div>

      {/* Interactive Sliders */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* ASP / ACV Slider */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-300 font-medium">Monthly ASP / ACV</span>
            <span className="font-mono font-bold text-emerald-400">
              ${aspMonthly}/mo
            </span>
          </div>
          <input
            type="range"
            min={20}
            max={1500}
            step={10}
            value={aspMonthly}
            onChange={(e) => setAspMonthly(Number(e.target.value))}
            className="w-full accent-emerald-500 cursor-pointer"
            aria-label="Monthly Average Selling Price"
          />
          <div className="flex justify-between text-[10px] text-slate-400">
            <span>$20</span>
            <span>$750</span>
            <span>$1,500</span>
          </div>
        </div>

        {/* CAC Slider */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-300 font-medium">Acquisition Cost (CAC)</span>
            <span className="font-mono font-bold text-emerald-400">${cac}</span>
          </div>
          <input
            type="range"
            min={100}
            max={5000}
            step={50}
            value={cac}
            onChange={(e) => setCac(Number(e.target.value))}
            className="w-full accent-emerald-500 cursor-pointer"
            aria-label="Customer Acquisition Cost"
          />
          <div className="flex justify-between text-[10px] text-slate-400">
            <span>$100</span>
            <span>$2,500</span>
            <span>$5,000</span>
          </div>
        </div>

        {/* Churn Slider */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-300 font-medium">Monthly Churn %</span>
            <span className="font-mono font-bold text-emerald-400">
              {monthlyChurnPercent}%
            </span>
          </div>
          <input
            type="range"
            min={0.5}
            max={10}
            step={0.5}
            value={monthlyChurnPercent}
            onChange={(e) => setMonthlyChurnPercent(Number(e.target.value))}
            className="w-full accent-emerald-500 cursor-pointer"
            aria-label="Monthly Customer Churn Rate"
          />
          <div className="flex justify-between text-[10px] text-slate-400">
            <span>0.5% (Elite)</span>
            <span>5%</span>
            <span>10% (Dangerous)</span>
          </div>
        </div>

        {/* Gross Margin Slider */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-300 font-medium">Gross Margin %</span>
            <span className="font-mono font-bold text-emerald-400">
              {grossMarginPercent}%
            </span>
          </div>
          <input
            type="range"
            min={30}
            max={95}
            step={1}
            value={grossMarginPercent}
            onChange={(e) => setGrossMarginPercent(Number(e.target.value))}
            className="w-full accent-emerald-500 cursor-pointer"
            aria-label="Gross Profit Margin"
          />
          <div className="flex justify-between text-[10px] text-slate-400">
            <span>30%</span>
            <span>70%</span>
            <span>95%</span>
          </div>
        </div>
      </div>

      {/* Calculated Output Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {/* LTV */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
            <span>Simulated LTV</span>
          </div>
          <div className="text-xl font-mono font-extrabold text-white">
            ${calculatedLtv.toLocaleString()}
          </div>
          <div className="text-[10px] text-slate-400 mt-1">
            ~{avgLifetimeMonths} mo retention
          </div>
        </div>

        {/* LTV/CAC */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
            <DollarSign className="w-3.5 h-3.5 text-teal-400" />
            <span>LTV / CAC Ratio</span>
          </div>
          <div
            className={`text-xl font-mono font-extrabold ${
              isHealthyRatio ? "text-emerald-400" : "text-amber-400"
            }`}
          >
            {calculatedLtvCac}x
          </div>
          <div className="text-[10px] text-slate-400 mt-1">
            Benchmark: &gt; 3.0x
          </div>
        </div>

        {/* Payback Horizon */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
            <Clock className="w-3.5 h-3.5 text-cyan-400" />
            <span>Cash Payback</span>
          </div>
          <div className="text-xl font-mono font-extrabold text-white">
            {paybackMonths} mo
          </div>
          <div className="text-[10px] text-slate-400 mt-1">
            Target: &lt; 12 mo
          </div>
        </div>

        {/* Gross Profit Per Acquired Customer */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
            <Percent className="w-3.5 h-3.5 text-indigo-400" />
            <span>Net Customer Margin</span>
          </div>
          <div className="text-xl font-mono font-extrabold text-white">
            ${Math.max(0, calculatedLtv - cac).toLocaleString()}
          </div>
          <div className="text-[10px] text-slate-400 mt-1">
            Gross profit after CAC
          </div>
        </div>
      </div>
    </div>
  );
}
