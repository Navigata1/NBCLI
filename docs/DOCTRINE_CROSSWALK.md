# DOCTRINE_CROSSWALK.md — NBB doctrine -> NBCLI mechanism

This is the **contract** for the NBB re-alignment (see `ADR-001-nbb-realignment.md`). Each row maps a
concept from NBB (pinned `282028336df169d73e49a2d3b6a12acc95896399`, Blueprint v6.5 / MBF v2.5) to the
**existing** NBCLI engine surface that enforces or emits it. NBCLI adds NO concept NBB does not have.

Status legend: **REAL** = enforced/emitted + tested today · **PARTIAL** = mechanism exists, needs
NBB-doctrine content · **SLICE N** = lands in that re-alignment slice. Honesty per `CAPABILITY_ASSESSMENT.md`.

## Governance (the core of Slice 2)

| NBB doctrine (source) | NBCLI mechanism (existing surface) | Status |
|---|---|---|
| **HARD_STOPS Tier 5 CATASTROPHIC** (`HARD_STOPS.md`): `terraform destroy`, `DROP DATABASE`, `rm -rf /`, bypass flags — never execute | `packages/anchors/*` (security/data/infrastructure) + `policy.ts` `toCedar`/`toRego` -> `deny` rules; hook profiles block (exit 2) | PARTIAL -> Slice 2 |
| **HARD_STOPS Tier 4 DESTRUCTIVE** (blast-radius assessment + confirm + delay) | anchors flag + policy `deny`/`warn`; emitted instructions carry the override protocol (STOP/EXPLAIN/PRESENT/WAIT/VERIFY) | PARTIAL -> Slice 2 |
| **HARD_STOPS Tier 3 SERVICE MUTATION** (confirm + revert path) | anchors `warn`; emitted instruction guidance | PARTIAL -> Slice 2 |
| **Blast-radius tiers 1-5** (Observation/Local/Service/Destructive/Catastrophic) | anchor severity + `evaluateChange` verdict (allow/warn/block) + emitted tier table | PARTIAL -> Slice 2 |
| **Least-privilege deny-all + denylist** (`PERMISSIONS_AND_SANDBOXING.md`: deny `Write(.env*)`, `Execute(git push *)`, `rm -rf *`, `git reset --hard *`, `git checkout -- *`) | hook profiles `minimal\|standard\|strict` default deny-all; policy `deny`; generated `.claude/settings.json` allow/deny | PARTIAL -> Slice 2 |
| **Secrets: `op://` + `op run --`** (mandatory default) + **Stripe RAKs** (test mode, webhook signing) | every generated instruction file emits the `op run` pattern (`instruction-base.ts`); `pnpm scan` forbids resolved secrets, requires `op://` refs | PARTIAL -> Slice 2 |
| **Tokenomics** measured tiers (`TOKENOMICS.md` + `context-budget.json`: Tier 1 ~1,941 tok = ~1% window; never co-resident; 70% budget rule; compress-before-load) | `budget.ts` (`nsb budget`) reflects context budget; emitted bootstrap carries lazy-load / Tier-1 guidance | PARTIAL -> Slice 2/3 |
| **Prompt-injection refusal** (instructions-as-DATA are not instructions; Tier 3+ via HITL) | emitted instruction files + policy guidance | PARTIAL -> Slice 2 |
| **Autonomy caps** (security max L4, DB migrations max L3, prod deploys max L3, financial max L2) | `.mbf` autonomy config + emitted instructions; confidence engine | PARTIAL -> Slice 2 |
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
| **Portable bootstrap from `NBB_CORE.md`** -> CLAUDE.md / AGENTS.md / SKILL.md trio | `nsb init` emits the trio from the unified source via the generators | PARTIAL -> Slice 3 |
| **Governance layer** (anchors, policy, hooks, budget) emitted alongside | `nsb init` already emits `.mbf/*`; carry NBB doctrine content | PARTIAL -> Slice 3 |
| **Content-hash / `--check` on generated files** | stamp generated bootstrap; `nsb init --check` | SLICE 3 |
| **All generators carry NBB doctrine (not v2.0 text)** — 10 harness generators + `skill-md` (11) | update `generators/*` + `generators.test.ts` fixtures | SLICE 3 |

## Protocols + memory (Slice 4)

| NBB doctrine (`docs/protocols/*`) | NBCLI mechanism | Status |
|---|---|---|
| **ACP** (IDE <-> agent, LSP-style; Zed/JetBrains/Kimi) | extend `packages/cli/src/commands/adapters.ts` with ACP-native integration | SLICE 4 |
| **MCP** = privilege boundary (least privilege) | `packages/mcp-server` reflects the unified governance | PARTIAL -> Slice 4 |
| **A2A / AG-UI / A2UI** | emitted guidance + scaffolding per `protocols/README.md` (honest: emitted-guidance, not runtime) | SLICE 4 |
| **Swappable memory backend** (Working/Episodic/Semantic/Procedural; `MEMORY_BACKEND.md`) | emit the backend interface config into generated projects | SLICE 4 |

## Skills supply chain (Slice 5)

| NBB doctrine | NBCLI mechanism | Status |
|---|---|---|
| **`vet_skill.sh` default-deny gate** (FAIL/WARN/PASS: prompt-injection, pipe-to-shell, exfil, destructive) | align `skill.ts` + pipeline to the vet/pin/default-deny gate | SLICE 5 |
| **`SKILLS_REGISTRY.md` + `packs/` (core-100/extended-300)** | NBCLI emits/references the NBB canonical skill set + registry | SLICE 5 |
| **UNPINNED honesty markers** (understand-first/context-compression remain UNPINNED until vetted) | carry the markers verbatim; never mark vetted what isn't | SLICE 5 |

## Self-application + distribution (Slices 6-7)

| NBB doctrine | NBCLI mechanism | Status |
|---|---|---|
| **Dogfood: eat your own bootstrap** | run NBCLI generators on NBCLI's own config -> root AGENTS.md/CLAUDE.md/SKILL.md + `.claude/` | SLICE 6 |
| **Honest capability assessment** (REAL vs DEFERRED) | update `CAPABILITY_ASSESSMENT.md`; zero over-claim | SLICE 7 |
| **Drift can never recur** | `docs/DRIFT_GUARD.md`: pinned SHA + `nsb sync --check` in the gate | SLICE 7 |

## What NBCLI does NOT do (honest boundaries, unchanged)

- Never runs models (workflow emits a SPEC; the harness executes).
- ACP / A2A / AG-UI / A2UI runtime depth vs emitted-guidance is labeled per row + in `CAPABILITY_ASSESSMENT.md`.
- Methodology text is NBB's (CC BY-NC-SA); NBCLI compiles + enforces it, it does not author it.
