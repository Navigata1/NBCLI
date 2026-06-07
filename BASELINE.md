# BASELINE — NorthStarBuild 2.0 → NBCLI (Northstar Boot-strap CLI edition)

> Captured **before** any production edit, on branch `modernize/nbcli-bootstrap-edition-v2-5`.
> Source of truth: live clone of `Navigata1/NorthStarBuild_2.0` @ `8eb5a10`, verified by a
> read-only 8-agent codebase/methodology/CI/lineage mapping pass on 2026-06-06.
> This file describes **what exists today**, separating *real capability* from *aspirational documentation*.
> Accuracy over flattery: where the repo over-claims, this baseline says so plainly.

---

## 1. Identity & provenance

| Field | Value |
|---|---|
| Source repo | `https://github.com/Navigata1/NorthStarBuild_2.0` (PUBLIC, MIT) |
| Source commit | `8eb5a103dddd7dd27835a7b5ad9c0e5b042bb2dc` (`feat: Implement CLI init command…`) |
| Default branch | `main` |
| Destination | `Navigata1/NBCLI` — "Northstar Boot-strap CLI edition" (to be created) |
| Work branch | `modernize/nbcli-bootstrap-edition-v2-5` |
| Product brand | "North Star Build 2.0" (NSB) |
| Package version (all 5 pkgs) | `0.1.0` — **mismatched** with the "2.0" brand |
| Runtime | TypeScript, Node `>=22`, pnpm `>=10` (`packageManager: pnpm@10.26.0`) |
| Build system | pnpm workspaces + Turborepo + tsup (CJS) + vitest + ESLint 9 (flat) + Playwright |

## 2. What North Star / NSB actually is

North Star Build is a **"governed autonomy"** methodology for AI-native development. Its core
idea is **Instruction-Based Enforcement (IBE)**: compile one canonical governance config
(`.mbf/mbf-governance.yaml`) into **tool-native instruction files** (`CLAUDE.md`,
`.cursor/rules/mbf.mdc`, `AGENTS.md`) that AI coding agents read and self-govern from.

The methodology itself lives as large hand-authored Markdown assets in-repo:

- **`NORTH_STAR_BOOTSTRAP.md`** — the "ignition key" (tiers, 5-level confidence calibration,
  1–7 autonomy dial, load balancing, self-cleaning scaffolding). *Banner says v1.3; provenance says 2.0.*
- **`BRIDGE.md`** v2.0 — navigation/routing between Blueprint and MBF.
- **`north-star-blueprint/`** — North Star Blueprint v6.0 ("HOW to build"), 14 parts (I–XIII + appendix).
- **`master-build-framework/`** — MBF v2.0 ("WHAT to build with"), 56 categories / 8 tiers, 4 segment files.
- **`docs/`** — strategic positioning ("Agent Governance Standard", OWASP/NIST/EU mappings, MVP plans).

**"North Star v1 vs v2" is not cleanly defined.** Version numbers run on independent axes:
the CLI/app layer is "North Star Build **2.0**" (package `0.1.0`); the docs carry their own
versions (Bootstrap 1.3/2.0, BRIDGE 2.0, Blueprint 6.0, MBF 2.0). There is **no prior CLI v1**;
`CHANGELOG.md` begins at `0.1.0` (2026-02-03). An unmerged `codex/…` branch retroactively
narrates a V1→V4 lineage (bootstrap → bridge → app-spec → productized monorepo) — that is
authored framing, not a tagged history.

## 3. Monorepo layout (verified on disk)

```
packages/
  cli/         @nsb/cli         commander CLI, bin: northstarbuild + nsb  (the product)
  core/        @nsb/core        SSAP confidence calculator + anchor loader/matcher (pure TS)
  schema/      @nsb/schema      Ajv draft-07 validators (governance + anchors)
  anchors/     @nsb/anchors     4 bundled YAML anchor libraries (15 rules)
  mcp-server/  @nsb/mcp-server  ⚠ NOT an MCP server — plain Node http server, 3 POST routes
apps/
  web/         @nsb/web         Next.js 14 marketing skeleton (lint is a no-op echo)
  docs/        @nsb/docs        Astro/Starlight docs site
examples/      basic-project (starter) + enterprise-project — workspace members, fixtures only
templates/     provenance.template (only)
scripts/       release.ts (pnpm -r publish), generate-schema-docs.ts (unwired)
```

## 4. CLI surface — exactly four commands (ground truth: `packages/cli/src/index.ts`)

| Command | Real behaviour |
|---|---|
| `nsb init` | Prompts (or `--yes`) for profile + tools; writes `.mbf/{mbf-governance,anchors,custom-anchors}.yaml` and `CLAUDE.md` / `.cursor/rules/mbf.mdc` / `AGENTS.md`. Flags: `-p/--profile`, `-t/--tools`, `-f/--force`, `-y/--yes`. |
| `nsb validate` | Ajv-validates `.mbf/mbf-governance.yaml` + `.mbf/anchors.yaml`. |
| `nsb update` | Regenerates instruction files; merges `custom-anchors.yaml` over built-ins. **Only command with `--dry-run`.** Always overwrites (`force=true`). |
| `nsb doctor` | Environment + config diagnostics (Node/pnpm versions, config presence, tool-output presence). |

No global options. No `--dry-run` on `init`. Version is **hardcoded** (`program.version('0.1.0')`
in `index.ts` AND `VERSION='0.1.0'` in `utils/banner.ts`) — not read from `package.json`.

### 4.1 Instruction generation — the single source of truth

`generators/instruction-base.ts → buildInstructionBody(config, anchors)` produces the entire
shared body. `claude-md.ts` / `agents-md.ts` / `cursor-rules.ts` each call it and only prepend a
tool header/frontmatter (the body is byte-identical across tools). **`grep SKILL` across
`packages/**/*.ts` = 0 hits** — no `SKILL.md` generator exists. `init.ts` and `update.ts`
**duplicate** the per-tool generation blocks with subtly different write semantics — the strongest
argument for a generator registry.

## 5. The engine (`@nsb/core`)

- **SSAP** is a *directory name*, not an exported symbol. Real API: `calculateConfidence`,
  `defaultConfidenceConfig`, `matchAnchors`, `loadAnchorsFromFile`, `mergeAnchorCollections`.
- **Scoring**: each factor scored 1–5 → normalized `(s-1)/4` → **weighted average** (÷ total
  weight; weights need NOT sum to 1) = `baseScore`; `finalScore = clamp(baseScore + Σ anchor.adjustment)`;
  level via thresholds `high/medium/low` (the `uncertain` threshold field is **dead config** — it's the implicit else).
- Default factors: specification_clarity .25, solution_certainty .25, reversibility .20,
  scope_containment .15, precedent_available .15. Default thresholds high .8 / medium .5 / low .3.
- `AutonomyConfig` (`default_level`, `escalation_paths`) is **declared but inert** — no code reads it.
- Anchors: 15 rules across security(6)/infrastructure(4)/data(3)/testing(2), all negative
  adjustments (strongest `env_files` −0.45). Match types substring/regex/glob; an `any`-target
  rule that hits both path & content **double-counts** its adjustment.

## 6. The "MCP server" is not MCP (critical accuracy gap)

`@nsb/mcp-server` is a bare `http.createServer` on port **3333** with three POST routes
(`/check-confidence`, `/verify-autonomy`, `/log-decision`). There is **no `@modelcontextprotocol/sdk`
dependency anywhere** (grep = 0), no JSON-RPC, no stdio transport, no tool registration. README /
QUICK_START / cli.mdx / strategy docs all call it an "MCP server / MCP runtime / MCP endpoints."
`log-decision` **persists nothing** — it echoes the payload with a timestamp, so it is not an audit trail.
No auth, rate limiting, CORS, TLS, or body `try/catch`.

## 7. Build / test / lint / release

- `pnpm build|test|lint|typecheck` → `turbo run …`. CLI builds via `tsup` → single `dist/cli.js`
  (CJS, shebang). **But tsup does not inline `@nsb/*` workspace deps**, so `dist/cli.js` is a single
  file that still `require()`s siblings — *not* truly standalone.
- **CI (`ci.yml`)** on push(main)+PR runs `install → lint → test → build`. It does **not** run
  `typecheck` and does **not** run e2e. Playwright is a separate auto workflow; `@nsb/anchors` and
  `@nsb/mcp-server` have **no tests**.
- **Release** (`release.yml` + `scripts/release.ts`) is manual `pnpm -r publish --access public`
  with a classic `NPM_TOKEN` — **no version bump, no changeset, no git tag, no npm provenance/OIDC**.

## 8. Truth/quality defects to fix during modernization

1. **License contradiction (material).** `LICENSE` = MIT and every `package.json` says MIT, but
   README / README_REPO / QUICK_START / Bootstrap / BRIDGE assert **CC BY-NC-SA 4.0**. The MIT
   `LICENSE` file is the controlling artifact → standardize docs on **MIT**, preserve attribution.
2. **Repo-identity drift.** Bootstrap fetch URLs, provenance template, submission links point to
   `NorthStarBuild_6.0`; the actual repo is `_2.0` (→ corrected to `NBCLI` in this edition).
3. **Dual lockfiles.** Both `package-lock.json` (npm) and `pnpm-lock.yaml` committed; pnpm is
   authoritative everywhere → remove the npm lockfile.
4. **Version drift.** `0.1.0` hardcoded in 2 source spots + 5 package.jsons; brand says "2.0".
   Single-source the version and bump to the agreed line.
5. **Over-claiming.** "MCP server" (it's HTTP), OWASP/NIST-grade governance (static regex anchors),
   enforcement (instruction text an agent may ignore), mandatory data-submission clause in Bootstrap §8.
6. **CI gaps.** No typecheck, no e2e, no-op web lint, no tests on 2 packages.
7. **Mandatory project-intelligence submission clause** (Bootstrap §8, unconfigured Google Form
   placeholder) — privacy-sensitive, conflicts with MIT; should be made opt-in/removed.

## 9. Modernization seams (where mid-2026 batches attach — verified)

- **SKILL.md + portable one-source-of-truth** → new `generators/skill-md.ts` + a generator
  **registry** consumed by both `init` and `update` (removes duplication). Body already centralized.
- **Global `--dry-run` preview** → chokepoint is `utils/files.ts writeFileSafe`; `update` already
  models it. Add a resolved-config/tools/MCP **readiness verdict** (ready/warning/blocked).
- **Hook profiles minimal|standard|strict** → reuse/extend the `governance.profile` system +
  schema; render the active profile into instruction files. Map to Quality-Gate strictness.
- **Model-routing / dynamic-workflow / skill subcommands / budget** → net-new commander
  subcommands following the `commands/*.ts` + `program.addCommand` pattern.
- **Cost caps / permission model / run ledger** → extend the governance schema; make
  `log-decision` a **real append-only ledger**; `autonomy.escalation_paths` is the existing
  (inert) gate to activate.
- **Real MCP adapter** → add `@modelcontextprotocol/sdk`, wrap the 3 existing pure tool functions
  behind a stdio MCP transport (clean tool boundary already exists in `src/tools/*.ts`).
- **1Password / secrets** → `op://` reference + `op run --` pattern; extend security anchors.
- **Worktree/docker isolation, ACP adapter, compression proxy, telemetry, install-on-demand
  plugins** → new surfaces; implement what is genuinely runnable, scaffold the rest **honestly**.

## 10. Prime directive for this modernization

The repo's recurring failure mode is **over-claiming**. This edition will do the opposite:
ship only capabilities that are **real and tested**, and label every scaffold/deferral explicitly
in `CAPABILITY_ASSESSMENT.md`. DEPTH and ACCURACY over breadth and polish.
