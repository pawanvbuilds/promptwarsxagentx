import { describe, it, expect } from "bun:test";
import {
  FounderInputSchema,
  FramingOutputSchema,
  MarketOutputSchema,
  CompetitorOutputSchema,
  CustomerOutputSchema,
  ValidationOutputSchema,
  ExecutionOutputSchema,
} from "../../lib/types/domain";
import { SHOWCASE_PRESETS } from "../../lib/presets/showcase-ventures";

describe("PS08 Startup Co-Pilot: Schema & Intake Validation", () => {
  it("accepts a comprehensive valid startup idea input", () => {
    const input = {
      idea: "Autonomous AI accounting agent that reconciles ERP invoices with bank feeds in real-time.",
      region: "North America",
      businessModel: "B2B SaaS (Per-Seat)",
      targetCustomer: "CFOs & Controllers",
      stage: "Pre-Seed" as const,
    };

    const parsed = FounderInputSchema.safeParse(input);
    expect(parsed.success).toBe(true);
    if (parsed.success) {
      expect(parsed.data.region).toBe("North America");
      expect(parsed.data.stage).toBe("Pre-Seed");
    }
  });

  it("applies sensible defaults for optional inputs", () => {
    const minimal = {
      idea: "Decentralized physical infrastructure network for GPU compute clusters.",
    };

    const parsed = FounderInputSchema.safeParse(minimal);
    expect(parsed.success).toBe(true);
    if (parsed.success) {
      expect(parsed.data.region).toBe("Global");
      expect(parsed.data.businessModel).toBe("B2B SaaS");
      expect(parsed.data.stage).toBe("Idea");
    }
  });

  it("rejects startup ideas shorter than 10 characters", () => {
    const invalid = { idea: "Too short" };
    const parsed = FounderInputSchema.safeParse(invalid);
    expect(parsed.success).toBe(false);
  });

  it("rejects startup ideas exceeding 2500 characters", () => {
    const hugeIdea = "A".repeat(2501);
    const parsed = FounderInputSchema.safeParse({ idea: hugeIdea });
    expect(parsed.success).toBe(false);
  });

  it("coerces and normalizes natural language LLM enum variations into canonical values", () => {
    const rawMarketData = {
      tam: {
        valueFormatted: "$10B",
        numericBillions: 10,
        formula: "100k * $100k",
        methodology: "Census",
      },
      sam: { valueFormatted: "$2B", numericBillions: 2, rationale: "NA" },
      som: {
        valueFormatted: "$50M",
        numericBillions: 0.05,
        milestoneYear: "2028",
        rationale: "2%",
      },
      cagrPercent: 15,
      marketMaturity: "Emerging", // non-canonical variation
      tailwinds: [{ trend: "AI Adoption", impact: "High" }],
      headwinds: [
        { barrier: "Data Privacy", threatLevel: "High", description: "Strict laws" }, // "High" -> "Severe"
        { barrier: "Incumbent Clones", threatLevel: "Critical", description: "Big tech" }, // "Critical" -> "Severe"
        { barrier: "Minor Noise", threatLevel: "Low", description: "Negligible" },
      ],
      regulatoryLandscape: {
        summary: "GDPR compliance",
        keyRegulations: ["GDPR"],
        complianceDifficulty: "High", // "High" -> "Heavy"
      },
    };

    const parsed = MarketOutputSchema.safeParse(rawMarketData);
    expect(parsed.success).toBe(true);
    if (parsed.success) {
      expect(parsed.data.marketMaturity).toBe("Emerging / Nascent");
      expect(parsed.data.headwinds[0].threatLevel).toBe("Severe");
      expect(parsed.data.headwinds[1].threatLevel).toBe("Severe");
      expect(parsed.data.headwinds[2].threatLevel).toBe("Low");
      expect(parsed.data.regulatoryLandscape.complianceDifficulty).toBe("Heavy");
    }
  });

  it("verifies that all bundled showcase presets strictly conform to output schemas", () => {
    for (const preset of SHOWCASE_PRESETS) {
      const d = preset.precompiledDossier;

      expect(FramingOutputSchema.safeParse(d.framing).success).toBe(true);
      expect(MarketOutputSchema.safeParse(d.market).success).toBe(true);
      expect(CompetitorOutputSchema.safeParse(d.competitors).success).toBe(true);
      expect(CustomerOutputSchema.safeParse(d.customers).success).toBe(true);
      expect(ValidationOutputSchema.safeParse(d.validation).success).toBe(true);
      expect(ExecutionOutputSchema.safeParse(d.execution).success).toBe(true);

      // Verify numerical constraints
      expect(d.market.tam.numericBillions).toBeGreaterThan(0);
      expect(d.validation.overallViabilityScore).toBeGreaterThanOrEqual(0);
      expect(d.validation.overallViabilityScore).toBeLessThanOrEqual(100);
      expect(d.execution.ninetyDayRoadmap).toHaveLength(3);
      expect(d.execution.pitchDeckOutline).toHaveLength(10);
    }
  });
});
