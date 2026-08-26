---
title: How Lazurio works
description: The core operating model, from principal and Organization to draft and publication.
stableId: lazurio-doc-how-it-works
summary: Understand Lazurio's principals, agents, Organizations, repositories, workspace modules, drafts, reviews, and publication flow.
updatedAt: "2026-08-26"
reviewedAt: "2026-08-26"
reviewOwner: Matej Suchanek
sourceRefs:
  - lazurio-readme
  - lazurio-architecture
  - lazurio-collaboration-model
audience:
  - it-admin
  - decision-maker
  - builder
  - agent
---

Lazurio treats AI-assisted work as normal organizational work with explicit
ownership and boundaries. A person starts with a desired outcome; an agent can
inspect the authorized context, create an editable draft, verify it and prepare
it for review. Authority does not come from the agent's confidence. It comes
from the signed-in identity and the systems that own the action.

The current public model is defined in the [Lazurio architecture](https://github.com/HumanAndMachines/Lazurio/blob/69c53ec342124aef48cb9d04fd109f9886ec242e/ARCHITECTURE.md)
and [agent collaboration contract](https://github.com/HumanAndMachines/Lazurio/blob/69c53ec342124aef48cb9d04fd109f9886ec242e/AGENTS.md).

## The five useful concepts

**Principal** is the person or AI colleague for whom work is being done. The
principal holds real permissions and the last word.

**Task agent** is the active tool session. It works for the principal and has
no independent authority. It can propose and prepare; a prompt does not make it
an administrator.

**Organization** is one company's access boundary. In the documented model it
maps to a GitHub organization and a separate repository root. Company-specific
data and strategy stay within that Organization.

**Workspace module** is an application or bounded work area inside an
Organization. A module owns its runtime contract and can be developed,
reviewed, deployed and rolled back independently.

**Personalspace** is a private area for one principal. It is not an
organizational collaboration store and is never a shortcut for moving company
data across access boundaries.

## From request to published result

1. **Scope:** identify the Organization, module and intended outcome.
2. **Authority:** use the signed-in principal's live access; do not invent a
   second permission system in prose.
3. **Context:** load only the repositories and tools required for the task.
4. **Draft:** make the work in a reversible form, commonly a Git branch and
   pull request.
5. **Evidence:** run checks, show the practical effect and preserve review
   context.
6. **Decision:** an authorized principal approves or rejects the exact result.
7. **Publication:** merge, deploy, send or otherwise make the result effective.
8. **Closeout:** update the authoritative plan, record remaining issues and
   clean temporary workspaces.

This shape makes human review useful: the reviewer sees not only generated
text, but the exact change, evidence, owner and publication decision.

## Source of truth, not one giant database

Lazurio does not require every kind of information to be copied into a single
AI store. Code stays in repositories, plans stay in the Organization's Mission
Control, durable knowledge stays in its Knowledgebase, and provider data stays
behind a scoped integration. The working environment brings the relevant
pieces together for a task while preserving their natural owners.

That distinction matters operationally. Removing repository access or
revoking an integration changes what the principal and its agent can reach;
editing a role name in documentation does not.

## Current state and target direction

The public architecture distinguishes a target model from currently deployed
configuration. Not every installation exposes every planned capability. Ask
for live configuration and provider readback when evaluating a specific
deployment. The [IT briefing](/en/it-administrators/) lists the minimum
evidence expected for approval.
