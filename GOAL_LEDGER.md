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

## v2 run (v2.12 → v2.18) — COMPLETE
Balanced sequencing; each slice gated + auto-merged. Decisions: network telemetry stays deferred
(local `nsb stats` only); ACP reached via MCP (ACP-native deferred); signing via minisign/age (offline).
- **v2.13 — Machine-readable surface** (PR #9, shipped): `--json` on check/eval/model-route +
  `docs/EXIT_CODES.md` + local `nsb stats` (no network).
- **v2.14 — MCP 2026** (PR #10, shipped): MCP tools `evaluate_change`/`list_anchors`/`audit_query`;
  registry manifest (`server.json`); legacy HTTP optional bearer-token (`NSB_HTTP_TOKEN`). Streamable
  HTTP transport + run_eval-over-MCP remain forward-looking (stdio canonical; ACP reached via MCP).
- **v2.15 — Policy-as-code** (PR #11, shipped): `nsb policy export --format rego|cedar` (Rego full;
  Cedar path-only). The `evaluate_change` MCP tool already answers "is this allowed?" at runtime.
- **v2.16 — Opt-in sinks** (PR #12, shipped): `sinks` config + `nsb audit sync --webhook` (OFF by
  default; payload redaction). Offline claim re-scoped honestly to "offline by default".
- **v2.17 — Sandbox/isolation** (PR #13, shipped): `nsb sandbox run` (Docker, network-off by default,
  `--print` needs no Docker) + `nsb workflow validate`. The workflow executor stays deferred (harness runs models).
- **v2.18 — Supply-chain trust + plugins** (PR #14, shipped): Ed25519 `nsb sign` / `nsb verify`
  (offline) + local signature-verified `nsb plugin`. Signing is Ed25519 detached (not the minisign
  on-disk format); plugin network/registry install stays deferred (offline-first).

## Still deferred (honest, documented)
ACP-native handshake runtime (reached via MCP) · network telemetry/compression (rejected; local stats only) ·
workflow **executor** (NBCLI emits + validates the plan; the harness runs models).

## NBB Re-alignment run (Slices 0-7) — IN PROGRESS
Repoint + unify + dedupe so **NBB** (`Navigata1/NBB`, pinned `282028336df169d73e49a2d3b6a12acc95896399`,
Blueprint v6.5 / MBF v2.5) is NBCLI's single source of truth; NBCLI becomes NBB's executable
enforcement + portability compiler. **Preserve the engine** (ADR-001). Each slice rides `pnpm dogfood`.
- **Slice 0 — Decision record + doctrine ingest** *(this slice)*: `docs/ADR-001-nbb-realignment.md`
  (Option A, pinned SHA, license seam) + `docs/DOCTRINE_CROSSWALK.md` (NBB concept -> NBCLI mechanism).
- **Slice 1 — Canonical sync + dedupe (G1+G2)** (PR #16, shipped): pinned `vendor/nbb/` + `nsb sync --check` in the gate;
  quarantine/remove the stale v6.0/v2.0 methodology trees; LICENSE/NOTICE seam (CC BY-NC-SA <-> MIT).
- **Slice 2 — Governance unification (G3):** crosswalk made real — HARD_STOPS/blast-radius -> anchors+
  policy; deny-all + denylist -> hook profiles; `op://`/RAK -> generators+scan; tokenomics -> budget;
  prompt-injection posture; `.mbf` vocabulary aliased to NBB doctrine (back-compat shims).
- **Slice 3 — Portability output:** `nsb init` emits NBB bootstrap trio + governance layer with
  content-hash `--check`; all 10 generators carry NBB doctrine (update `generators.test.ts`).
- **Slice 4 — Protocols + memory:** ACP-native `adapters.ts`; unified MCP boundary; A2A/AG-UI/A2UI
  scaffolding + swappable memory-backend config (honest runtime-vs-emitted labels).
- **Slice 5 — Skills supply-chain parity:** `skill.ts` -> NBB `vet_skill.sh` default-deny gate;
  emit/reference NBB skill set + `SKILLS_REGISTRY.md`; carry UNPINNED honesty markers.
- **Slice 6 — Dogfood self-application (G4):** run NBCLI generators on its own config -> root
  AGENTS.md/CLAUDE.md/SKILL.md + `.claude/`.
- **Slice 7 — Distribution + honest assessment:** version bump (see flag), CHANGELOG + MIGRATION,
  `CAPABILITY_ASSESSMENT.md` refresh, `docs/DRIFT_GUARD.md`.

**VERSION-LINE FLAG (accuracy):** the brief says "keep the 2.5.x line / version to 2.5.x", but the
LIVE NBCLI CLI is **2.18.0** (14 shipped PRs). Going to 2.5.x would be a backward npm/semver jump and
break the single-source version test — not viable. NBCLI's CLI version (2.x, forward) is INDEPENDENT of
NBB's methodology version (v6.5/v2.5, pinned + enforced). Default: continue the CLI line FORWARD
(re-alignment slices = v2.19.0 -> v2.26.0), documenting the NBB brand alignment in CHANGELOG/MIGRATION.
Owner can override at any slice boundary.

## Owner-controlled
The release tag + npm publish (then the GitHub Action / Homebrew / `npm i -g` install paths go live).

## Principles
Zero over-claiming · every shipped capability real + tested · honest DEFERRED labels · least privilege.
