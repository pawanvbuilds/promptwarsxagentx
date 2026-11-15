import { BaseAgent } from "./base";
import {
  ExecutionOutputSchema,
  type CustomerOutput,
  type ExecutionOutput,
  type FounderInput,
  type FramingOutput,
  type ValidationOutput,
} from "../types/domain";
import type { AgentRole } from "../types/agent-events";

export interface ExecutionAgentInput {
  input: FounderInput;
  framing: FramingOutput;
  customers: CustomerOutput;
  validation: ValidationOutput;
}

export class LaunchArchitectAgent extends BaseAgent<ExecutionAgentInput, ExecutionOutput> {
  readonly role: AgentRole = "execution";
  readonly displayName = "Stage 4: Launch Execution Architect Agent";
  readonly schema = ExecutionOutputSchema;

  protected buildSystemPrompt(): string {
    return `You are a Veteran Startup Operator, YC Alum Founder, and Go-To-Market Execution Director.
Your objective is to translate analytical validation into an execution battle plan.

Core Guidelines:
1. 90-Day Execution Roadmap: Break down into 3 distinct 30-day sprints (Days 1-30, Days 31-60, Days 61-90). Each sprint must have concrete deliverables and an objective "validation gate" or kill metric.
2. MoSCoW MVP Scoping Matrix:
   - Must-Have: Non-negotiable core features required to solve the hair-on-fire problem on Day 1.
   - Should-Have: Fast-follow improvements for retention once core loop works.
   - Won't-Have V1: Features strictly eliminated from the initial MVP to prevent scope creep.
3. First 100 Customers Playbook: 3-4 tactical acquisition channels (Founder Outbound, Community Hack, Content, Integration Partner) with specific, copy-pasteable tactical execution steps.
4. 10-Slide Pitch Deck Outline: Slide-by-slide narrative matching the standard Sequoia / YC pre-seed format.`;
  }

  protected buildUserPrompt(data: ExecutionAgentInput): string {
    return `Venture: ${data.framing.ventureName}
Category: ${data.framing.category}
Value Proposition: ${data.framing.valueProposition}
Viability Score: ${data.validation.overallViabilityScore}/100 (${data.validation.verdict})
Primary ICP: ${data.customers.primaryICP.roleTitle}
Pricing Growth Tier: ${data.customers.willingnessToPay.growthTier.price}

Formulate the 90-day launch roadmap, MoSCoW MVP scope, first 100 customers playbook, and 10-slide pitch deck structure.`;
  }

  protected getSchemaExample(): string {
    return `{
  "ninetyDayRoadmap": [
    {
      "sprintNumber": 1,
      "timeframeDays": "Days 1–30",
      "focusTheme": "Problem Validation & Concierge Prototype",
      "keyMilestones": [
        "Conduct 25 Mom-Test discovery interviews with RevOps leaders",
        "Build a semi-automated Zapier/Python concierge script to manually sync CRM records for 3 pilot design partners"
      ],
      "concreteDeliverables": [
        "Figma clickable workflow prototype",
        "Written Letter of Intent (LOI) from at least 3 companies agreeing to pilot upon release"
      ],
      "stageGateMetric": "At least 3 signed pilot agreements with access to test CRM sandbox environments."
    },
    {
      "sprintNumber": 2,
      "timeframeDays": "Days 31–60",
      "focusTheme": "Private Alpha & Core Loop Stabilization",
      "keyMilestones": [
        "Deploy single-tenant OAuth integration for Salesforce and HubSpot",
        "Run automated daily background synchronization for the 3 alpha design partners"
      ],
      "concreteDeliverables": [
        "Production MVP with background queue and bi-directional field validation",
        "Real-time pipeline audit report showing discrepancies fixed"
      ],
      "stageGateMetric": "Zero data corruption incidents and pilot daily active usage exceeding 80%."
    },
    {
      "sprintNumber": 3,
      "timeframeDays": "Days 61–90",
      "focusTheme": "Public Beta & Monetization Activation",
      "keyMilestones": [
        "Launch self-serve onboarding with Stripe billing integration",
        "Convert 3 alpha partners to paid annual contracts and launch Product Hunt campaign"
      ],
      "concreteDeliverables": [
        "Self-serve pricing checkout and team seat management",
        "Customer case study showcasing 10+ hours saved per rep weekly"
      ],
      "stageGateMetric": "$5,000 in monthly recurring revenue (MRR) or 15 paying customer accounts."
    }
  ],
  "moscowScope": {
    "mustHave": [
      "1-Click OAuth connection to Salesforce & HubSpot",
      "Automated opportunity stage and close-date discrepancy scanner",
      "Bi-directional field sync with manual rollback safety button"
    ],
    "shouldHave": [
      "Slack daily morning digest of changed pipeline records",
      "Custom regex rule builder for enterprise CRM field mappings"
    ],
    "wontHaveV1": [
      "Custom native mobile app (rely on web dashboard and Slack bot)",
      "Predictive deal win probability AI models (premature until data volume is high)",
      "Multi-currency enterprise billing ledger"
    ]
  },
  "first100CustomersPlaybook": [
    {
      "channel": "Hyper-Targeted LinkedIn Founder Outbound",
      "playType": "Founder Outbound",
      "tacticalAction": "Filter Sales Navigator for VP RevOps at 50-200 person tech companies in North America who posted about hiring AEs in past 30 days.",
      "messagingHook": "Hey [First Name], noticed you're scaling the AE team. How are you preventing pipeline data decay without spending Friday afternoons nagging reps?",
      "targetCount": "Acquire 35 paying accounts via 500 personalized outbound touches (7% conversion)."
    },
    {
      "channel": "RevOps Co-Op & Pavilion Community Teardowns",
      "playType": "Community Hack",
      "tacticalAction": "Offer free 15-minute 'CRM Data Hygiene Health Audits' in RevOps Slack communities, delivering an executive PDF showing deal rot.",
      "messagingHook": "Free script to audit how many stale deals are currently contaminating your quarterly forecast.",
      "targetCount": "Acquire 40 accounts through word-of-mouth community referrals."
    },
    {
      "channel": "HubSpot & Salesforce App Marketplace Listings",
      "playType": "Integration Partner",
      "tacticalAction": "Publish a certified free tier listing in the HubSpot App Marketplace targeting the 'data hygiene' search tag.",
      "messagingHook": "Fix your dirty CRM data in 4 clicks without writing code.",
      "targetCount": "Acquire 25 accounts via organic marketplace directory search."
    }
  ],
  "pitchDeckOutline": [
    { "slideNumber": 1, "title": "Cover / Vision", "coreHook": "The Autonomous Operations Layer for Modern B2B Revenue Teams.", "keyDataPoint": "Founding team pedigree & category vision" },
    { "slideNumber": 2, "title": "The Problem", "coreHook": "Sales reps spend 28% of their time typing notes into CRMs; forecasts remain fatally inaccurate.", "keyDataPoint": "$250k average annual pipeline leakage per mid-market company" },
    { "slideNumber": 3, "title": "The Solution", "coreHook": "Zero-click background agentic intelligence that keeps CRM records perfectly synchronized.", "keyDataPoint": "10 rep-hours saved per week; 94% forecast accuracy" },
    { "slideNumber": 4, "title": "Market Size (TAM/SAM/SOM)", "coreHook": "A $14.2B global enterprise software market expanding at 18.4% CAGR.", "keyDataPoint": "$3.8B addressable SAM in North America and Western Europe" },
    { "slideNumber": 5, "title": "Product & Live Demo", "coreHook": "4-minute self-serve onboarding with real-time bi-directional sync.", "keyDataPoint": "Interactive diagram of autonomous agent pipeline" },
    { "slideNumber": 6, "title": "Business Model & Unit Economics", "coreHook": "$69/rep/month SaaS subscription with high 84% gross margins.", "keyDataPoint": "4.7x LTV/CAC ratio and 5.1-month cash payback period" },
    { "slideNumber": 7, "title": "Competitive Defensibility & Moat", "coreHook": "Proprietary sync rules and CRM write hooks create high switching costs.", "keyDataPoint": "Zero-storage local agent architecture prevents data privacy pushback" },
    { "slideNumber": 8, "title": "Go-To-Market Flywheel", "coreHook": "Founder outbound + RevOps community teardowns + marketplace listings.", "keyDataPoint": "Clear path from 10 design partners to first 100 paid customers" },
    { "slideNumber": 9, "title": "Traction & Milestones", "coreHook": "Active pilot LOIs and validation metrics.", "keyDataPoint": "3 signed enterprise letters of intent" },
    { "slideNumber": 10, "title": "The Ask & Use of Funds", "coreHook": "Raising $1.5M Seed round to accelerate engineering and scale first 100 customer sales.", "keyDataPoint": "18-month runway to reach $1.2M ARR" }
  ]
}`;
  }
}
