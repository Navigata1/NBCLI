import path from 'path';
import type { AnchorCollection } from '@nsb/core';

/**
 * Built-in anchor libraries embedded as data (bundling-safe — no fs/__dirname).
 *
 * `enforce: true` marks a rule as **block-worthy** for `nsb check`/hooks — reserved for
 * high-precision, low-false-positive rules. Rules WITHOUT `enforce` are advisory: they inform
 * confidence scoring but never block.
 *
 * Matching notes (see matcher.ts resolveMatchType): a `/.../`-wrapped pattern is auto-classified as
 * REGEX and a `*`/`?` pattern as GLOB. To keep path patterns precise we pin `match: 'substring'`
 * on slash-wrapped path rules (so `/auth/` matches the literal segment, not `author`), and use an
 * explicit `regex:` prefix only where we want a real regex (e.g. `.env` files, secret assignments).
 */
export const BUILT_IN_ANCHORS: AnchorCollection = {
  security: [
    { id: 'auth_path', patterns: ['/auth/', '/authentication/', '/login/', '/oauth/'], adjustment: -0.3, reason: 'Authentication logic requires careful review', target: 'path', match: 'substring', enforce: true },
    { id: 'secrets_handling', patterns: ['api_key', 'private_key', 'client_secret', 'secret_key', 'access_key', 'aws_secret', '-----BEGIN', "regex:(password|passwd|secret|token|api[_-]?key|access[_-]?key)\\s*[:=]\\s*[\"']"], adjustment: -0.4, reason: 'Credential/secret material is security-critical', target: 'content', enforce: true },
    { id: 'crypto_ops', patterns: ['encrypt(', 'decrypt(', 'createcipher', 'createhmac', 'pbkdf2'], adjustment: -0.25, reason: 'Cryptographic operations need expert review', target: 'content', match: 'substring' },
    { id: 'raw_sql', patterns: ['rawquery', 'executesql', 'select * from', 'delete from', 'drop table'], adjustment: -0.35, reason: 'Raw SQL may be vulnerable to injection', target: 'content', match: 'substring' },
    { id: 'env_files', patterns: ["regex:(^|/)\\.env(\\.[^/]*)?$", 'config/secrets', 'credentials'], adjustment: -0.45, reason: 'Environment files contain sensitive configuration', target: 'path', enforce: true },
    { id: 'permission_changes', patterns: ['chmod', 'chown', 'setuid', 'setgid'], adjustment: -0.3, reason: 'Permission changes affect security posture', target: 'content', match: 'substring', enforce: true },
  ],
  infrastructure: [
    { id: 'ci_cd_changes', patterns: ['.github/workflows', 'ci.yml', 'release.yml', '.gitlab-ci'], adjustment: -0.2, reason: 'CI/CD changes impact release safety', target: 'path', match: 'substring', enforce: true },
    { id: 'docker_changes', patterns: ['Dockerfile', 'docker-compose', '/containers/'], adjustment: -0.25, reason: 'Container changes can affect deployment', target: 'path', match: 'substring', enforce: true },
    { id: 'infra_as_code', patterns: ['terraform', 'pulumi', 'cloudformation', 'kubernetes'], adjustment: -0.3, reason: 'Infrastructure as code requires review', target: 'content', match: 'substring' },
    { id: 'secrets_manager', patterns: ['vault', 'secrets manager', 'key vault'], adjustment: -0.3, reason: 'Secrets management changes are high impact', target: 'content', match: 'substring' },
  ],
  data: [
    { id: 'schema_migration', patterns: ['/migrations/', 'alter table', 'drop column'], adjustment: -0.25, reason: 'Schema changes require careful review', target: 'any', match: 'substring', enforce: true },
    { id: 'pii_handling', patterns: ['ssn', 'social security', 'passport', 'credit card'], adjustment: -0.4, reason: 'PII handling is regulated', target: 'content', match: 'substring', enforce: true },
    { id: 'data_exports', patterns: ['mysqldump', 'pg_dump', 'data export', '.bak'], adjustment: -0.2, reason: 'Bulk data export operations are sensitive', target: 'content', match: 'substring' },
  ],
  testing: [
    { id: 'test_coverage', patterns: ['coverage-final', 'lcov.info', '.nyc_output'], adjustment: -0.1, reason: 'Coverage artifacts may affect quality reporting', target: 'path', match: 'substring' },
    { id: 'snapshot_update', patterns: ['.snap', '__snapshots__'], adjustment: -0.15, reason: 'Snapshot updates should be reviewed', target: 'path', match: 'substring' },
  ],
};

/** Deep-clone the built-in anchors (bundling-safe; no filesystem access). */
export const getBuiltInAnchors = (): AnchorCollection =>
  JSON.parse(JSON.stringify(BUILT_IN_ANCHORS)) as AnchorCollection;

// --- Legacy file-path API (kept for backward compatibility) ---
// Prefer getBuiltInAnchors(); these resolve YAML relative to this package and
// are NOT safe once the package is bundled into another build.
export const ANCHOR_FILES = [
  path.resolve(__dirname, '../anchors/security.yaml'),
  path.resolve(__dirname, '../anchors/infrastructure.yaml'),
  path.resolve(__dirname, '../anchors/data.yaml'),
  path.resolve(__dirname, '../anchors/testing.yaml'),
];

export const getAnchorFiles = () => [...ANCHOR_FILES];
