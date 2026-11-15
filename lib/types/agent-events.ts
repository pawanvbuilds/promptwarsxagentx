import type { SourceCitation, VentureDossier } from "./domain";

export type AgentRole =
  | "orchestrator"
  | "framing"
  | "market"
  | "competitors"
  | "customers"
  | "validation"
  | "execution";

export type AgentStatus = "pending" | "running" | "completed" | "failed" | "cached";

export interface AgentStageProgress {
  agent: AgentRole;
  label: string;
  status: AgentStatus;
  startedAt?: number;
  completedAt?: number;
  durationMs?: number;
  message?: string;
  percent?: number;
}

export type VentureSSEEvent =
  | {
      type: "session_init";
      sessionId: string;
      totalStages: number;
    }
  | {
      type: "stage_transition";
      agent: AgentRole;
      status: AgentStatus;
      message: string;
      progressPercent: number;
    }
  | {
      type: "agent_telemetry";
      agent: AgentRole;
      durationMs: number;
      provider: string;
      confidenceScore?: number;
    }
  | {
      type: "citations_discovered";
      citations: SourceCitation[];
    }
  | {
      type: "partial_artifact";
      agent: AgentRole;
      partialData: unknown;
    }
  | {
      type: "complete";
      dossier: VentureDossier;
    }
  | {
      type: "error";
      code: string;
      message: string;
      recoverable: boolean;
    };
