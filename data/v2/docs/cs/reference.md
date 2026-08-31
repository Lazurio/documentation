---
title: Použité zdroje
description: Veřejné podklady, na kterých stojí technická a bezpečnostní tvrzení dokumentace.
stableId: lazurio-doc-reference
locale: cs
summary: Přesná revize zdrojů Lazuria a aktuální stránky Microsoft Learn použité pro architektonická, bezpečnostní a srovnávací tvrzení.
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

Dokumentace stojí na veřejných a ověřitelných podkladech. Odkazy na Lazurio
vedou na přesnou posouzenou revizi repozitáře. Odkazy na Microsoft míří do
aktuální dokumentace poskytovatele, protože jeho služby se průběžně mění a
vyžadují pravidelnou kontrolu.

## Zdrojové materiály Lazuria

- [Přehled projektu](https://github.com/HumanAndMachines/Lazurio/blob/3c5bda5d54c5556a0e54f3c339d988aa911fda60/README.md)
- [Licence](https://github.com/HumanAndMachines/Lazurio/blob/3c5bda5d54c5556a0e54f3c339d988aa911fda60/LICENSE.md)
- [Architektura](https://github.com/HumanAndMachines/Lazurio/blob/3c5bda5d54c5556a0e54f3c339d988aa911fda60/ARCHITECTURE.md)
- [Pravidla spolupráce, oprávnění a schvalování výsledků](https://github.com/HumanAndMachines/Lazurio/blob/3c5bda5d54c5556a0e54f3c339d988aa911fda60/AGENTS.md)
- [Standard pro integrace externích aplikací](https://github.com/HumanAndMachines/Lazurio/blob/3c5bda5d54c5556a0e54f3c339d988aa911fda60/manual/external-app-integrations.md)
- [Standard lokální správy tajných údajů](https://github.com/HumanAndMachines/Lazurio/blob/3c5bda5d54c5556a0e54f3c339d988aa911fda60/manual/security/local-secret-custody.md)

## Dokumentace Microsoftu

- [Architektura Microsoft 365 Copilotu](https://learn.microsoft.com/en-us/microsoft-365/copilot/microsoft-365-copilot-architecture)
- [Ochrana dat a audit](https://learn.microsoft.com/en-us/microsoft-365/copilot/microsoft-365-copilot-architecture-data-protection-auditing)
- [Data, soukromí a bezpečnost](https://learn.microsoft.com/en-us/microsoft-365/copilot/microsoft-365-copilot-privacy)
- [Technické požadavky](https://learn.microsoft.com/en-us/microsoft-365/copilot/microsoft-365-copilot-minimum-requirements)
- [Možnosti rozšíření](https://learn.microsoft.com/en-us/microsoft-365/copilot/extensibility/)

## Kontrola aktuálnosti

Strojově čitelná mapa zdrojů leží ve veřejném repozitáři v souboru
`data/v2/source-map.json`. U každého zdroje uvádí odpovědnou osobu, datum
poslední kontroly a termín další kontroly. Jakmile platnost zdroje skončí,
validace obsahu selže; tvrzení se tak nesmí zveřejnit, dokud se zdroj znovu
neověří.

Bezpečnostně významné stránky uvádějí Pabla AI jako druhého reviewera.
Produkční zveřejnění je vázané na schválení konkrétního Git commitu; starší
souhlas se automaticky nevztahuje na pozdější úpravy.
