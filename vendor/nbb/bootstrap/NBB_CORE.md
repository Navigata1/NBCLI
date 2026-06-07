<!-- NBB_CORE — single source of truth for the portable bootstrap.
     AGENTS.md, CLAUDE.md, SKILL.md and dist/NBB_BOOTSTRAP.md are GENERATED from
     this file by scripts/build_bootstrap.sh. Edit HERE, never the generated copies.
     ASCII-only by policy (mojibake-safe). Target footprint: small fraction of context. -->

# North Star — Portable Bootstrap (NBB)

> **The compass for AI-native development.** "Build with intention. Ship with confidence."
> This page is the ALWAYS-RESIDENT layer. Everything heavier loads ON DEMAND.
> NBB = Northstar Boot-strap edition. License: CC BY-NC-SA 4.0 (c) North Star Build / @NavigatingTruth.

---

## 0. What this is (read once, ~2 minutes)

North Star is a methodology, not an app. It has three reference documents you
NEVER load in full at once:

| Doc | Question it answers | Load when |
|-----|---------------------|-----------|
| **Blueprint** (`NORTH_STAR_BLUEPRINT_v6.5.md`) | **HOW** to build (methodology, 14 Parts / 59 Sections) | a phase needs the method |
| **MBF** (`MASTER_BUILD_FRAMEWORK_v2.5.md`) | **WHAT** to build with (62 technology categories) | choosing a tool/stack |
| **BRIDGE** (`BRIDGE.md`) | **NAVIGATE** (full routing tables) | the mini-router below misses |

Mnemonic: **NS = HOW | MBF = WHAT | BRIDGE = NAVIGATE.**

This core gives you the contract, the ignition sequence, a mini-router, the load
rules, and the safety floor. That is enough to start almost any project without
opening the big docs.

---

## 1. The contract (what "following North Star" means)

1. This core is your **ignition key** — start here every session.
2. **Check for an existing project instruction file** before generating a new one.
3. Scaffolding under `./build` is **temporary**; it leaves when you are done.
4. Your project instruction file (`CLAUDE.md` / `AGENTS.md`) is **permanent**.
5. **Reference on demand** via the router — do not front-load the framework.
6. **Confidence before action** — calibrate, and pause when uncertain.
7. **Clean exit** — remove scaffolding, leave a provenance note.

Values, in strict priority: **DEPTH > FOCUS > ACCURACY** (never speed). Honest
capability assessment over optimism. Context cleanliness over token-burning.
Governance is co-equal with power.

The four house differentiators:
- **Load balancing, not token burning** — fetch what you need, unload when done.
- **Confidence calibration, not runaway execution** — pause when uncertain.
- **Self-cleaning, not permanent bloat** — scaffolding cleans up after itself.
- **Methodology-first, not tool-first** — here is the process; tools plug in.

---

## 2. Ignition sequence (the first 5 actions)

1. **Scaffold.** Create `./build`; fetch the 3 framework docs only if/when needed.
2. **Detect environment + existing project file.** If a project instruction file
   exists, enhance it (Synthesis Protocol) — never blind-overwrite. Else generate one.
3. **Determine tier:** Foundation (simple/internal) -> Sky (production app) ->
   Space (flagship, maximum polish). Tier sets quality gates and autonomy caps.
4. **Build ONE vertical slice** end-to-end: UI -> API -> Data -> Tests -> working.
5. **Reference on demand** via the router below; methodology -> Blueprint,
   technology -> MBF, edge-case navigation -> BRIDGE.

> The framework is your REFERENCE, not your SCRIPT. Build incrementally.

---

## 3. Mini-router (covers the common cases without opening BRIDGE)

If your need is not here, THEN load `BRIDGE.md` (full decision tree + matrix).

| I need to... | Go to |
|--------------|-------|
| start / classify a project | Blueprint Part I-II (Sec 1-8) |
| structure code / pick architecture | Blueprint Part VIII (Sec 37-41) |
| design the UI / motion | Blueprint Part VII (Sec 28-36) + skill `design-taste` |
| choose a database | MBF Category 15-17 |
| add authentication | Blueprint Part X (Sec 47) + MBF Category 50 |
| secure the app | Blueprint Part X (Sec 46-49) + MBF Category 50-53 |
| add payments | MBF Category 49 (use Stripe restricted keys — see Safety) |
| build RAG | MBF Category 29 + Blueprint Part IV |
| build agents / multi-agent | Blueprint Part V (Sec 20-23) + MBF Category 30-31 |
| integrate tools / MCP | Blueprint Part VI (Sec 24-27) + skill `mcp-builder` |
| manage long context / compress | Blueprint Sec 16, 20 + MBF Category 34 |
| test | Blueprint Part IX (Sec 42-45) + MBF Category 46 |
| deploy / CI-CD / observe | Blueprint Part XI (Sec 50-53) + MBF Category 43 |
| pick a model | Blueprint Sec 13 + MBF Category 33 |
| orchestrate parallel agents | skill `parallel-agent` |
| work safely with a human | Blueprint Part XIV (Human-Agent Collaboration) |

---

## 4. Load discipline (the tokenomics rule)

Combined framework is ~2 MB — it will overload any context window. So:

- **Tier 1 (always):** this core + your project instruction file.
- **Tier 2 (on demand):** `BRIDGE.md`, then the ONE Blueprint Section or MBF
  Category the router named.
- **Tier 3 (lookup only):** deep tables/appendices — consult, do not "read".

Rules: never load full Blueprint + full MBF simultaneously. Skim, do not consume.
Unload a section when you are done with that topic. Watch context % to avoid
auto-compaction. Per-Part token budgets are MEASURED in
`bootstrap/context-budget.json` (rules: `docs/TOKENOMICS.md`); loading the full
framework is ~258k tokens and exceeds a 200k window, so lazy-loading is mandatory.

---

## 5. Safety floor (non-negotiable)

**HARD STOPS — present the command, do NOT execute it:**
- `terraform destroy` / `apply -destroy`, `pulumi destroy`
- `DROP DATABASE`, `DROP SCHEMA ... CASCADE`
- production force-reset / `--force` destructive ops
- `rm -rf` on root, home, or project root

See `HARD_STOPS.md` for the full severity-tiered list; load it at session start.

**Blast-radius tiers:** 1 Observation | 2 Local mutation | 3 Service mutation |
4 Destructive | 5 Catastrophic (manual human execution only). Classify before any
Tier 3+ operation.

**Permission discipline:** NEVER `--dangerously-skip-permissions`. Pre-configure
exactly what the agent may do in `.claude/settings.json` allow/deny lists,
committed to git. Default to least privilege.

**Autonomy caps (automatic):** security changes max L4; DB migrations max L3;
production deploys max L3; financial/payment code max L2.

**Secrets:** never hard-code. Use a vault + `op://` references launched via
`op run --` so secrets enter only the child process. Payments: Stripe restricted
keys, test mode, webhook signing secret in env. See Blueprint Part X / governance.

---

## 6. Confidence calibration

Levels: CERTAIN -> HIGH -> MEDIUM -> LOW -> UNCERTAIN. Proceed autonomously at
HIGH+. At MEDIUM, state assumptions and continue. At LOW/UNCERTAIN, **pause and
ask** — do not guess on irreversible or Tier 3+ actions. Do not automate a
workflow (RALPH-style loop) until a human has run it manually enough times.

---

## 7. Where everything lives

- Methodology: `NORTH_STAR_BLUEPRINT_v6.5.md` (deep) | this core (fast).
- Technology: `MASTER_BUILD_FRAMEWORK_v2.5.md`.
- Navigation: `BRIDGE.md`.
- Deep ignition reference: `NORTH_STAR_BOOTSTRAP.md`.
- Skills: `.claude/skills/<name>/SKILL.md` (run `skill-supply-chain-review` before importing any external skill).
- Skill packs (tiered, security-gated, reproducible): `packs/` — `core-100` / `extended-300` manifests + `scripts/build_skill_pack.py` (gate: `scripts/vet_skill.sh`). See `packs/README.md`. Default-deny on unpinned/FAIL.
- Multi-agent coordination: `docs/MULTI_AGENT_COORDINATION.md`.
- Governance & security: `docs/governance/` and Blueprint Part X.
- Interop protocols (MCP/A2A/AG-UI/A2UI/ACP): `docs/protocols/`.
- Cross-harness notes: `docs/PORTABILITY.md`.

---

## 8. Cross-reference convention

Use `NS Section <N>` and `MBF Category <N>` (stable). Use `NS Part <Roman>` for
coarse pointers. Avoid bare subsection numbers in prose; include the title.
BRIDGE.md is the canonical cross-reference map — update it when sections move.

<!-- NBB_CORE_BODY_END -->
