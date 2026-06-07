#!/bin/bash
# =============================================================================
# NBB - Per-Skill Security Gate (vet_skill)
#
# Statically scans ONE skill file for the patterns that make third-party skills
# dangerous: prompt injection, pipe-to-shell, reverse shells, credential/exfil,
# obfuscation, and destructive commands. This is the gate every skill MUST pass
# before it can enter a downloadable pack.
#
# Usage:  bash scripts/vet_skill.sh <path-to-SKILL.md>
# Exit:   0 = PASS    2 = WARN (review)    1 = FAIL (block)    3 = usage/error
#
# This is a STATIC heuristic gate, not a sandbox. It is necessary, not
# sufficient: high-trust sources + pinned SHAs + human review still apply.
# False positives are expected on security-education skills (which legitimately
# discuss these patterns) - those go to manual review (WARN), never silent pass.
# ASCII-only.
# =============================================================================
set -uo pipefail

FILE="${1:-}"
[ -z "$FILE" ] && { echo "usage: vet_skill.sh <SKILL.md>" >&2; exit 3; }
[ -f "$FILE" ] || { echo "FAIL: not found: $FILE" >&2; exit 1; }

fail=0; warn=0
hit() { echo "  [$1] $2"; }

scan() { # scan <severity> <regex> <label>
  local sev="$1" re="$2" label="$3"
  if LC_ALL=C grep -nIEq "$re" "$FILE" 2>/dev/null; then
    hit "$sev" "$label"
    LC_ALL=C grep -nIE "$re" "$FILE" 2>/dev/null | head -2 | sed 's/^/        > /'
    [ "$sev" = "FAIL" ] && fail=1
    [ "$sev" = "WARN" ] && warn=1
  fi
}

echo "vet: $FILE"

# --- CRITICAL: auto-block ---
scan FAIL '(curl|wget)[^|]*\|[[:space:]]*(sudo[[:space:]]+)?(bash|sh|zsh)' "pipe-to-shell (curl|wget | sh)"
scan FAIL 'base64[[:space:]]+(-d|--decode|-D)[^|]*\|[[:space:]]*(bash|sh|zsh|python)' "base64 decode piped to interpreter"
scan FAIL 'eval[[:space:]]*[("\x27]*[[:space:]]*\$\((curl|wget)' "eval of remote fetch"
scan FAIL '/dev/tcp/[0-9]' "reverse shell (/dev/tcp)"
scan FAIL 'nc[[:space:]]+(-[a-zA-Z]*e|.*-e)[[:space:]]' "netcat exec (-e) reverse shell"
scan FAIL 'bash[[:space:]]+-i[[:space:]]*>&[[:space:]]*/dev/tcp' "interactive bash reverse shell"
scan FAIL ':[[:space:]]*\(\)[[:space:]]*\{[^}]*:[[:space:]]*\|[[:space:]]*:' "fork bomb"
scan FAIL 'rm[[:space:]]+-[a-zA-Z]*rf?[a-zA-Z]*[[:space:]]+(/|~|\$HOME|\*)([[:space:]]|$)' "destructive rm -rf on root/home"
scan FAIL '(cat|cp|scp)[^\n]*(\.ssh/id_|\.aws/credentials|\.config/gh)' "reads private keys/credentials"
scan FAIL 'ignore[[:space:]]+(all[[:space:]]+)?(previous|prior|the[[:space:]]+above)[[:space:]]+instructions' "prompt injection: ignore-previous-instructions"
scan FAIL 'disregard[[:space:]]+(the[[:space:]]+)?(above|prior|previous|system|all)' "prompt injection: disregard"
scan FAIL '(reveal|print|output|repeat|leak)[^\n]{0,30}(system[[:space:]]+prompt|your[[:space:]]+instructions)' "prompt injection: exfil system prompt"
scan FAIL 'exfiltrat' "explicit exfiltration intent"
scan FAIL '(--dangerously-skip-permissions|--yolo|skip[_-]permissions)' "encourages bypassing permission guards"

# --- WARN: route to human review ---
scan WARN 'curl[^\n]*-X[[:space:]]*POST[^\n]*https?://' "outbound POST to a URL"
scan WARN '\b(([0-9]{1,3}\.){3}[0-9]{1,3})\b' "hardcoded IP address"
scan WARN '[A-Za-z0-9+/]{200,}={0,2}' "long base64/obfuscated blob"
scan WARN 'chmod[[:space:]]+(-R[[:space:]]+)?777' "chmod 777 (over-broad perms)"
scan WARN '>>[[:space:]]*~?/?\.(bashrc|zshrc|profile|bash_profile)' "writes to shell rc"
scan WARN '(process\.env|os\.environ|printenv|env)[^\n]{0,40}(curl|fetch|http|post)' "environment variables near network call"
scan WARN 'webhook|discord\.com/api/webhooks|hooks\.slack\.com' "webhook endpoint"

# --- Hygiene: front-matter present (not security, but pack-readiness) ---
head -1 "$FILE" | grep -q '^---' || { hit WARN "missing YAML front-matter (name/description)"; warn=1; }

echo "---"
if [ "$fail" -eq 1 ]; then echo "VERDICT: FAIL (blocked from pack)"; exit 1; fi
if [ "$warn" -eq 1 ]; then echo "VERDICT: WARN (manual review required before inclusion)"; exit 2; fi
echo "VERDICT: PASS"; exit 0
