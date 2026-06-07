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

- **v2.11.0** (PR #7) — distribution: reusable GitHub Action (`action.yml`), Dockerfile (standalone
  monolith image), `pnpm sbom` (CycloneDX), npm `publishConfig` (+provenance), Homebrew formula template.

## Roadmap complete
The planned v2.5 → v2.11 arc is delivered (7 gated, auto-merged PRs). Remaining items are owner-directed:
- **Deferred (honest, documented)**: ACP handshake runtime, Docker isolation backend, compression
  proxy, telemetry uploader, install-on-demand plugins, workflow executor.
- **Owner-controlled**: the release tag + npm publish (then the GitHub Action / Homebrew / `npm i -g`
  install paths go live).

## Principles
Zero over-claiming · every shipped capability real + tested · honest DEFERRED labels · least privilege.
