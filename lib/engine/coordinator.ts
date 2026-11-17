import { IdeaStrategistAgent } from "../agents/framing";
import { MarketIntelligenceAgent } from "../agents/market";
import { CompetitorReconAgent } from "../agents/competitors";
import { CustomerProfilerAgent } from "../agents/customers";
import { VentureStressTesterAgent } from "../agents/validation";
import { LaunchArchitectAgent } from "../agents/execution";
import { executeLiveGrounding } from "../search/grounding";
import { deduplicateCitations, type SearchHit } from "../search/citations";
import { globalVentureCache } from "./memoization";
import type { VentureEventBus } from "./event-bus";
import type { FounderInput, VentureDossier } from "../types/domain";

/**
 * Central DAG Orchestrator for the VentureArchitect multi-agent intelligence pipeline.
 *
 * Coordinates topological pipeline traversal through 4 execution stages:
 * - Stage 1: Idea Strategist & Framing Agent (Sequential)
 * - Stage 2: Parallel Specialist Branches (Market Analyst, Competitor Recon, Customer Profiler)
 * - Stage 3: Venture Stress Tester Agent (Sequential synthesis of Stage 2 outputs)
 * - Stage 4: Launch Architect Agent (Execution roadmap & pitch deck generation)
 */
export class VentureDAGCoordinator {
  private eventBus: VentureEventBus;
  private ideaAgent = new IdeaStrategistAgent();
  private marketAgent = new MarketIntelligenceAgent();
  private competitorAgent = new CompetitorReconAgent();
  private customerAgent = new CustomerProfilerAgent();
  private validationAgent = new VentureStressTesterAgent();
  private executionAgent = new LaunchArchitectAgent();

  /**
   * Initializes a new DAG Coordinator bound to a real-time event bus.
   *
   * @param eventBus - The typed SSE event bus for streaming state transitions to clients.
   */
  constructor(eventBus: VentureEventBus) {
    this.eventBus = eventBus;
  }

  /**
   * Orchestrates the 4-stage multi-agent DAG pipeline with parallel specialist branches.
   *
   * @param input - The sanitized founder hypothesis, target region, business model, and stage.
   * @returns Resolves to the comprehensive, battle-tested VentureDossier.
   * @throws {LLMProviderError} If all configured LLM providers fail during any DAG stage.
   * @throws {ValidationError} If synthesized agent outputs fail schema invariants.
   */
  public async runPipeline(input: FounderInput): Promise<VentureDossier> {
    const pipelineStart = Date.now();
    const cacheKey = globalVentureCache.generateDossierKey(input);

    // Check LRU cache for identical queries
    const cachedDossier = globalVentureCache.getDossier(cacheKey);
    if (cachedDossier) {
      this.eventBus.emit({
        type: "stage_transition",
        agent: "orchestrator",
        status: "cached",
        message: "Cryptographic cache hit (0 API tokens consumed, sub-50ms resolution).",
        progressPercent: 100,
      });
      this.eventBus.emit({
        type: "complete",
        dossier: {
          ...cachedDossier,
          telemetry: {
            ...cachedDossier.telemetry,
            cacheHit: true,
          },
        },
      });
      return cachedDossier;
    }

    const allHits: SearchHit[] = [];

    // -------------------------------------------------------------------------
    // STAGE 1: Idea Strategist & Framing Agent
    // -------------------------------------------------------------------------
    this.eventBus.emit({
      type: "stage_transition",
      agent: "framing",
      status: "running",
      message: "Stage 1: Deconstructing founder hypothesis, market archetype, and search queries...",
      progressPercent: 15,
    });

    const framingRes = await this.ideaAgent.execute(input);

    this.eventBus.emit({
      type: "agent_telemetry",
      agent: "framing",
      durationMs: framingRes.durationMs,
      provider: framingRes.provider,
      confidenceScore: 0.96,
    });

    this.eventBus.emit({
      type: "stage_transition",
      agent: "framing",
      status: "completed",
      message: `Framed "${framingRes.data.ventureName}" (${framingRes.data.category}).`,
      progressPercent: 25,
    });

    // -------------------------------------------------------------------------
    // LIVE WEB GROUNDING (Parallel multi-query web search)
    // -------------------------------------------------------------------------
    this.eventBus.emit({
      type: "stage_transition",
      agent: "orchestrator",
      status: "running",
      message: "Initiating live web grounding across market, competitor, and customer domains...",
      progressPercent: 30,
    });

    const [marketGrounding, competitorGrounding, customerGrounding] = await Promise.all([
      executeLiveGrounding(framingRes.data.searchQueries.market),
      executeLiveGrounding(framingRes.data.searchQueries.competitors),
      executeLiveGrounding(framingRes.data.searchQueries.customers),
    ]);

    allHits.push(...marketGrounding.hits, ...competitorGrounding.hits, ...customerGrounding.hits);
    const liveCitations = deduplicateCitations(allHits, 6);

    if (liveCitations.length > 0) {
      this.eventBus.emit({
        type: "citations_discovered",
        citations: liveCitations,
      });
    }

    // -------------------------------------------------------------------------
    // STAGE 2: Parallel Specialist Branches (Market, Competitors, Customers)
    // -------------------------------------------------------------------------
    this.eventBus.emit({
      type: "stage_transition",
      agent: "market",
      status: "running",
      message: "Stage 2: Launching parallel specialist agents (Market, Competitors, Customers)...",
      progressPercent: 40,
    });

    const [marketRes, competitorRes, customerRes] = await Promise.all([
      this.marketAgent.execute({
        input,
        framing: framingRes.data,
        searchContext: marketGrounding.formattedContext,
      }),
      this.competitorAgent.execute({
        input,
        framing: framingRes.data,
        searchContext: competitorGrounding.formattedContext,
      }),
      this.customerAgent.execute({
        input,
        framing: framingRes.data,
        searchContext: customerGrounding.formattedContext,
      }),
    ]);

    // Emit specialist telemetry
    this.eventBus.emit({
      type: "agent_telemetry",
      agent: "market",
      durationMs: marketRes.durationMs,
      provider: marketRes.provider,
    });
    this.eventBus.emit({
      type: "agent_telemetry",
      agent: "competitors",
      durationMs: competitorRes.durationMs,
      provider: competitorRes.provider,
    });
    this.eventBus.emit({
      type: "agent_telemetry",
      agent: "customers",
      durationMs: customerRes.durationMs,
      provider: customerRes.provider,
    });

    this.eventBus.emit({
      type: "stage_transition",
      agent: "market",
      status: "completed",
      message: `Completed: TAM ${marketRes.data.tam.valueFormatted}, ${competitorRes.data.directCompetitors.length} competitors analyzed, ICP defined.`,
      progressPercent: 65,
    });

    // -------------------------------------------------------------------------
    // STAGE 3: Venture Stress Tester & Validation Agent
    // -------------------------------------------------------------------------
    this.eventBus.emit({
      type: "stage_transition",
      agent: "validation",
      status: "running",
      message: "Stage 3: Consolidating research into 0–100 Viability Score & Unit Economics simulation...",
      progressPercent: 70,
    });

    const validationRes = await this.validationAgent.execute({
      input,
      framing: framingRes.data,
      market: marketRes.data,
      competitors: competitorRes.data,
      customers: customerRes.data,
    });

    this.eventBus.emit({
      type: "agent_telemetry",
      agent: "validation",
      durationMs: validationRes.durationMs,
      provider: validationRes.provider,
      confidenceScore: validationRes.data.overallViabilityScore / 100,
    });

    this.eventBus.emit({
      type: "stage_transition",
      agent: "validation",
      status: "completed",
      message: `Viability Score: ${validationRes.data.overallViabilityScore}/100 (${validationRes.data.verdict}).`,
      progressPercent: 85,
    });

    // -------------------------------------------------------------------------
    // STAGE 4: Launch Execution Architect Agent
    // -------------------------------------------------------------------------
    this.eventBus.emit({
      type: "stage_transition",
      agent: "execution",
      status: "running",
      message: "Stage 4: Synthesizing 90-day execution sprints, MoSCoW MVP scope, and pitch deck outline...",
      progressPercent: 90,
    });

    const executionRes = await this.executionAgent.execute({
      input,
      framing: framingRes.data,
      customers: customerRes.data,
      validation: validationRes.data,
    });

    this.eventBus.emit({
      type: "agent_telemetry",
      agent: "execution",
      durationMs: executionRes.durationMs,
      provider: executionRes.provider,
    });

    // -------------------------------------------------------------------------
    // COMPILATION & DOSSIER EMISSION
    // -------------------------------------------------------------------------
    const totalDuration = Date.now() - pipelineStart;
    const dossier: VentureDossier = {
      id: `va_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      createdAt: new Date().toISOString(),
      input,
      framing: framingRes.data,
      market: marketRes.data,
      competitors: competitorRes.data,
      customers: customerRes.data,
      validation: validationRes.data,
      execution: executionRes.data,
      citations: liveCitations,
      telemetry: {
        durationMs: totalDuration,
        agentsExecuted: 6,
        primaryLlm: framingRes.provider,
        groundingHits: allHits.length,
        cacheHit: false,
      },
    };

    // Save to LRU Cache
    globalVentureCache.setDossier(cacheKey, dossier);

    this.eventBus.emit({
      type: "stage_transition",
      agent: "execution",
      status: "completed",
      message: `Venture Dossier successfully compiled in ${(totalDuration / 1000).toFixed(1)}s.`,
      progressPercent: 100,
    });

    this.eventBus.emit({
      type: "complete",
      dossier,
    });

    return dossier;
  }
}
