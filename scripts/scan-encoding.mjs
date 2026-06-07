#!/usr/bin/env node
// UTF-8 / mojibake scanner. Flags U+FFFD replacement characters and classic
// mis-decode digraphs in tracked text files. Exit 1 on any finding.
import { execSync } from 'node:child_process';
import { readFileSync } from 'node:fs';

const files = execSync('git ls-files', { encoding: 'utf-8' }).split('\n').filter(Boolean);
const TEXT = /\.(ts|tsx|js|mjs|cjs|json|md|mdx|ya?ml|css|html|txt|mdc)$/i;

// Patterns are built from \u escapes so this scanner's own source contains NO
// literal mojibake bytes and therefore never flags itself.
const PATTERNS = [
  { name: 'U+FFFD replacement char', re: new RegExp('\\uFFFD') },
  { name: 'latin1-as-utf8 (C3 80..BF)', re: new RegExp('\\u00C3[\\u0080-\\u00BF]') },
  { name: 'smart-quote mojibake (E2 80AC)', re: new RegExp('\\u00E2\\u20AC') },
];

const findings = [];
let scanned = 0;
for (const file of files) {
  if (!TEXT.test(file)) continue;
  let content;
  try {
    content = readFileSync(file, 'utf-8');
  } catch {
    continue;
  }
  scanned += 1;
  for (const { name, re } of PATTERNS) {
    if (re.test(content)) {
      findings.push(`${file}: ${name}`);
      break;
    }
  }
}

if (findings.length) {
  console.error('[scan-encoding] FAIL - mojibake / U+FFFD detected:');
  findings.forEach((f) => console.error(`  ${f}`));
  process.exit(1);
}
console.log(`[scan-encoding] OK - ${scanned} text files clean`);
