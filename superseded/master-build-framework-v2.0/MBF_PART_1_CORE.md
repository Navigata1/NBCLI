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

