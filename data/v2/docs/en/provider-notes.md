---
title: "Verified provider notes"
description: "Provider behaviour Lazurio met while connecting apps that holds for any Organization: admin steps, token lifetimes, limits and required roles."
stableId: lazurio-doc-provider-notes
locale: en
summary: "Dated notes on Google Workspace, Slack, Atlassian, Canva, LinkedIn, GitHub and Composio, each checked against the provider's own documentation."
updatedAt: "2026-11-08"
reviewedAt: "2026-11-08"
reviewOwner: Matej Suchanek
secondReviewOwner: Pablo AI
trustCritical: true
sourceRefs:
  - lazurio-external-apps-org-steps
  - lazurio-provider-runbooks
  - lazurio-github-app-broker
  - lazurio-github-app-public-issues
  - composio-create-organization-request
  - google-oauth-audience
  - google-oauth2-refresh-token-expiration
  - google-workspace-mcp-servers
  - slack-mcp-server
  - atlassian-mcp-get-started
  - atlassian-mcp-settings
  - canva-mcp-access
  - canva-mcp-tools
  - linkedin-api-access
  - linkedin-authorization-code-flow
  - linkedin-share-api
  - linkedin-user-agreement
audience:
  - it-admin
  - builder
  - agent
---

These notes record provider behaviour that Lazurio met while connecting
applications and that holds for any Organization. Each note says when Lazurio
recorded it and links the provider's page where it was checked again on
1 November 2026. Providers change their products, so check the linked page
before you rely on a note. Microsoft 365 has its own page,
[Microsoft 365 for IT and the Organization Admin](/en/microsoft-365/), and the general rules
for choosing a connection are in
[connecting an Environment to apps](/en/environment-app-connections/).

## What an administrator does first

Some providers need a one-time step on the Organization's side before any
Environment can connect.

| Provider | First step on the provider's side |
| --- | --- |
| Google Workspace | Your own Google Cloud project with the APIs enabled, an OAuth consent screen and your own OAuth client. |
| Slack | A workspace admin approves the MCP client app through Slack's app approval. |
| Atlassian | An org admin decides which domains may connect over OAuth 2.1 and whether API tokens are allowed. |
| LinkedIn | A LinkedIn developer app with the Share on LinkedIn product. |
| Microsoft 365 | One app in your Entra tenant and one admin consent; see [the Microsoft 365 page](/en/microsoft-365/). |

## Google Workspace

Lazurio recorded these on 7 August 2026; the seven-day expiry is the problem
its runbook names as the most frequent one.

- **Seven-day sign-ins.** In a Google Cloud project whose OAuth consent screen
  has the user type External and the publishing status Testing, a test user's
  authorization expires seven days after consent, refresh token included. The
  only exception is an app that asks for nothing beyond name, email address and
  profile, so Gmail, Drive and other Workspace scopes are affected. For an
  integration used only by your own accounts, use a project in your Google
  Cloud organization with the Internal user type, or publish the app as In
  production, which can require Google's verification.
- **Other ends of a refresh token.** Google lists these: the user revoked
  access, the token was not used for six months, the user changed their
  password and the token has Gmail scopes, the account exceeded the limit of
  100 live refresh tokens per OAuth client, which silently invalidates the
  oldest one, and an admin set a requested service to Restricted. Each
  Environment's sign-in is its own grant, so many sign-ins of one account
  through the same client count toward that limit.
- **Official MCP servers.** Google's Workspace MCP servers for Gmail, Drive,
  Docs, Sheets, Slides, Calendar, Chat and Classroom are a Developer Preview.
  They need the APIs and MCP services enabled in your own Google Cloud
  project, an OAuth consent screen and your own OAuth client ID and secret.
  Google Meet is not among them.

## Slack

Lazurio recorded these on 2 September 2026: the official endpoint with an
interactive sign-in alone, without a Slack app's client ID and secret, is not
enough.

- The official MCP server is `https://mcp.slack.com/mcp` over Streamable HTTP.
  Slack supports neither SSE nor dynamic client registration.
- An MCP client must be backed by a registered Slack app, published in the
  Slack Marketplace or internal to your workspace; unlisted apps may not use
  MCP. The OAuth flow is confidential: the client uses the app's client ID and
  client secret, so the secret needs a vault, never Git.
- Workspace admins approve and manage MCP client apps through Slack's standard
  app approval.
- Rate limits apply per tool, the same as for the matching Web API methods,
  and an app's IP allowlist applies to its MCP requests too.

## Atlassian: Jira and Confluence

Lazurio recorded these on 2 September 2026. On 1 November 2026 Atlassian
documented a different endpoint than Lazurio's runbook.

- Atlassian's guide now gives `https://mcp.atlassian.com/v2/mcp`. Take the
  address from Atlassian's current guide, not from an older note.
- Sign-in uses OAuth 2.1 by default, and actions respect the user's existing
  Atlassian permissions. API-token authentication is optional; an org admin
  turns it on or off in Atlassian Administration → Connectors → Atlassian MCP
  server.
- The admin's allowed domains apply only to tools that use OAuth 2.1. Tools
  with API tokens are limited by IP allowlists and by the token's scopes, and
  IP allowlists apply to every request through the MCP server.
- Some tool calls, such as unified search and Teamwork Graph context, consume
  Rovo credits.

## Canva

Lazurio recorded its Canva setup on 2 September 2026.

- Each user authenticates individually, and the operations available match
  that user's own access in Canva.
- Canva limits every tool separately, from 20 to 100 requests per minute.
- Resizing designs, autofill, brand kits and brand templates need Canva Pro or
  above.
- The tools include creating and publishing brand templates. In Lazurio,
  publishing a brand template is a Publication and needs the user's
  instruction.

## LinkedIn

Lazurio recorded these on 24 July 2026.

- Only the open permissions are available to every developer without
  approval: Sign in with LinkedIn using OpenID Connect, and `w_member_social`
  from the Share on LinkedIn product. Most other permissions and partner
  programs need LinkedIn's explicit approval.
- Access tokens live 60 days, and programmatic refresh tokens are available
  only to a limited set of partners. A posting integration therefore needs a
  new sign-in at least every 60 days.
- The Share API allows 150 requests per member and 100,000 per application
  per UTC day.
- LinkedIn's User Agreement forbids scraping and bots or other unauthorized
  automated methods. Lazurio therefore allows only posting through the
  official API, and agents read LinkedIn only in a browser under the user's
  supervision.

## GitHub

Lazurio recorded this on 17 October 2026 while building the broker of the
Lazurio for GitHub app, with the evidence in
[issue 23 of its public repository](https://github.com/Lazurio/github-app/issues/23).

- For an installation that accepted the Issues permission, every installation
  token Lazurio tested could open an issue in a public repository, whatever
  permissions the token asked for and whatever repository it was limited to,
  including a public repository of an unrelated owner. GitHub named
  `issues=write` as the accepted permission but did not enforce it.
  Commenting was refused for every such token, and editing, closing and
  reopening were refused for a read-only token. An installation without the
  Issues permission was not tested. A read-only token therefore does not stop
  someone with access to it from opening issues in public repositories.

## Composio

Lazurio recorded this on 17 October 2026.

- Composio's CLI has no command that creates an organization. Create the
  Composio organization named after your Lazurio Organization in Composio's
  dashboard. Lazurio asked Composio for that command in
  [issue 4949](https://github.com/ComposioHQ/composio/issues/4949), still open
  on 1 November 2026.

## Sources

- Lazurio: the [external application standard](https://github.com/HumanAndMachines/Lazurio/blob/66e437f7e563574ea35b79dd1bdd193fd0f6b4b6/manual/external-app-integrations.md) and the [provider runbooks](https://github.com/HumanAndMachines/Lazurio/tree/66e437f7e563574ea35b79dd1bdd193fd0f6b4b6/manual/integrations) (in Czech), and the [Lazurio for GitHub broker](https://github.com/Lazurio/github-app/blob/751eef11a285dea625c1d3fd4e286e396c5ab1d9/README.md#opening-issues-in-public-repositories).
- Google: [OAuth audience and publishing status](https://support.google.com/cloud/answer/15549945), [refresh token expiration](https://developers.google.com/identity/protocols/oauth2#expiration), [Workspace MCP servers](https://developers.google.com/workspace/guides/configure-mcp-servers).
- Slack: [Slack MCP server](https://docs.slack.dev/ai/slack-mcp-server/).
- Atlassian: [getting started with the Atlassian MCP server](https://support.atlassian.com/atlassian-ai-gateway/docs/get-started-with-the-atlassian-remote-mcp-server/) and [admin settings](https://support.atlassian.com/security-and-access-policies/docs/control-atlassian-mcp-server-settings/).
- Canva: [access and permissions](https://www.canva.dev/docs/apps/mcp/access/) and [tools and rate limits](https://www.canva.dev/docs/apps/mcp/tools/).
- LinkedIn: [getting access](https://learn.microsoft.com/en-us/linkedin/shared/authentication/getting-access), [authorization code flow](https://learn.microsoft.com/en-us/linkedin/shared/authentication/authorization-code-flow), [Share on LinkedIn](https://learn.microsoft.com/en-us/linkedin/consumer/integrations/self-serve/share-on-linkedin), [User Agreement](https://www.linkedin.com/legal/user-agreement).
- Composio: [the organization request](https://github.com/ComposioHQ/composio/issues/4949).
