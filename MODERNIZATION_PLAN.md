# MODERNIZATION_PLAN — NBCLI (Northstar Boot-strap CLI edition)

Living plan/log for `modernize/nbcli-bootstrap-edition-v2-5`. Companion to
`BASELINE.md` (current-state) and `CAPABILITY_ASSESSMENT.md` (real vs deferred).

## Decisions (locked with the owner)

- **Destination:** `Navigata1/NBCLI`, **public**, description "Northstar Boot-strap CLI edition".
- **Version line:** `2.5.0` — single-sourced in `packages/cli/src/version.ts`, enforced equal to
  `package.json` by a test. Documented jump from `0.1.0` in CHANGELOG + migration notes.
- **Depth (real + tested):** CLI core, Governance & security, Real MCP adapter, Routing & tokenomics.
- **Showpiece:** dynamic ASCII home visual for the CLI.
- **Prime directive:** zero vaporware. Ship only what is real and tested; label every scaffold/deferral.

## Work breakdown & status

Legend: [x] done · [~] in progress · [ ] todo · (DEFER) honest scaffold, documented as not-yet-real.

### Foundations / truth-fixes
- [x] Remove dual `package-lock.json` (pnpm authoritative).
- [x] Fix `theme.ts` `gradient-string` v3 type error (unblocks `tsc`).
- [x] `turbo.json` typecheck `dependsOn: ^build` (workspace types resolve).
- [x] Single-source version (`version.ts`) + bump all packages to `2.5.0`.
- [ ] CI: add `typecheck` + e2e + encoding/secret scan jobs.

### BATCH 1/2 — CLI core
- [x] Extend core types: `HookProfile`, `HooksConfig`, `BudgetConfig`, `PermissionConfig`, `RoutingConfig`.
- [x] Extend `mbf-governance.schema.json` with hooks/budgets/permissions/routing (optional).
- [x] Richer `instruction-base.ts` (hooks/autonomy/budgets/permissions) — keeps "Thresholds"/"Anchors loaded".
- [x] `skill-md.ts` generator + generator **registry** (kills init/update duplication).
- [x] Dry-run-aware `files.ts` (setDryRun/getPlannedWrites).
- [~] Refactor `init`/`update` onto the registry; add `skill` tool + default.
- [ ] Global `--dry-run` readiness preview (resolved config/tools/MCP/auth → ready|warning|blocked).
- [ ] Hook profiles surfaced in profile templates + `validate`/`doctor` awareness.
- [ ] `nsb skill` subcommands (list/add/eval/stocktake).

### BATCH 4 — Governance & security
- [ ] Real append-only run ledger (hash-chained JSONL); replace echo-only `log-decision`.
- [ ] Cost-cap config + `nsb budget` reporting + auto-throttle gate.
- [ ] Permission model rendered + least-privilege allowlist emit; "when NOT to skip permissions".
- [ ] 1Password `op://` reference + `op run --` pattern; security anchors for secrets.
- [ ] Encoding/mojibake + secret scan scripts.

### BATCH 1 — Real MCP adapter
- [ ] Add `@modelcontextprotocol/sdk`; real stdio MCP server wrapping the 3 tool fns.
- [ ] Rename the HTTP server honestly ("HTTP API"); keep both transports.
- [ ] Tests for mcp-server (currently zero).

### BATCH 1/3 — Routing & tokenomics commands
- [ ] `nsb model-route` (Opus 4.8 orchestration + cheap subtasks + fast/effort flags) — recommender.
- [ ] `nsb workflow` bounded parallel sub-agent **plan** (typed IO, caps, adversarial verify). (DEFER executor)
- [ ] `nsb budget` token/cost budgets + batch reporting.

### Showpiece
- [ ] Dynamic ASCII home visual (`nsb` no-arg + `nsb home`); TTY-aware + reduced-motion fallback.

### BATCH 5 — Distribution / verification / docs
- [ ] tsup `noExternal` → truly standalone `dist/cli.js`; verify outside monorepo.
- [ ] README/README_REPO/QUICK_START/CHANGELOG/migration/schema docs/CAPABILITY_ASSESSMENT.
- [ ] Fix license docs → MIT; repo identity → NBCLI; soften mandatory data-submission clause.
- [ ] Adversarial multi-agent review before push; final gates; push to NBCLI; open PR.

### Honest deferrals (scaffold + document, NOT claimed real)
- ACP-native IDE handshake runtime; Docker isolation backend; compression proxy; telemetry uploader;
  install-on-demand plugins (Understand-Anything / Headroom); workflow executor.
