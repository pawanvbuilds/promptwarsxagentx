import { BaseAgent } from "./base";
import {
  MarketOutputSchema,
  type FounderInput,
  type FramingOutput,
  type MarketOutput,
} from "../types/domain";
import type { AgentRole } from "../types/agent-events";

export interface MarketAgentInput {
  input: FounderInput;
  framing: FramingOutput;
  searchContext: string;
}

export class MarketIntelligenceAgent extends BaseAgent<MarketAgentInput, MarketOutput> {
  readonly role: AgentRole = "market";
  readonly displayName = "Stage 2A: Market Intelligence Agent";
  readonly schema = MarketOutputSchema;

  protected buildSystemPrompt(): string {
    return `You are a Senior Market Intelligence Director and Private Equity Economist specializing in market sizing and macro sector dynamics.
Your objective is to provide a grounded, bottom-up market sizing (TAM / SAM / SOM) for the target venture using realistic unit arithmetic, rather than generic inflated top-down statistics.

Core Guidelines:
1. TAM: Total Addressable Market worldwide. Must state the explicit bottom-up formula: (# of Potential Buyer Accounts) * (Annual Contract Value).
2. SAM: Serviceable Addressable Market filtered by target geography, language, and core vertical fit.
3. SOM: Serviceable Obtainable Market (Realistic Year 3-5 market capture goal based on sales velocity and capital constraints).
4. Provide realistic CAGR, market maturity status ('Emerging / Nascent' | 'High-Growth / Early Adoption' | 'Consolidating' | 'Mature / Saturated'), concrete tailwinds/headwinds (threatLevel must be 'Low' | 'Moderate' | 'Severe'), and regulatory hurdles.
5. Ingest live web research context when available to cite industry data.`;
  }

  protected buildUserPrompt(data: MarketAgentInput): string {
    return `Startup Venture: ${data.framing.ventureName}
Category: ${data.framing.category}
Target Geography: ${data.framing.targetGeography}
Business Model: ${data.input.businessModel}
Value Proposition: ${data.framing.valueProposition}

LIVE WEB GROUNDING CONTEXT:
${data.searchContext}

Perform an exhaustive bottom-up market sizing and regulatory analysis.`;
  }

  protected getSchemaExample(): string {
    return `{
  "tam": {
    "valueFormatted": "$14.2 Billion",
    "numericBillions": 14.2,
    "formula": "355,000 Global Mid-Market B2B Companies * $40,000 Average Annual Contract Value",
    "methodology": "Bottom-up account census using Gartner & IDC Enterprise Software data."
  },
  "sam": {
    "valueFormatted": "$3.8 Billion",
    "numericBillions": 3.8,
    "rationale": "English-speaking North America & Western Europe enterprises with 50-500 employees running Salesforce/HubSpot."
  },
  "som": {
    "valueFormatted": "$76 Million",
    "numericBillions": 0.076,
    "milestoneYear": "Year 4 Target",
    "rationale": "2% penetration of the SAM (approx 1,900 paid accounts) with founder-led and outbound sales engine."
  },
  "cagrPercent": 18.4,
  "marketMaturity": "High-Growth / Early Adoption",
  "tailwinds": [
    { "trend": "Mandate for AI-Driven Lean Operations", "impact": "Tech layoffs forced sales orgs to automate rep administrative burdens." },
    { "trend": "API First CRM Ecosystems", "impact": "Deep webhooks allow bi-directional syncing without complex ETL." }
  ],
  "headwinds": [
    { "barrier": "CRM Vendor Native Feature Cannibalization", "threatLevel": "Severe", "description": "Incumbents like Salesforce or HubSpot introducing native AI data hygiene tools." },
    { "barrier": "Enterprise Data Security Paranoia", "threatLevel": "Moderate", "description": "SOC2 and GDPR compliance delays sales cycles by 60-90 days." }
  ],
  "regulatoryLandscape": {
    "summary": "Must comply with GDPR, CCPA, and emerging EU AI Act data governance policies for automated customer profiling.",
    "keyRegulations": ["SOC 2 Type II", "GDPR Article 22 Automated Processing", "CCPA/CPRA Consumer Privacy"],
    "complianceDifficulty": "Moderate"
  }
}`;
  }
}
