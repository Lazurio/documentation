---
title: Deset minut pro IT
description: Otázky, které by si IT mělo položit před schválením Lazuria.
stableId: lazurio-doc-it-administrators
locale: cs
summary: Stručný přehled účelu Lazuria, identity, přístupů, dat, integrací, provozu a hranic pro schvalování výsledků.
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
audience:
  - it-admin
  - decision-maker
  - agent
---

Lazurio dělá práci s AI řiditelnější: firemní práci drží ve verzovaných
repozitářích a odděluje přípravu výsledku od jeho zveřejnění. Lidé i agenti tak
mohou pracovat nad zdrojovými podklady a schválenými nástroji bez vymýšlení
druhé identity nebo dalšího systému oprávnění.

Dnes podporované nasazení běží z veřejné zdrojové pracovní kopie s Gitem a
Bunem. Obsahuje Launchpad, diagnostiku, provozní pravidla a experimentální CLI
v0. Není to spravovaná AI služba dodavatele, stabilní balíčkovaný instalátor ani
další sandbox kolem vybraného klienta agenta.

Při posuzování proto nestačí otázka „Vidí AI naše data?“ Ptejte se raději:
**Která identita pracuje, na jakém zařízení, v jaké Organizaci, přes který
schválený nástroj, s jakými daty a kdo smí výsledek zveřejnit?**

## Stručně

| Oblast | Jak je Lazurio navržené | Co má IT ověřit v konkrétním nasazení |
| --- | --- | --- |
| Identita | Agent pracuje s oprávněními přihlášeného Principála; samotným zadáním žádná další práva nezíská. | Správnost lidské nebo servisní identity, členství v repozitářích a vlastníka zařízení. |
| Oddělení firem | Jedna firma odpovídá jedné Organizaci a hranici přístupů v GitHubu; jedno zařízení je však stále jedna doména důvěry. | Připojené jsou jen zamýšlené repozitáře. Kde firmy nemají sdílet hranici operačního systému, použijte oddělená zařízení nebo rovnocennou izolaci. |
| Lokální pracovní prostředí | Práce vychází z lokálně stažených, verzovaných podkladů na zařízení Principála. | Zabezpečení zařízení, šifrování disku, dohled nad koncovými zařízeními, zálohování a odebrání přístupů odpovídají interním pravidlům. |
| Schválení výsledku | Výstup agenta je nejprve vratný návrh. Sloučení změny, nasazení, odeslání nebo jiné zveřejnění vyžaduje příslušné oprávnění. | Pravidla repozitářů, povinné kontroly a oprávnění k nasazení skutečně vynucují zamýšlený schvalovací postup. |
| Externí aplikace | Integrace se nastavují pro konkrétní zařízení, procházejí kontrolou a lze je samostatně odvolat. Přednost mají oficiální MCP servery a následně oficiální nástroje příkazové řádky. | U každého poskytovatele jsou schválené rozsahy oprávnění, datové toky, uchovávání dat i postup odebrání přístupu. |
| Přihlašovací a tajné údaje | Citlivé údaje patří do vyhrazených úložišť mimo Git a veřejnou dokumentaci. | Zvolené úložiště, obměna údajů, reakce na incident a kontrola úniků fungují i v praxi. |
| Audit | Commity, pull requesty, schválení a záznamy o nasazení dobře dokládají změny zdrojů; jejich pokrytí závisí na použitých nástrojích. | Potřebné záznamy existují v GitHubu, na koncových zařízeních, u poskytovatele modelu, v připojených aplikacích i v infrastruktuře pro nasazení. |

Jde o popis návrhových a procesních hranic, nikoli o bezpečnostní certifikaci.
Přesnou podobu produktu, zdroje a limity tvrzení drží na jednom místě
[Bezpečnost a podklady k ověření](/cs/public-evidence/), aby z každé
čtenářské stránky nevznikl právní dodatek.

## Ke kterým datům může Lazurio přistupovat?

Rozsah přístupu není pro všechna nasazení stejný. Závisí na identitě
Principála, použitém zařízení, oprávněních k repozitářům a zapnutých nástrojích.
Před nasazením zmapujte těchto pět míst:

1. Git repozitáře a Teamy dostupné přihlášené identitě.
2. Lokální soubory záměrně vložené do aktivního pracovního prostředí.
3. Externí aplikace připojené přes schválený MCP server nebo nástroj příkazové
   řádky.
4. Poskytovatele modelu a hostingu, které využívá zvolený klient a jednotlivé
   Moduly.
5. Volitelné hostované služby Lazuria, například Dashboard, týmový workspace
   nebo Resident/Buddy, pokud je konkrétní nasazení skutečně používá.

To, že Lazurio určitý typ integrace podporuje, ještě neznamená, že je v daném
prostředí zapnutý. Pro konkrétní nasazení si vyžádejte aktuální seznam
poskytovatelů, rozsahů oprávnění, vlastníků a postupů pro odebrání přístupu.

## Jak se brání nechtěnému zveřejnění nebo nasazení?

[Pravidla spolupráce v Lazuriu](https://github.com/HumanAndMachines/Lazurio/blob/3c5bda5d54c5556a0e54f3c339d988aa911fda60/AGENTS.md)
oddělují editovatelný návrh od okamžiku, kdy se výsledek skutečně zveřejní nebo
nasadí. Při vývoji se běžně pracuje na samostatné větvi a přes pull request.
Pravidla větví, povinné kontroly, review a oprávnění k merge mohou chránit
cílovou větev; odeslání review větve je přesto už přenos dat do GitHubu. Mimo
Git rozhodují oprávnění a potvrzení daného poskytovatele. Tam, kde technická
závora neexistuje, zůstává výslovné schválení procesním pravidlem.

Procesní pravidlo má být podpořené technickou kontrolou všude, kde ji platforma
umožňuje. V rámci přejímacího testu proto ověřte také zamítnutý přístup k
repozitáři, neschválený externí nástroj, pokus o sloučení do chráněné větve a
použití odvolaného přihlašovacího údaje. Samotné přečtení pravidel nestačí.

## Co si vyžádat před schválením

Před produkčním nasazením by měl provozovatel doložit:

- seznam Organizací, repozitářů a Teamů zahrnutých do nasazení;
- konkrétní lidské nebo servisní identity a jejich oprávnění v GitHubu;
- minimální požadavky na zabezpečení zařízení a lokálních dat;
- poskytovatele modelu a podmínky zpracování dat pro zvoleného klienta;
- seznam integrací včetně rozsahu oprávnění a vlastníka jejich odebrání;
- postupy pro správu citlivých údajů, zálohy, mazání dat a ukončení přístupu;
- pravidla chráněných větví a určení osob oprávněných ke schválení výsledku;
- zdroje auditních záznamů, dobu jejich uchování a kontakt pro incidenty;
- omezený pilot na datech a úkolech, které odpovídají zamýšlenému použití.

Pokud některý z těchto bodů není známý, patří mezi otevřené otázky konkrétního
nasazení. Architektonický záměr sám o sobě není důkazem, že je opatření opravdu
zapnuté.

## Doporučený postup

Začněte omezeným pilotem, pokud lze jednoznačně určit a otestovat identity,
repozitáře, integrace, poskytovatele modelu a schvalování výsledků. Plošné
nasazení neschvalujte pouze na základě tohoto přehledu. Podrobnosti najdete na
stránkách [Přístup k datům a bezpečnost](/cs/data-access-security/) a
[Nasazení a provoz](/cs/deployment-operations/).
