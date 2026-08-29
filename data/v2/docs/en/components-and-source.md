---
title: Components and source
description: Map Lazurio product surfaces and working concepts to their public source, runtime owner and license boundary.
stableId: lazurio-doc-components-and-source
summary: Find the public implementation of CLI/Core, Launchpad, Organization contracts, Guide, agent skills, Resident profiles and documentation.
updatedAt: "2026-08-29"
reviewedAt: "2026-08-29"
reviewOwner: Matej Suchanek
sourceRefs:
  - lazurio-readme
  - lazurio-architecture
  - lazurio-map
  - lazurio-cli
  - lazurio-launchpad
  - lazurio-license
audience:
  - builder
  - agent
  - it-admin
  - decision-maker
---

Lazurio is assembled from public source components and standard developer
infrastructure. The table distinguishes code you can inspect from a hosted
product surface and from an Organization-owned repository.

| Component | Responsibility | Public source | Runtime or data owner |
| --- | --- | --- | --- |
| CLI/Core v0 | Context, Doctor, update, installation and headless lifecycle contracts | [`lazurio/`](https://github.com/HumanAndMachines/Lazurio/tree/08d21803d4d4011304e1181ecf02ab9c5bfbad58/lazurio) | Current Source Root |
| Launchpad | Builder UI, discovery, local development lifecycle and status | [`launchpad/`](https://github.com/HumanAndMachines/Lazurio/tree/08d21803d4d4011304e1181ecf02ab9c5bfbad58/launchpad) | One Lazurio Root on a Machine |
| Organization contracts | Organization identity, repository slots, Teams and manifest schemas | [schema and Core](https://github.com/HumanAndMachines/Lazurio/tree/08d21803d4d4011304e1181ecf02ab9c5bfbad58/lazurio/core) | Each Organization repository |
| Guide | Non-technical onboarding for human and AI cooperation | [`guide/`](https://github.com/HumanAndMachines/Lazurio/tree/08d21803d4d4011304e1181ecf02ab9c5bfbad58/guide) | Shared Lazurio source |
| Agent skills | Reusable operating procedures for Task Agents, Buddy and AI Colleagues | [`.agents/skills/`](https://github.com/HumanAndMachines/Lazurio/tree/08d21803d4d4011304e1181ecf02ab9c5bfbad58/.agents/skills) | Installed source plus scoped Organization rules |
| Resident profiles | Deterministic build and lifecycle for selected long-lived installations | [`distribution/`](https://github.com/HumanAndMachines/Lazurio/tree/08d21803d4d4011304e1181ecf02ab9c5bfbad58/distribution) | The concrete Resident Machine |
| Documentation | Technical public explanation and agent-readable indexes | [`Lazurio/documentation`](https://github.com/Lazurio/documentation) | Documentation repository and Cloudflare Pages |
| Dashboard | Accounts, Organization administration, Marketplace, people, Machines, hosting and visibility | Separately developed product surface | Lazurio account and deployment |
| Workspace Modules | Everyday Organization applications and capabilities | Their own repositories | The owning Organization |
| Productionspace repositories | Org-level systems with independent release contracts | Their own repositories | The owning Organization |

## License boundary

The public Lazurio repository currently uses
[FSL-1.1-Apache-2.0](https://github.com/HumanAndMachines/Lazurio/blob/08d21803d4d4011304e1181ecf02ab9c5bfbad58/LICENSE.md).
That makes the current version source-available, not yet OSI open source.
Apache 2.0 applies to each version on the future-license date specified by the
license.

Module and production repositories can have different licenses. Inspect the
license in the exact repository before reusing or redistributing it.

## Open-source foundations

The current developer workflow builds on:

- [Git](https://github.com/git/git) for source history, branches and reviewable
  Drafts;
- [GitHub CLI](https://github.com/cli/cli) for live provider identity and
  repository operations;
- [Bun](https://github.com/oven-sh/bun) for the current JavaScript runtime,
  package workflow and tests;
- [Model Context Protocol](https://github.com/modelcontextprotocol/modelcontextprotocol)
  as an open integration standard supported by several AI clients.

MCP support in a host application does **not** mean that the current Lazurio
release ships a Lazurio MCP server. The present integration is filesystem,
CLI, browser and repository based. See the [AI app support
matrix](/en/use-with-ai-apps/) before promising a native integration.

## What is intentionally not centralized

Lazurio does not copy all Module code, Organization knowledge, provider data or
Personalspace into its public source. Public source defines common contracts
and tools. Each Organization and Module retains its natural owner, access
boundary and release process.
