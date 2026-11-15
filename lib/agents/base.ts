import { z } from "zod";
import { executeStructuredAgentPrompt, type LLMResponse } from "../llm/client";
import type { AgentRole } from "../types/agent-events";

export interface AgentContext {
  emitTelemetry?: (role: AgentRole, durationMs: number, provider: string) => void;
  allowDeepGrounding?: boolean;
}

export abstract class BaseAgent<TInput, TOutput> {
  abstract readonly role: AgentRole;
  abstract readonly displayName: string;
  abstract readonly schema: z.ZodType<TOutput>;

  protected abstract buildSystemPrompt(input: TInput, context?: AgentContext): string;
  protected abstract buildUserPrompt(input: TInput, context?: AgentContext): string;
  protected abstract getSchemaExample(): string;

  /**
   * Primary execution method with timing and telemetry hooks
   */
  public async execute(input: TInput, context?: AgentContext): Promise<LLMResponse<TOutput>> {
    const systemPrompt = this.buildSystemPrompt(input, context);
    const userPrompt = this.buildUserPrompt(input, context);
    const schemaExample = this.getSchemaExample();

    const response = await executeStructuredAgentPrompt<TOutput>({
      systemPrompt,
      userPrompt,
      schema: this.schema,
      schemaExample,
      temperature: 0.2,
    });

    if (context?.emitTelemetry) {
      context.emitTelemetry(this.role, response.durationMs, response.provider);
    }

    return response;
  }
}
