# Lazurio documentation — agent rules

This is the public documentation repository for Lazurio.

## Authority

- Authoritative public copy lives in `data/v2/docs`.
- `data/v2/source-map.json` owns evidence pointers and freshness metadata.
- Runtime behavior is not redefined here. Link to the exact public Lazurio
  source or provider documentation that owns the contract.
- Generated files are read models. Never edit them as an authoring shortcut.

## Public-safety boundary

- Do not import Organization Knowledgebase content, client names or data,
  Personalspace content, secrets, private incident details, credentials,
  internal hostnames, IP addresses or local machine paths.
- Do not claim certifications, regulatory compliance, absolute security,
  pricing, SLA or deployment properties without current public evidence and a
  named review owner.
- Separate current implementation from target architecture.
- Microsoft product facts must use current primary Microsoft Learn sources.
  Clearly label Lazurio positioning or recommendations as our assessment.

## Content contract

### Editorial style

- Write for the reader's task: lead with the answer or next action, then explain.
- Use direct sentences and concrete subjects. Cut stock introductions, repeated
  conclusions and abstract phrases that do not tell the reader anything new.
- Explain necessary technical terms on first use. Preserve exact identifiers,
  commands, access restrictions, source links and distinctions between a rule
  and a technically enforced control.
- In Czech, use lowercase reader pronouns. Use “agent” for a task session;
  reserve “AI Kolega” and “Buddy” for those specific roles.
- Match the meaning and level of detail across English and curated Czech.
  Keep illustrative responses labeled and never present a prompt as proof of access.
- Date product-status claims against their evidence. An editorial revision is
  not a new provider verification, security audit or publication approval.

Every document requires a stable ID, locale, summary, update date, fact review
date, review owner and source references. Stable IDs remain the same across
localized versions.

English is the first accepted locale. Do not publish generated Czech copy.
Add Czech only as a curated document with the same stable ID and evidence map.

Pablo AI is the second reviewer of security-critical statements. Production
deployment requires his exact-head approval, green checks and the explicit
publication instruction to merge the current reviewed pull request. The merge
to protected `main` then triggers the production deployment automatically.

## Verification

From `app/v2` run:

```sh
bun run check
bun run build
bun run test:browser
```

Use the local Astro application for browser checks and the deployed Cloudflare
Pages site for the final production smoke.

Before a production release that loads GA4, independently verify the current
state of the GA4 web data stream: Enhanced Measurement "Page changes based on
browser history events" must be disabled. `send_page_view: false` in code is
not sufficient evidence; the release needs a readback from the property owner
for the exact measurement ID. This repository is a read-only
productionspace system in Launchpad, not a runnable Workspace module. Record
new repository-specific uncertainties in `ISSUES.open.json`; broader roadmap
state belongs in the owning Organization's private Mission Control.
