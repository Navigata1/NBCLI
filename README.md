# NBCLI — NorthStar Bootstrap CLI

**Governed autonomy for AI-native development.** NBCLI is the CLI edition of the North Star Build
(NSB) methodology, modernized for the mid-2026 agentic landscape.

NBCLI compiles one canonical governance config (`.mbf/mbf-governance.yaml`) into **tool-native
instruction files** (`CLAUDE.md`, `AGENTS.md`, Cursor rules, and a Claude `SKILL.md`) from a single
source of truth, and ships a **real MCP server** so the same governance is callable at runtime.

> **Honesty first.** "Governance" here means guardrails *written into instruction files an agent
> reads* plus an *advisory* confidence/budget/permission model — not OS-level enforcement. What is
> genuinely enforced vs. advisory vs. deferred is spelled out in
> [`CAPABILITY_ASSESSMENT.md`](./CAPABILITY_ASSESSMENT.md). Don't take a claim here on faith; that
> file tells you exactly what's real.

---

## Install

```bash
npm i -g @nsb/cli      # bins: northstarbuild, nsb
```

Or use the **standalone monolith** — a single file that runs on Node ≥ 22 with no `node_modules`:

```bash
pnpm --filter @nsb/cli build:standalone
node packages/cli/dist/nsb-standalone.js --help
```

**Docker:**

```bash
docker build -t nbcli . && docker run --rm -v "$PWD:/work" nbcli init --dry-run --yes
```

**GitHub Action (CI):**

```yaml
- uses: Navigata1/NBCLI@v2.11.0
  with: { mode: check, profile: strict }   # or mode: eval
```

(npm/Action install depends on `@nsb/cli` being published — see `CAPABILITY_ASSESSMENT.md` for release status.)

---

## Commands

| Command | What it does |
|---|---|
| `nsb` / `nsb home` | Dynamic home screen + project status |
| `nsb init` | Scaffold `.mbf/` governance + generate instruction files. `--dry-run` previews with a ready/warning/blocked verdict. |
| `nsb preview` | Read-only resolution: config, tools, MCP/auth, planned writes, verdict (no model run) |
| `nsb validate` | Validate `.mbf` config + anchors against the JSON Schema |
| `nsb update` | Regenerate instruction files; merge custom anchors. `--dry-run` shows the diff. |
| `nsb doctor` | Environment + config + hook-profile + run-ledger diagnostics |
| `nsb model-route` | Recommend a model tier + effort/fast flags for a task (recommends, never executes) |
| `nsb budget` | Spend vs caps; `record` / `verify` the tamper-evident run ledger |
| `nsb skill` | `list` / `add` / `eval` / `stocktake` the generated Claude skill |
| `nsb workflow` | Emit / validate a bounded parallel sub-agent plan (typed IO, caps, adversarial verify) |
| `nsb worktree` | Isolated parallel runs via real `git worktree` (create / list / remove) |
| `nsb sandbox` | Run a command in an isolated Docker container (network off by default) |
| `nsb check` | Enforce risk anchors over files / staged changes — exit nonzero to **block** |
| `nsb hooks` | Install/remove enforcement hooks (git pre-commit + Claude Code PreToolUse) |
| `nsb adapters` | List/detect adapters — 11 adapters (10 files; codex+grok share AGENTS.md) incl. Grok/Aider/Junie (`--detect` scans the repo) |
| `nsb eval` | Score the governance engine against labeled fixtures (accuracy / precision / recall) |
| `nsb audit` | Report / verify / export / **sync** the run ledger (JSON/CSV; opt-in webhook) |
| `nsb stats` | Local-only ledger metrics — no network (`--json` for agents) |
| `nsb policy` | Export anchors as policy-as-code (OPA/Rego, Cedar) |
| `nsb sign` | Ed25519 detached signing of artifacts (keygen | file) |
| `nsb verify` | Verify an Ed25519 detached signature |
| `nsb plugin` | Manage local signature-verified plugins (list | install | remove) |
| `nsb-mcp` | Start the real MCP (stdio) server exposing the governance tools |

```bash
nsb init --profile professional --tools claude,cursor,codex,skill
nsb init --dry-run --yes        # preview only — writes nothing
nsb model-route --kind plan --risk high --confidence uncertain
nsb budget record --usd 0.50 --tokens 1500 && nsb budget verify
```

---

## What `nsb init` generates

```
.mbf/
  mbf-governance.yaml          # canonical governance config (profile, confidence, hooks, budgets, permissions, routing)
  anchors.yaml                 # combined risk anchors (generated)
  custom-anchors.yaml          # your overrides
CLAUDE.md                      # Claude Code instructions
AGENTS.md                      # Codex instructions
.cursor/rules/mbf.mdc          # Cursor rules
.claude/skills/north-star/SKILL.md   # Claude skill (same source of truth)
```

All instruction files are rendered from one `buildInstructionBody()` — change governance once,
regenerate everywhere with `nsb update`.

---

## Governance model

- **Instruction-Based Enforcement (IBE)** — governance is compiled into tool-native instructions.
- **SSAP confidence** — weighted 1–5 factor scores + signed anchor adjustments → a confidence
  level and recommendation. Deterministic and unit-tested.
- **Risk anchors** — substring/regex/glob rules over paths/content that lower confidence on
  sensitive changes (auth, secrets, migrations, …).
- **Hook profiles** `minimal | standard | strict` — rendered into instructions; map to gate strictness.
- **Budgets & permissions** — per-run/per-project cost caps and an allow/deny + destructive-gate
  model (advisory; rendered into instructions and checked by `nsb budget`).
- **Run ledger** — a hash-chained JSONL log (`nsb budget verify`), lock-protected against concurrent
  writers. Set **`NSB_LEDGER_KEY`** to HMAC-sign entries (**forgery-resistant**); unkeyed, it detects
  naive edits only. Supports per-run budgets via `runId`. See [`SECURITY.md`](./SECURITY.md).

See [`SECURITY.md`](./SECURITY.md) for the security posture (1Password `op://`, sandboxing,
prompt-injection stance, least privilege).

---

## Enforcement (not just advice)

Governance is advisory until you install hooks — then it actually **blocks**:

```bash
nsb hooks install      # git pre-commit + Claude Code PreToolUse
nsb check --staged     # what the pre-commit hook runs
```

- **git pre-commit** → `nsb check --staged` blocks risky **commits** (exit 1).
- **Claude Code PreToolUse** → `nsb check --hook` blocks an **agent's** Write/Edit/MultiEdit/
  NotebookEdit to risky paths (exit 2; Bash-driven writes are out of scope; **fails closed** if
  `nsb` is missing).

The block/warn/allow decision follows the hook profile: **strict** blocks any anchor, **standard**
blocks security/high-risk, **minimal** warns only. This is what makes NBCLI an *enforcement* tool,
not a prompt generator. Enforcement is local (your machine + agent harness) and requires
`nsb hooks install`.

---

## MCP

`nsb-mcp` is a genuine [Model Context Protocol](https://modelcontextprotocol.io) server over stdio
(built on `@modelcontextprotocol/sdk`) exposing `check_confidence`, `verify_autonomy`, `log_decision`, `evaluate_change`, `list_anchors`, and `audit_query`. A legacy plain-HTTP API (`startServer`) remains for backward compatibility — it is
**unauthenticated and unencrypted, binds to loopback (127.0.0.1) only (set `NSB_HTTP_TOKEN` to require a bearer token), and must never be exposed to
a network**. Prefer the stdio MCP server.

Example MCP client config:

```json
{ "mcpServers": { "north-star": { "command": "nsb-mcp" } } }
```

---

## Methodology documents

The full methodology lives alongside the CLI: `NORTH_STAR_BOOTSTRAP.md` (ignition key),
`BRIDGE.md` (routing), the NBB Blueprint v6.5 (HOW) + MBF v2.5 (WHAT), canonical in `Navigata1/NBB` (doctrine vendored in `vendor/nbb/`).

---

## Project docs

- [`BASELINE.md`](./BASELINE.md) — pre-modernization architecture snapshot
- [`CAPABILITY_ASSESSMENT.md`](./CAPABILITY_ASSESSMENT.md) — real vs advisory vs deferred
- [`MIGRATION.md`](./MIGRATION.md) — upgrading from 0.1.0
- [`CHANGELOG.md`](./CHANGELOG.md) — release ledger
- [`SECURITY.md`](./SECURITY.md) — security posture

---

## License

**MIT** — see [`LICENSE`](./LICENSE). (Earlier methodology essays referenced CC BY-NC-SA; the
`LICENSE` file is authoritative and the project is MIT.)
