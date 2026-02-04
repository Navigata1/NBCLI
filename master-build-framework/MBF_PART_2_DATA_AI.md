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
