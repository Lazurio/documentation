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

### Voice

Write in Lazurio's
[default agent voice](https://github.com/Lazurio/LazurioPlatform/blob/main/docs/agent-voice.md),
in English and Czech alike: start from the reader's situation, use plain
language and say what each point changes for their work. The editorial rules
above still apply.

### No terminal in instructions for people

Lazurio is for technically capable people, not for programmers. Instructions
written for customers and users (Guide pages, how-tos, the steps of any page a
person follows, and messages based on them) never ask the reader to open a
terminal, PowerShell or Command Prompt, or to run, paste or edit a command.

- Give clickable steps in the app or in Lazurio, with the exact names of
  buttons and menus. Show each step with a screenshot of the real app or a
  short animation, or link to a page that explains it well.
- Take screenshots legitimately: from a real app on a test device or emulator
  without a signed-in account, or reuse provider images only where their
  licence allows it, otherwise link to them. Screenshots show no accounts,
  personal data, client names or real addresses other than examples. Record
  each image's origin, app version and date in the asset folder's README.
- When a step has no clickable path today, say so as a gap, tell the reader
  who helps them (usually the Admin of their Organization) and record the gap
  in `ISSUES.open.json` with a proposed product fix. Do not offer a command
  as the fallback.
- Commands belong only in material addressed to agents or explicitly to IT
  administrators who operate the system, labelled as such.
- **Recorded exception: Windows joining a tailnet** (decided by Matěj
  Suchánek, 2026-11-05). The Tailscale app for Windows cannot take a custom
  login server in its window (`issue-2026-11-03-003`). Until Lazurio offers a
  clickable way, `guide/tailscale-add-device` gives Windows readers one
  PowerShell line, shown click by click with labelled illustrative mockups,
  and a copyable prompt for the reader's own agent that runs the line and
  tells them where to click. The sign-in and the Admin's approval stay with
  people. No other step of any guide may use a command, and this exception
  ends when the clickable way ships.
- Where no test device exists for a step, a clearly labelled illustrative
  mockup may stand in for a screenshot. Its visible label, its origin and the
  sources it is drawn from are recorded in the asset folder's README, and it
  is replaced by a real screenshot once one can be taken.

Every document requires a stable ID, locale, summary, update date, fact review
date, review owner and source references. Stable IDs remain the same across
localized versions. The update date is the date of the latest change and may be
newer than the fact review date; an editorial change moves only the update
date, and the fact review date moves only when the whole document's facts were
reviewed again.

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
