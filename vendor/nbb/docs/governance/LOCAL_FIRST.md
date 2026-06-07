# Data Sovereignty & Local-First Execution

> For users who cannot send code or data to a cloud model (regulated data, IP
> constraints, air-gapped environments), North Star must have a fully local path.
> ASCII-only (mojibake-safe).

---

## 1. When you need this

- Code/data may not leave the premises (legal, contractual, or regulatory).
- Sensitive IP, PHI/PII, classified or export-controlled material.
- Air-gapped or zero-egress networks.
- A hard requirement that no third party can retain or train on the content.

If any apply, run the framework against a LOCAL model in a sandbox - the
methodology is model-agnostic, so North Star's HOW/WHAT/NAVIGATE structure is
unchanged; only the inference backend differs.

## 2. The local-first execution path

- **Local inference.** Run an open-weights model locally (e.g. an Ollama / vLLM /
  llama.cpp-class server, or an OpenMonoAgent-style Docker-sandboxed local agent).
  Capability is lower than frontier cloud models - scope tasks accordingly and
  lean harder on the framework's verification gates.
- **Sandbox the agent.** Docker/VM isolation (the same posture as
  `PERMISSIONS_AND_SANDBOXING.md`): no egress by default; mount only the project;
  destroy the container after the task.
- **Local everything.** Vendor the framework docs locally (this repo IS local);
  use a local memory backend (`docs/protocols/MEMORY_BACKEND.md` local-JSON
  fallback - no external dependency); local vector store for RAG if needed.
- **Zero egress.** Block outbound network at the sandbox boundary; if a step needs
  a fetch, it is an explicit, logged, allowlisted exception - not the default.

## 3. Trade-offs (be honest)

| Dimension | Cloud frontier | Local-first |
|-----------|----------------|-------------|
| Capability | highest | lower - scope smaller slices |
| Data egress | leaves premises | none |
| Cost shape | per-token | hardware + power |
| Verification | same gates | RELY ON the gates more |

Local-first trades raw capability for sovereignty. Compensate with smaller vertical
slices, tighter `understand-first` maps, and stricter `autoresearch`/test gates so
a weaker model still ships correct work.

## 4. Checklist
- [ ] Inference runs locally; no prompt/code leaves the boundary.
- [ ] Agent runs in a no-egress sandbox; project mounted read/write, rest denied.
- [ ] Framework docs + memory + RAG are local (no cloud calls).
- [ ] Any required egress is explicit, allowlisted, and logged.
- [ ] Secrets still follow `SECRETS.md` (local vault / injected to child only).

## When NOT to use
- If cloud use is permitted, frontier models are usually the better quality/cost
  trade - reserve local-first for genuine sovereignty requirements, not as a
  default. Do not claim "fully local" if any step silently calls a cloud API.

## Portability
Model- and harness-agnostic: any harness that can point at a local OpenAI-compatible
endpoint can run this path. The sandbox + zero-egress posture is standard Docker/VM.
