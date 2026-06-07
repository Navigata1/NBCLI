import { describe, expect, it } from 'vitest';
import { buildWorktreeArgs } from '../../src/commands/worktree';

describe('buildWorktreeArgs', () => {
  it('list', () => {
    expect(buildWorktreeArgs('list')).toEqual(['worktree', 'list']);
  });

  it('create without branch', () => {
    expect(buildWorktreeArgs('create', '/p/wt')).toEqual(['worktree', 'add', '/p/wt']);
  });

  it('create with branch', () => {
    expect(buildWorktreeArgs('create', '/p/wt', 'feat')).toEqual(['worktree', 'add', '-b', 'feat', '/p/wt']);
  });

  it('remove', () => {
    expect(buildWorktreeArgs('remove', '/p/wt')).toEqual(['worktree', 'remove', '/p/wt']);
  });

  it('create requires a path', () => {
    expect(() => buildWorktreeArgs('create')).toThrow(/path/);
  });

  it('remove requires a path', () => {
    expect(() => buildWorktreeArgs('remove')).toThrow(/path/);
  });
});
