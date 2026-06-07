# HARD_STOPS.md

Commands the AI agent must NEVER execute autonomously, classified by severity.
Load at session start, after compaction, and before infrastructure or database operations.

---

## Severity Classification

| Tier | Severity | Agent Behavior |
|------|----------|----------------|
| **5 — CATASTROPHIC** | Irreversible, wide blast radius | NEVER execute — present command for human |
| **4 — DESTRUCTIVE** | Difficult to reverse, broad scope | Require blast radius assessment + explicit confirmation + 10s delay |
| **3 — SERVICE MUTATION** | Potentially reversible, moderate scope | Require confirmation + show what changes and how to revert |

---

## Tier 5 — CATASTROPHIC (Agent Must NEVER Execute)

### Infrastructure
- `terraform destroy` (any variant)
- `terraform apply -destroy`
- `pulumi destroy`
- `aws rds delete-db-instance` (without `--skip-final-snapshot`)
- `aws ec2 terminate-instances` (production-tagged)
- `kubectl delete namespace` (production)

### Database
- `DROP DATABASE`
- `DROP SCHEMA ... CASCADE`
- `TRUNCATE` on production tables
- `drizzle-kit push --force` against production
- `prisma db push --force-reset` against production
- Any production ORM or migration command using destructive `--force` flags

### File System
- `rm -rf` on `/`, home directory, or project root
- `git clean -fdx` on protected or production branches
- Format or partition commands

### Bypass Flags
- Any `--force`, `--yes`, `--no-confirm` on destructive operations
- Any flag that bypasses interactive confirmation prompts

---

## Tier 4 — DESTRUCTIVE (Require Blast Radius Assessment)

- `DELETE FROM` without `WHERE` clause
- `TRUNCATE` on staging tables
- `git push --force` to protected branches
- Schema migrations on production databases
- Production deployments without rollback plan
- IAM permission changes on production accounts
- Destructive infrastructure operations without independent backup verification
- Destructive infrastructure operations without remote state verification

---

## Tier 3 — SERVICE MUTATION (Require Confirmation + Revert Path)

- `DROP TABLE` (non-production)
- `DROP INDEX` on active tables
- Schema migrations on staging
- Bulk data updates (1000+ rows)
- DNS record changes
- SSL certificate modifications

---

## Override Protocol

When a hard-stopped command is genuinely needed:

1. **STOP** — Agent does not execute
2. **EXPLAIN** — Agent states what command was about to run and why it's blocked
3. **PRESENT** — Agent shows the exact command for human to copy
4. **WAIT** — Human executes in their own terminal
5. **VERIFY** — Agent confirms result after human reports back

---

## Custom Project Stops

Add project-specific hard stops below:
- [project-specific critical operations]

---

> Maintained per ENH-INC-001 (Grigorev Incident). See NS §14.6.1 for blast radius classification.
