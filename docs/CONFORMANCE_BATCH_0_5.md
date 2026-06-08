# CONFORMANCE — NBCLI vs the original BATCH 0–5 mission brief

This records an independent, evidence-based audit of NBCLI against the original mission brief (BATCH 0–5)
and the remediation that followed. The audit was run as a 6-auditor fan-out (one per batch) + synthesis,
each cross-checking brief items against the actual code with `file:line` evidence.

**Verdict:** NBCLI is **substantively conformant** to the brief and unusually honest about its own
boundaries (code, docs, and self-assessment consistently separate REAL / ADVISORY / DEFERRED, backed by
the test suite + dogfood gate). The audit found two patterns of defect — a handful of doc-vs-code
over-claims, and a skills-layer doc/disk drift — plus one finding with genuine security weight (egress
URL validation). All security-weight and brief-required-feature items have been remediated.

## Remediation (v2.26 → v2.28, PRs #24–#26)

| # | Finding (audit) | Severity | Status | Where fixed |
|---|---|---|---|---|
| 1 | `nsb audit sync` fetched with no validation; SECURITY.md claimed "fetches nothing" | HIGH (security) | ✅ FIXED | `validateEgressUrl` (https-only, blocks loopback/private/link-local/metadata + IPv4-mapped-IPv6/CGNAT; allowlist; opt-ins) + SECURITY.md — v2.26 |
| 5 | `permissions.deny`/`destructive_gates` rendered to prose but not enforced | MEDIUM | ✅ FIXED | `check.ts` compiles them to enforced anchors (anchored PATH for path-style, CONTENT for command-style; ReDoS-safe) — v2.27 |
| 4 | "env-var hook disabling" claimed, unimplemented | MEDIUM | ✅ FIXED | `NSB_DISABLE_HOOKS=1` honored in `check --hook` only — v2.27 |
| 3 | Batch-boundary reporting claimed, not implemented | MEDIUM | ✅ FIXED | `nsb budget --since <seq>` + `summarizeSpend` `sinceSeq` — v2.27 |
| 8 | The one shipped skill didn't meet the registry standard (no "When NOT to use" / license) | MEDIUM | ✅ FIXED | `skill-md.ts` emits a `license` field + "When NOT to use" — v2.28 |
| 2 / 18 | SKILLS_REGISTRY advertises a 12-skill inventory + pack pipeline not on disk | HIGH / LOW | ✅ CLARIFIED | `nsb skill` output + this doc: NBCLI bundles only the generated north-star skill; `vendor/nbb/SKILLS_REGISTRY.md` is NBB's catalog (source-map, pinned), not a bundled inventory — v2.28 |
| 15 | `instruction-base` "measured" over-attributed tokenomics to NBCLI | LOW | ✅ FIXED | "measured **by NBB**" — v2.28 |
| 16 | README Action pin stale (`@v2.11.0`) | LOW | ✅ FIXED | bumped + "not yet published" note — v2.28 |

## Honest, by-design boundaries (DEFERRED — not faked)
- A2A / AG-UI / A2UI **runtimes** (NBCLI emits guidance); ACP **runtime** (reached via MCP).
- Network compression proxy; network telemetry uploader (local `nsb stats` only).
- Network/registry plugin install (offline signature-verified `nsb plugin` is REAL).
- Workflow **executor** (NBCLI emits + validates the plan; the harness runs models).
- Install-on-demand Understand-Anything / Headroom plugins; local-inference engine.
- Generated `.claude/settings.json` deny-list; `.mbf` vocabulary aliasing.
- `nsb stats` totals reflect **operator-recorded** spend (budget records), not CLI-measured consumption.
- The egress guard is a **host+scheme** guard, not DNS-resolution/rebind-proof (documented in SECURITY.md).

## Remaining low-severity polish (tracked, non-blocking)
BASELINE.md frozen-snapshot banner; per-tool load-mechanism doc subsection; `--dry-run` "loaded skills"
line; `model-route` `--effort` input flag / `max` reachability; `skill` hot-load deferral note. These are
cosmetic/documentation refinements; none affect a load-bearing capability.

See `CAPABILITY_ASSESSMENT.md` for the live REAL/ADVISORY/DEFERRED ledger and `DOCTRINE_CROSSWALK.md` for
the NBB-doctrine mapping.
