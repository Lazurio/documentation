---
title: Deployment and operations
description: What is fixed by Lazurio and what must be decided for a concrete rollout.
stableId: lazurio-doc-deployment-operations
summary: Plan a Lazurio rollout across identity, devices, repositories, modules, integrations, logs, backup, updates, and offboarding.
updatedAt: "2026-08-29"
reviewedAt: "2026-08-29"
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

Lazurio is currently installed from a public source checkout and combines
local workspaces with independently owned modules. It does not ship one
universal hosted topology. A rollout record must define the actual devices,
repositories, clients, model providers, integrations and hosted services used
by the Organization.

![Lazurio deployment and data-flow overview](/diagrams/lazurio-data-flow.svg)

## Current and target state

| Surface | Status | IT implication |
| --- | --- | --- |
| Source checkout with Git and Bun | Available today and the current supported setup path | Treat it as developer-operated software with repository, dependency and update ownership. |
| Launchpad, Guide and Doctor | Available today for local discovery, guidance, application lifecycle and diagnostics | Launchpad and local web Modules use loopback listeners and Module-owned port leases. Loopback binding is not caller authentication: another process on the same endpoint may still reach those HTTP surfaces. Guide is a pedagogical application with local file-writing flows, not a security control. Inventory and protect these surfaces even though they are not bound to the public network. |
| Lazurio CLI v0 | Experimental and unstable | Do not build a production integration on undocumented CLI syntax without version pinning and acceptance tests. |
| Packaged CLI and generated non-Git root | Target architecture | Do not include it in a current bill of materials or support assumption. |
| Dashboard | Separately developed hosted/admin surface | Include it only when the deployment actually uses it; document its operator, identity, storage and logs. |
| Resident/Buddy VPS and hosted team workspace | Optional/specialized hosted profiles | Each enabled service is a separate processing and network surface, not part of the default local-only claim. |

## Components to account for

1. **Principal Machine:** the endpoint where a Colleague or AI Colleague works.
2. **Lazurio root:** the local Guide, Launchpad, CLI/Core and Doctor above
   authorized Organization checkouts. Launchpad and runnable modules expose
   loopback HTTP listeners on dynamically selected or Module-owned ports.
3. **Organization repository:** the company boundary, configuration and
   shared sources of truth.
4. **Workspace modules:** applications with their own runtime, dependencies,
   checks and deployment target.
5. **GitHub:** repository identity, team grants, review history and branch
   enforcement in the documented default model.
6. **Execution client and model provider:** for example Codex, Cursor, Claude
   Code or another approved client, plus the model service it calls. Their
   terms govern the selected task context sent to them. Current root tooling
   checks for Git, GitHub CLI and Codex CLI in `PATH`; a missing Codex command
   is a Doctor warning and some repair guidance assumes Codex. A non-Codex
   rollout must test its chosen client against actual Doctor and repair flows.
7. **External applications:** individually enabled MCP servers, CLIs or
   browser workflows with provider-side scopes.
8. **Optional hosted services:** Dashboard; a hosted team workspace with T3
   Code or another agent CLI; and Resident/Buddy infrastructure that may use
   Zulip, GBrain and Tailscale or another approved private access layer.

Not every Module must be deployed to a public server. Some are local tools,
some are internal services, and some publish a public surface such as this
documentation site. Module ownership keeps those choices explicit.

## Rollout sequence

### 1. Define the Organization

Name the GitHub organization, repositories, teams, administrators and
offboarding owner. Decide what company data belongs there and what is excluded.

### 2. Approve an endpoint baseline

Document supported operating systems, device ownership, encryption, screen
lock, patching, endpoint monitoring, local backup, remote wipe and incident
handling. A Principal-owned Machine still needs company-grade controls when it
processes company data. One Machine is one trust domain; use a separate Machine
or equivalent infrastructure when mounted Organizations must not share an OS,
disk or agent process.

A Root can mount multiple authorized Organizations on one Machine. This is a
repository and provider-access separation inside one shared trust domain, not
hard tenant isolation. Keep provider sessions separately named and revocable,
and explicitly accept the cross-Organization endpoint risk.

### 3. Select the execution provider

Record the client, model provider, account type, authentication, data handling,
retention, telemetry and contractual owner. Repeat this review when the client
or account tier changes.

### 4. Enable the minimum repositories and integrations

Start with one bounded use case. Give the Principal only the repositories and
provider scopes it needs. Follow the public [external application
standard](https://github.com/HumanAndMachines/Lazurio/blob/08d21803d4d4011304e1181ecf02ab9c5bfbad58/manual/external-app-integrations.md)
and test revocation.

### 5. Enforce publication rules

Set branch protection, required checks and reviewers appropriate to the
repository. For messages, infrastructure, billing, secrets and destructive
provider actions, name the actual provider-side permission or confirmation.
Where no technical interlock exists, record the rule as process-only.

### 6. Run an acceptance exercise

Prove the normal task, GitHub-side access denial, the chosen client's local
filesystem boundary, credential revocation, failed CI, rollback, offboarding
and incident escalation. Keep evidence with the rollout decision.

## Updating and rollback

Lazurio source, Organization configuration and each Module are versioned
independently. Updates should fast-forward clean primary checkouts, run the
declared doctor/check gates and enter production through a reviewed exact
commit. Rollback means returning the affected repository or deployment to a
previous verified revision; it must not silently restore revoked credentials
or superseded access.

## Operating questions that remain deployment-specific

- Who maintains endpoints, GitHub teams and external integrations?
- Which execution client, model provider, account terms and subprocessors apply?
- Where do Module services run, and which networks can reach them?
- Which logs exist and how long are they retained?
- How are local data and credentials backed up, deleted and recovered?
- Which components are source-checkout, hosted, experimental or target-only?
- Who provides support, and what response time is promised, if any?

These answers should be part of the customer-specific acceptance package.
This public documentation intentionally does not invent them.
