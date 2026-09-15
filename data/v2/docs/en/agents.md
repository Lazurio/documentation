---
title: Documentation for agents
description: Text and JSON indexes for agents reading Lazurio documentation.
stableId: lazurio-doc-agents
locale: en
summary: Use llms.txt and the content index to discover reviewed Lazurio pages, evidence links, audiences, review dates, and stable identities.
updatedAt: "2026-09-15"
reviewedAt: "2026-09-15"
reviewOwner: Matej Suchanek
sourceRefs:
  - lazurio-readme
  - lazurio-architecture
audience:
  - builder
  - agent
---

Agents read the same pages as people. Text and JSON indexes also make that
content available for automated search.

## Where to find the content

- [`/llms.txt`](/llms.txt) is a compact map of canonical pages and summaries.
- [`/content-index.json`](/content-index.json) is the versioned structured
  index. It includes stable document IDs, routes, audiences, review metadata,
  canonical URLs, public source paths, evidence references and Markdown content.
- [`/sitemap-index.xml`](/sitemap-index.xml) is the web crawler map generated
  by the documentation build.
- Use the published pages when you need the full explanation.

Stable-ID retrieval defaults to the English document. Agents can request a
different published locale explicitly; canonical routes always select the exact
localized page.

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

An MCP server for this documentation is not available yet. If added, it should
serve the same content as the JSON index, read-only. It should neither edit
documentation nor read private data. For now, use the links above.
