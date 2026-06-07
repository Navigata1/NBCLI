import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { dirname } from 'path';

export interface PlannedWrite {
  path: string;
  bytes: number;
  existed: boolean;
}

let dryRun = false;
const plannedWrites: PlannedWrite[] = [];

/**
 * Enable/disable global dry-run mode. When on, ensureDir/writeFileSafe record
 * intended writes instead of touching disk, so any command can offer a
 * `--dry-run` preview through the same write path.
 */
export const setDryRun = (value: boolean) => {
  dryRun = value;
  if (value) plannedWrites.length = 0;
};

export const isDryRun = () => dryRun;

export const getPlannedWrites = (): PlannedWrite[] => [...plannedWrites];

export const ensureDir = (path: string) => {
  if (dryRun) return;
  if (!existsSync(path)) {
    mkdirSync(path, { recursive: true });
  }
};

export const writeFileSafe = (path: string, content: string, force = false) => {
  const existed = existsSync(path);

  if (dryRun) {
    // Record the intended write; do not throw on collisions — the preview
    // surfaces "would overwrite" so the operator can decide.
    plannedWrites.push({ path, bytes: Buffer.byteLength(content, 'utf-8'), existed });
    return;
  }

  if (existed && !force) {
    throw new Error(`File already exists: ${path}`);
  }

  ensureDir(dirname(path));
  writeFileSync(path, content, 'utf-8');
};

export const fileExists = (path: string) => existsSync(path);
