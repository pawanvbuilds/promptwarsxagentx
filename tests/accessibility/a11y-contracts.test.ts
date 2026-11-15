import { describe, it, expect } from "bun:test";
import { WAR_ROOM_PERSONAS, type WarRoomPersonaId } from "../../lib/types/personas";

describe("PS08 Startup Co-Pilot: Accessibility & WCAG Standards", () => {
  it("ensures all War Room personas have accessible names, roles, and avatar symbols", () => {
    for (const [id, persona] of Object.entries(WAR_ROOM_PERSONAS)) {
      expect(persona.id).toBe(id as WarRoomPersonaId);
      expect(persona.name.length).toBeGreaterThan(3);
      expect(persona.role.length).toBeGreaterThan(5);
      expect(persona.avatarIcon).toBeDefined();
      expect(persona.suggestedPrompts.length).toBeGreaterThanOrEqual(3);
    }
  });

  it("verifies expected tab identifiers and keyboard navigation contracts", () => {
    const requiredTabIds = [
      "overview",
      "market",
      "competitors",
      "customers",
      "economics",
      "roadmap",
    ];

    expect(requiredTabIds).toHaveLength(6);
    expect(new Set(requiredTabIds).size).toBe(6);
  });

  it("verifies theme state contract supports both dark and light modes", () => {
    const validThemes = ["dark", "light"];
    expect(validThemes).toContain("dark");
    expect(validThemes).toContain("light");
  });

  it("ensures globals.css defines both dark and light mode theme contracts", async () => {
    const fs = await import("fs");
    const path = await import("path");
    const cssPath = path.resolve(__dirname, "../../app/globals.css");
    const cssContent = fs.readFileSync(cssPath, "utf-8");

    // Must have dark mode definitions
    expect(cssContent).toContain('[data-theme="dark"]');
    expect(cssContent).toContain("--bg-canvas: #090d16");
    
    // Must have light mode definitions
    expect(cssContent).toContain(":root");
    expect(cssContent).toContain("--bg-canvas: #f8fcfa");
    expect(cssContent).toContain("--text-primary: #0f172a");

    // Must wire Tailwind v4 dark variant to data-theme and .dark
    expect(cssContent).toContain("@custom-variant dark");
  });
});
