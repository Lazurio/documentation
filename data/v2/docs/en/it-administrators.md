---
title: Approval briefing for IT administrators
description: The system picture, data paths, enforcement limits and evidence to review before a Lazurio pilot.
stableId: lazurio-doc-it-administrators
summary: A concise IT review of Lazurio's purpose, identity, access, data, integrations, operations, and approval boundaries.
updatedAt: "2026-08-27"
reviewedAt: "2026-08-27"
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

Lazurio is a developer-stage local coordination layer for people and AI agents
working across versioned company repositories and approved tools. Today the
supported setup is a public source checkout run with Git and Bun. It includes
an experimental CLI v0, Launchpad, diagnostics and operating contracts; it is
not a vendor-managed AI service, a stable packaged installer or an additional
sandbox around the selected agent client.

For a pilot decision, identify the operating identity and machine, the exact
Organization repositories, the agent client and model provider, every enabled
integration, and the technical mechanism that permits or blocks each external
action.

![Lazurio deployment and data-flow overview](/diagrams/lazurio-data-flow.svg)

The diagram is a reference model, not a bill of materials for every
installation. Optional hosted surfaces must be listed explicitly when enabled.

## Current product status

| Item | Current public position |
| --- | --- |
| Distribution | Developer source checkout using Git and Bun. A simple packaged installation is target architecture, not a released path. |
| CLI and runtime | CLI v0 is experimental. Launchpad, Doctor and selected module/runtime flows work today, while broader distribution and resident onboarding are still evolving. |
| License | [FSL-1.1-Apache-2.0](https://github.com/HumanAndMachines/Lazurio/blob/3c5bda5d54c5556a0e54f3c339d988aa911fda60/LICENSE.md): internal use, non-commercial education or research, and professional services for a compliant licensee are permitted. Permitted use may include copying, modification and redistribution, with the license link and copyright notices retained. A Competing Use means making the software available to others in a commercial product or service that substitutes for Lazurio or another product or service the licensor offers using it, or offers the same or substantially similar functionality. Each published version becomes Apache 2.0 on its second anniversary. The software is provided without warranty and is not currently under an OSI open-source license. |
| Product owner | The public license notice names HumanAndMachine s.r.o. as copyright holder. A concrete operator must identify its support, hosting, incident and contractual owners. |
| Assurance | No certification, universal service level, default retention period or universal deployment topology is claimed. |

Security-critical pages name Pablo AI as a second reviewer. Pablo AI is the
Organization Steward automation, not an independent auditor or certification.
For this site, the deploy script mechanically checks a clean `main` and an
operator-supplied approved commit; matching that commit to Pablo's exact-head
review remains an explicit delivery process step.

## The short version

| Area | Documented Lazurio position | What IT should verify for its deployment |
| --- | --- | --- |
| Identity | The signed-in principal supplies authority; a task agent does not gain independent rights from a prompt. | The human or service identity, repository membership and device owner are correct. |
| Organization boundary | One company maps to one Organization and GitHub organization/access boundary. The documented default is one Organization per machine; a shared machine is an accepted exception within one trust domain, not hard tenant isolation. | The intended repositories and teams are the only ones mounted. Use separate machines or equivalent infrastructure where a stronger isolation boundary is required. |
| Local workspace | Work starts from checked-out, versioned source on a principal-owned machine. | Device hardening, disk encryption, endpoint monitoring, backup and offboarding meet policy. |
| Publication | Agent work is a reversible draft. Merge, deployment, sending and other external publication require explicit authority. | Repository rules, required reviews and deployment permissions enforce the intended gate. |
| External apps | Integrations are locally curated and separately revocable; the preference is official MCP, then official CLI. New ChatGPT/claude.ai connectors and shared hosted brokers are outside the standard because they break per-machine custody. | Each enabled provider, OAuth scope, data flow, retention policy and revocation path is accepted. The standard defaults to read+write scopes needed by the workflow; read-only is optional tightening, not the assumed baseline. |
| Secrets | Secrets belong in ignored, scoped custody paths—not in Git or public documentation. | The chosen secret store, rotation, incident response and leak scanning are operational. |
| Audit | Git commits, pull requests, reviews and provider logs create evidence, but coverage depends on the actual tools used. | Required logs exist across GitHub, endpoint, model provider, apps and deployment infrastructure. |

These are design and process boundaries, not a certification. Read the
[English evidence summary](/en/public-evidence/) for the exact current source,
language note and enforcement limits.

## What data can be reached?

There is no honest universal list because Lazurio is a framework whose concrete
reach depends on the principal, machine, repository grants and enabled tools.
A deployment review should inventory five surfaces:

1. Git repositories and teams visible to the operating identity.
2. Local files intentionally placed inside the active workspace boundary.
3. External applications enabled through an approved MCP server or CLI.
4. Model and hosting providers used by the chosen execution client and modules.
5. Optional hosted Lazurio surfaces such as Dashboard, a hosted team workspace,
   or a per-owner Resident/Buddy service, if the deployment enables them.

An integration existing in the ecosystem is not evidence that it is enabled.
Demand a live, deployment-specific list with provider, scopes, owner and
revocation instructions.

## Which controls are technical?

An instruction cannot remove a capability already present on the machine. A
repository or OAuth token is a machine/session capability usable by processes
that can reach it; Lazurio does not add a universal security sandbox around
Cursor, Codex, Claude Code or another execution client.

| Action | Mechanical gate | Process reliance and when data leaves |
| --- | --- | --- |
| Read a local file or repository | OS permissions, mounted workspace and any client sandbox | Scope rules guide the agent. A readable file may be sent to the model provider when selected as task context; local reads are not automatically audited. |
| Push a branch or open a pull request | GitHub repository write permission | Agents may prepare and push reviewable Draft work. Source leaves the machine when pushed; a pull request is not the protected-branch merge gate. |
| Merge a protected branch | GitHub branch rules, required checks, required reviews and live merge permission | Reviewer judgment remains a human/organizational control. |
| Create a provider draft | Provider OAuth/API scope or CLI credential | A draft email, message or provider object already sends data to that provider even if it is not yet externally delivered. |
| Send a message or mutate a provider | Whatever permission or confirmation the provider exposes | Explicit principal authorization is mandatory in the Lazurio process, but is not a universal technical interlock. Verify each integration and client. |
| Deploy | Deployment credential plus provider and repository gates configured by the module | A reviewed exact-commit gate can be mechanical; the operator still owns environment selection, secrets and rollback. |

![Draft-to-publication flow](/diagrams/draft-publication-flow.svg)

## Minimum approval package

Before a production rollout, ask the operator for:

- the Organization and repository inventory;
- a software and service inventory showing what runs locally, what is hosted,
  and what is only target architecture;
- named human/service identities and GitHub team grants;
- device and local data protection baseline;
- model provider and data-processing terms for the selected client;
- integration catalogue with exact scopes and revocation owners;
- secret custody, backup, deletion and offboarding procedures;
- branch protection and publication authority;
- logging sources, retention and incident contact;
- a bounded pilot with data that represents the real use case.
- the product status, license, support owner and upgrade/rollback path accepted
  for the pilot.

If any answer is unknown, record it as an implementation issue rather than
turning an architectural intention into a security claim.

## Suggested decision

Approve a scoped pilot only when the identities, repositories, integrations,
model provider, endpoint boundary and action-by-action gates are concrete and
testable. A source-checkout pilot carries different support and change-control
risk from a managed product. Do not approve a blanket deployment from this
overview alone. Continue with [data access and security](/en/data-access-security/)
and [deployment and operations](/en/deployment-operations/).
