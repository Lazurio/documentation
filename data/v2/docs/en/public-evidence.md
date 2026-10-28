---
title: "Security and control evidence"
description: "Public sources behind product and security claims, and the limits of that evidence."
stableId: lazurio-doc-public-evidence
locale: en
summary: "Public sources behind product and security claims, and the limits of that evidence."
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
  - lazurio-external-apps-current
  - lazurio-platform-release-current
  - lazurio-platform-integrations-current
  - lazurio-platform-content-sync
  - lazurio-platform-vault-current
  - lazurio-platform-chatgpt-apps-main
audience:
  - it-admin
  - decision-maker
  - builder
  - agent
---

This page explains the public sources behind the current product description.
The baseline is **Platform v0.1.14, released on 27 October 2026**. A source
contract is evidence of a feature's design and implementation; it does not
prove that a particular deployment has enabled it or passed an independent audit.

## Product form and maturity

The [release](https://github.com/Lazurio/LazurioPlatform/releases/tag/v0.1.14)
contains an installable CLI and Apps. The [README](https://github.com/Lazurio/LazurioPlatform/blob/v0.1.14/README.md)
describes the installed product and the component that generates the Lazurio
Folder's agent instructions. Users do not need a Platform source checkout for
daily work. Optional account and managed-hosting services remain separate.
A versioned release alone does not promise certification, support or an SLA.

The current Platform is source-available under [Elastic License 2.0](https://github.com/Lazurio/LazurioPlatform/blob/v0.1.14/LICENSE),
not OSI open source. There is **no automatic two-year transition to Apache**.
Personal and internal business use is allowed subject to the license. Offering
a hosted or managed service to third parties that exposes a substantial set of
features requires a separate agreement. This is not a ban on every form of hosting.

The [licensing explanation](https://github.com/Lazurio/LazurioPlatform/blob/v0.1.14/docs/licensing.md)
distinguishes newly owned code, the browser contract's MIT exception, third-party
parts, templates and optional private services. Running the generator does not
relicense user-authored content. The older Lazurio source's FSL terms remain
historical terms for that code; they are not the current Platform license.
The licensor of the current Platform is Human and Machine s.r.o.

## Identity and authority

An agent uses the identity and tools available in its Environment. Instructions
do not create repository or provider permissions. Check the signed-in account
and its live access. GitHub controls repository capabilities; operating-system
and provider permissions control their respective resources.

The new account and Environment access model has its own rollout gates. An
approved access design is not proof that every older installation has migrated.

## Machine and Organization boundaries

Organization repositories and permissions separate company work. Folders on one
machine are not isolated operating-system environments: a process with the same
filesystem access may read across them. Use separate machines or equivalent
infrastructure where compromise must not cross company boundaries.

Personal Workspace belongs to one user in a Personal Environment. Organization
content needed by colleagues belongs in the authorized Organization source.
A folder name alone is not a cryptographic access control.

## Draft and publication

An agent prepares editable work. An authorized user decides whether to publish
it. A branch pushed for review already transfers its source to GitHub. Branch
rules, checks, reviews and merge permissions can protect the main branch.
Provider drafts can also transfer data before an email is sent or a change is
made effective. Verify each provider's actual controls.

## External applications and credentials

The [released integration contract](https://github.com/Lazurio/LazurioPlatform/blob/v0.1.14/docs/integrations.md)
provides one catalog under Apps → Integrations. Agents read the same configured
routes with `lazurio integrations list --json`. Users connect apps on their
cards; agents do not initiate connections. Custom MCP servers belong in Executor
on the user's explicit instruction. Settings → Tools still manages CLI tools.

Executor can pause certain calls, including explicitly destructive MCP tools
and API writes. In its default `model` mode the **agent resumes the call**;
this is not a universal human-approval gate. The typed management API and other
CLI paths are not automatically covered. See [integration controls](/en/environment-app-connections/).

Composio is permitted only under the Environment's applicable policy. It holds
credentials and processes call content. Account and project boundaries, log
retention and Zero Data Retention conditions are explained on the same page.
A separate machine alone does not establish a separate Composio account boundary.

The [current integration standard](https://github.com/HumanAndMachines/Lazurio/blob/b41fc7d01f748ebc4724535ce811ffceded38fdb/manual/external-app-integrations.md)
also includes the approved 27 October policy for ChatGPT apps. Its technical
implementation is newer than v0.1.14; policy and installed enforcement must be
distinguished. A pre-existing connector is not a blanket exception inside an Environment.

## Local and hosted services

Apps and runnable modules may use local loopback listeners. Loopback binding
does not authenticate the caller. Hosted entry, network reachability and
account permissions need deployment-specific verification; Tailscale applies
to private tailnet deployments, not every possible Environment.

The released vault model gives supported Environments a dedicated vault for
agents; Organization human vaults and personal accounts have separate boundaries.
Use Apps → Vault and the Environment's supported secret-request flow rather
than a chat. A vault does not remove host-administrator, backup or incident risks.

## What this evidence does not prove

- A customer's controls are enabled or independently certified.
- Every model provider uses the same training, retention or regional terms.
- Every local read, model request or external API call is logged by Lazurio.
- Organization folders on one machine are isolated tenants.
- An agent-resumable pause is equivalent to the user's publication instruction.

Use the [IT briefing](/en/it-administrators/) to decide what the proposed
deployment still has to demonstrate.
