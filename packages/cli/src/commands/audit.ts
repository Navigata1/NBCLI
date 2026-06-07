import { Command } from 'commander';
import path from 'path';
import { writeFileSync } from 'fs';
import Table from 'cli-table3';
import type { LedgerKind } from '@nsb/core';
import { filterEntries, readLedger, summarizeSpend, toCsv, verifyLedger } from '@nsb/core';
import { log } from '../utils/logger';
import { printMini } from '../utils/banner';
import { colors } from '../utils/theme';

const ledgerPath = (root: string) => path.resolve(root, '.mbf', 'ledger', 'runs.jsonl');

export const auditCommand = new Command('audit')
  .description('Report / verify / export the run ledger (offline — you ship the export to your SIEM)')
  .argument('[action]', 'summary | export | verify', 'summary')
  .option('--format <fmt>', 'export format: json | csv', 'json')
  .option('--out <file>', 'export: write to a file (default stdout)')
  .option('--kind <kind>', 'filter: decision | run | spend | note')
  .option('--since <iso>', 'filter: ISO-8601 timestamp lower bound (inclusive)')
  .action((action: string, options) => {
    const root = process.cwd();
    const file = ledgerPath(root);
    const entries = filterEntries(readLedger(file), {
      kind: options.kind as LedgerKind | undefined,
      since: options.since as string | undefined,
    });

    if (action === 'verify') {
      printMini();
      const result = verifyLedger(file);
      if (result.valid) {
        log.success(`Ledger intact — ${result.entries} entr${result.entries === 1 ? 'y' : 'ies'}.`);
      } else {
        log.error(`Ledger broken at entry ${result.brokenAt} (${result.reason}).`);
        process.exitCode = 1;
      }
      return;
    }

    if (action === 'export') {
      const payload =
        options.format === 'csv' ? toCsv(entries) : `${JSON.stringify(entries, null, 2)}\n`;
      if (options.out) {
        writeFileSync(path.resolve(root, options.out), payload, 'utf-8');
        log.success(`Exported ${entries.length} entr${entries.length === 1 ? 'y' : 'ies'} → ${options.out}`);
      } else {
        process.stdout.write(payload);
      }
      return;
    }

    // summary
    printMini();
    const verification = verifyLedger(file);
    const spend = summarizeSpend(file);
    const byKind = entries.reduce<Record<string, number>>((acc, e) => {
      acc[e.kind] = (acc[e.kind] ?? 0) + 1;
      return acc;
    }, {});

    log.subheader(`Audit — ${entries.length} entr${entries.length === 1 ? 'y' : 'ies'}${options.kind ? ` (kind=${options.kind})` : ''}`);
    log.blank();
    const table = new Table({
      head: [colors.primary('kind'), colors.primary('count')],
      style: { head: [], border: ['gray'] },
    });
    Object.entries(byKind).forEach(([kind, count]) => table.push([kind, String(count)]));
    if (Object.keys(byKind).length === 0) table.push([colors.dim('(empty)'), '0']);
    console.log(table.toString());
    log.blank();
    log.keyValue(
      'Integrity',
      verification.valid
        ? colors.success(`intact (${verification.entries})`)
        : colors.error(`BROKEN at ${verification.brokenAt} (${verification.reason})`),
    );
    log.keyValue('Spend', `$${spend.totalUsd.toFixed(2)} · ${spend.totalTokens} tokens`);
    log.blank();
    log.dim('Export for your SIEM: nsb audit export --format csv --out audit.csv');
    if (!verification.valid) process.exitCode = 1;
  });
