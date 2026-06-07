import { Command } from 'commander';
import { spawnSync } from 'child_process';
import { log } from '../utils/logger';
import { printMini } from '../utils/banner';

export interface SandboxOptions {
  image: string;
  cmd: string[];
  cwd: string;
  allowNetwork?: boolean;
  memory?: string;
  cpus?: string;
}

/**
 * Pure: build `docker run` args for an isolated command. Network is OFF by
 * default (`--network none`); the repo is mounted read-write at /work. Testable;
 * the command shells out with exactly these args. Requires Docker at run time.
 */
export function buildSandboxArgs(opts: SandboxOptions): string[] {
  const args = ['run', '--rm'];
  if (!opts.allowNetwork) args.push('--network', 'none');
  if (opts.memory) args.push('--memory', opts.memory);
  if (opts.cpus) args.push('--cpus', opts.cpus);
  args.push('-v', `${opts.cwd}:/work`, '-w', '/work', opts.image, ...opts.cmd);
  return args;
}

export const sandboxCommand = new Command('sandbox').description(
  'Run a command in an isolated Docker container (network OFF by default)',
);

sandboxCommand
  .command('run')
  .description('docker run <cmd> with the repo mounted at /work; --network none unless --allow-network')
  .option('--image <image>', 'container image', 'node:22-alpine')
  .option('--allow-network', 'permit network inside the sandbox (off by default)', false)
  .option('--memory <m>', 'memory limit (e.g. 512m)')
  .option('--cpus <c>', 'cpu limit (e.g. 1)')
  .option('--print', 'print the docker command without running it (no Docker needed)', false)
  .argument('[cmd...]', 'command to run in the sandbox', [])
  .action((cmd: string[], options) => {
    const args = buildSandboxArgs({
      image: options.image,
      allowNetwork: options.allowNetwork,
      memory: options.memory,
      cpus: options.cpus,
      cmd: cmd.length ? cmd : ['sh', '-c', 'echo sandbox ready'],
      cwd: process.cwd(),
    });

    if (options.print) {
      console.log(`docker ${args.join(' ')}`);
      return;
    }

    printMini();
    const result = spawnSync('docker', args, { stdio: 'inherit' });
    if (result.error) {
      log.error(`Docker not available: ${result.error.message}. Use --print to see the command.`);
      process.exitCode = 1;
      return;
    }
    if (typeof result.status === 'number' && result.status !== 0) process.exitCode = result.status;
  });
