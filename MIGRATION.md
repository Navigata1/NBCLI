# MIGRATION — 0.1.0 → 2.5.0 (NBCLI)

## Version jump

The package version moves **0.1.0 → 2.5.0** in one step. This aligns the package version with the
"North Star v2" product brand and this "v2.5" CLI edition. It is a deliberate brand-alignment jump,
not 25 minor releases. Maturity is still pre-1.0-quality research tooling — see
[`CAPABILITY_ASSESSMENT.md`](./CAPABILITY_ASSESSMENT.md).

The version is now **single-sourced** in `packages/cli/src/version.ts` (test-enforced equal to
`package.json`); it was previously hardcoded in three places.

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
