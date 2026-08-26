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

## Is Lazurio an AI model?

No. Lazurio is the working environment and operating model around people,
agents, repositories, modules and connected tools. A concrete installation
uses a selected execution client and model provider whose terms must be
reviewed separately.

## Does Lazurio replace Microsoft Copilot?

Not categorically. Microsoft Copilot is a natural fit for assistance grounded
in Microsoft 365. Lazurio focuses on governed, source-controlled work across
repositories and tools. Many organizations may use both. See the [full
comparison](/en/lazurio-vs-microsoft-copilot/).

## Can an agent access everything the user can?

Do not assume that. Effective access depends on the session, tool, local
workspace and provider credential. The design principle is that a task agent
does not gain rights from a prompt and should receive only the context needed
for the task. Your deployment must verify the actual grants and denied paths.

## Is all Lazurio data stored locally?

No universal claim is made. The documented root and working checkouts are
local, while Git repositories, model requests, external applications and
deployed modules may use provider infrastructure. The concrete data-flow map
belongs to the deployment acceptance package.

## How are secrets handled?

Real secrets stay outside Git in scoped, ignored custody paths or an approved
provider store. Tracked files contain only schemas, required variable names and
instructions. Read the public [secret custody standard](https://github.com/HumanAndMachines/Lazurio/blob/69c53ec342124aef48cb9d04fd109f9886ec242e/manual/security/local-secret-custody.md).

## What stops an agent from publishing a bad change?

The operating model distinguishes an editable draft from publication.
Repository permissions, branch rules, required checks and reviews enforce Git
publication; other systems need equivalent provider-side permissions and
explicit authorization. These controls reduce risk but do not make human
approval infallible.

## Is Lazurio certified for a particular compliance framework?

This documentation makes no certification or universal compliance claim.
Organizations must evaluate their actual deployment, providers, controls and
legal obligations.

## Is there an audit trail?

Git changes can be tied to commits, pull requests, reviews and deployments.
Provider and endpoint actions require their own logs. Ask for an audit map that
states which system records each relevant action and how long it is retained.

## Does the documentation have an MCP server?

Not yet. Agents can use [`llms.txt`](/llms.txt) and the structured
[`content-index.json`](/content-index.json) today. A future MCP server is
planned as a read-only view over that same public content, not a second source.

## Where should I start an IT review?

Use the [ten-minute IT briefing](/en/it-administrators/), then review [data
access and security](/en/data-access-security/) and [deployment and
operations](/en/deployment-operations/) against the proposed configuration.
