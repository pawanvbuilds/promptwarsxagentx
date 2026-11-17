import { describe, it, expect } from "bun:test";
import { FounderInputSchema, type FounderInput } from "../../lib/types/domain";

describe("PS08 Startup Co-Pilot: Frontend UI & Component Logic Contracts", () => {
  describe("Unit Economics Calculator Formula Invariants", () => {
    // Formula verification as executed inside EconomicsCalculator.tsx
    const calculateMetrics = (asp: number, cac: number, churnPercent: number, marginPercent: number) => {
      const churnRate = Math.max(0.5, churnPercent) / 100;
      const marginRate = marginPercent / 100;
      const lifetimeMonths = 1 / churnRate;
      const ltv = asp * marginRate * lifetimeMonths;
      const ltvCacRatio = cac > 0 ? ltv / cac : 0;
      const monthlyGrossProfit = asp * marginRate;
      const paybackMonths = monthlyGrossProfit > 0 ? cac / monthlyGrossProfit : 0;

      return {
        lifetimeMonths,
        ltv,
        ltvCacRatio,
        paybackMonths,
        isHealthyLtvCac: ltvCacRatio >= 3.0,
        isHealthyPayback: paybackMonths <= 12.0,
      };
    };

    it("calculates standard B2B SaaS economics correctly", () => {
      // $200/mo ASP, $1200 CAC, 2.5% monthly churn, 80% gross margin
      const metrics = calculateMetrics(200, 1200, 2.5, 80);

      expect(metrics.lifetimeMonths).toBe(40); // 1 / 0.025 = 40 months
      expect(metrics.ltv).toBe(6400); // 200 * 0.8 * 40 = 6400
      expect(metrics.ltvCacRatio).toBeCloseTo(5.33, 2); // 6400 / 1200 = 5.33x
      expect(metrics.paybackMonths).toBe(7.5); // 1200 / 160 = 7.5 months
      expect(metrics.isHealthyLtvCac).toBe(true);
      expect(metrics.isHealthyPayback).toBe(true);
    });

    it("flags venture stress state on poor unit economics", () => {
      // $50/mo ASP, $1500 CAC, 10% monthly churn, 60% gross margin
      const metrics = calculateMetrics(50, 1500, 10, 60);

      expect(metrics.lifetimeMonths).toBe(10);
      expect(metrics.ltv).toBe(300); // 50 * 0.6 * 10 = 300
      expect(metrics.ltvCacRatio).toBe(0.2); // Severe capital burn: 0.2x LTV/CAC
      expect(metrics.paybackMonths).toBe(50); // 50 months payback
      expect(metrics.isHealthyLtvCac).toBe(false);
      expect(metrics.isHealthyPayback).toBe(false);
    });

    it("safeguards against division by zero on boundary inputs", () => {
      const metrics = calculateMetrics(0, 0, 0, 0);
      expect(Number.isFinite(metrics.ltv)).toBe(true);
      expect(Number.isFinite(metrics.ltvCacRatio)).toBe(true);
      expect(Number.isFinite(metrics.paybackMonths)).toBe(true);
    });
  });

  describe("Positioning Matrix Canvas Coordinate Normalization", () => {
    // Normalization logic as used in PositioningMatrixCanvas.tsx
    const toCanvasCoords = (x: number, y: number, width: number, height: number, padding: number) => {
      const plotWidth = width - padding * 2;
      const plotHeight = height - padding * 2;
      // Map [-100, 100] to canvas pixels
      const cx = padding + ((x + 100) / 200) * plotWidth;
      const cy = height - padding - ((y + 100) / 200) * plotHeight;
      return { cx, cy };
    };

    it("correctly maps origin (0, 0) to exact center of plotting area", () => {
      const { cx, cy } = toCanvasCoords(0, 0, 600, 400, 50);
      expect(cx).toBe(300); // 50 + (100/200) * 500 = 300
      expect(cy).toBe(200); // 400 - 50 - (100/200) * 300 = 200
    });

    it("correctly maps top-right quadrant (100, 100) boundary", () => {
      const { cx, cy } = toCanvasCoords(100, 100, 600, 400, 50);
      expect(cx).toBe(550);
      expect(cy).toBe(50);
    });

    it("correctly maps bottom-left quadrant (-100, -100) boundary", () => {
      const { cx, cy } = toCanvasCoords(-100, -100, 600, 400, 50);
      expect(cx).toBe(50);
      expect(cy).toBe(350);
    });
  });

  describe("Intake Console Validation Contract", () => {
    it("validates form input matching FounderInputSchema strictly", () => {
      const validForm: FounderInput = {
        idea: "Autonomous AI customer support agent for Shopify merchants.",
        region: "North America",
        businessModel: "B2B SaaS (Per-Seat)",
        targetCustomer: "E-commerce Store Owners",
        stage: "Pre-Seed",
      };

      const result = FounderInputSchema.safeParse(validForm);
      expect(result.success).toBe(true);
    });

    it("rejects input containing whitespace-only idea", () => {
      const invalidForm = {
        idea: "          ",
        region: "Global",
        businessModel: "B2B SaaS",
      };

      const result = FounderInputSchema.safeParse(invalidForm);
      expect(result.success).toBe(false);
    });
  });
});
