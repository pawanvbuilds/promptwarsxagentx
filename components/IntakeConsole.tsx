"use client";

import React, { useState } from "react";
import {
  Sparkles,
  Zap,
  ShieldCheck,
  BarChart3,
  Globe,
  Briefcase,
  Users,
  ChevronDown,
  Info,
  ArrowRight,
  Target,
  TrendingUp,
  ClipboardCheck,
  CheckCircle2,
  Lightbulb,
} from "lucide-react";
import type { FounderInput } from "@/lib/types/domain";
import { HeroIllustration3D } from "./ui/HeroIllustration3D";

interface IntakeConsoleProps {
  onSubmit: (input: FounderInput) => void;
  isLoading: boolean;
  initialValues?: Partial<FounderInput>;
}

export function IntakeConsole({
  onSubmit,
  isLoading,
  initialValues,
}: IntakeConsoleProps) {
  const [idea, setIdea] = useState(initialValues?.idea || "");
  const [region, setRegion] = useState(initialValues?.region || "Global");
  const [businessModel, setBusinessModel] = useState(
    initialValues?.businessModel || "B2B SaaS (Per-Seat)"
  );
  const [targetCustomer, setTargetCustomer] = useState(
    initialValues?.targetCustomer || "Students"
  );
  const [stage, setStage] = useState<"Idea" | "MVP" | "Pre-Seed" | "Seed" | "Series A">(
    initialValues?.stage || "MVP"
  );
  const [error, setError] = useState<string | null>(null);

  // Submit on Enter (unless Shift is pressed for multiline)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!idea.trim() || idea.trim().length < 10) {
      setError("Please describe your startup concept in at least 10 characters.");
      return;
    }
    setError(null);
    onSubmit({
      idea: idea.trim(),
      region,
      businessModel,
      targetCustomer,
      stage,
    });
  };

  return (
    <section aria-labelledby="hero-title" className="w-full max-w-6xl mx-auto px-4 sm:px-8 py-2 pb-12 transition-colors">
      {/* ================================================================= */}
      {/* 1. HERO SECTION                                                   */}
      {/* ================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-2 pb-6">
        {/* Left Column: Headline, Description & Feature Badges */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          {/* Badge: AI-Powered Startup Validation */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#dcfce7] dark:bg-emerald-950/60 border border-[#bbf7d0]/80 dark:border-emerald-800/60 text-[#15803d] dark:text-emerald-300 text-xs font-semibold mb-4 shadow-2xs transition-colors">
            <span className="w-2 h-2 rounded-full bg-[#16a34a] animate-pulse" />
            <span>AI-Powered Startup Validation</span>
          </div>

          {/* Main Headline */}
          <h1
            id="hero-title"
            className="text-3xl sm:text-4xl lg:text-[46px] font-black text-[#0f172a] dark:text-white tracking-tight leading-[1.12] transition-colors"
          >
            Architect & Validate<br />
            Your Startup in<br />
            <span className="text-[#059669] dark:text-[#10b981]">60 Seconds</span>
          </h1>

          {/* Subtitle Description */}
          <p className="text-[#475569] dark:text-slate-300 text-sm sm:text-base font-normal max-w-xl mt-4 leading-relaxed transition-colors">
            Six autonomous AI specialists to construct your thesis with real-time
            research, competitive analysis, customer insights, and a 30-day execution roadmap.
          </p>

          {/* 3 Value Proposition Pill Badges */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 mt-6">
            {/* Badge 1: Instant Insights */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800 text-xs font-medium text-[#334155] dark:text-slate-300 shadow-2xs hover:border-[#86efac] dark:hover:border-emerald-600 transition-colors">
              <Zap className="w-3.5 h-3.5 text-[#059669] dark:text-[#34d399] fill-[#059669]/15" />
              <span>Instant Insights</span>
            </div>

            {/* Badge 2: Data-Driven */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800 text-xs font-medium text-[#334155] dark:text-slate-300 shadow-2xs hover:border-[#86efac] dark:hover:border-emerald-600 transition-colors">
              <ShieldCheck className="w-3.5 h-3.5 text-[#059669] dark:text-[#34d399]" />
              <span>Data-Driven</span>
            </div>

            {/* Badge 3: Actionable Plan */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800 text-xs font-medium text-[#334155] dark:text-slate-300 shadow-2xs hover:border-[#86efac] dark:hover:border-emerald-600 transition-colors">
              <BarChart3 className="w-3.5 h-3.5 text-[#059669] dark:text-[#34d399]" />
              <span>Actionable Plan</span>
            </div>
          </div>
        </div>

        {/* Right Column: 3D Isometric Screen & Glowing Lightbulb */}
        <div className="lg:col-span-5 flex items-center justify-center lg:justify-end">
          <HeroIllustration3D />
        </div>
      </div>

      {/* ================================================================= */}
      {/* 2. STARTUP CONCEPT & WORKFLOW INPUT CARD                          */}
      {/* ================================================================= */}
      <form
        onSubmit={handleSubmit}
        className="rounded-[26px] bg-white dark:bg-[#0f172a] border border-[#e2e8f0]/90 dark:border-slate-800 p-6 sm:p-8 shadow-[0_12px_36px_-6px_rgba(0,0,0,0.05),0_2px_8px_-1px_rgba(0,0,0,0.03)] dark:shadow-[0_12px_36px_-6px_rgba(0,0,0,0.4)] relative mt-2 transition-colors"
      >
        {/* Card Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2">
            {/* Green 4-Point Sparkle Icon */}
            <Sparkles className="w-4 h-4 text-[#059669] dark:text-[#34d399] fill-[#059669] dark:fill-[#34d399]" />
            <h2 className="text-base sm:text-lg font-bold text-[#0f172a] dark:text-white">
              Startup Concept & Core Workflow
            </h2>
          </div>

          {/* Character Counter & Enter Hint Pill Badge */}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100/80 dark:bg-slate-800/90 border border-slate-200/50 dark:border-slate-700/60 text-xs text-[#64748b] dark:text-slate-300 font-medium shadow-2xs transition-colors">
            <span className="w-2 h-2 rounded-full bg-[#10b981]" />
            <span>
              {idea.length}/2500 characters • Hit Enter to submit
            </span>
          </div>
        </div>

        {/* Textarea Input Container */}
        <div className="relative rounded-2xl bg-[#f8fafc]/80 dark:bg-[#090d16] border border-[#e2e8f0] dark:border-slate-800 focus-within:border-[#059669] focus-within:ring-2 focus-within:ring-[#059669]/15 p-3.5 transition-all">
          <div className="flex items-start gap-2.5">
            <Lightbulb className="w-4 h-4 text-[#94a3b8] dark:text-slate-500 mt-1 shrink-0" aria-hidden="true" />
            <textarea
              id="startup-idea"
              name="startup-idea"
              rows={3}
              value={idea}
              onChange={(e) => {
                setIdea(e.target.value);
                if (error) setError(null);
              }}
              onKeyDown={handleKeyDown}
              placeholder="e.g. A platform to help students learn coding through interactive projects..."
              className="w-full bg-transparent border-0 p-0 text-sm sm:text-[15px] text-[#0f172a] dark:text-white placeholder:text-[#94a3b8] dark:placeholder:text-slate-500 focus:ring-0 focus:outline-hidden resize-y min-h-[70px] leading-relaxed"
              aria-describedby={error ? "idea-error" : undefined}
            />
          </div>
        </div>

        {error && (
          <p id="idea-error" className="mt-2 text-xs text-rose-500 font-medium">
            {error}
          </p>
        )}

        {/* Dropdown Select Controls Row (4 Columns) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mt-5">
          {/* 1. Target Geography */}
          <div>
            <label
              htmlFor="region-select"
              className="text-xs font-medium text-[#475569] dark:text-slate-300 flex items-center gap-1.5 mb-1.5"
            >
              <Globe className="w-3.5 h-3.5 text-[#64748b] dark:text-slate-400" />
              <span>Target Geography</span>
            </label>
            <div className="relative">
              <select
                id="region-select"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="w-full appearance-none rounded-xl bg-[#f8fafc]/90 dark:bg-[#090d16] border border-[#e2e8f0] dark:border-slate-800 px-3.5 py-2.5 pr-8 text-xs sm:text-sm font-semibold text-[#0f172a] dark:text-white focus:border-[#059669] focus:ring-1 focus:ring-[#059669] transition-all cursor-pointer"
              >
                <option value="Global">Global</option>
                <option value="North America">North America (US & Canada)</option>
                <option value="European Union">European Union & UK</option>
                <option value="Asia-Pacific">Asia-Pacific (APAC)</option>
                <option value="India">India & South Asia</option>
                <option value="Latin America">Latin America</option>
              </select>
              <ChevronDown className="w-4 h-4 text-[#64748b] dark:text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* 2. Business Model */}
          <div>
            <label
              htmlFor="business-model-select"
              className="text-xs font-medium text-[#475569] dark:text-slate-300 flex items-center gap-1.5 mb-1.5"
            >
              <Briefcase className="w-3.5 h-3.5 text-[#64748b] dark:text-slate-400" />
              <span>Business Model</span>
            </label>
            <div className="relative">
              <select
                id="business-model-select"
                value={businessModel}
                onChange={(e) => setBusinessModel(e.target.value)}
                className="w-full appearance-none rounded-xl bg-[#f8fafc]/90 dark:bg-[#090d16] border border-[#e2e8f0] dark:border-slate-800 px-3.5 py-2.5 pr-8 text-xs sm:text-sm font-semibold text-[#0f172a] dark:text-white focus:border-[#059669] focus:ring-1 focus:ring-[#059669] transition-all cursor-pointer"
              >
                <option value="B2B SaaS (Per-Seat)">B2B SaaS (Per-Seat)</option>
                <option value="Enterprise Annual Contract">Enterprise Annual Contract</option>
                <option value="Usage-Based / Consumption">Usage-Based / Consumption</option>
                <option value="Marketplace (Take-Rate)">Marketplace (Take-Rate)</option>
                <option value="B2C Subscription">B2C Subscription</option>
                <option value="FinTech / Interchange">FinTech / Interchange</option>
              </select>
              <ChevronDown className="w-4 h-4 text-[#64748b] dark:text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* 3. Target Customer */}
          <div>
            <label
              htmlFor="target-customer-select"
              className="text-xs font-medium text-[#475569] dark:text-slate-300 flex items-center gap-1.5 mb-1.5"
            >
              <Users className="w-3.5 h-3.5 text-[#64748b] dark:text-slate-400" />
              <span>Target Customer</span>
            </label>
            <div className="relative">
              <select
                id="target-customer-select"
                value={targetCustomer}
                onChange={(e) => setTargetCustomer(e.target.value)}
                className="w-full appearance-none rounded-xl bg-[#f8fafc]/90 dark:bg-[#090d16] border border-[#e2e8f0] dark:border-slate-800 px-3.5 py-2.5 pr-8 text-xs sm:text-sm font-semibold text-[#0f172a] dark:text-white focus:border-[#059669] focus:ring-1 focus:ring-[#059669] transition-all cursor-pointer"
              >
                <option value="Students">Students</option>
                <option value="Mid-Market Tech Teams">Mid-Market Tech Teams</option>
                <option value="Developers & Engineers">Developers & Engineers</option>
                <option value="Enterprise Procurement">Enterprise Procurement</option>
                <option value="SMB Owners">SMB Owners</option>
                <option value="Founders & Creators">Founders & Creators</option>
              </select>
              <ChevronDown className="w-4 h-4 text-[#64748b] dark:text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* 4. Growth Stage */}
          <div>
            <label
              htmlFor="growth-stage-select"
              className="text-xs font-medium text-[#475569] dark:text-slate-300 flex items-center gap-1.5 mb-1.5"
            >
              <BarChart3 className="w-3.5 h-3.5 text-[#64748b] dark:text-slate-400" />
              <span>Growth Stage</span>
            </label>
            <div className="relative">
              <select
                id="growth-stage-select"
                value={stage}
                onChange={(e) =>
                  setStage(e.target.value as "Idea" | "MVP" | "Pre-Seed" | "Seed" | "Series A")
                }
                className="w-full appearance-none rounded-xl bg-[#f8fafc]/90 dark:bg-[#090d16] border border-[#e2e8f0] dark:border-slate-800 px-3.5 py-2.5 pr-8 text-xs sm:text-sm font-semibold text-[#0f172a] dark:text-white focus:border-[#059669] focus:ring-1 focus:ring-[#059669] transition-all cursor-pointer"
              >
                <option value="MVP">MVP</option>
                <option value="Idea">Idea</option>
                <option value="Pre-Seed">Pre-Seed</option>
                <option value="Seed">Seed</option>
                <option value="Series A">Series A</option>
              </select>
              <ChevronDown className="w-4 h-4 text-[#64748b] dark:text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Card Footer: Privacy Notice & CTA Button */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 pt-2">
          {/* Left: Your data is secure & private */}
          <div className="flex items-center gap-1.5 text-xs text-[#334155] dark:text-slate-300 font-medium">
            <CheckCircle2 className="w-4 h-4 text-[#059669] dark:text-[#34d399] fill-[#059669]/10" />
            <span>Your data is secure & private</span>
            <span
              title="Analyses run client-side with zero cloud database persistence"
              className="cursor-help text-[#94a3b8] dark:text-slate-500 hover:text-[#475569] dark:hover:text-slate-300"
            >
              <Info className="w-3.5 h-3.5" />
            </span>
          </div>

          {/* Right: Validate My Startup Button + Sparkle Accent Marks */}
          <div className="relative inline-flex items-center">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full sm:w-auto px-7 py-3 rounded-full bg-[#044e34] hover:bg-[#033c28] text-white font-bold text-sm inline-flex items-center justify-center gap-2 shadow-[0_6px_20px_rgba(4,78,52,0.3)] transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer focus:outline-hidden"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Validating Startup...</span>
                </>
              ) : (
                <>
                  <span>Validate My Startup</span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </>
              )}
            </button>

            {/* Little Green Sparkle Accents radiating from the top-right corner */}
            <div className="hidden sm:block absolute -top-2.5 -right-2 pointer-events-none select-none" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                <line x1="5" y1="13" x2="8" y2="8" stroke="#10b981" strokeWidth="2.2" strokeLinecap="round" />
                <line x1="11" y1="15" x2="13" y2="8" stroke="#10b981" strokeWidth="2.2" strokeLinecap="round" />
                <line x1="17" y1="12" x2="14" y2="7" stroke="#10b981" strokeWidth="2.2" strokeLinecap="round" />
              </svg>
            </div>
          </div>
        </div>
      </form>

      {/* ================================================================= */}
      {/* 3. BOTTOM FEATURE BAR ("Why VentureArchitect?")                   */}
      {/* ================================================================= */}
      <div className="rounded-2xl sm:rounded-3xl bg-[#eef9f3]/70 dark:bg-[#0a1a14]/80 border border-[#d1fae5] dark:border-[#064e3b]/80 p-5 sm:p-6 mt-6 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 shadow-2xs transition-colors">
        {/* Left Heading & Tagline */}
        <div className="flex flex-col text-left max-w-xs shrink-0">
          <h3 className="text-sm sm:text-base font-bold text-[#0f172a] dark:text-white">
            Why VentureArchitect?
          </h3>
          <p className="text-xs text-[#64748b] dark:text-slate-400 mt-0.5 leading-relaxed">
            Get enterprise-grade startup validation with cutting-edge AI.
          </p>
        </div>

        {/* 4 Feature Columns */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 w-full lg:w-auto flex-1">
          {/* Feature 1: Deep Market Analysis */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#d1fae5] dark:bg-[#064e3b]/50 flex items-center justify-center shrink-0">
              <Target className="w-4 h-4 text-[#059669] dark:text-[#34d399]" />
            </div>
            <span className="text-xs font-bold text-[#0f172a] dark:text-slate-200 leading-tight">
              Deep Market<br className="hidden sm:inline" /> Analysis
            </span>
          </div>

          {/* Feature 2: Competitive Benchmarking */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#d1fae5] dark:bg-[#064e3b]/50 flex items-center justify-center shrink-0">
              <TrendingUp className="w-4 h-4 text-[#059669] dark:text-[#34d399]" />
            </div>
            <span className="text-xs font-bold text-[#0f172a] dark:text-slate-200 leading-tight">
              Competitive<br className="hidden sm:inline" /> Benchmarking
            </span>
          </div>

          {/* Feature 3: Customer Insights */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#d1fae5] dark:bg-[#064e3b]/50 flex items-center justify-center shrink-0">
              <Users className="w-4 h-4 text-[#059669] dark:text-[#34d399]" />
            </div>
            <span className="text-xs font-bold text-[#0f172a] dark:text-slate-200 leading-tight">
              Customer<br className="hidden sm:inline" /> Insights
            </span>
          </div>

          {/* Feature 4: 30-Day Execution Roadmap */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#d1fae5] dark:bg-[#064e3b]/50 flex items-center justify-center shrink-0">
              <ClipboardCheck className="w-4 h-4 text-[#059669] dark:text-[#34d399]" />
            </div>
            <span className="text-xs font-bold text-[#0f172a] dark:text-slate-200 leading-tight">
              30-Day<br className="hidden sm:inline" /> Execution Roadmap
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
