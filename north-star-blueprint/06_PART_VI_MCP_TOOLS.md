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

## 🔄 PROPAGATED CONTENT FROM PART_4_DESIGN.md (v6.0)

> This section contains synchronized content from the Modular 7-part structure.
> Source: `projects/Segment Mods/NSBP5.0 -Segments/PART_4_DESIGN.md`

# NORTH STAR BLUEPRINT v6.0 — SEGMENT 4 of 7
## PART_4_DESIGN
### Contents: Part VII (Sections 28-36)
### Lines: 8782-10286 of original
---
> **SEGMENT NAVIGATION:** This is a development segment. For full Blueprint, merge all 7 parts.
> For BRIDGE routing: Sections 28-36 are in this segment.
---

# PART VII: DESIGN MASTERY SYSTEM

---

## 28. DESIGN PHILOSOPHY & FIRST IMPRESSIONS

> "This blueprint doesn't just build software—it crafts experiences that resonate with the human soul."

### 28.1 The First 3 Seconds

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        THE FIRST 3 SECONDS                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  Users form their impression of quality in the first 3 seconds.             │
│  Everything else is confirmation or contradiction of that impression.       │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                              │
│  WHAT USERS PERCEIVE INSTANTLY:                                              │
│                                                                              │
│  SECOND 1: VISUAL QUALITY                                                    │
│  ───────────────────────────────────────────────────────────────────────    │
│  • Professional typography (not system defaults)                            │
│  • Intentional color palette (not random)                                   │
│  • Proper spacing (breathing room)                                          │
│  • Visual hierarchy (clear focal points)                                    │
│                                                                              │
│  SECOND 2: MOTION & LIFE                                                     │
│  ───────────────────────────────────────────────────────────────────────    │
│  • Smooth initial animations                                                 │
│  • Responsive to interaction                                                 │
│  • Feels alive, not static                                                   │
│  • Loading handled gracefully                                                │
│                                                                              │
│  SECOND 3: TRUST SIGNALS                                                     │
│  ───────────────────────────────────────────────────────────────────────    │
│  • Clear value proposition                                                   │
│  • Professional branding                                                     │
│  • No obvious errors or broken elements                                     │
│  • Feels complete, not half-finished                                        │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                              │
│  THE TEST:                                                                   │
│  Would this look at home on Apple's website?                                │
│  Would a designer be proud to show this in their portfolio?                 │
│  Would I pay 2x market rate for this experience?                            │
│                                                                              │
│  If no → not ready to ship                                                  │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 28.2 Design Quality Indicators

```
DESIGN QUALITY INDICATORS
─────────────────────────────────────────────────────────────────────────────

HIGH QUALITY SIGNALS:
─────────────────────────────────────────────────────────────────────────────
✓ Consistent spacing throughout (8px grid)
✓ Typography has clear hierarchy (max 3 levels)
✓ Colors are deliberate and accessible
✓ Animations are smooth (60fps)
✓ Interactions have immediate feedback
✓ Loading states are designed, not default
✓ Error states are helpful, not scary
✓ Empty states guide users forward
✓ Mobile experience is first-class
✓ Accessibility is integrated, not bolted on

LOW QUALITY SIGNALS:
─────────────────────────────────────────────────────────────────────────────
✗ Inconsistent spacing (random margins)
✗ Too many font sizes/weights
✗ Colors clash or lack contrast
✗ Animations are janky or missing
✗ Clicks feel unresponsive
✗ Spinners or blank loading states
✗ Generic error messages
✗ Blank empty states
✗ Mobile is afterthought
✗ Accessibility breaks keyboard/screen reader
```

### 28.3 The Premium Feel Checklist

```
PREMIUM FEEL CHECKLIST
─────────────────────────────────────────────────────────────────────────────

VISUAL REFINEMENT:
□ No default browser styles visible
□ Custom fonts loaded and rendering
□ Icons are consistent style (all outline or all filled)
□ Images are high-quality and properly sized
□ Borders are subtle (1px, low opacity)
□ Shadows are soft and realistic
□ Rounded corners are consistent

INTERACTION REFINEMENT:
□ Buttons have hover, active, and focus states
□ Inputs have clear focus indicators
□ Clickable areas are generous (44px minimum)
□ Transitions between states are smooth
□ Feedback is immediate (< 100ms perceived)
□ Gestures feel natural (momentum, elasticity)

CONTENT REFINEMENT:
□ Copy is concise and clear
□ Microcopy guides users helpfully
□ Error messages suggest solutions
□ Success messages celebrate appropriately
□ Empty states offer actions
□ Loading states provide context

POLISH REFINEMENT:
□ Favicon is custom and crisp
□ Page titles are descriptive
□ Meta images are designed
□ 404 page is helpful and branded
□ Print styles considered (if applicable)
□ Dark mode is coherent (not inverted)
```

---

## 29. THE ANIMATION PRIORITY PYRAMID

### 29.1 Priority Structure

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                      ANIMATION PRIORITY PYRAMID                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  Not all animations are equal. Invest effort where it matters most.        │
│                                                                              │
│                              ╱╲                                              │
│                             ╱  ╲                                             │
│                            ╱    ╲                                            │
│                           ╱ P1:  ╲                                           │
│                          ╱ FIRST  ╲                                          │
│                         ╱ CONTACT  ╲                                         │
│                        ╱────────────╲                                        │
│                       ╱              ╲                                       │
│                      ╱   P2: CORE    ╲                                       │
│                     ╱   INTERACTIONS  ╲                                      │
│                    ╱──────────────────╲                                      │
│                   ╱                    ╲                                     │
│                  ╱   P3: FEEDBACK &    ╲                                     │
│                 ╱      TRANSITIONS      ╲                                    │
│                ╱────────────────────────╲                                    │
│               ╱                          ╲                                   │
│              ╱     P4: ENHANCEMENT &     ╲                                   │
│             ╱          DELIGHT            ╲                                  │
│            ╱──────────────────────────────╲                                  │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                              │
│  P1: FIRST CONTACT (Must be perfect)                                        │
│  • Page load animations                                                      │
│  • Hero section entrance                                                     │
│  • Logo reveal                                                               │
│  • Initial content appearance                                                │
│                                                                              │
│  P2: CORE INTERACTIONS (Must be smooth)                                      │
│  • Button clicks                                                             │
│  • Form submissions                                                          │
│  • Navigation transitions                                                    │
│  • Modal open/close                                                          │
│                                                                              │
│  P3: FEEDBACK & TRANSITIONS (Should be good)                                 │
│  • Loading states                                                            │
│  • Success/error feedback                                                    │
│  • State changes                                                             │
│  • List item animations                                                      │
│                                                                              │
│  P4: ENHANCEMENT & DELIGHT (Nice to have)                                    │
│  • Hover effects                                                             │
│  • Parallax scrolling                                                        │
│  • Easter eggs                                                               │
│  • Ambient animations                                                        │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 29.2 Priority Investment Guide

```
PRIORITY INVESTMENT GUIDE
─────────────────────────────────────────────────────────────────────────────

                    │ TIME    │ QUALITY   │ FALLBACK
PRIORITY            │ BUDGET  │ STANDARD  │ ACCEPTABLE?
────────────────────┼─────────┼───────────┼──────────────────────────────
P1: First Contact   │ 40%     │ Perfect   │ NO - must be flawless
P2: Core            │ 30%     │ Excellent │ NO - must be smooth
P3: Feedback        │ 20%     │ Good      │ YES - can be simple
P4: Enhancement     │ 10%     │ Nice      │ YES - can skip if time-pressed

─────────────────────────────────────────────────────────────────────────────

WHEN TO CUT ANIMATIONS (Time Pressure):

1. Cut P4 first (enhancement/delight)
   • Hover effects → simple state change
   • Parallax → static
   • Easter eggs → remove

2. Simplify P3 (feedback/transitions)
   • Complex loaders → simple spinner
   • Elaborate success → simple checkmark
   • Fancy transitions → instant

3. NEVER cut P1 or P2
   • First contact must always be polished
   • Core interactions must always work smoothly
   • These are non-negotiable quality indicators
```

---

## 30. ANIMATION SPECIFICATIONS LIBRARY

### 30.1 Animation Signatures

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       ANIMATION SIGNATURES                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  Every project should choose ONE primary animation signature.               │
│  This creates visual consistency and brand recognition.                     │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                              │
│  SIGNATURE: ELASTIC                                                          │
│  ───────────────────────────────────────────────────────────────────────    │
│  Character: Playful, energetic, modern                                      │
│  Best for: Consumer apps, creative tools, entertainment                     │
│                                                                              │
│  Key easing: cubic-bezier(0.68, -0.55, 0.265, 1.55)                         │
│  Motion: Overshoot then settle                                               │
│  Feel: Bouncy, alive                                                         │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                              │
│  SIGNATURE: PHYSICS-BASED                                                    │
│  ───────────────────────────────────────────────────────────────────────    │
│  Character: Natural, premium, sophisticated                                 │
│  Best for: Productivity apps, enterprise, professional tools               │
│                                                                              │
│  Key easing: spring(mass: 1, stiffness: 100, damping: 15)                   │
│  Motion: Natural acceleration and deceleration                              │
│  Feel: Weighty, responsive                                                   │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                              │
│  SIGNATURE: MINIMAL                                                          │
│  ───────────────────────────────────────────────────────────────────────    │
│  Character: Clean, efficient, professional                                  │
│  Best for: Data-heavy apps, dashboards, business tools                     │
│                                                                              │
│  Key easing: cubic-bezier(0.4, 0, 0.2, 1) (Material standard)              │
│  Motion: Quick, purposeful, no excess                                       │
│  Feel: Fast, precise                                                         │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                              │
│  SIGNATURE: DRAMATIC                                                         │
│  ───────────────────────────────────────────────────────────────────────    │
│  Character: Bold, impactful, memorable                                      │
│  Best for: Marketing sites, portfolios, launches                           │
│                                                                              │
│  Key easing: cubic-bezier(0.87, 0, 0.13, 1)                                 │
│  Motion: Slow start, strong finish                                          │
│  Feel: Cinematic, confident                                                  │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                              │
│  SIGNATURE: GENTLE                                                           │
│  ───────────────────────────────────────────────────────────────────────    │
│  Character: Calm, friendly, approachable                                    │
│  Best for: Health apps, education, accessibility-focused                   │
│                                                                              │
│  Key easing: cubic-bezier(0.25, 0.1, 0.25, 1)                               │
│  Motion: Soft, gradual, no surprises                                        │
│  Feel: Comfortable, trustworthy                                              │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 30.2 Common Animation Patterns

```
COMMON ANIMATION PATTERNS
─────────────────────────────────────────────────────────────────────────────

PATTERN: FADE IN UP
─────────────────────────────────────────────────────────────────────────────
Use: Content entrance, list items, cards
```css
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in-up {
  animation: fadeInUp 0.4s ease-out forwards;
}
```

PATTERN: SCALE IN
─────────────────────────────────────────────────────────────────────────────
Use: Modals, popovers, tooltips
```css
@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.scale-in {
  animation: scaleIn 0.2s ease-out forwards;
}
```

PATTERN: SLIDE IN
─────────────────────────────────────────────────────────────────────────────
Use: Drawers, sidebars, panels
```css
@keyframes slideIn {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
}

.slide-in {
  animation: slideIn 0.3s ease-out forwards;
}
```

PATTERN: STAGGER
─────────────────────────────────────────────────────────────────────────────
Use: Lists, grids, sequential reveals
```css
.stagger-item {
  animation: fadeInUp 0.4s ease-out forwards;
  opacity: 0;
}

.stagger-item:nth-child(1) { animation-delay: 0ms; }
.stagger-item:nth-child(2) { animation-delay: 50ms; }
.stagger-item:nth-child(3) { animation-delay: 100ms; }
/* Continue pattern... */
```

PATTERN: SKELETON SHIMMER
─────────────────────────────────────────────────────────────────────────────
Use: Loading placeholders
```css
@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

.skeleton {
  background: linear-gradient(
    90deg,
    #f0f0f0 25%,
    #e0e0e0 50%,
    #f0f0f0 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}
```
```

---

### Animation & Performance Patterns

#### Recommended Animation Libraries
| Library | Best For | Performance |
|---------|----------|-------------|
| **GSAP** | Complex timelines | Excellent |
| **Framer Motion** | React | Very Good |
| **Lenis** | Smooth scrolling | Excellent |

#### UI Sniping Methodology
1. **Identify**: Find exceptional UI (Apple, Linear, Vercel)
2. **Analyze**: Understand the interaction pattern
3. **Extract**: Document the core mechanic
4. **Adapt**: Implement with your design system

#### Speed Optimization Checklist
```
□ Core Web Vitals passing (LCP < 2.5s)
□ Images optimized (WebP/AVIF)
□ JS bundle < 200KB gzipped
□ Animations GPU-accelerated
```

---
## 31. STANDARD EASINGS, DURATIONS & MOTION

### 32.0 Standard Easings

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         STANDARD EASINGS                                     │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  NAME              │ VALUE                              │ USE CASE          │
│  ──────────────────┼────────────────────────────────────┼─────────────────  │
│                    │                                    │                   │
│  ease-out          │ cubic-bezier(0, 0, 0.2, 1)        │ Entrances         │
│  (decelerate)      │                                    │ Things appearing  │
│                    │                                    │                   │
│  ──────────────────┼────────────────────────────────────┼─────────────────  │
│                    │                                    │                   │
│  ease-in           │ cubic-bezier(0.4, 0, 1, 1)        │ Exits             │
│  (accelerate)      │                                    │ Things leaving    │
│                    │                                    │                   │
│  ──────────────────┼────────────────────────────────────┼─────────────────  │
│                    │                                    │                   │
│  ease-in-out       │ cubic-bezier(0.4, 0, 0.2, 1)      │ On-screen motion  │
│  (standard)        │                                    │ State changes     │
│                    │                                    │                   │
│  ──────────────────┼────────────────────────────────────┼─────────────────  │
│                    │                                    │                   │
│  ease-bounce       │ cubic-bezier(0.68, -0.55,         │ Playful UI        │
│  (overshoot)       │              0.265, 1.55)         │ Attention getters │
│                    │                                    │                   │
│  ──────────────────┼────────────────────────────────────┼─────────────────  │
│                    │                                    │                   │
│  ease-smooth       │ cubic-bezier(0.25, 0.1, 0.25, 1)  │ Subtle motion     │
│  (gentle)          │                                    │ Accessibility     │
│                    │                                    │                   │
│  ──────────────────┼────────────────────────────────────┼─────────────────  │
│                    │                                    │                   │
│  linear            │ linear                             │ Progress bars     │
│  (constant)        │                                    │ Continuous motion │
│                    │                                    │                   │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 31.2 Standard Durations

```
STANDARD DURATIONS
─────────────────────────────────────────────────────────────────────────────

INSTANT: 0ms
─────────────────────────────────────────────────────────────────────────────
Use: State indicators, focus rings
Feel: Immediate, no perceptible delay
Example: Button active state, checkbox check

MICRO: 100ms
─────────────────────────────────────────────────────────────────────────────
Use: Micro-interactions, hover states
Feel: Snappy, responsive
Example: Button hover color, icon rotate

FAST: 200ms
─────────────────────────────────────────────────────────────────────────────
Use: Small UI changes, tooltips
Feel: Quick but visible
Example: Dropdown appear, tooltip show

STANDARD: 300ms
─────────────────────────────────────────────────────────────────────────────
Use: Most UI animations, modals
Feel: Smooth, comfortable
Example: Modal open, panel slide

MODERATE: 400ms
─────────────────────────────────────────────────────────────────────────────
Use: Page transitions, larger elements
Feel: Deliberate, noticeable
Example: Page transition, hero animation

SLOW: 500ms
─────────────────────────────────────────────────────────────────────────────
Use: Complex animations, emphasis
Feel: Dramatic, attention-grabbing
Example: Loading complete, celebration

EXTRA SLOW: 700ms+
─────────────────────────────────────────────────────────────────────────────
Use: Cinematic moments, onboarding
Feel: Luxurious, immersive
Example: First-time experience, reveal

─────────────────────────────────────────────────────────────────────────────

CSS CUSTOM PROPERTIES:
```css
:root {
  --duration-instant: 0ms;
  --duration-micro: 100ms;
  --duration-fast: 200ms;
  --duration-standard: 300ms;
  --duration-moderate: 400ms;
  --duration-slow: 500ms;
  --duration-extra-slow: 700ms;
}
```
```

### 31.3 Motion Guidelines

```
MOTION GUIDELINES
─────────────────────────────────────────────────────────────────────────────

PRINCIPLE 1: MOTION HAS MEANING
─────────────────────────────────────────────────────────────────────────────
Every animation should communicate something:
• Direction indicates relationship
• Speed indicates importance
• Scale indicates hierarchy

DON'T: Animate just because you can
DO: Animate to communicate or guide

PRINCIPLE 2: MOTION IS CONSISTENT
─────────────────────────────────────────────────────────────────────────────
Same actions should have same animations:
• All buttons behave the same way
• All modals open the same way
• All transitions use same easing family

DON'T: Mix animation styles randomly
DO: Define motion patterns and follow them

PRINCIPLE 3: MOTION RESPECTS PREFERENCES
─────────────────────────────────────────────────────────────────────────────
Honor user preferences for reduced motion:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

PRINCIPLE 4: MOTION PERFORMS WELL
─────────────────────────────────────────────────────────────────────────────
Only animate transform and opacity:
• transform: translate, scale, rotate
• opacity

AVOID animating (causes reflow/repaint):
• width, height
• top, left, right, bottom
• margin, padding
• font-size
• box-shadow (use pseudo-elements)

PRINCIPLE 5: MOTION IS INTERRUPTIBLE
─────────────────────────────────────────────────────────────────────────────
Users should be able to:
• Skip long animations
• Cancel ongoing transitions
• Not wait for animations to complete
```

---

## 32. MICRO-INTERACTION PATTERNS

### 32.1 Button Interactions

```
BUTTON MICRO-INTERACTIONS
─────────────────────────────────────────────────────────────────────────────

STATE: DEFAULT
─────────────────────────────────────────────────────────────────────────────
Visual: Base styles applied
Animation: None (static)

STATE: HOVER
─────────────────────────────────────────────────────────────────────────────
Visual: Subtle background shift, slight scale
Animation: 100-150ms ease-out
```css
.button:hover {
  background: var(--color-primary-hover);
  transform: translateY(-1px);
  transition: all 150ms ease-out;
}
```

STATE: ACTIVE (Pressed)
─────────────────────────────────────────────────────────────────────────────
Visual: Slight scale down, darker background
Animation: Instant (0ms) or very fast (50ms)
```css
.button:active {
  transform: translateY(0) scale(0.98);
  background: var(--color-primary-active);
  transition: transform 50ms ease-out;
}
```

STATE: FOCUS
─────────────────────────────────────────────────────────────────────────────
Visual: Visible ring, NOT just color change
Animation: Instant (for accessibility)
```css
.button:focus-visible {
  outline: 2px solid var(--color-focus);
  outline-offset: 2px;
}
```

STATE: LOADING
─────────────────────────────────────────────────────────────────────────────
Visual: Spinner replaces text, disabled appearance
Animation: Spinner rotates continuously
```css
.button.loading {
  color: transparent;
  pointer-events: none;
}

.button.loading::after {
  content: '';
  position: absolute;
  width: 16px;
  height: 16px;
  border: 2px solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  animation: spin 600ms linear infinite;
}
```

STATE: DISABLED
─────────────────────────────────────────────────────────────────────────────
Visual: Reduced opacity, cursor change
Animation: None (no hover effects)
```css
.button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}
```
```

### 32.2 Form Input Interactions

```
FORM INPUT MICRO-INTERACTIONS
─────────────────────────────────────────────────────────────────────────────

LABEL ANIMATION (Floating Label)
─────────────────────────────────────────────────────────────────────────────
```css
.input-group {
  position: relative;
}

.input-label {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--color-text-secondary);
  transition: all 200ms ease-out;
  pointer-events: none;
}

.input:focus + .input-label,
.input:not(:placeholder-shown) + .input-label {
  top: 0;
  font-size: 12px;
  color: var(--color-primary);
  background: var(--color-background);
  padding: 0 4px;
}
```

BORDER FOCUS ANIMATION
─────────────────────────────────────────────────────────────────────────────
```css
.input {
  border: 1px solid var(--color-border);
  transition: border-color 200ms ease-out,
              box-shadow 200ms ease-out;
}

.input:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px var(--color-primary-alpha);
}
```

VALIDATION STATES
─────────────────────────────────────────────────────────────────────────────
```css
.input.valid {
  border-color: var(--color-success);
}

.input.valid + .icon-valid {
  opacity: 1;
  transform: scale(1);
}

.input.error {
  border-color: var(--color-error);
  animation: shake 400ms ease-out;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-4px); }
  75% { transform: translateX(4px); }
}
```

CHARACTER COUNT
─────────────────────────────────────────────────────────────────────────────
```css
.char-count {
  transition: color 200ms ease-out;
}

.char-count.warning {
  color: var(--color-warning);
}

.char-count.error {
  color: var(--color-error);
  animation: pulse 300ms ease-out;
}
```
```

### 32.3 Card & List Interactions

```
CARD & LIST MICRO-INTERACTIONS
─────────────────────────────────────────────────────────────────────────────

CARD HOVER
─────────────────────────────────────────────────────────────────────────────
```css
.card {
  transition: transform 200ms ease-out,
              box-shadow 200ms ease-out;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
}
```

LIST ITEM ENTRANCE (Staggered)
─────────────────────────────────────────────────────────────────────────────
```css
.list-item {
  opacity: 0;
  transform: translateY(10px);
  animation: fadeInUp 300ms ease-out forwards;
}

.list-item:nth-child(1) { animation-delay: 0ms; }
.list-item:nth-child(2) { animation-delay: 50ms; }
.list-item:nth-child(3) { animation-delay: 100ms; }
.list-item:nth-child(4) { animation-delay: 150ms; }
.list-item:nth-child(5) { animation-delay: 200ms; }
/* Cap at 5 to avoid long waits */
.list-item:nth-child(n+6) { animation-delay: 250ms; }
```

LIST ITEM REORDER
─────────────────────────────────────────────────────────────────────────────
```css
.list-item {
  transition: transform 300ms ease-out;
}

.list-item.dragging {
  opacity: 0.8;
  transform: scale(1.02);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  z-index: 1;
}
```

SWIPE TO DELETE
─────────────────────────────────────────────────────────────────────────────
```css
.list-item {
  transition: transform 200ms ease-out;
}

.list-item.swiping {
  transition: none; /* Direct manipulation */
}

.list-item.deleting {
  transform: translateX(-100%);
  opacity: 0;
  transition: all 300ms ease-out;
}
```
```

---

## 33. LOADING STATES & FEEDBACK SYSTEMS

### 33.1 Loading State Hierarchy

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       LOADING STATE HIERARCHY                                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  TYPE 1: INSTANT (< 100ms)                                                   │
│  ───────────────────────────────────────────────────────────────────────    │
│  No loading indicator needed                                                │
│  UI should update directly                                                   │
│  Feels instantaneous to user                                                │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                              │
│  TYPE 2: QUICK (100ms - 1s)                                                  │
│  ───────────────────────────────────────────────────────────────────────    │
│  Subtle loading indicator                                                   │
│  Button spinner or opacity reduction                                        │
│  Don't block entire UI                                                      │
│                                                                              │
│  Implementation:                                                             │
│  • Button shows inline spinner                                               │
│  • Disabled state during operation                                           │
│  • No overlay or modal                                                       │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                              │
│  TYPE 3: NOTICEABLE (1s - 5s)                                                │
│  ───────────────────────────────────────────────────────────────────────    │
│  Clear loading indicator                                                    │
│  Skeleton screens for content                                               │
│  Optimistic UI where possible                                               │
│                                                                              │
│  Implementation:                                                             │
│  • Skeleton placeholders                                                     │
│  • Progress indication if known                                              │
│  • Partial content display                                                   │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                              │
│  TYPE 4: LONG (5s - 30s)                                                     │
│  ───────────────────────────────────────────────────────────────────────    │
│  Progress indicator with percentage                                         │
│  Explanatory text                                                            │
│  Cancel option                                                               │
│                                                                              │
│  Implementation:                                                             │
│  • Progress bar with percentage                                              │
│  • "This may take a moment..."                                              │
│  • Cancel button available                                                   │
│  • Background operation option                                               │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                              │
│  TYPE 5: EXTENDED (> 30s)                                                    │
│  ───────────────────────────────────────────────────────────────────────    │
│  Background processing                                                      │
│  Email/notification when complete                                           │
│  Let user continue other work                                               │
│                                                                              │
│  Implementation:                                                             │
│  • "We'll email you when ready"                                             │
│  • Task moves to background queue                                            │
│  • Progress visible but not blocking                                        │
│  • User can navigate away                                                    │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 33.2 Skeleton Screen Patterns

```
SKELETON SCREEN PATTERNS
─────────────────────────────────────────────────────────────────────────────

BASIC SKELETON STRUCTURE:
```css
.skeleton {
  background: linear-gradient(
    90deg,
    var(--skeleton-base) 25%,
    var(--skeleton-highlight) 50%,
    var(--skeleton-base) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 4px;
}

.skeleton-text {
  height: 1em;
  margin-bottom: 0.5em;
}

.skeleton-text.short { width: 40%; }
.skeleton-text.medium { width: 70%; }
.skeleton-text.long { width: 100%; }

.skeleton-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
}

.skeleton-image {
  aspect-ratio: 16/9;
  width: 100%;
}
```

CARD SKELETON:
```html
<div class="card-skeleton">
  <div class="skeleton skeleton-image"></div>
  <div class="skeleton skeleton-text long"></div>
  <div class="skeleton skeleton-text medium"></div>
  <div class="skeleton skeleton-text short"></div>
</div>
```

LIST SKELETON:
```html
<div class="list-skeleton">
  <div class="list-item-skeleton">
    <div class="skeleton skeleton-avatar"></div>
    <div class="list-item-content">
      <div class="skeleton skeleton-text medium"></div>
      <div class="skeleton skeleton-text short"></div>
    </div>
  </div>
  <!-- Repeat for expected number of items -->
</div>
```
```

### 33.3 Feedback Messages

```
FEEDBACK MESSAGE PATTERNS
─────────────────────────────────────────────────────────────────────────────

SUCCESS FEEDBACK:
─────────────────────────────────────────────────────────────────────────────
Appearance: Green accent, check icon
Duration: Auto-dismiss after 3-5 seconds
Position: Top-right toast or inline
Animation: Slide in from top/right, fade out

Content guidelines:
✓ "Changes saved" (not "Your changes have been successfully saved")
✓ Specific: "Email sent to john@example.com"
✓ Action available: "Changes saved. Undo"


ERROR FEEDBACK:
─────────────────────────────────────────────────────────────────────────────
Appearance: Red accent, alert icon
Duration: Persist until dismissed or fixed
Position: Inline near error source, or modal for blocking
Animation: Shake for attention, then stable

Content guidelines:
✓ What happened: "Couldn't save changes"
✓ Why (if known): "Server is temporarily unavailable"
✓ What to do: "Try again" or "Contact support"


WARNING FEEDBACK:
─────────────────────────────────────────────────────────────────────────────
Appearance: Yellow/orange accent, warning icon
Duration: Persist until acknowledged
Position: Inline or banner
Animation: Subtle pulse

Content guidelines:
✓ What's happening: "Your trial ends in 3 days"
✓ Impact: "You'll lose access to premium features"
✓ Action: "Upgrade now"


INFO FEEDBACK:
─────────────────────────────────────────────────────────────────────────────
Appearance: Blue accent, info icon
Duration: Auto-dismiss after 5-7 seconds or persist
Position: Top banner or inline
Animation: Gentle fade in

Content guidelines:
✓ Brief: "New feature: Dark mode is now available"
✓ Actionable: "Try it in Settings"


TOAST IMPLEMENTATION:
─────────────────────────────────────────────────────────────────────────────
```css
.toast {
  position: fixed;
  top: 16px;
  right: 16px;
  padding: 12px 16px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  animation: slideInRight 300ms ease-out;
}

.toast.exiting {
  animation: fadeOut 200ms ease-out forwards;
}

@keyframes slideInRight {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
```
```

---

## 34. THE ENHANCED SPACE TIER EXPERIENCE

### 34.1 Space Tier Philosophy

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    ENHANCED SPACE TIER EXPERIENCE                            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  "Space Tier" refers to the premium experience level where every detail    │
│  has been considered, polished, and perfected.                             │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                              │
│  SPACE TIER CHARACTERISTICS:                                                 │
│                                                                              │
│  VISUAL DEPTH                                                                │
│  ───────────────────────────────────────────────────────────────────────    │
│  • Subtle gradients that create dimension                                   │
│  • Layered shadows for realistic depth                                      │
│  • Glassmorphism where appropriate                                          │
│  • Micro-textures for tactile feel                                          │
│                                                                              │
│  MOTION EXCELLENCE                                                           │
│  ───────────────────────────────────────────────────────────────────────    │
│  • Every transition is intentional                                          │
│  • Physics-based animations                                                  │
│  • Gesture-responsive interfaces                                             │
│  • Ambient subtle motion                                                     │
│                                                                              │
│  INTERACTION POLISH                                                          │
│  ───────────────────────────────────────────────────────────────────────    │
│  • Every state has been designed                                            │
│  • Micro-interactions on every element                                      │
│  • Sound design (optional, tasteful)                                        │
│  • Haptic feedback (mobile)                                                  │
│                                                                              │
│  CONTENT CARE                                                                │
│  ───────────────────────────────────────────────────────────────────────    │
│  • Typography is perfect                                                     │
│  • Microcopy is delightful                                                   │
│  • Empty states tell stories                                                 │
│  • Error messages are human                                                  │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 34.2 Space Tier Techniques

```
SPACE TIER TECHNIQUES
─────────────────────────────────────────────────────────────────────────────

LAYERED SHADOWS:
```css
.space-tier-card {
  box-shadow:
    0 1px 2px rgba(0, 0, 0, 0.04),
    0 2px 4px rgba(0, 0, 0, 0.04),
    0 4px 8px rgba(0, 0, 0, 0.04),
    0 8px 16px rgba(0, 0, 0, 0.04),
    0 16px 32px rgba(0, 0, 0, 0.04);
}
```

SUBTLE GRADIENTS:
```css
.space-tier-background {
  background: linear-gradient(
    180deg,
    hsl(220, 20%, 98%) 0%,
    hsl(220, 20%, 96%) 100%
  );
}

.space-tier-button {
  background: linear-gradient(
    180deg,
    hsl(220, 90%, 56%) 0%,
    hsl(220, 90%, 48%) 100%
  );
}
```

GLASSMORPHISM:
```css
.space-tier-glass {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}
```

MICRO-TEXTURE:
```css
.space-tier-texture {
  background-image: url("data:image/svg+xml,..."); /* Subtle noise */
  background-size: 200px;
  opacity: 0.03;
}
```

AMBIENT MOTION:
```css
.space-tier-ambient {
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}
```
```

---

## 35. ACCESSIBILITY INTEGRATION

### 35.1 Accessibility Requirements

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                      ACCESSIBILITY REQUIREMENTS                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  Accessibility is not optional. It's a legal requirement in many           │
│  jurisdictions and an ethical imperative everywhere.                        │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                              │
│  WCAG 2.1 AA REQUIREMENTS (Minimum):                                         │
│                                                                              │
│  PERCEIVABLE                                                                 │
│  ───────────────────────────────────────────────────────────────────────    │
│  □ Text contrast: 4.5:1 for normal, 3:1 for large text                     │
│  □ UI component contrast: 3:1 against background                           │
│  □ Images have alt text                                                     │
│  □ Videos have captions                                                     │
│  □ Content doesn't rely solely on color                                    │
│                                                                              │
│  OPERABLE                                                                    │
│  ───────────────────────────────────────────────────────────────────────    │
│  □ All functionality keyboard accessible                                    │
│  □ No keyboard traps                                                        │
│  □ Skip links for navigation                                                │
│  □ Focus order is logical                                                   │
│  □ Focus indicator is visible                                               │
│  □ Touch targets: 44x44px minimum                                           │
│                                                                              │
│  UNDERSTANDABLE                                                              │
│  ───────────────────────────────────────────────────────────────────────    │
│  □ Page language is declared                                                │
│  □ Labels describe purpose                                                  │
│  □ Error messages are helpful                                               │
│  □ Instructions are clear                                                   │
│                                                                              │
│  ROBUST                                                                      │
│  ───────────────────────────────────────────────────────────────────────    │
│  □ Valid HTML                                                                │
│  □ ARIA used correctly                                                       │
│  □ Name, role, value available                                              │
│  □ Status messages announced                                                 │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 35.2 Accessibility Patterns

```
ACCESSIBILITY PATTERNS
─────────────────────────────────────────────────────────────────────────────

SKIP LINK:
```html
<a href="#main-content" class="skip-link">
  Skip to main content
</a>

<style>
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  padding: 8px;
  background: var(--color-primary);
  color: white;
  z-index: 100;
}

.skip-link:focus {
  top: 0;
}
</style>
```

FOCUS MANAGEMENT:
```javascript
// After modal opens
modal.querySelector('[autofocus]')?.focus();

// After modal closes
previouslyFocusedElement.focus();

// Trap focus in modal
function trapFocus(element) {
  const focusableElements = element.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  const firstFocusable = focusableElements[0];
  const lastFocusable = focusableElements[focusableElements.length - 1];

  element.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      if (e.shiftKey && document.activeElement === firstFocusable) {
        e.preventDefault();
        lastFocusable.focus();
      } else if (!e.shiftKey && document.activeElement === lastFocusable) {
        e.preventDefault();
        firstFocusable.focus();
      }
    }
  });
}
```

ARIA LIVE REGIONS:
```html
<!-- For status updates -->
<div aria-live="polite" aria-atomic="true" class="sr-only">
  <!-- Content updated dynamically -->
</div>

<!-- For urgent alerts -->
<div role="alert" aria-live="assertive">
  <!-- Alert content -->
</div>
```

REDUCED MOTION:
```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

FORM ACCESSIBILITY:
```html
<div class="form-group">
  <label for="email">Email address</label>
  <input
    type="email"
    id="email"
    name="email"
    aria-describedby="email-help email-error"
    aria-invalid="false"
    required
  />
  <span id="email-help" class="help-text">
    We'll never share your email.
  </span>
  <span id="email-error" class="error-text" role="alert">
    <!-- Error message appears here -->
  </span>
</div>
```
```

---

## 36. DESIGN TERMINOLOGY REFERENCE

### 36.1 Essential Design Terms

```
DESIGN TERMINOLOGY REFERENCE
─────────────────────────────────────────────────────────────────────────────

VISUAL DESIGN TERMS:
─────────────────────────────────────────────────────────────────────────────

HIERARCHY: Arrangement of elements to show importance
  • Size, color, position, contrast signal what matters

WHITESPACE: Empty space between elements
  • Not "unused" space—intentional breathing room
  • Also called "negative space"

GRID: Invisible structure that aligns elements
  • Creates consistency and rhythm
  • Common: 12-column, 8px baseline

TYPOGRAPHY SCALE: Predefined set of font sizes
  • Creates visual rhythm
  • Usually follows mathematical ratio (1.25, 1.333, 1.5)

DESIGN TOKENS: Named values for design decisions
  • color-primary: #3B82F6
  • spacing-md: 16px
  • Enable consistency and theming


INTERACTION DESIGN TERMS:
─────────────────────────────────────────────────────────────────────────────

AFFORDANCE: Visual cue that suggests function
  • Button looks pressable
  • Link looks clickable
  • Handle looks draggable

FEEDBACK: System response to user action
  • Immediate acknowledgment
  • Progress indication
  • Completion confirmation

PROGRESSIVE DISCLOSURE: Revealing complexity gradually
  • Show basics first
  • Advanced options on demand
  • Reduces cognitive load

COGNITIVE LOAD: Mental effort to use interface
  • Lower is better
  • Reduce choices, use familiar patterns

MENTAL MODEL: User's understanding of how system works
  • Match user expectations
  • Be consistent with conventions


ANIMATION TERMS:
─────────────────────────────────────────────────────────────────────────────

EASING: Speed curve of animation
  • ease-in: Starts slow, ends fast
  • ease-out: Starts fast, ends slow
  • ease-in-out: Slow both ends

KEYFRAMES: Defined points in animation
  • 0% (from): Starting state
  • 100% (to): Ending state
  • Can have intermediate points

TRANSITION: Change between two states
  • Triggered by state change
  • Usually shorter than animation

TRANSFORM: Visual modification without layout change
  • translate: Move
  • scale: Resize
  • rotate: Spin
  • Performant (GPU accelerated)


ACCESSIBILITY TERMS:
─────────────────────────────────────────────────────────────────────────────

WCAG: Web Content Accessibility Guidelines
  • A, AA, AAA levels
  • AA is typical target

ARIA: Accessible Rich Internet Applications
  • Attributes that help assistive technology
  • aria-label, aria-hidden, aria-live

SCREEN READER: Assistive tech that reads content aloud
  • NVDA, JAWS (Windows)
  • VoiceOver (macOS/iOS)
  • TalkBack (Android)

FOCUS: Currently active element for keyboard interaction
  • Shows where keyboard input goes
  • Must be visually indicated
```

---

## PART VII SUMMARY

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                     PART VII: DESIGN MASTERY SYSTEM                          │
│                           KEY TAKEAWAYS                                      │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  FIRST IMPRESSIONS (3 Seconds):                                              │
│  ─────────────────────────────────────────────────────────────────────────  │
│  Second 1: Visual quality (typography, color, spacing)                       │
│  Second 2: Motion & life (animations, responsiveness)                        │
│  Second 3: Trust signals (professionalism, completeness)                    │
│                                                                              │
│  ANIMATION PRIORITY PYRAMID:                                                 │
│  ─────────────────────────────────────────────────────────────────────────  │
│  P1: First Contact (40%) - Must be perfect                                  │
│  P2: Core Interactions (30%) - Must be smooth                               │
│  P3: Feedback/Transitions (20%) - Should be good                            │
│  P4: Enhancement/Delight (10%) - Nice to have                               │
│                                                                              │
│  ANIMATION SIGNATURES:                                                       │
│  ─────────────────────────────────────────────────────────────────────────  │
│  Elastic (playful), Physics (premium), Minimal (efficient),                 │
│  Dramatic (bold), Gentle (calm)                                              │
│  Choose ONE per project for consistency                                      │
│                                                                              │
│  STANDARD DURATIONS:                                                         │
│  ─────────────────────────────────────────────────────────────────────────  │
│  Instant (0ms), Micro (100ms), Fast (200ms), Standard (300ms),              │
│  Moderate (400ms), Slow (500ms), Extra Slow (700ms+)                        │
│                                                                              │
│  LOADING STATES:                                                             │
│  ─────────────────────────────────────────────────────────────────────────  │
│  < 100ms: No indicator | 100ms-1s: Subtle indicator                          │
│  1-5s: Skeleton screens | 5-30s: Progress + cancel                          │
│  > 30s: Background + notification                                            │
│                                                                              │
│  ACCESSIBILITY (Non-Negotiable):                                             │
│  ─────────────────────────────────────────────────────────────────────────  │
│  • Color contrast: 4.5:1 text, 3:1 UI                                       │
│  • Keyboard accessible: All functionality                                    │
│  • Touch targets: 44x44px minimum                                           │
│  • Reduced motion: Respect prefers-reduced-motion                           │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---


---
*End of propagated content*
