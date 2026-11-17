---
title: "Deployment and operations"
description: "Plan the deployment, assign owners and test recovery and access revocation."
stableId: lazurio-doc-deployment-operations
locale: en
summary: "Plan the deployment, assign owners and test recovery and access revocation."
updatedAt: "2026-11-17"
reviewedAt: "2026-09-15"
reviewOwner: Matej Suchanek
secondReviewOwner: Pablo AI
trustCritical: true
sourceRefs:
  - lazurio-user-roles-current
  - lazurio-readme
  - lazurio-platform-readme-release
  - lazurio-architecture
  - lazurio-collaboration-model
  - lazurio-external-apps
  - lazurio-external-apps-current
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

![The user's machine is one trust domain holding the Lazurio root, Organization checkouts, the task agent client and local integrations. Data leaves it for GitHub, the selected model provider, approved application providers and optional hosted services.](/diagrams/lazurio-data-flow.svg)

## Current and target state

The following status matches Lazurio source revision
[`3c5bda5`](https://github.com/HumanAndMachines/Lazurio/tree/3c5bda5d54c5556a0e54f3c339d988aa911fda60),
not automatically the latest product version.

The current product differs from that revision: Lazurio Platform is installed
as versioned releases; this page was checked against v0.1.21 of 13 November 2026.
An installed release contains the CLI and Apps in one program and generates
the Lazurio Folder; later updates arrive as new releases
([README](https://github.com/Lazurio/LazurioPlatform/blob/8c11468b8f7d90c91ea3a6c618af4b38563c3a56/README.md)).
For a current bill of materials, list the installed release, not this table.

| Surface | Status | Operational meaning |
| --- | --- | --- |
| Source checkout with Git and Bun | Supported | The operator owns repository access, dependencies and updates. |
| Launchpad, Guide and Doctor | Available | These are local tools for finding applications, reading guidance, running applications and checking the installation. Loopback listeners are not caller authentication. |
| CLI v0 | Experimental | Pin versions and test any production automation that depends on it. |
| Packaged CLI and generated non-Git root | Target at that revision | They were not part of an installation at that revision. The released Lazurio Platform now installs a packaged CLI and generates the Lazurio Folder; list the installed release in a current bill of materials. |
| Dashboard, hosted workspace and Resident/Buddy | Optional, separately deployed | Inventory each enabled service with its own identity, network, storage and operating owner. |

Assign an owner to each part of the installation: the user's machine,
the local Lazurio root, Organization repositories, modules, GitHub, the
agent client, model provider and each connected application.
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
standard](https://github.com/HumanAndMachines/Lazurio/blob/46867061e6d0abf7781f9f9d0b93791be32da4d9/manual/external-app-integrations.md),
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
