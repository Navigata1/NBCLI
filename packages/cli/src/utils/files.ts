import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { dirname } from 'path';

export const ensureDir = (path: string) => {
  if (!existsSync(path)) {
    mkdirSync(path, { recursive: true });
  }
};

export const writeFileSafe = (path: string, content: string, force = false) => {
  if (existsSync(path) && !force) {
    throw new Error(`File already exists: ${path}`);
  }
  ensureDir(dirname(path));
  writeFileSync(path, content, 'utf-8');
};

export const fileExists = (path: string) => existsSync(path);
