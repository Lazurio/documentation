# Changelog

## Unreleased

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
