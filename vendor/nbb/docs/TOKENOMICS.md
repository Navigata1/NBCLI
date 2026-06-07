# TOKENOMICS.md — Mechanical Context Budgeting

> North Star's "load balancing, not token burning" value, made mechanical and
> MEASURED. The machine-readable manifest is `bootstrap/context-budget.json`
> (regenerate: `python3 scripts/measure_context_budget.py`; verify:
> `... --check`). ASCII-only (mojibake-safe).
>
> **Honesty note:** byte counts are exact; token counts are an ESTIMATE
> (chars / 4) and will differ from a real tokenizer by roughly +/-15%. Treat
> them as planning figures, not invoices.

---

## 1. The headline (measured, reference window = 200,000 tokens)

| Load | ~tokens | % of a 200k window |
|------|---------|--------------------|
| **Everything** (BRIDGE + Bootstrap + Blueprint + MBF) | **~258,300** | **129% - DOES NOT FIT** |
| **Tier 1 only** (the always-resident core) | **~1,941** | **~1.0%** |

Loading the full framework is not just wasteful - it physically exceeds a 200k
window. Lazy-loading is a NECESSITY, not an optimization. The core is a **99.25%
reduction** in always-resident footprint.

## 2. Component footprint (measured)

| Component | bytes | ~tokens |
|-----------|-------|---------|
| Core (always resident) | 7,797 | ~1,941 |
| BRIDGE.md (full nav) | 61,632 | ~12,659 |
| NORTH_STAR_BOOTSTRAP.md (deep) | 85,835 | ~16,330 |
| Blueprint v6.5 (full) | 1,031,632 | ~189,482 |
| MBF v2.5 (full) | 169,380 | ~39,868 |

## 3. Per-Part budget (Blueprint, measured) — load ONE, not all

| Part | ~tokens | | Part | ~tokens |
|------|---------|---|------|---------|
| I Foundation & Philosophy | ~21,022 | | VIII Code Architecture | ~11,172 |
| II Primitive Execution | ~19,847 | | IX Testing & Verification | ~8,633 |
| III Documentation & Workflow | ~19,446 | | X Security & Authentication | ~9,874 |
| IV AI Orchestration | ~21,514 | | XI DevOps & Deployment | ~12,428 |
| V Agent Composition | ~10,637 | | XII Future-Proofing | ~10,229 |
| VI MCP & Tools | ~9,788 | | XIII Quick Reference | ~6,048 |
| VII Design Mastery | ~14,204 | | XIV Human-Agent Collab | ~5,842 |

A single Part is 6k-21k tokens. Loading the right ONE costs ~3-11% of a window;
loading all 14 costs ~95% before you have read a line of project code.

## 4. The lazy-load rules (mechanical)

1. **Tier 1 always:** the core + the project instruction file. Nothing else by default.
2. **Tier 2 on demand:** when the core's mini-router or BRIDGE names a target, load
   THAT ONE Blueprint Part / MBF Category - not its neighbors.
3. **Tier 3 lookup only:** deep tables/appendices - consult, never "read".
4. **Never co-resident:** full Blueprint + full MBF must never be loaded together
   (their sum alone is ~229k tokens - over any 200k window).
5. **Unload on topic change:** drop a Part from context when its topic is done.
6. **Budget before load:** consult `bootstrap/context-budget.json`; if a load would
   push you past ~70% of the window, compress it first (Section 6) or split the task.
7. **Watch context %:** keep headroom to avoid auto-compaction mid-task.

## 5. Batch-boundary reporting (the cost discipline)

Group work into explicit batches. At each boundary, STOP and report: what
changed, what was verified, what remains, and a running token/cost estimate. This
keeps spend visible and steerable (see the governance cost caps in
`docs/governance/`). Long logs live in files (e.g. `docs/modernization/`), NOT in
the chat context - the report is a summary, the detail is on disk.

## 6. Optional compression layer (Headroom / context-compression)

When tool output, logs, or RAG results are high-volume, compress them BEFORE they
enter context using the `context-compression` skill (wraps the Headroom approach):
keep the verdict (error, count, exit code, top-k), fold the noise, ALWAYS disclose
"N omitted", and keep the raw artifact on disk for on-demand recovery. This is the
mechanical enforcement of "fetch what you need; unload when done".

## 7. Self-check
- `python3 scripts/measure_context_budget.py --check` - manifest matches reality.
- `bash scripts/build_bootstrap.sh --check` - the core stays small + in sync.
Run both in CI so the budget numbers never silently drift.
