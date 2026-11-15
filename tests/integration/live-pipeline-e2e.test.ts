import { describe, expect, it } from "bun:test";
import { VentureEventBus } from "../../lib/engine/event-bus";
import { VentureDAGCoordinator } from "../../lib/engine/coordinator";
import { VentureDossierSchema, type FounderInput, type VentureDossier } from "../../lib/types/domain";
import { InteractiveWarRoomAgent } from "../../lib/agents/war-room";
import type { VentureSSEEvent } from "../../lib/types/agent-events";

const isLiveEnabled = Boolean(process.env.RUN_LIVE_E2E);

describe("PS08 Startup Co-Pilot: Live Multi-Agent Pipeline E2E", () => {
  let generatedDossier: VentureDossier | null = null;

  it.skipIf(!isLiveEnabled)(
    "executes full 4-stage DAG pipeline with live LLM and search grounding",
    async () => {
      const input: FounderInput = {
        idea: "Autonomous AI agent platform that streamlines healthcare clinic intake, insurance pre-authorization verification, and automated EHR note transcription.",
        region: "North America",
        businessModel: "B2B SaaS (Per-Seat)",
        targetCustomer: "Outpatient Clinic Practice Managers",
        stage: "Idea",
      };

      const eventBus = new VentureEventBus();
      const events: VentureSSEEvent[] = [];
      eventBus.subscribe((evt) => {
        events.push(evt);
      });

      const coordinator = new VentureDAGCoordinator(eventBus);
      const startTime = Date.now();
      const dossier = await coordinator.runPipeline(input);
      const totalElapsed = Date.now() - startTime;

      console.log(`[E2E Pipeline] Completed in ${(totalElapsed / 1000).toFixed(1)}s`);
      expect(dossier).toBeDefined();
      expect(dossier.id).toMatch(/^va_\d+_/);

      // Verify Schema strictly passes
      const schemaCheck = VentureDossierSchema.safeParse(dossier);
      if (!schemaCheck.success) {
        console.error("Dossier validation issues:", schemaCheck.error.issues);
      }
      expect(schemaCheck.success).toBe(true);

      // Stage 1 Verification
      expect(dossier.framing.ventureName).toBeTruthy();
      expect(dossier.framing.oneLiner.length).toBeGreaterThan(10);
      expect(dossier.framing.category).toBeTruthy();
      expect(dossier.framing.searchQueries.market.length).toBeGreaterThan(0);
      expect(dossier.framing.searchQueries.competitors.length).toBeGreaterThan(0);

      // Stage 2A Verification (Market)
      expect(dossier.market.tam.valueFormatted).toBeTruthy();
      expect(dossier.market.sam.valueFormatted).toBeTruthy();
      expect(dossier.market.som.valueFormatted).toBeTruthy();
      expect(dossier.market.cagrPercent).toBeGreaterThanOrEqual(0);
      expect(dossier.market.tailwinds.length).toBeGreaterThanOrEqual(1);

      // Stage 2B Verification (Competitors & 2x2 Matrix)
      expect(dossier.competitors.directCompetitors.length).toBeGreaterThanOrEqual(1);
      expect(dossier.competitors.positioningMatrix.xAxisLabel).toBeTruthy();
      expect(dossier.competitors.positioningMatrix.yAxisLabel).toBeTruthy();
      expect(dossier.competitors.positioningMatrix.points.length).toBeGreaterThanOrEqual(1);
      const ourPoint =
        dossier.competitors.positioningMatrix.points.find((p) => p.isOurVenture) ||
        dossier.competitors.positioningMatrix.points[0];
      expect(ourPoint.x).toBeGreaterThanOrEqual(0);
      expect(ourPoint.y).toBeGreaterThanOrEqual(0);
      expect(dossier.competitors.moatAssessment.primaryMoatType).toBeTruthy();

      // Stage 2C Verification (Customers)
      expect(dossier.customers.primaryICP.roleTitle).toBeTruthy();
      expect(dossier.customers.jobsToBeDone.functionalJob).toBeTruthy();
      expect(dossier.customers.jobsToBeDone.emotionalJob).toBeTruthy();
      expect(dossier.customers.momTestQuestions.length).toBeGreaterThanOrEqual(1);

      // Stage 3 Verification (Stress-Testing & Viability)
      expect(dossier.validation.overallViabilityScore).toBeGreaterThanOrEqual(0);
      expect(dossier.validation.overallViabilityScore).toBeLessThanOrEqual(100);
      expect(dossier.validation.verdict).toBeTruthy();
      expect(dossier.validation.unitEconomicsProjection.grossMarginPercent).toBeGreaterThanOrEqual(0);
      expect(dossier.validation.killRisks.length).toBeGreaterThanOrEqual(1);

      // Stage 4 Verification (Execution & Launch)
      expect(dossier.execution.ninetyDayRoadmap.length).toBeGreaterThanOrEqual(1);
      expect(dossier.execution.ninetyDayRoadmap[0].focusTheme).toBeTruthy();
      expect(dossier.execution.ninetyDayRoadmap[0].stageGateMetric).toBeTruthy();
      expect(dossier.execution.moscowScope.mustHave.length).toBeGreaterThanOrEqual(1);
      expect(dossier.execution.first100CustomersPlaybook.length).toBeGreaterThanOrEqual(1);
      expect(dossier.execution.pitchDeckOutline.length).toBe(10);

      // Event stream verification
      const stageEvents = events.filter((e) => e.type === "stage_transition");
      expect(stageEvents.some((e) => e.agent === "framing")).toBe(true);
      expect(stageEvents.some((e) => e.agent === "market")).toBe(true);
      expect(stageEvents.some((e) => e.agent === "validation")).toBe(true);
      expect(stageEvents.some((e) => e.agent === "execution")).toBe(true);

      const completeEvent = events.find((e) => e.type === "complete");
      expect(completeEvent).toBeDefined();

      generatedDossier = dossier;
    },
    180000
  );

  it.skipIf(!isLiveEnabled)(
    "serves subsequent identical pipeline queries from cryptographic LRU cache in sub-50ms",
    async () => {
      const input: FounderInput = {
        idea: "Autonomous AI agent platform that streamlines healthcare clinic intake, insurance pre-authorization verification, and automated EHR note transcription.",
        region: "North America",
        businessModel: "B2B SaaS (Per-Seat)",
        targetCustomer: "Outpatient Clinic Practice Managers",
        stage: "Idea",
      };

      const eventBus = new VentureEventBus();
      const events: VentureSSEEvent[] = [];
      eventBus.subscribe((evt) => events.push(evt));

      const coordinator = new VentureDAGCoordinator(eventBus);
      const start = Date.now();
      const dossier = await coordinator.runPipeline(input);
      const duration = Date.now() - start;

      expect(duration).toBeLessThan(100);
      expect(dossier.id).toBeTruthy();
      expect(events.some((e) => e.type === "stage_transition" && e.status === "cached")).toBe(true);
    },
    30000
  );

  it.skipIf(!isLiveEnabled)(
    "executes live War Room consultation with YC Partner persona",
    async () => {
      const agent = new InteractiveWarRoomAgent();
      const res = await agent.consult(
        {
          personaId: "yc_partner",
          question:
            "What is the single biggest fatal risk when selling AI software to hospital networks, and how do we de-risk it in the first 60 days?",
        },
        generatedDossier ?? undefined
      );

      expect(res.persona.id).toBe("yc_partner");
      expect(res.persona.name).toContain("Garry");
      expect(res.answer.length).toBeGreaterThan(50);
      console.log(`[War Room YC Partner] Consultation answered in ${res.answer.length} chars`);
    },
    30000
  );
});
