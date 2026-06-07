# GOAL_LEDGER — NBCLI: basic governance CLI → world-class governance platform

Autonomous roadmap. Each slice is one gated PR (see `DOGFOOD_READINESS.md`); on PASS it auto-merges
and the next slice begins. The release tag / npm publish stays owner-controlled.

## Done
- **v2.5.0** (PR #1, merged) — modernization: registry+SKILL.md, dry-run preview, hook profiles,
  model-route/budget/skill/workflow/home/preview, real MCP, run ledger, standalone monolith, MIT, CI.
- **v2.6.0** (PR #2, merged) — hardening: keyed/locked ledger, per-run budgets, worktree isolation.

- **v2.7.0** (PR #3, merged) — enforcement: `nsb check` + `nsb hooks` (git pre-commit + Claude
  PreToolUse) that deterministically block risky changes; precise enforce-flagged anchors; fail-closed.
- **v2.8.0** (PR #4, merged) — portability moat: 8 instruction-file adapters (Claude/Cursor/Codex/
  SKILL/Windsurf/Cline/Gemini/Copilot) + `nsb adapters`.
- **v2.9.0** (PR #5, merged) — eval harness: `nsb eval` scores the governance engine on labeled
  fixtures (accuracy/precision/recall, fail on false negatives); `scoreEval` in core.
- **v2.10.0** (PR #6) — audit/observability: `nsb audit` report/verify/export (JSON/CSV for SIEM,
  offline); core `filterEntries`/`toCsv`.

- **v2.11.0** (PR #7, merged) — distribution: reusable GitHub Action (`action.yml`), Dockerfile
  (standalone monolith image), `pnpm sbom` (CycloneDX), npm `publishConfig` (+provenance), Homebrew template.
- **v2.12.0** (PR #8) — adapter round-out: Grok/Aider/Junie adapters (11 total) + `nsb adapters --detect`;
  AGENTS.md positioned as the standard hub; writer de-dupes shared targets.

## v2 run (v2.12 → v2.18) — in progress
Balanced sequencing; each slice gated + auto-merged. Decisions: network telemetry stays deferred
(local `nsb stats` only); ACP reached via MCP (ACP-native deferred); signing via minisign/age (offline).
- **v2.13 — Machine-readable surface**: `--json` on all commands + `docs/EXIT_CODES.md` + local `nsb stats`.
- **v2.14 — MCP 2026**: new MCP tools (evaluate_change/run_eval/audit_query/list_anchors); Streamable
  HTTP + authenticated surface (replaces legacy unauth loopback HTTP); registry readiness.
- **v2.15 — Policy-as-code**: `nsb policy export --format rego|cedar` + a `policy` MCP tool.
- **v2.16 — Opt-in sinks**: `sinks` config + `nsb audit sync` webhook (OFF by default; offline-by-default re-claim).
- **v2.17 — Sandbox/isolation**: `nsb worktree --backend docker` + `nsb workflow validate` / reference runner.
- **v2.18 — Supply-chain trust + plugins**: minisign signing (`audit export --sign`, `nsb verify`) + signed `nsb plugin`.

## Still deferred (honest, documented)
ACP-native handshake runtime (reached via MCP) · network telemetry/compression (rejected; local stats only) ·
workflow **executor** (NBCLI emits the plan + a reference runner; the harness runs models).

## Owner-controlled
The release tag + npm publish (then the GitHub Action / Homebrew / `npm i -g` install paths go live).

## Principles
Zero over-claiming · every shipped capability real + tested · honest DEFERRED labels · least privilege.
