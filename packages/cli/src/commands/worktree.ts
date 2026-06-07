import { Command } from 'commander';
import path from 'path';
import { execFileSync } from 'child_process';
import { log } from '../utils/logger';
import { printMini } from '../utils/banner';
import { colors } from '../utils/theme';

export type WorktreeAction = 'create' | 'list' | 'remove';

/**
 * Pure mapping from a worktree action to `git worktree` arguments. Testable;
 * the command shells out with exactly these. Isolation is REAL git worktrees —
 * NBCLI does not reimplement them.
 */
export function buildWorktreeArgs(action: WorktreeAction, wtPath?: string, branch?: string): string[] {
  switch (action) {
    case 'create': {
      if (!wtPath) throw new Error('worktree create requires a path');
      return branch
        ? ['worktree', 'add', '-b', branch, wtPath]
        : ['worktree', 'add', wtPath];
    }
    case 'remove':
      if (!wtPath) throw new Error('worktree remove requires a path');
      return ['worktree', 'remove', wtPath];
    case 'list':
    default:
      return ['worktree', 'list'];
  }
}

const worktreePath = (root: string, name: string) =>
  path.resolve(root, '..', `${path.basename(root)}-worktrees`, name);

export const worktreeCommand = new Command('worktree')
  .description('Isolated parallel runs via real `git worktree`: create | list | remove')
  .argument('[action]', 'create | list | remove', 'list')
  .argument('[name]', 'worktree name (for create/remove)')
  .option('-b, --branch <branch>', 'create a new branch for the worktree')
  .action((action: string, name: string | undefined, options) => {
    printMini();
    const root = process.cwd();
    const act = (['create', 'list', 'remove'].includes(action) ? action : 'list') as WorktreeAction;

    if ((act === 'create' || act === 'remove') && !name) {
      log.error(`worktree ${act} requires a <name>.`);
      process.exitCode = 1;
      return;
    }

    const wtPath = name ? worktreePath(root, name) : undefined;
    let args: string[];
    try {
      args = buildWorktreeArgs(act, wtPath, options.branch);
    } catch (err) {
      log.error((err as Error).message);
      process.exitCode = 1;
      return;
    }

    try {
      const out = execFileSync('git', args, { cwd: root, encoding: 'utf-8' });
      if (out.trim()) console.log(out.trimEnd());
      if (act === 'create') log.success(`Worktree ready: ${colors.dim(wtPath ?? '')}`);
      if (act === 'remove') log.success(`Worktree removed: ${colors.dim(wtPath ?? '')}`);
    } catch (err) {
      log.error(`git ${args.join(' ')} failed: ${(err as Error).message.split('\n')[0]}`);
      process.exitCode = 1;
    }
  });
