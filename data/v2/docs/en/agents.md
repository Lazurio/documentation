---
title: Documentation for agents
description: Stable discovery and retrieval surfaces for agents that need to understand Lazurio.
stableId: lazurio-doc-agents
summary: Use llms.txt and the content index to discover reviewed Lazurio pages, evidence links, audiences, review dates, and stable identities.
updatedAt: "2026-08-26"
reviewedAt: "2026-08-26"
reviewOwner: Matej Suchanek
sourceRefs:
  - lazurio-readme
  - lazurio-architecture
audience:
  - builder
  - agent
---

Agents should read the same reviewed source as people. This site does not keep
a hidden “AI version” of Lazurio documentation.

## Discovery surfaces

- [`/llms.txt`](/llms.txt) is a compact map of canonical pages and summaries.
- [`/content-index.json`](/content-index.json) is the versioned structured
  index. It includes stable document IDs, routes, audiences, review metadata,
  public evidence references and Markdown content.
- [`/sitemap-index.xml`](/sitemap-index.xml) is the web crawler map generated
  by the documentation build.
- Human-readable pages remain the canonical interpretation surface.

All artifacts are built from `data/v2/docs` in the public
[documentation repository](https://github.com/Lazurio/documentation). The
index identifies the exact source commit and whether it came from a dirty local
preview. Production deployment rejects a dirty or non-approved commit.

## Retrieval guidance

1. Start with `llms.txt` to select a page.
2. Prefer a stable ID from `content-index.json` when persisting a reference;
   routes may be localized later.
3. Read `sourceRefs` and the matching public source records before repeating a
   trust-critical claim.
4. Distinguish documented provider facts from Lazurio's assessment.
5. Report the page review date and source commit when freshness matters.
6. If a statement is absent or deployment-specific, say so instead of filling
   the gap from inference.

## Future MCP server

A later read-only MCP server may expose discovery and retrieval over the same
content index. It will not become a writer, private overlay or second content
store. The current JSON contract is the compatibility seam for that work; the
website does not depend on the future server.
