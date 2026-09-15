# Production operations

The public site is the existing Direct Upload Cloudflare Pages project named
`lazurio-documentation`. `.github/workflows/verify.yml` builds and verifies
without secrets. After a successful run, the default-branch-owned
`.github/workflows/deploy.yml` downloads that exact run's static artifact,
checks its embedded source commit, publishes previews for same-repository
branches, or deploys production after a reviewed merge reaches protected
`main`. The production source gate in
`app/v2/scripts/assert-production-gate.mjs` binds the protected push event,
checked-out source and approved SHA. The credentialed workflow also reads the
live protected branch immediately before upload and rejects a completed run
that is no longer the current `main` tip.

The build and browser-test jobs never receive Cloudflare credentials. They
upload only the generated `dist` artifact. Both trusted `workflow_run` upload
jobs bind to the `cloudflare-pages-credentials` GitHub Environment, which must
admit only the selected `main` branch (which is protected), and use its two
environment secrets. Configure the branch policy before storing either secret:

- `CLOUDFLARE_API_TOKEN`: a dedicated token scoped to `Account / Cloudflare
  Pages / Edit` for the HumanAndMachine Platform account;
- `CLOUDFLARE_ACCOUNT_ID`: the HumanAndMachine Platform account identifier.

The token is a CI capability, not publication authorization. Branch protection,
exact-head review and the explicit instruction to merge the reviewed pull
request remain the publication gate. Pull requests from forks are verified but
do not receive a deployment. A same-repository pull request cannot read the
Cloudflare credential because its ref is rejected by the environment deployment
branch policy; do not move these values to repository or Organization secrets.

An operator's authenticated Wrangler session is reserved for readback,
rollback and break-glass recovery; it is not a parallel routine deployment
path. Provider identifiers and credentials are never stored in Git.

Production analytics uses measurement ID `G-PBSK35RX41`, the existing Lazurio
GA4 property used by the public website. The deploy artifact contains a
consent-gated bootstrap; it does not contact Google before an affirmative
choice and normal or preview builds contain no analytics configuration.
Plausible is not part of the documentation artifact. Removing a property or
cancelling a provider subscription is a separate operator decision, not part
of this migration.

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
