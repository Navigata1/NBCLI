import { Command } from 'commander';
import Table from 'cli-table3';
import { ALL_TOOLS, TOOL_GENERATORS } from '../generators/registry';
import { printMini } from '../utils/banner';
import { colors } from '../utils/theme';
import { log } from '../utils/logger';

/**
 * `nsb adapters` — list every instruction-file target NBCLI compiles from the
 * single `.mbf` source of truth. The portability moat: one governance config →
 * every major agent tool.
 */
export const adaptersCommand = new Command('adapters')
  .description('List the instruction-file adapters generated from one .mbf source')
  .action(() => {
    printMini();
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
