---
title: Public references
description: The evidence set used by the first Lazurio documentation release.
stableId: lazurio-doc-reference
summary: Inspect the pinned Lazurio source and current Microsoft Learn pages behind architectural, security, privacy, and comparison claims.
updatedAt: "2026-08-26"
reviewedAt: "2026-08-26"
reviewOwner: Matej Suchanek
secondReviewOwner: Pablo AI
trustCritical: true
sourceRefs:
  - lazurio-readme
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

The first release uses public, inspectable sources. Lazurio links are pinned to
the exact source revision reviewed for this documentation. Microsoft links
point to current provider documentation because the service changes over time;
their shorter review window is enforced by the source map.

## Lazurio source

- [Project overview](https://github.com/HumanAndMachines/Lazurio/blob/69c53ec342124aef48cb9d04fd109f9886ec242e/README.md)
- [Architecture](https://github.com/HumanAndMachines/Lazurio/blob/69c53ec342124aef48cb9d04fd109f9886ec242e/ARCHITECTURE.md)
- [Collaboration, authority and publication model](https://github.com/HumanAndMachines/Lazurio/blob/69c53ec342124aef48cb9d04fd109f9886ec242e/AGENTS.md)
- [External application integration standard](https://github.com/HumanAndMachines/Lazurio/blob/69c53ec342124aef48cb9d04fd109f9886ec242e/manual/external-app-integrations.md)
- [Local secret custody standard](https://github.com/HumanAndMachines/Lazurio/blob/69c53ec342124aef48cb9d04fd109f9886ec242e/manual/security/local-secret-custody.md)

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

Security-critical pages also name Pablo AI as second reviewer. Production
publication requires approval of the exact Git commit, not a general approval
of an earlier draft.
