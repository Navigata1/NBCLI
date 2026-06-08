# DRIFT_GUARD.md — why NBB ↔ NBCLI drift can't silently recur

NBCLI is NBB's executable enforcement + portability compiler (see `ADR-001-nbb-realignment.md`,
`DOCTRINE_CROSSWALK.md`). The risk that re-alignment exists to kill is **drift**: NBCLI's enforced
doctrine quietly diverging from NBB, or NBCLI's own generated files diverging from its config. Three
layered, offline, deterministic guards close that — all wired into **`pnpm dogfood`**, so a drift
fails the gate and blocks merge.

## Layer 1 — NBB → vendor (pinned SHA)
- `vendor/nbb/` is a PINNED doctrine subset of NBB (`Navigata1/NBB`) at a single commit SHA, recorded
  in `vendor/nbb/MANIFEST.json` (`pinned_sha`) **and** in code (`NBB_PINNED_SHA`, `packages/cli/src/nbb.ts`).
- **`nsb sync --check`** (offline) rehashes every vendored file against the manifest, verifies the
  manifest's `pinned_sha` equals the code constant, and flags missing/untracked files. Any mismatch → exit 1.
- Gate step: `nbb-sync`.
- **To intentionally move to a newer NBB:** run `nsb sync` (clones NBB, checks out the pinned SHA,
  re-copies the manifest set, regenerates `MANIFEST.json`), then bump `NBB_PINNED_SHA` in `nbb.ts` to
  match. This is the ONLY supported way the doctrine changes — never hand-edit `vendor/nbb/`.

## Layer 2 — config → generated files (content-hash)
- Every file NBCLI generates carries a content-hash stamp: `<!-- nbcli-generated sha256:… -->`.
- **`nsb update --check`** regenerates from `.mbf` + verifies each on-disk file is (a) unedited
  (stamp matches its body) and (b) in sync with the current config/anchors. Drift → exit 1.
- Gate step: `self-portability` (NBCLI runs this on its OWN committed `CLAUDE.md`/`AGENTS.md`/etc.).

## Layer 3 — the doctrine is enforced, not just vendored
- NBB HARD STOPS compile to enforced `hard_stops` anchors (`nsb check`/hooks/eval block destructive
  commands); the NBB safety floor is emitted into every generated instruction file from one source
  (`instruction-base.ts`); external skills must pass `nsb skill vet` (default-deny). So the vendored
  doctrine is not inert text — it is the behavior the gate tests (`pnpm dogfood` → `test`).

## The gate
```
pnpm dogfood
  build → nbb-sync → self-portability → typecheck → lint → test → scan
```
All three layers run every gate. A PR may not modify the gate it merges under without human review.

## Honest boundary
These guards prove **internal consistency** (vendor == pinned NBB; generated == config; doctrine ==
enforced behavior). They do **not** prove NBCLI's interpretation of NBB is the one NBB's authors
intend — that stays a human review against `Navigata1/NBB`. NBCLI compiles + enforces the methodology;
it does not author it (methodology text is CC BY-NC-SA; see `NOTICE`).
