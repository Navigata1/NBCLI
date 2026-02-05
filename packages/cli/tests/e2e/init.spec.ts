import { describe, expect, it, beforeEach, afterEach, beforeAll } from 'vitest';
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'fs';
import { execSync } from 'child_process';
import path from 'path';
import { parse } from 'yaml';

const TEST_DIR = path.resolve(__dirname, '../.test-workspace');
const CLI_PATH = path.resolve(__dirname, '../../dist/cli.js');

const cliBuilt = existsSync(CLI_PATH);

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const safeRmSync = async (dir: string, retries = 3) => {
  for (let i = 0; i < retries; i++) {
    try {
      if (existsSync(dir)) {
        rmSync(dir, { recursive: true, force: true });
      }
      return;
    } catch (err: unknown) {
      if ((err as NodeJS.ErrnoException).code === 'EBUSY' && i < retries - 1) {
        await sleep(100 * (i + 1));
      } else {
        throw err;
      }
    }
  }
};

const runCli = (args: string) => {
  return execSync(`node "${CLI_PATH}" ${args}`, { cwd: TEST_DIR, encoding: 'utf-8' });
};

describe.skipIf(!cliBuilt)('cli e2e init', () => {
  beforeEach(async () => {
    await safeRmSync(TEST_DIR);
    mkdirSync(TEST_DIR, { recursive: true });
  });

  afterEach(async () => {
    await safeRmSync(TEST_DIR);
  });

  it('creates all expected files with --yes flag', () => {
    runCli('init --yes');

    expect(existsSync(path.join(TEST_DIR, '.mbf', 'mbf-governance.yaml'))).toBe(true);
    expect(existsSync(path.join(TEST_DIR, '.mbf', 'anchors.yaml'))).toBe(true);
    expect(existsSync(path.join(TEST_DIR, 'CLAUDE.md'))).toBe(true);
    expect(existsSync(path.join(TEST_DIR, '.cursor', 'rules', 'mbf.mdc'))).toBe(true);
    expect(existsSync(path.join(TEST_DIR, 'AGENTS.md'))).toBe(true);
  });

  it('generated YAML is valid', () => {
    runCli('init --yes');

    const configPath = path.join(TEST_DIR, '.mbf', 'mbf-governance.yaml');
    const anchorsPath = path.join(TEST_DIR, '.mbf', 'anchors.yaml');

    const config = parse(readFileSync(configPath, 'utf-8'));
    const anchors = parse(readFileSync(anchorsPath, 'utf-8'));

    expect(config.version).toBeDefined();
    expect(config.governance).toBeDefined();
    expect(config.confidence).toBeDefined();
    expect(typeof anchors).toBe('object');
  });

  it('generated instruction files contain expected content', () => {
    runCli('init --yes');

    const claudeContent = readFileSync(path.join(TEST_DIR, 'CLAUDE.md'), 'utf-8');
    const cursorContent = readFileSync(path.join(TEST_DIR, '.cursor', 'rules', 'mbf.mdc'), 'utf-8');
    const agentsContent = readFileSync(path.join(TEST_DIR, 'AGENTS.md'), 'utf-8');

    expect(claudeContent).toContain('Thresholds');
    expect(cursorContent).toContain('Thresholds');
    expect(agentsContent).toContain('Thresholds');
  });

  it('--yes flag skips prompts and uses defaults', () => {
    const output = runCli('init --yes');
    expect(output).toContain('Initialization Complete');
  });

  it('existing .mbf directory requires --force to overwrite', () => {
    mkdirSync(path.join(TEST_DIR, '.mbf'), { recursive: true });
    writeFileSync(path.join(TEST_DIR, '.mbf', 'mbf-governance.yaml'), 'version: "1.0"');

    expect(() => runCli('init --yes')).toThrow();

    const output = runCli('init --yes --force');
    expect(output).toContain('Initialization Complete');
    expect(existsSync(path.join(TEST_DIR, '.mbf', 'mbf-governance.yaml'))).toBe(true);
  });

  it('creates only specified tools', () => {
    runCli('init --yes --tools claude');

    expect(existsSync(path.join(TEST_DIR, 'CLAUDE.md'))).toBe(true);
    expect(existsSync(path.join(TEST_DIR, 'AGENTS.md'))).toBe(false);
    expect(existsSync(path.join(TEST_DIR, '.cursor', 'rules', 'mbf.mdc'))).toBe(false);
  });
});
