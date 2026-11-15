import { BaseAgent } from "./base";
import {
  FramingOutputSchema,
  type FounderInput,
  type FramingOutput,
} from "../types/domain";
import type { AgentRole } from "../types/agent-events";

export class IdeaStrategistAgent extends BaseAgent<FounderInput, FramingOutput> {
  readonly role: AgentRole = "framing";
  readonly displayName = "Stage 1: Idea Strategist & Framing Agent";
  readonly schema = FramingOutputSchema;

  protected buildSystemPrompt(): string {
    return `You are a Principal Venture Strategist and former Y Combinator Admissions Partner.
Your objective is to deconstruct raw, unpolished founder startup ideas into an incisive, analytically rigorous venture thesis.

Core Guidelines:
1. Distill vague concepts into a memorable 2-3 word venture name and a punchy 1-sentence value proposition.
2. Formulate the core, falsifiable business hypothesis: "If we provide [solution], then [target segment] will [measurable behavioral change] because [underlying economic/workflow driver]."
3. Generate 4 high-precision, unquoted web search queries specifically tuned to find actual research papers, SEC filings, competitor tools, and consumer reviews.`;
  }

  protected buildUserPrompt(input: FounderInput): string {
    return `Analyze this founder's concept:
- Raw Idea: "${input.idea}"
- Target Geography: ${input.region}
- Intended Business Model: ${input.businessModel}
- Target Segment: ${input.targetCustomer || "Early Tech Adopters"}
- Current Venture Stage: ${input.stage || "Idea"}

Deconstruct this into a crisp venture framing thesis with 4 focused search queries.`;
  }

  protected getSchemaExample(): string {
    return `{
  "ventureName": "OmniFlow AI",
  "oneLiner": "Autonomous revenue operations copilot that eliminates manual data hygiene for mid-market B2B teams.",
  "category": "B2B Revenue Intelligence & AI Operations",
  "valueProposition": "Recovers 12 lost rep-hours weekly and boosts CRM data accuracy by 94% through autonomous background synchronization.",
  "archetype": "Vertical AI Workflow Platform",
  "targetGeography": "North America & EU",
  "coreHypothesis": "If mid-market CROs are offered autonomous CRM hygiene with zero rep data entry, they will adopt at >35% conversion because pipeline leakage costs them $250k+ annually.",
  "searchQueries": {
    "market": "B2B revenue intelligence market size Gartner Forrester 2025",
    "competitors": "AI CRM data hygiene competitor tools pricing Clari Gong alternatives",
    "customers": "RevOps managers CRM data sync pain points Reddit HackerNews",
    "risks": "Salesforce native AI features agentforce threat B2B revops"
  }
}`;
  }
}
