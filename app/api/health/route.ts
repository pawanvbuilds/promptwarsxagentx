import { NextResponse } from "next/server";
import { globalVentureCache } from "@/lib/engine/memoization";

export const runtime = "nodejs";

export async function GET() {
  const telemetry = globalVentureCache.getTelemetry();

  return NextResponse.json({
    status: "healthy",
    vertical: "PS08: Startup Co-Pilot Agent",
    product: "VentureArchitect — Autonomous Multi-Agent Venture Co-Pilot",
    timestamp: new Date().toISOString(),
    engine: {
      dagStages: 4,
      specialistAgents: 6,
      warRoomPersonas: 4,
      liveGrounding: "TinySearch + DuckDuckGo Multi-Tier Fallback",
      llmProviders: ["Gemini 2.5 Flash / 1.5 Flash", "Groq Llama 3.3 70B"],
    },
    cacheStats: telemetry,
  });
}
