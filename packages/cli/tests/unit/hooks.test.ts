import { describe, expect, it } from 'vitest';
import { __internals } from '../../src/commands/hooks';

describe('hooks managed-block handling', () => {
  it('strips a managed block but keeps surrounding content', () => {
    const withBlock = `#!/bin/sh\necho hi\n${__internals.PRECOMMIT_BLOCK}\n`;
    const stripped = __internals.stripBlock(withBlock);
    expect(stripped).not.toContain(__internals.BEGIN);
    expect(stripped).not.toContain(__internals.END);
    expect(stripped).toContain('echo hi');
  });

  it('is a no-op when there is no managed block', () => {
    expect(__internals.stripBlock('#!/bin/sh\necho hi\n')).toContain('echo hi');
  });

  it('pre-commit block runs `nsb check --staged` and fails closed when nsb is missing', () => {
    expect(__internals.PRECOMMIT_BLOCK).toContain('nsb check --staged');
    expect(__internals.PRECOMMIT_BLOCK).toContain('command -v nsb');
  });

  it('Claude hook runs `nsb check --hook` and fails closed (exit 2) when nsb is missing', () => {
    expect(__internals.CLAUDE_HOOK_CMD).toContain('nsb check --hook');
    expect(__internals.CLAUDE_HOOK_CMD).toContain('command -v nsb');
    expect(__internals.CLAUDE_HOOK_CMD).toContain('exit 2');
  });

  it('matcher covers every file-mutating Claude tool', () => {
    for (const tool of ['Write', 'Edit', 'MultiEdit', 'NotebookEdit']) {
      expect(__internals.HOOK_MATCHER).toContain(tool);
    }
  });
});
