import type { FounderInput, VentureDossier } from "../types/domain";
import omniflowPreset from "./data/omniflow.json";
import verdetracePreset from "./data/verdetrace.json";

/**
 * Pre-compiled venture blueprint used for zero-latency demo evaluations,
 * testing output schema stability, and showcasing multi-agent analytical depth.
 */
export interface ShowcasePreset {
  /** Unique URL-friendly slug */
  id: string;
  /** Categorical domain tag for visual badge rendering */
  badge: string;
  /** Branded venture display title */
  title: string;
  /** Compelling 1-line value proposition */
  tagline: string;
  /** Industry vertical classification */
  category: string;
  /** Synthetic founder concept intake configuration */
  input: FounderInput;
  /** Fully materialized 4-stage validation dossier conforming to VentureDossierSchema */
  precompiledDossier: VentureDossier;
}

/**
 * Curated benchmark showcase presets representing distinct business model archetypes:
 * 1. OmniFlow AI (Enterprise B2B SaaS RevOps Intelligence)
 * 2. VerdeTrace (Supply Chain Decarbonization & Scope 3 Compliance)
 */
export const SHOWCASE_PRESETS: ShowcasePreset[] = [
  omniflowPreset as unknown as ShowcasePreset,
  verdetracePreset as unknown as ShowcasePreset,
];
