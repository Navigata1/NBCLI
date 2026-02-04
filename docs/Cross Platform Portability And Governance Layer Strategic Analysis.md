# MBF Cross-Platform Portability & Governance Layer Strategic Analysis

## Executive Summary

**Bottom Line Up Front**: The Model Behavior Framework can serve as a portable governance layer across major AI coding tools, but success requires strategic format decisions and careful positioning. Cross-platform portability is achievable because **all eight priority tools support Markdown-based instructions**—the variance lies in file naming, directory structures, and activation mechanisms rather than fundamental incompatibility. The market timing is favorable: MCP has emerged as the universal tool integration standard, yet **no comprehensive "responsible autonomy" or "confidence calibration" framework exists**, representing significant whitespace for MBF.

### Key findings on cross-platform portability

All researched tools—Claude Code, Cline, Roo Code, Kilo Code, Cursor, Windsurf, Codex, and emerging tools like Gemini CLI and Continue—consume rules through Markdown files with tool-specific naming conventions. The architectural barriers are manageable: file location differences (.cursor/rules/ vs .claude/ vs AGENTS.md at root) require adapter scripts but not fundamental redesign. **MCP support is now table stakes** across every major tool, enabling a potential MCP-based governance server that could enforce rules universally.

The HOW + WHAT separation that MBF proposes maps cleanly to existing tool architectures. Tools already distinguish between behavioral instructions (system prompts, persona definitions) and implementation rules (coding standards, tech stack preferences). Roo Code's mode system (Architect, Code, Debug, Orchestrator) and Kilo Code's AGENTS.md hierarchy demonstrate industry movement toward this separation.

### Recommended format and structure for maximum portability

**Primary format**: Markdown with YAML frontmatter for metadata. This combination works natively in Cursor (.mdc files), translates directly to Claude's CLAUDE.md and Codex's AGENTS.md, and requires minimal transformation for Windsurf and Cline.

**Recommended file structure**:
```
project/
├── AGENTS.md                    # Universal (Codex native, others compatible)
├── .mbf/
│   ├── methodology.md           # HOW layer (behavioral governance)
│   ├── implementation.md        # WHAT layer (coding standards)
│   ├── security.md              # Security rules bundle
│   └── compliance/
│       ├── soc2.md
│       └── hipaa.md
├── .cursor/rules/mbf.mdc        # Generated: Cursor adapter
├── CLAUDE.md                    # Generated: Claude Code adapter
└── .mcp.json                    # MCP governance server config
```

**Translation layer**: Build CLI tooling that generates tool-specific configurations from canonical MBF files. This "compile once, deploy everywhere" approach mirrors successful cross-platform strategies.

### Strategic positioning recommendations

**Position MBF as "the methodology layer" that sits above MCP** (tool integration) and Agent Spec (orchestration execution). The market shows strong demand for governance without adequate supply—95% of IT leaders cite security concerns about AI code, yet only 16% report robust governance practices.

**Avoid "governance" language in developer-facing communications**. Research shows developers flee constraints perceived as friction. Instead, position as:
- "Guardrails that make you faster" 
- "Best practices that ship with your repo"
- "Write better AI code, automatically"

**Enterprise messaging can be direct about compliance value**—security and audit features should be prominently positioned for enterprise buyers who have explicit governance mandates.

### Go/no-go assessment

**GO** with the following conditions:

The strategic opportunity is compelling: no competitor addresses the methodology governance layer specifically, existing rules ecosystems are fragmented across tools, and enterprise demand for AI coding governance is documented and growing. The technical barriers are surmountable—all tools accept Markdown, MCP provides a universal integration path, and the rules file paradigm is established.

**Critical success factors**:
1. Achieve immediate perceived value—developers must see benefit within five minutes of adoption
2. Open source the core framework (recommend CC0 license like awesome-cursorrules)
3. Build adapters for the top three tools (Cursor, Claude Code, Copilot) at launch
4. Include security/compliance rule bundles as differentiated value
5. Position methodology governance as enabling autonomy, not restricting it

**Risk factors to monitor**: Tool vendors adding governance features natively (Cursor's team rules, GitHub's organization policies), rapid MCP evolution changing integration patterns, and developer backlash if governance is perceived as bureaucratic overhead.

---

## Full Technical Analysis

### Tool architecture breakdown with configuration specifications

The eight priority tools can be categorized into three architectural patterns based on how they consume configuration:

**Pattern A: Markdown-centric (Claude Code, Cline, Windsurf, Codex)**

These tools use Markdown files as the primary instruction mechanism with hierarchical discovery. Claude Code exemplifies this pattern most thoroughly:

| Tool | Primary File | Secondary Files | Global Location | MCP Config |
|------|--------------|-----------------|-----------------|------------|
| Claude Code | CLAUDE.md | .claude/commands/*.md | ~/.claude/CLAUDE.md | .mcp.json |
| Cline | .clinerules | .clinerules/*.md | VS Code settings | cline_mcp_settings.json |
| Windsurf | .windsurf/rules/*.md | .windsurfrules (legacy) | global_rules.md | mcp_config.json |
| Codex | AGENTS.md | AGENTS.override.md | ~/.codex/AGENTS.md | config.toml (MCP section) |

**Claude Code** implements the most sophisticated hierarchy: managed (enterprise) → project (CLAUDE.md) → local (CLAUDE.local.md) → user (~/.claude/CLAUDE.md). Instructions cascade with explicit override patterns. The .claude/commands/ directory enables custom slash commands with $ARGUMENTS parameter passing. Context windows extend to **1 million tokens** on Sonnet, making extensive methodology documentation viable.

**Cline** distinguishes between Plan Mode (strategic thinking) and Act Mode (implementation), allowing different model selections per mode. The Memory Bank system persists structured context across sessions through markdown files (projectBrief.md, activeContext.md, progress.md, decisionLog.md). This architecture directly supports MBF's HOW/WHAT separation—methodology could inform Plan Mode while implementation rules guide Act Mode.

**Windsurf** uniquely features an automatic memory system where Cascade creates and retrieves context without explicit configuration. Rules have a **12,000 character limit per file**, requiring concise instruction design. Enterprise deployments support system-level rules at OS-specific paths that cannot be modified by end users—ideal for mandatory governance enforcement.

**Codex** uses TOML for configuration alongside Markdown instructions, with the most explicit organizational control through requirements.toml that can enforce policy constraints (e.g., prohibiting approval_policy = "never"). The AGENTS.md discovery walks from repo root to current directory, concatenating files up to **32KB by default** (configurable to 64KB+).

**Pattern B: Structured configuration (Cursor, Roo Code, Kilo Code)**

These tools combine Markdown content with structured metadata for activation control:

**Cursor** pioneered the MDC (Markdown Cursor) format with YAML frontmatter:
```markdown
---
description: "TypeScript best practices"
globs: ["*.ts", "src/**/*.tsx"]
alwaysApply: false
---
# Rule content here
```

Activation modes (Always, Auto Attached via glob, Agent Requested, Manual via @mention) provide fine-grained control. The **200k token context window** is expandable via Max Mode. Enterprise features include Team Rules managed from dashboard, Hooks for pre/post-execution control, and comprehensive audit logging with 19 event types. SOC 2 Type II certification exists.

**Roo Code** excels at mode-based configuration with built-in modes (Code, Architect, Ask, Debug, Orchestrator) and custom modes defined in YAML:
```yaml
customModes:
  - slug: governance-review
    name: 🛡️ Governance Review
    roleDefinition: You are a governance specialist...
    groups:
      - read
      - - edit
        - fileRegex: \.(md|mdx)$
```

Tool restrictions via fileRegex patterns and the Boomerang task delegation system (new_task, switch_mode tools) enable sophisticated orchestration. This architecture maps naturally to MBF's methodology layer—a "Governance Review" mode could enforce methodology compliance before code generation modes.

**Kilo Code** explicitly adopted the **AGENTS.md standard** as a universal configuration while maintaining its own .kilocode/ hierarchy. Rules priority descends from mode-specific → project → AGENTS.md → global → user settings. The CLI supports autonomous operation (--auto) and parallel agent execution (--parallel), with JSON output for CI/CD integration.

**Pattern C: CLI-first with context files (Gemini CLI, Aider, Continue)**

**Gemini CLI** mirrors Claude Code's approach with GEMINI.md as the authoritative instruction file. Built-in tools include codebase_investigator, Google Search integration, and web fetch. Rate limits (60 requests/minute, 1,000/day on free tier) may constrain heavy governance checking. Google Cloud integration provides enterprise controls.

**Aider** uses .aider.conf.yml (YAML) without a dedicated instruction file—methodology must be embedded in configuration or passed via prompt. Deep git integration with automatic commits provides an audit trail but lacks native governance mechanisms. The two-model Architect mode (reasoning + generation) aligns with MBF's HOW/WHAT separation.

**Continue** uses .continue/agents/*.md for agent definitions with JSON/YAML configuration. Background agent capability and PR review automation through GitHub Actions provide CI/CD governance integration paths. The open-source model (Apache 2.0, Y Combinator backed) makes it receptive to external governance frameworks.

### Cross-platform compatibility matrix

| Feature | Claude Code | Cline | Roo Code | Kilo Code | Cursor | Windsurf | Codex | Gemini CLI |
|---------|-------------|-------|----------|-----------|--------|----------|-------|------------|
| **Markdown Rules** | ✅ | ✅ | ✅ | ✅ | ✅ MDC | ✅ | ✅ | ✅ |
| **YAML Frontmatter** | ❌ | ❌ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ |
| **Glob Activation** | ❌ | ❌ | ✅ | ❌ | ✅ | ✅ | ❌ | ❌ |
| **Hierarchical Config** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **MCP Support** | ✅ Server+Client | ✅ Client | ✅ Client | ✅ Client | ✅ Client | ✅ Client | ✅ Server+Client | ✅ Client |
| **Mode System** | ❌ | ✅ Plan/Act | ✅ 5 modes | ✅ 5 modes | ❌ | ❌ | ❌ | ❌ |
| **Permission Rules** | ✅ Allow/Deny | ✅ Approval | ✅ fileRegex | ✅ Auto-approval | ✅ Hooks | ✅ System rules | ✅ Sandbox | ✅ Approval |
| **Enterprise Rules** | ✅ Managed | Via VS Code | Via VS Code | Via VS Code | ✅ Team Rules | ✅ System paths | ✅ requirements.toml | ✅ Cloud |
| **Char/Token Limit** | 1M context | Context bar | Intelligent | Session-based | 200k context | 12k/rule file | 32KB instructions | Quota-based |
| **Audit Logging** | Session history | ❌ | ❌ | ❌ | ✅ 19 events | Limited | ✅ OpenTelemetry | ❌ |

### Redundancy and bloat analysis framework

MBF's governance layer should distinguish between essential and expendable components based on cross-platform compatibility and value delivery:

**Essential (include in all deployments)**:
- Core methodology principles (behavioral guardrails, autonomy calibration)
- Security rules baseline (OWASP LLM Top 10 mitigations)
- Permission boundary definitions
- Human-in-the-loop escalation triggers

**Valuable but tool-dependent (include via adapters)**:
- Glob-based activation patterns (Cursor, Windsurf, Roo Code only)
- Mode-specific instructions (Roo Code, Kilo Code, Cline)
- YAML frontmatter metadata (Cursor, Roo Code, Kilo Code)
- Pre/post-execution hooks (Cursor, Claude Code, Codex)

**Expendable (avoid or minimize)**:
- Tool-specific syntax beyond Markdown
- Features requiring specific enterprise tiers
- Real-time validation requiring tool modifications
- Rules exceeding minimum character limits (12k safe threshold)

**Bloat indicators to monitor**:
- Rules file exceeding 10,000 characters (Windsurf limit impact)
- Instructions requiring more than 50 discrete rules (HumanLayer research shows ~150 instruction slots available after system prompts)
- Redundant security rules already enforced by tool defaults
- Mode definitions duplicating built-in tool modes

### Security guidelines synthesis potential

Security represents the highest-value differentiation opportunity for MBF. Research identifies critical gaps:

**AI-generated code vulnerability statistics**:
- **45% of AI-generated code** contains security flaws (Veracode 2025)
- **40% of Copilot suggestions** had vulnerabilities in academic testing
- SQL injection passes 80% of AI models; XSS passes only 14%
- "Hallucinated dependencies" create supply chain attack vectors

**Security rule bundles MBF should include**:

*Input Security Rules*:
```markdown
## Prompt Security
- NEVER include API keys, credentials, or secrets in prompts
- MASK personally identifiable information before submission
- DETECT and BLOCK prompt injection patterns
- EXCLUDE authentication, payment, and cryptographic code from AI generation
```

*Output Security Rules*:
```markdown
## Code Review Triggers
- FLAG any direct user input used in SQL queries (CWE-89)
- FLAG cryptographic implementations (CWE-327)
- REQUIRE dependency verification for all AI-suggested packages
- DETECT hallucinated package names before npm/pip install
```

*Compliance Bundles*:

**SOC 2 Bundle**: Data handling policies, access control requirements, audit logging rules, encryption standards

**HIPAA Bundle**: PHI detection and handling rules, BAA requirement checklist, de-identification standards, encryption requirements (AES-256 at rest, TLS 1.2+ transit)

**GDPR Bundle**: Consent requirements, data minimization rules, right-to-explanation support, DPIA triggers

**Standards alignment**:
- OWASP AI Exchange (300+ pages, feeds EU AI Act and ISO 27090/27091)
- NIST AI RMF 1.0 (Govern, Map, Measure, Manage functions)
- ISO/IEC 42001 (first certifiable AI management system standard)
- OpenSSF Best Practices for AI Code Assistants

### Implementation roadmap recommendations

**Phase 1: Foundation (Months 1-2)**
- Define canonical MBF Markdown specification with YAML frontmatter optional
- Build core rules library (methodology, security baseline)
- Create CLI tool for generating tool-specific adapters
- Open source under CC0 license on GitHub

**Phase 2: Tool Integration (Months 3-4)**
- Release adapters for Cursor, Claude Code, Codex (highest market share)
- Build VS Code extension for easy adoption
- Implement MCP governance server prototype
- Establish community contribution workflow

**Phase 3: Enterprise Features (Months 5-8)**
- Compliance rule bundles (SOC 2, HIPAA, GDPR)
- Enterprise configuration management (hierarchical policies)
- Audit logging and reporting integration
- Team synchronization features

**Phase 4: Ecosystem Expansion (Months 9-12)**
- Adapters for remaining tools (Windsurf, Cline, Roo Code, Kilo Code)
- CI/CD integration (GitHub Actions, GitLab CI)
- AAIF (Agentic AI Foundation) standards submission
- Partnership discussions with tool vendors

### Risk assessment and mitigation strategies

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Developer rejection as "bureaucratic" | High | Critical | Position as enablement; avoid governance language; demonstrate immediate productivity gains |
| Tool vendors building native governance | Medium | High | Establish standard before tools fragment; seek partnerships; open source makes competition irrelevant |
| MCP evolution breaking integrations | Medium | Medium | Active AAIF participation; modular architecture; rapid adapter updates |
| Enterprise sales cycle too long | Medium | Medium | PLG model with free tier; bottom-up adoption; self-serve enterprise trial |
| Format wars (AGENTS.md vs CLAUDE.md vs custom) | High | Medium | Support all formats via adapters; advocate for AAIF standardization |
| Security bundle accuracy questioned | Low | High | Partner with OWASP/NIST; transparent rule sourcing; community review |

### Tools most receptive to governance adoption

**Tier 1: Immediate opportunity**

1. **Claude Code** — Most sophisticated existing governance model with hierarchical permissions, allow/deny rules, and hooks. MBF could extend rather than replace native capabilities. Anthropic's focus on AI safety creates natural alignment.

2. **Cursor** — Largest market presence with established rules ecosystem (35,000+ stars on awesome-cursorrules). Team Rules feature demonstrates enterprise governance appetite. Enterprise plan includes compliance-focused features.

3. **Codex** — OpenAI's AGENTS.md standard aligns with portable framework concept. Sandbox policies and approval gates provide governance primitives. ChatGPT Enterprise integration creates enterprise distribution channel.

**Tier 2: Strong potential**

4. **Kilo Code** — Already adopted AGENTS.md standard; explicit rules priority hierarchy supports external governance. CLI with --auto flag creates autonomous operation context where governance matters most.

5. **Continue** — Open source (Apache 2.0), Y Combinator backed, CI/CD integration for automated governance enforcement. Agent definitions as markdown align with MBF format.

6. **Roo Code** — Mode system directly supports methodology separation; custom modes enable governance-specific personas; YAML configuration matches MBF's structured approach.

**Tier 3: Requires adaptation**

7. **Windsurf** — 12k character limit constrains detailed governance rules; automatic memory system complicates explicit methodology injection; system-level enterprise rules path enables IT-managed governance.

8. **Gemini CLI** — Google Cloud integration provides enterprise controls but GEMINI.md format is less established; rate limits may constrain real-time governance checking.

### Emerging standards integration strategy

**Model Context Protocol (MCP)** is the critical integration path. Donated to Linux Foundation's Agentic AI Foundation (AAIF) in December 2025, MCP has been adopted by OpenAI, Google, AWS, and all major AI coding tools. MBF should:

- Build an **MCP Governance Server** that exposes governance checking as MCP tools
- Tools: `check_methodology_compliance`, `validate_security_rules`, `get_permission_boundaries`
- This enables universal enforcement regardless of native tool support

**AGENTS.md** (OpenAI contribution to AAIF) provides the foundation for a portable instruction standard. MBF should:
- Adopt AGENTS.md as the canonical file name for maximum compatibility
- Extend with MBF-specific sections (methodology, security, compliance)
- Propose extensions to AAIF for standardization

**Agent Spec** (Oracle) addresses orchestration execution but not methodology governance—complementary rather than competitive. MBF could integrate with Agent Spec for multi-agent governance scenarios.

### Enterprise governance feature requirements

Based on how enterprises currently implement AI coding oversight:

**Mandatory for enterprise adoption**:
- Hierarchical policy management (org → team → project → user)
- SSO/SAML integration with identity providers
- Audit logging with SIEM export capability
- Data residency controls (regional processing options)
- Zero data retention mode for sensitive environments

**High-value differentiators**:
- Pre-built compliance bundles (SOC 2, HIPAA, GDPR, PCI-DSS)
- AI-generated code labeling and tracking
- Human-in-the-loop approval workflows for sensitive operations
- Secret/credential detection before prompt submission
- Vulnerability pattern detection in AI outputs

**Integration requirements**:
- GitHub/GitLab integration for repo-level policies
- Slack/Teams notifications for governance events
- CI/CD pipeline hooks for automated enforcement
- Dashboard for governance posture visibility

### Market positioning and go-to-market strategy

**Developer-facing positioning**: "Guardrails that make you ship faster"
- Lead with productivity and quality messaging
- Demonstrate immediate value (copy file, see better AI suggestions)
- Avoid: governance, oversight, control, restrict, compliance
- Embrace: guardrails, best practices, quality, ship faster

**Enterprise-facing positioning**: "Audit-ready AI coding governance"
- Direct messaging about compliance value
- Security as primary driver (78% cite as upgrade motivation)
- Risk mitigation for AI-generated code liability
- SOC 2/HIPAA/GDPR readiness acceleration

**Distribution strategy**:
1. GitHub repository (CC0 license) for community adoption
2. VS Code extension marketplace for easy installation
3. npm package for CLI tooling
4. Enterprise direct sales for compliance-focused features

**Pricing model** (recommended):

| Tier | Price | Features | Target |
|------|-------|----------|--------|
| Community | Free | Core rules, adapters, CLI | Individual developers |
| Pro | $29/user/month | Unlimited repos, team sync, CI/CD integration | Small teams |
| Enterprise | $99/user/month | SSO, audit logs, compliance bundles, custom policies, SLA | Organizations |

**Success metrics to track**:
- GitHub stars and forks (community adoption signal)
- VS Code extension installs
- Active repos using MBF configuration
- Enterprise leads from compliance bundle downloads
- Time to first value (target: under 5 minutes)

### Conclusion: strategic assessment

MBF occupies a viable and defensible market position as the methodology governance layer for AI coding tools. The technical foundation is solid—Markdown portability, MCP integration, and hierarchical configuration patterns work across all major tools. The market timing is favorable—MCP standardization creates a universal integration path while no competitor addresses methodology governance specifically.

**Critical success factors**:

The framework must deliver immediate, visible value without perceived friction. The awesome-cursorrules repository's 35,000+ stars demonstrate that developers will adopt configuration frameworks when the value proposition is clear and the adoption cost is minimal. MBF must match or exceed this experience—copy a file, immediately see better AI behavior.

Security and compliance bundles represent the clearest differentiation and enterprise value. With 45% of AI-generated code containing vulnerabilities and 95% of IT leaders concerned about AI code risks, pre-built security rules that translate across tools address a documented and urgent market need.

The HOW + WHAT separation aligns with emerging tool architectures. Roo Code's mode system, Cline's Plan/Act distinction, and Aider's Architect mode all demonstrate industry movement toward separating strategic reasoning from implementation execution. MBF can establish the standard vocabulary and structure for this separation.

**Final recommendation**: Proceed with development, prioritizing the open-source community release with Cursor, Claude Code, and Codex adapters. The MCP governance server should follow quickly to demonstrate universal enforcement capability. Enterprise features (compliance bundles, audit logging) provide the monetization path without gating core value that drives adoption.