#!/usr/bin/env node
// UTF-8 / mojibake scanner. Flags U+FFFD replacement characters and classic
// mis-decode digraphs in tracked text files. Exit 1 on any finding.
import { execSync } from 'node:child_process';
import { readFileSync } from 'node:fs';

const files = execSync('git ls-files', { encoding: 'utf-8' }).split('\n').filter(Boolean);
const TEXT = /\.(ts|tsx|js|mjs|cjs|json|md|mdx|ya?ml|css|html|txt|mdc)$/i;

const PATTERNS = [
  { name: 'U+FFFD replacement char', re: /�/ },
  { name: 'latin1-as-utf8 (Ã…/Ã©…)', re: /Ã[-¿]/ },
  { name: 'smart-quote mojibake (â€¦)', re: /â€[-™œ"]/ },
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
  console.error('[scan-encoding] FAIL — mojibake / U+FFFD detected:');
  findings.forEach((f) => console.error(`  ${f}`));
  process.exit(1);
}
console.log(`[scan-encoding] OK — ${scanned} text files clean`);
