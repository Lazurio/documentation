---
title: Codex and ChatGPT Desktop
description: Run a Codex Task Agent against Lazurio and open Launchpad in the shared desktop browser.
stableId: lazurio-doc-codex
summary: Use Codex in the ChatGPT desktop app with the exact Lazurio scope, a verified Launchpad URL and the correct distinction from Codex CLI and IDE surfaces.
updatedAt: "2026-08-29"
reviewedAt: "2026-08-29"
reviewOwner: Matej Suchanek
sourceRefs:
  - lazurio-readme
  - lazurio-launchpad
  - lazurio-collaboration-model
  - openai-browser
audience:
  - builder
  - agent
---

The current in-app visual workflow uses **Codex inside the ChatGPT desktop
app** together with ChatGPT's built-in browser. OpenAI documents that this
browser gives the person and Codex a shared view of local web apps inside the
chat.

OpenAI also states that the built-in browser is **not available in Codex CLI
or the Codex IDE extension**. Those remain useful Task Agent surfaces, but
Launchpad opens in a separate browser.

## Setup

1. Open the Lazurio Root, one Organization or one Module as the Codex project.
2. Start a task in that exact project scope.
3. Ask Codex to inspect the scoped `AGENTS.md` and current context.
4. Start Launchpad:

   ```sh
   bun run launchpad
   ```

5. Copy the exact reported Launchpad URL.
6. In ChatGPT desktop, open that URL with the built-in Browser. You can ask:

   ```text
   Open the Launchpad URL reported by the running Lazurio instance.
   Verify that the selected Organization is lazurio-example-organization.
   Do not change another Organization or open Personalspace.
   ```

The shared browser is useful for selecting Modules, viewing status and checking
local application output. Codex still works from the repository and terminal;
the browser is a UI surface, not a second source of truth.

## Scope the task before work

A good first prompt names:

- the current Principal;
- the Organization or Personalspace boundary;
- the exact Module;
- the desired Draft;
- the action, if any, that would count as Publication.

Do not ask Codex to infer access from a folder name. GitHub grants and branch
rules remain authoritative.

## When using Codex CLI or the IDE extension

Run the Task Agent in the same exact checkout, start Launchpad normally and
open the reported URL in your regular browser. Do not document an embedded
panel that these surfaces do not provide.

OpenAI's current browser behavior and availability are documented in
[Browser | ChatGPT Learn](https://learn.chatgpt.com/docs/browser).
