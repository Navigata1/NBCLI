# MIGRATION — 0.1.0 → 2.5.0 (NBCLI)

## Version jump

The package version moves **0.1.0 → 2.5.0** in one step. This aligns the package version with the
"North Star v2" product brand and this "v2.5" CLI edition. It is a deliberate brand-alignment jump,
not 25 minor releases. Maturity is still pre-1.0-quality research tooling — see
[`CAPABILITY_ASSESSMENT.md`](./CAPABILITY_ASSESSMENT.md).

The version is now **single-sourced** in `packages/cli/src/version.ts` (test-enforced equal to
`package.json`); it was previously hardcoded in three places.

## NBB re-alignment (the methodology source) — from v2.18

NBCLI is now NBB's executable **enforcement + portability compiler**. The canonical methodology is
**NBB v6.5 / MBF v2.5** (`Navigata1/NBB`, pinned), not NBCLI's old in-repo v6.0/v2.0 copies. See
`docs/ADR-001-nbb-realignment.md`.

- Legacy Blueprint v6.0 / MBF v2.0 trees moved to `superseded/` (archived, not canonical).
- NBB doctrine is vendored + verified under `vendor/nbb/` (enforcement lands in Slice 2) (`nsb sync --check`, run in the gate).
- License seam: engine MIT; NBB methodology (`vendor/nbb/`, `superseded/`, emitted text) CC BY-NC-SA -- see `NOTICE`.
- The CLI version continues FORWARD (... 2.18.0 -> 2.19.0). The CLI version line is INDEPENDENT of NBB's
  methodology version (v6.5/v2.5). The brief's "2.5.x" cannot apply: 2.5.x is below the live 2.18.0 and
  would be a backward npm/semver jump (see the GOAL_LEDGER VERSION-LINE FLAG).

## Backward compatibility

- **Existing `.mbf/mbf-governance.yaml` files keep working.** The new `hooks`, `budgets`,
  `permissions`, and `routing` blocks are **optional** additions to the schema. Run `nsb validate`
  to confirm, and `nsb update` to regenerate instruction files (now including `SKILL.md`).
- **Commands `init` / `validate` / `update` / `doctor` are unchanged** in behavior (init/update now
  also accept `--dry-run` and a `skill` tool; defaults add `skill`).
- **Anchors and profiles are now embedded constants** instead of bundled YAML files. Generated
  output is unchanged; the fragile `__dirname` template lookup is gone. The `@nsb/anchors`
  file-path API (`getAnchorFiles`) is retained but deprecated in favor of `getBuiltInAnchors()`.

## New surface

- `nsb preview`, `nsb model-route`, `nsb budget`, `nsb skill`, `nsb workflow`, `nsb home`.
- `nsb-mcp` — a real MCP (stdio) server. Wire it into your client:
  `{ "mcpServers": { "north-star": { "command": "nsb-mcp" } } }`.
- Standalone monolith: `pnpm --filter @nsb/cli build:standalone`.

## Behavioral notes

- `log_decision` (MCP/HTTP) now **persists** to the hash-chained run ledger (naive-edit-evident, not
  forgery-resistant — see [`SECURITY.md`](./SECURITY.md)) when a ledger path or `$NSB_LEDGER` is set;
  otherwise it echoes with `persisted: false` (no silent "audit trail").
- The HTTP server on port 3333 still exists but is documented honestly as an **HTTP API**, not MCP.

## License

The project is **MIT** (`LICENSE`). If you relied on the earlier CC BY-NC-SA references in the
methodology essays, note the `LICENSE` file is authoritative and governs.

## Repo identity

Published to `Navigata1/NBCLI`. Manifest URLs and docs were corrected from `NorthStarBuild_2.0` /
`NorthStarBuild_6.0` to `NBCLI`.
