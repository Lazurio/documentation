---
title: Cursor Glass
description: Use Cursor's Agent Window with a Lazurio project and a separate, truthful Launchpad workflow.
stableId: lazurio-doc-cursor-glass
summary: Open the correct Lazurio scope in Cursor's agent-first window, start Launchpad from the Root and avoid assuming an embedded Lazurio panel.
updatedAt: "2026-08-29"
reviewedAt: "2026-08-29"
reviewOwner: Matej Suchanek
sourceRefs:
  - lazurio-readme
  - lazurio-launchpad
  - lazurio-collaboration-model
  - cursor-agent-window
audience:
  - builder
  - agent
---

Cursor describes its current agent-first surface as the **Agent Window**.
This guide uses “Cursor Glass” for that layout because it is the requested
Lazurio-facing label; Cursor's own public page calls the surface Agent Window.
Neither name establishes a Lazurio integration contract.

## Workflow

1. Update to a Cursor version that provides the Agent Window.
2. Open the Lazurio Root or the exact scoped repository as a Cursor project.
3. Start an Agent session in that project.
4. Read the nearest `AGENTS.md` and verify the Organization before editing.
5. Start Launchpad from the Root:

   ```sh
   bun run launchpad
   ```

6. Open the reported local URL in Cursor's available browser tooling or a
   separate browser window.

Cursor's current product page documents opening the Agent Window through the
command palette. It does not establish a Lazurio-specific embedded right-panel
API. The release-safe setup is therefore a scoped Cursor Task Agent plus the
real Launchpad URL, visible alongside it.

## Repository scope

Cursor can work across repositories, but Lazurio Organizations remain distinct
access boundaries. For an Organization task, start from that Organization or
its Module and do not add unrelated Organization roots to the project.

If the Task Agent creates a worktree or pull request, the result remains a Draft
until an authorized Principal performs the repository's exact Publication
action.

See [Cursor's Agent Window introduction](https://cursor.com/new) for the host
surface, and [Core concepts](/en/how-lazurio-works/) for the Lazurio contract.
