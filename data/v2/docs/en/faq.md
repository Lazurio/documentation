---
title: "Frequently asked questions"
description: "Answers about the product, access, data and approval of results."
stableId: lazurio-doc-faq
locale: en
summary: "Answers about the product, access, data and approval of results."
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
  - lazurio-external-apps
  - lazurio-secret-custody
  - microsoft-copilot-architecture
  - lazurio-platform-release-current
  - lazurio-platform-vault-current
audience:
  - it-admin
  - decision-maker
  - builder
  - agent
---

<details>

<summary>Is Lazurio an AI model?</summary>

No. Lazurio is the working environment for company materials and applications.
The selected AI client and model provider supply the AI. Review their pricing,
security and data terms separately.

</details>

<details>

<summary>Is Lazurio a finished, packaged product?</summary>

Yes. The current Platform is distributed as installable releases. Version
v0.1.14 was published on 27 October 2026 and includes CLI, Apps and generated
agent instructions. A released package does not imply a universal SLA or a
certified deployment. The Platform uses [Elastic License 2.0](https://github.com/Lazurio/LazurioPlatform/blob/v0.1.14/LICENSE),
with separate terms for legacy code, third-party parts and optional services.
See the [license and product evidence](/en/public-evidence/#product-form-and-maturity).

</details>

<details>

<summary>Does Lazurio replace Microsoft Copilot?</summary>

The tools serve different needs. Microsoft Copilot mainly assists with work
in Microsoft 365. Lazurio focuses on reviewing and approving versioned work
across repositories and tools. An Organization may use both. See the [full
comparison](/en/lazurio-vs-microsoft-copilot/).

</details>

<details>

<summary>Can an agent access everything the user can?</summary>

It depends on the setup. An agent may use files, accounts and tools available
to its running process. OS permissions, the AI tool's sandbox, the workspace
and service credentials determine access. A prompt neither grants new rights
nor removes existing ones. Test what should be allowed and what should be denied.

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

Real secrets stay outside Git. In a supported configured Environment, use Apps → Vault and its secret-request page; do not put values in chat. Other approved custody paths depend on the deployment. Tracked files contain only schemas, required variable names and
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

They are separate GitHub and repository boundaries, not isolated operating-system environments. One
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
