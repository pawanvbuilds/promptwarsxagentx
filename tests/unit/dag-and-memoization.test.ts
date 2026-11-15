import { describe, it, expect, beforeEach } from "bun:test";
import { globalVentureCache } from "../../lib/engine/memoization";
import { VentureEventBus } from "../../lib/engine/event-bus";
import { SHOWCASE_PRESETS } from "../../lib/presets/showcase-ventures";
import type { VentureSSEEvent } from "../../lib/types/agent-events";

describe("PS08 Startup Co-Pilot: DAG Engine & Memoization Cache", () => {
  beforeEach(() => {
    globalVentureCache.clear();
  });

  it("generates deterministic SHA-256 keys for identical inputs regardless of whitespace", () => {
    const input1 = {
      idea: "AI Sales Copilot For B2B Reps",
      region: "Global",
      businessModel: "B2B SaaS",
      targetCustomer: "Sales Reps",
      stage: "Idea" as const,
    };

    const input2 = {
      idea: "   ai sales copilot for b2b reps   ",
      region: "global",
      businessModel: "b2b saas",
      targetCustomer: "sales reps",
      stage: "Idea" as const,
    };

    const key1 = globalVentureCache.generateDossierKey(input1);
    const key2 = globalVentureCache.generateDossierKey(input2);

    expect(key1).toBe(key2);
    expect(key1).toHaveLength(64); // SHA-256 hex string length
  });

  it("successfully sets, gets, and records hit telemetry on cached dossiers", () => {
    const preset = SHOWCASE_PRESETS[0];
    const key = globalVentureCache.generateDossierKey(preset.input);

    expect(globalVentureCache.getDossier(key)).toBeNull();

    globalVentureCache.setDossier(key, preset.precompiledDossier);

    const hit = globalVentureCache.getDossier(key);
    expect(hit).not.toBeNull();
    expect(hit?.framing.ventureName).toBe(preset.precompiledDossier.framing.ventureName);

    const telemetry = globalVentureCache.getTelemetry();
    expect(telemetry.hits).toBe(1);
    expect(telemetry.misses).toBe(1);
    expect(telemetry.entries).toBe(1);
  });

  it("caches and retrieves war room inquiries independently", () => {
    const key = globalVentureCache.generateWarRoomKey(
      "yc_partner",
      "How do we know if we have PMF?",
      "demo_dossier_1"
    );

    expect(globalVentureCache.getWarRoomResponse(key)).toBeNull();

    const sampleAnswer = "Talk to 10 customers today and measure cohort retention.";
    globalVentureCache.setWarRoomResponse(key, sampleAnswer);

    expect(globalVentureCache.getWarRoomResponse(key)).toBe(sampleAnswer);
  });

  it("dispatches typed events through the VentureEventBus and unsubscribes cleanly", () => {
    const eventBus = new VentureEventBus();
    const receivedEvents: VentureSSEEvent[] = [];

    const unsubscribe = eventBus.subscribe((event) => {
      receivedEvents.push(event);
    });

    eventBus.emit({
      type: "session_init",
      sessionId: "test_session_123",
      totalStages: 4,
    });

    eventBus.emit({
      type: "stage_transition",
      agent: "framing",
      status: "completed",
      message: "Stage 1 finished",
      progressPercent: 25,
    });

    expect(receivedEvents).toHaveLength(2);
    expect(receivedEvents[0].type).toBe("session_init");
    expect(receivedEvents[1].type).toBe("stage_transition");

    unsubscribe();

    eventBus.emit({
      type: "stage_transition",
      agent: "market",
      status: "running",
      message: "Stage 2 started",
      progressPercent: 40,
    });

    // Length should remain 2 after unsubscription
    expect(receivedEvents).toHaveLength(2);
  });
});
