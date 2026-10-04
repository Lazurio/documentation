---
title: Connecting an Environment to external apps
description: How an operator connects a Lazurio Environment to email, calendars and other apps, what agents can then do, and which trade-offs come with it.
stableId: lazurio-doc-environment-app-connections
locale: en
summary: The operator decides which apps an Environment reaches. Composio is the recommended route, a sign-in reaches wherever its account reaches, and the curated setup released in v0.1.7 has not yet run against the real services.
updatedAt: "2026-10-04"
reviewedAt: "2026-10-04"
reviewOwner: Matej Suchanek
secondReviewOwner: Pablo AI
trustCritical: true
sourceRefs:
  - lazurio-decision-0162
  - lazurio-external-apps-0162
  - lazurio-platform-tools-decisions
  - lazurio-platform-environment-tools
  - lazurio-platform-decision-f19
  - lazurio-platform-release-v0-1-6
  - lazurio-platform-release-v0-1-7
  - lazurio-platform-tools-screen-review
  - lazurio-platform-curated-login-pull-request
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
[what is released today](#what-is-available-today).

An **Environment** is the place where agents work for you. A **Remote
Environment** is a hosted Environment: your personal Remote Environment, or a
work or Team Remote Environment of an Organization. A **Local Environment** is
the computer you are sitting at. The **Machine** is the computer or virtual machine under an Environment.
The rules on this page apply to both kinds.

## The model in one paragraph

Lazurio is CLI-first. The `lazurio` command and the Launchpad are one product
over one core: they care for the tools of an Environment and tell agents how to
move in it. Codex, Claude Code, `gh`, Composio and other tools are command-line
programs installed and signed in on the Machine. An Environment therefore
mirrors its operator: if you work across several Organizations, your
Environment does too. If you need to separate contexts or access, create
another Environment and sign in other accounts there.

## Three ways to connect an app

You choose the route. The GitHub CLI `gh` is not optional; every Environment
needs it.

| Route | What it is | How you sign in |
| --- | --- | --- |
| **Composio** (recommended) | A hosted service that connects many common apps through one sign-in. Agents use the `composio` command line. Opt-in. | In your browser, the same way as `gh`. No API key is ever copied. |
| **Another supported CLI** | A tested command-line tool from the Launchpad catalog. Opt-in. | In your browser or with a verification code. |
| **An MCP server** | A server that follows the Model Context Protocol and that an agent sets up on your request. | As the server's provider documents it. |

When an app's own provider offers an official CLI or MCP server, the Lazurio
integration standard lists that first for a new connection. Composio is the
simple route for everything else. Decision 0162 of 2026-09-27 made Composio the
one approved broker. New ChatGPT or claude.ai connectors, other shared brokers,
scraping and cookie-session servers remain excluded, and keys or tokens never
go into a chat, Git or a log.

## The tool catalog

The catalog lists the tools that agents can be told to use. Each has a
**tier** and a **setup mode**.

| Tool | Command | Tier | Setup mode |
| --- | --- | --- | --- |
| GitHub CLI | `gh` | Required: always on, cannot be disabled | Launchpad |
| Composio | `composio` | Recommended | Launchpad |
| wacli | `wacli` | Optional | Launchpad |
| gogcli | `gog` | Optional | Agent |
| Neon CLI | `neon` | Optional | Agent |

- **Launchpad setup** has a curated installation and sign-in, both in the
  Launchpad and on the command line. See
  [installing and signing in](#installing-and-signing-in-to-a-tool).
- **Agent setup** gives you a prepared prompt. You copy it into a new agent
  chat; the agent installs the tool and guides your sign-in.

Every catalog entry describes the target state of its installation. That
description is the agent's manual: when a curated installation fails, Lazurio
offers the prepared prompt, and an agent finishes the installation from it.

## Installing and signing in to a tool

For `gh`, `composio` and `wacli`, the card of the tool in the Tools section of
the Launchpad settings shows **Install and sign in** when the tool is missing,
**Sign in** when it is installed but not signed in, and **Sign out** when it is
signed in. The same flow runs on the command line with
`lazurio tools install <tool>`, `lazurio tools login <tool>` and
`lazurio tools logout <tool>`.

The installation is for the current user, without administrator rights, from
the tool's official source. A tool that already works is left as it is. You
never copy an API key, and you can finish the sign-in on any device:

- **`gh`** shows a one-time code and the GitHub device page. Open the page and
  enter the code.
- **`composio`** shows a link. Open it and sign in; then choose the Composio
  organization of this Environment.
- **`wacli`** shows a QR code to scan in WhatsApp, or pairs with your phone
  number instead.

Signing out of `gh` or `composio` forgets the sign-in on this Machine only. If
the access must end at the provider too, revoke it there. Signing out of
`wacli` unlinks the device.

The curated flows run on Linux and macOS. On Windows they are refused and the
prepared agent prompt is offered instead.

## What enabling a tool does

Enabling a tool writes it into the agent instructions of the Lazurio Folder on
that Machine. The **Lazurio Folder** is the directory whose generated
instructions and manual agents read when they start. Agents then use the
enabled catalog tools first and MCP servers second. MCP servers are never
recorded in the Folder; agents discover them in their own harness.

Enabling is context, not permission. It grants no access, installs nothing,
signs in nowhere and pins no version. Disabling removes the tool from the
instructions. It does not sign you out or disconnect any app: to remove access,
disconnect the app in Composio or sign out of the tool.

You can add a short note to an enabled tool, for example "read-only for
customer mail", in the Tools section or with `lazurio tools note`. Agents read
it in the Folder manual. The note is instruction for agents, not a technical
limit. Disabling the tool removes its note.

The Tools section also shows for each tool whether it is installed, whether it
is enabled and whether it is signed in, with the account when the tool reports
one.

## Connecting apps through Composio

The flow below needs v0.1.7 on your Environment. Check
[what is available today](#what-is-available-today) before you rely on it.

1. Decide which Environment you connect and which Composio account and
   Composio organization belong to it.
2. Enable Composio for that Environment in the Tools section, or with
   `lazurio tools enable composio`.
3. Sign in: choose **Install and sign in** or **Sign in** on the Composio card,
   or run `lazurio tools login composio`. Open the link it shows and sign in to
   Composio. No key is shown or copied.
4. Choose the Composio organization of this Environment. The Launchpad offers
   the choice after the sign-in; on the command line, use
   `lazurio tools composio-org` to list the organizations and
   `lazurio tools composio-org switch <id>` to change it.
5. Connect each app with Composio's own `composio link <toolkit>`. Open the
   returned link and sign in directly at the app.
6. Confirm that the intended account and organization are signed in. The
   Composio card shows them, and so does `composio whoami`.
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

### Shared Environments

On an Environment used by several operators, such as a Team's Remote
Environment, the signed-in accounts belong to the whole Environment. Every
operator and every agent there can use them. Lazurio warns when you enable a
tool on such an Environment. Sign in only accounts that everyone there may use.

## Guidance for Organization admins

Lazurio does not enforce or monitor how an operator connects an Environment.
An Organization that wants an overview creates its own Composio organization,
much as it creates a GitHub organization, and asks its operators to sign in to
it. That Composio organization is a separately managed service outside the
Lazurio Dashboard. A central overview of connected accounts is not a Lazurio
goal, because operators may also connect apps by other routes. Managing the
permissions of single Machines from the Dashboard is a later intent for `gh`
and Composio; it is not built.

## Writes and Publication

A connected app is available to agents in full, including writing and
deleting, until you narrow it. A capability to write is not consent to
publish. An agent makes an externally visible write, such as sending an email
or changing a shared calendar, only on the operator's instruction. The
**operator** is the person who controls the Environment and, with it, the
agents that run there.

Today this is a working rule that agents follow. No Lazurio mechanism blocks a
write through a connected app.

## What you accept before the first connection

These are the accepted trade-offs of the model.

- **A third party holds tokens and call content.** With Composio, app tokens
  and the content of calls are held by Composio unless an Organization runs its
  own installation. Composio's
  [token custody documentation](https://docs.composio.dev/docs/security/token-custody),
  read on 2026-09-28, says that Composio has custody of the credentials in its
  default cloud deployment and describes private VPC, self-hosted and
  customer-managed-key deployments as enterprise options. Lazurio has not
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

Status on 2026-09-28, from the public
[LazurioPlatform](https://github.com/Lazurio/LazurioPlatform) repository.

| Capability | Status | Evidence |
| --- | --- | --- |
| `lazurio tools status` and `lazurio tools update <tool>`: report the operator's tools (Codex, Claude Code, `gh`, Git, Node.js, npm, Bun) and run one tool's official updater on request | Released in v0.1.6 (2026-09-26) | [Release v0.1.6](https://github.com/Lazurio/LazurioPlatform/releases/tag/v0.1.6) |
| Catalog with tiers and setup modes; `lazurio tools list`, `enable`, `disable` and `prompt`; enabled tools in the Folder instructions; the warning on shared Environments; `tools status` for Composio, wacli, gog and Neon | Released in v0.1.7 (2026-09-27) | [Decision F18](https://github.com/Lazurio/LazurioPlatform/blob/fde0eb83a990f54a1e7624ce011a3f226233dad2/docs/decisions.md#f18--enabled-tools-of-the-environment), [release v0.1.7](https://github.com/Lazurio/LazurioPlatform/releases/tag/v0.1.7) |
| Tools section in the Launchpad settings: groups, status, enable and disable, prepared agent prompts for copying; the operator's note per tool (`lazurio tools note`); the sign-in state of each tool | Released in v0.1.7 (2026-09-27) | [Tools section](https://github.com/Lazurio/LazurioPlatform/blob/fde0eb83a990f54a1e7624ce011a3f226233dad2/docs/launchpad-development.md#tools-section), [release v0.1.7](https://github.com/Lazurio/LazurioPlatform/releases/tag/v0.1.7) |
| Curated installation and sign-in of `gh`, `composio` and `wacli` on Linux and macOS: `lazurio tools install`, `login` and `logout`, `lazurio tools composio-org`, and the Launchpad buttons Install and sign in, Sign in and Sign out | Released in v0.1.7 (2026-09-27); not yet run against the real services | [Decision F19](https://github.com/Lazurio/LazurioPlatform/blob/fde0eb83a990f54a1e7624ce011a3f226233dad2/docs/decisions.md#f19--curated-installation-and-login-of-catalog-tools), [release v0.1.7](https://github.com/Lazurio/LazurioPlatform/releases/tag/v0.1.7) |
| Handing a prepared prompt directly into an agent chat (today it is shown for copying); the curated flows on Windows; managing per-Machine permissions from the Dashboard | Planned, not built | [Decision F19](https://github.com/Lazurio/LazurioPlatform/blob/fde0eb83a990f54a1e7624ce011a3f226233dad2/docs/decisions.md#f19--curated-installation-and-login-of-catalog-tools), [decision 0162](https://github.com/HumanAndMachines/Lazurio/blob/12497f462fbdc0eece31be88b5bc2e3d155d5171/manual/decision-register.md) |

A release is not yet the state of your Environment. A Remote Environment gets
v0.1.7 when its provider installs that release there; a Local Environment gets
it when its operator updates Lazurio.

The curated installation and sign-in have not yet run against the real
services. According to the
[pull request that added them](https://github.com/Lazurio/LazurioPlatform/pull/54),
they were verified with automated tests and a browser run against stand-in
tools; at release time no real download from a vendor and no real sign-in had
been run. The first real run is planned as a pilot.

Decision 0162 kept Composio in a limited pilot until the Launchpad Tools
section is released. The section is released in v0.1.7, and an Environment has
it once that release is installed there. Until the first pilot run is done,
the real Composio sign-in through Lazurio is unproven. Where v0.1.7 is not
installed yet, agents do not set up Composio on their own and use the other
routes of the
[integration standard](https://github.com/HumanAndMachines/Lazurio/blob/12497f462fbdc0eece31be88b5bc2e3d155d5171/manual/external-app-integrations.md).

Enabled tools and tool notes arrive with v0.1.7. Releases before v0.1.7 cannot
read a Folder that has enabled tools or a note: the Folder operations and the
Launchpad start fail, and nothing is rewritten. Before you roll the product
back below v0.1.7, disable the tools and remove the notes with v0.1.7, or
update forward to v0.1.7 again.

## Sources

- [Lazurio decision 0162](https://github.com/HumanAndMachines/Lazurio/blob/12497f462fbdc0eece31be88b5bc2e3d155d5171/manual/decision-register.md): the model, the routes and the accepted trade-offs.
- [External application integration standard](https://github.com/HumanAndMachines/Lazurio/blob/12497f462fbdc0eece31be88b5bc2e3d155d5171/manual/external-app-integrations.md): the order of routes and what stays excluded.
- [LazurioPlatform decisions F17 and F18](https://github.com/Lazurio/LazurioPlatform/blob/fde0eb83a990f54a1e7624ce011a3f226233dad2/docs/decisions.md#f17--operator-tools-belong-to-the-operator-the-rollout-pins-the-baseline-and-repairs): operator tools, the catalog, the Folder instructions, the operator's note and the sign-in state.
- [LazurioPlatform decision F19](https://github.com/Lazurio/LazurioPlatform/blob/fde0eb83a990f54a1e7624ce011a3f226233dad2/docs/decisions.md#f19--curated-installation-and-login-of-catalog-tools): the curated installation and sign-in, and what it defers.
- [Environment tools](https://github.com/Lazurio/LazurioPlatform/blob/fde0eb83a990f54a1e7624ce011a3f226233dad2/docs/environment-tools.md): the `lazurio tools` commands.
- [Launchpad Tools section](https://github.com/Lazurio/LazurioPlatform/blob/fde0eb83a990f54a1e7624ce011a3f226233dad2/docs/launchpad-development.md#tools-section): what the section shows and its buttons.
- [LazurioPlatform release v0.1.7](https://github.com/Lazurio/LazurioPlatform/releases/tag/v0.1.7) and the [pull request of the curated installation and sign-in](https://github.com/Lazurio/LazurioPlatform/pull/54), including what it did not verify.
- [Composio authentication](https://docs.composio.dev/docs/authentication) and [token custody](https://docs.composio.dev/docs/security/token-custody): Composio's own description of sign-in and credential custody.
