"use client";

import React, { useState } from "react";
import { Users, UserCheck, HelpCircle, CheckCircle, AlertTriangle, DollarSign } from "lucide-react";
import type { VentureDossier } from "@/lib/types/domain";

interface CustomersTabProps {
  dossier: VentureDossier;
}

export function CustomersTab({ dossier }: CustomersTabProps) {
  const { customers } = dossier;
  const [expandedQuestion, setExpandedQuestion] = useState<number | null>(0);

  return (
    <div
      role="tabpanel"
      id="tabpanel-customers"
      aria-labelledby="tab-customers"
      className="space-y-8 animate-in fade-in duration-150"
    >
      {/* Dual ICP Personas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Primary ICP: Decision Maker */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
              <Users className="w-4 h-4" />
              Primary ICP (Budget Decision Maker)
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
              Holds Budget
            </span>
          </div>

          <div>
            <h4 className="text-lg font-bold text-white mb-0.5">
              {customers.primaryICP.roleTitle}
            </h4>
            <div className="text-xs text-slate-400">
              {customers.primaryICP.organizationType}
            </div>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed italic border-l-2 border-slate-700 pl-3">
            &ldquo;{customers.primaryICP.dayInTheLife}&rdquo;
          </p>

          <div className="space-y-2 pt-2">
            <div className="text-xs font-bold text-slate-200">
              Acute Unresolved Pains:
            </div>
            <ul className="text-xs text-slate-300 space-y-1">
              {customers.primaryICP.acutePainPoints.map((p, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="text-rose-400 text-xs">•</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-3 border-t border-slate-800 text-xs space-y-1 text-slate-400">
            <div>
              <strong className="text-slate-300">Buying Trigger Event:</strong>{" "}
              {customers.primaryICP.triggerEvent}
            </div>
            <div>
              <strong className="text-slate-300">Success / Purchase KPI:</strong>{" "}
              {customers.primaryICP.decisionKpi}
            </div>
          </div>
        </div>

        {/* Secondary ICP: End-User Champion */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
              <UserCheck className="w-4 h-4" />
              Secondary ICP (Daily End-User Champion)
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-semibold">
              Daily Operator
            </span>
          </div>

          <div>
            <h4 className="text-lg font-bold text-white mb-0.5">
              {customers.secondaryICP.roleTitle}
            </h4>
            <div className="text-xs text-slate-400">
              {customers.secondaryICP.archetypeName}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 text-xs text-slate-300 space-y-2">
            <div>
              <strong className="text-cyan-400">Relationship to Buyer:</strong>{" "}
              {customers.secondaryICP.relationshipToBuyer}
            </div>
            <div>
              <strong className="text-cyan-400">Core Value Received:</strong>{" "}
              {customers.secondaryICP.keyBenefit}
            </div>
          </div>

          {/* JTBD Breakdown */}
          <div className="space-y-2 pt-2">
            <div className="text-xs font-bold text-slate-200 uppercase tracking-wider">
              Jobs-To-Be-Done (JTBD) Framework
            </div>
            <div className="grid grid-cols-1 gap-2 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-300">
                <span className="font-bold text-emerald-400">Functional:</span>{" "}
                {customers.jobsToBeDone.functionalJob}
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-300">
                <span className="font-bold text-teal-400">Emotional:</span>{" "}
                {customers.jobsToBeDone.emotionalJob}
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-300">
                <span className="font-bold text-indigo-400">Social:</span>{" "}
                {customers.jobsToBeDone.socialJob}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Willingness to Pay Pricing Tiers */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-emerald-400" />
            <span>Willingness-to-Pay (WTP) Pricing Elasticity</span>
          </h3>
          <span className="text-xs text-slate-400 font-mono">
            Metric: {customers.willingnessToPay.pricingMetric}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Starter */}
          <div className="p-5 rounded-xl bg-slate-950 border border-slate-800">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Starter Tier
            </div>
            <div className="text-2xl font-mono font-bold text-white my-2">
              {customers.willingnessToPay.starterTier.price}
            </div>
            <p className="text-xs text-slate-400 leading-snug">
              {customers.willingnessToPay.starterTier.valueAnchor}
            </p>
          </div>

          {/* Growth */}
          <div className="p-5 rounded-xl bg-slate-950 border border-emerald-500/40 relative">
            <span className="absolute -top-2.5 right-4 text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500 text-slate-950">
              Target Tier
            </span>
            <div className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">
              Growth Tier
            </div>
            <div className="text-2xl font-mono font-bold text-emerald-400 my-2">
              {customers.willingnessToPay.growthTier.price}
            </div>
            <p className="text-xs text-slate-300 leading-snug">
              {customers.willingnessToPay.growthTier.valueAnchor}
            </p>
          </div>

          {/* Enterprise */}
          <div className="p-5 rounded-xl bg-slate-950 border border-slate-800">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Enterprise Tier
            </div>
            <div className="text-2xl font-mono font-bold text-white my-2">
              {customers.willingnessToPay.enterpriseTier.price}
            </div>
            <p className="text-xs text-slate-400 leading-snug">
              {customers.willingnessToPay.enterpriseTier.valueAnchor}
            </p>
          </div>
        </div>
      </div>

      {/* Mom-Test Customer Discovery Interview Questions */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <div>
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-emerald-400" />
            <span>&ldquo;Mom-Test&rdquo; Discovery Interview Script</span>
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Questions framed around past behavioral facts to detect real urgency vs polite false positives.
          </p>
        </div>

        <div className="space-y-3">
          {customers.momTestQuestions.map((q, idx) => {
            const isExpanded = expandedQuestion === idx;

            return (
              <div
                key={idx}
                className="rounded-xl bg-slate-950 border border-slate-800 overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setExpandedQuestion(isExpanded ? null : idx)}
                  className="w-full text-left p-4 flex items-center justify-between gap-4 hover:bg-slate-900/60 transition-colors"
                  aria-expanded={isExpanded}
                >
                  <span className="font-semibold text-xs sm:text-sm text-slate-100 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center text-[11px] text-emerald-400 font-bold shrink-0">
                      {idx + 1}
                    </span>
                    &ldquo;{q.question}&rdquo;
                  </span>
                  <span className="text-xs text-slate-400 shrink-0">
                    {isExpanded ? "Collapse" : "Inspect Signals"}
                  </span>
                </button>

                {isExpanded && (
                  <div className="p-4 pt-0 border-t border-slate-800/80 mt-2 space-y-3 text-xs">
                    <div className="text-slate-300">
                      <strong className="text-slate-400">Probing Objective:</strong>{" "}
                      {q.probingObjective}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                      {/* Green flag */}
                      <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-500/30 text-emerald-300 space-y-1">
                        <div className="font-bold flex items-center gap-1.5 text-emerald-400 text-[11px] uppercase tracking-wider">
                          <CheckCircle className="w-3.5 h-3.5" />
                          Validated Signal (Green Flag)
                        </div>
                        <p className="leading-snug">{q.positiveSignal}</p>
                      </div>

                      {/* Red flag */}
                      <div className="p-3 rounded-lg bg-rose-950/20 border border-rose-500/30 text-rose-300 space-y-1">
                        <div className="font-bold flex items-center gap-1.5 text-rose-400 text-[11px] uppercase tracking-wider">
                          <AlertTriangle className="w-3.5 h-3.5" />
                          Polite False Positive (Red Flag)
                        </div>
                        <p className="leading-snug">{q.falsePositiveTrap}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
