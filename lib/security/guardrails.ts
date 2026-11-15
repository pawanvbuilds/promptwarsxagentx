/**
 * Common prompt injection and jailbreak signatures
 */
const INJECTION_PATTERNS = [
  /ignore\s+(all\s+)?(previous|prior|above|existing|system)?\s*(instructions|rules|prompts|directives|guardrails)/i,
  /disregard\s+(all\s+)?(previous|prior|above|existing)?\s*(instructions|rules|prompts|directives)/i,
  /(print|show|dump|reveal|output|display|leak)\s+(the\s+)?(developer\s+|system\s+)?(prompt|instructions|keys|passwords)/i,
  /system\s*:\s*you\s+are\s+now/i,
  /you\s+are\s+DAN\b/i,
  /act\s+as\s+an\s+unrestricted\s+ai/i,
  /<script\b[^>]*>([\s\S]*?)<\/script>/gi,
  /javascript\s*:/i,
  /drop\s+table\b/i,
  /select\s+.*\s+from\s+information_schema/i,
];

export interface ValidationSecurityResult {
  isValid: boolean;
  sanitized: string;
  flaggedReason?: string;
}

/**
 * Sanitizes and validates user input against prompt injection and malicious payloads
 */
export function sanitizeFounderInput(
  rawInput: string,
  maxLength = 2500
): ValidationSecurityResult {
  if (!rawInput || typeof rawInput !== "string") {
    return {
      isValid: false,
      sanitized: "",
      flaggedReason: "Input must be a valid non-empty string.",
    };
  }

  // Pre-check for hostile injection markers before stripping
  for (const pattern of INJECTION_PATTERNS) {
    if (pattern.test(rawInput)) {
      return {
        isValid: false,
        sanitized: rawInput.slice(0, 100),
        flaggedReason:
          "Input contains potentially hostile instructions or adversarial prompt injection markers.",
      };
    }
  }

  // Strip dangerous HTML entities
  let cleaned = rawInput.replace(/[<>]/g, "").trim();

  // Normalize Unicode spaces and invisible characters
  cleaned = cleaned.replace(/[\u200B-\u200D\uFEFF]/g, "");

  if (cleaned.length < 10) {
    return {
      isValid: false,
      sanitized: cleaned,
      flaggedReason: "Idea description is too short (minimum 10 characters required).",
    };
  }

  if (cleaned.length > maxLength) {
    return {
      isValid: false,
      sanitized: cleaned.slice(0, maxLength),
      flaggedReason: `Input exceeds maximum allowed length of ${maxLength} characters.`,
    };
  }

  return {
    isValid: true,
    sanitized: cleaned,
  };
}
