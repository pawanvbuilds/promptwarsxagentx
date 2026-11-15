import { BaseAgent } from "./base";
import {
  ValidationOutputSchema,
  type CompetitorOutput,
  type CustomerOutput,
  type FounderInput,
  type FramingOutput,
  type MarketOutput,
  type ValidationOutput,
} from "../types/domain";
import type { AgentRole } from "../types/agent-events";

export interface ValidationAgentInput {
  input: FounderInput;
  framing: FramingOutput;
  market: MarketOutput;
  competitors: CompetitorOutput;
  customers: CustomerOutput;
}

export class VentureStressTesterAgent extends BaseAgent<ValidationAgentInput, ValidationOutput> {
  readonly role: AgentRole = "validation";
  readonly displayName = "Stage 3: Venture Stress Tester & Risk Validation Agent";
  readonly schema = ValidationOutputSchema;

  protected buildSystemPrompt(): string {
    return `You are a legendary Venture Capital Investment Committee Chair and Risk Auditor.
You synthesize market data, competitor landscapes, and customer psychology to stress-test early-stage business models for fatal flaws.

Core Guidelines:
1. Calculate a calibrated Overall Viability Score (0-100) based on 6 weighted vectors:
   - Problem Urgency (20%)
   - Market Timing & Window (20%)
   - Moat Defensibility (15%)
   - Technical & Operational Feasibility (15%)
   - Unit Economics & Margin Health (15%)
   - Regulatory & Platform Friction (15%)
2. Project realistic Unit Economics:
   - Estimated CAC (Customer Acquisition Cost based on channel realities)
   - Estimated LTV (Lifetime Value based on pricing * retention horizon)
   - LTV/CAC Ratio (Target > 3.0x for healthy venture scalability)
   - Payback Period in months (< 12 months is top tier)
   - Gross Margin % (Software should target 70-85%)
3. Identify 3-4 lethal existential threats (Kill-Risks) with concrete lead indicators and de-risking countermeasures.
4. Formulate 2-3 high-leverage strategic pivots in case the initial hypothesis faces friction.`;
  }

  protected buildUserPrompt(data: ValidationAgentInput): string {
    return `Venture: ${data.framing.ventureName}
One-Liner: ${data.framing.oneLiner}
Model: ${data.input.businessModel}
Market Sizing: TAM ${data.market.tam.valueFormatted}, SAM ${data.market.sam.valueFormatted}, SOM ${data.market.som.valueFormatted} (CAGR: ${data.market.cagrPercent}%)
Competitor Landscape: ${data.competitors.directCompetitors.map((c) => c.name).join(", ")}
Moat Assessment: ${data.competitors.moatAssessment.primaryMoatType} (Score: ${data.competitors.moatAssessment.moatScoreOutOfTen}/10)
Primary ICP: ${data.customers.primaryICP.roleTitle} at ${data.customers.primaryICP.organizationType}
Target WTP Growth Tier: ${data.customers.willingnessToPay.growthTier.price}

Perform an exhaustive stress-test, calculate unit economics, and uncover kill-risks.`;
  }

  protected getSchemaExample(): string {
    return `{
  "overallViabilityScore": 84,
  "verdict": "STRONG VENTURE CANDIDATE",
  "dimensionalScores": {
    "problemUrgency": 88,
    "marketTiming": 92,
    "moatDefensibility": 74,
    "technicalFeasibility": 85,
    "unitEconomics": 82,
    "regulatoryEase": 80
  },
  "unitEconomicsProjection": {
    "estimatedCAC": "$1,450 (blended founder outbound & content inbound)",
    "estimatedLTV": "$6,800 (assuming 24-month avg retention at $285/mo ACV)",
    "ltvCacRatio": 4.69,
    "paybackMonths": 5.1,
    "grossMarginPercent": 84,
    "economicHealthVerdict": "Venture-scale economics with rapid sub-6-month payback and healthy 4.7x LTV/CAC buffer."
  },
  "killRisks": [
    {
      "threat": "Salesforce Agentforce Native Capability Cannibalization",
      "severity": "Critical",
      "leadIndicator": "Salesforce releases out-of-the-box automated CRM data reconciliation in core Sales Cloud edition.",
      "countermeasure": "Position as the neutral, multi-vendor data fabric connecting Salesforce, HubSpot, Gong, and Slack rather than a single-CRM utility."
    },
    {
      "threat": "OAuth Token & CRM Write Permission Resistance from Enterprise Security",
      "severity": "High",
      "leadIndicator": "Sales cycles stall at InfoSec security review stage for over 45 days.",
      "countermeasure": "Build a zero-storage local-agent architecture where customer CRM credentials and data payloads never touch external servers."
    }
  ],
  "strategicPivots": [
    {
      "pivotAngle": "Vertical Specialization for Healthcare/FinTech Compliance CRM",
      "shiftSummary": "Focus exclusively on highly regulated verticals where audit trails and strict HIPAA/SEC recordkeeping are legally mandated.",
      "rationale": "High compliance stakes justify 4x higher pricing ($500/seat/mo) and virtually zero churn.",
      "projectedAdvantage": "Massive moat against generic horizontal CRM AI features."
    }
  ]
}`;
  }
}
