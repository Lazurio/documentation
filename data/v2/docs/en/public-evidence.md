---
title: "Security and control evidence"
description: "Public sources behind product and security claims, and the limits of that evidence."
stableId: lazurio-doc-public-evidence
locale: en
summary: "Public sources behind product and security claims, and the limits of that evidence."
updatedAt: "2026-10-29"
reviewedAt: "2026-10-24"
reviewOwner: Matej Suchanek
secondReviewOwner: Pablo AI
trustCritical: true
sourceRefs:
  - lazurio-user-roles-current
  - lazurio-external-apps-current
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

The product and architecture sections below use Lazurio source revision
[`3c5bda5d54c5556a0e54f3c339d988aa911fda60`](https://github.com/HumanAndMachines/Lazurio/tree/3c5bda5d54c5556a0e54f3c339d988aa911fda60).
The source documents at that revision are written in Czech. The summaries
below explain their security implications and link to the originals. They are
not an independent audit or confirmation that a particular installation is safe.

The product description below applies to that revision, not automatically to
the latest release. Compare it with the version you actually deploy.

## Product form and maturity

The [README](https://github.com/HumanAndMachines/Lazurio/blob/3c5bda5d54c5556a0e54f3c339d988aa911fda60/README.md)
describes Lazurio as a local working system and coordination layer, not an AI
model or shared cloud data store. It explicitly marks the project as active
development. At that revision, developers run it from a source checkout using Git and Bun;
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

The current [user and agent terminology](https://github.com/Lazurio/LazurioPlatform/blob/4681f49720fa7a6a7ceaac6ec07f8bd05d4e2193/docs/decisions.md#f30--the-operator-replaces-the-principal)
names the user as the person agents work with and for. The user has the final
say; Buddy represents that user within their permissions and mandate. A task agent is a temporary work session with no permissions of its own.
Access comes from GitHub, the operating system and connected services.
A prompt cannot grant it.

The agent may use credentials and files available to its process. Lazurio's
rules specify when that use is permitted. The operating system, AI tool's
sandbox and provider controls enforce technical restrictions.

## Machine and Organization boundaries

The [README](https://github.com/HumanAndMachines/Lazurio/blob/3c5bda5d54c5556a0e54f3c339d988aa911fda60/README.md)
and [architecture](https://github.com/HumanAndMachines/Lazurio/blob/3c5bda5d54c5556a0e54f3c339d988aa911fda60/ARCHITECTURE.md)
state that one machine is one trust domain. An Organization represents one
company, one GitHub organization and a separate repository/access boundary.
Multiple Organizations can coexist on one endpoint, but their folders are not
isolated operating-system environments. A process with the same effective filesystem access can cross
that directory boundary. Stronger isolation requires separate machines or
equivalent infrastructure.

Personalspace is private to one user and is not a shared Organization
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
explicit-authorization rule is process-only where no technical restriction
exists.

## External applications and credentials

This section uses the newer [integration standard](https://github.com/HumanAndMachines/Lazurio/blob/6416d27786296583baf08b75526cff225e2673f7/manual/external-app-integrations.md),
checked on 24 October 2026. For new connections it prefers official MCP,
official CLI, permitted Composio, a reviewed open-source implementation and
browser fallback. Executor manages Environment MCP servers. For existing
connections, the app's tool takes precedence over Executor and Composio.

Composio is the sole approved exception to the shared-broker ban and must be
permitted for the Environment. It holds tokens and processes call content;
connections belong to the Composio account and organization, not automatically
to one machine. The standard excludes new cloud connectors, other shared
brokers, and scraping or browser-session servers. An existing connector may
remain as a transition state.

Write access is not approval to publish. An OAuth token can be used by a
process that can reach it; MCP approvals do not automatically constrain CLI
or shell access. See [Connecting an Environment to apps](/en/environment-app-connections/)
for account scope and open questions.

The [secret custody standard](https://github.com/HumanAndMachines/Lazurio/blob/3c5bda5d54c5556a0e54f3c339d988aa911fda60/manual/security/local-secret-custody.md)
keeps real credentials outside Git. It does not claim that Lazurio itself
encrypts the endpoint, rotates every secret or replaces backup and incident
controls.

## Local and hosted services

The source checkout contains the local root, Launchpad, Guide, CLI/Core, Doctor
and mounted Organization modules. Launchpad and runnable modules use local
loopback HTTP listeners with dynamically selected or module-owned port leases.
Loopback binding is not caller authentication: other processes on the endpoint
may still reach those services. The local Guide included in that Lazurio revision
also writes files; it is not this public documentation website or a security
control. Doctor tooling at the described revision expects Git,
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
