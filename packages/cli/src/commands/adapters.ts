import { existsSync } from 'fs';
import path from 'path';
import { Command } from 'commander';
import Table from 'cli-table3';
import { ALL_TOOLS, TOOL_GENERATORS } from '../generators/registry';
import { printMini } from '../utils/banner';
import { colors } from '../utils/theme';
import { log } from '../utils/logger';

/**
 * `nsb adapters` — list every instruction-file target NBCLI compiles from the
 * single `.mbf` source of truth. The portability moat: one governance config →
 * every major agent tool. `--detect` scans the current repo for which agent
 * instruction files already exist (a `grok inspect`-style discovery).
 */
export const adaptersCommand = new Command('adapters')
  .description('List the instruction-file adapters generated from one .mbf source')
  .option('--detect', 'scan the current repo for existing agent instruction files')
  .action((options) => {
    printMini();

    if (options.detect) {
      const root = process.cwd();
      log.subheader('Detected agent instruction files');
      log.blank();
      const table = new Table({
        head: [colors.primary('file'), colors.primary('serves'), colors.primary('present')],
        style: { head: [], border: ['gray'] },
      });
      // De-dupe shared paths (e.g. AGENTS.md serves codex + grok).
      const byPath = new Map<string, string[]>();
      for (const g of TOOL_GENERATORS) {
        byPath.set(g.relPath, [...(byPath.get(g.relPath) ?? []), g.tool]);
      }
      let present = 0;
      for (const [relPath, tools] of byPath) {
        const exists = existsSync(path.resolve(root, relPath));
        if (exists) present += 1;
        table.push([
          colors.dim(relPath),
          colors.secondary(tools.join(', ')),
          exists ? colors.success('yes') : colors.dim('—'),
        ]);
      }
      console.log(table.toString());
      log.blank();
      log.dim(`${present}/${byPath.size} adapter targets present. Run \`nsb init\`/\`nsb update\` to generate the rest.`);
      return;
    }

    log.subheader('Portable adapters — one .mbf source → every agent tool');
    log.blank();
    const table = new Table({
      head: [colors.primary('tool'), colors.primary('output file')],
      style: { head: [], border: ['gray'] },
    });
    TOOL_GENERATORS.forEach((g) => table.push([colors.secondary(g.tool), colors.dim(g.relPath)]));
    console.log(table.toString());
    log.blank();
    log.dim(`Use: nsb init --tools ${ALL_TOOLS.join(',')}   (or nsb update -t <tools>)`);
  });
