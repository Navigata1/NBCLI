# Skills Registry

> **VERSION:** 2.3 | **Updated:** 2026-06 (NBB wave) | **Batch:** 9 + NBB Batch 2
> **Compatible with:** Bootstrap v1.5 | Blueprint v6.5 | MBF v2.5
>
> **PURPOSE:** Canonical skills source map for the North Star Framework.
> Referenced by `GLOBAL_IDE_RULES.md` and `.claude/skills/` discovery.

---

## 1. Local Skill Inventory

Skills currently present in `.claude/skills/`:

| Skill | Version | Purpose | Triggers |
|-------|---------|---------|----------|
| `autoresearch` | 2.0 | Autonomous loop; VERIFY can be numeric OR computer-use behavioral smoke test | "autoresearch", "autonomous loop", "improve this metric", "smoke-test until it works" |
| `computer-use-smoke` | 1.0 | NEW: drive the built app, assert observable state, screenshot, deterministic pass/fail | "smoke test", "does it actually work", "click through the app", "browser test" |
| `context-compression` | 1.0 | NEW: compress tool output/logs/RAG before they hit context (Headroom layer) | "context is full", "too much output", "compress", "reduce tokens" |
| `design-taste` | 1.1 | Bias-corrected frontend design; 3-dial system, anti-slop rules | "build a UI", "design a page", "make it premium", "redesign this" |
| `mcp-builder` | 1.1 | MCP server lifecycle (research -> implement -> test -> eval) | "build an MCP server", "MCP integration", "Model Context Protocol" |
| `parallel-agent` | 2.0 | Orchestration: dynamic workflows (typed sub-agents + adversarial verify) + worktrees | "run in parallel", "fan out", "dynamic workflow", "git worktree", "agent team" |
| `plan-annotator` | 1.2 | Plan.md annotation workflow (TYPE A-E), human review gates | "annotate plan", "review plan", "I annotated plan.md" |
| `research-report` | 1.2 | Structured research with source tiering (A-D) and citation requirements | "research", "compare X and Y", "which should I use" |
| `retro` | 1.2 | Session retrospectives with skill promotion pipeline | "retro", "retrospective", "what did we learn" |
| `skill-creator` | 1.1 | Meta-skill for building, testing, and improving other skills | "create a skill", "build a skill", "skill eval" |
| `skill-supply-chain-review` | 1.1 | External skill trust evaluation, vendoring checklist, upstream diffs | "review this skill", "is this skill safe", "vendor this skill" |
| `understand-first` | 1.0 | NEW: pre-build knowledge-graph comprehension map before changing code | "understand this first", "map the codebase", "how does this work" |

> **NBB wave (v6.5) note:** 12 local skills (was 9). New: `computer-use-smoke`,
> `context-compression`, `understand-first`. Major modernizations: `parallel-agent`
> v1.1->2.0 (Opus 4.8 dynamic workflows), `autoresearch` v1.0->2.0 (computer-use
> behavioral verification). All skills now use uniform front-matter
> (name/description/license/metadata), a tightened trigger description, a
> "When NOT to use" section, and a "Portability" note. New-skill upstreams
> (`Lum1104/Understand-Anything`, `chopratejas/headroom`) are user-specified and
> UNPINNED -- vendor via `skill-supply-chain-review` before adopting upstream code.

---

## 1b. Downloadable Skill Packs (NBB)

Two tiered packs let you pick up many vetted skills at once — WITHOUT the
wholesale-import risk this registry's S4 policy bans. A pack is a vetted manifest
+ a secure builder, not a blob:

| Pack | Cap | Manifest |
|------|-----|----------|
| `core-100` | 100 | `packs/core-100.json` |
| `extended-300` | 300 | `packs/extended-300.json` |

- **Gate:** every skill passes `scripts/vet_skill.sh` (prompt-injection,
  pipe-to-shell, reverse shell, exfil, obfuscation, destructive commands) before
  inclusion. `scripts/build_skill_pack.py <tier>` fetches each at a **pinned SHA**,
  gates it, and includes ONLY PASS — **default-deny** on unpinned / WARN / FAIL /
  `license_pending`. Output: `dist/packs/<tier>/` (skills + `MANIFEST.json` +
  `QUARANTINE.md`). CI: `.github/workflows/build-skill-pack.yml`.
- **Honest cap:** counts are targets the gate fills, never inflated. A smoke build
  (`--offline`) packs only the first-party skills that pass.
- **ECC-Prime** (200+) is a `license_pending` source — default-denied until its
  license is confirmed to permit redistribution.

Full guide + pickup/routing: `packs/README.md`.

---

## 2. Verified Upstream Sources

All findings verified on 2026-03-17. (3 broken URLs fixed, 2 redirects updated.)

### Tier A: Official Vendor Sources (Use First)

#### A1. Anthropic Official Skills

- **Repository:** https://github.com/anthropics/skills
- **Docs:** *(removed — page no longer exists at previous URL)*
- **Announcement:** https://claude.com/blog/skills
- **Engineering deep dive:** https://claude.com/blog/equipping-agents-for-the-real-world-with-agent-skills
- **Verified count:** 17 skills (as of 2026-03-17)
- **Raw link pattern:** `https://raw.githubusercontent.com/anthropics/skills/main/skills/<skill>/SKILL.md`

| # | Skill | Category | NS Relevance |
|---|-------|----------|-------------|
| 1 | `algorithmic-art` | Design/Visual | Low |
| 2 | `brand-guidelines` | Design/Visual | Medium |
| 3 | `canvas-design` | Design/Visual | Low |
| 4 | `claude-api` | Developer | Medium |
| 5 | `doc-coauthoring` | Workflow | **High** — complements research-report |
| 6 | `docx` | Document | Medium |
| 7 | `frontend-design` | Design/Visual | **High** — replace with taste-adapted version |
| 8 | `internal-comms` | Workflow | Low |
| 9 | `mcp-builder` | Developer | **High** — adapt locally |
| 10 | `pdf` | Document | Medium |
| 11 | `pptx` | Document | Low |
| 12 | `skill-creator` | Meta | **Critical** — self-improving skill system |
| 13 | `slack-gif-creator` | Design/Visual | Low |
| 14 | `theme-factory` | Design/Visual | Low |
| 15 | `web-artifacts-builder` | Developer | Medium |
| 16 | `webapp-testing` | Quality | **High** — Playwright-based testing |
| 17 | `xlsx` | Document | Medium |

**Verified raw links (tested 2026-03-17):**
```
https://raw.githubusercontent.com/anthropics/skills/main/skills/skill-creator/SKILL.md
https://raw.githubusercontent.com/anthropics/skills/main/skills/mcp-builder/SKILL.md
https://raw.githubusercontent.com/anthropics/skills/main/skills/frontend-design/SKILL.md
https://raw.githubusercontent.com/anthropics/skills/main/skills/webapp-testing/SKILL.md
https://raw.githubusercontent.com/anthropics/skills/main/skills/doc-coauthoring/SKILL.md
```

#### A2. OpenAI Curated Skills

- **Repository:** https://github.com/openai/skills
- **Docs:** *(removed — page no longer exists at previous URL)*
- **Verified count:** 35 curated skills (as of 2026-03-17)
- **Raw link pattern:** `https://raw.githubusercontent.com/openai/skills/main/skills/.curated/<skill>/SKILL.md`
- **Note:** `skills/.experimental` path did NOT exist on 2026-03-16

| # | Skill | Category | NS Relevance |
|---|-------|----------|-------------|
| 1 | `playwright` | Testing | **High** |
| 2 | `playwright-interactive` | Testing | **High** |
| 3 | `screenshot` | Testing | **High** |
| 4 | `doc` | Documentation | **High** |
| 5 | `gh-fix-ci` | CI/CD | **High** |
| 6 | `gh-address-comments` | GitHub | **High** |
| 7 | `security-best-practices` | Security | **Critical** |
| 8 | `security-threat-model` | Security | **Critical** |
| 9 | `security-ownership-map` | Security | **High** |
| 10 | `sentry` | Monitoring | Medium |
| 11 | `linear` | Project Mgmt | Medium |
| 12 | `figma` | Design | Medium |
| 13 | `figma-implement-design` | Design | Medium |
| 14 | `openai-docs` | Reference | Medium |
| 15 | `vercel-deploy` | Deploy | Medium (already have Vercel plugin) |
| 16 | `cloudflare-deploy` | Deploy | Medium |
| 17 | `netlify-deploy` | Deploy | Low |
| 18 | `render-deploy` | Deploy | Low |
| 19 | `pdf` | Document | Medium |
| 20 | `slides` | Document | Low |
| 21 | `spreadsheet` | Document | Low |
| 22 | `imagegen` | Media | Low |
| 23 | `sora` | Media | Low |
| 24 | `speech` | Media | Low |
| 25 | `transcribe` | Media | Low |
| 26 | `jupyter-notebook` | Dev | Low |
| 27 | `notion-knowledge-capture` | Notion | Low |
| 28 | `notion-meeting-intelligence` | Notion | Low |
| 29 | `notion-research-documentation` | Notion | Low |
| 30 | `notion-spec-to-implementation` | Notion | Low |
| 31 | `chatgpt-apps` | Platform | Low |
| 32 | `aspnet-core` | Platform | Low |
| 33 | `winui-app` | Platform | Low |
| 34 | `develop-web-game` | Platform | Low |
| 35 | `yeet` | Utility | Low |

**Verified raw links (tested 2026-03-17):**
```
https://raw.githubusercontent.com/openai/skills/main/skills/.curated/playwright/SKILL.md
https://raw.githubusercontent.com/openai/skills/main/skills/.curated/security-threat-model/SKILL.md
https://raw.githubusercontent.com/openai/skills/main/skills/.curated/screenshot/SKILL.md
https://raw.githubusercontent.com/openai/skills/main/skills/.curated/gh-fix-ci/SKILL.md
https://raw.githubusercontent.com/openai/skills/main/skills/.curated/doc/SKILL.md
https://raw.githubusercontent.com/openai/skills/main/skills/.curated/security-best-practices/SKILL.md
```

### Tier B: Open Standards / Interop

| # | Source | URL | Purpose |
|---|--------|-----|---------|
| 1 | ~~agents.json standard~~ | ~~https://github.com/mariozechner/agents.json~~ | **BROKEN (404)** — removed 2026-03-17 |
| 2 | Vercel Web Design Guidelines | https://github.com/vercel-labs/agent-skills | Auto-syncing design standard validation |
| 3 | agentskills.io spec | https://agentskills.io | Open standard specification (referenced in arXiv:2602.12430v3) |

### Tier C: Reviewed Community (Adapt Locally, Pin SHA)

| # | Source | URL | Stars | Why It Matters | Action |
|---|--------|-----|-------|----------------|--------|
| 1 | `leonxlnx/taste-skill` | https://github.com/leonxlnx/taste-skill | — | Best frontend bias-correction system found. 3-dial config, named anti-slop rules, ~40 UI patterns, pre-flight checklist. 4 sub-skills (taste, soft, redesign, output). | Adapt into local `design-taste` skill |
| 2 | `obra/superpowers` | https://github.com/obra/superpowers | 40.9K | Battle-tested sub-agent orchestration. Three-step workflow: `superpowers brainstorm` (spec generation with clarifying questions), `superpowers write-plan` (implementation planning with line-level changes), `superpowers execute-plan` (auto-dispatch sub-agents for parallel execution with code review). Officially endorsed by Anthropic. Skills auto-trigger before tasks. | Install as plugin. Maps to RPIT: brainstorm=Research, write-plan=Plan, execute-plan=Implement+Test |
| 3 | `trailofbits/skills` | https://github.com/trailofbits/skills | — | Security skills from a top-tier security firm. CodeQL, Semgrep, variant analysis, vulnerability detection. | Reference for security skill enhancement |
| 4 | `uditgoenka/autoresearch` | https://github.com/uditgoenka/autoresearch | — | Generalizes Karpathy's autoresearch into any measurable improvement loop. MIT licensed. v1.0.3 includes security auditing. | Adapt into local `autoresearch` skill |
| 5 | `karpathy/autoresearch` | https://github.com/karpathy/autoresearch | 38K | Original autonomous ML experiment pattern. `program.md` as a "super lightweight skill." Fixed time budget, automatic rollback. | Pattern reference for autoresearch skill |

### Tier D: Discovery Only (Never Auto-Import)

| # | Source | URL | Count | Notes |
|---|--------|-----|-------|-------|
| 1 | VoltAgent/awesome-claude-code-subagents | https://github.com/VoltAgent/awesome-claude-code-subagents | 137 agents | 10 categories. Meta/orchestration category most valuable for pattern study. |
| 2 | 0xfurai/claude-code-subagents | https://github.com/0xfurai/claude-code-subagents | 130+ agents | Technology-specific expert agents. Flat structure. |
| 3 | travisvn/awesome-claude-skills | https://github.com/travisvn/awesome-claude-skills | 9K | Curated awesome-list. Good discovery surface. |
| 4 | Antigravity Awesome Skills | NPM: `antigravity-awesome-skills` | 1,234+ | Largest mega-pack. Role-based bundles. Install via npx. |
| 5 | ComposioHQ/skills | https://github.com/ComposioHQ/skills | — | Integration backbone (850+ SaaS). |
| 6 | K-Dense-AI/claude-scientific-skills | https://github.com/K-Dense-AI/claude-scientific-skills | — | Scientific library skills. |
| 7 | expo/skills | https://github.com/expo/skills | — | Official Expo team skills for React Native. |

---

## 3. Approved Adoption Shortlist

Skills approved for vendoring or local adaptation in Batch 9:

### From Anthropic (Tier A — reference, adapt where needed)
- `skill-creator` → Adapt into local skill for self-improving skill lifecycle
- `mcp-builder` → Adapt into local skill for MCP server development
- `webapp-testing` → Reference for testing workflows
- `doc-coauthoring` → Reference for documentation workflows

### From OpenAI (Tier A — reference via raw links)
- `security-best-practices` → Reference for security skill creation
- `security-threat-model` → Reference for threat modeling workflows
- `gh-fix-ci` → Reference for CI workflows
- `playwright` → Reference for browser testing

### From Community (Tier C — adapt locally, never import raw)
- `taste-skill` → Adapt into `design-taste` (4 sub-skills → 1 unified local skill)
- `autoresearch` → Adapt into `autoresearch` (Karpathy pattern generalized)

---

## 4. Supply Chain Governance

### Vendoring Protocol

For every adopted external skill, record:

| Field | Required |
|-------|----------|
| Source repo | ✅ |
| Upstream path | ✅ |
| Date checked | ✅ |
| Pinned commit SHA | ✅ |
| Local owner/reviewer | ✅ |
| Rationale for adoption | ✅ |
| Security review status | ✅ |
| Last upstream diff check | ✅ |

### Security Policy

- ❌ Never install from opaque ZIP/download mirrors
- ❌ Never import giant community packs wholesale
- ❌ Never let self-improving skills self-activate without human approval
- ✅ Prefer official docs and official GitHub repos
- ✅ Prefer raw GitHub links only after repo/path review
- ✅ Pin commit SHAs before vendoring
- ✅ Review scripts, hooks, shell commands, and network behavior
- ✅ Treat public marketplaces as discovery sources, not trust anchors
- ✅ Run `skill-supply-chain-review` skill before adopting any external skill

### Pinned Commit SHAs (Priority-1 Vendored Skills)

> **Last verified:** 2026-03-18

| Local Skill | Upstream Repo | Pinned SHA | Pin Date | Verification |
|-------------|--------------|------------|----------|--------------|
| `skill-creator` v1.0 | `anthropics/skills` | `b0cbd3df1533b396d281a6886d5132f623393a9c` | 2026-03-18 | Verified |
| `mcp-builder` v1.0 | `anthropics/skills` | `b0cbd3df1533b396d281a6886d5132f623393a9c` | 2026-03-18 | Verified |
| `design-taste` v1.0 | `leonxlnx/taste-skill` | `bd7e147de80749c05b1610cb739d5ea20ff84899` | 2026-03-18 | Verified |
| `autoresearch` v1.0 | `karpathy/autoresearch` (primary) | `32a1460f626e28479d427c033ee485bf5f86875a` | 2026-03-18 | Verified |
| `autoresearch` v1.0 | `uditgoenka/autoresearch` (secondary) | `89aa3324beec399fc11a01c2fe1532b80f3eff42` | 2026-03-18 | Verified |

### Pinned Commit SHAs (Priority-2 Reference-Only — Adoption Shortlist)

> **Last verified:** 2026-03-18
> These skills are not yet locally adapted. SHAs are pinned for provenance tracking ahead of future vendoring.

| Skill | Upstream Repo | Pinned SHA | Pin Date | Status |
|-------|--------------|------------|----------|--------|
| `webapp-testing` | `anthropics/skills` | `b0cbd3df1533b396d281a6886d5132f623393a9c` | 2026-03-18 | Reference-only |
| `frontend-design` | `anthropics/skills` | `b0cbd3df1533b396d281a6886d5132f623393a9c` | 2026-03-18 | Reference-only |
| `doc-coauthoring` | `anthropics/skills` | `b0cbd3df1533b396d281a6886d5132f623393a9c` | 2026-03-18 | Reference-only |
| `security-best-practices` | `openai/codex-universal` | `4b213374574fd025282d7c7118704e6afdaf1864` | 2026-03-18 | Reference-only |
| `security-threat-model` | `openai/codex-universal` | `4b213374574fd025282d7c7118704e6afdaf1864` | 2026-03-18 | Reference-only |
| `playwright` | `openai/codex-universal` | `4b213374574fd025282d7c7118704e6afdaf1864` | 2026-03-18 | Reference-only |
| `gh-fix-ci` | `openai/codex-universal` | `4b213374574fd025282d7c7118704e6afdaf1864` | 2026-03-18 | Reference-only |
| `screenshot` | `openai/codex-universal` | `4b213374574fd025282d7c7118704e6afdaf1864` | 2026-03-18 | Reference-only |
| `doc` | `openai/codex-universal` | `4b213374574fd025282d7c7118704e6afdaf1864` | 2026-03-18 | Reference-only |

### Skill Lifecycle States

```
DISCOVERY → REVIEW → APPROVED → VENDORED → ACTIVE → DEPRECATED
    │          │         │          │          │          │
    │          │         │          │          │          └─ Removed from .claude/skills/
    │          │         │          │          └─ In .claude/skills/, triggers active
    │          │         │          └─ In vendor-skills/, reviewed, not yet active
    │          │         └─ Approved for vendoring, SHA pinned
    │          └─ Under review, security check in progress
    └─ Found via Tier D sources, not yet evaluated
```

---

## 5. Self-Improving Skill Architecture

### Pattern: Retro → Skill Promotion Pipeline

```
Session work → Retro skill runs → Pattern detected (3+ occurrences)
    → Draft new skill (skeleton in .claude/skills/)
    → Link back to this registry
    → Human approval required before activation
    → Skill registered here with lifecycle state
```

### Pattern: Karpathy Autoresearch Loop

```
Define goal + metric + verification command
    → Agent makes one atomic change
    → Git commit → Run verification
    → If improved: keep, log to TSV
    → If regressed: git revert
    → Repeat until interrupted or loop limit reached
```

### Pattern: Skill Creator Meta-Loop (from Anthropic)

```
Intent capture → Skill draft
    → Generate eval test cases
    → Run parallel with-skill / baseline comparisons
    → Grade results → Benchmark
    → Human review via browser viewer
    → Improvement loop → Description optimization
```

---

## 6. Key Findings from 2026 Skills Landscape Research

### Academic Reference
- arXiv:2602.12430v3 — "Agent Skills for Large Language Models: Architecture, Acquisition, Security, and the Path Forward"
- Key finding: **26.1% of community-contributed skills contain vulnerabilities**
- Proposes four-tier gate-based permission model mapping skill provenance to deployment capabilities

### Market Signals (March 2026)
- Anthropic skills ecosystem: 62K+ GitHub stars, 17 official skills
- OpenAI curated: 35 skills, well-structured
- `obra/superpowers`: 40.9K stars — largest battle-tested methodology
- Antigravity mega-pack: 1,234+ skills, 22K stars — largest raw collection
- Karpathy `autoresearch`: 38K stars in <1 week — highest-velocity skill pattern

### Stale References Found and Fixed
- `NORTH_STAR_BOOTSTRAP.md` line 1177: `claude plugin install code-simplifier`
  - Status: **FIXED in Batch 9** — replaced with current skill mechanism reference
- `GLOBAL_IDE_RULES.md` referenced `./SKILLS_REGISTRY.md` but file was missing
  - Status: **FIXED in Batch 9** — this file now exists

---

## 7. Upstream Provenance References

> **NOTE:** These are reference URLs for upstream diff checking and provenance tracking.
> Do NOT curl/download these directly into `.claude/skills/`. All external skills must
> pass through the `skill-supply-chain-review` skill before adoption (see Section 4).

### Anthropic Official (Tier A)

| Local Skill | Adapted From | Upstream URL |
|-------------|-------------|--------------|
| `skill-creator` v1.0 | Anthropic `skill-creator` | `https://raw.githubusercontent.com/anthropics/skills/main/skills/skill-creator/SKILL.md` (SHA: `b0cbd3df`) |
| `mcp-builder` v1.0 | Anthropic `mcp-builder` | `https://raw.githubusercontent.com/anthropics/skills/main/skills/mcp-builder/SKILL.md` (SHA: `b0cbd3df`) |
| — (reference only) | `webapp-testing` | `https://raw.githubusercontent.com/anthropics/skills/main/skills/webapp-testing/SKILL.md` |
| — (reference only) | `frontend-design` | `https://raw.githubusercontent.com/anthropics/skills/main/skills/frontend-design/SKILL.md` |
| — (reference only) | `doc-coauthoring` | `https://raw.githubusercontent.com/anthropics/skills/main/skills/doc-coauthoring/SKILL.md` |

### OpenAI Curated (Tier A)

| Local Skill | Reference From | Upstream URL |
|-------------|---------------|--------------|
| — (reference only) | `security-best-practices` | `https://raw.githubusercontent.com/openai/skills/main/skills/.curated/security-best-practices/SKILL.md` |
| — (reference only) | `security-threat-model` | `https://raw.githubusercontent.com/openai/skills/main/skills/.curated/security-threat-model/SKILL.md` |
| — (reference only) | `playwright` | `https://raw.githubusercontent.com/openai/skills/main/skills/.curated/playwright/SKILL.md` |
| — (reference only) | `gh-fix-ci` | `https://raw.githubusercontent.com/openai/skills/main/skills/.curated/gh-fix-ci/SKILL.md` |
| — (reference only) | `screenshot` | `https://raw.githubusercontent.com/openai/skills/main/skills/.curated/screenshot/SKILL.md` |

### Community Adapted (Tier C)

| Local Skill | Adapted From | Upstream URLs |
|-------------|-------------|---------------|
| `design-taste` v1.0 | `leonxlnx/taste-skill` (4 sub-skills) | `taste-skill/SKILL.md`, `soft-skill/SKILL.md`, `redesign-skill/SKILL.md`, `output-skill/SKILL.md` at `https://github.com/leonxlnx/taste-skill` (SHA: `bd7e147d`) |
| `autoresearch` v1.0 | Karpathy + uditgoenka | `https://github.com/karpathy/autoresearch/blob/master/program.md` (SHA: `32a1460f`) / `https://github.com/uditgoenka/autoresearch` (SHA: `89aa3324`) |

### Upstream Diff Protocol

To check for upstream changes against a local skill:
1. Fetch upstream to a temp file (NOT into `.claude/skills/`)
2. Diff against local version
3. Run `skill-supply-chain-review` if changes are significant
4. Document decision in vendoring record (Section 4)

---

*End of SKILLS_REGISTRY.md v2.2*
