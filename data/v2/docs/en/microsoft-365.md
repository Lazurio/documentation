---
title: "Microsoft 365 for IT and the Organization Admin"
description: "What Lazurio needs from a Microsoft 365 tenant, what IT decides, the Organization Admin's setup steps and how to revoke access."
stableId: lazurio-doc-microsoft-365
locale: en
summary: "One single-tenant Entra app with delegated Graph permissions and no secret: what IT approves, the Organization Admin's steps, Conditional Access, audit and revocation."
updatedAt: "2026-11-08"
reviewedAt: "2026-11-01"
reviewOwner: Matej Suchanek
secondReviewOwner: Pablo AI
trustCritical: true
sourceRefs:
  - lazurio-microsoft-365-company-app
  - lazurio-microsoft-365-for-it
  - lazurio-platform-microsoft-365-company-app
  - lazurio-platform-decision-f45
  - lazurio-platform-release-v0-1-9
  - lazurio-manifest-family-settings
  - lazurio-decision-register-gen4
  - microsoft-entra-permissions-consent
  - microsoft-graph-permissions-reference
  - microsoft-entra-app-consent-policies
  - microsoft-entra-grant-admin-consent
  - microsoft-entra-delegate-app-roles
  - microsoft-entra-register-app
  - microsoft-entra-add-redirect-uri
  - microsoft-entra-enterprise-app-properties
  - microsoft-entra-redirect-uri
  - microsoft-entra-desktop-app-configuration
  - microsoft-entra-auth-code-flow
  - microsoft-entra-access-tokens
  - microsoft-entra-refresh-tokens
  - microsoft-entra-revoke-user-access
  - microsoft-graph-revoke-sign-in-sessions
  - microsoft-entra-session-lifetime
  - microsoft-entra-error-codes
  - microsoft-entra-noninteractive-sign-ins
  - microsoft-purview-audit
  - microsoft-entra-publisher-verification
  - microsoft-graph-create-event
  - microsoft-graph-event-cancel
  - microsoft-graph-driveitem-createlink
  - microsoft-graph-driveitem-invite
  - microsoft-work-iq-permissions
  - microsoft-work-iq-overview
audience:
  - it-admin
  - decision-maker
  - agent
---

Lazurio connects Outlook mail and calendar, OneDrive and SharePoint through one
app that your IT registers in your own Microsoft Entra tenant. The app accepts
only your tenant's accounts, has only delegated Microsoft Graph permissions and
no client secret, and IT consents to it once for everyone. Lazurio receives the
tenant ID and the application (client) ID, which are not secrets. Each user then
connects their own work account, and agents in that user's Environment reach
only what that account can reach.

**Status on 1 November 2026.** Lazurio Platform supports this company app since
[release v0.1.9](https://github.com/Lazurio/LazurioPlatform/releases/tag/v0.1.9)
of 19 October 2026. Two parts are not finished. The Organization Admin cannot yet edit the
setting in Organization overview, so it is added by a reviewed pull request to
the Organization's repository. Lazurio has not yet run the procedure end to end
on a real tenant: an exchange of the sign-in code without a secret on an HTTPS
return address, refresh after the access token expires and revocation through
"Assignment required" are still open checks. Lazurio's decision register lists
the Microsoft 365 setting of decision 0162 as decided, not yet deployed. Plan
the first Organization's setup as a pilot.

## What the tenant needs

| Item | Setting |
| --- | --- |
| App registration | One app in your tenant, for example "Lazurio (&lt;Organization&gt;)". Supported account types: single tenant only (`AzureADMyOrg`). |
| Permissions | Delegated Microsoft Graph permissions only, listed below. No application permissions and no directory or administrative permissions. |
| Client type | Public client. Users sign in with the authorization code flow and PKCE. The app has no client secret and no certificate. |
| Redirect URIs | Platform "Mobile and desktop applications": the callback of each of the Organization's Environments on the server, `https://launchpad.<machine>.<github-org-login>.lazurio.io/api/integrations/oauth/callback`, and `http://localhost/api/oauth/callback`. |
| Consent | Tenant-wide admin consent, given once. |
| Handed to Lazurio | The Directory (tenant) ID and the Application (client) ID. |

Microsoft allows at most 256 redirect URIs on an app that signs in work or
school accounts, and it ignores the port of a `localhost` redirect URI while
the path must still match. One registration of
`http://localhost/api/oauth/callback` therefore covers the local return of the
Environment's Executor. Lazurio's setting accepts at most 255 Environment
callbacks and no wildcards.

## Permissions and what they allow

All permissions are delegated. Microsoft states that with a delegated
permission the app can't access anything the signed-in user couldn't access.
The app asks for nothing about the directory, users, groups or tenant settings.
An administrator account connected through it therefore reaches only mail,
calendars, files and sites, but everything there that the account itself can
access.

| Permission | Microsoft's description | What it means for agents |
| --- | --- | --- |
| `openid`, `profile`, `email`, `User.Read` | Sign in and read the signed-in user's profile | The account's name and address identify the connection. |
| `offline_access` | Keep access to data the user gave access to; adds no permissions | Executor renews access without a new sign-in. |
| `Mail.ReadWrite` | Create, read, update and delete email in user mailboxes; does not include permission to send mail | Agents read, sort, move and delete mail and create drafts. They cannot send. |
| `Calendars.ReadWrite` | Create, read, update and delete events in user calendars | When an agent creates an event with attendees, Microsoft sends the invitations; this cannot be turned off. An organizer's cancellation sends a cancellation message. |
| `Files.ReadWrite.All` | Read, create, update and delete all files the signed-in user can access | Covers OneDrive and SharePoint libraries, including sharing links and inviting people to a file. |
| `Sites.Read.All` | Read documents and list items in all site collections for the signed-in user | Agents find sites, their libraries and lists. |

The app does not have `Mail.Send`: sending mail stays off until the
Organization deliberately adds it as a separate permission with admin consent.
It also does not request `MailboxSettings.ReadWrite`, shared-mailbox
permissions (`.Shared`) or any Teams permission; Teams is planned for a second
phase, for reading and drafts.

The setting's `apps` list chooses the parts Lazurio uses: `outlook` (mail and
calendar), `one_drive` (files) and `share_point` (files and sites). A sign-in
asks only for the permissions of the chosen parts plus the sign-in permissions.
If a Lazurio release asks for a permission your tenant has not consented to, the
sign-in reports that administrator approval is required (`AADSTS65001` or
`AADSTS90094`). The Organization Admin asks IT to add the consent and the user connects
again.

## Why IT must give the consent

New tenants use Microsoft's default user consent setting, "Let Microsoft manage
your consent settings". On 1 November 2026 Microsoft documented that under it
users may consent to delegated permissions except a list that includes
`Mail.ReadWrite`, `Calendars.ReadWrite`, `Files.ReadWrite.All` and
`Sites.Read.All`. Microsoft also requires administrator consent for an app that
requires user assignment. One tenant-wide admin consent covers every user, and
no user is asked for consent.

Microsoft lets a Cloud Application Administrator, Application Administrator, AI
Administrator or Privileged Role Administrator grant tenant-wide consent to
delegated Microsoft Graph permissions. By default any user in the tenant can
register an app; if your tenant restricts that, the Application Developer role
can.

## Who decides what

| Who | Decides |
| --- | --- |
| IT, the tenant's administrators | Whether the app exists, its permissions and the consent; who may connect ("Assignment required" and a group); Conditional Access; disabling or deleting the app. Entra is the off switch. |
| The Organization Admin in Lazurio | Records the tenant ID, client ID, chosen parts and registered callbacks in the Organization's settings, and asks IT to register the callback of every new Environment. |
| Each user | Connects their own work account in Apps → Integrations, may add further accounts and disconnects them. |
| Agents | Use the connected accounts. They never connect an account themselves, and they make changes other people see only on the user's instruction. This is a working rule that agents follow, not a technical barrier. |

## The Organization Admin's procedure

IT works in its own browser. Nobody signs in to an Environment with an
administrator account.

1. **Collect the callbacks.** The Organization Admin, or an agent working for
   them, lists the callback of each of the Organization's Environments on the
   server, in the pattern shown above.
2. **Register the app.** In the Microsoft Entra admin center open Entra ID →
   App registrations → New registration. Name it
   "Lazurio (&lt;Organization&gt;)", choose the single-tenant account type
   ("Single tenant only", `AzureADMyOrg` in the manifest) and register it.
3. **Authentication.** On the app's Authentication page add a redirect URI,
   choose the platform "Mobile and desktop applications" and enter as custom
   redirect URIs every callback from step 1 and
   `http://localhost/api/oauth/callback`. Leave "Allow public client flows"
   off: Microsoft uses it for flows without a redirect URI, such as the device
   code flow. Add no Web or single-page application platform.
4. **API permissions.** Add the nine delegated Microsoft Graph permissions from
   the table, then select "Grant admin consent for &lt;tenant&gt;".
5. **Certificates & secrets.** Add nothing. Microsoft states that public clients
   must not use secrets or certificates when they redeem an authorization code.
6. **Limit who may connect (recommended).** In Enterprise apps → the app →
   Properties set "Assignment required" to Yes, and under Users and
   groups assign the group of people who may connect. Anyone else is refused
   with `AADSTS50105`. Microsoft notes that users with the Global Administrator
   role can sign in regardless of this setting.
7. **Hand over the identifiers.** Copy the Application (client) ID and the
   Directory (tenant) ID from Overview and give them to the Organization
   Admin.
8. **Read it back.** Check that the account type is `AzureADMyOrg`, that the
   redirect URIs are exactly the intended ones, that no Web platform exists,
   that there are no secrets or certificates and that consent is granted for all
   nine permissions. The first real connection is the proof that it works.
9. **Record the setting.** The Organization Admin approves a pull request that
   adds `settings.integrations.microsoft365` to the Organization's
   `lazurio.organization.json`: `tenant_id`, `client_id`, `apps` and
   `callbacks`, the last being exactly the registered Environment callbacks
   without the `localhost` one. The setting accepts no other key, so it cannot
   hold a secret. Before the first setting, confirm that every Environment of
   the Organization runs a Lazurio release that reads it: an older reader
   rejects the whole `settings` section. Each Environment of the Organization
   then applies the setting itself and shows one "Microsoft 365" card in
   Apps → Integrations; an Environment that asks Organization overview for its
   settings checks every two minutes.
10. **Users connect.** Each user opens Apps → Integrations → Microsoft 365,
    selects Connect, later Add account, and signs in once with their work
    account. Where the Environment's callback is registered, the sign-in opens
    in the user's own browser. Otherwise it opens in the Environment browser,
    which the Environment's agents share; Lazurio clears Microsoft's sign-in
    cookies there when the sign-in ends. Do not use an administrator account
    for a sign-in in the Environment browser.
11. **A new Environment.** IT adds its callback in Authentication and the same
    address goes into `callbacks` by pull request. Until then, users of that
    Environment sign in through the Environment browser.

IT may do steps 2 to 5 with the Azure CLI in Azure Cloud Shell in its own
browser instead of the admin center; the read-back in step 8 stays the same.

## Conditional Access

- The interactive sign-in is evaluated where the user's browser is. Token
  refresh and every Graph call come from the outbound address of the
  Environment. If you use location-based policies, ask the operator of your
  Lazurio deployment for the outbound addresses of the Organization's
  Environments.
- A policy that requires a compliant device blocks a sign-in in the Environment
  browser with `AADSTS53000`. A sign-in in the user's own browser on a managed
  device can pass; a later refresh from the Environment may still meet the
  policy.
- Sign-in frequency ends a connection when its interval passes, with
  `AADSTS70043`. Microsoft defers sign-in frequency for non-interactive
  sign-ins only for confidential clients, and this app is a public client. The
  user then connects again.
- A password change revokes refresh tokens from password-based sign-ins, but
  not from passwordless ones. To end access, block the account or revoke its
  sessions.

## Data and tokens

- Microsoft Graph talks directly to the Executor of the user's Environment, the
  local MCP gateway that Lazurio runs in every Environment on the server. No
  other Lazurio service sits in between.
- What an agent reads during its work goes to the AI model provider that the
  Environment uses.
- Executor keeps the connection's tokens in the Environment in a file that only
  the Environment's operating-system account can read (`0600`). The file is not
  encrypted. Every agent in that Environment can use the tokens (decision
  0172), and so can the administrator of the server that hosts the
  Organization's Environments and anyone who holds a backup of the Environment.
- On a Team Environment a connected account serves every member and agent of
  that Environment.
- Executor pauses each writing call (POST, PUT, PATCH, DELETE) for approval, but
  the agent itself gives that approval. Lazurio's instructions tell agents to
  accept it only for a draft or for a Publication the user explicitly approved.
  This is a working rule, not a technical barrier.

## Revoking access

| Scope | How | When it takes effect |
| --- | --- | --- |
| One user, including someone who leaves | Block the account or revoke the user's sessions (Microsoft Entra admin center → the user → Revoke sessions, or Graph `revokeSignInSessions`). | The next refresh fails and Executor then shows the connection as expired. An access token already issued stays valid until it expires: Microsoft assigns 60 to 90 minutes by default, and the revocation can take a few minutes. |
| The whole Organization | Enterprise apps → the app → Properties → "Enabled for users to sign in?" set to No, or remove the consent, or delete the app. | Microsoft issues no further tokens for the app, even to assigned users. Tokens already issued expire as above. |
| One connection, by the user | Apps → Integrations → ⋯ → Disconnect. | The connection is deleted from the Environment's Executor. |

Lazurio disconnects nothing by itself, and nothing expires on Lazurio's side.
Removing the setting from the Organization's settings stops offering the app
but keeps the existing connections, so Entra stays the off switch. When an
Environment passes to another person, whoever hands it over or takes it over
disconnects the accounts that should no longer be used there; for a person who
leaves the Organization, IT's block is the reliable cut. Microsoft gives
refresh tokens a default lifetime of 90 days and replaces them on every use,
so a connection that stays unused that long needs a new sign-in.

## Where you see the activity

- **Microsoft Entra sign-in logs** show the user's interactive sign-ins to the
  app and the non-interactive sign-ins in which the client uses a refresh token
  to get an access token, with their addresses.
- **Microsoft Purview audit** (the unified audit log) records user and admin
  operations in Exchange Online, SharePoint and OneDrive under the user's
  account. What is recorded and for how long depends on your audit licensing.

## Why the app shows "Unverified"

Your Organization registered the app in its own tenant, so the publisher is
your Organization, not Lazurio. Microsoft describes publisher verification as
primarily for multitenant apps. Our assessment: for a single-tenant app with
admin consent the label changes nothing.

## What Lazurio does not use

- **Work IQ MCP.** Microsoft's official MCP server for Microsoft 365 data is not
  Lazurio's default path. Its one delegated permission, `WorkIQAgent.Ask`,
  covers reading and writing the Microsoft 365 resources that Work IQ agents
  reach for the user, an administrator must enable Work IQ first, and its use is
  billed by usage. Our assessment: an Organization that wants it can add it
  later to the same app and to Executor.
- **New ChatGPT or claude.ai connectors** and an app registered by another
  publisher: the admin consent belongs to your own app.
- **Community MCP servers** that keep their own token cache beside Executor.
- **Composio for work accounts** once the company app is set up. Personal
  Microsoft accounts (Outlook.com) cannot use the company app; on a Personal
  Environment they stay on Composio. See
  [connecting an Environment to apps](/en/environment-app-connections/).

In GEN3, the Lazurio Root on a person's computer, there is no company app card;
the GEN3 runbook connects an account through Executor only on the user's
explicit instruction, against the same app registration.

## Sources

Microsoft Learn pages were read on 1 November 2026.

- Microsoft: [permissions and consent](https://learn.microsoft.com/en-us/entra/identity-platform/permissions-consent-overview), [Graph permissions reference](https://learn.microsoft.com/en-us/graph/permissions-reference), [app consent policies](https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/manage-app-consent-policies), [tenant-wide admin consent](https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/grant-admin-consent), [who can register apps](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/delegate-app-roles), [registering an app](https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app), [adding a redirect URI](https://learn.microsoft.com/en-us/entra/identity-platform/how-to-add-redirect-uri), [enterprise application properties](https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/application-properties), [redirect URI rules](https://learn.microsoft.com/en-us/entra/identity-platform/reply-url), [public client flows](https://learn.microsoft.com/en-us/entra/identity-platform/scenario-desktop-app-configuration), [authorization code flow](https://learn.microsoft.com/en-us/entra/identity-platform/v2-oauth2-auth-code-flow).
- Microsoft: [access tokens](https://learn.microsoft.com/en-us/entra/identity-platform/access-tokens), [refresh tokens](https://learn.microsoft.com/en-us/entra/identity-platform/refresh-tokens), [revoking user access](https://learn.microsoft.com/en-us/entra/identity/users/users-revoke-access), [`revokeSignInSessions`](https://learn.microsoft.com/en-us/graph/api/user-revokesigninsessions), [sign-in frequency](https://learn.microsoft.com/en-us/entra/identity/conditional-access/concept-session-lifetime), [error codes](https://learn.microsoft.com/en-us/entra/identity-platform/reference-error-codes), [non-interactive sign-ins](https://learn.microsoft.com/en-us/entra/identity/monitoring-health/concept-noninteractive-sign-ins), [Purview auditing](https://learn.microsoft.com/en-us/purview/audit-solutions-overview), [publisher verification](https://learn.microsoft.com/en-us/entra/identity-platform/publisher-verification-overview).
- Microsoft: [creating events](https://learn.microsoft.com/en-us/graph/api/user-post-events), [cancelling events](https://learn.microsoft.com/en-us/graph/api/event-cancel), [sharing links](https://learn.microsoft.com/en-us/graph/api/driveitem-createlink), [inviting people to a file](https://learn.microsoft.com/en-us/graph/api/driveitem-invite), [Work IQ overview](https://learn.microsoft.com/en-us/microsoft-365/copilot/extensibility/work-iq/) and [Work IQ permissions](https://learn.microsoft.com/en-us/microsoft-365/copilot/extensibility/work-iq/permissions).
- Lazurio: the [Microsoft 365 runbook](https://github.com/HumanAndMachines/Lazurio/blob/66e437f7e563574ea35b79dd1bdd193fd0f6b4b6/manual/integrations/microsoft-365.md) and the [page for IT](https://github.com/HumanAndMachines/Lazurio/blob/66e437f7e563574ea35b79dd1bdd193fd0f6b4b6/manual/integrations/microsoft-365-for-it.md) (both in Czech), the [setting's shape and readers first](https://github.com/HumanAndMachines/Lazurio/blob/66e437f7e563574ea35b79dd1bdd193fd0f6b4b6/manual/lazurio-manifest-family.md#microsoft-365-company-app-settingsintegrationsmicrosoft365), Lazurio Platform's [company app](https://github.com/Lazurio/LazurioPlatform/blob/a2927744b5a87113425f93f5e1517ac97b2f6c06/docs/integrations.md#the-microsoft-365-company-app) and [decision F45](https://github.com/Lazurio/LazurioPlatform/blob/a2927744b5a87113425f93f5e1517ac97b2f6c06/docs/decisions.md#f45--organization-settings-reach-the-environment-asked-through-its-relay-recorded-in-the-folder-reported-back), and the [decision register](https://github.com/Lazurio/LazurioPlatform/blob/4d5ee62a963a0ae2fc98287f0072e739ff6d2cd8/docs/decision-register.md) (decisions 0162, 0172 and 0194).
