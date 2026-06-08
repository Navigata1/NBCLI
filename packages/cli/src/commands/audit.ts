import { Command } from 'commander';
import path from 'path';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { parse } from 'yaml';
import Table from 'cli-table3';
import type { GovernanceConfig, LedgerKind, WebhookSink } from '@nsb/core';
import { buildWebhookBody, filterEntries, readLedger, summarizeSpend, toCsv, validateEgressUrl, verifyLedger } from '@nsb/core';
import { log } from '../utils/logger';
import { printMini } from '../utils/banner';
import { colors } from '../utils/theme';

const ledgerPath = (root: string) => path.resolve(root, '.mbf', 'ledger', 'runs.jsonl');

function readGovConfig(root: string): GovernanceConfig | undefined {
  const file = path.resolve(root, '.mbf', 'mbf-governance.yaml');
  if (!existsSync(file)) return undefined;
  try {
    return parse(readFileSync(file, 'utf-8')) as GovernanceConfig;
  } catch {
    return undefined;
  }
}

export const auditCommand = new Command('audit')
  .description('Report / verify / export / sync the run ledger (export is offline; sync is the opt-in outbound path)')
  .argument('[action]', 'summary | export | verify | sync', 'summary')
  .option('--format <fmt>', 'export format: json | csv', 'json')
  .option('--out <file>', 'export: write to a file (default stdout)')
  .option('--kind <kind>', 'filter: decision | run | spend | note')
  .option('--since <iso>', 'filter: ISO-8601 timestamp lower bound (inclusive)')
  .option('--webhook <url>', 'sync: POST entries to this webhook, full payload (config sinks.redactPayload to redact)')
  .option('--allow-insecure', 'sync: permit plaintext http for --webhook (default: https-only egress)')
  .option('--allow-private', 'sync: permit a loopback/private host for --webhook (default: blocked, SSRF guard)')
  .action(async (action: string, options) => {
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

    // sync — the ONLY outbound path; OFF unless a webhook is configured/passed.
    if (action === 'sync') {
      printMini();
      const config = readGovConfig(root);
      const configured = (config?.sinks?.webhooks ?? []).filter((w) => w.enabled !== false);
      const targets: WebhookSink[] = options.webhook
        ? [{ url: options.webhook as string, allowInsecure: Boolean(options.allowInsecure), allowPrivate: Boolean(options.allowPrivate) }]
        : configured;
      if (targets.length === 0) {
        log.warn('No sinks configured (config.sinks.webhooks) and no --webhook given. Nothing sent — NBCLI stayed offline.');
        return;
      }
      for (const sink of targets) {
        // SSRF guard: https-only by default; block loopback/private/link-local/metadata; optional allowlist.
        const egress = validateEgressUrl(sink.url, {
          allowInsecure: sink.allowInsecure,
          allowPrivate: sink.allowPrivate,
          allowlist: config?.sinks?.allowlist,
        });
        if (!egress.ok) {
          log.error(`Refusing to sync to ${sink.url}: ${egress.reason}`);
          process.exitCode = 1;
          continue;
        }
        const body = buildWebhookBody(entries, sink);
        const controller = new globalThis.AbortController();
        const timer = setTimeout(() => controller.abort(), 5000);
        try {
          const res = await globalThis.fetch(sink.url, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body,
            signal: controller.signal,
          });
          if (res.ok) {
            log.success(`Synced ${entries.length} entr${entries.length === 1 ? 'y' : 'ies'} → ${sink.url} (${res.status})`);
          } else {
            log.error(`Sink ${sink.url} returned ${res.status}.`);
            process.exitCode = 1;
          }
        } catch (err) {
          log.error(`Sink ${sink.url} failed: ${(err as Error).message}`);
          process.exitCode = 1;
        } finally {
          clearTimeout(timer);
        }
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
