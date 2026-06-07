# NBCLI exit-code contract

NBCLI is built to be driven by **AI agents and CI**, so exit codes are a stable contract. Add
`--json` (where supported) for a machine-readable result on **stdout**; human/error text goes to
**stderr**.

| Code | Meaning | Emitted by |
|------|---------|-----------|
| `0` | Success / allow / pass | every command on success; `check` verdict allow/warn; `eval` pass; `audit verify` intact |
| `1` | Governance failure / blocked | `check` (non-hook) verdict **block**; `eval` failed (false negative or below `--min-accuracy`); `budget` cap breach; `audit verify` broken; `validate` schema error; bad flags |
| `2` | **Agent edit blocked** (Claude Code PreToolUse contract) | `check --hook` when the verdict is block, or the payload is unparsable under a blocking profile (fail-closed) |

## `--json` support

`--json` emits a pretty-printed JSON object on stdout and suppresses the banner/tables:

- `nsb check [paths] --json` → `{ profile, verdict, totalAdjustment, enforceAdjustment, reasons, matches }`
- `nsb eval --json` → `{ profile, total, correct, accuracy, blockPrecision, blockRecall, falseNegatives, falsePositives, cases }`
- `nsb model-route --json` → the `RouteDecision` (or the matrix array with `--matrix`)
- `nsb stats --json` → `{ entries, byKind, totalUsd, totalTokens }`
- `nsb audit export --format json` → the (filtered) ledger entries

Exit codes are unchanged by `--json` — a blocked `check --json` still exits `1` (or `2` in `--hook`).
