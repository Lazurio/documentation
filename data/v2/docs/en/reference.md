---
title: "Public references"
description: "Lazurio and Microsoft source links and how their review dates are tracked."
stableId: lazurio-doc-reference
locale: en
summary: "Lazurio and Microsoft source links and how their review dates are tracked."
updatedAt: "2026-10-28"
reviewedAt: "2026-10-28"
reviewOwner: Anna Blazickova
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
  - lazurio-platform-release-current
  - lazurio-platform-content-sync
  - lazurio-platform-integrations-current
  - lazurio-external-apps-current
audience:
  - it-admin
  - decision-maker
  - builder
  - agent
---

These sources describe the current Platform release and its integration
rules. A source revision identifies what was checked; it does not prove
that every deployment runs it. Dates under each page title distinguish the
last content update from its factual review. External provider terms can change.

## Lazurio source

- [Platform v0.1.14 release](https://github.com/Lazurio/LazurioPlatform/releases/tag/v0.1.14)
- [Installed product](https://github.com/Lazurio/LazurioPlatform/blob/v0.1.14/README.md)
- [Elastic License 2.0](https://github.com/Lazurio/LazurioPlatform/blob/v0.1.14/LICENSE) and [license boundaries](https://github.com/Lazurio/LazurioPlatform/blob/v0.1.14/docs/licensing.md)
- [Integrations and approval scope](https://github.com/Lazurio/LazurioPlatform/blob/v0.1.14/docs/integrations.md)
- [Content synchronization](https://github.com/Lazurio/LazurioPlatform/blob/v0.1.14/docs/content-sync.md)
- [Approved integration policy, including the 27 October amendment](https://github.com/HumanAndMachines/Lazurio/blob/b41fc7d01f748ebc4724535ce811ffceded38fdb/manual/external-app-integrations.md)

## Microsoft provider documentation

- [Microsoft Copilot architecture](https://learn.microsoft.com/en-us/microsoft-365/copilot/microsoft-365-copilot-architecture)
- [Data protection and auditing](https://learn.microsoft.com/en-us/microsoft-365/copilot/microsoft-365-copilot-architecture-data-protection-auditing)
- [Data, privacy, and security](https://learn.microsoft.com/en-us/microsoft-365/copilot/microsoft-365-copilot-privacy)
- [Requirements](https://learn.microsoft.com/en-us/microsoft-365/copilot/microsoft-copilot-requirements)
- [Extensibility with plugins](https://learn.microsoft.com/en-us/microsoft-365/copilot/extensibility/)

## Review contract

The source map records an owner, review date and expiry for each reference.
Expired evidence fails content validation. Trust-critical pages also require an
exact-commit review before production publication. Pablo AI is the
Organization Steward automation used for that review, not an independent
auditor or certification of a customer's deployment. The deploy script checks
for a clean main branch and an operator-supplied approved commit; matching that
commit to the exact-head review remains an explicit delivery step.
