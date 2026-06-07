#!/usr/bin/env node
// Mechanical half of the dogfood-readiness gate (see DOGFOOD_READINESS.md).
// Runs the verification ladder and prints PASS/FAIL per step + an overall verdict.
import { execSync } from 'node:child_process';

const steps = [
  ['build', 'pnpm build'],
  // NBB drift guard: vendor/nbb must match its MANIFEST + the pinned SHA (offline).
  ['nbb-sync', 'node packages/cli/dist/cli.js sync --check'],
  ['typecheck', 'pnpm typecheck'],
  ['lint', 'pnpm lint'],
  ['test', 'pnpm test'],
  ['scan', 'pnpm scan'],
];

const failed = [];
for (const [name, cmd] of steps) {
  process.stdout.write(`[dogfood] ${name.padEnd(10)} ... `);
  try {
    execSync(cmd, { stdio: 'pipe' });
    console.log('PASS');
  } catch {
    console.log('FAIL');
    failed.push(name);
  }
}

console.log('');
if (failed.length) {
  console.error(`[dogfood] READINESS: FAIL (${failed.join(', ')})`);
  console.error('[dogfood] Fix the failing step(s); do not merge.');
  process.exit(1);
}
console.log('[dogfood] READINESS: PASS — build / typecheck / lint / test / scan all green.');
console.log('[dogfood] Remaining judgment gates: tests for new caps, live smoke, adversarial review, accuracy. See DOGFOOD_READINESS.md.');
