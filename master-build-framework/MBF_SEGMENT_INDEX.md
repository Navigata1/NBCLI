# MASTER BUILD FRAMEWORK v2.0 — SEGMENT INDEX

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                              │
│              MASTER BUILD FRAMEWORK — 4-SEGMENT DEVELOPMENT VERSION         │
│                                                                              │
│  Purpose: Manageable chunks for enhancement work without context overload   │
│  Created: January 21, 2025                                                  │
│  Total Lines: 4,935 (segmented from monolith)                               │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## SEGMENT QUICK REFERENCE

| Segment | File | Contents | Lines | Size |
|---------|------|----------|-------|------|
| 1 | MBF_PART_1_CORE.md | Front Matter + Tier 1-2 (Cat 1-14) | 1,123 | 36KB |
| 2 | MBF_PART_2_DATA_AI.md | Tier 3-4 (Cat 15-35) | 1,140 | 26KB |
| 3 | MBF_PART_3_CONTENT_OPS.md | Tier 5-6 (Cat 36-49) | 841 | 20KB |
| 4 | MBF_PART_4_FOUNDATION.md | Tier 8 + Guides + Addendum (Cat 50-56+) | 1,870 | 57KB |

---

## BRIDGE ROUTING MAP

When BRIDGE.md references a category, use this map to find the correct segment:

| Category Range | Segment to Load |
|----------------|-----------------|
| Categories 1-14 | MBF_PART_1_CORE |
| Categories 15-35 | MBF_PART_2_DATA_AI |
| Categories 36-49 | MBF_PART_3_CONTENT_OPS |
| Categories 50-56 + Skills/RLM | MBF_PART_4_FOUNDATION |

---

## TIER BREAKDOWN BY SEGMENT

### MBF_PART_1_CORE
- **Front Matter:** Framework Overview, 56 Categories at a Glance, Dependency Matrix
- **Tier 1 (Cat 1-7):** Build Targets — Web Apps, Mobile, Desktop, Websites, Generative Web, OS/Embedded, Extensions
- **Tier 2 (Cat 8-14):** Compute & Infrastructure — APIs, Edge, Serverless, GPU/ML, Containers, IaC, Platform Engineering

### MBF_PART_2_DATA_AI
- **Tier 3 (Cat 15-21):** Data & Persistence — Relational DBs, Vector DBs, NoSQL, Local-First, Object Storage, Warehousing, Search
- **Tier 4 (Cat 22-35):** AI & Agent Systems — Caching, Queues, Real-Time, Cron, Graph Processing, ETL, Feature Stores, RAG, Agents, MCPs, Memory, Fine-Tuning, Serving, Routing, Safety

### MBF_PART_3_CONTENT_OPS
- **Tier 5 (Cat 36-42):** Content Generation — Image Gen, Audio Gen, Video Gen, Document Gen, Code Gen, Data Gen, Translation
- **Tier 6 (Cat 43-49):** Automation & DevOps — CI/CD, Workflow Orchestration, Browser Automation, Testing, Conversational, Documentation, Dashboards

### MBF_PART_4_FOUNDATION
- **Tier 8 (Cat 50-56):** Security & Foundation — Auth, Payments, Security, Secrets, Analytics, Monitoring, Compliance
- **Usage Guide:** Framework integration patterns
- **Appendix:** Quick Reference tables
- **Addendum:** Skills, Reasoning Loops (RALPH, ReAct, etc.), Prompt Architecture, Memory Systems

---

## USAGE GUIDELINES

### For Development/Enhancement Work

1. **Load only the segments you need** — Never load all 4 simultaneously
2. **Use this index for routing** — Find which segment contains your target category
3. **Edit in segments** — Make changes in the appropriate segment file
4. **Merge when distributing** — Combine all 4 for user distribution

### For Users (Runtime)

Users should receive the **merged monolith file**, not these segments.
- Segments are for OUR development context management
- Users get a single MASTER_BUILD_FRAMEWORK_v1_1.md file
- Their agents read it once and use BRIDGE routing

### To Merge Back to Monolith

```bash
# Remove segment headers (first 10 lines of each), then concatenate
for i in 1 2 3 4; do
  tail -n +11 MBF_PART_${i}_*.md
done > MASTER_BUILD_FRAMEWORK_v1_1_MERGED.md
```

---

## COMMON LOOKUP PATTERNS

| Looking For... | Load This Segment |
|----------------|-------------------|
| Web/Mobile app tools | MBF_PART_1_CORE |
| Database selection | MBF_PART_2_DATA_AI |
| AI/Agent patterns | MBF_PART_2_DATA_AI |
| RAG/LLM tools | MBF_PART_2_DATA_AI |
| Image/Audio/Video gen | MBF_PART_3_CONTENT_OPS |
| CI/CD, Testing | MBF_PART_3_CONTENT_OPS |
| Auth/Payments | MBF_PART_4_FOUNDATION |
| Security patterns | MBF_PART_4_FOUNDATION |
| Skills/RLM/Memory | MBF_PART_4_FOUNDATION |

---

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                              │
│  MBF = WHAT to build with | NS = HOW to build | BRIDGE = NAVIGATE           │
│                                                                              │
│  Development Context ≠ Runtime Context                                      │
│  Segments for US. Monolith for USERS.                                       │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```
