# Editorial review — 24 October 2026

Reviewed all 40 source pages (20 Czech/English pairs), including frontmatter,
navigation labels, directory descriptions, figure captions and scripted tutorial
copy. The pass uses the Impeccable Clarify approach: read the whole task,
put the answer first, remove repeated premises and keep the conditions needed
to act. Both languages were edited as prose rather than translated word for word.

## Changes

- Shorten search summaries and overview cards; keep useful topic words so
  searches still lead to the IT briefing and comparison.
- Replace abstract English wording such as “governed execution”, “control
  plane” and “source-centric” with the work or decision they describe.
- Remove repeated introductions, rhetorical openings and the comparison's
  repeated closing recommendations.
- Use grammatical Czech forms of Prostředí and align the security and
  connection labels in the sidebar with the page titles.
- Keep the tutorial's prompts, approval limits, fictional-example labels,
  provider warnings, source links and historical release qualifications.
- Use transparent background-only icon derivatives in the overview and Guide.
  Original source images remain unchanged; reproduction and digests are in
  `tools/brand/transparent-module-icons.py` and the public icon directory.

## Examples

| Before | After |
| --- | --- |
| Build the mental model: people, Agents, Organizations, Drafts and Publication. | From assigning a task to reviewing and approving the result. |
| Governed execution and durable collaboration across source-controlled organizational work. | Prepare, review and approve versioned work across repositories and tools. |
| Udělejte si jasno v lidech, agentech, Organizacích, návrzích a zveřejnění. | Od zadání úkolu přes návrh až po schválení výsledku. |
| Možnost volby přináší větší přizpůsobitelnost, ale také větší odpovědnost za správné nastavení. | Za správné nastavení odpovídá Organizace. |

## Coverage

Counts below are whitespace-delimited words in the source body, excluding
frontmatter. They include examples and markup; they are not reading-time or
quality scores. Some technical detail remains intentionally long.

| Source under each locale | Czech | English |
| --- | ---: | ---: |
| `agents.md` | 271 → 269 | 263 → 264 |
| `data-access-security.md` | 988 → 979 | 770 → 779 |
| `deployment-operations.md` | 756 → 751 | 586 → 585 |
| `environment-app-connections.md` | 2099 → 2053 | 2392 → 2364 |
| `faq.md` | 534 → 537 | 511 → 507 |
| `guide/first-steps.mdx` | 803 → 776 | 971 → 943 |
| `guide/glossary.md` | 705 → 707 | 849 → 846 |
| `guide/index.mdx` | 184 → 179 | 204 → 198 |
| `guide/recommended-apps.mdx` | 327 → 311 | 358 → 331 |
| `guide/start-here.mdx` | 532 → 510 | 599 → 576 |
| `guide/tailscale.md` | 848 → 840 | 1033 → 1021 |
| `guide/tool-connections.mdx` | 960 → 940 | 1056 → 1036 |
| `guide/work-tips.md` | 550 → 548 | 652 → 647 |
| `how-lazurio-works.md` | 476 → 476 | 658 → 659 |
| `index.mdx` | 440 → 396 | 561 → 527 |
| `it-administrators.md` | 1131 → 1114 | 963 → 935 |
| `lazurio-vs-microsoft-copilot.md` | 1006 → 972 | 992 → 964 |
| `public-evidence.md` | 825 → 822 | 934 → 933 |
| `reference.md` | 156 → 149 | 215 → 214 |
| `use-cases.md` | 379 → 374 | 372 → 383 |

Total source-body words: 28909 → 28415.

## Evidence and publication limits

This is an editorial review, not a new verification of provider claims or a
security audit. Stable IDs, evidence references, audiences, review owners,
updatedAt and reviewedAt are unchanged. Fenced examples were checked against
the prior head. This dated record tracks the language work separately from
factual source review dates.

Existing findings remain open:

- [#31](https://github.com/Lazurio/documentation/issues/31): the Guide and older
  security pages describe a different Composio standard from the newer
  Environment connection page. The protected security position was not silently
  changed during copy editing.
- [#37](https://github.com/Lazurio/documentation/issues/37): the glossary's
  underlying model of Environment kinds, Buddy and Apps needs current public
  evidence. Language and display-name improvements do not resolve that review.
- [#38](https://github.com/Lazurio/documentation/issues/38): six provider evidence
  windows have expired. The normal check/build gate remains in force.

Those source inconsistencies need to be resolved before this draft is published.

## Validation

- Astro check: 0 errors, warnings or hints.
- All 86 browser tests passed on desktop and phone projects, including all-page
  layout checks, accessibility, language switching, tutorial interactions,
  clipboard behavior, both themes and no-JavaScript reading.
- Links in all 40 pages and all 6 agent-index tests pass.
- Public-safety checks and 41 deployment/source-gate/smoke/brand tests pass.
- Browser-test build generates 41 pages and verifies redirects and consent-gated
  analytics. The normal content validation remains blocked by #38.
- All seven transparent assets have zero-alpha corners, opaque drawing interiors
  and antialiased contours; light/dark screenshots confirm no visible canvas.
- The two renamed Czech subsection headings keep their original fragment IDs.
