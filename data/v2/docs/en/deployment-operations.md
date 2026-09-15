---
title: Deployment and operations
description: What is fixed by Lazurio and what must be decided for a concrete rollout.
stableId: lazurio-doc-deployment-operations
locale: en
summary: Plan a Lazurio rollout across identity, devices, repositories, modules, integrations, logs, backup, updates, and offboarding.
updatedAt: "2026-09-15"
reviewedAt: "2026-09-15"
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

Lazurio deployments vary. In the version described here, the operator manages
local working copies and individual modules. Start by listing the machines,
repositories, AI tools, model providers and connected services you will use.
Name an owner for each.

![Lazurio deployment and data-flow overview](/diagrams/lazurio-data-flow.svg)

## Current and target state

| Surface | Status | Operational meaning |
| --- | --- | --- |
| Source checkout with Git and Bun | Supported today | The operator owns repository access, dependencies and updates. |
| Launchpad, Guide and Doctor | Available today | These are local tools for finding applications, reading guidance, running applications and checking the installation. Loopback listeners are not caller authentication. |
| CLI v0 | Experimental | Pin versions and test any production automation that depends on it. |
| Packaged CLI and generated non-Git root | Future target | Do not include them in a current bill of materials. |
| Dashboard, hosted workspace and Resident/Buddy | Optional, separately deployed | Inventory each enabled service with its own identity, network, storage and operating owner. |

The basic installation still includes several owners: the principal machine,
the local Lazurio root, Organization repositories, workspace modules, GitHub,
the agent client and model provider, and every enabled external application.
Some modules remain local; others run internally or publish a public website or service.
Their deployment and rollback contracts stay module-owned.

## Rollout sequence

### 1. Define the Organization

Name its GitHub organization, repositories, teams, administrators and
offboarding owner. State what company data belongs there and what is excluded.

### 2. Approve the machine boundary

Document ownership, encryption, patching, endpoint monitoring, local backup,
remote wipe and incident handling. The recommended starting point is one
Organization per machine. A multi-Organization machine is an accepted
exception inside one shared trust domain, not hard tenant isolation. Keep its
provider sessions separately named and revocable.

### 3. Select the agent and model providers

Record the client, model provider, account type, authentication, data handling,
retention, telemetry and contractual owner. Repeat the review when the client
or account tier changes.

### 4. Enable only the required context

Begin with one bounded use case. Grant only the repositories and provider
scopes it needs, follow the [external application
standard](https://github.com/HumanAndMachines/Lazurio/blob/3c5bda5d54c5556a0e54f3c339d988aa911fda60/manual/external-app-integrations.md),
and test revocation.

### 5. Enforce publication

Set branch rules, checks and reviewers for repository changes. For messages,
infrastructure, billing, secrets and destructive actions, name the real
provider-side permission or confirmation. Where none exists, mark the rule as
process-only.

### 6. Exercise the rollout

Prove the normal task, a repository denial, the client's local filesystem
boundary, credential revocation, failed CI, rollback, offboarding and incident
escalation. Keep the evidence with the approval decision.

## Updates, rollback and ownership

Lazurio source, Organization configuration and modules are versioned
independently. Updates should advance clean primary checkouts, run their
declared checks and reach production from a reviewed exact commit. Rollback
returns only the affected source or deployment to a previously verified
revision; it must not revive revoked credentials or obsolete access.

Before production use, close the remaining deployment-specific questions:

- Who maintains machines, GitHub teams, dependencies and integrations?
- Where do services run, and which networks can reach them?
- Which logs exist, how long are they retained and who handles incidents?
- How are local data and credentials backed up, deleted and recovered?
- Which components are stable, experimental, optional or target-only?
- Who provides support, and what response time—if any—is promised?

Keep these answers with the deployment approval. Assign an owner to resolve
any missing answer before production use.
