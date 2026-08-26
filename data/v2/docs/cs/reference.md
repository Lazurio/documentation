---
title: Veřejné zdroje
description: Sada důkazů použitá pro první verzi dokumentace Lazuria.
stableId: lazurio-doc-reference
locale: cs
summary: Prohlédněte si připnutý source Lazuria a aktuální stránky Microsoft Learn, které dokládají tvrzení o architektuře, bezpečnosti, soukromí a srovnání.
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

První verze používá veřejné a ověřitelné zdroje. Odkazy na Lazurio jsou
připnuté k přesné revizi source, která byla pro tuto dokumentaci posouzena.
Odkazy na Microsoft vedou k aktuální dokumentaci poskytovatele, protože se
služba v čase mění; kratší interval její revize vynucuje source mapa.

## Source Lazuria

- [Přehled projektu](https://github.com/HumanAndMachines/Lazurio/blob/69c53ec342124aef48cb9d04fd109f9886ec242e/README.md)
- [Architektura](https://github.com/HumanAndMachines/Lazurio/blob/69c53ec342124aef48cb9d04fd109f9886ec242e/ARCHITECTURE.md)
- [Model spolupráce, pravomocí a Publikace](https://github.com/HumanAndMachines/Lazurio/blob/69c53ec342124aef48cb9d04fd109f9886ec242e/AGENTS.md)
- [Standard integrací externích aplikací](https://github.com/HumanAndMachines/Lazurio/blob/69c53ec342124aef48cb9d04fd109f9886ec242e/manual/external-app-integrations.md)
- [Standard lokální správy secrets](https://github.com/HumanAndMachines/Lazurio/blob/69c53ec342124aef48cb9d04fd109f9886ec242e/manual/security/local-secret-custody.md)

## Dokumentace poskytovatele Microsoft

- [Architektura Microsoft 365 Copilotu](https://learn.microsoft.com/en-us/microsoft-365/copilot/microsoft-365-copilot-architecture)
- [Ochrana dat a audit](https://learn.microsoft.com/en-us/microsoft-365/copilot/microsoft-365-copilot-architecture-data-protection-auditing)
- [Data, soukromí a bezpečnost](https://learn.microsoft.com/en-us/microsoft-365/copilot/microsoft-365-copilot-privacy)
- [Požadavky](https://learn.microsoft.com/en-us/microsoft-365/copilot/microsoft-365-copilot-minimum-requirements)
- [Rozšiřitelnost](https://learn.microsoft.com/en-us/microsoft-365/copilot/extensibility/)

## Kontrakt review

Strojově čitelná metadata zdrojů žijí ve veřejném repozitáři v
`data/v2/source-map.json`. Každý záznam uvádí vlastníka, datum revize a termín
příští revize. Po expiraci zdroje validace obsahu selže, takže dokumentace
nemůže potichu vydávat staré chování poskytovatele za aktuální.

Bezpečnostně kritické stránky navíc uvádějí Pabla AI jako druhého reviewera.
Produkční Publikace vyžaduje schválení přesného Git commitu, ne obecný souhlas
se starší verzí Draftu.
