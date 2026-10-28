---
title: "Connecting an Environment to apps"
description: "Choose a connection, approve its permissions and revoke access when needed."
stableId: lazurio-doc-environment-app-connections
locale: en
summary: "Choose a connection, approve its permissions and revoke access when needed."
updatedAt: "2026-10-28"
reviewedAt: "2026-10-28"
reviewOwner: Anna Blazickova
secondReviewOwner: Pablo AI
trustCritical: true
sourceRefs:
  - lazurio-external-apps-current
  - lazurio-platform-release-current
  - lazurio-platform-integrations-current
  - lazurio-platform-chatgpt-apps-policy
  - lazurio-platform-chatgpt-apps-main
  - composio-token-custody
  - composio-retention-current
  - composio-zdr-current
  - composio-consumer-boundaries
  - lazurio-platform-composio-write-gate-question
  - lazurio-platform-composio-custody-question
  - lazurio-platform-composio-shared-connections-question
audience:
  - builder
  - it-admin
  - decision-maker
  - agent
---

Open **Apps → Integrations** to connect email, a calendar or another service.
Choose the app's card, check the account and requested permissions, and complete
sign-in yourself. The agent can find the card and explain what is missing;
it does not create the connection for you.

An **Environment** is where agents work for you. It can run on your computer or
be a hosted Personal, Work or Team Environment. Accounts available there may
be used by its agents within your instructions and actual provider permissions.
Check whose data the account reaches before connecting it.

## The model in one paragraph

Each app has one recorded route: its installed CLI tool, the Environment's
Executor, or permitted Composio. People see the routes and accounts in
Apps → Integrations. Agents read the same catalog with
`lazurio integrations list --json` and use an existing connection in the order
**app tool → Executor → Composio**. An unavailable source is not evidence that
nothing is connected. Ask the agent to state what it could actually verify.

## Which route to choose

Start with the app's catalog card. Lazurio chooses its supported route for the
Environment. For a new route outside the catalog, the integration standard
prefers an official MCP server, official CLI, permitted Composio, a reviewed
pinned open-source implementation, and finally supervised browser use.
Do not treat that order as permission for an agent to initiate sign-in.

A custom MCP server is added only on your explicit instruction, under
**Apps → Integrations → Custom**, into Executor. You enter any key there.
Do not configure a separate server for each AI client or paste credentials into chat.
Other shared brokers, scraping and browser-session servers remain outside
the standard. See [ChatGPT apps](#chatgpt-apps) for the separate policy.

## The tool catalog

**Settings → Tools** installs and signs in command-line tools such as GitHub
CLI (`gh`). It is distinct from Apps → Integrations, which lists the connected
applications. A tool's “Used by agents” switch changes instructions; turning
it off does not revoke an account or disconnect an app. Revoke access through
the connection and, where required, at its provider.

## Connecting a tool

If an app uses a CLI, its card points to the required setup. Follow the tool's
sign-in in Settings → Tools; the supported CLI equivalents are
`lazurio tools install <tool>`, `login <tool>` and `logout <tool>`.
You complete the provider sign-in. Do not send passwords, keys or one-time
codes to an agent. Installing a tool is not proof that its app connection works.

## Connecting apps through Composio

Use Composio only where your Organization, or you in a Personal Environment,
permits it. Open the app card and check that its route is Composio. If the
Composio account needs sign-in, follow the card's setup first; then connect
the app on its card. Agents return the card link rather than running
`composio link` for you.

The Composio organization depends on the Environment. In v0.1.14 a Personal
Environment can select the oldest/default organization with the supported
Composio CLI data. When those data are missing or ambiguous, it retains the
user-choice flow. Work/Team Environments follow their Organization rule;
your own computer retains its choice. Check the account and organization
actually shown instead of assuming each device has separate connections.

### The account of the Environment

Composio connections belong to an account and project, not to a device name.
Public CLI-source research found that two Machines with the same account and
Composio organization share consumer connections. That answer is based on
source and documentation, **not a live isolation test**. Developer-project
connections and the consumer project's connections are separate surfaces.
Use separate provider accounts or the approved project model when access must differ.

### Team Environments

A Team Environment is shared: every authorized Team member and agent there
may use its connected accounts. Connect team accounts that everyone may use;
keep personal mail and calendars in the appropriate individual Environment.
The Team's GitHub route uses the Organization's GitHub App rather than a
member's personal GitHub session.

## Guidance for Organization admins

Record the permitted providers, scopes, account owner, credential custody and
revocation procedure. Organization settings govern whether Composio is allowed;
a local tool switch is not a substitute. Test actual provider access and
revocation. Lazurio's configured route does not prevent a process with broader
OS credentials from using another path.

## Writes and Publication

An account may permit reads, writes and deletion. Those capabilities are not
consent to publish. The agent prepares work; an authorized user explicitly
approves sending, merging or otherwise making it effective. A provider draft
can already transfer data.

Executor can pause calls through its execution path: explicitly destructive
MCP tools, OpenAPI writes, GraphQL mutations and applicable approval policies.
It returns `waiting_for_interaction`. In the default `model` mode, **the agent
itself resumes or declines the call**; no human confirmation is automatically
requested. MCP tools without the relevant annotation may run immediately.
The typed management API and other CLI paths are not covered by this pause.
It is not a universal human-consent gate. Whether Composio filters hold on
every path remains a [separate open question](https://github.com/Lazurio/LazurioPlatform/issues/39).

## What you accept before the first connection

With cloud Composio, a third party holds app credentials and processes call
content. Its current [retention documentation](https://docs.composio.dev/docs/security/data-retention)
says default tool logs can contain arguments and results and remain for up to
one year; staged tool files are deleted after 24 hours. Link expiry does not
itself delete a file.

[Zero Data Retention](https://docs.composio.dev/docs/security/zero-data-retention)
is available on paid plans and included on Enterprise, with feature and
managed-app exceptions. Some legacy Hobby projects retain an existing ZDR
setting; enabling it anew requires a paid plan. Do not assume that your project
has ZDR, or that ZDR means no data is stored anywhere. Read the actual setting
and terms. Region and contractual approval still require evidence for your
chosen deployment.

Issues [#40](https://github.com/Lazurio/LazurioPlatform/issues/40) and
[#45](https://github.com/Lazurio/LazurioPlatform/issues/45) already contain
research; remaining decisions and live-verification gaps do not make all their
questions unanswered. Provider pages here were checked on 28 October 2026.

## ChatGPT apps

The approved policy of 27 October disables ChatGPT account apps, plugins and
connectors by default inside an Environment. The Organization Admin may allow
them for Work/Team; the user decides for Personal. Even when allowed, they fill
only gaps in the Integrations catalog. An existing connector on your own
computer has a separate transition rule; it is not blanket permission inside
an Environment. New ChatGPT or claude.ai connector setup remains excluded.

**Version limit:** the policy's implementation is in Platform main after
v0.1.14, not in that final release. Do not assume an older deployment technically
blocks those tools. The newer implementation also preserves named exceptions
and does not remove tools from already running chats.

<span id="what-is-available-today"></span>

## Release status on 28 October 2026

Platform v0.1.14 is the current final release. Apps → Integrations, the shared
catalog, Executor routing and the agent-resumable pauses above are in its
released contract. ChatGPT-app controls described above are a newer accepted
change. Check your installed version and enabled sources before following a
version-specific instruction.

## Sources

- [Released integration contract, including approvals](https://github.com/Lazurio/LazurioPlatform/blob/v0.1.14/docs/integrations.md)
- [Current final release](https://github.com/Lazurio/LazurioPlatform/releases/tag/v0.1.14)
- [Approved integration standard](https://github.com/HumanAndMachines/Lazurio/blob/b41fc7d01f748ebc4724535ce811ffceded38fdb/manual/external-app-integrations.md)
- [Newer ChatGPT-app implementation](https://github.com/Lazurio/LazurioPlatform/blob/c94cf947a8c7b388f75a12e5f0e3e0f9338426cd/docs/integrations.md#chatgpt-apps-aplikace-z-chatgpt)
- [Composio token custody](https://docs.composio.dev/docs/security/token-custody) and [consumer/developer boundaries](https://docs.composio.dev/kb/guide/consumer-project-boundaries-and-auth-selection)
