import { z } from "zod";

// =============================================================================
// ROBUST NORMALIZERS FOR LLM NON-DETERMINISM
// =============================================================================

export function normalizeMarketMaturity(val: unknown): string {
  if (typeof val !== "string") return "High-Growth / Early Adoption";
  const lower = val.toLowerCase();
  if (lower.includes("emerging") || lower.includes("nascent")) return "Emerging / Nascent";
  if (lower.includes("growth") || lower.includes("adopt") || lower.includes("scaling")) {
    return "High-Growth / Early Adoption";
  }
  if (lower.includes("consolidat")) return "Consolidating";
  if (lower.includes("mature") || lower.includes("saturat")) return "Mature / Saturated";
  return "High-Growth / Early Adoption";
}

export function normalizeThreatLevel(val: unknown): "Low" | "Moderate" | "Severe" {
  if (typeof val !== "string") return "Moderate";
  const lower = val.toLowerCase();
  if (
    lower.includes("sev") ||
    lower.includes("crit") ||
    lower.includes("high") ||
    lower.includes("urgent")
  ) {
    return "Severe";
  }
  if (lower.includes("low") || lower.includes("min") || lower.includes("negligible")) {
    return "Low";
  }
  return "Moderate";
}

export function normalizeComplianceDifficulty(
  val: unknown
): "Minimal" | "Moderate" | "Heavy" {
  if (typeof val !== "string") return "Moderate";
  const lower = val.toLowerCase();
  if (
    lower.includes("heavy") ||
    lower.includes("high") ||
    lower.includes("strict") ||
    lower.includes("complex") ||
    lower.includes("severe")
  ) {
    return "Heavy";
  }
  if (lower.includes("min") || lower.includes("low") || lower.includes("easy")) {
    return "Minimal";
  }
  return "Moderate";
}

export function normalizeAdvantage(val: unknown): "High" | "Medium" | "Low" {
  if (typeof val !== "string") return "Medium";
  const lower = val.toLowerCase();
  if (
    lower.includes("high") ||
    lower.includes("strong") ||
    lower.includes("superior") ||
    lower.includes("best")
  ) {
    return "High";
  }
  if (lower.includes("low") || lower.includes("weak") || lower.includes("inferior")) {
    return "Low";
  }
  return "Medium";
}

export function normalizeMoatType(
  val: unknown
):
  | "Network Effects"
  | "Switching Costs"
  | "Proprietary Data Flywheel"
  | "Process Power / Speed"
  | "Brand & Trust" {
  if (typeof val !== "string") return "Proprietary Data Flywheel";
  const lower = val.toLowerCase();
  if (lower.includes("network")) return "Network Effects";
  if (lower.includes("switch")) return "Switching Costs";
  if (lower.includes("data") || lower.includes("flywheel")) {
    return "Proprietary Data Flywheel";
  }
  if (lower.includes("process") || lower.includes("speed")) {
    return "Process Power / Speed";
  }
  if (lower.includes("brand") || lower.includes("trust") || lower.includes("reput")) {
    return "Brand & Trust";
  }
  return "Proprietary Data Flywheel";
}

export function normalizeVerdict(
  val: unknown
):
  | "STRONG VENTURE CANDIDATE"
  | "PROMISING WITH REFINEMENTS"
  | "SIGNIFICANT PIVOT REQUIRED"
  | "HIGH FATALITY RISK" {
  if (typeof val !== "string") return "STRONG VENTURE CANDIDATE";
  const upper = val.toUpperCase();
  if (upper.includes("STRONG")) return "STRONG VENTURE CANDIDATE";
  if (upper.includes("PROMIS") || upper.includes("REFIN")) {
    return "PROMISING WITH REFINEMENTS";
  }
  if (upper.includes("PIVOT")) return "SIGNIFICANT PIVOT REQUIRED";
  if (
    upper.includes("FATAL") ||
    upper.includes("HIGH RISK") ||
    upper.includes("DANGER")
  ) {
    return "HIGH FATALITY RISK";
  }
  return "STRONG VENTURE CANDIDATE";
}

export function normalizeSeverity(
  val: unknown
): "Critical" | "High" | "Moderate" {
  if (typeof val !== "string") return "High";
  const lower = val.toLowerCase();
  if (
    lower.includes("crit") ||
    lower.includes("fatal") ||
    lower.includes("severe") ||
    lower.includes("extreme")
  ) {
    return "Critical";
  }
  if (lower.includes("mod") || lower.includes("med") || lower.includes("low")) {
    return "Moderate";
  }
  return "High";
}

export function normalizePlayType(
  val: unknown
):
  | "Founder Outbound"
  | "Community Hack"
  | "Content & SEO"
  | "Integration Partner" {
  if (typeof val !== "string") return "Founder Outbound";
  const lower = val.toLowerCase();
  if (
    lower.includes("communit") ||
    lower.includes("social") ||
    lower.includes("hack") ||
    lower.includes("forum")
  ) {
    return "Community Hack";
  }
  if (
    lower.includes("content") ||
    lower.includes("seo") ||
    lower.includes("inbound") ||
    lower.includes("blog")
  ) {
    return "Content & SEO";
  }
  if (
    lower.includes("partner") ||
    lower.includes("integrat") ||
    lower.includes("marketplace") ||
    lower.includes("app store")
  ) {
    return "Integration Partner";
  }
  return "Founder Outbound";
}

// =============================================================================
// DOMAIN SCHEMAS
// =============================================================================

/**
 * Validated Founder Intake Input
 */
export const FounderInputSchema = z.object({
  idea: z
    .string()
    .min(10, "Startup idea description must be at least 10 characters")
    .max(2500, "Startup idea description cannot exceed 2500 characters")
    .trim(),
  region: z
    .string()
    .min(2, "Region is required")
    .max(80)
    .default("Global"),
  businessModel: z
    .string()
    .min(2, "Business model is required")
    .max(80)
    .default("B2B SaaS"),
  targetCustomer: z
    .string()
    .max(120)
    .optional()
    .default("Early-Stage Tech Teams"),
  stage: z
    .enum(["Idea", "MVP", "Pre-Seed", "Seed", "Series A"])
    .optional()
    .default("Idea"),
});

export type FounderInput = z.infer<typeof FounderInputSchema>;

/**
 * Citation reference grounded in live web research
 */
export const SourceCitationSchema = z.object({
  title: z.string(),
  url: z.string().url(),
  domain: z.string(),
  snippet: z.string().optional(),
});

export type SourceCitation = z.infer<typeof SourceCitationSchema>;

/**
 * Stage 1: Idea Framing & Strategy Hypothesis
 */
export const FramingOutputSchema = z.object({
  ventureName: z.string().min(2).max(60),
  oneLiner: z.string().min(10).max(220),
  category: z.string().min(3).max(80),
  valueProposition: z.string().min(15).max(350),
  archetype: z.string().min(3).max(80),
  targetGeography: z.string().min(2).max(80),
  coreHypothesis: z.string().min(15).max(500),
  searchQueries: z.object({
    market: z.string().min(4).max(120),
    competitors: z.string().min(4).max(120),
    customers: z.string().min(4).max(120),
    risks: z.string().min(4).max(120),
  }),
});

export type FramingOutput = z.infer<typeof FramingOutputSchema>;

/**
 * Stage 2A: Market Research & Intelligence
 */
export const MarketOutputSchema = z.object({
  tam: z.object({
    valueFormatted: z.string(),
    numericBillions: z.coerce.number().min(0.001),
    formula: z.string(),
    methodology: z.string(),
  }),
  sam: z.object({
    valueFormatted: z.string(),
    numericBillions: z.coerce.number().min(0.0001),
    rationale: z.string(),
  }),
  som: z.object({
    valueFormatted: z.string(),
    numericBillions: z.coerce.number().min(0.00001),
    milestoneYear: z.string(),
    rationale: z.string(),
  }),
  cagrPercent: z.coerce.number().min(-50).max(300),
  marketMaturity: z.preprocess(
    normalizeMarketMaturity,
    z.enum([
      "Emerging / Nascent",
      "High-Growth / Early Adoption",
      "Consolidating",
      "Mature / Saturated",
    ])
  ),
  tailwinds: z.preprocess(
    (val) => (Array.isArray(val) ? val.slice(0, 8) : val),
    z.array(
      z.object({
        trend: z.string(),
        impact: z.string(),
      })
    ).min(1)
  ),
  headwinds: z.preprocess(
    (val) => (Array.isArray(val) ? val.slice(0, 8) : val),
    z.array(
      z.object({
        barrier: z.string(),
        threatLevel: z.preprocess(
          normalizeThreatLevel,
          z.enum(["Low", "Moderate", "Severe"])
        ),
        description: z.string(),
      })
    ).min(1)
  ),
  regulatoryLandscape: z.object({
    summary: z.string(),
    keyRegulations: z.array(z.string()),
    complianceDifficulty: z.preprocess(
      normalizeComplianceDifficulty,
      z.enum(["Minimal", "Moderate", "Heavy"])
    ),
  }),
});

export type MarketOutput = z.infer<typeof MarketOutputSchema>;

/**
 * Stage 2B: Competitor Reconnaissance & Positioning
 */
export const CompetitorItemSchema = z.object({
  name: z.string(),
  url: z.string().catch("https://google.com"),
  tagline: z.string(),
  pricingModel: z.string(),
  estimatedStageOrFunding: z.string(),
  coreStrengths: z.array(z.string()).min(1),
  criticalWeaknesses: z.array(z.string()).min(1),
});

export const PositioningPointSchema = z.object({
  name: z.string(),
  x: z.coerce.number().min(-100).max(100),
  y: z.coerce.number().min(-100).max(100),
  isOurVenture: z.boolean().default(false),
  rationale: z.string(),
});

export const CompetitorOutputSchema = z.object({
  directCompetitors: z.preprocess(
    (val) => (Array.isArray(val) ? val.slice(0, 8) : val),
    z.array(CompetitorItemSchema).min(1)
  ),
  indirectAlternatives: z.preprocess(
    (val) => (Array.isArray(val) ? val.slice(0, 6) : val),
    z.array(
      z.object({
        name: z.string(),
        howUsersSolveItToday: z.string(),
        churnVulnerability: z.string(),
      })
    ).min(1)
  ),
  positioningMatrix: z.object({
    xAxisLabel: z.string(),
    yAxisLabel: z.string(),
    quadrantNotes: z.object({
      topRight: z.string(),
      bottomRight: z.string(),
      topLeft: z.string(),
      bottomLeft: z.string(),
    }),
    points: z.array(PositioningPointSchema).min(2),
  }),
  featureComparisonMatrix: z.preprocess(
    (val) => (Array.isArray(val) ? val.slice(0, 10) : val),
    z.array(
      z.object({
        capability: z.string(),
        ourAdvantage: z.preprocess(
          normalizeAdvantage,
          z.enum(["High", "Medium", "Low"])
        ),
        incumbentBenchmark: z.string(),
      })
    ).min(2)
  ),
  whiteSpaceOpportunities: z.preprocess(
    (val) => (Array.isArray(val) ? val.slice(0, 6) : val),
    z.array(
      z.object({
        gap: z.string(),
        whyUnaddressed: z.string(),
        tacticalExploitation: z.string(),
      })
    ).min(1)
  ),
  moatAssessment: z.object({
    primaryMoatType: z.preprocess(
      normalizeMoatType,
      z.enum([
        "Network Effects",
        "Switching Costs",
        "Proprietary Data Flywheel",
        "Process Power / Speed",
        "Brand & Trust",
      ])
    ),
    moatScoreOutOfTen: z.coerce.number().min(1).max(10),
    durabilityVerdict: z.string(),
  }),
});

export type CompetitorOutput = z.infer<typeof CompetitorOutputSchema>;

/**
 * Stage 2C: Customer Profiling & Discovery
 */
export const CustomerOutputSchema = z.object({
  primaryICP: z.object({
    archetypeName: z.string(),
    roleTitle: z.string(),
    organizationType: z.string(),
    dayInTheLife: z.string(),
    acutePainPoints: z.array(z.string()).min(1),
    triggerEvent: z.string(),
    decisionKpi: z.string(),
  }),
  secondaryICP: z.object({
    archetypeName: z.string(),
    roleTitle: z.string(),
    relationshipToBuyer: z.string(),
    keyBenefit: z.string(),
  }),
  jobsToBeDone: z.object({
    functionalJob: z.string(),
    emotionalJob: z.string(),
    socialJob: z.string(),
  }),
  willingnessToPay: z.object({
    pricingMetric: z.string(),
    starterTier: z.object({ price: z.string(), valueAnchor: z.string() }),
    growthTier: z.object({ price: z.string(), valueAnchor: z.string() }),
    enterpriseTier: z.object({ price: z.string(), valueAnchor: z.string() }),
  }),
  momTestQuestions: z.preprocess(
    (val) => (Array.isArray(val) ? val.slice(0, 8) : val),
    z.array(
      z.object({
        question: z.string(),
        probingObjective: z.string(),
        positiveSignal: z.string(),
        falsePositiveTrap: z.string(),
      })
    ).min(2)
  ),
});

export type CustomerOutput = z.infer<typeof CustomerOutputSchema>;

/**
 * Stage 3: Venture Stress Testing & Validation
 */
export const ValidationOutputSchema = z.object({
  overallViabilityScore: z.coerce.number().min(0).max(100),
  verdict: z.preprocess(
    normalizeVerdict,
    z.enum([
      "STRONG VENTURE CANDIDATE",
      "PROMISING WITH REFINEMENTS",
      "SIGNIFICANT PIVOT REQUIRED",
      "HIGH FATALITY RISK",
    ])
  ),
  dimensionalScores: z.object({
    problemUrgency: z.coerce.number().min(0).max(100),
    marketTiming: z.coerce.number().min(0).max(100),
    moatDefensibility: z.coerce.number().min(0).max(100),
    technicalFeasibility: z.coerce.number().min(0).max(100),
    unitEconomics: z.coerce.number().min(0).max(100),
    regulatoryEase: z.coerce.number().min(0).max(100),
  }),
  unitEconomicsProjection: z.object({
    estimatedCAC: z.string(),
    estimatedLTV: z.string(),
    ltvCacRatio: z.coerce.number().min(0.1).max(200),
    paybackMonths: z.coerce.number().min(0.5).max(120),
    grossMarginPercent: z.coerce.number().min(1).max(100),
    economicHealthVerdict: z.string(),
  }),
  killRisks: z.preprocess(
    (val) => (Array.isArray(val) ? val.slice(0, 8) : val),
    z.array(
      z.object({
        threat: z.string(),
        severity: z.preprocess(
          normalizeSeverity,
          z.enum(["Critical", "High", "Moderate"])
        ),
        leadIndicator: z.string(),
        countermeasure: z.string(),
      })
    ).min(1)
  ),
  strategicPivots: z.preprocess(
    (val) => (Array.isArray(val) ? val.slice(0, 6) : val),
    z.array(
      z.object({
        pivotAngle: z.string(),
        shiftSummary: z.string(),
        rationale: z.string(),
        projectedAdvantage: z.string(),
      })
    ).min(1)
  ),
});

export type ValidationOutput = z.infer<typeof ValidationOutputSchema>;

/**
 * Stage 4: Launch Execution Architecture
 */
export const ExecutionOutputSchema = z.object({
  ninetyDayRoadmap: z.preprocess(
    (val) => (Array.isArray(val) ? val.slice(0, 3) : val),
    z.array(
      z.object({
        sprintNumber: z.coerce.number().min(1).max(3),
        timeframeDays: z.string(),
        focusTheme: z.string(),
        keyMilestones: z.array(z.string()).min(1),
        concreteDeliverables: z.array(z.string()).min(1),
        stageGateMetric: z.string(),
      })
    ).min(1)
  ),
  moscowScope: z.object({
    mustHave: z.array(z.string()).min(1),
    shouldHave: z.array(z.string()).min(1),
    wontHaveV1: z.array(z.string()).min(1),
  }),
  first100CustomersPlaybook: z.preprocess(
    (val) => (Array.isArray(val) ? val.slice(0, 6) : val),
    z.array(
      z.object({
        channel: z.string(),
        playType: z.preprocess(
          normalizePlayType,
          z.enum([
            "Founder Outbound",
            "Community Hack",
            "Content & SEO",
            "Integration Partner",
          ])
        ),
        tacticalAction: z.string(),
        messagingHook: z.string(),
        targetCount: z.string(),
      })
    ).min(1)
  ),
  pitchDeckOutline: z.preprocess(
    (val) => (Array.isArray(val) ? val.slice(0, 10) : val),
    z.array(
      z.object({
        slideNumber: z.coerce.number(),
        title: z.string(),
        coreHook: z.string(),
        keyEvidence: z.string(),
      })
    ).min(5)
  ),
});

export type ExecutionOutput = z.infer<typeof ExecutionOutputSchema>;

/**
 * Full Venture Dossier (Aggregated Output)
 */
export const VentureDossierSchema = z.object({
  id: z.string(),
  createdAt: z.string(),
  input: FounderInputSchema,
  framing: FramingOutputSchema,
  market: MarketOutputSchema,
  competitors: CompetitorOutputSchema,
  customers: CustomerOutputSchema,
  validation: ValidationOutputSchema,
  execution: ExecutionOutputSchema,
  citations: z.array(SourceCitationSchema),
  telemetry: z.object({
    durationMs: z.number(),
    agentsExecuted: z.number(),
    primaryLlm: z.string(),
    groundingHits: z.number(),
    cacheHit: z.boolean(),
  }),
});

export type VentureDossier = z.infer<typeof VentureDossierSchema>;
