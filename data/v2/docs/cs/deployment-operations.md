---
title: Nasazení a provoz
description: Co určuje Lazurio a co musí být rozhodnuto pro konkrétní rollout.
stableId: lazurio-doc-deployment-operations
locale: cs
summary: Naplánujte rollout Lazuria v oblastech identity, zařízení, repozitářů, Modulů, integrací, logů, záloh, aktualizací a offboardingu.
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
audience:
  - it-admin
  - builder
  - agent
---

Lazurio je framework s lokálními pracovními prostory a nezávisle vlastněnými
Moduly, ne jedna univerzální hostovaná topologie. Veřejná
[architektura](https://github.com/HumanAndMachines/Lazurio/blob/69c53ec342124aef48cb9d04fd109f9886ec242e/ARCHITECTURE.md)
definuje společný model. Záznam o rolloutu musí určit skutečná zařízení,
repozitáře, poskytovatele a nasazené služby dané Organizace.

## Komponenty, které je potřeba zahrnout

1. **Mašina Principála:** endpoint, na kterém pracuje Kolega nebo AI Kolega.
2. **Lazurio root:** lokální průvodce a spouštěcí plocha nad autorizovanými
   checkouty Organizací.
3. **Repozitář Organizace:** hranice firmy, její konfigurace a sdílené zdroje
   pravdy.
4. **Workspace Moduly:** aplikace s vlastním runtime kontraktem, závislostmi,
   kontrolami a cílem nasazení.
5. **GitHub:** identita pro repozitáře, Team granty, historie review a
   vynucování pravidel větví v dokumentovaném výchozím modelu.
6. **Execution klient a poskytovatel modelu:** vybírá je konkrétní nasazení a
   posuzují se podle vlastních obchodních a datových podmínek.
7. **Externí aplikace:** jednotlivě zapnuté MCP servery, CLI nebo browser
   workflow s oprávněními na straně poskytovatele.

Ne každý Modul musí běžet na veřejném serveru. Některé jsou lokální nástroje,
jiné interní služby a další publikují veřejnou plochu, jako je tento web.
Vlastnictví Modulů udržuje tyto volby explicitní.

## Postup rolloutu

### 1. Definujte Organizaci

Určete GitHub organizaci, repozitáře, Teamy, administrátory a vlastníka
offboardingu. Rozhodněte, která firemní data sem patří a která jsou vyloučená.

### 2. Schvalte minimální standard endpointu

Zdokumentujte podporované operační systémy, vlastnictví zařízení, šifrování,
zamykání obrazovky, aktualizace, monitoring endpointu, lokální zálohy, vzdálené
smazání a řešení incidentů. I mašina vlastněná Principálem potřebuje při práci
s firemními daty kontroly na úrovni firmy.

### 3. Vyberte execution poskytovatele

Zaznamenejte klienta, poskytovatele modelu, typ účtu, autentizaci, nakládání s
daty, retenci, telemetrii a smluvního vlastníka. Posouzení zopakujte při změně
klienta nebo úrovně účtu.

### 4. Zapněte jen nezbytné repozitáře a integrace

Začněte jedním ohraničeným use casem. Principálovi dejte jen repozitáře a
scope poskytovatelů, které potřebuje. Postupujte podle veřejného
[standardu externích aplikací](https://github.com/HumanAndMachines/Lazurio/blob/69c53ec342124aef48cb9d04fd109f9886ec242e/manual/external-app-integrations.md)
a otestujte odvolání přístupu.

### 5. Vynuťte pravidla Publikace

Nastavte ochranu větví, required checks a reviewery odpovídající repozitáři.
Určete obdobná schvalovací místa pro zprávy, infrastrukturu, billing, secrets
a destruktivní akce u poskytovatelů.

### 6. Proveďte akceptační cvičení

Dokažte běžný task, zamítnutý přístup, odvolání přihlašovacího údaje, selhání
CI, rollback, offboarding a eskalaci incidentu. Důkazy uložte spolu s
rozhodnutím o rolloutu.

## Aktualizace a rollback

Source Lazuria, konfigurace Organizace a každý Modul se verzují nezávisle.
Aktualizace mají fast-forwardnout čisté primární checkouty, projít deklarované
doctor/check gatey a vstoupit do produkce přes zrevidovaný přesný commit.
Rollback znamená návrat dotčeného repozitáře nebo deploymentu na předchozí
ověřenou revizi; nesmí potichu obnovit odvolané přihlašovací údaje ani
nahrazená oprávnění.

## Provozní otázky závisející na nasazení

- Kdo spravuje endpointy, GitHub Teamy a externí integrace?
- Který poskytovatel modelu a jaké podmínky účtu platí?
- Kde běží služby Modulů a ze kterých sítí jsou dostupné?
- Jaké logy existují a jak dlouho se uchovávají?
- Jak se lokální data a přihlašovací údaje zálohují, mažou a obnovují?
- Jaká doba odezvy je případně přislíbena?

Tyto odpovědi mají být součástí akceptačního balíčku konkrétního zákazníka.
Tato veřejná dokumentace je záměrně nevymýšlí.
