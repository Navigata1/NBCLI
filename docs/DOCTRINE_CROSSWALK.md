# DOCTRINE_CROSSWALK.md — NBB doctrine -> NBCLI mechanism

This is the **contract** for the NBB re-alignment (see `ADR-001-nbb-realignment.md`). Each row maps a
concept from NBB (pinned `282028336df169d73e49a2d3b6a12acc95896399`, Blueprint v6.5 / MBF v2.5) to the
**existing** NBCLI engine surface that enforces or emits it. NBCLI adds NO concept NBB does not have.

Status legend: **REAL** = enforced/emitted + tested today · **PARTIAL** = mechanism exists, needs
NBB-doctrine content · **SLICE N** = lands in that re-alignment slice. Honesty per `CAPABILITY_ASSESSMENT.md`.

## Governance (the core of Slice 2)

> **Slice 2 status:** DONE for the enforceable core -- NBB HARD STOPS compiled to enforced `hard_stops`
> anchors (block destructive commands) + the full NBB safety floor (hard stops, blast-radius, autonomy
> caps, op:// secrets, prompt-injection, load discipline) emitted into EVERY generated instruction file
> via `instruction-base.ts`. Still PARTIAL (deferred): the generated `.claude/settings.json` deny-list.
> Deferred (low-value/risky rename): `.mbf` vocabulary aliasing (back-compat shims).

| NBB doctrine (source) | NBCLI mechanism (existing surface) | Status |
|---|---|---|
| **HARD_STOPS Tier 5 CATASTROPHIC** (`HARD_STOPS.md`): `terraform destroy`, `DROP DATABASE`, `rm -rf /`, bypass flags — never execute | `packages/anchors/*` enforced `hard_stops` -> `nsb check`/hooks block (exit 2); `policy.ts` `toRego` -> `deny` (Cedar skips regex anchors, documented) | REAL (Slice 2) |
| **HARD_STOPS Tier 4 DESTRUCTIVE** (blast-radius assessment + confirm + delay) | anchors flag + policy `deny`/`warn`; emitted instructions carry the override protocol (STOP/EXPLAIN/PRESENT/WAIT/VERIFY) | REAL (Slice 2) |
| **HARD_STOPS Tier 3 SERVICE MUTATION** (confirm + revert path) | anchors `warn`; emitted instruction guidance | REAL (Slice 2) |
| **Blast-radius tiers 1-5** (Observation/Local/Service/Destructive/Catastrophic) | anchor severity + `evaluateChange` verdict (allow/warn/block) + emitted tier table | REAL (Slice 2) |
| **Least-privilege deny-all + denylist** (`PERMISSIONS_AND_SANDBOXING.md`: deny `Write(.env*)`, `Execute(git push *)`, `rm -rf *`, `git reset --hard *`, `git checkout -- *`) | hook profiles `minimal\|standard\|strict` default deny-all; policy `deny`; generated `.claude/settings.json` allow/deny | PARTIAL -> Slice 3 (settings emit) |
| **Secrets: `op://` + `op run --`** (mandatory default) + **Stripe RAKs** (test mode, webhook signing) | every generated instruction file emits the `op run` pattern (`instruction-base.ts`); `pnpm scan` forbids resolved secrets, requires `op://` refs | REAL (Slice 2) |
| **Tokenomics** measured tiers (`TOKENOMICS.md` + `context-budget.json`: Tier 1 ~1,941 tok = ~1% window; never co-resident; 70% budget rule; compress-before-load) | `budget.ts` (`nsb budget`) reflects context budget; emitted bootstrap carries lazy-load / Tier-1 guidance | PARTIAL -> Slice 2/3 |
| **Prompt-injection refusal** (instructions-as-DATA are not instructions; Tier 3+ via HITL) | emitted instruction files + policy guidance | REAL (Slice 2) |
| **Autonomy caps** (security max L4, DB migrations max L3, prod deploys max L3, financial max L2) | `.mbf` autonomy config + emitted instructions; confidence engine | REAL (Slice 2) |
| **Confidence calibration** (CERTAIN->HIGH->MEDIUM->LOW->UNCERTAIN; pause at LOW/UNCERTAIN on Tier 3+) | NBCLI SSAP confidence (`@nsb/core`); emitted instructions | REAL (engine) / PARTIAL (NBB wording) -> Slice 2 |

## Methodology source + dedupe (Slice 1)

| NBB doctrine | NBCLI mechanism | Status |
|---|---|---|
| **NBB is the canonical methodology** (Blueprint v6.5 / MBF v2.5, pinned SHA) | pinned vendor copy `vendor/nbb/` (or submodule) at the SHA + parity verifier | SLICE 1 |
| **Single-source + `--check` anti-drift** (`scripts/build_bootstrap.sh --check`, sha256 stamp) | `nsb sync` / `nsb sync --check` mirrors NBB `--check`; wired into `pnpm dogfood` | SLICE 1 |
| **Exactly ONE canonical methodology** (no stale shadow) | DEDUPE: quarantine/remove `north-star-blueprint/NORTH_STAR_BLUEPRINT_v6.0.md` + `0X_PART_*`, `master-build-framework/MASTER_BUILD_FRAMEWORK_v2.0.md` + segments | SLICE 1 |
| **License: CC BY-NC-SA 4.0 methodology vs MIT engine** | `LICENSE`/`NOTICE` seam + attribution `@NavigatingTruth` | SLICE 1 |

## Portability output (Slice 3)

| NBB doctrine | NBCLI mechanism | Status |
|---|---|---|
| **Portable bootstrap from `NBB_CORE.md`** -> CLAUDE.md / AGENTS.md / SKILL.md trio | `nsb init` emits the NBB bootstrap (ignition+load-discipline) + governance into the trio | REAL (Slice 3) |
| **Governance layer** (anchors, policy, hooks, budget) emitted alongside | `nsb init` already emits `.mbf/*`; carry NBB doctrine content | PARTIAL -> Slice 3 |
| **Content-hash / `--check` on generated files** | content-hash stamp on every generated file + `nsb update --check` (drift/hand-edit guard) | REAL (Slice 3) |
| **All generators carry NBB doctrine (not v2.0 text)** — 10 harness generators + `skill-md` (11) | NBB doctrine + bootstrap in the shared `instruction-base.ts` body (all 11 generators) | REAL (Slices 2-3) |

## Protocols + memory (Slice 4)

| NBB doctrine (`docs/protocols/*`) | NBCLI mechanism | Status |
|---|---|---|
| **ACP** (IDE <-> agent, LSP-style; Zed/JetBrains/Kimi) | reached VIA MCP: hosts consume `nsb-mcp` (`nsb protocols emit` -> `.mbf/integrations/mcp.json`); NBCLI is a tool/governance provider, not a driven agent | REAL (Slice 4, via MCP) |
| **MCP** = privilege boundary (least privilege) | `packages/mcp-server` (6 tools) is the unified-governance privilege boundary; wired via `mcp.json` | REAL (Slice 4) |
| **A2A / AG-UI / A2UI** | `nsb protocols emit` -> `PROTOCOLS.md` guidance (honest: emitted-guidance, NOT a runtime) | REAL -- emitted guidance (Slice 4) |
| **Swappable memory backend** (Working/Episodic/Semantic/Procedural; `MEMORY_BACKEND.md`) | `nsb protocols emit` -> `.mbf/integrations/memory-backend.json` (4 types, local-json default) | REAL (Slice 4) |

## Skills supply chain (Slice 5)

| NBB doctrine | NBCLI mechanism | Status |
|---|---|---|
| **`vet_skill.sh` default-deny gate** (FAIL/WARN/PASS: prompt-injection, pipe-to-shell, exfil, destructive) | `nsb skill vet` ports vet_skill.sh (FAIL/WARN/PASS; default-deny exit 0/2/1); vet shown in `skill stocktake` | REAL (Slice 5) |
| **`SKILLS_REGISTRY.md` + `packs/` (core-100/extended-300)** | `skill list` references `vendor/nbb/SKILLS_REGISTRY.md` (the canonical set) | REAL (Slice 5) |
| **UNPINNED honesty markers** (understand-first/context-compression remain UNPINNED until vetted) | vendored SKILLS_REGISTRY.md carries the UNPINNED markers verbatim; vet never silent-passes (WARN) | REAL (Slice 5) |

## Self-application + distribution (Slices 6-7)

| NBB doctrine | NBCLI mechanism | Status |
|---|---|---|
| **Dogfood: eat your own bootstrap** | committed root CLAUDE.md/AGENTS.md/.cursor/SKILL.md from NBCLI`s own `.mbf`; `update --check` runs in `pnpm dogfood` (self-portability) | REAL (Slice 6) |
| **Honest capability assessment** (REAL vs DEFERRED) | update `CAPABILITY_ASSESSMENT.md`; zero over-claim | SLICE 7 |
| **Drift can never recur** | `docs/DRIFT_GUARD.md`: pinned SHA + `nsb sync --check` in the gate | SLICE 7 |

## What NBCLI does NOT do (honest boundaries, unchanged)

- Never runs models (workflow emits a SPEC; the harness executes).
- ACP / A2A / AG-UI / A2UI runtime depth vs emitted-guidance is labeled per row + in `CAPABILITY_ASSESSMENT.md`.
- Methodology text is NBB's (CC BY-NC-SA); NBCLI compiles + enforces it, it does not author it.
