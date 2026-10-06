---
title: Connecting an Environment to external apps
description: How an operator connects a Lazurio Environment to email, calendars and other apps, what agents can then do, and which trade-offs come with it.
stableId: lazurio-doc-environment-app-connections
locale: en
summary: The operator decides which apps an Environment reaches. Composio is part of Lazurio wherever the operator turns it on in Settings, a sign-in reaches wherever its account reaches, and a capability to write is not consent to publish.
updatedAt: "2026-10-06"
reviewedAt: "2026-10-06"
reviewOwner: Matej Suchanek
secondReviewOwner: Pablo AI
trustCritical: true
sourceRefs:
  - lazurio-decision-0162
  - lazurio-external-apps-0162
  - lazurio-composio-runbook
  - lazurio-platform-tools-decisions
  - lazurio-platform-environment-tools
  - lazurio-platform-decision-f19
  - lazurio-platform-release-v0-1-7
  - lazurio-platform-release-v0-1-8-rc-35
  - lazurio-platform-tools-screen-review
  - lazurio-platform-composio-write-gate-question
  - lazurio-platform-composio-custody-question
  - lazurio-platform-composio-shared-connections-question
  - composio-authentication
  - composio-token-custody
audience:
  - builder
  - it-admin
  - decision-maker
  - agent
---

You decide which external apps your Environment reaches. Agents in that
Environment act wherever the sign-ins on its Machine reach. Nothing is enforced
centrally. Before you connect the first app, read
[what you accept](#what-you-accept-before-the-first-connection) and check
[what is available today](#what-is-available-today).

An **Environment** is the place where agents work for you. A **Remote
Environment** is a hosted Environment: your personal Remote Environment, or a
work or Team Remote Environment of an Organization. A **Local Environment** is
the computer you are sitting at. The **Machine** is the computer or virtual
machine under an Environment. The **operator** is the person who controls the
Environment and, with it, the agents that run there. The rules on this page
apply to every kind of Environment.

## The model in one paragraph

Lazurio is CLI-first. The `lazurio` command and the Launchpad are one product
over one core: they care for the tools of an Environment and tell agents how to
move in it. Codex, Claude Code, `gh`, Composio and other tools are command-line
programs installed and signed in on the Machine. An Environment therefore
mirrors its operator: if you work across several Organizations, your
Environment does too. Agents work there with full access: whatever the
Environment allows, they may do, without a sandbox or approval of single
commands. If you need narrower rights or separate contexts, create another
Environment and sign in other accounts there.

## Which route to choose

You choose the route and have the last word. The GitHub CLI `gh` is not
optional; every Environment needs it.

For a new connection, the Lazurio integration standard proposes this order;
the first route that works wins:

1. the provider's **official MCP server**, remote or self-hosted;
2. the provider's **official CLI**;
3. **Composio**, the one approved broker, when the provider has no suitable
   official MCP server or CLI and you have turned Composio on for the
   Environment;
4. a **reviewed open-source MCP server or CLI**, pinned to an exact release or
   commit, with a verified publisher and licence;
5. **the browser**, under your supervision, when none of the above exists.

Never allowed, at any step: servers that scrape a website or reuse browser
cookie sessions, shared brokers other than Composio, keys or tokens in a chat,
Git or a log, and new ChatGPT or claude.ai connectors. A connector that is
already installed may still be used.

While they work, agents use the catalog tools turned on for the Environment
first, as the Folder instructions tell them, and MCP servers second.

## The tool catalog

The catalog lists the tools that agents can be told to use. Each has a
**tier** and a **setup mode**.

| Tool | Command | Tier | Setup mode |
| --- | --- | --- | --- |
| GitHub CLI | `gh` | Required: always on, cannot be turned off | Launchpad |
| Composio | `composio` | Recommended | Launchpad |
| wacli | `wacli` | Optional | Launchpad |
| gogcli | `gog` | Optional | Agent |
| Neon CLI | `neon` | Optional | Agent |

- **Launchpad setup** has a curated installation and sign-in, both in the
  Launchpad and on the command line. See
  [connecting a tool](#connecting-a-tool).
- **Agent setup** gives you a prepared prompt. You copy it into a new agent
  chat; the agent installs the tool and guides your sign-in.

Every catalog entry describes the target state of its installation. That
description is the agent's manual: when a curated installation fails, Lazurio
offers the prepared prompt, and an agent finishes the installation from it.

## Connecting a tool

Open **Settings → Tools** in the Launchpad. Each tool has a row with its real
name, one sentence on what it is for and its state: **Connected as** an
account, or **Not connected**. The row offers one action:

- **Add and connect** when the tool is not installed yet;
- **Connect** when it is installed but not signed in;
- **Disconnect** when it is signed in;
- **Connect with an agent** for a tool an agent sets up.

The same flow runs on the command line with `lazurio tools install <tool>`,
`lazurio tools login <tool>` and `lazurio tools logout <tool>`.

The installation is for the current user, without administrator rights, from
the tool's official source. A tool that already works is left as it is. You
never copy an API key, and you can finish the sign-in on any device:

- **`gh`** shows a one-time code and the GitHub device page. Open the page and
  enter the code. Lazurio then links the Machine's SSH key to your account.
- **`composio`** shows a link. Open it and sign in; then choose the Composio
  organization of this Environment.
- **`wacli`** shows a QR code to scan in WhatsApp, or pairs with your phone
  number instead.

Disconnecting `gh` or `composio` forgets the sign-in on this Machine only. If
the access must end at the provider too, revoke it there. Disconnecting
`wacli` unlinks the device. Every sign-in on a Machine can be ended on its
own.

The curated flows run on Linux and macOS. On Windows they are refused and the
prepared agent prompt is offered instead.

## What "Used by agents" does

Each row has a switch, **Used by agents**. A tool you connect in the Launchpad
turns it on, so agents can use the tool right away; you can turn it off again.
On the command line the switch is `lazurio tools enable` and
`lazurio tools disable`.

A tool that is used by agents is written into the agent instructions of the
Lazurio Folder on that Machine. The **Lazurio Folder** is the directory whose
generated instructions and manual agents read when they start. MCP servers are
never recorded in the Folder; agents discover them in their own harness.

The switch is context, not permission. It grants no access, installs nothing,
signs in nowhere and pins no version. Turning it off removes the tool from the
instructions. It does not sign you out or disconnect any app: to remove access,
disconnect the app in Composio or disconnect the tool.

You can add a short note to a tool that agents use, for example "read-only
for customer mail", under the tool's details or with `lazurio tools note`.
Agents read it in the Folder manual. The note is instruction for agents, not a
technical limit. Turning the tool off removes its note.

## Connecting apps through Composio

Composio is part of Lazurio on every Environment where its operator turns it
on. Where it is off, agents do not set it up on their own: they offer to turn
it on, or they use the other routes.

1. Decide which Environment you connect and which Composio account and
   Composio organization belong to it.
2. In **Settings → Tools**, choose **Add and connect** or **Connect** on the
   Composio row, or run `lazurio tools login composio`. Open the link it shows
   and sign in to Composio. No key is shown or copied.
3. Choose the Composio organization of this Environment. The Launchpad offers
   the choice after the sign-in; on the command line, use
   `lazurio tools composio-org` to list the organizations and
   `lazurio tools composio-org switch <id>` to change it.
4. Check that **Used by agents** is on for Composio.
5. Connect each app. Ask an agent, who returns a link, or run Composio's own
   `composio link <toolkit>`. Open the link and sign in directly at the app.
6. Confirm that the intended account and organization are signed in. The
   Composio row shows them, and so does `composio whoami`.
7. If agents should not have all of an app, narrow the connection before you
   hand them work.

### The account of the Environment

With Composio, connected apps belong to the Composio account and its
Composio organization, not to the Machine. Two Machines signed in with the same
account and organization are expected to see the same connections. Composio's
documentation points to this; Lazurio has not yet confirmed it by a test (see
the [open question](https://github.com/Lazurio/LazurioPlatform/issues/45)).
Treat the sign-in as the account of the Environment. If a Machine should reach
less, sign in another account or another Composio organization there.

### Team Environments

A Team Remote Environment is shared by the members of a Team, so the accounts
signed in there belong to the whole Environment. Every Team member and every
agent there can use them.

- **GitHub.** A Team Environment works in GitHub through the Organization's
  GitHub App, Lazurio for GitHub. Personal GitHub accounts are not signed in
  there.
- **Other apps.** Sign in only team accounts, such as a shared mailbox or
  calendar, that everyone in the Team may use. Connect personal accounts in
  your own Environment. The Launchpad warns about this before a sign-in, and
  an agent asks which team account to connect before it connects an app.

## Guidance for Organization admins

Lazurio does not enforce or monitor how an operator connects an Environment.

- **An overview of Composio.** An Organization that wants one creates its own
  Composio organization, much as it creates a GitHub organization, and asks
  its operators to sign in to it. That Composio organization is a separately
  managed service outside the Lazurio Dashboard. A central overview of
  connected accounts is not a Lazurio goal, because operators may also connect
  apps by other routes.
- **Integrations the whole Organization shares** go into the Organization's
  tracked integration catalog, through a reviewed pull request. The catalog
  holds commands, addresses and the names of environment variables, never
  their values. It is a recommendation and a shared definition, not a gate:
  a tool an operator uses only on their own Environment is not written there.
- **Permissions of single Machines.** Managing them from the Dashboard is a
  later intent for `gh` and Composio; it is not built.

## Writes and Publication

A connected app is available to agents in full, including writing and
deleting, until you narrow it. A capability to write is not consent to
publish. An agent makes an externally visible write, such as sending an email
or changing a shared calendar, only on the operator's instruction. Full access
inside the Environment does not change this.

Today this is a working rule that agents follow. No Lazurio mechanism blocks a
write through a connected app; whether Composio's own filters hold on every
path is an [open question](https://github.com/Lazurio/LazurioPlatform/issues/39).

## What you accept before the first connection

These are the accepted trade-offs of the model.

- **A third party holds tokens and call content.** With Composio, app tokens
  and the content of calls are held by Composio unless an Organization runs its
  own installation. Composio's
  [token custody documentation](https://docs.composio.dev/docs/security/token-custody),
  read on 2026-10-06, says that Composio has custody of the credentials in its
  default cloud deployment. It describes private VPC, self-hosted and
  customer-managed-key deployments as alternatives, and says that with your own
  OAuth app Composio still stores the connected-account tokens. Lazurio has not
  verified these options, their terms or their price. Log retention, hosting
  region and data processing terms are
  [open questions](https://github.com/Lazurio/LazurioPlatform/issues/40) that
  Lazurio has not answered.
- **A sign-in reaches wherever its account reaches.** Agents can use
  everything the signed-in account can use, not only what the current task
  needs.
- **Several Organizations on one Machine are one Environment.** Agents choose
  the tool of the Organization they work for and do not move data between
  Organizations. That is a working rule, not a technical boundary. Where a
  boundary must hold, use separate Environments.
- **An Organization has no enforced overview.** It sees only what its own
  Composio organization shows, and only if its operators sign in to it.

## What is available today

Status on 2026-10-06, from the public
[LazurioPlatform](https://github.com/Lazurio/LazurioPlatform) repository. The
latest final release is v0.1.7; v0.1.8 is in release candidates.

| Capability | Status | Evidence |
| --- | --- | --- |
| Catalog with tiers and setup modes; `lazurio tools list`, `enable`, `disable`, `note` and `prompt`; tools in the Folder instructions; the Tools section with status, the switch, the note and prepared agent prompts for copying | Released in v0.1.7 (2026-09-27) | [Decision F18](https://github.com/Lazurio/LazurioPlatform/blob/1a4a99b2c586359e80e1663a3d66ee3d61730f2f/docs/decisions.md#f18--enabled-tools-of-the-environment), [release v0.1.7](https://github.com/Lazurio/LazurioPlatform/releases/tag/v0.1.7) |
| Curated installation and sign-in of `gh`, `composio` and `wacli` on Linux and macOS: `lazurio tools install`, `login`, `logout` and `composio-org` | Released in v0.1.7 (2026-09-27); in use on Remote Environments | [Decision F19](https://github.com/Lazurio/LazurioPlatform/blob/1a4a99b2c586359e80e1663a3d66ee3d61730f2f/docs/decisions.md#f19--curated-installation-and-login-of-catalog-tools), [environment tools](https://github.com/Lazurio/LazurioPlatform/blob/1a4a99b2c586359e80e1663a3d66ee3d61730f2f/docs/environment-tools.md#curated-installation-and-login-decision-f19) |
| **Settings → Tools** with Connect and Disconnect, a sign-in that turns **Used by agents** on, `gh` linking the Machine's SSH key, `gh` on a Team Environment through Lazurio for GitHub, the team-accounts notice on a Team Environment | In v0.1.8 release candidates (v0.1.8-rc.35, 2026-10-06); final v0.1.8 not yet released | [Tools section](https://github.com/Lazurio/LazurioPlatform/blob/1a4a99b2c586359e80e1663a3d66ee3d61730f2f/docs/launchpad-development.md#tools-section), [gh on a Team Environment](https://github.com/Lazurio/LazurioPlatform/blob/1a4a99b2c586359e80e1663a3d66ee3d61730f2f/docs/environment-tools.md#gh-on-a-team-environment), [v0.1.8-rc.35](https://github.com/Lazurio/LazurioPlatform/releases/tag/v0.1.8-rc.35) |
| Handing a tool's prepared prompt directly into an agent chat (today it is shown for copying); the curated flows on Windows; managing per-Machine permissions from the Dashboard | Planned, not built | [Decision F19](https://github.com/Lazurio/LazurioPlatform/blob/1a4a99b2c586359e80e1663a3d66ee3d61730f2f/docs/decisions.md#f19--curated-installation-and-login-of-catalog-tools), [decision 0162](https://github.com/HumanAndMachines/Lazurio/blob/3b95c80048b234c267031495be54927aa3d5cc43/manual/decision-register.md) |

A release is not yet the state of your Environment. A release candidate
reaches only the Environments that ask for its exact version; a Local
Environment updated with `lazurio update` gets the latest final release. The
labels above are those of v0.1.8; v0.1.7 names the same actions **Install and
sign in**, **Sign in** and **Sign out**, and does not turn the switch on by
itself.

The Composio pilot that decision 0162 set until the Tools section was
released ended on 2026-10-02. Composio is now an active part of Lazurio on
every Environment where its operator turns it on; where it is off, the other
routes of the
[integration standard](https://github.com/HumanAndMachines/Lazurio/blob/3b95c80048b234c267031495be54927aa3d5cc43/manual/external-app-integrations.md)
apply.

## Sources

- [Lazurio decision register](https://github.com/HumanAndMachines/Lazurio/blob/3b95c80048b234c267031495be54927aa3d5cc43/manual/decision-register.md): decision 0162 with its addendum of 2026-10-02 (the model, the routes, the trade-offs and the end of the pilot), 0170 (Environment), 0172 (full access inside the Environment) and 0175 (the operator).
- [External application integration standard](https://github.com/HumanAndMachines/Lazurio/blob/3b95c80048b234c267031495be54927aa3d5cc43/manual/external-app-integrations.md): the order of routes, what stays excluded and the Organization's integration catalog.
- [Composio runbook](https://github.com/HumanAndMachines/Lazurio/blob/3b95c80048b234c267031495be54927aa3d5cc43/manual/integrations/composio.md): what an agent may do with Composio.
- [LazurioPlatform decisions F17, F18 and F19](https://github.com/Lazurio/LazurioPlatform/blob/1a4a99b2c586359e80e1663a3d66ee3d61730f2f/docs/decisions.md#f18--enabled-tools-of-the-environment), with their addenda: operator tools, the catalog, the Folder instructions, the note, the curated sign-in, `gh` on a Team Environment and team accounts on a Team Environment.
- [Environment tools](https://github.com/Lazurio/LazurioPlatform/blob/1a4a99b2c586359e80e1663a3d66ee3d61730f2f/docs/environment-tools.md): the `lazurio tools` commands.
- [Launchpad Tools section](https://github.com/Lazurio/LazurioPlatform/blob/1a4a99b2c586359e80e1663a3d66ee3d61730f2f/docs/launchpad-development.md#tools-section): what the section shows and its actions.
- LazurioPlatform [release v0.1.7](https://github.com/Lazurio/LazurioPlatform/releases/tag/v0.1.7) and [release candidate v0.1.8-rc.35](https://github.com/Lazurio/LazurioPlatform/releases/tag/v0.1.8-rc.35).
- [Composio authentication](https://docs.composio.dev/docs/authentication) and [token custody](https://docs.composio.dev/docs/security/token-custody): Composio's own description of sign-in and credential custody.
