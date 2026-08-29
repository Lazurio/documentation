---
title: Google Antigravity
description: Use a Google Antigravity Project and browser subagent with the exact Lazurio Launchpad URL.
stableId: lazurio-doc-antigravity
summary: Add a scoped Lazurio folder to an Antigravity Project, run Launchpad and open its local URL through the isolated browser subagent.
updatedAt: "2026-08-29"
reviewedAt: "2026-08-29"
reviewOwner: Matej Suchanek
sourceRefs:
  - lazurio-readme
  - lazurio-launchpad
  - lazurio-collaboration-model
  - antigravity-browser
audience:
  - builder
  - agent
---

Google Antigravity Projects define which folders and repositories an Agent can
access. Its browser subagent can open and operate local web apps, which makes
it a practical current path to Launchpad.

## Workflow

1. Create an Antigravity Project.
2. Add the Lazurio Root or one exact Organization or Module folder.
3. Start an Agent session—the Task Agent in Lazurio terms—and ask it to read
   the nearest `AGENTS.md`.
4. Start Launchpad from the Lazurio Root:

   ```sh
   bun run launchpad
   ```

5. Copy the URL printed by the running instance.
6. Invoke the browser workflow with the exact address:

   ```text
   /browser Open the Launchpad URL reported by the running Lazurio instance.
   Verify the selected Organization and inspect Module status.
   Do not open Personalspace or another Organization.
   ```

## Browser boundary

Antigravity's browser runs in a separate Chrome profile. It does not
automatically share cookies or active sessions from the person's normal
browser. Its URL controls initialize with localhost allowed and can prompt for
other domains.

That isolation is a host-browser property. It does not create a second Lazurio
IAM layer and does not grant access to repositories or hosted applications.

## Project boundary

Adding multiple folders gives the Agent cross-repository context. Use that
capability only when the task genuinely spans those repositories. Never add a
second Organization or a person's Personalspace to make discovery easier.

Google's current browser behavior is documented in
[Antigravity Browser](https://antigravity.google/docs/browser).
