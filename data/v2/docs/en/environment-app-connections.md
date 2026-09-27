---
title: Connecting an Environment to external apps
description: How an operator connects a Lazurio Environment to email, calendars and other apps, what agents can then do, and which trade-offs come with it.
stableId: lazurio-doc-environment-app-connections
locale: en
summary: The operator decides which apps an Environment reaches. Composio is the recommended route, a sign-in reaches wherever its account reaches, and several parts of the setup are not released yet.
updatedAt: "2026-09-28"
reviewedAt: "2026-09-28"
reviewOwner: Matej Suchanek
secondReviewOwner: Pablo AI
trustCritical: true
sourceRefs:
  - lazurio-decision-0162
  - lazurio-external-apps-0162
  - lazurio-platform-tools-decisions
  - lazurio-platform-environment-tools
  - lazurio-platform-release-v0-1-6
  - lazurio-platform-tools-screen-review
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
Environment** is a hosted virtual machine, either a personal VM or an
Organization's work VM. A **Local Environment** is the computer you are sitting
at. The **Machine** is the computer or virtual machine under an Environment.
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

- **Launchpad setup** is meant to get a curated install and sign-in flow in the
  Launchpad.
- **Agent setup** gives you a prepared prompt. An agent installs the tool and
  guides your sign-in.

Every catalog entry describes the target state of its installation. That
description is the agent's manual: when a curated installer fails, an agent is
meant to finish the installation from it.

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

You will be able to add a short note per tool, for example "read-only for
customer mail". Agents read it in the Folder manual. The note is instruction
for agents, not a technical limit, and it is still in review.

## Connecting apps through Composio

This is the intended flow. Check [what is available today](#what-is-available-today)
before you rely on it.

1. Decide which Environment you connect and which Composio account and
   Composio organization belong to it.
2. Enable Composio for that Environment.
3. Sign in with `composio login` and open the returned link in your browser.
4. Connect each app with `composio link <toolkit>`. Open the returned link and
   sign in directly at the app.
5. Confirm with `composio whoami` that the intended account is signed in.
6. If agents should not have all of an app, narrow the connection before you
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
or changing a shared calendar, only on the Principal's instruction. The
**Principal** is the one an agent works for.

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
| Catalog with tiers and setup modes; `lazurio tools list`, `enable`, `disable` and `prompt`; enabled tools in the Folder instructions; the warning on shared Environments; `tools status` for Composio, wacli, gog and Neon | Merged to `main` on 2026-09-27, not in a release yet | [Decision F18](https://github.com/Lazurio/LazurioPlatform/blob/3926999cc186d7388565a0c570748012c8b253bb/docs/decisions.md#f18--enabled-tools-of-the-environment) |
| Tools section in the Launchpad settings: groups, status, enable and disable, prepared agent prompts; the operator's note per tool; the sign-in state of each tool | In review, not merged | [Open pull request](https://github.com/Lazurio/LazurioPlatform/pull/51) |
| Installing and signing in to catalog tools from the Launchpad; handing a prepared prompt directly to an agent chat; managing per-Machine permissions from the Dashboard | Planned, not built | [Decision 0162](https://github.com/HumanAndMachines/Lazurio/blob/12497f462fbdc0eece31be88b5bc2e3d155d5171/manual/decision-register.md) |

Until the Launchpad Tools section is released, Composio is set up only in a
limited pilot. Outside it, agents do not set up Composio on their own and use
the other routes of the
[integration standard](https://github.com/HumanAndMachines/Lazurio/blob/12497f462fbdc0eece31be88b5bc2e3d155d5171/manual/external-app-integrations.md).

When enabled tools reach a release, keep one limit in mind: older releases
cannot read a Folder that has enabled tools. Disable the tools before you roll
the product back below that release.

## Sources

- [Lazurio decision 0162](https://github.com/HumanAndMachines/Lazurio/blob/12497f462fbdc0eece31be88b5bc2e3d155d5171/manual/decision-register.md): the model, the routes and the accepted trade-offs.
- [External application integration standard](https://github.com/HumanAndMachines/Lazurio/blob/12497f462fbdc0eece31be88b5bc2e3d155d5171/manual/external-app-integrations.md): the order of routes and what stays excluded.
- [LazurioPlatform decisions F17 and F18](https://github.com/Lazurio/LazurioPlatform/blob/3926999cc186d7388565a0c570748012c8b253bb/docs/decisions.md#f17--operator-tools-belong-to-the-operator-the-rollout-pins-the-baseline-and-repairs): operator tools, the catalog and the Folder instructions.
- [Environment tools](https://github.com/Lazurio/LazurioPlatform/blob/3926999cc186d7388565a0c570748012c8b253bb/docs/environment-tools.md): the `lazurio tools` commands.
- [Composio authentication](https://docs.composio.dev/docs/authentication) and [token custody](https://docs.composio.dev/docs/security/token-custody): Composio's own description of sign-in and credential custody.
