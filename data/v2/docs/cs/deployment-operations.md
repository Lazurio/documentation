---
title: Nasazení a provoz
description: Co určuje Lazurio a která rozhodnutí musí udělat provozovatel konkrétního nasazení.
stableId: lazurio-doc-deployment-operations
locale: cs
summary: Požadavky na identity, zařízení, repozitáře, Moduly, integrace, auditní záznamy, zálohy, aktualizace a odebrání přístupů.
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

Lazurio neurčuje jediný způsob hostování. Společný model kombinuje lokální
pracovní prostředí s Moduly, které lze provozovat a nasazovat samostatně.
Veřejná [architektura](https://github.com/HumanAndMachines/Lazurio/blob/69c53ec342124aef48cb9d04fd109f9886ec242e/ARCHITECTURE.md)
popisuje společná pravidla. Každá Organizace však musí zdokumentovat konkrétní
zařízení, repozitáře, poskytovatele a služby, které při svém nasazení používá.

## Součásti nasazení

1. **Zařízení Principála:** koncové zařízení, na kterém pracuje Kolega nebo AI
   Kolega.
2. **Kořen Lazuria:** lokální rozhraní a spouštěcí prostředí nad povolenými
   pracovními kopiemi Organizací.
3. **Repozitář Organizace:** hranice jedné firmy, její konfigurace a sdílené
   autoritativní podklady.
4. **Workspace Moduly:** aplikace s vlastními technickými podmínkami,
   závislostmi, kontrolami a cílem nasazení.
5. **GitHub:** systém identit a oprávnění pro repozitáře, Teamy, historii
   kontrol a vynucování pravidel větví v dokumentovaném výchozím modelu.
6. **Klient a poskytovatel AI modelu:** jejich výběr závisí na konkrétním
   nasazení a každý z nich má vlastní obchodní a datové podmínky.
7. **Externí aplikace:** jednotlivě povolené MCP servery, nástroje příkazové
   řádky nebo řízené postupy v prohlížeči s oprávněními u daného poskytovatele.

Ne každý Modul musí běžet na veřejném serveru. Některé Moduly jsou lokální
nástroje, jiné interní služby a další zpřístupňují veřejný web, například tuto
dokumentaci. O způsobu provozu se rozhoduje pro každý Modul samostatně.

## Doporučený postup nasazení

### 1. Vymezte Organizaci

Určete organizaci v GitHubu, repozitáře, Teamy, administrátory a vlastníka
procesu pro odebírání přístupů. Zároveň stanovte, která firemní data do
Organizace patří a která jsou z ní výslovně vyloučená.

### 2. Stanovte minimální zabezpečení zařízení

Zdokumentujte podporované operační systémy, vlastnictví zařízení, šifrování,
zamykání obrazovky, aktualizace, dohled nad koncovými zařízeními, lokální
zálohy, vzdálené smazání a reakci na incident. I zařízení vlastněné
Principálem musí při práci s firemními daty splňovat pravidla organizace.

### 3. Vyberte klienta a poskytovatele modelu

Zaznamenejte používaného klienta, poskytovatele modelu, typ účtu, způsob
přihlášení, pravidla pro zpracování a uchovávání dat, telemetrii a smluvního
vlastníka. Posouzení zopakujte při změně klienta, poskytovatele nebo typu účtu.

### 4. Povolte jen potřebné repozitáře a integrace

Začněte jedním jasně vymezeným scénářem. Principál má mít přístup pouze k
repozitářům a rozsahům oprávnění, které pro něj potřebuje. Postupujte podle
veřejného [standardu pro externí aplikace](https://github.com/HumanAndMachines/Lazurio/blob/69c53ec342124aef48cb9d04fd109f9886ec242e/manual/external-app-integrations.md)
a vyzkoušejte také odebrání přístupu.

### 5. Nastavte schvalování výsledků

Pro každý repozitář nastavte odpovídající ochranu větví, povinné kontroly a
schvalovatele. Obdobná schvalovací místa určete také pro odesílání zpráv,
změny infrastruktury, platby, práci s tajnými údaji a nevratné operace v
externích službách.

### 6. Proveďte přejímací testy

Ověřte běžný průběh úkolu, zamítnutý přístup, odvolání přihlašovacího údaje,
selhání CI, návrat k předchozí verzi, odebrání přístupů a eskalaci incidentu.
Výsledky testů uložte spolu s rozhodnutím o nasazení.

## Aktualizace a návrat k předchozí verzi

Zdrojové soubory Lazuria, konfigurace Organizace a jednotlivé Moduly se
verzují nezávisle. Aktualizace mají posunout čisté primární pracovní kopie
pouze na navazující commit, projít deklarovanými kontrolami `doctor` a
`check` a vstoupit do produkce z přesně určeného a zkontrolovaného commitu.
Při návratu k předchozí verzi se vrací pouze dotčený repozitář nebo nasazení.
Odvolané přihlašovací údaje ani nahrazená oprávnění se tím nesmějí obnovit.

## Otázky, které musí zodpovědět provozovatel

- Kdo spravuje koncová zařízení, Teamy v GitHubu a externí integrace?
- Který poskytovatel modelu a jaké podmínky účtu platí?
- Kde běží jednotlivé Moduly a ze kterých sítí jsou dostupné?
- Jaké auditní záznamy vznikají a jak dlouho se uchovávají?
- Jak se lokální data a přihlašovací údaje zálohují, mažou a obnovují?
- Jaká doba reakce je případně smluvně přislíbená?

Odpovědi patří do podkladů ke schválení konkrétního zákaznického nasazení.
Veřejná dokumentace je nemůže určit obecně za všechny provozovatele.
