# Interop Protocols — Named, Optional Layers

> North Star is methodology-first and tool-agnostic. These interop standards are
> **optional layers** you turn on when a project needs them; none is required to
> use the framework. ASCII-only (mojibake-safe).
>
> **Honesty note:** Protocol specifications evolve. The shapes below reflect the
> framework's working understanding as of the NBB wave (mid-2026). Where a
> specific number or vendor claim is given, treat it as a CLAIM to confirm
> against the protocol's current canonical spec before you depend on it. Items
> the build environment could not verify are marked (verify).

---

## The five layers at a glance

| Layer | Connects | Question it answers | North Star home |
|-------|----------|---------------------|-----------------|
| **MCP** | agent <-> tools/data | "How does the agent call a tool or read a resource?" | MBF Category 24-27; skill `mcp-builder`; Blueprint Part VI |
| **A2A** | agent <-> agent | "How do independent agents delegate and exchange tasks?" | Blueprint Part V; skill `parallel-agent` |
| **AG-UI** | agent <-> user (event stream) | "How does the UI render what the agent is doing, live?" | Blueprint Part VII |
| **A2UI** | agent -> UI (declarative) | "How does an agent request UI without executing code?" | Blueprint Part VII |
| **ACP** | IDE <-> agent | "How does an editor talk to an agent, LSP-style?" | Blueprint Part VI; IDE routing |

Pick the smallest set that solves the problem. Adding a protocol you do not need
is bloat and attack surface.

---

## MCP - Model Context Protocol (tools & resources)
- **What:** A standard for exposing tools, resources, and prompts to an agent over
  a defined transport. The most mature of the five; broad vendor support.
- **Use when:** the agent must call external tools or read external data through a
  uniform interface rather than bespoke glue.
- **North Star:** build servers with the `mcp-builder` skill
  (research -> implement -> test with MCP Inspector -> eval). See MBF Cat 24-27.
- **Security:** an MCP server is a privilege boundary - apply least privilege,
  validate inputs, and treat server output as untrusted (see Governance).

## A2A - Agent-to-Agent (delegation)
- **What:** A protocol for one agent to discover, hand work to, and receive
  results from another agent, across process/vendor boundaries.
- **Use when:** work spans specialized or independently-owned agents (a planner
  delegating to a builder; cross-vendor agent teams).
- **North Star:** complements `parallel-agent` Mode A (in-process dynamic
  workflows) by standardizing the CROSS-process/vendor case. Keep the typed
  input/output contract discipline; keep fan-out bounded.

## AG-UI - Agent-User Interaction (live event stream)
- **What:** An event-stream protocol so a frontend can render an agent's activity
  in real time (messages, tool calls, state deltas, lifecycle). Described as
  having ~17 core event types (verify against the current AG-UI spec).
- **Use when:** building a user-facing app that must show streaming agent progress
  (typing, tool-running, partial results) rather than a single final blob.
- **North Star:** a Part VII (design) concern - treat the event stream as part of
  the interaction design, with proper loading/streaming/error states.

## A2UI - Agent-to-UI (declarative generative UI)
- **What:** A declarative way for an agent to request UI by REFERENCING a catalog
  of pre-approved components - the agent never ships executable UI code. The host
  renders only catalog components; unknown/foreign code is refused.
- **Use when:** you want agent-driven UI WITHOUT the security/quality risk of an
  agent emitting arbitrary code into your app.
- **North Star:** strong fit with the safety floor - declarative + allowlisted by
  construction. Define the component catalog as your allowlist; deny everything
  else. (Generative-UI specifics evolve - verify the catalog/handshake shape.)

## ACP - Agent-Client Protocol (IDE <-> agent, LSP-style)
- **What:** An LSP-style protocol between an editor/IDE and an agent, so editors
  can host agents through a standard interface. Reported adopters include
  Zed and JetBrains, and the Kimi ecosystem (verify current adopter list).
- **Use when:** integrating an agent into an editor without bespoke per-IDE glue.
- **North Star:** maps to Blueprint Part VI (tool integration) and IDE routing.
  See `docs/PORTABILITY.md` for harness-specific load conventions.

---

## How these relate to the rest of NBB
- Memory that must persist ACROSS harnesses/protocols: see
  `docs/protocols/MEMORY_BACKEND.md` (swappable backend interface).
- Tool-building: skill `mcp-builder`. Agent orchestration: skill `parallel-agent`.
- Security posture for any protocol you enable: `docs/governance/` (least
  privilege, sandboxing, prompt-injection refusal, secrets isolation).

## When NOT to adopt a protocol
- A single-agent, single-tool, single-harness project rarely needs A2A/ACP/AG-UI.
- Do not add a protocol "to be future-proof" - each is surface area to secure and
  maintain. Add it when a concrete requirement demands it (YAGNI).
