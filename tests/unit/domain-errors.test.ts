import { describe, it, expect } from "bun:test";
import {
  VentureError,
  ValidationError,
  SecurityViolationError,
  RateLimitExceededError,
  LLMProviderError,
  LLMJsonParseError,
} from "../../lib/errors";

describe("PS08 Startup Co-Pilot: Domain Error Hierarchy & Discrimination", () => {
  it("instantiates ValidationError with structured issue details and HTTP 400", () => {
    const issues = ["idea: Idea must be at least 10 characters long"];
    const err = new ValidationError("Schema validation failed", issues);

    expect(err).toBeInstanceOf(VentureError);
    expect(err).toBeInstanceOf(Error);
    expect(err.code).toBe("VALIDATION_FAILED");
    expect(err.statusCode).toBe(400);
    expect(err.issues).toHaveLength(1);
    expect(err.timestamp).toBeTruthy();
    expect(err.message).toBe("Schema validation failed");
  });

  it("instantiates SecurityViolationError with flagged reason and HTTP 422", () => {
    const err = new SecurityViolationError(
      "Hostile prompt injection detected",
      "Matches DAN jailbreak pattern"
    );

    expect(err.code).toBe("SECURITY_VIOLATION");
    expect(err.statusCode).toBe(422);
    expect(err.flaggedReason).toContain("DAN jailbreak");
  });

  it("instantiates RateLimitExceededError with remaining quota and HTTP 429", () => {
    const now = Date.now();
    const err = new RateLimitExceededError("Quota exhausted", 0, now + 3600000);

    expect(err.code).toBe("RATE_LIMIT_EXCEEDED");
    expect(err.statusCode).toBe(429);
    expect(err.remaining).toBe(0);
    expect(err.resetAt).toBeGreaterThan(now);
  });

  it("instantiates LLMProviderError with provider metadata and HTTP 503", () => {
    const err = new LLMProviderError("All providers failed", "gemini+groq");

    expect(err.code).toBe("LLM_PROVIDER_EXHAUSTED");
    expect(err.statusCode).toBe(503);
    expect(err.provider).toBe("gemini+groq");
  });

  it("instantiates LLMJsonParseError with truncated raw snippet and HTTP 502", () => {
    const raw = "<html>Bad gateway</html>";
    const err = new LLMJsonParseError("Unparseable output", raw);

    expect(err.code).toBe("LLM_JSON_PARSE_ERROR");
    expect(err.statusCode).toBe(502);
    expect(err.rawSnippet).toContain("Bad gateway");
  });
});
