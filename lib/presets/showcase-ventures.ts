import type { FounderInput, VentureDossier } from "../types/domain";

export interface ShowcasePreset {
  id: string;
  badge: string;
  title: string;
  tagline: string;
  category: string;
  input: FounderInput;
  precompiledDossier: VentureDossier;
}

export const SHOWCASE_PRESETS: ShowcasePreset[] = [
  {
    id: "omniflow-ai",
    badge: "B2B SaaS / AI Ops",
    title: "OmniFlow AI",
    tagline: "Autonomous revenue operations copilot that eliminates manual data hygiene.",
    category: "Enterprise Revenue Intelligence",
    input: {
      idea: "An autonomous AI RevOps agent that monitors sales rep emails, calls, and Slack channels to keep CRM fields (Salesforce, HubSpot) 100% synchronized and forecasts accurate without manual rep data entry.",
      region: "North America & Europe",
      businessModel: "B2B SaaS (Per-Seat)",
      targetCustomer: "VP RevOps & Mid-Market Sales Directors (50-300 employees)",
      stage: "Pre-Seed",
    },
    precompiledDossier: {
      id: "va_preset_omniflow",
      createdAt: new Date().toISOString(),
      input: {
        idea: "An autonomous AI RevOps agent that monitors sales rep emails, calls, and Slack channels to keep CRM fields (Salesforce, HubSpot) 100% synchronized and forecasts accurate without manual rep data entry.",
        region: "North America & Europe",
        businessModel: "B2B SaaS (Per-Seat)",
        targetCustomer: "VP RevOps & Mid-Market Sales Directors (50-300 employees)",
        stage: "Pre-Seed",
      },
      framing: {
        ventureName: "OmniFlow AI",
        oneLiner: "Autonomous revenue operations copilot eliminating manual CRM data entry for B2B teams.",
        category: "Enterprise Revenue Intelligence & AI Operations",
        valueProposition: "Recovers 10 rep-hours weekly and elevates CRM pipeline forecast accuracy above 94% through autonomous background synchronization.",
        archetype: "Vertical AI Workflow Platform",
        targetGeography: "North America & Western Europe",
        coreHypothesis: "If mid-market sales organizations are offered zero-click background CRM hygiene, they will pay $69/rep/mo because pipeline leakage and bad forecasting costs them >$250k annually.",
        searchQueries: {
          market: "B2B revenue intelligence market size Gartner IDC 2025",
          competitors: "AI CRM data hygiene competitor tools Clari Gong Scratchpad pricing",
          customers: "RevOps managers CRM data sync pain points Reddit",
          risks: "Salesforce Agentforce native features threat B2B revops",
        },
      },
      market: {
        tam: {
          valueFormatted: "$14.2 Billion",
          numericBillions: 14.2,
          formula: "355,000 Global Mid-Market B2B Tech & Services Companies * $40,000 Average ACV",
          methodology: "Bottom-up account census using Gartner & IDC Enterprise Software statistics.",
        },
        sam: {
          valueFormatted: "$3.8 Billion",
          numericBillions: 3.8,
          rationale: "English-speaking North America and Western Europe enterprises with 50-500 employees running Salesforce or HubSpot.",
        },
        som: {
          valueFormatted: "$76 Million",
          numericBillions: 0.076,
          milestoneYear: "Year 4 Target",
          rationale: "2.0% capture of addressable mid-market SAM (approx 1,900 paid accounts) with founder-led and outbound sales.",
        },
        cagrPercent: 18.4,
        marketMaturity: "High-Growth / Early Adoption",
        tailwinds: [
          { trend: "Mandate for AI-Driven Lean Operations", impact: "Tech layoffs forced sales orgs to automate rep administrative burdens." },
          { trend: "API-First CRM Ecosystems", impact: "Modern webhooks allow bi-directional syncing without custom ETL pipelines." },
          { trend: "Executive Demand for Forecast Precision", impact: "CFOs are penalizing sales teams for pipeline forecasting errors exceeding 5%." },
        ],
        headwinds: [
          { barrier: "CRM Vendor Native Feature Cannibalization", threatLevel: "Severe", description: "Salesforce Agentforce and HubSpot embedding native AI auto-fill tools." },
          { barrier: "Enterprise InfoSec Paranoia", threatLevel: "Moderate", description: "SOC 2 Type II compliance audits add 60-90 days of friction to enterprise deals." },
        ],
        regulatoryLandscape: {
          summary: "Requires strict adherence to SOC 2 Type II, GDPR Article 22 automated profiling guidelines, and CCPA customer rights.",
          keyRegulations: ["SOC 2 Type II", "GDPR Data Processing Agreement (DPA)", "CCPA/CPRA Privacy Shield"],
          complianceDifficulty: "Moderate",
        },
      },
      competitors: {
        directCompetitors: [
          {
            name: "Clari",
            url: "https://www.clari.com",
            tagline: "Enterprise revenue platform for forecasting and deal inspection",
            pricingModel: "Enterprise contracts ($45k - $150k+/yr)",
            estimatedStageOrFunding: "Late Stage / Pre-IPO ($496M Raised)",
            coreStrengths: ["Enterprise brand dominance", "Deep boardroom forecasting models", "Extensive Fortune 500 penetration"],
            criticalWeaknesses: ["High onboarding friction (3-6 months)", "Prohibitive pricing for mid-market", "Lacks autonomous agentic data repair"],
          },
          {
            name: "Scratchpad",
            url: "https://scratchpad.com",
            tagline: "Chrome extension and spreadsheet workspace for sales reps",
            pricingModel: "Freemium to $39/user/month",
            estimatedStageOrFunding: "Series B ($46M Raised)",
            coreStrengths: ["Loved by individual reps", "Fast Chrome extension installation", "Low user friction"],
            criticalWeaknesses: ["Still relies on human manual typing", "Weak multi-system orchestration", "Difficult to enforce top-down"],
          },
          {
            name: "Gong.io",
            url: "https://www.gong.io",
            tagline: "Revenue intelligence and conversation analysis platform",
            pricingModel: "$1,400/rep/year platform fee",
            estimatedStageOrFunding: "Pre-IPO ($584M Raised)",
            coreStrengths: ["Market leader in conversation recording", "Massive AI training dataset", "Strong brand recognition"],
            criticalWeaknesses: ["Expensive baseline price", "Focuses on call transcription rather than autonomous CRM write actions"],
          },
        ],
        indirectAlternatives: [
          {
            name: "Manual Friday Afternoon Spreadsheets",
            howUsersSolveItToday: "Sales ops exports CSVs weekly and spends 6 hours manually correcting field inconsistencies.",
            churnVulnerability: "30%+ error rate and acute burnout across RevOps managers.",
          },
          {
            name: "Offshore Virtual Assistants (Upwork/Fiverr)",
            howUsersSolveItToday: "Contracting remote assistants to verify LinkedIn profiles and manually update CRM contacts.",
            churnVulnerability: "Serious security and customer privacy risks with external contractors having raw DB access.",
          },
        ],
        positioningMatrix: {
          xAxisLabel: "Manual Keystrokes Required <---> 100% Autonomous AI Execution",
          yAxisLabel: "Generic Legacy Tooling <---> Specialized Mid-Market AI Operations",
          quadrantNotes: {
            topRight: "Autonomous & Specialized (Our High-Leverage Sweet Spot)",
            bottomRight: "Autonomous Generalist Commodity",
            topLeft: "High-Touch Enterprise Manual Forecasting",
            bottomLeft: "Low-Value Manual Point Utilities",
          },
          points: [
            {
              name: "OmniFlow AI",
              x: 80,
              y: 85,
              isOurVenture: true,
              rationale: "Autonomous background sync specifically tuned for mid-market RevOps teams.",
            },
            {
              name: "Clari",
              x: -55,
              y: 70,
              isOurVenture: false,
              rationale: "Enterprise specialized but completely dependent on rep compliance.",
            },
            {
              name: "Scratchpad",
              x: -40,
              y: -25,
              isOurVenture: false,
              rationale: "Fast spreadsheet UI but requires manual rep keystrokes.",
            },
            {
              name: "Gong",
              x: 30,
              y: 60,
              isOurVenture: false,
              rationale: "Great call insights, but does not perform autonomous CRM writes.",
            },
          ],
        },
        featureComparisonMatrix: [
          { capability: "Autonomous Background Field Sync", ourAdvantage: "High", incumbentBenchmark: "Absent; requires human typing" },
          { capability: "Onboarding Time to First Value", ourAdvantage: "High", incumbentBenchmark: "Clari takes 60-90 days; we connect in 4 minutes" },
          { capability: "Zero-Click Opportunity Close Dates", ourAdvantage: "High", incumbentBenchmark: "Manual rep dropdown selection" },
          { capability: "Boardroom Financial Forecasting", ourAdvantage: "Low", incumbentBenchmark: "Clari has 8 years of historical model training" },
        ],
        whiteSpaceOpportunities: [
          {
            gap: "The 'Invisible CRM' Experience",
            whyUnaddressed: "Incumbents treat reps as data entry clerks rather than eliminating data entry entirely.",
            tacticalExploitation: "Market OmniFlow as the invisible assistant that updates your CRM while you sleep.",
          },
          {
            gap: "Instant Mid-Market Self-Serve Provisioning",
            whyUnaddressed: "Legacy platforms rely on high-touch enterprise deployment consultants.",
            tacticalExploitation: "Offer 4-minute OAuth onboarding with automated schema mapping.",
          },
        ],
        moatAssessment: {
          primaryMoatType: "Proprietary Data Flywheel",
          moatScoreOutOfTen: 7.8,
          durabilityVerdict: "High switching costs once autonomous bidirectional field sync rules become foundational to customer RevOps workflows.",
        },
      },
      customers: {
        primaryICP: {
          archetypeName: "Overwhelmed Mid-Market VP of Revenue Operations",
          roleTitle: "VP of RevOps / Head of Sales Operations",
          organizationType: "B2B SaaS companies with 50-250 employees and $5M-$30M ARR",
          dayInTheLife: "Spends Monday mornings auditing inconsistent deal stages, chasing reps over Slack for missing close dates, and fielding urgent emails from the CFO about forecast credibility.",
          acutePainPoints: [
            "35% of pipeline opportunities contain inaccurate next steps and stale close dates.",
            "Account executives waste 7+ hours weekly updating fields rather than talking to prospects.",
            "CFO and CEO demand forecast confidence that sales ops cannot mathematically defend.",
          ],
          triggerEvent: "A board meeting where the forecast was missed by 25% due to 3 ghost deals lingering in final pipeline stages.",
          decisionKpi: "Pipeline forecast variance under 5% and sales rep selling time increased by 15%.",
        },
        secondaryICP: {
          archetypeName: "Quota-Carrying Senior Account Executive",
          roleTitle: "Senior Enterprise AE",
          relationshipToBuyer: "End user whose compliance the VP is trying to enforce.",
          keyBenefit: "Recovers 90 minutes of daily administrative busywork so they can hit their quarterly quota.",
        },
        jobsToBeDone: {
          functionalJob: "Keep Salesforce and HubSpot pipeline fields perfectly accurate without requiring human data entry.",
          emotionalJob: "Feel in total control during board meetings without anxiety over hidden deal rot.",
          socialJob: "Be recognized across the executive team as a strategic revenue architect rather than an administrative nag.",
        },
        willingnessToPay: {
          pricingMetric: "Per active sales rep per month",
          starterTier: { price: "$29/rep/mo", valueAnchor: "Costs less than 1 hour of AE base salary per month." },
          growthTier: { price: "$69/rep/mo", valueAnchor: "Full autonomous multi-agent synchronization and automated field write-backs." },
          enterpriseTier: { price: "Custom ($25k+/yr)", valueAnchor: "Dedicated SOC2 audit trails, custom CRM schema mapping, and priority SLA." },
        },
        momTestQuestions: [
          {
            question: "Walk me through what happened the last time your forecast missed the quarterly target. Where did the discrepancy come from?",
            probingObjective: "Uncover whether bad CRM data hygiene was recognized as the root cause.",
            positiveSignal: "Recounts an agonizing weekend spent combing through individual opportunity close dates in spreadsheets.",
            falsePositiveTrap: "'Yeah forecasting is hard, an AI tool that predicts things would be awesome!' (Polite speculation without past pain).",
          },
          {
            question: "What have you paid for in the past 12 months to fix CRM hygiene?",
            probingObjective: "Verify real willingness to pay by auditing past budget allocation.",
            positiveSignal: "Mentions spending $20k on an external RevOps agency or dedicated Zapier/Enrichment seats.",
            falsePositiveTrap: "'We always talk about fixing it, but haven't had time to look.' (Low problem urgency).",
          },
          {
            question: "How do your sales reps react when you introduce new required fields in Salesforce?",
            probingObjective: "Determine change management resistance and user pushback.",
            positiveSignal: "Describes reps actively boycotting or entering garbage dummy text just to pass validation rules.",
            falsePositiveTrap: "'Our team is great, they follow whatever process we set.' (Rarely true in practice).",
          },
          {
            question: "Who signs off on sales operations software purchases under $15k?",
            probingObjective: "Confirm budget sign-off authority and decision cycle.",
            positiveSignal: "VP can approve directly on corporate card without procurement committee.",
            falsePositiveTrap: "'Anyone can propose ideas and we evaluate as a team.' (Indicates long committee paralysis).",
          },
        ],
      },
      validation: {
        overallViabilityScore: 86,
        verdict: "STRONG VENTURE CANDIDATE",
        dimensionalScores: {
          problemUrgency: 90,
          marketTiming: 94,
          moatDefensibility: 76,
          technicalFeasibility: 88,
          unitEconomics: 84,
          regulatoryEase: 82,
        },
        unitEconomicsProjection: {
          estimatedCAC: "$1,350 (blended founder outbound & community inbound)",
          estimatedLTV: "$6,624 (assuming 24-month retention at $276/mo average contract)",
          ltvCacRatio: 4.9,
          paybackMonths: 4.8,
          grossMarginPercent: 86,
          economicHealthVerdict: "Exceptional venture-scale unit economics with rapid sub-5-month payback and healthy 4.9x LTV/CAC ratio.",
        },
        killRisks: [
          {
            threat: "Salesforce Agentforce Native Capability Cannibalization",
            severity: "Critical",
            leadIndicator: "Salesforce ships autonomous background field reconciliation natively in core Sales Cloud.",
            countermeasure: "Position as a cross-platform data fabric connecting Salesforce, HubSpot, Gong, and Slack rather than a single-CRM utility.",
          },
          {
            threat: "OAuth Token Security Hesitation from Enterprise InfoSec",
            severity: "High",
            leadIndicator: "Deals stall during security review for over 30 days.",
            countermeasure: "Implement a zero-retention local agent architecture where customer CRM records and credentials never touch external servers.",
          },
          {
            threat: "CRM API Rate Limit Bottlenecks",
            severity: "Moderate",
            leadIndicator: "Customer API quotas are exhausted during bulk sync runs.",
            countermeasure: "Use webhook subscriptions and delta change events rather than continuous polling.",
          },
        ],
        strategicPivots: [
          {
            pivotAngle: "Vertical Compliance CRM for Life Sciences / FinTech",
            shiftSummary: "Focus on regulated verticals where audit trails are legally mandated by the SEC or FDA.",
            rationale: "Regulatory compulsion unlocks 3x higher pricing power ($300/rep/mo) and near-zero churn.",
            projectedAdvantage: "Deep vertical moat that horizontal tech giants cannot replicate.",
          },
          {
            pivotAngle: "Embedded OEM Engine for CRM Consultancies",
            shiftSummary: "Sell OmniFlow as a white-label backend for systems integrators like Slalom and Accenture.",
            rationale: "Leverages consultancies' existing client base with zero outbound sales friction.",
            projectedAdvantage: "Immediate distribution into Fortune 1000 accounts.",
          },
        ],
      },
      execution: {
        ninetyDayRoadmap: [
          {
            sprintNumber: 1,
            timeframeDays: "Days 1–30",
            focusTheme: "Problem Validation & Concierge Prototype",
            keyMilestones: [
              "Conduct 25 Mom-Test discovery interviews with VP RevOps leaders",
              "Build semi-automated concierge script to manually sync CRM records for 3 pilot design partners",
            ],
            concreteDeliverables: [
              "Clickable Figma workflow prototype",
              "Signed LOIs from 3 companies agreeing to pilot upon release",
            ],
            stageGateMetric: "3 signed pilot LOIs with access to sandbox CRM environments.",
          },
          {
            sprintNumber: 2,
            timeframeDays: "Days 31–60",
            focusTheme: "Private Alpha & Core Loop Stabilization",
            keyMilestones: [
              "Deploy OAuth integration for Salesforce and HubSpot",
              "Run automated daily background synchronization for 3 alpha design partners",
            ],
            concreteDeliverables: [
              "Production MVP with background queue and rollback safety",
              "Real-time audit dashboard showing fields reconciled",
            ],
            stageGateMetric: "Zero data corruption incidents and pilot daily active usage >80%.",
          },
          {
            sprintNumber: 3,
            timeframeDays: "Days 61–90",
            focusTheme: "Public Beta & Monetization Activation",
            keyMilestones: [
              "Launch self-serve onboarding with Stripe billing integration",
              "Convert 3 alpha partners to paid annual contracts and launch Product Hunt campaign",
            ],
            concreteDeliverables: [
              "Self-serve pricing checkout and team seat management",
              "Customer case study showcasing 10+ hours saved per rep weekly",
            ],
            stageGateMetric: "$5,000 in monthly recurring revenue (MRR) or 15 paying customer accounts.",
          },
        ],
        moscowScope: {
          mustHave: [
            "1-Click OAuth connection to Salesforce & HubSpot",
            "Automated opportunity stage and close-date discrepancy scanner",
            "Bi-directional field sync with manual rollback safety button",
          ],
          shouldHave: [
            "Slack daily morning digest of changed pipeline records",
            "Custom regex rule builder for enterprise CRM field mappings",
          ],
          wontHaveV1: [
            "Custom native mobile app (rely on web dashboard and Slack bot)",
            "Predictive deal win probability AI models (premature until data volume is high)",
            "Multi-currency enterprise billing ledger",
          ],
        },
        first100CustomersPlaybook: [
          {
            channel: "Targeted LinkedIn Founder Outbound",
            playType: "Founder Outbound",
            tacticalAction: "Filter Sales Navigator for VP RevOps at 50-200 person tech companies in North America who posted about hiring AEs in past 30 days.",
            messagingHook: "Hey [First Name], noticed you're scaling the AE team. How are you preventing pipeline data decay without spending Friday afternoons nagging reps?",
            targetCount: "Acquire 35 paying accounts via 500 personalized outbound touches (7% conversion).",
          },
          {
            channel: "RevOps Co-Op & Pavilion Community Teardowns",
            playType: "Community Hack",
            tacticalAction: "Offer free 15-minute 'CRM Data Hygiene Health Audits' in RevOps Slack communities, delivering an executive PDF showing deal rot.",
            messagingHook: "Free script to audit how many stale deals are currently contaminating your quarterly forecast.",
            targetCount: "Acquire 40 accounts through word-of-mouth community referrals.",
          },
          {
            channel: "HubSpot & Salesforce App Marketplace Listings",
            playType: "Integration Partner",
            tacticalAction: "Publish a certified free tier listing in the HubSpot App Marketplace targeting the 'data hygiene' search tag.",
            messagingHook: "Fix your dirty CRM data in 4 clicks without writing code.",
            targetCount: "Acquire 25 accounts via organic marketplace directory search.",
          },
        ],
        pitchDeckOutline: [
          { slideNumber: 1, title: "Cover / Vision", coreHook: "The Autonomous Operations Layer for Modern B2B Revenue Teams.", keyEvidence: "Founding team pedigree & category vision" },
          { slideNumber: 2, title: "The Problem", coreHook: "Sales reps spend 28% of their time typing notes into CRMs; forecasts remain fatally inaccurate.", keyEvidence: "$250k average annual pipeline leakage per mid-market company" },
          { slideNumber: 3, title: "The Solution", coreHook: "Zero-click background agentic intelligence that keeps CRM records perfectly synchronized.", keyEvidence: "10 rep-hours saved per week; 94% forecast accuracy" },
          { slideNumber: 4, title: "Market Size (TAM/SAM/SOM)", coreHook: "A $14.2B global enterprise software market expanding at 18.4% CAGR.", keyEvidence: "$3.8B addressable SAM in North America and Western Europe" },
          { slideNumber: 5, title: "Product & Live Demo", coreHook: "4-minute self-serve onboarding with real-time bi-directional sync.", keyEvidence: "Interactive diagram of autonomous agent pipeline" },
          { slideNumber: 6, title: "Business Model & Unit Economics", coreHook: "$69/rep/month SaaS subscription with high 86% gross margins.", keyEvidence: "4.9x LTV/CAC ratio and 4.8-month cash payback period" },
          { slideNumber: 7, title: "Competitive Defensibility & Moat", coreHook: "Proprietary sync rules and CRM write hooks create high switching costs.", keyEvidence: "Zero-storage local agent architecture prevents data privacy pushback" },
          { slideNumber: 8, title: "Go-To-Market Flywheel", coreHook: "Founder outbound + RevOps community teardowns + marketplace listings.", keyEvidence: "Clear path from 10 design partners to first 100 paid customers" },
          { slideNumber: 9, title: "Traction & Milestones", coreHook: "Active pilot LOIs and validation metrics.", keyEvidence: "3 signed enterprise letters of intent" },
          { slideNumber: 10, title: "The Ask & Use of Funds", coreHook: "Raising $1.5M Seed round to accelerate engineering and scale first 100 customer sales.", keyEvidence: "18-month runway to reach $1.2M ARR" },
        ],
      },
      citations: [
        { title: "Gartner 2025 Revenue Operations Magic Quadrant", url: "https://www.gartner.com/en/sales/research/revops", domain: "gartner.com" },
        { title: "Forrester Wave: B2B Revenue Intelligence Platforms", url: "https://www.forrester.com/report/revenue-intelligence", domain: "forrester.com" },
        { title: "State of Sales Data Hygiene & Forecasting Report", url: "https://salesforce.com/research/state-of-sales", domain: "salesforce.com" },
      ],
      telemetry: {
        durationMs: 4230,
        agentsExecuted: 6,
        primaryLlm: "gemini",
        groundingHits: 8,
        cacheHit: true,
      },
    },
  },
  {
    id: "verdetrace",
    badge: "ClimateTech / Supply Chain",
    title: "VerdeTrace",
    tagline: "Autonomous Scope 3 carbon accounting and supplier compliance platform.",
    category: "ClimateTech & Supply Chain Sustainability",
    input: {
      idea: "An automated Scope 3 emissions tracing engine that connects directly to ERP and logistics APIs (SAP, Oracle, Flexport) to calculate product-level carbon footprints and generate audit-ready CSRD compliance reports for EU and US enterprise supply chains.",
      region: "European Union & North America",
      businessModel: "Enterprise Annual Subscription",
      targetCustomer: "Chief Sustainability Officers & Supply Chain Directors ($50M+ Revenue)",
      stage: "Pre-Seed",
    },
    precompiledDossier: {
      id: "va_preset_verdetrace",
      createdAt: new Date().toISOString(),
      input: {
        idea: "An automated Scope 3 emissions tracing engine that connects directly to ERP and logistics APIs (SAP, Oracle, Flexport) to calculate product-level carbon footprints and generate audit-ready CSRD compliance reports for EU and US enterprise supply chains.",
        region: "European Union & North America",
        businessModel: "Enterprise Annual Subscription",
        targetCustomer: "Chief Sustainability Officers & Supply Chain Directors ($50M+ Revenue)",
        stage: "Pre-Seed",
      },
      framing: {
        ventureName: "VerdeTrace",
        oneLiner: "Automated Scope 3 emissions accounting and supply chain CSRD compliance engine.",
        category: "Enterprise ClimateTech & Supply Chain Compliance",
        valueProposition: "Reduces audit readiness cycles from 5 months to 4 days while cutting Scope 3 calculation errors by 88% through direct ERP ledger integration.",
        archetype: "Enterprise Compliance & Data Infrastructure",
        targetGeography: "European Union & North America",
        coreHypothesis: "Because the EU CSRD mandate imposes heavy fines on non-compliant enterprises, mid-market manufacturers will pay $40k+/yr for automated ERP-linked Scope 3 calculation rather than paying $150k+ to legacy consultancies.",
        searchQueries: {
          market: "Scope 3 carbon accounting software market size CSRD mandate 2025",
          competitors: "Watershed Sweep Persefoni carbon accounting software comparison",
          customers: "Supply chain director Scope 3 data collection pain points",
          risks: "CSRD compliance enforcement delays enterprise pushback",
        },
      },
      market: {
        tam: {
          valueFormatted: "$18.6 Billion",
          numericBillions: 18.6,
          formula: "62,000 Impacted Global Enterprises * $300,000 Average Compliance & Software Spend",
          methodology: "EU Corporate Sustainability Reporting Directive (CSRD) & SEC Climate Disclosure mandate analysis.",
        },
        sam: {
          valueFormatted: "$4.9 Billion",
          numericBillions: 4.9,
          rationale: "European and US mid-to-large manufacturers ($50M-$500M revenue) with multi-tier supplier networks.",
        },
        som: {
          valueFormatted: "$98 Million",
          numericBillions: 0.098,
          milestoneYear: "Year 4 Target",
          rationale: "Capture of ~2,400 mid-market enterprise accounts at $40,000 average ACV through ERP partner channels.",
        },
        cagrPercent: 24.6,
        marketMaturity: "Emerging / Nascent",
        tailwinds: [
          { trend: "Legally Binding Regulatory Deadlines", impact: "EU CSRD penalties kick in with mandatory third-party limited assurance audits." },
          { trend: "Retailer Mandates (Walmart, IKEA)", impact: "Tier 1 suppliers face delisting if they cannot provide audited carbon data." },
        ],
        headwinds: [
          { barrier: "Supplier Data Inertia", threatLevel: "Severe", description: "Tier 3 suppliers in emerging markets lack digital ledgers or accurate energy data." },
          { barrier: "Consulting Incumbents (Big 4)", threatLevel: "Moderate", description: "PwC, EY, and Deloitte bundling manual consulting audits with accounting services." },
        ],
        regulatoryLandscape: {
          summary: "Governed by EU CSRD, SEC Climate Rules, and GHG Protocol Scope 3 standards. Requires cryptographic audit trail for external auditors.",
          keyRegulations: ["EU CSRD / ESRS E1", "GHG Protocol Scope 3 Standards", "ISO 14064 Carbon Footprint Verification"],
          complianceDifficulty: "Heavy",
        },
      },
      competitors: {
        directCompetitors: [
          {
            name: "Watershed",
            url: "https://watershed.com",
            tagline: "Enterprise climate platform for running a sustainability program",
            pricingModel: "$60k - $250k+/year enterprise contracts",
            estimatedStageOrFunding: "Series C ($240M Raised, $1.8B Valuation)",
            coreStrengths: ["Prestigious brand backing (Sequoia, Kleiner Perkins)", "High customer trust", "Extensive emissions factor database"],
            criticalWeaknesses: ["Tailored for Fortune 500 tech/finance rather than physical manufacturing", "Requires significant manual data cleansing"],
          },
          {
            name: "Persefoni",
            url: "https://persefoni.com",
            tagline: "Climate management and accounting platform for financial institutions",
            pricingModel: "Enterprise contracts ($50k+/year)",
            estimatedStageOrFunding: "Series C ($150M+ Raised)",
            coreStrengths: ["Financial institution and carbon portfolio accounting dominance", "Deep PCAF standard compliance"],
            criticalWeaknesses: ["Complex financial interface unsuited for supply chain operations", "High implementation friction"],
          },
        ],
        indirectAlternatives: [
          {
            name: "Big 4 Accounting Consultants (PwC/Deloitte)",
            howUsersSolveItToday: "Hiring consultants at $300/hour to send email surveys to suppliers and build manual Excel models.",
            churnVulnerability: "Costs $150k-$300k every year; takes 5 months and results in non-repeatable static reports.",
          },
          {
            name: "Internal Custom Spreadsheets",
            howUsersSolveItToday: "Sustainability teams compiling disconnected Excel files across procurement teams.",
            churnVulnerability: "High audit failure rate due to lack of version control and formula corruption.",
          },
        ],
        positioningMatrix: {
          xAxisLabel: "Manual Consultant Heavy <---> Automated API & ERP Ledger Connected",
          yAxisLabel: "Corporate / Financial Focus <---> Physical Supply Chain & Manufacturing Focus",
          quadrantNotes: {
            topRight: "Automated & Supply-Chain Specialized (VerdeTrace Focus)",
            bottomRight: "Automated Corporate Generalist",
            topLeft: "Consulting Manual Audits (Big 4)",
            bottomLeft: "Basic Carbon Offsetting Point Tools",
          },
          points: [
            {
              name: "VerdeTrace",
              x: 85,
              y: 80,
              isOurVenture: true,
              rationale: "Direct ERP invoice line-item integration purpose-built for multi-tier manufacturing supply chains.",
            },
            {
              name: "Watershed",
              x: 50,
              y: -20,
              isOurVenture: false,
              rationale: "Great corporate ESG tool, but lacks deep multi-tier logistics Bill of Materials (BOM) decomposition.",
            },
            {
              name: "PwC / Big 4",
              x: -80,
              y: 50,
              isOurVenture: false,
              rationale: "Deep enterprise trust, but 100% manual billable-hour model.",
            },
          ],
        },
        featureComparisonMatrix: [
          { capability: "Automated ERP BOM Item Mapping", ourAdvantage: "High", incumbentBenchmark: "Manual spreadsheet upload" },
          { capability: "Audit-Ready CSRD One-Click Report", ourAdvantage: "High", incumbentBenchmark: "Takes 6-8 weeks of manual consultant drafting" },
          { capability: "Fortune 100 Brand Recognition", ourAdvantage: "Low", incumbentBenchmark: "Watershed and Persefoni lead with enterprise logos" },
          { capability: "Supplier Zero-Login Portal", ourAdvantage: "High", incumbentBenchmark: "Requires paid enterprise seat" },
        ],
        whiteSpaceOpportunities: [
          {
            gap: "Self-Service Tier 2/3 Supplier Portal",
            whyUnaddressed: "Incumbents charge by user seats, penalizing companies for inviting hundreds of external small suppliers.",
            tacticalExploitation: "Provide unlimited free supplier data entry portals with automated OCR invoice scanning.",
          },
          {
            gap: "Audit-Provenance Cryptographic Ledger",
            whyUnaddressed: "Incumbents output static PDFs without source line-item traceability.",
            tacticalExploitation: "Generate verifiable data hash stamps for third-party auditing firms.",
          },
        ],
        moatAssessment: {
          primaryMoatType: "Network Effects",
          moatScoreOutOfTen: 8.5,
          durabilityVerdict: "Once suppliers enter data for one customer on VerdeTrace, their profile is shared across all buyers in the network, creating an insurmountable data flywheel.",
        },
      },
      customers: {
        primaryICP: {
          archetypeName: "Chief Sustainability Officer & Supply Chain Risk VP",
          roleTitle: "VP of Global Supply Chain / CSO",
          organizationType: "European & US industrial manufacturers with $50M-$500M annual revenue",
          dayInTheLife: "Drowning in customer questionnaires from enterprise retail buyers asking for product-level carbon footprints, while suppliers ignore email requests for utility bills.",
          acutePainPoints: [
            "Legal threat of massive EU CSRD non-compliance fines.",
            "Suppliers refuse to respond to 50-page carbon questionnaires.",
            "Board demands transparent ESG data without paying millions in consultant fees.",
          ],
          triggerEvent: "Receiving a formal notice from their largest customer (e.g. BMW or Walmart) that contracts will be paused unless verified emissions data is provided.",
          decisionKpi: "Passing the independent external audit with zero material discrepancies in under 30 days.",
        },
        secondaryICP: {
          archetypeName: "Tier 1 Factory Quality Director",
          roleTitle: "Director of Plant Operations",
          relationshipToBuyer: "Operational partner who must supply the actual energy and shipment data.",
          keyBenefit: "Automated ERP connector extracts data without requiring manual questionnaire forms.",
        },
        jobsToBeDone: {
          functionalJob: "Aggregate multi-tier Scope 3 carbon emissions data and produce legally compliant CSRD audit packages.",
          emotionalJob: "Relief from the terror of regulatory fines or losing marquee enterprise buyer accounts.",
          socialJob: "Position the company as a pioneering green manufacturer winning preferential contracts.",
        },
        willingnessToPay: {
          pricingMetric: "Per enterprise company per year (based on supplier network size)",
          starterTier: { price: "$18,000/yr", valueAnchor: "Up to 100 connected suppliers with standard CSRD templates." },
          growthTier: { price: "$42,000/yr", valueAnchor: "Up to 500 connected suppliers with live ERP connectors and auditor portal." },
          enterpriseTier: { price: "$95,000/yr", valueAnchor: "Unlimited suppliers, custom emissions factor modeling, and dedicated audit support." },
        },
        momTestQuestions: [
          {
            question: "How did your team assemble last year's sustainability disclosures, and how much did you pay external auditors or consultants?",
            probingObjective: "Quantify real budget allocation and process misery.",
            positiveSignal: "Cites paying $120k to an accounting firm and spending 400 internal staff hours.",
            falsePositiveTrap: "'We care deeply about sustainability and plan to invest heavily.' (Virtue signaling without past budget).",
          },
          {
            question: "What happened the last time a major retail buyer asked for product carbon footprint data?",
            probingObjective: "Check if failure to supply data has real commercial consequences.",
            positiveSignal: "Admitted that a $2M contract was delayed or nearly lost because of missing Scope 3 documentation.",
            falsePositiveTrap: "'They asked for it on a survey once, but never followed up.' (Low urgency).",
          },
          {
            question: "What percentage of your suppliers actually respond to email questionnaires on emissions?",
            probingObjective: "Measure supplier friction and data collection bottlenecks.",
            positiveSignal: "Reports response rates below 20% after 3 months of chasing.",
            falsePositiveTrap: "'Our suppliers are very collaborative.' (Rarely true for Tier 2/3).",
          },
          {
            question: "What happens if you fail your limited assurance CSRD audit next year?",
            probingObjective: "Test legal compulsion and executive stakes.",
            positiveSignal: "Lists specific fines up to 5% of turnover or executive liability.",
            falsePositiveTrap: "'We'll probably get an extension.' (Complacent posture).",
          },
        ],
      },
      validation: {
        overallViabilityScore: 89,
        verdict: "STRONG VENTURE CANDIDATE",
        dimensionalScores: {
          problemUrgency: 96,
          marketTiming: 98,
          moatDefensibility: 84,
          technicalFeasibility: 80,
          unitEconomics: 88,
          regulatoryEase: 85,
        },
        unitEconomicsProjection: {
          estimatedCAC: "$4,800 (account-based marketing and partner channel sales)",
          estimatedLTV: "$126,000 (assuming 3-year enterprise retention at $42,000 ACV)",
          ltvCacRatio: 26.25,
          paybackMonths: 1.4,
          grossMarginPercent: 82,
          economicHealthVerdict: "Elite enterprise B2B software economics driven by high mandatory ACVs and immediate upfront annual billing.",
        },
        killRisks: [
          {
            threat: "EU Regulatory Enforcement Rollback or Postponement",
            severity: "Critical",
            leadIndicator: "European Parliament introduces an amendment postponing CSRD audit deadlines by 2 years.",
            countermeasure: "Anchor product value on supply chain cost reduction (energy efficiency and scrap reduction) rather than pure regulatory compliance.",
          },
          {
            threat: "SAP / Oracle Native ESG Module Releases",
            severity: "High",
            leadIndicator: "SAP launches out-of-the-box Scope 3 calculator bundled free with S/4HANA.",
            countermeasure: "Focus on multi-ERP environments where suppliers use hundreds of heterogeneous legacy platforms that SAP cannot unify.",
          },
          {
            threat: "Data Privacy Concerns from Competitive Suppliers",
            severity: "Moderate",
            leadIndicator: "Suppliers refuse to share bill of materials data fearing price discovery.",
            countermeasure: "Implement zero-knowledge proofs and differential privacy on supplier manufacturing formulas.",
          },
        ],
        strategicPivots: [
          {
            pivotAngle: "Green Logistics & Freight Optimization Engine",
            shiftSummary: "Pivot from passive retrospective carbon reporting to real-time low-carbon freight route selection.",
            rationale: "Directly saves freight shipping costs while cutting emissions simultaneously.",
            projectedAdvantage: "Demonstrates immediate cash ROI rather than purely satisfying compliance.",
          },
          {
            pivotAngle: "CBAM (Carbon Border Adjustment Mechanism) Tariff Engine",
            shiftSummary: "Focus exclusively on foreign importers calculating EU carbon border tax penalties.",
            rationale: "Direct cash impact on import duties creates urgent financial ROI.",
            projectedAdvantage: "Unlocks global industrial importers outside the EU.",
          },
        ],
      },
      execution: {
        ninetyDayRoadmap: [
          {
            sprintNumber: 1,
            timeframeDays: "Days 1–30",
            focusTheme: "Compliance Framework & Manual Pilot",
            keyMilestones: [
              "Partner with 2 mid-market industrial manufacturers facing imminent CSRD reporting deadlines",
              "Manually audit 50 supplier invoices and calculate product emissions using standard GHG factors",
            ],
            concreteDeliverables: [
              "Auditor-approved pilot carbon disclosure package",
              "Signed paid pilot agreements ($10k each) converting to annual contracts upon software launch",
            ],
            stageGateMetric: "External sustainability auditor confirms calculations meet CSRD assurance standards.",
          },
          {
            sprintNumber: 2,
            timeframeDays: "Days 31–60",
            focusTheme: "Automated Ingestion Engine & Supplier Portal",
            keyMilestones: [
              "Deploy SAP and CSV ingestion pipeline with automated emission factor matching",
              "Launch zero-login supplier upload portal with OCR document parsing",
            ],
            concreteDeliverables: [
              "Working software ingestion pipeline processing 1,000 invoices in under 60 seconds",
              "Supplier response rate exceeding 65% within 14 days",
            ],
            stageGateMetric: "Processing error rate below 3% across 5,000 simulated supplier line items.",
          },
          {
            sprintNumber: 3,
            timeframeDays: "Days 61–90",
            focusTheme: "Auditor Console & Enterprise Expansion",
            keyMilestones: [
              "Launch auditor console allowing external CPAs to inspect provenance with 1 click",
              "Sign 5 annual enterprise contracts totaling $200k ARR",
            ],
            concreteDeliverables: [
              "Live auditor verification portal with cryptographic SHA-256 data provenance stamps",
              "Case study showing 85% time reduction in CSRD audit readiness",
            ],
            stageGateMetric: "$200,000 in committed contract value (ACV).",
          },
        ],
        moscowScope: {
          mustHave: [
            "ERP Bill of Materials (BOM) invoice ingestion connector",
            "DEFRA / ecoinvent verified GHG emissions factor database mapping",
            "1-Click CSRD ESRS E1 audit-ready PDF/XBRL export",
          ],
          shouldHave: [
            "Automated email reminder workflow for unresponsive suppliers",
            "Scenario planner simulating supplier emissions reduction impacts",
          ],
          wontHaveV1: [
            "Carbon offset marketplace trading",
            "Real-time IoT sensor hardware integrations",
            "Public consumer-facing eco-labels",
          ],
        },
        first100CustomersPlaybook: [
          {
            channel: "Regional Sustainability Auditor Partnerships (PwC/BDO/KPMG)",
            playType: "Integration Partner",
            tacticalAction: "Present VerdeTrace to mid-market audit partners who struggle with messy client Excel sheets.",
            messagingHook: "Use our software to audit your clients' Scope 3 data in 3 days instead of 3 weeks.",
            targetCount: "35 enterprise clients referred directly by accounting firms.",
          },
          {
            channel: "Account-Based Marketing to CSRD-Impacted Exporters",
            playType: "Founder Outbound",
            tacticalAction: "Target US and UK automotive/machinery suppliers selling >$10M into Germany and France.",
            messagingHook: "Are your EU customer contracts protected against the January 2026 CSRD audit deadline?",
            targetCount: "45 paying enterprises via targeted executive briefings.",
          },
          {
            channel: "Trade Association Webinars & Free Benchmarking Audits",
            playType: "Content & SEO",
            tacticalAction: "Host joint webinars with European Manufacturing Associations offering free Scope 3 readiness assessments.",
            messagingHook: "Benchmark your product line carbon intensity against EU regulatory averages.",
            targetCount: "20 enterprises through inbound workshop leads.",
          },
        ],
        pitchDeckOutline: [
          { slideNumber: 1, title: "Cover / Category", coreHook: "The Compliance Operating System for Global Supply Chain Decarbonization.", keyEvidence: "Targeting $18.6B Scope 3 CSRD compliance market" },
          { slideNumber: 2, title: "The Problem", coreHook: "EU CSRD regulations mandate audited Scope 3 data; enterprises face $100k+ consultant bills or customer contract cancellations.", keyEvidence: "62,000 enterprises legally mandated to comply by 2026" },
          { slideNumber: 3, title: "The Solution", coreHook: "Automated ERP ledger ingestion and frictionless supplier portals producing audit-ready disclosures in days.", keyEvidence: "88% cost reduction compared to legacy audit firms" },
          { slideNumber: 4, title: "Market Opportunity", coreHook: "$4.9B SAM in EU and US industrial mid-market growing at 24.6% CAGR.", keyEvidence: "Mandatory regulatory tailwind guarantees software adoption" },
          { slideNumber: 5, title: "Product Architecture", coreHook: "Direct ERP connectors + GHG factor engine + cryptographic auditor console.", keyEvidence: "4-day audit readiness turnaround" },
          { slideNumber: 6, title: "Business Model & Unit Economics", coreHook: "$42,000 average ACV annual subscriptions with 82% gross margins.", keyEvidence: "26x LTV/CAC ratio and 1.4-month payback" },
          { slideNumber: 7, title: "Network Moat & Data Flywheel", coreHook: "Supplier data network effect: each connected supplier benefits all other buyers in the network.", keyEvidence: "Proprietary catalog of verified product footprints" },
          { slideNumber: 8, title: "Go-To-Market Execution", coreHook: "Auditor referral channels + trade association workshops + account-based outbound.", keyEvidence: "Clear roadmap to $2M ARR in 18 months" },
          { slideNumber: 9, title: "Traction & Pilots", coreHook: "2 industrial design partners and validated auditor approval.", keyEvidence: "$50k in contracted pilot revenue" },
          { slideNumber: 10, title: "The Ask & Allocation", coreHook: "Raising $2.0M Seed round to expand engineering and scale European auditor distribution.", keyEvidence: "18-month runway to reach $2.5M ARR" },
        ],
      },
      citations: [
        { title: "European Commission: Corporate Sustainability Reporting Directive", url: "https://finance.ec.europa.eu/capital-markets-union-and-financial-markets/company-reporting-and-auditing/company-reporting/corporate-sustainability-reporting_en", domain: "ec.europa.eu" },
        { title: "GHG Protocol Corporate Value Chain (Scope 3) Standard", url: "https://ghgprotocol.org/standards/scope-3-standard", domain: "ghgprotocol.org" },
        { title: "SEC Climate-Related Disclosures for Investors", url: "https://www.sec.gov/news/press-release/2024-31", domain: "sec.gov" },
      ],
      telemetry: {
        durationMs: 5120,
        agentsExecuted: 6,
        primaryLlm: "gemini",
        groundingHits: 11,
        cacheHit: true,
      },
    },
  },
];
