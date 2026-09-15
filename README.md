# Lazurio documentation

Public, evidence-backed documentation for Lazurio. It is written first for
people evaluating or operating Lazurio and structured so agents can discover
the same canonical material without a second content store.

The documentation is available in English and in a manually curated Czech
version. It starts with a ten-minute briefing for IT administrators and a
sourced decision guide comparing Lazurio with Microsoft Copilot in the
Microsoft 365 context. Both locales share stable document identities, evidence
references and review gates; neither is generated at runtime.

## Application and deployment

- App generation: `app/v2`
- Data generation: `data/v2`
- Generated read models: `generated/v2` and build-time public artifacts
- Production target: Cloudflare Pages at `documentation.lazurio.ai`

This public repository is mounted in Lazurio as a read-only productionspace
system. Launchpad discovers it for orientation but does not start, stop or
release it. For local repository checks:

```sh
cd app/v2
bun install --frozen-lockfile
bun run check
bun run build
bun run test:browser
```

The protected GitHub workflow chain builds every same-repository pull request without
credentials, publishes its static artifact as a Cloudflare Pages preview and
adds the immutable URL to the pull request. Merging a reviewed pull request to
`main` automatically deploys the production build and smokes both the immutable
deployment and `documentation.lazurio.ai`. The dedicated Pages token and account
ID are secrets of a GitHub Environment restricted to protected `main`; they are
exposed only to trusted artifact upload jobs, never to pull-request code or the
application build. The reviewed release-smoke, credential and immutable
rollback procedure lives in [OPERATIONS.md](OPERATIONS.md).

## Source of truth

Markdown/MDX under `data/v2/docs` is the only authoring source for public
documentation. `llms.txt`, `content-index.json`, `robots.txt`, the website and
the future read-only MCP surface are derived read models of that same Git tree.
English is the default locale. Czech stable-ID search and retrieval must be
requested explicitly with `locale: cs`; canonical `/en/` and `/cs/` routes
always identify an exact localized page.

Technical behavior remains owned by the public Lazurio source and by the
relevant provider documentation. `data/v2/source-map.json` pins the evidence,
owner and review window used by public claims.

## Agent work

- Active work: `TODO.tasks.json`
- Completed work: `DONE.tasks.json`
- Open questions and blockers: `ISSUES.open.json`
- Architecture: `ARCHITECTURE.md`
- Larger rollout plan: the owning Organization's private Mission Control

## Current release boundary

This repository does not implement an MCP server, chatbot, write API or
private knowledge import. Production pages can load the GA4 tag for the same
Lazurio property as `lazurio.ai`, but only after a visitor explicitly accepts
analytics. Local development and Cloudflare preview builds do not load it.

The production measurement ID is owned by
`app/v2/wrangler.jsonc#env.production.vars.PUBLIC_GOOGLE_ANALYTICS_ID`.
`bun run build:production` reads that exact value into the Astro build and the
artifact verifier; it fails closed when the production value is missing.
The consent component initializes it only on `documentation.lazurio.ai` after
an affirmative choice. Pageviews contain only the public origin and path;
query strings, hashes, search text and other free-form values are not sent.
Launchpad entry is recognized only from one fixed UTM triplet.

The repository does not claim certifications, legal compliance, a universal
deployment model or a service-level agreement.

## License

The software and documentation in this repository are distributed under the
terms in [LICENSE.md](LICENSE.md).
Public, evidence-backed documentation for Lazurio — written for people and structured for agents.

### Link previews

`data/v2/public/social-preview-v1.png` is the unmodified approved Lazurio brand asset
`content/brand/logo/profile-light-1024.png` from the Lazurio design system
(SHA-256 `9985c6af7332c68c91667cc77116a8a7db0fc1206703ef7c0ea3b4693675d73e`). The PNG is served by this
application, without a runtime dependency on another website. Square Twitter
summary cards preserve the complete symbol; page titles and descriptions stay
owned by the existing page metadata. Replace the versioned filename when updating
the image so immutable or social crawler caches can fetch the new bytes.
