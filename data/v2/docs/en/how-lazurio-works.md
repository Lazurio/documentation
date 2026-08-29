---
title: Core concepts
description: The people, agent roles, spaces and work states that make Lazurio predictable.
stableId: lazurio-doc-how-it-works
summary: Learn the distinct concepts Lazurio uses for people, AI identities, Task Agents, Machines, Organizations, Modules, Personalspace, Drafts and Publication.
updatedAt: "2026-08-29"
reviewedAt: "2026-08-29"
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

Lazurio deliberately separates people, execution sessions, working spaces and
publication states. Keeping these domains separate prevents a confident agent
response, a folder name or a role label from being mistaken for authority.

## Slice 1: people and agent roles

```text
Human Colleague ─┐
                 ├─ is a Principal → uses permissions → has the last word
AI Colleague ────┘

Task Agent → temporary execution session working for its current Principal
Buddy      → personal representative of one human Principal
```

- A **Principal** is the person or AI Colleague for whom the current work is
  performed.
- A **Colleague** is a human Principal participating through Organization
  roles, Teams and provider permissions.
- An **AI Colleague** is a long-lived AI Principal with its own identity,
  Machine, responsibility and grants.
- A **Task Agent** is a temporary tool session such as Codex, Claude Code or
  Cursor. It has no independent authority.
- A **Buddy** is the personal AI representative of one human Principal. It
  belongs to that person's Personalspace and is not an AI Colleague seat.

## Slice 2: spaces and boundaries

```text
Machine
└── Lazurio Root
    ├── Organization A
    │   ├── workspace/Module repositories
    │   └── productionspace repositories
    ├── Organization B
    └── Personalspace of this human Principal
```

A **Machine** is one runtime, security and recovery boundary with a known
owner. It can be a workstation, VM or provider-isolated hosted workspace.

An **Organization** is one company, one GitHub Organization and one repository
access boundary. Multiple Organizations can be mounted under one Lazurio Root,
but their repositories, secrets and company context remain separate.

A **Workspace Module** is a separately versioned repository used in everyday
Organization work. Modules live flat under `workspace/<module>` and declare
their Team membership; directory nesting does not grant access.

**Productionspace** holds Organization-level repositories with their own
release and production model. Launchpad treats them as read-only unless a
repository-specific policy says otherwise.

**Personalspace** is private to one Principal and an optional Buddy. It is not
an Organization collaboration store.

## Slice 3: control surfaces

```text
Dashboard  → administer Organizations, people, Machines and hosted products
Launchpad  → discover and run authorized local development Modules
AI app     → host a Task Agent conversation and its tools
CLI/Core   → provide headless context, diagnostics and lifecycle contracts
```

The surfaces share concepts but not ownership. Dashboard does not become the
Launchpad process manager. Launchpad does not become an account or billing
authority. The AI app does not become a new source of repository access.

## Slice 4: from request to Publication

1. **Scope:** name the Principal, Organization and Module.
2. **Authority:** verify live access in GitHub or the relevant provider.
3. **Context:** load only the repositories and tools required for the task.
4. **Draft:** create an editable result, commonly a branch and pull request.
5. **Evidence:** run checks and show the practical effect.
6. **Decision:** an authorized Principal accepts or rejects the exact result.
7. **Publication:** merge, deploy, send or otherwise make it effective.
8. **Closeout:** record remaining work and clean temporary workspaces.

![Draft-to-publication flow](/diagrams/draft-publication-flow.svg)

Publication is a state change, not a synonym for “the agent finished.” A
commit and pushed pull request are reviewable Drafts in ordinary source work;
the repository's branch rules and live permissions decide who may merge.
Other systems have different boundaries, so their exact publish action must be
named.

## Source of truth without one giant database

Lazurio brings relevant material into one working context without requiring
every fact to be copied into one AI database. Code stays in Module repositories,
plans stay in Mission Control, durable Organization knowledge stays in its
Knowledgebase, and provider data stays behind scoped integrations.

The [glossary](/en/glossary/) is the compact reference. The [Example
Organization](/en/example-organization/) shows how these concepts appear on
disk.
