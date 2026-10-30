# Documentation refresh and copy review — 28 October 2026

This change brings the public guidance up to Platform v0.1.14 and the approved integration policy. It addresses audit issues #42–#47. The newer ChatGPT-app controls are identified as implemented on main after v0.1.14, not as enforced by that final release.

## What the reader sees

Every published page displays one “Last updated” date from its own `updatedAt` metadata near the title, including the overview hero. Dates come from authored frontmatter, not Git timestamps or build time. Unchanged pages keep their previous dates. The fact-review date remains in the source metadata and content index for traceability; it is not displayed as a second date or presented as independent certification or approval to publish.

The bilingual reference page now explains this distinction explicitly. Its editorial update is dated 30 October; its recorded factual review remains 28 October. Content validation permits that ordering while still requiring a review date and rejecting expired evidence.

The refreshed pages explain the installed product, Elastic-2.0 boundaries, content synchronization and forward recovery. Connection examples send users to their app card in Apps → Integrations. They do not ask an agent to initiate OAuth or configure MCP separately for each client. Security copy distinguishes an agent-resumable Executor pause from human consent. Composio guidance gives established retention facts and preserves the remaining account, region and live-verification limits. The Tailscale guide is scoped to private tailnet deployments. Existing pages now introduce the Environment vault and its secret requests.

## Editorial method

Applied the Organization's `copy-review` skill and its pinned Impeccable Clarify reference, using Lazurio's voice guide. Both languages were authored and reviewed as prose for their readers. This is not an authorship detector. Technical conditions, current-versus-planned status, provider exceptions and publication authority are preserved.

Examples of changes:

- “A packaged installation is a future target” becomes a dated description of the released CLI and Apps, without a stability or SLA promise.
- “Initiate connecting my account” becomes “return its actual app-card link; do not initiate sign-in”.
- “No mechanism blocks a write” becomes the actual per-path Executor behavior and its explicit human-consent limit.
- Generic per-device revocation promises become instructions to check the real account/project boundary.

The review covers introductions, headings, navigation, source lists, image captions where affected, and every branch of the scripted connection lesson. Existing safe canary, filesystem and provider-draft cautions remain. Former regression assertions that required obsolete experimental/target-only packaging claims now protect the released baseline and forward recovery.

## Evidence

The source map pins the released Platform contracts and the approved policy separately from the newer implementation. Provider retention, ZDR and consumer/developer boundaries were fetched again for the audit. New or repinned source URLs were checked for availability. The audit artifacts are kept outside this public repository; no private Knowledgebase material, runtime logs, internal hostnames or secrets are imported.

## Validation and release boundary

Run `bun run check`, `bun run build` and `bun run test:browser` from `app/v2`. Browser coverage verifies the date values on every route, both locales, desktop and mobile, plus existing accessibility, navigation, clipboard and analytics-consent behavior. Results are recorded in the PR after the final run.

The shared Environment browser returned its DevTools-port timeout twice. Visual inspection therefore follows this repository's headless-browser workflow. This local preview is not a production deployment. Required trust-critical review and the exact-head publication decision remain outstanding; GA4 owner readback is still tracked separately in #41. No issue is closed by this PR.

## Coverage

30 authored pages changed. The shared date component applies to all 40 published pages. The remaining pages retain their authored dates.

- `data/v2/docs/cs/data-access-security.md`
- `data/v2/docs/cs/deployment-operations.md`
- `data/v2/docs/cs/environment-app-connections.md`
- `data/v2/docs/cs/faq.md`
- `data/v2/docs/cs/guide/first-steps.mdx`
- `data/v2/docs/cs/guide/index.mdx`
- `data/v2/docs/cs/guide/tailscale.md`
- `data/v2/docs/cs/guide/tool-connections.mdx`
- `data/v2/docs/cs/how-lazurio-works.md`
- `data/v2/docs/cs/index.mdx`
- `data/v2/docs/cs/it-administrators.md`
- `data/v2/docs/cs/lazurio-vs-microsoft-copilot.md`
- `data/v2/docs/cs/public-evidence.md`
- `data/v2/docs/cs/reference.md`
- `data/v2/docs/cs/use-cases.md`
- `data/v2/docs/en/data-access-security.md`
- `data/v2/docs/en/deployment-operations.md`
- `data/v2/docs/en/environment-app-connections.md`
- `data/v2/docs/en/faq.md`
- `data/v2/docs/en/guide/first-steps.mdx`
- `data/v2/docs/en/guide/index.mdx`
- `data/v2/docs/en/guide/tailscale.md`
- `data/v2/docs/en/guide/tool-connections.mdx`
- `data/v2/docs/en/how-lazurio-works.md`
- `data/v2/docs/en/index.mdx`
- `data/v2/docs/en/it-administrators.md`
- `data/v2/docs/en/lazurio-vs-microsoft-copilot.md`
- `data/v2/docs/en/public-evidence.md`
- `data/v2/docs/en/reference.md`
- `data/v2/docs/en/use-cases.md`
