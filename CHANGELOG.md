# Changelog

## Unreleased

- Correct the state of public entry without a tailnet: it runs nowhere today.
  Lazurio's reference Organization has been back in its tailnet since
  2026-11-14, its public Environment for trying Lazurio ended on 2026-11-12,
  and the public entry of Personal Environments ended on 2026-11-12.
  Architecture and the Tailscale guide now say so; Phone and computer, Device
  approval and Ask the Organization Admin no longer describe the reference
  Organization's public entry or a public Environment as an exception. No
  decision changes, and `data/v2/source-map.json` keeps its titles pinned to
  2026-11-17. The same correction in the agent manual:
  LazurioPlatform#1271.
- Re-verify the five evidence sources due on 2026-12-12 and 2026-12-14
  against LazurioPlatform main and release v0.1.22 of 2026-11-17: `wispr-flow`
  and `codexbar` still support the recommended applications and are renewed
  until 2026-12-17; `amphetamine` is renewed after the page text was corrected
  first (a MacBook stays awake with the lid closed without a power condition,
  and on Apple Silicon Amphetamine offers Power Protect as a separate
  download); `lazurio-decision-0243` is removed, because no page cites it and
  on main the decision is superseded by 0245 to 0247;
  `lazurio-decision-register-access-0245-0247` is re-pinned to LazurioPlatform
  main `0eb2e3a` and renewed on 2026-11-18 until 2026-12-18 after the owner's
  answer of 2026-11-18 (`issue-2026-11-17-005`, resolved): people sign in to
  Organization tailnets with their Lazurio account today, so the add-device
  and device-approval guides stay as they are, and the sentence in decision
  0246 "What runs today" that no tailnet uses that sign-in yet is out of date
  (LazurioPlatform#1086). Record:
  `docs/source-review-2026-11-17-due-2026-12-14.md`.
- Re-verify the seventy-four evidence sources due from 2026-12-02 to
  2026-12-08 against LazurioPlatform release v0.1.22 of 2026-11-17 and
  LazurioPlatform main of the same day: 48 still support their pages and 26
  after the page text was corrected first, two of them after decisions by
  Matěj Suchánek on 2026-11-17; all are renewed until 2026-12-17 or replaced.
  Owner's decisions: on Windows and Mac the person's agent names the computer
  `<login>-<device>` with `--hostname` before approval, as Lazurio's agent
  manual says, while phones keep the system's name for now
  (`issue-2026-11-17-003`, resolved); the GEN3 five-step order for new
  connections and its GEN3 source are removed from every page, which now
  describe only LazurioPlatform's one path per Integration connected by the
  user, and the Composio prompt no longer asks an agent in Lazurio to start a
  connection (`issue-2026-11-17-004`, resolved). Guide:
  an Organization Member sees New module muted with a lock and asks the
  Organization Admin through its dialog, every New module opens a dialog before
  Chat, v0.1.21 is named as released on 2026-11-13, the Marketplace lists the
  registry's templates as examples, Ask the Organization Admin lists a new
  module and says that the skill `admin-request` ships since v0.1.21, lesson 4
  marks the Admin appointed by an Owner as decided for GEN4, the GEN4 record of
  a device approval follows decision 0245 as amended on 2026-11-17, iOS 16, the
  renamed Tailscale page on custom coordination servers, and the Windows tray
  menu without a Connect item. Connecting apps: Composio's two price lists,
  Allow CI changes, Composio's sign-in waiting for the Organization, the
  Personal Environment's Composio organization chosen by Lazurio, ChatGPT apps
  allowed in the Organization's manifest today, and a release table checked
  against v0.1.22. Architecture: a module copy deleted when access ended (F72)
  and production data apart under 0209 and 0239. Copilot comparison: three
  ways for the Basic tiers to reach organizational content, the moved plugin
  overview, and the FAQ's positioning labelled as our assessment. Servers: no
  claim rests on the superseded decision 0155. Czech: Aplikace, Automatizace,
  Napojení and Správce hesel on the remaining pages and in the Czech
  architecture diagrams, "Zapněte Tailscale", and Vlastník Organizace on the
  servers page. Eight sources continue under ids without a release number,
  two are removed (a duplicate and `lazurio-external-apps-current`) and three
  sources are new. Record:
  `docs/source-review-2026-11-17-due-2026-12-08.md`.
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
