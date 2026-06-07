import type { EnforcementVerdict } from '@nsb/core';

export interface EvalFixture {
  name: string;
  path: string;
  content?: string;
  /** Expected verdict under the STRICT profile. */
  expect: EnforcementVerdict;
}

/**
 * Labeled governance fixtures — the behavioral spec for the enforcement engine.
 * Expectations are for the `strict` profile: an enforced-anchor match → block, an
 * advisory-only match → warn, no match → allow. `nsb eval` proves the engine
 * classifies these correctly (and guards against anchor regressions).
 */
export const DEFAULT_FIXTURES: EvalFixture[] = [
  // --- should BLOCK (enforced risks) ---
  { name: 'env file', path: '.env', expect: 'block' },
  { name: 'nested env file', path: 'config/.env.production', expect: 'block' },
  { name: 'auth path', path: 'src/auth/login.ts', content: 'const x = 1;', expect: 'block' },
  { name: 'secret assignment', path: 'src/cfg.ts', content: 'const password = "hunter2";', expect: 'block' },
  { name: 'api key literal', path: 'src/cfg.ts', content: 'const api_key = "sk_x";', expect: 'block' },
  { name: 'schema migration', path: 'db/migrations/001.sql', content: 'alter table users', expect: 'block' },
  { name: 'ci workflow', path: '.github/workflows/ci.yml', expect: 'block' },
  { name: 'dockerfile', path: 'Dockerfile', expect: 'block' },
  { name: 'pii', path: 'src/user.ts', content: 'store social security number', expect: 'block' },

  // --- should ALLOW (lookalikes / ordinary code — no false positives) ---
  { name: 'author dir (lookalike)', path: 'src/author/bio.ts', content: 'const x = 1;', expect: 'allow' },
  { name: 'oauth-ish name (lookalike)', path: 'src/oauthish.ts', content: 'const x = 1;', expect: 'allow' },
  { name: 'normal export', path: 'src/mod.ts', content: 'export const value = 1;', expect: 'allow' },
  { name: '.envconfig (lookalike)', path: 'src/run.envconfig.ts', content: 'const x = 1;', expect: 'allow' },
  { name: 'immigrations (lookalike)', path: 'db/immigrations_log/x.ts', content: 'const x = 1;', expect: 'allow' },
  { name: 'bare token identifier', path: 'src/t.ts', content: 'function getToken(token) { return token; }', expect: 'allow' },

  // --- NBB HARD STOPS (should BLOCK) ---
  { name: 'hard-stop: terraform destroy', path: 'infra/teardown.sh', content: 'terraform destroy -auto-approve', expect: 'block' },
  { name: 'hard-stop: DROP DATABASE', path: 'db/wipe.sql', content: 'DROP DATABASE prod;', expect: 'block' },
  { name: 'hard-stop: rm -rf root', path: 'scripts/clean.sh', content: 'rm -rf /', expect: 'block' },
  { name: 'hard-stop: git push --force', path: 'scripts/deploy.sh', content: 'git push --force origin main', expect: 'block' },

  // --- should WARN (advisory-only signal) ---
  { name: 'terraform (advisory)', path: 'infra/main.tf', content: 'terraform { backend {} }', expect: 'warn' },
  { name: 'raw sql (advisory)', path: 'q.ts', content: 'const q = "SELECT * FROM users";', expect: 'warn' },
];
