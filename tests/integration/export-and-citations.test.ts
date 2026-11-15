import { describe, it, expect } from "bun:test";
import { deduplicateCitations } from "../../lib/search/citations";
import { dossierToInvestmentMemo } from "../../lib/export/markdown";
import { dossierToPitchDeckSlides } from "../../lib/export/pitch-deck";
import { SHOWCASE_PRESETS } from "../../lib/presets/showcase-ventures";

describe("PS08 Startup Co-Pilot: Export Formats & Citations Grounding", () => {
  it("deduplicates identical URLs and formats domain names properly", () => {
    const hits = [
      {
        title: "Gartner Report",
        url: "https://www.gartner.com/report/1",
        snippet: "Enterprise RevOps software",
        domain: "",
      },
      {
        title: "Gartner Duplicate",
        url: "https://www.gartner.com/report/1",
        snippet: "Duplicate snippet",
        domain: "",
      },
      {
        title: "TechCrunch Article",
        url: "https://techcrunch.com/2025/ai-startup",
        snippet: "AI startups raising funds",
        domain: "",
      },
    ];

    const citations = deduplicateCitations(hits, 5);
    expect(citations).toHaveLength(2);
    expect(citations[0].domain).toBe("gartner.com");
    expect(citations[1].domain).toBe("techcrunch.com");
  });

  it("filters out invalid or malformed URL protocols", () => {
    const malformedHits = [
      { title: "Invalid", url: "not-a-valid-url", snippet: "bad", domain: "" },
      { title: "Valid", url: "https://valid.com/info", snippet: "good", domain: "" },
    ];

    const citations = deduplicateCitations(malformedHits, 5);
    expect(citations).toHaveLength(1);
    expect(citations[0].url).toBe("https://valid.com/info");
  });

  it("generates an exhaustive, well-structured Executive Investment Memo", () => {
    const dossier = SHOWCASE_PRESETS[0].precompiledDossier;
    const memo = dossierToInvestmentMemo(dossier);

    expect(memo).toContain(`# Executive Investment Memo: ${dossier.framing.ventureName}`);
    expect(memo).toContain("## 1. Executive Summary & Core Hypothesis");
    expect(memo).toContain("## 2. Market Sizing & Macro Dynamics");
    expect(memo).toContain("## 3. Competitive Intelligence & 2x2 Positioning");
    expect(memo).toContain("## 4. Customer Persona & \"Mom Test\" Discovery Script");
    expect(memo).toContain("## 5. Venture Stress Testing & Unit Economics");
    expect(memo).toContain("## 6. Execution Roadmap & Launchpad");
    expect(memo).toContain("## 7. Grounding Citations");

    // Check specific table contents
    expect(memo).toContain(dossier.market.tam.valueFormatted);
    expect(memo).toContain(String(dossier.validation.overallViabilityScore));
  });

  it("generates 10 structured pitch deck slides conforming to YC/Sequoia format", () => {
    const dossier = SHOWCASE_PRESETS[0].precompiledDossier;
    const deck = dossierToPitchDeckSlides(dossier);

    expect(deck).toContain(`# Pitch Deck Outline: ${dossier.framing.ventureName}`);
    for (let i = 1; i <= 10; i++) {
      expect(deck).toContain(`### Slide ${i}:`);
    }
  });
});
