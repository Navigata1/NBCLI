# Changelog

## 2.27.0 - 2026-06-07 — Conformance audit fix 2/3: brief-required features (implement, not strike)

The audit flagged three brief-required capabilities as "implement-or-strike". Implemented all three.

### Added
- **`permissions.deny` / `destructive_gates` are now ENFORCED.** `nsb check` compiles user-declared
  permission patterns (`Tool(glob)` unwrapped; globs → regex) into enforced anchors, so the operator's
  own denials actually BLOCK — not just render as instruction prose. (Closes BATCH 4: "permission
  model with allow/reject + destructive-op gates.")
- **`NSB_DISABLE_HOOKS=1`** — the brief-required env-var hook disable. Honored in the `nsb check --hook`
  path only (PreToolUse/pre-commit); prints a loud stderr warning and allows. Manual `nsb check` is
  unaffected. Documented escape hatch.
- **`nsb budget --since <seq>`** — batch-boundary reporting: spend delta (USD/tokens/entries) recorded
  after a marked ledger seq (`budget record` returns the seq). `summarizeSpend` gained a `sinceSeq` filter.

### Changed
- +5 tests (280 total): permission-deny enforcement e2e (incl. sibling-dir/content over-block
  regressions), NSB_DISABLE_HOOKS e2e, batch-delta e2e + core `summarizeSpend` sinceSeq unit.
- Permission denials compile ReDoS-safe (runs of `*` collapsed) and over-block-safe (path-style →
  anchored PATH match, not unanchored content substring) — hardened in adversarial review.
- Version 2.26.0 → 2.27.0.

## 2.26.0 - 2026-06-07 — Conformance audit fix 1/3: egress SSRF guard

Independent BATCH 0–5 conformance audit found one finding with real security weight: `nsb audit sync`
(the only outbound path) fetched the sink URL with no validation, and `SECURITY.md` wrongly claimed
"NBCLI fetches nothing."

### Added / Fixed
- **`validateEgressUrl`** (core): https-only by default, blocks loopback/private/link-local/cloud-metadata
  hosts (SSRF guard), optional `sinks.allowlist`. Wired into `nsb audit sync` before every POST —
  refuses + exits 1 on a blocked target. (Host+scheme guard, not DNS-rebind-proof; documented honestly.)
- Per-sink opt-ins for legit local collectors: `allowInsecure` (http) + `allowPrivate` (loopback/private),
  via config (`sinks.webhooks[]`) or the new `audit sync --allow-insecure` / `--allow-private` flags.
- Hardened against IPv4-mapped IPv6 literals (`::ffff:127.0.0.1` / `::ffff:7f00:1` decode + re-check),
  CGNAT `100.64.0.0/10`, and the full `fe80::/10` link-local range (caught in adversarial review).
- `SECURITY.md` corrected to describe the egress guard (no more "fetches nothing").
- +10 tests (275 total): egress matrix incl. mapped-IPv6/CGNAT bypass regressions (core) + audit-sync
  guard e2e (incl. an https host-guard case).

### Changed
- Version 2.25.0 → 2.26.0.

### Added
- **`docs/DRIFT_GUARD.md`** — the 3 layered, offline, deterministic guards that keep NBB ↔ NBCLI in
  sync (pinned-SHA `nsb sync --check`; content-hash `nsb update --check` / `self-portability`;
  doctrine-is-enforced), all wired into `pnpm dogfood`, plus how to move the pinned NBB SHA.

### Changed
- **`CAPABILITY_ASSESSMENT.md` refreshed** to v2.25.0 with a "BATCH 6 — NBB re-alignment" section
  (REAL capabilities vs the honest DEFERRED list) — zero over-claim.
- Version 2.24.0 → 2.25.0. **NBB re-alignment run COMPLETE** (Slices 0–7, PRs #15–22): NBCLI is now
  NBB's executable enforcement + portability compiler, with the engine preserved (ADR-001).

## 2.24.0 - 2026-06-07 — NBB re-alignment Slice 6: dogfood self-application (G4)

### Added
- **NBCLI now eats its own dog food:** ran its generators on its own `.mbf` config to produce the
  repo's root `CLAUDE.md` / `AGENTS.md` / `.cursor/rules/mbf.mdc` / `.claude/skills/north-star/SKILL.md`
  (carrying the NBB bootstrap + doctrine + content-hash stamps).
- **`update --check` wired into `pnpm dogfood`** as the `self-portability` step: NBCLI's own generated
  agent files must stay in sync + unedited every gate — a live integration test of the generators
  against NBB doctrine.

### Changed
- Version 2.23.0 → 2.24.0. Closes **G4** (the self-portability gap).

## 2.23.0 - 2026-06-07 — NBB re-alignment Slice 5: skills supply-chain parity

### Added
- **`nsb skill vet [file]`** — ports NBB's `vet_skill.sh` default-deny gate to a pure `vetSkill()`:
  scans for pipe-to-shell, reverse shells, fork bombs, credential reads, prompt-injection, exfil,
  destructive `rm`, and the `--dangerously-skip-permissions` flag. Verdict PASS/WARN/FAIL → exit
  0/2/1 (mirrors `vet_skill.sh`). FAIL blocks; WARN → manual review (security-education is never
  silently passed). `skill stocktake` now shows a vet verdict per skill.
- `skill list` references the canonical skill set + UNPINNED honesty markers (`vendor/nbb/SKILLS_REGISTRY.md`).

### Changed
- Refinement vs the bash source (more accurate): the bare word "skip-permissions" is WARN (review)
  while the actual `--dangerously-skip-permissions` flag is FAIL — so forbidding/governance prose
  isn't false-FAILed (NBCLI's own generated SKILL now vets WARN, not FAIL).
- Version 2.22.0 → 2.23.0.

## 2.22.0 - 2026-06-07 — NBB re-alignment Slice 4: protocols + memory

### Added
- **`nsb protocols emit`** → `.mbf/integrations/`: `mcp.json` (wires `nsb-mcp` into any MCP/ACP host),
  `memory-backend.json` (swappable Working/Episodic/Semantic/Procedural interface, local-json default),
  `PROTOCOLS.md` (MCP/ACP/A2A/AG-UI/A2UI guidance).
- **ACP via MCP** (owner decision): ACP/IDE hosts (Zed/JetBrains/Kimi) reach NBCLI governance through
  its MCP server; NBCLI is a tool/governance provider, not a model-running agent.

### Changed
- Version 2.21.0 → 2.22.0. **Version-line flag RESOLVED** (owner): the CLI line continues forward,
  independent of NBB's methodology version (v6.5/v2.5, pinned + enforced).

### Honest boundaries
- A2A / AG-UI / A2UI are **emitted guidance**, not runtimes (labeled in `PROTOCOLS.md` + the crosswalk).

## 2.21.0 - 2026-06-07 — NBB re-alignment Slice 3: portability output

### Added
- **`nsb init` now emits NBB's portable bootstrap** into every generated harness file: the ignition
  sequence (start-here, tier, vertical slice, reference-on-demand, clean exit) + load discipline
  (Tier 1/2/3, never co-resident, lazy-load mandatory) — on top of the Slice 2 safety floor.
- **Content-hash discipline:** every generated file is stamped `<!-- nbcli-generated sha256:... -->`;
  **`nsb update --check`** fails (exit 1) on a hand-edit (stamp mismatch) OR drift from the config —
  mirrors NBB's `build_bootstrap.sh --check` single-source discipline.

### Changed
- All 11 generators carry the unified NBB bootstrap + doctrine from the single `instruction-base` source.
- Version 2.20.0 → 2.21.0.

### Deferred (honest)
- Generated `.claude/settings.json` deny-list (init output) remains pending — it overlaps the
  `nsb hooks` settings writer; the denylist is already EMITTED as guidance + enforced via `nsb hooks install`.

## 2.20.0 - 2026-06-07 — NBB re-alignment Slice 2: governance unification (G3)

### Added
- **NBB HARD STOPS enforced** — a `hard_stops` anchor category compiles NBB `HARD_STOPS.md` Tier 5/4
  to enforced content anchors: `terraform`/`pulumi destroy`, `DROP DATABASE` / `SCHEMA ... CASCADE`,
  `rm -rf /`, force-reset, `git push --force` / `git clean -fdx` now **BLOCK** (precise command-shaped
  regexes; `terraform plan` / `git push` / `rm -rf ./build` are NOT hard-stopped).
- **NBB safety floor emitted into every generated instruction file** (`instruction-base.ts`): hard
  stops + override protocol (STOP/EXPLAIN/PRESENT/WAIT/VERIFY), blast-radius tiers 1-5, autonomy caps
  (security L4 / DB L3 / deploy L3 / financial L2), `op://` + `op run --` secrets + Stripe RAKs,
  prompt-injection refusal, load discipline.
- 4 hard-stop eval fixtures (`nsb eval` now 21 fixtures @ 100% / 0 false negatives) + anchor-precision
  + instruction-doctrine unit tests.

### Changed
- Governance is now the machine-enforced instantiation of NBB doctrine (DOCTRINE_CROSSWALK G3 rows REAL).
- Version 2.19.0 -> 2.20.0.

### Deferred (honest)
- Generated `.claude/settings.json` deny-list -> Slice 3 (init output). `.mbf` vocabulary aliasing
  deferred (low-value / risky rename; back-compat preserved).

## 2.19.0 - 2026-06-07 — NBB re-alignment Slice 1: canonical sync + dedupe

### Added
- **`nsb sync` / `nsb sync --check`** — NBB (`Navigata1/NBB`) is the single source of truth.
  `vendor/nbb/` holds a PINNED doctrine subset of NBB @ `2820283…` with a `MANIFEST.json` (per-file
  sha256 + pinned SHA). `--check` (offline) fails on any drift and is wired into `pnpm dogfood`, so
  NBB<->NBCLI drift can never silently recur. Bare `nsb sync` refreshes vendor/nbb from NBB@pinned_sha
  (git + network; maintainer op).
- `vendor/nbb/` — 13 doctrine files (NBB_CORE, HARD_STOPS, governance, TOKENOMICS + context-budget,
  protocols, SKILLS_REGISTRY, vet_skill) + `vendor/nbb/LICENSE` (CC BY-NC-SA) + README.

### Changed
- **DEDUPE:** stale legacy methodology (Blueprint v6.0, MBF v2.0) moved to `superseded/`; canonical
  methodology is now NBB v6.5 / v2.5. Doc pointers repointed to NBB / `vendor/nbb/`.
- **License seam:** root `NOTICE` + a `LICENSE` header document MIT (engine) vs CC BY-NC-SA (NBB
  methodology in `vendor/nbb/`, `superseded/`, and emitted text). Owner-confirm flag retained.
- Version 2.18.0 → 2.19.0 (see MIGRATION; CLI line is independent of NBB methodology v6.5/v2.5).

## 2.18.0 - 2026-06-07 — Supply-chain trust + plugins (capstone)

### Added
- **`nsb sign keygen | file` + `nsb verify`** — Ed25519 detached signing of artifacts (SBOM, audit
  exports, any file) via Node crypto; fully offline. Tamper or wrong key → `verify` exits 1. core
  `generateKeypair` / `signContent` / `verifyContent` (pure, unit-tested).
- **`nsb plugin list | install | remove`** — local, signature-verified plugins under `.mbf/plugins`;
  `install --pub` verifies the plugin's **whole-tree** Ed25519 signature (`nsb plugin sign`) and refuses on mismatch; plugin names are path-traversal-sanitized.

### Changed
- Version 2.17.0 → 2.18.0. Completes the v2.12 → v2.18 run.

### Honesty
- Signatures are base64 **Ed25519 detached** blobs (the same primitive minisign uses), NOT the
  minisign on-disk format — interop is via `nsb verify`. Plugin **network/registry** install stays
  deferred (offline-first); local signed install is real.

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
