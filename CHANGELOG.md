# Changelog

## Unreleased

- Re-verify the seventy-two evidence sources due on 2026-12-01 and renew all
  seventy-two until 2026-12-17: 48 still support their pages, 24 after the
  page text was corrected first. Microsoft 365: "Assignment required" is a
  required step, with Microsoft Entra ID P1 or P2 for assigning a group
  (decided by Matěj Suchánek on 2026-11-17); Work IQ has three permissions; an
  administrator's password reset in the admin center also revokes passwordless
  tokens; the status paragraph reports the code exchange without a secret on
  Lazurio's test tenant of 2026-10-22 and what is still open. Provider notes:
  Google's AI-agent client and full list of token ends, Canva's current rate
  limits, direct connections for the organization-side steps, and LinkedIn
  only through its official API through Composio, with agents never automating
  its website (decided by Matěj Suchánek on 2026-11-17). GitHub baseline:
  approvals tied to the reviewed changes, the broker's release 0.16.0 with its
  read and contents ceilings, a person's bot approving the persona's pull
  requests (0169), the `module-*` install values, Design System Read as a
  template rule and no app installations for the Organization Admin; the
  servers page marks 0209 as not yet deployed. Guide: the Czech interface
  names of release v0.1.21 (Aplikace, Automatizace, Napojení, Správce hesel),
  "An Organization Admin prepares it.", the left column's header, removal of a
  module copy when access ends (F72), the default Application Admins of 0231
  as amended on 2026-11-17, the Draft pull request fallback, a note that the
  English interface still shows "Launchpad", and a course that describes
  release v0.1.21. Lazurio sources move to release v0.1.21 or LazurioPlatform
  main; six sources are new. `issue-2026-11-17-002` records the pilot check of
  the code exchange with "Allow public client flows" off. Record:
  `docs/source-review-2026-11-17-due-2026-12-01.md`.
- Re-verify the fourteen evidence sources due by 2026-11-29 and renew all
  fourteen until 2026-12-17. The Wispr privacy note follows the current
  Context Awareness article. Pages that presented pinned 3c5bda5 statements as
  today's state now label them as that revision or cite the current source:
  agents work without a sandbox in an Environment (decision 0172), each
  connected app has one route with Composio as the permitted exception,
  tracked files hold only what the custody standard allows, and the glossary
  says Lazurio instead of Launchpad. The vocabulary source moves to the public
  register in LazurioPlatform. `lazurio-license` is renewed after the owner's
  decision of 2026-11-17 (`issue-2026-11-17-001`, resolved): the home page,
  FAQ, IT briefing and evidence page name Elastic License 2.0 for the released
  Lazurio Platform, with the hosted-service condition of its licensing scope,
  and keep FSL-1.1-Apache-2.0 for the earlier Lazurio root repository. The
  home page, FAQ, IT briefing and deployment page describe the released
  Platform as installed versioned releases (v0.1.21) and limit the
  source-checkout statements to root revision 3c5bda5. Two new sources:
  `lazurio-platform-license` and `lazurio-platform-readme-release`. Record:
  `docs/source-review-2026-11-17.md`.
- Bring the pages on roles, access and entry in line with decisions 0245, 0246
  and 0247 of the decision register (2026-11-14), which consolidate decisions
  0192, 0228 and 0243. An Organization Owner is no longer described as the
  Organization Admin: until the Admin role is deployed, an active Organization
  Owner performs the Admin's administrative acts and gets no access to an
  Environment by them; the Admin as a role held by Lazurio Auth is marked as
  decided for GEN4. The `infra` repository belongs to the Organization
  Owners, the Conglomerate Host is administered by its holder from devices
  approved for it, never through the Organization Admin role and not from a
  Personal Environment, and service entry is described as decided for GEN4:
  opened with a reason and passing a recording entry point. The pages name
  both public entries that still run: the reference Organization's and that
  of Personal Environments, until its removal is deployed. Pages:
  GitHub baseline, Servers and the Conglomerate Host, Architecture, and in the
  Guide the glossary, Ask the Admin, device approval, Tailscale, adding a
  device and the first sign-in, in English and Czech. A new source pins the
  register at the commit that carries the three decisions.
- Add the Guide page "Modules" and the IT page "Architecture" in English and
  Czech, with a new diagram in both languages. Correct the glossary entries
  Module and Marketplace, and link the new pages from lesson 3 of the course and
  from "How Lazurio works".
- A figure can hold a video: the rule in `docs.css`, and the link check and the
  release smoke now see `src` and `poster` of `<video>`. A small worker answers
  byte ranges for `/videos/*`, which Safari needs.
- Add the Guide page "Add a new device to the tailnet" in English and Czech:
  clickable steps for iOS, Android and macOS, own Android screenshots, the
  Organization's login server, the `<login>-<device>` name, waiting for and
  requesting Admin approval, and the Admin's checks. Windows joins with one
  PowerShell line, shown click by click with labelled illustrative mockups,
  or through a copyable prompt for the reader's own agent.
- Add the rule that instructions for people never use a terminal or command
  line (`AGENTS.md`), with one recorded exception for Windows joining a
  tailnet, and allow labelled illustrative mockups where no test device
  exists.
- Add Guide pages in both locales on where an Environment takes its AI from,
  pairing a phone and connecting a computer, device approval and how to ask
  the Organization Admin, and describe the Admin in the GitHub baseline by
  decision 0228.
- Add credential-isolated Cloudflare Pages previews for same-repository pull
  requests and automatic production deployment with immutable and canonical
  smoke checks after protected `main` updates.
- Establish the public Lazurio Documentation repository and Cloudflare Pages
  site.
- Add the English IT trust briefing, system guide and Microsoft Copilot
  comparison.
- Add agent discovery through `llms.txt` and a versioned content index.
- Represent the repository in Lazurio as a read-only productionspace system,
  without Workspace runtime authority or a port lease.
- Add a manually curated Czech locale with native route-preserving language
  switching and parity checks against the English source.
- Make Agent search and stable-ID retrieval locale-aware while keeping English
  as the deterministic default.
- Update "Connecting an Environment to apps" in English and Czech to today's
  product: one path per Integration, the current tool catalog, the Composio
  organization of an Environment, the user instead of the operator, Composio's
  retention and the release status. Qualify the tailnet sentence of the Tailscale
  guide with public DNS mode, and correct the sentence on installed connectors.
