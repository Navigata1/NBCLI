import path from 'path';
import type { AnchorCollection } from '@nsb/core';

/**
 * Built-in anchor libraries embedded as data so they work when bundled into a
 * single file (CLI bin / standalone monolith) without runtime filesystem
 * access. This replaces the previous file-path-only API, which broke once
 * bundled because it resolved YAML relative to its own __dirname.
 */
export const BUILT_IN_ANCHORS: AnchorCollection = {
  security: [
    { id: 'auth_path', patterns: ['/auth/', '/authentication/', '/login/', '/oauth/'], adjustment: -0.3, reason: 'Authentication logic requires careful review', target: 'path' },
    { id: 'secrets_handling', patterns: ['password', 'secret', 'api_key', 'private_key', 'token'], adjustment: -0.4, reason: 'Credential handling is security-critical', target: 'content' },
    { id: 'crypto_ops', patterns: ['encrypt', 'decrypt', 'hash', 'sign', 'verify'], adjustment: -0.25, reason: 'Cryptographic operations need expert review', target: 'content' },
    { id: 'raw_sql', patterns: ['rawQuery', 'execute(', 'SELECT ', 'UPDATE ', 'DELETE '], adjustment: -0.35, reason: 'Raw SQL may be vulnerable to injection', target: 'content' },
    { id: 'env_files', patterns: ['.env', 'config/secrets', 'credentials'], adjustment: -0.45, reason: 'Environment files contain sensitive configuration', target: 'path' },
    { id: 'permission_changes', patterns: ['chmod', 'chown', 'setuid', 'capabilities'], adjustment: -0.3, reason: 'Permission changes affect security posture', target: 'content' },
  ],
  infrastructure: [
    { id: 'ci_cd_changes', patterns: ['.github/workflows', 'ci.yml', 'release.yml'], adjustment: -0.2, reason: 'CI/CD changes impact release safety', target: 'path' },
    { id: 'docker_changes', patterns: ['Dockerfile', 'docker-compose', '/containers/'], adjustment: -0.25, reason: 'Container changes can affect deployment', target: 'path' },
    { id: 'infra_as_code', patterns: ['terraform', 'pulumi', 'cloudformation', 'kubernetes'], adjustment: -0.3, reason: 'Infrastructure as code requires review', target: 'content' },
    { id: 'secrets_manager', patterns: ['vault', 'secrets manager', 'key vault'], adjustment: -0.3, reason: 'Secrets management changes are high impact', target: 'content' },
  ],
  data: [
    { id: 'schema_migration', patterns: ['migration', 'schema', 'ALTER TABLE', 'DROP TABLE'], adjustment: -0.25, reason: 'Schema changes require careful review', target: 'content' },
    { id: 'pii_handling', patterns: ['ssn', 'social security', 'passport', 'credit card'], adjustment: -0.4, reason: 'PII handling is regulated', target: 'content' },
    { id: 'data_exports', patterns: ['export', 'backup', 'dump'], adjustment: -0.2, reason: 'Data export operations are sensitive', target: 'content' },
  ],
  testing: [
    { id: 'test_coverage', patterns: ['coverage', 'lcov', 'nyc'], adjustment: -0.1, reason: 'Coverage changes may affect quality reporting', target: 'content' },
    { id: 'snapshot_update', patterns: ['.snap', 'snapshot'], adjustment: -0.15, reason: 'Snapshot updates should be reviewed', target: 'path' },
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
