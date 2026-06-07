import { describe, expect, it, beforeEach, afterEach } from 'vitest';
import { existsSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'fs';
import { execSync } from 'child_process';
import { tmpdir } from 'os';
import path from 'path';

const CLI_PATH = path.resolve(__dirname, '../../dist/cli.js');
const cliBuilt = existsSync(CLI_PATH);

describe.skipIf(!cliBuilt)('cli e2e check (enforcement)', () => {
  let dir: string;

  beforeEach(() => {
    dir = mkdtempSync(path.join(tmpdir(), 'nbcli-check-'));
    execSync(`node "${CLI_PATH}" init --yes`, { cwd: dir, encoding: 'utf-8' });
  });
  afterEach(() => rmSync(dir, { recursive: true, force: true }));

  const write = (rel: string, content: string) => {
    const fp = path.join(dir, rel);
    mkdirSync(path.dirname(fp), { recursive: true });
    writeFileSync(fp, content, 'utf-8');
    return rel;
  };
  const run = (args: string, input?: string) =>
    execSync(`node "${CLI_PATH}" ${args}`, { cwd: dir, encoding: 'utf-8', input });

  it('blocks a risky file under strict (exit 1)', () => {
    write('src/secrets.ts', 'export const api_key = "x";');
    expect(() => run('check src/secrets.ts --profile strict')).toThrow();
  });

  it('only warns under minimal (exit 0)', () => {
    write('src/secrets.ts', 'export const api_key = "x";');
    expect(run('check src/secrets.ts --profile minimal')).toContain('WARN');
  });

  it('allows a clean file (exit 0)', () => {
    write('src/util.ts', 'const x = 1;\n');
    expect(run('check src/util.ts --profile strict')).toContain('ALLOW');
  });

  it('only WARNS (never blocks) on an advisory-only match under strict', () => {
    write('infra/notes.md', 'we use terraform for infra\n'); // infra_as_code is advisory (no enforce)
    expect(run('check infra/notes.md --profile strict')).toContain('WARN');
  });

  const hookExit = (payload: string) => {
    try {
      run('check --hook --profile strict', payload);
      return 0;
    } catch (err) {
      return (err as { status?: number }).status ?? 0;
    }
  };

  it('--hook blocks a risky Write/Edit with exit code 2', () => {
    expect(
      hookExit(JSON.stringify({ tool_input: { file_path: 'src/auth/login.ts', content: 'x' } })),
    ).toBe(2);
  });

  it('--hook blocks a NotebookEdit to a risky path (notebook_path) with exit 2', () => {
    expect(
      hookExit(JSON.stringify({ tool_input: { notebook_path: 'src/auth/cells.ipynb', new_source: 'x=1' } })),
    ).toBe(2);
  });

  it('--hook fails CLOSED (exit 2) on an unparsable payload under strict', () => {
    expect(hookExit('{ this is not json')).toBe(2);
  });
});
