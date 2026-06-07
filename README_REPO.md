# NBCLI — repository guide

This repository contains **NBCLI** (the NorthStar Bootstrap CLI edition of North Star Build),
its packages, the real MCP server, and the supporting methodology documents.

## Repo layout

```
NBCLI/
├── packages/
│   ├── core/        # SSAP confidence engine, anchors, run ledger, budgets
│   ├── schema/      # Ajv JSON-Schema validators
│   ├── anchors/     # built-in anchor libraries (embedded)
│   ├── cli/         # the CLI (bins: northstarbuild, nsb)
│   └── mcp-server/  # real MCP (stdio) server + legacy HTTP API (bin: nsb-mcp)
├── apps/            # docs (Astro) + marketing (Next.js)
├── examples/        # sample governed projects
├── docs/            # strategy, blueprint, and research docs
├── scripts/         # release + scan (encoding/secrets) tooling
├── BRIDGE.md · NORTH_STAR_BOOTSTRAP.md · north-star-blueprint/ · master-build-framework/
└── BASELINE.md · CAPABILITY_ASSESSMENT.md · MIGRATION.md · SECURITY.md
```

## Develop

```bash
pnpm install
pnpm build          # turbo build all packages
pnpm typecheck
pnpm test           # vitest across packages (199 tests)
pnpm lint
pnpm scan           # encoding (mojibake/U+FFFD) + secret scan
```

## Quick start

```bash
npm i -g @nsb/cli
nsb init --profile professional --tools claude,cursor,codex,skill
```

## License

**MIT** — see [`LICENSE`](./LICENSE).
