# Changelog

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
