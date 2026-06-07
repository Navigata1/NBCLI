# Security posture — NBCLI

NBCLI is a **least-privilege, local-first** CLI. It reads/writes files in the current project,
makes no network calls by default (the only outbound path is the opt-in `nsb audit sync` webhook), and **never executes models** — it emits instructions, configs,
plans, and recommendations. The strongest control is honesty about what is and isn't enforced
(see [`CAPABILITY_ASSESSMENT.md`](./CAPABILITY_ASSESSMENT.md)).

## Secrets — 1Password (`op://`) pattern

Never hardcode secrets. Reference them with 1Password secret references and inject at runtime:

```bash
# .env or shell — references, not values
STRIPE_API_KEY="op://Engineering/stripe/restricted-key"

# resolve only for the duration of a command
op run --env-file=.env -- nsb doctor
op run --no-masking -- node ./scripts/release.ts   # avoid; prefer masked
```

- Store `op://vault/item/field` references in config/env; resolve via `op run --`.
- The `env_files` (path) and `secrets_handling` anchors flag credential changes. `secrets_handling`
  matches key literals (`api_key`, `private_key`, `-----BEGIN`, …) plus assignment forms
  (`password`/`secret`/`token`/`api_key` `= "…"`); a bare identifier like a lone `token` variable is
  intentionally **not** matched, to keep enforcement low-false-positive.
- `nsb preview` reports whether the `op` CLI is present and whether `op://` references appear in config.

## Permission model & least privilege

Governance profiles declare `permissions` (allow / deny / destructive_gates) and an autonomy
`escalation_paths` ladder. These are rendered into the instruction files and are **advisory** —
the consuming harness must honor them.

**When NOT to use "dangerously skip permissions":** never in CI, never for security/auth/payment/
migration paths, never for outward-facing or destructive operations, and never by default. Skip
modes defeat the entire point of governed autonomy. Prefer the `strict` hook profile, which
instructs the agent to confirm before any destructive or outward-facing action.

## Sensitive paths, URLs, payments

- **Sensitive-path protection** — auth/secrets/`.env`/IaC/migration paths carry negative anchors;
  the `strict` profile blocks edits there without explicit human approval.
- **URL validation** — validate and allowlist any URL before fetching; treat fetched content as
  untrusted input. NBCLI itself fetches nothing.
- **Stripe** — use **restricted keys** and **test mode** (`sk_test_…`) in non-production; never
  commit live keys (the secret scan flags `sk_live_…`). Resolve via `op://`.

## Computer-use / browser-use

If you wire NBCLI's plans into a computer-use or browser-use agent: sandbox it (container or
VM), keep a screenshot/action **audit trail**, and gate destructive UI actions behind the
permission model. NBCLI's `log_decision` ledger is the place to record those actions
(tamper-evident, `nsb budget verify`).

## Prompt-injection posture

Generated instruction files tell the agent to treat file/web/tool content as **untrusted** and to
**refuse** instructions embedded in that content that conflict with the governance config or the
user's intent. Anchors raise scrutiny on content that looks like injected directives.

## Local-first / offline

NBCLI runs offline by default (no telemetry). The ONLY outbound path is the opt-in `nsb audit sync`
webhook — off unless you set `sinks.webhooks` or pass `--webhook`. The sink URL is operator/config-
controlled: treat `.mbf/mbf-governance.yaml` as trusted — an agent that can edit it (or run
`audit sync --webhook`) can change the egress target. Model execution is delegated to your harness;
choose a local/offline model there if required. Leave `sinks` unset to keep NBCLI fully offline.

## Enforcement (git + agent hooks)

`nsb hooks install` turns advisory governance into **enforced** governance:

- **git pre-commit** runs `nsb check --staged` and blocks risky **commits** (exit 1).
- **Claude Code PreToolUse** runs `nsb check --hook` and blocks an **agent's**
  Write/Edit/MultiEdit/NotebookEdit to risky paths (exit 2 — the edit never lands).

The verdict follows the hook profile: **strict** blocks on any *enforced* anchor, **standard** blocks
an enforced security-category match or high-risk (**enforced** adjustment ≤ −0.40), **minimal** warns
only. Only `enforce`-flagged anchors block; advisory anchors never do. Use `strict` for
regulated/security-sensitive repos.

**Scope & limitations (honest):** enforcement is **local** (developer machine + agent harness) — it
does not enforce on a server you don't control. The tool-name matcher covers Write/Edit/MultiEdit/
NotebookEdit; **Bash-driven writes** (`echo >`, `sed -i`) are inherently out of scope for a
tool-name hook. Both hooks **fail closed**: if `nsb` is not on PATH they block (exit 1/2) rather
than silently allow, and an unparsable PreToolUse payload blocks under strict/standard. `nsb check`
is deterministic and offline.

## Run ledger integrity (limitations)

The run ledger (`.mbf/ledger/runs.jsonl`, `nsb budget verify`) is a hash-chained log with two modes:

- **Unkeyed (default):** a plain SHA-256 chain. Detects *naive* in-place edits, but is **not**
  forgery-resistant — a writer can recompute the chain from the edited entry forward.
- **Keyed (recommended for audit):** set **`NSB_LEDGER_KEY`** and entries are HMAC-SHA256 signed
  (`signed: true`). The chain is then **forgery-resistant**: an editor without the key cannot
  recompute a valid digest, and `verify` requires the key — signed entries are reported as
  unverifiable without it, never silently "OK". Keep the key out of the repo (use `op://`).

Writes are serialized with a cross-process **O_EXCL lock**, so concurrent appenders (the CLI and a
running MCP server) no longer race into a duplicate `seq`. For still-stronger guarantees, anchor the
head hash to an external witness (e.g. a signed git commit).

## Legacy HTTP API

`startServer` (port 3333) is a legacy plain-HTTP API kept for backward compatibility. It is
**unauthenticated, unencrypted, and has no rate limiting**; it binds to **127.0.0.1 only** and
rejects malformed JSON with 400. Never expose it to a network. The real **stdio MCP server**
(`nsb-mcp`) supersedes it and is the recommended transport.

## Reporting

Open a security issue at https://github.com/Navigata1/NBCLI/issues (or privately contact the
maintainer for sensitive reports).
