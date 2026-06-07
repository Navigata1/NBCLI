# Secrets & Credential Isolation

> Secrets must never enter the agent context, shell history, or disk. Reference
> them indirectly; inject them only into the child process that needs them.
> ASCII-only (mojibake-safe).

---

## 1. The rule

NEVER hard-code a secret. NEVER paste a secret into the chat, a prompt, a config
file, or the agent's context. A secret the agent can see is a secret you must
rotate. Reference secrets by INDIRECTION; resolve them at process launch only.

## 2. The 1Password (`op://`) pattern (mandatory default)

Store secrets in a vault; put only `op://` REFERENCES in committable config;
launch the process with `op run --` so values are injected into that child
process's environment and nowhere else.

```bash
# .env (committable - contains references, NOT values)
STRIPE_API_KEY=op://Engineering/stripe/restricted_key
DATABASE_URL=op://Engineering/db/url

# launch: op resolves references into the child env only
op run --env-file=.env -- npm run start
```

Why: the value never lands in the repo, the shell history, the agent context, or
on disk. The committable `.env` is just a map of references - safe to commit and
review. Rotate by changing the vault item; no code change.

## 3. Payments: Stripe restricted keys (RAKs)

For any payment/financial integration (autonomy cap: max L2 - HITL required):

- Use **Restricted API Keys (RAKs)** with least-privilege resource permissions -
  grant only the specific resources/actions the integration needs, nothing more.
- Use **test mode** keys for development; never a live secret key in a dev loop.
- Webhooks: get the **signing secret** from `stripe listen` and put it in the
  environment (via `op run --`), never in code. VERIFY every webhook signature;
  reject unsigned/invalid events.

```bash
op run --env-file=.env -- stripe listen --forward-to localhost:3000/webhooks
# STRIPE_WEBHOOK_SECRET is injected into the child env; code verifies the signature
```

## 4. Hygiene checklist
- [ ] No secret values in any tracked file (scan before commit - see Batch 6 gate).
- [ ] `.env` holds `op://` references only; real `.env.local`/values are gitignored.
- [ ] Secrets reach code only via `op run --` (or the platform secret manager).
- [ ] Stripe keys are restricted + test-mode in dev; webhook signatures verified.
- [ ] Action log records `op://` references, never resolved values.
- [ ] Any exposed secret is rotated immediately (vault item, not code).

## When NOT to deviate
- "It's just a local test key" - test keys still belong in the vault/`.env.local`,
  never in tracked code; a committed test key trains the wrong habit and leaks
  account structure.
- Do not let an agent read a raw secret "to debug" - debug with references and the
  child-process pattern; if you must, do it yourself outside the agent context.

## Portability
`op` (1Password CLI) and `stripe` CLI run in any shell/harness/CI. Where 1Password
is unavailable, the SAME indirection principle applies via the platform secret
manager (Vault, AWS/GCP Secrets Manager, Doppler) + the host's secret-injection
mechanism - reference, inject into the child, never into the agent. See
`LOCAL_FIRST.md` for the air-gapped path.
