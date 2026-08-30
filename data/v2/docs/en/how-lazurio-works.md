---
title: How Lazurio works
description: The core operating model, from principal and Organization to draft and publication.
stableId: lazurio-doc-how-it-works
summary: Understand Lazurio's principals, agents, Organizations, repositories, workspace modules, drafts, reviews, and publication flow.
updatedAt: "2026-08-30"
reviewedAt: "2026-08-30"
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
ownership. A person starts with an outcome; an agent can inspect the authorized
context, prepare an editable result, verify it and put it up for review.
Authority does not come from the agent's confidence. It comes from the
signed-in identity and the systems that own each action.

## Five useful concepts

**Principal** is the person or longer-lived AI colleague for whom work is
being done. The principal holds real permissions and the last word.

**Task agent** is the active tool session. It works for the principal and has
no independent authority. It can propose and prepare; a prompt does not make it
an administrator.

**Organization** is one company's repository and access boundary. In the
documented model it maps to a GitHub organization and a separate repository
root. Several Organizations can be mounted on one machine, but that machine
remains one shared trust domain rather than a set of hard OS tenants.

**Workspace module** is an application or bounded work area inside an
Organization. A module owns its runtime contract and can be developed,
reviewed, deployed and rolled back independently.

**Personalspace** is private to one principal. It is not an organizational
collaboration store and is never a shortcut for moving company data across
access boundaries.

## From request to published result

1. **Scope:** identify the Organization, module and intended outcome.
2. **Authority:** use the principal's live access; do not invent permissions
   in prose.
3. **Context:** load only the repositories and tools needed for the task.
4. **Draft + evidence:** make the work reversible and editable, commonly on a
   Git branch; run checks and gather review evidence as the Draft changes.
5. **Decision:** an authorized principal approves or rejects the exact result.
6. **Publication:** merge, deploy, send or otherwise make it effective.
7. **Closeout:** update the source of truth, record what remains and clean
   temporary workspaces.

<figure class="lz-diagram">
  <picture>
    <source media="(max-width: 640px)" srcset="/diagrams/draft-publication-flow-mobile.svg" />
    <img src="/diagrams/draft-publication-flow.svg" alt="Scope bounds a Draft and its evidence; Publication requires both a mechanical provider gate and an authorized Principal decision." />
  </picture>
  <figcaption>Scope surrounds the change. Draft and evidence are prepared together; Publication remains behind two independent gates.</figcaption>
</figure>

Git provides the clearest mechanical version of this flow. A task agent with
write access may push a branch and open a pull request; at that point the
source has already reached GitHub, but the protected branch has not changed.
Branch rules, checks, reviews and merge permission can then block publication.
Email, chat and other providers need their own controls. Where a provider
offers no equivalent interlock, explicit authorization remains a process rule.

## Source of truth, not one giant AI database

Code stays in repositories, plans stay in the Organization's Mission Control,
durable knowledge stays in its Knowledgebase, and provider data stays behind
the relevant integration. Lazurio brings the pieces needed for a task into one
working context without changing their natural owners.

That distinction matters. Revoking repository access or an app credential
changes what the principal and its agent can reach; editing a role name in a
document does not.

## What runs today

The current supported setup is a public source checkout using Git and Bun. It
contains Launchpad, CLI/Core v0, Doctor, operating manuals and the contracts
used by connected Organizations and modules. CLI v0 is experimental. A
packaged CLI and automatically generated non-Git root are future targets.

The selected agent client and model provider carry the model request under
their own terms. Dashboard, hosted team workspaces and per-owner Resident/Buddy
services are optional surfaces, not hidden parts of every installation. The
[IT briefing](/en/it-administrators/) explains what a concrete deployment must
prove.
