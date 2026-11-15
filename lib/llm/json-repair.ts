/**
 * Extracts and cleans raw JSON text from potentially noisy LLM outputs
 */
export function extractJsonFromText(raw: string): string {
  if (!raw || typeof raw !== "string") return "{}";

  const trimmed = raw.trim();

  // Pattern 1: Fenced code block ```json ... ``` or ``` ... ```
  const fencedMatch = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fencedMatch && fencedMatch[1]) {
    return fencedMatch[1].trim();
  }

  // Pattern 2: Enclosed outermost braces { ... }
  const firstBrace = trimmed.indexOf("{");
  const lastBrace = trimmed.lastIndexOf("}");
  if (firstBrace !== -1 && lastBrace > firstBrace) {
    return trimmed.slice(firstBrace, lastBrace + 1);
  }

  // Pattern 3: Enclosed outermost array [ ... ]
  const firstBracket = trimmed.indexOf("[");
  const lastBracket = trimmed.lastIndexOf("]");
  if (firstBracket !== -1 && lastBracket > firstBracket) {
    return trimmed.slice(firstBracket, lastBracket + 1);
  }

  return trimmed;
}

/**
 * Attempts to parse JSON with minor heuristic repairs (e.g. trailing commas, stray backticks)
 */
export function safeParseJson<T>(raw: string): { success: true; data: T } | { success: false; error: string } {
  const cleaned = extractJsonFromText(raw);
  try {
    const parsed = JSON.parse(cleaned) as T;
    return { success: true, data: parsed };
  } catch (initialErr) {
    // Attempt basic repair: remove trailing commas before closing braces/brackets
    const repaired = cleaned
      .replace(/,\s*([\]}])/g, "$1")
      .replace(/[\u201C\u201D]/g, '"') // Replace double smart quotes
      .replace(/[\u2018\u2019]/g, '"') // Replace single smart quotes
      .replace(/'([^'\\]*(?:\\.[^'\\]*)*)'/g, '"$1"'); // Replace single-quoted JSON strings with double quotes

    try {
      const secondAttempt = JSON.parse(repaired) as T;
      return { success: true, data: secondAttempt };
    } catch {
      return {
        success: false,
        error: initialErr instanceof Error ? initialErr.message : "Malformed JSON syntax",
      };
    }
  }
}
