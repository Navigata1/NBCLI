# MASTER BUILD FRAMEWORK v2.0 — SEGMENT 4 of 4
## MBF_PART_4_FOUNDATION
### Contents: Tier 8 (Cat 50-56) + Usage Guide + Appendix + Addendum (Skills, RLM, Prompt Architecture)
### Lines: 3075-4935 of original
---
> **SEGMENT NAVIGATION:** This is a development segment. For full MBF, merge all 4 parts.
> For BRIDGE routing: Categories 50-56 + Skills/RLM/Prompt patterns are in this segment.
---

# TIER 8: SECURITY & FOUNDATION
## *Essential Systems That Span All Categories*

---

## Category 50: Authentication & Identity

### Scope
User authentication, SSO, OAuth, session management, user management.

### Technology Stack  -  Exhaustive

#### Auth Platforms
| Platform | Type |
|----------|------|
| **Clerk** | Modern auth |
| **Auth0** | Enterprise |
| **Supabase Auth** | Open-source |
| **WorkOS** | Enterprise features |
| **Stytch** | Passwordless |
| **Keycloak** | Open-source |

#### Auth Libraries
| Library | Framework |
|---------|-----------|
| **Auth.js (NextAuth)** | Next.js + more |
| **Lucia** | TypeScript |
| **better-auth** | TypeScript |

#### Protocols
| Protocol | Use |
|----------|-----|
| **OAuth 2.0** | Authorization |
| **OpenID Connect** | Authentication |
| **SAML** | Enterprise SSO |
| **WebAuthn/Passkeys** | Passwordless |

### Quality Gates

```
□ Secure password hashing (bcrypt/argon2)
□ Session management secure
□ CSRF protection enabled
□ Rate limiting on auth endpoints
□ MFA available
□ JWT properly validated
□ Audit logging enabled
```

### Agentic Prompt Hook

```
You are implementing authentication. Before implementation:

1. REQUIREMENTS
   - Define auth methods needed
   - Plan user journey
   - Consider enterprise needs (SSO)

2. ARCHITECTURE
   - Choose auth platform/library
   - Design session strategy
   - Plan MFA approach

3. SECURITY
   - Implement rate limiting
   - Add audit logging
   - Configure MFA

4. OUTPUT REQUIREMENTS
   - Secure authentication
   - Good user experience
   - Proper session management
   - Audit trail
```

### Cross-Category Dependencies
- **â†' Category 1-6** (Build Targets)  -  Auth integration
- **â†' Category 8** (APIs)  -  API auth
- **â†' Category 52** (Security)  -  Security best practices

---

## Category 51: Payments & Billing

### Scope
Payment processing, subscriptions, invoicing, usage-based billing.

### Technology Stack  -  Exhaustive

#### Payment Processors
| Processor | Best For |
|-----------|----------|
| **Stripe** | Developer-friendly |
| **PayPal** | Consumer trust |
| **Paddle** | SaaS (MoR) |
| **Lemon Squeezy** | Digital products |

#### Subscription Management
| Platform | Features |
|----------|----------|
| **Stripe Billing** | Full-featured |
| **Chargebee** | Subscription platform |
| **Lago** | Open-source |
| **Orb** | Usage-based |

### Quality Gates

```
□ PCI compliance verified
□ Webhook handling robust
□ Idempotency implemented
□ Failed payment handling
□ Tax calculation correct
□ Refund flow tested
□ Multi-currency support
```

### Cross-Category Dependencies
- **â†' Category 1-6** (Build Targets)  -  Payment integration
- **â†' Category 50** (Auth)  -  Customer identity
- **â†' Category 56** (Compliance)  -  PCI, tax compliance

---

## Category 52: Security & Encryption

### Scope
Application security, encryption, vulnerability management, penetration testing.

### Technology Stack  -  Exhaustive

#### Security Scanning
| Tool | Focus |
|------|-------|
| **Snyk** | Dependencies, code |
| **Semgrep** | Code patterns |
| **SonarQube** | Code quality |
| **Trivy** | Container security |
| **OWASP ZAP** | Web app security |

#### Encryption
| Library | Language |
|---------|----------|
| **libsodium** | Cross-platform |
| **Web Crypto API** | Browser |
| **node:crypto** | Node.js |

#### WAF & DDoS
| Service | Features |
|---------|----------|
| **Cloudflare** | WAF, DDoS |
| **AWS WAF** | AWS integration |

### Quality Gates

```
□ HTTPS enforced everywhere
□ Security headers configured
□ CSP implemented
□ Input validation complete
□ SQL injection prevented
□ XSS prevented
□ CSRF protection enabled
□ Dependencies audited
□ Secrets not in code
□ Encryption at rest
□ Penetration test passed
```

### Cross-Category Dependencies
- **â†' All Categories**  -  Security applies everywhere
- **â†' Category 50** (Auth)  -  Identity security
- **â†' Category 53** (Secrets)  -  Key management

---

## Category 53: Secrets Management

### Scope
API keys, credentials, certificates, environment variables.

### Technology Stack  -  Exhaustive

#### Secret Managers
| Service | Type |
|---------|------|
| **HashiCorp Vault** | Full-featured |
| **AWS Secrets Manager** | AWS |
| **1Password** | Developer secrets |
| **Doppler** | Universal |
| **Infisical** | Open-source |

#### Configuration
| Tool | Use |
|------|-----|
| **dotenv** | Local env files |
| **SOPS** | Encrypted files |
| **direnv** | Directory env |

### Quality Gates

```
□ No secrets in code
□ No secrets in Git history
□ Secrets rotated regularly
□ Access audited
□ Least privilege access
□ Encryption at rest
□ Emergency access procedure
```

### Cross-Category Dependencies
- **â†' All Categories**  -  Secrets used everywhere
- **â†' Category 43** (CI/CD)  -  Pipeline secrets
- **â†' Category 52** (Security)  -  Security integration

---

## Category 54: Analytics & Tracking

### Scope
Product analytics, user tracking, event tracking, experimentation.

### Technology Stack  -  Exhaustive

#### Product Analytics
| Platform | Best For |
|----------|----------|
| **PostHog** | Open-source, full-featured |
| **Amplitude** | Product analytics |
| **Mixpanel** | Event analytics |
| **Heap** | Autocapture |

#### Web Analytics
| Platform | Type |
|----------|------|
| **Plausible** | Privacy-friendly |
| **Fathom** | Privacy-friendly |
| **Umami** | Open-source |

#### Experimentation
| Platform | Features |
|----------|----------|
| **LaunchDarkly** | Feature flags |
| **Statsig** | Feature flags + analytics |
| **GrowthBook** | Open-source |
| **PostHog** | Built-in A/B |

### Quality Gates

```
□ Tracking plan documented
□ Event naming consistent
□ User identification correct
□ Privacy compliance (GDPR)
□ Consent management
□ PII handling correct
```

### Cross-Category Dependencies
- **â†' Category 1-6** (Build Targets)  -  Tracking integration
- **â†' Category 20** (Warehousing)  -  Data destination
- **â†' Category 56** (Compliance)  -  Privacy compliance

---

## Category 55: Monitoring & Observability

### Scope
Application monitoring, infrastructure monitoring, logging, tracing, alerting.

### Technology Stack  -  Exhaustive

#### Full-Stack Observability
| Platform | Features |
|----------|----------|
| **Datadog** | Full platform |
| **New Relic** | Full platform |
| **Grafana Cloud** | Grafana managed |

#### Metrics
| Tool | Type |
|------|------|
| **Prometheus** | Time-series |
| **Grafana** | Visualization |
| **Victoria Metrics** | Prometheus-compatible |

#### Logging
| Tool | Type |
|------|------|
| **Loki** | Grafana logs |
| **Axiom** | Modern logging |
| **Better Stack (Logtail)** | Managed logging |

#### Tracing
| Tool | Type |
|------|------|
| **Jaeger** | Open-source |
| **Tempo** | Grafana tracing |
| **Honeycomb** | Observability |
| **OpenTelemetry** | Standard |

#### Error Tracking
| Tool | Focus |
|------|-------|
| **Sentry** | Error tracking |
| **Bugsnag** | Error monitoring |

#### Incident Management
| Tool | Features |
|------|----------|
| **PagerDuty** | On-call management |
| **incident.io** | Incident response |
| **Better Uptime** | Status pages |

### Quality Gates

```
□ Metrics collection complete
□ Logging structured (JSON)
□ Tracing implemented
□ Dashboards created
□ Alerts configured
□ On-call rotation set
□ Runbooks documented
□ SLOs defined
□ Error tracking enabled
□ Uptime monitoring active

### Agent Observability Model

Hierarchical tracing structure for AI agent systems.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    AGENT OBSERVABILITY HIERARCHY                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  SESSION (user conversation)                                                │
│    │                                                                         │
│    ├─── TRACE (single request/task)                                         │
│    │      │                                                                  │
│    │      ├─── SPAN (individual operation)                                  │
│    │      │      ├── LLM call                                               │
│    │      │      ├── Tool call                                              │
│    │      │      ├── Retrieval                                              │
│    │      │      └── Post-processing                                        │
│    │      │                                                                  │
│    │      └─── SPAN (next operation)                                        │
│    │             └── ...                                                     │
│    │                                                                         │
│    └─── TRACE (next request)                                                │
│           └── ...                                                            │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

| Level | What to Track |
|-------|---------------|
| **Session** | User ID, total cost, satisfaction score, duration |
| **Trace** | Latency, success/failure, execution path, total tokens |
| **Span** | Token usage, tool results, errors, model used |

**Observability Tools for Agents:**
| Tool | Strength |
|------|----------|
| **LangSmith** | LangChain native |
| **Langfuse** | Open-source, self-host |
| **Arize Phoenix** | LLM observability |
| **Helicone** | LLM proxy logging |
| **Braintrust** | Eval + logging |

```

### Agentic Prompt Hook

```
You are implementing monitoring and observability. Before implementation:

1. STRATEGY
   - Define SLOs/SLIs
   - Identify critical paths
   - Plan alert thresholds

2. IMPLEMENTATION
   - Instrument metrics
   - Configure logging
   - Add tracing

3. VISUALIZATION
   - Create dashboards
   - Set up alerts
   - Configure notifications

4. OPERATIONS
   - Document runbooks
   - Set up on-call
   - Plan incident response

5. OUTPUT REQUIREMENTS
   - Full observability
   - Actionable alerts
   - Clear dashboards
   - Fast incident response
```

### Cross-Category Dependencies
- **â†' All Categories**  -  Monitoring applies everywhere
- **â†' Category 43** (CI/CD)  -  Deployment monitoring

---

## Category 56: Compliance & Legal

### Scope
GDPR, CCPA, SOC 2, HIPAA, accessibility, privacy policies, data governance.

### Technology Stack  -  Exhaustive

#### Privacy Compliance
| Platform | Focus |
|----------|-------|
| **OneTrust** | Privacy management |
| **Osano** | Consent management |
| **Termly** | Compliance generator |
| **iubenda** | Legal documents |

#### Security Compliance
| Platform | Standards |
|----------|-----------|
| **Vanta** | SOC 2, ISO, HIPAA |
| **Drata** | Compliance automation |
| **Secureframe** | Compliance automation |

#### Accessibility
| Standard | Tools |
|----------|-------|
| **WCAG 2.1** | Guidelines |
| **axe-core** | Testing |
| **Pa11y** | Automated testing |

### Compliance Requirements

#### GDPR (EU)
```
□ Lawful basis for processing
□ Privacy policy comprehensive
□ Cookie consent implemented
□ Data subject rights (access, deletion, portability)
□ Data Processing Agreements
□ Data breach notification procedure
□ Privacy by design
```

#### SOC 2
```
□ Security policies documented
□ Access controls implemented
□ Change management process
□ Risk assessment completed
□ Incident response plan
□ Business continuity plan
□ Employee training
□ Monitoring and logging
□ Encryption implemented
```

#### HIPAA (Healthcare)
```
□ PHI identification and protection
□ Business Associate Agreements (BAAs)
□ Access controls and audit trails
□ Encryption at rest and in transit
□ Employee HIPAA training
□ Breach notification procedures
□ Minimum necessary standard
```

#### EU AI Act (AI Systems)
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         EU AI ACT COMPLIANCE                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  TIMELINE                                                                    │
│  ─────────────────────────────────────────────────────────────────────────  │
│  • Feb 2025: Prohibited practices enforcement                               │
│  • Aug 2025: GPAI (General Purpose AI) obligations                          │
│  • Aug 2026: High-risk AI requirements                                      │
│  • Penalties: Up to 35M EUR or 7% global turnover                           │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                              │
│  RISK CLASSIFICATION                                                         │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                              │
│  LEVEL          │ EXAMPLES                    │ REQUIREMENTS                 │
│  ───────────────┼─────────────────────────────┼──────────────────────────────│
│  Prohibited     │ Social scoring, subliminal  │ Banned                       │
│                 │ manipulation                │                              │
│  High-risk      │ Hiring, credit, education,  │ Full compliance: risk       │
│                 │ law enforcement             │ management, data quality,   │
│                 │                             │ logging, transparency       │
│  Limited        │ Chatbots, emotion detection │ Transparency obligations    │
│  Minimal        │ Spam filters, games         │ None                         │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                              │
│  HIGH-RISK REQUIREMENTS                                                      │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                              │
│  □ Risk management system                                                   │
│  □ Data governance and quality                                              │
│  □ Technical documentation                                                   │
│  □ Record-keeping (logging)                                                  │
│  □ Transparency to users                                                     │
│  □ Human oversight mechanisms                                                │
│  □ Accuracy, robustness, cybersecurity                                       │
│  □ Conformity assessment                                                     │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Quality Gates

```
□ Privacy policy published
□ Terms of service published
□ Cookie consent implemented
□ Data subject rights workflow
□ Data retention policy
□ Security certifications current
□ Accessibility tested
□ Regular compliance audits
```

### Cross-Category Dependencies
- **â†' All Categories**  -  Compliance applies everywhere
- **â†' Category 50** (Auth)  -  Identity verification
- **â†' Category 52** (Security)  -  Security controls
- **â†' Category 54** (Analytics)  -  Consent integration

---

# FRAMEWORK USAGE GUIDE

## How to Use This Framework

### For New Projects

1. **Identify Primary Build Target** (Categories 1-7)
   - What are you building?

2. **Map Required Supporting Categories**
   - Use dependency matrix
   - Include all necessary tiers

3. **Execute Category by Category**
   - Follow quality gates
   - Use agentic prompts

4. **Validate Completeness**
   - Cross-check dependencies
   - Verify all gates passed

### For Agentic Development

When presenting to an AI model (Claude, GPT, etc.):

1. **Provide Framework Context**
   - Share relevant category definitions
   - Include quality gates

2. **Use Agentic Prompt Hooks**
   - Start with the category's prompt hook
   - Customize for specific needs

3. **Enforce Quality Gates**
   - Check each gate during review
   - Don't skip any checks

---

## Build Pattern Templates

### SaaS Application (Full Stack)
```
Required Categories:
â"œâ"€â"€ 1 (Web App)
â"œâ"€â"€ 8 (APIs & Backend)
â"œâ"€â"€ 15 (Relational Database)
â"œâ"€â"€ 22 (Caching)
â"œâ"€â"€ 24 (Real-Time - optional)
â"œâ"€â"€ 43 (CI/CD)
â"œâ"€â"€ 46 (Testing)
â"œâ"€â"€ 50 (Authentication)
â"œâ"€â"€ 51 (Payments)
â"œâ"€â"€ 52 (Security)
â"œâ"€â"€ 54 (Analytics)
â"œâ"€â"€ 55 (Monitoring)
â""â"€â"€ 56 (Compliance)
```

### AI-Powered Application
```
Required Categories:
â"œâ"€â"€ 1 or 2 (Web/Mobile App)
â"œâ"€â"€ 8 (APIs & Backend)
â"œâ"€â"€ 16 (Vector Database)
â"œâ"€â"€ 29 (Agentic RAG)
â"œâ"€â"€ 30 (Autonomous Agents - optional)
â"œâ"€â"€ 31 (MCPs & Tools)
â"œâ"€â"€ 33 (Model Serving)
â"œâ"€â"€ 34 (LLM Routing)
â"œâ"€â"€ 35 (AI Safety)
â""â"€â"€ 50-56 (Foundation Tier)
```

### Content Generation Pipeline
```
Required Categories:
â"œâ"€â"€ 36 (Image Generation)
â"œâ"€â"€ 37 (Audio Generation)
â"œâ"€â"€ 38 (Video Processing)
â"œâ"€â"€ 39 (Document Generation)
â"œâ"€â"€ 11 (GPU Compute)
â"œâ"€â"€ 19 (Object Storage)
â"œâ"€â"€ 44 (Workflow Orchestration)
â""â"€â"€ 43 (CI/CD)
```

### Mobile App with Backend
```
Required Categories:
â"œâ"€â"€ 2 (Mobile Application)
â"œâ"€â"€ 8 (APIs & Backend)
â"œâ"€â"€ 15 (Relational Database)
â"œâ"€â"€ 19 (Object Storage)
â"œâ"€â"€ 50 (Authentication)
â"œâ"€â"€ 51 (Payments - if needed)
â"œâ"€â"€ 54 (Analytics)
â""â"€â"€ 55 (Monitoring)
```

### Embedded/IoT System
```
Required Categories:
â"œâ"€â"€ 6 (Operating Systems & Embedded)
â"œâ"€â"€ 8 (APIs - cloud connectivity)
â"œâ"€â"€ 9 (Edge Computing)
â"œâ"€â"€ 17 (Document/NoSQL - time series)
â"œâ"€â"€ 52 (Security)
â""â"€â"€ 55 (Monitoring)
```

### Internal Tools & Dashboard
```
Required Categories:
â"œâ"€â"€ 49 (Dashboards & Internal Tools)
â"œâ"€â"€ 8 (APIs & Backend)
â"œâ"€â"€ 15 (Relational Database)
â"œâ"€â"€ 50 (Authentication)
â"œâ"€â"€ 52 (Security)
â""â"€â"€ 55 (Monitoring)
```

---

## Master Agentic Prompt

Use this prompt to invoke the full framework with any AI model:

```
You are operating as a Master Build Framework Agent. You have access to a 56-category exhaustive build framework covering:

TIER 1: Build Targets (1-7) - Web, Mobile, Desktop, Websites, Immersive, Embedded, Extensions
TIER 2: Compute & Infrastructure (8-14) - APIs, Edge, Serverless, GPU, Containers, IaC, Platform Engineering
TIER 3: Data & Persistence (15-21) - SQL, Vector, NoSQL, Local-First, Storage, Warehousing, Search
TIER 4: AI & Agent Systems (22-35) - Caching, Queues, Real-Time, Cron, Graphs, ETL, Features, RAG, Agents, MCPs, Fine-Tuning, Inference, Routing, Safety
TIER 5: Content Generation (36-42) - Image, Audio, Video, Documents, Code, Data, Translation
TIER 6: Automation & DevOps (43-49) - CI/CD, Workflows, Browser Automation, Testing, Voice, Docs, Dashboards
TIER 8: Security & Foundation (50-56) - Auth, Payments, Security, Secrets, Analytics, Monitoring, Compliance

For every build request:
1. Identify the primary build target category
2. Map all required supporting categories
3. For each category, apply the exhaustive tool/tech stack
4. Execute all quality gates
5. Document cross-category dependencies
6. Produce production-ready, tested, verified output

Your output must be:
- Maximum quality, industry standard
- Fully tested and verified
- Security-hardened
- Observable and monitored
- Compliant with relevant regulations
```

---

# VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | January 2026 | Initial 56-category framework |

---

# APPENDIX: QUICK REFERENCE

## All 56 Categories Summary

| # | Category | Tier |
|---|----------|------|
| 1 | Web Applications | Build Targets |
| 2 | Mobile Applications | Build Targets |
| 3 | Desktop Applications | Build Targets |
| 4 | Websites & Landing Pages | Build Targets |
| 5 | Generative & Immersive Web | Build Targets |
| 6 | Operating Systems & Embedded | Build Targets |
| 7 | Browser Extensions & Plugins | Build Targets |
| 8 | APIs & Backend Services | Compute |
| 9 | Edge Computing & CDN | Compute |
| 10 | Serverless Functions | Compute |
| 11 | GPU & ML Compute | Compute |
| 12 | Container Orchestration | Compute |
| 13 | Infrastructure as Code | Compute |
| 14 | Platform Engineering | Compute |
| 15 | Relational Databases | Data |
| 16 | Vector Databases & Semantic Search | Data |
| 17 | Document & NoSQL Databases | Data |
| 18 | Local-First & Offline Databases | Data |
| 19 | Object Storage & File Systems | Data |
| 20 | Data Warehousing & Analytics | Data |
| 21 | Search Engines | Data |
| 22 | Caching & Performance | AI Systems |
| 23 | Message Queues & Event Streaming | AI Systems |
| 24 | Real-Time & WebSockets | AI Systems |
| 25 | Scheduled Jobs & Cron | AI Systems |
| 26 | Graph Processing & Knowledge | AI Systems |
| 27 | Data Transformation & ETL | AI Systems |
| 28 | Feature Stores & ML Data | AI Systems |
| 29 | Agentic RAG Systems | AI Systems |
| 30 | Autonomous Agents | AI Systems |
| 31 | MCPs & Tool Registries | AI Systems |
| 32 | Model Fine-Tuning & Training | AI Systems |
| 33 | Model Serving & Inference | AI Systems |
| 34 | LLM Routing & Orchestration | AI Systems |
| 35 | AI Safety & Guardrails | AI Systems |
| 36 | Image Generation | Content |
| 37 | Audio Generation | Content |
| 38 | Video Generation & Processing | Content |
| 39 | Document Generation | Content |
| 40 | Code Generation | Content |
| 41 | Data & Content Generation | Content |
| 42 | Translation & Localization | Content |
| 43 | CI/CD Pipelines | Automation |
| 44 | Workflow Orchestration | Automation |
| 45 | Browser & Web Automation | Automation |
| 46 | Testing & Quality Assurance | Automation |
| 47 | Conversational & Voice Interfaces | Automation |
| 48 | Documentation Systems | Automation |
| 49 | Dashboards & Internal Tools | Automation |
| 50 | Authentication & Identity | Foundation |
| 51 | Payments & Billing | Foundation |
| 52 | Security & Encryption | Foundation |
| 53 | Secrets Management | Foundation |
| 54 | Analytics & Tracking | Foundation |
| 55 | Monitoring & Observability | Foundation |
| 56 | Compliance & Legal | Foundation |

---

*End of Framework v1.0  -  January 2026*

---

# ADDENDUM: SKILLS, REASONING LOOPS & PROMPT ARCHITECTURE
## *v2.0 Patch  -  Critical Framework Extensions*

---

## Category 31B: Skills & Capability Packaging

### Scope
Skill manifests, capability packaging, skill composition, skill registries, versioning, invocation patterns, skill-to-tool relationships.

### Understanding Skills vs MCPs vs Tools

| Concept | What It Is | How It Works |
|---------|------------|--------------|
| **Tool** | A single callable function | `get_weather(city)` â†' returns data |
| **MCP** | Protocol for tool communication | Standard interface between model and tools |
| **Skill** | Packaged capability with instructions | Contains: instructions, patterns, examples, quality gates, prompts |

**Key Distinction:**
- **Tools** = The *what* (capability)
- **MCPs** = The *how* (protocol)
- **Skills** = The *wisdom* (instructions + patterns + quality criteria)

### Skill Architecture

#### Skill Manifest Structure
```
/skill-name/
â"œâ"€â"€ SKILL.md           # Core instructions, patterns, best practices
â"œâ"€â"€ manifest.json      # Metadata, version, dependencies
â"œâ"€â"€ examples/          # Sample inputs and expected outputs
â"'   â"œâ"€â"€ input-1.json
â"'   â""â"€â"€ output-1.json
â"œâ"€â"€ templates/         # Reusable templates
â"œâ"€â"€ quality-gates.md   # Validation criteria
â""â"€â"€ hooks/             # Agentic invocation prompts
    â""â"€â"€ invoke.md
```

#### Skill Manifest Schema (manifest.json)
```json
{
  "name": "skill-name",
  "version": "1.0.0",
  "description": "What this skill does",
  "author": "creator",
  "category": "document|code|integration|reasoning|generation",
  "dependencies": ["other-skill@1.x"],
  "tools_required": ["tool-a", "tool-b"],
  "mcps_required": ["mcp-server-name"],
  "quality_gates": ["gate-1", "gate-2"],
  "agentic_hooks": {
    "invoke": "hooks/invoke.md",
    "validate": "hooks/validate.md"
  },
  "inputs": {
    "required": ["input-a"],
    "optional": ["input-b"]
  },
  "outputs": {
    "primary": "output-type",
    "artifacts": ["file-types"]
  }
}
```

### Skill Categories

| Category | Purpose | Examples |
|----------|---------|----------|
| **Document Skills** | Create/edit professional documents | docx, pdf, pptx, xlsx |
| **Code Skills** | Language-specific patterns & generation | frontend-design, mcp-builder |
| **Integration Skills** | Connect external services | stripe-integration, oauth-flows |
| **Reasoning Skills** | Analysis, planning, evaluation | research, comparison, critique |
| **Generation Skills** | Content & media creation | image-gen, audio-gen, data-gen |
| **Automation Skills** | Workflow & task execution | browser-automation, data-pipeline |

### Skill Composition Patterns

#### Sequential Composition
```
Skill A â†' Skill B â†' Skill C
(research) â†' (synthesize) â†' (document)
```

#### Parallel Composition
```
      â"Œâ†' Skill B â"€â"
Skill A           â"œâ†' Skill D
      â""â†' Skill C â"€â"˜
```

#### Conditional Composition
```
Skill A â†' [condition] â†' Skill B (if true)
                     â†' Skill C (if false)
```

#### Iterative Composition
```
Skill A â†' Skill B â†' [evaluate] â†' loop back or exit
```

### Skill Invocation Protocol

```markdown
## When to Read a Skill

BEFORE executing any task that matches a skill category:
1. Check /mnt/skills/ for relevant skills
2. Use `view` tool to read SKILL.md
3. Follow the skill's instructions precisely
4. Apply the skill's quality gates
5. Use the skill's agentic hooks

## Skill Loading Priority

1. User skills (/mnt/skills/user/)  -  highest priority
2. Private skills (/mnt/skills/private/)
3. Public skills (/mnt/skills/public/)
4. Example skills (/mnt/skills/examples/)

## Skill Invocation Pattern

1. IDENTIFY: What type of output is needed?
2. LOCATE: Which skill(s) apply?
3. LOAD: Read the SKILL.md file
4. EXECUTE: Follow skill instructions
5. VALIDATE: Apply quality gates
6. OUTPUT: Deliver skill-compliant result
```

### Quality Gates for Skills

```
□ Skill manifest complete and valid
□ SKILL.md contains clear instructions
□ Examples provided and tested
□ Quality gates are measurable
□ Agentic hooks are copy-paste ready
□ Dependencies documented
□ Version follows semver
□ Backward compatibility noted
□ Error handling defined
□ Edge cases documented
```

### Agentic Prompt Hook  -  Skill Invocation

```
You are operating with skill-augmented capabilities. Before any significant output:

1. SKILL IDENTIFICATION
   - What type of output is requested?
   - Check available skills in /mnt/skills/
   - Identify primary and supporting skills

2. SKILL LOADING
   - Use `view` tool to read SKILL.md
   - Note required tools and MCPs
   - Understand quality criteria

3. SKILL EXECUTION
   - Follow skill instructions precisely
   - Use skill templates where available
   - Apply skill-specific patterns

4. SKILL VALIDATION
   - Check output against quality gates
   - Verify all requirements met
   - Self-correct if needed

5. OUTPUT REQUIREMENTS
   - Skill-compliant output
   - Quality gates passed
   - Proper formatting per skill
```

### Cross-Category Dependencies
- **â†' Category 31** (MCPs)  -  Tool protocols
- **â†' Category 30** (Agents)  -  Skill execution
- **â†' Category 31C** (Reasoning)  -  Reasoning skills
- **â†' Category 40** (Code Gen)  -  Code skills

---

## Category 31C: Agentic Reasoning Loops

### Scope
Structured reasoning patterns, self-correction mechanisms, iterative refinement, bounded execution, reasoning verification.

### Core Reasoning Loop Patterns

#### RALPH Loop (Recommended Primary Pattern)

```
â"Œâ"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"
â"'                    RALPH LOOP                           â"'
â"œâ"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"¤
â"'                                                         â"'
â"'  â"Œâ"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"                                          â"'
â"'  â"'  REASON  â"' ← Analyze task, state, constraints       â"'
â"'  â""â"€â"€â"€â"€â"¬â"€â"€â"€â"€â"€â"˜                                          â"'
â"'       â†"                                                â"'
â"'  â"Œâ"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"                                          â"'
â"'  â"'   ACT    â"' ← Execute next step (tool/generation)   â"'
â"'  â""â"€â"€â"€â"€â"¬â"€â"€â"€â"€â"€â"˜                                          â"'
â"'       â†"                                                â"'
â"'  â"Œâ"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"                                          â"'
â"'  â"'  LEARN   â"' ← Evaluate result, extract insights     â"'
â"'  â""â"€â"€â"€â"€â"¬â"€â"€â"€â"€â"€â"˜                                          â"'
â"'       â†"                                                â"'
â"'  â"Œâ"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"                                          â"'
â"'  â"'   PLAN   â"' ← Update strategy based on learning     â"'
â"'  â""â"€â"€â"€â"€â"¬â"€â"€â"€â"€â"€â"˜                                          â"'
â"'       â†"                                                â"'
â"'  â"Œâ"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"                                          â"'
â"'  â"'HYPOTHESIZEâ"' ← Predict outcomes, identify risks     â"'
â"'  â""â"€â"€â"€â"€â"¬â"€â"€â"€â"€â"€â"˜                                          â"'
â"'       â†"                                                â"'
â"'  [Continue or Exit based on completion criteria]       â"'
â"'                                                         â"'
â""â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"˜
```

**RALPH Implementation:**
```
REASON:
- What is the current state?
- What is the goal state?
- What constraints apply?
- What information do I have/need?

ACT:
- Select appropriate tool/skill
- Execute with proper parameters
- Capture full output

LEARN:
- Did the action succeed?
- What unexpected results occurred?
- What new information was revealed?
- What patterns are emerging?

PLAN:
- How should strategy adjust?
- What's the optimal next step?
- Are there shortcuts now available?
- Should approach change entirely?

HYPOTHESIZE:
- What will likely happen next?
- What could go wrong?
- What assumptions am I making?
- How confident am I?
```

#### ReAct Pattern (Reasoning + Acting)

```
THOUGHT: [Internal reasoning about current state]
ACTION: [Tool call or generation action]
OBSERVATION: [Result of the action]
... repeat ...
THOUGHT: [Final reasoning]
ANSWER: [Final output]
```

**When to Use ReAct:**
- Simple tool-use tasks
- Linear problem solving
- When you need clear audit trail

#### ReWOO Pattern (Reason Without Observation)

```
PLAN:
- Step 1: [action] â†' [expected_output_variable]
- Step 2: [action using variable] â†' [next_variable]
- Step 3: [action using variables] â†' [final_output]

EXECUTE:
- Run all steps
- Collect all outputs

SYNTHESIZE:
- Combine outputs
- Generate final answer
```

**When to Use ReWOO:**
- When planning is more efficient than iterating
- Parallel execution opportunities
- Reduced latency requirements

#### Reflexion Pattern (Self-Correction)

```
â"Œâ"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"
â"'            REFLEXION LOOP               â"'
â"œâ"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"¤
â"'                                         â"'
â"'  ATTEMPT â†' EVALUATE â†' REFLECT â†' RETRY   â"'
â"'     â†'                              â"'    â"'
â"'     â""â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"˜    â"'
â"'                                         â"'
â""â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"˜

ATTEMPT:
- Execute task with current approach

EVALUATE:
- Score the output (0-10)
- Identify specific failures
- Note what worked well

REFLECT:
- Why did failures occur?
- What would fix them?
- What should change?

RETRY:
- Implement improvements
- Execute again
- Compare to previous attempt
```

#### Tree of Thought (Branching Reasoning)

```
                    [Problem]
                        â"'
          â"Œâ"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"¼â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"
          â†"             â†"             â†"
      [Path A]      [Path B]      [Path C]
       Score:8       Score:6       Score:9
          â"'             ✠-              â"'
     â"Œâ"€â"€â"€â"€â"´â"€â"€â"€â"€â"              â"Œâ"€â"€â"€â"€â"€â"€â"€â"´â"€â"€â"€â"€â"€â"€â"€â"
     â†"         â†"              â†"               â†"
  [A.1]     [A.2]          [C.1]           [C.2]
  Score:7   Score:9        Score:8         Score:10
              â"'                               â"'
              â†"                               â†"
         [Continue]                    [Best Solution]
```

**When to Use Tree of Thought:**
- Complex problems with multiple valid approaches
- When you need to explore alternatives
- High-stakes decisions requiring validation

#### OODA Loop (Observe-Orient-Decide-Act)

```
OBSERVE: Gather information about current state
ORIENT: Analyze and synthesize observations
DECIDE: Choose course of action
ACT: Execute the decision
... repeat with new observations ...
```

**When to Use OODA:**
- Dynamic environments
- Real-time adaptation needed
- Adversarial or competitive scenarios

### Loop Selection Guide

| Scenario | Recommended Loop | Why |
|----------|------------------|-----|
| General complex task | RALPH | Balanced reasoning + learning |
| Simple tool use | ReAct | Clear, auditable |
| Multi-step planning | ReWOO | Efficient execution |
| Quality-critical output | Reflexion | Self-correction |
| Exploring solutions | Tree of Thought | Multiple paths |
| Dynamic/changing input | OODA | Adaptive |
| Research/investigation | RALPH + Reflexion | Depth + correction |

### Loop Execution Bounds

**Critical: All loops MUST have bounds**

```
LOOP_BOUNDS:
  max_iterations: 10          # Hard stop
  max_time: 300               # Seconds
  max_cost: 1.00              # API cost limit
  exit_conditions:
    - task_complete: true
    - confidence: > 0.95
    - no_progress_iterations: 3
  escalation:
    - at_iteration: 7 â†' warn user
    - at_iteration: 10 â†' stop and summarize
```

### Quality Gates for Reasoning

```
□ Loop pattern selected and documented
□ Bounds configured (iterations, time, cost)
□ Exit conditions defined
□ Progress tracked per iteration
□ Self-evaluation implemented
□ Escalation path defined
□ Audit trail maintained
□ Final confidence score provided
```

### Agentic Prompt Hook  -  Reasoning Loops

```
You are executing with structured reasoning loops. For complex tasks:

1. LOOP SELECTION
   - Assess task complexity
   - Select appropriate loop pattern
   - Configure bounds and exit conditions

2. LOOP INITIALIZATION
   - Document starting state
   - Define success criteria
   - Set iteration counter to 0

3. LOOP EXECUTION (example: RALPH)
   
   ITERATION {n}:
   
   REASON: [Analyze current state vs goal]
   
   ACT: [Execute next step]
   
   LEARN: [Evaluate result, extract insights]
   
   PLAN: [Adjust strategy]
   
   HYPOTHESIZE: [Predict next iteration outcome]
   
   CHECK: [Exit conditions met?]
   - If yes â†' proceed to output
   - If no â†' continue to iteration {n+1}
   - If bounds exceeded â†' escalate/summarize

4. LOOP TERMINATION
   - Document final state
   - Provide confidence score
   - Summarize key learnings
   - Present output

5. OUTPUT REQUIREMENTS
   - Loop execution trace available
   - Confidence score: X/10
   - Iterations used: N of max
   - Quality gates: passed/failed
```

### Cross-Category Dependencies
- **â†' Category 30** (Agents)  -  Agent execution
- **â†' Category 31B** (Skills)  -  Skill invocation
- **â†' Category 35** (Safety)  -  Bounded execution
- **â†' Category 31D** (Prompts)  -  Prompt patterns

---

## Category 31D: Prompt Engineering Patterns

### Scope
Prompt architecture, system prompts, few-shot patterns, chain of thought, constitutional patterns, prompt optimization.

### Prompt Architecture Layers

```
â"Œâ"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"
â"'                  PROMPT ARCHITECTURE                    â"'
â"œâ"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"¤
â"'                                                         â"'
â"'  â"Œâ"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"   â"'
â"'  â"'              SYSTEM PROMPT LAYER                â"'   â"'
â"'  â"'  - Identity and role                            â"'   â"'
â"'  â"'  - Core capabilities                            â"'   â"'
â"'  â"'  - Constraints and boundaries                   â"'   â"'
â"'  â"'  - Output format defaults                       â"'   â"'
â"'  â""â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"˜   â"'
â"'                         â†"                               â"'
â"'  â"Œâ"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"   â"'
â"'  â"'              CONTEXT LAYER                      â"'   â"'
â"'  â"'  - Retrieved documents (RAG)                    â"'   â"'
â"'  â"'  - Conversation history                         â"'   â"'
â"'  â"'  - User preferences/memory                      â"'   â"'
â"'  â"'  - Skill instructions                           â"'   â"'
â"'  â""â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"˜   â"'
â"'                         â†"                               â"'
â"'  â"Œâ"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"   â"'
â"'  â"'              INSTRUCTION LAYER                  â"'   â"'
â"'  â"'  - Task-specific instructions                   â"'   â"'
â"'  â"'  - Few-shot examples                            â"'   â"'
â"'  â"'  - Output format requirements                   â"'   â"'
â"'  â"'  - Quality criteria                             â"'   â"'
â"'  â""â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"˜   â"'
â"'                         â†"                               â"'
â"'  â"Œâ"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"   â"'
â"'  â"'              USER INPUT LAYER                   â"'   â"'
â"'  â"'  - The actual user request                      â"'   â"'
â"'  â"'  - Attached files/images                        â"'   â"'
â"'  â"'  - Clarifications                               â"'   â"'
â"'  â""â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"˜   â"'
â"'                                                         â"'
â""â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"˜
```

### Core Prompt Patterns

#### Chain of Thought (CoT)
```
Let's work through this step by step:

Step 1: [First reasoning step]
Step 2: [Second reasoning step]
Step 3: [Third reasoning step]
...
Therefore: [Conclusion]
```

**Trigger phrases:**
- "Let's think step by step"
- "Let's work through this"
- "Let me break this down"

#### Zero-Shot Chain of Thought
```
[Question]

Let's approach this step by step.
```
*Simply adding "Let's think step by step" improves reasoning*

#### Few-Shot Prompting
```
Here are some examples:

Example 1:
Input: [example input 1]
Output: [example output 1]

Example 2:
Input: [example input 2]
Output: [example output 2]

Now, for the actual task:
Input: [actual input]
Output:
```

#### Self-Consistency
```
Generate 5 different approaches to this problem.
For each approach, show your reasoning.
Then, identify which answer appears most frequently 
or has the strongest reasoning.
```

#### Constitutional Pattern
```
You must always:
1. [Constraint 1]
2. [Constraint 2]
3. [Constraint 3]

You must never:
1. [Prohibition 1]
2. [Prohibition 2]

If asked to violate these, explain why you cannot.
```

#### Persona Pattern
```
You are [specific role/expert].

Your expertise includes:
- [Domain 1]
- [Domain 2]

Your communication style is:
- [Style attribute 1]
- [Style attribute 2]

Respond as this persona would.
```

#### Structured Output Pattern
```
Respond in the following JSON format:
{
  "analysis": "your analysis here",
  "recommendation": "your recommendation",
  "confidence": 0.0-1.0,
  "reasoning": ["step1", "step2", "step3"]
}

Only output valid JSON, no other text.
```

#### Decomposition Pattern
```
Break this complex task into subtasks:

1. First, identify [component 1]
2. Then, analyze [component 2]
3. Next, evaluate [component 3]
4. Finally, synthesize into [final output]

Execute each subtask before moving to the next.
```

#### Verification Pattern
```
After generating your response:

1. Review for accuracy
2. Check for completeness
3. Verify logical consistency
4. Confirm format compliance

If any issues found, revise before presenting.
```

### System Prompt Template

```markdown
# System Prompt Template

## Identity
You are [name/role], a [description of capabilities].

## Core Capabilities
You can:
- [Capability 1]
- [Capability 2]
- [Capability 3]

You have access to:
- [Tool/Resource 1]
- [Tool/Resource 2]

## Behavioral Guidelines
- [Guideline 1]
- [Guideline 2]
- [Guideline 3]

## Output Standards
- [Standard 1]
- [Standard 2]
- [Standard 3]

## Constraints
You must not:
- [Constraint 1]
- [Constraint 2]

## When Uncertain
If uncertain, [specific guidance on handling uncertainty]

## Error Handling
If something goes wrong, [specific guidance]
```

### Prompt Pattern Selection Guide

| Need | Pattern | Example Trigger |
|------|---------|-----------------|
| Complex reasoning | Chain of Thought | "Explain your reasoning" |
| Consistent format | Structured Output | "Return as JSON" |
| Expert knowledge | Persona | "As a [role]..." |
| Multiple solutions | Self-Consistency | "Give me 3 approaches" |
| Task breakdown | Decomposition | "Break this into steps" |
| Quality assurance | Verification | "Double-check your work" |
| Behavior control | Constitutional | "Never do X" |
| Learning from examples | Few-Shot | "Here are examples..." |

### Prompt Optimization Techniques

| Technique | Description |
|-----------|-------------|
| **Specificity** | More specific prompts yield better results |
| **Positive framing** | Say what TO do, not just what NOT to do |
| **Examples** | Show don't tell when possible |
| **Structure** | Use clear formatting, headers, lists |
| **Context** | Provide relevant background information |
| **Constraints** | Define boundaries clearly |
| **Output format** | Specify exactly what format you want |
| **Iteration** | Refine prompts based on outputs |

### Quality Gates for Prompts

```
□ Prompt has clear objective
□ Instructions are unambiguous
□ Output format specified
□ Examples provided (if few-shot)
□ Constraints defined
□ Error handling addressed
□ Edge cases considered
□ Prompt tested with variations
□ Token efficiency optimized
□ Version controlled
```

### Agentic Prompt Hook  -  Prompt Engineering

```
You are crafting prompts for optimal output. For each prompt:

1. OBJECTIVE CLARITY
   - What is the exact desired outcome?
   - What format should the output take?
   - What constraints apply?

2. PATTERN SELECTION
   - Does this need step-by-step reasoning? â†' CoT
   - Does this need examples? â†' Few-Shot
   - Does this need multiple attempts? â†' Self-Consistency
   - Does this need expert voice? â†' Persona
   - Does this need structure? â†' Structured Output

3. PROMPT CONSTRUCTION
   - Clear instruction first
   - Context and background
   - Examples if needed
   - Output format specification
   - Constraints and boundaries

4. PROMPT VALIDATION
   - Is it unambiguous?
   - Could it be misinterpreted?
   - Are edge cases handled?

5. OUTPUT REQUIREMENTS
   - Prompt achieves objective
   - Output is consistent
   - Format is correct
   - Quality is acceptable
```

### Cross-Category Dependencies
- **â†' Category 29** (RAG)  -  Context injection
- **â†' Category 30** (Agents)  -  Agent prompting
- **â†' Category 31C** (Reasoning)  -  Reasoning prompts
- **â†' Category 35** (Safety)  -  Safety prompts

---

## Category 31E: Memory Architecture

### Scope
Working memory, episodic memory, semantic memory, procedural memory, memory retrieval, memory consolidation.

### Memory Type Taxonomy

```
â"Œâ"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"
â"'                 MEMORY ARCHITECTURE                     â"'
â"œâ"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"¤
â"'                                                         â"'
â"'  â"Œâ"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"   â"'
â"'  â"'            WORKING MEMORY                       â"'   â"'
â"'  â"'  - Current context window                       â"'   â"'
â"'  â"'  - Active scratchpad                            â"'   â"'
â"'  â"'  - Immediate task state                         â"'   â"'
â"'  â"'  Capacity: Limited (context window)             â"'   â"'
â"'  â"'  Duration: Current session                      â"'   â"'
â"'  â""â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"˜   â"'
â"'                         â†'â†"                              â"'
â"'  â"Œâ"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"   â"'
â"'  â"'            EPISODIC MEMORY                      â"'   â"'
â"'  â"'  - Conversation history                         â"'   â"'
â"'  â"'  - Past interactions                            â"'   â"'
â"'  â"'  - Specific events and outcomes                 â"'   â"'
â"'  â"'  Storage: Vector DB, conversation logs          â"'   â"'
â"'  â"'  Retrieval: Semantic search, recency            â"'   â"'
â"'  â""â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"˜   â"'
â"'                         â†'â†"                              â"'
â"'  â"Œâ"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"   â"'
â"'  â"'            SEMANTIC MEMORY                      â"'   â"'
â"'  â"'  - Facts and knowledge                          â"'   â"'
â"'  â"'  - Concepts and relationships                   â"'   â"'
â"'  â"'  - User preferences and profile                 â"'   â"'
â"'  â"'  Storage: Knowledge graphs, embeddings          â"'   â"'
â"'  â"'  Retrieval: Entity lookup, graph traversal      â"'   â"'
â"'  â""â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"˜   â"'
â"'                         â†'â†"                              â"'
â"'  â"Œâ"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"   â"'
â"'  â"'           PROCEDURAL MEMORY                     â"'   â"'
â"'  â"'  - How to do things                             â"'   â"'
â"'  â"'  - Skill execution patterns                     â"'   â"'
â"'  â"'  - Successful approaches                        â"'   â"'
â"'  â"'  Storage: Skill manifests, pattern library      â"'   â"'
â"'  â"'  Retrieval: Task matching, skill lookup         â"'   â"'
â"'  â""â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"˜   â"'
â"'                                                         â"'
â""â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"˜
```

### Memory Implementation Patterns

#### Working Memory Management
```python
# Working memory structure
working_memory = {
    "current_task": "...",
    "task_state": "in_progress",
    "scratchpad": [],
    "active_context": [],
    "loop_iteration": 0,
    "intermediate_results": {}
}

# Scratchpad operations
def add_to_scratchpad(item):
    working_memory["scratchpad"].append(item)
    
def get_scratchpad():
    return working_memory["scratchpad"]
    
def clear_scratchpad():
    working_memory["scratchpad"] = []
```

#### Episodic Memory Retrieval
```python
# Retrieve relevant past conversations
def retrieve_episodes(query, k=5):
    # Semantic search over conversation history
    results = vector_db.search(
        query=embed(query),
        collection="conversations",
        top_k=k,
        filters={"user_id": current_user}
    )
    return results

# Store new episode
def store_episode(conversation):
    vector_db.insert(
        collection="conversations",
        document=conversation,
        embedding=embed(conversation),
        metadata={
            "timestamp": now(),
            "user_id": current_user,
            "outcome": conversation.outcome
        }
    )
```

#### Semantic Memory Structure
```python
# Knowledge graph structure
semantic_memory = {
    "entities": {
        "user_preferences": {...},
        "domain_knowledge": {...},
        "relationships": {...}
    },
    "facts": [
        {"subject": "...", "predicate": "...", "object": "..."}
    ]
}

# Fact retrieval
def get_facts_about(entity):
    return [f for f in semantic_memory["facts"] 
            if f["subject"] == entity or f["object"] == entity]
```

#### Procedural Memory (Skills)
```python
# Skill pattern matching
def find_applicable_skills(task_description):
    skills = []
    for skill in skill_registry:
        if skill.matches(task_description):
            skills.append(skill)
    return sorted(skills, key=lambda s: s.confidence)

# Record successful procedure
def remember_procedure(task, approach, outcome):
    if outcome.success:
        procedural_memory.store({
            "task_pattern": task.pattern,
            "approach": approach,
            "success_rate": update_success_rate(task, approach)
        })
```

### Memory Retrieval Strategies

| Strategy | When to Use | Implementation |
|----------|-------------|----------------|
| **Recency** | Recent context matters most | Sort by timestamp, decay weight |
| **Relevance** | Semantic similarity needed | Vector similarity search |
| **Importance** | Critical facts needed | Importance scoring, pinned items |
| **Frequency** | Common patterns | Access count tracking |
| **Contextual** | Situation-specific | Multi-factor retrieval |

### Memory Consolidation

```
CONSOLIDATION PROCESS:

1. WORKING â†' EPISODIC
   - After task completion
   - Store conversation + outcome
   - Tag with metadata

2. EPISODIC â†' SEMANTIC
   - Extract recurring facts
   - Update user model
   - Identify patterns

3. EPISODIC â†' PROCEDURAL
   - Successful approaches â†' skills
   - Failed approaches â†' anti-patterns
   - Update success rates
```

### Quality Gates for Memory

```
□ Working memory bounded (context limits)
□ Episodic retrieval tested
□ Semantic facts validated
□ Procedural patterns documented
□ Memory retrieval latency acceptable
□ Privacy-sensitive data handled
□ Memory decay/forgetting implemented
□ Consolidation process defined
□ Memory conflicts resolved
□ User control over memory
```

### Agentic Prompt Hook  -  Memory Systems

```
You are operating with a structured memory system:

1. WORKING MEMORY (Current Session)
   - Maintain scratchpad for intermediate results
   - Track current task state
   - Store loop iteration data

2. EPISODIC MEMORY (Past Conversations)
   - Retrieve relevant past interactions
   - Use conversation_search tool when needed
   - Consider past outcomes for similar tasks

3. SEMANTIC MEMORY (Facts & Knowledge)
   - Recall user preferences
   - Apply known facts
   - Use userMemories context

4. PROCEDURAL MEMORY (Skills)
   - Check /mnt/skills for applicable skills
   - Apply successful patterns from past
   - Avoid previously failed approaches

5. MEMORY HYGIENE
   - Don't hallucinate memories
   - Verify retrieved memories are relevant
   - Update memory after successful tasks
   - Respect user memory controls
```

### Cross-Category Dependencies
- **â†' Category 16** (Vector DB)  -  Embedding storage
- **â†' Category 26** (Graphs)  -  Knowledge graphs
- **â†' Category 29** (RAG)  -  Retrieval patterns
- **â†' Category 31B** (Skills)  -  Procedural memory

---

# UPDATED APPENDIX: COMPLETE CATEGORY REFERENCE

## All Categories Including v2.0 Additions

| # | Category | Tier | Status |
|---|----------|------|--------|
| 1 | Web Applications | Build Targets | v1.0 |
| 2 | Mobile Applications | Build Targets | v1.0 |
| 3 | Desktop Applications | Build Targets | v1.0 |
| 4 | Websites & Landing Pages | Build Targets | v1.0 |
| 5 | Generative & Immersive Web | Build Targets | v1.0 |
| 6 | Operating Systems & Embedded | Build Targets | v1.0 |
| 7 | Browser Extensions & Plugins | Build Targets | v1.0 |
| 8 | APIs & Backend Services | Compute | v1.0 |
| 9 | Edge Computing & CDN | Compute | v1.0 |
| 10 | Serverless Functions | Compute | v1.0 |
| 11 | GPU & ML Compute | Compute | v1.0 |
| 12 | Container Orchestration | Compute | v1.0 |
| 13 | Infrastructure as Code | Compute | v1.0 |
| 14 | Platform Engineering | Compute | v1.0 |
| 15 | Relational Databases | Data | v1.0 |
| 16 | Vector Databases & Semantic Search | Data | v1.0 |
| 17 | Document & NoSQL Databases | Data | v1.0 |
| 18 | Local-First & Offline Databases | Data | v1.0 |
| 19 | Object Storage & File Systems | Data | v1.0 |
| 20 | Data Warehousing & Analytics | Data | v1.0 |
| 21 | Search Engines | Data | v1.0 |
| 22 | Caching & Performance | AI Systems | v1.0 |
| 23 | Message Queues & Event Streaming | AI Systems | v1.0 |
| 24 | Real-Time & WebSockets | AI Systems | v1.0 |
| 25 | Scheduled Jobs & Cron | AI Systems | v1.0 |
| 26 | Graph Processing & Knowledge | AI Systems | v1.0 |
| 27 | Data Transformation & ETL | AI Systems | v1.0 |
| 28 | Feature Stores & ML Data | AI Systems | v1.0 |
| 29 | Agentic RAG Systems | AI Systems | v1.0 |
| 30 | Autonomous Agents | AI Systems | v1.0 |
| 31 | MCPs & Tool Registries | AI Systems | v1.0 |
| 31B | **Skills & Capability Packaging** | **AI Systems** | **v2.0 NEW** |
| 31C | **Agentic Reasoning Loops** | **AI Systems** | **v2.0 NEW** |
| 31D | **Prompt Engineering Patterns** | **AI Systems** | **v2.0 NEW** |
| 31E | **Memory Architecture** | **AI Systems** | **v2.0 NEW** |
| 32 | Model Fine-Tuning & Training | AI Systems | v1.0 |
| 33 | Model Serving & Inference | AI Systems | v1.0 |
| 34 | LLM Routing & Orchestration | AI Systems | v1.0 |
| 35 | AI Safety & Guardrails | AI Systems | v1.0 |
| 36 | Image Generation | Content | v1.0 |
| 37 | Audio Generation | Content | v1.0 |
| 38 | Video Generation & Processing | Content | v1.0 |
| 39 | Document Generation | Content | v1.0 |
| 40 | Code Generation | Content | v1.0 |
| 41 | Data & Content Generation | Content | v1.0 |
| 42 | Translation & Localization | Content | v1.0 |
| 43 | CI/CD Pipelines | Automation | v1.0 |
| 44 | Workflow Orchestration | Automation | v1.0 |
| 45 | Browser & Web Automation | Automation | v1.0 |
| 46 | Testing & Quality Assurance | Automation | v1.0 |
| 47 | Conversational & Voice Interfaces | Automation | v1.0 |
| 48 | Documentation Systems | Automation | v1.0 |
| 49 | Dashboards & Internal Tools | Automation | v1.0 |
| 50 | Authentication & Identity | Foundation | v1.0 |
| 51 | Payments & Billing | Foundation | v1.0 |
| 52 | Security & Encryption | Foundation | v1.0 |
| 53 | Secrets Management | Foundation | v1.0 |
| 54 | Analytics & Tracking | Foundation | v1.0 |
| 55 | Monitoring & Observability | Foundation | v1.0 |
| 56 | Compliance & Legal | Foundation | v1.0 |

**Total: 56 base categories + 4 v2.0 additions = 60 categories**

---

## Reasoning Loop Quick Reference

| Loop | Pattern | Best For |
|------|---------|----------|
| **RALPH** | Reasonâ†'Actâ†'Learnâ†'Planâ†'Hypothesize | General complex tasks |
| **ReAct** | Thoughtâ†'Actionâ†'Observation | Simple tool use |
| **ReWOO** | Plan allâ†'Execute allâ†'Synthesize | Parallel execution |
| **Reflexion** | Attemptâ†'Evaluateâ†'Reflectâ†'Retry | Quality-critical output |
| **Tree of Thought** | Branchâ†'Evaluateâ†'Pruneâ†'Expand | Exploring solutions |
| **OODA** | Observeâ†'Orientâ†'Decideâ†'Act | Dynamic environments |

---

## Skill Manifest Quick Template

```json
{
  "name": "skill-name",
  "version": "1.0.0",
  "description": "What this skill does",
  "category": "document|code|integration|reasoning|generation",
  "dependencies": [],
  "tools_required": [],
  "quality_gates": [],
  "agentic_hooks": {
    "invoke": "hooks/invoke.md"
  }
}
```

---

## Memory Type Quick Reference

| Memory Type | Storage | Retrieval | Duration |
|-------------|---------|-----------|----------|
| **Working** | Context window | Immediate | Session |
| **Episodic** | Vector DB | Semantic search | Persistent |
| **Semantic** | Knowledge graph | Entity lookup | Persistent |
| **Procedural** | Skill manifests | Task matching | Persistent |

---

## Prompt Pattern Quick Reference

| Pattern | Trigger | Use Case |
|---------|---------|----------|
| **Chain of Thought** | "step by step" | Complex reasoning |
| **Few-Shot** | Provide examples | Pattern learning |
| **Self-Consistency** | "multiple approaches" | Validation |
| **Persona** | "as a [role]" | Expert voice |
| **Structured Output** | "return as JSON" | Parsing needed |
| **Constitutional** | "never/always" | Behavior control |

---

# UPDATED VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | January 2026 | Initial 56-category framework |
| **2.0** | **January 2026** | **Added: Skills (31B), Reasoning Loops (31C), Prompt Patterns (31D), Memory Architecture (31E)** |

---
## Appendix: GTM Roadmap
Pre-launch polish (1-2 weeks), GitHub release v1.0, X threads (#AIBuilders), Reddit posts (r/ClaudeAI), Dev.to articles.

---

# FRAMEWORK INTEGRATION POINTS

## Where Your Personal Frameworks Can Integrate

The following sections are designed as **extension points** where custom frameworks, methodologies, or domain-specific patterns can be integrated:

### Extension Point 1: Custom Skills
**Location:** Category 31B  -  Skills & Capability Packaging
**How to Integrate:** Create skill manifests in `/mnt/skills/user/` following the skill architecture defined. Your personal frameworks become invocable skills.

### Extension Point 2: Custom Reasoning Patterns
**Location:** Category 31C  -  Agentic Reasoning Loops
**How to Integrate:** Define your reasoning methodology using the loop template. Add to the Loop Selection Guide.

### Extension Point 3: Custom Prompt Libraries
**Location:** Category 31D  -  Prompt Engineering Patterns
**How to Integrate:** Add your prompt patterns to the pattern library. Document trigger phrases and use cases.

### Extension Point 4: Domain-Specific Categories
**Location:** Any Tier where your domain fits
**How to Integrate:** Create new category following the established template:
- Scope definition
- Exhaustive technology stack
- Quality gates
- Agentic prompt hook
- Cross-category dependencies

### Extension Point 5: Build Pattern Templates
**Location:** Framework Usage Guide â†' Build Pattern Templates
**How to Integrate:** Define your project archetypes as category combinations with required quality gates.

---

## North Star Blueprint Integration

This Master Build Framework pairs with the **North Star Blueprint v6.0** for complete coverage:

| This Framework Provides | North Star Provides |
|-------------------------|---------------------|
| Technology options (WHAT) | Methodology (HOW) |
| Tool matrices | Quality gates & standards |
| Stack selection | Confidence calibration |
| Build patterns | Context engineering |
| Reasoning loop definitions | Handoff protocols |
| Skill manifest templates | Load balancing strategies |

**Key NS Sections for MBF Users:**
- **NS Section 0:** Agentic Bootstrap Protocol  -  How to start
- **NS Section 17:** Confidence Calibration  -  When to escalate
- **NS Section 18:** Autonomy Dial  -  Setting control level
- **NS Section 23:** Handoff Protocols  -  Session continuity
- **NS Part IV:** AI Orchestration  -  Complete agent methodology

**Navigation:** Use **BRIDGE.md** to route between frameworks efficiently.

---

*End of Framework v2.0  -  January 2026*
*Patched with Skills, Reasoning, Prompts, Memory Architecture*
*Part of the unified NS + MBF ecosystem  -  see BRIDGE.md for navigation*


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
