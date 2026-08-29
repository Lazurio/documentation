---
title: Frequently asked questions
description: Direct answers to the first questions people and IT administrators ask about Lazurio.
stableId: lazurio-doc-faq
summary: Answers about what Lazurio is, whether it replaces Copilot, data access, local deployment, approval, audits, and machine-readable documentation.
updatedAt: "2026-08-29"
reviewedAt: "2026-08-29"
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
agents, repositories, modules and connected tools. A concrete installation
uses a selected execution client and model provider whose terms must be
reviewed separately.

</details>

<details>

<summary>Is Lazurio a finished, packaged product?</summary>

No. Lazurio is in active development. The current supported setup is a public
source checkout run with Git and Bun, and CLI v0 is experimental. A simple
packaged installation is target architecture. The current license is
FSL-1.1-Apache-2.0, which is source-available rather than an OSI open-source
license today. Internal use, non-commercial education or research, and
professional services for a compliant licensee are permitted. Permitted use
may include copying, modification and redistribution, with the license link
and copyright notices retained. A Competing Use means making the software
available to others in a commercial product or service that substitutes for
Lazurio or another product or service the licensor offers using it, or offers
the same or substantially similar functionality. Each published version becomes Apache
2.0 on its second anniversary, and the software is provided without warranty.

</details>

<details>

<summary>Does Lazurio replace Microsoft Copilot?</summary>

Not categorically. Microsoft Copilot is a natural fit for assistance grounded
in Microsoft 365. Lazurio focuses on governed, source-controlled work across
repositories and tools. Many organizations may use both. See the [full
comparison](/en/lazurio-vs-microsoft-copilot/).

</details>

<details>

<summary>Can a Task Agent access everything the user can?</summary>

Do not assume that, but do not assume policy removes an existing capability
either. Effective access depends on the client sandbox, OS access, local
workspace and provider credentials. A prompt creates no new provider grant;
however, a token or readable file already available to the client can be used
by that process. Verify both allowed and denied paths.

</details>

<details>

<summary>Is all Lazurio data stored locally?</summary>

No universal claim is made. The documented root and working checkouts are
local, while Git repositories, model requests, external applications and
deployed modules may use provider infrastructure. Optional Dashboard, hosted
workspace and Resident/Buddy services add further stores when enabled. The
concrete data-flow and processor map belongs to the deployment acceptance
package.

</details>

<details>

<summary>How are secrets handled?</summary>

Real secrets stay outside Git in scoped, ignored custody paths or an approved
provider store. Tracked files contain only schemas, required variable names and
instructions. Read the public [secret custody standard](https://github.com/HumanAndMachines/Lazurio/blob/08d21803d4d4011304e1181ecf02ab9c5bfbad58/manual/security/local-secret-custody.md).

</details>

<details>

<summary>What stops a Task Agent from publishing a bad change?</summary>

The operating model distinguishes an editable draft from publication. GitHub
branch rules, required checks, reviews and merge permissions can mechanically
protect a branch. A Task Agent may still push a review branch when it has write
access, and that already moves source to GitHub. Email, chat and other providers
need their own technical permissions; explicit authorization is a process
control where the provider or client exposes no equivalent interlock.

</details>

<details>

<summary>Are Organizations isolated from each other on one Machine?</summary>

They are separate repository and GitHub access boundaries, but they are not
hard OS tenants. One Machine is one trust domain. Another process with the same
effective filesystem access may be able to read more than the active
Organization. Use separate machines or equivalent infrastructure where that
risk is unacceptable.

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
Local file reads and prompts are not automatically logged by Lazurio.

</details>

<details>

<summary>Does the documentation have an MCP server?</summary>

No. Agents can use [`llms.txt`](/llms.txt) and the structured
[`content-index.json`](/content-index.json) today. A later MCP server could be
a read-only view over that same public content, but it is not part of the
current release and must not be presented as available.

</details>

<details>

<summary>Where should I start an IT review?</summary>

Use the [ten-minute IT briefing](/en/it-administrators/), then review [data
access and security](/en/data-access-security/) and [deployment and
operations](/en/deployment-operations/) against the proposed configuration.

</details>
