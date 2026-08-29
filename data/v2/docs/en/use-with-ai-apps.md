---
title: Use Lazurio with AI apps
description: A truthful support matrix for Codex, ChatGPT Desktop, Claude, Cursor Glass and Google Antigravity.
stableId: lazurio-doc-use-with-ai-apps
summary: Choose a current host workflow for a Task Agent and understand which clients can show Launchpad in-app, beside the app, or only through a separate browser.
updatedAt: "2026-08-29"
reviewedAt: "2026-08-29"
reviewOwner: Matej Suchanek
sourceRefs:
  - lazurio-architecture
  - lazurio-launchpad
  - lazurio-external-apps
  - openai-browser
  - anthropic-claude-code-cli
  - model-context-protocol
  - cursor-agent-window
  - antigravity-browser
audience:
  - builder
  - agent
  - it-admin
---

An AI app hosts the current **Task Agent**. Lazurio supplies the working Root,
Organization boundaries, repository contracts, operating instructions,
Launchpad and diagnostics. It does not replace the host model or silently
grant the app access to every tool.

## Current workflow matrix

| Host surface | Task Agent path | Launchpad path | Current limitation |
| --- | --- | --- | --- |
| ChatGPT desktop with Codex | Open the Lazurio project in the desktop app | Built-in shared browser can open the reported local URL inside the chat | Built-in browser is a ChatGPT desktop capability, not a Codex CLI or IDE-extension feature |
| Codex CLI or IDE extension | Run in the exact Root, Organization or Module scope | Open the reported URL in a separate browser | No built-in browser in these two surfaces |
| Claude Code | Start Claude Code from the scoped checkout | Keep Launchpad open in a browser beside Claude Code | No Lazurio-specific native UI package is shipped |
| Claude Desktop | No native Lazurio connection in the current release | Use Launchpad separately | Lazurio does not yet ship an MCP server or Claude Desktop app |
| Cursor Agent Window (“Glass”) | Open the Lazurio Root or scoped repository as a Cursor project | Keep Launchpad in the available browser surface or a separate browser | No release-verified Lazurio embedded-panel contract |
| Google Antigravity | Add the Root or scoped repository to a Project | Use the browser subagent to open the exact local URL | Browser runs in an isolated Chrome profile |

“Can run an MCP server” and “Lazurio provides an MCP server” are different
claims. Claude, Cursor and Antigravity expose MCP capabilities, but the current
Lazurio release does not publish a native Lazurio MCP server.

## The invariant workflow

Regardless of host:

1. Open the exact Lazurio Root, Organization or Module required for the task.
2. Let the scoped `AGENTS.md` and repository rules define how work proceeds.
3. Start or reuse Launchpad and copy its reported URL.
4. Ask the Task Agent to inspect the exact scope before changing anything.
5. Keep changes in a reviewable Draft.
6. Verify live provider permissions before Publication.

The app-specific pages show the UI differences:

- [Codex and ChatGPT Desktop](/en/codex/)
- [Claude](/en/claude/)
- [Cursor Glass](/en/cursor-glass/)
- [Google Antigravity](/en/antigravity/)

## Data and trust reminder

The selected AI client and model provider receive the context exposed to that
session under their own product terms and controls. A Launchpad window does not
isolate the model, create a new IAM layer or make a cross-Organization request
safe. Review [data access and security](/en/data-access-security/) for a real
deployment.
