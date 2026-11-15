import { BaseAgent } from "./base";
import {
  CompetitorOutputSchema,
  type CompetitorOutput,
  type FounderInput,
  type FramingOutput,
} from "../types/domain";
import type { AgentRole } from "../types/agent-events";

export interface CompetitorAgentInput {
  input: FounderInput;
  framing: FramingOutput;
  searchContext: string;
}

export class CompetitorReconAgent extends BaseAgent<CompetitorAgentInput, CompetitorOutput> {
  readonly role: AgentRole = "competitors";
  readonly displayName = "Stage 2B: Competitor Reconnaissance Agent";
  readonly schema = CompetitorOutputSchema;

  protected buildSystemPrompt(): string {
    return `You are a Principal Corporate Intelligence Analyst and M&A Strategist.
Your objective is to map out the competitive battlefield with unsparing clarity, identifying direct incumbents, legacy alternatives, 2x2 matrix coordinates, and defensible white spaces.

Core Guidelines:
1. Identify 3-5 REAL, existing direct competitors with realistic URLs, pricing structures, and honest appraisal of their strengths and weaknesses.
2. Outline indirect alternatives (e.g. manual spreadsheets, offshore outsourcing, in-house custom scripts) and why users churn from them.
3. Build an interactive 2x2 Positioning Matrix with explicit X and Y axis labels, quadrant meanings, and coordinate pairs from -100 to +100 for each competitor and the founder's startup (set isOurVenture: true for the founder's startup).
4. Feature comparison matrix with 4-6 capabilities rating Our Advantage (High/Medium/Low) vs incumbent benchmarks.
5. Identify 2-3 genuine white-space opportunities incumbents ignore due to innovator's dilemma.`;
  }

  protected buildUserPrompt(data: CompetitorAgentInput): string {
    return `Startup Venture: ${data.framing.ventureName}
Category: ${data.framing.category}
Value Proposition: ${data.framing.valueProposition}
Geography: ${data.framing.targetGeography}

LIVE WEB GROUNDING CONTEXT:
${data.searchContext}

Perform a rigorous competitive teardown and construct the 2x2 positioning matrix.`;
  }

  protected getSchemaExample(): string {
    return `{
  "directCompetitors": [
    {
      "name": "Clari",
      "url": "https://www.clari.com",
      "tagline": "Enterprise revenue platform for forecasting and deal inspection",
      "pricingModel": "Annual enterprise contract ($45k - $150k+/yr)",
      "estimatedStageOrFunding": "Late Stage / Pre-IPO ($496M Raised)",
      "coreStrengths": ["Deep enterprise brand recognition", "Extensive Salesforce integrations", "Powerful executive boardroom forecasting dashboards"],
      "criticalWeaknesses": ["High implementation friction (3-6 months onboarding)", "Expensive for mid-market", "Lacks autonomous agentic data hygiene"]
    },
    {
      "name": "Scratchpad",
      "url": "https://scratchpad.com",
      "tagline": "Workspace designed to help sales reps update notes and fields faster",
      "pricingModel": "Freemium to $39/user/month",
      "estimatedStageOrFunding": "Series B ($46M Raised)",
      "coreStrengths": ["Loved by individual sales reps for spreadsheet UI", "Instant Chrome extension onboarding"],
      "criticalWeaknesses": ["Requires human rep input rather than autonomous AI execution", "Struggles with top-down enterprise governance"]
    }
  ],
  "indirectAlternatives": [
    {
      "name": "Manual Excel & Google Sheets Tracking",
      "howUsersSolveItToday": "Sales ops exports CSVs on Friday afternoon and spends 6 hours manually deduping records.",
      "churnVulnerability": "Human error introduces 30%+ data rot; sales ops burnout is extremely high."
    },
    {
      "name": "Offshore Data Enrichment Virtual Assistants",
      "howUsersSolveItToday": "Hiring remote contractors on Upwork to verify LinkedIn profiles and copy details into CRM.",
      "churnVulnerability": "Severe security and GDPR liabilities with third-party contractor access to proprietary lead lists."
    }
  ],
  "positioningMatrix": {
    "xAxisLabel": "Human Input Required <---> 100% Autonomous AI Execution",
    "yAxisLabel": "Generic Legacy CRM <---> Specialized Mid-Market RevOps AI",
    "quadrantNotes": {
      "topRight": "Autonomous & Specialized (Our High-Leverage Sweet Spot)",
      "bottomRight": "Autonomous but Commodity Generalist",
      "topLeft": "High-Touch Enterprise Manual Forecasting",
      "bottomLeft": "Low-Value Manual Point Solutions"
    },
    "points": [
      {
        "name": "Our Venture",
        "x": 75,
        "y": 80,
        "isOurVenture": true,
        "rationale": "Autonomous multi-agent data sync purpose-built for lean mid-market teams."
      },
      {
        "name": "Clari",
        "x": -60,
        "y": 65,
        "isOurVenture": false,
        "rationale": "High enterprise specialization but requires constant manual rep compliance."
      },
      {
        "name": "Scratchpad",
        "x": -45,
        "y": -20,
        "isOurVenture": false,
        "rationale": "Great rep UI but entirely dependent on manual keystrokes."
      }
    ]
  },
  "featureComparisonMatrix": [
    { "capability": "Autonomous Background Field Sync", "ourAdvantage": "High", "incumbentBenchmark": "Absent in legacy tools; relies on rep manual typing" },
    { "capability": "Time to First Value (Onboarding)", "ourAdvantage": "High", "incumbentBenchmark": "Clari requires 60-90 days; we connect via OAuth in 4 minutes" },
    { "capability": "Executive Boardroom Forecasting", "ourAdvantage": "Low", "incumbentBenchmark": "Clari has 8 years of historical model training and SEC audit history" }
  ],
  "whiteSpaceOpportunities": [
    {
      "gap": "Zero-Click Rep Experience",
      "whyUnaddressed": "Incumbents treat reps as data entry clerks rather than removing data entry entirely.",
      "tacticalExploitation": "Market our product as the 'invisible CRM ghostwriter' that lets reps sell instead of filling forms."
    }
  ],
  "moatAssessment": {
    "primaryMoatType": "Proprietary Data Flywheel",
    "moatScoreOutOfTen": 7.5,
    "durabilityVerdict": "Strong switching costs once bi-directional sync rules are established inside customer CRM workflows."
  }
}`;
  }
}
