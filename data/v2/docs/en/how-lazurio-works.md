---
title: "How Lazurio works"
description: "Who assigns work, how an agent prepares a draft and who approves publication."
stableId: lazurio-doc-how-it-works
locale: en
summary: "Who assigns work, how an agent prepares a draft and who approves publication."
updatedAt: "2026-10-28"
reviewedAt: "2026-10-28"
reviewOwner: Anna Blazickova
sourceRefs:
  - lazurio-readme
  - lazurio-architecture
  - lazurio-collaboration-model
  - lazurio-platform-release-current
  - lazurio-platform-content-sync
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

The [glossary](/en/guide/glossary/) explains Environment, Buddy and Apps. Older technical sources also use Principal and Personalspace.

## Five useful concepts

**User** is the person for whom work is done. Their actual permissions and instructions define what the agent may do. Older sources call this identity the Principal.

**Task agent** is the active tool session. It works for the user and has
no independent authority. It can propose and prepare; a prompt does not make it
an administrator.

**Organization** is one company's repository and access boundary. In the
documented model it maps to a GitHub organization and a separate repository
root. Several Organizations can be mounted on one machine, but that machine
remains one shared trust domain rather than a set of isolated operating-system environments.

**Workspace module** is an application or bounded work area inside an
Organization. It has its own rules for running, testing and deployment.
You can change it or restore a previous version independently.

**Personal Workspace** is private to one user in a Personal Environment. Older technical sources call it Personalspace. It is not an organizational
collaboration store and is never a shortcut for moving company data across
access boundaries.

## From request to published result

1. **Scope:** identify the Organization, module and intended outcome.
2. **Authority:** use the user's live access; do not invent permissions
   in prose.
3. **Context:** load only the repositories and tools needed for the task.
4. **Draft + evidence:** make the work reversible and editable, commonly on a
   Git branch; run checks and gather review evidence as the Draft changes.
5. **Decision:** an authorized user approves or rejects the exact result.
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
  <figcaption>The Agent prepares; it does not self-authorize. Older sources call the responsible identity the Principal.</figcaption>
</figure>

Git provides the clearest mechanical version of this flow. A task agent with
write access may push a branch and open a pull request; at that point the
source has already reached GitHub, but the protected branch has not changed.
Branch rules, checks, reviews and merge permission can then block publication.
Email, chat and other providers need their own controls. Where a provider
offers no equivalent restriction, explicit authorization remains a process rule.

## Source of truth, not one giant AI database

Keep each kind of material in its designated place:

- code in repositories;
- plans in the Organization's Mission Control;
- company knowledge in its Knowledgebase;
- email and other service data in the original applications, accessed through approved connections.

The agent loads what the task needs. You do not have to copy everything into
one AI database. Change access in the system that manages it: revoke a
repository permission or an app credential. Renaming a role in a document
does not restrict anything by itself.

## What runs today

Platform v0.1.14 ships CLI, Apps, diagnostics and the component that generates
agent instructions in the Lazurio Folder. Users install a release rather than
clone the product's source. Organization repositories and modules remain
separate versioned content. `lazurio update` synchronizes clean content, builds
changed modules and updates the product; each part reports its own result.

Model requests follow the selected AI client's and provider's terms. Lazurio
Account, the Organization overview, hosted services and Buddy have their own
availability and operating requirements. They are not hidden dependencies of
every self-hosted installation. See [deployment](/en/deployment-operations/).
