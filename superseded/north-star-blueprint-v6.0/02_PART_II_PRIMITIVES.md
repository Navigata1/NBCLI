# PART II: PRIMITIVE EXECUTION FRAMEWORK

---

## 5. THE SIX CORE PRIMITIVES

> "The difference between amateur and professional AI development is not the tools—it's the orchestration of primitives."

Every operation in software development—whether performed by human or AI—can be decomposed into six fundamental primitives. Mastering these primitives is the foundation of reliable AI-assisted development.

### 5.1 Primitive Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         THE SIX CORE PRIMITIVES                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│     ┌─────────────────────────────────────────────────────────────────┐     │
│     │                         1. STATE                                 │     │
│     │              "What is the current reality?"                      │     │
│     │                                                                  │     │
│     │  The complete, verifiable snapshot of system condition          │     │
│     │  at any point in time. Truth, not assumption.                   │     │
│     └─────────────────────────────────────────────────────────────────┘     │
│                                    │                                         │
│                    ┌───────────────┴───────────────┐                        │
│                    ▼                               ▼                        │
│     ┌──────────────────────────┐   ┌──────────────────────────┐            │
│     │      2. ARTIFACT         │   │       3. CHANGE          │            │
│     │  "What will be created?" │   │   "What will differ?"    │            │
│     │                          │   │                          │            │
│     │  Any output: code, doc,  │   │  The delta between       │            │
│     │  config, data. Named,    │   │  current state and       │            │
│     │  versioned, traceable.   │   │  desired state.          │            │
│     └──────────────────────────┘   └──────────────────────────┘            │
│                    │                               │                        │
│                    └───────────────┬───────────────┘                        │
│                                    ▼                                         │
│     ┌─────────────────────────────────────────────────────────────────┐     │
│     │                         4. CHECK                                 │     │
│     │                  "Did it work correctly?"                        │     │
│     │                                                                  │     │
│     │  Verification that change achieved desired outcome              │     │
│     │  without unintended consequences. Tests, not hopes.             │     │
│     └─────────────────────────────────────────────────────────────────┘     │
│                                    │                                         │
│                    ┌───────────────┴───────────────┐                        │
│                    ▼                               ▼                        │
│     ┌──────────────────────────┐   ┌──────────────────────────┐            │
│     │      5. ROLLBACK         │   │    6. TRACEABILITY       │            │
│     │  "How do we undo this?"  │   │   "What's the history?"  │            │
│     │                          │   │                          │            │
│     │  Safe return to known    │   │  Complete audit trail    │            │
│     │  good state. Always      │   │  of who, what, when,     │            │
│     │  available, tested.      │   │  why. Accountability.    │            │
│     └──────────────────────────┘   └──────────────────────────┘            │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 5.2 Primitive Definitions

#### PRIMITIVE 1: STATE

**Definition:** The complete, verifiable snapshot of system condition at any point in time.

```
STATE COMPONENTS
─────────────────────────────────────────────────────────────────────────────

CODE STATE:
  • Git commit hash (exact version)
  • Branch name
  • Uncommitted changes (if any)
  • Stash contents

DATA STATE:
  • Database schema version
  • Migration status
  • Seed data present/absent
  • Environment (dev/staging/prod)

ENVIRONMENT STATE:
  • Node/Python/runtime versions
  • Dependency versions (lock file)
  • Environment variables set
  • External service availability

APPLICATION STATE:
  • Server running/stopped
  • Current configuration
  • Feature flags active
  • Cache status

USER-VISIBLE STATE:
  • What the user sees in browser/app
  • Console errors present
  • Network requests status
  • Local storage contents
```

**State Verification Commands:**
```bash
# Code state
git status && git log -1 --oneline && git diff --stat

# Dependency state
cat package-lock.json | head -20  # or equivalent

# Environment state
node -v && npm -v && echo $NODE_ENV

# Application state
curl -s localhost:3000/health | jq .
```

**State Anti-Patterns:**
| Anti-Pattern | Problem | Solution |
|--------------|---------|----------|
| "It works on my machine" | Environment mismatch | Docker, lock files |
| "Just pull latest" | Unknown actual state | Specific commit reference |
| "The database has the data" | Unverified assumption | Migration + seed verification |
| "Everything is fine" | No verification | Health check endpoints |

#### PRIMITIVE 2: ARTIFACT

**Definition:** Any output produced by development work—named, versioned, and traceable.

```
ARTIFACT TYPES
─────────────────────────────────────────────────────────────────────────────

CODE ARTIFACTS:
  • Source files (.ts, .tsx, .py, etc.)
  • Configuration files
  • Scripts
  • Database migrations

DOCUMENTATION ARTIFACTS:
  • README files
  • API documentation
  • Architecture Decision Records (ADRs)
  • User guides

DATA ARTIFACTS:
  • Seed data files
  • Test fixtures
  • Export files
  • Backup files

BUILD ARTIFACTS:
  • Compiled bundles
  • Docker images
  • Deployment packages
  • Static assets

VERIFICATION ARTIFACTS:
  • Test results
  • Coverage reports
  • Lighthouse scores
  • Security scan results
```

**Artifact Naming Convention:**
```
[type]-[name]-[version].[extension]

Examples:
  component-user-profile-v2.tsx
  migration-add-user-roles-001.sql
  fixture-test-users-v1.json
  report-lighthouse-20240115.html
```

**Artifact Requirements:**
```
EVERY ARTIFACT MUST HAVE:
─────────────────────────────────────────────────────────────────────────────

□ NAME
  Clear, descriptive identifier
  Following project naming conventions

□ VERSION
  Explicit version or commit reference
  Enables rollback identification

□ LOCATION
  Known path in repository
  Predictable structure

□ PURPOSE
  Why does this artifact exist?
  What problem does it solve?

□ OWNER
  Who created it?
  Who maintains it?

□ DEPENDENCIES
  What does it depend on?
  What depends on it?
```

#### PRIMITIVE 3: CHANGE

**Definition:** The delta between current state and desired state.

```
CHANGE ANATOMY
─────────────────────────────────────────────────────────────────────────────

EVERY CHANGE HAS:

┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│  BEFORE STATE ─────────────────────────────────────► AFTER STATE       │
│       │                                                    │            │
│       │                    CHANGE                          │            │
│       │              ┌─────────────────┐                   │            │
│       └──────────────│                 │───────────────────┘            │
│                      │  • Intent       │                                │
│                      │  • Actions      │                                │
│                      │  • Scope        │                                │
│                      │  • Risk         │                                │
│                      │  • Reversibility│                                │
│                      └─────────────────┘                                │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘

INTENT:        Why is this change being made?
ACTIONS:       What specific operations will occur?
SCOPE:         What files/systems are affected?
RISK:          What could go wrong?
REVERSIBILITY: How easy is it to undo?
```

**Change Classification:**

| Change Type | Scope | Risk | Reversibility | Review Required |
|-------------|-------|------|---------------|-----------------|
| **Trivial** | 1-2 files, < 20 lines | Low | Easy | Self-review |
| **Small** | 3-5 files, < 100 lines | Low-Med | Moderate | Peer review |
| **Medium** | 5-10 files, < 500 lines | Medium | Moderate | Team review |
| **Large** | 10+ files, 500+ lines | High | Difficult | Formal review |
| **Critical** | Core systems, data model | Very High | May be irreversible | Multi-reviewer |

**Change Description Template:**
```markdown
## Change: [Brief Title]

### Intent
[Why this change is being made]

### Scope
- Files affected: [list]
- Systems affected: [list]
- Users affected: [none/some/all]

### Actions
1. [Specific action 1]
2. [Specific action 2]
3. [Specific action 3]

### Risk Assessment
- Risk level: [Low/Medium/High/Critical]
- Potential issues: [list]
- Mitigation: [list]

### Reversibility
- Can be rolled back: [Yes/No/Partial]
- Rollback method: [describe]
- Data implications: [none/minimal/significant]
```

#### PRIMITIVE 4: CHECK

**Definition:** Verification that change achieved desired outcome without unintended consequences.

```
CHECK HIERARCHY
─────────────────────────────────────────────────────────────────────────────

LEVEL 1: SYNTAX CHECK
─────────────────────────────────────────────────────────────────────────────
  • Code compiles/parses
  • No syntax errors
  • Linting passes
  
  TOOLS: TypeScript compiler, ESLint, Prettier
  SPEED: Seconds
  CONFIDENCE: Low (code runs, doesn't mean it's correct)

LEVEL 2: UNIT CHECK
─────────────────────────────────────────────────────────────────────────────
  • Individual functions work
  • Edge cases handled
  • Expected outputs produced
  
  TOOLS: Jest, Vitest, pytest
  SPEED: Seconds to minutes
  CONFIDENCE: Medium (units work, integration unknown)

LEVEL 3: INTEGRATION CHECK
─────────────────────────────────────────────────────────────────────────────
  • Components work together
  • APIs return expected responses
  • Database operations succeed
  
  TOOLS: Supertest, integration test suites
  SPEED: Minutes
  CONFIDENCE: Medium-High (system works, UI unknown)

LEVEL 4: END-TO-END CHECK
─────────────────────────────────────────────────────────────────────────────
  • User flows complete successfully
  • Browser interactions work
  • Full system operates correctly
  
  TOOLS: Playwright, Cypress, Selenium
  SPEED: Minutes to hours
  CONFIDENCE: High (simulates real usage)

LEVEL 5: HUMAN CHECK
─────────────────────────────────────────────────────────────────────────────
  • Manual verification
  • Visual inspection
  • Edge case exploration
  • User acceptance
  
  TOOLS: Human eyes, judgment, intuition
  SPEED: Variable
  CONFIDENCE: Highest (catches what automation misses)
```

**Check Requirements by Change Type:**

| Change Type | Level 1 | Level 2 | Level 3 | Level 4 | Level 5 |
|-------------|---------|---------|---------|---------|---------|
| Trivial | ✅ | ○ | ○ | ○ | ○ |
| Small | ✅ | ✅ | ○ | ○ | ○ |
| Medium | ✅ | ✅ | ✅ | ○ | ○ |
| Large | ✅ | ✅ | ✅ | ✅ | ○ |
| Critical | ✅ | ✅ | ✅ | ✅ | ✅ |

**Legend:** ✅ = Required | ○ = Recommended

#### PRIMITIVE 5: ROLLBACK

**Definition:** Safe return to a known good state when a change fails or causes issues.

```
ROLLBACK READINESS
─────────────────────────────────────────────────────────────────────────────

BEFORE ANY CHANGE, ENSURE:

□ KNOWN GOOD STATE EXISTS
  • Latest stable commit identified
  • Database backup available (if applicable)
  • Configuration backup taken
  • External service states documented

□ ROLLBACK PATH DEFINED
  • Specific steps to reverse change
  • Time estimate for rollback
  • Who can perform rollback
  • Communication plan for users

□ ROLLBACK TESTED (for critical changes)
  • Rollback procedure practiced
  • Recovery time verified
  • Data integrity confirmed
  • Dependencies considered

□ MONITORING READY
  • Error rate alerting active
  • Performance monitoring active
  • User feedback channels open
  • Team available for response
```

**Rollback Types:**

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           ROLLBACK STRATEGIES                                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  GIT ROLLBACK                                                                │
│  ───────────────────────────────────────────────────────────────────────    │
│  git revert <commit>           # Safe, creates new commit                   │
│  git reset --hard <commit>     # Destructive, use with caution              │
│  git checkout <commit> -- file # Single file rollback                       │
│                                                                              │
│  DEPLOYMENT ROLLBACK                                                         │
│  ───────────────────────────────────────────────────────────────────────    │
│  • Blue/green: Switch traffic to previous version                           │
│  • Container: Deploy previous image tag                                      │
│  • Feature flag: Disable new feature                                         │
│  • Canary: Stop rollout, revert canary                                       │
│                                                                              │
│  DATABASE ROLLBACK                                                           │
│  ───────────────────────────────────────────────────────────────────────    │
│  • Migration down: Run reverse migration                                     │
│  • Point-in-time: Restore from backup                                        │
│  • Soft delete: Undelete records                                             │
│  • Compensating transaction: Write correcting data                           │
│                                                                              │
│  STATE ROLLBACK                                                              │
│  ───────────────────────────────────────────────────────────────────────    │
│  • Cache invalidation: Clear and rebuild                                     │
│  • Configuration: Restore previous config                                    │
│  • Environment: Rebuild from known state                                     │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

**Rollback Decision Matrix:**

| Symptom | Severity | Rollback Speed | Rollback? |
|---------|----------|----------------|-----------|
| Error rate > 5% | High | < 5 min | **YES, immediately** |
| Performance degraded > 50% | High | < 5 min | **YES, immediately** |
| Feature doesn't work | Medium | < 15 min | Likely yes |
| Minor visual bug | Low | > 30 min | Probably no, fix forward |
| Single user report | Low | Unknown | Investigate first |

#### PRIMITIVE 6: TRACEABILITY

**Definition:** Complete audit trail of who did what, when, why, and with what outcome.

```
TRACEABILITY CHAIN
─────────────────────────────────────────────────────────────────────────────

Every change should be traceable through:

  REQUIREMENT
      │
      │ "Why was this needed?"
      ▼
  DECISION
      │
      │ "What approach was chosen?"
      ▼
  IMPLEMENTATION
      │
      │ "What code was written?"
      ▼
  VERIFICATION
      │
      │ "How was it tested?"
      ▼
  DEPLOYMENT
      │
      │ "When/where was it released?"
      ▼
  OUTCOME
      │
      │ "What was the result?"
      ▼
  LEARNING
      
      "What did we learn?"
```

**Traceability Requirements:**

```
COMMIT MESSAGES
─────────────────────────────────────────────────────────────────────────────
FORMAT: [type](scope): description

TYPES:
  feat:     New feature
  fix:      Bug fix
  docs:     Documentation
  style:    Formatting (no code change)
  refactor: Code change (no feature/fix)
  test:     Adding tests
  chore:    Maintenance tasks

EXAMPLES:
  feat(auth): add password reset flow
  fix(dashboard): correct date formatting in charts
  docs(api): update authentication examples
  refactor(database): optimize user query performance

─────────────────────────────────────────────────────────────────────────────

PULL REQUESTS
─────────────────────────────────────────────────────────────────────────────
MUST INCLUDE:
  □ Description of change
  □ Link to requirement/issue
  □ Testing performed
  □ Screenshots (if UI change)
  □ Rollback considerations

─────────────────────────────────────────────────────────────────────────────

ADRs (Architecture Decision Records)
─────────────────────────────────────────────────────────────────────────────
FOR SIGNIFICANT DECISIONS:
  □ Context: What situation prompted this decision?
  □ Decision: What was decided?
  □ Alternatives: What other options were considered?
  □ Consequences: What are the implications?
  □ Status: Proposed/Accepted/Deprecated/Superseded
```

### 5.3 Primitive Relationships

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       PRIMITIVE RELATIONSHIPS                                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│                         ┌─────────┐                                          │
│                         │  STATE  │                                          │
│                         └────┬────┘                                          │
│                              │                                               │
│              ┌───────────────┴───────────────┐                              │
│              │                               │                              │
│              ▼                               ▼                              │
│       ┌─────────────┐               ┌─────────────┐                         │
│       │  ARTIFACT   │◄─────────────►│   CHANGE    │                         │
│       │  (Output)   │   produces/   │  (Action)   │                         │
│       │             │   modifies    │             │                         │
│       └──────┬──────┘               └──────┬──────┘                         │
│              │                             │                                │
│              │    ┌─────────────┐          │                                │
│              └───►│    CHECK    │◄─────────┘                                │
│                   │ (Validates) │                                           │
│                   └──────┬──────┘                                           │
│                          │                                                  │
│           ┌──────────────┴──────────────┐                                  │
│           │                             │                                  │
│           ▼                             ▼                                  │
│    ┌─────────────┐               ┌─────────────┐                           │
│    │  ROLLBACK   │               │TRACEABILITY │                           │
│    │ (If needed) │               │  (Always)   │                           │
│    └─────────────┘               └─────────────┘                           │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                              │
│  FLOW:                                                                       │
│  1. STATE is assessed (current reality)                                      │
│  2. CHANGE is planned (desired delta)                                        │
│  3. ARTIFACT is produced (output of change)                                  │
│  4. CHECK validates (did it work?)                                           │
│  5. ROLLBACK available (if check fails)                                      │
│  6. TRACEABILITY records (always, regardless of outcome)                     │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 5.4 Primitive Implementation Checklist

```
BEFORE ANY DEVELOPMENT TASK
─────────────────────────────────────────────────────────────────────────────

□ STATE VERIFIED
  □ Current git status known
  □ Dependencies up to date
  □ Environment confirmed
  □ Application running/testable

□ CHANGE DEFINED
  □ Intent documented
  □ Scope identified
  □ Risk assessed
  □ Reversibility confirmed

□ ARTIFACTS PLANNED
  □ Files to create/modify listed
  □ Naming conventions followed
  □ Location determined
  □ Version strategy set

□ CHECKS PREPARED
  □ Test strategy defined
  □ Acceptance criteria clear
  □ Verification method ready
  □ Review process known

□ ROLLBACK READY
  □ Known good state identified
  □ Rollback steps documented
  □ Time estimate known
  □ Responsible party identified

□ TRACEABILITY SET
  □ Commit message format ready
  □ PR template available
  □ Links to requirements ready
  □ Documentation plan set
```

---

## 6. PRIMITIVE LIFECYCLE & VERIFICATION

### 6.1 The Primitive Execution Cycle

Every task follows this fundamental cycle. No exceptions.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                      PRIMITIVE EXECUTION CYCLE                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│                         ┌─────────────────┐                                  │
│                         │                 │                                  │
│                         │   1. ASSESS     │                                  │
│                         │      STATE      │                                  │
│                         │                 │                                  │
│                         └────────┬────────┘                                  │
│                                  │                                           │
│                                  │ "What's the current reality?"             │
│                                  │                                           │
│                                  ▼                                           │
│                         ┌─────────────────┐                                  │
│                         │                 │                                  │
│                         │   2. DEFINE     │                                  │
│                         │     CHANGE      │                                  │
│                         │                 │                                  │
│                         └────────┬────────┘                                  │
│                                  │                                           │
│                                  │ "What needs to be different?"             │
│                                  │                                           │
│                                  ▼                                           │
│                         ┌─────────────────┐                                  │
│                         │                 │                                  │
│                         │   3. PRODUCE    │                                  │
│                         │    ARTIFACT     │                                  │
│                         │                 │                                  │
│                         └────────┬────────┘                                  │
│                                  │                                           │
│                                  │ "Execute the change"                      │
│                                  │                                           │
│                                  ▼                                           │
│                         ┌─────────────────┐                                  │
│                         │                 │                                  │
│                         │   4. VERIFY     │◄──────────────────┐              │
│                         │     (CHECK)     │                   │              │
│                         │                 │                   │              │
│                         └────────┬────────┘                   │              │
│                                  │                            │              │
│                         ┌────────┴────────┐                   │              │
│                         │                 │                   │              │
│                    PASS │                 │ FAIL              │              │
│                         ▼                 ▼                   │              │
│              ┌─────────────────┐  ┌─────────────────┐         │              │
│              │                 │  │                 │         │              │
│              │   5. COMMIT     │  │   5. ROLLBACK   │─────────┘              │
│              │     & TRACE     │  │   & DIAGNOSE    │  (Return to step 2)    │
│              │                 │  │                 │                        │
│              └────────┬────────┘  └─────────────────┘                        │
│                       │                                                      │
│                       │                                                      │
│                       ▼                                                      │
│              ┌─────────────────┐                                             │
│              │                 │                                             │
│              │   6. COMPLETE   │                                             │
│              │   (New STATE)   │                                             │
│              │                 │                                             │
│              └─────────────────┘                                             │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 6.2 Phase Details

#### Phase 1: Assess State

```
ASSESS STATE PROTOCOL
─────────────────────────────────────────────────────────────────────────────

ACTIONS:
  1. Verify code state
     git status
     git log -3 --oneline
     
  2. Verify environment
     node -v (or appropriate runtime)
     npm list (or dependency check)
     
  3. Verify application
     Run the application
     Open in browser
     Check console for errors
     
  4. Read relevant existing code
     Do NOT assume code structure
     Do NOT guess at implementation
     Actually READ the files

OUTPUT:
  Clear understanding of current state
  No assumptions, only verified facts
  
DURATION: 2-5 minutes (invest this time!)

ANTI-PATTERNS:
  ✗ "I think the code does X" (without reading it)
  ✗ "It should work" (without running it)
  ✗ "Same as last time" (without verifying)
```

#### Phase 2: Define Change

```
DEFINE CHANGE PROTOCOL
─────────────────────────────────────────────────────────────────────────────

ACTIONS:
  1. State the intent clearly
     "I need to [action] so that [outcome]"
     
  2. Identify affected scope
     Files to modify
     Systems impacted
     Users affected
     
  3. Assess risk
     What could go wrong?
     What's the worst case?
     How reversible is this?
     
  4. Plan verification
     How will I know it worked?
     What tests will I run?
     What will I look for?

OUTPUT:
  Written change specification
  (Can be brief for trivial changes)
  
DURATION: Variable (proportional to change size)

ANTI-PATTERNS:
  ✗ "I'll just make some changes" (no plan)
  ✗ "We'll figure it out" (no defined outcome)
  ✗ "It's simple, no need to plan" (famous last words)
```

#### Phase 3: Produce Artifact

```
PRODUCE ARTIFACT PROTOCOL
─────────────────────────────────────────────────────────────────────────────

ACTIONS:
  1. Create/modify code following plan
     Stay within defined scope
     Follow existing patterns
     Maintain consistency
     
  2. Apply incremental changes
     Small commits
     Testable units
     Clear progress
     
  3. Document as you go
     Comments for non-obvious code
     Update README if needed
     Note decisions made
     
  4. Preserve verifiability
     Don't overwrite without backup
     Keep old code commented (temporarily)
     Enable easy comparison

OUTPUT:
  New or modified files
  Ready for verification
  
DURATION: Variable (the actual "work")

ANTI-PATTERNS:
  ✗ One massive change (untestable)
  ✗ Multiple unrelated changes together
  ✗ Changing things "while I'm here"
  ✗ Forgetting to save
```

#### Phase 4: Verify (Check)

```
VERIFY PROTOCOL
─────────────────────────────────────────────────────────────────────────────

ACTIONS:
  1. Run automated checks
     Linting passes?
     Types check?
     Tests pass?
     
  2. Manual verification
     Does it actually work?
     In the browser/app?
     With real interactions?
     
  3. Edge case exploration
     What about empty states?
     What about errors?
     What about slow networks?
     
  4. Regression check
     Did anything else break?
     Run related tests
     Check adjacent functionality

OUTPUT:
  Pass: Ready to commit
  Fail: Return to step 2 with diagnosis
  
DURATION: Proportional to change size

ANTI-PATTERNS:
  ✗ "It compiled, must work" (compilation ≠ correctness)
  ✗ "Tests passed, done" (tests might be incomplete)
  ✗ Skipping manual verification
  ✗ Not checking edge cases
```

#### Phase 5A: Commit & Trace (on Pass)

```
COMMIT PROTOCOL
─────────────────────────────────────────────────────────────────────────────

ACTIONS:
  1. Stage changes
     git add [files]
     Review staged changes
     
  2. Write good commit message
     [type](scope): description
     
     Include:
     - What was done
     - Why it was done
     - Any notable decisions
     
  3. Push and create PR (if applicable)
     Link to issue/requirement
     Include description
     Add screenshots if UI
     
  4. Update documentation
     README if needed
     Changelog entry
     ADR if significant decision

OUTPUT:
  Committed, traceable change
  Ready for review/merge
  
DURATION: 2-5 minutes

ANTI-PATTERNS:
  ✗ "fixed stuff" (useless message)
  ✗ "wip" (no context)
  ✗ Committing without review
  ✗ Skipping documentation updates
```

#### Phase 5B: Rollback & Diagnose (on Fail)

```
ROLLBACK PROTOCOL
─────────────────────────────────────────────────────────────────────────────

ACTIONS:
  1. STOP making more changes
     Don't "try one more thing"
     Don't dig deeper into the hole
     
  2. Return to known good state
     git checkout -- [files]
     git stash (if preserving work)
     Verify application works again
     
  3. Diagnose the failure
     What exactly failed?
     Why did it fail?
     What assumption was wrong?
     
  4. Update approach
     Revise the plan
     Add to Fix Ledger if pattern
     Return to step 2 with new understanding

OUTPUT:
  System back to working state
  Understanding of what went wrong
  Revised approach for next attempt
  
DURATION: Variable (don't rush diagnosis)

ANTI-PATTERNS:
  ✗ "Just push through" (creates more problems)
  ✗ Making changes on top of broken state
  ✗ Not understanding why it failed
  ✗ Blaming external factors without evidence
```

### 6.3 Recursive Verification Pattern

For complex changes, apply verification recursively at multiple levels:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                     RECURSIVE VERIFICATION PATTERN                           │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  FEATURE: User Authentication                                                │
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │ LEVEL 1: Component verification                                      │    │
│  │                                                                      │    │
│  │   ┌──────────────────┐   ┌──────────────────┐   ┌─────────────────┐ │    │
│  │   │ Login Form       │   │ Password Input   │   │ Submit Button   │ │    │
│  │   │ ✓ Unit tests     │   │ ✓ Unit tests     │   │ ✓ Unit tests    │ │    │
│  │   │ ✓ Manual check   │   │ ✓ Manual check   │   │ ✓ Manual check  │ │    │
│  │   └──────────────────┘   └──────────────────┘   └─────────────────┘ │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                    │                                         │
│                                    ▼                                         │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │ LEVEL 2: Integration verification                                    │    │
│  │                                                                      │    │
│  │   ┌──────────────────────────────────────────────────────────────┐  │    │
│  │   │ Login Form + API + Database                                   │  │    │
│  │   │ ✓ Form submits to API correctly                               │  │    │
│  │   │ ✓ API validates and stores correctly                          │  │    │
│  │   │ ✓ Errors propagate correctly                                  │  │    │
│  │   └──────────────────────────────────────────────────────────────┘  │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                    │                                         │
│                                    ▼                                         │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │ LEVEL 3: Flow verification                                           │    │
│  │                                                                      │    │
│  │   ┌──────────────────────────────────────────────────────────────┐  │    │
│  │   │ Complete User Journey                                         │  │    │
│  │   │ ✓ Navigate to login page                                      │  │    │
│  │   │ ✓ Enter credentials                                           │  │    │
│  │   │ ✓ Submit form                                                 │  │    │
│  │   │ ✓ Receive feedback                                            │  │    │
│  │   │ ✓ Redirect to dashboard (success)                             │  │    │
│  │   │ ✓ Show error message (failure)                                │  │    │
│  │   └──────────────────────────────────────────────────────────────┘  │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                    │                                         │
│                                    ▼                                         │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │ LEVEL 4: System verification                                         │    │
│  │                                                                      │    │
│  │   ┌──────────────────────────────────────────────────────────────┐  │    │
│  │   │ Cross-cutting Concerns                                        │  │    │
│  │   │ ✓ Session management works                                    │  │    │
│  │   │ ✓ Protected routes respect auth                               │  │    │
│  │   │ ✓ Logout clears state                                         │  │    │
│  │   │ ✓ Refresh preserves session                                   │  │    │
│  │   │ ✓ Multiple tabs work correctly                                │  │    │
│  │   └──────────────────────────────────────────────────────────────┘  │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  RULE: Each level must pass before moving to the next.                      │
│  RULE: A failure at any level returns to component-level fixes.             │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 7. THE ANTI-BUG-LOOP PRINCIPLE (FIX LEDGER)

### 7.1 The Ilya's Loop Problem

Named for the pattern where AI agents create endless fix loops, this is the #1 productivity killer in AI-assisted development.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          THE ILYA'S LOOP                                     │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  THE DEADLY PATTERN:                                                         │
│                                                                              │
│       ┌──────────────────────────────────────────────────────────────┐      │
│       │                                                              │      │
│       │    "I'll fix bug A"                                          │      │
│       │         │                                                    │      │
│       │         ▼                                                    │      │
│       │    Fix introduced → Creates bug B                            │      │
│       │         │                                                    │      │
│       │         ▼                                                    │      │
│       │    "I'll fix bug B"                                          │      │
│       │         │                                                    │      │
│       │         ▼                                                    │      │
│       │    Fix introduced → Re-creates bug A                         │      │
│       │         │                                                    │      │
│       │         ▼                                                    │      │
│       │    "I'll fix bug A again..."                                 │      │
│       │         │                                                    │      │
│       │         ▼                                                    │      │
│       │    ∞ INFINITE LOOP ∞                                         │      │
│       │                                                              │      │
│       └──────────────────────────────────────────────────────────────┘      │
│                                                                              │
│  WHY IT HAPPENS:                                                             │
│  ─────────────────────────────────────────────────────────────────────────  │
│  1. AI lacks memory of previous fix attempts                                │
│  2. AI treats each bug as independent (misses root cause)                   │
│  3. No record of what was tried and failed                                  │
│  4. AI optimizes for immediate fix, not systemic solution                   │
│  5. Human doesn't notice the loop pattern forming                           │
│                                                                              │
│  THE COST:                                                                   │
│  ─────────────────────────────────────────────────────────────────────────  │
│  • Hours or days of wasted effort                                            │
│  • Frustration and loss of trust in AI                                       │
│  • Codebase churn without progress                                           │
│  • Context exhaustion (token limits)                                         │
│  • Increased technical debt                                                  │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 7.2 The Fix Ledger Solution

The Fix Ledger is a persistent record of what was tried, what worked, what didn't, and why. It breaks the loop by giving AI (and humans) memory.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                            THE FIX LEDGER                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  LOCATION: /docs/fix-ledger.md or embedded in claude.md                     │
│                                                                              │
│  PURPOSE:                                                                    │
│  ─────────────────────────────────────────────────────────────────────────  │
│  1. Record every significant bug encountered                                │
│  2. Document what solutions were attempted                                   │
│  3. Mark what worked vs. what failed                                         │
│  4. Prevent the same failed approach twice                                   │
│  5. Build institutional knowledge of the codebase                            │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                              │
│  WHEN TO ADD AN ENTRY:                                                       │
│  ─────────────────────────────────────────────────────────────────────────  │
│  □ Bug took > 30 minutes to resolve                                          │
│  □ Bug recurred after initial fix                                            │
│  □ Fix was non-obvious                                                       │
│  □ Bug had root cause in different area than symptom                        │
│  □ Multiple approaches were tried                                            │
│  □ Bug likely to be encountered again                                        │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                              │
│  WHEN TO CONSULT:                                                            │
│  ─────────────────────────────────────────────────────────────────────────  │
│  □ Before debugging ANY issue                                                │
│  □ When a fix doesn't work on first try                                      │
│  □ When bug feels familiar                                                   │
│  □ Before asking AI to fix something                                         │
│  □ When context switching back to a feature area                             │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 7.3 Fix Ledger Entry Template

```markdown
## FIX LEDGER

### Entry: [YYYY-MM-DD] [Brief Title]

**Symptom:**
[What the user/developer observed]

**Root Cause:**
[The actual underlying issue]

**Environment:**
[Relevant context: browser, OS, dependencies, etc.]

**Attempted Solutions:**

| # | Approach | Result | Why It Failed/Worked |
|---|----------|--------|---------------------|
| 1 | [First attempt] | ❌ FAILED | [Reason] |
| 2 | [Second attempt] | ❌ FAILED | [Reason] |
| 3 | [Third attempt] | ✅ WORKED | [Why this one worked] |

**Final Solution:**
```
[Code or detailed description of what fixed it]
```

**Prevention:**
[How to prevent this from happening again]

**Related Files:**
- `path/to/file1.ts`
- `path/to/file2.ts`

**Tags:** #authentication #state-management #race-condition

---
```

### 7.4 Fix Ledger Example Entries

```markdown
## FIX LEDGER

---

### Entry: 2024-01-15 Authentication Token Expiry Race Condition

**Symptom:**
Users randomly logged out while actively using the app. Seemed to happen
more frequently during complex operations.

**Root Cause:**
Token refresh was happening asynchronously, but API calls weren't waiting
for refresh to complete. Multiple simultaneous requests could all fail if
token expired during a burst of activity.

**Environment:**
- React 18.2
- Next.js 14.0
- JWT tokens with 15-minute expiry

**Attempted Solutions:**

| # | Approach | Result | Why It Failed/Worked |
|---|----------|--------|---------------------|
| 1 | Extend token expiry to 1 hour | ❌ FAILED | Security concern, didn't fix root cause |
| 2 | Refresh token on every request | ❌ FAILED | Too many refresh calls, rate limited |
| 3 | Queue requests during refresh | ✅ WORKED | Single refresh, queue waits, then all proceed |

**Final Solution:**
```typescript
// Token refresh with request queuing
let refreshPromise: Promise<string> | null = null;

async function getValidToken(): Promise<string> {
  if (isTokenValid()) return getToken();
  
  // If refresh already in progress, wait for it
  if (refreshPromise) return refreshPromise;
  
  // Start refresh and share the promise
  refreshPromise = refreshToken().finally(() => {
    refreshPromise = null;
  });
  
  return refreshPromise;
}
```

**Prevention:**
- All API calls must go through `getValidToken()`
- Token refresh happens at 80% of expiry (proactive)
- Added test for concurrent request scenario

**Related Files:**
- `lib/auth/token-manager.ts`
- `lib/api/client.ts`

**Tags:** #authentication #race-condition #async

---

### Entry: 2024-01-18 CSS Animation Jank on Mobile Safari

**Symptom:**
Card flip animations were choppy on iOS Safari, smooth everywhere else.

**Root Cause:**
Safari's compositor was being triggered unnecessarily on each frame due to
`filter: drop-shadow()` being animated alongside transform.

**Environment:**
- iOS Safari 17
- Tailwind CSS 3.4
- Framer Motion 10.16

**Attempted Solutions:**

| # | Approach | Result | Why It Failed/Worked |
|---|----------|--------|---------------------|
| 1 | Add will-change: transform | ❌ FAILED | Already present, no effect |
| 2 | Use translateZ(0) hack | ❌ FAILED | No improvement |
| 3 | Move shadow to pseudo-element | ✅ WORKED | Shadow on separate layer |

**Final Solution:**
```css
/* Move shadow to non-animated pseudo-element */
.card {
  position: relative;
}

.card::after {
  content: '';
  position: absolute;
  inset: 0;
  box-shadow: 0 10px 40px rgba(0,0,0,0.2);
  border-radius: inherit;
  pointer-events: none;
  /* Shadow doesn't animate, only card transforms */
}
```

**Prevention:**
- Never animate `filter` or `box-shadow` on mobile
- Test all animations on iOS Safari specifically
- Added to design system documentation

**Related Files:**
- `components/ui/card.tsx`
- `styles/animations.css`

**Tags:** #animation #mobile #safari #performance

---
```

### 7.5 The "#" Shortcut for Regression Prevention

When a bug is fixed and added to the Fix Ledger, reference it with "#" in commit messages and code comments. This creates instant searchability.

```
USAGE:
─────────────────────────────────────────────────────────────────────────────

COMMIT MESSAGE:
  fix(auth): prevent token race condition #FL-2024-01-15-auth

CODE COMMENT:
  // #FL-2024-01-15-auth: Queue requests during refresh
  // See: docs/fix-ledger.md

PR DESCRIPTION:
  Fixes issue with random logouts.
  
  Root cause documented in #FL-2024-01-15-auth

SEARCH:
  grep -r "#FL-2024-01" ./         # Find all references
```

### 7.6 Fix Ledger Integration with AI Agents

```
AI AGENT INSTRUCTIONS (Add to claude.md or similar)
─────────────────────────────────────────────────────────────────────────────

BEFORE DEBUGGING ANY ISSUE:
1. Check /docs/fix-ledger.md for similar issues
2. Search for related tags: #[relevant-tag]
3. Review attempted solutions that FAILED

WHEN FIX IS FOUND:
1. ADD entry to Fix Ledger if:
   - Issue took > 30 minutes
   - Multiple approaches tried
   - Root cause was non-obvious
2. Reference Fix Ledger entry in commit message
3. Update related documentation

NEVER:
- Try an approach already marked ❌ FAILED in ledger
- Skip consulting ledger "to save time"
- Implement a fix without checking for prior attempts
```

### 7.7 The Golden Rule of Anti-Bug-Loop

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        THE GOLDEN RULE                                       │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│                                                                              │
│        IF YOU'VE TRIED TO FIX SOMETHING 3 TIMES                             │
│                                                                              │
│                   AND IT'S STILL NOT FIXED                                   │
│                                                                              │
│                         ┌─────────┐                                          │
│                         │  STOP.  │                                          │
│                         └─────────┘                                          │
│                                                                              │
│                  YOU ARE PROBABLY IN A LOOP.                                 │
│                                                                              │
│                                                                              │
│  INSTEAD:                                                                    │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                              │
│  1. Stop fixing                                                              │
│  2. Document what you've tried                                               │
│  3. Question your assumptions about the problem                              │
│  4. Consider that the symptom ≠ root cause                                  │
│  5. Seek a different perspective (human or different AI model)              │
│  6. Return to first principles                                               │
│                                                                              │
│  THE BUG YOU'RE FIXING IS NOT THE BUG YOU THINK IT IS.                      │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 8. REGRESSION DISCIPLINE & SAFETY NETS

### 8.1 The Regression Discipline Matrix

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                      REGRESSION DISCIPLINE MATRIX                            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  WHAT IS A REGRESSION?                                                       │
│  A regression is when something that used to work, stops working.           │
│  This is worse than a bug—it's a betrayal of user trust.                    │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                              │
│  REGRESSION TYPES:                                                           │
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │ FUNCTIONAL REGRESSION                                                │    │
│  │ Feature X worked yesterday, doesn't work today                       │    │
│  │                                                                      │    │
│  │ Prevention:                                                          │    │
│  │ □ Comprehensive test coverage for all features                       │    │
│  │ □ Run full test suite before merge                                   │    │
│  │ □ E2E tests for critical user journeys                              │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │ PERFORMANCE REGRESSION                                               │    │
│  │ Page loaded in 1s yesterday, takes 3s today                          │    │
│  │                                                                      │    │
│  │ Prevention:                                                          │    │
│  │ □ Performance budgets with enforcement                               │    │
│  │ □ Lighthouse CI in pipeline                                          │    │
│  │ □ Bundle size monitoring                                             │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │ VISUAL REGRESSION                                                    │    │
│  │ Button was blue yesterday, is red today (unintentionally)            │    │
│  │                                                                      │    │
│  │ Prevention:                                                          │    │
│  │ □ Visual regression testing (Percy, Chromatic)                       │    │
│  │ □ Design system enforcement                                          │    │
│  │ □ Screenshot comparison in PR                                        │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │ DATA REGRESSION                                                      │    │
│  │ User had 100 items yesterday, has 50 today (data loss)               │    │
│  │                                                                      │    │
│  │ Prevention:                                                          │    │
│  │ □ Database migrations tested in staging                              │    │
│  │ □ Data integrity checks                                              │    │
│  │ □ Point-in-time recovery capability                                  │    │
│  │ □ Backup before every migration                                      │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │ SECURITY REGRESSION                                                  │    │
│  │ Endpoint was protected yesterday, is public today                    │    │
│  │                                                                      │    │
│  │ Prevention:                                                          │    │
│  │ □ Security tests in CI                                               │    │
│  │ □ Auth checks have test coverage                                     │    │
│  │ □ Regular security audits                                            │    │
│  │ □ Middleware ordering verification                                   │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 8.2 Safety Net Types

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           SAFETY NET TYPES                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  LAYER 1: TESTS                                                              │
│  ───────────────────────────────────────────────────────────────────────    │
│  First line of defense. Fast, automated, comprehensive.                     │
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │ Unit Tests        → Individual functions work correctly             │    │
│  │ Integration Tests → Components work together                         │    │
│  │ E2E Tests         → User flows complete successfully                 │    │
│  │ Visual Tests      → UI looks as expected                             │    │
│  │ Performance Tests → System meets speed requirements                  │    │
│  │ Security Tests    → Vulnerabilities not introduced                   │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                              │
│  LAYER 2: METRICS                                                            │
│  ───────────────────────────────────────────────────────────────────────    │
│  Quantitative measurements that alert on deviation.                         │
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │ Error Rates       → Alert if > threshold (e.g., 0.1%)               │    │
│  │ Response Times    → Alert if p95 > threshold (e.g., 500ms)          │    │
│  │ Conversion Rates  → Alert if drops > 10%                             │    │
│  │ User Engagement   → Alert if session duration drops                  │    │
│  │ Resource Usage    → Alert if CPU/memory spikes                       │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                              │
│  LAYER 3: ROLLBACKS                                                          │
│  ───────────────────────────────────────────────────────────────────────    │
│  Fast reversion when problems detected post-deployment.                     │
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │ Feature Flags     → Disable specific features instantly             │    │
│  │ Blue/Green        → Switch traffic to previous version              │    │
│  │ Git Revert        → Revert specific commits                          │    │
│  │ Database PITR     → Restore data to point in time                    │    │
│  │ Cache Invalidation→ Clear stale data                                 │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                              │
│  LAYER 4: GUARDRAILS                                                         │
│  ───────────────────────────────────────────────────────────────────────    │
│  Structural protections that prevent problems from occurring.               │
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │ Type Systems      → Catch type errors at compile time               │    │
│  │ Linting Rules     → Enforce code style and patterns                  │    │
│  │ Schema Validation → Ensure data integrity                            │    │
│  │ API Contracts     → Verify interface compliance                      │    │
│  │ Branch Protection → Require reviews before merge                     │    │
│  │ Rate Limiting     → Prevent system overload                          │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 8.3 Regression Prevention Workflow

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    REGRESSION PREVENTION WORKFLOW                            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  BEFORE WRITING CODE:                                                        │
│  ───────────────────────────────────────────────────────────────────────    │
│  □ Review existing tests in affected area                                   │
│  □ Identify what could break                                                │
│  □ Plan test coverage for new code                                          │
│                                                                              │
│                              │                                               │
│                              ▼                                               │
│                                                                              │
│  WHILE WRITING CODE:                                                         │
│  ───────────────────────────────────────────────────────────────────────    │
│  □ Write tests alongside code (TDD preferred)                               │
│  □ Run tests frequently                                                      │
│  □ Check adjacent functionality manually                                     │
│                                                                              │
│                              │                                               │
│                              ▼                                               │
│                                                                              │
│  BEFORE COMMITTING:                                                          │
│  ───────────────────────────────────────────────────────────────────────    │
│  □ Run full test suite                                                       │
│  □ Check linting/type errors                                                │
│  □ Self-review changes                                                       │
│  □ Run application and verify manually                                       │
│                                                                              │
│                              │                                               │
│                              ▼                                               │
│                                                                              │
│  BEFORE MERGING:                                                             │
│  ───────────────────────────────────────────────────────────────────────    │
│  □ PR reviewed by another person                                            │
│  □ CI pipeline passes                                                        │
│  □ Visual review of changes (screenshots if UI)                             │
│  □ Documentation updated                                                     │
│                                                                              │
│                              │                                               │
│                              ▼                                               │
│                                                                              │
│  AFTER DEPLOYING:                                                            │
│  ───────────────────────────────────────────────────────────────────────    │
│  □ Monitor error rates                                                       │
│  □ Check key metrics                                                         │
│  □ Smoke test critical paths                                                 │
│  □ Be ready to rollback                                                      │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 8.4 When Regression Occurs

```
REGRESSION RESPONSE PROTOCOL
─────────────────────────────────────────────────────────────────────────────

STEP 1: DETECT (Immediate)
─────────────────────────────────────────────────────────────────────────────
  HOW: Monitoring alerts, user reports, automated tests
  
  □ Confirm regression is real (not false alarm)
  □ Identify scope of impact
  □ Determine severity

STEP 2: RESPOND (Within 5 minutes for critical)
─────────────────────────────────────────────────────────────────────────────
  DECISION TREE:
  
  Is users' data at risk?
    YES → Rollback immediately, investigate later
    NO  → Continue assessment
  
  Is core functionality broken?
    YES → Rollback immediately, investigate later
    NO  → Can likely fix forward
  
  Can we fix in < 15 minutes?
    YES → Fix forward with hot patch
    NO  → Rollback, then fix properly

STEP 3: ROLLBACK (If needed)
─────────────────────────────────────────────────────────────────────────────
  □ Execute rollback procedure
  □ Verify system is back to working state
  □ Communicate to affected users
  □ Preserve evidence for investigation

STEP 4: ROOT CAUSE (After stability restored)
─────────────────────────────────────────────────────────────────────────────
  □ What change caused the regression?
  □ Why wasn't it caught by tests?
  □ Why wasn't it caught in review?
  □ What systemic issue allowed this?

STEP 5: PREVENT (Before next deployment)
─────────────────────────────────────────────────────────────────────────────
  □ Add test that would have caught this
  □ Update review checklist if applicable
  □ Add to Fix Ledger
  □ Share learnings with team
```

### 8.5 Regression Prevention Checklist (Pre-Deployment)

```
PRE-DEPLOYMENT REGRESSION CHECK
─────────────────────────────────────────────────────────────────────────────

□ FUNCTIONAL
  □ All automated tests pass
  □ Critical user journeys manually verified
  □ Edge cases tested
  □ Error handling verified

□ PERFORMANCE
  □ Lighthouse score maintained (≥ [PROJECT_THRESHOLD])
  □ Bundle size within budget
  □ API response times acceptable
  □ No new N+1 queries

□ VISUAL
  □ UI matches design specifications
  □ No unintended visual changes
  □ Responsive breakpoints working
  □ Animation performance acceptable

□ DATA
  □ Migrations tested
  □ Backward compatibility maintained
  □ No data loss possible
  □ Rollback procedure verified

□ SECURITY
  □ Auth/authz unchanged or improved
  □ No new vulnerabilities introduced
  □ Sensitive data handling reviewed
  □ Input validation in place

□ DOCUMENTATION
  □ API documentation updated
  □ README updated if needed
  □ Changelog entry added
  □ Breaking changes documented

─────────────────────────────────────────────────────────────────────────────
ALL BOXES MUST BE CHECKED BEFORE DEPLOYMENT
─────────────────────────────────────────────────────────────────────────────
```

---

## PART II SUMMARY

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                   PART II: PRIMITIVE EXECUTION FRAMEWORK                     │
│                           KEY TAKEAWAYS                                      │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  THE SIX PRIMITIVES:                                                         │
│  ─────────────────────────────────────────────────────────────────────────  │
│  1. STATE      → Current verified reality                                   │
│  2. ARTIFACT   → Named, versioned output                                    │
│  3. CHANGE     → Defined delta between states                               │
│  4. CHECK      → Verification of outcome                                    │
│  5. ROLLBACK   → Return to known good state                                 │
│  6. TRACEABILITY → Complete audit trail                                     │
│                                                                              │
│  PRIMITIVE LIFECYCLE:                                                        │
│  ─────────────────────────────────────────────────────────────────────────  │
│  Assess State → Define Change → Produce Artifact → Verify →                 │
│  → Commit (pass) or Rollback (fail) → New State                             │
│                                                                              │
│  THE FIX LEDGER:                                                             │
│  ─────────────────────────────────────────────────────────────────────────  │
│  • Prevents Ilya's Loop (endless bug-fix cycles)                            │
│  • Documents what was tried and why it failed/worked                        │
│  • Builds institutional knowledge                                            │
│  • Must be consulted BEFORE debugging                                        │
│  • Golden Rule: 3 failed attempts = STOP, you're in a loop                  │
│                                                                              │
│  REGRESSION DISCIPLINE:                                                      │
│  ─────────────────────────────────────────────────────────────────────────  │
│  • Types: Functional, Performance, Visual, Data, Security                   │
│  • Safety Nets: Tests → Metrics → Rollbacks → Guardrails                   │
│  • Prevention Workflow: Before/During/After every change                    │
│  • Response Protocol: Detect → Respond → Rollback → Root Cause → Prevent   │
│                                                                              │
│  CORE PRINCIPLES:                                                            │
│  ─────────────────────────────────────────────────────────────────────────  │
│  • Never guess—verify                                                        │
│  • Every change is traceable                                                 │
│  • Rollback is always possible                                               │
│  • Tests catch what humans miss                                              │
│  • Memory (Fix Ledger) breaks loops                                          │
│  • Regressions are worse than bugs                                           │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---


---

## 🔄 PROPAGATED CONTENT FROM PART_1_FOUNDATION.md (v6.0)

> This section contains synchronized content from the Modular 7-part structure.
> Source: `projects/Segment Mods/NSBP5.0 -Segments/PART_1_FOUNDATION.md`

# NORTH STAR BLUEPRINT v6.0 — SEGMENT 1 of 7
## PART_1_FOUNDATION
### Contents: Front Matter (Section 0) + Part I (Sections 1-4) + Part II (Sections 5-8)
### Lines: 1-3819 of original
---
> **SEGMENT NAVIGATION:** This is a development segment. For full Blueprint, merge all 7 parts.
> For BRIDGE routing: Sections 0-8 are in this segment.
---

### Infrastructure vs Tool Mindset (L6)

- **Tools** solve local problems (a command, a library, a prompt).
- **Infrastructure** creates repeatable capability (standards, pipelines, artifacts, monitoring, rollback, ownership).

If something will be used repeatedly, elevate it from “tool” to “infrastructure”:
- version it
- document it
- test it
- observe it
- assign ownership
### Planning Quality = Output Quality (M8)

A core operating principle:
- **Better plans create better outputs.**
- If the goal is unclear, reduce autonomy and switch to **Ask‑User‑Questions** / **Plan Mode**.

Practical rule:
- Any task that would take a senior engineer >30 minutes to do well should be planned explicitly before execution.
# NORTH STAR BLUEPRINT v6.0

## The Comprehensive Development Framework

---

```
╔══════════════════════════════════════════════════════════════════════════════╗
║                                                                              ║
║                         NORTH STAR BLUEPRINT                                 ║
║                              v6.0                                            ║
║                                                                              ║
║                 The Comprehensive Development Framework                      ║
║                                                                              ║
║                          ────────────────                                    ║
║                                                                              ║
║                    "Build with intention. Ship with confidence."             ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝
```

---

## FRAMEWORK ECOSYSTEM NOTICE

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                     PART OF A UNIFIED FRAMEWORK ECOSYSTEM                    │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  This document is ONE component of a three-part system:                     │
│                                                                              │
│  ┌─────────────┐     ┌─────────────────────┐     ┌─────────────────────┐    │
│  │  BRIDGE.md  │────►│  NORTH STAR v6.0    │     │  MASTER BUILD v2.0  │    │
│  │  Navigation │     │  (This Document)    │     │  Technology Matrix  │    │
│  └─────────────┘     │                     │     │                     │    │
│        │             │  HOW to build       │     │  WHAT to build with │    │
│        │             │  • Methodology      │     │  • 60 categories    │    │
│        │             │  • Orchestration    │     │  • Tool options     │    │
│        │             │  • Quality gates    │     │  • Stack selection  │    │
│        └─────────────┴─────────────────────┴─────┴─────────────────────┘    │
│                                                                              │
│  READING ORDER:                                                              │
│  1. BRIDGE.md — Understand how pieces connect, get routing                  │
│  2. NS Section 0 — Bootstrap protocol (you're here)                         │
│  3. Reference NS or MBF on demand via BRIDGE.md routing                     │
│                                                                              │
│  For technology selection questions, consult Master Build Framework v2.0    │
│  For methodology and orchestration, stay in this North Star Blueprint       │
│  For navigation between both, use BRIDGE.md                                 │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## AGENTIC BOOTSTRAP PROTOCOL

> **ATTENTION: AI AGENT / IDE TOOL / CLAUDE CODE**
> 
> If you are an AI system receiving this document alongside a project idea,
> READ THIS SECTION FIRST. It tells you exactly how to set yourself up for success.

---

### 0.1 QUICK-START DIRECTIVE

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                      FIRST-READ INSTRUCTIONS                                 │
│                   For Any Agent Receiving This Blueprint                     │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  YOU HAVE RECEIVED:                                                          │
│  1. This North Star Blueprint v6.0 (comprehensive reference)                │
│  2. A project idea or task to build                                          │
│                                                                              │
│  YOUR FIRST ACTIONS (in order):                                              │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                              │
│  □ 1. SKIM, DON'T CONSUME                                                    │
│       Do NOT attempt to memorize or deeply process all 59 sections.         │
│       Skim the TABLE OF CONTENTS (Section 0.8) to understand structure.     │
│       You will reference sections AS NEEDED during development.             │
│                                                                              │
│  □ 2. GENERATE YOUR claude.md FILE                                           │
│       Use the template in Section 0.2 below.                                 │
│       This becomes your lightweight, persistent guide.                       │
│       The claude.md points BACK to this North Star for details.             │
│                                                                              │
│  □ 3. SET UP DOCUMENTATION SCAFFOLD                                          │
│       Follow the orchestration sequence in Section 0.3.                      │
│       Create minimal docs structure BEFORE writing code.                     │
│                                                                              │
│  □ 4. BEGIN FIRST VERTICAL SLICE                                             │
│       Reference Part III, Section 11 for methodology.                        │
│       Build ONE complete feature before expanding.                           │
│                                                                              │
│  □ 5. RETURN TO NORTH STAR WHEN NEEDED                                       │
│       Questions? Check relevant section.                                     │
│       Uncertain? State confidence level, reference Section 17.               │
│       Need to pause? Use handoff protocol in Section 23.                    │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                              │
│  CRITICAL MINDSET:                                                           │
│  This blueprint is your REFERENCE, not your SCRIPT.                         │
│  Don't front-load everything. Distribute the cognitive load.                │
│  Build incrementally. Return here for guidance. Ship quality.               │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

### 0.2 CLAUDE.MD GENERATION TEMPLATE

When starting any project with this blueprint, **immediately generate** a `claude.md` file in the repository root. This lightweight file becomes your persistent guide that points back to the North Star.

```markdown
# CLAUDE.MD — Project Intelligence File

> **READING ORDER:**
> 1. You're reading this file (project-specific state)
> 2. For navigation between frameworks → see **BRIDGE.md**
> 3. For methodology (HOW) → see **North Star Blueprint v6.0**
> 4. For technology options (WHAT) → see **Master Build Framework v2.0**

> This file provides guidance for AI agents working on this project.
> For comprehensive patterns, reference the documents above via BRIDGE.md routing.

---

## PROJECT IDENTITY

**Name:** [Project Name]
**Tier:** [Space | Sky | Foundation] (see NS Section 2)
**Type:** [Web App | API | CLI | Library | etc.]
**Status:** [Planning | Active Development | Maintenance]

---

## QUICK CONTEXT

[2-3 sentences describing what this project does and why it exists]

---

## NORTH STAR REFERENCE

This project follows the North Star Blueprint v6.0.

**When uncertain, consult these sections:**
- Architecture decisions → NS Part VIII (Sections 37-41)
- Testing approach → NS Part IX (Sections 42-45)
- Security patterns → NS Part X (Sections 46-49)
- Design standards → NS Part VII (Sections 28-36)
- AI orchestration → NS Part IV (Sections 13-19)

**Quality gates for this tier:**
- [List applicable gates from NS Section 3]

---

## CURRENT STATE

**Last Updated:** [Date]
**Current Focus:** [What's being worked on]
**Next Milestone:** [What's coming next]

### Recently Completed
- [Item]

### In Progress
- [Item]

### Blocked / Needs Decision
- [Item]

---

## TECHNICAL DECISIONS

| Decision | Choice | Rationale | NS Reference |
|----------|--------|-----------|--------------|
| Framework | [Choice] | [Why] | Section 38 |
| Database | [Choice] | [Why] | Section 40 |
| Auth | [Choice] | [Why] | Section 47 |

---

## DEVIATION LOG

Any intentional deviations from North Star patterns:

| Pattern | Deviation | Reason | Date |
|---------|-----------|--------|------|
| [NS Pattern] | [What we did instead] | [Why] | [When] |

---

## SESSION PROTOCOL

### Starting a Session
1. Read this claude.md for current state
2. Check CHANGELOG.md for recent history
3. Review any open items in "Blocked / Needs Decision"
4. Proceed with current focus area

### During Development
- Follow vertical slice methodology (NS Section 11)
- State confidence levels on uncertain decisions (NS Section 17)
- Log significant decisions in this file or ADR

### Ending a Session
- Update "Current State" section above
- Add entry to CHANGELOG.md
- If incomplete, create handoff note (NS Section 23)

### When Stuck or Uncertain
1. State the uncertainty clearly
2. Reference relevant NS section
3. Propose options with confidence levels
4. Ask for human input if needed
5. NEVER proceed with low confidence on critical paths

---

## FILE STRUCTURE

```
[Project root structure - update as project evolves]
```

---

## COMMANDS

```bash
# Development
npm run dev          # Start development server

# Testing
npm run test         # Run all tests
npm run test:unit    # Unit tests only
npm run test:e2e     # E2E tests only

# Build & Deploy
npm run build        # Production build
npm run lint         # Lint check
npm run typecheck    # Type check
```

---

## CONTACTS & RESOURCES

- **North Star Blueprint:** [Link or path to NS v6.0]
- **Documentation:** ./docs/
- **Issue Tracker:** [Link]

---

*This file is the entry point. The North Star is the comprehensive guide.*
*When in doubt, return to the North Star.*
```

---

### 0.3 DOCUMENTATION ORCHESTRATION SEQUENCE

Don't create all documentation at once. Follow this sequence to distribute cognitive load:

```
DOCUMENTATION ORCHESTRATION — PHASED APPROACH
─────────────────────────────────────────────────────────────────────────────

PHASE 0: IMMEDIATE (Before any code)
─────────────────────────────────────────────────────────────────────────────
Create these files with minimal content. They'll grow organically.

□ claude.md              — Your persistent AI guide (use template above)
□ README.md              — Project name, one-line description, setup
□ CHANGELOG.md           — Empty template, ready for entries
□ .gitignore             — Standard ignores for your stack

Time: 5-10 minutes


PHASE 1: FIRST SLICE (During first feature)
─────────────────────────────────────────────────────────────────────────────
Add as you make decisions, not before.

□ docs/
│  └── adr/
│      └── 001-initial-architecture.md
□ .env.example           — Document env vars as you add them
□ Update README.md       — Add actual setup instructions

Time: Ongoing during first slice


PHASE 2: STABILIZATION (After 2-3 slices working)
─────────────────────────────────────────────────────────────────────────────
Now you know enough to document properly.

□ docs/ARCHITECTURE.md   — System design overview
□ docs/API.md            — API documentation (if applicable)
□ FIX_LEDGER.md          — Start tracking bug patterns
□ Update claude.md       — Refine with learned context

Time: 1-2 hours, once stable


PHASE 3: MATURITY (Before sharing/shipping)
─────────────────────────────────────────────────────────────────────────────
Polish for others (human or AI) who will work on this.

□ CONTRIBUTING.md        — How to contribute
□ docs/DEPLOYMENT.md     — Deployment procedures
□ docs/RUNBOOKS.md       — Operational procedures
□ Comprehensive README   — Full documentation

Time: As needed for handoff


─────────────────────────────────────────────────────────────────────────────

KEY PRINCIPLE:
Documentation should emerge from development, not precede it.
Write what you know, when you know it.
Update as you learn. Don't front-load speculation.
```

---

### 0.4 LOAD BALANCING STRATEGY

The North Star is comprehensive by design. Here's how to consume it without cognitive overload:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                      NORTH STAR LOAD BALANCING                               │
│                 How to Use 860KB of Guidance Effectively                     │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  TIER 1: ALWAYS LOADED (Core Operating System)                               │
│  ─────────────────────────────────────────────────────────────────────────  │
│  Keep these concepts in active memory:                                       │
│                                                                              │
│  • Quality Gate Mindset (Section 3)                                          │
│  • Vertical Slice Methodology (Section 11)                                   │
│  • Confidence Calibration (Section 17)                                       │
│  • Your project's claude.md file                                            │
│                                                                              │
│  Mental load: Light — These are principles, not details                     │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                              │
│  TIER 2: LOAD ON DEMAND (Reference When Needed)                              │
│  ─────────────────────────────────────────────────────────────────────────  │
│  Consult these sections when you hit the relevant task:                     │
│                                                                              │
│  Starting architecture?    → Sections 37-38                                 │
│  Writing tests?            → Sections 42-45                                 │
│  Implementing auth?        → Sections 47-48                                 │
│  Building UI?              → Sections 28-36                                 │
│  Setting up CI/CD?         → Sections 50-53                                 │
│  Working with AI models?   → Sections 13-19                                 │
│                                                                              │
│  Mental load: Medium — Read section, apply, move on                         │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                              │
│  TIER 3: DEEP REFERENCE (Occasional Deep Dives)                              │
│  ─────────────────────────────────────────────────────────────────────────  │
│  These are comprehensive references for specific needs:                     │
│                                                                              │
│  • Animation Specifications Library (Section 30)                            │
│  • Complete Primitive Definitions (Part II)                                 │
│  • MCP Tool Matrix (Section 24)                                             │
│  • Security Checklist Details (Section 46)                                  │
│                                                                              │
│  Mental load: Heavy — Use as lookup tables, not reading material            │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                              │
│  ANTI-PATTERN: Trying to "learn" the entire blueprint before starting.      │
│  CORRECT: Start building, reference sections as questions arise.            │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

### 0.5 DEVIATION & PAUSE PROTOCOL

When questions, concerns, or uncertainties arise — don't stall. Use this protocol:

```
DEVIATION & PAUSE PROTOCOL
─────────────────────────────────────────────────────────────────────────────

SCENARIO 1: UNCERTAINTY ABOUT APPROACH
─────────────────────────────────────────────────────────────────────────────
When you're unsure how to proceed:

1. STATE the uncertainty clearly
   "I'm uncertain whether to use SSR or CSR for this use case."

2. REFERENCE the relevant NS section
   "NS Section 37 covers architecture selection..."

3. ASSESS your confidence (NS Section 17)
   "My confidence is MEDIUM (60%) that SSR is correct because..."

4. PROPOSE options
   "Option A: SSR — [pros/cons]"
   "Option B: CSR — [pros/cons]"

5. DECIDE or ESCALATE
   - HIGH/MEDIUM confidence → Make the call, document in ADR
   - LOW confidence → Ask human for input before proceeding


SCENARIO 2: DESIRED DEVIATION FROM NORTH STAR
─────────────────────────────────────────────────────────────────────────────
When you want to do something differently than NS recommends:

1. ACKNOWLEDGE the NS pattern
   "NS Section 40 recommends PostgreSQL as default..."

2. STATE the proposed deviation
   "For this project, I believe SQLite is more appropriate."

3. JUSTIFY with reasoning
   "Reasons: Single-user app, no concurrent writes, simpler deployment."

4. DOCUMENT in claude.md Deviation Log
   Log the deviation, reasoning, and date.

5. PROCEED with awareness
   Deviation is fine when intentional and reasoned.


SCENARIO 3: NEED TO PAUSE OR TAKE A BREAK
─────────────────────────────────────────────────────────────────────────────
When a session must end or work must pause:

1. COMPLETE current atomic unit
   Don't stop mid-function or mid-feature if possible.

2. UPDATE claude.md "Current State" section
   - What was just completed
   - What's in progress
   - What's next

3. ADD changelog entry
   Brief note of what happened this session.

4. CREATE handoff note if complex
   Use NS Section 23 Handoff Protocol for detailed state.

5. RETURN via claude.md
   Next session starts by reading claude.md, not re-reading NS.


SCENARIO 4: SOMETHING FEELS WRONG
─────────────────────────────────────────────────────────────────────────────
When instinct says there's a problem:

1. STOP and articulate the concern
   "Something feels off about this approach..."

2. CHECK against NS quality gates (Section 3)
   Are any gates being violated?

3. REVIEW recent decisions
   Did a small decision compound into a problem?

4. CONSIDER rollback
   Is it faster to undo and retry than to fix forward?

5. ASK if truly stuck
   "I've identified [problem]. NS suggests [X]. I've tried [Y]. 
    I need human input on [specific question]."


─────────────────────────────────────────────────────────────────────────────

THE NORTH STAR IS ALWAYS THERE.
When lost, return to it. When uncertain, reference it.
It doesn't demand perfection. It provides direction.
```

---

### 0.6 SESSION HANDOFF FORMAT

For seamless continuity between sessions or agents, use this lightweight handoff format:

```markdown
## SESSION HANDOFF — [Date/Time]

### Session Summary
[2-3 sentences: What was the goal? What was accomplished?]

### Completed This Session
- [Specific item with file/function names]
- [Specific item]

### Current State
- **Working on:** [Specific task]
- **Blocked by:** [Nothing | Specific blocker]
- **Files modified:** [List key files touched]

### Next Actions (Priority Order)
1. [Most important next step]
2. [Second priority]
3. [Third priority]

### Open Questions
- [Question needing human input, if any]

### Context for Next Session
[Any non-obvious context the next session needs to know]
[e.g., "The auth flow is half-implemented — see src/auth/flow.ts line 47"]

### North Star References Used
- Section [X] for [what]
- Section [Y] for [what]
```

**HANDOFF PRINCIPLES:**
- Be specific — "auth flow" not "the feature"
- Include file paths — Future you needs to find things
- Prioritize next actions — Don't leave a list of 20 items
- Note blockers explicitly — Don't bury them in prose
- Reference NS sections used — Shows reasoning trail

---

### 0.7 EMERGENCY REFERENCE CARD

When you need answers fast, find them here:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                      EMERGENCY REFERENCE CARD                                │
│                    Quick Lookup for Common Needs                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  "How do I start?"                                                           │
│  → Read Section 0.1-0.3, generate claude.md, build first slice              │
│                                                                              │
│  "How do the frameworks connect?"                                            │
│  → BRIDGE.md — Navigation layer for NS + MBF ecosystem                      │
│                                                                              │
│  "Which architecture should I use?"                                          │
│  → NS Section 37 (principles) + MBF Categories 1-7 (options)                │
│                                                                              │
│  "Which database should I use?"                                              │
│  → NS Section 40 (patterns) + MBF Categories 15-21 (all options)            │
│                                                                              │
│  "What technology options exist for X?"                                      │
│  → MBF relevant category — exhaustive tool matrices                         │
│                                                                              │
│  "How do I structure code?"                                                  │
│  → Section 39: Code Organization Standards                                  │
│                                                                              │
│  "How do I write tests?"                                                     │
│  → NS Sections 42-44 (philosophy) + MBF Category 46 (tools)                 │
│                                                                              │
│  "How do I handle auth?"                                                     │
│  → NS Section 47 (patterns) + MBF Category 50 (tools)                       │
│                                                                              │
│  "How do I make it look good?"                                               │
│  → Sections 28-36: Design Mastery (start with 28)                           │
│                                                                              │
│  "How do I deploy?"                                                          │
│  → NS Sections 50-53 (strategy) + MBF Categories 43-44 (tools)              │
│                                                                              │
│  "How confident should I be?"                                                │
│  → Section 17: Confidence Calibration Engine                                │
│                                                                              │
│  "How do I hand off work?"                                                   │
│  → Section 23: Agent Handoff Protocols (or 0.6 above)                       │
│                                                                              │
│  "How do I work with AI models?"                                             │
│  → NS Part IV (orchestration) + MBF Categories 29-35 (tools)                │
│                                                                              │
│  "What reasoning loop should I use?"                                         │
│  → MBF Category 31C: RALPH, ReAct, ReWOO, Reflexion, etc.                   │
│                                                                              │
│  "I want to deviate from the blueprint"                                      │
│  → Section 0.5: Deviation Protocol (document and proceed)                   │
│                                                                              │
│  "I'm stuck"                                                                 │
│  → NS Section 0.5 + state problem + ask human if needed                     │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                              │
│  REMEMBER: NS = HOW (methodology) | MBF = WHAT (tools) | BRIDGE = NAVIGATE  │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## DOCUMENT OVERVIEW

### Purpose

The North Star Blueprint serves as the comprehensive reference for building modern software with AI assistance. It codifies:

- Development principles that lead to quality outcomes
- Patterns for AI-human collaboration  
- Technical standards for code, testing, and security
- Design specifications for polished user experiences
- Operational practices for reliable deployment

### Audience

This document is designed for:

1. **AI Agents** (Claude, GPT, etc.) — As a system prompt or reference during development
2. **IDE Tools** (Claude Code, Cursor, etc.) — As persistent context for agentic coding
3. **Human Developers** — As a comprehensive style guide and decision framework
4. **Technical Leads** — As a standard for team alignment

### How to Use This Document

**For AI Agents:**
1. Generate claude.md using Section 0.2 template
2. Reference specific sections as needed during development
3. Use Section 0.4 load balancing to avoid context overload
4. Follow Section 0.5 protocols when uncertain

**For Human Developers:**
1. Read Part I (Foundation) for core philosophy
2. Skim Table of Contents for structure awareness
3. Deep-dive into relevant parts when starting specific work
4. Use Part XIII (Quick Reference) for checklists and decisions

**For Teams:**
1. Adopt as baseline standard
2. Document deviations in project-specific ADRs
3. Evolve through retrospectives and learnings

---

## 0.8 TABLE OF CONTENTS

### Front Matter (Section 0)
- 0.1 Quick-Start Directive
- 0.2 Claude.md Generation Template
- 0.3 Documentation Orchestration Sequence
- 0.4 Load Balancing Strategy
- 0.5 Deviation & Pause Protocol
- 0.6 Session Handoff Format
- 0.7 Emergency Reference Card
- 0.8 Table of Contents

### Part I: Foundation (Sections 1-4)
- 1. Mission & Philosophy
- 2. The Tier System
- 3. Quality Gates
- 4. The Definition of Done

### Part II: Primitives (Sections 5-8)
- 5. Core Communication Contracts
- 6. Execution Primitives
- 7. Verification Checkpoints
- 8. Terminal Conditions

### Part III: Documentation (Sections 9-12)
- 9. Documentation Hierarchy
- 10. Project Superprompt Architecture
- 11. Vertical Slice Methodology
- 12. The Fix Ledger

### Part IV: AI Orchestration (Sections 13-19)
- 13. Model Intelligence Matrix
- 14. Core 4 Primitives
- 15. Tool Hierarchy & Composition
- 16. Context Engineering Protocol
- 17. Confidence Calibration Engine
- 18. Autonomy Dial System
- 19. Multi-Model Consensus Framework

### Part V: Agent Composition (Sections 20-23)
- 20. Agent Memory Architecture
- 21. Skills, Sub-Agents & MCP Integration
- 22. Recursive Verification Protocol
- 23. Agent Handoff Protocols

### Part VI: MCP & Tools (Sections 24-27)
- 24. MCP Power Tools Matrix
- 25. MCP-First Architecture
- 26. Voice-Native Development Workflows
- 27. IDE Routing Strategy

### Part VII: Design Mastery (Sections 28-36)
- 28. Design Philosophy & First Impressions
- 29. Animation Priority Pyramid
- 30. Animation Specifications Library
- 31. Standard Easings, Durations & Motion
- 32. Micro-Interaction Patterns
- 33. Loading States & Feedback Systems
- 34. Enhanced Space Tier Experience
- 35. Accessibility Integration
- 36. Design Terminology Reference

### Part VIII: Code Architecture (Sections 37-41)
- 37. Architecture Selection Matrix
- 38. Technology Stack Selection
- 39. Code Organization Standards
- 40. Database Patterns
- 41. API Design Principles

### Part IX: Testing Framework (Sections 42-45)
- 42. Testing Philosophy
- 43. Test Coverage Strategies
- 44. Testing Patterns by Layer
- 45. Test Infrastructure

### Part X: Security (Sections 46-49)
- 46. Security-First Development
- 47. Authentication Patterns
- 48. Authorization & Access Control
- 49. Data Protection

### Part XI: DevOps & Deployment (Sections 50-53)
- 50. CI/CD Pipeline Architecture
- 51. Environment Management
- 52. Monitoring & Observability
- 53. Deployment Strategies

### Part XII: Future-Proofing (Sections 54-56)
- 54. Blueprint Evolution Protocol
- 55. Technology Radar
- 56. Learning & Adaptation

### Part XIII: Quick Reference (Sections 57-59)
- 57. Master Checklists
- 58. Decision Trees
- 59. Terminology Glossary

### Back Matter
- A. Document Metadata
- B. Section Index
- C. Acknowledgments
- D. Version History
- E. Final Notes

---

## VERSION INFORMATION

```
Version:        6.0
Status:         Active
Released:       January 2025
Classification: Development Reference
Structure:      13 Parts + Front Matter, 59 Sections
```

---

## QUICK START

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                              │
│  NEW PROJECT QUICK START                                                     │
│                                                                              │
│  1. Determine project tier (Space/Sky/Foundation) — Section 2               │
│  2. Generate claude.md file — Section 0.2                                   │
│  3. Set up minimal documentation scaffold — Section 0.3                     │
│  4. Initialize repository with quality gates — Section 3                    │
│  5. Build first vertical slice — Section 11                                 │
│  6. Return to North Star for guidance as needed                             │
│                                                                              │
│  Remember: This blueprint guides. You build.                                │
│  Start simple. Reference often. Ship quality.                               │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---
# PART I: FOUNDATION & PHILOSOPHY

---

## 1. FOUNDER MINDSET PRINCIPLES

> "These systems are only as smart as the context you feed them. Excellence is not a destination, but a continuous journey of refinement."

Before writing a single line of code, before opening any IDE, before engaging any AI agent—we align on non-negotiable mental models. These principles are the foundation upon which everything else is built.

### 2.0 The Hacker Mindset

**Principle:** Understand systems deeply before improving them.

Before any task, run this mental audit:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         THE HACKER'S CHECKLIST                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  1. MAP THE LANDSCAPE                                                        │
│     What exists? What's the current state?                                   │
│     ───────────────────────────────────────────────────────────────────     │
│     → Inventory files, dependencies, active routes, existing patterns        │
│     → Run the application and observe actual behavior                        │
│     → Read existing documentation (README, comments, ADRs)                   │
│     → Identify who has context (team members, git history)                   │
│                                                                              │
│  2. STUDY SOLUTIONS                                                          │
│     How have others solved this? What worked/failed?                         │
│     ───────────────────────────────────────────────────────────────────     │
│     → Research prior art in the codebase (similar features)                  │
│     → Study competitor implementations                                        │
│     → Review open-source solutions in the same domain                        │
│     → Check Fix Ledger for past attempts and learnings                       │
│                                                                              │
│  3. IDENTIFY CONSTRAINTS                                                     │
│     What are the real limitations (vs. assumed)?                             │
│     ───────────────────────────────────────────────────────────────────     │
│     → Technical limits: API rate limits, database capacity, browser support  │
│     → Time constraints: deadline, available hours, dependencies              │
│     → Resource limits: budget, team capacity, infrastructure                 │
│     → Business constraints: compliance, brand guidelines, user expectations  │
│                                                                              │
│  4. FIND LEVERAGE                                                            │
│     Where does 20% of effort yield 80% of impact?                            │
│     ───────────────────────────────────────────────────────────────────     │
│     → Identify the single intervention that moves the needle most            │
│     → Look for existing abstractions you can reuse                           │
│     → Consider what can be automated vs. must be manual                      │
│     → Find the "load-bearing" component that enables everything else         │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

**The MIT Police Car Story:** In 1994, MIT students placed a campus police car on top of the Great Dome. They didn't lift it there—they understood the structure so deeply they could disassemble it, transport the pieces, and reassemble it on the roof without a scratch. That's the level of system understanding we bring to every build.

**Application to AI Development:**
- Don't ask AI to "fix the bug" without first understanding the system architecture
- Don't accept AI output without understanding what it does
- Map the codebase before making changes
- Understand the existing patterns before introducing new ones

### 1.2 The Fire Hose Filter (Three Eyes)

When you look right, you see 50 amazing opportunities. When you look left, 50 existential fires. **Look straight ahead and keep going.**

The Three Eyes Filter prevents distraction and ensures focus on what truly matters.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         THE THREE EYES FILTER                                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  Before ANY task enters your focus, it must pass through three lenses:      │
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  EYE 1: IMPORTANT                                                    │    │
│  │  "Will this matter in 12 months?"                                    │    │
│  │                                                                      │    │
│  │  YES → Proceed to Eye 2                                              │    │
│  │  NO  → DELEGATE or DEFER                                             │    │
│  │        (It's noise, not signal)                                      │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                              │                                               │
│                              ▼                                               │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  EYE 2: IMPACTFUL                                                    │    │
│  │  "Does it move a core metric?"                                       │    │
│  │                                                                      │    │
│  │  YES → Proceed to Eye 3                                              │    │
│  │  NO  → RECONSIDER PRIORITY                                           │    │
│  │        (Important but not urgent)                                    │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                              │                                               │
│                              ▼                                               │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  EYE 3: IRREVERSIBLE                                                 │    │
│  │  "If it breaks, can it be fixed easily?"                             │    │
│  │                                                                      │    │
│  │  REVERSIBLE   → BUILD FAST, ITERATE                                  │    │
│  │                 (Move quickly, mistakes are cheap)                   │    │
│  │  IRREVERSIBLE → EXTRA CAUTION REQUIRED                               │    │
│  │                 (Slow down, get it right)                            │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────  │
│  RULE: Only proceed with full commitment if 2+ of 3 eyes pass.              │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

**Three Eyes Decision Matrix:**

| Important | Impactful | Reversibility | Action |
|-----------|-----------|---------------|--------|
| ✅ | ✅ | Irreversible | **FULL COMMITMENT** — High stakes, high value. Plan carefully, execute deliberately. |
| ✅ | ✅ | Reversible | **EXECUTE QUICKLY** — High value, low risk. Move fast, iterate. |
| ✅ | ❌ | Any | **DELEGATE** — Matters but not urgent. Assign or schedule for later. |
| ❌ | ✅ | Any | **QUESTION** — Why impactful if not important? Revisit assumptions. |
| ❌ | ❌ | Any | **ELIMINATE** — Remove from backlog entirely. |

**Practical Examples:**

| Task | Important? | Impactful? | Reversible? | Verdict |
|------|------------|------------|-------------|---------|
| Redesign onboarding flow | Yes (retention) | Yes (conversion) | Yes | Execute quickly |
| Choose database technology | Yes (architecture) | Yes (performance) | No | Full commitment |
| Add dark mode | Maybe | Low | Yes | Delegate/defer |
| Fix typo in marketing | No | No | Yes | Eliminate (automate) |
| Security vulnerability | Yes | Yes | No | Full commitment + urgent |

### 1.3 First Principles Protocol

When stuck on any problem, resist the urge to "think your way out." Decompose and test.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                      FIRST PRINCIPLES BREAKDOWN                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  STEP 1: CONSTRAIN THE PROBLEM                                               │
│  ───────────────────────────────────────────────────────────────────────    │
│  Write the problem in 2 lines. No more.                                      │
│  If you can't, you don't understand it yet.                                  │
│                                                                              │
│  Example:                                                                    │
│  "Users are abandoning checkout. Cart abandonment rate is 78%                │
│   vs. industry average of 70%."                                              │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                              │
│  STEP 2: DRAW THREE COLUMNS                                                  │
│  ───────────────────────────────────────────────────────────────────────    │
│                                                                              │
│  ┌────────────────────┬────────────────────┬────────────────────┐           │
│  │       FACTS        │    ASSUMPTIONS     │     NEXT TEST      │           │
│  │   (What I KNOW)    │  (What I BELIEVE)  │  (What I'll VERIFY)│           │
│  ├────────────────────┼────────────────────┼────────────────────┤           │
│  │                    │                    │                    │           │
│  │ • Verified data    │ • "Users want X"   │ • ONE action       │           │
│  │ • Measured         │ • "The problem     │ • Completable      │           │
│  │   observations     │   is Y"            │   THIS WEEK        │           │
│  │ • Reproducible     │ • "If we do Z,     │ • Has measurable   │           │
│  │   behaviors        │   then..."         │   outcome          │           │
│  │ • Source-backed    │ • Untested         │ • Will prove or    │           │
│  │   claims           │   hypotheses       │   disprove belief  │           │
│  │                    │                    │                    │           │
│  └────────────────────┴────────────────────┴────────────────────┘           │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                              │
│  STEP 3: PICK ONE TEST. RUN IT THIS WEEK.                                   │
│  ───────────────────────────────────────────────────────────────────────    │
│  Do not "think" your way out. Test your way out.                            │
│                                                                              │
│  The test should:                                                            │
│  • Be completable in < 5 days                                                │
│  • Have a clear success/failure criterion                                    │
│  • Challenge your most critical assumption                                   │
│  • Generate learning regardless of outcome                                   │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

**First Principles Template for AI Assistance:**

```markdown
## FIRST PRINCIPLES ANALYSIS

### Problem Statement (2 lines max)
[Concise problem description]

### Facts (Verified)
- [Fact 1 - Source: ___]
- [Fact 2 - Source: ___]
- [Fact 3 - Source: ___]

### Assumptions (Unverified)
- [Assumption 1 - Confidence: Low/Med/High]
- [Assumption 2 - Confidence: Low/Med/High]
- [Assumption 3 - Confidence: Low/Med/High]

### Critical Assumption
[The one assumption that, if wrong, changes everything]

### Next Test
- **Action:** [Specific action to take]
- **Timeline:** [Complete by date]
- **Success Criterion:** [How you'll know if it worked]
- **Learning if fails:** [What you'll know if it doesn't work]
```

### 1.4 MVP Velocity Philosophy

> "Nothing ever works the first time."

Your advantage is not foresight—it is **iteration speed without regressions**.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         MVP VELOCITY CYCLE                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│                         ┌─────────────────┐                                  │
│                         │                 │                                  │
│                         │    1. BUILD     │                                  │
│                         │                 │                                  │
│                         │  The smallest   │                                  │
│                         │  version that   │                                  │
│                         │  proves/tests   │                                  │
│                         │  something      │                                  │
│                         │                 │                                  │
│                         └────────┬────────┘                                  │
│                                  │                                           │
│            ┌─────────────────────┼─────────────────────┐                    │
│            │                     │                     │                    │
│            │                     ▼                     │                    │
│            │           ┌─────────────────┐             │                    │
│   ┌────────┴────────┐  │                 │  ┌─────────┴────────┐            │
│   │                 │  │    2. SHIP      │  │                  │            │
│   │   4. REBUILD    │  │                 │  │   (Alternative)  │            │
│   │                 │  │  Get it in      │  │                  │            │
│   │  Based on what  │  │  someone's      │  │   If blocked:    │            │
│   │  you learned    │  │  hands THIS     │  │   Ship to self   │            │
│   │                 │  │  WEEK           │  │   (dogfood)      │            │
│   │                 │  │                 │  │                  │            │
│   └────────┬────────┘  └────────┬────────┘  └──────────────────┘            │
│            │                    │                                            │
│            │                    ▼                                            │
│            │           ┌─────────────────┐                                   │
│            │           │                 │                                   │
│            │           │    3. LEARN     │                                   │
│            │           │                 │                                   │
│            └───────────┤  One user       │                                   │
│                        │  One piece of   │                                   │
│                        │  feedback       │                                   │
│                        │  One honest     │                                   │
│                        │  review         │                                   │
│                        │                 │                                   │
│                        └─────────────────┘                                   │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────  │
│  CADENCE: Complete this cycle in ONE WEEK or less                           │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

**The Week Rule:** If you can't get a testable version in front of someone within one week, your scope is too large. Cut scope, not corners.

**Scope Cutting Strategies:**

| Instead of... | Try... |
|---------------|--------|
| Full user authentication | Magic link only |
| All CRUD operations | Create + Read only |
| Responsive design | Desktop only |
| Full design system | One component |
| Multi-user | Single-user |
| API integration | Mock data |
| Production deployment | Local demo |

**The Quality Trap:**
- "We need to get it right before shipping" → Ship sooner, iterate
- "Users won't understand this version" → Users provide clarity you can't imagine
- "It's embarrassing to show this" → Embarrassment is data

### 1.5 Collaboration Multiplier

You cannot build this alone. The impostor syndrome you feel? Research shows it makes better leaders because:
- You listen more
- You ask better questions  
- You collaborate more openly

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        COLLABORATION MULTIPLIER                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  THE LEVERAGE STACK                                                          │
│  ───────────────────────────────────────────────────────────────────────    │
│                                                                              │
│  LEVERAGE TYPE          MULT.    BEST FOR                                   │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                              │
│  AI Agents              10-50x   • Execution of defined tasks               │
│  [PRIMARY_MODEL]                 • Analysis and synthesis                    │
│  [SECONDARY_MODEL]               • Repetitive operations                     │
│  [SPECIALIZED_MODEL]             • Draft generation                          │
│                                  • Code generation                           │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                              │
│  Tools & MCPs           5-20x    • System integration                        │
│  [FILE_SYSTEM_MCP]               • Data access                               │
│  [DATABASE_MCP]                  • Automation pipelines                      │
│  [BROWSER_MCP]                   • Testing infrastructure                    │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                              │
│  Community              2-10x    • Knowledge sharing                         │
│                                  • Problem solving                           │
│                                  • Accountability                            │
│                                  • Inspiration                               │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                              │
│  Team (Contractors/     2-5x     • Specialized skills                        │
│   Partners)                      • Parallel capacity                         │
│                                  • Different perspectives                    │
│                                  • Coverage                                  │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────  │
│  COMBINED POTENTIAL: 200-5000x solo developer capacity                      │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

**Collaboration Anti-Patterns:**

| Anti-Pattern | Problem | Solution |
|--------------|---------|----------|
| Hero mode | Burnout, bottleneck | Delegate, document |
| Over-collaboration | Slow decisions | Clear ownership |
| Under-communication | Duplicated work | Daily standups |
| Assumption of knowledge | Gaps, errors | Explicit handoffs |

### 1.6 The Codebase Singularity Vision

> "There is an agentic layer that could exist inside your codebase so powerful that your codebase runs itself."

The goal is to reach the **Codebase Singularity**—the moment when:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                      THE CODEBASE SINGULARITY                                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  DEFINITION:                                                                 │
│  The state where AI agents can operate a codebase more reliably              │
│  than manual human processes.                                                │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                              │
│  INDICATORS OF SINGULARITY:                                                  │
│                                                                              │
│  □ Agents can run the codebase better than any single human                 │
│    → Faster bug detection                                                    │
│    → More consistent code style                                              │
│    → Better test coverage                                                    │
│                                                                              │
│  □ Nothing ships to production without agent verification                   │
│    → Automated code review                                                   │
│    → Automated test generation                                               │
│    → Automated security scanning                                             │
│                                                                              │
│  □ Trust in agents exceeds trust in manual processes                        │
│    → Agent-verified changes ship faster                                      │
│    → Manual-only changes require extra review                                │
│    → Agents catch what humans miss                                           │
│                                                                              │
│  □ The agentic layer becomes the primary development interface              │
│    → Natural language → working code                                         │
│    → Voice → deployed feature                                                │
│    → Intent → implementation                                                 │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                              │
│  PATH TO SINGULARITY:                                                        │
│                                                                              │
│  Level 1: AI assists with individual tasks                                   │
│           (Most projects today)                                              │
│                                                                              │
│  Level 2: AI handles routine operations autonomously                         │
│           (Testing, formatting, simple bug fixes)                            │
│                                                                              │
│  Level 3: AI manages complex workflows with human oversight                  │
│           (Feature implementation, refactoring, deployments)                 │
│                                                                              │
│  Level 4: AI operates the codebase with human direction                      │
│           (Human: "Build feature X", Agent: handles everything)              │
│                                                                              │
│  Level 5: SINGULARITY                                                        │
│           AI suggests improvements, humans approve                           │
│           (Human: reviews and guides, Agent: proposes and executes)          │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

This is not science fiction. This is the trajectory. Every section of this blueprint moves toward this reality.

### 1.7 Planning Quality = Output Quality

> "If your plan sucks, you're just donating money to Anthropic."

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    PLANNING QUALITY PRINCIPLE                                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  THE CORE 4 FRAMEWORK                                                        │
│  ─────────────────────────────────────────────────────────────────────────  │
│  Quality output requires quality in four dimensions:                         │
│                                                                              │
│  DIMENSION      │ QUESTION                      │ IMPACT                    │
│  ───────────────┼───────────────────────────────┼───────────────────────────│
│  Context        │ Is the right info loaded?     │ Garbage in, garbage out   │
│  Model          │ Is the right model selected?  │ Capability matching       │
│  Prompt         │ Is the instruction clear?     │ Ambiguity = hallucination │
│  Tools          │ Are right tools available?    │ Capability gaps = failure │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                              │
│  THE PLANNING INVESTMENT RULE                                                │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                              │
│  PLANNING TIME   │ EXECUTION QUALITY │ COST EFFICIENCY                      │
│  ────────────────┼───────────────────┼─────────────────────────────────────  │
│  < 5 minutes     │ Poor              │ Token burn (wasted spend)            │
│  15-30 minutes   │ Good              │ Efficient                            │
│  30-60 minutes   │ Excellent         │ Optimal ROI                          │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                              │
│  WHY THIS MATTERS                                                            │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                              │
│  Time spent planning:                                                        │
│  • Reduces iteration loops                                                   │
│  • Catches scope creep early                                                 │
│  • Identifies missing context before execution                               │
│  • Aligns expectations with capabilities                                     │
│                                                                              │
│  Time NOT spent planning:                                                    │
│  • Burns tokens on wrong approaches                                          │
│  • Creates rework cycles                                                     │
│  • Leads to "close but not right" outputs                                    │
│  • Frustrates both user and agent                                            │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                              │
│  QUALITY GATES                                                               │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                              │
│  □ All four dimensions (Context, Model, Prompt, Tools) addressed             │
│  □ Plan reviewed before execution begins                                     │
│  □ Confidence level stated for plan completeness                             │
│  □ Ambiguities surfaced, not assumed                                         │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

**Cross-Reference:** NS Section 0.1 (Quick-Start Directive)


### 1.8 Infrastructure vs Tool Mindset

> "Tools solve problems. Infrastructure creates capabilities."

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                  INFRASTRUCTURE VS TOOL DISTINCTION                          │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  THE 30/300 RULE                                                             │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                              │
│  TOOL: 30% better than doing it yourself                                    │
│  • Point solution to specific problem                                        │
│  • Value depletes as problem changes                                         │
│  • Short-term productivity gain                                              │
│                                                                              │
│  INFRASTRUCTURE: 300% (3x) productivity multiplier                          │
│  • Platform for solving many problems                                        │
│  • Value compounds as you build more                                         │
│  • Long-term capability investment                                           │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                              │
│  MINDSET SHIFT                                                               │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                              │
│  TOOL MINDSET               │ INFRASTRUCTURE MINDSET                        │
│  ───────────────────────────┼─────────────────────────────────────────────  │
│  "What tool solves this?"   │ "What capability do I need?"                  │
│  Point solutions            │ Platform thinking                              │
│  Buy/build for one problem  │ Build once, use many                          │
│  Short-term fix             │ Long-term investment                           │
│  Vendor lock-in acceptable  │ Composability required                        │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                              │
│  THIS FRAMEWORK IS INFRASTRUCTURE                                            │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                              │
│  • It does not solve one problem                                             │
│  • It provides capability for solving many problems                          │
│  • Investment pays off across projects                                       │
│  • Value compounds with each use                                             │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

**Cross-Reference:** MBF Category 14 (Platform Engineering)

---

## 2. CORE IDENTITY & OPERATING SYSTEM CONCEPT

### 2.1 The "Category of One" Standard

We do not build "MVP" in the traditional sense of "Minimum Viable Product." We build **"Minimum Valuable Polished"** products.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    THE "CATEGORY OF ONE" STANDARD                            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  CATEGORY OF ONE = The only option in your category                         │
│                    Not the best of many, but the only one that matters      │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                              │
│  AESTHETIC STANDARD                                                          │
│  ───────────────────────────────────────────────────────────────────────    │
│  • High-end, "Reference Grade" quality                                       │
│    → Would this look at home on Apple's website?                            │
│    → Would a designer be proud to show this in their portfolio?             │
│  • First impressions that create immediate trust                             │
│    → 3-second test: User knows this is quality                               │
│    → No "beta" or "early access" excuses for poor design                    │
│  • Design language that communicates care and competence                     │
│    → Consistent spacing, typography, color                                   │
│    → Animation that enhances, never distracts                                │
│  • Every pixel intentional                                                   │
│    → No default styles                                                       │
│    → No unexplained elements                                                 │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                              │
│  PERFORMANCE STANDARD                                                        │
│  ───────────────────────────────────────────────────────────────────────    │
│  • Snappy, optimistic UI updates                                             │
│    → UI responds before server confirms                                      │
│    → Rollback gracefully on failure                                          │
│  • Sub-100ms response feel for interactions                                  │
│    → Button clicks: immediate visual feedback                                │
│    → Form submissions: instant loading state                                 │
│  • Graceful degradation under load                                           │
│    → Skeleton loaders, not blank screens                                     │
│    → Partial content, not all-or-nothing                                     │
│  • Loading states that inform, never frustrate                               │
│    → Progress indicators for long operations                                 │
│    → Cancel options for very long operations                                 │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                              │
│  STABILITY STANDARD                                                          │
│  ───────────────────────────────────────────────────────────────────────    │
│  • Rock-solid primitives                                                     │
│    → Core operations never fail silently                                     │
│    → Data integrity guaranteed                                               │
│  • Zero-regression deployment philosophy                                     │
│    → New features don't break old ones                                       │
│    → Rollback always available                                               │
│  • Predictable behavior across all edge cases                                │
│    → Empty states handled                                                    │
│    → Error states designed                                                   │
│    → Loading states smooth                                                   │
│  • Recovery paths for every failure mode                                     │
│    → User can always recover from errors                                     │
│    → Data never lost                                                         │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

**The Category of One Test:**

| Question | Passing Answer |
|----------|----------------|
| Would a user pay 2x your competitor's price for this experience? | "Yes, and they'd feel good about it" |
| Would they actively recommend it without being asked? | "Yes, they'd brag about using it" |
| Would they feel proud to show it to others? | "Yes, it reflects well on them" |

If any answer is "no," the work is not complete.

### 2.2 The Operating System Concept

This Blueprint is not just a document; it is the **Operating System** for AI-assisted development. When an AI agent reads this document, it "boots up" into a specific mindset. It is a shared context between Human Architect and AI Builder.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                     THE OPERATING SYSTEM CONCEPT                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  TRADITIONAL DEVELOPMENT:                                                    │
│  ───────────────────────────────────────────────────────────────────────    │
│                                                                              │
│  Human → writes code → tests → deploys                                       │
│          │                                                                   │
│          └──► Single brain, limited context, sequential work                │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                              │
│  NORTH STAR DEVELOPMENT:                                                     │
│  ───────────────────────────────────────────────────────────────────────    │
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                    NORTH STAR BLUEPRINT (OS)                         │    │
│  │                                                                      │    │
│  │  ┌─────────────────────────────────────────────────────────────┐    │    │
│  │  │                    SHARED CONTEXT                            │    │    │
│  │  │                                                              │    │    │
│  │  │  • Philosophy & principles                                   │    │    │
│  │  │  • Quality standards                                         │    │    │
│  │  │  • Design patterns                                           │    │    │
│  │  │  • Technical decisions                                       │    │    │
│  │  │  • Project-specific rules (via Superprompt)                  │    │    │
│  │  │                                                              │    │    │
│  │  └─────────────────────────────────────────────────────────────┘    │    │
│  │                           │                                          │    │
│  │         ┌─────────────────┴─────────────────┐                       │    │
│  │         │                                   │                       │    │
│  │         ▼                                   ▼                       │    │
│  │  ┌─────────────┐                     ┌─────────────┐                │    │
│  │  │   HUMAN     │ ◄───────────────────►    AI       │                │    │
│  │  │  ARCHITECT  │      Aligned by      │  BUILDER   │                │    │
│  │  │             │      shared OS       │            │                │    │
│  │  │  • Intent   │                      │  • Execute │                │    │
│  │  │  • Review   │                      │  • Draft   │                │    │
│  │  │  • Guide    │                      │  • Test    │                │    │
│  │  │  • Decide   │                      │  • Iterate │                │    │
│  │  └─────────────┘                     └─────────────┘                │    │
│  │         │                                   │                       │    │
│  │         └─────────────────┬─────────────────┘                       │    │
│  │                           │                                          │    │
│  │                           ▼                                          │    │
│  │              ┌─────────────────────────┐                             │    │
│  │              │   UNIFIED OUTPUT        │                             │    │
│  │              │                         │                             │    │
│  │              │  • Code + Tests         │                             │    │
│  │              │  • Documentation        │                             │    │
│  │              │  • Verification         │                             │    │
│  │              │  • Deployment artifacts │                             │    │
│  │              └─────────────────────────┘                             │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

**Key Implication:** When you share this Blueprint with an AI agent, you are not "prompting"—you are **installing an operating system** that governs all subsequent interactions.

**OS Boot Sequence:**
1. Agent reads Blueprint → Installs philosophy and principles
2. Agent reads Superprompt → Installs project-specific configuration
3. Agent reads current context → Understands state
4. Agent is ready → Operating under unified mental model

### 2.3 The Experience Architect Mindset

You are not a coder using AI. You are an **Experience Architect** commanding an ensemble of specialized intelligences.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       EXPERIENCE ARCHITECT TRIAD                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│                    ┌─────────────────────────┐                               │
│                    │      ORCHESTRATOR       │                               │
│                    │                         │                               │
│                    │  Commands AI systems    │                               │
│                    │  Manages workflows      │                               │
│                    │  Coordinates agents     │                               │
│                    │  Maintains coherence    │                               │
│                    │  Ensures quality        │                               │
│                    │                         │                               │
│                    └───────────┬─────────────┘                               │
│                                │                                             │
│                   ┌────────────┴────────────┐                                │
│                   │                         │                                │
│                   ▼                         ▼                                │
│    ┌─────────────────────────┐  ┌─────────────────────────┐                  │
│    │     DESIGN MASTER       │  │    EMOTION CONNECTOR    │                  │
│    │                         │  │                         │                  │
│    │  Visual language        │  │  Understands user needs │                  │
│    │  Motion & animation     │  │  Identifies pain points │                  │
│    │  Aesthetics             │  │  Maps aspirations       │                  │
│    │  Consistency            │  │  Creates belonging      │                  │
│    │  First impressions      │  │  Builds trust           │                  │
│    │                         │  │                         │                  │
│    └───────────┬─────────────┘  └─────────────┬───────────┘                  │
│                │                              │                              │
│                └──────────────┬───────────────┘                              │
│                               │                                              │
│                               ▼                                              │
│                ┌───────────────────────────────┐                             │
│                │    EXPERIENCES THAT MATTER    │                             │
│                │       TO HUMAN BEINGS         │                             │
│                │                               │                             │
│                │  Not just features            │                             │
│                │  Not just functionality       │                             │
│                │  Experiences that resonate    │                             │
│                │  with the human soul          │                             │
│                │                               │                             │
│                └───────────────────────────────┘                             │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

**The Three Roles in Practice:**

| Situation | Orchestrator | Design Master | Emotion Connector |
|-----------|--------------|---------------|-------------------|
| Planning a feature | Coordinates models, defines workflow | Specifies visual requirements | Ensures user need is central |
| Reviewing AI output | Checks correctness | Checks aesthetics | Checks emotional impact |
| Debugging | Manages investigation | Ensures fix doesn't break UX | Considers user frustration |
| Shipping | Coordinates deployment | Final visual QA | User communication |

### 2.4 The Two Layers Architecture

Every codebase now has two essential components:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                      TWO LAYERS ARCHITECTURE                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                        AGENTIC LAYER                                 │    │
│  │                                                                      │    │
│  │  The intelligence that wraps and operates the application           │    │
│  │                                                                      │    │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐            │    │
│  │  │  Skills  │  │   MCPs   │  │  Prime   │  │   Sub-   │            │    │
│  │  │          │  │          │  │ Commands │  │  Agents  │            │    │
│  │  └──────────┘  └──────────┘  └──────────┘  └──────────┘            │    │
│  │                                                                      │    │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐            │    │
│  │  │   Stop   │  │  Memory  │  │ Context  │  │Verification│           │    │
│  │  │   Hooks  │  │  Files   │  │ Loaders  │  │  Loops    │            │    │
│  │  └──────────┘  └──────────┘  └──────────┘  └──────────┘            │    │
│  │                                                                      │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                   │                                          │
│                                   │ operates                                 │
│                                   ▼                                          │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                      APPLICATION LAYER                               │    │
│  │                                                                      │    │
│  │  The actual code that delivers value to users                       │    │
│  │                                                                      │    │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐            │    │
│  │  │ Frontend │  │ Backend  │  │ Database │  │  APIs    │            │    │
│  │  │          │  │          │  │          │  │          │            │    │
│  │  └──────────┘  └──────────┘  └──────────┘  └──────────┘            │    │
│  │                                                                      │    │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐            │    │
│  │  │ Scripts  │  │  Config  │  │  Tests   │  │  DevOps  │            │    │
│  │  │          │  │          │  │          │  │          │            │    │
│  │  └──────────┘  └──────────┘  └──────────┘  └──────────┘            │    │
│  │                                                                      │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────  │
│  KEY INSIGHT: The Agentic Layer enables agents to operate the entire        │
│               Application Layer autonomously.                               │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. THE TEN COMMANDMENTS

These are the non-negotiable laws governing all development under the North Star Blueprint.

```
╔══════════════════════════════════════════════════════════════════════════════╗
║                         THE TEN COMMANDMENTS                                 ║
╠══════════════════════════════════════════════════════════════════════════════╣
║                                                                              ║
║  I.    THOU SHALT NOT GUESS                                                  ║
║        Verify every assumption with a test, log, or proof.                   ║
║        Speculation is the enemy of reliability.                              ║
║                                                                              ║
║  II.   THOU SHALT NOT HIDE FAILURES                                          ║
║        Expose errors clearly in the UI and logs.                             ║
║        Silent failures are technical debt with compound interest.            ║
║                                                                              ║
║  III.  THOU SHALT BUILD IN SLICES                                            ║
║        Vertical functionality over horizontal layers.                        ║
║        Ship complete thin slices, not incomplete thick layers.               ║
║                                                                              ║
║  IV.   THOU SHALT RESPECT THE USER'S DATA                                    ║
║        Privacy and portability first.                                        ║
║        Users own their data; we are stewards, not owners.                    ║
║                                                                              ║
║  V.    THOU SHALT DOCUMENT AS YOU GO                                         ║
║        The map is part of the territory.                                     ║
║        Undocumented code is legacy code from day one.                        ║
║                                                                              ║
║  VI.   THOU SHALT NEVER REGRESS                                              ║
║        New features must not break old ones.                                 ║
║        Every deployment maintains or improves system integrity.              ║
║                                                                              ║
║  VII.  THOU SHALT VALUE LATENCY                                              ║
║        Speed is a feature.                                                   ║
║        Users perceive quality through responsiveness.                        ║
║                                                                              ║
║  VIII. THOU SHALT DESIGN FOR "CATEGORY OF ONE"                               ║
║        Good is not enough; be distinct.                                      ║
║        Every output should be the best version of itself.                    ║
║                                                                              ║
║  IX.   THOU SHALT TRUST BUT VERIFY AI                                        ║
║        Consensus is better than a single opinion.                            ║
║        AI outputs require validation before trust.                           ║
║                                                                              ║
║  X.    THOU SHALT OWN YOUR PRIMITIVES                                        ║
║        Don't just wrap; orchestrate.                                         ║
║        Understanding enables adaptation; abstraction enables scaling.        ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝
```

### Commandment I: Thou Shalt Not Guess

**Principle:** Every significant claim requires verification.

```
VERIFICATION REQUIREMENTS BY CLAIM TYPE
─────────────────────────────────────────────────────────────────────────────

CLAIM: "This code works"
VERIFICATION:
  □ Test passes
  □ Manual verification in browser/app
  □ Edge cases checked

CLAIM: "This is the best approach"
VERIFICATION:
  □ Alternatives considered
  □ Trade-offs documented
  □ Prior art reviewed

CLAIM: "The bug is in X"
VERIFICATION:
  □ Bug reproduced consistently
  □ Root cause identified (not just symptoms)
  □ Fix addresses root cause

CLAIM: "Users want this feature"
VERIFICATION:
  □ User research conducted
  □ Data supports claim
  □ Problem clearly defined

CLAIM: "This won't break anything"
VERIFICATION:
  □ Tests pass
  □ Related functionality tested
  □ Rollback plan ready
```

### Commandment II: Thou Shalt Not Hide Failures

**Principle:** Surface errors immediately and clearly.

```
ERROR EXPOSURE REQUIREMENTS
─────────────────────────────────────────────────────────────────────────────

USER-FACING:
  □ Clear error message (what happened)
  □ Actionable guidance (what to do)
  □ Recovery path (how to fix)
  □ Support escalation (where to get help)

DEVELOPER-FACING:
  □ Full stack trace
  □ Context at time of error
  □ Request/response data
  □ User identifier (for debugging)
  □ Timestamp

SYSTEM-FACING:
  □ Alerting triggered
  □ Metrics updated
  □ Logs searchable
  □ Correlation ID for tracing

ANTI-PATTERNS:
  ✗ Empty catch blocks
  ✗ Generic "Something went wrong" messages
  ✗ Swallowed exceptions
  ✗ console.log only (no structured logging)
```

### Commandment III: Thou Shalt Build in Slices

**Principle:** Vertical completeness over horizontal breadth.

```
SLICE BUILDING PRINCIPLES
─────────────────────────────────────────────────────────────────────────────

✅ GOOD SLICE:
   User can create an account
   └── UI: Sign-up form
   └── API: /auth/signup endpoint
   └── DB: users table
   └── Feedback: Success/error states
   └── Tests: E2E flow test

❌ BAD SLICE:
   Week 1: Build all database tables
   Week 2: Build all API endpoints
   Week 3: Build all UI components
   Week 4: Try to connect everything (bugs everywhere)

SLICE COMPLETENESS CHECKLIST:
  □ User can trigger the action (UI)
  □ System processes the action (Backend)
  □ Data persists (Database)
  □ User receives feedback (Response)
  □ Flow is tested (Tests)
```

### Commandment IV: Thou Shalt Respect The User's Data

**Principle:** Users own their data. We are stewards.

```
DATA RESPECT REQUIREMENTS
─────────────────────────────────────────────────────────────────────────────

PORTABILITY:
  □ User can export all their data
  □ Export format is standard (JSON, CSV)
  □ Export includes all user-generated content
  □ Export is complete (no hidden data)

DELETION:
  □ User can delete their account
  □ Deletion removes all personal data
  □ Deletion is permanent (after grace period)
  □ Confirmation prevents accidents

PRIVACY:
  □ Data collection is minimal
  □ Purpose is explained for each data point
  □ Sharing is opt-in (not opt-out)
  □ Third parties disclosed

SECURITY:
  □ Data encrypted at rest
  □ Data encrypted in transit
  □ Access logged
  □ Breach plan documented
```

### Commandment V: Thou Shalt Document As You Go

**Principle:** Documentation is part of the deliverable.

```
DOCUMENTATION REQUIREMENTS
─────────────────────────────────────────────────────────────────────────────

CODE DOCUMENTATION:
  □ Functions have purpose comments
  □ Complex logic is explained
  □ Non-obvious decisions are justified
  □ TODOs include ticket references

API DOCUMENTATION:
  □ All endpoints documented
  □ Request/response schemas defined
  □ Error codes explained
  □ Examples provided

ARCHITECTURE DOCUMENTATION:
  □ System diagram exists
  □ Key decisions recorded (ADRs)
  □ Data flows documented
  □ Integration points clear

USER DOCUMENTATION:
  □ Getting started guide
  □ Feature documentation
  □ FAQ
  □ Troubleshooting
```

### Commandment VI: Thou Shalt Never Regress

**Principle:** New features cannot break existing functionality.

```
REGRESSION PREVENTION
─────────────────────────────────────────────────────────────────────────────

BEFORE DEPLOYMENT:
  □ All existing tests pass
  □ New tests cover new functionality
  □ Manual smoke test of critical paths
  □ Rollback procedure confirmed

DURING DEPLOYMENT:
  □ Feature flags enable gradual rollout
  □ Monitoring alerts active
  □ Team available for rollback

AFTER DEPLOYMENT:
  □ Error rates monitored
  □ Performance metrics checked
  □ User feedback channels monitored
  □ Rollback executed if needed

IF REGRESSION OCCURS:
  1. Rollback immediately (don't debug in production)
  2. Create Fix Ledger entry
  3. Root cause analysis in staging
  4. Add test to prevent recurrence
  5. Re-deploy with fix
```

### Commandment VII: Thou Shalt Value Latency

**Principle:** Speed is a feature. Perceived performance is real performance.

```
LATENCY REQUIREMENTS
─────────────────────────────────────────────────────────────────────────────

USER INTERACTIONS:
  Target: < 100ms perceived response
  
  □ Button clicks → immediate visual feedback
  □ Form submissions → instant loading state
  □ Navigation → immediate transition start
  □ Data fetching → skeleton/placeholder immediately

API RESPONSES:
  Target: < 200ms for simple operations
  
  □ Simple reads: < 100ms
  □ Simple writes: < 200ms
  □ Complex operations: < 1s with progress
  □ Very long operations: background with notification

PAGE LOADS:
  Target: < 3s for full interactive
  
  □ First Contentful Paint: < 1s
  □ Largest Contentful Paint: < 2.5s
  □ Time to Interactive: < 3s
  □ Cumulative Layout Shift: < 0.1
```

### Commandment VIII: Thou Shalt Design For "Category of One"

**Principle:** Not just good—distinctly excellent.

```
CATEGORY OF ONE CRITERIA
─────────────────────────────────────────────────────────────────────────────

FIRST IMPRESSION:
  □ 3-second test: User knows this is quality
  □ Visual design communicates competence
  □ Interactions feel polished
  □ No rough edges visible

DIFFERENTIATION:
  □ Something only we do
  □ Something we do better than anyone
  □ Something users can't get elsewhere
  □ Memorable identity

EMOTIONAL RESPONSE:
  □ Users feel pride using it
  □ Users want to show others
  □ Users recommend unprompted
  □ Users forgive minor issues

SUSTAINABLE ADVANTAGE:
  □ Hard to copy
  □ Gets better with scale
  □ Creates network effects
  □ Builds switching costs
```

### Commandment IX: Thou Shalt Trust But Verify AI

**Principle:** AI outputs are proposals, not truth.

```
AI VERIFICATION REQUIREMENTS
─────────────────────────────────────────────────────────────────────────────

FOR ALL AI OUTPUT:
  □ Human review before user-facing use
  □ Facts verified against sources
  □ Code tested before deployment
  □ Edge cases manually checked

FOR CRITICAL DECISIONS:
  □ Multi-model verification
  □ Consensus points identified
  □ Divergences investigated
  □ Final decision documented

HALLUCINATION CHECKS:
  □ URLs and links validated
  □ API references verified to exist
  □ Statistics traced to sources
  □ Code references actual libraries

GROUNDING CHECKS:
  □ AI had access to current state
  □ AI read relevant files before claims
  □ No assumptions about unread code
  □ Context was fresh, not stale
```

### Commandment X: Thou Shalt Own Your Primitives

**Principle:** Understand your tools deeply. Don't just wrap—orchestrate.

```
PRIMITIVE OWNERSHIP
─────────────────────────────────────────────────────────────────────────────

UNDERSTANDING:
  □ Know how each tool works internally
  □ Know limitations and edge cases
  □ Know failure modes
  □ Know performance characteristics

ABSTRACTION:
  □ Abstractions simplify, not obscure
  □ Lower layers accessible when needed
  □ Escape hatches exist
  □ Debugging possible at all levels

DEPENDENCIES:
  □ Every dependency is intentional
  □ Dependency purpose is documented
  □ Alternatives were considered
  □ Update strategy defined

CUSTOM SOLUTIONS:
  □ Build custom when generic fails
  □ Custom solutions are documented
  □ Custom solutions are tested
  □ Custom solutions are maintainable
```

---

## 4. VALUE HIERARCHY & POSITIONING

### 4.1 The Value Ladder

Understanding where value lives is critical for positioning work at the right level.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           THE VALUE LADDER                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  Level 5: STRATEGIC TRANSFORMATION          ← WHERE VALUE LIVES             │
│  ───────────────────────────────────────────────────────────────────────    │
│  "We change how organizations think and operate"                            │
│                                                                              │
│  • High margins (50%+)                                                       │
│  • Long engagements (months/years)                                           │
│  • Differentiated positioning                                                │
│  • Relationship-based selling                                                │
│  • Hard to commoditize                                                       │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                              │
│  Level 4: PROBLEM DIAGNOSIS                 ← WHERE MONEY IS MOVING         │
│  ───────────────────────────────────────────────────────────────────────    │
│  "We find problems you didn't know existed"                                 │
│                                                                              │
│  • Expertise premium                                                         │
│  • Advisory relationships                                                    │
│  • Diagnostic frameworks                                                     │
│  • Requires deep domain knowledge                                            │
│  • AI assists but doesn't replace                                            │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                              │
│  Level 3: SOLUTION DESIGN                   ← 12-18 MONTHS LEFT             │
│  ───────────────────────────────────────────────────────────────────────    │
│  "We design solutions to defined problems"                                  │
│                                                                              │
│  • Commoditizing as AI improves                                              │
│  • Decreasing margins                                                        │
│  • Increasing competition                                                    │
│  • AI can do 60-70% of this                                                  │
│  • Human value in edge cases                                                 │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                              │
│  Level 2: TECHNICAL INTEGRATION             ← 12-18 MONTHS LEFT             │
│  ───────────────────────────────────────────────────────────────────────    │
│  "We connect and implement tools"                                           │
│                                                                              │
│  • Rapidly automatable                                                       │
│  • AI agents increasingly capable                                            │
│  • Price pressure increasing                                                 │
│  • Volume play required                                                      │
│  • Low differentiation                                                       │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                              │
│  Level 1: TASK EXECUTION                    ← COMMODITIZED                  │
│  ───────────────────────────────────────────────────────────────────────    │
│  "We execute defined tasks"                                                 │
│                                                                              │
│  • Race to bottom on price                                                   │
│  • Offshore/AI competition                                                   │
│  • Low margins                                                               │
│  • No differentiation                                                        │
│  • Easy to replace                                                           │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                              │
│  CRITICAL RULE:                                                              │
│  Always position deliverables at Level 4-5.                                  │
│  Levels 1-3 are commoditizing rapidly as AI capabilities expand.            │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 4.2 The Expertise Formula

> "Maximum AI expertise + Maximum human authenticity = Unbeatable positioning"

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        THE EXPERTISE FORMULA                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│                     AI EXPERTISE                                             │
│                         │                                                    │
│                         │                                                    │
│     Low AI Expertise    │    High AI Expertise                              │
│                         │                                                    │
│  ┌──────────────────────┼──────────────────────┐                            │
│  │                      │                      │                            │
│  │    VULNERABLE        │    OPTIMIZED         │  High                      │
│  │                      │    BUT COLD          │  Human                     │
│  │    • Falling behind  │                      │  Authenticity              │
│  │    • Decreasing      │    • Efficient but   │                            │
│  │      relevance       │      impersonal      │                            │
│  │    • Price pressure  │    • Missing human   │                            │
│  │                      │      connection      │                            │
│  │                      │                      │                            │
│  ├──────────────────────┼──────────────────────┤                            │
│  │                      │                      │                            │
│  │    OBSOLETE          │    ★ UNBEATABLE ★    │  Low                       │
│  │                      │                      │  Human                     │
│  │    • Being replaced  │    • Best of both    │  Authenticity              │
│  │    • No competitive  │    • AI-powered      │                            │
│  │      advantage       │      human insight   │                            │
│  │    • Commodity       │    • Differentiated  │                            │
│  │      pricing         │    • Premium pricing │                            │
│  │                      │                      │                            │
│  └──────────────────────┴──────────────────────┘                            │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                              │
│  TARGET: Upper-right quadrant                                                │
│  • Psycho-expert on AI capabilities                                          │
│  • Irreplaceable on human connection                                         │
│  • Technology enables, humanity differentiates                               │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 4.3 The Loneliness Economy Principle

As AI handles more technical work, human connection becomes premium.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    THE LONELINESS ECONOMY                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  OBSERVATION:                                                                │
│  As AI automates more tasks, human connection becomes scarcer               │
│  and therefore more valuable.                                                │
│                                                                              │
│  DESIGN IMPLICATIONS:                                                        │
│  ───────────────────────────────────────────────────────────────────────    │
│                                                                              │
│  1. FEATURES THAT CREATE COMMUNITY                                           │
│     • Shared experiences                                                     │
│     • Collaborative spaces                                                   │
│     • Social proof elements                                                  │
│     • User-to-user connection                                                │
│                                                                              │
│  2. INTERFACES THAT FEEL WARM                                                │
│     • Personal touches                                                       │
│     • Celebration moments                                                    │
│     • Encouragement patterns                                                 │
│     • Humanized copy                                                         │
│                                                                              │
│  3. INTERACTIONS THAT ACKNOWLEDGE THE HUMAN                                  │
│     • Remember preferences                                                   │
│     • Recognize milestones                                                   │
│     • Adapt to context                                                       │
│     • Respect attention                                                      │
│                                                                              │
│  4. PROGRESS THAT CELEBRATES                                                 │
│     • Achievement recognition                                                │
│     • Milestone markers                                                      │
│     • Growth visualization                                                   │
│     • Positive reinforcement                                                 │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                              │
│  KEY INSIGHT:                                                                │
│  Design for BELONGING, not just functionality.                               │
│  Users don't just want features—they want to feel seen.                     │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 4.4 Positioning Statement Template

For any project, complete this positioning framework:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                      POSITIONING FRAMEWORK                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  FOR:         [Target user description]                                      │
│               Who are they? What defines them?                               │
│                                                                              │
│  WHO:         [Has this problem/need/desire]                                 │
│               What pain are they experiencing?                               │
│                                                                              │
│  THE:         [Project name]                                                 │
│               What is this thing called?                                     │
│                                                                              │
│  IS A:        [Category description]                                         │
│               What category does it belong to?                               │
│                                                                              │
│  THAT:        [Key benefit / transformation]                                 │
│               What change does it create in their life?                      │
│                                                                              │
│  UNLIKE:      [Primary alternative/competitor]                               │
│               What would they use instead?                                   │
│                                                                              │
│  WE:          [Key differentiator]                                           │
│               What makes us uniquely qualified?                              │
│                                                                              │
│  BECAUSE:     [Reason to believe / proof point]                              │
│               Why should they believe us?                                    │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                              │
│  VALUE LEVEL:          [4 or 5 — must be one of these]                       │
│                                                                              │
│  EMOTIONAL HOOK:       [The feeling we create]                               │
│                                                                              │
│  CATEGORY OF ONE:      [Why we're the only option that matters]              │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

**Example Positioning:**

```
FOR:         Technical founders building AI-powered products

WHO:         Feel overwhelmed by the pace of AI tools and need 
             a systematic approach to ship faster without chaos

THE:         North Star Blueprint

IS A:        Operational framework for AI-assisted development

THAT:        Transforms chaotic tool usage into orchestrated 
             production of Category of One software

UNLIKE:      Generic prompt collections or tool-specific tutorials

WE:          Provide a complete operating system that aligns 
             human intent with AI capabilities

BECAUSE:     This framework has been battle-tested across 
             multiple production applications

VALUE LEVEL:          5 (Strategic Transformation)
EMOTIONAL HOOK:       Confidence and control amid AI chaos
CATEGORY OF ONE:      The only framework that treats AI 
                      orchestration as a discipline, not a hack
```

---

## PART I SUMMARY

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    PART I: FOUNDATION & PHILOSOPHY                           │
│                           KEY TAKEAWAYS                                      │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  FOUNDER MINDSET:                                                            │
│  • Hacker Checklist: Map → Study → Identify → Find Leverage                 │
│  • Three Eyes: Important? Impactful? Irreversible?                          │
│  • First Principles: Facts → Assumptions → Next Test                        │
│  • MVP Velocity: Build → Ship → Learn → Rebuild (in one week)               │
│  • Collaboration: 200-5000x multiplier through leverage                     │
│  • Singularity: Path to AI-operated codebases                               │
│                                                                              │
│  CORE IDENTITY:                                                              │
│  • Category of One: Not best of many, but only one that matters             │
│  • Operating System: Blueprint installs shared context                       │
│  • Experience Architect: Orchestrator + Designer + Emotion                   │
│  • Two Layers: Agentic Layer operates Application Layer                     │
│                                                                              │
│  TEN COMMANDMENTS:                                                           │
│  I.   Don't guess (verify)                                                   │
│  II.  Don't hide failures (expose)                                           │
│  III. Build in slices (vertical)                                             │
│  IV.  Respect data (user owns it)                                            │
│  V.   Document as you go (infrastructure)                                    │
│  VI.  Never regress (no broken features)                                     │
│  VII. Value latency (speed is feature)                                       │
│  VIII.Design for Category of One (distinct)                                  │
│  IX.  Trust but verify AI (proposals not truth)                              │
│  X.   Own your primitives (understand deeply)                                │
│                                                                              │
│  VALUE POSITIONING:                                                          │
│  • Target Level 4-5 (Diagnosis + Transformation)                             │
│  • Expertise Formula: AI skill + Human authenticity                          │
│  • Loneliness Economy: Design for belonging                                  │
│  • Complete positioning framework for every project                          │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---
# PART II: PRIMITIVE EXECUTION FRAMEWORK

---

## 5. THE SIX CORE PRIMITIVES

> "The difference between amateur and professional AI development is not the tools—it's the orchestration of primitives."

Every operation in software development—whether performed by human or AI—can be decomposed into six fundamental primitives. Mastering these primitives is the foundation of reliable AI-assisted development.

### 5.1 Primitive Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         THE SIX CORE PRIMITIVES                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│     ┌─────────────────────────────────────────────────────────────────┐     │
│     │                         1. STATE                                 │     │
│     │              "What is the current reality?"                      │     │
│     │                                                                  │     │
│     │  The complete, verifiable snapshot of system condition          │     │
│     │  at any point in time. Truth, not assumption.                   │     │
│     └─────────────────────────────────────────────────────────────────┘     │
│                                    │                                         │
│                    ┌───────────────┴───────────────┐                        │
│                    ▼                               ▼                        │
│     ┌──────────────────────────┐   ┌──────────────────────────┐            │
│     │      2. ARTIFACT         │   │       3. CHANGE          │            │
│     │  "What will be created?" │   │   "What will differ?"    │            │
│     │                          │   │                          │            │
│     │  Any output: code, doc,  │   │  The delta between       │            │
│     │  config, data. Named,    │   │  current state and       │            │
│     │  versioned, traceable.   │   │  desired state.          │            │
│     └──────────────────────────┘   └──────────────────────────┘            │
│                    │                               │                        │
│                    └───────────────┬───────────────┘                        │
│                                    ▼                                         │
│     ┌─────────────────────────────────────────────────────────────────┐     │
│     │                         4. CHECK                                 │     │
│     │                  "Did it work correctly?"                        │     │
│     │                                                                  │     │
│     │  Verification that change achieved desired outcome              │     │
│     │  without unintended consequences. Tests, not hopes.             │     │
│     └─────────────────────────────────────────────────────────────────┘     │
│                                    │                                         │
│                    ┌───────────────┴───────────────┐                        │
│                    ▼                               ▼                        │
│     ┌──────────────────────────┐   ┌──────────────────────────┐            │
│     │      5. ROLLBACK         │   │    6. TRACEABILITY       │            │
│     │  "How do we undo this?"  │   │   "What's the history?"  │            │
│     │                          │   │                          │            │
│     │  Safe return to known    │   │  Complete audit trail    │            │
│     │  good state. Always      │   │  of who, what, when,     │            │
│     │  available, tested.      │   │  why. Accountability.    │            │
│     └──────────────────────────┘   └──────────────────────────┘            │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 5.2 Primitive Definitions

#### PRIMITIVE 1: STATE

**Definition:** The complete, verifiable snapshot of system condition at any point in time.

```
STATE COMPONENTS
─────────────────────────────────────────────────────────────────────────────

CODE STATE:
  • Git commit hash (exact version)
  • Branch name
  • Uncommitted changes (if any)
  • Stash contents

DATA STATE:
  • Database schema version
  • Migration status
  • Seed data present/absent
  • Environment (dev/staging/prod)

ENVIRONMENT STATE:
  • Node/Python/runtime versions
  • Dependency versions (lock file)
  • Environment variables set
  • External service availability

APPLICATION STATE:
  • Server running/stopped
  • Current configuration
  • Feature flags active
  • Cache status

USER-VISIBLE STATE:
  • What the user sees in browser/app
  • Console errors present
  • Network requests status
  • Local storage contents
```

**State Verification Commands:**
```bash
# Code state
git status && git log -1 --oneline && git diff --stat

# Dependency state
cat package-lock.json | head -20  # or equivalent

# Environment state
node -v && npm -v && echo $NODE_ENV

# Application state
curl -s localhost:3000/health | jq .
```

**State Anti-Patterns:**
| Anti-Pattern | Problem | Solution |
|--------------|---------|----------|
| "It works on my machine" | Environment mismatch | Docker, lock files |
| "Just pull latest" | Unknown actual state | Specific commit reference |
| "The database has the data" | Unverified assumption | Migration + seed verification |
| "Everything is fine" | No verification | Health check endpoints |

#### PRIMITIVE 2: ARTIFACT

**Definition:** Any output produced by development work—named, versioned, and traceable.

```
ARTIFACT TYPES
─────────────────────────────────────────────────────────────────────────────

CODE ARTIFACTS:
  • Source files (.ts, .tsx, .py, etc.)
  • Configuration files
  • Scripts
  • Database migrations

DOCUMENTATION ARTIFACTS:
  • README files
  • API documentation
  • Architecture Decision Records (ADRs)
  • User guides

DATA ARTIFACTS:
  • Seed data files
  • Test fixtures
  • Export files
  • Backup files

BUILD ARTIFACTS:
  • Compiled bundles
  • Docker images
  • Deployment packages
  • Static assets

VERIFICATION ARTIFACTS:
  • Test results
  • Coverage reports
  • Lighthouse scores
  • Security scan results
```

**Artifact Naming Convention:**
```
[type]-[name]-[version].[extension]

Examples:
  component-user-profile-v2.tsx
  migration-add-user-roles-001.sql
  fixture-test-users-v1.json
  report-lighthouse-20240115.html
```

**Artifact Requirements:**
```
EVERY ARTIFACT MUST HAVE:
─────────────────────────────────────────────────────────────────────────────

□ NAME
  Clear, descriptive identifier
  Following project naming conventions

□ VERSION
  Explicit version or commit reference
  Enables rollback identification

□ LOCATION
  Known path in repository
  Predictable structure

□ PURPOSE
  Why does this artifact exist?
  What problem does it solve?

□ OWNER
  Who created it?
  Who maintains it?

□ DEPENDENCIES
  What does it depend on?
  What depends on it?
```

#### PRIMITIVE 3: CHANGE

**Definition:** The delta between current state and desired state.

```
CHANGE ANATOMY
─────────────────────────────────────────────────────────────────────────────

EVERY CHANGE HAS:

┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│  BEFORE STATE ─────────────────────────────────────► AFTER STATE       │
│       │                                                    │            │
│       │                    CHANGE                          │            │
│       │              ┌─────────────────┐                   │            │
│       └──────────────│                 │───────────────────┘            │
│                      │  • Intent       │                                │
│                      │  • Actions      │                                │
│                      │  • Scope        │                                │
│                      │  • Risk         │                                │
│                      │  • Reversibility│                                │
│                      └─────────────────┘                                │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘

INTENT:        Why is this change being made?
ACTIONS:       What specific operations will occur?
SCOPE:         What files/systems are affected?
RISK:          What could go wrong?
REVERSIBILITY: How easy is it to undo?
```

**Change Classification:**

| Change Type | Scope | Risk | Reversibility | Review Required |
|-------------|-------|------|---------------|-----------------|
| **Trivial** | 1-2 files, < 20 lines | Low | Easy | Self-review |
| **Small** | 3-5 files, < 100 lines | Low-Med | Moderate | Peer review |
| **Medium** | 5-10 files, < 500 lines | Medium | Moderate | Team review |
| **Large** | 10+ files, 500+ lines | High | Difficult | Formal review |
| **Critical** | Core systems, data model | Very High | May be irreversible | Multi-reviewer |

**Change Description Template:**
```markdown
## Change: [Brief Title]

### Intent
[Why this change is being made]

### Scope
- Files affected: [list]
- Systems affected: [list]
- Users affected: [none/some/all]

### Actions
1. [Specific action 1]
2. [Specific action 2]
3. [Specific action 3]

### Risk Assessment
- Risk level: [Low/Medium/High/Critical]
- Potential issues: [list]
- Mitigation: [list]

### Reversibility
- Can be rolled back: [Yes/No/Partial]
- Rollback method: [describe]
- Data implications: [none/minimal/significant]
```

#### PRIMITIVE 4: CHECK

**Definition:** Verification that change achieved desired outcome without unintended consequences.

```
CHECK HIERARCHY
─────────────────────────────────────────────────────────────────────────────

LEVEL 1: SYNTAX CHECK
─────────────────────────────────────────────────────────────────────────────
  • Code compiles/parses
  • No syntax errors
  • Linting passes
  
  TOOLS: TypeScript compiler, ESLint, Prettier
  SPEED: Seconds
  CONFIDENCE: Low (code runs, doesn't mean it's correct)

LEVEL 2: UNIT CHECK
─────────────────────────────────────────────────────────────────────────────
  • Individual functions work
  • Edge cases handled
  • Expected outputs produced
  
  TOOLS: Jest, Vitest, pytest
  SPEED: Seconds to minutes
  CONFIDENCE: Medium (units work, integration unknown)

LEVEL 3: INTEGRATION CHECK
─────────────────────────────────────────────────────────────────────────────
  • Components work together
  • APIs return expected responses
  • Database operations succeed
  
  TOOLS: Supertest, integration test suites
  SPEED: Minutes
  CONFIDENCE: Medium-High (system works, UI unknown)

LEVEL 4: END-TO-END CHECK
─────────────────────────────────────────────────────────────────────────────
  • User flows complete successfully
  • Browser interactions work
  • Full system operates correctly
  
  TOOLS: Playwright, Cypress, Selenium
  SPEED: Minutes to hours
  CONFIDENCE: High (simulates real usage)

LEVEL 5: HUMAN CHECK
─────────────────────────────────────────────────────────────────────────────
  • Manual verification
  • Visual inspection
  • Edge case exploration
  • User acceptance
  
  TOOLS: Human eyes, judgment, intuition
  SPEED: Variable
  CONFIDENCE: Highest (catches what automation misses)
```

**Check Requirements by Change Type:**

| Change Type | Level 1 | Level 2 | Level 3 | Level 4 | Level 5 |
|-------------|---------|---------|---------|---------|---------|
| Trivial | ✅ | ○ | ○ | ○ | ○ |
| Small | ✅ | ✅ | ○ | ○ | ○ |
| Medium | ✅ | ✅ | ✅ | ○ | ○ |
| Large | ✅ | ✅ | ✅ | ✅ | ○ |
| Critical | ✅ | ✅ | ✅ | ✅ | ✅ |

**Legend:** ✅ = Required | ○ = Recommended

#### PRIMITIVE 5: ROLLBACK

**Definition:** Safe return to a known good state when a change fails or causes issues.

```
ROLLBACK READINESS
─────────────────────────────────────────────────────────────────────────────

BEFORE ANY CHANGE, ENSURE:

□ KNOWN GOOD STATE EXISTS
  • Latest stable commit identified
  • Database backup available (if applicable)
  • Configuration backup taken
  • External service states documented

□ ROLLBACK PATH DEFINED
  • Specific steps to reverse change
  • Time estimate for rollback
  • Who can perform rollback
  • Communication plan for users

□ ROLLBACK TESTED (for critical changes)
  • Rollback procedure practiced
  • Recovery time verified
  • Data integrity confirmed
  • Dependencies considered

□ MONITORING READY
  • Error rate alerting active
  • Performance monitoring active
  • User feedback channels open
  • Team available for response
```

**Rollback Types:**

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           ROLLBACK STRATEGIES                                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  GIT ROLLBACK                                                                │
│  ───────────────────────────────────────────────────────────────────────    │
│  git revert <commit>           # Safe, creates new commit                   │
│  git reset --hard <commit>     # Destructive, use with caution              │
│  git checkout <commit> -- file # Single file rollback                       │
│                                                                              │
│  DEPLOYMENT ROLLBACK                                                         │
│  ───────────────────────────────────────────────────────────────────────    │
│  • Blue/green: Switch traffic to previous version                           │
│  • Container: Deploy previous image tag                                      │
│  • Feature flag: Disable new feature                                         │
│  • Canary: Stop rollout, revert canary                                       │
│                                                                              │
│  DATABASE ROLLBACK                                                           │
│  ───────────────────────────────────────────────────────────────────────    │
│  • Migration down: Run reverse migration                                     │
│  • Point-in-time: Restore from backup                                        │
│  • Soft delete: Undelete records                                             │
│  • Compensating transaction: Write correcting data                           │
│                                                                              │
│  STATE ROLLBACK                                                              │
│  ───────────────────────────────────────────────────────────────────────    │
│  • Cache invalidation: Clear and rebuild                                     │
│  • Configuration: Restore previous config                                    │
│  • Environment: Rebuild from known state                                     │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

**Rollback Decision Matrix:**

| Symptom | Severity | Rollback Speed | Rollback? |
|---------|----------|----------------|-----------|
| Error rate > 5% | High | < 5 min | **YES, immediately** |
| Performance degraded > 50% | High | < 5 min | **YES, immediately** |
| Feature doesn't work | Medium | < 15 min | Likely yes |
| Minor visual bug | Low | > 30 min | Probably no, fix forward |
| Single user report | Low | Unknown | Investigate first |

#### PRIMITIVE 6: TRACEABILITY

**Definition:** Complete audit trail of who did what, when, why, and with what outcome.

```
TRACEABILITY CHAIN
─────────────────────────────────────────────────────────────────────────────

Every change should be traceable through:

  REQUIREMENT
      │
      │ "Why was this needed?"
      ▼
  DECISION
      │
      │ "What approach was chosen?"
      ▼
  IMPLEMENTATION
      │
      │ "What code was written?"
      ▼
  VERIFICATION
      │
      │ "How was it tested?"
      ▼
  DEPLOYMENT
      │
      │ "When/where was it released?"
      ▼
  OUTCOME
      │
      │ "What was the result?"
      ▼
  LEARNING
      
      "What did we learn?"
```

**Traceability Requirements:**

```
COMMIT MESSAGES
─────────────────────────────────────────────────────────────────────────────
FORMAT: [type](scope): description

TYPES:
  feat:     New feature
  fix:      Bug fix
  docs:     Documentation
  style:    Formatting (no code change)
  refactor: Code change (no feature/fix)
  test:     Adding tests
  chore:    Maintenance tasks

EXAMPLES:
  feat(auth): add password reset flow
  fix(dashboard): correct date formatting in charts
  docs(api): update authentication examples
  refactor(database): optimize user query performance

─────────────────────────────────────────────────────────────────────────────

PULL REQUESTS
─────────────────────────────────────────────────────────────────────────────
MUST INCLUDE:
  □ Description of change
  □ Link to requirement/issue
  □ Testing performed
  □ Screenshots (if UI change)
  □ Rollback considerations

─────────────────────────────────────────────────────────────────────────────

ADRs (Architecture Decision Records)
─────────────────────────────────────────────────────────────────────────────
FOR SIGNIFICANT DECISIONS:
  □ Context: What situation prompted this decision?
  □ Decision: What was decided?
  □ Alternatives: What other options were considered?
  □ Consequences: What are the implications?
  □ Status: Proposed/Accepted/Deprecated/Superseded
```

### 5.3 Primitive Relationships

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       PRIMITIVE RELATIONSHIPS                                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│                         ┌─────────┐                                          │
│                         │  STATE  │                                          │
│                         └────┬────┘                                          │
│                              │                                               │
│              ┌───────────────┴───────────────┐                              │
│              │                               │                              │
│              ▼                               ▼                              │
│       ┌─────────────┐               ┌─────────────┐                         │
│       │  ARTIFACT   │◄─────────────►│   CHANGE    │                         │
│       │  (Output)   │   produces/   │  (Action)   │                         │
│       │             │   modifies    │             │                         │
│       └──────┬──────┘               └──────┬──────┘                         │
│              │                             │                                │
│              │    ┌─────────────┐          │                                │
│              └───►│    CHECK    │◄─────────┘                                │
│                   │ (Validates) │                                           │
│                   └──────┬──────┘                                           │
│                          │                                                  │
│           ┌──────────────┴──────────────┐                                  │
│           │                             │                                  │
│           ▼                             ▼                                  │
│    ┌─────────────┐               ┌─────────────┐                           │
│    │  ROLLBACK   │               │TRACEABILITY │                           │
│    │ (If needed) │               │  (Always)   │                           │
│    └─────────────┘               └─────────────┘                           │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                              │
│  FLOW:                                                                       │
│  1. STATE is assessed (current reality)                                      │
│  2. CHANGE is planned (desired delta)                                        │
│  3. ARTIFACT is produced (output of change)                                  │
│  4. CHECK validates (did it work?)                                           │
│  5. ROLLBACK available (if check fails)                                      │
│  6. TRACEABILITY records (always, regardless of outcome)                     │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 5.4 Primitive Implementation Checklist

```
BEFORE ANY DEVELOPMENT TASK
─────────────────────────────────────────────────────────────────────────────

□ STATE VERIFIED
  □ Current git status known
  □ Dependencies up to date
  □ Environment confirmed
  □ Application running/testable

□ CHANGE DEFINED
  □ Intent documented
  □ Scope identified
  □ Risk assessed
  □ Reversibility confirmed

□ ARTIFACTS PLANNED
  □ Files to create/modify listed
  □ Naming conventions followed
  □ Location determined
  □ Version strategy set

□ CHECKS PREPARED
  □ Test strategy defined
  □ Acceptance criteria clear
  □ Verification method ready
  □ Review process known

□ ROLLBACK READY
  □ Known good state identified
  □ Rollback steps documented
  □ Time estimate known
  □ Responsible party identified

□ TRACEABILITY SET
  □ Commit message format ready
  □ PR template available
  □ Links to requirements ready
  □ Documentation plan set
```

---

## 6. PRIMITIVE LIFECYCLE & VERIFICATION

### 6.1 The Primitive Execution Cycle

Every task follows this fundamental cycle. No exceptions.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                      PRIMITIVE EXECUTION CYCLE                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│                         ┌─────────────────┐                                  │
│                         │                 │                                  │
│                         │   1. ASSESS     │                                  │
│                         │      STATE      │                                  │
│                         │                 │                                  │
│                         └────────┬────────┘                                  │
│                                  │                                           │
│                                  │ "What's the current reality?"             │
│                                  │                                           │
│                                  ▼                                           │
│                         ┌─────────────────┐                                  │
│                         │                 │                                  │
│                         │   2. DEFINE     │                                  │
│                         │     CHANGE      │                                  │
│                         │                 │                                  │
│                         └────────┬────────┘                                  │
│                                  │                                           │
│                                  │ "What needs to be different?"             │
│                                  │                                           │
│                                  ▼                                           │
│                         ┌─────────────────┐                                  │
│                         │                 │                                  │
│                         │   3. PRODUCE    │                                  │
│                         │    ARTIFACT     │                                  │
│                         │                 │                                  │
│                         └────────┬────────┘                                  │
│                                  │                                           │
│                                  │ "Execute the change"                      │
│                                  │                                           │
│                                  ▼                                           │
│                         ┌─────────────────┐                                  │
│                         │                 │                                  │
│                         │   4. VERIFY     │◄──────────────────┐              │
│                         │     (CHECK)     │                   │              │
│                         │                 │                   │              │
│                         └────────┬────────┘                   │              │
│                                  │                            │              │
│                         ┌────────┴────────┐                   │              │
│                         │                 │                   │              │
│                    PASS │                 │ FAIL              │              │
│                         ▼                 ▼                   │              │
│              ┌─────────────────┐  ┌─────────────────┐         │              │
│              │                 │  │                 │         │              │
│              │   5. COMMIT     │  │   5. ROLLBACK   │─────────┘              │
│              │     & TRACE     │  │   & DIAGNOSE    │  (Return to step 2)    │
│              │                 │  │                 │                        │
│              └────────┬────────┘  └─────────────────┘                        │
│                       │                                                      │
│                       │                                                      │
│                       ▼                                                      │
│              ┌─────────────────┐                                             │
│              │                 │                                             │
│              │   6. COMPLETE   │                                             │
│              │   (New STATE)   │                                             │
│              │                 │                                             │
│              └─────────────────┘                                             │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 6.2 Phase Details

#### Phase 1: Assess State

```
ASSESS STATE PROTOCOL
─────────────────────────────────────────────────────────────────────────────

ACTIONS:
  1. Verify code state
     git status
     git log -3 --oneline
     
  2. Verify environment
     node -v (or appropriate runtime)
     npm list (or dependency check)
     
  3. Verify application
     Run the application
     Open in browser
     Check console for errors
     
  4. Read relevant existing code
     Do NOT assume code structure
     Do NOT guess at implementation
     Actually READ the files

OUTPUT:
  Clear understanding of current state
  No assumptions, only verified facts
  
DURATION: 2-5 minutes (invest this time!)

ANTI-PATTERNS:
  ✗ "I think the code does X" (without reading it)
  ✗ "It should work" (without running it)
  ✗ "Same as last time" (without verifying)
```

#### Phase 2: Define Change

```
DEFINE CHANGE PROTOCOL
─────────────────────────────────────────────────────────────────────────────

ACTIONS:
  1. State the intent clearly
     "I need to [action] so that [outcome]"
     
  2. Identify affected scope
     Files to modify
     Systems impacted
     Users affected
     
  3. Assess risk
     What could go wrong?
     What's the worst case?
     How reversible is this?
     
  4. Plan verification
     How will I know it worked?
     What tests will I run?
     What will I look for?

OUTPUT:
  Written change specification
  (Can be brief for trivial changes)
  
DURATION: Variable (proportional to change size)

ANTI-PATTERNS:
  ✗ "I'll just make some changes" (no plan)
  ✗ "We'll figure it out" (no defined outcome)
  ✗ "It's simple, no need to plan" (famous last words)
```

#### Phase 3: Produce Artifact

```
PRODUCE ARTIFACT PROTOCOL
─────────────────────────────────────────────────────────────────────────────

ACTIONS:
  1. Create/modify code following plan
     Stay within defined scope
     Follow existing patterns
     Maintain consistency
     
  2. Apply incremental changes
     Small commits
     Testable units
     Clear progress
     
  3. Document as you go
     Comments for non-obvious code
     Update README if needed
     Note decisions made
     
  4. Preserve verifiability
     Don't overwrite without backup
     Keep old code commented (temporarily)
     Enable easy comparison

OUTPUT:
  New or modified files
  Ready for verification
  
DURATION: Variable (the actual "work")

ANTI-PATTERNS:
  ✗ One massive change (untestable)
  ✗ Multiple unrelated changes together
  ✗ Changing things "while I'm here"
  ✗ Forgetting to save
```

#### Phase 4: Verify (Check)

```
VERIFY PROTOCOL
─────────────────────────────────────────────────────────────────────────────

ACTIONS:
  1. Run automated checks
     Linting passes?
     Types check?
     Tests pass?
     
  2. Manual verification
     Does it actually work?
     In the browser/app?
     With real interactions?
     
  3. Edge case exploration
     What about empty states?
     What about errors?
     What about slow networks?
     
  4. Regression check
     Did anything else break?
     Run related tests
     Check adjacent functionality

OUTPUT:
  Pass: Ready to commit
  Fail: Return to step 2 with diagnosis
  
DURATION: Proportional to change size

ANTI-PATTERNS:
  ✗ "It compiled, must work" (compilation ≠ correctness)
  ✗ "Tests passed, done" (tests might be incomplete)
  ✗ Skipping manual verification
  ✗ Not checking edge cases
```

#### Phase 5A: Commit & Trace (on Pass)

```
COMMIT PROTOCOL
─────────────────────────────────────────────────────────────────────────────

ACTIONS:
  1. Stage changes
     git add [files]
     Review staged changes
     
  2. Write good commit message
     [type](scope): description
     
     Include:
     - What was done
     - Why it was done
     - Any notable decisions
     
  3. Push and create PR (if applicable)
     Link to issue/requirement
     Include description
     Add screenshots if UI
     
  4. Update documentation
     README if needed
     Changelog entry
     ADR if significant decision

OUTPUT:
  Committed, traceable change
  Ready for review/merge
  
DURATION: 2-5 minutes

ANTI-PATTERNS:
  ✗ "fixed stuff" (useless message)
  ✗ "wip" (no context)
  ✗ Committing without review
  ✗ Skipping documentation updates
```

#### Phase 5B: Rollback & Diagnose (on Fail)

```
ROLLBACK PROTOCOL
─────────────────────────────────────────────────────────────────────────────

ACTIONS:
  1. STOP making more changes
     Don't "try one more thing"
     Don't dig deeper into the hole
     
  2. Return to known good state
     git checkout -- [files]
     git stash (if preserving work)
     Verify application works again
     
  3. Diagnose the failure
     What exactly failed?
     Why did it fail?
     What assumption was wrong?
     
  4. Update approach
     Revise the plan
     Add to Fix Ledger if pattern
     Return to step 2 with new understanding

OUTPUT:
  System back to working state
  Understanding of what went wrong
  Revised approach for next attempt
  
DURATION: Variable (don't rush diagnosis)

ANTI-PATTERNS:
  ✗ "Just push through" (creates more problems)
  ✗ Making changes on top of broken state
  ✗ Not understanding why it failed
  ✗ Blaming external factors without evidence
```

### 6.3 Recursive Verification Pattern

For complex changes, apply verification recursively at multiple levels:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                     RECURSIVE VERIFICATION PATTERN                           │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  FEATURE: User Authentication                                                │
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │ LEVEL 1: Component verification                                      │    │
│  │                                                                      │    │
│  │   ┌──────────────────┐   ┌──────────────────┐   ┌─────────────────┐ │    │
│  │   │ Login Form       │   │ Password Input   │   │ Submit Button   │ │    │
│  │   │ ✓ Unit tests     │   │ ✓ Unit tests     │   │ ✓ Unit tests    │ │    │
│  │   │ ✓ Manual check   │   │ ✓ Manual check   │   │ ✓ Manual check  │ │    │
│  │   └──────────────────┘   └──────────────────┘   └─────────────────┘ │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                    │                                         │
│                                    ▼                                         │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │ LEVEL 2: Integration verification                                    │    │
│  │                                                                      │    │
│  │   ┌──────────────────────────────────────────────────────────────┐  │    │
│  │   │ Login Form + API + Database                                   │  │    │
│  │   │ ✓ Form submits to API correctly                               │  │    │
│  │   │ ✓ API validates and stores correctly                          │  │    │
│  │   │ ✓ Errors propagate correctly                                  │  │    │
│  │   └──────────────────────────────────────────────────────────────┘  │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                    │                                         │
│                                    ▼                                         │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │ LEVEL 3: Flow verification                                           │    │
│  │                                                                      │    │
│  │   ┌──────────────────────────────────────────────────────────────┐  │    │
│  │   │ Complete User Journey                                         │  │    │
│  │   │ ✓ Navigate to login page                                      │  │    │
│  │   │ ✓ Enter credentials                                           │  │    │
│  │   │ ✓ Submit form                                                 │  │    │
│  │   │ ✓ Receive feedback                                            │  │    │
│  │   │ ✓ Redirect to dashboard (success)                             │  │    │
│  │   │ ✓ Show error message (failure)                                │  │    │
│  │   └──────────────────────────────────────────────────────────────┘  │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                    │                                         │
│                                    ▼                                         │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │ LEVEL 4: System verification                                         │    │
│  │                                                                      │    │
│  │   ┌──────────────────────────────────────────────────────────────┐  │    │
│  │   │ Cross-cutting Concerns                                        │  │    │
│  │   │ ✓ Session management works                                    │  │    │
│  │   │ ✓ Protected routes respect auth                               │  │    │
│  │   │ ✓ Logout clears state                                         │  │    │
│  │   │ ✓ Refresh preserves session                                   │  │    │
│  │   │ ✓ Multiple tabs work correctly                                │  │    │
│  │   └──────────────────────────────────────────────────────────────┘  │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  RULE: Each level must pass before moving to the next.                      │
│  RULE: A failure at any level returns to component-level fixes.             │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 7. THE ANTI-BUG-LOOP PRINCIPLE (FIX LEDGER)

### 7.1 The Ilya's Loop Problem

Named for the pattern where AI agents create endless fix loops, this is the #1 productivity killer in AI-assisted development.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          THE ILYA'S LOOP                                     │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  THE DEADLY PATTERN:                                                         │
│                                                                              │
│       ┌──────────────────────────────────────────────────────────────┐      │
│       │                                                              │      │
│       │    "I'll fix bug A"                                          │      │
│       │         │                                                    │      │
│       │         ▼                                                    │      │
│       │    Fix introduced → Creates bug B                            │      │
│       │         │                                                    │      │
│       │         ▼                                                    │      │
│       │    "I'll fix bug B"                                          │      │
│       │         │                                                    │      │
│       │         ▼                                                    │      │
│       │    Fix introduced → Re-creates bug A                         │      │
│       │         │                                                    │      │
│       │         ▼                                                    │      │
│       │    "I'll fix bug A again..."                                 │      │
│       │         │                                                    │      │
│       │         ▼                                                    │      │
│       │    ∞ INFINITE LOOP ∞                                         │      │
│       │                                                              │      │
│       └──────────────────────────────────────────────────────────────┘      │
│                                                                              │
│  WHY IT HAPPENS:                                                             │
│  ─────────────────────────────────────────────────────────────────────────  │
│  1. AI lacks memory of previous fix attempts                                │
│  2. AI treats each bug as independent (misses root cause)                   │
│  3. No record of what was tried and failed                                  │
│  4. AI optimizes for immediate fix, not systemic solution                   │
│  5. Human doesn't notice the loop pattern forming                           │
│                                                                              │
│  THE COST:                                                                   │
│  ─────────────────────────────────────────────────────────────────────────  │
│  • Hours or days of wasted effort                                            │
│  • Frustration and loss of trust in AI                                       │
│  • Codebase churn without progress                                           │
│  • Context exhaustion (token limits)                                         │
│  • Increased technical debt                                                  │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 7.2 The Fix Ledger Solution

The Fix Ledger is a persistent record of what was tried, what worked, what didn't, and why. It breaks the loop by giving AI (and humans) memory.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                            THE FIX LEDGER                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  LOCATION: /docs/fix-ledger.md or embedded in claude.md                     │
│                                                                              │
│  PURPOSE:                                                                    │
│  ─────────────────────────────────────────────────────────────────────────  │
│  1. Record every significant bug encountered                                │
│  2. Document what solutions were attempted                                   │
│  3. Mark what worked vs. what failed                                         │
│  4. Prevent the same failed approach twice                                   │
│  5. Build institutional knowledge of the codebase                            │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                              │
│  WHEN TO ADD AN ENTRY:                                                       │
│  ─────────────────────────────────────────────────────────────────────────  │
│  □ Bug took > 30 minutes to resolve                                          │
│  □ Bug recurred after initial fix                                            │
│  □ Fix was non-obvious                                                       │
│  □ Bug had root cause in different area than symptom                        │
│  □ Multiple approaches were tried                                            │
│  □ Bug likely to be encountered again                                        │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                              │
│  WHEN TO CONSULT:                                                            │
│  ─────────────────────────────────────────────────────────────────────────  │
│  □ Before debugging ANY issue                                                │
│  □ When a fix doesn't work on first try                                      │
│  □ When bug feels familiar                                                   │
│  □ Before asking AI to fix something                                         │
│  □ When context switching back to a feature area                             │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 7.3 Fix Ledger Entry Template

```markdown
## FIX LEDGER

### Entry: [YYYY-MM-DD] [Brief Title]

**Symptom:**
[What the user/developer observed]

**Root Cause:**
[The actual underlying issue]

**Environment:**
[Relevant context: browser, OS, dependencies, etc.]

**Attempted Solutions:**

| # | Approach | Result | Why It Failed/Worked |
|---|----------|--------|---------------------|
| 1 | [First attempt] | ❌ FAILED | [Reason] |
| 2 | [Second attempt] | ❌ FAILED | [Reason] |
| 3 | [Third attempt] | ✅ WORKED | [Why this one worked] |

**Final Solution:**
```
[Code or detailed description of what fixed it]
```

**Prevention:**
[How to prevent this from happening again]

**Related Files:**
- `path/to/file1.ts`
- `path/to/file2.ts`

**Tags:** #authentication #state-management #race-condition

---
```

### 7.4 Fix Ledger Example Entries

```markdown
## FIX LEDGER

---

### Entry: 2024-01-15 Authentication Token Expiry Race Condition

**Symptom:**
Users randomly logged out while actively using the app. Seemed to happen
more frequently during complex operations.

**Root Cause:**
Token refresh was happening asynchronously, but API calls weren't waiting
for refresh to complete. Multiple simultaneous requests could all fail if
token expired during a burst of activity.

**Environment:**
- React 18.2
- Next.js 14.0
- JWT tokens with 15-minute expiry

**Attempted Solutions:**

| # | Approach | Result | Why It Failed/Worked |
|---|----------|--------|---------------------|
| 1 | Extend token expiry to 1 hour | ❌ FAILED | Security concern, didn't fix root cause |
| 2 | Refresh token on every request | ❌ FAILED | Too many refresh calls, rate limited |
| 3 | Queue requests during refresh | ✅ WORKED | Single refresh, queue waits, then all proceed |

**Final Solution:**
```typescript
// Token refresh with request queuing
let refreshPromise: Promise<string> | null = null;

async function getValidToken(): Promise<string> {
  if (isTokenValid()) return getToken();
  
  // If refresh already in progress, wait for it
  if (refreshPromise) return refreshPromise;
  
  // Start refresh and share the promise
  refreshPromise = refreshToken().finally(() => {
    refreshPromise = null;
  });
  
  return refreshPromise;
}
```

**Prevention:**
- All API calls must go through `getValidToken()`
- Token refresh happens at 80% of expiry (proactive)
- Added test for concurrent request scenario

**Related Files:**
- `lib/auth/token-manager.ts`
- `lib/api/client.ts`

**Tags:** #authentication #race-condition #async

---

### Entry: 2024-01-18 CSS Animation Jank on Mobile Safari

**Symptom:**
Card flip animations were choppy on iOS Safari, smooth everywhere else.

**Root Cause:**
Safari's compositor was being triggered unnecessarily on each frame due to
`filter: drop-shadow()` being animated alongside transform.

**Environment:**
- iOS Safari 17
- Tailwind CSS 3.4
- Framer Motion 10.16

**Attempted Solutions:**

| # | Approach | Result | Why It Failed/Worked |
|---|----------|--------|---------------------|
| 1 | Add will-change: transform | ❌ FAILED | Already present, no effect |
| 2 | Use translateZ(0) hack | ❌ FAILED | No improvement |
| 3 | Move shadow to pseudo-element | ✅ WORKED | Shadow on separate layer |

**Final Solution:**
```css
/* Move shadow to non-animated pseudo-element */
.card {
  position: relative;
}

.card::after {
  content: '';
  position: absolute;
  inset: 0;
  box-shadow: 0 10px 40px rgba(0,0,0,0.2);
  border-radius: inherit;
  pointer-events: none;
  /* Shadow doesn't animate, only card transforms */
}
```

**Prevention:**
- Never animate `filter` or `box-shadow` on mobile
- Test all animations on iOS Safari specifically
- Added to design system documentation

**Related Files:**
- `components/ui/card.tsx`
- `styles/animations.css`

**Tags:** #animation #mobile #safari #performance

---
```

### 7.5 The "#" Shortcut for Regression Prevention

When a bug is fixed and added to the Fix Ledger, reference it with "#" in commit messages and code comments. This creates instant searchability.

```
USAGE:
─────────────────────────────────────────────────────────────────────────────

COMMIT MESSAGE:
  fix(auth): prevent token race condition #FL-2024-01-15-auth

CODE COMMENT:
  // #FL-2024-01-15-auth: Queue requests during refresh
  // See: docs/fix-ledger.md

PR DESCRIPTION:
  Fixes issue with random logouts.
  
  Root cause documented in #FL-2024-01-15-auth

SEARCH:
  grep -r "#FL-2024-01" ./         # Find all references
```

### 7.6 Fix Ledger Integration with AI Agents

```
AI AGENT INSTRUCTIONS (Add to claude.md or similar)
─────────────────────────────────────────────────────────────────────────────

BEFORE DEBUGGING ANY ISSUE:
1. Check /docs/fix-ledger.md for similar issues
2. Search for related tags: #[relevant-tag]
3. Review attempted solutions that FAILED

WHEN FIX IS FOUND:
1. ADD entry to Fix Ledger if:
   - Issue took > 30 minutes
   - Multiple approaches tried
   - Root cause was non-obvious
2. Reference Fix Ledger entry in commit message
3. Update related documentation

NEVER:
- Try an approach already marked ❌ FAILED in ledger
- Skip consulting ledger "to save time"
- Implement a fix without checking for prior attempts
```

### 7.7 The Golden Rule of Anti-Bug-Loop

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        THE GOLDEN RULE                                       │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│                                                                              │
│        IF YOU'VE TRIED TO FIX SOMETHING 3 TIMES                             │
│                                                                              │
│                   AND IT'S STILL NOT FIXED                                   │
│                                                                              │
│                         ┌─────────┐                                          │
│                         │  STOP.  │                                          │
│                         └─────────┘                                          │
│                                                                              │
│                  YOU ARE PROBABLY IN A LOOP.                                 │
│                                                                              │
│                                                                              │
│  INSTEAD:                                                                    │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                              │
│  1. Stop fixing                                                              │
│  2. Document what you've tried                                               │
│  3. Question your assumptions about the problem                              │
│  4. Consider that the symptom ≠ root cause                                  │
│  5. Seek a different perspective (human or different AI model)              │
│  6. Return to first principles                                               │
│                                                                              │
│  THE BUG YOU'RE FIXING IS NOT THE BUG YOU THINK IT IS.                      │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 8. REGRESSION DISCIPLINE & SAFETY NETS

### 8.1 The Regression Discipline Matrix

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                      REGRESSION DISCIPLINE MATRIX                            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  WHAT IS A REGRESSION?                                                       │
│  A regression is when something that used to work, stops working.           │
│  This is worse than a bug—it's a betrayal of user trust.                    │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                              │
│  REGRESSION TYPES:                                                           │
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │ FUNCTIONAL REGRESSION                                                │    │
│  │ Feature X worked yesterday, doesn't work today                       │    │
│  │                                                                      │    │
│  │ Prevention:                                                          │    │
│  │ □ Comprehensive test coverage for all features                       │    │
│  │ □ Run full test suite before merge                                   │    │
│  │ □ E2E tests for critical user journeys                              │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │ PERFORMANCE REGRESSION                                               │    │
│  │ Page loaded in 1s yesterday, takes 3s today                          │    │
│  │                                                                      │    │
│  │ Prevention:                                                          │    │
│  │ □ Performance budgets with enforcement                               │    │
│  │ □ Lighthouse CI in pipeline                                          │    │
│  │ □ Bundle size monitoring                                             │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │ VISUAL REGRESSION                                                    │    │
│  │ Button was blue yesterday, is red today (unintentionally)            │    │
│  │                                                                      │    │
│  │ Prevention:                                                          │    │
│  │ □ Visual regression testing (Percy, Chromatic)                       │    │
│  │ □ Design system enforcement                                          │    │
│  │ □ Screenshot comparison in PR                                        │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │ DATA REGRESSION                                                      │    │
│  │ User had 100 items yesterday, has 50 today (data loss)               │    │
│  │                                                                      │    │
│  │ Prevention:                                                          │    │
│  │ □ Database migrations tested in staging                              │    │
│  │ □ Data integrity checks                                              │    │
│  │ □ Point-in-time recovery capability                                  │    │
│  │ □ Backup before every migration                                      │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │ SECURITY REGRESSION                                                  │    │
│  │ Endpoint was protected yesterday, is public today                    │    │
│  │                                                                      │    │
│  │ Prevention:                                                          │    │
│  │ □ Security tests in CI                                               │    │
│  │ □ Auth checks have test coverage                                     │    │
│  │ □ Regular security audits                                            │    │
│  │ □ Middleware ordering verification                                   │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 8.2 Safety Net Types

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           SAFETY NET TYPES                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  LAYER 1: TESTS                                                              │
│  ───────────────────────────────────────────────────────────────────────    │
│  First line of defense. Fast, automated, comprehensive.                     │
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │ Unit Tests        → Individual functions work correctly             │    │
│  │ Integration Tests → Components work together                         │    │
│  │ E2E Tests         → User flows complete successfully                 │    │
│  │ Visual Tests      → UI looks as expected                             │    │
│  │ Performance Tests → System meets speed requirements                  │    │
│  │ Security Tests    → Vulnerabilities not introduced                   │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                              │
│  LAYER 2: METRICS                                                            │
│  ───────────────────────────────────────────────────────────────────────    │
│  Quantitative measurements that alert on deviation.                         │
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │ Error Rates       → Alert if > threshold (e.g., 0.1%)               │    │
│  │ Response Times    → Alert if p95 > threshold (e.g., 500ms)          │    │
│  │ Conversion Rates  → Alert if drops > 10%                             │    │
│  │ User Engagement   → Alert if session duration drops                  │    │
│  │ Resource Usage    → Alert if CPU/memory spikes                       │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                              │
│  LAYER 3: ROLLBACKS                                                          │
│  ───────────────────────────────────────────────────────────────────────    │
│  Fast reversion when problems detected post-deployment.                     │
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │ Feature Flags     → Disable specific features instantly             │    │
│  │ Blue/Green        → Switch traffic to previous version              │    │
│  │ Git Revert        → Revert specific commits                          │    │
│  │ Database PITR     → Restore data to point in time                    │    │
│  │ Cache Invalidation→ Clear stale data                                 │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                              │
│  LAYER 4: GUARDRAILS                                                         │
│  ───────────────────────────────────────────────────────────────────────    │
│  Structural protections that prevent problems from occurring.               │
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │ Type Systems      → Catch type errors at compile time               │    │
│  │ Linting Rules     → Enforce code style and patterns                  │    │
│  │ Schema Validation → Ensure data integrity                            │    │
│  │ API Contracts     → Verify interface compliance                      │    │
│  │ Branch Protection → Require reviews before merge                     │    │
│  │ Rate Limiting     → Prevent system overload                          │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 8.3 Regression Prevention Workflow

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    REGRESSION PREVENTION WORKFLOW                            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  BEFORE WRITING CODE:                                                        │
│  ───────────────────────────────────────────────────────────────────────    │
│  □ Review existing tests in affected area                                   │
│  □ Identify what could break                                                │
│  □ Plan test coverage for new code                                          │
│                                                                              │
│                              │                                               │
│                              ▼                                               │
│                                                                              │
│  WHILE WRITING CODE:                                                         │
│  ───────────────────────────────────────────────────────────────────────    │
│  □ Write tests alongside code (TDD preferred)                               │
│  □ Run tests frequently                                                      │
│  □ Check adjacent functionality manually                                     │
│                                                                              │
│                              │                                               │
│                              ▼                                               │
│                                                                              │
│  BEFORE COMMITTING:                                                          │
│  ───────────────────────────────────────────────────────────────────────    │
│  □ Run full test suite                                                       │
│  □ Check linting/type errors                                                │
│  □ Self-review changes                                                       │
│  □ Run application and verify manually                                       │
│                                                                              │
│                              │                                               │
│                              ▼                                               │
│                                                                              │
│  BEFORE MERGING:                                                             │
│  ───────────────────────────────────────────────────────────────────────    │
│  □ PR reviewed by another person                                            │
│  □ CI pipeline passes                                                        │
│  □ Visual review of changes (screenshots if UI)                             │
│  □ Documentation updated                                                     │
│                                                                              │
│                              │                                               │
│                              ▼                                               │
│                                                                              │
│  AFTER DEPLOYING:                                                            │
│  ───────────────────────────────────────────────────────────────────────    │
│  □ Monitor error rates                                                       │
│  □ Check key metrics                                                         │
│  □ Smoke test critical paths                                                 │
│  □ Be ready to rollback                                                      │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 8.4 When Regression Occurs

```
REGRESSION RESPONSE PROTOCOL
─────────────────────────────────────────────────────────────────────────────

STEP 1: DETECT (Immediate)
─────────────────────────────────────────────────────────────────────────────
  HOW: Monitoring alerts, user reports, automated tests
  
  □ Confirm regression is real (not false alarm)
  □ Identify scope of impact
  □ Determine severity

STEP 2: RESPOND (Within 5 minutes for critical)
─────────────────────────────────────────────────────────────────────────────
  DECISION TREE:
  
  Is users' data at risk?
    YES → Rollback immediately, investigate later
    NO  → Continue assessment
  
  Is core functionality broken?
    YES → Rollback immediately, investigate later
    NO  → Can likely fix forward
  
  Can we fix in < 15 minutes?
    YES → Fix forward with hot patch
    NO  → Rollback, then fix properly

STEP 3: ROLLBACK (If needed)
─────────────────────────────────────────────────────────────────────────────
  □ Execute rollback procedure
  □ Verify system is back to working state
  □ Communicate to affected users
  □ Preserve evidence for investigation

STEP 4: ROOT CAUSE (After stability restored)
─────────────────────────────────────────────────────────────────────────────
  □ What change caused the regression?
  □ Why wasn't it caught by tests?
  □ Why wasn't it caught in review?
  □ What systemic issue allowed this?

STEP 5: PREVENT (Before next deployment)
─────────────────────────────────────────────────────────────────────────────
  □ Add test that would have caught this
  □ Update review checklist if applicable
  □ Add to Fix Ledger
  □ Share learnings with team
```

### 8.5 Regression Prevention Checklist (Pre-Deployment)

```
PRE-DEPLOYMENT REGRESSION CHECK
─────────────────────────────────────────────────────────────────────────────

□ FUNCTIONAL
  □ All automated tests pass
  □ Critical user journeys manually verified
  □ Edge cases tested
  □ Error handling verified

□ PERFORMANCE
  □ Lighthouse score maintained (≥ [PROJECT_THRESHOLD])
  □ Bundle size within budget
  □ API response times acceptable
  □ No new N+1 queries

□ VISUAL
  □ UI matches design specifications
  □ No unintended visual changes
  □ Responsive breakpoints working
  □ Animation performance acceptable

□ DATA
  □ Migrations tested
  □ Backward compatibility maintained
  □ No data loss possible
  □ Rollback procedure verified

□ SECURITY
  □ Auth/authz unchanged or improved
  □ No new vulnerabilities introduced
  □ Sensitive data handling reviewed
  □ Input validation in place

□ DOCUMENTATION
  □ API documentation updated
  □ README updated if needed
  □ Changelog entry added
  □ Breaking changes documented

─────────────────────────────────────────────────────────────────────────────
ALL BOXES MUST BE CHECKED BEFORE DEPLOYMENT
─────────────────────────────────────────────────────────────────────────────
```

---

## PART II SUMMARY

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                   PART II: PRIMITIVE EXECUTION FRAMEWORK                     │
│                           KEY TAKEAWAYS                                      │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  THE SIX PRIMITIVES:                                                         │
│  ─────────────────────────────────────────────────────────────────────────  │
│  1. STATE      → Current verified reality                                   │
│  2. ARTIFACT   → Named, versioned output                                    │
│  3. CHANGE     → Defined delta between states                               │
│  4. CHECK      → Verification of outcome                                    │
│  5. ROLLBACK   → Return to known good state                                 │
│  6. TRACEABILITY → Complete audit trail                                     │
│                                                                              │
│  PRIMITIVE LIFECYCLE:                                                        │
│  ─────────────────────────────────────────────────────────────────────────  │
│  Assess State → Define Change → Produce Artifact → Verify →                 │
│  → Commit (pass) or Rollback (fail) → New State                             │
│                                                                              │
│  THE FIX LEDGER:                                                             │
│  ─────────────────────────────────────────────────────────────────────────  │
│  • Prevents Ilya's Loop (endless bug-fix cycles)                            │
│  • Documents what was tried and why it failed/worked                        │
│  • Builds institutional knowledge                                            │
│  • Must be consulted BEFORE debugging                                        │
│  • Golden Rule: 3 failed attempts = STOP, you're in a loop                  │
│                                                                              │
│  REGRESSION DISCIPLINE:                                                      │
│  ─────────────────────────────────────────────────────────────────────────  │
│  • Types: Functional, Performance, Visual, Data, Security                   │
│  • Safety Nets: Tests → Metrics → Rollbacks → Guardrails                   │
│  • Prevention Workflow: Before/During/After every change                    │
│  • Response Protocol: Detect → Respond → Rollback → Root Cause → Prevent   │
│                                                                              │
│  CORE PRINCIPLES:                                                            │
│  ─────────────────────────────────────────────────────────────────────────  │
│  • Never guess—verify                                                        │
│  • Every change is traceable                                                 │
│  • Rollback is always possible                                               │
│  • Tests catch what humans miss                                              │
│  • Memory (Fix Ledger) breaks loops                                          │
│  • Regressions are worse than bugs                                           │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---


---
*End of propagated content*
