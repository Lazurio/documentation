---
title: "A ten-minute IT briefing"
description: "What to verify before a Lazurio pilot and production deployment."
stableId: lazurio-doc-it-administrators
locale: en
summary: "An IT checklist for access boundaries, provider terms and publication approval before deployment."
updatedAt: "2026-10-28"
reviewedAt: "2026-10-28"
reviewOwner: Anna Blazickova
secondReviewOwner: Pablo AI
trustCritical: true
sourceRefs:
  - lazurio-readme
  - lazurio-license
  - lazurio-architecture
  - lazurio-collaboration-model
  - lazurio-external-apps
  - lazurio-secret-custody
  - lazurio-platform-release-current
  - lazurio-platform-integrations-current
audience:
  - it-admin
  - decision-maker
  - agent
---

Use this briefing to prepare a Lazurio pilot and decide what the operator
must demonstrate before deployment. Lazurio uses Git repositories for company
materials and change history. Agents prepare drafts; publication is approved
separately. GitHub, the operating system and connected services still control
access.

The current baseline is installable Platform v0.1.14, released on 27 October
2026. CLI and Apps share one installed program; the product generates the
Lazurio Folder's agent instructions. This does not supply an AI subscription
or a universal sandbox. Inventory optional hosted services separately.

Before approval, identify **the account, machine, Organization, tool and
available data**. Separately verify who may publish the result.

![Lazurio deployment and data-flow overview](/diagrams/lazurio-data-flow.svg)

The diagram is a reference model. Optional hosted services are separate
services and belong in the inventory only when a deployment enables them.

## Decision snapshot

| Item | Current public position |
| --- | --- |
| Product form | Installable CLI and Apps, with generated instructions; source checkout is not required for daily use. |
| Runtime maturity | Verify the installed release and enabled services; a release is not a promise that every optional service is deployed. |
| License | [Elastic License 2.0](https://github.com/Lazurio/LazurioPlatform/blob/v0.1.14/LICENSE) for the current Platform; no automatic Apache transition. Legacy and third-party licenses remain separate. |
| Assurance | No certification, universal service level, retention period or deployment topology is claimed. Support and hosting terms belong to the concrete deployment. |

See [security and control evidence](/en/public-evidence/) for the license,
source links and limits of these claims.

## The short version

| Area | Lazurio's operating model | What IT should verify |
| --- | --- | --- |
| Identity | The signed-in principal supplies authority; a task agent has no independent rights. | The account, repository membership and machine owner are correct. |
| Company boundary | One company maps to one Organization and GitHub access boundary. One machine remains one trust domain. | Only intended repositories are mounted; use separate machines or equivalent isolation when companies must not share an OS boundary. |
| Working context | Work begins in checked-out source and explicitly enabled tools. | Endpoint protection, local data scope and provider terms meet policy. |
| Publication | Agent output stays editable until an authorized merge, deployment, send or provider action. | Branch rules, reviews and provider permissions enforce the intended gate. |
| Integrations | Apps → Integrations lists the configured routes and accounts; verify the actual revocation boundary. | Every provider, OAuth scope, owner, data path and revocation procedure is accepted. |
| Evidence | Git and provider records can show who changed what, but coverage depends on the tools actually used. | Required endpoint, model, app and deployment logs exist and have named retention. |

## What data can be reached?

Access depends on the account, machine, repository permissions, AI client and
enabled tools. Check these five areas for your deployment:

1. Git repositories and teams visible to the operating identity.
2. Local files placed inside the active workspace or readable by the client.
3. External applications enabled through an approved MCP server, CLI or
   browser workflow.
4. The agent client, model provider and any hosting provider used by modules.
5. Optional hosted Lazurio services such as Dashboard, a hosted team workspace
   or a per-owner Resident/Buddy service.

An integration existing in the ecosystem is not evidence that it is enabled.
Ask for a live list with provider, scopes, owner and revocation instructions.

## Where enforcement lives

Lazurio does not turn policy prose into a universal technical restriction.
Controls remain with the system that owns the capability:

| Action | Effective control |
| --- | --- |
| Read a local file | OS permissions, workspace selection and any client sandbox. A readable file may be sent to the model provider as task context. |
| Push a branch or open a pull request | GitHub write permission. This is reviewable Draft work, but the source has already reached GitHub. |
| Merge or deploy an exact revision | Branch rules, required checks, reviews, merge rights and the module's deployment gate. |
| Create or send something in an external provider | That provider's credential, scopes and confirmations. A provider draft may already transmit data; where no provider-enforced restriction exists, explicit authorization remains a process control. |

An agent prepares the change. Publication requires both the account's
permission and approval from the person responsible for that decision.

<figure class="lz-diagram">
  <picture>
    <source media="(max-width: 80rem)" srcset="/diagrams/draft-publication-flow-mobile.svg" />
    <img src="/diagrams/draft-publication-flow.svg" alt="A person defines the outcome, an Agent prepares a proposed change and proof, and the change takes effect only when the account is allowed to perform it and the responsible person approves it." />
  </picture>
  <figcaption>The Agent prepares; it does not self-authorize. Older sources call the responsible identity the Principal.</figcaption>
</figure>

## Minimum approval package

Before production use, ask for:

- the Organization, repository and enabled-service inventory;
- named identities, GitHub team grants and offboarding owners;
- the endpoint protection and local-data baseline;
- the selected agent client, model provider and data-processing terms;
- integration scopes, credential custody and revocation procedures;
- branch protection and provider-specific publication authority;
- logs, retention, backup, deletion, incident response and rollback; and
- a bounded pilot that proves both the normal path and meaningful denials.

Unknowns should become implementation issues, not security claims.

## Suggested decision

Approve a scoped pilot when the identities, repositories, endpoint boundary,
providers, integrations and action-by-action gates are concrete and testable.
Record whether the deployment is self-hosted or managed, and who supplies support. Continue with [data access and
security](/en/data-access-security/) and [deployment and
operations](/en/deployment-operations/) before approving production use.
