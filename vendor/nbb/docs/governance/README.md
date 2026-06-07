# Governance Layer

> Governance is co-equal with power. An agent that can build and deploy must also
> be budgeted, logged, and gated. This layer is in the "Paperclip" mold: hard cost
> caps, an immutable action log, and explicit human-in-the-loop (HITL)
> checkpoints. ASCII-only (mojibake-safe).
>
> Companion docs: `PERMISSIONS_AND_SANDBOXING.md`, `SECRETS.md`, `LOCAL_FIRST.md`.
> Root `SECURITY.md` and Blueprint Part X carry the application-security depth.

---

## 1. Cost caps + auto-throttle

Set caps per RUN and per PHASE; the agent throttles or stops when a cap is hit,
rather than discovering the bill afterward.

```yaml
# .northstar/governance.yaml  (example - tune to the project)
cost:
  currency: USD
  per_run_cap: 25.00        # hard stop for one autonomous run
  per_phase_cap: 8.00       # stop a phase, report, await go-ahead
  warn_at_pct: 70           # emit a warning at 70% of a cap
  on_cap: stop_and_report   # stop_and_report | throttle | continue(never default)
tokens:
  per_run_cap: 2_000_000
  context_high_water_pct: 70   # compress/split before exceeding this
```

Rules:
- **Caps are hard ceilings, not advisories.** At a cap: stop, report spend, await.
- **Warn at 70%** so a cap is never a surprise.
- **Batch-boundary reporting** (see `docs/TOKENOMICS.md` S5) makes spend visible
  continuously - report cost at every boundary.
- This mirrors the lived discipline of this very build: a cost guardrail fired
  mid-mission and execution PAUSED for a human decision. That is the pattern.

## 2. Immutable action / decision log

Every consequential action and decision is appended to an immutable log -
append-only, never edited, never deleted. It is the audit trail and the
reproducibility record.

```jsonl
# .northstar/action-log.jsonl  (append-only; one JSON object per line)
{"ts":"2026-06-07T14:02:11Z","actor":"agent:claude","action":"edit","target":"src/auth.ts","blast_radius":2,"approval":"auto","reason":"add rate limit"}
{"ts":"2026-06-07T14:05:40Z","actor":"agent:claude","action":"deploy","target":"staging","blast_radius":3,"approval":"human:jon","reason":"ship slice 4"}
```

Fields: `ts` (ISO-8601 UTC), `actor`, `action`, `target`, `blast_radius` (1-5),
`approval` (`auto` | `human:<who>`), `reason`. Rules: append-only (chmod/ACL or
a hash chain if tamper-evidence is required); record the `approval` source for
every Tier 3+ action; never log secrets (log `op://` references, never values).

## 3. Human-in-the-loop (HITL) checkpoints

HITL is mandatory at these gates (ties to the safety floor + autonomy caps):

| Gate | Why | Min approval |
|------|-----|--------------|
| Blast radius Tier 3+ (service/destructive) | irreversible-ish | human, logged |
| Production deploy | user impact | human, logged |
| Security/auth change | trust boundary | human review |
| Financial/payment code | money | human, restricted keys |
| Spend cap reached | budget | human go-ahead |
| Schema/data migration | data risk | human, backup verified |

Autonomy caps (from the safety floor): security max L4, DB migration max L3, prod
deploy max L3, financial max L2. At LOW/UNCERTAIN confidence, pause and ask.

## 4. How the pieces compose

```
request -> budget check (caps) -> blast-radius classify -> [HITL gate if Tier 3+]
        -> act -> append to action-log -> report at batch boundary
```

If any step lacks its control (no cap set, no log, no gate for a Tier 3+ action),
that is a governance defect - fix it before proceeding, do not "just this once".

## When NOT to over-apply
- A throwaway local spike with no external effect does not need the full apparatus
  - but it still must not touch Tier 4/5 actions or real secrets.
- Do not let governance theater replace real controls: a log nobody can read, or a
  cap set absurdly high, is worse than honest "ungoverned, do not run autonomously".

## Portability
All three controls are plain files (`governance.yaml`, `action-log.jsonl`) + a
discipline - portable to any harness or CI. Claude Code enforces permissions via
`.claude/settings.json` (see `PERMISSIONS_AND_SANDBOXING.md`); other harnesses use
their own permission mechanism plus this file-based budget + log.
