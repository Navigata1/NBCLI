#!/usr/bin/env node
// High-signal secret scanner. Detects provider key formats and private-key
// blocks in tracked files. Intentionally narrow (low false-positive rate) so a
// green result is meaningful. Exit 1 on any finding.
import { execSync } from 'node:child_process';
import { readFileSync } from 'node:fs';

const files = execSync('git ls-files', { encoding: 'utf-8' }).split('\n').filter(Boolean);
const SKIP = /(^|\/)(pnpm-lock\.yaml|package-lock\.json)$/;

const PATTERNS = [
  { name: 'AWS access key id', re: /AKIA[0-9A-Z]{16}/ },
  { name: 'GitHub token', re: /gh[pousr]_[A-Za-z0-9]{36,}/ },
  { name: 'Stripe live secret key', re: /sk_live_[0-9a-zA-Z]{24,}/ },
  { name: 'Slack token', re: /xox[baprs]-[0-9A-Za-z-]{10,}/ },
  { name: 'Google API key', re: /AIza[0-9A-Za-z_-]{35}/ },
  { name: 'private key block', re: /-----BEGIN (?:RSA |EC |OPENSSH |DSA |PGP )?PRIVATE KEY-----/ },
];

const findings = [];
for (const file of files) {
  if (SKIP.test(file)) continue;
  let content;
  try {
    content = readFileSync(file, 'utf-8');
  } catch {
    continue;
  }
  for (const { name, re } of PATTERNS) {
    if (re.test(content)) findings.push(`${file}: ${name}`);
  }
}

if (findings.length) {
  console.error('[scan-secrets] FAIL — potential secrets detected:');
  findings.forEach((f) => console.error(`  ${f}`));
  process.exit(1);
}
console.log(`[scan-secrets] OK — ${files.length} tracked files clean`);
