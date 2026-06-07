import { Command } from 'commander';
import path from 'path';
import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from 'fs';
import Table from 'cli-table3';
import { signContent, verifyContent } from '@nsb/core';
import { log } from '../utils/logger';
import { printMini } from '../utils/banner';
import { colors } from '../utils/theme';

const pluginsDir = (root: string) => path.resolve(root, '.mbf', 'plugins');

// A plugin name is used as a directory component — keep it strictly safe (no path traversal).
const SAFE_NAME = /^[a-z0-9][a-z0-9._-]*$/i;
const isSafeName = (name: string) => SAFE_NAME.test(name) && !name.includes('..');

/**
 * Canonical content of a plugin directory: every file (except plugin.sig),
 * sorted by relative path, as `<relpath>\n<content>`. Signing/verifying over THIS
 * attests the whole plugin (code included), not just the manifest.
 */
function canonicalPluginContent(dir: string): string {
  const entries = readdirSync(dir, { recursive: true }) as string[];
  return entries
    .map((rel) => ({ rel: rel.split(path.sep).join('/'), abs: path.join(dir, rel) }))
    .filter((e) => e.rel !== 'plugin.sig' && statSync(e.abs).isFile())
    .sort((a, b) => a.rel.localeCompare(b.rel))
    .map((f) => `${f.rel}\n${readFileSync(f.abs, 'utf-8')}`)
    .join('\n');
}

interface PluginManifest {
  name?: string;
  version?: string;
}

/**
 * `nsb plugin` — local, signature-verified plugins under `.mbf/plugins`. Install
 * copies a local plugin directory (containing `plugin.json`) and verifies its
 * Ed25519 signature when `--pub` is given. Network/registry install is deferred
 * (kept offline-first); use a vetted local checkout for now.
 */
export const pluginCommand = new Command('plugin').description(
  'Manage local NBCLI plugins (.mbf/plugins; signature-verified): list | install | remove',
);

pluginCommand
  .command('list')
  .description('list installed plugins')
  .action(() => {
    printMini();
    const dir = pluginsDir(process.cwd());
    const names = existsSync(dir)
      ? readdirSync(dir).filter((n) => statSync(path.join(dir, n)).isDirectory())
      : [];
    log.subheader(`Plugins — ${names.length}`);
    log.blank();
    const table = new Table({
      head: [colors.primary('name'), colors.primary('version')],
      style: { head: [], border: ['gray'] },
    });
    for (const name of names) {
      let version = '?';
      try {
        version = (JSON.parse(readFileSync(path.join(dir, name, 'plugin.json'), 'utf-8')) as PluginManifest).version ?? '?';
      } catch {
        /* unreadable manifest */
      }
      table.push([name, version]);
    }
    if (!names.length) table.push([colors.dim('(none)'), '']);
    console.log(table.toString());
  });

pluginCommand
  .command('install <source>')
  .description('install a local plugin directory (verifies plugin.sig against plugin.json when --pub given)')
  .option('--pub <pub>', 'public key to verify <source>/plugin.sig')
  .action((source: string, options) => {
    printMini();
    const root = process.cwd();
    const src = path.resolve(root, source);
    const manifestPath = path.join(src, 'plugin.json');
    if (!existsSync(manifestPath)) {
      log.error(`Not a plugin (no plugin.json): ${source}`);
      process.exitCode = 1;
      return;
    }
    let manifest: PluginManifest;
    try {
      manifest = JSON.parse(readFileSync(manifestPath, 'utf-8')) as PluginManifest;
    } catch {
      log.error('plugin.json is not valid JSON.');
      process.exitCode = 1;
      return;
    }
    if (!manifest.name) {
      log.error('plugin.json is missing "name".');
      process.exitCode = 1;
      return;
    }
    if (!isSafeName(manifest.name)) {
      log.error(`Unsafe plugin name (path traversal?): "${manifest.name}". Use [A-Za-z0-9._-], no "..".`);
      process.exitCode = 1;
      return;
    }

    const sigPath = path.join(src, 'plugin.sig');
    if (options.pub) {
      if (!existsSync(sigPath)) {
        log.error('--pub was given but the plugin has no plugin.sig.');
        process.exitCode = 1;
        return;
      }
      // Verify over the WHOLE plugin (code included), not just the manifest.
      const ok = verifyContent(
        canonicalPluginContent(src),
        readFileSync(sigPath, 'utf-8').trim(),
        readFileSync(path.resolve(root, options.pub), 'utf-8'),
      );
      if (!ok) {
        log.error('Plugin signature INVALID — refusing to install.');
        process.exitCode = 1;
        return;
      }
      log.success('Plugin signature verified (whole tree).');
    } else if (existsSync(sigPath)) {
      log.warn('Plugin is signed but no --pub given — installing WITHOUT verifying.');
    } else {
      log.warn('Plugin is unsigned — installing without verification.');
    }

    const dest = path.join(pluginsDir(root), manifest.name);
    // Defense in depth: the destination must stay inside .mbf/plugins.
    if (path.resolve(dest) !== path.join(path.resolve(pluginsDir(root)), manifest.name)) {
      log.error('Refusing: plugin path escapes .mbf/plugins.');
      process.exitCode = 1;
      return;
    }
    mkdirSync(pluginsDir(root), { recursive: true });
    rmSync(dest, { recursive: true, force: true });
    cpSync(src, dest, { recursive: true });
    log.success(`Installed plugin ${manifest.name}@${manifest.version ?? '?'} → .mbf/plugins/${manifest.name}`);
  });

pluginCommand
  .command('sign <source>')
  .description('sign a plugin directory → <source>/plugin.sig (covers the whole tree)')
  .requiredOption('--key <key>', 'Ed25519 private key (PKCS#8 PEM)')
  .action((source: string, options) => {
    printMini();
    const root = process.cwd();
    const src = path.resolve(root, source);
    if (!existsSync(path.join(src, 'plugin.json'))) {
      log.error(`Not a plugin (no plugin.json): ${source}`);
      process.exitCode = 1;
      return;
    }
    const keyPath = path.resolve(root, options.key);
    if (!existsSync(keyPath)) {
      log.error(`No key: ${options.key}`);
      process.exitCode = 1;
      return;
    }
    const sig = signContent(canonicalPluginContent(src), readFileSync(keyPath, 'utf-8'));
    writeFileSync(path.join(src, 'plugin.sig'), `${sig}\n`);
    log.success(`Signed plugin (whole tree) → ${source}/plugin.sig`);
  });

pluginCommand
  .command('remove <name>')
  .description('remove an installed plugin')
  .action((name: string) => {
    printMini();
    const dest = path.join(pluginsDir(process.cwd()), name);
    if (!existsSync(dest)) {
      log.error(`No such plugin: ${name}`);
      process.exitCode = 1;
      return;
    }
    rmSync(dest, { recursive: true, force: true });
    log.success(`Removed plugin ${name}`);
  });
