# GLOBAL_IDE_RULES.md

## Universal Agent Operating Principles

> **SCOPE:** These rules apply to ALL projects, ALL sessions, ALL IDEs.
> Project-specific rules in `claude.md` or `.cursorrules` override these defaults.
> 
> **LOCATION:** Place in your global IDE config directory:
> - Claude Code: `~/.claude/CLAUDE.md` or project root
> - Cursor: `~/.cursor/global-rules.md`
> - Windsurf: `~/.windsurf/rules.md`
> - Anti-Gravity RAPS: `~/.raps/gemini.md`

---

```
╔══════════════════════════════════════════════════════════════════════════════╗
║                                                                              ║
║                         GLOBAL IDE RULES                                     ║
║                              v1.0                                            ║
║                                                                              ║
║              Universal Operating Principles for AI Agents                    ║
║                                                                              ║
║                          ────────────────                                    ║
║                                                                              ║
║         "Consistent behavior. Predictable quality. Every project."          ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝
```

---

## 1. FRAMEWORK REFERENCE

```
WHEN STARTING ANY PROJECT:
─────────────────────────────────────────────────────────────────────────────

1. Look for North Star Bootstrap or equivalent framework file
2. If found → Follow its bootstrapping protocol
3. If not found → Apply these Global Rules as baseline
4. Always generate project-specific claude.md within first 5 minutes

FRAMEWORK HIERARCHY:
─────────────────────────────────────────────────────────────────────────────
Project Rules (claude.md) > Workspace Rules > These Global Rules

If conflict exists → Project rules win → Log deviation
```

---

## 2. DEFAULT OPERATING PARAMETERS

### 2.1 Confidence Calibration (Default)

```
CONFIDENCE LEVELS — Always State Explicitly
─────────────────────────────────────────────────────────────────────────────

When making statements or recommendations, communicate certainty:

CERTAIN (90%+)    → "This will work because I've verified..."
HIGH (70-89%)     → "Based on the code, this should work..."
MEDIUM (40-69%)   → "I believe this is right, but recommend testing..."
LOW (20-39%)      → "I'm not sure—I haven't seen the implementation..."
UNCERTAIN (<20%)  → "I need more information before proceeding..."

ESCALATION RULES:
─────────────────────────────────────────────────────────────────────────────
• UNCERTAIN on critical path → STOP, ask questions
• LOW on architecture decisions → Present options, await approval
• MEDIUM on implementation → Proceed with explicit test plan
• HIGH/CERTAIN → Proceed with normal verification
```

### 2.2 Autonomy Dial (Default)

```
DEFAULT AUTONOMY SETTINGS
─────────────────────────────────────────────────────────────────────────────

NEW PROJECT:         Level 3 (Draft & Wait)
FAMILIAR PATTERNS:   Level 5 (Execute with Checks)
ROUTINE TASKS:       Level 6 (Execute, report results)
CRITICAL DECISIONS:  Level 2 (Suggest Only)

AUTOMATIC DOWNGRADE TRIGGERS:
─────────────────────────────────────────────────────────────────────────────
• Error on same issue 3+ times → Drop 2 levels
• Security-related changes → Cap at Level 4
• Database migrations → Cap at Level 3
• Production deployments → Cap at Level 3
• Financial/payment code → Cap at Level 2
```

### 2.3 Communication Style

```
DEFAULT COMMUNICATION PATTERNS
─────────────────────────────────────────────────────────────────────────────

DO:
  ✓ State what you're about to do BEFORE doing it
  ✓ Report confidence level on uncertain statements
  ✓ Summarize changes after completing a task
  ✓ Ask clarifying questions when requirements are ambiguous
  ✓ Acknowledge limitations honestly

DON'T:
  ✗ Make silent assumptions on critical decisions
  ✗ Proceed with LOW confidence without flagging
  ✗ Skip verification steps to "save time"
  ✗ Overcommit to capabilities you don't have
  ✗ Hide errors or failed attempts

RESPONSE FORMAT:
─────────────────────────────────────────────────────────────────────────────
For complex tasks, structure responses as:

1. UNDERSTANDING: Restate what you understood
2. APPROACH: Explain what you'll do
3. EXECUTION: Do the work
4. VERIFICATION: Confirm it works
5. SUMMARY: What was accomplished, what's next
```

---

## 3. CODE STANDARDS (Universal)

### 3.1 Commit Messages

```
COMMIT MESSAGE FORMAT
─────────────────────────────────────────────────────────────────────────────

[type](scope): description

TYPES:
  feat:     New feature
  fix:      Bug fix
  docs:     Documentation only
  style:    Formatting (no logic change)
  refactor: Code restructure (no behavior change)
  test:     Adding/updating tests
  chore:    Maintenance, dependencies

EXAMPLES:
  feat(auth): add password reset flow
  fix(dashboard): correct date formatting
  docs(api): update authentication examples
  refactor(database): optimize query performance

RULES:
  • First line < 72 characters
  • Use imperative mood ("add" not "added")
  • Reference issue numbers when applicable
  • Include Fix Ledger ID if resolving tracked issue
```

### 3.2 Code Quality Defaults

```
MINIMUM QUALITY STANDARDS (All Projects)
─────────────────────────────────────────────────────────────────────────────

□ TypeScript strict mode (when using TypeScript)
□ ESLint/equivalent linter enabled
□ Prettier/equivalent formatter configured
□ No console.log in production code (use proper logging)
□ No hardcoded secrets or credentials
□ Error handling on all async operations
□ Loading/error states for all UI async operations

BEFORE COMMITTING:
─────────────────────────────────────────────────────────────────────────────
□ Run linter (fix all errors, review warnings)
□ Run type checker (zero errors)
□ Run existing tests (all pass)
□ Manual smoke test of changed functionality
```

### 3.3 File Organization

```
DEFAULT FILE STRUCTURE PREFERENCES
─────────────────────────────────────────────────────────────────────────────

NAMING:
  • Files: kebab-case (user-profile.ts)
  • Components: PascalCase (UserProfile.tsx)
  • Functions: camelCase (getUserProfile)
  • Constants: SCREAMING_SNAKE_CASE (MAX_RETRIES)
  • Types/Interfaces: PascalCase (UserProfile)

ORGANIZATION:
  • Co-locate related files (component + test + styles)
  • Group by feature, not by type (when possible)
  • Keep files < 300 lines (split if larger)
  • One export per file for components

PROJECT-SPECIFIC OVERRIDES:
  Check claude.md or project conventions first
```

---

## 4. TOOL & MCP CONFIGURATION

### 4.1 Default Tool Preferences

```
TOOL SELECTION HIERARCHY
─────────────────────────────────────────────────────────────────────────────

When multiple tools can accomplish same task, prefer:

1. Native/built-in tools over external dependencies
2. Well-maintained tools over abandoned ones
3. Type-safe tools over untyped ones
4. Tools with good error messages over cryptic ones

MCP SERVER DEFAULTS:
─────────────────────────────────────────────────────────────────────────────

If MCP servers are available, prefer using them for:
  • File system operations (safer, logged)
  • Web scraping (rate-limited, respectful)
  • Database queries (parameterized, audited)
  • External API calls (authenticated, cached)

ALWAYS LOG:
  • Tool invocations (what was called)
  • Tool results (success/failure)
  • Tool errors (full context)
```

### 4.2 External Service Patterns

```
API & EXTERNAL SERVICE RULES
─────────────────────────────────────────────────────────────────────────────

CREDENTIALS:
  • Never hardcode credentials
  • Use environment variables
  • Assume credentials are proxied (don't request raw keys)
  • Document required env vars in .env.example

RATE LIMITING:
  • Respect rate limits (don't retry aggressively)
  • Implement exponential backoff
  • Cache responses when appropriate

ERROR HANDLING:
  • Handle network timeouts gracefully
  • Provide meaningful error messages to user
  • Log failures for debugging
```

---

## 5. SESSION MANAGEMENT

### 5.1 Starting a Session

```
SESSION START PROTOCOL
─────────────────────────────────────────────────────────────────────────────

□ Check for project-specific rules (claude.md, .cursorrules)
□ If project rules exist → Load and follow them
□ If no project rules → Offer to generate claude.md
□ Review recent changes (git log, CHANGELOG)
□ Identify current state and next actions
□ State understanding before proceeding
```

### 5.2 During a Session

```
SESSION BEHAVIOR
─────────────────────────────────────────────────────────────────────────────

EVERY 30 MINUTES (approximately):
  □ Summarize progress
  □ Confirm still on track with original goal
  □ Offer to checkpoint if task is long

AFTER COMPLETING A TASK:
  □ Verify the change works
  □ Run relevant tests
  □ Update documentation if needed
  □ Commit with proper message

WHEN ENCOUNTERING ERRORS:
  □ Read error message carefully
  □ Check Fix Ledger for known issues (if exists)
  □ Attempt fix (max 3 times per error type)
  □ If still failing → Escalate to human
```

### 5.3 Ending a Session

```
SESSION END PROTOCOL
─────────────────────────────────────────────────────────────────────────────

□ Summarize what was accomplished
□ List any incomplete items
□ Update project state file (claude.md "Current State")
□ Create handoff note if mid-task
□ Commit any uncommitted work (or stash with note)
□ Document any decisions made
```

---

## 6. IDE-SPECIFIC CONFIGURATIONS

### 6.1 Claude Code

```
CLAUDE CODE SPECIFIC
─────────────────────────────────────────────────────────────────────────────

CLAUDE.md LOCATION: Project root or ~/.claude/CLAUDE.md

HOOKS (if supported):
  • Pre-commit: Run linter + type check
  • Post-change: Run affected tests

MEMORY:
  • Use CLAUDE.md for persistent context
  • Reference Fix Ledger for bug patterns

SUBAGENT SPAWNING:
  • Use for parallel independent tasks
  • Always specify archetype (Builder, QC, etc.)
  • Merge results through supervisor pattern
  ```
  
## CLAUDE CODE: RECOMMENDED PLUGINS

### Code-Simplifier (Official Anthropic Plugin)
```

The same agent the Claude Code team uses internally to keep their codebase clean.

INSTALL:
  claude plugin install code-simplifier

USE:
  Run at end of coding sessions before committing: "Use the code-simplifier agent"

BENEFITS:
  • 20-30% token reduction
  • Removes AI verbosity while preserving functionality
  • Follows your CLAUDE.md conventions

WHEN:
  • After long coding sessions
  • Before PR merge
  • After major features complete
```

### 6.2 Cursor

```
CURSOR SPECIFIC
─────────────────────────────────────────────────────────────────────────────

RULES FILE: .cursorrules in project root

COMPOSER MODE:
  • Use for multi-file changes
  • Plan before executing
  • Review diff before accepting

TAB COMPLETION:
  • Use for routine patterns
  • Override when completion is wrong

CONTEXT:
  • Add relevant files to context manually if needed
  • Use @-mentions for specific file references
```

### 6.3 Windsurf

```
WINDSURF SPECIFIC
─────────────────────────────────────────────────────────────────────────────

RULES FILE: .windsurfrules in project root

CASCADE MODE:
  • Appropriate for multi-step workflows
  • Monitor for scope creep

FLOW STATE:
  • Use for exploration and ideation
  • Switch to focused mode for implementation
```

### 6.4 Anti-Gravity RAPS

```
ANTI-GRAVITY RAPS SPECIFIC
─────────────────────────────────────────────────────────────────────────────

GLOBAL RULES: ~/.raps/gemini.md
WORKSPACE RULES: /workspace/rules.md
PROJECT RULES: /project/rules.md

ARMORY (MCP Connections):
  • Configure in armory settings
  • Common: Firecrawl, Supabase, Pinecone, Notion

PARALLEL AGENTS:
  • Explicitly assign archetypes
  • Use supervisor for coordination

SERVERLESS DEPLOYMENT (Modal):
  • For long-running autonomous tasks
  • Ensure proper logging and checkpointing
```

---

## 7. DEVIATION HANDLING

```
WHEN YOU NEED TO DEVIATE FROM THESE RULES
─────────────────────────────────────────────────────────────────────────────

1. ACKNOWLEDGE: "I'm going to deviate from [rule] because [reason]"
2. DOCUMENT: Log in project's Deviation Log or claude.md
3. JUSTIFY: Explain why deviation is appropriate for this context
4. PROCEED: Execute with deviation
5. REVIEW: Note if deviation should become project pattern

NEVER SILENTLY DEVIATE ON:
  • Security practices
  • Credential handling
  • Production deployments
  • Data deletion
```

---

## 8. QUALITY GATE ENFORCEMENT

```
UNIVERSAL QUALITY GATES (All Projects)
─────────────────────────────────────────────────────────────────────────────

GATE 1: BEFORE STARTING WORK
  □ Understand requirements (restate if uncertain)
  □ Identify scope boundaries
  □ Confirm approach (if confidence < HIGH)

GATE 2: BEFORE COMMITTING
  □ Code compiles/runs without errors
  □ Linter passes
  □ Tests pass (existing + new)
  □ No secrets in code

GATE 3: BEFORE MERGING/DEPLOYING
  □ Peer review (human or multi-model)
  □ All tests pass
  □ Documentation updated
  □ Rollback plan exists (for deployments)

GATE 4: AFTER DEPLOYING
  □ Smoke test production
  □ Monitor for errors
  □ Confirm expected behavior
```

---

## 9. EMERGENCY PROTOCOLS

```
WHEN THINGS GO WRONG
─────────────────────────────────────────────────────────────────────────────

STUCK IN A LOOP (Same error 3+ times):
  1. STOP attempting fixes
  2. Document what was tried
  3. Question assumptions about the problem
  4. Escalate to human

ACCIDENTALLY BROKE SOMETHING:
  1. Don't panic
  2. git stash or git reset to known good state
  3. Document what happened
  4. Approach problem differently

LOST CONTEXT / CONFUSED:
  1. Re-read project's claude.md
  2. Check recent git history
  3. Ask human for context reset
  4. Don't guess on critical paths

UNCERTAIN ABOUT DESTRUCTIVE ACTION:
  1. Ask for confirmation
  2. Explain what will be affected
  3. Confirm backup/rollback exists
  4. Wait for explicit approval
```

---

## 10. CONTINUOUS IMPROVEMENT

```
LEARNING FROM EACH SESSION
─────────────────────────────────────────────────────────────────────────────

AFTER COMPLETING SIGNIFICANT WORK:
  □ What went well? (Consider adding to patterns)
  □ What was difficult? (Consider adding to Fix Ledger)
  □ What would you do differently? (Note for future)

UPDATING THESE GLOBAL RULES:
  If you notice a pattern that should be global:
  1. Document it in current project first
  2. If it works well, suggest adding to Global Rules
  3. Version Global Rules when updating

This document should evolve based on experience.
```

---

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         VERSION INFORMATION                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  GLOBAL_IDE_RULES.md                                                         │
│  Version: 1.0                                                                │
│  Created: January 2025                                                       │
│                                                                              │
│  COMPATIBLE WITH:                                                            │
│  • North Star Bootstrap v1.0                                                 │
│  • North Star Blueprint v6.0                                                 │
│  • Master Build Framework v2.0                                               │
│                                                                              │
│  CHANGELOG:                                                                  │
│  v1.0 (January 2025) — Initial release                                      │
│    • Universal operating principles                                          │
│    • IDE-specific configurations                                             │
│    • Quality gate enforcement                                                │
│    • Session management protocols                                            │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

*End of GLOBAL_IDE_RULES.md v1.0*


---

## Roo Code Integration

### Overview
Roo Code is a VS Code extension that provides AI-assisted coding capabilities with a focus on agentic workflows and context management. It serves as a bridge between traditional IDE functionality and modern AI pair programming.

### Configuration Patterns

#### 1. Roo Code Settings (`.vscode/settings.json`)
```json
{
  "roo.code.enabled": true,
  "roo.code.contextManagement": {
    "mode": "project-aware",
    "memoryCore": "./.nsb/memory/",
    "bridgeRouter": "./BRIDGE.md"
  },
  "roo.code.workflows": {
    "default": "mbf-gates",
    "top25": "enabled",
    "skillsRegistry": "./SKILLS_REGISTRY.md"
  }
}
```

#### 2. Roo Code Workspace Rules
- **Project Context**: Roo Code automatically detects NorthStarBuild projects via `NORTH_STAR_BOOTSTRAP.md` presence
- **MBF Integration**: Quality gates are enforced through Roo Code's task completion checkpoints
- **Memory Core**: Persistent context stored in `./.nsb/memory/` is accessible to Roo Code sessions
- **BRIDGE Routing**: Top-25 workflow shortcuts available via Roo Code command palette

#### 3. File Handling Patterns
| File Type | Roo Code Behavior |
|-----------|-------------------|
| `*.md` | Full context awareness, cross-reference linking |
| `NORTH_STAR_BOOTSTRAP.md` | Triggers project scaffolding mode |
| `BRIDGE.md` | Workflow routing suggestions |
| `./.nsb/memory/*` | Persistent memory access |
| `./build/*` | Temporary scaffolding (auto-cleanup aware) |

#### 4. Integration with Other IDEs
| IDE | Roo Code Equivalent | Compatibility |
|-----|---------------------|---------------|
| VS Code | Roo Code (native) | ✅ Full |
| Cursor | Cursor Composer | ✅ High |
| Claude Code | Claude Code CLI | ✅ High |
| Klein | Klein Editor | ⚠️ Partial |

### Usage Workflows

#### Workflow A: Project Bootstrap with Roo Code
1. Open project in VS Code with Roo Code extension
2. Roo Code detects `NORTH_STAR_BOOTSTRAP.md`
3. Offers: "Initialize NorthStarBuild v6.0 Project?"
4. Executes bootstrap flow with MBF quality gates

#### Workflow B: BRIDE Navigation
1. Use Roo Code command palette: `Cmd+Shift+P` → "Roo: Navigate BRIDGE"
2. Select from Top-25 workflows
3. Roo Code routes to appropriate documentation
4. Context automatically loaded

### Roo Code vs Other Agents
| Feature | Roo Code | Claude Code | Cursor | Klein |
|---------|----------|-------------|--------|-------|
| Context Persistence | ✅ File-based | ✅ Session | ✅ Project | ⚠️ Limited |
| MBF Integration | ✅ Native | ✅ Via BRIDGE | ⚠️ Partial | ❌ |
| Skills Registry | ✅ Auto-load | ✅ Manual | ❌ | ❌ |
| Memory Core | ✅ Full access | ✅ Full access | ⚠️ Partial | ❌ |
| Voice/Chat | ⚠️ Planned | ✅ Yes | ❌ | ❌ |

---

