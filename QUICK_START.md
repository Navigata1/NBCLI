# Quick Start Guide (North Star Build 2.0)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        NORTH STAR BUILD — QUICK START                         │
│                       Governed autonomy in 5 minutes                          │
└─────────────────────────────────────────────────────────────────────────────┘
```

## 1) Install the CLI

```bash
npm i -g @nsb/cli
```

## 2) Initialize Governance

```bash
nsb init --profile professional --tools claude,cursor,codex
```

This creates:
- `.mbf/mbf-governance.yaml`
- `.mbf/anchors.yaml`
- `CLAUDE.md`, `.cursor/rules/mbf.mdc`, `AGENTS.md`

## 3) Validate Configuration

```bash
nsb validate
```

## 4) Regenerate Instructions (After edits)

```bash
nsb update
```

---

## Optional: Use the Framework Documents

For deep methodology and tool selection guidance:

- `NORTH_STAR_BOOTSTRAP.md` — ignition key
- `BRIDGE.md` — routing layer
- `north-star-blueprint/` — HOW to build
- `master-build-framework/` — WHAT to build with

---

Build with intention. Ship with confidence.
