# MASTER BUILD FRAMEWORK v2.0 — SEGMENT 3 of 4
## MBF_PART_3_CONTENT_OPS
### Contents: Tier 5 (Cat 36-42) + Tier 6 (Cat 43-49)
### Lines: 2244-3074 of original
---
> **SEGMENT NAVIGATION:** This is a development segment. For full MBF, merge all 4 parts.
> For BRIDGE routing: Categories 36-49 are in this segment.
---

# TIER 5: CONTENT GENERATION
## *Creating Media and Documents at Scale*

---

## Category 36: Image Generation

### Scope
AI image generation, thumbnails, product shots, social graphics.

### Technology Stack  -  Exhaustive

#### Image Generation Models
| Model | Provider | Best For |
|-------|----------|----------|
| **DALL-E 3** | OpenAI | Quality, safety |
| **Midjourney** | Midjourney | Artistic |
| **Stable Diffusion XL** | Stability AI | Open-source |
| **Flux** | Black Forest Labs | Quality, speed |
| **Ideogram** | Ideogram | Text in images |

#### Generation Platforms
| Platform | Features |
|----------|----------|
| **Replicate** | Model hosting |
| **Modal** | Custom pipelines |
| **Fal.ai** | Fast inference |
| **ComfyUI** | Node-based workflow |

#### Image Processing
| Tool | Purpose |
|------|---------|
| **Sharp** | Node.js processing |
| **Cloudinary** | CDN + processing |
| **imgix** | Real-time transforms |

### Quality Gates

```
□ Prompt engineering optimized
□ Consistency maintained
□ Resolution appropriate
□ CDN delivery configured
□ Content moderation active
□ Cost per image tracked
```

### Cross-Category Dependencies
- **â†' Category 11** (GPU)  -  Generation compute
- **â†' Category 19** (Storage)  -  Asset storage
- **â†' Category 35** (Safety)  -  Content moderation

---

## Category 37: Audio Generation

### Scope
Voice synthesis, text-to-speech, music generation, voice cloning.

### Technology Stack  -  Exhaustive

#### Text-to-Speech
| Service | Best For |
|---------|----------|
| **ElevenLabs** | Voice cloning, quality |
| **OpenAI TTS** | Simple, integrated |
| **Resemble AI** | Voice cloning |
| **Bark** | Open-source |

#### Music Generation
| Service | Features |
|---------|----------|
| **Suno** | Full songs |
| **Udio** | Music creation |
| **MusicGen** | Meta research |

#### Real-Time Voice
| Service | Use Case |
|---------|----------|
| **Vapi** | Voice AI agents |
| **Retell AI** | Voice agents |
| **Vocode** | Voice apps |
| **LiveKit** | Real-time audio |

### Quality Gates

```
□ Audio quality verified
□ Pronunciation accuracy
□ Latency acceptable
□ Rights/licensing clear
□ Voice consent obtained
```

### Cross-Category Dependencies
- **â†' Category 11** (GPU)  -  Generation compute
- **â†' Category 19** (Storage)  -  Audio storage
- **â†' Category 47** (Voice)  -  Voice interfaces

---

## Category 38: Video Generation & Processing

### Scope
AI video generation, transcoding, compositing, streaming.

### Technology Stack  -  Exhaustive

#### Video Generation
| Service | Features |
|---------|----------|
| **Runway** | Gen-3, motion |
| **Pika** | Text-to-video |
| **HeyGen** | Avatar videos |
| **Synthesia** | Presenter videos |

#### Video Processing
| Tool | Purpose |
|------|---------|
| **FFmpeg** | Universal processing |
| **Remotion** | React videos |
| **Shotstack** | API editing |

#### Streaming & Delivery
| Service | Features |
|---------|----------|
| **Mux** | Streaming platform |
| **Cloudflare Stream** | Edge delivery |
| **api.video** | Full platform |

### Quality Gates

```
□ Video quality appropriate
□ Encoding optimized
□ Adaptive bitrate configured
□ Subtitles synchronized
□ CDN delivery configured
```

### Cross-Category Dependencies
- **â†' Category 11** (GPU)  -  Processing compute
- **â†' Category 19** (Storage)  -  Video storage
- **â†' Category 9** (Edge)  -  CDN delivery

---

## Category 39: Document Generation

### Scope
PDF generation, reports, contracts, invoices, slides.

### Technology Stack  -  Exhaustive

#### PDF Generation
| Tool | Best For |
|------|----------|
| **Puppeteer** | HTML to PDF |
| **Playwright** | HTML to PDF |
| **WeasyPrint** | CSS to PDF |
| **pdf-lib** | Manipulation |
| **Gotenberg** | Docker service |

#### Slide Generation
| Tool | Features |
|------|----------|
| **Slidev** | Markdown slides |
| **Reveal.js** | HTML slides |
| **python-pptx** | PowerPoint |
| **Gamma** | AI slides |

#### Contract & Legal
| Tool | Purpose |
|------|---------|
| **DocuSign** | E-signatures |
| **PandaDoc** | Document automation |

### Quality Gates

```
□ Template validation
□ PDF/A compliance (if required)
□ Accessibility checked
□ Font embedding correct
□ File size optimized
```

### Cross-Category Dependencies
- **â†' Category 19** (Storage)  -  Document storage
- **â†' Category 44** (Workflows)  -  Generation pipelines

---

## Category 40: Code Generation

### Scope
AI-assisted coding, code completion, code transformation.

### Technology Stack  -  Exhaustive

#### AI Coding Assistants
| Tool | Features |
|------|----------|
| **GitHub Copilot** | Inline completion |
| **Cursor** | AI-native IDE |
| **Claude Code** | Agentic coding |
| **Aider** | CLI assistant |
| **Codeium** | Free completion |

#### Code Transformation
| Tool | Purpose |
|------|---------|
| **jscodeshift** | JS codemods |
| **Semgrep** | Pattern matching |
| **ast-grep** | Structural search |

### Quality Gates

```
□ Code quality validated
□ Tests generated/passing
□ Security scan passed
□ Style guide followed
```

### Cross-Category Dependencies
- **â†' Category 29** (RAG)  -  Codebase retrieval
- **â†' Category 46** (Testing)  -  Generated tests

---

## Category 41: Data & Content Generation

### Scope
Synthetic data generation, content creation, dataset augmentation.

### Technology Stack  -  Exhaustive

#### Synthetic Data
| Tool | Purpose |
|------|---------|
| **Faker** | Fake data |
| **Gretel** | Privacy-preserving |
| **SDV** | Statistical generation |

#### Content Generation
| Tool | Features |
|------|----------|
| **Jasper** | Marketing content |
| **Copy.ai** | Copywriting |

### Quality Gates

```
□ Data distribution validated
□ Privacy preserved
□ Bias evaluated
□ Format consistent
```

### Cross-Category Dependencies
- **â†' Category 28** (Feature Store)  -  Training data
- **â†' Category 46** (Testing)  -  Test data

---

## Category 42: Translation & Localization

### Scope
Machine translation, i18n, l10n, content adaptation.

### Technology Stack  -  Exhaustive

#### Translation Services
| Service | Features |
|---------|----------|
| **DeepL** | High quality |
| **Google Translate** | Many languages |
| **OpenAI/Claude** | Context-aware |

#### i18n Frameworks
| Framework | Language |
|-----------|----------|
| **react-i18next** | React |
| **next-intl** | Next.js |
| **FormatJS** | JavaScript |

#### Localization Platforms
| Platform | Features |
|----------|----------|
| **Crowdin** | Translation management |
| **Lokalise** | Translation platform |
| **Weblate** | Open-source |

### Quality Gates

```
□ All strings externalized
□ Context provided for translators
□ Pluralization handled
□ RTL layout tested
□ Cultural adaptation reviewed
```

### Cross-Category Dependencies
- **â†' Category 1-4** (Apps/Websites)  -  UI localization
- **â†' Category 56** (Compliance)  -  Regional compliance

---

# TIER 6: AUTOMATION & DEVOPS
## *Building, Deploying, and Orchestrating*

---

## Category 43: CI/CD Pipelines

### Scope
Continuous integration, continuous deployment, build automation, release management.

### Technology Stack  -  Exhaustive

#### CI/CD Platforms
| Platform | Best For |
|----------|----------|
| **GitHub Actions** | GitHub repos |
| **GitLab CI** | GitLab repos |
| **CircleCI** | Parallel builds |
| **Buildkite** | Scale |

#### Specialized Tools
| Tool | Purpose |
|------|---------|
| **Nx Cloud** | Monorepo CI |
| **Turborepo** | Monorepo builds |
| **Depot** | Fast Docker builds |
| **Dagger** | Programmable CI |

#### Release Management
| Tool | Purpose |
|------|---------|
| **Semantic Release** | Automated versioning |
| **Changesets** | Monorepo versioning |
| **GoReleaser** | Go releases |

### Quality Gates

```
□ All tests passing
□ Code coverage threshold met
□ Linting passed
□ Security scan clean
□ Build reproducible
□ Dependencies audited
□ Rollback tested
□ Notifications configured
```

### Cross-Category Dependencies
- **â†' Category 12-13** (Infrastructure)  -  Deployment targets
- **â†' Category 46** (Testing)  -  Test execution
- **â†' Category 53** (Secrets)  -  Credential management



### GitHub Integration Patterns

```
GITHUB INTEGRATION PATTERNS
===============================================================================

Comprehensive patterns for AI-native development workflows with GitHub.
Covers PR automation, issue management, Actions workflows, and MCP integration.

-------------------------------------------------------------------------------

GITHUB ACTIONS FOR AI WORKFLOWS
-------------------------------------------------------------------------------
```

#### AI-Assisted PR Review Workflow

```yaml
# .github/workflows/ai-pr-review.yml
name: AI PR Review

on:
  pull_request:
    types: [opened, synchronize, ready_for_review]

jobs:
  ai-review:
    runs-on: ubuntu-latest
    if: ${{ !github.event.pull_request.draft }}
    
    permissions:
      contents: read
      pull-requests: write
    
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0  # Full history for context
      
      - name: Get changed files
        id: changed
        run: |
          echo "files=$(git diff --name-only origin/${{ github.base_ref }}...HEAD | tr '\n' ' ')" >> $GITHUB_OUTPUT
      
      - name: AI Code Review
        uses: anthropics/claude-code-review@v1  # Example action
        with:
          anthropic-api-key: ${{ secrets.ANTHROPIC_API_KEY }}
          files: ${{ steps.changed.outputs.files }}
          review-scope: |
            - Security vulnerabilities
            - Performance issues
            - Code style consistency
            - Test coverage gaps
          max-comments: 10
          
      - name: Post Review Summary
        if: always()
        uses: actions/github-script@v7
        with:
          script: |
            const summary = require('./ai-review-summary.json');
            await github.rest.pulls.createReview({
              owner: context.repo.owner,
              repo: context.repo.repo,
              pull_number: context.issue.number,
              body: summary.overview,
              event: summary.issues.length > 0 ? 'REQUEST_CHANGES' : 'APPROVE',
              comments: summary.lineComments
            });
```

#### Automated Issue Triage

```yaml
# .github/workflows/ai-issue-triage.yml
name: AI Issue Triage

on:
  issues:
    types: [opened]

jobs:
  triage:
    runs-on: ubuntu-latest
    permissions:
      issues: write
    
    steps:
      - name: Analyze Issue
        id: analyze
        uses: anthropics/claude-issue-triage@v1
        with:
          anthropic-api-key: ${{ secrets.ANTHROPIC_API_KEY }}
          issue-body: ${{ github.event.issue.body }}
          issue-title: ${{ github.event.issue.title }}
          labels-config: |
            bug: "describes unexpected behavior or error"
            feature: "requests new functionality"
            documentation: "relates to docs improvements"
            question: "asks for help or clarification"
          
      - name: Apply Labels
        uses: actions/github-script@v7
        with:
          script: |
            const labels = JSON.parse('${{ steps.analyze.outputs.labels }}');
            await github.rest.issues.addLabels({
              owner: context.repo.owner,
              repo: context.repo.repo,
              issue_number: context.issue.number,
              labels: labels
            });
            
      - name: Assign Team
        if: steps.analyze.outputs.team
        uses: actions/github-script@v7
        with:
          script: |
            const team = '${{ steps.analyze.outputs.team }}';
            await github.rest.issues.addAssignees({
              owner: context.repo.owner,
              repo: context.repo.repo,
              issue_number: context.issue.number,
              assignees: [team]
            });
```

#### CI Pipeline with AI Test Generation

```yaml
# .github/workflows/ai-test-gen.yml
name: AI Test Generation

on:
  pull_request:
    paths:
      - 'src/**/*.ts'
      - 'src/**/*.tsx'

jobs:
  generate-tests:
    runs-on: ubuntu-latest
    permissions:
      contents: write
      pull-requests: write
    
    steps:
      - uses: actions/checkout@v4
        with:
          ref: ${{ github.head_ref }}
          
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          
      - name: Get Uncovered Files
        id: coverage
        run: |
          npm ci
          npm run test:coverage -- --json > coverage.json
          node scripts/find-uncovered.js > uncovered.txt
          echo "files=$(cat uncovered.txt | tr '\n' ' ')" >> $GITHUB_OUTPUT
          
      - name: Generate Tests
        if: steps.coverage.outputs.files != ''
        uses: anthropics/claude-test-gen@v1
        with:
          anthropic-api-key: ${{ secrets.ANTHROPIC_API_KEY }}
          files: ${{ steps.coverage.outputs.files }}
          test-framework: vitest
          output-dir: src/__tests__/generated
          
      - name: Commit Generated Tests
        run: |
          git config user.name "github-actions[bot]"
          git config user.email "github-actions[bot]@users.noreply.github.com"
          git add src/__tests__/generated
          git diff --staged --quiet || git commit -m "chore: add AI-generated tests"
          git push
```

```
-------------------------------------------------------------------------------

GITHUB API PATTERNS
-------------------------------------------------------------------------------
```

#### TypeScript GitHub Client

```typescript
import { Octokit } from '@octokit/rest';
import { createAppAuth } from '@octokit/auth-app';

// Initialize client (GitHub App recommended for production)
const octokit = new Octokit({
  authStrategy: createAppAuth,
  auth: {
    appId: process.env.GITHUB_APP_ID,
    privateKey: process.env.GITHUB_PRIVATE_KEY,
    installationId: process.env.GITHUB_INSTALLATION_ID,
  },
});

// PR Operations
async function createPRComment(
  owner: string,
  repo: string,
  prNumber: number,
  body: string,
  path?: string,
  line?: number
): Promise<void> {
  if (path && line) {
    // Line-specific comment
    const { data: pr } = await octokit.pulls.get({ owner, repo, pull_number: prNumber });
    await octokit.pulls.createReviewComment({
      owner,
      repo,
      pull_number: prNumber,
      body,
      path,
      line,
      commit_id: pr.head.sha,
    });
  } else {
    // General PR comment
    await octokit.issues.createComment({
      owner,
      repo,
      issue_number: prNumber,
      body,
    });
  }
}

// Get PR Diff for AI Analysis
async function getPRDiff(
  owner: string,
  repo: string,
  prNumber: number
): Promise<string> {
  const { data } = await octokit.pulls.get({
    owner,
    repo,
    pull_number: prNumber,
    mediaType: { format: 'diff' },
  });
  return data as unknown as string;
}

// Get File Content at Specific Ref
async function getFileContent(
  owner: string,
  repo: string,
  path: string,
  ref: string
): Promise<string> {
  const { data } = await octokit.repos.getContent({
    owner,
    repo,
    path,
    ref,
  });
  
  if ('content' in data) {
    return Buffer.from(data.content, 'base64').toString('utf-8');
  }
  throw new Error(`Path ${path} is not a file`);
}

// Create Branch and Commit
async function createBranchWithChanges(
  owner: string,
  repo: string,
  baseBranch: string,
  newBranch: string,
  changes: Array<{ path: string; content: string }>
): Promise<string> {
  // Get base branch SHA
  const { data: ref } = await octokit.git.getRef({
    owner,
    repo,
    ref: `heads/${baseBranch}`,
  });
  const baseSha = ref.object.sha;
  
  // Create new branch
  await octokit.git.createRef({
    owner,
    repo,
    ref: `refs/heads/${newBranch}`,
    sha: baseSha,
  });
  
  // Create blobs and tree
  const blobs = await Promise.all(
    changes.map(async ({ path, content }) => {
      const { data } = await octokit.git.createBlob({
        owner,
        repo,
        content: Buffer.from(content).toString('base64'),
        encoding: 'base64',
      });
      return { path, sha: data.sha, mode: '100644' as const, type: 'blob' as const };
    })
  );
  
  const { data: tree } = await octokit.git.createTree({
    owner,
    repo,
    base_tree: baseSha,
    tree: blobs,
  });
  
  // Create commit
  const { data: commit } = await octokit.git.createCommit({
    owner,
    repo,
    message: 'AI-generated changes',
    tree: tree.sha,
    parents: [baseSha],
  });
  
  // Update branch reference
  await octokit.git.updateRef({
    owner,
    repo,
    ref: `heads/${newBranch}`,
    sha: commit.sha,
  });
  
  return commit.sha;
}
```

```
-------------------------------------------------------------------------------

MCP GITHUB SERVER INTEGRATION
-------------------------------------------------------------------------------

GitHub MCP Server enables AI agents to interact with repositories natively.
```

#### MCP Server Configuration

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "${GITHUB_TOKEN}"
      }
    }
  }
}
```

#### Available MCP Tools

| Tool | Description | Parameters |
|------|-------------|------------|
| `create_or_update_file` | Create/update file in repo | `owner`, `repo`, `path`, `content`, `message`, `branch` |
| `search_repositories` | Search GitHub repos | `query`, `page`, `perPage` |
| `create_repository` | Create new repo | `name`, `description`, `private` |
| `get_file_contents` | Read file from repo | `owner`, `repo`, `path`, `branch` |
| `push_files` | Push multiple files | `owner`, `repo`, `branch`, `files`, `message` |
| `create_issue` | Create issue | `owner`, `repo`, `title`, `body`, `labels` |
| `create_pull_request` | Create PR | `owner`, `repo`, `title`, `body`, `head`, `base` |
| `fork_repository` | Fork a repo | `owner`, `repo` |
| `create_branch` | Create branch | `owner`, `repo`, `branch`, `from_branch` |
| `list_commits` | List commits | `owner`, `repo`, `sha`, `page`, `perPage` |
| `list_issues` | List issues | `owner`, `repo`, `state`, `labels`, `page` |
| `update_issue` | Update issue | `owner`, `repo`, `issue_number`, `title`, `body`, `state` |
| `add_issue_comment` | Comment on issue | `owner`, `repo`, `issue_number`, `body` |
| `search_code` | Search code | `query`, `page`, `perPage` |
| `search_issues` | Search issues/PRs | `query`, `page`, `perPage` |
| `search_users` | Search users | `query`, `page`, `perPage` |

#### Agent GitHub Workflow Example

```typescript
// AI agent workflow using MCP GitHub tools
async function handleUserRequest(request: string): Promise<void> {
  const agent = new Agent({
    model: 'claude-sonnet-4-20250514',
    mcpServers: ['github'],
  });
  
  // Example: "Create a PR to fix the typo in README.md"
  const response = await agent.run(`
    User request: ${request}
    
    Available GitHub tools:
    - get_file_contents: Read files
    - create_branch: Create feature branch
    - push_files: Commit changes
    - create_pull_request: Open PR
    
    Execute the necessary steps to fulfill this request.
  `);
  
  // Agent will autonomously:
  // 1. Read README.md to find typo
  // 2. Create branch 'fix/readme-typo'
  // 3. Push corrected file
  // 4. Create PR with description
}
```

```
-------------------------------------------------------------------------------

GITHUB WEBHOOKS FOR AI TRIGGERS
-------------------------------------------------------------------------------
```

#### Webhook Handler (Node.js)

```typescript
import express from 'express';
import crypto from 'crypto';
import { Anthropic } from '@anthropic-ai/sdk';

const app = express();
const anthropic = new Anthropic();

// Verify webhook signature
function verifySignature(payload: string, signature: string): boolean {
  const expected = `sha256=${crypto
    .createHmac('sha256', process.env.GITHUB_WEBHOOK_SECRET!)
    .update(payload)
    .digest('hex')}`;
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
}

app.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const signature = req.headers['x-hub-signature-256'] as string;
  
  if (!verifySignature(req.body.toString(), signature)) {
    return res.status(401).send('Invalid signature');
  }
  
  const event = req.headers['x-github-event'] as string;
  const payload = JSON.parse(req.body.toString());
  
  switch (event) {
    case 'pull_request':
      if (payload.action === 'opened') {
        await handleNewPR(payload);
      }
      break;
      
    case 'issues':
      if (payload.action === 'opened') {
        await handleNewIssue(payload);
      }
      break;
      
    case 'issue_comment':
      if (payload.comment.body.startsWith('@ai-bot')) {
        await handleBotMention(payload);
      }
      break;
  }
  
  res.status(200).send('OK');
});

async function handleNewPR(payload: any): Promise<void> {
  const { pull_request, repository } = payload;
  
  // Get PR diff for context
  const diff = await getPRDiff(
    repository.owner.login,
    repository.name,
    pull_request.number
  );
  
  // AI review
  const review = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 2000,
    messages: [{
      role: 'user',
      content: `Review this PR:\n\nTitle: ${pull_request.title}\n\nDescription: ${pull_request.body}\n\nDiff:\n${diff}`
    }],
  });
  
  // Post review comment
  await createPRComment(
    repository.owner.login,
    repository.name,
    pull_request.number,
    review.content[0].text
  );
}
```

```
-------------------------------------------------------------------------------

QUALITY GATES FOR GITHUB INTEGRATION
-------------------------------------------------------------------------------

[ ] GitHub App used for production (not PAT)
[ ] Webhook signatures verified
[ ] Rate limits handled with backoff
[ ] Sensitive data not logged
[ ] PR comments are actionable, not noisy
[ ] Bot actions clearly labeled
[ ] Error handling for API failures
[ ] Audit trail for AI-generated changes
```

---

## Category 44: Workflow Orchestration

### Scope
DAG orchestration, multi-step pipelines, human-in-loop workflows.

### Technology Stack  -  Exhaustive

#### Workflow Engines
| Engine | Best For |
|--------|----------|
| **Temporal** | Durable execution |
| **Apache Airflow** | Data pipelines |
| **Dagster** | Data orchestration |
| **Prefect** | Modern orchestration |
| **Inngest** | Serverless workflows |
| **Trigger.dev** | Background jobs |
| **n8n** | Visual automation |

#### Automation Platforms
| Platform | Focus |
|----------|-------|
| **Zapier** | No-code automation |
| **Make** | Visual automation |
| **Pipedream** | Developer-first |

### Quality Gates

```
□ Idempotency implemented
□ Retry logic configured
□ Timeouts set
□ Error handling comprehensive
□ State persistence reliable
□ Monitoring enabled
□ Audit logging complete
```

### Cross-Category Dependencies
- **â†' Category 10** (Serverless)  -  Task execution
- **â†' Category 23** (Queues)  -  Event triggers
- **â†' Category 55** (Monitoring)  -  Workflow monitoring

---
## Category 44A: Kanban & Visual Task Management

### Scope
Visual task management as the collaboration contract between humans and AI agents.

### The Three-Layer Architecture

```
â"Œâ"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"
â"'     BUSINESS LAYER (Kanban/PM)                  â"'
â"'     Linear, Notion, Jira, GitHub Projects       â"'
â"œâ"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"¤
â"'     ORCHESTRATION LAYER (Workflow)              â"'
â"'     Temporal, Inngest, Trigger.dev              â"'
â"œâ"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"¤
â"'     AGENT EXECUTION LAYER                       â"'
â"'     Claude, GPT-4, Custom Agents                â"'
â""â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"˜
```

### Technology Stack

#### Kanban Platforms with AI Integration
| Tool | MCP Support | Best For |
|------|-------------|----------|
| **Linear** | âœ... Official | Dev teams, AI-native |
| **Notion** | âœ... Official | Flexible databases |
| **GitHub Projects** | Via Actions | Code-centric |
| **Jira** | Atlassian MCP | Enterprise |

#### HITL Workflow Engines
| Engine | HITL Feature |
|--------|--------------|
| **Trigger.dev** | Waitpoint Tokens |
| **LangGraph** | interrupt() primitive |
| **Inngest** | waitForEvent() |

### Core Primitives

```typescript
interface KanbanTaskContract {
  id: string;
  title: string;
  assignee: "human" | "agent" | string;
  status: "todo" | "in_progress" | "review" | "done";
  confidence?: number;
}

interface AgentComment {
  type: "progress" | "question" | "approval_request";
  content: string;
  confidence: number;
}
```

### Confidence-Based Routing

| Confidence | Action | Kanban Update |
|------------|--------|---------------|
| ≥ 0.85 | Auto-execute | Move to "Done" |
| 0.65-0.84 | Execute + review | Add "Needs Review" |
| 0.40-0.64 | Pause for approval | Move to "Blocked" |
| < 0.40 | Escalate to human | Assign to human |



### Board Data Model

```typescript
interface KanbanBoard {
  id: string;
  name: string;
  columns: KanbanColumn[];
  swimlanes: Swimlane[];
  settings: BoardSettings;
  metadata: BoardMetadata;
}

interface KanbanColumn {
  id: string;
  name: string;
  position: number;
  wipLimit?: number;           // Work-in-progress limit
  automations: ColumnAutomation[];
  acceptsCriteria?: string[];  // Card types this column accepts
}

interface KanbanCard {
  id: string;
  title: string;
  description: string;
  columnId: string;
  swimlaneId?: string;
  position: number;            // Position within column
  
  // Assignment
  assignee: CardAssignee;
  watchers: string[];
  
  // Classification
  labels: string[];
  priority: 'critical' | 'high' | 'medium' | 'low';
  estimate?: number;           // Story points or hours
  
  // AI-specific
  confidence?: number;         // Agent's confidence (0-1)
  agentContext?: AgentContext; // Preserved context for agent handoff
  
  // Tracking
  createdAt: Date;
  updatedAt: Date;
  dueDate?: Date;
  blockedBy?: string[];        // IDs of blocking cards
  
  // Activity
  comments: CardComment[];
  history: CardHistoryEntry[];
}

type CardAssignee = 
  | { type: 'human'; userId: string }
  | { type: 'agent'; agentId: string; model?: string }
  | { type: 'unassigned' };

interface Swimlane {
  id: string;
  name: string;
  position: number;
  type: 'human' | 'agent' | 'mixed' | 'custom';
  filter?: CardFilter;         // Auto-sort cards into swimlane
}

interface BoardSettings {
  wipLimitEnforcement: 'strict' | 'warning' | 'none';
  autoArchiveDays?: number;
  defaultAssignee?: CardAssignee;
  confidenceThresholds: ConfidenceThresholds;
}

interface ConfidenceThresholds {
  autoComplete: number;        // ≥ this: auto-move to Done
  needsReview: number;         // ≥ this: add review flag
  humanEscalation: number;     // < this: escalate to human
}
```

### Card Lifecycle & State Transitions

```
CARD STATE MACHINE
===============================================================================

+-----------------------------------------------------------------------------+
|                         CARD LIFECYCLE                                      |
+-----------------------------------------------------------------------------+
|                                                                             |
|  +----------+    +----------+    +----------+    +----------+             |
|  |  BACKLOG |---â–¶|   TODO   |---â–¶|IN PROGRESS|---â–¶|  REVIEW  |             |
|  +----------+    +----------+    +----------+    +----------+             |
|       |              |                |               |                    |
|       |              |                |               |                    |
|       |              |                v               v                    |
|       |              |          +----------+    +----------+              |
|       |              |          |  BLOCKED |    |   DONE   |              |
|       |              |          +----------+    +----------+              |
|       |              |                |               |                    |
|       |              |                |               v                    |
|       |              |                |          +----------+              |
|       +--------------+----------------+---------â–¶| ARCHIVED |              |
|                                                   +----------+              |
|                                                                             |
|  AGENT-SPECIFIC TRANSITIONS:                                                |
|  -----------------------------                                              |
|  * confidence ≥ 0.85 -> Auto: IN_PROGRESS -> DONE                            |
|  * confidence 0.65-0.84 -> Auto: IN_PROGRESS -> REVIEW                       |
|  * confidence < 0.65 -> Auto: IN_PROGRESS -> BLOCKED (needs human)           |
|  * agent question -> Add WAITING_FOR_INPUT flag                              |
|                                                                             |
+-----------------------------------------------------------------------------+
```

```typescript
type CardStatus = 
  | 'backlog'
  | 'todo'
  | 'in_progress'
  | 'blocked'
  | 'review'
  | 'done'
  | 'archived';

interface CardTransition {
  from: CardStatus;
  to: CardStatus;
  trigger: TransitionTrigger;
  conditions?: TransitionCondition[];
  actions?: TransitionAction[];
}

type TransitionTrigger =
  | { type: 'manual'; userId: string }
  | { type: 'agent'; agentId: string; confidence: number }
  | { type: 'automation'; ruleId: string }
  | { type: 'schedule'; scheduledAt: Date };

const standardTransitions: CardTransition[] = [
  // Human triggers
  { from: 'backlog', to: 'todo', trigger: { type: 'manual', userId: '*' } },
  { from: 'todo', to: 'in_progress', trigger: { type: 'manual', userId: '*' } },
  { from: 'in_progress', to: 'review', trigger: { type: 'manual', userId: '*' } },
  { from: 'review', to: 'done', trigger: { type: 'manual', userId: '*' } },
  
  // Agent high-confidence auto-complete
  {
    from: 'in_progress',
    to: 'done',
    trigger: { type: 'agent', agentId: '*', confidence: 0.85 },
    conditions: [{ type: 'confidence_gte', value: 0.85 }],
    actions: [{ type: 'add_label', label: 'auto-completed' }],
  },
  
  // Agent medium-confidence needs review
  {
    from: 'in_progress',
    to: 'review',
    trigger: { type: 'agent', agentId: '*', confidence: 0.70 },
    conditions: [
      { type: 'confidence_gte', value: 0.65 },
      { type: 'confidence_lt', value: 0.85 },
    ],
    actions: [{ type: 'add_label', label: 'needs-review' }],
  },
  
  // Agent low-confidence escalation
  {
    from: 'in_progress',
    to: 'blocked',
    trigger: { type: 'agent', agentId: '*', confidence: 0.30 },
    conditions: [{ type: 'confidence_lt', value: 0.65 }],
    actions: [
      { type: 'add_label', label: 'needs-human' },
      { type: 'notify', targets: ['assignee', 'watchers'] },
    ],
  },
];

async function transitionCard(
  card: KanbanCard,
  to: CardStatus,
  trigger: TransitionTrigger
): Promise<KanbanCard> {
  const transition = findValidTransition(card.status, to, trigger);
  
  if (!transition) {
    throw new Error(`Invalid transition: ${card.status} -> ${to}`);
  }
  
  // Check conditions
  for (const condition of transition.conditions ?? []) {
    if (!evaluateCondition(card, condition)) {
      throw new Error(`Condition not met: ${condition.type}`);
    }
  }
  
  // Execute actions
  for (const action of transition.actions ?? []) {
    await executeAction(card, action);
  }
  
  // Update card
  const updated = {
    ...card,
    status: to,
    updatedAt: new Date(),
    history: [
      ...card.history,
      {
        type: 'status_change',
        from: card.status,
        to,
        trigger,
        timestamp: new Date(),
      },
    ],
  };
  
  return updated;
}
```

### WIP Limits Enforcement

```typescript
interface WipLimitConfig {
  column: string;
  limit: number;
  enforcement: 'strict' | 'warning' | 'none';
  excludeLabels?: string[];    // Cards with these labels don't count
  perAssignee?: boolean;       // Limit per person vs total
}

class WipLimitEnforcer {
  constructor(private board: KanbanBoard) {}
  
  canAddCard(columnId: string, card: KanbanCard): WipCheckResult {
    const column = this.board.columns.find(c => c.id === columnId);
    if (!column?.wipLimit) {
      return { allowed: true };
    }
    
    const currentCount = this.countCardsInColumn(columnId, card);
    
    if (currentCount >= column.wipLimit) {
      const enforcement = this.board.settings.wipLimitEnforcement;
      
      switch (enforcement) {
        case 'strict':
          return {
            allowed: false,
            reason: `WIP limit reached (${currentCount}/${column.wipLimit})`,
            suggestions: this.getSuggestions(column),
          };
          
        case 'warning':
          return {
            allowed: true,
            warning: `WIP limit exceeded (${currentCount}/${column.wipLimit})`,
          };
          
        case 'none':
        default:
          return { allowed: true };
      }
    }
    
    return { allowed: true };
  }
  
  private countCardsInColumn(columnId: string, excludeCard?: KanbanCard): number {
    return this.board.cards.filter(c => 
      c.columnId === columnId && 
      c.id !== excludeCard?.id &&
      !this.isExcluded(c)
    ).length;
  }
  
  private getSuggestions(column: KanbanColumn): string[] {
    const suggestions: string[] = [];
    
    // Find oldest card
    const oldestCard = this.getOldestCard(column.id);
    if (oldestCard) {
      suggestions.push(`Complete or move: "${oldestCard.title}"`);
    }
    
    // Find blocked cards
    const blockedCards = this.getBlockedCards(column.id);
    if (blockedCards.length > 0) {
      suggestions.push(`Unblock ${blockedCards.length} card(s) first`);
    }
    
    return suggestions;
  }
}
```

### Swimlanes for Agent vs Human Work

```typescript
const defaultSwimlanes: Swimlane[] = [
  {
    id: 'agent-autonomous',
    name: '🤖 Agent (Autonomous)',
    position: 0,
    type: 'agent',
    filter: {
      assignee: { type: 'agent' },
      confidence: { gte: 0.85 },
    },
  },
  {
    id: 'agent-supervised',
    name: '🤖👤 Agent (Supervised)',
    position: 1,
    type: 'mixed',
    filter: {
      assignee: { type: 'agent' },
      confidence: { lt: 0.85 },
    },
  },
  {
    id: 'human',
    name: '👤 Human',
    position: 2,
    type: 'human',
    filter: {
      assignee: { type: 'human' },
    },
  },
  {
    id: 'unassigned',
    name: '📋 Unassigned',
    position: 3,
    type: 'custom',
    filter: {
      assignee: { type: 'unassigned' },
    },
  },
];

function assignCardToSwimlane(
  card: KanbanCard,
  swimlanes: Swimlane[]
): string {
  for (const swimlane of swimlanes.sort((a, b) => a.position - b.position)) {
    if (swimlane.filter && matchesFilter(card, swimlane.filter)) {
      return swimlane.id;
    }
  }
  
  // Default to last swimlane
  return swimlanes[swimlanes.length - 1].id;
}

// Visual representation
function renderBoardWithSwimlanes(board: KanbanBoard): string {
  let output = '';
  
  for (const swimlane of board.swimlanes) {
    output += `\n${'='.repeat(80)}\n`;
    output += `${swimlane.name}\n`;
    output += `${'-'.repeat(80)}\n`;
    
    // Render columns for this swimlane
    const swimlaneCards = board.cards.filter(c => c.swimlaneId === swimlane.id);
    
    for (const column of board.columns) {
      const columnCards = swimlaneCards.filter(c => c.columnId === column.id);
      const wipStatus = column.wipLimit 
        ? `(${columnCards.length}/${column.wipLimit})`
        : '';
      
      output += `\n[${column.name}] ${wipStatus}\n`;
      
      for (const card of columnCards) {
        const confidence = card.confidence 
          ? ` [${(card.confidence * 100).toFixed(0)}%]`
          : '';
        output += `  * ${card.title}${confidence}\n`;
      }
    }
  }
  
  return output;
}
```

### AI-Assisted Prioritization

```typescript
interface PrioritizationFactors {
  urgency: number;             // Time-based urgency (0-1)
  impact: number;              // Business impact (0-1)
  effort: number;              // Estimated effort (0-1, lower = easier)
  dependencies: number;        // Blocking other work (0-1)
  agentSuitability: number;    // How well AI can handle (0-1)
}

async function aiPrioritizeBacklog(
  cards: KanbanCard[],
  context: ProjectContext
): Promise<KanbanCard[]> {
  // Get AI assessment of each card
  const assessments = await Promise.all(
    cards.map(card => assessCard(card, context))
  );
  
  // Calculate priority score
  const scored = cards.map((card, i) => ({
    card,
    score: calculatePriorityScore(assessments[i]),
    factors: assessments[i],
  }));
  
  // Sort by score (highest first)
  scored.sort((a, b) => b.score - a.score);
  
  // Update positions
  return scored.map((item, index) => ({
    ...item.card,
    position: index,
    metadata: {
      ...item.card.metadata,
      priorityFactors: item.factors,
      priorityScore: item.score,
    },
  }));
}

function calculatePriorityScore(factors: PrioritizationFactors): number {
  // Weighted scoring formula
  const weights = {
    urgency: 0.25,
    impact: 0.30,
    effort: 0.15,           // Inverted: easier = higher priority
    dependencies: 0.20,
    agentSuitability: 0.10,
  };
  
  return (
    factors.urgency * weights.urgency +
    factors.impact * weights.impact +
    (1 - factors.effort) * weights.effort +
    factors.dependencies * weights.dependencies +
    factors.agentSuitability * weights.agentSuitability
  );
}

async function assessCard(
  card: KanbanCard,
  context: ProjectContext
): Promise<PrioritizationFactors> {
  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 500,
    messages: [{
      role: 'user',
      content: `Assess this task for prioritization:

Title: ${card.title}
Description: ${card.description}
Labels: ${card.labels.join(', ')}
Due: ${card.dueDate || 'None'}

Project context: ${context.summary}

Rate each factor 0-1:
- urgency: How time-sensitive?
- impact: Business value if completed?
- effort: Complexity/time required?
- dependencies: Does this block other work?
- agentSuitability: Can AI handle autonomously?

Respond in JSON format.`,
    }],
  });
  
  return JSON.parse(response.content[0].text);
}
```

### MCP Integration Patterns

```typescript
// Linear MCP Integration
interface LinearMCPTools {
  'linear_create_issue': {
    params: { title: string; description?: string; teamId: string; priority?: number };
    result: { id: string; identifier: string; url: string };
  };
  'linear_update_issue': {
    params: { issueId: string; title?: string; stateId?: string; assigneeId?: string };
    result: { success: boolean };
  };
  'linear_search_issues': {
    params: { query: string; limit?: number };
    result: { issues: Array<{ id: string; title: string; state: string }> };
  };
  'linear_get_teams': {
    params: {};
    result: { teams: Array<{ id: string; name: string; key: string }> };
  };
}

// Agent-Kanban sync workflow
async function syncAgentWorkToKanban(
  agentId: string,
  work: AgentWorkResult
): Promise<void> {
  const mcp = getMCPClient('linear');
  
  // Find or create issue for this work
  let issue = await findIssueForWork(work);
  
  if (!issue) {
    // Create new issue
    const result = await mcp.call('linear_create_issue', {
      title: work.taskTitle,
      description: formatAgentDescription(work),
      teamId: work.teamId,
      priority: confidenceToPriority(work.confidence),
    });
    issue = result;
  }
  
  // Update based on confidence
  if (work.confidence >= 0.85) {
    // Auto-complete
    await mcp.call('linear_update_issue', {
      issueId: issue.id,
      stateId: 'done',
    });
    
    await mcp.call('linear_create_comment', {
      issueId: issue.id,
      body: `✅ Completed by AI agent (confidence: ${(work.confidence * 100).toFixed(0)}%)\n\n${work.summary}`,
    });
  } else if (work.confidence >= 0.65) {
    // Needs review
    await mcp.call('linear_update_issue', {
      issueId: issue.id,
      stateId: 'in_review',
    });
    
    await mcp.call('linear_create_comment', {
      issueId: issue.id,
      body: `👀 Ready for review (confidence: ${(work.confidence * 100).toFixed(0)}%)\n\n${work.summary}\n\n**Please verify:**\n${work.reviewPoints.map(p => `- ${p}`).join('\n')}`,
    });
  } else {
    // Blocked - needs human
    await mcp.call('linear_update_issue', {
      issueId: issue.id,
      stateId: 'blocked',
      assigneeId: work.escalateToUserId,
    });
    
    await mcp.call('linear_create_comment', {
      issueId: issue.id,
      body: `⚠️ Needs human input (confidence: ${(work.confidence * 100).toFixed(0)}%)\n\n**Issue:**\n${work.blockerReason}\n\n**Questions:**\n${work.questions.map(q => `- ${q}`).join('\n')}`,
    });
  }
}

function confidenceToPriority(confidence: number): number {
  // Linear priorities: 0=none, 1=urgent, 2=high, 3=medium, 4=low
  if (confidence >= 0.85) return 4;      // Low priority (auto-handled)
  if (confidence >= 0.65) return 3;      // Medium (needs review)
  if (confidence >= 0.40) return 2;      // High (needs attention)
  return 1;                              // Urgent (needs human now)
}
```

### Quality Gates

```
[ ] Kanban board connected via MCP/API
[ ] Confidence thresholds configured
[ ] Agent comment patterns documented
[ ] Approval timeouts with fallbacks
[ ] Escalation paths defined
[ ] WIP limits enforced per column
[ ] Swimlanes separate agent vs human work
[ ] Card lifecycle transitions validated
[ ] AI prioritization factors weighted appropriately
[ ] Sync between agent work and board is real-time
```

### Cross-Category Dependencies
- **-> Category 44** (Workflow)  -  Orchestration layer
- **-> Category 30** (Agents)  -  Agent execution
- **-> Category 55** (Monitoring)  -  Status tracking
- **-> NS Part III §20-21**  -  Agent orchestration patterns

---

---

## Category 44B: PromptOps

### Scope
Prompt versioning, A/B testing, optimization, and deployment management.

### Technology Stack

#### Prompt Management Platforms
| Tool | Versioning | A/B Test | Optimization | Self-Host |
|------|------------|----------|--------------|-----------|
| **Langfuse** | âœ... | âœ... | Manual | âœ... |
| **PromptLayer** | âœ... | âœ... | Manual | ❌ |
| **Agenta** | âœ... | âœ... | âœ... | âœ... |
| **DSPy** | Code-based | Via evals | âœ... Auto | âœ... |



### Git-Like Prompt Version Control

```
PROMPT VERSION CONTROL MODEL
===============================================================================

Treat prompts as code: version control, branching, code review, and CI/CD.

-------------------------------------------------------------------------------

VERSION CONTROL ARCHITECTURE
-------------------------------------------------------------------------------

+-----------------------------------------------------------------------------+
|                    PROMPT VERSION CONTROL                                   |
+-----------------------------------------------------------------------------+
|                                                                             |
|  Repository Structure                      Branch Strategy                  |
|  --------------------                      ---------------                  |
|                                                                             |
|  prompts/                                  main ------------------â–¶ prod   |
|  +-- summarization/                             |                          |
|  |   +-- prompt.yaml                            +-- staging ----â–¶ staging  |
|  |   +-- variants/                              |                          |
|  |   |   +-- concise.yaml                       +-- feature/new-tone       |
|  |   |   +-- detailed.yaml                                                  |
|  |   +-- tests/                                                             |
|  |       +-- eval.yaml                                                      |
|  +-- extraction/                                                            |
|  |   +-- prompt.yaml                                                        |
|  +-- _shared/                                                               |
|      +-- personas.yaml                                                      |
|                                                                             |
+-----------------------------------------------------------------------------+
```

```typescript
// Prompt definition schema
interface PromptVersion {
  id: string;
  name: string;
  version: number;
  content: string;
  
  // Metadata
  author: string;
  createdAt: Date;
  description: string;
  changelog: string;
  
  // Configuration
  model: string;
  temperature: number;
  maxTokens: number;
  stopSequences?: string[];
  
  // Variables
  variables: PromptVariable[];
  
  // Lineage
  parentVersion?: number;
  branchName?: string;
  
  // Labels (like git tags)
  labels: string[];  // e.g., ['production', 'reviewed']
}

interface PromptVariable {
  name: string;
  type: 'string' | 'number' | 'boolean' | 'array' | 'object';
  required: boolean;
  default?: any;
  description: string;
  validation?: string;  // Regex or JSON Schema
}

// YAML format for file storage
const promptYaml = `
name: summarization
version: 4
model: claude-sonnet-4-20250514
temperature: 0.3
max_tokens: 1000

variables:
  - name: document
    type: string
    required: true
    description: The document to summarize
  - name: max_length
    type: number
    required: false
    default: 200
    description: Maximum summary length in words

content: |
  You are a professional summarizer. Create a concise summary of the 
  following document in {{max_length}} words or less.
  
  Focus on:
  - Key findings and conclusions
  - Important data points
  - Action items if any
  
  Document:
  {{document}}
  
  Summary:

labels:
  - production
  - reviewed

changelog: |
  v4: Added max_length variable, improved focus instructions
  v3: Switched to claude-sonnet-4-20250514
  v2: Added action items focus
  v1: Initial version
`;
```

### Diff & Merge Strategies

```typescript
interface PromptDiff {
  version1: number;
  version2: number;
  changes: DiffChange[];
  summary: string;
}

interface DiffChange {
  type: 'added' | 'removed' | 'modified';
  field: string;
  oldValue?: any;
  newValue?: any;
  lineNumbers?: { start: number; end: number };
}

class PromptDiffer {
  diff(v1: PromptVersion, v2: PromptVersion): PromptDiff {
    const changes: DiffChange[] = [];
    
    // Compare content with line-level diff
    if (v1.content !== v2.content) {
      const contentDiff = this.diffLines(v1.content, v2.content);
      changes.push({
        type: 'modified',
        field: 'content',
        oldValue: v1.content,
        newValue: v2.content,
        ...contentDiff,
      });
    }
    
    // Compare config
    if (v1.model !== v2.model) {
      changes.push({
        type: 'modified',
        field: 'model',
        oldValue: v1.model,
        newValue: v2.model,
      });
    }
    
    if (v1.temperature !== v2.temperature) {
      changes.push({
        type: 'modified',
        field: 'temperature',
        oldValue: v1.temperature,
        newValue: v2.temperature,
      });
    }
    
    // Compare variables
    const varChanges = this.diffVariables(v1.variables, v2.variables);
    changes.push(...varChanges);
    
    return {
      version1: v1.version,
      version2: v2.version,
      changes,
      summary: this.summarizeChanges(changes),
    };
  }
  
  private diffLines(text1: string, text2: string): { hunks: DiffHunk[] } {
    // Use diff algorithm (Myers, patience, etc.)
    const lines1 = text1.split('\n');
    const lines2 = text2.split('\n');
    
    // Implementation using diff library
    return { hunks: computeDiff(lines1, lines2) };
  }
  
  private summarizeChanges(changes: DiffChange[]): string {
    const contentChange = changes.find(c => c.field === 'content');
    const configChanges = changes.filter(c => 
      ['model', 'temperature', 'maxTokens'].includes(c.field)
    );
    const varChanges = changes.filter(c => c.field.startsWith('variable'));
    
    const parts: string[] = [];
    
    if (contentChange) {
      parts.push('prompt content modified');
    }
    if (configChanges.length > 0) {
      parts.push(`${configChanges.length} config change(s)`);
    }
    if (varChanges.length > 0) {
      parts.push(`${varChanges.length} variable change(s)`);
    }
    
    return parts.join(', ') || 'no changes';
  }
}

// Merge conflicts handling
interface MergeResult {
  success: boolean;
  merged?: PromptVersion;
  conflicts?: MergeConflict[];
}

interface MergeConflict {
  field: string;
  base: any;
  ours: any;
  theirs: any;
  resolution?: 'ours' | 'theirs' | 'manual';
}

async function mergePromptVersions(
  base: PromptVersion,
  ours: PromptVersion,
  theirs: PromptVersion
): Promise<MergeResult> {
  const conflicts: MergeConflict[] = [];
  const merged: Partial<PromptVersion> = { ...base };
  
  // Three-way merge for each field
  for (const field of ['content', 'model', 'temperature', 'maxTokens'] as const) {
    if (ours[field] !== base[field] && theirs[field] !== base[field]) {
      if (ours[field] !== theirs[field]) {
        // Conflict!
        conflicts.push({
          field,
          base: base[field],
          ours: ours[field],
          theirs: theirs[field],
        });
      } else {
        // Same change in both - auto-merge
        merged[field] = ours[field];
      }
    } else if (ours[field] !== base[field]) {
      merged[field] = ours[field];
    } else if (theirs[field] !== base[field]) {
      merged[field] = theirs[field];
    }
  }
  
  if (conflicts.length > 0) {
    return { success: false, conflicts };
  }
  
  return {
    success: true,
    merged: {
      ...merged,
      version: Math.max(ours.version, theirs.version) + 1,
      parentVersion: base.version,
    } as PromptVersion,
  };
}
```

### A/B Testing Framework

```typescript
interface ABTest {
  id: string;
  name: string;
  status: 'draft' | 'running' | 'paused' | 'completed';
  
  // Variants
  control: PromptVariant;
  treatment: PromptVariant[];
  
  // Traffic allocation
  allocation: TrafficAllocation;
  
  // Success metrics
  metrics: ABMetric[];
  
  // Configuration
  minSampleSize: number;
  maxDuration: number;  // Hours
  confidenceLevel: number;  // e.g., 0.95
  
  // Results
  results?: ABTestResults;
}

interface PromptVariant {
  id: string;
  name: string;
  promptVersion: number;
  weight: number;  // Traffic percentage (0-100)
}

interface TrafficAllocation {
  type: 'percentage' | 'user_segment' | 'feature_flag';
  config: Record<string, any>;
}

interface ABMetric {
  name: string;
  type: 'latency' | 'cost' | 'quality' | 'custom';
  direction: 'lower_better' | 'higher_better';
  evaluator?: string;  // For quality metrics
}

class ABTestRunner {
  async selectVariant(
    test: ABTest,
    context: { userId: string; sessionId: string }
  ): Promise<PromptVariant> {
    // Consistent hashing for user stickiness
    const hash = this.hashContext(context, test.id);
    const bucket = hash % 100;
    
    let cumulative = 0;
    for (const variant of [test.control, ...test.treatment]) {
      cumulative += variant.weight;
      if (bucket < cumulative) {
        return variant;
      }
    }
    
    return test.control;  // Fallback
  }
  
  async recordMetric(
    test: ABTest,
    variant: PromptVariant,
    metric: string,
    value: number
  ): Promise<void> {
    await this.metricsStore.record({
      testId: test.id,
      variantId: variant.id,
      metric,
      value,
      timestamp: new Date(),
    });
    
    // Check for statistical significance
    if (await this.hasSignificantResults(test)) {
      await this.notifySignificance(test);
    }
  }
  
  async analyzeResults(test: ABTest): Promise<ABTestResults> {
    const results: ABTestResults = {
      testId: test.id,
      variants: [],
      winner: null,
      confidence: 0,
    };
    
    for (const variant of [test.control, ...test.treatment]) {
      const metrics = await this.metricsStore.getMetrics(test.id, variant.id);
      
      results.variants.push({
        variantId: variant.id,
        sampleSize: metrics.length,
        metrics: this.aggregateMetrics(metrics, test.metrics),
      });
    }
    
    // Statistical significance testing
    const significance = this.calculateSignificance(
      results.variants,
      test.confidenceLevel
    );
    
    if (significance.significant) {
      results.winner = significance.winner;
      results.confidence = significance.confidence;
    }
    
    return results;
  }
}

// Usage in production
async function executePromptWithABTest(
  promptName: string,
  variables: Record<string, any>,
  context: { userId: string }
): Promise<string> {
  const activeTest = await getActiveABTest(promptName);
  
  let promptVersion: number;
  let variantId: string;
  
  if (activeTest) {
    const variant = await abTestRunner.selectVariant(activeTest, context);
    promptVersion = variant.promptVersion;
    variantId = variant.id;
  } else {
    promptVersion = await getProductionVersion(promptName);
    variantId = 'production';
  }
  
  const prompt = await loadPrompt(promptName, promptVersion);
  const startTime = Date.now();
  
  const result = await llm.complete({
    prompt: renderPrompt(prompt, variables),
    model: prompt.model,
    temperature: prompt.temperature,
  });
  
  // Record metrics
  if (activeTest) {
    await abTestRunner.recordMetric(activeTest, { id: variantId }, 'latency', Date.now() - startTime);
    await abTestRunner.recordMetric(activeTest, { id: variantId }, 'tokens', result.usage.totalTokens);
  }
  
  return result.content;
}
```

### Rollback Mechanisms

```typescript
interface RollbackConfig {
  promptName: string;
  fromVersion: number;
  toVersion: number;
  reason: string;
  rollbackType: 'instant' | 'gradual' | 'canary';
}

class PromptRollbackManager {
  async rollback(config: RollbackConfig): Promise<RollbackResult> {
    // Validate target version exists and is healthy
    const targetPrompt = await this.loadPrompt(config.promptName, config.toVersion);
    if (!targetPrompt) {
      throw new Error(`Version ${config.toVersion} not found`);
    }
    
    switch (config.rollbackType) {
      case 'instant':
        return this.instantRollback(config);
      case 'gradual':
        return this.gradualRollback(config);
      case 'canary':
        return this.canaryRollback(config);
    }
  }
  
  private async instantRollback(config: RollbackConfig): Promise<RollbackResult> {
    // Swap production label immediately
    await this.updateLabel(config.promptName, 'production', config.toVersion);
    
    // Log rollback event
    await this.logRollback({
      ...config,
      completedAt: new Date(),
      duration: 0,
    });
    
    return {
      success: true,
      type: 'instant',
      previousVersion: config.fromVersion,
      currentVersion: config.toVersion,
    };
  }
  
  private async gradualRollback(config: RollbackConfig): Promise<RollbackResult> {
    // Create temporary A/B test for gradual rollback
    const rollbackTest: ABTest = {
      id: `rollback-${config.promptName}-${Date.now()}`,
      name: `Rollback: ${config.promptName}`,
      status: 'running',
      control: {
        id: 'current',
        name: 'Current (Rolling Back)',
        promptVersion: config.fromVersion,
        weight: 90,  // Start with 90% current
      },
      treatment: [{
        id: 'rollback',
        name: 'Rollback Target',
        promptVersion: config.toVersion,
        weight: 10,  // 10% rollback target
      }],
      // ... monitoring config
    };
    
    await this.createABTest(rollbackTest);
    
    // Schedule gradual traffic shift
    const schedule = [
      { delay: 0, weights: [90, 10] },
      { delay: 5 * 60 * 1000, weights: [70, 30] },    // 5 min
      { delay: 15 * 60 * 1000, weights: [50, 50] },   // 15 min
      { delay: 30 * 60 * 1000, weights: [20, 80] },   // 30 min
      { delay: 60 * 60 * 1000, weights: [0, 100] },   // 1 hour
    ];
    
    for (const step of schedule) {
      await this.scheduleWeightChange(rollbackTest.id, step);
    }
    
    return {
      success: true,
      type: 'gradual',
      testId: rollbackTest.id,
      schedule,
    };
  }
}

// Automatic rollback on error spike
class AutoRollbackMonitor {
  async checkForRollbackTriggers(promptName: string): Promise<void> {
    const currentVersion = await this.getProductionVersion(promptName);
    const metrics = await this.getRecentMetrics(promptName, currentVersion);
    
    // Check error rate
    const errorRate = metrics.errors / metrics.total;
    if (errorRate > 0.05) {  // 5% error threshold
      const previousVersion = await this.getLastStableVersion(promptName);
      
      await this.notifyTeam({
        type: 'auto_rollback_triggered',
        promptName,
        fromVersion: currentVersion,
        toVersion: previousVersion,
        reason: `Error rate ${(errorRate * 100).toFixed(1)}% exceeds threshold`,
      });
      
      await this.rollbackManager.rollback({
        promptName,
        fromVersion: currentVersion,
        toVersion: previousVersion,
        reason: 'Automatic rollback: error rate exceeded',
        rollbackType: 'instant',
      });
    }
    
    // Check latency degradation
    const latencyP95 = metrics.latencyP95;
    const baseline = await this.getBaselineLatency(promptName);
    if (latencyP95 > baseline * 2) {  // 2x latency threshold
      // Similar rollback logic
    }
  }
}
```

### Deployment Pipeline

```yaml
# .github/workflows/prompt-deploy.yml
name: Prompt Deployment Pipeline

on:
  push:
    paths:
      - 'prompts/**'
    branches:
      - main
      - staging

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Validate Prompt Syntax
        run: |
          npm run prompts:validate
          
      - name: Type Check Variables
        run: |
          npm run prompts:typecheck

  test:
    needs: validate
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Run Prompt Evaluations
        env:
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
        run: |
          npm run prompts:eval -- --changed-only
          
      - name: Upload Eval Results
        uses: actions/upload-artifact@v4
        with:
          name: eval-results
          path: eval-results/

  deploy-staging:
    needs: test
    if: github.ref == 'refs/heads/staging'
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to Staging
        run: |
          npm run prompts:deploy -- --env staging
          
  deploy-production:
    needs: test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    environment: production
    steps:
      - name: Deploy with Canary
        run: |
          npm run prompts:deploy -- --env production --canary 10
          
      - name: Monitor Canary (5 min)
        run: |
          npm run prompts:monitor -- --duration 300
          
      - name: Promote or Rollback
        run: |
          npm run prompts:promote-or-rollback
```

### Quality Gates

```
[ ] Prompt versioning configured with YAML schema
[ ] Production/staging labels defined
[ ] Rollback procedure documented and tested
[ ] A/B testing framework operational
[ ] Change approval process (PR review) defined
[ ] Automated eval tests on every change
[ ] Canary deployment for production
[ ] Auto-rollback on error spike configured
[ ] Prompt diff/merge tools available
[ ] Version history retained for audit
```

### Cross-Category Dependencies
- **-> Category 29-34** (AI)  -  LLM applications
- **-> Category 43** (CI/CD)  -  Deployment pipelines
- **-> Category 46** (Testing)  -  Prompt evaluation
- **-> Category 55** (Monitoring)  -  Performance tracking

---

## Category 45: Browser & Web Automation

### Scope
Web scraping, browser automation, RPA, testing automation.

### Technology Stack  -  Exhaustive

#### Browser Automation
| Tool | Best For |
|------|----------|
| **Playwright** | Modern, fast |
| **Puppeteer** | Chrome/Chromium |
| **Selenium** | Broad support |

#### Headless Browsers
| Service | Features |
|---------|----------|
| **Browserbase** | Cloud browsers |
| **Browserless** | Managed Puppeteer |
| **Apify** | Scraping platform |
| **Steel** | Cloud browser API |

#### AI-Powered Automation
| Tool | Features |
|------|----------|
| **Browser Use** | LLM browser control |
| **Claude Computer Use** | Computer control |

#### Data Extraction
| Tool | Purpose |
|------|---------|
| **Cheerio** | HTML parsing |
| **Firecrawl** | Web scraping API |
| **Crawlee** | Scraping toolkit |

### Quality Gates

```
□ Rate limiting implemented
□ Robots.txt respected
□ Error handling robust
□ Session management
□ Legal compliance verified
```

### Cross-Category Dependencies
- **â†' Category 44** (Workflows)  -  Orchestration
- **â†' Category 46** (Testing)  -  E2E testing
- **â†' Category 30** (Agents)  -  AI automation

---

## Category 46: Testing & Quality Assurance

### Scope
Unit testing, integration testing, E2E testing, performance testing, security testing.

### Technology Stack  -  Exhaustive

#### Unit Testing
| Framework | Language |
|-----------|----------|
| **Vitest** | Vite ecosystem |
| **Jest** | JavaScript |
| **pytest** | Python |

#### E2E Testing
| Tool | Best For |
|------|----------|
| **Playwright** | Cross-browser |
| **Cypress** | Developer experience |
| **Detox** | React Native |
| **Maestro** | Mobile |

#### Performance Testing
| Tool | Type |
|------|------|
| **k6** | Load testing |
| **Locust** | Python load testing |
| **Artillery** | Load testing |

#### Security Testing
| Tool | Focus |
|------|-------|
| **OWASP ZAP** | Web security |
| **Snyk** | Dependencies |
| **Trivy** | Container security |
| **Semgrep** | Code patterns |

#### Visual Testing
| Tool | Features |
|------|----------|
| **Percy** | Visual regression |
| **Chromatic** | Storybook testing |

#### AI/LLM Evaluation Testing
| Framework | Best For | Key Feature |
|-----------|----------|-------------|
| **DeepEval** | LLM apps | 14+ metrics, CI/CD native |
| **RAGAS** | RAG systems | Faithfulness, relevancy |
| **Evidently** | ML monitoring | Drift detection |
| **Promptfoo** | Prompt testing | Red-teaming |

#### LLM Evaluation Metrics
| Metric | Range | Good Threshold |
|--------|-------|----------------|
| Answer Relevancy | 0-1 | ≥ 0.8 |
| Faithfulness | 0-1 | ≥ 0.9 |
| Hallucination Rate | 0-1 | ≤ 0.05 |
| Toxicity Score | 0-1 | ≤ 0.01 |

#### CI/CD Evaluation Gate
```yaml
# .github/workflows/eval.yml
- name: Run DeepEval
  run: |
    pip install deepeval
    deepeval test run tests/eval/
```
```

#### Invariant Assertion Patterns

Design by Contract validation for production code quality.

| Assertion Type | When | Purpose |
|----------------|------|---------|
| **Precondition** | Before execution | Validate inputs |
| **Postcondition** | After execution | Validate outputs |
| **Class Invariant** | After any mutation | Maintain consistency |
| **AI Output Invariant** | After LLM call | Validate response schema |

```typescript
// Runtime validation with Zod
import { z } from 'zod';

const AIResponseSchema = z.object({
  answer: z.string().min(1),
  confidence: z.number().min(0).max(1),
  sources: z.array(z.string()).optional(),
});

// Validate LLM output before use
const validated = AIResponseSchema.parse(llmResponse);
```

**Tools:**
| Tool | Language | Use Case |
|------|----------|----------|
| **Zod** | TypeScript | Schema validation |
| **Pydantic** | Python | Data validation |
| **fast-check** | TypeScript | Property testing |
| **Hypothesis** | Python | Property testing |

**-> NS Part V §44.4**  -  Full implementation patterns

#### Chaos Engineering for AI Systems

Proactively test AI system resilience by injecting failures:

```python
import random
from functools import wraps

def chaos_monkey(failure_rate: float = 0.1, failure_types: list = None):
    """Inject random failures to test resilience."""
    failure_types = failure_types or ['timeout', 'rate_limit', 'malformed']
    
    def decorator(func):
        @wraps(func)
        async def wrapper(*args, **kwargs):
            if random.random() < failure_rate:
                failure = random.choice(failure_types)
                if failure == 'timeout':
                    raise TimeoutError("Chaos: Simulated timeout")
                elif failure == 'rate_limit':
                    raise RateLimitError("Chaos: Simulated rate limit")
                elif failure == 'malformed':
                    return {"error": "Chaos: Malformed response"}
            return await func(*args, **kwargs)
        return wrapper
    return decorator

# Usage
@chaos_monkey(failure_rate=0.05)
async def call_llm(prompt: str) -> str:
    return await anthropic.messages.create(...)
```

#### Headless Browser Testing for AI UIs

Test AI-powered interfaces with Playwright:

```typescript
import { test, expect } from '@playwright/test';

test('AI chat responds within latency budget', async ({ page }) => {
  await page.goto('/chat');
  
  const startTime = Date.now();
  await page.fill('[data-testid="chat-input"]', 'Hello, how are you?');
  await page.click('[data-testid="send-button"]');
  
  // Wait for streaming response to complete
  await expect(page.locator('[data-testid="ai-response"]')).toBeVisible();
  await expect(page.locator('[data-testid="loading"]')).toBeHidden();
  
  const responseTime = Date.now() - startTime;
  expect(responseTime).toBeLessThan(5000); // 5s latency budget
});
```

#### RAGAS Evaluation Framework

Evaluate RAG pipeline quality with RAGAS metrics:

```python
from ragas import evaluate
from ragas.metrics import faithfulness, answer_relevancy, context_precision

def evaluate_rag_pipeline(questions, ground_truths, contexts, answers):
    """Comprehensive RAG evaluation using RAGAS."""
    dataset = Dataset.from_dict({
        "question": questions,
        "ground_truth": ground_truths,
        "contexts": contexts,
        "answer": answers
    })
    
    results = evaluate(
        dataset,
        metrics=[faithfulness, answer_relevancy, context_precision]
    )
    
    return {
        "faithfulness": results["faithfulness"],      # Hallucination check
        "relevancy": results["answer_relevancy"],     # Answer quality
        "precision": results["context_precision"]     # Retrieval quality
    }
```

#### Multi-Modal Testing

Test vision and document understanding capabilities:

```python
import base64
from pathlib import Path

def test_vision_extraction(image_path: Path, expected_content: dict):
    """Test image understanding accuracy."""
    with open(image_path, "rb") as f:
        image_data = base64.standard_b64encode(f.read()).decode()
    
    response = anthropic.messages.create(
        model="claude-sonnet-4-20250514",
        max_tokens=1024,
        messages=[{
            "role": "user",
            "content": [
                {"type": "image", "source": {"type": "base64", "media_type": "image/png", "data": image_data}},
                {"type": "text", "text": "Extract all text and key information from this image."}
            ]
        }]
    )
    
    # Verify extraction accuracy
    result = response.content[0].text
    for key, expected_value in expected_content.items():
        assert expected_value.lower() in result.lower(), f"Missing: {key}"
```


### Prompt Regression Testing

Ensure prompt changes don't degrade quality.

```yaml
# promptfoo config - promptfooconfig.yaml
prompts:
  - prompts/v1.txt
  - prompts/v2.txt

providers:
  - openai:gpt-4

tests:
  - vars:
      input: "What is machine learning?"
    assert:
      - type: llm-rubric
        value: "Response should be clear and accurate"
      - type: similar
        value: "Machine learning is a subset of AI..."
        threshold: 0.8
      - type: not-contains
        value: "I don't know"
```

**CI Integration:**
```yaml
# Block PR if regression detected
- name: Prompt Regression Test
  run: npx promptfoo eval --config promptfooconfig.yaml
```

### Golden Datasets for AI Evaluation

Curated test sets for consistent quality measurement.

| Dataset Type | Purpose | Recommended Size |
|--------------|---------|------------------|
| **Regression** | Catch quality drops | 100-500 samples |
| **Edge cases** | Test boundaries | 50-100 samples |
| **Production samples** | Real-world coverage | 200-1000 samples |
| **Adversarial** | Security testing | 50-100 samples |

**Golden Dataset Maintenance:**
```
□ Refresh quarterly from production
□ Version alongside prompts (DVC)
□ Include difficulty labels (easy/medium/hard)
□ Balance across use case categories
□ Annotate expected outputs
□ Track dataset lineage
```

---

### Quality Gates

```
□ Unit test coverage > 80%
□ Integration tests passing
□ E2E tests passing
□ Performance benchmarks met
□ Security scan clean
□ Accessibility audit passed
□ Visual regression checked
□ Cross-browser tested
```

### Cross-Category Dependencies
- **â†' Category 43** (CI/CD)  -  Test execution
- **â†' Category 52** (Security)  -  Security testing
- **â†' NS Part IX** (Sections 42-45)  -  Testing philosophy, coverage strategies, patterns

---

## Category 47: Conversational & Voice Interfaces

### Scope
Chatbots, voice assistants, conversational AI, multimodal interfaces.

### Technology Stack  -  Exhaustive

#### Chatbot Frameworks
| Framework | Best For |
|-----------|----------|
| **Vercel AI SDK** | React/Next.js |
| **LangChain** | Complex chains |
| **Botpress** | Visual builder |

#### Voice Assistants
| Service | Platform |
|---------|----------|
| **Vapi** | Voice AI agents |
| **Retell AI** | Voice agents |
| **OpenAI Realtime API** | Voice conversation |

#### Real-Time Communication
| Service | Features |
|---------|----------|
| **LiveKit** | WebRTC infrastructure |
| **Daily** | Video/voice API |
| **Twilio** | Phone/SMS/video |

### Quality Gates

```
□ Conversation design documented
□ Intent recognition accurate
□ Fallback handling graceful
□ Latency acceptable
□ Multi-turn context maintained
```

### Cross-Category Dependencies
- **â†' Category 29-34** (AI)  -  Language models
- **â†' Category 37** (Audio)  -  Voice generation
- **â†' Category 24** (Real-time)  -  WebSocket/WebRTC

---

## Category 48: Documentation Systems

### Scope
Technical documentation, API documentation, knowledge bases, wikis.

### Technology Stack  -  Exhaustive

#### Documentation Frameworks
| Framework | Best For |
|-----------|----------|
| **Docusaurus** | React docs |
| **VitePress** | Vue docs |
| **Starlight** | Astro docs |
| **Mintlify** | Beautiful API docs |
| **ReadMe** | API documentation |

#### API Documentation
| Tool | Features |
|------|----------|
| **Swagger UI** | OpenAPI viewer |
| **Scalar** | Modern API docs |

#### Knowledge Management
| Platform | Type |
|----------|------|
| **Notion** | All-in-one |
| **Confluence** | Enterprise wiki |
| **Outline** | Open-source |

### Quality Gates

```
□ Documentation complete
□ Code examples tested
□ API reference accurate
□ Search working
□ Versioning implemented
```

### Cross-Category Dependencies
- **â†' Category 4** (Websites)  -  Documentation sites
- **â†' Category 8** (APIs)  -  API reference
- **â†' Category 43** (CI/CD)  -  Doc generation

---

## Category 49: Dashboards & Internal Tools

### Scope
Admin panels, analytics dashboards, internal tools, CRUD builders.

### Technology Stack  -  Exhaustive

#### Low-Code Builders
| Platform | Best For |
|----------|----------|
| **Retool** | Internal tools |
| **Appsmith** | Open-source |
| **Budibase** | Open-source |

#### Dashboard Libraries
| Library | Framework |
|---------|-----------|
| **Tremor** | React dashboards |
| **Recharts** | React charts |
| **D3.js** | Custom visualizations |

#### Admin Frameworks
| Framework | Stack |
|-----------|-------|
| **AdminJS** | Node.js |
| **React Admin** | React |
| **Refine** | React |

#### Monitoring Dashboards
| Tool | Focus |
|------|-------|
| **Grafana** | Observability |
| **Metabase** | BI/Analytics |

### Quality Gates

```
□ Data accuracy verified
□ Performance acceptable
□ Access controls implemented
□ Audit logging enabled
□ Mobile responsive
```

### Cross-Category Dependencies
- **â†' Category 8** (APIs)  -  Data sources
- **â†' Category 15-17** (Databases)  -  Data layer
- **â†' Category 50** (Auth)  -  Access control

---



## Category 54: Regulatory Compliance (L3)

When you operate in regulated domains, treat compliance as **first‑class infrastructure**, not paperwork.

Coverage:
- GDPR (EU)
- HIPAA (US healthcare)
- SOC2 (security controls)
- EU AI Act (risk classification, auditability)

Patterns:
- data classification labels (PII/PHI)
- audit logging + immutable trails
- retention & deletion policies
- model/prompt change logs
- documented risk assessments

Deliverables:
- compliance checklist per release
- evidence artifacts stored with versioned releases


### Prompt Regression Testing (GQ3)

Treat prompts like code:
- version prompts (PromptOps)
- maintain a **golden prompt suite**
- run regression in CI before deploy

Recommended approach:
- define canonical inputs
- assert output constraints (format, safety, correctness)
- track drift over time

Tools:
- DeepEval / RAGAS style evaluation harnesses
- Langfuse / PromptLayer for prompt versioning + trace linking


### Golden Dataset Management (GQ5)

Your evaluation pipeline is only as good as your datasets.

Best practices:
- curate datasets by scenario (happy path, adversarial, long tail)
- store dataset versions (DVC / Git LFS / object storage)
- label provenance (source, date, policy)
- define ownership + update cadence

CI gate:
- fail deploy if golden set performance drops beyond threshold.


### Agent Session / Trace / Span Model (GQ6)

Define observability primitives:
- **Session**: a user-initiated run (contains many traces)
- **Trace**: one workflow execution (contains many spans)
- **Span**: one step (LLM call, tool call, retrieval, write)

Minimum fields:
- ids: session_id, trace_id, span_id
- timestamps
- model/provider used
- token/cost estimates
- tool name + args (redacted)
- outcome + error

This enables:
- debugging
- cost tracking
- safety audits
- regression detection
