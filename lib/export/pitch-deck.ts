import type { VentureDossier } from "../types/domain";

export function dossierToPitchDeckSlides(dossier: VentureDossier): string {
  const slides = dossier.execution.pitchDeckOutline;
  return `# Pitch Deck Outline: ${dossier.framing.ventureName}
Target Raise: Seed / Pre-Seed Round

${slides
  .map(
    (s) => `---
### Slide ${s.slideNumber}: ${s.title}
**Narrative Hook:**  
${s.coreHook}

**Core Evidence & Proof Point:**  
${s.keyEvidence}
`
  )
  .join("\n")}
`;
}
