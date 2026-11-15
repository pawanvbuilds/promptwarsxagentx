import { describe, it, expect } from "bun:test";
import { extractJsonFromText, safeParseJson } from "../../lib/llm/json-repair";

describe("PS08 Startup Co-Pilot: LLM JSON Recovery & Self-Healing", () => {
  it("extracts pure JSON from markdown code blocks", () => {
    const raw = "Here is your validation dossier:\n```json\n{\"ventureName\": \"TestFlow\", \"score\": 85}\n```\nHope this helps!";
    const extracted = extractJsonFromText(raw);
    expect(extracted).toBe('{"ventureName": "TestFlow", "score": 85}');
  });

  it("extracts JSON enclosed by outermost braces", () => {
    const raw = "Note from AI: {\"status\": \"ok\", \"items\": [1, 2, 3]} End of transmission";
    const extracted = extractJsonFromText(raw);
    expect(extracted).toBe('{"status": "ok", "items": [1, 2, 3]}');
  });

  it("extracts JSON arrays enclosed by outermost brackets", () => {
    const raw = "Categories: [\"B2B\", \"AI Ops\", \"DevTool\"]";
    const extracted = extractJsonFromText(raw);
    expect(extracted).toBe('["B2B", "AI Ops", "DevTool"]');
  });

  it("successfully parses and repairs trailing commas and smart quotes", () => {
    const noisy = "{\n  “name”: ‘VentureX’,\n  “score”: 92,\n}";
    const result = safeParseJson<{ name: string; score: number }>(noisy);

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.name).toBe("VentureX");
      expect(result.data.score).toBe(92);
    }
  });

  it("returns clear syntax error on irrecoverable input", () => {
    const broken = "This is not JSON at all.";
    const result = safeParseJson(broken);
    expect(result.success).toBe(false);
  });
});
