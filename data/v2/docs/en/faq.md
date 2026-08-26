---
title: Frequently asked questions
description: Direct answers to the first questions people and IT administrators ask about Lazurio.
stableId: lazurio-doc-faq
summary: Answers about what Lazurio is, whether it replaces Copilot, data access, local deployment, approval, audits, and the future MCP server.
updatedAt: "2026-08-26"
reviewedAt: "2026-08-26"
reviewOwner: Matej Suchanek
secondReviewOwner: Pablo AI
trustCritical: true
sourceRefs:
  - lazurio-readme
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
agents, repositories, modules and connected tools. A concrete installation
uses a selected execution client and model provider whose terms must be
reviewed separately.

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

Do not assume that. Effective access depends on the session, tool, local
workspace and provider credential. The design principle is that a task agent
does not gain rights from a prompt and should receive only the context needed
for the task. Your deployment must verify the actual grants and denied paths.

</details>

<details>

<summary>Is all Lazurio data stored locally?</summary>

No universal claim is made. The documented root and working checkouts are
local, while Git repositories, model requests, external applications and
deployed modules may use provider infrastructure. The concrete data-flow map
belongs to the deployment acceptance package.

</details>

<details>

<summary>How are secrets handled?</summary>

Real secrets stay outside Git in scoped, ignored custody paths or an approved
provider store. Tracked files contain only schemas, required variable names and
instructions. Read the public [secret custody standard](https://github.com/HumanAndMachines/Lazurio/blob/69c53ec342124aef48cb9d04fd109f9886ec242e/manual/security/local-secret-custody.md).

</details>

<details>

<summary>What stops an agent from publishing a bad change?</summary>

The operating model distinguishes an editable draft from publication.
Repository permissions, branch rules, required checks and reviews enforce Git
publication; other systems need equivalent provider-side permissions and
explicit authorization. These controls reduce risk but do not make human
approval infallible.

</details>

<details>

<summary>Is Lazurio certified for a particular compliance framework?</summary>

This documentation makes no certification or universal compliance claim.
Organizations must evaluate their actual deployment, providers, controls and
legal obligations.

</details>

<details>

<summary>Is there an audit trail?</summary>

Git changes can be tied to commits, pull requests, reviews and deployments.
Provider and endpoint actions require their own logs. Ask for an audit map that
states which system records each relevant action and how long it is retained.

</details>

<details>

<summary>Does the documentation have an MCP server?</summary>

Not yet. Agents can use [`llms.txt`](/llms.txt) and the structured
[`content-index.json`](/content-index.json) today. A future MCP server is
planned as a read-only view over that same public content, not a second source.

</details>

<details>

<summary>Where should I start an IT review?</summary>

Use the [ten-minute IT briefing](/en/it-administrators/), then review [data
access and security](/en/data-access-security/) and [deployment and
operations](/en/deployment-operations/) against the proposed configuration.

</details>
