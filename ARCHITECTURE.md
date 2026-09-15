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
data/v2/docs/{en,cs}/*.md(x)  reviewed authoring source
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
pages can include consented aggregate GA4 pageviews in the existing Lazurio
property; this is a narrow external measurement integration, not a second
content store.

A standalone documentation repository is preferable to embedding the docs in
a marketing site: documentation needs its own information architecture,
evidence lifecycle, machine discovery contract and independent rollback.

## Content identity

Each document declares:

- `stableId`: locale-independent identity;
- `locale`: explicit language identity matching the top-level source folder;
- `updatedAt`: last content change;
- `reviewedAt`: last factual review;
- `reviewOwner`: accountable reviewer;
- `sourceRefs`: IDs from `data/v2/source-map.json`.

The agent artifact builder emits the exact source commit and whether the build
tree was dirty. Production artifacts must come from a clean reviewed commit.

## Localization

English (`en`) is the default locale and Czech (`cs`) is a curated peer, not a
generated read model. Both locale trees use the same source-relative slugs and
the same `stableId`, evidence references, audiences and trust-review metadata.
Starlight owns locale routing, translated UI and the route-preserving language
selector options. A compact language disclosure uses those generated URLs and
labels; the Module does not maintain a parallel locale router. The direct
light/dark button delegates changes to the upstream theme selector, which
remains the owner of persisted appearance preferences.

Content validation fails when either locale is missing, when paired documents
use different slugs or evidence metadata, or when a frontmatter locale does
not match its source folder. Structural parity does not prove semantic
equivalence, so trust-critical Czech claims retain the same named second
reviewer and exact-head gate as their English counterparts.

The content index publishes both locales, identifies English as the default
and requires callers to request Czech explicitly for stable-ID lookup or
search. A canonical route always identifies the exact localized document.

## Deployment

The application builds with the Astro Cloudflare adapter and is deployed as a
Cloudflare Pages project. Cloudflare is authoritative for `lazurio.ai`; the
Pages project and its custom hostname remain the natural owners of the public
documentation deployment while the Git repository remains the content and
review authority.

The existing `lazurio-documentation` project is a Direct Upload Pages project.
GitHub Actions is therefore the single automated deployment seam; replacing the
project with a Git-integrated Pages or Workers project would require an
unnecessary provider and custom-domain migration. The unprivileged `Verify`
workflow runs source builds and tests without Cloudflare credentials. After it
succeeds, a `workflow_run` deployment defined by the default branch downloads
only that run's static artifact, verifies its embedded source commit and uploads
it with the credential. Both upload jobs bind to the
`cloudflare-pages-credentials` GitHub Environment, whose deployment branch
policy admits only protected `main`. A `workflow_run` job is evaluated from that
default branch, so the Environment admits the trusted deploy job even when its
triggering artifact came from a same-repository pull request. Pull-request code
cannot request the token from its own workflow: verification is unprivileged,
the credentialed job never checks out or executes pull-request code, accepts
only a same-repository triggering run, downloads only that run's static
artifact, verifies its embedded source commit and rejects symlinks before
upload. Each successful upload creates a GitHub Deployment.

Same-repository pull requests deploy to an isolated `pr-<number>` preview
branch and receive an updated comment with immutable and branch-alias URLs.
Fork pull requests still run verification but cannot receive a preview because
GitHub correctly withholds repository secrets. Production accepts only a
protected `refs/heads/main` push whose event SHA matches the checked-out and
explicitly approved source and is still the live `main` tip when upload begins;
late completion of an older run cannot roll production back. Merging the exact
reviewed pull request is the publication instruction and deterministically
triggers production; no second manual deploy decision exists in the normal
path. Rollback promotes a previous immutable Pages deployment. DNS changes
remain a separate reviewed operation.

`app/v2/wrangler.jsonc#env.production.vars.PUBLIC_GOOGLE_ANALYTICS_ID` is the
single production analytics configuration. `bun run build:production` loads
that value into both Astro and the artifact verifier before deployment. Normal
and preview builds deliberately omit it. The browser bootstrap requires the
canonical documentation hostname and affirmative visitor consent before it
loads GA4. A build-time allowlist comes from the published documentation
collection. One fail-closed normalizer returns a matching canonical path or
`/404`; arbitrary path segments, query and hash never enter page payloads.
Config, page-view and app-click payloads share these normalized page fields
and explicitly clear `page_referrer`. A fixed Launchpad UTM triplet becomes bounded entry attribution; arbitrary URL,
search, Organization and user data remain outside the analytics contract.
The property owner must separately confirm that Enhanced Measurement page
changes based on browser history events are disabled; source tests cannot
prove this provider setting.

## Failure modes

- Missing or expired evidence fails content validation.
- Unknown source IDs or duplicate stable IDs fail the build.
- A narrow repository-specific denylist of known private markers and local-path
  patterns fails before deployment. It is not general secret scanning, SAST or
  DLP; live repository and provider controls remain deployment evidence.
- Missing or structurally divergent English/Czech locale pairs fail content
  validation.
- A dirty build is allowed for local preview but rejected by the production
  deployment command.
- A missing or invalid production GA4 measurement ID fails the production
  build before any artifact can be deployed; normal and preview builds remain
  analytics-free.
- Missing Cloudflare access blocks deployment without weakening the
  DNS or review gate.

## Deferred work

- A read-only MCP server backed by the same public index.
- Search infrastructure beyond Starlight's built-in static search.
- Feedback collection, authenticated content and write APIs.
