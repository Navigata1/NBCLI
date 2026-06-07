// Port of NBB scripts/vet_skill.sh — the per-skill supply-chain gate. Static heuristic scan for the
// patterns that make third-party skills dangerous: prompt injection, pipe-to-shell, reverse shells,
// credential/exfil, obfuscation, destructive commands. Default-deny: FAIL blocks, WARN -> human review.
// Necessary, not sufficient (high-trust sources + pinned SHAs + human review still apply).

export type VetVerdict = 'PASS' | 'WARN' | 'FAIL';
export interface VetFinding {
  severity: 'FAIL' | 'WARN';
  label: string;
}
export interface VetResult {
  verdict: VetVerdict;
  findings: VetFinding[];
}

const FAIL_PATTERNS: [RegExp, string][] = [
  [/(curl|wget)[^|]*\|\s*(sudo\s+)?(bash|sh|zsh)/i, 'pipe-to-shell (curl|wget | sh)'],
  [/base64\s+(-d|--decode|-D)[^|]*\|\s*(bash|sh|zsh|python)/i, 'base64 decode piped to interpreter'],
  [/eval\s*[("']*\s*\$\((curl|wget)/i, 'eval of remote fetch'],
  [/\/dev\/tcp\/[0-9]/, 'reverse shell (/dev/tcp)'],
  [/nc\s+(-[a-zA-Z]*e|.*-e)\s/, 'netcat exec (-e) reverse shell'],
  [/bash\s+-i\s*>&\s*\/dev\/tcp/, 'interactive bash reverse shell'],
  [/:\s*\(\)\s*\{[^}]*:\s*\|\s*:/, 'fork bomb'],
  [/rm\s+-[a-z]*rf?[a-z]*\s+(\/|~|\$HOME|\*)(\s|$)/i, 'destructive rm -rf on root/home'],
  [/(cat|cp|scp)[^\n]*(\.ssh\/id_|\.aws\/credentials|\.config\/gh)/, 'reads private keys/credentials'],
  [/ignore\s+(all\s+)?(previous|prior|the\s+above)\s+instructions/i, 'prompt injection: ignore-previous-instructions'],
  [/disregard\s+(the\s+)?(above|prior|previous|system|all)/i, 'prompt injection: disregard'],
  [/(reveal|print|output|repeat|leak)[^\n]{0,30}(system\s+prompt|your\s+instructions)/i, 'prompt injection: exfil system prompt'],
  [/exfiltrat/i, 'explicit exfiltration intent'],
  // The dangerous FLAG is a block; a bare "skip-permissions" mention is WARN (governance docs forbid
  // it, security-education discusses it) -- demoted to avoid false positives on forbidding prose.
  [/(--dangerously-skip-permissions|--yolo)\b/i, 'encourages bypassing permission guards (dangerous flag)'],
];

const WARN_PATTERNS: [RegExp, string][] = [
  [/curl[^\n]*-X\s*POST[^\n]*https?:\/\//i, 'outbound POST to a URL'],
  [/\b(?:[0-9]{1,3}\.){3}[0-9]{1,3}\b/, 'hardcoded IP address'],
  [/[A-Za-z0-9+/]{200,}={0,2}/, 'long base64 / obfuscated blob'],
  [/chmod\s+(-R\s+)?777/, 'chmod 777 (over-broad perms)'],
  [/>>\s*~?\/?\.(bashrc|zshrc|profile|bash_profile)/, 'writes to a shell rc file'],
  [/(process\.env|os\.environ|printenv|env)[^\n]{0,40}(curl|fetch|http|post)/i, 'env vars near a network call'],
  [/(discord\.com\/api\/webhooks|hooks\.slack\.com|\bwebhook\b)/i, 'webhook endpoint'],
  [/skip[_-]permissions/i, 'mentions skip-permissions (review: forbidding vs encouraging)'],
];

/** Statically vet ONE skill's text. Default-deny: FAIL blocks inclusion; WARN -> human review. Pure. */
export function vetSkill(content: string): VetResult {
  const findings: VetFinding[] = [];
  for (const [re, label] of FAIL_PATTERNS) if (re.test(content)) findings.push({ severity: 'FAIL', label });
  for (const [re, label] of WARN_PATTERNS) if (re.test(content)) findings.push({ severity: 'WARN', label });
  if (!/^---/.test(content)) findings.push({ severity: 'WARN', label: 'missing YAML front-matter (name/description)' });

  const verdict: VetVerdict = findings.some((f) => f.severity === 'FAIL')
    ? 'FAIL'
    : findings.some((f) => f.severity === 'WARN')
      ? 'WARN'
      : 'PASS';
  return { verdict, findings };
}

/** Exit code mirroring NBB vet_skill.sh: 0 PASS, 2 WARN, 1 FAIL. */
export const vetExitCode = (v: VetVerdict): number => (v === 'FAIL' ? 1 : v === 'WARN' ? 2 : 0);
