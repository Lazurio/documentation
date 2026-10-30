---
title: "Použité zdroje"
description: "Odkazy na zdroje Lazuria a Microsoftu a pravidla jejich ověřování."
stableId: lazurio-doc-reference
locale: cs
summary: "Odkazy na zdroje Lazuria a Microsoftu a pravidla jejich ověřování."
updatedAt: "2026-10-30"
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

Tyto podklady popisují současné vydání Platformu a pravidla Integrací.
Revize zdroje určuje, co bylo ověřeno; sama nepotvrzuje, že na ní běží každé
nasazení. Datum „Poslední aktualizace“ pod názvem stránky označuje poslední
úpravu jejího obsahu. Neznamená, že proběhla nová věcná kontrola. Datum věcné
kontroly najdete jako `reviewedAt` v metadatech zdrojové stránky a v indexu
obsahu. Podmínky externích poskytovatelů se mohou měnit.

<span id="zdrojové-materiály-lazuria"></span>

## Zdroje Lazuria

- [Vydání Platformu v0.1.14](https://github.com/Lazurio/LazurioPlatform/releases/tag/v0.1.14)
- [Instalovaný produkt](https://github.com/Lazurio/LazurioPlatform/blob/v0.1.14/README.md)
- [Elastic License 2.0](https://github.com/Lazurio/LazurioPlatform/blob/v0.1.14/LICENSE) a [hranice licence](https://github.com/Lazurio/LazurioPlatform/blob/v0.1.14/docs/licensing.md)
- [Integrace a rozsah schvalování](https://github.com/Lazurio/LazurioPlatform/blob/v0.1.14/docs/integrations.md)
- [Synchronizace obsahu](https://github.com/Lazurio/LazurioPlatform/blob/v0.1.14/docs/content-sync.md)
- [Schválená pravidla Integrací včetně dodatku z 27. října](https://github.com/HumanAndMachines/Lazurio/blob/b41fc7d01f748ebc4724535ce811ffceded38fdb/manual/external-app-integrations.md)

## Dokumentace Microsoftu

- [Architektura Microsoft Copilotu](https://learn.microsoft.com/en-us/microsoft-365/copilot/microsoft-365-copilot-architecture)
- [Ochrana dat a audit](https://learn.microsoft.com/en-us/microsoft-365/copilot/microsoft-365-copilot-architecture-data-protection-auditing)
- [Data, soukromí a bezpečnost](https://learn.microsoft.com/en-us/microsoft-365/copilot/microsoft-365-copilot-privacy)
- [Technické požadavky](https://learn.microsoft.com/en-us/microsoft-365/copilot/microsoft-copilot-requirements)
- [Rozšíření pomocí pluginů](https://learn.microsoft.com/en-us/microsoft-365/copilot/extensibility/)

## Kontrola aktuálnosti

Soubor `data/v2/source-map.json` ve veřejném repozitáři uvádí u každého
zdroje odpovědnou osobu a data poslední i příští kontroly. Jakmile platnost zdroje skončí,
validace obsahu selže; tvrzení se tak nesmí zveřejnit, dokud se zdroj znovu
neověří.

Bezpečnostně významné stránky uvádějí Pabla AI jako druhého reviewera.
Produkční zveřejnění je vázané na schválení konkrétního Git commitu; starší
souhlas se automaticky nevztahuje na pozdější úpravy.
