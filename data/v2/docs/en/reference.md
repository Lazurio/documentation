---
title: Public references
description: The evidence set used by Lazurio documentation.
stableId: lazurio-doc-reference
locale: en
summary: Inspect the pinned Lazurio source and current Microsoft Learn pages behind architectural, security, privacy, and comparison claims.
updatedAt: "2026-08-31"
reviewedAt: "2026-08-31"
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

Lazurio links are pinned to the source revision reviewed for this documentation.
Microsoft links point to current provider documentation and therefore use a
shorter freshness window in the public source map.

The pinned Lazurio source is written in Czech. English readers should begin
with the reviewed [security and control evidence](/en/public-evidence/), which summarizes
the security-relevant meaning and links each claim to the exact source. It
improves accessibility; it is not an independent certification or a controlled
legal translation.

## Lazurio source

- [Project overview (Czech)](https://github.com/HumanAndMachines/Lazurio/blob/3c5bda5d54c5556a0e54f3c339d988aa911fda60/README.md)
- [License](https://github.com/HumanAndMachines/Lazurio/blob/3c5bda5d54c5556a0e54f3c339d988aa911fda60/LICENSE.md)
- [Architecture (Czech)](https://github.com/HumanAndMachines/Lazurio/blob/3c5bda5d54c5556a0e54f3c339d988aa911fda60/ARCHITECTURE.md)
- [Authority and publication model (Czech)](https://github.com/HumanAndMachines/Lazurio/blob/3c5bda5d54c5556a0e54f3c339d988aa911fda60/AGENTS.md)
- [External application standard (Czech)](https://github.com/HumanAndMachines/Lazurio/blob/3c5bda5d54c5556a0e54f3c339d988aa911fda60/manual/external-app-integrations.md)
- [Secret custody standard (Czech)](https://github.com/HumanAndMachines/Lazurio/blob/3c5bda5d54c5556a0e54f3c339d988aa911fda60/manual/security/local-secret-custody.md)

## Microsoft provider documentation

- [Microsoft 365 Copilot architecture](https://learn.microsoft.com/en-us/microsoft-365/copilot/microsoft-365-copilot-architecture)
- [Data protection and auditing](https://learn.microsoft.com/en-us/microsoft-365/copilot/microsoft-365-copilot-architecture-data-protection-auditing)
- [Data, privacy, and security](https://learn.microsoft.com/en-us/microsoft-365/copilot/microsoft-365-copilot-privacy)
- [Requirements](https://learn.microsoft.com/en-us/microsoft-365/copilot/microsoft-365-copilot-minimum-requirements)
- [Extensibility](https://learn.microsoft.com/en-us/microsoft-365/copilot/extensibility/)

## Review contract

The source map names an owner, review date and expiry for every reference;
validation fails when evidence is stale. Trust-critical pages also require an
exact-commit review before production publication. Pablo AI is the
Organization Steward automation used for that review, not an independent
auditor or certification of a customer's deployment. The deploy script checks
for a clean main branch and an operator-supplied approved commit; matching that
commit to the exact-head review remains an explicit delivery step.
