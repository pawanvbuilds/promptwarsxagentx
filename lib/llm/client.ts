import { z } from "zod";
import { safeParseJson } from "./json-repair";
import { LLMProviderError, LLMJsonParseError, ValidationError } from "../errors";

export interface LLMRequestOptions<T> {
  systemPrompt: string;
  userPrompt: string;
  schema: z.ZodType<T>;
  schemaExample?: string;
  temperature?: number;
  maxTokens?: number;
}

export interface LLMResponse<T> {
  data: T;
  provider: "gemini" | "groq" | "mock_fallback";
  model: string;
  durationMs: number;
}

const GEMINI_MODELS = [
  "gemini-3.1-flash-lite",
  "gemini-3-flash-preview",
  "gemini-flash-latest",
  "gemini-3.5-flash",
];

const GROQ_MODELS = [
  "openai/gpt-oss-120b",
  "openai/gpt-oss-20b",
  "qwen/qwen3.8-27b",
];

async function callGemini(
  systemPrompt: string,
  userPrompt: string,
  temperature = 0.2,
  jsonMode = true
): Promise<{ text: string; model: string }> {
  const apiKey = process.env.GEMINI_API_KEY?.trim();
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not configured");
  }

  const payload = {
    systemInstruction: {
      parts: [{ text: systemPrompt }],
    },
    contents: [
      {
        role: "user",
        parts: [{ text: userPrompt }],
      },
    ],
    generationConfig: {
      temperature,
      ...(jsonMode ? { responseMimeType: "application/json" } : {}),
    },
  };

  let lastError = "Gemini request failed";

  for (const model of GEMINI_MODELS) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(18000),
      });

      if (!res.ok) {
        const errText = await res.text().catch(() => "");
        lastError = `Gemini (${model}) ${res.status}: ${errText.slice(0, 150)}`;
        if (res.status === 429 || res.status === 503 || res.status === 404) {
          continue; // Try next model
        }
        break; // Hard client error
      }

      const json = (await res.json()) as {
        candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
      };
      const text = json.candidates?.[0]?.content?.parts?.[0]?.text;
      if (text) {
        return { text, model };
      }
    } catch (err) {
      lastError = err instanceof Error ? err.message : String(err);
    }
  }

  throw new Error(`Gemini failure: ${lastError}`);
}

async function callGroq(
  systemPrompt: string,
  userPrompt: string,
  temperature = 0.2,
  jsonMode = true
): Promise<{ text: string; model: string }> {
  const apiKey = process.env.GROQ_API_KEY?.trim();
  if (!apiKey) {
    throw new Error("GROQ_API_KEY is not configured");
  }

  const payload = {
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
    temperature,
    ...(jsonMode ? { response_format: { type: "json_object" } } : {}),
  };

  let lastError = "Groq request failed";

  for (const model of GROQ_MODELS) {
    try {
      const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({ ...payload, model }),
        signal: AbortSignal.timeout(18000),
      });

      if (!res.ok) {
        const errText = await res.text().catch(() => "");
        lastError = `Groq (${model}) ${res.status}: ${errText.slice(0, 150)}`;
        if (res.status === 429 || res.status === 503) {
          continue;
        }
        break;
      }

      const json = (await res.json()) as {
        choices?: Array<{ message?: { content?: string } }>;
      };
      const text = json.choices?.[0]?.message?.content;
      if (text) {
        return { text, model };
      }
    } catch (err) {
      lastError = err instanceof Error ? err.message : String(err);
    }
  }

  throw new Error(`Groq failure: ${lastError}`);
}

/**
 * High-reliability structured JSON generator with automatic provider fallback and Zod validation
 */
export async function executeStructuredAgentPrompt<T>(
  options: LLMRequestOptions<T>
): Promise<LLMResponse<T>> {
  const start = Date.now();
  const enhancedSystem = options.schemaExample
    ? `${options.systemPrompt}\n\nStrict requirement: Output pure JSON adhering to this exact schema:\n${options.schemaExample}`
    : options.systemPrompt;

  let rawText = "";
  let provider: "gemini" | "groq" | "mock_fallback" = "gemini";
  let model = "unknown";

  // Try Gemini first
  try {
    const result = await callGemini(enhancedSystem, options.userPrompt, options.temperature ?? 0.2);
    rawText = result.text;
    provider = "gemini";
    model = result.model;
  } catch {
    // Fallback to Groq
    try {
      const result = await callGroq(enhancedSystem, options.userPrompt, options.temperature ?? 0.2);
      rawText = result.text;
      provider = "groq";
      model = result.model;
    } catch (groqErr) {
      throw new LLMProviderError(
        `All LLM providers exhausted. Primary Gemini error, Groq fallback error: ${
          groqErr instanceof Error ? groqErr.message : String(groqErr)
        }`,
        "gemini+groq"
      );
    }
  }

  // Parse and validate with Zod
  const parseResult = safeParseJson<unknown>(rawText);
  if (!parseResult.success) {
    throw new LLMJsonParseError(
      `Agent produced unparseable JSON: ${parseResult.error}`,
      rawText
    );
  }

  let validation = options.schema.safeParse(parseResult.data);
  if (!validation.success) {
    // Attempt self-healing schema re-prompt once if validation failed
    const errorDetails = validation.error.issues
      .map((i) => `Field: ${i.path.join(".")}, Issue: ${i.message}`)
      .join("\n");

    const healPrompt = `The previous JSON response had schema validation errors:\n${errorDetails}\n\nHere was the previous JSON output:\n${rawText}\n\nPlease output the corrected, complete JSON strictly fixing these fields.`;

    try {
      const healResult = await callGemini(enhancedSystem, healPrompt, 0.1);
      const healParse = safeParseJson<unknown>(healResult.text);
      if (healParse.success) {
        const secondValidation = options.schema.safeParse(healParse.data);
        if (secondValidation.success) {
          validation = secondValidation;
        }
      }
    } catch {
      // Fall through to error reporting below
    }
  }

  if (!validation.success) {
    throw new ValidationError(
      `Agent schema mismatch: ${validation.error.issues
        .map((i) => `${i.path.join(".")}: ${i.message}`)
        .join("; ")}`,
      validation.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`)
    );
  }

  return {
    data: validation.data,
    provider,
    model,
    durationMs: Date.now() - start,
  };
}

/**
 * Text completion for open-ended conversation (War Room Co-Pilot)
 */
export async function executeTextCompletion(
  systemPrompt: string,
  userPrompt: string
): Promise<{ text: string; provider: string; model: string }> {
  try {
    const res = await callGemini(systemPrompt, userPrompt, 0.4, false);
    return { text: res.text, provider: "gemini", model: res.model };
  } catch {
    const res = await callGroq(systemPrompt, userPrompt, 0.4, false);
    return { text: res.text, provider: "groq", model: res.model };
  }
}
