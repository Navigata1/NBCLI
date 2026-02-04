# MASTER BUILD FRAMEWORK v2.0 — SEGMENT 1 of 4
## MBF_PART_1_CORE
### Contents: Front Matter + Tier 1 (Cat 1-7) + Tier 2 (Cat 8-14)
### Lines: 1-1113 of original
---
> **SEGMENT NAVIGATION:** This is a development segment. For full MBF, merge all 4 parts.
> For BRIDGE routing: Categories 1-14 are in this segment.
---

# THE 56-PHASE MASTER BUILD FRAMEWORK
## v2.0 — January 2026

---

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                     PART OF A UNIFIED FRAMEWORK ECOSYSTEM                    │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  This document is ONE component of a three-part system:                     │
│                                                                              │
│  ┌─────────────┐     ┌─────────────────────┐     ┌─────────────────────┐    │
│  │  BRIDGE.md  │────►│  NORTH STAR v6.0    │     │  MASTER BUILD v2.0  │    │
│  │  Navigation │     │  Methodology        │     │  (This Document)    │    │
│  └─────────────┘     │                     │     │                     │    │
│        │             │  HOW to build       │     │  WHAT to build with │    │
│        │             │  • Orchestration    │     │  • 60 categories    │    │
│        │             │  • Quality gates    │     │  • Tool matrices    │    │
│        │             │  • Context mgmt     │     │  • Stack selection  │    │
│        └─────────────┴─────────────────────┴─────┴─────────────────────┘    │
│                                                                              │
│  THIS DOCUMENT PROVIDES: Technology options, tool matrices, build patterns  │
│  FOR ORCHESTRATION: See North Star Blueprint v6.0 (handoffs, confidence,    │
│                     context engineering, load balancing, quality gates)     │
│  FOR NAVIGATION: See BRIDGE.md (routes you to the right document/section)   │
│                                                                              │
│  REMEMBER: MBF = WHAT (tools) | NS = HOW (methodology) | BRIDGE = NAVIGATE  │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

# FRAMEWORK OVERVIEW

This document is an **exhaustive, autonomous execution framework** designed to be placed in front of any agentic model, IDE, or intelligent system to produce **maximum quality, production-ready outputs**.

## Core Principles

| Principle | Implementation |
|-----------|----------------|
| **Exhaustive** | Every category lists ALL top-tier tools, strategies, patterns — nothing held back |
| **Interconnected** | Categories pull from each other; dependencies are mapped explicitly |
| **Zero-to-Complete** | Full lifecycle coverage: ideation → architecture → implementation → testing → deployment → monitoring → iteration |
| **Quality-Gated** | Built-in phases for testing, security, performance, accessibility at every stage |
| **Agentic-Ready** | Prompt hooks for maximum output from any model |
| **Parallelism-Aware** | Designed for concurrent execution where possible |

## Framework Structure

- **8 Tiers** representing major domains
- **7 Categories per Tier** for deep coverage
- **56 Total Categories** — non-redundant, comprehensive
- **Cross-Category Dependencies** mapped throughout

---

# ALL 56 CATEGORIES AT A GLANCE

## Tier 1: Build Targets (What You Create)
1. **Web Applications** — SaaS, PWAs, dashboards, full-stack
   - Tools: React/Next.js, Vue/Nuxt, SvelteKit; Vercel/Netlify for deployment.
   - Patterns: Vertical slices (NS Part III); hero animations (Whisk/Flow sequencing for scroll-stoppers).
   - Quality Gates: First-impression test (load <2s); accessibility (WCAG 2.2).
   - Prompt Hook: "Build a SaaS web app for [idea], using Next.js + Tailwind; integrate scroll animation from transcripts; ensure efficiency with 50% faster loads via Framer Motion v11."
   - Dependencies: 8 (APIs), 15 (DBs), 36 (Image Gen for thumbnails).
2. **Mobile Applications** — iOS, Android, cross-platform
3. **Desktop Applications** — Windows, macOS, Linux, Electron, Tauri
4. **Websites & Landing Pages** — Marketing, blogs, e-commerce
5. **Generative & Immersive Web** — 3D, WebGL, AI-generated UI
6. **Operating Systems & Embedded** — Linux distros, IoT, RTOS
7. **Browser Extensions & Plugins** — Chrome, Firefox, Safari

## Tier 2: Compute & Infrastructure (Where It Runs)
8. **APIs & Backend Services** — REST, GraphQL, gRPC, tRPC
9. **Edge Computing & CDN** — Edge functions, global distribution
10. **Serverless Functions** — FaaS, event-driven compute
11. **GPU & ML Compute** — Training, inference, Modal, Replicate
12. **Container Orchestration** — Docker, Kubernetes, microservices
13. **Infrastructure as Code** — Terraform, Pulumi, CDK
14. **Platform Engineering** — IDPs, golden paths, developer experience

## Tier 3: Data & Persistence (Storage & Retrieval)
15. **Relational Databases** — PostgreSQL, MySQL, migrations, ORMs
16. **Vector Databases & Semantic Search** — Qdrant, Pinecone, embeddings
17. **Document & NoSQL Databases** — MongoDB, DynamoDB, graphs
18. **Local-First & Offline** — IndexedDB, SQLite, sync engines
19. **Object Storage & Files** — S3, R2, CDN delivery
20. **Data Warehousing & Analytics** — Snowflake, BigQuery, dbt
21. **Search Engines** — Elasticsearch, Meilisearch, Algolia

## Tier 4: AI & Agent Systems (Intelligence Layer)
22. **Caching & Performance** — Redis, CDN caching, query cache
23. **Message Queues & Streaming** — Kafka, SQS, BullMQ, Temporal
24. **Real-Time & WebSockets** — Pusher, Socket.io, Liveblocks
25. **Scheduled Jobs & Cron** — Vercel Cron, Inngest, Airflow
26. **Graph Processing & Knowledge** — Neo4j, knowledge graphs
27. **Data Transformation & ETL** — dbt, Airbyte, pipelines
28. **Feature Stores & ML Data** — Feast, experiment tracking

## Tier 5: AI Systems (Continued)
29. **Agentic RAG Systems** — LlamaIndex, LangChain, retrieval
30. **Autonomous Agents** — CrewAI, LangGraph, multi-agent
31. **MCPs & Tool Registries** — Function calling, tool definitions
   - Updated with skills as executable code
31E. **Memory Architecture** — Working/Episodic/Semantic/Procedural
   - Bolster: Embed RLM for infinite context (offload prompts to environment, recursive sub-calling).
   - Tools: Qdrant/Pinecone for embeddings; RLM with Ripple for 10M+ tokens (research: MIT v2, 2x cost reduction).
   - Patterns: Fork at 75-80% utilization (your idea); selective retrieval for efficiency.
   - Quality Gates: Context rot test (accuracy >95% at 1M tokens).
   - Prompt Hook: "Implement RLM for this agent's memory; fork context at 80% to avoid burn."
32. **Model Fine-Tuning** — LoRA, RLHF, domain adaptation
33. **Model Serving & Inference** — vLLM, TGI, quantization
34. **LLM Routing & Orchestration** — Gateways, prompt management
35. **AI Safety & Guardrails** — Content moderation, PII detection

## Tier 6: Content Generation (Media at Scale)
36. **Image Generation** — DALL-E, Flux, Midjourney, thumbnails
37. **Audio Generation** — ElevenLabs, Suno, voice synthesis
38. **Video Generation** — Runway, transcoding, streaming
39. **Document Generation** — PDFs, contracts, slides
40. **Code Generation** — AI assistants, transformation
41. **Data & Content Generation** — Synthetic data, content
42. **Translation & Localization** — i18n, machine translation

## Tier 7: Automation & DevOps (Building & Deploying)
43. **CI/CD Pipelines** — GitHub Actions, builds, releases
44. **Workflow Orchestration** — DAGs, long-running processes
45. **Browser & Web Automation** — Playwright, scraping, RPA
46. **Testing & QA** — Unit, E2E, performance, security
47. **Conversational & Voice** — Chatbots, voice assistants
48. **Documentation Systems** — Docs, API reference, wikis
49. **Dashboards & Internal Tools** — Admin panels, CRUD builders

## Tier 8: Security & Foundation (Cross-Cutting)
50. **Authentication & Identity** — OAuth, SSO, user management
51. **Payments & Billing** — Stripe, subscriptions, invoicing
52. **Security & Encryption** — WAF, scanning, protection
53. **Secrets Management** — Vault, credential storage
54. **Analytics & Tracking** — PostHog, Amplitude, experimentation
55. **Monitoring & Observability** — Metrics, logs, traces, alerts
56. **Compliance & Legal** — GDPR, SOC 2, accessibility

---

# CROSS-CATEGORY DEPENDENCY MATRIX

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         DEPENDENCY FLOW PATTERNS                            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  TIER 1 (Build Targets) ──────────────────────────────────────────────────┐ │
│       │                                                                   │ │
│       ├──► TIER 2 (Compute) ──► Where it runs                            │ │
│       ├──► TIER 3 (Data) ──► What it stores/retrieves                    │ │
│       ├──► TIER 4-5 (AI) ──► Intelligence layer                          │ │
│       ├──► TIER 6 (Content) ──► Media generation                         │ │
│       ├──► TIER 7 (Automation) ──► CI/CD, workflows                      │ │
│       └──► TIER 8 (Foundation) ──► Auth, payments, security, compliance  │ │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Common Build Patterns

**SaaS Web Application:**
```
Categories: 1 + 8 + 15 + 22 + 43 + 46 + 49 + 50 + 51 + 52 + 54 + 55 + 56
```

**Autonomous Agent System:**
```
Categories: 29 + 30 + 31 + 32 + 33 + 34 + 35 + 16 + 22 + 23 + 11
```

**Content Generation Pipeline:**
```
Categories: 36 + 37 + 38 + 39 + 11 + 19 + 44 + 43
```

**Mobile App with AI:**
```
Categories: 2 + 8 + 15 + 29 + 33 + 50 + 51 + 54 + 55
```

---

# TIER 1: BUILD TARGETS
## *What You Are Creating*

---

## Category 1: Web Applications (Full-Stack)

### Scope
SaaS platforms, productivity tools, dashboards, admin panels, PWAs, real-time collaborative apps, marketplace platforms, social platforms, e-commerce storefronts.

### Technology Stack — Exhaustive

#### Frontend Frameworks
| Tool | Use Case | Why Choose |
|------|----------|------------|
| **Next.js 15** | Production React | Server components, App Router, streaming |
| **Remix** | Data-heavy apps | Nested routes, progressive enhancement |
| **Nuxt 4** | Vue ecosystem | Auto-imports, hybrid rendering |
| **SvelteKit 2** | Performance-critical | Smallest bundle, excellent DX |
| **SolidStart** | Maximum performance | Fine-grained reactivity |
| **Astro 5** | Content-heavy | Island architecture, any framework |
| **Qwik** | Instant loading | Resumability, lazy execution |

#### State Management
| Tool | Pattern | Best For |
|------|---------|----------|
| **Zustand** | Flux-lite | Simple global state |
| **Jotai** | Atomic | Fine-grained updates |
| **TanStack Query** | Server state | Caching, background sync |
| **Redux Toolkit** | Flux | Complex state machines |
| **XState** | State machines | Complex UI flows |
| **Legend State** | Observable | Real-time sync |

#### Styling Solutions
| Tool | Approach | Performance |
|------|----------|-------------|
| **Tailwind CSS 4** | Utility-first | Excellent |
| **CSS Modules** | Scoped CSS | Excellent |
| **Vanilla Extract** | Zero-runtime | Excellent |
| **Panda CSS** | Atomic CSS-in-JS | Excellent |
| **StyleX** | Atomic (Meta) | Excellent |

#### Component Libraries
| Library | Design System | Components |
|---------|---------------|------------|
| **shadcn/ui** | Radix + Tailwind | Copy-paste, customizable |
| **Radix UI** | Headless | Accessible primitives |
| **Ark UI** | Headless | Framework agnostic |
| **React Aria** | Adobe | Accessibility-first |
| **Mantine** | Full system | Feature-rich |

#### Animation Libraries
| Library | Type | Use Case |
|---------|------|----------|
| **Framer Motion** | Declarative | React animations |
| **GSAP** | Timeline | Complex sequences |
| **Motion One** | Web Animations API | Lightweight |
| **Lottie** | JSON | After Effects export |

#### Forms & Validation
| Tool | Approach |
|------|----------|
| **React Hook Form** | Uncontrolled, best perf |
| **Zod** | Schema validation, TS-first |
| **Valibot** | Schema (tiny bundle) |
| **TanStack Form** | Headless |

### Quality Gates

```
□ TypeScript strict mode enabled
□ ESLint + Prettier configured
□ Unit tests (Vitest/Jest) — 80%+ coverage
□ E2E tests (Playwright/Cypress)
□ Accessibility audit (axe-core)
□ Lighthouse score > 90 all categories
□ Bundle analysis completed
□ Security headers configured
□ Error boundaries implemented
□ Loading/error states for all async
□ SEO meta tags + OpenGraph
□ Mobile responsive verified
□ Cross-browser tested
```

### Agentic Prompt Hook

```
You are building a production web application. Before writing any code:

1. ARCHITECTURE PHASE
   - Define rendering strategy (SSR/SSG/ISR/CSR)
   - Choose state management based on complexity
   - Plan component hierarchy and data flow
   - Identify API boundaries

2. IMPLEMENTATION PHASE
   - Use TypeScript strict mode
   - Implement error boundaries at route level
   - Add loading states for all async operations
   - Ensure accessible markup (ARIA, semantic HTML)

3. QUALITY PHASE
   - Write tests alongside features
   - Run accessibility audits
   - Profile performance
   - Analyze bundle size

4. OUTPUT REQUIREMENTS
   - Production-ready code
   - Comprehensive error handling
   - Full TypeScript types
   - Documented complex logic
```

### Cross-Category Dependencies
- **→ Category 8** (APIs) — Data fetching
- **→ Category 15** (Relational DB) — Persistence
- **→ Category 22** (Caching) — Performance
- **→ Category 43** (DevOps) — Deployment
- **→ Category 50** (Auth) — Identity
- **→ Category 51** (Payments) — Monetization

---

## Category 2: Mobile Applications

### Scope
iOS apps, Android apps, cross-platform apps, native apps, hybrid apps, tablet-optimized apps, wearable companion apps.

### Technology Stack — Exhaustive

#### Cross-Platform Frameworks
| Framework | Language | Best For |
|-----------|----------|----------|
| **React Native 0.76+** | TypeScript | React teams, large ecosystem |
| **Expo** | TypeScript | Rapid development, managed workflow |
| **Flutter** | Dart | Pixel-perfect UI, animations |
| **Kotlin Multiplatform** | Kotlin | Shared business logic |
| **Capacitor** | Web tech | Web-first teams |

#### Native Development
| Platform | Language | Framework |
|----------|----------|-----------|
| **iOS** | Swift | SwiftUI, UIKit |
| **Android** | Kotlin | Jetpack Compose |

#### React Native Ecosystem
| Category | Libraries |
|----------|-----------|
| **Navigation** | React Navigation, Expo Router |
| **State** | Zustand, Jotai, Legend State |
| **UI Kits** | Tamagui, NativeWind, Gluestack |
| **Storage** | MMKV, WatermelonDB |
| **Animation** | Reanimated 3, Moti |
| **Testing** | Jest, Detox, Maestro |

#### Mobile Backend Services
| Service | Features |
|---------|----------|
| **Firebase** | Auth, Firestore, Push, Analytics |
| **Supabase** | Postgres, Auth, Realtime |
| **AWS Amplify** | Full AWS integration |
| **Appwrite** | Open-source BaaS |

### Quality Gates

```
□ TypeScript/Dart strict mode
□ Performance profiled (60fps animations)
□ Offline mode implemented
□ Deep linking configured
□ Push notifications tested
□ Biometric auth implemented
□ Accessibility (VoiceOver/TalkBack tested)
□ App size optimized (<50MB)
□ Startup time <2 seconds
□ Crash-free rate >99.5%
□ E2E tests passing (Detox/Maestro)
□ Store compliance verified
```

### Agentic Prompt Hook

```
You are building a production mobile application. Before writing any code:

1. PLATFORM STRATEGY
   - Define target platforms (iOS, Android, both)
   - Choose framework based on team expertise
   - Plan native module needs

2. ARCHITECTURE PHASE
   - Define navigation structure
   - Plan offline-first data strategy
   - Design state management approach

3. IMPLEMENTATION PHASE
   - Use platform-appropriate patterns
   - Implement proper lifecycle handling
   - Handle all permission flows
   - Support accessibility throughout

4. RELEASE PHASE
   - Configure CI/CD for stores
   - Set up crash reporting
   - Plan OTA update strategy

5. OUTPUT REQUIREMENTS
   - Production-ready, store-compliant
   - All edge cases handled
   - Accessibility verified
   - Performance optimized
```

### Cross-Category Dependencies
- **→ Category 8** (APIs) — Backend communication
- **→ Category 50** (Auth) — User identity
- **→ Category 51** (Payments) — In-app purchases
- **→ Category 54** (Analytics) — User tracking
- **→ Category 55** (Monitoring) — Crash reporting

---

## Category 3: Desktop Applications

### Scope
Windows apps, macOS apps, Linux apps, cross-platform desktop, system utilities, creative tools, developer tools.

### Technology Stack — Exhaustive

#### Cross-Platform Frameworks
| Framework | Language | Bundle Size | Best For |
|-----------|----------|-------------|----------|
| **Tauri 2.0** | Rust + Web | ~3-10MB | Small bundles, security |
| **Electron** | JS/TS | ~150MB+ | Large ecosystem |
| **Flutter Desktop** | Dart | ~20MB | Consistent UI |
| **Qt** | C++/Python | ~30MB+ | Native performance |
| **Wails** | Go + Web | ~8MB | Go backends |

#### Platform-Specific Features
| Feature | Windows | macOS | Linux |
|---------|---------|-------|-------|
| **System Tray** | Native API | NSStatusItem | libappindicator |
| **Notifications** | Windows Toast | UserNotifications | libnotify |
| **Installer** | MSIX, NSIS | DMG, PKG | DEB, AppImage |
| **Code Signing** | Authenticode | Apple Developer ID | N/A |

### Quality Gates

```
□ Cross-platform tested (Win/Mac/Linux)
□ Native integrations (tray, notifications)
□ Auto-updater implemented
□ Code signed (all platforms)
□ macOS notarized
□ Memory usage profiled
□ High DPI/Retina support
□ Keyboard shortcuts implemented
□ Accessibility verified
□ Crash reporting integrated
```

### Agentic Prompt Hook

```
You are building a production desktop application. Before writing code:

1. FRAMEWORK SELECTION
   - Tauri for small bundles + security
   - Electron for largest ecosystem
   - Native for maximum platform integration

2. ARCHITECTURE PHASE
   - Plan main/renderer process split
   - Design IPC communication
   - Plan local data storage

3. DISTRIBUTION PHASE
   - Set up code signing for all platforms
   - Configure auto-updater
   - Create installers for each OS

4. OUTPUT REQUIREMENTS
   - All platforms working identically
   - Native integrations complete
   - Signed and notarized
   - Auto-update functional
```

### Cross-Category Dependencies
- **→ Category 8** (APIs) — Cloud sync
- **→ Category 18** (Local DB) — Local storage
- **→ Category 43** (CI/CD) — Multi-platform builds

---

## Category 4: Websites & Landing Pages

### Scope
Marketing sites, landing pages, corporate websites, portfolios, blogs, documentation, e-commerce storefronts.

### Technology Stack — Exhaustive

#### Static Site Generators
| Tool | Language | Best For |
|------|----------|----------|
| **Astro 5** | Any | Content sites, partial hydration |
| **Next.js** | React | Hybrid static/dynamic |
| **Nuxt** | Vue | Vue ecosystem |
| **Hugo** | Go | Fastest builds |
| **VitePress** | Vue | Documentation |
| **Docusaurus** | React | Documentation |

#### No-Code/Low-Code
| Platform | Best For |
|----------|----------|
| **Webflow** | Designer-driven sites |
| **Framer** | Interactive prototypes |
| **Squarespace** | Beautiful templates |

#### AI-Powered Generation
| Tool | Capability |
|------|------------|
| **V0.dev** | React component generation |
| **Builder.io** | Visual AI editing |
| **Relume** | Wireframe to design |

#### Animation & 3D
| Library | Use Case |
|---------|----------|
| **GSAP** | Complex sequences, scroll |
| **Three.js** | 3D graphics |
| **Spline** | No-code 3D scenes |
| **Lottie** | After Effects animations |

### Quality Gates

```
□ Lighthouse score > 95 all categories
□ Core Web Vitals passing
□ Mobile-first responsive
□ SEO meta tags complete
□ OpenGraph + Twitter cards
□ Structured data (JSON-LD)
□ Sitemap.xml generated
□ Accessibility WCAG 2.1 AA
□ Images optimized (WebP, AVIF)
□ Critical CSS inlined
```

### Agentic Prompt Hook

```
You are building a production website. Before writing code:

1. GOAL DEFINITION
   - Define primary conversion goal
   - Identify target audience
   - Plan content hierarchy

2. TECHNICAL STRATEGY
   - Choose rendering (static, SSR, hybrid)
   - Plan image optimization
   - Define animation approach

3. SEO PHASE
   - Research target keywords
   - Plan URL structure
   - Define structured data

4. OUTPUT REQUIREMENTS
   - Lighthouse > 95 all categories
   - Mobile-first responsive
   - SEO-optimized
   - Accessibility compliant
```

### Cross-Category Dependencies
- **→ Category 9** (Edge) — CDN delivery
- **→ Category 43** (DevOps) — Deployment
- **→ Category 54** (Analytics) — Tracking

---

## Category 5: Generative & Immersive Web

### Scope
AI-generated interfaces, V0-powered applications, 3D experiences, WebGL/WebGPU, AR/VR web, creative coding.

### Technology Stack — Exhaustive

#### Generative UI Tools
| Tool | Capability |
|------|------------|
| **V0.dev** | React/Tailwind generation |
| **Vercel AI SDK** | Streaming UI |
| **Anthropic Artifacts** | Interactive code |
| **Cursor** | AI-native editor |
| **Bolt.new** | Full-stack generation |

#### 3D Graphics
| Library | Best For |
|---------|----------|
| **Three.js** | Full control |
| **React Three Fiber** | Declarative 3D |
| **Babylon.js** | Game-quality |
| **Spline** | No-code 3D |

#### Data Visualization
| Library | Type |
|---------|------|
| **D3.js** | Low-level, flexible |
| **Chart.js** | Simple charts |
| **Recharts** | React charts |
| **Deck.gl** | Geospatial |

### Quality Gates

```
□ 60fps maintained on target devices
□ Progressive enhancement (fallbacks)
□ Memory leaks monitored
□ Loading states for 3D assets
□ Mobile touch interactions work
□ Accessibility alternatives provided
□ WebGL context loss handled
```

### Cross-Category Dependencies
- **→ Category 29** (AI) — Generative content
- **→ Category 36** (Image Gen) — AI visuals
- **→ Category 11** (GPU) — Generation compute

---

## Category 6: Operating Systems & Embedded

### Scope
Custom Linux distros, Raspberry Pi systems, IoT firmware, RTOS, robotics, automotive.

### Technology Stack — Exhaustive

#### Linux Distribution Building
| Tool | Purpose |
|------|---------|
| **Yocto Project** | Custom embedded Linux |
| **Buildroot** | Simple embedded Linux |
| **Ubuntu Core** | Snap-based IoT |

#### Real-Time Operating Systems
| RTOS | Best For |
|------|----------|
| **FreeRTOS** | Microcontrollers, AWS IoT |
| **Zephyr** | Modern, scalable |
| **QNX** | Automotive, safety |

#### Firmware Development
| Framework | Language |
|-----------|----------|
| **Arduino** | C++ |
| **PlatformIO** | C/C++ |
| **ESP-IDF** | C (ESP32) |
| **Embassy** | Rust async |
| **MicroPython** | Python |

### Quality Gates

```
□ Boot time optimized
□ Memory footprint minimized
□ Power consumption profiled
□ OTA update mechanism working
□ Secure boot configured
□ Watchdog timer implemented
□ Production image reproducible
```

### Agentic Prompt Hook

```
You are building an embedded system. Before writing code:

1. REQUIREMENTS ANALYSIS
   - Define hardware constraints
   - Identify real-time requirements
   - Plan power budget

2. PLATFORM SELECTION
   - Choose base OS/RTOS
   - Select build system
   - Define bootloader

3. OUTPUT REQUIREMENTS
   - Reproducible builds
   - OTA update capable
   - Security hardened
```

### Cross-Category Dependencies
- **→ Category 9** (Edge) — IoT connectivity
- **→ Category 52** (Security) — Secure boot

---

## Category 7: Browser Extensions & Plugins

### Scope
Chrome extensions, Firefox add-ons, Safari extensions, Edge extensions, productivity tools, developer tools.

### Technology Stack — Exhaustive

#### Extension Frameworks
| Framework | Features |
|-----------|----------|
| **Plasmo** | React-based, cross-browser |
| **WXT** | Vite-based, TypeScript |
| **CRXJS** | Vite plugin for Chrome |
| **WebExtension Polyfill** | Cross-browser API |

#### Key APIs
| API | Capability |
|-----|------------|
| **storage** | Local/sync storage |
| **tabs** | Tab manipulation |
| **scripting** | Script injection |
| **sidePanel** | Chrome side panel |
| **declarativeNetRequest** | Network rules |

### Quality Gates

```
□ Manifest V3 compliant (Chrome)
□ Minimum permissions requested
□ Privacy policy published
□ Cross-browser tested
□ Content Security Policy configured
□ No eval() or inline scripts
```

### Cross-Category Dependencies
- **→ Category 8** (APIs) — Backend services
- **→ Category 50** (Auth) — User identity
- **→ Category 52** (Security) — Data protection

---

# TIER 2: COMPUTE & INFRASTRUCTURE
## *Where and How It Runs*

---

## Category 8: APIs & Backend Services

### Scope
REST APIs, GraphQL APIs, gRPC services, tRPC backends, WebSocket servers, microservices.

### Technology Stack — Exhaustive

#### Backend Frameworks
| Framework | Language | Best For |
|-----------|----------|----------|
| **Hono** | TypeScript | Edge, speed |
| **Elysia** | TypeScript | Bun-native, performance |
| **Fastify** | TypeScript | Production APIs |
| **NestJS** | TypeScript | Enterprise, DI |
| **tRPC** | TypeScript | End-to-end types |
| **FastAPI** | Python | APIs, auto-docs |
| **Django** | Python | Batteries-included |
| **Gin** | Go | Fast APIs |
| **Axum** | Rust | Modern, Tower ecosystem |
| **Spring Boot** | Java/Kotlin | Enterprise |

#### API Protocols
| Protocol | Best For |
|----------|----------|
| **REST** | Universal compatibility |
| **GraphQL** | Flexible data fetching |
| **gRPC** | High-performance microservices |
| **tRPC** | Full-stack TypeScript |
| **WebSocket** | Real-time bidirectional |

#### API Documentation
| Tool | Purpose |
|------|---------|
| **OpenAPI/Swagger** | REST specification |
| **Postman** | Testing, documentation |
| **GraphQL Playground** | GraphQL IDE |

### Quality Gates

```
□ OpenAPI/GraphQL schema defined
□ Input validation on all endpoints
□ Rate limiting implemented
□ Authentication/authorization complete
□ Error responses standardized
□ Pagination implemented
□ CORS configured correctly
□ Health check endpoint
□ Request logging enabled
□ Database connection pooling
□ Integration tests passing
```

### Agentic Prompt Hook

```
You are building a production API. Before writing code:

1. API DESIGN
   - Define resource model
   - Choose protocol (REST/GraphQL/gRPC)
   - Plan versioning strategy

2. ARCHITECTURE
   - Define service boundaries
   - Plan database schema
   - Design caching strategy

3. SECURITY
   - Implement authentication
   - Add authorization checks
   - Configure rate limiting

4. OUTPUT REQUIREMENTS
   - Schema documented
   - All endpoints tested
   - Rate limited and secured
```

### Cross-Category Dependencies
- **→ Category 15-17** (Databases) — Data persistence
- **→ Category 22** (Caching) — Performance
- **→ Category 50** (Auth) — Identity
- **→ Category 52** (Security) — Protection

---

## Category 9: Edge Computing & CDN

### Scope
Edge functions, CDN logic, global distribution, edge databases, low-latency computing.

### Technology Stack — Exhaustive

#### Edge Platforms
| Platform | Cold Start | Best For |
|----------|------------|----------|
| **Cloudflare Workers** | <5ms | Fastest, global |
| **Vercel Edge Functions** | <5ms | Next.js integration |
| **Deno Deploy** | <10ms | Deno ecosystem |
| **Fastly Compute** | <10ms | High performance |
| **Fly.io** | ~100ms | Full containers at edge |

#### Edge Databases
| Service | Type |
|---------|------|
| **Cloudflare KV** | Key-value |
| **Cloudflare Durable Objects** | Coordinated state |
| **Cloudflare D1** | SQLite at edge |
| **Cloudflare R2** | Object storage (no egress) |
| **Turso** | Distributed SQLite |
| **Upstash Redis** | Global Redis |

#### CDN Providers
| Provider | Specialty |
|----------|-----------|
| **Cloudflare** | Security + performance |
| **Fastly** | Real-time purging |
| **AWS CloudFront** | AWS integration |
| **Bunny CDN** | Cost-effective |

### Quality Gates

```
□ Cold start time <50ms
□ Global latency tested
□ Cache headers optimized
□ Purge strategy implemented
□ DDoS protection enabled
□ HTTP/3 enabled
□ Brotli compression
```

### Cross-Category Dependencies
- **→ Category 8** (APIs) — Origin servers
- **→ Category 22** (Caching) — Cache strategies
- **→ Category 52** (Security) — DDoS, WAF

---

## Category 10: Serverless Functions

### Scope
FaaS, event-driven compute, webhooks, scheduled jobs, queue processors.

### Technology Stack — Exhaustive

#### Serverless Platforms
| Platform | Cold Start | Best For |
|----------|------------|----------|
| **AWS Lambda** | 100-500ms | AWS ecosystem |
| **Vercel Functions** | <100ms | Vercel deployments |
| **Cloudflare Workers** | <5ms | Edge, speed |
| **Supabase Edge Functions** | <50ms | Supabase integration |

#### Serverless Frameworks
| Framework | Features |
|-----------|----------|
| **SST** | TypeScript-first, AWS |
| **Serverless Framework** | Multi-cloud |
| **AWS SAM** | Official AWS |
| **Pulumi** | Real programming languages |

### Quality Gates

```
□ Cold start time optimized
□ Idempotency implemented
□ Error handling with retries
□ Dead letter queues configured
□ Structured logging
□ Tracing enabled
□ Local development working
```

### Cross-Category Dependencies
- **→ Category 8** (APIs) — HTTP triggers
- **→ Category 23** (Queues) — Async triggers
- **→ Category 43** (DevOps) — Deployment

---

## Category 11: GPU & ML Compute

### Scope
GPU workloads, ML training, inference serving, batch processing, model deployment.

### Technology Stack — Exhaustive

#### GPU Cloud Platforms
| Platform | Best For |
|----------|----------|
| **Modal** | Serverless GPU, Python-native |
| **Replicate** | Model hosting, API |
| **RunPod** | Affordable GPU |
| **Lambda Labs** | Training |
| **Together AI** | Inference API |
| **Fireworks AI** | Fast inference |
| **Groq** | Ultra-fast inference |

#### Inference Engines
| Engine | Best For |
|--------|----------|
| **vLLM** | High-throughput LLM |
| **TGI** | HuggingFace serving |
| **TensorRT-LLM** | NVIDIA optimized |
| **llama.cpp** | CPU/Metal |
| **Ollama** | Local LLMs |

#### Optimization Techniques
| Technique | Purpose |
|-----------|---------|
| **Quantization** | Model compression |
| **Continuous batching** | Throughput |
| **Speculative decoding** | Latency |
| **PagedAttention** | Memory efficiency |

### Quality Gates

```
□ GPU utilization monitored
□ Memory management verified
□ Inference latency profiled
□ Cost per inference calculated
□ Auto-scaling configured
□ Health checks implemented
□ Model versioning in place
```

### Cross-Category Dependencies
- **→ Category 29-33** (AI) — Model deployment
- **→ Category 44** (Workflows) — Pipelines
- **→ Category 55** (Monitoring) — GPU metrics

---

## Category 12: Container Orchestration

### Scope
Docker containers, Kubernetes, service meshes, auto-scaling, microservices.

### Technology Stack — Exhaustive

#### Container Runtimes
| Runtime | Use Case |
|---------|----------|
| **Docker** | Standard containers |
| **containerd** | Kubernetes default |
| **Podman** | Rootless, daemonless |

#### Orchestration Platforms
| Platform | Type |
|----------|------|
| **Kubernetes** | Self-managed |
| **Amazon EKS** | Managed K8s |
| **Google GKE** | Managed K8s |
| **Fly.io** | Managed containers |
| **Railway** | PaaS |
| **Render** | PaaS |

#### Kubernetes Ecosystem
| Category | Tools |
|----------|-------|
| **Package Management** | Helm, Kustomize |
| **GitOps** | ArgoCD, Flux |
| **Service Mesh** | Istio, Linkerd |
| **Ingress** | NGINX, Traefik |
| **Autoscaling** | KEDA, Karpenter |
| **Security** | Falco, OPA, Trivy |

### Quality Gates

```
□ Multi-stage Dockerfile optimized
□ Health checks configured
□ Resource limits set
□ Horizontal pod autoscaling
□ Network policies defined
□ RBAC configured
□ Image scanning enabled
□ GitOps workflow established
```

### Cross-Category Dependencies
- **→ Category 8** (APIs) — Services to deploy
- **→ Category 43** (DevOps) — CI/CD
- **→ Category 52** (Security) — Container security

---

## Category 13: Infrastructure as Code

### Scope
Cloud provisioning, infrastructure automation, configuration management.

### Technology Stack — Exhaustive

#### IaC Tools
| Tool | Language | Best For |
|------|----------|----------|
| **Terraform** | HCL | Industry standard |
| **OpenTofu** | HCL | Open-source Terraform |
| **Pulumi** | TS/Python/Go | Real languages |
| **AWS CDK** | TS/Python | AWS-native |
| **SST** | TypeScript | Serverless apps |

#### State Management
| Solution | Type |
|----------|------|
| **Terraform Cloud** | Managed |
| **S3 + DynamoDB** | AWS self-hosted |
| **Spacelift** | Enterprise platform |

### Quality Gates

```
□ State backend configured (remote)
□ State locking enabled
□ Modules properly versioned
□ Variables documented
□ Drift detection automated
□ Plan review required
□ Sensitive values encrypted
```

### Cross-Category Dependencies
- **→ Category 12** (Containers) — K8s infrastructure
- **→ Category 43** (DevOps) — Automation
- **→ Category 53** (Secrets) — Secret management

---

## Category 14: Platform Engineering

### Scope
Internal developer platforms, self-service infrastructure, golden paths, developer experience.

### Technology Stack — Exhaustive

#### Internal Developer Platforms
| Platform | Type |
|----------|------|
| **Backstage** | Spotify's IDP |
| **Port** | Developer portal |
| **Cortex** | Service catalog |

#### Developer Experience
| Tool | Purpose |
|------|---------|
| **Gitpod** | Cloud dev environments |
| **GitHub Codespaces** | GitHub cloud dev |
| **Tilt** | Local K8s dev |
| **Telepresence** | Local-to-cluster |

### Quality Gates

```
□ Self-service provisioning working
□ Golden paths documented
□ Developer onboarding automated
□ Service ownership clear
□ Cost visibility per team
□ Security guardrails automated
```

### Cross-Category Dependencies
- **→ Category 12-13** (Infrastructure) — Infrastructure
- **→ Category 43** (DevOps) — CI/CD
- **→ Category 48** (Docs) — Documentation

---

# MASTER BUILD FRAMEWORK v2.0 — SEGMENT 2 of 4
## MBF_PART_2_DATA_AI
### Contents: Tier 3 (Cat 15-21) + Tier 4 (Cat 22-35)
### Lines: 1114-2243 of original
---
> **SEGMENT NAVIGATION:** This is a development segment. For full MBF, merge all 4 parts.
> For BRIDGE routing: Categories 15-35 are in this segment.
---

# TIER 3: DATA & PERSISTENCE
## *How Data Is Stored, Retrieved, and Managed*

---

## Category 15: Relational Databases

### Scope
SQL databases, PostgreSQL, MySQL, SQLite, transactional systems, migrations, ORMs.

### Technology Stack  -  Exhaustive

#### Database Engines
| Database | Best For |
|----------|----------|
| **PostgreSQL** | General purpose, extensions |
| **MySQL/MariaDB** | Web applications |
| **SQLite** | Embedded, local-first |
| **CockroachDB** | Distributed SQL |

#### Managed Services
| Service | Database |
|---------|----------|
| **Supabase** | PostgreSQL + backend |
| **Neon** | Serverless PostgreSQL |
| **PlanetScale** | Serverless MySQL |
| **AWS RDS** | Multiple |
| **Turso** | Distributed SQLite |

#### ORMs & Query Builders
| Tool | Language |
|------|----------|
| **Prisma** | TypeScript |
| **Drizzle** | TypeScript |
| **Kysely** | TypeScript |
| **SQLAlchemy** | Python |
| **GORM** | Go |

### Quality Gates

```
□ Indexes on foreign keys
□ Connection pooling configured
□ Query performance analyzed
□ N+1 queries eliminated
□ Migrations reversible
□ Backups automated
□ Replication configured (if needed)
□ Slow query logging enabled
```

### Cross-Category Dependencies
- **â†' Category 8** (APIs)  -  Data layer
- **â†' Category 22** (Caching)  -  Query caching
- **â†' Category 43** (DevOps)  -  Backup automation

---

## Category 16: Vector Databases & Semantic Search

### Scope
Embeddings storage, similarity search, RAG retrieval, recommendation systems.

### Technology Stack  -  Exhaustive

#### Vector Databases
| Database | Best For |
|----------|----------|
| **Qdrant** | Full-featured, filtering |
| **Pinecone** | Serverless, simple |
| **Weaviate** | GraphQL, multimodal |
| **Chroma** | Embedded, local |
| **pgvector** | Existing PostgreSQL |
| **LanceDB** | Embedded, serverless |

#### Embedding Models
| Provider | Models |
|----------|--------|
| **OpenAI** | text-embedding-3-* |
| **Cohere** | embed-v3 |
| **Voyage AI** | voyage-3, voyage-code |
| **BGE/E5** | Open-source |

#### Search Enhancement
| Technique | Tools |
|-----------|-------|
| **Hybrid Search** | BM25 + vector |
| **Re-ranking** | Cohere Rerank, BGE |
| **HyDE** | Query expansion |

### Quality Gates

```
□ Embedding model benchmarked
□ Chunk size optimized
□ Metadata schema defined
□ Recall measured
□ Re-ranking evaluated
□ Query latency profiled
□ Hybrid search tested
```

### Cross-Category Dependencies
- **â†' Category 29-31** (AI)  -  RAG systems
- **â†' Category 15** (Relational)  -  Metadata storage
- **â†' Category 11** (GPU)  -  Embedding compute

---

## Category 17: Document & NoSQL Databases

### Scope
Document databases, key-value stores, graph databases, time-series.

### Technology Stack  -  Exhaustive

#### Document Databases
| Database | Best For |
|----------|----------|
| **MongoDB** | General document storage |
| **Firestore** | Firebase, real-time |
| **DynamoDB** | AWS serverless |

#### Graph Databases
| Database | Query Language |
|----------|---------------|
| **Neo4j** | Cypher |
| **Amazon Neptune** | Gremlin |
| **ArangoDB** | AQL (multi-model) |

#### Time-Series
| Database | Best For |
|----------|----------|
| **InfluxDB** | Metrics, IoT |
| **TimescaleDB** | PostgreSQL-based |
| **ClickHouse** | Analytics |

### Quality Gates

```
□ Data model matches access patterns
□ Indexes support all queries
□ Partition key chosen correctly
□ Replication configured
□ Backup strategy implemented
```

### Cross-Category Dependencies
- **â†' Category 8** (APIs)  -  Data layer
- **â†' Category 22** (Caching)  -  Cache integration

---

## Category 18: Local-First & Offline Databases

### Scope
Client-side databases, offline-first, sync engines, CRDTs.

### Technology Stack  -  Exhaustive

#### Browser Databases
| Database | Type |
|----------|------|
| **IndexedDB** | Native browser |
| **Dexie.js** | IndexedDB wrapper |
| **SQLite WASM** | SQL in browser |
| **PouchDB** | CouchDB sync |

#### Sync Engines
| Engine | Approach |
|--------|----------|
| **PowerSync** | PostgreSQL sync |
| **ElectricSQL** | PostgreSQL sync |
| **Y.js** | CRDT |
| **Automerge** | CRDT |
| **Liveblocks** | Real-time sync |

### Quality Gates

```
□ Offline functionality tested
□ Sync conflicts handled
□ Storage limits understood
□ Migration strategy defined
□ Encryption at rest (if needed)
```

### Cross-Category Dependencies
- **â†' Category 1-3** (Apps)  -  Client applications
- **â†' Category 15** (Relational)  -  Server database
- **â†' Category 24** (Real-time)  -  Sync layer

---

## Category 19: Object Storage & File Systems

### Scope
Cloud storage, file uploads, CDN for assets, presigned URLs.

### Technology Stack  -  Exhaustive

#### Cloud Object Storage
| Service | Best For |
|---------|----------|
| **Amazon S3** | Industry standard |
| **Cloudflare R2** | No egress fees |
| **Backblaze B2** | Cost-effective |
| **Supabase Storage** | Supabase integration |
| **Uploadthing** | Simple uploads |

#### File Processing
| Tool | Purpose |
|------|---------|
| **Sharp** | Image processing |
| **FFmpeg** | Video/audio |
| **Cloudinary** | CDN + processing |

### Quality Gates

```
□ Presigned URLs for uploads
□ File type validation
□ File size limits enforced
□ CDN configured
□ Lifecycle policies set
□ Encryption at rest
```

### Cross-Category Dependencies
- **â†' Category 8** (APIs)  -  Upload endpoints
- **â†' Category 9** (Edge)  -  CDN delivery
- **â†' Category 36-38** (Content)  -  Media processing

---

## Category 20: Data Warehousing & Analytics

### Scope
Analytics databases, OLAP, data lakes, ETL, business intelligence.

### Technology Stack  -  Exhaustive

#### Cloud Data Warehouses
| Warehouse | Best For |
|-----------|----------|
| **Snowflake** | Multi-cloud |
| **BigQuery** | Serverless, GCP |
| **Redshift** | AWS |
| **Databricks** | Lakehouse, ML |
| **ClickHouse** | Real-time analytics |
| **DuckDB** | Embedded OLAP |

#### ETL/ELT Tools
| Tool | Type |
|------|------|
| **dbt** | Transform (ELT) |
| **Airbyte** | Extract/Load |
| **Fivetran** | Managed EL |
| **Apache Airflow** | Orchestration |
| **Dagster** | Modern orchestration |

#### BI & Visualization
| Tool | Type |
|------|------|
| **Metabase** | Open-source BI |
| **Apache Superset** | Open-source BI |
| **Looker** | Google BI |

### Quality Gates

```
□ Data model documented
□ ETL jobs monitored
□ Data quality checks
□ Freshness SLAs defined
□ Access controls in place
```

### Cross-Category Dependencies
- **â†' Category 15-17** (Databases)  -  Source systems
- **â†' Category 44** (Workflows)  -  Orchestration
- **â†' Category 49** (Dashboards)  -  Visualization

---

## Category 21: Search Engines

### Scope
Full-text search, faceted search, autocomplete, typo tolerance.

### Technology Stack  -  Exhaustive

#### Search Engines
| Engine | Best For |
|--------|----------|
| **Meilisearch** | Developer experience |
| **Typesense** | Typo-tolerance |
| **Algolia** | Speed, relevance |
| **Elasticsearch** | Enterprise, analytics |

#### Search UI
| Library | Framework |
|---------|-----------|
| **InstantSearch** | React, Vue |
| **DocSearch** | Documentation |

### Quality Gates

```
□ Relevance tested with real queries
□ Typo tolerance configured
□ Autocomplete latency <100ms
□ Search latency <200ms
□ Indexing pipeline reliable
```

### Cross-Category Dependencies
- **â†' Category 8** (APIs)  -  Search API
- **â†' Category 16** (Vector)  -  Semantic search

---

# TIER 4: AI & AGENT SYSTEMS
## *Intelligence, Reasoning, and Autonomous Capability*

---

## Category 22: Caching & Performance

### Scope
In-memory caching, distributed caching, CDN caching, query caching.

### Technology Stack  -  Exhaustive

#### In-Memory Caches
| Cache | Best For |
|-------|----------|
| **Redis** | General purpose |
| **Upstash Redis** | Serverless |
| **Dragonfly** | High performance |
| **Momento** | Serverless |

#### Caching Patterns
| Pattern | Use Case |
|---------|----------|
| **Cache-Aside** | General caching |
| **Read-Through** | Simplified reads |
| **Write-Behind** | Performance |

### Quality Gates

```
□ Cache hit rate monitored
□ TTL values appropriate
□ Cache invalidation strategy
□ Connection pooling
□ Failover tested
```

#### Semantic Caching for LLMs

Cache LLM responses based on semantic similarity, not exact string match.

| Library | Language | Features |
|---------|----------|----------|
| **GPTCache** | Python | Multiple backends, built-in eval |
| **Upstash Vector** | Any | Serverless, REST API |
| **Redis + VSS** | Any | Vector similarity search |

```typescript
// Semantic cache check
const cached = await cache.get(query);  // Uses embedding similarity
if (cached) return cached;              // ~$0 cost

const response = await llm.complete(query);  // ~$0.003 cost
await cache.set(query, response, { ttl: 86400 });
```

**TTL Guidelines:**
| Use Case | TTL | Similarity Threshold |
|----------|-----|---------------------|
| FAQ/Help | 7 days | 0.95 |
| Code explanation | 24 hours | 0.90 |
| Real-time chat | 5 minutes | 0.99 |

**-> NS Part III §21.7**  -  Full implementation patterns


### Cross-Category Dependencies
- **â†' Category 8** (APIs)  -  Response caching
- **â†' Category 9** (Edge)  -  Edge caching
- **â†' Category 15** (Databases)  -  Query caching

---

## Category 23: Message Queues & Event Streaming

### Scope
Async messaging, job queues, event-driven architecture, pub/sub.

### Technology Stack  -  Exhaustive

#### Message Queues
| Queue | Best For |
|-------|----------|
| **BullMQ** | Node.js jobs |
| **RabbitMQ** | Reliable messaging |
| **Amazon SQS** | AWS serverless |

#### Event Streaming
| Platform | Best For |
|----------|----------|
| **Apache Kafka** | High-throughput |
| **Redpanda** | Kafka-compatible |
| **NATS** | Lightweight |

#### Workflow Engines
| Tool | Type |
|------|------|
| **Temporal** | Durable execution |
| **Inngest** | Serverless workflows |
| **Trigger.dev** | Background jobs |

### Quality Gates

```
□ Message durability configured
□ Dead letter queues set up
□ Retry policies defined
□ Idempotency implemented
□ Consumer scaling tested
```

### Cross-Category Dependencies
- **â†' Category 8** (APIs)  -  Event triggers
- **â†' Category 10** (Serverless)  -  Function triggers
- **â†' Category 44** (Workflows)  -  Orchestration

---

## Category 24: Real-Time & WebSockets

### Scope
WebSocket servers, real-time updates, presence, collaboration.

### Technology Stack  -  Exhaustive

#### Real-Time Platforms
| Platform | Best For |
|----------|----------|
| **Pusher** | Managed, simple |
| **Ably** | Enterprise |
| **Socket.io** | Self-hosted |
| **Liveblocks** | Collaboration |
| **PartyKit** | Edge real-time |
| **Supabase Realtime** | PostgreSQL changes |

#### Collaboration Tools
| Tool | Features |
|------|----------|
| **Liveblocks** | Presence, storage |
| **Y.js** | CRDT, offline |
| **Automerge** | CRDT |

### Quality Gates

```
□ Connection handling robust
□ Reconnection logic implemented
□ Room/channel cleanup
□ Horizontal scaling tested
□ Authentication on connect
```

### Cross-Category Dependencies
- **â†' Category 8** (APIs)  -  REST fallback
- **â†' Category 50** (Auth)  -  Connection auth

---

## Category 25: Scheduled Jobs & Cron

### Scope
Scheduled tasks, cron jobs, recurring jobs, batch processing.

### Technology Stack  -  Exhaustive

#### Serverless Scheduling
| Service | Platform |
|---------|----------|
| **Vercel Cron** | Vercel |
| **Upstash QStash** | Serverless |
| **Inngest** | Cron + events |
| **Trigger.dev** | Background jobs |

#### Self-Hosted
| Tool | Language |
|------|----------|
| **node-cron** | Node.js |
| **APScheduler** | Python |
| **Celery Beat** | Python |

#### Monitoring
| Tool | Purpose |
|------|---------|
| **Cronitor** | Cron monitoring |
| **Healthchecks.io** | Dead man's switch |

### Quality Gates

```
□ Jobs idempotent
□ Overlapping runs prevented
□ Failure alerting
□ Dead man's switch monitoring
□ Run history stored
```

### Cross-Category Dependencies
- **â†' Category 10** (Serverless)  -  Job execution
- **â†' Category 23** (Queues)  -  Job queuing
- **â†' Category 55** (Monitoring)  -  Job monitoring

---

## Category 26: Graph Processing & Knowledge

### Scope
Knowledge graphs, ontologies, graph algorithms, entity resolution.

### Technology Stack  -  Exhaustive

#### Graph Databases
| Database | Query Language |
|----------|---------------|
| **Neo4j** | Cypher |
| **Amazon Neptune** | Gremlin |
| **TypeDB** | TypeQL |

#### Graph Processing
| Framework | Best For |
|-----------|----------|
| **NetworkX** | Python analysis |
| **Neo4j GDS** | Neo4j algorithms |

### Quality Gates

```
□ Ontology/schema defined
□ Query performance optimized
□ Graph algorithms tested
□ Access controls configured
```

### Cross-Category Dependencies
- **â†' Category 16** (Vector)  -  Semantic enrichment
- **â†' Category 29** (RAG)  -  Knowledge retrieval

---

## Category 27: Data Transformation & ETL

### Scope
Data pipelines, ETL/ELT, data cleaning, schema evolution.

### Technology Stack  -  Exhaustive

#### ETL/ELT Frameworks
| Tool | Type |
|------|------|
| **dbt** | SQL transforms |
| **Airbyte** | Connectors |
| **Apache Spark** | Big data |
| **Polars** | Fast DataFrames |
| **DuckDB** | Embedded OLAP |

#### Data Validation
| Tool | Purpose |
|------|---------|
| **Great Expectations** | Data quality |
| **Pydantic** | Python validation |
| **Zod** | TypeScript validation |

### Quality Gates

```
□ Source validation implemented
□ Data quality checks automated
□ Idempotent transforms
□ Audit logging enabled
□ Data lineage tracked
```
### Data Versioning with DVC

#### Why Data Versioning Matters
ML projects require reproducibility. Code versioning (Git) is solved. **Data versioning is not.**

#### Recommended Stack
| Tool | Purpose | Integration |
|------|---------|-------------|
| **DVC** | Data + model versioning | Git-native |
| **LakeFS** | Git-like data lake | S3-compatible |
| **Delta Lake** | Versioned data tables | Spark ecosystem |

#### DVC Quick Start
```bash
# Initialize DVC in existing Git repo
dvc init

# Track large data file
dvc add data/training_set.parquet

# Push to remote storage
dvc remote add -d myremote s3://mybucket/dvc
dvc push
```

#### Data Lineage Pattern
```yaml
# dvc.yaml pipeline definition
stages:
  prepare:
    cmd: python src/prepare.py
    deps:
      - src/prepare.py
      - data/raw/
    outs:
      - data/prepared/
  
  train:
    cmd: python src/train.py
    deps:
      - src/train.py
      - data/prepared/
    outs:
      - models/model.pkl
``````


#### Advanced DVC Pipelines

```yaml
# dvc.yaml - Complete ML pipeline with params and metrics
stages:
  # Data ingestion
  ingest:
    cmd: python src/ingest.py --source ${data.source}
    deps:
      - src/ingest.py
    params:
      - data.source
      - data.format
    outs:
      - data/raw/:
          cache: false    # Don't cache raw data

  # Data preparation
  prepare:
    cmd: python src/prepare.py
    deps:
      - src/prepare.py
      - data/raw/
    params:
      - prepare.split_ratio
      - prepare.seed
    outs:
      - data/prepared/train.parquet
      - data/prepared/test.parquet
    plots:
      - data/prepared/distribution.json:
          x: feature
          y: count

  # Feature engineering
  featurize:
    cmd: python src/featurize.py
    deps:
      - src/featurize.py
      - data/prepared/
    params:
      - features
    outs:
      - data/features/

  # Model training
  train:
    cmd: python src/train.py
    deps:
      - src/train.py
      - data/features/
    params:
      - train.epochs
      - train.learning_rate
      - train.batch_size
    outs:
      - models/model.pkl
    metrics:
      - metrics/train.json:
          cache: false
    plots:
      - plots/loss.csv:
          x: epoch
          y: loss

  # Model evaluation
  evaluate:
    cmd: python src/evaluate.py
    deps:
      - src/evaluate.py
      - models/model.pkl
      - data/features/
    metrics:
      - metrics/eval.json:
          cache: false
    plots:
      - plots/confusion_matrix.csv:
          template: confusion
          x: predicted
          y: actual
```

```yaml
# params.yaml - Centralized parameters
data:
  source: s3://mybucket/raw/
  format: parquet

prepare:
  split_ratio: 0.8
  seed: 42

features:
  - feature_a
  - feature_b
  - feature_c

train:
  epochs: 100
  learning_rate: 0.001
  batch_size: 32
```

#### Remote Storage Configurations

```bash
# S3 remote
dvc remote add -d s3remote s3://my-bucket/dvc-store
dvc remote modify s3remote profile myprofile

# Google Cloud Storage
dvc remote add -d gcsremote gs://my-bucket/dvc-store
dvc remote modify gcsremote credentialpath /path/to/creds.json

# Azure Blob Storage
dvc remote add -d azureremote azure://mycontainer/dvc-store
dvc remote modify azureremote connection_string ${AZURE_STORAGE_CONNECTION_STRING}

# SSH remote (self-hosted)
dvc remote add -d sshremote ssh://user@server.com/path/to/dvc-store

# Local remote (for testing)
dvc remote add -d localremote /tmp/dvc-store
```

#### Experiment Tracking Integration

```python
# src/train.py - DVC Live integration
import dvclive
from dvclive import Live

def train_model(params):
    with Live(save_dvc_exp=True) as live:
        # Log parameters
        live.log_param("learning_rate", params["learning_rate"])
        live.log_param("epochs", params["epochs"])
        
        for epoch in range(params["epochs"]):
            # Training loop
            train_loss, val_loss = train_epoch(model, data)
            
            # Log metrics
            live.log_metric("train/loss", train_loss)
            live.log_metric("val/loss", val_loss)
            live.log_metric("epoch", epoch)
            
            # Log plots
            if epoch % 10 == 0:
                live.log_sklearn_plot(
                    "confusion_matrix",
                    y_true, y_pred,
                    name="val/confusion_matrix"
                )
            
            live.next_step()
        
        # Log final model
        live.log_artifact("models/model.pkl", type="model")
```

```bash
# Run experiments with parameter variations
dvc exp run -S train.learning_rate=0.01
dvc exp run -S train.learning_rate=0.001
dvc exp run -S train.learning_rate=0.0001

# Compare experiments
dvc exp show --md

# Apply best experiment to workspace
dvc exp apply exp-abc12

# Push experiment to remote
dvc exp push origin exp-abc12
```

#### Data Versioning Strategies

```bash
# Strategy 1: Version entire directories
dvc add data/training/
git add data/training.dvc data/.gitignore
git commit -m "Add training data v1"

# Strategy 2: Version with metadata
dvc add data/dataset.parquet --desc "Customer data Q1 2024"

# Strategy 3: External data references (no copy)
dvc import-url s3://source-bucket/large-dataset.parquet \
    data/external/large-dataset.parquet

# Strategy 4: Import from another DVC repo
dvc import https://github.com/org/data-repo \
    data/shared-features.parquet \
    -o data/imported/
```

#### CI/CD Integration for Data Pipelines

```yaml
# .github/workflows/dvc-pipeline.yml
name: DVC Pipeline

on:
  push:
    paths:
      - 'src/**'
      - 'params.yaml'
      - 'dvc.yaml'

jobs:
  reproduce:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup DVC
        uses: iterative/setup-dvc@v1
        
      - name: Configure DVC Remote
        run: |
          dvc remote modify s3remote access_key_id ${{ secrets.AWS_ACCESS_KEY_ID }}
          dvc remote modify s3remote secret_access_key ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          
      - name: Pull Data
        run: dvc pull
        
      - name: Reproduce Pipeline
        run: dvc repro
        
      - name: Push Results
        if: github.ref == 'refs/heads/main'
        run: |
          dvc push
          
      - name: Comment Metrics
        uses: iterative/cml@v0
        with:
          report: |
            ## Metrics
            $(dvc metrics show --md)
            
            ## Plots
            ![](./plots/loss.png)
```

#### Quality Gates (Expanded)

```
[ ] Source validation implemented
[ ] Data quality checks automated
[ ] Idempotent transforms
[ ] Audit logging enabled
[ ] Data lineage tracked
[ ] DVC pipelines reproducible (dvc repro succeeds)
[ ] Remote storage configured and tested
[ ] Experiment tracking integrated (dvclive)
[ ] Data versioning strategy documented
[ ] CI/CD pipeline validates data changes
[ ] Metrics and plots automated
```

### Cross-Category Dependencies
- **-> Category 15-17** (Databases)  -  Source/target
- **-> Category 20** (Warehousing)  -  Destination
- **-> Category 28** (Feature Stores)  -  ML data management
- **-> Category 44** (Workflows)  -  Orchestration
- **-> NS Part III §22**  -  Checkpoint/restart for long pipelines

---

## Category 28: Feature Stores & ML Data

### Scope
Feature engineering, feature stores, training data, experiment tracking.

### Technology Stack  -  Exhaustive

#### Feature Stores
| Store | Type |
|-------|------|
| **Feast** | Open-source |
| **Tecton** | Managed |
| **Databricks Feature Store** | Databricks |

#### Experiment Tracking
| Tool | Features |
|------|----------|
| **MLflow** | End-to-end MLOps |
| **Weights & Biases** | Experiment tracking |
| **DVC** | Data versioning |

### Quality Gates

```

### Data Drift Detection

### Data Drift Detection (Expanded) (GQ2)

Detect and respond to:
- **data drift** (inputs change)
- **prediction drift** (outputs change)
- **concept drift** (relationship changes)

Operational pattern:
- scheduled drift reports
- alert thresholds
- auto-create a retrain ticket
- roll-forward vs rollback policy

Tools:
- Evidently / WhyLogs
- integrate drift metrics into observability dashboards


Monitor for distribution shifts between training and production data.

| Drift Type | What Changes | Detection Tool |
|------------|--------------|----------------|
| **Data drift** | Input distribution | Evidently, NannyML |
| **Concept drift** | Input→Output relationship | Arize, WhyLabs |
| **Prediction drift** | Output distribution | Any monitoring |

**Quick Setup (Evidently):**
```python
from evidently.metrics import DataDriftPreset
from evidently.report import Report

report = Report(metrics=[DataDriftPreset()])
report.run(reference_data=train_df, current_data=prod_df)
report.save_html("drift_report.html")

# Threshold: Retrain if > 20% features drifted
```

**Monitoring Cadence:**
• High-stakes models: Daily drift checks
• Standard models: Weekly drift checks
• Batch models: Every inference batch

□ Feature definitions documented
□ Training/serving parity verified
□ Feature freshness monitored
□ Data drift detection
```

### Cross-Category Dependencies
- **â†' Category 11** (GPU)  -  Model training
- **â†' Category 32** (Fine-tuning)  -  Training data

---

## Category 29: Agentic RAG Systems

### Scope
Retrieval-augmented generation, multi-hop reasoning, document processing.

### Technology Stack  -  Exhaustive

#### RAG Frameworks
| Framework | Best For |
|-----------|----------|
| **LlamaIndex** | Data framework |
| **LangChain** | Chains, agents |
| **Haystack** | Search pipelines |
| **DSPy** | Programmatic optimization |

#### Document Processing
| Tool | Purpose |
|------|---------|
| **Unstructured** | Document parsing |
| **LlamaParse** | LlamaIndex parsing |
| **Marker** | PDF to markdown |
| **Tesseract** | OCR |

#### Chunking Strategies
| Strategy | Use Case |
|----------|----------|
| **Fixed size** | Simple, predictable |
| **Semantic** | Meaning preservation |
| **Parent-child** | Context preservation |

#### Advanced Retrieval
| Technique | Purpose |
|-----------|---------|
| **Hybrid search** | BM25 + vector |
| **Re-ranking** | Relevance ordering |
| **Multi-hop** | Complex reasoning |
| **RAPTOR** | Tree-structured |

#### Chunking Strategy Selection Matrix

| Document Type | Recommended Strategy | Chunk Size | Overlap |
|---------------|---------------------|------------|---------|
| Technical docs | Semantic | 512-1024 | 50-100 |
| Legal/Financial | Page-level | 1 page | 0 |
| Code files | AST-based | Function | 0 |
| Conversations | Message-based | 1 message | Context |
| Research papers | Section-based | Section | Abstract |

#### Query Type Affects Optimal Size
| Query Type | Optimal Chunk Size | Rationale |
|------------|-------------------|-----------|
| Factoid ("What is X?") | 256-512 tokens | Precise answers |
| Analytical ("Why does X?") | 1024+ tokens | Needs context |
| Comparative ("X vs Y?") | 512-768 tokens | Multiple facts |
| Summarization | 2048+ tokens | Broad coverage |

#### Chunk Validation Pattern
```python
def validate_chunks(chunks):
    issues = []
    for i, chunk in enumerate(chunks):
        tokens = count_tokens(chunk)
        if tokens < 100:
            issues.append(f"Chunk {i}: Too small")
        if tokens > 2000:
            issues.append(f"Chunk {i}: Too large")
    return issues
```

---

### Quality Gates

```
□ Chunking strategy validated
□ Embedding model benchmarked
□ Retrieval recall measured
□ Re-ranker evaluated
□ Citation accuracy verified
□ Hallucination rate monitored
□ Latency requirements met
```

### Agentic Prompt Hook

```
You are building an Agentic RAG system. Before writing code:

1. DATA PREPARATION
   - Analyze document types
   - Design chunking strategy
   - Plan metadata schema

2. RETRIEVAL DESIGN
   - Select embedding model
   - Implement hybrid search
   - Add re-ranking

3. GENERATION DESIGN
   - Design prompt templates
   - Implement citation
   - Add guardrails

4. EVALUATION
   - Create test dataset
   - Measure retrieval recall
   - Test end-to-end accuracy

5. OUTPUT REQUIREMENTS
   - High retrieval recall
   - Accurate citations
   - Low hallucination rate
   - Acceptable latency
```

### Cross-Category Dependencies
- **â†' Category 16** (Vector)  -  Retrieval
- **â†' Category 30** (Agents)  -  Agent integration
- **â†' Category 31** (MCPs)  -  Tool calling
- **â†' Category 11** (GPU)  -  Inference

---

## Category 30: Autonomous Agents

### Scope
Task agents, workflow agents, multi-agent systems, tool use.

### Technology Stack  -  Exhaustive

#### Agent Frameworks
| Framework | Best For |
|-----------|----------|
| **LangGraph** | Stateful workflows |
| **CrewAI** | Multi-agent teams |
| **AutoGen** | Microsoft agents |
| **Agency Swarm** | Customizable |
| **Claude Computer Use** | Computer control |

#### Agent Components
| Component | Options |
|-----------|---------|
| **Planning** | ReAct, Plan-and-Execute |
| **Memory** | Conversation, Episodic |
| **Tools** | Code execution, web, APIs |
| **Reflection** | Self-critique |

#### Multi-Agent Patterns
| Pattern | Use Case |
|---------|----------|
| **Supervisor** | Centralized control |
| **Swarm** | Decentralized |
| **Debate** | Reasoning improvement |

### Quality Gates

```
□ Agent loops bounded
□ Error recovery implemented
□ Tool calls validated
□ Human-in-loop capability
□ Costs tracked per run
□ Security boundaries enforced
```

### Agentic Prompt Hook

```
You are building an autonomous agent. Before writing code:

1. DESIGN PHASE
   - Define agent objective
   - Plan tool requirements
   - Design state machine
   - Set autonomy level (â†' NS Section 18: Autonomy Dial)

2. SAFETY PHASE
   - Implement loop bounds
   - Add human-in-loop gates
   - Set resource limits
   - Calibrate confidence thresholds (â†' NS Section 17)

3. IMPLEMENTATION PHASE
   - Build tool integrations
   - Implement memory (â†' NS Section 20: Memory Architecture)
   - Add reflection

4. EVALUATION PHASE
   - Create test scenarios
   - Measure success rate
   - Profile costs

5. OUTPUT REQUIREMENTS
   - Bounded execution
   - Human oversight
   - Reliable tool use
   - Observable runs
   - Handoff capability (â†' NS Section 23: Handoff Protocols)

FOR ORCHESTRATION METHODOLOGY: See North Star Blueprint v6.0
  â†' Part IV (Sections 13-19): AI Orchestration
  â†' Part V (Sections 20-23): Agent Composition
```

#### SDK for Custom Agents

When off-the-shelf frameworks don't fit, build custom agents with the Anthropic SDK:

```python
import anthropic

class CustomAgent:
    def __init__(self, tools: list[dict], system_prompt: str):
        self.client = anthropic.Anthropic()
        self.tools = tools
        self.system = system_prompt
        self.max_iterations = 10  # Bounded execution
    
    def run(self, task: str) -> str:
        messages = [{"role": "user", "content": task}]
        
        for i in range(self.max_iterations):
            response = self.client.messages.create(
                model="claude-sonnet-4-20250514",
                max_tokens=4096,
                system=self.system,
                tools=self.tools,
                messages=messages
            )
            
            if response.stop_reason == "end_turn":
                return response.content[0].text
            
            for block in response.content:
                if block.type == "tool_use":
                    result = self._execute_tool(block.name, block.input)
                    messages.append({"role": "assistant", "content": response.content})
                    messages.append({
                        "role": "user",
                        "content": [{"type": "tool_result", "tool_use_id": block.id, "content": result}]
                    })
        
        raise RuntimeError("Agent exceeded max iterations")
```

#### Background Agent Tasks

For long-running operations, use async patterns with checkpointing:

```python
from dataclasses import dataclass

@dataclass
class AgentCheckpoint:
    task_id: str
    state: dict
    messages: list
    iteration: int

async def background_agent_task(task_id: str, task: str, checkpoint_store):
    """Long-running agent with checkpoint/resume capability."""
    checkpoint = await checkpoint_store.get(task_id)
    if checkpoint:
        messages = checkpoint.messages
        start_iteration = checkpoint.iteration
    else:
        messages = [{"role": "user", "content": task}]
        start_iteration = 0
    
    for i in range(start_iteration, MAX_ITERATIONS):
        response = await run_agent_step(messages)
        
        await checkpoint_store.save(AgentCheckpoint(
            task_id=task_id,
            state=extract_state(response),
            messages=messages,
            iteration=i
        ))
        
        if is_complete(response):
            await checkpoint_store.delete(task_id)
            return response
    
    return {"status": "max_iterations", "checkpoint": task_id}
```

### Cross-Category Dependencies
- **â†' Category 29** (RAG)  -  Knowledge retrieval
- **â†' Category 31** (MCPs)  -  Tool definitions
- **â†' Category 44** (Workflows)  -  Orchestration

---

## Category 31: MCPs & Tool Registries

### Scope
Model Context Protocol, function calling, tool definitions, skill manifests.

### Technology Stack  -  Exhaustive

#### MCP & Tool Frameworks
| Framework | Provider |
|-----------|----------|
| **Model Context Protocol** | Anthropic |
| **Function Calling** | OpenAI |
| **Tool Use** | Various LLMs |

#### Tool Definition Standards
| Standard | Use |
|----------|-----|
| **OpenAPI** | REST API description |
| **JSON Schema** | Parameter validation |

### Quality Gates

```
□ Tool schemas validated
□ Parameter descriptions clear
□ Error responses defined
□ Audit logging enabled
□ Tool documentation complete
```

### Cross-Category Dependencies
- **â†' Category 8** (APIs)  -  Tool backends
- **â†' Category 29-30** (AI)  -  Agent integration
- **â†' Category 50** (Auth)  -  Tool authentication

---

## Category 32: Model Fine-Tuning & Training

### Scope
LLM fine-tuning, LoRA adapters, RLHF, domain adaptation.

### Technology Stack  -  Exhaustive

#### Fine-Tuning Frameworks
| Framework | Best For |
|-----------|----------|
| **Axolotl** | Full-featured |
| **Unsloth** | Fast, memory-efficient |
| **TRL** | HuggingFace official |
| **LLaMA-Factory** | User-friendly |

#### Training Techniques
| Technique | Use Case |
|-----------|----------|
| **Full fine-tuning** | Maximum customization |
| **LoRA** | Efficient adaptation |
| **QLoRA** | Memory-constrained |
| **DPO** | Preference alignment |

#### Evaluation
| Tool | Purpose |
|------|---------|
| **lm-eval-harness** | Benchmark eval |
| **Promptfoo** | Prompt testing |
| **DeepEval** | LLM testing |
| **Ragas** | RAG evaluation |

### Quality Gates

```
□ Training data validated
□ Baseline performance measured
□ Evaluation suite comprehensive
□ Overfitting checked
□ Safety evaluation included
□ Model card created
```

### Cross-Category Dependencies
- **â†' Category 11** (GPU)  -  Training compute
- **â†' Category 28** (Feature Store)  -  Training data
- **â†' Category 33** (Inference)  -  Deployment


### Model Registry

### Model Registry (Expanded) (GQ1)

Add a registry when:
- multiple models/versions exist
- you need staged promotion (dev→staging→prod)
- you require rollback and auditability

Patterns:
- semantic versioning for models
- signed artifacts
- promotion gates (eval scores + human approval)
- registry links to datasets + prompts used

Integrations:
- CI/CD (MBF 43)
- monitoring & drift (MBF 55)
- data versioning (DVC)


Central catalog for model artifacts, versions, and metadata.

| Registry | Type | Best For |
|----------|------|----------|
| **MLflow Model Registry** | Open-source | General ML workflows |
| **Weights & Biases** | SaaS | Experiment tracking |
| **SageMaker Model Registry** | AWS | AWS ecosystem |
| **Vertex AI Model Registry** | GCP | GCP ecosystem |
| **Neptune.ai** | SaaS | Team collaboration |
| **ClearML** | Open-source | End-to-end MLOps |

**Minimum Required Metadata:**
```
□ Model version and training date
□ Training data version (link to DVC/feature store)
□ Evaluation metrics on test set
□ Deployment status (staging/production)
□ Model card (fairness, limitations, usage)
□ Lineage (parent model, fine-tuning config)
```

---

## Category 33: Model Serving & Inference

### Scope
LLM inference, model deployment, quantization, batching, caching.

### Technology Stack  -  Exhaustive

#### Inference Engines
| Engine | Best For |
|--------|----------|
| **vLLM** | High-throughput LLM |
| **TGI** | HuggingFace serving |
| **TensorRT-LLM** | NVIDIA optimized |
| **llama.cpp** | CPU/Metal |
| **Ollama** | Local LLMs |
| **SGLang** | Fast serving |

#### Serving Platforms
| Platform | Type |
|----------|------|
| **Replicate** | Managed models |
| **Modal** | Serverless GPU |
| **Together AI** | Inference API |
| **Fireworks AI** | Fast inference |
| **Groq** | Ultra-fast |

#### Optimization
| Technique | Purpose |
|-----------|---------|
| **Quantization** | Model compression |
| **Continuous batching** | Throughput |
| **Speculative decoding** | Latency |

### Quality Gates

```
□ Latency requirements met
□ Throughput benchmarked
□ Memory usage profiled
□ Auto-scaling tested
□ Health checks implemented
□ Cost per token calculated
```

### Cross-Category Dependencies
- **â†' Category 11** (GPU)  -  Compute resources
- **â†' Category 22** (Caching)  -  Response cache
- **â†' Category 55** (Monitoring)  -  Inference metrics

---

## Category 34: LLM Routing & Orchestration

### Scope
Model selection, router logic, fallbacks, cost optimization, prompt management.

### Technology Stack  -  Exhaustive

#### LLM Gateways
| Gateway | Features |
|---------|----------|
| **LiteLLM** | 100+ providers |
| **Portkey** | Gateway + observability |
| **Helicone** | Logging + caching |
| **OpenRouter** | Multi-provider |

#### Prompt Management
| Tool | Features |
|------|----------|
| **Langfuse** | Open-source tracing |
| **LangSmith** | LangChain native |
| **PromptLayer** | Versioning |

### Quality Gates

```
□ Routing logic tested
□ Fallbacks configured
□ Cost tracking enabled
□ Prompt versions managed
□ Observability complete
```

#### Structured Output Schemas (JSON Mode)

Force LLMs to return valid, typed JSON matching your schema.

| Approach | Language | Library |
|----------|----------|---------|
| **Native JSON Mode** | Any | Provider API (`response_format`) |
| **Zod + zodToJsonSchema** | TypeScript | `zod`, `zod-to-json-schema` |
| **Pydantic** | Python | `pydantic` |
| **Instructor** | Both | `instructor` (recommended) |

```typescript
// Instructor pattern (TypeScript)
const result = await client.chat.completions.create({
  model: 'gpt-4o',
  response_model: { schema: SentimentSchema, name: 'Sentiment' },
  max_retries: 3,
  messages: [{ role: 'user', content: text }],
});
```

**Benefits:**
- Type-safe extraction with compile-time checking
- Automatic retry on schema validation failures
- Provider-agnostic schema definitions
- Streaming support for partial objects

**-> NS Part III §21.6**  -  Full implementation patterns



#### Conversation Compaction Strategies

Manage long conversations by intelligently summarizing history while preserving critical context.

| Strategy | Description | Best For |
|----------|-------------|----------|
| **Rolling Summary** | Keep recent turns verbatim, summarize older | General purpose |
| **Hierarchical** | Multi-level compression (more for older) | Long sessions |
| **Semantic Chunking** | Group by topic, summarize completed topics | Task-oriented |

**Compaction Triggers:**
- Context usage > 70% of model limit
- Conversation exceeds 30 turns
- User requests session break/handoff

**Always Preserve:**
- Architectural decisions and rationale
- Current task/goal statement
- Active blockers
- Code snippets in progress

```typescript
if (await compactor.shouldCompact(messages)) {
  const result = await compactor.compact(messages);
  console.log(`Compacted: ${result.beforeTokens} -> ${result.afterTokens} tokens`);
}
```

**-> NS Part III §20.5**  -  Full implementation patterns


#### RLM (Recursive Language Model) Patterns

Self-referential prompting where LLM output becomes input for iterative refinement.

| Pattern | Description | Use Case |
|---------|-------------|----------|
| **Generate-Critique-Refine** | Draft -> Critique -> Improve | Quality improvement |
| **Recursive Decomposition** | Break down -> Solve -> Synthesize | Complex problems |
| **Meta-Cognitive Reflection** | Reflect on reasoning -> Adjust | Strategy optimization |
| **Chain-of-Verification** | Claim extraction -> Verify -> Revise | Fact-checking |
| **Self-Consistency Voting** | Multiple samples -> Vote | High-stakes decisions |

```typescript
// Generate-Critique-Refine loop
for (let i = 0; i < maxIterations; i++) {
  const critique = await llm.complete(`Critique: ${current}`);
  if (extractScore(critique) >= threshold) break;
  current = await llm.complete(`Refine based on: ${critique}`);
}
```

**Termination Conditions:**
- Max iterations (safety limit)
- Quality/confidence threshold met
- No improvement detected
- Token budget exhausted

**-> NS Part III §22.5**  -  Full implementation patterns


#### Proactive Context Gathering

Anticipate information needs before they become blockers - gather context proactively.

| Task Type | Proactive Context to Gather |
|-----------|----------------------------|
| **Bug Fix** | Error file, test file, recent changes, logs |
| **New Feature** | Similar features, interfaces, design docs |
| **Refactor** | All files to change, dependents, tests |
| **Integration** | Both systems' code, API contracts |

**Key Patterns:**
- Dependency-aware reading (follow imports 2 levels deep)
- Context prefetching for multi-step tasks
- Token-budget-aware prioritization
- Parallel file reads for speed

```typescript
// Analyze task and gather context before starting
const plan = await gatherer.analyzeContextNeeds(task);
const context = await gatherer.gatherContext(plan);
// Now execute with full context loaded
```

**-> NS Part III §21.8**  -  Full implementation patterns


#### Diff-Based Output Strategies

Surgical edits beat full rewrites for token efficiency and reviewability.

| Scenario | Strategy | Rationale |
|----------|----------|-----------|
| New file | Full output | No existing content |
| File < 50 lines | Full output | Diff overhead not worth it |
| File > 50 lines | Diff/search-replace | Token efficiency |
| File > 200 lines | Always diff | Critical for large files |

**Format Options:**
- **Unified Diff**  -  Standard git/patch format, best for tooling
- **Search-Replace**  -  `<search>...</search><replace>...</replace>`, best for LLM output
- **Line-Based**  -  Insert/delete/replace by line number, best for precision

```typescript
// Search-replace format (LLM-friendly)
const edit = {
  filePath: "src/auth.ts",
  search: "return null;",
  replace: "throw new AuthError('Not found');"
};
const { result, applied } = applySearchReplace(content, edit);
```

**Always validate:** syntax check -> type check -> diff ratio warning -> rollback capability

**-> NS Part III §21.9**  -  Full implementation patterns


#### Custom Slash Commands Pattern

Discoverable, type-safe shortcuts for common agent operations.

| Command | Description | Example |
|---------|-------------|---------|
| `/help` | Show available commands | `/help review` |
| `/init` | Initialize agent context | `/init --deep` |
| `/compact` | Compress conversation | `/compact --aggressive` |
| `/checkpoint` | Save current state | `/checkpoint pre-refactor` |
| `/review` | Code review (custom) | `/review PR #123` |

**Command Definition Structure:**
- `name`, `aliases`  -  Command triggers
- `args`, `flags`  -  Typed parameters with autocomplete
- `permissions`, `scope`  -  Access control
- `handler`  -  Execution function

```typescript
// Custom command registration
registry.register({
  name: 'review',
  aliases: ['r'],
  args: [{ name: 'target', type: 'string', required: true }],
  flags: [{ name: 'detailed', short: 'd', type: 'boolean' }],
  handler: async (ctx, args, flags) => performReview(args.target, flags),
});
```

**-> NS Part III §22.00**  -  Full implementation patterns


#### Context Control Commands

User-initiated commands for managing context window usage.

| Command | Effect | When to Use |
|---------|--------|-------------|
| `/context` | Show token usage breakdown | Check current state |
| `/compact` | Compress older messages | Context > 40% |
| `/compact --aggressive` | Maximum compression | Context > 70% |
| `/clear` | Reset conversation | Fresh start needed |
| `/escape compact` | Skip auto-compaction | Override safety |

**Automatic Threshold Handling:**
- 40% -> Warning shown
- 60% -> Compaction recommended  
- 70% -> Auto-prompt to compact
- 85% -> Critical: auto-compact or handoff

```typescript
// Check context and prompt user appropriately
const threshold = await checkContextThreshold(ctx);
if (threshold.action === 'critical') {
  await generateEmergencyHandoff(ctx);
}
```

**-> NS Part II §16.5**  -  Full implementation patterns
**-> NS Part III §20.5**  -  Conversation Compaction Strategies





### Cross-Category Dependencies
- **â†' Category 29-33** (AI)  -  Model backends
- **â†' Category 22** (Caching)  -  Response cache
- **â†' Category 55** (Monitoring)  -  LLM metrics

---

## Category 35: AI Safety & Guardrails

### Scope
Content moderation, output validation, jailbreak prevention, PII detection.

### Technology Stack  -  Exhaustive

#### Guardrail Frameworks
| Framework | Features |
|-----------|----------|
| **Guardrails AI** | Output validation |
| **NeMo Guardrails** | NVIDIA framework |
| **LLM Guard** | Input/output safety |

#### Content Moderation
| Service | Provider |
|---------|----------|
| **OpenAI Moderation** | OpenAI |
| **Perspective API** | Google |
| **Azure Content Safety** | Microsoft |

#### PII Detection
| Tool | Type |
|------|------|
| **Presidio** | Microsoft OSS |
| **AWS Comprehend PII** | Managed |

#### Validation Tools
| Tool | Purpose |
|------|---------|
| **Pydantic** | Schema validation |
| **Instructor** | Structured outputs |
| **Outlines** | Constrained generation |

#### NeMo Guardrails Deep Dive

NVIDIA's NeMo Guardrails: **89% accuracy on prompt injection** (vs 67% Llama Guard).

**Rail Types:**
| Rail | Purpose | When Triggered |
|------|---------|----------------|
| **Input Rails** | Filter user input | Before LLM call |
| **Dialog Rails** | Control conversation | During interaction |
| **Output Rails** | Validate response | After LLM call |
| **Retrieval Rails** | Filter RAG context | Before injection |
| **Execution Rails** | Control tool calls | Before action |

**Colang 2.0 Example:**
```colang
define user express harmful intent
  "how do I hack"
  "write malware"

define flow handle harmful
  user express harmful intent
  bot refuse with explanation
```

#### Guardrails AI Pattern
```python
from guardrails import Guard
from guardrails.hub import ToxicLanguage, PIIDetection

guard = Guard().use_many(
    ToxicLanguage(threshold=0.5, on_fail="fix"),
    PIIDetection(on_fail="anonymize"),
)
```

#### Pre/Post Tool Hooks

Validation gates that wrap tool execution for safety and auditability.

| Hook Type | When | Purpose |
|-----------|------|---------|
| **Pre-Hook** | Before execution | Validate inputs, check permissions, rate limit |
| **Post-Hook** | After execution | Validate outputs, log results, transform response |
| **Error Hook** | On failure | Rollback, retry with backoff, alert |

```typescript
// Wrap any tool with validation hooks
async function executeWithHooks<T>(
  toolName: string,
  input: unknown,
  executor: () => Promise<T>
): Promise<T> {
  await preHook(toolName, input);   // Validate before
  const result = await executor();   // Execute
  return postHook(toolName, result); // Validate after
}
```

#### Closed-Loop Prompt Contracts

Treat prompts as APIs with typed input/output schemas.

```typescript
interface PromptContract<TInput, TOutput> {
  inputSchema: z.ZodType<TInput>;
  outputSchema: z.ZodType<TOutput>;
  template: (input: TInput) => string;
  maxRetries: number;
}
```

**Benefits:**
- Input validation before LLM call
- Output validation after LLM response  
- Automatic retry with exponential backoff
- Testable prompt behavior

**-> NS Part III §21.5**  -  Full implementation patterns

#### Checkpoint/Restart State Machine

State persistence for long-running agent tasks - enables pause, checkpoint, and resume.

| State | Description |
|-------|-------------|
| **IDLE** | No active task, ready to start |
| **RUNNING** | Task in progress, accepting checkpoints |
| **PAUSED** | Task suspended, state persisted |
| **COMPLETE** | Task finished successfully |
| **ABORTED** | Task terminated (error/timeout/cancel) |

**Key Features:**
- Auto-checkpoint after each completed step
- Resume skips already-completed steps
- File-based or Redis storage backends
- Zod schema validation on checkpoint data

```typescript
// Resume a paused task
const checkpoint = await checkpointManager.resumeTask(taskId);
console.log(`Resuming from step ${checkpoint.currentStep}`);
```

**-> NS Part III §22.4**  -  Full state machine implementation



#### ULTRATHINK Escalation Protocol

Extended thinking mode for complex reasoning - 10-100x more thinking tokens.

| Budget Level | Tokens | Best For |
|--------------|--------|----------|
| **STANDARD** | 0 | Routine tasks |
| **ELEVATED** | 10K | Moderate complexity |
| **DEEP** | 32K | High complexity |
| **ULTRATHINK** | 64K | Critical decisions |
| **MAXIMUM** | 128K | Extreme complexity |

**Escalation Triggers:**
- Multiple failed attempts (confidence dropping)
- Agent expresses uncertainty
- 5+ interacting components
- Security-critical decisions
- Architecture with long-term implications

```typescript
// Enable extended thinking
const response = await anthropic.messages.create({
  model: 'claude-sonnet-4-20250514',
  thinking: { type: 'enabled', budget_tokens: 32000 },
  messages: [{ role: 'user', content: complexProblem }],
});
```

**-> NS Part VII §14.2.3**  -  Full implementation patterns

---

### Quality Gates

```
□ Input validation implemented
□ Output validation configured
□ PII detection enabled
□ Jailbreak tests passed
□ Bias evaluation completed
□ Audit logging enabled
□ Incident response planned
```

### Cross-Category Dependencies
- **â†' Category 29-34** (AI)  -  AI systems to protect
- **â†' Category 52** (Security)  -  Security integration
- **â†' Category 56** (Compliance)  -  Regulatory compliance

---

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
