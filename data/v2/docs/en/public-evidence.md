---
title: Lazurio control evidence in English
description: Reviewed English summaries of the public Lazurio source used for product, security and operational claims.
stableId: lazurio-doc-public-evidence
summary: Verify the current product form, trust boundaries, authority model, integrations, hosted surfaces and evidence limits against one pinned public source revision.
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
  - builder
  - agent
---

This page is the reviewed English evidence layer for Lazurio source revision
[`2bc6784226ffc629df2ecf16dbd0693994c3a970`](https://github.com/HumanAndMachines/Lazurio/tree/2bc6784226ffc629df2ecf16dbd0693994c3a970).
The canonical source documents are currently written in Czech. The summaries
below make the security-relevant meaning inspectable to English readers without
pretending that a translation is independent assurance.

## Product form and maturity

The [README](https://github.com/HumanAndMachines/Lazurio/blob/2bc6784226ffc629df2ecf16dbd0693994c3a970/README.md)
describes Lazurio as a local working system and coordination layer, not an AI
model or shared cloud data store. It explicitly marks the project as active
development. Today developers run it from a source checkout using Git and Bun;
CLI v0 is experimental, while a simple packaged installation and generated
non-Git root are target architecture. The repository uses
FSL-1.1-Apache-2.0, which is source-available today and grants an Apache 2.0
future license.

## Identity and authority

The [collaboration model](https://github.com/HumanAndMachines/Lazurio/blob/2bc6784226ffc629df2ecf16dbd0693994c3a970/AGENTS.md)
defines a principal as the person or longer-lived AI identity for whom work is
done. A task agent is a temporary execution session and owns no independent
rights. A prompt cannot grant a provider or repository capability; live
GitHub, OS and provider permissions remain authoritative.

This does not mean the task agent has no capability. A credential, repository
or file already exposed to its process can be used according to the execution
client and OS boundary. Lazurio policy narrows intended use; the selected
client sandbox and provider controls determine technical enforcement.

## Machine and Organization boundaries

The [README](https://github.com/HumanAndMachines/Lazurio/blob/2bc6784226ffc629df2ecf16dbd0693994c3a970/README.md)
and [architecture](https://github.com/HumanAndMachines/Lazurio/blob/2bc6784226ffc629df2ecf16dbd0693994c3a970/ARCHITECTURE.md)
state that one machine is one trust domain. An Organization represents one
company, one GitHub organization and a separate repository/access boundary.
Multiple Organizations can coexist on one endpoint, but their folders are not
hard OS tenants. A process with the same effective filesystem access can cross
that directory boundary. Stronger isolation requires separate machines or
equivalent infrastructure.

Personalspace is private to one principal and is not a shared Organization
store. This is an access and process boundary; it should not be described as
cryptographic isolation unless a deployment separately provides that control.

## Draft and publication

The [collaboration model](https://github.com/HumanAndMachines/Lazurio/blob/2bc6784226ffc629df2ecf16dbd0693994c3a970/AGENTS.md)
defines a Draft as reversible, editable work and Publication as making a result
externally effective or difficult to reverse. Agents may create branches,
commits and pull requests when their repository grant permits it. Protected
branch publication can be mechanically controlled by GitHub permissions,
required checks and reviews. Non-Git publication—such as sending a message or
changing a provider—depends on the actual provider and client controls; an
explicit-authorization rule is process-only where no technical interlock
exists.

## External applications and credentials

The [integration standard](https://github.com/HumanAndMachines/Lazurio/blob/2bc6784226ffc629df2ecf16dbd0693994c3a970/manual/external-app-integrations.md)
prefers an official machine-local MCP server, then an official CLI, then a
reviewed pinned implementation, with browser interaction as fallback. Each
machine should use separately revocable provider credentials. An OAuth token is
a machine/session capability, and MCP approval settings do not automatically
constrain CLI or shell access.

The [secret custody standard](https://github.com/HumanAndMachines/Lazurio/blob/2bc6784226ffc629df2ecf16dbd0693994c3a970/manual/security/local-secret-custody.md)
keeps real credentials outside Git in ignored, scoped custody paths or approved
provider stores. It does not claim that Lazurio itself encrypts the endpoint,
rotates every secret or replaces backup and incident controls.

## Local and hosted surfaces

The source checkout contains the local root, Launchpad, CLI/Core, Doctor and
mounted Organization modules. The broader architecture also defines separately
deployed or optional surfaces including Dashboard, hosted team workspaces and
per-owner Resident/Buddy services with possible communication and memory
stores. They are not enabled by every installation. A deployment that uses one
must list it as a separate service with its own operator, identity, storage,
network path, processors, logs, retention, backup and deletion controls.

## What this evidence does not prove

- It does not certify a customer deployment or prove that its controls are
  enabled.
- It does not create a universal retention, training or regional-processing
  claim for model providers.
- It does not log every local file read, prompt or API call.
- It does not turn Organization folders on one machine into hard tenants.
- It does not make process approval equivalent to a provider-enforced gate.

Use the [IT briefing](/en/it-administrators/) to turn this evidence into a
deployment-specific approval package.
