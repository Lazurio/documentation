---
title: Claude
description: Use Claude Code as a Lazurio Task Agent and understand the current Claude Desktop boundary.
stableId: lazurio-doc-claude
summary: Start Claude Code from a scoped Lazurio checkout, keep Launchpad beside the session, and avoid claiming a Claude Desktop integration that Lazurio does not ship.
updatedAt: "2026-08-29"
reviewedAt: "2026-08-29"
reviewOwner: Matej Suchanek
sourceRefs:
  - lazurio-readme
  - lazurio-launchpad
  - lazurio-external-apps
  - anthropic-claude-code-cli
  - model-context-protocol
audience:
  - builder
  - agent
---

The current documented Claude workflow is **Claude Code working in a scoped
Lazurio checkout**, with Launchpad open beside it in a browser.

## Claude Code workflow

1. Change into the exact Lazurio Root, Organization or Module:

   ```sh
   cd /path/to/Lazurio
   claude
   ```

2. Ask Claude Code to read the nearest `AGENTS.md` before it makes changes.
3. Start Launchpad from the Lazurio Root:

   ```sh
   bun run launchpad
   ```

4. Open the reported URL in a browser.
5. Keep the Claude Code session and Launchpad on the same Machine and use the
   exact Organization scope.

Claude Code can add explicitly named working directories, but broader
filesystem visibility is not a substitute for a well-scoped task. Do not add
another Organization or Personalspace merely for convenience.

## Claude Desktop status

Claude Desktop supports MCP clients and local MCP-server configuration.
However, the current Lazurio release does not ship a Lazurio MCP server,
Claude Desktop extension or embedded Launchpad panel. Therefore there is no
native Claude Desktop connection to configure in this release.

Use Launchpad as a separate local application and Claude Code as the Task
Agent. Do not install an unreviewed third-party bridge or paste Organization
secrets into a generic connector to simulate native support.

## External tools

Lazurio's integration standard prefers an official local MCP server, then an
official CLI, then a reviewed and pinned open-source server. Credentials remain
per-Machine and revocable; the tracked repository contains only configuration
shape and environment-variable names, never secret values.

Anthropic's current CLI flags and `claude mcp` command are documented in the
[Claude Code CLI reference](https://docs.anthropic.com/en/docs/claude-code/cli-usage).
