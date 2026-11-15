/**
 * Redaction patterns for secrets, API tokens, and private infrastructure details
 */
const SECRET_PATTERNS = [
  /AIza[0-9A-Za-z-_]{30,}/g, // Google API Key
  /gsk_[a-zA-Z0-9]{20,}/g, // Groq API Key
  /sk-[a-zA-Z0-9]{20,}/g, // Generic OpenAI/Platform Keys
  /bearer\s+[a-zA-Z0-9_\-\.]{20,}/gi, // Bearer Tokens
  /passwd|password|secret_key|private_key/gi,
];

/**
 * Redacts any detected secrets or tokens from logs, errors, or outbound payloads
 */
export function redactSensitiveData(text: string): string {
  if (!text || typeof text !== "string") return "";
  let sanitized = text;
  for (const pattern of SECRET_PATTERNS) {
    sanitized = sanitized.replace(pattern, "[REDACTED_CREDENTIAL]");
  }
  return sanitized;
}
