# CAPABILITY_ASSESSMENT — NBCLI v2.8.0

The single most important property of this edition is **accuracy**. The pre-modernization repo
over-claimed (an HTTP server called "MCP", "enforceable" governance that was instruction text,
OWASP/NIST-grade claims for static regex). This file states, per capability, what is **REAL &
tested**, what is **ADVISORY** (declared/rendered but honored only by a cooperating agent), and
what is **DEFERRED** (a scaffold or not built). If it's not listed REAL, don't rely on it as
enforced.

Verification baseline: **159 tests** green (core 48, schema 17, cli 85, mcp-server 9); `build`,
`typecheck`, `lint`, and `scan` green; the MCP server proven via a live JSON-RPC `initialize` +
`tools/list`; the standalone monolith run from `/tmp` with no `node_modules`.

## Legend
- ✅ **REAL** — implemented and covered by a test or a reproduced live check.
- 🟡 **ADVISORY** — real artifact (config/instruction/plan), but enforcement depends on the agent/harness honoring it.
- ⛔ **DEFERRED** — scaffold or intentionally not built this pass.

## BATCH 1 — CLI modernization
| Capability | Status | Notes |
|---|---|---|
| Global `--dry-run` readiness preview (ready/warning/blocked) | ✅ | `nsb init --dry-run`, `nsb preview`; unit-tested verdict logic; no writes, no model run |
| Portable one-source-of-truth → **8 adapters** (Claude/Cursor/Codex/SKILL/Windsurf/Cline/Gemini/Copilot) | ✅ | generator registry + `nsb adapters`; e2e + unit tests |
| Hook profiles `minimal\|standard\|strict` (drive enforcement) | ✅ | select the block/warn verdict in `nsb check` + hooks; rendered into instructions; decision unit-tested |
| **Enforced governance** (git pre-commit + Claude PreToolUse hooks) | ✅ | `nsb hooks install` + `nsb check` deterministically **block** risky changes (exit 1 / exit 2); only `enforce`-flagged anchors block (precision-tested: `/auth/` ≠ `author/`); covers Write/Edit/MultiEdit/NotebookEdit (Bash writes out of scope); **fails closed** if `nsb` missing or payload unparsable. Local scope (machine + agent harness) |
| `model-route` (Opus 4.8 orchestration, cheap subtasks, fast/effort) | ✅ (recommender) | deterministic + unit-tested; **recommends**, does not execute models |
| `workflow` bounded parallel sub-agent plan (typed IO, caps, adversarial verify) | 🟡 plan / ⛔ executor | emits a valid plan spec (tested); the executor is the harness's job, not NBCLI's |
| Real MCP (stdio) adapter | ✅ | `nsb-mcp` via `@modelcontextprotocol/sdk`; live `initialize`+`tools/list` verified |
| ACP-native IDE handshake | ⛔ | not implemented; Cursor/Codex/Claude targets are covered via generated instruction files |
| Worktree isolation (`nsb worktree`) | ✅ | real `git worktree` create/list/remove (arg-mapping unit-tested); Docker isolation still deferred |

## BATCH 2 — Skills / plugins
| Capability | Status | Notes |
|---|---|---|
| `skill` subcommands: list / add / eval / stocktake | ✅ | `eval` is a real static scorer (frontmatter/trigger/body/gate); unit-tested |
| SKILL.md with valid frontmatter + "use when" trigger | ✅ | generated; scores 100/100 in `skill eval` test |
| Install-on-demand plugins (Understand-Anything / Headroom) | ⛔ | deferred |

## BATCH 3 — Tokenomics
| Capability | Status | Notes |
|---|---|---|
| Tiny always-loaded CLI surface; methodology lazy/embedded | ✅ | profiles/anchors embedded; methodology stays in docs, not loaded by the CLI |
| Per-command token/cost budgets + batch reporting | ✅ | `nsb budget` over the ledger; `evaluateBudget`/`evaluateCap` unit-tested |
| Compression proxy; telemetry uploader | ⛔ | deferred (and NBCLI is intentionally offline/no-telemetry) |

## BATCH 4 — Governance / security
| Capability | Status | Notes |
|---|---|---|
| Hash-chained run ledger (optional HMAC) | ✅ | detects naive edits; **forgery-resistant when keyed** (`NSB_LEDGER_KEY` → HMAC, `signed:true`); cross-process **write lock** prevents the concurrent-writer race; unit-tested. `nsb budget verify` |
| Per-run AND per-project cost caps (USD + tokens) + auto-throttle | ✅ | `nsb budget [--scope run --run <id>]` evaluates run-id-grouped spend vs caps, exit 1 on breach (unit-tested); harness must pause on the throttle signal |
| Permission model (allow/deny/destructive gates) | 🟡 | declared in schema/profiles, rendered into instructions; advisory |
| 1Password `op://` + `op run --` pattern | ✅ doc / 🟡 runtime | documented in `SECURITY.md`; `preview` detects `op` CLI + `op://` refs |
| Sensitive-path protection, URL validation, Stripe test-mode | 🟡 | encoded as anchors + guidance; `scan-secrets` flags `sk_live_`/keys (REAL) |
| Prompt-injection refusal posture; screenshot/action audit trail | 🟡 | refusal stance rendered into instructions; ledger can record actions |
| Local-first / offline | ✅ | NBCLI makes zero network calls |

## BATCH 5 — Distribution / verification
| Capability | Status | Notes |
|---|---|---|
| UTF-8 byte-safe; mojibake/U+FFFD scan | ✅ | `pnpm scan` (all tracked text files clean), in CI |
| Secret scan | ✅ | high-signal provider/key scanner (all tracked files clean), in CI |
| Build / test / lint / typecheck green | ✅ | all gates; typecheck was previously broken and is now enforced |
| Monolithic distributable | ✅ | `build:standalone` → single file, run from `/tmp` with no node_modules |
| npm provenance on release | 🟡 | release workflow adds `--provenance` + `id-token: write`; **not run** this pass (Jon-owned) |

## Unverifiable / time-sensitive (mid-June-2026) claims
- **Model IDs** (`claude-opus-4-8`, `claude-sonnet-4-6`, `claude-haiku-4-5`) reflect the stated
  mid-2026 lineup used by `model-route`. They are configurable via `routing` in `.mbf` and should
  be reviewed against the current model list before relying on them.
- **MCP SDK `^1.29.0`** and **ACP** maturity are point-in-time; re-verify before publishing.
- **Adapter file paths** (`GEMINI.md`, `.github/copilot-instructions.md`, `.windsurf/rules/`,
  `.clinerules/`) follow each tool's documented convention as of mid-2026; tools evolve, so confirm
  the path your tool version actually reads. NBCLI generates the file — auto-loading is the tool's job.
- npm publish (`@nsb/*`) has **not** been performed; `npm i -g @nsb/cli` is aspirational until a
  release is dispatched. Versions are bumped to 2.8.0 in-tree only.

## Deliberately deferred (scaffold or out of scope)
ACP handshake runtime · Docker isolation backend · compression proxy · telemetry ·
install-on-demand plugins · workflow executor · automated version-bump/changeset in release.
These are documented, not faked.
