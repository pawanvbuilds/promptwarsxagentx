import { executeTextCompletion } from "../llm/client";
import {
  WAR_ROOM_PERSONAS,
  type WarRoomInquiry,
  type WarRoomPersonaId,
} from "../types/personas";
import type { VentureDossier } from "../types/domain";

export class InteractiveWarRoomAgent {
  public async consult(
    inquiry: WarRoomInquiry,
    dossier?: VentureDossier
  ): Promise<{
    answer: string;
    persona: { id: WarRoomPersonaId; name: string; role: string; avatarIcon: string };
    provider: string;
    model: string;
  }> {
    const persona = WAR_ROOM_PERSONAS[inquiry.personaId];
    if (!persona) {
      throw new Error(`Unknown persona ID: ${inquiry.personaId}`);
    }

    let contextSnippet = "No prior venture dossier provided. Provide general advice.";
    if (dossier) {
      contextSnippet = `VENTURE DOSSIER IN CONTEXT:
Venture Name: ${dossier.framing.ventureName}
Category: ${dossier.framing.category}
One-Liner: ${dossier.framing.oneLiner}
Value Proposition: ${dossier.framing.valueProposition}
Market TAM/SAM/SOM: TAM ${dossier.market.tam.valueFormatted}, SAM ${dossier.market.sam.valueFormatted}, SOM ${dossier.market.som.valueFormatted}
Overall Viability Score: ${dossier.validation.overallViabilityScore}/100 (${dossier.validation.verdict})
Direct Competitors: ${dossier.competitors.directCompetitors.map((c) => c.name).join(", ")}
Primary ICP: ${dossier.customers.primaryICP.roleTitle} at ${dossier.customers.primaryICP.organizationType}
Unit Economics: CAC ${dossier.validation.unitEconomicsProjection.estimatedCAC}, LTV ${dossier.validation.unitEconomicsProjection.estimatedLTV}, LTV/CAC ${dossier.validation.unitEconomicsProjection.ltvCacRatio}x
Critical Risks: ${dossier.validation.killRisks.map((r) => `${r.threat} (${r.severity})`).join("; ")}`;
    }

    const systemPrompt = `${persona.systemPromptModifier}

You are advising the founder directly in the Interactive Venture War Room.
Always ground your answers in the specific facts and metrics of this venture:
${contextSnippet}

Formatting instructions:
- Be punchy, incisive, and direct. Avoid generic polite fluff.
- Use structured markdown formatting (bullet points, bold highlights, numbered action steps).
- Give concrete numbers, scripts, or architectural trade-offs tailored to this specific business.`;

    const userPrompt = inquiry.question;
    const result = await executeTextCompletion(systemPrompt, userPrompt);

    return {
      answer: result.text,
      persona: {
        id: persona.id,
        name: persona.name,
        role: persona.role,
        avatarIcon: persona.avatarIcon,
      },
      provider: result.provider,
      model: result.model,
    };
  }
}
