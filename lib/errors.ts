/**
 * VentureArchitect Typed Domain Error Hierarchy
 *
 * Implements standard error discrimination patterns across the API,
 * DAG engine, guardrail layers, and LLM orchestration.
 */

export type VentureErrorCode =
  | "VALIDATION_FAILED"
  | "SECURITY_VIOLATION"
  | "RATE_LIMIT_EXCEEDED"
  | "LLM_PROVIDER_EXHAUSTED"
  | "LLM_JSON_PARSE_ERROR"
  | "SCHEMA_MISMATCH"
  | "INTERNAL_ENGINE_ERROR";

/**
 * Base domain exception from which all specialized engine errors derive.
 */
export abstract class VentureError extends Error {
  public abstract readonly code: VentureErrorCode;
  public abstract readonly statusCode: number;
  public readonly timestamp: string;

  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
    this.timestamp = new Date().toISOString();
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

/**
 * Thrown when user or agent payloads fail schema validation contracts.
 */
export class ValidationError extends VentureError {
  public readonly code: VentureErrorCode = "VALIDATION_FAILED";
  public readonly statusCode = 400;
  public readonly issues: string[];

  constructor(message: string, issues: string[] = []) {
    super(message);
    this.issues = issues;
  }
}

/**
 * Thrown when adversarial injection signatures, hostile script tags, or malicious payloads are detected.
 */
export class SecurityViolationError extends VentureError {
  public readonly code: VentureErrorCode = "SECURITY_VIOLATION";
  public readonly statusCode = 422;
  public readonly flaggedReason: string;

  constructor(message: string, flaggedReason: string) {
    super(message);
    this.flaggedReason = flaggedReason;
  }
}

/**
 * Thrown when a client IP exceeds its sliding window analysis or war room quota.
 */
export class RateLimitExceededError extends VentureError {
  public readonly code: VentureErrorCode = "RATE_LIMIT_EXCEEDED";
  public readonly statusCode = 429;
  public readonly remaining: number;
  public readonly resetAt: number;

  constructor(message: string, remaining: number, resetAt: number) {
    super(message);
    this.remaining = remaining;
    this.resetAt = resetAt;
  }
}

/**
 * Thrown when all primary and fallback LLM model providers fail or time out.
 */
export class LLMProviderError extends VentureError {
  public readonly code: VentureErrorCode = "LLM_PROVIDER_EXHAUSTED";
  public readonly statusCode = 503;
  public readonly provider: string;

  constructor(message: string, provider = "multi_provider") {
    super(message);
    this.provider = provider;
  }
}

/**
 * Thrown when LLM response text cannot be recovered or parsed into structured JSON.
 */
export class LLMJsonParseError extends VentureError {
  public readonly code: VentureErrorCode = "LLM_JSON_PARSE_ERROR";
  public readonly statusCode = 502;
  public readonly rawSnippet: string;

  constructor(message: string, rawSnippet: string) {
    super(message);
    this.rawSnippet = rawSnippet.slice(0, 200);
  }
}
