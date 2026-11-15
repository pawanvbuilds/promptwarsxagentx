import type { VentureDossier } from "../types/domain";

/**
 * Transforms a complete Venture Dossier into an Executive Investment Committee Memo
 */
export function dossierToInvestmentMemo(dossier: VentureDossier): string {
  const { framing, market, competitors, customers, validation, execution, citations, telemetry } = dossier;

  return `# Executive Investment Memo: ${framing.ventureName}
> **Category:** ${framing.category} | **Target Geo:** ${framing.targetGeography}  
> **Evaluation Date:** ${new Date(dossier.createdAt).toLocaleDateString()} | **Viability Index:** ${validation.overallViabilityScore}/100 (${validation.verdict})  
> **Pipeline Latency:** ${(telemetry.durationMs / 1000).toFixed(1)}s across ${telemetry.agentsExecuted} specialist agents

---

## 1. Executive Summary & Core Hypothesis

**One-Liner:** ${framing.oneLiner}

**Value Proposition:**  
${framing.valueProposition}

**Core Falsifiable Hypothesis:**  
> "${framing.coreHypothesis}"

---

## 2. Market Sizing & Macro Dynamics

| Tier | Value | Methodology / Rationale |
| :--- | :--- | :--- |
| **TAM (Total Addressable)** | **${market.tam.valueFormatted}** | ${market.tam.formula} |
| **SAM (Serviceable Addressable)** | **${market.sam.valueFormatted}** | ${market.sam.rationale} |
| **SOM (Serviceable Obtainable)** | **${market.som.valueFormatted}** | ${market.som.rationale} (${market.som.milestoneYear}) |

- **5-Year Growth Rate (CAGR):** ${market.cagrPercent}%
- **Market Maturity:** ${market.marketMaturity}

### Sector Tailwinds
${market.tailwinds.map((t) => `- **${t.trend}:** ${t.impact}`).join("\n")}

### Sector Headwinds & Risks
${market.headwinds.map((h) => `- **[${h.threatLevel}] ${h.barrier}:** ${h.description}`).join("\n")}

### Regulatory Compliance
${market.regulatoryLandscape.summary}  
*Governing Frameworks:* ${market.regulatoryLandscape.keyRegulations.join(", ")} (Compliance Difficulty: **${market.regulatoryLandscape.complianceDifficulty}**)

---

## 3. Competitive Intelligence & 2x2 Positioning

### Direct Competitors
${competitors.directCompetitors
  .map(
    (c) => `### ${c.name}
- **Website:** ${c.url}
- **Tagline:** ${c.tagline}
- **Pricing:** ${c.pricingModel} | **Stage:** ${c.estimatedStageOrFunding}
- **Strengths:** ${c.coreStrengths.join("; ")}
- **Vulnerabilities:** ${c.criticalWeaknesses.join("; ")}`
  )
  .join("\n\n")}

### 2x2 Positioning Matrix
- **X-Axis:** ${competitors.positioningMatrix.xAxisLabel}
- **Y-Axis:** ${competitors.positioningMatrix.yAxisLabel}
${competitors.positioningMatrix.points
  .map((p) => `- **${p.name}** (${p.isOurVenture ? "⭐ OUR VENTURE" : "Competitor"}): [X: ${p.x}, Y: ${p.y}] — ${p.rationale}`)
  .join("\n")}

### White-Space Opportunities
${competitors.whiteSpaceOpportunities
  .map((g) => `- **${g.gap}:** ${g.whyUnaddressed}\n  *Tactical Exploitation:* ${g.tacticalExploitation}`)
  .join("\n")}

### Moat & Defensibility
- **Primary Moat:** ${competitors.moatAssessment.primaryMoatType} (Score: **${competitors.moatAssessment.moatScoreOutOfTen}/10**)
- **Verdict:** ${competitors.moatAssessment.durabilityVerdict}

---

## 4. Customer Persona & "Mom Test" Discovery Script

### Primary Ideal Customer Profile (ICP)
- **Role:** ${customers.primaryICP.roleTitle} (${customers.primaryICP.archetypeName})
- **Organization:** ${customers.primaryICP.organizationType}
- **Buying Trigger:** ${customers.primaryICP.triggerEvent}
- **Success KPI:** ${customers.primaryICP.decisionKpi}
- **Acute Pain Points:**
${customers.primaryICP.acutePainPoints.map((p) => `  - ${p}`).join("\n")}

### Jobs-To-Be-Done (JTBD)
- **Functional Job:** ${customers.jobsToBeDone.functionalJob}
- **Emotional Job:** ${customers.jobsToBeDone.emotionalJob}
- **Social Job:** ${customers.jobsToBeDone.socialJob}

### Willingness-To-Pay (WTP) Pricing Tiers
- **Pricing Metric:** ${customers.willingnessToPay.pricingMetric}
- **Starter:** ${customers.willingnessToPay.starterTier.price} (${customers.willingnessToPay.starterTier.valueAnchor})
- **Growth:** ${customers.willingnessToPay.growthTier.price} (${customers.willingnessToPay.growthTier.valueAnchor})
- **Enterprise:** ${customers.willingnessToPay.enterpriseTier.price} (${customers.willingnessToPay.enterpriseTier.valueAnchor})

### Mom-Test Interview Discovery Questions
${customers.momTestQuestions
  .map(
    (q, idx) => `#### Question ${idx + 1}: "${q.question}"
- **Objective:** ${q.probingObjective}
- **Validating Signal (Green Flag):** ${q.positiveSignal}
- **False-Positive Trap (Red Flag):** ${q.falsePositiveTrap}`
  )
  .join("\n\n")}

---

## 5. Venture Stress Testing & Unit Economics

### 6-Dimensional Scorecard
- **Problem Urgency:** ${validation.dimensionalScores.problemUrgency}/100
- **Market Timing:** ${validation.dimensionalScores.marketTiming}/100
- **Moat Defensibility:** ${validation.dimensionalScores.moatDefensibility}/100
- **Technical Feasibility:** ${validation.dimensionalScores.technicalFeasibility}/100
- **Unit Economics:** ${validation.dimensionalScores.unitEconomics}/100
- **Regulatory Ease:** ${validation.dimensionalScores.regulatoryEase}/100

### Unit Economics Simulation
- **Estimated CAC:** ${validation.unitEconomicsProjection.estimatedCAC}
- **Estimated LTV:** ${validation.unitEconomicsProjection.estimatedLTV}
- **LTV/CAC Ratio:** **${validation.unitEconomicsProjection.ltvCacRatio}x**
- **Payback Horizon:** **${validation.unitEconomicsProjection.paybackMonths} Months**
- **Gross Margin:** **${validation.unitEconomicsProjection.grossMarginPercent}%**
- **Economic Health Verdict:** ${validation.unitEconomicsProjection.economicHealthVerdict}

### Critical Kill-Risks
${validation.killRisks
  .map(
    (k) => `### [${k.severity}] ${k.threat}
- **Lead Indicator:** ${k.leadIndicator}
- **Mitigation Strategy:** ${k.countermeasure}`
  )
  .join("\n\n")}

### Strategic Pivot Alternatives
${validation.strategicPivots
  .map((p) => `- **${p.pivotAngle}:** ${p.shiftSummary}\n  *Advantage:* ${p.projectedAdvantage}`)
  .join("\n")}

---

## 6. Execution Roadmap & Launchpad

### 90-Day Execution Sprints
${execution.ninetyDayRoadmap
  .map(
    (s) => `### ${s.timeframeDays} (Sprint ${s.sprintNumber}): ${s.focusTheme}
- **Milestones:** ${s.keyMilestones.join("; ")}
- **Deliverables:** ${s.concreteDeliverables.join("; ")}
- **Validation Gate Metric:** ${s.stageGateMetric}`
  )
  .join("\n\n")}

### MoSCoW MVP Feature Scoping
- **Must Have (Day 1):** ${execution.moscowScope.mustHave.join("; ")}
- **Should Have (Fast Follow):** ${execution.moscowScope.shouldHave.join("; ")}
- **Won't Have V1 (Prevent Scope Creep):** ${execution.moscowScope.wontHaveV1.join("; ")}

### First 100 Customers Acquisition Playbook
${execution.first100CustomersPlaybook
  .map(
    (c) => `### ${c.channel} (${c.playType})
- **Tactical Action:** ${c.tacticalAction}
- **Messaging Hook:** "${c.messagingHook}"
- **Target:** ${c.targetCount}`
  )
  .join("\n\n")}

---

## 7. Grounding Citations
${citations.length > 0 ? citations.map((c, i) => `${i + 1}. [${c.title}](${c.url}) — *${c.domain}*`).join("\n") : "No external web citations recorded."}

---
*Generated by VentureArchitect — Autonomous Startup Co-Pilot Engine (PS08)*
`;
}
