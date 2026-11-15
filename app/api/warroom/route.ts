import { NextRequest, NextResponse } from "next/server";
import { WarRoomInquirySchema } from "@/lib/types/personas";
import { enforceWarRoomQuota } from "@/lib/security/rate-limiter";
import { sanitizeFounderInput } from "@/lib/security/guardrails";
import { InteractiveWarRoomAgent } from "@/lib/agents/war-room";
import { globalVentureCache } from "@/lib/engine/memoization";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(req: NextRequest) {
  const clientIp =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "127.0.0.1";

  const quota = enforceWarRoomQuota(clientIp);
  if (!quota.allowed) {
    return NextResponse.json(
      {
        error: "War Room question limit reached. Please wait for your daily window to reset.",
        remaining: quota.remaining,
        resetAt: new Date(quota.resetAt).toISOString(),
      },
      { status: 429 }
    );
  }

  let rawBody: unknown;
  try {
    rawBody = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON request body." }, { status: 400 });
  }

  const parseResult = WarRoomInquirySchema.safeParse(rawBody);
  if (!parseResult.success) {
    return NextResponse.json(
      {
        error: "Validation error",
        issues: parseResult.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`),
      },
      { status: 400 }
    );
  }

  const inquiry = parseResult.data;

  // Security check on question
  const secCheck = sanitizeFounderInput(inquiry.question, 1200);
  if (!secCheck.isValid) {
    return NextResponse.json(
      { error: "Security check failed", message: secCheck.flaggedReason },
      { status: 422 }
    );
  }

  // Check memoization cache
  const cacheKey = globalVentureCache.generateWarRoomKey(
    inquiry.personaId,
    inquiry.question,
    inquiry.dossierContext?.id
  );
  const cachedAnswer = globalVentureCache.getWarRoomResponse(cacheKey);
  if (cachedAnswer) {
    return NextResponse.json({
      answer: cachedAnswer,
      cached: true,
      quotaRemaining: quota.remaining,
    });
  }

  try {
    const agent = new InteractiveWarRoomAgent();
    const result = await agent.consult(
      { ...inquiry, question: secCheck.sanitized },
      inquiry.dossierContext
    );

    // Cache response
    globalVentureCache.setWarRoomResponse(cacheKey, result.answer);

    return NextResponse.json({
      ...result,
      cached: false,
      quotaRemaining: quota.remaining,
    });
  } catch (err) {
    console.error("War room consultation error:", err);
    return NextResponse.json(
      {
        error: "War Room Consultation Failed",
        message: err instanceof Error ? err.message : "Unexpected consultation error.",
      },
      { status: 500 }
    );
  }
}
