# RELEASE_CHECKLIST.md — NBCLI

The release **tag** and **`npm publish`** are **owner-controlled** (Jon). This is the runbook to get
to "one command from shipping" and what to verify after. Nothing here is run autonomously.

## 0. Pre-flight (automated — must all pass)
```sh
pnpm dogfood        # build · nbb-sync · self-portability · typecheck · lint · test · scan (7/7)
pnpm sbom           # writes sbom.json (CycloneDX, ~18 components)
```
- [ ] `pnpm dogfood` PASS (7/7).
- [ ] Version single-sourced: `packages/cli/src/version.ts` `NBCLI_VERSION` == every `package.json`
      `version` == `packages/mcp-server/src/mcp.ts` (enforced by `version.test.ts`).
- [ ] `CHANGELOG.md` has the matching `## <version>` entry (same-PR ledger).

## 1. Artifact verification
```sh
pnpm -r build
pnpm --filter @nsb/cli build:standalone                 # cold-checkout safe: pnpm build does NOT emit it
node packages/cli/dist/nsb-standalone.js --version      # MUST equal the release version
for p in cli core schema anchors mcp-server; do (cd packages/$p && npm publish --dry-run); done
```
(`release.yml` also builds + asserts the standalone version before publish, so a mismatch fails CI early.)
- [ ] **Standalone monolith reports the correct version.** (Auto-rebuilt fresh on publish via the
      `@nsb/cli` `prepack` hook; verify manually because the regular `pnpm build` does NOT rebuild it.)
- [ ] All 5 packages produce a tarball with no errors.
- [ ] `@nsb/cli` tarball contains `dist/cli.js`, `dist/nsb-standalone.js`, `LICENSE`.

## 2. Publish (OWNER ONLY — not autonomous)
The CI path forces public access + provenance for the whole graph:
```sh
# .github/workflows/release.yml -> pnpm -r publish --access public --no-git-checks --provenance
```
- [ ] `@nsb/cli` carries `publishConfig.access=public` + `provenance:true`; the other 4 `@nsb/*`
      packages rely on the workflow's `--access public` flag (scoped pkgs default to restricted).
- [ ] Tag the release (annotated, signed) — **owner**.
- [ ] Dispatch `release.yml` (needs `id-token: write` for npm provenance + `NPM_TOKEN`).

## 3. Post-publish verification
```sh
npm view @nsb/cli version
npm i -g @nsb/cli && nsb --version && nsb doctor
```
- [ ] `npm view` shows the new version + provenance attestation.
- [ ] `npm i -g @nsb/cli` then `nsb --version` / `nsb doctor` smoke-passes.
- [ ] GitHub Release attaches the standalone monolith + `sbom.json` + `SHA256SUMS` if distributing those.

## Honest notes
- npm publish has **not** been performed; `npm i -g @nsb/cli` is aspirational until the owner dispatches.
- The monolith is distributed as a single file (`dist/nsb-standalone.js`); attach it to the GitHub Release.
- Methodology content is CC BY-NC-SA (see `NOTICE`); the engine is MIT. Both ship.
