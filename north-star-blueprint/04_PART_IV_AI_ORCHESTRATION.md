# PART IV: AI ORCHESTRATION & INTELLIGENCE

---

## 13. MODEL INTELLIGENCE MATRIX

> "The difference between amateur and professional AI development is not the tools—it's the orchestration."

### 13.1 Model Selection Philosophy

Not all AI models are created equal. Each has strengths, weaknesses, and optimal use cases. The professional AI orchestrator understands these differences and routes tasks accordingly.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                      MODEL INTELLIGENCE MATRIX                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  MODEL CLASS          STRENGTHS                 OPTIMAL USE CASES            │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                              │
│  FRONTIER CLASS                                                              │
│  (Claude Opus, GPT-4, Gemini Ultra)                                         │
│  ───────────────────────────────────────────────────────────────────────    │
│  • Deepest reasoning                      • Complex architecture decisions  │
│  • Nuanced understanding                  • Multi-step planning             │
│  • Best at ambiguous tasks                • Creative problem solving        │
│  • Highest quality output                 • Code review and analysis        │
│  • Most expensive                         • Critical business logic         │
│  • Slower response                        • System design                   │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                              │
│  BALANCED CLASS                                                              │
│  (Claude Sonnet, GPT-4o, Gemini Pro)                                        │
│  ───────────────────────────────────────────────────────────────────────    │
│  • Strong reasoning                       • Day-to-day development          │
│  • Good speed/quality balance             • Feature implementation          │
│  • Cost-effective                         • Debugging                       │
│  • Reliable output                        • Documentation writing           │
│  • Good context handling                  • Test generation                 │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                              │
│  SPEED CLASS                                                                 │
│  (Claude Haiku, GPT-4o-mini, Gemini Flash)                                  │
│  ───────────────────────────────────────────────────────────────────────    │
│  • Fastest response                       • Quick lookups                   │
│  • Lowest cost                            • Simple transformations          │
│  • High throughput                        • Syntax checks                   │
│  • Good for simple tasks                  • Formatting tasks                │
│  • May miss nuance                        • Bulk operations                 │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                              │
│  SPECIALIZED CLASS                                                           │
│  (Code-specific, Vision, Embedding models)                                   │
│  ───────────────────────────────────────────────────────────────────────    │
│  • Domain expertise                       • Specific task types             │
│  • Optimized performance                  • Image analysis                  │
│  • May lack generality                    • Code completion                 │
│  • Task-specific accuracy                 • Semantic search                 │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 13.2 Model Selection Decision Tree

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    MODEL SELECTION DECISION TREE                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│                              START                                           │
│                                │                                             │
│                                ▼                                             │
│                    ┌─────────────────────┐                                  │
│                    │ Is this a critical  │                                  │
│                    │ decision with high  │                                  │
│                    │ stakes?             │                                  │
│                    └──────────┬──────────┘                                  │
│                               │                                             │
│              ┌────────────────┼────────────────┐                            │
│              │ YES            │                │ NO                         │
│              ▼                │                ▼                            │
│    ┌─────────────────┐        │      ┌─────────────────┐                   │
│    │ FRONTIER CLASS  │        │      │ Is speed more   │                   │
│    │ + Multi-model   │        │      │ important than  │                   │
│    │   verification  │        │      │ depth?          │                   │
│    └─────────────────┘        │      └────────┬────────┘                   │
│                               │               │                            │
│                               │    ┌──────────┼──────────┐                 │
│                               │    │ YES      │          │ NO              │
│                               │    ▼          │          ▼                 │
│                               │  ┌────────────┴───┐  ┌─────────────────┐   │
│                               │  │ Is it a simple │  │ BALANCED CLASS  │   │
│                               │  │ task?          │  │ (Default choice)│   │
│                               │  └───────┬────────┘  └─────────────────┘   │
│                               │          │                                  │
│                               │   ┌──────┴──────┐                          │
│                               │   │ YES   │ NO  │                          │
│                               │   ▼       ▼     │                          │
│                               │ ┌───────┐ ┌─────┴─────┐                    │
│                               │ │ SPEED │ │ BALANCED  │                    │
│                               │ │ CLASS │ │ CLASS     │                    │
│                               │ └───────┘ └───────────┘                    │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                              │
│  DEFAULT ROUTING:                                                            │
│  • If unsure → BALANCED CLASS                                               │
│  • For production code → BALANCED or FRONTIER                               │
│  • For exploration → SPEED CLASS is fine                                    │
│  • For architecture → FRONTIER CLASS required                               │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 13.3 Task-to-Model Mapping

```
TASK-TO-MODEL MAPPING TABLE
─────────────────────────────────────────────────────────────────────────────

TASK TYPE                          │ RECOMMENDED MODEL CLASS
───────────────────────────────────┼─────────────────────────────────────────
                                   │
PLANNING & ARCHITECTURE            │
───────────────────────────────────┼─────────────────────────────────────────
System design                      │ Frontier
Architecture decisions             │ Frontier + Multi-model
Database schema design             │ Frontier
API contract design                │ Balanced → Frontier
Technology selection               │ Frontier + Multi-model
                                   │
IMPLEMENTATION                     │
───────────────────────────────────┼─────────────────────────────────────────
Feature implementation             │ Balanced
Component creation                 │ Balanced
API endpoint coding                │ Balanced
Bug fixing (simple)                │ Balanced
Bug fixing (complex)               │ Frontier
Refactoring                        │ Balanced
                                   │
REVIEW & ANALYSIS                  │
───────────────────────────────────┼─────────────────────────────────────────
Code review                        │ Frontier
Security review                    │ Frontier + Specialized
Performance analysis               │ Balanced
Dependency audit                   │ Balanced
                                   │
DOCUMENTATION                      │
───────────────────────────────────┼─────────────────────────────────────────
Technical documentation            │ Balanced
User documentation                 │ Balanced
API documentation                  │ Balanced
README creation                    │ Balanced
                                   │
TESTING                            │
───────────────────────────────────┼─────────────────────────────────────────
Unit test generation               │ Balanced
Integration test generation        │ Balanced
E2E test generation                │ Balanced
Test case ideation                 │ Frontier
                                   │
OPERATIONS                         │
───────────────────────────────────┼─────────────────────────────────────────
Formatting/linting                 │ Speed
Simple transformations             │ Speed
Bulk operations                    │ Speed
Quick lookups                      │ Speed
Error message generation           │ Speed
```

### 13.4 Cost-Quality Trade-off Matrix

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    COST-QUALITY TRADE-OFF MATRIX                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│                              QUALITY REQUIRED                                │
│                    Low         Medium         High                           │
│              ┌─────────────────────────────────────────────┐                │
│              │              │              │               │                │
│    High      │   OVERKILL   │   CONSIDER   │   FRONTIER    │                │
│    Budget    │   Use lower  │   Frontier   │   CLASS       │                │
│              │   tier       │   or multi   │   Required    │                │
│    ──────────┼──────────────┼──────────────┼───────────────┤                │
│    B         │              │              │               │                │
│    U  Medium │   SPEED      │   BALANCED   │   BALANCED    │                │
│    D         │   CLASS      │   CLASS      │   + Review    │                │
│    G  ───────┼──────────────┼──────────────┼───────────────┤                │
│    E         │              │              │               │                │
│    T  Low    │   SPEED      │   SPEED +    │   RE-SCOPE    │                │
│              │   CLASS      │   Validation │   or wait     │                │
│              └─────────────────────────────────────────────┘                │
│                                                                              │
│  KEY INSIGHT:                                                                │
│  The goal is not to minimize cost—it's to maximize value per token.         │
│  Using a cheaper model that produces wrong output costs more in rework.     │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 14. THE CORE 4 PRIMITIVES

Every AI interaction can be decomposed into four fundamental capabilities. Understanding these enables effective orchestration.

### 14.1 The Four Primitives

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          THE CORE 4 PRIMITIVES                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                         1. RETRIEVE                                  │    │
│  │              "Find and access relevant information"                  │    │
│  │                                                                      │    │
│  │  • Search through files and documents                               │    │
│  │  • Access external knowledge bases                                   │    │
│  │  • Query databases                                                   │    │
│  │  • Fetch from APIs                                                   │    │
│  │  • Load context into memory                                          │    │
│  │                                                                      │    │
│  │  TOOLS: File readers, search, RAG, MCP file tools                   │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                         2. REASON                                    │    │
│  │              "Analyze, plan, and make decisions"                     │    │
│  │                                                                      │    │
│  │  • Understand requirements                                           │    │
│  │  • Analyze problems                                                  │    │
│  │  • Generate solutions                                                │    │
│  │  • Make trade-off decisions                                          │    │
│  │  • Plan multi-step approaches                                        │    │
│  │                                                                      │    │
│  │  TOOLS: Model inference, chain-of-thought, planning prompts         │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                         3. CREATE                                    │    │
│  │              "Generate new content and artifacts"                    │    │
│  │                                                                      │    │
│  │  • Write code                                                        │    │
│  │  • Generate documentation                                            │    │
│  │  • Create configurations                                             │    │
│  │  • Produce test cases                                                │    │
│  │  • Draft communications                                              │    │
│  │                                                                      │    │
│  │  TOOLS: Code generation, text generation, file writers              │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                         4. VERIFY                                    │    │
│  │              "Check correctness and quality"                         │    │
│  │                                                                      │    │
│  │  • Run tests                                                         │    │
│  │  • Check syntax                                                      │    │
│  │  • Validate output                                                   │    │
│  │  • Review for errors                                                 │    │
│  │  • Compare against requirements                                      │    │
│  │                                                                      │    │
│  │  TOOLS: Linters, test runners, validators, diff tools               │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 14.2 Primitive Composition Patterns

```
PRIMITIVE COMPOSITION PATTERNS
─────────────────────────────────────────────────────────────────────────────

PATTERN 1: RETRIEVE-REASON-CREATE (Standard Development)
─────────────────────────────────────────────────────────────────────────────

  ┌──────────┐    ┌──────────┐    ┌──────────┐
  │ RETRIEVE │───►│  REASON  │───►│  CREATE  │
  │          │    │          │    │          │
  │ Read     │    │ Analyze  │    │ Write    │
  │ existing │    │ approach │    │ new code │
  │ code     │    │          │    │          │
  └──────────┘    └──────────┘    └──────────┘

  USE WHEN: Building new features based on existing patterns


PATTERN 2: RETRIEVE-REASON-CREATE-VERIFY (Full Cycle)
─────────────────────────────────────────────────────────────────────────────

  ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
  │ RETRIEVE │───►│  REASON  │───►│  CREATE  │───►│  VERIFY  │
  │          │    │          │    │          │    │          │
  └──────────┘    └──────────┘    └──────────┘    └────┬─────┘
                                                       │
                       ┌───────────────────────────────┘
                       │ If verification fails
                       ▼
                  Back to REASON

  USE WHEN: Production code that must be correct


PATTERN 3: REASON-CREATE-VERIFY-ITERATE (Exploratory)
─────────────────────────────────────────────────────────────────────────────

  ┌──────────┐    ┌──────────┐    ┌──────────┐
  │  REASON  │───►│  CREATE  │───►│  VERIFY  │
  │          │    │          │    │          │
  └──────────┘    └──────────┘    └────┬─────┘
       ▲                               │
       │                               │
       └───────────────────────────────┘
              Iterate until correct

  USE WHEN: Exploring solutions without existing patterns


PATTERN 4: RETRIEVE-VERIFY (Audit Pattern)
─────────────────────────────────────────────────────────────────────────────

  ┌──────────┐    ┌──────────┐
  │ RETRIEVE │───►│  VERIFY  │
  │          │    │          │
  │ Load     │    │ Check    │
  │ code     │    │ quality  │
  └──────────┘    └──────────┘

  USE WHEN: Code review, security audit, quality checks
```

### 14.3 Primitive Quality Requirements

```
PRIMITIVE QUALITY REQUIREMENTS
─────────────────────────────────────────────────────────────────────────────

RETRIEVE QUALITY
─────────────────────────────────────────────────────────────────────────────
□ Retrieved content is current (not stale cache)
□ Retrieved content is complete (not truncated)
□ Retrieved content is relevant (not noise)
□ Source is identified and traceable
□ No hallucinated file contents

REASON QUALITY
─────────────────────────────────────────────────────────────────────────────
□ Reasoning is explicit (chain-of-thought visible)
□ Assumptions are stated
□ Alternatives are considered
□ Trade-offs are acknowledged
□ Confidence level is indicated

CREATE QUALITY
─────────────────────────────────────────────────────────────────────────────
□ Output matches requirements
□ Output follows existing patterns
□ Output is complete (not partial)
□ Output is properly formatted
□ Output is immediately usable

VERIFY QUALITY
─────────────────────────────────────────────────────────────────────────────
□ Verification is comprehensive
□ Verification is automated where possible
□ Verification results are clear
□ Failures include actionable information
□ False positives/negatives are minimized
```

---

## 15. TOOL HIERARCHY & COMPOSITION

### 15.1 Tool Classification

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         TOOL HIERARCHY                                       │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  TIER 1: FOUNDATIONAL TOOLS                                                  │
│  ───────────────────────────────────────────────────────────────────────    │
│  Core capabilities that all AI systems need.                                │
│                                                                              │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐           │
│  │ File Read   │ │ File Write  │ │   Search    │ │   Execute   │           │
│  │             │ │             │ │             │ │             │           │
│  │ Read any    │ │ Create/edit │ │ Find files  │ │ Run shell   │           │
│  │ file type   │ │ files       │ │ and content │ │ commands    │           │
│  └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘           │
│                                                                              │
│  TIER 2: DEVELOPMENT TOOLS                                                   │
│  ───────────────────────────────────────────────────────────────────────    │
│  Specialized tools for software development workflows.                      │
│                                                                              │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐           │
│  │    Git      │ │   Linter    │ │    Test     │ │   Build     │           │
│  │             │ │             │ │   Runner    │ │             │           │
│  │ Version     │ │ Code        │ │ Execute     │ │ Compile/    │           │
│  │ control     │ │ quality     │ │ tests       │ │ bundle      │           │
│  └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘           │
│                                                                              │
│  TIER 3: INTEGRATION TOOLS (MCPs)                                            │
│  ───────────────────────────────────────────────────────────────────────    │
│  External system integrations via Model Context Protocol.                   │
│                                                                              │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐           │
│  │  Database   │ │   Browser   │ │    API      │ │   Cloud     │           │
│  │    MCP      │ │    MCP      │ │    MCP      │ │    MCP      │           │
│  │             │ │             │ │             │ │             │           │
│  │ Query/      │ │ Navigate/   │ │ Call        │ │ Deploy/     │           │
│  │ modify DB   │ │ automate    │ │ external    │ │ provision   │           │
│  └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘           │
│                                                                              │
│  TIER 4: ORCHESTRATION TOOLS                                                 │
│  ───────────────────────────────────────────────────────────────────────    │
│  Meta-tools that coordinate other tools and agents.                         │
│                                                                              │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐           │
│  │  Sub-Agent  │ │   Workflow  │ │   Memory    │ │  Scheduler  │           │
│  │  Spawner    │ │   Engine    │ │   Manager   │ │             │           │
│  │             │ │             │ │             │ │             │           │
│  │ Create      │ │ Multi-step  │ │ Persist     │ │ Time-based  │           │
│  │ sub-agents  │ │ automation  │ │ context     │ │ triggers    │           │
│  └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘           │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 15.2 Tool Selection Principles

```
TOOL SELECTION PRINCIPLES
─────────────────────────────────────────────────────────────────────────────

PRINCIPLE 1: USE THE SIMPLEST TOOL THAT WORKS
─────────────────────────────────────────────────────────────────────────────
Don't use a database MCP when a file read will do.
Don't spawn a sub-agent for a simple task.
Simpler tools = fewer failure points = faster execution.

PRINCIPLE 2: VERIFY TOOL AVAILABILITY BEFORE USE
─────────────────────────────────────────────────────────────────────────────
Check that the tool exists in current context.
Check that the tool is properly configured.
Don't assume tools from other contexts are available.

PRINCIPLE 3: PREFER COMPOSABLE TOOLS
─────────────────────────────────────────────────────────────────────────────
Tools that do one thing well and combine easily.
Avoid monolithic tools that try to do everything.
Build complex workflows from simple primitives.

PRINCIPLE 4: HANDLE TOOL FAILURES GRACEFULLY
─────────────────────────────────────────────────────────────────────────────
Every tool call can fail.
Have fallback approaches ready.
Report failures clearly with context.

PRINCIPLE 5: MINIMIZE TOOL CALLS
─────────────────────────────────────────────────────────────────────────────
Each tool call has latency cost.
Batch operations where possible.
Cache results when appropriate.
```

### 15.3 Tool Composition Patterns

```
TOOL COMPOSITION PATTERNS
─────────────────────────────────────────────────────────────────────────────

PATTERN 1: SEQUENTIAL PIPELINE
─────────────────────────────────────────────────────────────────────────────
Tool A output → Tool B input → Tool C input → Final output

Example: Read file → Lint → Format → Write file

Use when: Each step transforms the previous output


PATTERN 2: PARALLEL EXECUTION
─────────────────────────────────────────────────────────────────────────────
              ┌─► Tool A ─┐
Input ───────►├─► Tool B ─├───► Combine outputs
              └─► Tool C ─┘

Example: Read multiple files simultaneously

Use when: Steps are independent and can run concurrently


PATTERN 3: CONDITIONAL BRANCHING
─────────────────────────────────────────────────────────────────────────────
              ┌─► Tool A (if condition)
Input → Check ┤
              └─► Tool B (else)

Example: If TypeScript file → TSC check, else → Syntax check

Use when: Different tools needed based on input characteristics


PATTERN 4: RETRY WITH FALLBACK
─────────────────────────────────────────────────────────────────────────────
Tool A → if fails → Tool A (retry) → if fails → Tool B (fallback)

Example: API call → retry with backoff → fallback to cached data

Use when: Reliability is critical and alternatives exist


PATTERN 5: VERIFICATION LOOP
─────────────────────────────────────────────────────────────────────────────
          ┌──────────────────────────┐
          │                          │
          ▼                          │
Create → Verify → if fails → Modify ─┘
          │
          └─► if passes → Done

Example: Generate code → Run tests → Fix failures → Repeat

Use when: Output must meet specific criteria
```

---

## 16. CONTEXT ENGINEERING PROTOCOL

### 16.1 Context Window Management

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                     CONTEXT ENGINEERING                                      │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  The context window is a FINITE, PRECIOUS resource.                         │
│  Every token matters. Waste nothing.                                        │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                              │
│  CONTEXT BUDGET ALLOCATION                                                   │
│  ───────────────────────────────────────────────────────────────────────    │
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                                                                      │    │
│  │  ████████████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │    │
│  │  │              │                                                │    │
│  │  │   System     │              Available for                     │    │
│  │  │   Context    │              Task Context                      │    │
│  │  │   (15-25%)   │              (75-85%)                          │    │
│  │  │              │                                                │    │
│  │  └──────────────┴────────────────────────────────────────────────┘    │
│  │                                                                      │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  SYSTEM CONTEXT (15-25%):                                                    │
│  • Blueprint principles (condensed)                                          │
│  • Project-specific rules (Superprompt)                                      │
│  • Current phase context                                                     │
│  • Critical constraints                                                      │
│                                                                              │
│  TASK CONTEXT (75-85%):                                                      │
│  • Relevant code files                                                       │
│  • Documentation needed                                                      │
│  • Conversation history                                                      │
│  • Tool outputs                                                              │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 16.2 Context Loading Strategy

```
CONTEXT LOADING STRATEGY
─────────────────────────────────────────────────────────────────────────────

STEP 1: LOAD ESSENTIAL CONTEXT FIRST
─────────────────────────────────────────────────────────────────────────────
Priority order:
1. Current task requirements (what needs to be done)
2. Directly relevant code (files being modified)
3. Type definitions and interfaces
4. Related tests
5. Documentation for dependencies
6. Historical context (if relevant)

STEP 2: LOAD ON-DEMAND
─────────────────────────────────────────────────────────────────────────────
Don't load everything upfront:
• Load files as needed
• Use search to find relevant content
• Request specific sections, not entire files
• Summarize large documents

STEP 3: PRUNE AGGRESSIVELY
─────────────────────────────────────────────────────────────────────────────
Remove context that's no longer needed:
• Completed sub-tasks
• Resolved discussions
• Superseded information
• Verbose explanations (replace with summaries)

STEP 4: COMPRESS WHEN POSSIBLE
─────────────────────────────────────────────────────────────────────────────
• Summarize long conversations
• Extract key decisions from discussions
• Reference files by path instead of full content
• Use structured formats over prose
```

### 16.3 Context Priority Matrix

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                      CONTEXT PRIORITY MATRIX                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  PRIORITY │ CONTEXT TYPE              │ INCLUDE WHEN                        │
│  ─────────┼───────────────────────────┼─────────────────────────────────────│
│           │                           │                                     │
│  P0       │ Task requirements         │ ALWAYS                              │
│  CRITICAL │ Error messages            │ ALWAYS (when debugging)             │
│           │ Critical constraints      │ ALWAYS                              │
│           │                           │                                     │
│  ─────────┼───────────────────────────┼─────────────────────────────────────│
│           │                           │                                     │
│  P1       │ Files being modified      │ ALWAYS                              │
│  HIGH     │ Type definitions          │ When writing code                   │
│           │ Test files                │ When modifying tested code          │
│           │ API contracts             │ When working with APIs              │
│           │                           │                                     │
│  ─────────┼───────────────────────────┼─────────────────────────────────────│
│           │                           │                                     │
│  P2       │ Related files             │ When patterns needed                │
│  MEDIUM   │ Documentation             │ When clarification needed           │
│           │ Previous conversation     │ When continuity needed              │
│           │ Fix Ledger entries        │ When debugging                      │
│           │                           │                                     │
│  ─────────┼───────────────────────────┼─────────────────────────────────────│
│           │                           │                                     │
│  P3       │ Style guides              │ Reference, not full inclusion       │
│  LOW      │ Full file listings        │ Search instead of loading           │
│           │ Historical decisions      │ Only when directly relevant         │
│           │ Verbose logs              │ Summarize instead                   │
│           │                           │                                     │
│  ─────────┼───────────────────────────┼─────────────────────────────────────│
│           │                           │                                     │
│  P4       │ Unrelated files           │ NEVER                               │
│  EXCLUDE  │ Binary files              │ NEVER                               │
│           │ Generated code            │ NEVER (unless debugging it)         │
│           │ Duplicate information     │ NEVER                               │
│           │                           │                                     │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 16.4 Context Refresh Protocol

```
CONTEXT REFRESH PROTOCOL
─────────────────────────────────────────────────────────────────────────────

WHEN TO REFRESH CONTEXT:
─────────────────────────────────────────────────────────────────────────────
□ Starting a new task
□ Task scope changes significantly
□ External files have been modified
□ Context feels stale or confusing
□ AI responses suggest outdated understanding
□ Switching between features/areas
□ After significant time gap (> 1 hour)

HOW TO REFRESH:
─────────────────────────────────────────────────────────────────────────────
1. Summarize what's been accomplished
2. Clear task-specific context
3. Re-read essential files fresh
4. Verify current state of code
5. Confirm current requirements
6. Resume with clean context

INDICATORS CONTEXT NEEDS REFRESH:
─────────────────────────────────────────────────────────────────────────────
• AI refers to code that no longer exists
• AI suggests changes already made
• AI seems confused about current state
• AI gives inconsistent answers
• AI misses obvious context
• Conversation has grown very long
```

---

## 17. CONFIDENCE CALIBRATION ENGINE

### 17.1 Confidence Levels

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                     CONFIDENCE CALIBRATION                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  AI confidence should be EXPLICIT and CALIBRATED.                           │
│  Overconfidence is dangerous. Underconfidence wastes time.                  │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                              │
│  CONFIDENCE LEVELS:                                                          │
│  ───────────────────────────────────────────────────────────────────────    │
│                                                                              │
│  ██████████ CERTAIN (95%+)                                                  │
│  ─────────────────────────────────────────────────────────────────────────  │
│  • Have verified information directly                                        │
│  • Based on read files and explicit documentation                           │
│  • Code tested and working                                                   │
│  • No assumptions made                                                       │
│                                                                              │
│  Action: Proceed without verification                                        │
│                                                                              │
│  ────────────────────────────────────────────────────────────────────────   │
│                                                                              │
│  ████████░░ HIGH (80-95%)                                                   │
│  ─────────────────────────────────────────────────────────────────────────  │
│  • Based on strong patterns and evidence                                    │
│  • Most similar cases follow this pattern                                   │
│  • Minor uncertainty in edge cases                                          │
│  • Source is reliable but not verified directly                             │
│                                                                              │
│  Action: Proceed with quick verification                                     │
│                                                                              │
│  ────────────────────────────────────────────────────────────────────────   │
│                                                                              │
│  ██████░░░░ MEDIUM (50-80%)                                                 │
│  ─────────────────────────────────────────────────────────────────────────  │
│  • Based on general knowledge or patterns                                   │
│  • Some assumptions made                                                     │
│  • Multiple valid approaches possible                                        │
│  • Would benefit from review                                                 │
│                                                                              │
│  Action: Verify before proceeding, consider alternatives                    │
│                                                                              │
│  ────────────────────────────────────────────────────────────────────────   │
│                                                                              │
│  ███░░░░░░░ LOW (20-50%)                                                    │
│  ─────────────────────────────────────────────────────────────────────────  │
│  • Speculation based on limited information                                 │
│  • Significant assumptions made                                              │
│  • Haven't seen the actual code/docs                                        │
│  • Best guess without verification                                           │
│                                                                              │
│  Action: Must verify, do not proceed without confirmation                   │
│                                                                              │
│  ────────────────────────────────────────────────────────────────────────   │
│                                                                              │
│  █░░░░░░░░░ UNCERTAIN (<20%)                                                │
│  ─────────────────────────────────────────────────────────────────────────  │
│  • Don't have enough information                                             │
│  • Outside area of knowledge                                                 │
│  • Conflicting information present                                           │
│  • Need more context before proceeding                                       │
│                                                                              │
│  Action: STOP, ask clarifying questions, gather more information            │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 17.2 Confidence Indicators

```
CONFIDENCE INDICATORS
─────────────────────────────────────────────────────────────────────────────

INCREASES CONFIDENCE:
─────────────────────────────────────────────────────────────────────────────
✓ Have read the actual file/code
✓ Information from primary source
✓ Tested and verified working
✓ Consistent with multiple sources
✓ Within domain of expertise
✓ Recent, up-to-date information
✓ Explicit documentation exists
✓ Pattern seen multiple times

DECREASES CONFIDENCE:
─────────────────────────────────────────────────────────────────────────────
✗ Haven't read the actual file/code
✗ Information from memory only
✗ Assumptions about implementation
✗ Edge cases not considered
✗ Outside domain of expertise
✗ Information may be outdated
✗ No documentation available
✗ First time seeing this pattern
✗ Multiple conflicting approaches
✗ Complex interactions involved
```

### 17.3 Confidence Communication

```
CONFIDENCE COMMUNICATION PATTERNS
─────────────────────────────────────────────────────────────────────────────

CERTAIN:
  "This will work because I've verified it against the actual code."
  "The documentation explicitly states this."
  "I've tested this approach and confirmed it works."

HIGH:
  "Based on the code I've read, this should work."
  "This follows the established pattern in the codebase."
  "I'm confident this is correct, but let's verify."

MEDIUM:
  "I believe this is the right approach, but there are alternatives."
  "This should work based on general knowledge, but I'd recommend testing."
  "I'm not certain about edge cases here."

LOW:
  "I'm not sure this is correct—I haven't seen the actual implementation."
  "This is my best guess, but please verify."
  "I'd need to see the code to be confident."

UNCERTAIN:
  "I don't have enough information to answer this reliably."
  "Could you provide more context or show me the relevant code?"
  "I'm not confident in any approach without more information."
```

---

## 18. AUTONOMY DIAL SYSTEM

### 18.1 Autonomy Levels

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       AUTONOMY DIAL SYSTEM                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  The autonomy dial controls how independently the AI operates.              │
│  Adjust based on task criticality and trust level.                          │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                              │
│          1        2        3        4        5        6        7            │
│          │        │        │        │        │        │        │            │
│    ┌─────┴────────┴────────┴────────┴────────┴────────┴────────┴─────┐     │
│    │░░░░░░░░░░░░░░░████████████████████████████████████████████████│     │
│    └─────────────────────────────────────────────────────────────────┘     │
│    │              │                   │                            │        │
│    ▼              ▼                   ▼                            ▼        │
│  SUGGEST       DRAFT              EXECUTE                    AUTONOMOUS     │
│  ONLY          & WAIT             WITH CHECKS                               │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                              │
│  LEVEL 1-2: SUGGEST ONLY                                                     │
│  ───────────────────────────────────────────────────────────────────────    │
│  AI explains what it would do but makes no changes.                         │
│  Human reviews and decides whether to proceed.                              │
│  Use for: Critical decisions, unfamiliar territory, learning                │
│                                                                              │
│  LEVEL 3-4: DRAFT & WAIT                                                     │
│  ───────────────────────────────────────────────────────────────────────    │
│  AI creates drafts and waits for approval before finalizing.                │
│  Human reviews output before it takes effect.                               │
│  Use for: Most development work, moderate risk tasks                        │
│                                                                              │
│  LEVEL 5-6: EXECUTE WITH CHECKS                                              │
│  ───────────────────────────────────────────────────────────────────────    │
│  AI executes and verifies, pausing only if issues found.                    │
│  Human is informed of results but doesn't gate every action.                │
│  Use for: Well-understood tasks, established patterns                       │
│                                                                              │
│  LEVEL 7: FULL AUTONOMOUS                                                    │
│  ───────────────────────────────────────────────────────────────────────    │
│  AI executes full workflow independently.                                   │
│  Human is informed at completion or on failure.                             │
│  Use for: Routine tasks, high trust, low risk                               │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 18.2 Autonomy Selection Matrix

```
AUTONOMY SELECTION MATRIX
─────────────────────────────────────────────────────────────────────────────

                        │ Low Risk      │ Medium Risk   │ High Risk     │
────────────────────────┼───────────────┼───────────────┼───────────────│
                        │               │               │               │
Well-understood         │  Level 6-7    │  Level 5-6    │  Level 3-4    │
(familiar patterns)     │  Autonomous   │  Execute+Check│  Draft & Wait │
                        │               │               │               │
────────────────────────┼───────────────┼───────────────┼───────────────│
                        │               │               │               │
Moderate understanding  │  Level 5-6    │  Level 3-4    │  Level 2-3    │
(some unknowns)         │  Execute+Check│  Draft & Wait │  Suggest/Draft│
                        │               │               │               │
────────────────────────┼───────────────┼───────────────┼───────────────│
                        │               │               │               │
New/Unfamiliar          │  Level 3-4    │  Level 2-3    │  Level 1-2    │
(exploration)           │  Draft & Wait │  Suggest/Draft│  Suggest Only │
                        │               │               │               │
────────────────────────┴───────────────┴───────────────┴───────────────┘

RISK FACTORS:
  • Data loss potential
  • Security implications
  • User-facing impact
  • Reversibility difficulty
  • Cost of mistakes
```

### 18.3 Autonomy Escalation Protocol

```
AUTONOMY ESCALATION PROTOCOL
─────────────────────────────────────────────────────────────────────────────

AI SHOULD REDUCE AUTONOMY (pause and ask) WHEN:
─────────────────────────────────────────────────────────────────────────────
□ About to delete files or data
□ About to modify database schema
□ About to change authentication/authorization
□ Confidence drops below threshold
□ Multiple valid approaches exist
□ Unexpected error encountered
□ Action would affect production
□ Action is irreversible
□ Action conflicts with known constraints
□ Human input needed for business decision

AI SHOULD INCREASE AUTONOMY (proceed) WHEN:
─────────────────────────────────────────────────────────────────────────────
□ Task matches established pattern
□ All checks pass
□ Changes are easily reversible
□ Working in isolated environment
□ Human has explicitly granted autonomy
□ Following pre-approved procedure
□ Making read-only operations
□ Generating drafts (not final output)
```

---

## 19. MULTI-MODEL CONSENSUS FRAMEWORK

### 19.1 When to Use Multi-Model

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    MULTI-MODEL CONSENSUS                                     │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  WHEN TO USE MULTI-MODEL VERIFICATION:                                       │
│  ───────────────────────────────────────────────────────────────────────    │
│                                                                              │
│  ✅ REQUIRED:                                                                │
│  • Architecture decisions that are hard to reverse                          │
│  • Security-critical implementations                                         │
│  • Technology selection (database, framework, etc.)                         │
│  • Anything that affects data integrity                                      │
│  • Public API contract design                                                │
│                                                                              │
│  ⚠️  RECOMMENDED:                                                            │
│  • Complex business logic implementation                                     │
│  • Performance-critical code paths                                           │
│  • Unusual or novel approaches                                               │
│  • When single model confidence is < 80%                                    │
│  • Disagreement between AI and human intuition                              │
│                                                                              │
│  ○ OPTIONAL:                                                                 │
│  • Standard CRUD operations                                                  │
│  • Well-documented patterns                                                  │
│  • Low-risk changes                                                          │
│  • Time-critical tasks with established approaches                          │
│                                                                              │
│  ❌ NOT NEEDED:                                                              │
│  • Formatting and style                                                      │
│  • Simple bug fixes with clear cause                                        │
│  • Documentation updates                                                     │
│  • Test generation for existing code                                        │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 19.2 Consensus Protocol

```
MULTI-MODEL CONSENSUS PROTOCOL
─────────────────────────────────────────────────────────────────────────────

STEP 1: FORMULATE THE QUERY
─────────────────────────────────────────────────────────────────────────────
• State the problem clearly and completely
• Include all relevant context
• Make the query identical across models
• Avoid leading toward a particular answer

STEP 2: QUERY MULTIPLE MODELS
─────────────────────────────────────────────────────────────────────────────
Minimum: 2 different model families
Recommended: 3 models from different providers

Example configuration:
  Model A: Claude (Anthropic)
  Model B: GPT-4 (OpenAI)
  Model C: Gemini (Google) or Llama (Meta)

STEP 3: ANALYZE RESPONSES
─────────────────────────────────────────────────────────────────────────────
For each response, identify:
  • Core recommendation
  • Reasoning provided
  • Confidence indicators
  • Trade-offs mentioned
  • Caveats or warnings

STEP 4: IDENTIFY CONSENSUS POINTS
─────────────────────────────────────────────────────────────────────────────
STRONG CONSENSUS: All models agree
  → High confidence in recommendation

MODERATE CONSENSUS: Majority agrees (2/3)
  → Likely correct, investigate minority view

WEAK CONSENSUS: Models disagree significantly
  → More investigation needed, may need human decision

STEP 5: INVESTIGATE DIVERGENCES
─────────────────────────────────────────────────────────────────────────────
When models disagree:
  • Identify the specific point of disagreement
  • Understand why each model reached its conclusion
  • Test both approaches if possible
  • Consider hybrid approach
  • Escalate to human decision if still unclear

STEP 6: DOCUMENT THE DECISION
─────────────────────────────────────────────────────────────────────────────
Record:
  • The question asked
  • Each model's response (summary)
  • Consensus points
  • Divergence points
  • Final decision and reasoning
  • Who made the final call
```

### 19.3 Consensus Documentation Template

```markdown
## MULTI-MODEL CONSENSUS: [Decision Title]

**Date:** [YYYY-MM-DD]
**Decision Maker:** [Name]

### Question Posed
[Exact question asked to all models]

### Models Consulted
- Model A: [Name/Version]
- Model B: [Name/Version]
- Model C: [Name/Version] (optional)

### Responses Summary

**Model A:**
- Recommendation: [Summary]
- Key reasoning: [Summary]
- Confidence: [High/Medium/Low]

**Model B:**
- Recommendation: [Summary]
- Key reasoning: [Summary]
- Confidence: [High/Medium/Low]

**Model C:** (if used)
- Recommendation: [Summary]
- Key reasoning: [Summary]
- Confidence: [High/Medium/Low]

### Consensus Analysis

**Agreement Points:**
- [Point 1]
- [Point 2]

**Disagreement Points:**
- [Point 1]: Model A says X, Model B says Y
- [Point 2]: [Description]

**Consensus Level:** Strong / Moderate / Weak

### Final Decision
[What was decided]

### Reasoning
[Why this decision was made, especially if models disagreed]

### Follow-up Actions
- [ ] [Action 1]
- [ ] [Action 2]
```

---

## PART IV SUMMARY

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                   PART IV: AI ORCHESTRATION & INTELLIGENCE                   │
│                           KEY TAKEAWAYS                                      │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  MODEL INTELLIGENCE MATRIX:                                                  │
│  ─────────────────────────────────────────────────────────────────────────  │
│  • Frontier: Complex reasoning, architecture (expensive, slow)              │
│  • Balanced: Day-to-day development (good trade-off)                        │
│  • Speed: Simple tasks, bulk operations (fast, cheap)                       │
│  • Specialized: Domain-specific tasks                                        │
│  • Default to Balanced if unsure                                             │
│                                                                              │
│  THE CORE 4 PRIMITIVES:                                                      │
│  ─────────────────────────────────────────────────────────────────────────  │
│  RETRIEVE → REASON → CREATE → VERIFY                                        │
│  All AI work decomposes into these four capabilities                        │
│  Compose them into patterns for different workflows                          │
│                                                                              │
│  TOOL HIERARCHY:                                                             │
│  ─────────────────────────────────────────────────────────────────────────  │
│  Tier 1: Foundational (file, search, execute)                               │
│  Tier 2: Development (git, lint, test, build)                               │
│  Tier 3: Integration (MCPs for external systems)                            │
│  Tier 4: Orchestration (sub-agents, workflows)                              │
│  Use simplest tool that works                                                │
│                                                                              │
│  CONTEXT ENGINEERING:                                                        │
│  ─────────────────────────────────────────────────────────────────────────  │
│  • Context is precious—budget it carefully                                   │
│  • Load essential context first, on-demand for rest                         │
│  • Prune aggressively, compress when possible                               │
│  • Refresh when stale or switching tasks                                    │
│                                                                              │
│  CONFIDENCE CALIBRATION:                                                     │
│  ─────────────────────────────────────────────────────────────────────────  │
│  • Certain (95%+): Proceed without verification                             │
│  • High (80-95%): Quick verification                                        │
│  • Medium (50-80%): Verify, consider alternatives                           │
│  • Low (20-50%): Must verify, don't proceed blindly                         │
│  • Uncertain (<20%): STOP, gather more information                          │
│                                                                              │
│  AUTONOMY DIAL:                                                              │
│  ─────────────────────────────────────────────────────────────────────────  │
│  1-2: Suggest only (critical decisions)                                      │
│  3-4: Draft & wait (most development)                                        │
│  5-6: Execute with checks (established patterns)                            │
│  7: Full autonomous (routine, low risk)                                      │
│                                                                              │
│  MULTI-MODEL CONSENSUS:                                                      │
│  ─────────────────────────────────────────────────────────────────────────  │
│  • Required for architecture and security decisions                         │
│  • Query 2-3 models with identical prompt                                   │
│  • Identify consensus and divergence points                                  │
│  • Document decisions and reasoning                                          │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---


---

## 🔄 PROPAGATED CONTENT FROM PART_3_ORCHESTRATION.md (v6.0)

> This section contains synchronized content from the Modular 7-part structure.
> Source: `projects/Segment Mods/NSBP5.0 -Segments/PART_3_ORCHESTRATION.md`

# NORTH STAR BLUEPRINT v6.0 — SEGMENT 3 of 7
## PART_3_ORCHESTRATION
### Contents: Part V (Sections 20-23) + Part VI (Sections 24-27)
### Lines: 7151-8781 of original
---
> **SEGMENT NAVIGATION:** This is a development segment. For full Blueprint, merge all 7 parts.
> For BRIDGE routing: Sections 20-27 are in this segment.
---

### Focused Agent Principle (M7)

**One agent = one responsibility.**

Why:
- reduces context bloat
- improves reliability
- enables composability (chains of small agents)

Patterns:
- small specialist agents with strict inputs/outputs
- explicit handoff contracts (what’s done, what’s next, what’s blocked)

Anti‑patterns:
- “monolith agent” that plans, codes, tests, deploys, writes docs, and manages infra in one loop
- unbounded iteration without checkpoints
# PART V: AGENT COMPOSITION & ORCHESTRATION

---

## 20. AGENT MEMORY ARCHITECTURE

> "Memory is what transforms an AI from a tool into a collaborator."

### 20.1 Memory Types

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       AGENT MEMORY ARCHITECTURE                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                    WORKING MEMORY                                    │    │
│  │                    (Context Window)                                  │    │
│  │                                                                      │    │
│  │  • Current conversation                                              │    │
│  │  • Active task context                                               │    │
│  │  • Recently loaded files                                             │    │
│  │  • Tool outputs from current session                                 │    │
│  │                                                                      │    │
│  │  CHARACTERISTICS:                                                    │    │
│  │  • Limited size (context window limit)                               │    │
│  │  • Volatile (lost between sessions)                                  │    │
│  │  • Fastest access                                                    │    │
│  │  • Highest priority                                                  │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                    │                                         │
│                                    ▼                                         │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                    SESSION MEMORY                                    │    │
│  │                    (Persisted State)                                 │    │
│  │                                                                      │    │
│  │  • Conversation summaries                                            │    │
│  │  • Task progress checkpoints                                         │    │
│  │  • Decisions made this session                                       │    │
│  │  • Temporary files created                                           │    │
│  │                                                                      │    │
│  │  CHARACTERISTICS:                                                    │    │
│  │  • Survives context resets                                           │    │
│  │  • Lost when session ends                                            │    │
│  │  • Medium access speed                                               │    │
│  │  • Can be explicitly saved                                           │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                    │                                         │
│                                    ▼                                         │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                    PROJECT MEMORY                                    │    │
│  │                    (File-Based)                                      │    │
│  │                                                                      │    │
│  │  • claude.md / AI context file                                       │    │
│  │  • Fix Ledger                                                        │    │
│  │  • Architecture Decision Records                                     │    │
│  │  • Project documentation                                             │    │
│  │  • Code comments and annotations                                     │    │
│  │                                                                      │    │
│  │  CHARACTERISTICS:                                                    │    │
│  │  • Persists across sessions                                          │    │
│  │  • Shared with future agents                                         │    │
│  │  • Must be explicitly loaded                                         │    │
│  │  • Can grow unbounded                                                │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                    │                                         │
│                                    ▼                                         │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                    INSTITUTIONAL MEMORY                              │    │
│  │                    (Cross-Project)                                   │    │
│  │                                                                      │    │
│  │  • North Star Blueprint (this document)                              │    │
│  │  • Organizational patterns                                           │    │
│  │  • Reusable components/templates                                     │    │
│  │  • Cross-project learnings                                           │    │
│  │                                                                      │    │
│  │  CHARACTERISTICS:                                                    │    │
│  │  • Spans multiple projects                                           │    │
│  │  • Rarely changes                                                    │    │
│  │  • Foundational context                                              │    │
│  │  • Highest abstraction level                                         │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 20.2 Memory Management Protocol

```
MEMORY MANAGEMENT PROTOCOL
─────────────────────────────────────────────────────────────────────────────

LOADING MEMORY (Session Start)
─────────────────────────────────────────────────────────────────────────────
1. Load Institutional Memory
   □ Blueprint principles (always)
   □ Relevant organizational patterns

2. Load Project Memory
   □ claude.md / AI context file
   □ Superprompt
   □ Current phase documentation
   □ Recent Fix Ledger entries

3. Load Session Memory (if resuming)
   □ Previous conversation summary
   □ Task progress checkpoint
   □ Pending decisions

4. Initialize Working Memory
   □ Current task requirements
   □ Relevant files for task


SAVING MEMORY (During Session)
─────────────────────────────────────────────────────────────────────────────
□ Update Fix Ledger when bugs resolved
□ Create checkpoints for long tasks
□ Document decisions in ADRs
□ Update claude.md with new patterns
□ Summarize conversations periodically


CLEANING MEMORY (Session End)
─────────────────────────────────────────────────────────────────────────────
□ Summarize session accomplishments
□ Save any unsaved learnings
□ Update project status
□ Clear temporary files
□ Note any incomplete tasks
```

### 20.3 Memory File Structures

```
PROJECT MEMORY FILE: claude.md
─────────────────────────────────────────────────────────────────────────────

# [Project Name] Agent Context

## Quick Reference
- Project: [name]
- Phase: [current phase]
- Last Updated: [date]

## Critical Context
[Information agent MUST know]

## Current State
- Working on: [current task]
- Blockers: [any blockers]
- Recent changes: [summary]

## Conventions
[Project-specific patterns and rules]

## Known Issues
[Reference to Fix Ledger, current bugs]

## Commands
[How to run, test, deploy]


─────────────────────────────────────────────────────────────────────────────

SESSION CHECKPOINT FILE: .session-checkpoint.json
─────────────────────────────────────────────────────────────────────────────

{
  "session_id": "uuid",
  "started_at": "ISO timestamp",
  "last_checkpoint": "ISO timestamp",
  "task": {
    "description": "Current task",
    "status": "in_progress | blocked | completed",
    "progress": "Description of progress"
  },
  "decisions": [
    {
      "decision": "What was decided",
      "reasoning": "Why",
      "timestamp": "When"
    }
  ],
  "pending_questions": [
    "Question needing answer"
  ],
  "files_modified": [
    "path/to/file.ts"
  ],
  "next_steps": [
    "What to do next"
  ]
}
```

### 20.4 Memory Decay and Refresh

```
MEMORY DECAY PATTERNS
─────────────────────────────────────────────────────────────────────────────

WORKING MEMORY: Decays fastest
─────────────────────────────────────────────────────────────────────────────
• Pushed out by new context
• Oldest information dropped first
• Critical info should be saved before decay
• Refresh: Re-read files as needed

SESSION MEMORY: Decays on session end
─────────────────────────────────────────────────────────────────────────────
• Lost when conversation ends
• Save important items to Project Memory
• Summarize before ending long sessions
• Refresh: Load checkpoint file

PROJECT MEMORY: Slow decay (staleness)
─────────────────────────────────────────────────────────────────────────────
• Doesn't disappear but becomes outdated
• Code changes faster than documentation
• Regular maintenance required
• Refresh: Update documentation, prune stale info

INSTITUTIONAL MEMORY: Minimal decay
─────────────────────────────────────────────────────────────────────────────
• Version-controlled updates
• Principles remain stable
• Patterns evolve slowly
• Refresh: Version updates only
```

---

## 21. SKILLS, SUB-AGENTS & MCP INTEGRATION

### 22.0 Skills Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        SKILLS ARCHITECTURE                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  WHAT IS A SKILL?                                                            │
│  A packaged capability that can be loaded on-demand to extend              │
│  an agent's abilities for specific tasks.                                   │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                              │
│  SKILL COMPONENTS:                                                           │
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                                                                      │    │
│  │  SKILL.md                                                            │    │
│  │  ├── Name & Description                                              │    │
│  │  ├── When to Use                                                     │    │
│  │  ├── Input Requirements                                              │    │
│  │  ├── Output Format                                                   │    │
│  │  ├── Step-by-Step Instructions                                       │    │
│  │  ├── Examples                                                        │    │
│  │  ├── Common Pitfalls                                                 │    │
│  │  └── Related Skills                                                  │    │
│  │                                                                      │    │
│  │  Supporting Files                                                    │    │
│  │  ├── Templates                                                       │    │
│  │  ├── Reference Code                                                  │    │
│  │  └── Validation Scripts                                              │    │
│  │                                                                      │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                              │
│  SKILL CATEGORIES:                                                           │
│                                                                              │
│  PUBLIC SKILLS (Shared)           USER SKILLS (Custom)                      │
│  ├── docx - Word documents        ├── project-specific                      │
│  ├── xlsx - Spreadsheets          ├── domain-specific                       │
│  ├── pptx - Presentations         ├── workflow-specific                     │
│  ├── pdf - PDF manipulation       └── integration-specific                  │
│  └── common patterns                                                         │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 21.2 Skill Loading Protocol

```
SKILL LOADING PROTOCOL
─────────────────────────────────────────────────────────────────────────────

STEP 1: IDENTIFY SKILL NEED
─────────────────────────────────────────────────────────────────────────────
Triggers:
□ Task requires specific file format (docx, xlsx, pptx, pdf)
□ Task requires specialized knowledge
□ Task matches skill description
□ User explicitly requests skill use

STEP 2: LOAD SKILL DEFINITION
─────────────────────────────────────────────────────────────────────────────
Action: Read SKILL.md file
Location: /mnt/skills/public/[skill]/ or /mnt/skills/user/[skill]/

□ Read entire SKILL.md before starting work
□ Note any prerequisites
□ Understand input/output requirements
□ Review examples

STEP 3: PREPARE ENVIRONMENT
─────────────────────────────────────────────────────────────────────────────
□ Load any required templates
□ Install any required dependencies
□ Verify tool availability
□ Set up working directory

STEP 4: EXECUTE SKILL
─────────────────────────────────────────────────────────────────────────────
□ Follow skill instructions step-by-step
□ Use specified patterns and templates
□ Validate output against skill criteria
□ Handle errors as skill specifies

STEP 5: DELIVER OUTPUT
─────────────────────────────────────────────────────────────────────────────
□ Place output in /mnt/user-data/outputs/
□ Use present_files to share with user
□ Provide brief summary (not verbose explanation)
```

### 21.3 Sub-Agent Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       SUB-AGENT ARCHITECTURE                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│                         ┌─────────────────┐                                  │
│                         │   ORCHESTRATOR  │                                  │
│                         │   (Main Agent)  │                                  │
│                         └────────┬────────┘                                  │
│                                  │                                           │
│              ┌───────────────────┼───────────────────┐                      │
│              │                   │                   │                      │
│              ▼                   ▼                   ▼                      │
│       ┌─────────────┐     ┌─────────────┐     ┌─────────────┐              │
│       │  Sub-Agent  │     │  Sub-Agent  │     │  Sub-Agent  │              │
│       │  Research   │     │  Analysis   │     │  Execution  │              │
│       │             │     │             │     │             │              │
│       │ • Web search│     │ • Code review│    │ • File ops  │              │
│       │ • Doc fetch │     │ • Planning  │     │ • Testing   │              │
│       │ • Reference │     │ • Decisions │     │ • Building  │              │
│       └─────────────┘     └─────────────┘     └─────────────┘              │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                              │
│  WHEN TO USE SUB-AGENTS:                                                     │
│  ───────────────────────────────────────────────────────────────────────    │
│  ✅ Task requires parallel processing                                       │
│  ✅ Task has clearly separable components                                   │
│  ✅ Different sub-tasks need different contexts                             │
│  ✅ Extended research while maintaining context                             │
│                                                                              │
│  WHEN NOT TO USE SUB-AGENTS:                                                │
│  ───────────────────────────────────────────────────────────────────────    │
│  ❌ Task is simple enough for single agent                                  │
│  ❌ Sub-tasks are tightly coupled                                           │
│  ❌ Coordination overhead exceeds benefit                                   │
│  ❌ Full context needed for all sub-tasks                                   │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 21.4 MCP Integration Patterns

```
MCP INTEGRATION PATTERNS
─────────────────────────────────────────────────────────────────────────────

PATTERN 1: FILE SYSTEM MCP
─────────────────────────────────────────────────────────────────────────────
Purpose: Extended file operations beyond basic read/write

Capabilities:
• Recursive directory operations
• File watching
• Advanced search
• Symbolic link management

When to use:
• Complex file reorganization
• Monitoring for changes
• Cross-project file operations


PATTERN 2: DATABASE MCP
─────────────────────────────────────────────────────────────────────────────
Purpose: Direct database interaction

Capabilities:
• Query execution
• Schema inspection
• Data migration
• Backup operations

When to use:
• Database-heavy development
• Data analysis tasks
• Schema modifications


PATTERN 3: BROWSER MCP
─────────────────────────────────────────────────────────────────────────────
Purpose: Web automation and testing

Capabilities:
• Page navigation
• Element interaction
• Screenshot capture
• Network monitoring

When to use:
• E2E testing
• Web scraping
• Visual verification
• Form automation


PATTERN 4: API MCP
─────────────────────────────────────────────────────────────────────────────
Purpose: External API integration

Capabilities:
• REST/GraphQL calls
• Authentication handling
• Response parsing
• Error handling

When to use:
• Third-party integrations
• API development
• Data fetching
• Webhook testing


MCP SELECTION MATRIX
─────────────────────────────────────────────────────────────────────────────

TASK                          │ RECOMMENDED MCP
──────────────────────────────┼─────────────────────────────────────────────
Read/write local files        │ Built-in (no MCP needed)
Complex file operations       │ File System MCP
Database queries              │ Database MCP
Web automation                │ Browser MCP
External API calls            │ API MCP / Built-in fetch
Cloud operations              │ Cloud-specific MCP (AWS, GCP, etc.)
Version control               │ Git MCP or built-in
```

### 21.5 Focused Agent Principle

> "One agent = one responsibility. Avoid monolithic 'do everything' agents."

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       FOCUSED AGENT PRINCIPLE                                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  CORE PHILOSOPHY                                                             │
│  ─────────────────────────────────────────────────────────────────────────  │
│  Single-purpose agents with clear boundaries outperform monolithic agents.  │
│  Complexity emerges from composition, not from bloated prompts.             │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                              │
│  PRINCIPLES                                                                  │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                              │
│  PRINCIPLE            │ DESCRIPTION                                         │
│  ─────────────────────┼───────────────────────────────────────────────────  │
│  Single Purpose       │ Each agent has ONE well-defined job                 │
│  Clear Boundaries     │ Explicit scope prevents scope creep                 │
│  Composability        │ Small agents compose into complex workflows         │
│  Handoff Protocols    │ Clear contracts between specialized agents          │
│  Confidence Gates     │ Pause when approaching boundary of expertise        │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                              │
│  ANTI-PATTERNS TO AVOID                                                      │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                              │
│  ❌ "Swiss Army Knife" agents that try to do everything                     │
│  ❌ Implicit assumptions about agent capabilities                           │
│  ❌ Chaining without confidence gates                                       │
│  ❌ Monolithic prompts with multiple objectives                             │
│  ❌ Agents that "help with anything"                                        │
│  ❌ No defined scope or boundary documentation                              │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                              │
│  QUALITY GATES                                                               │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                              │
│  □ Agent has single, stated purpose in its definition                       │
│  □ Boundaries documented in agent specification                             │
│  □ Handoff protocol defined for multi-agent scenarios                       │
│  □ Confidence thresholds set for each capability                            │
│  □ Escalation path defined when out of scope                                │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

**Cross-Reference:** MBF Category 30 (Agent Frameworks)

---

## 22. RECURSIVE VERIFICATION PROTOCOL

### 22.1 Verification Layers

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    RECURSIVE VERIFICATION PROTOCOL                           │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  Every output goes through multiple verification layers.                    │
│  Each layer catches different types of errors.                              │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │ LAYER 1: SYNTAX VERIFICATION                                         │    │
│  │                                                                      │    │
│  │ □ Code parses without errors                                         │    │
│  │ □ All brackets/braces matched                                        │    │
│  │ □ Import statements valid                                            │    │
│  │ □ No obvious typos                                                   │    │
│  │                                                                      │    │
│  │ TOOLS: Parser, Linter                                                │    │
│  │ CATCHES: Typos, missing characters, basic structure errors          │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                    │                                         │
│                                    ▼                                         │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │ LAYER 2: TYPE VERIFICATION                                           │    │
│  │                                                                      │    │
│  │ □ Type annotations correct                                           │    │
│  │ □ Function signatures match usage                                    │    │
│  │ □ No implicit any (if strict mode)                                   │    │
│  │ □ Generic types properly applied                                     │    │
│  │                                                                      │    │
│  │ TOOLS: TypeScript compiler, type checker                             │    │
│  │ CATCHES: Type mismatches, interface violations                       │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                    │                                         │
│                                    ▼                                         │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │ LAYER 3: LOGIC VERIFICATION                                          │    │
│  │                                                                      │    │
│  │ □ Unit tests pass                                                    │    │
│  │ □ Edge cases handled                                                 │    │
│  │ □ Error paths covered                                                │    │
│  │ □ Business logic correct                                             │    │
│  │                                                                      │    │
│  │ TOOLS: Unit test runner                                              │    │
│  │ CATCHES: Logic errors, missing cases, wrong calculations            │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                    │                                         │
│                                    ▼                                         │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │ LAYER 4: INTEGRATION VERIFICATION                                    │    │
│  │                                                                      │    │
│  │ □ Components work together                                           │    │
│  │ □ API contracts respected                                            │    │
│  │ □ Database operations correct                                        │    │
│  │ □ External services integrated properly                              │    │
│  │                                                                      │    │
│  │ TOOLS: Integration tests                                             │    │
│  │ CATCHES: Interface mismatches, integration failures                 │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                    │                                         │
│                                    ▼                                         │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │ LAYER 5: HUMAN VERIFICATION                                          │    │
│  │                                                                      │    │
│  │ □ Output makes sense                                                 │    │
│  │ □ Requirements actually met                                          │    │
│  │ □ No hallucinated content                                            │    │
│  │ □ Appropriate for context                                            │    │
│  │                                                                      │    │
│  │ TOOLS: Human review                                                  │    │
│  │ CATCHES: Semantic errors, hallucinations, context mismatches        │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 22.2 Verification by Output Type

```
VERIFICATION BY OUTPUT TYPE
─────────────────────────────────────────────────────────────────────────────

CODE OUTPUT:
─────────────────────────────────────────────────────────────────────────────
□ Syntax: Parses without error
□ Types: Type check passes
□ Lint: Linting passes
□ Tests: Related tests pass
□ Build: Build succeeds
□ Run: Application starts
□ Manual: Feature works as expected

DOCUMENTATION OUTPUT:
─────────────────────────────────────────────────────────────────────────────
□ Format: Markdown renders correctly
□ Links: All links valid
□ Code blocks: Code examples run
□ Accuracy: Information is correct
□ Completeness: All sections present
□ Clarity: Human can understand

API DESIGN OUTPUT:
─────────────────────────────────────────────────────────────────────────────
□ Schema: Valid OpenAPI/JSON Schema
□ Consistency: Naming conventions followed
□ Completeness: All endpoints documented
□ Examples: Request/response examples work
□ Security: Auth requirements specified
□ Errors: Error responses documented

CONFIGURATION OUTPUT:
─────────────────────────────────────────────────────────────────────────────
□ Syntax: Valid JSON/YAML/etc.
□ Schema: Matches expected schema
□ Values: Values are appropriate
□ Secrets: No secrets exposed
□ Environments: Works in target environment
□ Load: Configuration loads successfully

DATA OUTPUT:
─────────────────────────────────────────────────────────────────────────────
□ Format: Valid data format
□ Schema: Matches expected schema
□ Integrity: No data corruption
□ Completeness: No missing fields
□ Accuracy: Values are correct
□ Privacy: No PII exposure
```

### 22.3 Self-Verification Checklist

```
SELF-VERIFICATION CHECKLIST (Before Presenting Output)
─────────────────────────────────────────────────────────────────────────────

□ DID I READ THE FILES I'M MODIFYING?
  Not assumed, actually read them in this session

□ DOES MY OUTPUT MATCH THE REQUEST?
  Re-read the original request and verify

□ IS MY OUTPUT COMPLETE?
  No missing sections, no TODO placeholders

□ ARE THERE ANY HALLUCINATIONS?
  API names, file paths, URLs all verified to exist

□ DOES IT FIT THE EXISTING PATTERNS?
  Consistent with codebase style and conventions

□ HAVE I TESTED IT?
  Actually ran the code/command, not just believed it works

□ WHAT COULD GO WRONG?
  Considered edge cases and error conditions

□ IS IT READY FOR USE?
  No additional steps needed before it works
```

---

## 23. AGENT HANDOFF PROTOCOLS

### 23.1 Handoff Types

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        AGENT HANDOFF PROTOCOLS                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  HANDOFF TYPE 1: SESSION CONTINUATION                                        │
│  ───────────────────────────────────────────────────────────────────────    │
│  Same project, different session (next day, after break)                    │
│                                                                              │
│  REQUIREMENTS:                                                               │
│  □ Session checkpoint saved                                                  │
│  □ Current state documented                                                  │
│  □ Next steps clearly listed                                                 │
│  □ Any blockers noted                                                        │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                              │
│  HANDOFF TYPE 2: AGENT-TO-AGENT                                              │
│  ───────────────────────────────────────────────────────────────────────    │
│  Different agent/model continuing work                                      │
│                                                                              │
│  REQUIREMENTS:                                                               │
│  □ Full context document prepared                                            │
│  □ All decisions documented with reasoning                                   │
│  □ File state described (what exists, what's in progress)                   │
│  □ Verification status noted                                                 │
│  □ No implicit knowledge required                                            │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                              │
│  HANDOFF TYPE 3: TASK COMPLETION                                             │
│  ───────────────────────────────────────────────────────────────────────    │
│  Work complete, handing to human for review/use                             │
│                                                                              │
│  REQUIREMENTS:                                                               │
│  □ All deliverables complete                                                 │
│  □ Verification checklist passed                                            │
│  □ Documentation updated                                                     │
│  □ Summary of what was done                                                  │
│  □ Any follow-up actions noted                                               │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                              │
│  HANDOFF TYPE 4: ESCALATION                                                  │
│  ───────────────────────────────────────────────────────────────────────    │
│  Problem beyond current capability, needs human/expert                      │
│                                                                              │
│  REQUIREMENTS:                                                               │
│  □ Clear description of the problem                                          │
│  □ What has been tried                                                       │
│  □ Why it's being escalated                                                  │
│  □ What help is needed                                                       │
│  □ Current state preserved                                                   │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 23.2 Handoff Document Template

```markdown
## AGENT HANDOFF DOCUMENT

**Handoff Type:** [Session Continuation / Agent-to-Agent / Task Completion / Escalation]
**Date:** [YYYY-MM-DD HH:MM]
**From:** [Agent/Session identifier]
**To:** [Next agent/Human]

---

### PROJECT CONTEXT
- **Project:** [Name]
- **Phase:** [Current phase]
- **Primary Goal:** [What we're trying to achieve]

### CURRENT STATE

**Completed:**
- [x] [Completed item 1]
- [x] [Completed item 2]

**In Progress:**
- [ ] [In progress item] - [Status details]

**Not Started:**
- [ ] [Pending item]

### FILES AFFECTED

| File | Status | Notes |
|------|--------|-------|
| `path/to/file.ts` | Modified | [What was changed] |
| `path/to/new.ts` | Created | [What it does] |

### KEY DECISIONS MADE

1. **[Decision]:** [What was decided]
   - Reasoning: [Why]
   - Alternatives considered: [What else]

### BLOCKERS / ISSUES

- **[Issue]:** [Description]
  - Attempted: [What was tried]
  - Status: [Blocked / Needs input / Resolved]

### NEXT STEPS

1. [First thing to do next]
2. [Second thing to do]
3. [Third thing to do]

### CONTEXT TO LOAD

The following files should be read to continue:
- `[path/to/important/file.ts]` - [Why]
- `[path/to/another/file.ts]` - [Why]

### WARNINGS / GOTCHAS

- [Something to watch out for]
- [Known issue to be aware of]

### VERIFICATION STATUS

- [ ] Syntax checks passing
- [ ] Type checks passing
- [ ] Tests passing
- [ ] Manual verification done
- [ ] Documentation updated
```

### 23.3 Resume Protocol

```
RESUME PROTOCOL (For Incoming Agent)
─────────────────────────────────────────────────────────────────────────────

STEP 1: LOAD CONTEXT (5 minutes)
─────────────────────────────────────────────────────────────────────────────
□ Read handoff document
□ Read project claude.md
□ Read current phase documentation
□ Load listed context files

STEP 2: VERIFY STATE (5 minutes)
─────────────────────────────────────────────────────────────────────────────
□ Run current tests to verify state
□ Check file states match description
□ Verify no unexpected changes
□ Confirm you can build/run the project

STEP 3: UNDERSTAND POSITION (5 minutes)
─────────────────────────────────────────────────────────────────────────────
□ Understand what was done
□ Understand what needs to be done
□ Identify any gaps in understanding
□ Ask clarifying questions if needed

STEP 4: CONTINUE WORK
─────────────────────────────────────────────────────────────────────────────
□ Start from documented next steps
□ Follow established patterns
□ Document new decisions
□ Update handoff document as you progress
```

---

## PART V SUMMARY

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                 PART V: AGENT COMPOSITION & ORCHESTRATION                    │
│                           KEY TAKEAWAYS                                      │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  AGENT MEMORY ARCHITECTURE:                                                  │
│  ─────────────────────────────────────────────────────────────────────────  │
│  • Working Memory: Context window (fast, volatile)                          │
│  • Session Memory: Persisted state (survives resets)                        │
│  • Project Memory: Files (claude.md, Fix Ledger, ADRs)                      │
│  • Institutional Memory: Blueprint (cross-project)                          │
│  • Load in priority order, save important learnings                         │
│                                                                              │
│  SKILLS & SUB-AGENTS:                                                        │
│  ─────────────────────────────────────────────────────────────────────────  │
│  • Skills = packaged capabilities (SKILL.md files)                          │
│  • Load skill definition BEFORE starting task                               │
│  • Sub-agents for parallel/separable tasks                                  │
│  • Don't over-engineer—simple is better                                     │
│                                                                              │
│  MCP INTEGRATION:                                                            │
│  ─────────────────────────────────────────────────────────────────────────  │
│  • File System: Complex file operations                                      │
│  • Database: Direct DB interaction                                           │
│  • Browser: Web automation/testing                                           │
│  • API: External integrations                                                │
│  • Use built-in tools when sufficient                                        │
│                                                                              │
│  RECURSIVE VERIFICATION:                                                     │
│  ─────────────────────────────────────────────────────────────────────────  │
│  Layer 1: Syntax (parser, linter)                                            │
│  Layer 2: Types (compiler)                                                   │
│  Layer 3: Logic (unit tests)                                                 │
│  Layer 4: Integration (integration tests)                                    │
│  Layer 5: Human (review)                                                     │
│  Each layer catches different error types                                    │
│                                                                              │
│  HANDOFF PROTOCOLS:                                                          │
│  ─────────────────────────────────────────────────────────────────────────  │
│  • Session Continuation: Checkpoint, state, next steps                       │
│  • Agent-to-Agent: Full context, no implicit knowledge                       │
│  • Task Completion: Deliverables, verification, summary                      │
│  • Escalation: Problem, attempts, what help needed                           │
│  • Always document decisions and reasoning                                   │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---
# PART VI: MCP & TOOL ORCHESTRATION

---

## 24. MCP POWER TOOLS MATRIX

> "MCP transforms AI from an advisor into an operator."

### 24.1 MCP Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        MCP POWER TOOLS MATRIX                                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  WHAT IS MCP?                                                                │
│  Model Context Protocol - A standard for connecting AI models to            │
│  external tools, data sources, and services.                                │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                              │
│  MCP ARCHITECTURE:                                                           │
│                                                                              │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐                      │
│  │   AI Model  │◄──►│  MCP Layer  │◄──►│  External   │                      │
│  │   (Claude)  │    │  (Protocol) │    │  Services   │                      │
│  └─────────────┘    └─────────────┘    └─────────────┘                      │
│                           │                                                  │
│                           │                                                  │
│              ┌────────────┼────────────┐                                    │
│              │            │            │                                    │
│              ▼            ▼            ▼                                    │
│         ┌────────┐  ┌────────┐  ┌────────┐                                  │
│         │ Tools  │  │Resources│  │ Prompts│                                  │
│         │        │  │        │  │        │                                  │
│         │Actions │  │Data    │  │Templates│                                 │
│         │to take │  │to read │  │to use   │                                 │
│         └────────┘  └────────┘  └────────┘                                  │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                              │
│  WHY MCP MATTERS:                                                            │
│  • Standardized interface (same pattern for all integrations)               │
│  • Composable (combine multiple MCPs)                                        │
│  • Secure (controlled access to external systems)                           │
│  • Extensible (add new MCPs without changing model)                         │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 24.2 Core MCP Categories

```
CORE MCP CATEGORIES
─────────────────────────────────────────────────────────────────────────────

CATEGORY 1: FILE SYSTEM MCPs
─────────────────────────────────────────────────────────────────────────────
Purpose: Extended file operations

┌────────────────────────────────────────────────────────────────────────────┐
│ CAPABILITY           │ USE CASE                    │ EXAMPLE              │
├────────────────────────────────────────────────────────────────────────────┤
│ Recursive operations │ Process entire directories  │ Find all .ts files   │
│ File watching        │ Monitor for changes         │ Hot reload trigger   │
│ Glob patterns        │ Batch file selection        │ **/*.test.ts         │
│ Metadata access      │ File info without content   │ Size, dates, perms   │
│ Archive operations   │ Zip/unzip                   │ Package distribution │
└────────────────────────────────────────────────────────────────────────────┘


CATEGORY 2: DATABASE MCPs
─────────────────────────────────────────────────────────────────────────────
Purpose: Direct database interaction

┌────────────────────────────────────────────────────────────────────────────┐
│ CAPABILITY           │ USE CASE                    │ EXAMPLE              │
├────────────────────────────────────────────────────────────────────────────┤
│ Query execution      │ Read data                   │ SELECT * FROM users  │
│ Schema inspection    │ Understand structure        │ List tables/columns  │
│ Data modification    │ CRUD operations             │ INSERT, UPDATE       │
│ Migration support    │ Schema changes              │ Add column           │
│ Transaction handling │ Atomic operations           │ Multi-step updates   │
└────────────────────────────────────────────────────────────────────────────┘


CATEGORY 3: BROWSER MCPs
─────────────────────────────────────────────────────────────────────────────
Purpose: Web automation and testing

┌────────────────────────────────────────────────────────────────────────────┐
│ CAPABILITY           │ USE CASE                    │ EXAMPLE              │
├────────────────────────────────────────────────────────────────────────────┤
│ Navigation           │ Load pages                  │ goto(url)            │
│ Element interaction  │ Click, type, select         │ click('#submit')     │
│ Content extraction   │ Scrape data                 │ getText('.price')    │
│ Screenshot capture   │ Visual documentation        │ screenshot()         │
│ Network interception │ API monitoring              │ intercept requests   │
└────────────────────────────────────────────────────────────────────────────┘


CATEGORY 4: API MCPs
─────────────────────────────────────────────────────────────────────────────
Purpose: External API integration

┌────────────────────────────────────────────────────────────────────────────┐
│ CAPABILITY           │ USE CASE                    │ EXAMPLE              │
├────────────────────────────────────────────────────────────────────────────┤
│ REST calls           │ Standard API interaction    │ GET /api/users       │
│ GraphQL              │ Query languages             │ { user { name } }    │
│ Authentication       │ OAuth, API keys             │ Bearer token         │
│ Rate limiting        │ Respect API limits          │ Retry with backoff   │
│ Response parsing     │ Extract structured data     │ JSON to object       │
└────────────────────────────────────────────────────────────────────────────┘


CATEGORY 5: CLOUD MCPs
─────────────────────────────────────────────────────────────────────────────
Purpose: Cloud service management

┌────────────────────────────────────────────────────────────────────────────┐
│ CAPABILITY           │ USE CASE                    │ EXAMPLE              │
├────────────────────────────────────────────────────────────────────────────┤
│ Deployment           │ Ship to production          │ Deploy to Vercel     │
│ Configuration        │ Environment setup           │ Set env variables    │
│ Monitoring           │ Check system health         │ Get error logs       │
│ Scaling              │ Resource management         │ Scale instances      │
│ Storage              │ Object storage              │ S3 operations        │
└────────────────────────────────────────────────────────────────────────────┘
```

### 24.3 MCP Selection Guide

```
MCP SELECTION DECISION TREE
─────────────────────────────────────────────────────────────────────────────

What are you trying to do?

├── Work with LOCAL FILES
│   ├── Simple read/write → Built-in tools (no MCP needed)
│   └── Complex operations → File System MCP
│       • Recursive search
│       • Batch operations
│       • File watching
│
├── Work with DATABASES
│   ├── Read data for analysis → Database MCP
│   ├── Modify schema → Database MCP (with caution)
│   └── App database queries → Code the queries (not MCP)
│
├── Work with WEB PAGES
│   ├── Fetch content → Built-in web_fetch
│   ├── Search the web → Built-in web_search
│   └── Automate interactions → Browser MCP
│       • Form filling
│       • Multi-step flows
│       • Screenshots
│
├── Work with EXTERNAL APIS
│   ├── Simple REST calls → Built-in fetch or API MCP
│   └── Complex integrations → Dedicated service MCP
│       • Slack MCP
│       • GitHub MCP
│       • etc.
│
└── Work with CLOUD SERVICES
    └── Use cloud-specific MCP
        • AWS MCP
        • GCP MCP
        • Azure MCP
        • Vercel MCP
        • etc.
```

---

## 25. MCP-FIRST ARCHITECTURE

### 25.1 MCP-First Principles

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       MCP-FIRST ARCHITECTURE                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  MCP-FIRST MEANS:                                                            │
│  Design systems assuming AI agents will be primary operators.               │
│  Every capability should be MCP-accessible.                                 │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                              │
│  PRINCIPLE 1: EVERY OPERATION SHOULD BE TOOLABLE                            │
│  ───────────────────────────────────────────────────────────────────────    │
│  If a human can do it, an agent should be able to do it via MCP.           │
│                                                                              │
│  ANTI-PATTERN:                                                               │
│  • Operations that require GUI interaction                                   │
│  • Processes that need manual intervention                                   │
│  • Workflows that can't be automated                                        │
│                                                                              │
│  PATTERN:                                                                    │
│  • CLI equivalents for all GUI operations                                   │
│  • API endpoints for all interactions                                        │
│  • Scriptable workflows                                                      │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                              │
│  PRINCIPLE 2: STRUCTURED DATA OVER UNSTRUCTURED                             │
│  ───────────────────────────────────────────────────────────────────────    │
│  AI agents work better with structured, typed data.                         │
│                                                                              │
│  ANTI-PATTERN:                                                               │
│  • Prose-based configuration                                                 │
│  • Free-form logging                                                         │
│  • Unstructured error messages                                               │
│                                                                              │
│  PATTERN:                                                                    │
│  • JSON/YAML configuration                                                   │
│  • Structured logging (JSON logs)                                            │
│  • Error codes with structured details                                       │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                              │
│  PRINCIPLE 3: IDEMPOTENT OPERATIONS                                          │
│  ───────────────────────────────────────────────────────────────────────    │
│  Same operation, same result—safe to retry.                                 │
│                                                                              │
│  ANTI-PATTERN:                                                               │
│  • Operations that fail on duplicate execution                              │
│  • Side effects that compound                                                │
│  • State-dependent behavior                                                  │
│                                                                              │
│  PATTERN:                                                                    │
│  • Idempotency keys                                                          │
│  • Upsert instead of insert                                                  │
│  • Declarative state (desired state, not mutations)                         │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 25.2 MCP Integration Architecture

```
MCP INTEGRATION ARCHITECTURE
─────────────────────────────────────────────────────────────────────────────

┌─────────────────────────────────────────────────────────────────────────────┐
│                           AI ORCHESTRATOR                                    │
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                        MCP ROUTER                                    │    │
│  │                                                                      │    │
│  │  Routes requests to appropriate MCP based on:                       │    │
│  │  • Operation type                                                    │    │
│  │  • Target system                                                     │    │
│  │  • Current context                                                   │    │
│  │  • User permissions                                                  │    │
│  │                                                                      │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                    │                                         │
│         ┌──────────────────────────┼──────────────────────────┐             │
│         │                          │                          │             │
│         ▼                          ▼                          ▼             │
│  ┌─────────────┐           ┌─────────────┐           ┌─────────────┐        │
│  │   MCP 1     │           │   MCP 2     │           │   MCP 3     │        │
│  │  (Files)    │           │ (Database)  │           │  (Cloud)    │        │
│  │             │           │             │           │             │        │
│  │ • read      │           │ • query     │           │ • deploy    │        │
│  │ • write     │           │ • insert    │           │ • config    │        │
│  │ • search    │           │ • update    │           │ • monitor   │        │
│  │ • delete    │           │ • delete    │           │ • scale     │        │
│  └──────┬──────┘           └──────┬──────┘           └──────┬──────┘        │
│         │                          │                          │             │
│         ▼                          ▼                          ▼             │
│  ┌─────────────┐           ┌─────────────┐           ┌─────────────┐        │
│  │ Local File  │           │  Database   │           │   Cloud     │        │
│  │   System    │           │   Server    │           │  Provider   │        │
│  └─────────────┘           └─────────────┘           └─────────────┘        │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 25.3 MCP Error Handling

```
MCP ERROR HANDLING PROTOCOL
─────────────────────────────────────────────────────────────────────────────

ERROR CATEGORIES:

1. CONNECTION ERRORS
─────────────────────────────────────────────────────────────────────────────
   Symptom: Can't reach MCP server
   Response: Retry with exponential backoff
   Fallback: Use alternative method or notify user
   
   Example:
   ```
   Error: MCP_CONNECTION_FAILED
   Retrying in 1s... 2s... 4s...
   Fallback: Using cached data
   ```

2. AUTHENTICATION ERRORS
─────────────────────────────────────────────────────────────────────────────
   Symptom: Permission denied
   Response: Check credentials, refresh tokens
   Fallback: Escalate to user for re-authentication
   
   Example:
   ```
   Error: MCP_AUTH_FAILED
   Action: Token expired, refreshing...
   If refresh fails: Request user re-authentication
   ```

3. OPERATION ERRORS
─────────────────────────────────────────────────────────────────────────────
   Symptom: Operation failed
   Response: Understand error, attempt alternative
   Fallback: Report to user with context
   
   Example:
   ```
   Error: MCP_OPERATION_FAILED (file not found)
   Attempted: Read /path/to/file.ts
   Alternative: Search for similar files
   If no alternative: Report to user
   ```

4. RATE LIMIT ERRORS
─────────────────────────────────────────────────────────────────────────────
   Symptom: Too many requests
   Response: Wait and retry per limit headers
   Fallback: Queue operations, batch where possible
   
   Example:
   ```
   Error: MCP_RATE_LIMITED
   Retry-After: 60 seconds
   Action: Queuing operation, will retry at [time]
   ```

5. DATA ERRORS
─────────────────────────────────────────────────────────────────────────────
   Symptom: Invalid data format
   Response: Validate and transform data
   Fallback: Report specific validation error
   
   Example:
   ```
   Error: MCP_INVALID_DATA
   Field: email
   Issue: Invalid format
   Action: Prompt for correction
   ```
```

---

## 26. VOICE-NATIVE DEVELOPMENT WORKFLOWS

### 26.1 Voice Development Philosophy

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    VOICE-NATIVE DEVELOPMENT                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  Voice isn't just an input method—it's a fundamentally different           │
│  way of interacting with development tools.                                 │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                              │
│  VOICE ADVANTAGES:                                                           │
│  ───────────────────────────────────────────────────────────────────────    │
│  • Higher bandwidth for complex requests                                    │
│  • More natural for creative/exploratory work                               │
│  • Hands-free operation                                                      │
│  • Faster for experienced users                                              │
│  • Better for explaining context                                             │
│                                                                              │
│  VOICE CHALLENGES:                                                           │
│  ───────────────────────────────────────────────────────────────────────    │
│  • Less precise for exact code                                               │
│  • Ambient noise issues                                                      │
│  • Harder to reference specific line numbers                                │
│  • Can't easily "show" visual elements                                      │
│  • Requires clear enunciation                                                │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                              │
│  OPTIMAL VOICE TASKS:                                                        │
│  ───────────────────────────────────────────────────────────────────────    │
│  ✅ High-level planning and architecture                                    │
│  ✅ Explaining requirements and context                                     │
│  ✅ Code review and discussion                                              │
│  ✅ Debugging conversation                                                  │
│  ✅ Documentation dictation                                                 │
│  ✅ Quick commands and navigation                                           │
│                                                                              │
│  SUBOPTIMAL VOICE TASKS:                                                     │
│  ───────────────────────────────────────────────────────────────────────    │
│  ⚠️ Precise code editing (use text)                                        │
│  ⚠️ Complex regex patterns (use text)                                      │
│  ⚠️ Exact file paths (use text or autocomplete)                            │
│  ⚠️ Symbol-heavy code (use text)                                           │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 26.2 Voice Command Patterns

```
VOICE COMMAND PATTERNS
─────────────────────────────────────────────────────────────────────────────

NAVIGATION COMMANDS:
─────────────────────────────────────────────────────────────────────────────
"Open the user service file"
"Go to the authentication module"
"Show me the tests for this component"
"Find all files that import this function"

CREATION COMMANDS:
─────────────────────────────────────────────────────────────────────────────
"Create a new component called UserProfile"
"Add a function to validate email addresses"
"Generate tests for the shopping cart"
"Make a new API endpoint for user preferences"

MODIFICATION COMMANDS:
─────────────────────────────────────────────────────────────────────────────
"Add error handling to this function"
"Refactor this to use async await"
"Extract this logic into a separate function"
"Update the types to include the new field"

REVIEW COMMANDS:
─────────────────────────────────────────────────────────────────────────────
"Review this file for potential issues"
"Check if this follows our patterns"
"Look for security vulnerabilities"
"Analyze the performance of this function"

EXECUTION COMMANDS:
─────────────────────────────────────────────────────────────────────────────
"Run the tests"
"Build the project"
"Deploy to staging"
"Start the development server"

QUERY COMMANDS:
─────────────────────────────────────────────────────────────────────────────
"What does this function do?"
"Why are we using this pattern?"
"How is authentication implemented?"
"Where is this variable defined?"
```

### 26.3 Voice Session Structure

```
VOICE SESSION STRUCTURE
─────────────────────────────────────────────────────────────────────────────

PHASE 1: CONTEXT SETTING (Opening)
─────────────────────────────────────────────────────────────────────────────
Human: "Hey Claude, I'm working on the user dashboard feature. 
        We left off yesterday adding the chart component."

Agent: [Loads project context, finds previous work, summarizes state]
       "I see we have the chart component structure in place. 
        The data fetching is done, but rendering isn't connected yet.
        Should we continue with that?"


PHASE 2: PLANNING (Direction)
─────────────────────────────────────────────────────────────────────────────
Human: "Yes, and I also want to add a date range selector. 
        Let's plan both of those."

Agent: [Plans the work]
       "Okay, I'd suggest:
        1. First connect the chart data binding
        2. Add the date range selector component
        3. Wire up the selector to filter the chart data
        Should I start with step 1?"


PHASE 3: EXECUTION (Implementation)
─────────────────────────────────────────────────────────────────────────────
Human: "Go ahead with step 1"

Agent: [Executes, shows progress]
       "I've connected the chart to the data hook. 
        The chart should now render the user activity data.
        Want me to show you the changes or run it?"


PHASE 4: VERIFICATION (Review)
─────────────────────────────────────────────────────────────────────────────
Human: "Run it and show me"

Agent: [Runs, captures state]
       "The dev server is running. The chart is displaying but 
        I noticed the Y-axis labels are overlapping. 
        Should I fix that before moving on?"


PHASE 5: ITERATION (Refinement)
─────────────────────────────────────────────────────────────────────────────
Human: "Yes, fix that and then let's move to the date selector"

Agent: [Fixes, continues]
       "Fixed the Y-axis with responsive sizing. 
        Now starting on the date range selector..."


PHASE 6: WRAP-UP (Closing)
─────────────────────────────────────────────────────────────────────────────
Human: "Let's stop here for now"

Agent: [Summarizes, saves state]
       "Got it. Here's what we accomplished:
        - Chart component connected and rendering
        - Date selector component created
        - Basic filtering working
        
        Next session we could:
        - Add preset date ranges
        - Improve the selector UX
        
        I've updated the project status."
```

---

## 27. IDE ROUTING STRATEGY

### 27.1 IDE Selection Matrix

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        IDE ROUTING STRATEGY                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  Different environments are optimal for different tasks.                    │
│  Route work to the right environment.                                       │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                              │
│  ENVIRONMENT OPTIONS:                                                        │
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │ CHAT INTERFACE (Claude.ai / App)                                     │    │
│  │                                                                      │    │
│  │ BEST FOR:                                                            │    │
│  │ • Planning and architecture discussion                               │    │
│  │ • Code review and analysis                                           │    │
│  │ • Learning and exploration                                           │    │
│  │ • Document creation (Word, Excel, PPT)                               │    │
│  │ • Quick questions                                                    │    │
│  │                                                                      │    │
│  │ LIMITATIONS:                                                         │    │
│  │ • Limited file system access                                         │    │
│  │ • Manual copy-paste for code                                         │    │
│  │ • No live project integration                                        │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │ CLAUDE CODE (CLI)                                                    │    │
│  │                                                                      │    │
│  │ BEST FOR:                                                            │    │
│  │ • Agentic coding (autonomous implementation)                         │    │
│  │ • Multi-file changes                                                 │    │
│  │ • Project-wide refactoring                                           │    │
│  │ • Test generation and execution                                      │    │
│  │ • Git operations                                                     │    │
│  │                                                                      │    │
│  │ LIMITATIONS:                                                         │    │
│  │ • Terminal-based (no visual preview)                                 │    │
│  │ • Requires CLI comfort                                               │    │
│  │ • Can be overkill for simple tasks                                   │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │ IDE EXTENSIONS (VS Code, etc.)                                       │    │
│  │                                                                      │    │
│  │ BEST FOR:                                                            │    │
│  │ • Inline code completion                                             │    │
│  │ • Quick edits with context                                           │    │
│  │ • Code explanation while reading                                     │    │
│  │ • Small, focused changes                                             │    │
│  │ • Working within existing IDE workflow                               │    │
│  │                                                                      │    │
│  │ LIMITATIONS:                                                         │    │
│  │ • Less autonomous than Claude Code                                   │    │
│  │ • Limited multi-file coordination                                    │    │
│  │ • May have smaller context window                                    │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │ API (Custom Integration)                                             │    │
│  │                                                                      │    │
│  │ BEST FOR:                                                            │    │
│  │ • Custom workflows                                                   │    │
│  │ • Automated pipelines                                                │    │
│  │ • Integration with other tools                                       │    │
│  │ • Batch processing                                                   │    │
│  │                                                                      │    │
│  │ LIMITATIONS:                                                         │    │
│  │ • Requires development effort                                        │    │
│  │ • No built-in UI                                                     │    │
│  │ • Management overhead                                                │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 27.2 Task-to-Environment Routing

```
TASK-TO-ENVIRONMENT ROUTING
─────────────────────────────────────────────────────────────────────────────

TASK                              │ RECOMMENDED ENVIRONMENT
──────────────────────────────────┼─────────────────────────────────────────
                                  │
PLANNING & DESIGN                 │
──────────────────────────────────┼─────────────────────────────────────────
Architecture planning             │ Chat Interface
System design discussion          │ Chat Interface
API design                        │ Chat Interface
Database schema design            │ Chat Interface
                                  │
IMPLEMENTATION                    │
──────────────────────────────────┼─────────────────────────────────────────
New feature (multi-file)          │ Claude Code
New feature (single file)         │ IDE Extension
Bug fix (known location)          │ IDE Extension
Bug fix (unknown location)        │ Claude Code
Refactoring                       │ Claude Code
Quick edit                        │ IDE Extension
                                  │
REVIEW & ANALYSIS                 │
──────────────────────────────────┼─────────────────────────────────────────
Code review                       │ Chat Interface or IDE
Security review                   │ Chat Interface
Architecture review               │ Chat Interface
                                  │
DOCUMENTATION                     │
──────────────────────────────────┼─────────────────────────────────────────
Write technical docs              │ Chat Interface
Update README                     │ Claude Code
Generate API docs                 │ Claude Code
Create presentations              │ Chat Interface
                                  │
TESTING                           │
──────────────────────────────────┼─────────────────────────────────────────
Write tests                       │ Claude Code
Run tests                         │ Claude Code or IDE
Debug failing tests               │ Claude Code
                                  │
OPERATIONS                        │
──────────────────────────────────┼─────────────────────────────────────────
Git operations                    │ Claude Code
Deployment                        │ Claude Code
Environment setup                 │ Claude Code
```

### 27.3 Environment Handoff Protocol

```
ENVIRONMENT HANDOFF PROTOCOL
─────────────────────────────────────────────────────────────────────────────

SCENARIO: Chat to Claude Code
─────────────────────────────────────────────────────────────────────────────
When: Architecture is planned, ready to implement

Chat Output:
```
## Ready for Implementation

We've designed the authentication system:
- JWT tokens with refresh
- Role-based access control
- Session management

### Claude Code Command:
cd /path/to/project && claude "Implement the authentication system 
we designed. See docs/auth-design.md for specifications."

### Files to Create:
- src/auth/jwt.ts
- src/auth/roles.ts
- src/auth/session.ts
- src/middleware/auth.ts
```

─────────────────────────────────────────────────────────────────────────────

SCENARIO: Claude Code to Chat
─────────────────────────────────────────────────────────────────────────────
When: Hit a design decision, need discussion

Claude Code Output:
```
I've implemented the basic structure but hit a design question:

Should we use:
A) Centralized session store (Redis)
B) Distributed JWT claims

Each has trade-offs. Let's discuss in chat.

Context file created: .claude/session-design-question.md
```

─────────────────────────────────────────────────────────────────────────────

SCENARIO: IDE to Claude Code
─────────────────────────────────────────────────────────────────────────────
When: Small edit revealed need for larger refactor

IDE Extension Note:
```
This function needs more than a quick fix.
Consider running Claude Code for full refactor:

claude "Refactor the user service to use the repository pattern.
Current implementation in src/services/user.ts has grown too complex."
```
```

---

## PART VI SUMMARY

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    PART VI: MCP & TOOL ORCHESTRATION                         │
│                           KEY TAKEAWAYS                                      │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  MCP POWER TOOLS:                                                            │
│  ─────────────────────────────────────────────────────────────────────────  │
│  • MCP = Standard protocol for AI-external system integration               │
│  • Categories: File System, Database, Browser, API, Cloud                   │
│  • Use simplest tool that works                                              │
│  • Built-in tools often sufficient                                           │
│                                                                              │
│  MCP-FIRST ARCHITECTURE:                                                     │
│  ─────────────────────────────────────────────────────────────────────────  │
│  • Every operation should be toolable                                        │
│  • Structured data over unstructured                                         │
│  • Idempotent operations (safe to retry)                                    │
│  • Route through MCP layer                                                   │
│  • Handle errors gracefully with fallbacks                                   │
│                                                                              │
│  VOICE-NATIVE DEVELOPMENT:                                                   │
│  ─────────────────────────────────────────────────────────────────────────  │
│  • Best for: Planning, review, discussion, high-level commands              │
│  • Suboptimal for: Precise code editing, symbol-heavy work                  │
│  • Session structure: Context → Plan → Execute → Verify → Iterate           │
│  • Save state for session continuity                                         │
│                                                                              │
│  IDE ROUTING:                                                                │
│  ─────────────────────────────────────────────────────────────────────────  │
│  • Chat Interface: Planning, review, documents                               │
│  • Claude Code: Multi-file implementation, refactoring, tests               │
│  • IDE Extensions: Quick edits, inline completion                           │
│  • API: Custom workflows, automation                                         │
│  • Hand off between environments with clear context                          │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---


---
*End of propagated content*
