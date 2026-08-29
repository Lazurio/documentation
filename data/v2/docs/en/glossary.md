---
title: Glossary
description: Canonical Lazurio terminology for people, agents, spaces, repositories and publication.
stableId: lazurio-doc-glossary
summary: Use the canonical Lazurio vocabulary consistently in documentation, prompts, diagrams, product copy and technical discussions.
updatedAt: "2026-08-29"
reviewedAt: "2026-08-29"
reviewOwner: Matej Suchanek
sourceRefs:
  - lazurio-readme
  - lazurio-architecture
  - lazurio-collaboration-model
audience:
  - decision-maker
  - builder
  - agent
  - it-admin
---

These terms are operating concepts, not decorative product labels. Use them
consistently so a person and a Task Agent interpret ownership, scope and
authority in the same way.

## People and agent roles

| Term | Canonical meaning |
| --- | --- |
| **Principal** | The person or AI Colleague for whom a Task Agent currently works, whose permissions apply, and who has the last word. |
| **Colleague** | A human Principal participating through Organization roles, Teams and live provider grants. |
| **AI Colleague** | A long-lived AI Principal with its own seat, identity, Machine, responsibility and grants. |
| **Task Agent** | A temporary execution session such as Codex, Claude Code or Cursor. “Agent” is an acceptable conversational shorthand. It owns no permissions. |
| **Buddy** | The personal AI representative of one human Principal. It acts only within that person's scoped, revocable mandates and belongs to Personalspace. |

## Spaces and repositories

| Term | Canonical meaning |
| --- | --- |
| **Machine** | One shared runtime, security and recovery boundary with a known owner; not a hardware category or IAM role. |
| **Root** | The local working root that contains Lazurio, mounted Organizations and the current human Principal's optional Personalspace. |
| **Organization** | One company, one GitHub Organization and one repository access boundary. |
| **Team** | A logical N:M grouping declared for Modules and backed by live provider membership and grants; not an extra directory layer. |
| **Module** | A versioned working capability in an Organization or Personalspace. It may contain a runnable application. |
| **Workspace Module** | A separate repository mounted flat under `workspace/<module>` for everyday Organization work. |
| **Productionspace** | Organization-level repositories with their own release and production contract. |
| **Personalspace** | The private space of one Principal and an optional Buddy. It is never mounted for another Principal. |

## Work and authority

| Term | Canonical meaning |
| --- | --- |
| **Draft** | A reversible and editable result prepared for review. |
| **Publication** | The exact action that makes a Draft externally visible or materially harder to reverse, such as merge, deploy or send. |
| **Release** | A versioned external release, commonly a GitHub Release. It is distinct from ordinary Publication. |
| **Access authority** | The live system that grants the action, normally GitHub membership, Teams, repository grants and branch rules for source work. |
| **Dashboard** | The separately deployed administrative and product entry surface for accounts, Organizations, Marketplace, people, Machines, hosting and operational visibility. |
| **Launchpad** | The builder-first local surface that discovers available Organizations and Modules and manages development application lifecycle. |

Deprecated public names such as “HumanAndMachine” or “Conglomerate” are not
synonyms for Lazurio. Historical repository and GitHub Organization identities
may keep those names as provenance.
