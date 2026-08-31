---
title: Security and control evidence
description: The public source behind Lazurio's product, security and operational claims.
stableId: lazurio-doc-public-evidence
summary: See the current product form, trust boundaries, authority model, integrations, hosted surfaces and the limits of what the public source can prove.
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
  - builder
  - agent
---

This page connects the claims in this documentation to Lazurio source revision
[`3c5bda5d54c5556a0e54f3c339d988aa911fda60`](https://github.com/HumanAndMachines/Lazurio/tree/3c5bda5d54c5556a0e54f3c339d988aa911fda60).
The canonical source documents are currently written in Czech. These English
summaries make their security-relevant meaning accessible; they are a guide to
the source, not independent assurance.

## Product form and maturity

The [README](https://github.com/HumanAndMachines/Lazurio/blob/3c5bda5d54c5556a0e54f3c339d988aa911fda60/README.md)
describes Lazurio as a local working system and coordination layer, not an AI
model or shared cloud data store. It explicitly marks the project as active
development. Today developers run it from a source checkout using Git and Bun;
CLI v0 is experimental, while a simple packaged installation and generated
non-Git root are target architecture. The repository uses
[FSL-1.1-Apache-2.0](https://github.com/HumanAndMachines/Lazurio/blob/3c5bda5d54c5556a0e54f3c339d988aa911fda60/LICENSE.md).
Internal use, non-commercial education or research, and professional services
for a compliant licensee are permitted. Permitted use may include copying,
modification and redistribution, with the license link and copyright notices
retained. A Competing Use means making the software available to others in a
commercial product or service that substitutes for Lazurio or another product
or service the licensor offers using it, or offers the same or substantially
similar functionality. Each published version becomes available under Apache 2.0 on
its second anniversary, and the software is provided without warranty.
The license notice names HumanAndMachine s.r.o. as copyright holder. It does
not itself promise hosting, support or a service level for a concrete rollout.

## Identity and authority

The [collaboration model](https://github.com/HumanAndMachines/Lazurio/blob/3c5bda5d54c5556a0e54f3c339d988aa911fda60/AGENTS.md)
defines a principal as the person or longer-lived AI identity for whom work is
done. A task agent is a temporary execution session and owns no independent
rights. A prompt cannot grant a provider or repository capability; live
GitHub, OS and provider permissions remain authoritative.

This does not mean the task agent has no capability. A credential, repository
or file already exposed to its process can be used according to the execution
client and OS boundary. Lazurio policy narrows intended use; the selected
client sandbox and provider controls determine technical enforcement.

## Machine and Organization boundaries

The [README](https://github.com/HumanAndMachines/Lazurio/blob/3c5bda5d54c5556a0e54f3c339d988aa911fda60/README.md)
and [architecture](https://github.com/HumanAndMachines/Lazurio/blob/3c5bda5d54c5556a0e54f3c339d988aa911fda60/ARCHITECTURE.md)
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

The [collaboration model](https://github.com/HumanAndMachines/Lazurio/blob/3c5bda5d54c5556a0e54f3c339d988aa911fda60/AGENTS.md)
defines a Draft as reversible, editable work and Publication as making a result
externally effective or difficult to reverse. Agents may create branches,
commits and pull requests when their repository grant permits it. Protected
branch publication can be mechanically controlled by GitHub permissions,
required checks and reviews. Non-Git publication—such as sending a message or
changing a provider—depends on the actual provider and client controls; an
explicit-authorization rule is process-only where no technical interlock
exists.

## External applications and credentials

The [integration standard](https://github.com/HumanAndMachines/Lazurio/blob/3c5bda5d54c5556a0e54f3c339d988aa911fda60/manual/external-app-integrations.md)
prefers an official machine-local MCP server, then an official CLI, then a
reviewed pinned implementation, with browser interaction as fallback. Each
machine should use separately revocable provider credentials. New ChatGPT or
claude.ai connectors and shared hosted brokers are outside the standard;
an already deployed connector can be recorded as a transition state.
Provider-operated remote MCP remains acceptable when configuration and token
custody are per-machine. The default scope for a workflow that needs writes is
read+write, while read-only is optional tightening. An OAuth token is a
machine/session capability, and MCP approval settings do not automatically
constrain CLI or shell access.

The [secret custody standard](https://github.com/HumanAndMachines/Lazurio/blob/3c5bda5d54c5556a0e54f3c339d988aa911fda60/manual/security/local-secret-custody.md)
keeps real credentials outside Git in ignored, scoped custody paths or approved
provider stores. It does not claim that Lazurio itself encrypts the endpoint,
rotates every secret or replaces backup and incident controls.

## Local and hosted surfaces

The source checkout contains the local root, Launchpad, Guide, CLI/Core, Doctor
and mounted Organization modules. Launchpad and runnable modules use local
loopback HTTP listeners with dynamically selected or module-owned port leases.
Loopback binding is not caller authentication: other processes on the endpoint
may still reach those surfaces. Guide is a pedagogical application with local
file-writing flows, not a security control. Current Doctor tooling expects Git,
GitHub CLI and Codex CLI; a rollout using another agent client must test its
actual Doctor and repair path rather than assuming equivalence.
The checkout also ships bridge and provisioning code for separately deployed
profiles; source presence does not mean activation. Optional architecture
includes Dashboard, hosted team workspaces, and per-owner Resident/Buddy
services that may use Zulip, GBrain, Tailscale or another private access layer,
Hermes or another operator-chosen OpenAI-compatible agent runtime, and T3 Code
or another agent CLI. A deployment that enables one must list it as
a separate service with its own operator, identity, storage, network path,
processors, logs, retention, backup and deletion controls.

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
