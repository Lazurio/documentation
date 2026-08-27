# Production operations

The public site is a Cloudflare Pages project named
`lazurio-documentation`. Production changes are accepted only from a clean,
reviewed `main` commit through the gate in `app/v2/scripts/assert-production-gate.mjs`.
Provider account identifiers and credentials remain operator environment values;
they are not stored in this repository.

## Release smoke

After every deployment or rollback, verify the canonical hostname, redirect,
IT briefing, public evidence, both SVG diagrams, TLS request path and exact
agent index provenance:

```sh
cd app/v2
LAZURIO_DOCUMENTATION_EXPECTED_SHA=<exact-40-character-commit> \
  bun run smoke:production
```

Use `LAZURIO_DOCUMENTATION_SMOKE_URL` only to test a specific immutable Pages
deployment before it becomes canonical.

## Immutable Pages rollback

A provider-side rollback is a production publication. It needs the same
explicit action-time authorization as a deployment. Cloudflare accepts only a
successful production deployment as a rollback target; preview deployments are
not eligible.

1. List production deployments and record the current deployment id, rollback
   target id and each exact source commit:

   ```sh
   cd app/v2
   wrangler pages deployment list \
     --project-name=lazurio-documentation \
     --environment=production \
     --json
   ```

2. Smoke the immutable target URL with its expected source commit.
3. With a short-lived Pages Write token in local custody, roll production back:

   ```sh
   export CLOUDFLARE_ACCOUNT_ID=<operator-custody-account-id>
   export CLOUDFLARE_API_TOKEN=<short-lived-pages-write-token>
   export LAZURIO_DOCUMENTATION_ROLLBACK_DEPLOYMENT_ID=<target-deployment-id>
   export LAZURIO_DOCUMENTATION_ROLLBACK_CONFIRMATION="ROLLBACK:${LAZURIO_DOCUMENTATION_ROLLBACK_DEPLOYMENT_ID}"
   bun run rollback:production
   ```

4. Run the canonical release smoke against the target source commit.
5. To finish a rehearsal, repeat the exact rollback command with the original
   current deployment id and smoke its source commit. Do not rebuild either
   version: the rehearsal proves promotion of two existing immutable artifacts.

If the target smoke fails, restore the recorded current deployment before
investigating. Never delete a deployment as part of rollback.

## Repository security baseline

GitHub secret scanning, push protection and Dependabot security updates are
enabled. The current Lazurio Organization is on GitHub Free. GitHub's current
product contract limits non-provider pattern scanning and partner validity
checks to Organization repositories on GitHub Team with Secret Protection, so
those two modes are not part of today's control set. Re-evaluate them after a
plan change; do not describe them as enabled based on an unenforced recommended
configuration.

Authoritative DNS, DNSSEC and Dashboard origin controls are governed in the
private HumanAndMachine-ai infrastructure source. This public repository does
not duplicate provider custody or private rollout evidence.
