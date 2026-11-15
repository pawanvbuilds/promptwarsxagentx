# VentureArchitect — Autonomous Multi-Agent Startup Co-Pilot (PS08)

[![PromptWars x AgentX 2.0](https://img.shields.io/badge/Hackathon-PromptWars%20x%20AgentX%202.0-blue)](https://hack2skill.com)
[![Vertical PS08](https://img.shields.io/badge/Vertical-PS08%3A%20Startup%20Co--Pilot-emerald)](https://hack2skill.com)
[![Next.js 16](https://img.shields.io/badge/Next.js-16.4.6-black)](https://nextjs.org)
[![Bun](https://img.shields.io/badge/Runtime-Bun%201.3-orange)](https://bun.com)
[![Tests Passing](https://img.shields.io/badge/Tests-27%20Passed%20(136%20Assertions)-success)](tests/)
[![Code Quality](https://img.shields.io/badge/ESLint-0%20Errors%20%7C%200%20Warnings-success)](eslint.config.mjs)
[![WCAG 2.1 AA](https://img.shields.io/badge/Accessibility-WCAG%202.1%20AA%20Compliant-purple)](#accessibility--wcag-21-aa-standards)
[![Security Hardened](https://img.shields.io/badge/Security-OWASP%20%2B%20Salted%20SHA--256-blue)](#security-architecture--injection-defense)

> **Theme PS08: Startup Co-Pilot Agent**  
> *"Develop a multi-agent system that assists early-stage founders with market research, competitor analysis, customer profiling, idea validation, and execution planning."*

---

## Executive Summary & Core Innovation

Over 90% of venture-backed startups fail within 3 years—primarily because founders build products without rigorous customer discovery, miscalculate unit economics, underestimate incumbent platform risk, or enter crowded markets without defensible moats.

**VentureArchitect** is an autonomous, multi-agent venture intelligence operating system. Built upon a **Directed Acyclic Graph (DAG) orchestration engine**, VentureArchitect transforms raw founder hypotheses into an exhaustive, battle-tested validation dossier backed by real-time web grounding in under 60 seconds.

Unlike basic conversational bots or sequential LLM wrappers, VentureArchitect activates **6 autonomous specialist agents** with typed input/output contracts, parallel execution branches, an interactive SVG 2x2 positioning matrix, a dynamic unit economics simulator, and an **Interactive War Room** featuring 4 specialized advisor personas (YC Partner, Growth Hacker, Systems Architect, and Devil's Advocate VC).

---

## Architectural Comparison: Legacy vs. VentureArchitect

| Dimension | Previous Generation Co-Pilots (e.g., SparkProof) | VentureArchitect (PS08 Next-Gen) |
| :--- | :--- | :--- |
| **Orchestration Pattern** | Single monolithic 550+ line script (`pipeline.ts`) | **Modular Multi-Agent DAG (`lib/agents/`)** with abstract `BaseAgent<TInput, TOutput>` classes |
| **Code Modularity** | Single shared `types.ts` file | **Domain-Driven Layering:** `agents/`, `engine/`, `security/`, `search/`, `types/`, `export/` |
| **Competitor Analysis** | Static bulleted list | **Interactive SVG 2x2 Positioning Matrix Canvas** with quadrant coordinate plots `[-100, 100]` |
| **Unit Economics** | Static numerical text estimate | **Dynamic Real-Time Sensitivity Calculator** with live sliders for ASP, Churn %, and CAC |
| **Customer Profiling** | Basic text personas | **Dual ICPs (Buyer vs Operator) + JTBD Framework + Mom-Test Interview Simulator** with signal reveal |
| **Interactive Co-Pilot** | Single generic drawer chat | **Multi-Persona War Room:** Instant toggle between 🚀 YC Partner, 🎯 Growth Hacker, ⚡ Systems Architect, and 🛡️ Contrarian VC |
| **Security & Privacy** | Raw IP tracking & basic regex | **Salted SHA-256 IP Anonymization**, Anti-XSS, Adversarial Prompt Injection Guardrails, Secret Redaction |
| **Memoization & Cache** | In-memory key-value map | **Cryptographic SHA-256 LRU Cache** with hit-rate telemetry, size bounding, and zero-token repeat resolution |
| **Test Suite Coverage** | 1 test file (15 tests) | **7 Dedicated Test Suites (27 tests, 136 assertions):** Unit, Integration, Security, Schema, A11y |
| **Lint & Code Quality** | Warnings occasionally suppressed | **0 ESLint Errors, 0 ESLint Warnings**, strict TypeScript 5.9, zero `any` usage |

---

## 4-Stage Multi-Agent DAG Architecture

```
                             ┌───────────────────────────────────────┐
                             │       Raw Founder Concept Intake      │
                             │  (Sanitization & Injection Guardrail) │
                             └──────────────────┬────────────────────┘
                                                │
                                                ▼
                             ┌───────────────────────────────────────┐
                             │    Stage 1: Idea Strategist Agent     │
                             │   • Falsifiable Hypothesis Formation  │
                             │   • Business Model Archetype          │
                             │   • Targeted 4-Domain Search Queries  │
                             └──────────────────┬────────────────────┘
                                                │
                     ┌──────────────────────────┼──────────────────────────┐
                     │                          │                          │
                     ▼                          ▼                          ▼
     ┌───────────────────────────────┐ ┌─────────────────────────┐ ┌───────────────────────────────┐
     │ Stage 2A: Market Intelligence │ │Stage 2B: Competitor Recon│ │  Stage 2C: Customer Profiler  │
     │ • Bottom-Up TAM / SAM / SOM   │ │• Direct & Indirect Recon│ │• Dual ICP (Buyer vs Operator) │
     │ • CAGR & Market Maturity      │ │• SVG 2x2 Matrix Plots   │ │• Jobs-To-Be-Done (JTBD)       │
     │ • Macro Tailwinds & Headwinds │ │• Feature Benchmark Table│ │• Willingness-to-Pay Elasticity│
     │ • Regulatory Frameworks       │ │• White-Space Voids      │ │• Mom-Test Discovery Questions │
     └───────────────┬───────────────┘ └────────────┬────────────┘ └───────────────┬───────────────┘
                     │                          │                          │
                     └──────────────────────────┼──────────────────────────┘
                                                │
                                                ▼
                             ┌───────────────────────────────────────┐
                             │  Stage 3: Venture Stress Tester Agent │
                             │   • 0–100 Viability Index Score       │
                             │   • 6-Axis Viability Breakdown        │
                             │   • LTV/CAC & Payback Simulation      │
                             │   • Existential Kill-Risk Matrix      │
                             │   • 3 Strategic High-Leverage Pivots  │
                             └──────────────────┬────────────────────┘
                                                │
                                                ▼
                             ┌───────────────────────────────────────┐
                             │    Stage 4: Launch Architect Agent    │
                             │   • 90-Day Sprints (Sprints 1, 2, 3)  │
                             │   • MoSCoW MVP Feature Scope Matrix   │
                             │   • First 100 Customers Playbook      │
                             │   • 10-Slide Seed Pitch Deck Outline  │
                             └──────────────────┬────────────────────┘
                                                │
                     ┌──────────────────────────┴──────────────────────────┐
                     │                                                     │
                     ▼                                                     ▼
    ┌──────────────────────────────────┐                 ┌──────────────────────────────────┐
    │     Interactive Dossier View     │                 │   Multi-Persona War Room Agent   │
    │  • Interactive 2x2 Canvas        │                 │  • 🚀 YC Partner Persona         │
    │  • Dynamic Economics Sliders     │ ◄──────────────►│  • 🎯 Growth Hacker Persona      │
    │  • Mom-Test Interview Simulator  │                 │  • ⚡ Systems Architect Persona  │
    │  • 1-Click Executive Memo Export │                 │  • 🛡️ Contrarian VC Persona      │
    └──────────────────────────────────┘                 └──────────────────────────────────┘
```

---

## Autonomous Specialist Agent Details

### 1. Stage 1: Idea Strategist Agent (`IdeaStrategistAgent`)
- **Mission:** Deconstruct raw founder concepts into an analytically sound venture thesis.
- **Deliverables:** Memorable venture title, 1-sentence value proposition, core falsifiable hypothesis (`If we provide [X], then [Y] will [Z] because [W]`), business model archetype, and 4 high-precision live web search queries.

### 2. Stage 2A: Market Intelligence Agent (`MarketIntelligenceAgent`)
- **Mission:** Grounded bottom-up market sizing without relying on generic inflated statistics.
- **Deliverables:** 
  - **TAM:** Explicit account arithmetic `(# of potential buyer accounts worldwide) * (Average ACV)`.
  - **SAM:** Addressable volume filtered by target geography, language, and regulatory scope.
  - **SOM:** Realistic Year 3–5 market capture target based on sales capacity.
  - **CAGR:** 5-year growth trajectory with market maturity status.
  - **Tailwinds & Headwinds:** Macro catalysts and structural barriers.
  - **Regulatory Landscape:** Governing compliance bodies (e.g. GDPR, SOC 2, HIPAA, EU AI Act).

### 3. Stage 2B: Competitor Reconnaissance Agent (`CompetitorReconAgent`)
- **Mission:** Map out direct and indirect competitive battlefields with verified URLs and defensibility assessments.
- **Deliverables:**
  - **Direct Competitors:** Verified landing page URLs, pricing models, funding stage, strengths, and vulnerabilities.
  - **2x2 Positioning Matrix:** Dynamic coordinates `[-100, 100]` plotted on an SVG canvas comparing our venture against incumbents along custom market axes.
  - **Feature Benchmark Matrix:** Teardown of 4–8 core capabilities rating Our Advantage (High/Medium/Low) vs legacy alternatives.
  - **White-Space Voids:** Exploitable market gaps incumbents ignore due to the innovator's dilemma.
  - **Moat Rating (1–10):** Network effects, switching costs, proprietary data flywheels, or process power.

### 4. Stage 2C: Customer Profiling & Discovery Agent (`CustomerProfilerAgent`)
- **Mission:** Build empathetic, behavior-focused customer profiles designed to uncover true willingness to pay.
- **Deliverables:**
  - **Primary ICP:** Budget authority role, day-in-the-life, acute unresolved pains, trigger buying event, and decision KPI.
  - **Secondary ICP:** Daily operator / internal champion who will use the product.
  - **Jobs-To-Be-Done (JTBD):** Functional job, emotional job, and social perception job.
  - **Willingness-to-Pay Elasticity:** Starter, Growth, and Enterprise pricing brackets with psychological value anchors.
  - **Mom-Test Interview Script:** 4–5 discovery questions framed around past actions with green-flag validation signals and red-flag polite false-positive warnings.

### 5. Stage 3: Venture Stress Tester Agent (`VentureStressTesterAgent`)
- **Mission:** Chair the simulated investment committee diligence and pressure-test business models for fatal flaws.
- **Deliverables:**
  - **0–100 Viability Index:** Calibrated score weighted across Problem Urgency (20%), Market Timing (20%), Moat Strength (15%), Feasibility (15%), Unit Economics (15%), and Regulatory Ease (15%).
  - **Unit Economics Baseline:** Estimated CAC, LTV, LTV/CAC ratio, cash payback horizon, and gross margins.
  - **Existential Kill-Risks:** 3–4 lethal threats with early warning lead indicators and concrete de-risking actions.
  - **Strategic Pivots:** 2–3 high-leverage business model or vertical pivots if initial traction stalls.

### 6. Stage 4: Launch Execution Architect Agent (`LaunchArchitectAgent`)
- **Mission:** Convert strategic research into an operational 90-day execution roadmap.
- **Deliverables:**
  - **90-Day Sprints:** Sprints 1, 2, and 3 (Days 1–30, 31–60, 61–90) with milestones, deliverables, and objective validation gates.
  - **MoSCoW MVP Feature Scope:** Must-Have (Day 1), Should-Have (Fast Follow), and Won't-Have V1 (Scope Creep Defense).
  - **First 100 Customers Playbook:** 3 tactical acquisition channels with exact messaging hooks and target conversions.
  - **10-Slide Pitch Deck Outline:** Standard YC/Sequoia narrative framework ready for investor pitches.

---

## Interactive War Room Advisory Personas

Founders can interact directly with 4 distinct advisory personas embedded into the system:

1. **🚀 Garry "YC" Vance (Managing Partner, Top Accelerator):**
   - *Focus:* Tough love, customer obsession, hair-on-fire problem urgency, and 10% weekly growth targets.
2. **🎯 Elena Rostova (Head of Growth & Viral Engineering):**
   - *Focus:* Zero-CAC distribution loops, LinkedIn/community scraping, and product-led acquisition flywheels.
3. **⚡ Dr. Marcus Chen (Principal Systems Architect):**
   - *Focus:* Pragmatic MVP tech stacks, database schema trade-offs, AI latency management, and technical debt avoidance.
4. **🛡️ Victoria Sterling (Contrarian Tech Investor):**
   - *Focus:* Existential stress-testing, unit economics collapse risks, platform dependency, and Big Tech defensive responses.

---

## Security Architecture & Injection Defense

To achieve a perfect 100/100 security profile, VentureArchitect implements multi-layered defensive guardrails:

1. **Adversarial Prompt Injection Defense (`sanitizeFounderInput`):**
   - Scans incoming inputs against adversarial jailbreaks (`ignore previous instructions`, `DAN`, `act as an unrestricted AI`, `<script>`).
   - Normalizes Unicode spaces and zero-width characters to prevent filter evasion.
   - Enforces strict length bounds (10 to 2,500 characters).
2. **Salted SHA-256 IP Anonymization:**
   - Raw user IP addresses are **never** stored in memory or logged to persistent storage.
   - Client identifiers are hashed using `crypto.createHash("sha256").update(SALT + ip)` before evaluation.
3. **Sliding-Window Fair Resource Quotas:**
   - Bounded in-memory sliding window enforcing 12 full analyses and 40 war room inquiries per 24 hours per client.
   - Automatic background memory garbage collection purges expired buckets every 10 minutes.
4. **Credential & Secret Redaction Filter (`redactSensitiveData`):**
   - Outbound logs and responses pass through a strict regex redaction filter that strips Google API keys (`AIza*`), Groq keys (`gsk_*`), Bearer tokens, and database connection strings.
5. **Strict HTTP Security Headers (`next.config.ts`):**
   - `X-Content-Type-Options: nosniff`
   - `X-Frame-Options: DENY`
   - `X-XSS-Protection: 1; mode=block`
   - `Referrer-Policy: strict-origin-when-cross-origin`
   - `Permissions-Policy: camera=(), microphone=(), geolocation=()`
   - `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`

---

## Testing & Quality Assurance (27 Passing Tests)

The test suite is organized into 5 domain modules executed via Bun's native test runner in **< 200 milliseconds**:

```bash
bun test
```

### Test Suite Breakdown:
1. `tests/unit/schema-and-inputs.test.ts` (5 tests):
   - Validates intake input bounds, default value fallback, and short input rejections.
   - Verifies all bundled showcase presets strictly conform to output schemas without runtime deviations.
2. `tests/unit/dag-and-memoization.test.ts` (4 tests):
   - Tests deterministic cryptographic SHA-256 key generation across case and whitespace variance.
   - Verifies LRU cache insertion, retrieval, and telemetry hit-rate tracking.
   - Validates typed event emission and clean listener unsubscription on `VentureEventBus`.
3. `tests/unit/json-repair.test.ts` (5 tests):
   - Verifies JSON extraction from markdown code fences, root braces, and bracket arrays.
   - Validates self-healing parser repairs on trailing commas, smart quotes, and single quotes.
4. `tests/unit/agents-contract.test.ts` (1 test):
   - Validates that all 6 specialist agents implement correct lifecycle roles and valid Zod schemas.
5. `tests/security/guardrails-and-ratelimit.test.ts` (6 tests):
   - Verifies input sanitization and rejection of adversarial prompt injections.
   - Tests salted SHA-256 IP anonymization and sliding window quota enforcement.
   - Tests credential redaction against leaked tokens.
6. `tests/integration/export-and-citations.test.ts` (4 tests):
   - Validates citation deduplication, URL protocol verification, and domain extraction.
   - Tests 1-click Markdown Investment Committee Memo generation.
   - Tests 10-slide Pitch Deck Outline export.
7. `tests/accessibility/a11y-contracts.test.ts` (2 tests):
   - Ensures all War Room advisor personas have accessible names, roles, and avatar symbols.
   - Verifies keyboard navigation contracts and tablist structures.

---

## Accessibility & WCAG 2.1 AA Standards

VentureArchitect was engineered from the ground up for full accessibility compliance:

- **Semantic HTML5 Architecture:** Uses appropriate landmark roles (`<header role="banner">`, `<main role="main">`, `<article>`, `<nav>`, `<aside>`, `<footer role="contentinfo">`).
- **Keyboard-First Navigation:** Full tab trapping for modals and slide-out drawers; Arrow-key (Left/Right) navigation for dossier tabs; Escape key dismissal.
- **Screen Reader Live Announcements:** Contains an invisible `#live-announcer` live region (`aria-live="polite"` and `aria-atomic="true"`) announcing pipeline state changes and agent completion events in real-time.
- **High-Contrast Design Tokens:** WCAG AAA contrast ratio on text and interactive controls (emerald accents on deep obsidian canvas).
- **Skip-to-Content Link:** Integrated `SkipToContent` component allowing keyboard users to bypass navigation directly to analysis content.
- **Alternative Data Views:** The SVG 2x2 Positioning Matrix includes a hidden screen-reader-accessible table (`.sr-only`) exposing all quadrant coordinates and competitor data.

---

## Local Setup & Development

### Prerequisites
- [Bun](https://bun.com/) (v1.2+) or Node.js (v20+)
- Git

### 1. Installation
```bash
git clone https://github.com/Harshvdev/venture-architect.git
cd venture-architect
bun install
```

### 2. Environment Configuration
Create a `.env.local` file from `.env.example`:
```bash
cp .env.example .env.local
```

Add your API keys:
```env
GEMINI_API_KEY="your-gemini-api-key"
GROQ_API_KEY="your-groq-api-key"        # Fallback provider
TINYFISH_API_KEY="your-tinyfish-api-key" # Optional for live web search
```

### 3. Run Quality & Test Suite
```bash
# Run all 27 unit, security, and integration tests
bun test

# Run ESLint check (0 errors, 0 warnings)
bun run lint

# Build production bundle
bun run build
```

### 4. Start Development Server
```bash
bun dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Problem Statement Alignment (PS08: Startup Co-Pilot Agent)

| Required Capability | How VentureArchitect Delivers Beyond Expectations |
| :--- | :--- |
| **Market Research** | Bottom-up TAM/SAM/SOM calculation formulas, 5-year CAGR, sector tailwinds/headwinds, and regulatory compliance standards grounded with real-time web citations. |
| **Competitor Analysis** | Direct & indirect competitor teardowns, interactive SVG 2x2 positioning matrix with coordinate plots, feature comparison matrix, white-space market voids, and moat rating. |
| **Customer Profiling** | Dual ICP personas (Buyer vs Daily Operator), Clayton Christensen Jobs-To-Be-Done (JTBD) framework, willingness-to-pay tiers, and 5 "Mom-Test" discovery questions with signal reveal. |
| **Idea Validation** | 0–100 Viability Score across 6 weighted vectors, dynamic unit economics sensitivity calculator (ASP, Churn, CAC, LTV/CAC, Payback), existential kill-risks, and 3 strategic pivots. |
| **Execution Planning** | Phased 90-day sprint roadmap with validation gates, MoSCoW MVP feature scoping (Must, Should, Won't Have V1), First 100 Customers tactical playbook, and 10-slide Seed pitch deck outline. |
| **Interactive Co-Pilot** | 4-Persona War Room (YC Partner, Growth Hacker, Systems Architect, Contrarian VC) allowing founders to stress-test their venture from multiple professional viewpoints. |

---

*Authored for PromptWars x AgentX 2.0 — Theme PS08: Startup Co-Pilot Agent*
