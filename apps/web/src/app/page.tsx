export default function HomePage() {
  return (
    <main className="page">
      <section className="hero">
        <div className="badge">Governed autonomy for AI-native development</div>
        <h1>North Star Build</h1>
        <p>
          Transform methodology into enforceable AI behavior. Ship faster with confidence
          calibration, autonomy levels, and deterministic anchors.
        </p>
        <div className="cta">
          <button className="primary">Initialize with nsb</button>
          <button className="ghost">Read the framework</button>
        </div>
        <div className="metrics">
          <div>
            <span>12-week MVP</span>
            <strong>Blueprint ready</strong>
          </div>
          <div>
            <span>3 tool targets</span>
            <strong>Claude, Cursor, Codex</strong>
          </div>
          <div>
            <span>SSAP + Anchors</span>
            <strong>Deterministic governance</strong>
          </div>
        </div>
      </section>

      <section className="grid">
        <article>
          <h3>Instruction-Based Enforcement</h3>
          <p>
            Governance is encoded directly into tool-native instructions. No middleware,
            no runtime drag, immediate adoption.
          </p>
        </article>
        <article>
          <h3>Structured Confidence</h3>
          <p>
            Weighted factors with transparent thresholds. Every action comes with a
            confidence report and recommended next step.
          </p>
        </article>
        <article>
          <h3>Anchor Intelligence</h3>
          <p>
            Deterministic triggers for security, data, infra, and testing risk. Anchors
            pull confidence down when it matters most.
          </p>
        </article>
      </section>

      <section className="workflow">
        <div>
          <h2>How it works</h2>
          <p>One config drives every tool. Adapt once. Govern everywhere.</p>
        </div>
        <ol>
          <li>
            <span>01</span>
            <strong>Define governance</strong>
            <p>Set profile, thresholds, and autonomy in `.mbf/mbf-governance.yaml`.</p>
          </li>
          <li>
            <span>02</span>
            <strong>Load anchors</strong>
            <p>Apply risk anchors for security, infra, and data paths.</p>
          </li>
          <li>
            <span>03</span>
            <strong>Generate instructions</strong>
            <p>Deploy CLAUDE.md, Cursor rules, and AGENTS.md automatically.</p>
          </li>
          <li>
            <span>04</span>
            <strong>Operate with confidence</strong>
            <p>Every action includes an explicit confidence assessment.</p>
          </li>
        </ol>
      </section>

      <section className="cta-final">
        <h2>Ready to govern your agents?</h2>
        <p>Install the CLI and initialize your first governed project in minutes.</p>
        <div className="cta">
          <button className="primary">npm i -g @nsb/cli</button>
          <button className="ghost">View documentation</button>
        </div>
      </section>
    </main>
  );
}
