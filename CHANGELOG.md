# Changelog

## 2.17.0 - 2026-06-07 — Sandbox isolation + workflow validation

### Added
- **`nsb sandbox run [--image] [--allow-network] [--memory] [--cpus] [--print] -- <cmd>`** — run a
  command in an isolated Docker container with the repo mounted at `/work`; **network OFF by default**
  (`--network none`). `--print` shows the docker command (no Docker needed). Pure `buildSandboxArgs`.
- **`nsb workflow validate [--file]`** — lint a plan spec (shape + caps; `concurrency_cap ≤ total_agent_cap`).
  Pure `validateWorkflowPlan`.

### Changed
- Docker isolation is now **REAL** via `nsb sandbox` (was deferred); the worktree row updated.
- Version 2.16.0 → 2.17.0.

### Still deferred (honest)
- The workflow **executor** stays the harness's job — NBCLI emits + now validates the plan, but never runs models.

## 2.16.0 - 2026-06-07 — Opt-in sinks (webhook / SIEM)

### Added
- **`nsb audit sync [--webhook <url>]`** — POST ledger entries to a webhook/SIEM. **OFF by default**:
  nothing is sent unless `sinks.webhooks` is configured or `--webhook` is passed (5s timeout, per-sink
  result, exit 1 on failure). Optional `redactPayload` drops the freeform payload.
- `sinks` config section (schema + types); core `buildWebhookBody` / `redactEntry` (pure, tested).

### Changed
- **Honesty re-scope:** the "zero network calls" claim is now "**offline by default**; the opt-in
  `audit sync` webhook is the only outbound path" (CAPABILITY_ASSESSMENT, README, SECURITY).
- Version 2.15.0 → 2.16.0.

## 2.15.0 - 2026-06-07 — Policy-as-code export

### Added
- **`nsb policy export --format rego|cedar`** — compile governance anchors into policy-as-code:
  matcher-faithful **OPA/Rego** (case-insensitive; substring/regex/glob; enforced → `deny`, advisory → `warn`) and **Cedar** (path
  anchors only — Cedar has no content/regex matching; those are emitted as skip comments). `--out`
  writes a file. Positions NBCLI as policy-as-code for agents (OWASP Agentic Top-10: goal hijacking).
- core pure compilers `toRego` / `toCedar`.

### Changed
- Version 2.14.0 → 2.15.0.

### Honesty
- NBCLI emits the policy; the operator validates/runs it (`opa check`, Cedar). The `evaluate_change`
  MCP tool already answers "is this allowed?" at runtime — no separate policy MCP tool was needed.

## 2.14.0 - 2026-06-07 — MCP 2026: agent-facing governance tools

### Added
- **Three new MCP tools** (now 6): `evaluate_change` (the allow/warn/block verdict an agent queries
  **before acting** — policy at the tool-call layer), `list_anchors` (introspect the active policy),
  `audit_query` (filter the run ledger + spend summary).
- **MCP registry manifest** (`packages/mcp-server/server.json`) — registry-ready.
- **Optional bearer-token auth** on the legacy loopback HTTP API (`NSB_HTTP_TOKEN`).

### Changed
- Version 2.13.0 → 2.14.0.

### Deferred (honest)
- The MCP 2026-07-28 **Streamable HTTP transport** and `run_eval`-over-MCP remain forward-looking;
  stdio MCP is canonical. ACP clients (Zed/JetBrains/Codex/Gemini) reach NBCLI via MCP.

## 2.13.0 - 2026-06-07 — Machine-readable surface (`--json`) + exit-code contract + local stats

### Added
- **`--json`** on `check`, `eval`, and `model-route` — pretty-printed JSON on stdout (banner
  suppressed) so AI agents and CI can consume verdicts/scores/recommendations programmatically.
- **`nsb stats`** — local-only metrics over the run ledger (counts by kind, spend); `--json` too.
  This is the resolved telemetry stance: nothing leaves the machine (network telemetry stays deferred).
- **`docs/EXIT_CODES.md`** — the stable exit-code contract (0 allow/pass · 1 block/fail · 2 hook-block).

### Changed
- Version 2.12.0 → 2.13.0.

## 2.12.0 - 2026-06-07 — Adapter round-out (Grok / Aider / Junie) + AGENTS.md hub

### Added
- **Three new instruction-file adapters** (now 11): `grok` (xAI Grok Build reads **AGENTS.md**
  natively — no fabricated GROK.md), `aider` (`CONVENTIONS.md`), `junie` (`.junie/guidelines.md`).
- **`nsb adapters --detect`** — scans the repo for which agent instruction files exist (a
  `grok inspect`-style discovery).
- The writer de-dupes shared targets (codex + grok both → `AGENTS.md` is written once).

### Changed
- `codex` adapter relabeled as the AGENTS.md standard hub (read by 20+ agents incl. Grok).
- Version 2.11.0 → 2.12.0.

## 2.11.0 - 2026-06-07 — Distribution

### Added
- **Reusable GitHub Action** (`action.yml`): add NBCLI governance to any repo's CI in ~3 lines
  (`uses: Navigata1/NBCLI@v2.11.0` with `mode: check|eval`, `profile`, `paths`).
- **Dockerfile** (multi-stage) building the standalone monolith into a tiny `node:22-alpine` image
  with `nsb` as entrypoint; `.dockerignore`.
- **`pnpm sbom`** (`scripts/gen-sbom.mjs`) — deterministic CycloneDX SBOM from the workspace manifests.
- **npm publish-readiness**: `@nsb/cli` `publishConfig` (public + provenance); release workflow emits `--provenance`.
- **Homebrew formula template** (`packaging/homebrew/nbcli.rb`) — ready to fill in on first release.

### Changed
- Version 2.10.0 → 2.11.0.

## 2.10.0 - 2026-06-07 — Audit / observability

### Added
- **`nsb audit`** (`summary` | `verify` | `export`) — report the run ledger (counts by kind, spend,
  integrity), verify the hash chain, or export filtered entries as **JSON/CSV for SIEM** ingestion.
  `--kind` / `--since` filters; `--out` writes a file. Stays offline: NBCLI writes the export; you ship it.
- core `filterEntries` + `toCsv` (pure, unit-tested).

### Changed
- Version 2.9.0 → 2.10.0.

## 2.9.0 - 2026-06-07 — Eval harness

### Added
- **`nsb eval`** — runs the governance engine over labeled fixtures and reports accuracy, block
  precision/recall, and false negatives/positives; exits nonzero on any false negative or below
  `--min-accuracy` (default 1.0). Loads a bundled fixture set + optional project `.mbf/eval/*.json`.
- **`scoreEval`** in `@nsb/core` — pure precision/recall/accuracy scoring (block = positive class).
- A bundled labeled fixture set that doubles as the enforcement behavioral spec (lookalikes like
  `author/`, `.envconfig`, `immigrations/`, bare `token` all expected to NOT block).

### Changed
- Version 2.8.0 → 2.9.0.

## 2.8.0 - 2026-06-07 — Portability moat

### Added
- **Four new instruction-file adapters** compiled from the one `.mbf` source: Windsurf
  (`.windsurf/rules/north-star.md`), Cline (`.clinerules/north-star.md`), Gemini CLI (`GEMINI.md`),
  GitHub Copilot (`.github/copilot-instructions.md`) — joining Claude / Cursor / Codex / SKILL for
  **8 adapters** total.
- **`nsb adapters`** — lists every adapter and its output file. Select any subset with
  `nsb init --tools …` / `nsb update -t …`.

### Changed
- Version 2.7.0 → 2.8.0.

## 2.7.0 - 2026-06-07 — Enforcement

The advisory → **enforced** leap: governance can now deterministically block risky changes.

### Added
- **`nsb check [paths] [--staged] [--hook] [--profile] [--warn-only]`** — runs the risk anchors over
  files or staged changes and **exits nonzero to block** (exit 2 in Claude Code `--hook` mode).
- **`nsb hooks install | uninstall | status`** — installs a real **git pre-commit** hook
  (`nsb check --staged`) and a **Claude Code PreToolUse** hook (`nsb check --hook`), so risky commits
  AND an agent's edits are blocked per the hook profile.
- **`evaluateChange(matches, profile)`** in `@nsb/core` — deterministic block/warn/allow decision
  (strict blocks any anchor; standard blocks security/high-risk; minimal warns). Unit-tested.
- **`pnpm dogfood`** readiness gate (`scripts/dogfood-readiness.mjs`) + `DOGFOOD_READINESS.md` +
  `GOAL_LEDGER.md`.

### Changed
- Hook profiles now **drive enforcement** (the verdict), not just instruction text, once hooks are installed.
- Version 2.6.0 → 2.7.0 (single-sourced + test-enforced).
- Docs (README/SECURITY/CAPABILITY) document enforcement and its scope (local: git + agent harness).

## 2.6.0 - 2026-06-07 — Hardening

### Added
- **Optional HMAC-signed ledger** (`NSB_LEDGER_KEY`): entries become keyed-HMAC + `signed:true`, so
  the chain is **forgery-resistant** (an editor without the key cannot recompute a valid digest).
  `verifyLedger` requires the key for signed entries (reported, never silently OK).
- **Cross-process write lock** on the ledger (O_EXCL) — fixes the concurrent-writer seq race.
- **Per-run budgets**: ledger entries carry a `runId`; `nsb budget --scope run --run <id>` (or
  `$NSB_RUN_ID`) evaluates per-run caps; `nsb budget record --run <id>` tags spend.
- **`nsb worktree`** (create | list | remove) — isolated parallel runs via real `git worktree`.

### Changed
- Version 2.5.0 → 2.6.0 (single-sourced + test-enforced across packages and the MCP server).
- Ledger hash material now includes `runId` (format bump; pre-2.6 ledgers will not verify — see MIGRATION).
- Docs: ledger is now forgery-resistant **when keyed** and lock-protected; per-run caps and worktree
  isolation are now REAL (were ADVISORY/DEFERRED in 2.5.0).

## 2.5.0 - 2026-06-06 — NBCLI (NorthStar Bootstrap CLI edition)

Modernization of the North Star Build CLI for the mid-2026 agentic landscape. Published to
`Navigata1/NBCLI`. Version jumps 0.1.0 → 2.5.0 to align the package version with the "North Star
v2" brand and the v2.5 edition (see [`MIGRATION.md`](./MIGRATION.md)).

### Added
- **SKILL.md generator** + a single generator **registry** shared by `init`/`update` (one source of
  truth → `CLAUDE.md` / `AGENTS.md` / Cursor / `SKILL.md`).
- **Global `--dry-run` readiness preview** (resolved config, tools, MCP/auth, planned writes →
  `ready | warning | blocked`) and a standalone `nsb preview`.
- **Hook profiles** `minimal | standard | strict`, rendered into instructions; env-var disabling.
- New commands: `model-route` (Opus 4.8 orchestration / cheaper subtasks / fast + effort flags —
  a recommender), `budget` (cost caps + hash-chained run ledger (naive-edit-evident, not forgery-resistant)), `skill` (list/add/eval/stocktake),
  `workflow` (bounded parallel sub-agent plan), `home` (dynamic ASCII visual).
- **Real MCP server** (`nsb-mcp`, stdio, `@modelcontextprotocol/sdk`) exposing
  `check_confidence` / `verify_autonomy` / `log_decision`.
- **Tamper-evident run ledger** (hash-chained JSONL) in `@nsb/core`; `log_decision` now persists.
- **Per-run/per-project budgets** + auto-throttle evaluation; **permission model** (allow/deny +
  destructive gates) in the governance schema and profiles.
- **Standalone monolith** build (`build:standalone`) — single file, runs on Node ≥ 22, no node_modules.
- Encoding (mojibake/U+FFFD) + secret **scan** scripts, wired into CI.
- `SECURITY.md`, `CAPABILITY_ASSESSMENT.md`, `BASELINE.md`, `MIGRATION.md`.

### Changed
- Version is now **single-sourced** (`packages/cli/src/version.ts`, test-enforced equal to
  `package.json`) — was hardcoded in three places.
- Profiles and anchor libraries are **embedded as typed constants** (no runtime `__dirname` fs
  lookups) — fixes bundling and the standalone build.
- CI now runs **typecheck + e2e (via built test) + scan**; release adds npm **provenance**.
- Honest naming: the HTTP server is documented as an "HTTP API", not "MCP".

### Fixed
- `tsc` was never actually green (a `gradient-string` v3 type error + `turbo typecheck` lacking a
  build dependency). Both fixed; typecheck is enforced in CI.
- Removed the duplicate `package-lock.json` (pnpm is authoritative).
- Repo identity corrected to `Navigata1/NBCLI` across manifests and docs (was `_2.0` / `_6.0`).

### License
- Project is **MIT** (`LICENSE`). User-facing docs corrected from CC BY-NC-SA; historical
  methodology essays' CC references are superseded by the `LICENSE` file.

## 0.1.0 - 2026-02-03
- Initial monorepo scaffolding
- Core SSAP + anchor engine
- Schema validation package
- CLI with init/validate/update/doctor
- Docs and marketing app skeletons
