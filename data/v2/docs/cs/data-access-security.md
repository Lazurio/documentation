---
title: Přístup k datům a bezpečnost
description: Bezpečnostní hranice Lazuria a kontroly, které je nutné ověřit v konkrétním nasazení.
stableId: lazurio-doc-data-access-security
locale: cs
summary: Jak v Lazuriu fungují identity, oddělení Organizací, lokální soubory, integrace, tajné údaje, poskytovatelé modelů a auditní záznamy.
updatedAt: "2026-08-26"
reviewedAt: "2026-08-26"
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

Bezpečnost AI agenta nelze zajistit jen instrukcemi v zadání. Rozhodují
skutečná oprávnění přihlášené identity, zabezpečení zařízení, dostupné
repozitáře a nástroje, správa tajných údajů a kontroly před zveřejněním nebo
nasazením. Veřejná [pravidla spolupráce](https://github.com/HumanAndMachines/Lazurio/blob/69c53ec342124aef48cb9d04fd109f9886ec242e/AGENTS.md)
popisují zamýšlené hranice. U každého konkrétního nasazení je však nutné
ověřit, že jsou tato pravidla skutečně zavedená.

## Hranice důvěry

### Principál a Task Agent

Task Agent pracuje jménem přihlášeného Principála. Samotné zadání mu nemůže
udělit další oprávnění. Skutečný rozsah přístupu závisí na relacích v zařízení
Principála, oprávněních k repozitářům a přihlašovacích údajích jednotlivých
služeb. Kontrola přístupů a jejich odebrání při odchodu uživatele proto musí
zahrnout všechny tyto systémy.

### Organizace

Organizace představuje hranici dat a přístupů jedné firmy. V dokumentovaném
modelu zůstávají jednotlivé Organizace oddělenými repozitáři a organizacemi v
GitHubu. Mezi nimi lze přenášet veřejné a obecně použitelné postupy, nikoli
tajné údaje, zákaznická data, obchodní strategii nebo soukromé vrstvy
konkrétní firmy. Toto oddělení je požadavek návrhu; jeho skutečné vynucení je
nutné ověřit při nasazení.

### Personalspace

Personalspace je soukromý prostor jednoho Principála, nikoli sdílené firemní
úložiště. Firemní informace, které potřebují další Kolegové, patří do
schváleného úložiště Organizace. Personalspace nesmí sloužit k přenosu dat
mezi přístupovými hranicemi.

### Externí aplikace

[Standard integrací](https://github.com/HumanAndMachines/Lazurio/blob/69c53ec342124aef48cb9d04fd109f9886ec242e/manual/external-app-integrations.md)
upřednostňuje oficiální MCP server spravovaný lokálně, poté oficiální nástroj
příkazové řádky a následně zkontrolované open-source řešení s pevně určenou
verzí. Ovládání přes webový prohlížeč je až náhradní možnost. Každé
zařízení má používat samostatně odvolatelné přihlášení. Evidence nasazení smí
obsahovat názvy integrací a požadované rozsahy oprávnění, nikdy však skutečné
tajné údaje.

### Tajné a přihlašovací údaje

[Standard správy tajných údajů](https://github.com/HumanAndMachines/Lazurio/blob/69c53ec342124aef48cb9d04fd109f9886ec242e/manual/security/local-secret-custody.md)
udržuje skutečné přihlašovací údaje mimo Git. Lokální úložiště jsou oddělená
podle vlastníka nebo Organizace a verzované soubory obsahují pouze schémata,
názvy proměnných a pokyny. Ochranu lokálních údajů, zařízení a záloh musí
zajistit pravidla konkrétní organizace; samotný standard ji negarantuje.

## Hrozby, které je potřeba otestovat

| Hrozba | Navržená ochrana | Přejímací test |
| --- | --- | --- |
| Zadání požaduje data jiné firmy | Oddělení Organizací a přístup pouze k vybranému kontextu | Pokuste se o přístup bez oprávnění a ověřte zamítnutí i použitelný auditní záznam. |
| Agent se pokusí zveřejnit nebo nasadit neschválenou změnu | Oprávnění v GitHubu nebo jiné službě a výslovný souhlas Principála | Pokuste se změnu sloučit nebo nasadit bez potřebného oprávnění či kontroly. |
| Přihlašovací údaj se dostane do repozitáře | Vyhrazená úložiště mimo Git, automatická kontrola veřejného obsahu a kontrola změn | Vložte neškodný testovací řetězec odpovídající formátu tokenu a ověřte, že kontrola selže. |
| Integrace má příliš široká oprávnění | Rozsah oprávnění nastavený u poskytovatele a samostatné odvolání každého přístupu | Načtěte aktuální oprávnění OAuth nebo aplikace a jedno z nich odvolejte, aniž ovlivníte ostatní. |
| Zařízení se ztratí | Zabezpečení zařízení, šifrování, odvolání přístupů a postup obnovy | Proveďte interní cvičení pro odchod uživatele nebo ztrátu zařízení. |
| Dokumentace přestane odpovídat chování systému | Odkazy na přesnou revizi zdrojů, data kontroly a validace v CI | Změňte použitý zdroj nebo nechte skončit jeho platnost a ověřte, že sestavení dokumentace selže. |

## Poskytovatel modelu

Lazurio lze používat s různými klienty a poskytovateli AI modelů. Tato
dokumentace proto nemůže dát jeden obecný příslib ohledně uchovávání dat nebo
jejich využití k trénování. Provozovatel musí u konkrétního nasazení uvést
zvoleného poskytovatele, typ účtu, případný region, zapnutou telemetrii,
podmínky uchovávání dat a případnou dohodu o nulové retenci. Tyto vlastnosti se
od poskytovatele automaticky nepřenášejí na Lazurio jako celek.

## Požadavky na auditní stopu

Historie v Gitu, pull requesty, schválení konkrétního commitu a záznamy o
nasazení poskytují podrobné podklady pro změny ve zdrojových souborech.
Automaticky však nezachytí každý požadavek na model, přečtení lokálního souboru
nebo volání API třetí strany. Pro každou zapnutou oblast proto určete, který
systém zaznamenává identitu, provedenou akci, její cíl, výsledek a dobu
uchování záznamu.

## Zbytkové riziko

Ani správně nastavená oprávnění nevyloučí všechny chyby. Oprávněný uživatel
může zveřejnit citlivou informaci, schválit škodlivou změnu nebo povolit
nástroji příliš široký přístup. Model může vytvořit chybný obsah a koncové
zařízení může být napadené. Lazurio pomáhá tato rozhodnutí vymezit a usnadňuje
jejich kontrolu, ale nenahrazuje princip nejmenších oprávnění, zabezpečení
zařízení, posouzení dodavatelů, testování ani odpovědnost lidí.
