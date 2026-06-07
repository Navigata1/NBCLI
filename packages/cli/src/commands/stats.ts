import { Command } from 'commander';
import path from 'path';
import Table from 'cli-table3';
import { readLedger } from '@nsb/core';
import { emitJson } from '../utils/output';
import { log } from '../utils/logger';
import { printMini } from '../utils/banner';
import { colors } from '../utils/theme';

/**
 * `nsb stats` — local-only metrics over the run ledger. This is NBCLI's answer to
 * "telemetry": nothing leaves the machine (network telemetry stays deferred-by-choice).
 */
export const statsCommand = new Command('stats')
  .description('Local-only metrics over the run ledger (no data leaves the machine)')
  .option('--json', 'emit machine-readable JSON', false)
  .action((options) => {
    const root = process.cwd();
    const file = path.resolve(root, '.mbf', 'ledger', 'runs.jsonl');
    const entries = readLedger(file);

    const byKind = entries.reduce<Record<string, number>>((acc, e) => {
      acc[e.kind] = (acc[e.kind] ?? 0) + 1;
      return acc;
    }, {});
    const totalUsd = entries.reduce((s, e) => s + (e.costUsd ?? 0), 0);
    const totalTokens = entries.reduce((s, e) => s + (e.tokens ?? 0), 0);
    const stats = { entries: entries.length, byKind, totalUsd, totalTokens };

    if (options.json) {
      emitJson(stats);
      return;
    }

    printMini();
    log.subheader(`Local stats — ${entries.length} ledger entr${entries.length === 1 ? 'y' : 'ies'}`);
    log.blank();
    const table = new Table({
      head: [colors.primary('kind'), colors.primary('count')],
      style: { head: [], border: ['gray'] },
    });
    Object.entries(byKind).forEach(([kind, count]) => table.push([kind, String(count)]));
    if (Object.keys(byKind).length === 0) table.push([colors.dim('(empty)'), '0']);
    console.log(table.toString());
    log.blank();
    log.keyValue('Spend', `$${totalUsd.toFixed(2)} · ${totalTokens} tokens`);
    log.dim('Local-only — nothing leaves this machine (use --json for scripts/agents).');
  });
