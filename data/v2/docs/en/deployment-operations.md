---
title: Deployment and operations
description: What is fixed by Lazurio and what must be decided for a concrete rollout.
stableId: lazurio-doc-deployment-operations
summary: Plan a Lazurio rollout across identity, devices, repositories, modules, integrations, logs, backup, updates, and offboarding.
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
  - builder
  - agent
---

Lazurio is a framework with local workspaces and independently owned modules,
not one universal hosted topology. The public [architecture](https://github.com/HumanAndMachines/Lazurio/blob/69c53ec342124aef48cb9d04fd109f9886ec242e/ARCHITECTURE.md)
defines the common model. A rollout record must define the actual devices,
repositories, providers and deployed services used by your Organization.

## Components to account for

1. **Principal machine:** the endpoint where a person or AI colleague works.
2. **Lazurio root:** the local guide and launch surface above authorized
   Organization checkouts.
3. **Organization repository:** the company boundary, configuration and
   shared sources of truth.
4. **Workspace modules:** applications with their own runtime, dependencies,
   checks and deployment target.
5. **GitHub:** repository identity, team grants, review history and branch
   enforcement in the documented default model.
6. **Execution client and model provider:** selected by the deployment and
   reviewed under its own commercial and data terms.
7. **External applications:** individually enabled MCP servers, CLIs or
   browser workflows with provider-side scopes.

Not every module must be deployed to a public server. Some are local tools,
some are internal services, and some publish a public surface such as this
documentation site. Module ownership keeps those choices explicit.

## Rollout sequence

### 1. Define the Organization

Name the GitHub organization, repositories, teams, administrators and
offboarding owner. Decide what company data belongs there and what is excluded.

### 2. Approve an endpoint baseline

Document supported operating systems, device ownership, encryption, screen
lock, patching, endpoint monitoring, local backup, remote wipe and incident
handling. A principal-owned machine still needs company-grade controls when it
processes company data.

### 3. Select the execution provider

Record the client, model provider, account type, authentication, data handling,
retention, telemetry and contractual owner. Repeat this review when the client
or account tier changes.

### 4. Enable the minimum repositories and integrations

Start with one bounded use case. Give the principal only the repositories and
provider scopes it needs. Follow the public [external application
standard](https://github.com/HumanAndMachines/Lazurio/blob/69c53ec342124aef48cb9d04fd109f9886ec242e/manual/external-app-integrations.md)
and test revocation.

### 5. Enforce publication rules

Set branch protection, required checks and reviewers appropriate to the
repository. Define equivalent approval points for messages, infrastructure,
billing, secrets and destructive provider actions.

### 6. Run an acceptance exercise

Prove the normal task, a denied access attempt, credential revocation, failed
CI, rollback, offboarding and incident escalation. Keep evidence with the
rollout decision.

## Updating and rollback

Lazurio source, Organization configuration and each module are versioned
independently. Updates should fast-forward clean primary checkouts, run the
declared doctor/check gates and enter production through a reviewed exact
commit. Rollback means returning the affected repository or deployment to a
previous verified revision; it must not silently restore revoked credentials
or superseded access.

## Operating questions that remain deployment-specific

- Who maintains endpoints, GitHub teams and external integrations?
- Which model provider and account terms apply?
- Where do module services run, and which networks can reach them?
- Which logs exist and how long are they retained?
- How are local data and credentials backed up, deleted and recovered?
- What response time is promised, if any?

These answers should be part of the customer-specific acceptance package.
This public documentation intentionally does not invent them.
