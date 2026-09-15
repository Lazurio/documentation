---
title: Přístup k datům a bezpečnost
description: Bezpečnostní hranice Lazuria a kontroly, které musí projít konkrétní nasazení.
stableId: lazurio-doc-data-access-security
locale: cs
summary: Identity, oddělení Organizací, lokální soubory, integrace, tajné údaje, poskytovatelé modelů, auditní podklady a zbytková rizika.
updatedAt: "2026-09-15"
reviewedAt: "2026-09-15"
reviewOwner: Matej Suchanek
secondReviewOwner: Pablo AI
trustCritical: true
sourceRefs:
  - lazurio-architecture
  - lazurio-collaboration-model
  - lazurio-external-apps
  - lazurio-secret-custody
audience:
  - it-admin
  - decision-maker
  - agent
---

Před nasazením ověřte, pod jakým účtem agent pracuje, které soubory a služby
může použít a kdo schvaluje jeho výsledky. Samotné pokyny v chatu přístup
neomezí. Technickou ochranu zajišťují oprávnění operačního systému,
repozitářů a služeb a případný sandbox AI nástroje. Lazurio k nim nepřidává
vlastní univerzální sandbox.

## Hranice důvěry

Hranice důvěry určuje, kam může dosáhnout přístup nebo napadený proces.
Oddělené složky například pomáhají uspořádat práci, ale samy nezabrání
programu se stejnými právy číst jejich obsah.

### Principál a Task Agent

Task Agent pracuje jménem přihlášeného Principála a nemá vlastní oprávnění.
Prompt mu nevytvoří přístup k repozitáři ani ke službě. Text pravidel zároveň
neodebere schopnost, kterou už proces klienta má: čitelný soubor, aktivní
relace nebo zpřístupněný přihlašovací údaj mohou být pro klienta použitelné.

### Organizace

Organizace představuje hranici dat a přístupů jedné firmy. V dokumentovaném
modelu zůstávají jednotlivé Organizace oddělenými repozitáři a organizacemi v
GitHubu. Mezi nimi lze přenášet veřejné a obecně použitelné postupy, nikoli
tajné údaje, zákaznická data, obchodní strategii nebo soukromé vrstvy
konkrétní firmy. Jedno zařízení je však stále jedna doména důvěry: adresáře a
repozitáře nejsou izolací od jiného procesu se stejným přístupem v operačním
systému. Kde kompromitace nesmí překročit hranici firmy, použijte samostatná
zařízení nebo rovnocennou infrastrukturu.

### Personalspace

Personalspace je soukromý prostor jednoho Principála, nikoli sdílené firemní
úložiště. Firemní informace, které potřebují další Kolegové, patří do
schváleného úložiště Organizace. Personalspace nesmí sloužit k přenosu dat
mezi přístupovými hranicemi.

### Externí aplikace

[Standard integrací](https://github.com/HumanAndMachines/Lazurio/blob/3c5bda5d54c5556a0e54f3c339d988aa911fda60/manual/external-app-integrations.md)
upřednostňuje oficiální MCP server spravovaný lokálně, poté oficiální nástroj
příkazové řádky a následně zkontrolované open-source řešení s pevně určenou
verzí. Ovládání přes webový prohlížeč je až náhradní možnost. Každé
zařízení má používat samostatně odvolatelné přihlášení. Evidence nasazení smí
obsahovat názvy integrací a požadované rozsahy oprávnění, nikdy však skutečné
tajné údaje.

Nové konektory ChatGPT nebo claude.ai a sdílené hostované zprostředkovatele
tento model správy přístupů pro jednotlivá zařízení nepokrývá. Vzdálený MCP
provozovaný poskytovatelem může model splnit, pokud lze jeho konfiguraci a
token pro dané zařízení samostatně odvolat.

Úkol se zápisem může vyžadovat oprávnění ke čtení i zápisu u poskytovatele.
Jde o skutečný přístup: označení výstupu jako návrhu nezabrání přenosu dat
k poskytovateli.

### Tajné a přihlašovací údaje

[Standard správy tajných údajů](https://github.com/HumanAndMachines/Lazurio/blob/3c5bda5d54c5556a0e54f3c339d988aa911fda60/manual/security/local-secret-custody.md)
udržuje skutečné přihlašovací údaje mimo Git. Lokální úložiště jsou oddělená
podle vlastníka nebo Organizace a verzované soubory obsahují pouze schémata,
názvy proměnných a pokyny. Ochranu lokálních údajů, zařízení a záloh musí
zajistit pravidla konkrétní organizace; samotný standard ji negarantuje.
Skutečné úložiště musí chránit zabezpečení zařízení, zálohy, obměna
přihlašovacích údajů a postup při incidentu. Vedle vyhrazených cest mimo Git
lze použít schválené úložiště poskytovatele.

## Hrozby, které je potřeba otestovat

| Hrozba | Navržená ochrana | Přejímací test |
| --- | --- | --- |
| Zadání požaduje data jiné firmy | Oddělení Organizací a přístup pouze k vybranému kontextu | Ověřte zamítnutí v GitHubu pro identitu bez oprávnění a zvlášť otestujte hranici přístupu zvoleného klienta k lokálním souborům. |
| Agent se pokusí zveřejnit nebo nasadit neschválenou změnu | Oprávnění v GitHubu nebo jiné službě a výslovný souhlas Principála | Pokuste se změnu sloučit nebo nasadit bez potřebného oprávnění či kontroly. |
| Přihlašovací údaj se dostane do repozitáře | Vyhrazená úložiště mimo Git a skutečně zapnuté kontroly | Ověřte, které skenování je aktivní, a ve schváleném testovacím repozitáři vyzkoušejte neškodný testovací řetězec. |
| Integrace má příliš široká oprávnění | Rozsah oprávnění nastavený u poskytovatele a samostatné odvolání každého přístupu | Načtěte aktuální oprávnění OAuth nebo aplikace a jedno z nich odvolejte, aniž ovlivníte ostatní. |
| Prompt se pokusí změnit rozsah práce | Omezený kontext, skutečná oprávnění a schvalovací brány | Vložte neškodný canary a ověřte, že agent nerozšíří kontext ani nic nezveřejní bez příslušné brány. |
| Zařízení se ztratí | Zabezpečení zařízení, šifrování, odvolání přístupů a postup obnovy | Proveďte interní cvičení pro odchod uživatele nebo ztrátu zařízení. |
| Dokumentace přestane odpovídat chování systému | Odkazy na přesnou revizi zdrojů, data kontroly a validace v CI | Změňte použitý zdroj nebo nechte skončit jeho platnost a ověřte, že sestavení dokumentace selže. |

Kontroly tohoto repozitáře dokumentace zachycují úzký seznam známých
soukromých značek a vzorů lokálních cest. Nejde o obecné vyhledávání tajných
údajů, statickou analýzu kódu (SAST) ani ochranu před únikem dat (DLP) pro
všechny Organizace. Zaznamenejte skutečně zapnuté ochrany; test jednoho
repozitáře není zárukou pro celý produkt.

## Poskytovatel modelu a hostované služby

Vybrané prompty, soubory a výsledky nástrojů přenáší klient agenta a
poskytovatel modelu, nikoli Lazurio. V podkladech k nasazení pojmenujte také
klienta a způsob přihlášení.

Lazurio lze používat s různými klienty a poskytovateli AI modelů. Tato
dokumentace proto nemůže dát jeden obecný příslib ohledně uchovávání dat nebo
jejich využití k trénování. Provozovatel musí u konkrétního nasazení uvést
zvoleného poskytovatele, typ účtu, případný region, zapnutou telemetrii,
podmínky uchovávání dat a případnou dohodu o nulové retenci. Tyto vlastnosti se
od poskytovatele automaticky nepřenášejí na Lazurio jako celek.

Dashboard, hostovaný týmový workspace a osobní služby Resident/Buddy jsou
volitelné nebo se nasazují samostatně. U každé zapnuté služby určete
provozovatele, identitu, úložiště, síťovou cestu, zpracovatele dat, logy, dobu
uchování, zálohy, mazání a postup při incidentu. Přítomnost zdrojového kódu
nedokazuje, že služba běží.

## Požadavky na auditní stopu

V Gitu dohledáte změny souborů, pull requesty a schválení. Záznamy o nasazení
ukážou, která verze byla uvedena do provozu. Tyto záznamy ale samy nepokrývají
přečtení lokálních souborů, požadavky na model ani volání externích API.

U každého typu akce určete, kde se zaznamenává účet, cíl a výsledek a jak
dlouho záznam zůstane dostupný. Pokud log chybí, uveďte to v posouzení nasazení.

## Zbytkové riziko

Ani správně nastavená oprávnění nevyloučí všechny chyby. Oprávněný uživatel
může zveřejnit citlivou informaci, schválit škodlivou změnu nebo povolit
nástroji příliš široký přístup. Model se může řídit škodlivým obsahem a koncové
zařízení může být napadené. Už návrhová větev nebo návrh u poskytovatele může
přenášet data před konečným zveřejněním. Lazurio tato rozhodnutí vymezuje a zpřehledňuje,
ale nenahrazuje princip nejmenších oprávnění, zabezpečení zařízení, posouzení
dodavatelů, testování ani odpovědnost lidí. Přesné veřejné zdroje a jejich
limity najdete v části [Bezpečnost a podklady k ověření](/cs/public-evidence/).
