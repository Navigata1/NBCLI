# vendor/nbb — pinned NBB doctrine (DO NOT EDIT BY HAND)

This directory is a **vendored, pinned subset** of NBB (`Navigata1/NBB`) doctrine that NBCLI
enforces and emits. **NBB is the single source of truth** — see `../../docs/ADR-001-nbb-realignment.md`.

- Source: https://github.com/Navigata1/NBB
- Pinned commit: `282028336df169d73e49a2d3b6a12acc95896399` (Blueprint v6.5 / MBF v2.5)
- Refresh (maintainer, needs git+network): `nsb sync`
- Verify (offline, runs in `pnpm dogfood`): `nsb sync --check` — fails on any drift vs `MANIFEST.json`.

This is the **doctrine subset** NBCLI needs to enforce/emit (HARD_STOPS, governance, tokenomics,
protocols, skills supply-chain, the NBB_CORE bootstrap). It is intentionally NOT the full methodology:
the ~4 MB Blueprint v6.5 / MBF v2.5 are **referenced on demand** (tokenomics doctrine — never
front-load), not vendored.

## License (the seam)

Everything in `vendor/nbb/` is **CC BY-NC-SA 4.0** (c) North Star Build / @NavigatingTruth — see
`./LICENSE`. The NBCLI engine (`packages/**`) is **MIT**. Do not relicense or commercially
redistribute vendored content without confirming the NC terms. See the repo-root `NOTICE`.
