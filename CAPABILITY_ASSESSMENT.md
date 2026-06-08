# CAPABILITY_ASSESSMENT — NBCLI v2.25.0

The single most important property of this edition is **accuracy**. The pre-modernization repo
over-claimed (an HTTP server called "MCP", "enforceable" governance that was instruction text,
OWASP/NIST-grade claims for static regex). This file states, per capability, what is **REAL &
tested**, what is **ADVISORY** (declared/rendered but honored only by a cooperating agent), and
what is **DEFERRED** (a scaffold or not built). If it's not listed REAL, don't rely on it as
enforced.

Verification baseline: **265 tests** green (core 73, schema 17, cli 162, mcp-server 13); `build`,
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
| Portable one-source-of-truth → **11 adapters** (Claude/Cursor/Codex/Grok/SKILL/Windsurf/Cline/Gemini/Copilot/Aider/Junie) | ✅ | generator registry + `nsb adapters --detect`; e2e + unit tests |
| Hook profiles `minimal\|standard\|strict` (drive enforcement) | ✅ | select the block/warn verdict in `nsb check` + hooks; rendered into instructions; decision unit-tested |
| **Enforced governance** (git pre-commit + Claude PreToolUse hooks) | ✅ | `nsb hooks install` + `nsb check` deterministically **block** risky changes (exit 1 / exit 2); only `enforce`-flagged anchors block (precision-tested: `/auth/` ≠ `author/`); covers Write/Edit/MultiEdit/NotebookEdit (Bash writes out of scope); **fails closed** if `nsb` missing or payload unparsable. Local scope (machine + agent harness) |
| `model-route` (Opus 4.8 orchestration, cheap subtasks, fast/effort) | ✅ (recommender) | deterministic + unit-tested; **recommends**, does not execute models |
| `workflow` bounded parallel sub-agent plan (typed IO, caps, adversarial verify) | 🟡 plan / ⛔ executor | emits + `workflow validate` lints a plan spec (tested); the executor is the harness's job, not NBCLI's |
| Real MCP (stdio) adapter | ✅ | `nsb-mcp` via `@modelcontextprotocol/sdk`; **6 tools** (check_confidence/verify_autonomy/log_decision/evaluate_change/list_anchors/audit_query); registry manifest `server.json`; legacy HTTP optionally token-gated (`NSB_HTTP_TOKEN`); live `initialize`+`tools/list` verified |
| ACP-native IDE handshake | ⛔ | not implemented; Cursor/Codex/Claude targets are covered via generated instruction files |
| Worktree isolation (`nsb worktree`) | ✅ | real `git worktree` create/list/remove (arg-mapping unit-tested), plus `nsb sandbox` Docker isolation (network-off by default; `--print` needs no Docker) |

## BATCH 2 — Skills / plugins
| Capability | Status | Notes |
|---|---|---|
| `skill` subcommands: list / add / eval / stocktake | ✅ | `eval` is a real static scorer (frontmatter/trigger/body/gate); unit-tested |
| SKILL.md with valid frontmatter + "use when" trigger | ✅ | generated; scores 100/100 in `skill eval` test |
| Install-on-demand plugins (`nsb plugin`) | ✅ local / 🟡 registry | local **whole-tree** signature-verified install (`nsb plugin sign` + `--pub`); path-traversal-safe; network/registry deferred |

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
| Audit reporting + export (`nsb audit`) | ✅ | report/verify the ledger; export filtered entries as JSON / **formula-injection-safe** CSV for SIEM (offline — NBCLI writes the file, you ship it); `filterEntries`/`toCsv` unit-tested |
| Opt-in audit sink (`nsb audit sync`) | ✅ | POST ledger entries to a webhook/SIEM; **OFF by default** (`sinks.webhooks` / `--webhook`); payload redaction; the only outbound path |
| Policy-as-code export (`nsb policy export`) | ✅ | compiles anchors → OPA/Rego (matcher-faithful: case-insensitive substring/regex/glob) + Cedar (path anchors only, honest limitation); pure compilers unit-tested; validate with the engine |
| Permission model (allow/deny/destructive gates) | 🟡 | declared in schema/profiles, rendered into instructions; advisory |
| 1Password `op://` + `op run --` pattern | ✅ doc / 🟡 runtime | documented in `SECURITY.md`; `preview` detects `op` CLI + `op://` refs |
| Sensitive-path protection, URL validation, Stripe test-mode | 🟡 | encoded as anchors + guidance; `scan-secrets` flags `sk_live_`/keys (REAL) |
| Prompt-injection refusal posture; screenshot/action audit trail | 🟡 | refusal stance rendered into instructions; ledger can record actions |
| Local-first / offline by default | ✅ | zero network calls **except** the opt-in `nsb audit sync` webhook (off unless `sinks.webhooks` is configured or `--webhook` passed) |

## BATCH 5 — Distribution / verification
| Capability | Status | Notes |
|---|---|---|
| UTF-8 byte-safe; mojibake/U+FFFD scan | ✅ | `pnpm scan` (all tracked text files clean), in CI |
| Secret scan | ✅ | high-signal provider/key scanner (all tracked files clean), in CI |
| Build / test / lint / typecheck green | ✅ | all gates; typecheck was previously broken and is now enforced |
| Governance eval harness (`nsb eval`) | ✅ | labeled fixtures → accuracy / block precision / recall; bundled set scores 100% (unit-tested, per-fixture); exits nonzero on any false negative |
| Machine-readable surface (`--json`) + `nsb stats` | ✅ | `--json` on check/eval/model-route/stats; exit-code contract (docs/EXIT_CODES.md); local-only stats (no network) |
| Monolithic distributable | ✅ | `build:standalone` → single file, run from `/tmp` with no node_modules |
| Reusable GitHub Action (`action.yml`) | ✅ artifact / 🟡 runtime | composite action runs `nsb check`/`nsb eval`; **install depends on npm publish** |
| Docker image (`Dockerfile`) | ✅ | multi-stage → standalone monolith on `node:22-alpine`, `nsb` entrypoint; buildable (not pushed here) |
| SBOM (`pnpm sbom`) | ✅ | deterministic CycloneDX from workspace manifests |
| Artifact signing (`nsb sign` / `nsb verify`) | ✅ | Ed25519 detached signatures via Node crypto (offline; not minisign on-disk format); signs SBOM/audit exports/any file; unit + e2e tested |
| Homebrew formula | 🟡 template | `packaging/homebrew/nbcli.rb` — ready on first release (needs tarball url + sha256) |
| npm provenance on release | 🟡 | release workflow `--provenance` + `id-token: write` + cli `publishConfig`; **not run** this pass (Jon-owned) |

## BATCH 6 — NBB re-alignment (Slices 1–7)
NBCLI is now NBB's executable enforcement + portability compiler (NBB `Navigata1/NBB`, pinned, Blueprint
v6.5 / MBF v2.5). See `docs/ADR-001-nbb-realignment.md`, `docs/DOCTRINE_CROSSWALK.md`, `docs/DRIFT_GUARD.md`.

| Capability | Status | Notes |
|---|---|---|
| Canonical NBB sync (`nsb sync` / `--check`) | ✅ | `vendor/nbb/` = pinned doctrine subset + MANIFEST; offline drift guard in `pnpm dogfood`. |
| Dedupe + license seam | ✅ | stale v6.0/v2.0 → `superseded/`; `NOTICE`/`LICENSE` (CC BY-NC-SA methodology / MIT engine). |
| NBB HARD STOPS enforced | ✅ | `hard_stops` anchors block `terraform destroy`/`DROP DATABASE`/`rm -rf /`/force-push (`nsb check`/hooks/eval). |
| NBB safety floor emitted | ✅ | hard stops, blast-radius, autonomy caps, `op://` secrets, prompt-injection, load discipline in every generated file. |
| Portable NBB bootstrap | ✅ | `nsb init` emits the ignition + load-discipline bootstrap into the trio. |
| Content-hash drift guard | ✅ | stamp + `nsb update --check`; `self-portability` step in `pnpm dogfood`. |
| Protocols + memory scaffolding | ✅ | `nsb protocols emit` → `mcp.json` (wires `nsb-mcp`) + `memory-backend.json` + `PROTOCOLS.md`. |
| ACP | 🟡 | reached **via MCP** (hosts consume `nsb-mcp`); NBCLI is a tool/governance provider, not a driven agent. |
| A2A / AG-UI / A2UI | 🟡 | **emitted guidance**, not runtimes. |
| Skill supply-chain gate (`nsb skill vet`) | ✅ | ports NBB `vet_skill.sh` (default-deny PASS/WARN/FAIL → 0/2/1). |
| Dogfood self-application | ✅ | NBCLI generates its own root `CLAUDE.md`/`AGENTS.md`/`SKILL.md`; verified by the gate. |
| `.claude/settings.json` deny-list emit | ⛔ | deferred (overlaps `nsb hooks`; denylist already emitted as guidance + enforced via `nsb hooks install`). |
| `.mbf` vocabulary aliasing | ⛔ | deferred (low-value / risky rename; back-compat preserved). |

## Unverifiable / time-sensitive (mid-June-2026) claims
- **Model IDs** (`claude-opus-4-8`, `claude-sonnet-4-6`, `claude-haiku-4-5`) reflect the stated
  mid-2026 lineup used by `model-route`. They are configurable via `routing` in `.mbf` and should
  be reviewed against the current model list before relying on them.
- **MCP SDK `^1.29.0`** and **ACP** maturity are point-in-time; re-verify before publishing.
- **Adapter file paths** (`GEMINI.md`, `.github/copilot-instructions.md`, `.windsurf/rules/`,
  `.clinerules/`) follow each tool's documented convention as of mid-2026; tools evolve, so confirm
  the path your tool version actually reads. NBCLI generates the file — auto-loading is the tool's job.
- The bundled `nsb eval` fixtures are **authored** — a spec + regression guard for the engine's
  intended classification, not an independent third-party benchmark. Add your own labeled cases at
  `.mbf/eval/*.json` to measure your project's real risk surface.
- npm publish (`@nsb/*`) has **not** been performed; `npm i -g @nsb/cli` is aspirational until a
  release is dispatched. Versions are bumped to 2.25.0 in-tree only.

## Deliberately deferred (scaffold or out of scope)
ACP-native handshake runtime (reached via MCP) · A2A/AG-UI/A2UI runtimes (emitted guidance only) ·
network compression proxy · network telemetry (local `nsb stats` only) · network/registry plugin
install (offline signature-verified `nsb plugin` is REAL) · workflow executor (NBCLI emits + validates
the plan) · generated `.claude/settings.json` deny-list · `.mbf` vocabulary aliasing ·
automated version-bump/changeset in release.
These are documented, not faked.
