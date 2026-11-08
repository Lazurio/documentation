---
title: "Public references"
description: "Lazurio and Microsoft source links and how their review dates are tracked."
stableId: lazurio-doc-reference
locale: en
summary: "Lazurio and Microsoft source links and how their review dates are tracked."
updatedAt: "2026-11-08"
reviewedAt: "2026-11-08"
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

Lazurio links point to the specific repository revision used by this
documentation. Microsoft pages change over time; the source map records
when they were last checked. An editorial revision does not by itself update
that source review date.

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

- [Microsoft Copilot overview](https://learn.microsoft.com/en-us/copilot/plan/copilot-overview)
- [Data protection and auditing](https://learn.microsoft.com/en-us/copilot/plan/architecture-data-protection-auditing)
- [Data, privacy, and security](https://learn.microsoft.com/en-us/copilot/plan/microsoft-365-copilot-privacy)
- [Requirements](https://learn.microsoft.com/en-us/copilot/plan/microsoft-copilot-requirements)
- [Copilot plugins](https://learn.microsoft.com/en-us/microsoft-365/copilot/extensibility/plugins-overview)

## Review contract

The source map records an owner, review date and expiry for each reference.
Expired evidence fails content validation. Trust-critical pages also require an
exact-commit review before production publication. Pablo AI is the persona,
an Organization's agent account, used for that review, not an independent
auditor or certification of a customer's deployment. The deploy script checks
for a clean main branch and an operator-supplied approved commit; matching that
commit to the exact-head review remains an explicit delivery step.
