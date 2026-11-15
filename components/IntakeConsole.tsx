"use client";

import React, { useState } from "react";
import { ArrowRight, Sparkles, Globe, DollarSign, Target, Flag } from "lucide-react";
import type { FounderInput } from "@/lib/types/domain";
import { SHOWCASE_PRESETS, type ShowcasePreset } from "@/lib/presets/showcase-ventures";

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
    initialValues?.businessModel || "B2B SaaS"
  );
  const [targetCustomer, setTargetCustomer] = useState(
    initialValues?.targetCustomer || "Mid-Market Tech Teams"
  );
  const [stage, setStage] = useState<"Idea" | "Pre-Seed" | "Seed" | "Series A">(
    initialValues?.stage || "Idea"
  );
  const [error, setError] = useState<string | null>(null);

  // Keyboard shortcut: Cmd/Ctrl + Enter to submit
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleApplyPreset = (preset: ShowcasePreset) => {
    setIdea(preset.input.idea);
    setRegion(preset.input.region);
    setBusinessModel(preset.input.businessModel);
    setTargetCustomer(preset.input.targetCustomer || "Mid-Market Tech Teams");
    setStage(preset.input.stage || "Pre-Seed");
    setError(null);
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
    <section
      aria-labelledby="intake-heading"
      className="max-w-4xl mx-auto px-4 sm:px-6 py-8"
    >
      {/* Hero Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Autonomous Multi-Agent System (PS08)</span>
        </div>
        <h1
          id="intake-heading"
          className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4"
        >
          Architect & Validate Your Startup in{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
            60 Seconds
          </span>
        </h1>
        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto">
          Six autonomous AI specialists deconstruct your thesis with real-time web research, competitive 2x2 positioning, customer Mom-Test discovery, and a 90-day execution roadmap.
        </p>

        {/* Quick Presets Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
          <span className="text-xs text-slate-400 mr-1">Try verified venture presets:</span>
          {SHOWCASE_PRESETS.map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => handleApplyPreset(preset)}
              className="text-xs px-3 py-1 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-slate-300 hover:text-emerald-400 transition-colors focus:ring-2 focus:ring-emerald-500"
            >
              {preset.title}
            </button>
          ))}
        </div>
      </div>

      {/* Main Intake Form Card */}
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 sm:p-8 shadow-2xl backdrop-blur-sm"
      >
        <fieldset className="space-y-6">
          <legend className="sr-only">Startup Concept & Market Parameters</legend>

          {/* Primary Idea Input */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label
                htmlFor="startup-idea"
                className="text-sm font-semibold text-slate-200 flex items-center gap-1.5"
              >
                <span>Startup Concept & Core Workflow</span>
                <span className="text-emerald-400">*</span>
              </label>
              <span className="text-xs text-slate-400">
                {idea.length}/2500 characters • ⌘+Enter to submit
              </span>
            </div>
            <textarea
              id="startup-idea"
              name="startup-idea"
              rows={4}
              required
              minLength={10}
              maxLength={2500}
              value={idea}
              onChange={(e) => {
                setIdea(e.target.value);
                if (error) setError(null);
              }}
              onKeyDown={handleKeyDown}
              placeholder="e.g. An autonomous AI RevOps agent that monitors sales emails and call transcripts to keep CRM fields (Salesforce, HubSpot) 100% updated and forecasts accurate without manual rep data entry..."
              className="w-full rounded-xl bg-slate-950 border border-slate-800 p-4 text-sm text-slate-100 placeholder:text-slate-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors resize-y min-h-[110px]"
              aria-describedby={error ? "idea-error" : undefined}
            />
            {error && (
              <p id="idea-error" className="mt-1.5 text-xs text-rose-400 font-medium">
                {error}
              </p>
            )}
          </div>

          {/* Configuration Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Target Geography */}
            <div>
              <label
                htmlFor="region"
                className="text-xs font-semibold text-slate-300 flex items-center gap-1.5 mb-1.5"
              >
                <Globe className="w-3.5 h-3.5 text-slate-400" />
                Target Geography
              </label>
              <select
                id="region"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3 py-2 text-xs text-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              >
                <option value="Global">Global / Worldwide</option>
                <option value="North America">North America (US & Canada)</option>
                <option value="European Union">European Union & UK</option>
                <option value="Asia-Pacific">Asia-Pacific (APAC)</option>
                <option value="India">India & South Asia</option>
                <option value="Latin America">Latin America (LATAM)</option>
              </select>
            </div>

            {/* Business Model */}
            <div>
              <label
                htmlFor="business-model"
                className="text-xs font-semibold text-slate-300 flex items-center gap-1.5 mb-1.5"
              >
                <DollarSign className="w-3.5 h-3.5 text-slate-400" />
                Business Model
              </label>
              <select
                id="business-model"
                value={businessModel}
                onChange={(e) => setBusinessModel(e.target.value)}
                className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3 py-2 text-xs text-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              >
                <option value="B2B SaaS (Per-Seat)">B2B SaaS (Per-Seat)</option>
                <option value="Enterprise Annual Contract (ACV)">Enterprise Annual Contract</option>
                <option value="Usage-Based / Consumption">Usage-Based / Consumption</option>
                <option value="Marketplace (Take-Rate)">Marketplace (Take-Rate)</option>
                <option value="B2C Subscription / Prosumer">B2C Subscription / Prosumer</option>
                <option value="FinTech / Interchange">FinTech / Interchange</option>
              </select>
            </div>

            {/* Target Customer Segment */}
            <div>
              <label
                htmlFor="target-customer"
                className="text-xs font-semibold text-slate-300 flex items-center gap-1.5 mb-1.5"
              >
                <Target className="w-3.5 h-3.5 text-slate-400" />
                Target Customer
              </label>
              <input
                id="target-customer"
                type="text"
                value={targetCustomer}
                onChange={(e) => setTargetCustomer(e.target.value)}
                placeholder="e.g. VP RevOps, Solo Founders"
                className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3 py-2 text-xs text-slate-200 placeholder:text-slate-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            {/* Current Stage */}
            <div>
              <label
                htmlFor="venture-stage"
                className="text-xs font-semibold text-slate-300 flex items-center gap-1.5 mb-1.5"
              >
                <Flag className="w-3.5 h-3.5 text-slate-400" />
                Current Stage
              </label>
              <select
                id="venture-stage"
                value={stage}
                onChange={(e) =>
                  setStage(e.target.value as "Idea" | "Pre-Seed" | "Seed" | "Series A")
                }
                className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3 py-2 text-xs text-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              >
                <option value="Idea">Idea / Concept</option>
                <option value="Pre-Seed">Pre-Seed (Prototyping)</option>
                <option value="Seed">Seed (Closed Pilots)</option>
                <option value="Series A">Series A (Scaling Revenue)</option>
              </select>
            </div>
          </div>

          {/* Action Trigger Button */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>Multi-agent DAG pipeline ready • 0-database privacy</span>
            </div>

            <button
              type="submit"
              disabled={isLoading || !idea.trim()}
              className="w-full sm:w-auto px-8 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 focus:ring-2 focus:ring-white"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                  <span>Orchestrating Agents...</span>
                </>
              ) : (
                <>
                  <span>Initiate Multi-Agent Validation</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </fieldset>
      </form>
    </section>
  );
}
