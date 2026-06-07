import { Command } from 'commander';
import path from 'path';
import { existsSync, readFileSync, readdirSync } from 'fs';
import { parse } from 'yaml';
import Table from 'cli-table3';
import type { AnchorCollection, HookProfile } from '@nsb/core';
import { evaluateChange, matchAnchors, scoreEval } from '@nsb/core';
import { getBuiltInAnchors } from '@nsb/anchors';
import { mergeAnchors } from '../utils/anchors';
import { DEFAULT_FIXTURES, type EvalFixture } from '../evals/fixtures';
import { log } from '../utils/logger';
import { emitJson } from '../utils/output';
import { printMini } from '../utils/banner';
import { colors, icons } from '../utils/theme';

function loadAnchors(root: string): AnchorCollection {
  const builtIn = getBuiltInAnchors();
  const customPath = path.resolve(root, '.mbf', 'custom-anchors.yaml');
  let custom: AnchorCollection = {};
  if (existsSync(customPath)) {
    try {
      const parsed = parse(readFileSync(customPath, 'utf-8'));
      if (parsed && typeof parsed === 'object') custom = parsed as AnchorCollection;
    } catch {
      /* ignore */
    }
  }
  return mergeAnchors(builtIn, custom).merged;
}

// Optional project fixtures: .mbf/eval/*.json (each a fixture or array of fixtures).
function projectFixtures(root: string): EvalFixture[] {
  const dir = path.resolve(root, '.mbf', 'eval');
  if (!existsSync(dir)) return [];
  const out: EvalFixture[] = [];
  for (const file of readdirSync(dir)) {
    if (!file.endsWith('.json')) continue;
    try {
      const parsed = JSON.parse(readFileSync(path.join(dir, file), 'utf-8'));
      for (const f of Array.isArray(parsed) ? parsed : [parsed]) {
        if (f && f.path && f.expect) out.push(f as EvalFixture);
      }
    } catch {
      log.warn(`Skipping unreadable eval fixture: ${file}`);
    }
  }
  return out;
}

const pct = (n: number) => `${Math.round(n * 100)}%`;

export const evalCommand = new Command('eval')
  .description('Evaluate the governance engine against labeled fixtures (proves it classifies risk)')
  .option('-p, --profile <profile>', 'minimal | standard | strict (fixtures labeled for strict)', 'strict')
  .option('--min-accuracy <n>', 'fail below this accuracy (0..1)', '1')
  .option('--json', 'emit machine-readable JSON (no banner)', false)
  .action((options) => {
    if (!options.json) printMini();
    const root = process.cwd();
    const profile = (['minimal', 'standard', 'strict'].includes(options.profile)
      ? options.profile
      : 'strict') as HookProfile;
    const minAccuracy = Number(options.minAccuracy);
    if (!Number.isFinite(minAccuracy) || minAccuracy < 0 || minAccuracy > 1) {
      log.error('--min-accuracy must be a number between 0 and 1.');
      process.exitCode = 1;
      return;
    }
    if (profile !== 'strict' && !options.json) {
      log.warn('Bundled fixtures are labeled for the strict profile — results under other profiles may differ.');
    }
    const anchors = loadAnchors(root);
    const fixtures = [...DEFAULT_FIXTURES, ...projectFixtures(root)];

    const cases = fixtures.map((f) => {
      const matches = matchAnchors(anchors, [{ path: f.path, content: f.content }]);
      return { name: f.name, expected: f.expect, actual: evaluateChange(matches, profile).verdict };
    });
    const score = scoreEval(cases);

    if (options.json) {
      emitJson({ profile, ...score, cases });
      if (score.falseNegatives > 0 || score.accuracy < minAccuracy) process.exitCode = 1;
      return;
    }

    log.subheader(`Governance eval (${profile}) — ${fixtures.length} fixtures`);
    log.blank();
    const table = new Table({
      head: ['fixture', 'expected', 'actual', ''].map((h) => colors.primary(h)),
      style: { head: [], border: ['gray'] },
    });
    cases.forEach((c) =>
      table.push([
        c.name ?? '',
        c.expected,
        c.actual,
        c.expected === c.actual ? icons.success : colors.error(icons.error),
      ]),
    );
    console.log(table.toString());
    log.blank();
    log.keyValue('Accuracy', `${pct(score.accuracy)} (${score.correct}/${score.total})`);
    log.keyValue('Block precision / recall', `${pct(score.blockPrecision)} / ${pct(score.blockRecall)}`);
    log.keyValue('False negatives (risky NOT blocked)', `${score.falseNegatives}`);
    log.keyValue('False positives (safe blocked)', `${score.falsePositives}`);
    log.blank();

    if (score.falseNegatives > 0 || score.accuracy < minAccuracy) {
      log.error('Eval FAILED — governance classification below bar.');
      process.exitCode = 1;
    } else {
      log.success('Eval PASSED.');
    }
  });
