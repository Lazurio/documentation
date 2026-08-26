---
title: A ten-minute IT briefing
description: The questions an IT administrator should ask before approving Lazurio.
stableId: lazurio-doc-it-administrators
locale: en
summary: A concise IT review of Lazurio's purpose, identity, access, data, integrations, operations, and approval boundaries.
updatedAt: "2026-08-31"
reviewedAt: "2026-08-31"
reviewOwner: Matej Suchanek
secondReviewOwner: Pablo AI
trustCritical: true
sourceRefs:
  - lazurio-readme
  - lazurio-license
  - lazurio-architecture
  - lazurio-collaboration-model
  - lazurio-external-apps
  - lazurio-secret-custody
audience:
  - it-admin
  - decision-maker
  - agent
---

Lazurio makes AI-assisted work governable by keeping company work in versioned
repositories and separating preparation from publication. People and agents
can work across source and approved tools without inventing a second identity
or permission system.

Today the supported setup is a public source checkout run with Git and Bun. It
includes Launchpad, diagnostics, operating contracts and an experimental CLI
v0. It is not a vendor-managed AI service, a stable packaged installer or an
additional sandbox around the selected agent client.

The right approval question is not simply “Can the AI see data?” It is:
**which identity is operating, on which machine, in which Organization,
through which approved tool, against which data, and who may publish the
result?**

![Lazurio deployment and data-flow overview](/diagrams/lazurio-data-flow.svg)

The diagram is a reference model. Optional hosted surfaces are separate
services and belong in the inventory only when a deployment enables them.

## Decision snapshot

| Item | Current public position |
| --- | --- |
| Product form | Developer-operated source checkout using Git and Bun. A packaged installation is a future target. |
| Runtime maturity | Launchpad, Doctor and selected module flows work today; CLI v0 remains experimental. |
| License | Source-available under [FSL-1.1-Apache-2.0](https://github.com/HumanAndMachines/Lazurio/blob/3c5bda5d54c5556a0e54f3c339d988aa911fda60/LICENSE.md), with Apache 2.0 applying to each published version after two years. |
| Assurance | No certification, universal service level, retention period or deployment topology is claimed. Support and hosting terms belong to the concrete deployment. |

The [security and control evidence](/en/public-evidence/) contains the detailed
license meaning, exact source links and evidence limits. Keeping that detail in
one place prevents every reader-facing page from becoming a legal appendix.

## The short version

| Area | Lazurio's operating model | What IT should verify |
| --- | --- | --- |
| Identity | The signed-in principal supplies authority; a task agent has no independent rights. | The account, repository membership and machine owner are correct. |
| Company boundary | One company maps to one Organization and GitHub access boundary. One machine remains one trust domain. | Only intended repositories are mounted; use separate machines or equivalent isolation when companies must not share an OS boundary. |
| Working context | Work begins in checked-out source and explicitly enabled tools. | Endpoint protection, local data scope and provider terms meet policy. |
| Publication | Agent output stays editable until an authorized merge, deployment, send or provider action. | Branch rules, reviews and provider permissions enforce the intended gate. |
| Integrations | Connections are locally curated and separately revocable; official MCP or CLI paths are preferred. | Every provider, OAuth scope, owner, data path and revocation procedure is accepted. |
| Evidence | Git and provider records can show who changed what, but coverage depends on the tools actually used. | Required endpoint, model, app and deployment logs exist and have named retention. |

## What data can be reached?

There is no honest universal list. Reach depends on the operating identity,
machine, repository grants, agent client and enabled tools. Inventory these
five surfaces for the proposed deployment:

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

Lazurio does not turn policy prose into a universal technical interlock.
Controls remain with the system that owns the capability:

| Action | Effective control |
| --- | --- |
| Read a local file | OS permissions, workspace selection and any client sandbox. A readable file may be sent to the model provider as task context. |
| Push a branch or open a pull request | GitHub write permission. This is reviewable Draft work, but the source has already reached GitHub. |
| Merge or deploy an exact revision | Branch rules, required checks, reviews, merge rights and the module's deployment gate. |
| Create or send something in an external provider | That provider's credential, scopes and confirmations. A provider draft may already transmit data; where no provider interlock exists, explicit authorization remains a process control. |

In plain language, an Agent can prepare a proposed change, but making it
effective still depends on both the signed-in account and the person responsible
for the exact decision.

<figure class="lz-diagram">
  <picture>
    <source media="(max-width: 80rem)" srcset="/diagrams/draft-publication-flow-mobile.svg" />
    <img src="/diagrams/draft-publication-flow.svg" alt="A person defines the outcome, an Agent prepares a proposed change and proof, and the change takes effect only when the account is allowed to perform it and the responsible person approves it." />
  </picture>
  <figcaption>The Agent prepares; it does not self-authorize. Lazurio calls the identity responsible for the decision the Principal.</figcaption>
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
A source-checkout pilot carries different support and change-control risk from
a managed product. Continue with [data access and
security](/en/data-access-security/) and [deployment and
operations](/en/deployment-operations/) before approving production use.
