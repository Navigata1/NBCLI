#!/usr/bin/env node
// Generate a minimal CycloneDX SBOM from the workspace manifests (deterministic,
// no timestamp). Output: sbom.json (or argv[2]).
import { existsSync, readFileSync, writeFileSync } from 'node:fs';

const MANIFESTS = [
  'package.json',
  'packages/cli/package.json',
  'packages/core/package.json',
  'packages/schema/package.json',
  'packages/anchors/package.json',
  'packages/mcp-server/package.json',
];

const manifests = MANIFESTS.filter((f) => existsSync(f)).map((f) => JSON.parse(readFileSync(f, 'utf-8')));

// Resolve `workspace:*` ranges to the actual in-repo version.
const workspaceVersions = Object.fromEntries(
  manifests.filter((p) => p.name && p.version).map((p) => [p.name, p.version]),
);

const components = [];
for (const pkg of manifests) {
  if (pkg.name) {
    components.push({
      type: 'application',
      name: pkg.name,
      version: pkg.version ?? '0.0.0',
      licenses: pkg.license ? [{ license: { id: pkg.license } }] : [],
    });
  }
  for (const [dep, range] of Object.entries(pkg.dependencies ?? {})) {
    const version = String(range).startsWith('workspace:')
      ? (workspaceVersions[dep] ?? String(range))
      : String(range);
    components.push({ type: 'library', name: dep, version });
  }
}

const seen = new Set();
const unique = components.filter((c) => {
  const key = `${c.name}@${c.version}`;
  if (seen.has(key)) return false;
  seen.add(key);
  return true;
});

const sbom = {
  bomFormat: 'CycloneDX',
  specVersion: '1.5',
  version: 1,
  metadata: { tools: [{ name: 'nbcli-gen-sbom' }], component: { type: 'application', name: 'nbcli' } },
  components: unique,
};

const out = process.argv[2] ?? 'sbom.json';
writeFileSync(out, `${JSON.stringify(sbom, null, 2)}\n`, 'utf-8');
console.log(`[sbom] wrote ${unique.length} components -> ${out}`);
