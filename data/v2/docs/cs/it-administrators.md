---
title: Přehled pro správce IT
description: Co by mělo IT o Lazuriu vědět a ověřit před jeho nasazením.
stableId: lazurio-doc-it-administrators
locale: cs
summary: Stručný přehled účelu Lazuria, přístupů, dat, integrací, provozu a schvalování výsledků.
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
  - decision-maker
  - agent
---

Lazurio je verzované pracovní prostředí pro lidi a AI agenty. Jeho cílem je,
aby při práci s AI zůstalo zřejmé, kde končí jedna firma, kdo má k čemu
přístup a kdo smí výsledek zveřejnit nebo nasadit. Návrh systému lze ověřit ve
veřejném [repozitáři Lazuria](https://github.com/HumanAndMachines/Lazurio/tree/69c53ec342124aef48cb9d04fd109f9886ec242e).

Při posuzování nestačí položit otázku „Vidí AI naše data?“. Je potřeba zjistit:
**Která identita pracuje, na jakém zařízení, v jaké Organizaci, přes kterou
schválenou integraci, s jakými daty a kdo smí výsledek schválit?**

## Stručně

| Oblast | Jak je Lazurio navržené | Co má IT ověřit v konkrétním nasazení |
| --- | --- | --- |
| Identita | Agent pracuje s oprávněními přihlášeného Principála; samotným zadáním žádná další práva nezíská. | Správnost lidské nebo servisní identity, členství v repozitářích a vlastníka zařízení. |
| Oddělení firem | Jedna firma odpovídá jedné Organizaci a samostatné hranici přístupů v GitHubu. Data různých Organizací se nemají míchat. | Připojené a dostupné jsou pouze zamýšlené repozitáře a Teamy. |
| Lokální pracovní prostředí | Práce vychází z lokálně stažených, verzovaných podkladů na zařízení Principála. | Zabezpečení zařízení, šifrování disku, dohled nad koncovými zařízeními, zálohování a odebrání přístupů odpovídají interním pravidlům. |
| Schválení výsledku | Výstup agenta je nejprve vratný návrh. Sloučení změny, nasazení, odeslání nebo jiné zveřejnění vyžaduje příslušné oprávnění. | Pravidla repozitářů, povinné kontroly a oprávnění k nasazení skutečně vynucují zamýšlený schvalovací postup. |
| Externí aplikace | Integrace se nastavují pro konkrétní zařízení, procházejí kontrolou a lze je samostatně odvolat. Přednost mají oficiální MCP servery a následně oficiální nástroje příkazové řádky. | U každého poskytovatele jsou schválené rozsahy oprávnění, datové toky, uchovávání dat i postup odebrání přístupu. |
| Přihlašovací a tajné údaje | Citlivé údaje patří do vyhrazených úložišť mimo Git a veřejnou dokumentaci. | Zvolené úložiště, obměna údajů, reakce na incident a kontrola úniků fungují i v praxi. |
| Audit | Commity, pull requesty, schválení a záznamy poskytovatelů vytvářejí auditní podklady. Jejich úplnost závisí na použitých nástrojích. | Potřebné záznamy existují v GitHubu, na koncových zařízeních, u poskytovatele modelu, v připojených aplikacích i v infrastruktuře pro nasazení. |

Jde o popis návrhových a procesních hranic, nikoli o bezpečnostní certifikaci.
Základní pravidla jsou veřejná: [model spolupráce](https://github.com/HumanAndMachines/Lazurio/blob/69c53ec342124aef48cb9d04fd109f9886ec242e/AGENTS.md),
[standard integrací](https://github.com/HumanAndMachines/Lazurio/blob/69c53ec342124aef48cb9d04fd109f9886ec242e/manual/external-app-integrations.md)
a [standard správy citlivých údajů](https://github.com/HumanAndMachines/Lazurio/blob/69c53ec342124aef48cb9d04fd109f9886ec242e/manual/security/local-secret-custody.md).

## Ke kterým datům může Lazurio přistupovat?

Rozsah přístupu není pro všechna nasazení stejný. Závisí na identitě
Principála, použitém zařízení, oprávněních k repozitářům a zapnutých nástrojích.
Před nasazením zmapujte zejména tato čtyři místa:

1. Git repozitáře a Teamy dostupné přihlášené identitě.
2. Lokální soubory záměrně vložené do aktivního pracovního prostředí.
3. Externí aplikace připojené přes schválený MCP server nebo nástroj příkazové
   řádky.
4. Poskytovatele modelu a hostingu, které využívá zvolený klient a jednotlivé
   Moduly.

To, že Lazurio určitý typ integrace podporuje, ještě neznamená, že je v daném
prostředí zapnutý. Pro konkrétní nasazení si vyžádejte aktuální seznam
poskytovatelů, rozsahů oprávnění, vlastníků a postupů pro odebrání přístupu.

## Jak se brání nechtěnému zveřejnění nebo nasazení?

[Pravidla spolupráce v Lazuriu](https://github.com/HumanAndMachines/Lazurio/blob/69c53ec342124aef48cb9d04fd109f9886ec242e/AGENTS.md)
oddělují editovatelný návrh od okamžiku, kdy se výsledek skutečně zveřejní nebo
nasadí. Při vývoji se běžně pracuje na samostatné větvi a přes pull request.
Oprávnění a pravidla větví v GitHubu zůstávají rozhodující; textové zadání je
nemůže rozšířit. U kroků mimo Git, například při odeslání zprávy nebo změně
nastavení u poskytovatele, stejnou hranici drží výslovné schválení a oprávnění
v dané službě.

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

Pokud některý z těchto bodů není známý, má být vedený jako otevřená otázka
konkrétního nasazení. Architektonický záměr sám o sobě není důkazem, že je dané
bezpečnostní opatření skutečně zavedené.

## Doporučený postup

Začněte omezeným pilotem, pokud lze jednoznačně určit a otestovat identity,
repozitáře, integrace, poskytovatele modelu a schvalování výsledků. Plošné
nasazení neschvalujte pouze na základě tohoto přehledu. Podrobnosti najdete na
stránkách [Přístup k datům a bezpečnost](/cs/data-access-security/) a
[Nasazení a provoz](/cs/deployment-operations/).
