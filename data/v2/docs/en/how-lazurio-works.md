---
title: How Lazurio works
description: The core operating model, from principal and Organization to draft and publication.
stableId: lazurio-doc-how-it-works
locale: en
summary: Understand Lazurio's principals, agents, Organizations, repositories, workspace modules, drafts, reviews, and publication flow.
updatedAt: "2026-09-15"
reviewedAt: "2026-09-15"
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

In Lazurio, you give an agent a task and the materials it needs, then review
the result. The agent may prepare a document, an application change or other
work. Publishing or deploying that result requires approval from someone
authorized to make the decision. The agent cannot authorize itself.

## Five useful concepts

**Principal** is the person or longer-lived AI colleague for whom work is
being done. The principal holds real permissions and the last word.

**Task agent** is the active tool session. It works for the principal and has
no independent authority. It can propose and prepare; a prompt does not make it
an administrator.

**Organization** is one company's repository and access boundary. In the
documented model it maps to a GitHub organization and a separate repository
root. Several Organizations can be mounted on one machine, but that machine
remains one shared trust domain rather than a set of isolated operating-system environments.

**Workspace module** is an application or bounded work area inside an
Organization. It has its own rules for running, testing and deployment.
You can change it or restore a previous version independently.

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

Preparing a draft can already transfer data. The diagram shows approval of
the result; it does not mean that all preceding work stays on your machine.

<figure class="lz-diagram">
  <picture>
    <source media="(max-width: 80rem)" srcset="/diagrams/draft-publication-flow-mobile.svg" />
    <img src="/diagrams/draft-publication-flow.svg" alt="A person defines the outcome, an Agent prepares a proposed change and proof, and the change takes effect only when the account is allowed to perform it and the responsible person approves it." />
  </picture>
  <figcaption>The Agent prepares; it does not self-authorize. Lazurio calls the identity responsible for the decision the Principal.</figcaption>
</figure>

Git provides the clearest mechanical version of this flow. A task agent with
write access may push a branch and open a pull request; at that point the
source has already reached GitHub, but the protected branch has not changed.
Branch rules, checks, reviews and merge permission can then block publication.
Email, chat and other providers need their own controls. Where a provider
offers no equivalent restriction, explicit authorization remains a process rule.

## Source of truth, not one giant AI database

Each kind of material has a home:

- code in repositories;
- plans in the Organization's Mission Control;
- company knowledge in its Knowledgebase;
- email and other service data in the original applications, accessed through approved connections.

The agent loads what the task needs. You do not have to copy everything into
one AI database. Change access in the system that manages it: revoke a
repository permission or an app credential. Renaming a role in a document
does not restrict anything by itself.

## What runs today

The setup described in the linked source revision uses a source checkout with Git and Bun. It
contains Launchpad, CLI/Core v0, Doctor, operating manuals and the contracts
used by connected Organizations and modules. CLI v0 is experimental. A
packaged CLI and automatically generated non-Git root are future targets.

The selected agent client and model provider carry the model request under
their own terms. Dashboard, hosted team workspaces and per-owner Resident/Buddy
services are optional services, not hidden parts of every installation. The
[IT briefing](/en/it-administrators/) explains what a concrete deployment must
prove.
