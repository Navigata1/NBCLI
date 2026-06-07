# ADR-001: Re-align NBCLI to NBB as its single source of truth

- Status: ACCEPTED (Slice 0 of the NBB re-alignment)
- Date: 2026-06-07
- Owner: NBCLI lead maintainer-engineer (GOAL MODE)

## Context

NBCLI (`@nsb/cli`, "Northstar Boot-strap CLI edition") was forked from the OLD
`NorthStarBuild_2.0` methodology line and evolved in parallel to the now-canonical
NBB (`Navigata1/NBB`, "Northstar Boot-strap edition"). The two drifted:

- NBCLI carries STALE methodology in-repo: `north-star-blueprint/NORTH_STAR_BLUEPRINT_v6.0.md`
  (16,776 lines) + its `0X_PART_*` segments, and `master-build-framework/MASTER_BUILD_FRAMEWORK_v2.0.md`
  (7,865 lines) + MBF segments. These are **v6.0 / v2.0** — an older line.
- NBB is the canonical methodology at **Blueprint v6.5 / MBF v2.5 / Bootstrap (NBB_CORE) v1.5**,
  with machine-checkable doctrine (`HARD_STOPS.md`, `docs/governance/*`, `docs/TOKENOMICS.md` +
  `bootstrap/context-budget.json`, `docs/protocols/*`, `SKILLS_REGISTRY.md`, `scripts/vet_skill.sh`).
- A live scan of NBCLI `main` (`ad28108`, v2.18.0) finds **zero** references to NBB / NBB_CORE / v6.5.

This is the "built off the old North Star" failure: NBCLI enforces a methodology that is no
longer canonical.

## Decision — Option A

**NBB is the single source of truth for METHODOLOGY + GOVERNANCE DOCTRINE. NBCLI is NBB's
executable enforcement + portability compiler.** Two repositories, one doctrine.

- NBB answers HOW/WHAT/NAVIGATE + states the governance doctrine (hard stops, least privilege,
  secrets, tokenomics, prompt-injection, protocols, skills supply chain).
- NBCLI does NOT restate or fork the methodology. It **pins** NBB at a known SHA, **enforces** NBB
  doctrine via its existing engine (anchors -> Cedar/Rego policy, hook profiles, ledger/budget), and
  **emits** NBB's portable bootstrap + the governance layer into target projects (10 harness
  generators from one source).

Rejected alternatives: (B) keep NBCLI's own v2.0 methodology — perpetuates the drift; (C) merge the
two repos / rebuild the engine — discards a real, tested ~6,000-LOC engine (~7,800 with tests) and
conflates two licenses.

## NBB provenance (PINNED — read live, not invented)

| Field | Value |
|-------|-------|
| Repository | `https://github.com/Navigata1/NBB` (public) |
| Default branch | `main` |
| **Pinned commit SHA** | **`282028336df169d73e49a2d3b6a12acc95896399`** |
| Pinned-commit date | 2026-06-07T07:47:40Z (verified via `gh api repos/Navigata1/NBB/commits/main`) |
| Methodology versions at this SHA | Blueprint **v6.5**, MBF **v2.5**, Bootstrap/NBB_CORE single-source (`scripts/build_bootstrap.sh --check`) |

All NBB content used by this re-alignment is read from this exact SHA. Drift is prevented by a
parity verifier wired into the gate (see Slice 1 / `docs/DRIFT_GUARD.md`).

## What is PRESERVED (the engine — no wholesale rewrites)

- `packages/cli/src/commands/policy.ts` — anchor -> Cedar/Rego compilation (`toCedar`, `toRego`).
- `packages/cli/src/commands/budget.ts` + `@nsb/core` — append-only cost ledger
  (`.mbf/ledger/runs.jsonl`, `evaluateBudget`/`verifyLedger`).
- `packages/cli/src/commands/workflow.ts` — bounded sub-agent SPEC emitter ("NBCLI never runs models").
- `packages/cli/src/generators/*` + `instruction-base.ts` — 10 harness generators + `skill-md` (11
  total) from one source.
- `packages/mcp-server` (real MCP), `packages/schema` (config schema), `packages/anchors` (security/
  data/infrastructure/testing).
- The whole v2.x test + `pnpm dogfood` gate machinery.

If a slice ever feels like a wholesale rewrite of one of these, STOP and report — that is a misread.

## What CHANGES

1. **Provenance:** the canonical methodology becomes NBB-pinned (Slice 1), not in-repo v2.0 copies.
2. **Content (dedupe):** the stale v6.0/v2.0 methodology trees are quarantined/removed (Slice 1).
3. **Governance vocabulary:** NBCLI `.mbf` governance is re-expressed as the machine-enforced
   instantiation of NBB doctrine (Slice 2), with back-compat shims.
4. **Outputs:** `nsb init` emits NBB's portable bootstrap + the governance layer, carrying NBB
   doctrine, with NBB's single-source + content-hash `--check` discipline (Slice 3).
5. **New wiring:** ACP IDE integration, unified MCP boundary, protocol + memory-backend scaffolding
   (Slice 4); skills supply-chain parity (Slice 5); self-application (Slice 6); honest assessment +
   drift guard (Slice 7).

## License seam (handle explicitly; not legal advice)

- **NBB methodology content** (and any NBCLI-emitted text derived from it): **CC BY-NC-SA 4.0** —
  NonCommercial + ShareAlike + Attribution to `@NavigatingTruth` / North Star Build.
- **NBCLI engine code** (`packages/**` TypeScript, scripts, CI): **MIT**.
- The boundary is documented in `LICENSE` / `NOTICE` (Slice 1). Generated methodology/bootstrap
  files carry the CC BY-NC-SA notice + attribution; engine code stays MIT.
- **OWNER ACTION (flagged, not resolved here):** confirm the CC BY-NC-SA <-> MIT interaction for a
  distributed tool that *emits* NC-licensed content. This ADR records the structural separation; the
  owner should confirm the licensing posture before any commercial distribution.

## Consequences

- NBCLI stops being a second, diverging source of methodology truth.
- NBB doctrine becomes mechanically enforced + portable via NBCLI, with drift caught by the gate.
- Reviewers get one conceptual model (NBB), one engine (NBCLI), one pinned contract (this ADR + the
  crosswalk + the drift guard).
