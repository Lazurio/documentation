---
title: Public references
description: The evidence set used by Lazurio documentation.
stableId: lazurio-doc-reference
summary: Inspect the pinned Lazurio source and current provider documentation behind architectural, AI app, security, privacy, and comparison claims.
updatedAt: "2026-08-29"
reviewedAt: "2026-08-29"
reviewOwner: Matej Suchanek
secondReviewOwner: Pablo AI
trustCritical: true
sourceRefs:
  - lazurio-readme
  - lazurio-license
  - lazurio-architecture
  - lazurio-collaboration-model
  - lazurio-external-apps
  - lazurio-secret-custody
  - lazurio-map
  - lazurio-cli
  - lazurio-launchpad
  - lazurio-organization-schema
  - lazurio-example-fixture
  - lazurio-module-lifecycle
  - openai-browser
  - anthropic-claude-code-cli
  - model-context-protocol
  - cursor-agent-window
  - antigravity-browser
  - microsoft-copilot-architecture
  - microsoft-copilot-data-protection
  - microsoft-copilot-privacy
  - microsoft-copilot-requirements
  - microsoft-copilot-extensibility
audience:
  - it-admin
  - decision-maker
  - builder
  - agent
---

Lazurio links are pinned to the exact source revision reviewed for this
documentation. Microsoft links point to current provider documentation because
the service changes over time; their shorter review window is enforced by the
source map.

The pinned Lazurio source is currently written in Czech. English readers should
start with the reviewed [control evidence summary](/en/public-evidence/), which
states the security-relevant meaning in English and links every section to the
exact source. The summary improves accessibility; it is not an independent
certification or a substitute for a controlled translation where legal or
regulatory review requires one.

## Lazurio source

- [Project overview (Czech)](https://github.com/HumanAndMachines/Lazurio/blob/08d21803d4d4011304e1181ecf02ab9c5bfbad58/README.md)
- [License](https://github.com/HumanAndMachines/Lazurio/blob/08d21803d4d4011304e1181ecf02ab9c5bfbad58/LICENSE.md)
- [Architecture (Czech)](https://github.com/HumanAndMachines/Lazurio/blob/08d21803d4d4011304e1181ecf02ab9c5bfbad58/ARCHITECTURE.md)
- [Collaboration, authority and publication model (Czech)](https://github.com/HumanAndMachines/Lazurio/blob/08d21803d4d4011304e1181ecf02ab9c5bfbad58/AGENTS.md)
- [External application integration standard (Czech)](https://github.com/HumanAndMachines/Lazurio/blob/08d21803d4d4011304e1181ecf02ab9c5bfbad58/manual/external-app-integrations.md)
- [Local secret custody standard (Czech)](https://github.com/HumanAndMachines/Lazurio/blob/08d21803d4d4011304e1181ecf02ab9c5bfbad58/manual/security/local-secret-custody.md)
- [Repository map (Czech)](https://github.com/HumanAndMachines/Lazurio/blob/08d21803d4d4011304e1181ecf02ab9c5bfbad58/MAP.md)
- [CLI/Core v0 (Czech)](https://github.com/HumanAndMachines/Lazurio/blob/08d21803d4d4011304e1181ecf02ab9c5bfbad58/lazurio/README.md)
- [Launchpad (Czech)](https://github.com/HumanAndMachines/Lazurio/blob/08d21803d4d4011304e1181ecf02ab9c5bfbad58/launchpad/README.md)
- [Organization schema](https://github.com/HumanAndMachines/Lazurio/blob/08d21803d4d4011304e1181ecf02ab9c5bfbad58/lazurio/lazurio.organization.v1.schema.json)
- [Example Organization fixture](https://github.com/HumanAndMachines/Lazurio/blob/08d21803d4d4011304e1181ecf02ab9c5bfbad58/lazurio/organization-install-lib.test.mjs)
- [Module lifecycle (Czech)](https://github.com/HumanAndMachines/Lazurio/blob/08d21803d4d4011304e1181ecf02ab9c5bfbad58/manual/module-lifecycle.md)

## AI app provider documentation

- [Browser in ChatGPT desktop and Codex](https://learn.chatgpt.com/docs/browser)
- [Claude Code CLI reference](https://docs.anthropic.com/en/docs/claude-code/cli-usage)
- [Model Context Protocol](https://modelcontextprotocol.io/docs/2026-07-28/getting-started/intro)
- [Cursor Agent Window](https://cursor.com/new)
- [Google Antigravity Browser](https://antigravity.google/docs/browser)

## Microsoft provider documentation

- [Microsoft 365 Copilot architecture](https://learn.microsoft.com/en-us/microsoft-365/copilot/microsoft-365-copilot-architecture)
- [Data protection and auditing](https://learn.microsoft.com/en-us/microsoft-365/copilot/microsoft-365-copilot-architecture-data-protection-auditing)
- [Data, privacy, and security](https://learn.microsoft.com/en-us/microsoft-365/copilot/microsoft-365-copilot-privacy)
- [Requirements](https://learn.microsoft.com/en-us/microsoft-365/copilot/microsoft-365-copilot-minimum-requirements)
- [Extensibility](https://learn.microsoft.com/en-us/microsoft-365/copilot/extensibility/)

## Review contract

Machine-readable source metadata lives in the public repository at
`data/v2/source-map.json`. Each entry names an owner, review date and next
review deadline. Content validation fails after a source expires, preventing a
silent claim that old provider behavior is still current.

Security-critical pages also name Pablo AI. Pablo AI is the Organization
Steward's automation identity for source alignment, security-claim review and
exact-head delivery gates. It is not an independent auditor and does not attest
that a customer deployment operates the documented controls. Production
policy requires its approval of the exact Git commit as well as the
repository's technical checks and authorized publication decision. The deploy
script mechanically verifies a clean `main` and an operator-supplied approved
SHA; binding that SHA to Pablo AI's exact-head review is a delivery process
step, not an independent attestation encoded by the script.
