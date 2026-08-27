# Lazurio documentation

Public, evidence-backed documentation for Lazurio. It is written first for
people evaluating or operating Lazurio and structured so agents can discover
the same canonical material without a second content store.

The first release is English-first. It starts with a ten-minute briefing for IT
administrators and a sourced decision guide comparing Lazurio with Microsoft
Copilot in the Microsoft 365 context. Czech follows after English content
acceptance; it will be curated, not machine-published.

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

Deployment uses the operator's authenticated Wrangler session and an explicit
`CLOUDFLARE_ACCOUNT_ID`; the public repository does not own an account ID or
credential.

## Source of truth

Markdown/MDX under `data/v2/docs` is the only authoring source for public
documentation. `llms.txt`, `content-index.json`, `robots.txt`, the website and
the future read-only MCP surface are derived read models of that same Git tree.

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

This repository does not implement an MCP server, chatbot, write API, analytics
pipeline or private knowledge import. It does not claim certifications, legal
compliance, a universal deployment model or a service-level agreement.

## License

The software and documentation in this repository are distributed under the
terms in [LICENSE.md](LICENSE.md).
Public, evidence-backed documentation for Lazurio — written for people and structured for agents.
