import { Command } from 'commander';
import path from 'path';
import { existsSync, readFileSync } from 'fs';
import { parse } from 'yaml';
import Table from 'cli-table3';
import type { BudgetStatus, GovernanceConfig } from '@nsb/core';
import { appendEntry, evaluateBudget, summarizeSpend, verifyLedger } from '@nsb/core';
import { log } from '../utils/logger';
import { printMini } from '../utils/banner';
import { colors, icons } from '../utils/theme';

const ledgerPath = (root: string) => path.resolve(root, '.mbf', 'ledger', 'runs.jsonl');

function readConfig(root: string): GovernanceConfig | undefined {
  const configPath = path.resolve(root, '.mbf', 'mbf-governance.yaml');
  if (!existsSync(configPath)) return undefined;
  try {
    return parse(readFileSync(configPath, 'utf-8')) as GovernanceConfig;
  } catch {
    return undefined;
  }
}

const STATUS_TEXT: Record<BudgetStatus, string> = {
  ok: colors.success('ok'),
  warn: colors.warning('warn'),
  exceeded: colors.error('exceeded'),
  unset: colors.muted('no cap'),
};

function showBudget(root: string, scope: 'run' | 'project' = 'project', runId?: string): void {
  const config = readConfig(root);
  const budgets = config?.budgets;
  const spend = summarizeSpend(ledgerPath(root), scope === 'run' ? runId : undefined);
  const evalProject = evaluateBudget(
    { usd: spend.totalUsd, tokens: spend.totalTokens },
    budgets,
    scope,
  );

  log.subheader(
    scope === 'run' ? `Budget — run ${runId ?? '(unset)'} spend` : 'Budget — cumulative project spend',
  );
  log.blank();
  const table = new Table({
    head: ['dimension', 'spent', 'cap', 'used', 'status'].map((h) => colors.primary(h)),
    style: { head: [], border: ['gray'] },
  });
  table.push([
    'USD',
    `$${spend.totalUsd.toFixed(2)}`,
    evalProject.usd.cap != null ? `$${evalProject.usd.cap}` : '—',
    evalProject.usd.cap != null ? `${Math.round(evalProject.usd.pct * 100)}%` : '—',
    STATUS_TEXT[evalProject.usd.status],
  ]);
  table.push([
    'tokens',
    `${spend.totalTokens}`,
    evalProject.tokens.cap != null ? `${evalProject.tokens.cap}` : '—',
    evalProject.tokens.cap != null ? `${Math.round(evalProject.tokens.pct * 100)}%` : '—',
    STATUS_TEXT[evalProject.tokens.status],
  ]);
  console.log(table.toString());
  log.blank();
  log.keyValue('Ledger entries', `${spend.count}`);
  if (budgets?.per_run_usd != null || budgets?.per_run_tokens != null) {
    log.keyValue(
      'Per-run caps (advisory)',
      [
        budgets.per_run_usd != null ? `$${budgets.per_run_usd}/run` : null,
        budgets.per_run_tokens != null ? `${budgets.per_run_tokens} tok/run` : null,
      ]
        .filter(Boolean)
        .join(' · '),
    );
  }
  if (evalProject.throttle) {
    log.blank();
    log.error(
      `${scope === 'run' ? 'Run' : 'Project'} budget exceeded — auto-throttle should engage (pause autonomous work).`,
    );
    process.exitCode = 1;
  }
}

export const budgetCommand = new Command('budget')
  .description('Show spend vs caps, record spend, or verify the run ledger')
  .argument('[action]', 'show | record | verify', 'show')
  .option('--usd <amount>', 'record: cost in USD')
  .option('--tokens <count>', 'record: token count')
  .option('--summary <text>', 'record: short description')
  .option('--model <model>', 'record: model id')
  .option('--actor <actor>', 'record: agent/human id')
  .option('--scope <scope>', 'run | project', 'project')
  .option('--run <id>', 'run id for run-scoped budgets (default $NSB_RUN_ID)')
  .action((action: string, options) => {
    printMini();
    const root = process.cwd();
    const scope: 'run' | 'project' = options.scope === 'run' ? 'run' : 'project';
    const runId: string | undefined = options.run ?? process.env.NSB_RUN_ID;

    if (action === 'verify') {
      const result = verifyLedger(ledgerPath(root));
      if (result.valid) {
        log.success(`Ledger intact — ${result.entries} entr${result.entries === 1 ? 'y' : 'ies'}, chain verified.`);
      } else {
        log.error(`Ledger broken at entry ${result.brokenAt} (${result.reason}).`);
        process.exitCode = 1;
      }
      return;
    }

    if (action === 'record') {
      const usd = options.usd != null ? Number(options.usd) : undefined;
      const tokens = options.tokens != null ? Number(options.tokens) : undefined;
      if (usd == null && tokens == null) {
        log.error('Provide --usd and/or --tokens to record spend.');
        process.exitCode = 1;
        return;
      }
      if ((usd != null && !Number.isFinite(usd)) || (tokens != null && !Number.isFinite(tokens))) {
        log.error('--usd and --tokens must be finite numbers.');
        process.exitCode = 1;
        return;
      }
      const entry = appendEntry(ledgerPath(root), {
        kind: 'spend',
        costUsd: usd,
        tokens,
        summary: options.summary,
        model: options.model,
        actor: options.actor,
        runId,
      });
      log.success(`Recorded spend (seq ${entry.seq}) ${icons.arrow} ledger sealed.`);
      showBudget(root, scope, runId);
      return;
    }

    showBudget(root, scope, runId);
  });
