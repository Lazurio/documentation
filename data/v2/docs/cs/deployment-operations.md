---
title: Nasazení a provoz
description: Co je v Lazuriu dané a co musí rozhodnout provozovatel konkrétního nasazení.
stableId: lazurio-doc-deployment-operations
locale: cs
summary: Postup zavedení Lazuria přes identity, zařízení, repozitáře, moduly, integrace, logy, zálohy, aktualizace a odebírání přístupů.
updatedAt: "2026-08-31"
reviewedAt: "2026-08-31"
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

Lazurio je software provozovaný vývojářem nad lokálními pracovními kopiemi a
samostatně vlastněnými moduly, nikoli jedna univerzální hostovaná topologie.
Záznam o nasazení proto musí pojmenovat skutečná zařízení, repozitáře, klienta
agenta, poskytovatele modelu, integrace a hostované služby, které Organizace
opravdu používá.

## Součásti nasazení

1. **Zařízení Principála:** koncové zařízení, na kterém pracuje Kolega nebo AI
   Kolega.
2. **Lokální root Lazuria:** rozhraní a spouštěcí prostředí nad povolenými
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

Ne každý modul musí běžet na veřejném serveru. Některé jsou lokální nástroje,
jiné interní služby a další zpřístupňují veřejný web, například tuto
dokumentaci. O způsobu provozu se rozhoduje pro každý modul samostatně.

## Postup zavedení

### 1. Vymezte Organizaci

Určete organizaci v GitHubu, repozitáře, Teamy, administrátory a vlastníka
procesu pro odebírání přístupů. Zároveň stanovte, která firemní data do
Organizace patří a která jsou z ní výslovně vyloučená.

### 2. Stanovte minimální zabezpečení zařízení

Zdokumentujte vlastnictví zařízení, šifrování, aktualizace, dohled nad
koncovými zařízeními, lokální zálohy, vzdálené smazání a reakci na incident.
Rozumným výchozím bodem je jedna Organizace na zařízení. Více Organizací na
jednom zařízení je vědomá výjimka uvnitř jedné domény důvěry, ne tvrdé oddělení
tenantů. I zařízení vlastněné Principálem musí při práci s firemními daty
splňovat pravidla Organizace.

### 3. Vyberte klienta a poskytovatele modelu

Zaznamenejte používaného klienta, poskytovatele modelu, typ účtu, způsob
přihlášení, pravidla pro zpracování a uchovávání dat, telemetrii a smluvního
vlastníka. Posouzení zopakujte při změně klienta, poskytovatele nebo typu účtu.

### 4. Povolte jen potřebné repozitáře a integrace

Začněte jedním jasně vymezeným scénářem. Principál má mít přístup pouze k
repozitářům a rozsahům oprávnění, které pro něj potřebuje. Postupujte podle
veřejného [standardu pro externí aplikace](https://github.com/HumanAndMachines/Lazurio/blob/3c5bda5d54c5556a0e54f3c339d988aa911fda60/manual/external-app-integrations.md)
a vyzkoušejte také odebrání přístupu.

### 5. Nastavte schvalování výsledků

Pro každý repozitář nastavte ochranu větví, povinné kontroly a review. U zpráv,
infrastruktury, plateb, tajných údajů a nevratných operací pojmenujte skutečné
oprávnění nebo potvrzení na straně poskytovatele. Pokud žádné neexistuje,
označte pravidlo poctivě jako procesní.

### 6. Proveďte přejímací testy

Ověřte běžný průběh úkolu, zamítnutý přístup, odvolání přihlašovacího údaje,
selhání CI, návrat k předchozí verzi, odebrání přístupů a eskalaci incidentu.
Výsledky testů uložte spolu s rozhodnutím o nasazení.

## Aktualizace a návrat k předchozí verzi

Zdrojové soubory Lazuria, konfigurace Organizace a jednotlivé moduly se
verzují nezávisle. Aktualizace mají posouvat čisté primární pracovní kopie,
projít deklarovanými kontrolami a vstoupit do produkce z přesně určeného
reviewovaného commitu. Návrat k předchozí verzi se týká jen dotčeného
repozitáře nebo nasazení; nesmí obnovit odvolané přihlašovací údaje ani
zastaralá oprávnění.

## Otázky, které musí zodpovědět provozovatel

- Kdo spravuje koncová zařízení, Teamy v GitHubu a externí integrace?
- Který poskytovatel modelu a jaké podmínky účtu platí?
- Kde běží jednotlivé moduly a ze kterých sítí jsou dostupné?
- Jaké auditní záznamy vznikají a jak dlouho se uchovávají?
- Jak se lokální data a přihlašovací údaje zálohují, mažou a obnovují?
- Jaká doba reakce je případně smluvně přislíbená?

Odpovědi patří do podkladů ke schválení konkrétního nasazení. Veřejná
dokumentace je nemůže poctivě vymyslet za každého provozovatele.
