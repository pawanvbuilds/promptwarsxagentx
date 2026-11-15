import { NextRequest, NextResponse } from "next/server";
import { FounderInputSchema } from "@/lib/types/domain";
import { sanitizeFounderInput } from "@/lib/security/guardrails";
import { enforceAnalysisQuota } from "@/lib/security/rate-limiter";
import { VentureEventBus } from "@/lib/engine/event-bus";
import { VentureDAGCoordinator } from "@/lib/engine/coordinator";

export const runtime = "nodejs";
export const maxDuration = 300;

export async function POST(req: NextRequest) {
  // 1. Resolve client IP for rate limiting (anonymized internally via salted SHA-256)
  const clientIp =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "127.0.0.1";

  const quota = enforceAnalysisQuota(clientIp);
  if (!quota.allowed) {
    return NextResponse.json(
      {
        error: "Analysis rate limit reached. Please wait for your daily window to reset.",
        remaining: quota.remaining,
        resetAt: new Date(quota.resetAt).toISOString(),
      },
      { status: 429 }
    );
  }

  // 2. Parse and validate JSON payload
  let rawBody: unknown;
  try {
    rawBody = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON request body." },
      { status: 400 }
    );
  }

  const parsedInput = FounderInputSchema.safeParse(rawBody);
  if (!parsedInput.success) {
    return NextResponse.json(
      {
        error: "Validation error",
        issues: parsedInput.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`),
      },
      { status: 400 }
    );
  }

  // 3. Security Guardrails & Prompt Injection Scanning
  const securityCheck = sanitizeFounderInput(parsedInput.data.idea);
  if (!securityCheck.isValid) {
    return NextResponse.json(
      {
        error: "Security rejection",
        message: securityCheck.flaggedReason || "Potentially malicious input detected.",
      },
      { status: 422 }
    );
  }

  const sanitizedInput = {
    ...parsedInput.data,
    idea: securityCheck.sanitized,
  };

  // 4. Set up Server-Sent Events (SSE) Stream
  const eventBus = new VentureEventBus();
  const coordinator = new VentureDAGCoordinator(eventBus);

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    start(controller) {
      // Helper to enqueue SSE message
      const sendSSE = (data: unknown) => {
        try {
          const payload = `data: ${JSON.stringify(data)}\n\n`;
          controller.enqueue(encoder.encode(payload));
        } catch {
          // Stream might have been closed by client
        }
      };

      // Subscribe event bus to SSE output
      const unsubscribe = eventBus.subscribe((event) => {
        sendSSE(event);
      });

      // Send initial handshake
      sendSSE({
        type: "session_init",
        sessionId: `va_session_${Date.now()}`,
        totalStages: 4,
        quotaRemaining: quota.remaining,
      });

      // Execute DAG Pipeline asynchronously
      coordinator
        .runPipeline(sanitizedInput)
        .catch((err) => {
          console.error("Pipeline execution fatal error:", err);
          sendSSE({
            type: "error",
            code: "PIPELINE_EXECUTION_FAILURE",
            message: err instanceof Error ? err.message : "Pipeline encountered an unexpected error.",
            recoverable: false,
          });
        })
        .finally(() => {
          unsubscribe();
          try {
            controller.close();
          } catch {
            // Controller might be already closed
          }
        });
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
    },
  });
}
