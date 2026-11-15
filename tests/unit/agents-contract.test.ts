import { describe, it, expect } from "bun:test";
import { IdeaStrategistAgent } from "../../lib/agents/framing";
import { MarketIntelligenceAgent } from "../../lib/agents/market";
import { CompetitorReconAgent } from "../../lib/agents/competitors";
import { CustomerProfilerAgent } from "../../lib/agents/customers";
import { VentureStressTesterAgent } from "../../lib/agents/validation";
import { LaunchArchitectAgent } from "../../lib/agents/execution";

describe("PS08 Startup Co-Pilot: Specialist Agent Class Contracts", () => {
  it("verifies all agents implement required lifecycle roles and schemas", () => {
    const agents = [
      new IdeaStrategistAgent(),
      new MarketIntelligenceAgent(),
      new CompetitorReconAgent(),
      new CustomerProfilerAgent(),
      new VentureStressTesterAgent(),
      new LaunchArchitectAgent(),
    ];

    const roles = agents.map((a) => a.role);
    expect(roles).toEqual([
      "framing",
      "market",
      "competitors",
      "customers",
      "validation",
      "execution",
    ]);

    for (const agent of agents) {
      expect(agent.displayName.length).toBeGreaterThan(10);
      expect(agent.schema).toBeDefined();
    }
  });
});
