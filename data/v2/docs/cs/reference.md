---
title: Použité zdroje
description: Veřejné podklady, ze kterých vycházejí technická a bezpečnostní tvrzení v dokumentaci.
stableId: lazurio-doc-reference
locale: cs
summary: Přehled konkrétních revizí zdrojů Lazuria a aktuálních stránek Microsoft Learn použitých při přípravě dokumentace.
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

Dokumentace vychází z veřejně dostupných a ověřitelných podkladů. Odkazy na
Lazurio vedou na přesnou revizi repozitáře, která byla při přípravě textu
posouzena. Odkazy na Microsoft směřují na aktuální dokumentaci poskytovatele,
protože se jeho služby průběžně mění a údaje je potřeba pravidelně ověřovat.

## Zdrojové materiály Lazuria

- [Přehled projektu](https://github.com/HumanAndMachines/Lazurio/blob/69c53ec342124aef48cb9d04fd109f9886ec242e/README.md)
- [Architektura](https://github.com/HumanAndMachines/Lazurio/blob/69c53ec342124aef48cb9d04fd109f9886ec242e/ARCHITECTURE.md)
- [Pravidla spolupráce, oprávnění a schvalování výsledků](https://github.com/HumanAndMachines/Lazurio/blob/69c53ec342124aef48cb9d04fd109f9886ec242e/AGENTS.md)
- [Standard pro integrace externích aplikací](https://github.com/HumanAndMachines/Lazurio/blob/69c53ec342124aef48cb9d04fd109f9886ec242e/manual/external-app-integrations.md)
- [Standard lokální správy tajných údajů](https://github.com/HumanAndMachines/Lazurio/blob/69c53ec342124aef48cb9d04fd109f9886ec242e/manual/security/local-secret-custody.md)

## Dokumentace Microsoftu

- [Architektura Microsoft 365 Copilotu](https://learn.microsoft.com/en-us/microsoft-365/copilot/microsoft-365-copilot-architecture)
- [Ochrana dat a audit](https://learn.microsoft.com/en-us/microsoft-365/copilot/microsoft-365-copilot-architecture-data-protection-auditing)
- [Data, soukromí a bezpečnost](https://learn.microsoft.com/en-us/microsoft-365/copilot/microsoft-365-copilot-privacy)
- [Technické požadavky](https://learn.microsoft.com/en-us/microsoft-365/copilot/microsoft-365-copilot-minimum-requirements)
- [Možnosti rozšíření](https://learn.microsoft.com/en-us/microsoft-365/copilot/extensibility/)

## Kontrola aktuálnosti

Strojově čitelná evidence zdrojů je uložená ve veřejném repozitáři v souboru
`data/v2/source-map.json`. U každého zdroje uvádí odpovědnou osobu, datum
poslední kontroly a termín další kontroly. Jakmile platnost zdroje skončí,
validace obsahu selže. Tím brání zveřejnění tvrzení založených na zdroji,
jehož aktuálnost nebyla znovu ověřena.

Bezpečnostně významné stránky uvádějí Pabla AI jako druhého reviewera.
Produkční zveřejnění je vázané na schválení konkrétního Git commitu; starší
souhlas se automaticky nevztahuje na pozdější úpravy.
