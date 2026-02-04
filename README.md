# North Star Build 2.0

Governed autonomy for AI-native software development.

North Star Build (NSB) compiles methodology into enforceable tool instructions. It delivers confidence calibration, autonomy controls, and deterministic anchors across Claude Code, Cursor, and Codex.

---

## Quick Start

```bash
npm i -g @nsb/cli

# Initialize governance in a repo
nsb init --profile professional --tools claude,cursor,codex

# Validate configuration
nsb validate

# Regenerate tool instructions
nsb update
```

**CLI binary:** `northstarbuild` (alias: `nsb`)

---

## What It Generates

After `nsb init`, your project includes:

```
.mbf/
  mbf-governance.yaml   # Canonical governance config
  anchors.yaml          # Combined anchors (generated)
  custom-anchors.yaml   # Your custom anchors
CLAUDE.md               # Claude Code instructions
.cursor/rules/mbf.mdc   # Cursor rules
AGENTS.md               # Codex instructions
```

---

## Repository Structure

```
NorthStarBuild_2.0/
├── packages/
│   ├── core/           # SSAP calculator + anchor matcher
│   ├── schema/         # JSON schema + validators
│   ├── anchors/        # Anchor rule libraries
│   └── cli/            # NSB CLI (northstarbuild / nsb)
├── apps/
│   ├── docs/           # Astro Starlight documentation
│   └── web/            # Next.js marketing site
├── examples/           # Example governed projects
└── docs/               # Product strategy + blueprint docs
```

---

## Governance Model

- **Instruction-Based Enforcement (IBE)** — governance lives in tool-native instructions
- **SSAP** — structured self-assessment with confidence thresholds
- **Anchors** — deterministic risk adjustments for sensitive paths and content

---

## Framework Documents

The methodology and technology foundations remain in the original framework set:

- `NORTH_STAR_BOOTSTRAP.md` — ignition key
- `BRIDGE.md` — routing layer
- `north-star-blueprint/` — HOW to build
- `master-build-framework/` — WHAT to build with

---

## License

Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International.

"North Star Build" is a trademark.
