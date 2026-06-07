# Quick Start — NBCLI (NorthStar Bootstrap CLI)

> Governed autonomy in 5 minutes.

## 1) Install

```bash
npm i -g @nsb/cli          # bins: northstarbuild, nsb
```

## 2) Preview, then initialize

```bash
nsb init --dry-run --yes   # see the resolved plan + verdict (writes nothing)
nsb init --profile professional --tools claude,cursor,codex,skill
```

Creates `.mbf/{mbf-governance,anchors,custom-anchors}.yaml`, plus `CLAUDE.md`, `AGENTS.md`,
`.cursor/rules/mbf.mdc`, and `.claude/skills/north-star/SKILL.md`.

## 3) Validate & diagnose

```bash
nsb validate
nsb doctor                 # env + hook profile + run-ledger integrity
```

## 4) Use the governed-autonomy surface

```bash
nsb model-route --kind plan --risk high      # which model + effort for a task
nsb budget                                   # spend vs caps
nsb skill eval                               # score the generated skill
nsb workflow show                            # bounded parallel sub-agent plan
nsb-mcp                                       # start the MCP (stdio) server
```

## 5) Regenerate after edits

```bash
nsb update                 # --dry-run to preview the diff
```

---

## Optional: the methodology documents

`NORTH_STAR_BOOTSTRAP.md` (ignition key) · `BRIDGE.md` (routing) · `north-star-blueprint/` (HOW) ·
`master-build-framework/` (WHAT).

Build with intention. Ship with confidence.
