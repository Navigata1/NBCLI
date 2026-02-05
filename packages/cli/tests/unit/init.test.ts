import { describe, expect, it } from 'vitest';
import { loadProfileConfig } from '../../src/generators/config';

const parseTools = (value?: string) =>
  value
    ? value
        .split(',')
        .map((item) => item.trim().toLowerCase())
        .filter(Boolean)
    : [];

describe('loadProfileConfig', () => {
  it('loads starter profile', () => {
    const config = loadProfileConfig('starter');
    expect(config.version).toBeDefined();
    expect(config.governance).toBeDefined();
    expect(config.confidence).toBeDefined();
  });

  it('loads professional profile', () => {
    const config = loadProfileConfig('professional');
    expect(config.version).toBeDefined();
    expect(config.governance).toBeDefined();
    expect(config.confidence).toBeDefined();
  });

  it('loads enterprise profile', () => {
    const config = loadProfileConfig('enterprise');
    expect(config.version).toBeDefined();
    expect(config.governance).toBeDefined();
    expect(config.confidence).toBeDefined();
  });
});

describe('parseTools', () => {
  it('parses comma-separated string', () => {
    const result = parseTools('claude,cursor,codex');
    expect(result).toEqual(['claude', 'cursor', 'codex']);
  });

  it('handles spaces around values', () => {
    const result = parseTools('claude , cursor , codex');
    expect(result).toEqual(['claude', 'cursor', 'codex']);
  });

  it('handles mixed case input', () => {
    const result = parseTools('Claude,CURSOR,Codex');
    expect(result).toEqual(['claude', 'cursor', 'codex']);
  });

  it('filters empty values', () => {
    const result = parseTools('claude,,cursor,');
    expect(result).toEqual(['claude', 'cursor']);
  });

  it('returns empty array when no value provided', () => {
    const result = parseTools(undefined);
    expect(result).toEqual([]);
  });

  it('returns empty array for empty string', () => {
    const result = parseTools('');
    expect(result).toEqual([]);
  });
});
