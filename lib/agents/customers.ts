import { BaseAgent } from "./base";
import {
  CustomerOutputSchema,
  type CustomerOutput,
  type FounderInput,
  type FramingOutput,
} from "../types/domain";
import type { AgentRole } from "../types/agent-events";

export interface CustomerAgentInput {
  input: FounderInput;
  framing: FramingOutput;
  searchContext: string;
}

export class CustomerProfilerAgent extends BaseAgent<CustomerAgentInput, CustomerOutput> {
  readonly role: AgentRole = "customers";
  readonly displayName = "Stage 2C: Customer Profiling & Discovery Agent";
  readonly schema = CustomerOutputSchema;

  protected buildSystemPrompt(): string {
    return `You are a Principal Customer Discovery Researcher, Behavioral Economist, and author on Customer Development.
Your objective is to build an empathetic yet clinically rigorous Ideal Customer Profile (ICP) and discovery framework.

Core Guidelines:
1. Define Primary ICP: Decision maker with budget authority (Title, Day-in-the-life, acute pain points, trigger event that makes them buy TODAY, decision KPI).
2. Define Secondary ICP: Daily end user or cross-functional stakeholder who must champion or approve the software.
3. Apply Clayton Christensen's Jobs-To-Be-Done (JTBD) framework: Functional job (the task), Emotional job (how they want to feel), Social job (how they want peers/boss to perceive them).
4. Outline 3 Willingness-to-Pay (WTP) tiers with exact pricing metric and psychological value anchors.
5. Create 4-5 "Mom Test" validation questions: Questions about past behavior and actual spending, specifically designed to detect polite false positives ("Oh sounds cool, I'd totally buy that") vs real, agonizing problem urgency.`;
  }

  protected buildUserPrompt(data: CustomerAgentInput): string {
    return `Startup Venture: ${data.framing.ventureName}
Target Segment: ${data.input.targetCustomer || "Mid-market B2B"}
Value Proposition: ${data.framing.valueProposition}
Geography: ${data.framing.targetGeography}

LIVE WEB GROUNDING CONTEXT:
${data.searchContext}

Profile the customer personas and construct the Mom-Test discovery interview script.`;
  }

  protected getSchemaExample(): string {
    return `{
  "primaryICP": {
    "archetypeName": "Overwhelmed Mid-Market VP of Sales / RevOps Director",
    "roleTitle": "VP of Revenue Operations / Head of Sales Ops",
    "organizationType": "B2B SaaS companies with 40-250 employees and $5M-$30M ARR",
    "dayInTheLife": "Spends Monday mornings in emergency pipeline reconciliation meetings, nagging 15 account executives to update close dates, stage gates, and deal notes.",
    "acutePainPoints": [
      "40% of CRM pipeline deals have outdated next steps and invalid close dates",
      "Sales reps spend 7 hours/week on administrative data entry instead of booking meetings",
      "CEO and Board demand accurate quarterly forecasts that ops cannot confidently defend"
    ],
    "triggerEvent": "A missed quarterly board forecast caused by dead deals lingering in active stages, triggering executive reprimand.",
    "decisionKpi": "Pipeline forecast variance reduced below 5% and sales rep selling hours increased by 15%."
  },
  "secondaryICP": {
    "archetypeName": "Quota-Carrying Account Executive",
    "roleTitle": "Senior Account Executive (AE)",
    "relationshipToBuyer": "End user who hates administrative burdens and currently resents the VP's CRM compliance mandates.",
    "keyBenefit": "Eliminates 90 minutes of daily soul-crushing data logging so they can focus on closing deals and hitting quota."
  },
  "jobsToBeDone": {
    "functionalJob": "Keep customer CRM records 100% synchronized and actionable across email, calendar, and Slack interactions automatically.",
    "emotionalJob": "Feel confident and in total control during board meetings without anxiety over hidden deal rot.",
    "socialJob": "Be respected across the executive leadership team as a strategic revenue partner rather than a data cleanup clerk."
  },
  "willingnessToPay": {
    "pricingMetric": "Per active sales rep per month",
    "starterTier": {
      "price": "$29/rep/mo",
      "valueAnchor": "Costs less than 1 hour of an AE's base salary per month."
    },
    "growthTier": {
      "price": "$69/rep/mo",
      "valueAnchor": "Full autonomous multi-agent synchronization and bi-directional field updates."
    },
    "enterpriseTier": {
      "price": "Custom ($25k+/yr)",
      "valueAnchor": "Dedicated SOC2 audit trails, custom CRM schema mapping, and priority SLA."
    }
  },
  "momTestQuestions": [
    {
      "question": "Walk me through what happened the last time your sales forecast missed the board target. Where was the data discrepancy?",
      "probingObjective": "Uncover actual historical pain and determine if bad CRM data was recognized as the root cause.",
      "positiveSignal": "Detailed recount of an agonizing 20-hour weekend spent auditing individual opportunity stages in spreadsheets.",
      "falsePositiveTrap": "'Yeah forecasting is tough, an AI tool that predicts things would be awesome!' (Hypothetical praise without past action)."
    },
    {
      "question": "What tools or contractors have you paid money for in the past 12 months to fix CRM data hygiene?",
      "probingObjective": "Verify willingness to pay by auditing past budget allocation.",
      "positiveSignal": "Mentions paying $15k for external consultancies or purchasing Zapier/enrichment credits.",
      "falsePositiveTrap": "'We've always wanted to solve it, but haven't had time to look.' (Problem is not urgent enough to command budget)."
    }
  ]
}`;
  }
}
