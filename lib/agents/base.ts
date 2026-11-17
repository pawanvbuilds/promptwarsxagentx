import { z } from "zod";
import { executeStructuredAgentPrompt, type LLMResponse } from "../llm/client";
import type { AgentRole } from "../types/agent-events";

/**
 * Execution context provided to specialist agents during DAG traversal.
 */
export interface AgentContext {
  /** Optional telemetry observer hook invoked upon stage completion */
  emitTelemetry?: (role: AgentRole, durationMs: number, provider: string) => void;
  /** Whether external search grounding is permitted for this agent */
  allowDeepGrounding?: boolean;
}

/**
 * Abstract base class for all specialist agents in the VentureArchitect DAG.
 * Enforces typed schemas, structured prompt generation, and execution telemetry.
 *
 * @template TInput - The strongly typed input payload expected by the agent.
 * @template TOutput - The strictly validated output structure produced by the agent.
 */
export abstract class BaseAgent<TInput, TOutput> {
  /** The unique architectural role identifier for this specialist agent */
  abstract readonly role: AgentRole;
  /** The human-readable display title used across the mission control interface */
  abstract readonly displayName: string;
  /** The runtime Zod schema enforcing output integrity */
  abstract readonly schema: z.ZodType<TOutput>;

  /**
   * Constructs the domain-specific system instruction prompt for the LLM.
   *
   * @param input - The input data provided by the DAG coordinator or parent stage.
   * @param context - Optional execution context and telemetry hooks.
   * @returns The fully formatted system prompt string.
   */
  protected abstract buildSystemPrompt(input: TInput, context?: AgentContext): string;

  /**
   * Constructs the task-specific user prompt for the agent.
   *
   * @param input - The input data provided by the DAG coordinator or parent stage.
   * @param context - Optional execution context.
   * @returns The fully formatted user prompt string.
   */
  protected abstract buildUserPrompt(input: TInput, context?: AgentContext): string;

  /**
   * Provides a concrete exemplar JSON string matching the agent's schema.
   *
   * @returns Exemplar JSON schema string for few-shot schema alignment.
   */
  protected abstract getSchemaExample(): string;

  /**
   * Primary execution method orchestrating prompt assembly, multi-provider LLM dispatch,
   * JSON parsing with self-healing recovery, and schema verification.
   *
   * @param input - The domain input payload required by this agent.
   * @param context - Optional runtime context containing telemetry reporters.
   * @returns Promise resolving to the validated response payload and execution metadata.
   * @throws {LLMProviderError} If all configured LLM providers fail or time out.
   * @throws {ValidationError} If the agent output violates schema invariants after healing.
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
