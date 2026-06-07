# Dogfood Readiness — the auto-merge gate

Every NBCLI PR is gated by this assessment. **A PR is mergeable only when ALL of the following
hold.** When they do, the change auto-merges and work continues to the next slice; otherwise the
findings are fixed first.

## Mechanical gate — `pnpm dogfood` (must be PASS)

Runs and requires green:

1. `pnpm build`
2. `pnpm typecheck`
3. `pnpm lint`
4. `pnpm test`
5. `pnpm scan` (encoding/mojibake + secrets)

```bash
pnpm dogfood   # prints PASS/FAIL per step + an overall verdict; exit 1 on any failure
```

## Judgment gate (must also hold)

6. **Behavioral test for every new capability** — no untested new feature ships.
7. **Live smoke** — the new capability is exercised end-to-end (e.g. run the built CLI).
8. **Adversarial review** — a bounded multi-lens review with **zero unresolved Critical/High**
   findings (any are fixed before merge).
9. **Accuracy** — `CAPABILITY_ASSESSMENT.md` updated; nothing marked ✅ REAL that isn't tested;
   honest labels for ADVISORY/DEFERRED. The project's prime directive is **zero over-claiming**.
10. **Clean tree** — `git status` clean, `git diff --check` clean, version single-sourced.

## On PASS

Auto-merge the PR to `main` and proceed to the next roadmap slice (see `GOAL_LEDGER.md`). The
release **tag/npm publish remains owner-controlled** — automation never publishes.
