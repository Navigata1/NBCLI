# Swappable Agent-Memory Backend Interface

> A harness-agnostic interface so agent memory persists ACROSS sessions and
> harnesses (Claude Code/Desktop, Codex, Cursor, ...). North Star defines the
> CONTRACT; you plug in a backend. ASCII-only (mojibake-safe).

---

## 0. Resolution of the "Part XIV / memory architecture" question

This settles the drift recorded in `RECONCILIATION.md` (sections 4, 11) and the
modernization log:

- **Part XIV = "Human-Agent Collaboration"** in Blueprint v6.5
  (`NORTH_STAR_BLUEPRINT_v6.5.md:17384`). It is NOT the memory architecture. The
  mission brief's label "Part XIV (memory architecture)" was incorrect for the
  live repo; this is the correction.
- **Memory architecture is already INTEGRATED**, not a proposal. It lives at:
  - Blueprint **Section 20 - Agent Memory Architecture** (Part V) -- canonical.
  - Blueprint **S56.5 - Memory Architecture (The Third Engineering Layer)**.
  - **MBF Category 31E - Memory Architecture** (Working/Episodic/Semantic/Procedural).
  The standalone `NS_MEMORY_ARCHITECTURE_PROPOSAL.md` was integrated and archived
  (`CHANGELOG.md` ENH-040); no proposal file remains.
- **Canonical cross-reference (use this, end the drift):**
  > Memory architecture -> **NS Section 20** (methodology) + **MBF Category 31E**
  > (technology). Cross-harness persistence -> **this file**.
  BRIDGE's older variants ("Part III: Context & Memory", "NS Part XII") are stale
  framings; they are corrected to the line above in the Batch 6 doc-consistency
  sweep.
- **What is genuinely NEW in NBB (this file):** the *swappable backend interface*
  so the integrated memory model persists beyond a single harness/session.

---

## 1. Memory types (from MBF Category 31E)

| Type | Holds | Lifetime |
|------|-------|----------|
| **Working** | the current task's active context | this session |
| **Episodic** | what happened (events, decisions, outcomes) | across sessions |
| **Semantic** | durable facts/knowledge about the project & user | long-lived |
| **Procedural** | learned how-to (skills, recurring playbooks) | long-lived |

The backend interface persists Episodic/Semantic/Procedural across harnesses;
Working memory is per-session by definition.

## 2. The interface (capability contract, not an implementation)

A conforming backend MUST provide:

```
write(item)        -> id
   item = { type, content, tags[], source, created (ISO-8601), salience? }
read(id)           -> item | null
search(query, opts)-> item[]            # opts: { type?, tags?, k?, recency_bias? }
forget(id|query)   -> count             # explicit deletion (user-controllable)
list(filter)       -> item[]            # by type/tag/time window
```

Contract rules:
- **Dates are ISO-8601 (`YYYY-MM-DDTHH:MM:SSZ`).** No locale formats.
- **Source is mandatory** on write (provenance: which agent/session/harness).
- **Salience optional**; backends may rank by recency + salience + relevance.
- **Idempotent reads; explicit, user-controllable forget** (no silent eviction of
  Semantic memory without a record).
- **Portable serialization** (JSON) so memory survives a backend swap.

## 3. Candidate backends (user-specified; UNPINNED)

| Backend | Shape | Status |
|---------|-------|--------|
| `agentmemory` | typed memory store | user-specified; **UNPINNED** - vendor via `skill-supply-chain-review` |
| `claude-mem` | Claude-oriented persistence | user-specified; **UNPINNED** - vendor via `skill-supply-chain-review` |
| local JSON store | a flat file under the project (e.g. `.northstar/memory.json`) | always-available fallback; no external dep |

> Honesty: the named backends are user-specified and were NOT verified or pinned
> in this build. Confirm the repo, license, and a SHA via `skill-supply-chain-review`
> before adopting. The local JSON fallback needs no external dependency and is the
> portable default.

## 4. Persistence across harnesses

- Store memory in a project-local, committable-or-ignored location agreed with the
  user (default `.northstar/memory.json`; gitignore if it may hold sensitive data).
- Each harness loads the SAME store via this interface, so Episodic/Semantic/
  Procedural memory carries between Claude Code, Codex, Cursor, etc.
- Never put secrets in memory. Secrets go through the `op://` / vault path
  (see `docs/governance/`), never the memory store, context, or git.

## 5. Integration points
- `understand-first` writes its comprehension map to Semantic memory.
- `retro` writes learnings to Procedural memory (skill-promotion pipeline).
- `autoresearch` may log run outcomes to Episodic memory.
- `context-compression` compresses retrieved memory before it re-enters context.

## When NOT to use
- Single-session, single-harness tasks - Working memory (plain context) suffices;
  a persistence backend is overhead.
- Anything sensitive - do not persist secrets/PII to memory; use the vault path.

## Portability
The interface is JSON + four operations - implementable on any backend or as a
local file in any harness. Swapping backends must not change calling code; that is
the point of the contract.
