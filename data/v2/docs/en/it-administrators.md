---
title: A ten-minute IT briefing
description: The questions an IT administrator should ask before approving Lazurio.
stableId: lazurio-doc-it-administrators
summary: A concise IT review of Lazurio's purpose, identity, access, data, integrations, operations, and approval boundaries.
updatedAt: "2026-08-26"
reviewedAt: "2026-08-26"
reviewOwner: Matej Suchanek
secondReviewOwner: Pablo AI
trustCritical: true
sourceRefs:
  - lazurio-readme
  - lazurio-architecture
  - lazurio-collaboration-model
  - lazurio-external-apps
  - lazurio-secret-custody
audience:
  - it-admin
  - decision-maker
  - agent
---

Lazurio is a source-controlled working environment for people and AI agents.
It is designed to make organizational boundaries, authority and publication
decisions explicit while agents help with work. The public source is available
for inspection in the [Lazurio repository](https://github.com/HumanAndMachines/Lazurio/tree/69c53ec342124aef48cb9d04fd109f9886ec242e).

The right approval question is not “Can the AI see data?” in isolation. It is:
**which identity is operating, on which machine, in which Organization, through
which approved integration, against which data, and who may publish the result?**

## The short version

| Area | Documented Lazurio position | What IT should verify for its deployment |
| --- | --- | --- |
| Identity | The signed-in principal supplies authority; a task agent does not gain independent rights from a prompt. | The human or service identity, repository membership and device owner are correct. |
| Organization boundary | One company maps to one Organization and GitHub organization/access boundary. Cross-organization data must not be mixed. | The intended repositories and teams are the only ones mounted and accessible. |
| Local workspace | Work starts from checked-out, versioned source on a principal-owned machine. | Device hardening, disk encryption, endpoint monitoring, backup and offboarding meet policy. |
| Publication | Agent work is a reversible draft. Merge, deployment, sending and other external publication require explicit authority. | Repository rules, required reviews and deployment permissions enforce the intended gate. |
| External apps | Integrations are machine-local, reviewed and separately revocable; the documented preference is official MCP, then official CLI. | Each enabled provider, OAuth scope, data flow, retention policy and revocation path is accepted. |
| Secrets | Secrets belong in ignored, scoped custody paths—not in Git or public documentation. | The chosen secret store, rotation, incident response and leak scanning are operational. |
| Audit | Git commits, pull requests, reviews and provider logs create evidence, but coverage depends on the actual tools used. | Required logs exist across GitHub, endpoint, model provider, apps and deployment infrastructure. |

These are documented design and process boundaries, not a certification. The
underlying contracts are the public [collaboration model](https://github.com/HumanAndMachines/Lazurio/blob/69c53ec342124aef48cb9d04fd109f9886ec242e/AGENTS.md),
[integration standard](https://github.com/HumanAndMachines/Lazurio/blob/69c53ec342124aef48cb9d04fd109f9886ec242e/manual/external-app-integrations.md),
and [secret custody standard](https://github.com/HumanAndMachines/Lazurio/blob/69c53ec342124aef48cb9d04fd109f9886ec242e/manual/security/local-secret-custody.md).

## What data can be reached?

There is no honest universal list because Lazurio is a framework whose concrete
reach depends on the principal, machine, repository grants and enabled tools.
A deployment review should inventory four surfaces:

1. Git repositories and teams visible to the operating identity.
2. Local files intentionally placed inside the active workspace boundary.
3. External applications enabled through an approved MCP server or CLI.
4. Model and hosting providers used by the chosen execution client and modules.

An integration existing in the ecosystem is not evidence that it is enabled.
Demand a live, deployment-specific list with provider, scopes, owner and
revocation instructions.

## What prevents accidental publication?

The [Lazurio collaboration contract](https://github.com/HumanAndMachines/Lazurio/blob/69c53ec342124aef48cb9d04fd109f9886ec242e/AGENTS.md)
separates editable agent work from publication. Normal development happens on
a branch and through a pull request. GitHub permissions and branch rules remain
the access authority; text in a prompt is not an access grant. For non-Git
actions such as sending a message or changing a provider, the same principle is
implemented by explicit authorization and provider permissions.

Process controls still need technical counterparts wherever the platform can
enforce them. Your acceptance test should try a denied repository, an
unapproved external tool, a protected merge and a revoked credential—not only
read the policy.

## Minimum approval package

Before a production rollout, ask the operator for:

- the Organization and repository inventory;
- named human/service identities and GitHub team grants;
- device and local data protection baseline;
- model provider and data-processing terms for the selected client;
- integration catalogue with exact scopes and revocation owners;
- secret custody, backup, deletion and offboarding procedures;
- branch protection and publication authority;
- logging sources, retention and incident contact;
- a bounded pilot with data that represents the real use case.

If any answer is unknown, record it as an implementation issue rather than
turning an architectural intention into a security claim.

## Suggested decision

Approve a scoped pilot when the identities, repositories, integrations, model
provider and publication gate are concrete and testable. Do not approve a
blanket deployment from this overview alone. Start with [data access and
security](/en/data-access-security/) and [deployment and
operations](/en/deployment-operations/) for the deeper review.
