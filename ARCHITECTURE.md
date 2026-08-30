# Architecture

## Goal

Provide one public, reviewable explanation of Lazurio for people and agents.
The first consumer is an IT administrator who needs to understand the system,
its trust boundaries and the operational decision before approving it.

## Invariants

1. Markdown/MDX in Git is the only authoring source.
2. The website, sitemap, `llms.txt` and content index derive from the same tree.
3. Public explanation never replaces a code-owned runtime contract.
4. Trust-critical claims have public evidence, an owner and a review date.
5. Private Organization, client and Personalspace information never enters the
   repository.
6. A future MCP server may read the content index but cannot become a writer or
   a second content store.

## Shape

```text
data/v2/docs/*.md(x)       reviewed authoring source
          |
          +--> Astro + Starlight --> semantic website
          |
          +--> artifact builder --> llms.txt
                                 --> content-index.json
                                 --> robots.txt
                                 --> sitemap.xml (Starlight/Astro build)

data/v2/source-map.json    public evidence and freshness contract
```

`app/v2` is the only runtime generation. `data/v2` contains authoritative
content and public assets. `generated/v2` is reserved for reproducible derived
artifacts that need to be inspected in Git; the deploy-time agent artifacts are
generated directly into the public build input and are not authoring sources.

## Why this stack

Astro, Starlight, Bun and Cloudflare provide a small, well-supported static
documentation stack with accessible navigation, deterministic builds and a
portable deployment output. This repository intentionally excludes an editor,
a private content import, migration history and unrelated assets. Production
pages include aggregate Plausible pageviews; this is a narrow external
measurement integration, not a second content store or analytics pipeline.

A standalone documentation repository is preferable to embedding the docs in
a marketing site: documentation needs its own information architecture,
evidence lifecycle, machine discovery contract and independent rollback.

## Content identity

Each document declares:

- `stableId`: locale-independent identity;
- `updatedAt`: last content change;
- `reviewedAt`: last factual review;
- `reviewOwner`: accountable reviewer;
- `sourceRefs`: IDs from `data/v2/source-map.json`.

The agent artifact builder emits the exact source commit and whether the build
tree was dirty. Production artifacts must come from a clean reviewed commit.

## Deployment

The application builds with the Astro Cloudflare adapter and is deployed as a
Cloudflare Pages project. Cloudflare is authoritative for `lazurio.ai`; the
Pages project and its custom hostname remain the natural owners of the public
documentation deployment while the Git repository remains the content and
review authority.

Preview and production are separate branches of the Pages project. The public
domain is connected only after exact-head content review and provider readback.
Rollback redeploys the previous immutable Pages deployment. DNS changes are a
separate reviewed operation and are not part of ordinary documentation
publication.

`app/v2/wrangler.jsonc#env.production.vars.PUBLIC_PLAUSIBLE_SCRIPT_URL` is the
single production analytics configuration. `bun run build:production` loads
that value into both Astro and the artifact verifier before deployment. Normal
and preview builds deliberately omit it, and the browser bootstrap still
requires the canonical documentation hostname before loading Plausible.

## Failure modes

- Missing or expired evidence fails content validation.
- Unknown source IDs or duplicate stable IDs fail the build.
- A narrow repository-specific denylist of known private markers and local-path
  patterns fails before deployment. It is not general secret scanning, SAST or
  DLP; live repository and provider controls remain deployment evidence.
- A dirty build is allowed for local preview but rejected by the production
  deployment command.
- A missing production Plausible script URL fails the production build before
  any artifact can be deployed; normal and preview builds remain analytics-free.
- Missing Cloudflare access blocks deployment without weakening the
  DNS or review gate.

## Deferred work

- Czech localization after English content acceptance.
- A read-only MCP server backed by the same public index.
- Search infrastructure beyond Starlight's built-in static search.
- Feedback collection, authenticated content and write APIs.
