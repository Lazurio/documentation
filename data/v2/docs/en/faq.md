---
title: Frequently asked questions
description: Direct answers to the first questions people and IT administrators ask about Lazurio.
stableId: lazurio-doc-faq
locale: en
summary: Answers about what Lazurio is, whether it replaces Copilot, data access, local deployment, approval, audits, and the future MCP server.
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
  - microsoft-copilot-architecture
audience:
  - it-admin
  - decision-maker
  - builder
  - agent
---

<details>

<summary>Is Lazurio an AI model?</summary>

No. Lazurio is the working environment and operating model around people,
agents, repositories, modules and approved tools. Each installation uses a
selected agent client and model provider whose terms must be reviewed
separately.

</details>

<details>

<summary>Is Lazurio a finished, packaged product?</summary>

No. Lazurio is in active development. The supported setup is a public source
checkout using Git and Bun, and CLI v0 is experimental. A packaged installation
is a future target. Lazurio is currently source-available under
[FSL-1.1-Apache-2.0](https://github.com/HumanAndMachines/Lazurio/blob/3c5bda5d54c5556a0e54f3c339d988aa911fda60/LICENSE.md);
the [security and control evidence](/en/public-evidence/#product-form-and-maturity) explains
the license and maturity details.

</details>

<details>

<summary>Does Lazurio replace Microsoft Copilot?</summary>

Not categorically. Microsoft Copilot is a natural fit for assistance grounded
in Microsoft 365. Lazurio focuses on governed, source-controlled work across
repositories and tools. Many organizations may use both. See the [full
comparison](/en/lazurio-vs-microsoft-copilot/).

</details>

<details>

<summary>Can an agent access everything the user can?</summary>

Do not assume either extreme. A prompt creates no new grant, but policy text
does not remove access already available to the client process. Effective reach
depends on OS permissions, client sandboxing, workspace selection, repository
grants and provider credentials. Test both allowed and denied paths.

</details>

<details>

<summary>Is all Lazurio data stored locally?</summary>

No. Working checkouts are local, while Git repositories, model requests,
external applications and deployed modules may use provider infrastructure.
Optional hosted Lazurio services add further stores when enabled. The concrete
data-flow and processor map belongs to the deployment.

</details>

<details>

<summary>How are secrets handled?</summary>

Real secrets stay outside Git in scoped ignored paths or approved provider
stores. Tracked files contain only schemas, required variable names and
instructions. Endpoint, backup, rotation and incident controls must protect the
actual custody location.

</details>

<details>

<summary>What stops an agent from publishing a bad change?</summary>

For Git work, branch rules, required checks, reviews and merge permissions can
mechanically protect the target branch. Pushing a review branch is still a data
transfer to GitHub. Email, chat and other providers need their own permissions
and confirmations; explicit authorization is process-only where no provider
interlock exists.

</details>

<details>

<summary>Are Organizations isolated from each other on one machine?</summary>

They are separate GitHub and repository boundaries, not hard OS tenants. One
machine is one trust domain. Use separate machines or equivalent infrastructure
when a process compromise must not cross company boundaries.

</details>

<details>

<summary>Is Lazurio certified for a compliance framework?</summary>

No certification or universal compliance claim is made. Evaluate the actual
deployment, providers, controls and legal obligations.

</details>

<details>

<summary>Is there an audit trail?</summary>

Git changes can be tied to commits, pull requests, reviews and deployments.
Provider and endpoint actions need their own logs. Local file reads and model
requests are not automatically logged by Lazurio.

</details>

<details>

<summary>Does the documentation have an MCP server?</summary>

Not yet. Agents can use [/llms.txt](/llms.txt) and
[/content-index.json](/content-index.json) today. A future MCP server is
planned as a read-only view over the same content, not a second source.

</details>

<details>

<summary>Where should I start an IT review?</summary>

Start with the [ten-minute IT briefing](/en/it-administrators/), then test
[data access and security](/en/data-access-security/) and [deployment and
operations](/en/deployment-operations/) against the proposed configuration.

</details>
