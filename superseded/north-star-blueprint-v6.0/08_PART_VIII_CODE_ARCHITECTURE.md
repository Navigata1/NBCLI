# PART VIII: CODE ARCHITECTURE & PATTERNS

---

## 37. ARCHITECTURE SELECTION MATRIX

> "Architecture is the art of how to waste space." — Philip Johnson
> "Software architecture is the art of how to waste complexity." — This Blueprint

### 37.1 Architecture Decision Framework

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    ARCHITECTURE SELECTION MATRIX                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  Architecture decisions are expensive to change. Choose deliberately.       │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                              │
│  ARCHITECTURE TYPES:                                                         │
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │ MONOLITH                                                             │    │
│  │                                                                      │    │
│  │ Single deployable unit                                               │    │
│  │ All code in one codebase                                             │    │
│  │                                                                      │    │
│  │ BEST FOR:                                                            │    │
│  │ • New projects (start here)                                          │    │
│  │ • Small teams (< 5 developers)                                       │    │
│  │ • Rapid iteration                                                    │    │
│  │ • Simple deployment needs                                            │    │
│  │                                                                      │    │
│  │ AVOID WHEN:                                                          │    │
│  │ • Multiple teams need independent deployment                         │    │
│  │ • Vastly different scaling needs per component                       │    │
│  │ • Different tech stacks needed per component                         │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │ MODULAR MONOLITH                                                     │    │
│  │                                                                      │    │
│  │ Single deployment with clear module boundaries                       │    │
│  │ Modules communicate through defined interfaces                       │    │
│  │                                                                      │    │
│  │ BEST FOR:                                                            │    │
│  │ • Growing projects                                                   │    │
│  │ • Teams wanting microservice benefits without complexity             │    │
│  │ • Preparing for potential future split                               │    │
│  │                                                                      │    │
│  │ AVOID WHEN:                                                          │    │
│  │ • Team lacks discipline for boundaries                               │    │
│  │ • True independent scaling needed                                    │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │ MICROSERVICES                                                        │    │
│  │                                                                      │    │
│  │ Multiple independently deployable services                           │    │
│  │ Each owns its data and logic                                         │    │
│  │                                                                      │    │
│  │ BEST FOR:                                                            │    │
│  │ • Large organizations (multiple teams)                               │    │
│  │ • Different scaling requirements per service                         │    │
│  │ • Different tech stacks per service                                  │    │
│  │ • High availability requirements                                     │    │
│  │                                                                      │    │
│  │ AVOID WHEN:                                                          │    │
│  │ • Small team (< 10 developers)                                       │    │
│  │ • New project (premature optimization)                               │    │
│  │ • Tight coupling between components                                  │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │ SERVERLESS                                                           │    │
│  │                                                                      │    │
│  │ Functions as a service, event-driven                                 │    │
│  │ No server management                                                 │    │
│  │                                                                      │    │
│  │ BEST FOR:                                                            │    │
│  │ • Event-driven workloads                                             │    │
│  │ • Variable/unpredictable load                                        │    │
│  │ • Cost optimization (pay per use)                                    │    │
│  │ • Quick API endpoints                                                │    │
│  │                                                                      │    │
│  │ AVOID WHEN:                                                          │    │
│  │ • Long-running processes                                             │    │
│  │ • Consistent high load                                               │    │
│  │ • Complex state management                                           │    │
│  │ • Cold start latency is unacceptable                                 │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 37.2 Architecture Selection Decision Tree

```
ARCHITECTURE SELECTION DECISION TREE
─────────────────────────────────────────────────────────────────────────────

START: New project or major rewrite?

├── Team size?
│   ├── < 5 developers
│   │   └── MONOLITH (start simple)
│   │
│   ├── 5-15 developers
│   │   ├── Clear module boundaries needed?
│   │   │   ├── Yes → MODULAR MONOLITH
│   │   │   └── No → MONOLITH
│   │   │
│   └── > 15 developers
│       ├── Independent team deployment needed?
│       │   ├── Yes → MICROSERVICES
│       │   └── No → MODULAR MONOLITH
│
├── Workload characteristics?
│   ├── Event-driven, spiky load
│   │   └── Consider SERVERLESS (or hybrid)
│   │
│   ├── Consistent, predictable load
│   │   └── Traditional server architecture
│   │
│   └── Mixed workloads
│       └── Hybrid approach (monolith + serverless functions)

─────────────────────────────────────────────────────────────────────────────

GOLDEN RULE:
Start with the simplest architecture that could work.
You can always add complexity later.
You can rarely remove it.

─────────────────────────────────────────────────────────────────────────────
```

### 37.3 Frontend Architecture Patterns

```
FRONTEND ARCHITECTURE PATTERNS
─────────────────────────────────────────────────────────────────────────────

PATTERN: SINGLE PAGE APPLICATION (SPA)
─────────────────────────────────────────────────────────────────────────────
Description: All UI rendered in browser, API-driven

Pros:
• Rich, app-like experience
• Fast after initial load
• Great for complex interactions

Cons:
• Poor initial SEO (without SSR)
• Large initial bundle
• Requires JavaScript

Best for: Dashboards, apps behind auth, complex UIs


PATTERN: SERVER-SIDE RENDERING (SSR)
─────────────────────────────────────────────────────────────────────────────
Description: HTML generated on server, hydrated in browser

Pros:
• Good SEO
• Fast first paint
• Works without JavaScript (basic)

Cons:
• Server load
• More complex setup
• Slower interactions

Best for: Content sites, e-commerce, public-facing apps


PATTERN: STATIC SITE GENERATION (SSG)
─────────────────────────────────────────────────────────────────────────────
Description: HTML generated at build time

Pros:
• Fastest possible delivery (CDN)
• No server needed (after build)
• Excellent SEO

Cons:
• Content is stale until rebuild
• Build time scales with pages
• Not for highly dynamic content

Best for: Blogs, documentation, marketing sites


PATTERN: INCREMENTAL STATIC REGENERATION (ISR)
─────────────────────────────────────────────────────────────────────────────
Description: Static pages regenerated on-demand

Pros:
• SSG benefits with fresher content
• Scales well
• Background regeneration

Cons:
• More complex
• Stale content possible
• Framework-specific

Best for: Large content sites, e-commerce catalogs


PATTERN: ISLANDS ARCHITECTURE
─────────────────────────────────────────────────────────────────────────────
Description: Static HTML with interactive "islands"

Pros:
• Minimal JavaScript shipped
• Fast initial load
• Progressive enhancement

Cons:
• Less cohesive for complex apps
• State sharing complexity
• Newer pattern, less tooling

Best for: Content-heavy sites with interactive elements
```

---

## 38. TECHNOLOGY STACK SELECTION

### 38.1 Stack Selection Principles

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    STACK SELECTION PRINCIPLES                                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  PRINCIPLE 1: BORING TECHNOLOGY                                              │
│  ───────────────────────────────────────────────────────────────────────    │
│  Choose technologies that are proven, well-documented, and widely used.    │
│  "Boring" technology has fewer surprises.                                   │
│                                                                              │
│  Questions to ask:                                                           │
│  • How long has it been in production use?                                  │
│  • How large is the community?                                              │
│  • How good is the documentation?                                           │
│  • Can I hire developers who know it?                                       │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                              │
│  PRINCIPLE 2: RIGHT TOOL FOR THE JOB                                        │
│  ───────────────────────────────────────────────────────────────────────    │
│  Each technology should be the best fit for its purpose.                   │
│  Don't use a hammer for screws.                                             │
│                                                                              │
│  Questions to ask:                                                           │
│  • What is this technology optimized for?                                   │
│  • Does it match our use case?                                              │
│  • What are we trading off?                                                  │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                              │
│  PRINCIPLE 3: MINIMIZE TECHNOLOGY COUNT                                      │
│  ───────────────────────────────────────────────────────────────────────    │
│  Every technology has a learning curve and maintenance cost.               │
│  Fewer technologies = simpler system = faster development.                  │
│                                                                              │
│  Questions to ask:                                                           │
│  • Can we reuse existing technology?                                        │
│  • Is the new technology worth the complexity?                              │
│  • What's the total cost of ownership?                                      │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                              │
│  PRINCIPLE 4: TEAM CAPABILITY                                                │
│  ───────────────────────────────────────────────────────────────────────    │
│  The best technology is one your team can use effectively.                 │
│  A technology is only as good as its implementation.                       │
│                                                                              │
│  Questions to ask:                                                           │
│  • Does the team know this technology?                                      │
│  • How long to become productive?                                           │
│  • Are there training resources?                                            │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 38.2 Stack Selection Matrix

```
STACK SELECTION BY PROJECT TYPE
─────────────────────────────────────────────────────────────────────────────

PROJECT: STARTUP MVP / RAPID PROTOTYPE
─────────────────────────────────────────────────────────────────────────────
Priority: Speed, iteration, minimal infrastructure

Recommended Stack:
• Frontend: Next.js (full-stack capabilities)
• Backend: Next.js API routes or separate Node/Python
• Database: PostgreSQL (Supabase/Neon for managed)
• Auth: Clerk, Supabase Auth, or NextAuth
• Hosting: Vercel, Railway, or Render
• Styling: Tailwind CSS

Reasoning: Full-stack framework reduces decisions, managed services reduce ops


PROJECT: ENTERPRISE APPLICATION
─────────────────────────────────────────────────────────────────────────────
Priority: Maintainability, scalability, security

Recommended Stack:
• Frontend: React/Vue with strong typing
• Backend: Node.js/Java/.NET with strict architecture
• Database: PostgreSQL/Oracle with proper migrations
• Auth: Enterprise SSO (Okta, Azure AD)
• Hosting: Cloud provider (AWS/GCP/Azure)
• Styling: Component library (MUI, Ant Design)

Reasoning: Proven technologies with enterprise support and tooling


PROJECT: CONTENT-HEAVY SITE
─────────────────────────────────────────────────────────────────────────────
Priority: SEO, performance, content management

Recommended Stack:
• Framework: Next.js, Astro, or Remix
• CMS: Sanity, Contentful, or Strapi
• Database: PostgreSQL or CMS-provided
• Hosting: Vercel, Netlify, or Cloudflare
• Styling: Tailwind CSS

Reasoning: SSG/SSR capabilities, headless CMS flexibility


PROJECT: REAL-TIME APPLICATION
─────────────────────────────────────────────────────────────────────────────
Priority: Low latency, live updates, scalability

Recommended Stack:
• Frontend: React with real-time library
• Backend: Node.js with WebSocket support
• Real-time: Supabase Realtime, Pusher, or Socket.io
• Database: PostgreSQL with change streams
• Hosting: Fly.io, Railway, or AWS

Reasoning: WebSocket-native infrastructure, edge deployment


PROJECT: AI-POWERED APPLICATION
─────────────────────────────────────────────────────────────────────────────
Priority: AI integration, processing capability, cost management

Recommended Stack:
• Frontend: Next.js or React
• Backend: Python (FastAPI) or Node.js
• AI: Anthropic API, OpenAI API, local models
• Database: PostgreSQL + pgvector for embeddings
• Queue: Redis or cloud queues for async processing
• Hosting: Vercel + serverless functions or dedicated GPU

Reasoning: Python ecosystem for AI, vector storage for embeddings
```

---

## 39. CODE ORGANIZATION STANDARDS

### 39.1 Project Structure Patterns

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    PROJECT STRUCTURE PATTERNS                                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  PATTERN: FEATURE-BASED (Recommended for most projects)                     │
│  ───────────────────────────────────────────────────────────────────────    │
│                                                                              │
│  project/                                                                    │
│  ├── src/                                                                    │
│  │   ├── features/                 # Feature modules                        │
│  │   │   ├── auth/                                                          │
│  │   │   │   ├── components/       # Feature-specific components           │
│  │   │   │   ├── hooks/            # Feature-specific hooks                 │
│  │   │   │   ├── api/              # Feature-specific API calls            │
│  │   │   │   ├── utils/            # Feature-specific utilities            │
│  │   │   │   ├── types.ts          # Feature-specific types                │
│  │   │   │   └── index.ts          # Public exports                         │
│  │   │   ├── dashboard/                                                     │
│  │   │   └── settings/                                                      │
│  │   │                                                                      │
│  │   ├── shared/                   # Shared across features                 │
│  │   │   ├── components/           # Shared UI components                   │
│  │   │   ├── hooks/                # Shared hooks                           │
│  │   │   ├── utils/                # Shared utilities                       │
│  │   │   └── types/                # Shared types                           │
│  │   │                                                                      │
│  │   ├── lib/                      # Third-party configurations            │
│  │   ├── styles/                   # Global styles                          │
│  │   └── app/                      # App entry, routing                     │
│  │                                                                          │
│  ├── tests/                        # Test files (or co-located)            │
│  ├── public/                       # Static assets                          │
│  └── docs/                         # Documentation                          │
│                                                                              │
│  BENEFITS:                                                                   │
│  • Related code is co-located                                               │
│  • Easy to find files                                                        │
│  • Features can be moved/deleted easily                                     │
│  • Clear boundaries between features                                        │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 39.2 Naming Conventions

```
NAMING CONVENTIONS
─────────────────────────────────────────────────────────────────────────────

FILES & DIRECTORIES:
─────────────────────────────────────────────────────────────────────────────
Components:     PascalCase.tsx       UserProfile.tsx
Hooks:          camelCase.ts         useAuth.ts
Utilities:      camelCase.ts         formatDate.ts
Types:          camelCase.ts         user.types.ts
Tests:          same-name.test.ts    UserProfile.test.tsx
Styles:         same-name.css        UserProfile.module.css
Constants:      camelCase.ts         config.ts
API:            camelCase.ts         userApi.ts


VARIABLES & FUNCTIONS:
─────────────────────────────────────────────────────────────────────────────
Variables:      camelCase            userName, isLoading
Constants:      SCREAMING_SNAKE      MAX_RETRY_COUNT, API_URL
Functions:      camelCase            getUserById, formatDate
Components:     PascalCase           UserProfile, Button
Hooks:          use prefix           useAuth, useLocalStorage
Event handlers: handle prefix        handleClick, handleSubmit
Boolean vars:   is/has/should        isLoading, hasError, shouldRender


TYPES & INTERFACES:
─────────────────────────────────────────────────────────────────────────────
Types:          PascalCase           User, CreateUserInput
Interfaces:     PascalCase           UserRepository, AuthService
Enums:          PascalCase           UserRole, OrderStatus
Type params:    Single letter or     T, K, V or TData, TError
                descriptive


CSS CLASSES:
─────────────────────────────────────────────────────────────────────────────
BEM style:      block__element--modifier
                card__title--large
                button--primary
                form__input--error

Tailwind:       Utility classes (no custom naming needed)
CSS Modules:    camelCase (auto-scoped)
```

### 39.3 Import Organization

```
IMPORT ORGANIZATION
─────────────────────────────────────────────────────────────────────────────

ORDER (top to bottom):
─────────────────────────────────────────────────────────────────────────────
1. External packages (node_modules)
2. Internal packages (@company/*)
3. Absolute imports from src (@/*)
4. Relative imports (../, ./)
5. Type imports (if separate)
6. Style imports

EXAMPLE:
```typescript
// 1. External packages
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';

// 2. Internal packages (if monorepo)
import { Button } from '@company/ui';

// 3. Absolute imports
import { api } from '@/lib/api';
import { formatDate } from '@/shared/utils';

// 4. Relative imports
import { UserAvatar } from './UserAvatar';
import { useUserData } from '../hooks/useUserData';

// 5. Type imports
import type { User } from '@/shared/types';

// 6. Style imports
import styles from './UserProfile.module.css';
```

ESLINT CONFIGURATION:
```json
{
  "rules": {
    "import/order": [
      "error",
      {
        "groups": [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
          "type"
        ],
        "newlines-between": "always",
        "alphabetize": {
          "order": "asc"
        }
      }
    ]
  }
}
```
```

---

## 40. DATABASE PATTERNS

### 40.1 Database Selection

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       DATABASE SELECTION                                     │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  DATABASE TYPE        │ BEST FOR                    │ EXAMPLES              │
│  ─────────────────────┼─────────────────────────────┼───────────────────── │
│                       │                             │                       │
│  RELATIONAL (SQL)     │ Structured data             │ PostgreSQL           │
│                       │ Complex queries             │ MySQL                │
│                       │ ACID transactions           │ SQLite               │
│                       │ Relationships               │                       │
│                       │                             │                       │
│  ─────────────────────┼─────────────────────────────┼───────────────────── │
│                       │                             │                       │
│  DOCUMENT (NoSQL)     │ Flexible schema             │ MongoDB              │
│                       │ Nested data                 │ Firestore            │
│                       │ Rapid iteration             │ CouchDB              │
│                       │ Horizontal scaling          │                       │
│                       │                             │                       │
│  ─────────────────────┼─────────────────────────────┼───────────────────── │
│                       │                             │                       │
│  KEY-VALUE            │ Caching                     │ Redis                │
│                       │ Session storage             │ DynamoDB             │
│                       │ Simple lookups              │ Memcached            │
│                       │ High throughput             │                       │
│                       │                             │                       │
│  ─────────────────────┼─────────────────────────────┼───────────────────── │
│                       │                             │                       │
│  VECTOR               │ AI embeddings               │ Pinecone             │
│                       │ Similarity search           │ pgvector             │
│                       │ Recommendation              │ Weaviate             │
│                       │ Semantic search             │ Chroma               │
│                       │                             │                       │
│  ─────────────────────┼─────────────────────────────┼───────────────────── │
│                       │                             │                       │
│  GRAPH                │ Relationships               │ Neo4j                │
│                       │ Social networks             │ Amazon Neptune       │
│                       │ Recommendation              │ ArangoDB             │
│                       │ Knowledge graphs            │                       │
│                       │                             │                       │
└─────────────────────────────────────────────────────────────────────────────┘

DEFAULT CHOICE: PostgreSQL
─────────────────────────────────────────────────────────────────────────────
PostgreSQL is the default recommendation because:
• Handles 90% of use cases
• JSON support for document-like needs
• pgvector for AI embeddings
• Excellent tooling and hosting options
• ACID compliance
• Open source with no licensing concerns
```

### 40.2 Database Schema Patterns

```
DATABASE SCHEMA PATTERNS
─────────────────────────────────────────────────────────────────────────────

PATTERN: STANDARD ENTITY COLUMNS
─────────────────────────────────────────────────────────────────────────────
Every table should have:

```sql
CREATE TABLE users (
  -- Primary key
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Entity-specific columns
  email VARCHAR(255) NOT NULL UNIQUE,
  name VARCHAR(255) NOT NULL,
  
  -- Standard audit columns
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  
  -- Soft delete (optional but recommended)
  deleted_at TIMESTAMPTZ
);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();
```

PATTERN: PROPER FOREIGN KEYS
─────────────────────────────────────────────────────────────────────────────
```sql
CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  content TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Always index foreign keys
CREATE INDEX posts_user_id_idx ON posts(user_id);
```

PATTERN: ENUM TYPES
─────────────────────────────────────────────────────────────────────────────
```sql
-- Define enum type
CREATE TYPE order_status AS ENUM (
  'pending',
  'processing',
  'shipped',
  'delivered',
  'cancelled'
);

-- Use in table
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  status order_status NOT NULL DEFAULT 'pending',
  -- ...
);
```

PATTERN: JSON COLUMNS (When appropriate)
─────────────────────────────────────────────────────────────────────────────
```sql
CREATE TABLE user_preferences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  
  -- JSONB for flexible, queryable data
  preferences JSONB NOT NULL DEFAULT '{}',
  
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index for JSON queries
CREATE INDEX user_preferences_gin ON user_preferences USING GIN (preferences);
```
```

### 40.3 Migration Discipline

```
MIGRATION DISCIPLINE
─────────────────────────────────────────────────────────────────────────────

RULE 1: MIGRATIONS ARE IMMUTABLE
─────────────────────────────────────────────────────────────────────────────
Once a migration has been run in any environment:
• NEVER modify it
• Create a new migration for changes
• Previous migrations are history


RULE 2: MIGRATIONS MUST BE REVERSIBLE
─────────────────────────────────────────────────────────────────────────────
Every "up" should have a corresponding "down":

```typescript
// Good: Reversible
export async function up(db) {
  await db.schema.createTable('posts', (t) => {
    t.uuid('id').primaryKey();
    t.string('title').notNull();
  });
}

export async function down(db) {
  await db.schema.dropTable('posts');
}
```


RULE 3: TEST MIGRATIONS BEFORE PRODUCTION
─────────────────────────────────────────────────────────────────────────────
□ Run migration against copy of production data
□ Verify data integrity after migration
□ Test rollback procedure
□ Estimate migration duration
□ Plan for zero-downtime if required


RULE 4: NAMING CONVENTION
─────────────────────────────────────────────────────────────────────────────
Format: [timestamp]_[description].ts

Examples:
  20240115120000_create_users_table.ts
  20240115130000_add_email_to_users.ts
  20240115140000_create_posts_table.ts


RULE 5: MIGRATION CHECKLIST
─────────────────────────────────────────────────────────────────────────────
□ Migration file created with timestamp
□ Up migration written and tested
□ Down migration written and tested
□ Indexes added for foreign keys
□ Constraints are appropriate
□ Default values considered
□ Null handling explicit
□ Migration reviewed by another developer
□ Tested against production-like data
□ Rollback procedure documented
```

---

## 41. API DESIGN PRINCIPLES

### 42.0 RESTful API Guidelines

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       RESTful API GUIDELINES                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  RESOURCE NAMING                                                             │
│  ───────────────────────────────────────────────────────────────────────    │
│  • Use nouns, not verbs: /users not /getUsers                              │
│  • Use plural: /users not /user                                            │
│  • Use kebab-case: /user-profiles not /userProfiles                        │
│  • Nest for relationships: /users/{id}/posts                               │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                              │
│  HTTP METHODS                                                                │
│  ───────────────────────────────────────────────────────────────────────    │
│                                                                              │
│  GET     │ Read resource(s)      │ GET /users                              │
│          │ Idempotent, safe      │ GET /users/123                          │
│          │                       │                                         │
│  POST    │ Create resource       │ POST /users                             │
│          │ Not idempotent        │ Body: { name: "..." }                   │
│          │                       │                                         │
│  PUT     │ Replace resource      │ PUT /users/123                          │
│          │ Idempotent            │ Body: { full object }                   │
│          │                       │                                         │
│  PATCH   │ Partial update        │ PATCH /users/123                        │
│          │ Idempotent            │ Body: { fields to update }              │
│          │                       │                                         │
│  DELETE  │ Remove resource       │ DELETE /users/123                       │
│          │ Idempotent            │                                         │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                              │
│  STATUS CODES                                                                │
│  ───────────────────────────────────────────────────────────────────────    │
│                                                                              │
│  2xx SUCCESS                                                                 │
│  200 OK              │ General success                                      │
│  201 Created         │ Resource created (POST)                              │
│  204 No Content      │ Success, no body (DELETE)                           │
│                                                                              │
│  4xx CLIENT ERROR                                                            │
│  400 Bad Request     │ Invalid request syntax/body                          │
│  401 Unauthorized    │ Authentication required                              │
│  403 Forbidden       │ Authenticated but not authorized                     │
│  404 Not Found       │ Resource doesn't exist                               │
│  409 Conflict        │ Resource conflict (duplicate)                        │
│  422 Unprocessable   │ Validation failed                                    │
│  429 Too Many Reqs   │ Rate limited                                         │
│                                                                              │
│  5xx SERVER ERROR                                                            │
│  500 Internal Error  │ Server error (our fault)                             │
│  502 Bad Gateway     │ Upstream service failed                              │
│  503 Unavailable     │ Service temporarily down                             │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 41.2 API Response Formats

```
API RESPONSE FORMATS
─────────────────────────────────────────────────────────────────────────────

SUCCESS RESPONSE (Single Resource):
```json
{
  "data": {
    "id": "123",
    "type": "user",
    "attributes": {
      "email": "user@example.com",
      "name": "John Doe",
      "createdAt": "2024-01-15T12:00:00Z"
    }
  }
}
```

SUCCESS RESPONSE (Collection):
```json
{
  "data": [
    { "id": "1", "type": "user", "attributes": { ... } },
    { "id": "2", "type": "user", "attributes": { ... } }
  ],
  "meta": {
    "total": 100,
    "page": 1,
    "perPage": 20,
    "totalPages": 5
  },
  "links": {
    "self": "/api/users?page=1",
    "next": "/api/users?page=2",
    "last": "/api/users?page=5"
  }
}
```

ERROR RESPONSE:
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed",
    "details": [
      {
        "field": "email",
        "message": "Email is already taken"
      },
      {
        "field": "password",
        "message": "Password must be at least 8 characters"
      }
    ]
  }
}
```

SIMPLER ALTERNATIVE (For smaller APIs):
```json
// Success
{
  "id": "123",
  "email": "user@example.com",
  "name": "John Doe"
}

// Error
{
  "error": "Validation failed",
  "code": "VALIDATION_ERROR",
  "details": { ... }
}
```
```

### 41.3 API Versioning

```
API VERSIONING STRATEGIES
─────────────────────────────────────────────────────────────────────────────

STRATEGY 1: URL PATH (Recommended)
─────────────────────────────────────────────────────────────────────────────
/api/v1/users
/api/v2/users

Pros: Clear, easy to understand, easy to route
Cons: URL pollution, harder to sunset

STRATEGY 2: HEADER
─────────────────────────────────────────────────────────────────────────────
GET /api/users
Accept-Version: v1

Pros: Clean URLs
Cons: Hidden, easy to forget, harder to test

STRATEGY 3: QUERY PARAMETER
─────────────────────────────────────────────────────────────────────────────
/api/users?version=1

Pros: Visible, easy to change
Cons: Query string pollution, caching issues

─────────────────────────────────────────────────────────────────────────────

RECOMMENDATION: URL Path versioning

• Start with /api/v1/
• Only increment major version for breaking changes
• Maintain previous version for reasonable deprecation period
• Communicate deprecation timeline clearly
```

---

## PART VIII SUMMARY

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                  PART VIII: CODE ARCHITECTURE & PATTERNS                     │
│                           KEY TAKEAWAYS                                      │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ARCHITECTURE SELECTION:                                                     │
│  ─────────────────────────────────────────────────────────────────────────  │
│  • Monolith: Start here (< 5 devs, new projects)                           │
│  • Modular Monolith: Growing projects, want boundaries                      │
│  • Microservices: Large orgs, independent scaling needs                     │
│  • Serverless: Event-driven, variable load                                  │
│  • Golden Rule: Start simple, add complexity only when needed              │
│                                                                              │
│  STACK SELECTION:                                                            │
│  ─────────────────────────────────────────────────────────────────────────  │
│  • Boring technology (proven, documented, community)                         │
│  • Right tool for the job                                                    │
│  • Minimize technology count                                                 │
│  • Team capability matters                                                   │
│  • Default: PostgreSQL + Next.js for most projects                          │
│                                                                              │
│  CODE ORGANIZATION:                                                          │
│  ─────────────────────────────────────────────────────────────────────────  │
│  • Feature-based structure (recommended)                                     │
│  • Consistent naming conventions                                             │
│  • Organized imports (external → internal → relative)                       │
│  • Clear module boundaries                                                   │
│                                                                              │
│  DATABASE PATTERNS:                                                          │
│  ─────────────────────────────────────────────────────────────────────────  │
│  • PostgreSQL as default choice                                              │
│  • Standard columns: id, created_at, updated_at, deleted_at                 │
│  • Always index foreign keys                                                 │
│  • Migrations are immutable and reversible                                   │
│                                                                              │
│  API DESIGN:                                                                 │
│  ─────────────────────────────────────────────────────────────────────────  │
│  • RESTful principles (nouns, plural, proper methods)                       │
│  • Correct status codes                                                      │
│  • Consistent response formats                                               │
│  • URL path versioning (/api/v1/)                                           │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---


---

## 🔄 PROPAGATED CONTENT FROM PART_5_IMPLEMENTATION.md (v6.0)

> This section contains synchronized content from the Modular 7-part structure.
> Source: `projects/Segment Mods/NSBP5.0 -Segments/PART_5_IMPLEMENTATION.md`

# NORTH STAR BLUEPRINT v6.0 — SEGMENT 5 of 7
## PART_5_IMPLEMENTATION
### Contents: Part VIII (Sections 37-41) + Part IX (Sections 42-45)
### Lines: 10287-12378 of original
---
> **SEGMENT NAVIGATION:** This is a development segment. For full Blueprint, merge all 7 parts.
> For BRIDGE routing: Sections 37-45 are in this segment.
---

# PART VIII: CODE ARCHITECTURE & PATTERNS

---

## 37. ARCHITECTURE SELECTION MATRIX

> "Architecture is the art of how to waste space." — Philip Johnson
> "Software architecture is the art of how to waste complexity." — This Blueprint

### 37.1 Architecture Decision Framework

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    ARCHITECTURE SELECTION MATRIX                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  Architecture decisions are expensive to change. Choose deliberately.       │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                              │
│  ARCHITECTURE TYPES:                                                         │
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │ MONOLITH                                                             │    │
│  │                                                                      │    │
│  │ Single deployable unit                                               │    │
│  │ All code in one codebase                                             │    │
│  │                                                                      │    │
│  │ BEST FOR:                                                            │    │
│  │ • New projects (start here)                                          │    │
│  │ • Small teams (< 5 developers)                                       │    │
│  │ • Rapid iteration                                                    │    │
│  │ • Simple deployment needs                                            │    │
│  │                                                                      │    │
│  │ AVOID WHEN:                                                          │    │
│  │ • Multiple teams need independent deployment                         │    │
│  │ • Vastly different scaling needs per component                       │    │
│  │ • Different tech stacks needed per component                         │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │ MODULAR MONOLITH                                                     │    │
│  │                                                                      │    │
│  │ Single deployment with clear module boundaries                       │    │
│  │ Modules communicate through defined interfaces                       │    │
│  │                                                                      │    │
│  │ BEST FOR:                                                            │    │
│  │ • Growing projects                                                   │    │
│  │ • Teams wanting microservice benefits without complexity             │    │
│  │ • Preparing for potential future split                               │    │
│  │                                                                      │    │
│  │ AVOID WHEN:                                                          │    │
│  │ • Team lacks discipline for boundaries                               │    │
│  │ • True independent scaling needed                                    │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │ MICROSERVICES                                                        │    │
│  │                                                                      │    │
│  │ Multiple independently deployable services                           │    │
│  │ Each owns its data and logic                                         │    │
│  │                                                                      │    │
│  │ BEST FOR:                                                            │    │
│  │ • Large organizations (multiple teams)                               │    │
│  │ • Different scaling requirements per service                         │    │
│  │ • Different tech stacks per service                                  │    │
│  │ • High availability requirements                                     │    │
│  │                                                                      │    │
│  │ AVOID WHEN:                                                          │    │
│  │ • Small team (< 10 developers)                                       │    │
│  │ • New project (premature optimization)                               │    │
│  │ • Tight coupling between components                                  │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │ SERVERLESS                                                           │    │
│  │                                                                      │    │
│  │ Functions as a service, event-driven                                 │    │
│  │ No server management                                                 │    │
│  │                                                                      │    │
│  │ BEST FOR:                                                            │    │
│  │ • Event-driven workloads                                             │    │
│  │ • Variable/unpredictable load                                        │    │
│  │ • Cost optimization (pay per use)                                    │    │
│  │ • Quick API endpoints                                                │    │
│  │                                                                      │    │
│  │ AVOID WHEN:                                                          │    │
│  │ • Long-running processes                                             │    │
│  │ • Consistent high load                                               │    │
│  │ • Complex state management                                           │    │
│  │ • Cold start latency is unacceptable                                 │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 37.2 Architecture Selection Decision Tree

```
ARCHITECTURE SELECTION DECISION TREE
─────────────────────────────────────────────────────────────────────────────

START: New project or major rewrite?

├── Team size?
│   ├── < 5 developers
│   │   └── MONOLITH (start simple)
│   │
│   ├── 5-15 developers
│   │   ├── Clear module boundaries needed?
│   │   │   ├── Yes → MODULAR MONOLITH
│   │   │   └── No → MONOLITH
│   │   │
│   └── > 15 developers
│       ├── Independent team deployment needed?
│       │   ├── Yes → MICROSERVICES
│       │   └── No → MODULAR MONOLITH
│
├── Workload characteristics?
│   ├── Event-driven, spiky load
│   │   └── Consider SERVERLESS (or hybrid)
│   │
│   ├── Consistent, predictable load
│   │   └── Traditional server architecture
│   │
│   └── Mixed workloads
│       └── Hybrid approach (monolith + serverless functions)

─────────────────────────────────────────────────────────────────────────────

GOLDEN RULE:
Start with the simplest architecture that could work.
You can always add complexity later.
You can rarely remove it.

─────────────────────────────────────────────────────────────────────────────
```

### 37.3 Frontend Architecture Patterns

```
FRONTEND ARCHITECTURE PATTERNS
─────────────────────────────────────────────────────────────────────────────

PATTERN: SINGLE PAGE APPLICATION (SPA)
─────────────────────────────────────────────────────────────────────────────
Description: All UI rendered in browser, API-driven

Pros:
• Rich, app-like experience
• Fast after initial load
• Great for complex interactions

Cons:
• Poor initial SEO (without SSR)
• Large initial bundle
• Requires JavaScript

Best for: Dashboards, apps behind auth, complex UIs


PATTERN: SERVER-SIDE RENDERING (SSR)
─────────────────────────────────────────────────────────────────────────────
Description: HTML generated on server, hydrated in browser

Pros:
• Good SEO
• Fast first paint
• Works without JavaScript (basic)

Cons:
• Server load
• More complex setup
• Slower interactions

Best for: Content sites, e-commerce, public-facing apps


PATTERN: STATIC SITE GENERATION (SSG)
─────────────────────────────────────────────────────────────────────────────
Description: HTML generated at build time

Pros:
• Fastest possible delivery (CDN)
• No server needed (after build)
• Excellent SEO

Cons:
• Content is stale until rebuild
• Build time scales with pages
• Not for highly dynamic content

Best for: Blogs, documentation, marketing sites


PATTERN: INCREMENTAL STATIC REGENERATION (ISR)
─────────────────────────────────────────────────────────────────────────────
Description: Static pages regenerated on-demand

Pros:
• SSG benefits with fresher content
• Scales well
• Background regeneration

Cons:
• More complex
• Stale content possible
• Framework-specific

Best for: Large content sites, e-commerce catalogs


PATTERN: ISLANDS ARCHITECTURE
─────────────────────────────────────────────────────────────────────────────
Description: Static HTML with interactive "islands"

Pros:
• Minimal JavaScript shipped
• Fast initial load
• Progressive enhancement

Cons:
• Less cohesive for complex apps
• State sharing complexity
• Newer pattern, less tooling

Best for: Content-heavy sites with interactive elements
```

---

## 38. TECHNOLOGY STACK SELECTION

### 38.1 Stack Selection Principles

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    STACK SELECTION PRINCIPLES                                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  PRINCIPLE 1: BORING TECHNOLOGY                                              │
│  ───────────────────────────────────────────────────────────────────────    │
│  Choose technologies that are proven, well-documented, and widely used.    │
│  "Boring" technology has fewer surprises.                                   │
│                                                                              │
│  Questions to ask:                                                           │
│  • How long has it been in production use?                                  │
│  • How large is the community?                                              │
│  • How good is the documentation?                                           │
│  • Can I hire developers who know it?                                       │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                              │
│  PRINCIPLE 2: RIGHT TOOL FOR THE JOB                                        │
│  ───────────────────────────────────────────────────────────────────────    │
│  Each technology should be the best fit for its purpose.                   │
│  Don't use a hammer for screws.                                             │
│                                                                              │
│  Questions to ask:                                                           │
│  • What is this technology optimized for?                                   │
│  • Does it match our use case?                                              │
│  • What are we trading off?                                                  │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                              │
│  PRINCIPLE 3: MINIMIZE TECHNOLOGY COUNT                                      │
│  ───────────────────────────────────────────────────────────────────────    │
│  Every technology has a learning curve and maintenance cost.               │
│  Fewer technologies = simpler system = faster development.                  │
│                                                                              │
│  Questions to ask:                                                           │
│  • Can we reuse existing technology?                                        │
│  • Is the new technology worth the complexity?                              │
│  • What's the total cost of ownership?                                      │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                              │
│  PRINCIPLE 4: TEAM CAPABILITY                                                │
│  ───────────────────────────────────────────────────────────────────────    │
│  The best technology is one your team can use effectively.                 │
│  A technology is only as good as its implementation.                       │
│                                                                              │
│  Questions to ask:                                                           │
│  • Does the team know this technology?                                      │
│  • How long to become productive?                                           │
│  • Are there training resources?                                            │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 38.2 Stack Selection Matrix

```
STACK SELECTION BY PROJECT TYPE
─────────────────────────────────────────────────────────────────────────────

PROJECT: STARTUP MVP / RAPID PROTOTYPE
─────────────────────────────────────────────────────────────────────────────
Priority: Speed, iteration, minimal infrastructure

Recommended Stack:
• Frontend: Next.js (full-stack capabilities)
• Backend: Next.js API routes or separate Node/Python
• Database: PostgreSQL (Supabase/Neon for managed)
• Auth: Clerk, Supabase Auth, or NextAuth
• Hosting: Vercel, Railway, or Render
• Styling: Tailwind CSS

Reasoning: Full-stack framework reduces decisions, managed services reduce ops


PROJECT: ENTERPRISE APPLICATION
─────────────────────────────────────────────────────────────────────────────
Priority: Maintainability, scalability, security

Recommended Stack:
• Frontend: React/Vue with strong typing
• Backend: Node.js/Java/.NET with strict architecture
• Database: PostgreSQL/Oracle with proper migrations
• Auth: Enterprise SSO (Okta, Azure AD)
• Hosting: Cloud provider (AWS/GCP/Azure)
• Styling: Component library (MUI, Ant Design)

Reasoning: Proven technologies with enterprise support and tooling


PROJECT: CONTENT-HEAVY SITE
─────────────────────────────────────────────────────────────────────────────
Priority: SEO, performance, content management

Recommended Stack:
• Framework: Next.js, Astro, or Remix
• CMS: Sanity, Contentful, or Strapi
• Database: PostgreSQL or CMS-provided
• Hosting: Vercel, Netlify, or Cloudflare
• Styling: Tailwind CSS

Reasoning: SSG/SSR capabilities, headless CMS flexibility


PROJECT: REAL-TIME APPLICATION
─────────────────────────────────────────────────────────────────────────────
Priority: Low latency, live updates, scalability

Recommended Stack:
• Frontend: React with real-time library
• Backend: Node.js with WebSocket support
• Real-time: Supabase Realtime, Pusher, or Socket.io
• Database: PostgreSQL with change streams
• Hosting: Fly.io, Railway, or AWS

Reasoning: WebSocket-native infrastructure, edge deployment


PROJECT: AI-POWERED APPLICATION
─────────────────────────────────────────────────────────────────────────────
Priority: AI integration, processing capability, cost management

Recommended Stack:
• Frontend: Next.js or React
• Backend: Python (FastAPI) or Node.js
• AI: Anthropic API, OpenAI API, local models
• Database: PostgreSQL + pgvector for embeddings
• Queue: Redis or cloud queues for async processing
• Hosting: Vercel + serverless functions or dedicated GPU

Reasoning: Python ecosystem for AI, vector storage for embeddings
```

---

## 39. CODE ORGANIZATION STANDARDS

### 39.1 Project Structure Patterns

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    PROJECT STRUCTURE PATTERNS                                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  PATTERN: FEATURE-BASED (Recommended for most projects)                     │
│  ───────────────────────────────────────────────────────────────────────    │
│                                                                              │
│  project/                                                                    │
│  ├── src/                                                                    │
│  │   ├── features/                 # Feature modules                        │
│  │   │   ├── auth/                                                          │
│  │   │   │   ├── components/       # Feature-specific components           │
│  │   │   │   ├── hooks/            # Feature-specific hooks                 │
│  │   │   │   ├── api/              # Feature-specific API calls            │
│  │   │   │   ├── utils/            # Feature-specific utilities            │
│  │   │   │   ├── types.ts          # Feature-specific types                │
│  │   │   │   └── index.ts          # Public exports                         │
│  │   │   ├── dashboard/                                                     │
│  │   │   └── settings/                                                      │
│  │   │                                                                      │
│  │   ├── shared/                   # Shared across features                 │
│  │   │   ├── components/           # Shared UI components                   │
│  │   │   ├── hooks/                # Shared hooks                           │
│  │   │   ├── utils/                # Shared utilities                       │
│  │   │   └── types/                # Shared types                           │
│  │   │                                                                      │
│  │   ├── lib/                      # Third-party configurations            │
│  │   ├── styles/                   # Global styles                          │
│  │   └── app/                      # App entry, routing                     │
│  │                                                                          │
│  ├── tests/                        # Test files (or co-located)            │
│  ├── public/                       # Static assets                          │
│  └── docs/                         # Documentation                          │
│                                                                              │
│  BENEFITS:                                                                   │
│  • Related code is co-located                                               │
│  • Easy to find files                                                        │
│  • Features can be moved/deleted easily                                     │
│  • Clear boundaries between features                                        │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 39.2 Naming Conventions

```
NAMING CONVENTIONS
─────────────────────────────────────────────────────────────────────────────

FILES & DIRECTORIES:
─────────────────────────────────────────────────────────────────────────────
Components:     PascalCase.tsx       UserProfile.tsx
Hooks:          camelCase.ts         useAuth.ts
Utilities:      camelCase.ts         formatDate.ts
Types:          camelCase.ts         user.types.ts
Tests:          same-name.test.ts    UserProfile.test.tsx
Styles:         same-name.css        UserProfile.module.css
Constants:      camelCase.ts         config.ts
API:            camelCase.ts         userApi.ts


VARIABLES & FUNCTIONS:
─────────────────────────────────────────────────────────────────────────────
Variables:      camelCase            userName, isLoading
Constants:      SCREAMING_SNAKE      MAX_RETRY_COUNT, API_URL
Functions:      camelCase            getUserById, formatDate
Components:     PascalCase           UserProfile, Button
Hooks:          use prefix           useAuth, useLocalStorage
Event handlers: handle prefix        handleClick, handleSubmit
Boolean vars:   is/has/should        isLoading, hasError, shouldRender


TYPES & INTERFACES:
─────────────────────────────────────────────────────────────────────────────
Types:          PascalCase           User, CreateUserInput
Interfaces:     PascalCase           UserRepository, AuthService
Enums:          PascalCase           UserRole, OrderStatus
Type params:    Single letter or     T, K, V or TData, TError
                descriptive


CSS CLASSES:
─────────────────────────────────────────────────────────────────────────────
BEM style:      block__element--modifier
                card__title--large
                button--primary
                form__input--error

Tailwind:       Utility classes (no custom naming needed)
CSS Modules:    camelCase (auto-scoped)
```

### 39.3 Import Organization

```
IMPORT ORGANIZATION
─────────────────────────────────────────────────────────────────────────────

ORDER (top to bottom):
─────────────────────────────────────────────────────────────────────────────
1. External packages (node_modules)
2. Internal packages (@company/*)
3. Absolute imports from src (@/*)
4. Relative imports (../, ./)
5. Type imports (if separate)
6. Style imports

EXAMPLE:
```typescript
// 1. External packages
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';

// 2. Internal packages (if monorepo)
import { Button } from '@company/ui';

// 3. Absolute imports
import { api } from '@/lib/api';
import { formatDate } from '@/shared/utils';

// 4. Relative imports
import { UserAvatar } from './UserAvatar';
import { useUserData } from '../hooks/useUserData';

// 5. Type imports
import type { User } from '@/shared/types';

// 6. Style imports
import styles from './UserProfile.module.css';
```

ESLINT CONFIGURATION:
```json
{
  "rules": {
    "import/order": [
      "error",
      {
        "groups": [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
          "type"
        ],
        "newlines-between": "always",
        "alphabetize": {
          "order": "asc"
        }
      }
    ]
  }
}
```
```

---

## 40. DATABASE PATTERNS

### 40.1 Database Selection

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       DATABASE SELECTION                                     │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  DATABASE TYPE        │ BEST FOR                    │ EXAMPLES              │
│  ─────────────────────┼─────────────────────────────┼───────────────────── │
│                       │                             │                       │
│  RELATIONAL (SQL)     │ Structured data             │ PostgreSQL           │
│                       │ Complex queries             │ MySQL                │
│                       │ ACID transactions           │ SQLite               │
│                       │ Relationships               │                       │
│                       │                             │                       │
│  ─────────────────────┼─────────────────────────────┼───────────────────── │
│                       │                             │                       │
│  DOCUMENT (NoSQL)     │ Flexible schema             │ MongoDB              │
│                       │ Nested data                 │ Firestore            │
│                       │ Rapid iteration             │ CouchDB              │
│                       │ Horizontal scaling          │                       │
│                       │                             │                       │
│  ─────────────────────┼─────────────────────────────┼───────────────────── │
│                       │                             │                       │
│  KEY-VALUE            │ Caching                     │ Redis                │
│                       │ Session storage             │ DynamoDB             │
│                       │ Simple lookups              │ Memcached            │
│                       │ High throughput             │                       │
│                       │                             │                       │
│  ─────────────────────┼─────────────────────────────┼───────────────────── │
│                       │                             │                       │
│  VECTOR               │ AI embeddings               │ Pinecone             │
│                       │ Similarity search           │ pgvector             │
│                       │ Recommendation              │ Weaviate             │
│                       │ Semantic search             │ Chroma               │
│                       │                             │                       │
│  ─────────────────────┼─────────────────────────────┼───────────────────── │
│                       │                             │                       │
│  GRAPH                │ Relationships               │ Neo4j                │
│                       │ Social networks             │ Amazon Neptune       │
│                       │ Recommendation              │ ArangoDB             │
│                       │ Knowledge graphs            │                       │
│                       │                             │                       │
└─────────────────────────────────────────────────────────────────────────────┘

DEFAULT CHOICE: PostgreSQL
─────────────────────────────────────────────────────────────────────────────
PostgreSQL is the default recommendation because:
• Handles 90% of use cases
• JSON support for document-like needs
• pgvector for AI embeddings
• Excellent tooling and hosting options
• ACID compliance
• Open source with no licensing concerns
```

### 40.2 Database Schema Patterns

```
DATABASE SCHEMA PATTERNS
─────────────────────────────────────────────────────────────────────────────

PATTERN: STANDARD ENTITY COLUMNS
─────────────────────────────────────────────────────────────────────────────
Every table should have:

```sql
CREATE TABLE users (
  -- Primary key
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Entity-specific columns
  email VARCHAR(255) NOT NULL UNIQUE,
  name VARCHAR(255) NOT NULL,
  
  -- Standard audit columns
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  
  -- Soft delete (optional but recommended)
  deleted_at TIMESTAMPTZ
);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();
```

PATTERN: PROPER FOREIGN KEYS
─────────────────────────────────────────────────────────────────────────────
```sql
CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  content TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Always index foreign keys
CREATE INDEX posts_user_id_idx ON posts(user_id);
```

PATTERN: ENUM TYPES
─────────────────────────────────────────────────────────────────────────────
```sql
-- Define enum type
CREATE TYPE order_status AS ENUM (
  'pending',
  'processing',
  'shipped',
  'delivered',
  'cancelled'
);

-- Use in table
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  status order_status NOT NULL DEFAULT 'pending',
  -- ...
);
```

PATTERN: JSON COLUMNS (When appropriate)
─────────────────────────────────────────────────────────────────────────────
```sql
CREATE TABLE user_preferences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  
  -- JSONB for flexible, queryable data
  preferences JSONB NOT NULL DEFAULT '{}',
  
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index for JSON queries
CREATE INDEX user_preferences_gin ON user_preferences USING GIN (preferences);
```
```

### 40.3 Migration Discipline

```
MIGRATION DISCIPLINE
─────────────────────────────────────────────────────────────────────────────

RULE 1: MIGRATIONS ARE IMMUTABLE
─────────────────────────────────────────────────────────────────────────────
Once a migration has been run in any environment:
• NEVER modify it
• Create a new migration for changes
• Previous migrations are history


RULE 2: MIGRATIONS MUST BE REVERSIBLE
─────────────────────────────────────────────────────────────────────────────
Every "up" should have a corresponding "down":

```typescript
// Good: Reversible
export async function up(db) {
  await db.schema.createTable('posts', (t) => {
    t.uuid('id').primaryKey();
    t.string('title').notNull();
  });
}

export async function down(db) {
  await db.schema.dropTable('posts');
}
```


RULE 3: TEST MIGRATIONS BEFORE PRODUCTION
─────────────────────────────────────────────────────────────────────────────
□ Run migration against copy of production data
□ Verify data integrity after migration
□ Test rollback procedure
□ Estimate migration duration
□ Plan for zero-downtime if required


RULE 4: NAMING CONVENTION
─────────────────────────────────────────────────────────────────────────────
Format: [timestamp]_[description].ts

Examples:
  20240115120000_create_users_table.ts
  20240115130000_add_email_to_users.ts
  20240115140000_create_posts_table.ts


RULE 5: MIGRATION CHECKLIST
─────────────────────────────────────────────────────────────────────────────
□ Migration file created with timestamp
□ Up migration written and tested
□ Down migration written and tested
□ Indexes added for foreign keys
□ Constraints are appropriate
□ Default values considered
□ Null handling explicit
□ Migration reviewed by another developer
□ Tested against production-like data
□ Rollback procedure documented
```

---

## 41. API DESIGN PRINCIPLES

### 42.0 RESTful API Guidelines

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       RESTful API GUIDELINES                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  RESOURCE NAMING                                                             │
│  ───────────────────────────────────────────────────────────────────────    │
│  • Use nouns, not verbs: /users not /getUsers                              │
│  • Use plural: /users not /user                                            │
│  • Use kebab-case: /user-profiles not /userProfiles                        │
│  • Nest for relationships: /users/{id}/posts                               │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                              │
│  HTTP METHODS                                                                │
│  ───────────────────────────────────────────────────────────────────────    │
│                                                                              │
│  GET     │ Read resource(s)      │ GET /users                              │
│          │ Idempotent, safe      │ GET /users/123                          │
│          │                       │                                         │
│  POST    │ Create resource       │ POST /users                             │
│          │ Not idempotent        │ Body: { name: "..." }                   │
│          │                       │                                         │
│  PUT     │ Replace resource      │ PUT /users/123                          │
│          │ Idempotent            │ Body: { full object }                   │
│          │                       │                                         │
│  PATCH   │ Partial update        │ PATCH /users/123                        │
│          │ Idempotent            │ Body: { fields to update }              │
│          │                       │                                         │
│  DELETE  │ Remove resource       │ DELETE /users/123                       │
│          │ Idempotent            │                                         │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                              │
│  STATUS CODES                                                                │
│  ───────────────────────────────────────────────────────────────────────    │
│                                                                              │
│  2xx SUCCESS                                                                 │
│  200 OK              │ General success                                      │
│  201 Created         │ Resource created (POST)                              │
│  204 No Content      │ Success, no body (DELETE)                           │
│                                                                              │
│  4xx CLIENT ERROR                                                            │
│  400 Bad Request     │ Invalid request syntax/body                          │
│  401 Unauthorized    │ Authentication required                              │
│  403 Forbidden       │ Authenticated but not authorized                     │
│  404 Not Found       │ Resource doesn't exist                               │
│  409 Conflict        │ Resource conflict (duplicate)                        │
│  422 Unprocessable   │ Validation failed                                    │
│  429 Too Many Reqs   │ Rate limited                                         │
│                                                                              │
│  5xx SERVER ERROR                                                            │
│  500 Internal Error  │ Server error (our fault)                             │
│  502 Bad Gateway     │ Upstream service failed                              │
│  503 Unavailable     │ Service temporarily down                             │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 41.2 API Response Formats

```
API RESPONSE FORMATS
─────────────────────────────────────────────────────────────────────────────

SUCCESS RESPONSE (Single Resource):
```json
{
  "data": {
    "id": "123",
    "type": "user",
    "attributes": {
      "email": "user@example.com",
      "name": "John Doe",
      "createdAt": "2024-01-15T12:00:00Z"
    }
  }
}
```

SUCCESS RESPONSE (Collection):
```json
{
  "data": [
    { "id": "1", "type": "user", "attributes": { ... } },
    { "id": "2", "type": "user", "attributes": { ... } }
  ],
  "meta": {
    "total": 100,
    "page": 1,
    "perPage": 20,
    "totalPages": 5
  },
  "links": {
    "self": "/api/users?page=1",
    "next": "/api/users?page=2",
    "last": "/api/users?page=5"
  }
}
```

ERROR RESPONSE:
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed",
    "details": [
      {
        "field": "email",
        "message": "Email is already taken"
      },
      {
        "field": "password",
        "message": "Password must be at least 8 characters"
      }
    ]
  }
}
```

SIMPLER ALTERNATIVE (For smaller APIs):
```json
// Success
{
  "id": "123",
  "email": "user@example.com",
  "name": "John Doe"
}

// Error
{
  "error": "Validation failed",
  "code": "VALIDATION_ERROR",
  "details": { ... }
}
```
```

### 41.3 API Versioning

```
API VERSIONING STRATEGIES
─────────────────────────────────────────────────────────────────────────────

STRATEGY 1: URL PATH (Recommended)
─────────────────────────────────────────────────────────────────────────────
/api/v1/users
/api/v2/users

Pros: Clear, easy to understand, easy to route
Cons: URL pollution, harder to sunset

STRATEGY 2: HEADER
─────────────────────────────────────────────────────────────────────────────
GET /api/users
Accept-Version: v1

Pros: Clean URLs
Cons: Hidden, easy to forget, harder to test

STRATEGY 3: QUERY PARAMETER
─────────────────────────────────────────────────────────────────────────────
/api/users?version=1

Pros: Visible, easy to change
Cons: Query string pollution, caching issues

─────────────────────────────────────────────────────────────────────────────

RECOMMENDATION: URL Path versioning

• Start with /api/v1/
• Only increment major version for breaking changes
• Maintain previous version for reasonable deprecation period
• Communicate deprecation timeline clearly
```

---

## PART VIII SUMMARY

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                  PART VIII: CODE ARCHITECTURE & PATTERNS                     │
│                           KEY TAKEAWAYS                                      │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ARCHITECTURE SELECTION:                                                     │
│  ─────────────────────────────────────────────────────────────────────────  │
│  • Monolith: Start here (< 5 devs, new projects)                           │
│  • Modular Monolith: Growing projects, want boundaries                      │
│  • Microservices: Large orgs, independent scaling needs                     │
│  • Serverless: Event-driven, variable load                                  │
│  • Golden Rule: Start simple, add complexity only when needed              │
│                                                                              │
│  STACK SELECTION:                                                            │
│  ─────────────────────────────────────────────────────────────────────────  │
│  • Boring technology (proven, documented, community)                         │
│  • Right tool for the job                                                    │
│  • Minimize technology count                                                 │
│  • Team capability matters                                                   │
│  • Default: PostgreSQL + Next.js for most projects                          │
│                                                                              │
│  CODE ORGANIZATION:                                                          │
│  ─────────────────────────────────────────────────────────────────────────  │
│  • Feature-based structure (recommended)                                     │
│  • Consistent naming conventions                                             │
│  • Organized imports (external → internal → relative)                       │
│  • Clear module boundaries                                                   │
│                                                                              │
│  DATABASE PATTERNS:                                                          │
│  ─────────────────────────────────────────────────────────────────────────  │
│  • PostgreSQL as default choice                                              │
│  • Standard columns: id, created_at, updated_at, deleted_at                 │
│  • Always index foreign keys                                                 │
│  • Migrations are immutable and reversible                                   │
│                                                                              │
│  API DESIGN:                                                                 │
│  ─────────────────────────────────────────────────────────────────────────  │
│  • RESTful principles (nouns, plural, proper methods)                       │
│  • Correct status codes                                                      │
│  • Consistent response formats                                               │
│  • URL path versioning (/api/v1/)                                           │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---
# PART IX: TESTING & VERIFICATION FRAMEWORK

---

## 42. TESTING PHILOSOPHY

> "Tests are not overhead—they are the only proof that your code works."

### 42.1 The Testing Pyramid

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         THE TESTING PYRAMID                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│                              ╱╲                                              │
│                             ╱  ╲                                             │
│                            ╱ E2E╲                 Few, Slow, Expensive       │
│                           ╱──────╲                                           │
│                          ╱        ╲                                          │
│                         ╱Integration╲            Some, Medium                │
│                        ╱────────────╲                                        │
│                       ╱              ╲                                       │
│                      ╱      Unit      ╲          Many, Fast, Cheap          │
│                     ╱──────────────────╲                                     │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                              │
│  DISTRIBUTION GUIDE:                                                         │
│                                                                              │
│  UNIT TESTS (70% of tests)                                                   │
│  ───────────────────────────────────────────────────────────────────────    │
│  • Test individual functions/components in isolation                        │
│  • Mock external dependencies                                                │
│  • Fast execution (< 10ms per test)                                         │
│  • Run on every save/commit                                                  │
│                                                                              │
│  INTEGRATION TESTS (20% of tests)                                            │
│  ───────────────────────────────────────────────────────────────────────    │
│  • Test component interactions                                               │
│  • Test API endpoints with real database                                    │
│  • Medium execution time (< 1s per test)                                    │
│  • Run before every merge                                                    │
│                                                                              │
│  E2E TESTS (10% of tests)                                                    │
│  ───────────────────────────────────────────────────────────────────────    │
│  • Test critical user flows                                                  │
│  • Real browser, real backend                                                │
│  • Slow execution (seconds to minutes)                                      │
│  • Run before deployment                                                     │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 42.2 Testing Principles

```
TESTING PRINCIPLES
─────────────────────────────────────────────────────────────────────────────

PRINCIPLE 1: TEST BEHAVIOR, NOT IMPLEMENTATION
─────────────────────────────────────────────────────────────────────────────
BAD: Testing that a specific function is called
GOOD: Testing that the expected outcome occurs

// Bad: Testing implementation
expect(mockDb.query).toHaveBeenCalledWith('SELECT * FROM users');

// Good: Testing behavior
const users = await getUsers();
expect(users).toHaveLength(3);
expect(users[0].name).toBe('John');


PRINCIPLE 2: ONE ASSERTION FOCUS PER TEST
─────────────────────────────────────────────────────────────────────────────
Each test should verify one specific behavior.
Multiple assertions are fine if they verify the same behavior.

// Bad: Testing multiple behaviors
it('should handle user creation', () => {
  // Testing validation, creation, and email all in one
});

// Good: Separate tests for each behavior
it('should reject invalid email format', () => { ... });
it('should create user with valid data', () => { ... });
it('should send welcome email after creation', () => { ... });


PRINCIPLE 3: TESTS SHOULD BE INDEPENDENT
─────────────────────────────────────────────────────────────────────────────
Tests should not depend on each other.
Each test should set up its own state.

// Bad: Depending on previous test
it('should create user', () => { ... });
it('should update the created user', () => { /* depends on above */ });

// Good: Independent tests
it('should update user', () => {
  const user = await createTestUser(); // Set up own state
  await updateUser(user.id, { name: 'New Name' });
  // Assert...
});


PRINCIPLE 4: TESTS SHOULD BE DETERMINISTIC
─────────────────────────────────────────────────────────────────────────────
Same test should always produce same result.
Avoid: Random data, time-dependent logic, external services.

// Bad: Non-deterministic
it('should expire after 24 hours', () => {
  const token = createToken();
  // This test will fail differently at different times
});

// Good: Deterministic with time control
it('should expire after 24 hours', () => {
  jest.useFakeTimers();
  const token = createToken();
  jest.advanceTimersByTime(24 * 60 * 60 * 1000);
  expect(isTokenExpired(token)).toBe(true);
});


PRINCIPLE 5: TESTS ARE DOCUMENTATION
─────────────────────────────────────────────────────────────────────────────
Test names should describe the expected behavior.
Reading tests should explain how the system works.

// Bad: Unclear test names
it('test1', () => { ... });
it('should work', () => { ... });

// Good: Descriptive test names
it('should return 404 when user does not exist', () => { ... });
it('should hash password before storing', () => { ... });
it('should send email notification on successful order', () => { ... });
```

### 42.3 What to Test

```
WHAT TO TEST
─────────────────────────────────────────────────────────────────────────────

ALWAYS TEST:
─────────────────────────────────────────────────────────────────────────────
✓ Business logic
  • Core algorithms and calculations
  • State transitions
  • Decision trees

✓ API contracts
  • Request validation
  • Response format
  • Error handling
  • Status codes

✓ Data transformations
  • Input parsing
  • Output formatting
  • Mapping functions

✓ Edge cases
  • Empty inputs
  • Null/undefined handling
  • Boundary values
  • Error conditions

✓ Security-critical code
  • Authentication flows
  • Authorization checks
  • Input sanitization
  • Encryption/hashing


CONSIDER TESTING:
─────────────────────────────────────────────────────────────────────────────
○ UI components
  • Complex interactive components
  • Conditional rendering
  • State-dependent displays

○ Integration points
  • Database operations
  • External API calls
  • File operations


SKIP TESTING (Usually):
─────────────────────────────────────────────────────────────────────────────
✗ Third-party library internals
  • They have their own tests

✗ Simple getters/setters
  • Unless they have logic

✗ Framework boilerplate
  • Configuration files
  • Simple wiring code

✗ Styling
  • Visual regression tests instead
```

---

## 43. TEST COVERAGE STRATEGIES

### 43.1 Coverage Thresholds

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       COVERAGE THRESHOLDS                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  Coverage metrics are INDICATORS, not GOALS.                                │
│  High coverage with bad tests is worse than low coverage with good tests.  │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                              │
│  RECOMMENDED THRESHOLDS:                                                     │
│                                                                              │
│  CODE AREA               │ MINIMUM    │ TARGET     │ NOTES                  │
│  ────────────────────────┼────────────┼────────────┼─────────────────────── │
│  Business logic          │ 80%        │ 95%+       │ Critical, must test    │
│  API endpoints           │ 80%        │ 90%+       │ Contract matters       │
│  Utility functions       │ 90%        │ 100%       │ Pure, easy to test     │
│  UI components           │ 60%        │ 80%        │ Focus on complex ones  │
│  Integration code        │ 70%        │ 85%        │ Error paths important  │
│  Overall project         │ 70%        │ 80%+       │ Balanced goal          │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                              │
│  COVERAGE TYPES:                                                             │
│                                                                              │
│  LINE COVERAGE                                                               │
│  Percentage of code lines executed by tests                                 │
│  Useful but can be gamed                                                    │
│                                                                              │
│  BRANCH COVERAGE                                                             │
│  Percentage of if/else branches taken                                       │
│  Better indicator of thoroughness                                            │
│                                                                              │
│  FUNCTION COVERAGE                                                           │
│  Percentage of functions called                                              │
│  Quick overview of what's tested                                            │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 43.2 Coverage Configuration

```
COVERAGE CONFIGURATION
─────────────────────────────────────────────────────────────────────────────

JEST CONFIGURATION:
```javascript
// jest.config.js
module.exports = {
  collectCoverageFrom: [
    'src/**/*.{js,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.stories.{js,ts,tsx}',
    '!src/**/*.test.{js,ts,tsx}',
    '!src/**/index.{js,ts}', // Re-export files
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
    // Stricter thresholds for critical paths
    './src/features/auth/**/*.ts': {
      branches: 90,
      functions: 90,
      lines: 90,
    },
    './src/lib/api/**/*.ts': {
      branches: 85,
      functions: 85,
      lines: 85,
    },
  },
};
```

VITEST CONFIGURATION:
```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      exclude: [
        'node_modules',
        'dist',
        '**/*.d.ts',
        '**/*.test.{js,ts,tsx}',
        '**/index.{js,ts}',
      ],
      thresholds: {
        lines: 70,
        functions: 70,
        branches: 70,
        statements: 70,
      },
    },
  },
});
```
```

### 43.3 Coverage Anti-Patterns

```
COVERAGE ANTI-PATTERNS
─────────────────────────────────────────────────────────────────────────────

ANTI-PATTERN 1: COVERAGE GAMING
─────────────────────────────────────────────────────────────────────────────
Writing tests that execute code but don't verify behavior.

// Bad: Executes code but tests nothing
it('should run without error', () => {
  processData(testData);
  // No assertions!
});

// Good: Actually verifies behavior
it('should transform data correctly', () => {
  const result = processData(testData);
  expect(result.count).toBe(5);
  expect(result.status).toBe('complete');
});


ANTI-PATTERN 2: TESTING THE MOCK
─────────────────────────────────────────────────────────────────────────────
Setting up mocks and then testing the mock behavior.

// Bad: Testing the mock, not the code
const mockFetch = jest.fn().mockResolvedValue({ data: [] });
it('should call fetch', async () => {
  await getData();
  expect(mockFetch).toHaveBeenCalled(); // Only tests mock setup
});

// Good: Testing actual behavior
it('should return parsed data', async () => {
  mockFetch.mockResolvedValue({ data: [{ id: 1 }] });
  const result = await getData();
  expect(result[0].id).toBe(1);
});


ANTI-PATTERN 3: IGNORING EDGE CASES
─────────────────────────────────────────────────────────────────────────────
High coverage on happy paths but missing error cases.

// Incomplete: Only happy path
it('should get user', async () => {
  const user = await getUser(1);
  expect(user.name).toBe('John');
});

// Complete: Including edge cases
it('should get user', async () => { ... });
it('should throw when user not found', async () => { ... });
it('should handle network errors', async () => { ... });
it('should handle malformed response', async () => { ... });


ANTI-PATTERN 4: SNAPSHOT ABUSE
─────────────────────────────────────────────────────────────────────────────
Using snapshots for everything without understanding them.

// Bad: Snapshot of complex object (hard to review changes)
it('should return user data', () => {
  expect(getUserData()).toMatchSnapshot();
});

// Good: Explicit assertions for behavior, snapshots for stable structures
it('should return correct user fields', () => {
  const user = getUserData();
  expect(user.id).toBeDefined();
  expect(user.email).toContain('@');
});

it('should match API schema', () => {
  expect(getApiSchema()).toMatchSnapshot(); // Stable, reviewed carefully
});
```

---

## 44. TESTING PATTERNS BY LAYER

### 44.1 Unit Testing Patterns

```
UNIT TESTING PATTERNS
─────────────────────────────────────────────────────────────────────────────

PATTERN: ARRANGE-ACT-ASSERT (AAA)
─────────────────────────────────────────────────────────────────────────────
```typescript
it('should calculate order total with discount', () => {
  // Arrange: Set up test data and dependencies
  const items = [
    { price: 100, quantity: 2 },
    { price: 50, quantity: 1 },
  ];
  const discount = 0.1; // 10%

  // Act: Execute the code under test
  const total = calculateOrderTotal(items, discount);

  // Assert: Verify the expected outcome
  expect(total).toBe(225); // (200 + 50) * 0.9
});
```

PATTERN: TABLE-DRIVEN TESTS
─────────────────────────────────────────────────────────────────────────────
```typescript
describe('formatCurrency', () => {
  const testCases = [
    { input: 0, expected: '$0.00' },
    { input: 100, expected: '$100.00' },
    { input: 1234.56, expected: '$1,234.56' },
    { input: -50, expected: '-$50.00' },
    { input: 0.1, expected: '$0.10' },
  ];

  test.each(testCases)(
    'formats $input as $expected',
    ({ input, expected }) => {
      expect(formatCurrency(input)).toBe(expected);
    }
  );
});
```

PATTERN: TESTING ASYNC CODE
─────────────────────────────────────────────────────────────────────────────
```typescript
// Using async/await
it('should fetch user data', async () => {
  const user = await fetchUser(1);
  expect(user.name).toBe('John');
});

// Testing rejected promises
it('should throw on network error', async () => {
  mockFetch.mockRejectedValue(new Error('Network error'));
  
  await expect(fetchUser(1)).rejects.toThrow('Network error');
});

// Testing with timers
it('should retry after delay', async () => {
  jest.useFakeTimers();
  
  const promise = fetchWithRetry();
  
  jest.advanceTimersByTime(1000);
  
  const result = await promise;
  expect(result).toBeDefined();
});
```

PATTERN: TESTING HOOKS
─────────────────────────────────────────────────────────────────────────────
```typescript
import { renderHook, act } from '@testing-library/react';

describe('useCounter', () => {
  it('should increment counter', () => {
    const { result } = renderHook(() => useCounter());

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });

  it('should handle async updates', async () => {
    const { result } = renderHook(() => useAsyncData());

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toBeDefined();
  });
});
```
```

### 44.2 Integration Testing Patterns

```
INTEGRATION TESTING PATTERNS
─────────────────────────────────────────────────────────────────────────────

PATTERN: API ENDPOINT TESTING
─────────────────────────────────────────────────────────────────────────────
```typescript
import { createServer } from '../server';
import { db } from '../db';

describe('POST /api/users', () => {
  let app;

  beforeAll(async () => {
    app = await createServer();
  });

  beforeEach(async () => {
    await db.clear(); // Clean state for each test
  });

  afterAll(async () => {
    await db.close();
  });

  it('should create user with valid data', async () => {
    const response = await request(app)
      .post('/api/users')
      .send({
        email: 'test@example.com',
        name: 'Test User',
        password: 'securePassword123',
      });

    expect(response.status).toBe(201);
    expect(response.body.data.email).toBe('test@example.com');
    expect(response.body.data.password).toBeUndefined(); // Not exposed
    
    // Verify in database
    const dbUser = await db.users.findByEmail('test@example.com');
    expect(dbUser).toBeDefined();
  });

  it('should return 422 for invalid email', async () => {
    const response = await request(app)
      .post('/api/users')
      .send({
        email: 'not-an-email',
        name: 'Test User',
        password: 'securePassword123',
      });

    expect(response.status).toBe(422);
    expect(response.body.error.details[0].field).toBe('email');
  });
});
```

PATTERN: DATABASE INTEGRATION
─────────────────────────────────────────────────────────────────────────────
```typescript
describe('UserRepository', () => {
  let repo: UserRepository;
  let testDb: TestDatabase;

  beforeAll(async () => {
    testDb = await TestDatabase.create();
    repo = new UserRepository(testDb.connection);
  });

  beforeEach(async () => {
    await testDb.reset(); // Clean and reseed
  });

  afterAll(async () => {
    await testDb.destroy();
  });

  it('should find user by email', async () => {
    // Seed data
    await testDb.seed('users', [
      { id: '1', email: 'john@example.com', name: 'John' },
    ]);

    const user = await repo.findByEmail('john@example.com');

    expect(user).toBeDefined();
    expect(user?.name).toBe('John');
  });

  it('should handle concurrent updates', async () => {
    await testDb.seed('users', [
      { id: '1', email: 'john@example.com', balance: 100 },
    ]);

    // Simulate concurrent updates
    await Promise.all([
      repo.updateBalance('1', -30),
      repo.updateBalance('1', -30),
    ]);

    const user = await repo.findById('1');
    expect(user?.balance).toBe(40); // Both deductions applied
  });
});
```
```

### 44.3 E2E Testing Patterns

```
E2E TESTING PATTERNS
─────────────────────────────────────────────────────────────────────────────

PATTERN: USER FLOW TESTING (Playwright)
─────────────────────────────────────────────────────────────────────────────
```typescript
import { test, expect } from '@playwright/test';

test.describe('User Authentication Flow', () => {
  test('should complete signup and login', async ({ page }) => {
    // Navigate to signup
    await page.goto('/signup');

    // Fill signup form
    await page.fill('[data-testid="email-input"]', 'test@example.com');
    await page.fill('[data-testid="password-input"]', 'SecurePass123!');
    await page.fill('[data-testid="name-input"]', 'Test User');

    // Submit and wait for navigation
    await page.click('[data-testid="signup-button"]');
    await page.waitForURL('/dashboard');

    // Verify logged in state
    await expect(page.locator('[data-testid="user-menu"]')).toBeVisible();
    await expect(page.locator('[data-testid="user-name"]')).toHaveText('Test User');

    // Logout
    await page.click('[data-testid="user-menu"]');
    await page.click('[data-testid="logout-button"]');
    await page.waitForURL('/');

    // Login again
    await page.goto('/login');
    await page.fill('[data-testid="email-input"]', 'test@example.com');
    await page.fill('[data-testid="password-input"]', 'SecurePass123!');
    await page.click('[data-testid="login-button"]');
    await page.waitForURL('/dashboard');

    // Verify same user
    await expect(page.locator('[data-testid="user-name"]')).toHaveText('Test User');
  });
});
```

PATTERN: VISUAL REGRESSION TESTING
─────────────────────────────────────────────────────────────────────────────
```typescript
import { test, expect } from '@playwright/test';

test.describe('Visual Regression', () => {
  test('dashboard matches snapshot', async ({ page }) => {
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');

    // Full page screenshot
    await expect(page).toHaveScreenshot('dashboard.png', {
      fullPage: true,
      maxDiffPixels: 100, // Allow minor differences
    });
  });

  test('components match snapshots', async ({ page }) => {
    await page.goto('/components');

    // Individual component screenshots
    const button = page.locator('[data-testid="primary-button"]');
    await expect(button).toHaveScreenshot('primary-button.png');

    const card = page.locator('[data-testid="user-card"]');
    await expect(card).toHaveScreenshot('user-card.png');
  });
});
```

PATTERN: ACCESSIBILITY TESTING
─────────────────────────────────────────────────────────────────────────────
```typescript
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accessibility', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/');

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();

    expect(results.violations).toEqual([]);
  });

  test('should be keyboard navigable', async ({ page }) => {
    await page.goto('/');

    // Tab through interactive elements
    await page.keyboard.press('Tab');
    await expect(page.locator(':focus')).toHaveAttribute('data-testid', 'nav-home');

    await page.keyboard.press('Tab');
    await expect(page.locator(':focus')).toHaveAttribute('data-testid', 'nav-about');

    // Activate with keyboard
    await page.keyboard.press('Enter');
    await page.waitForURL('/about');
  });
});
```
```

---

## 45. TEST INFRASTRUCTURE

### 45.1 Test Organization

```
TEST ORGANIZATION
─────────────────────────────────────────────────────────────────────────────

APPROACH 1: CO-LOCATED TESTS (Recommended for components)
─────────────────────────────────────────────────────────────────────────────
src/
├── features/
│   └── auth/
│       ├── components/
│       │   ├── LoginForm.tsx
│       │   ├── LoginForm.test.tsx      # Co-located
│       │   └── LoginForm.stories.tsx   # Storybook
│       └── hooks/
│           ├── useAuth.ts
│           └── useAuth.test.ts         # Co-located

Benefits:
• Easy to find tests
• Tests update with component
• Clear ownership


APPROACH 2: SEPARATE TEST DIRECTORY (Recommended for integration/E2E)
─────────────────────────────────────────────────────────────────────────────
project/
├── src/
│   └── ...
├── tests/
│   ├── unit/                # Mirror of src/ structure
│   │   └── features/
│   │       └── auth/
│   ├── integration/         # API and service tests
│   │   ├── api/
│   │   │   ├── users.test.ts
│   │   │   └── orders.test.ts
│   │   └── services/
│   └── e2e/                 # End-to-end tests
│       ├── auth.spec.ts
│       ├── checkout.spec.ts
│       └── fixtures/
└── ...

Benefits:
• Clear separation by test type
• Different configs per type
• E2E can run independently


HYBRID APPROACH (Recommended overall):
─────────────────────────────────────────────────────────────────────────────
• Unit tests: Co-located with source
• Integration tests: tests/integration/
• E2E tests: tests/e2e/
• Shared fixtures: tests/fixtures/
• Test utilities: tests/utils/
```

### 45.2 Test Utilities and Fixtures

```
TEST UTILITIES AND FIXTURES
─────────────────────────────────────────────────────────────────────────────

FIXTURE FACTORY PATTERN:
─────────────────────────────────────────────────────────────────────────────
```typescript
// tests/fixtures/factories.ts

import { faker } from '@faker-js/faker';

export function createUser(overrides: Partial<User> = {}): User {
  return {
    id: faker.string.uuid(),
    email: faker.internet.email(),
    name: faker.person.fullName(),
    createdAt: new Date(),
    ...overrides,
  };
}

export function createOrder(overrides: Partial<Order> = {}): Order {
  return {
    id: faker.string.uuid(),
    userId: faker.string.uuid(),
    items: [],
    total: 0,
    status: 'pending',
    createdAt: new Date(),
    ...overrides,
  };
}

// Usage in tests
it('should calculate order total', () => {
  const order = createOrder({
    items: [
      { productId: '1', price: 100, quantity: 2 },
      { productId: '2', price: 50, quantity: 1 },
    ],
  });
  
  const total = calculateTotal(order);
  expect(total).toBe(250);
});
```

CUSTOM RENDER PATTERN (React):
─────────────────────────────────────────────────────────────────────────────
```typescript
// tests/utils/render.tsx

import { render, RenderOptions } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '@/features/auth';

interface CustomRenderOptions extends RenderOptions {
  user?: User;
  queryClient?: QueryClient;
}

export function customRender(
  ui: React.ReactElement,
  options: CustomRenderOptions = {}
) {
  const {
    user,
    queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
      },
    }),
    ...renderOptions
  } = options;

  function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <QueryClientProvider client={queryClient}>
        <AuthProvider initialUser={user}>
          {children}
        </AuthProvider>
      </QueryClientProvider>
    );
  }

  return {
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
    queryClient,
  };
}

// Re-export everything
export * from '@testing-library/react';
export { customRender as render };
```

MOCK SERVICE WORKER SETUP:
─────────────────────────────────────────────────────────────────────────────
```typescript
// tests/mocks/handlers.ts

import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('/api/users/:id', ({ params }) => {
    return HttpResponse.json({
      data: {
        id: params.id,
        name: 'Test User',
        email: 'test@example.com',
      },
    });
  }),

  http.post('/api/users', async ({ request }) => {
    const body = await request.json();
    return HttpResponse.json(
      { data: { id: '123', ...body } },
      { status: 201 }
    );
  }),

  http.get('/api/users/:id', ({ params }) => {
    if (params.id === 'not-found') {
      return HttpResponse.json(
        { error: { code: 'NOT_FOUND' } },
        { status: 404 }
      );
    }
    // Default response
  }),
];

// tests/mocks/server.ts
import { setupServer } from 'msw/node';
import { handlers } from './handlers';

export const server = setupServer(...handlers);
```
```

### 45.3 CI Test Configuration

```
CI TEST CONFIGURATION
─────────────────────────────────────────────────────────────────────────────

GITHUB ACTIONS WORKFLOW:
─────────────────────────────────────────────────────────────────────────────
```yaml
# .github/workflows/test.yml

name: Test

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  unit-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - run: npm ci
      - run: npm run test:unit -- --coverage
      
      - uses: codecov/codecov-action@v3
        with:
          files: ./coverage/lcov.info

  integration-tests:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_PASSWORD: postgres
        ports:
          - 5432:5432
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
    
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - run: npm ci
      - run: npm run db:migrate
        env:
          DATABASE_URL: postgres://postgres:postgres@localhost:5432/test
      - run: npm run test:integration
        env:
          DATABASE_URL: postgres://postgres:postgres@localhost:5432/test

  e2e-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npm run build
      - run: npm run test:e2e
      
      - uses: actions/upload-artifact@v3
        if: failure()
        with:
          name: playwright-report
          path: playwright-report/
```

NPM SCRIPTS CONFIGURATION:
─────────────────────────────────────────────────────────────────────────────
```json
{
  "scripts": {
    "test": "npm run test:unit && npm run test:integration",
    "test:unit": "vitest run",
    "test:unit:watch": "vitest",
    "test:unit:coverage": "vitest run --coverage",
    "test:integration": "vitest run --config vitest.integration.config.ts",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "test:e2e:debug": "playwright test --debug"
  }
}
```
```

---

## PART IX SUMMARY

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                PART IX: TESTING & VERIFICATION FRAMEWORK                     │
│                           KEY TAKEAWAYS                                      │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  TESTING PYRAMID:                                                            │
│  ─────────────────────────────────────────────────────────────────────────  │
│  • Unit (70%): Fast, isolated, many                                         │
│  • Integration (20%): Component interactions                                │
│  • E2E (10%): Critical user flows                                           │
│                                                                              │
│  TESTING PRINCIPLES:                                                         │
│  ─────────────────────────────────────────────────────────────────────────  │
│  • Test behavior, not implementation                                        │
│  • One assertion focus per test                                              │
│  • Tests should be independent                                               │
│  • Tests should be deterministic                                             │
│  • Tests are documentation                                                   │
│                                                                              │
│  COVERAGE THRESHOLDS:                                                        │
│  ─────────────────────────────────────────────────────────────────────────  │
│  • Business logic: 80-95%                                                    │
│  • API endpoints: 80-90%                                                     │
│  • Utilities: 90-100%                                                        │
│  • UI components: 60-80%                                                     │
│  • Overall: 70-80%                                                           │
│  • Coverage is indicator, not goal                                           │
│                                                                              │
│  TESTING PATTERNS:                                                           │
│  ─────────────────────────────────────────────────────────────────────────  │
│  • Arrange-Act-Assert (AAA)                                                  │
│  • Table-driven tests                                                        │
│  • Fixture factories                                                         │
│  • Custom render utilities                                                   │
│  • Mock Service Worker                                                       │
│                                                                              │
│  TEST ORGANIZATION:                                                          │
│  ─────────────────────────────────────────────────────────────────────────  │
│  • Unit: Co-located with source                                              │
│  • Integration: tests/integration/                                           │
│  • E2E: tests/e2e/                                                          │
│  • Shared: tests/fixtures/, tests/utils/                                    │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---


---
*End of propagated content*
