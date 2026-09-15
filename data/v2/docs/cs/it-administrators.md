---
title: Deset minut pro IT
description: Otázky, které by si IT mělo položit před schválením Lazuria.
stableId: lazurio-doc-it-administrators
locale: cs
summary: Stručný přehled účelu Lazuria, identity, přístupů, dat, integrací, provozu a hranic pro schvalování výsledků.
updatedAt: "2026-09-15"
reviewedAt: "2026-09-15"
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

Tento přehled vám pomůže připravit pilot Lazuria a určit, co musí provozovatel
doložit před nasazením. Lazurio používá Git repozitáře pro firemní podklady
a historii změn. Agent připravuje návrhy, jejich zveřejnění se schvaluje
zvlášť. Přístupy dál určují GitHub, operační systém a připojené služby.

Verze popsaná v odkazovaných zdrojích běží ze zdrojové pracovní kopie s Gitem a
Bunem. Obsahuje Launchpad, diagnostiku, provozní pravidla a experimentální CLI
v0. Není to spravovaná AI služba dodavatele, stabilní balíčkovaný instalátor ani
další sandbox kolem vybraného klienta agenta.

Při posuzování proto nestačí otázka „Vidí AI naše data?“ Ptejte se raději:
**Která identita pracuje, na jakém zařízení, v jaké Organizaci, přes který
schválený nástroj, s jakými daty a kdo smí výsledek zveřejnit?**

Volitelné hostované služby jsou samostatné služby; do seznamu součástí patří
jen tehdy, když je konkrétní nasazení zapne.

## Podklady pro rozhodnutí

| Položka | Stav podle odkazované revize veřejných zdrojů |
| --- | --- |
| Podoba produktu | Zdrojová pracovní kopie s Gitem a Bunem spravovaná technickým provozovatelem. Balíčkovaná instalace je budoucí cíl. |
| Vyspělost prostředí | Launchpad, Doctor a vybrané postupy modulů jsou dostupné; CLI v0 zůstává experimentální. |
| Licence | Zdrojový kód je dostupný pod [FSL-1.1-Apache-2.0](https://github.com/HumanAndMachines/Lazurio/blob/3c5bda5d54c5556a0e54f3c339d988aa911fda60/LICENSE.md). Na každou vydanou verzi se po dvou letech začne vztahovat Apache 2.0. |
| Záruky | Nepřislibujeme certifikaci, univerzální úroveň služby, dobu uchování dat ani jednotné uspořádání nasazení. Podpora a hosting se řeší pro konkrétní nasazení. |

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

Tabulka popisuje pravidla a kontroly, které je třeba ověřit; není bezpečnostní
certifikací. Odkazy na zdroje a omezení tohoto popisu najdete v části
[Bezpečnost a podklady k ověření](/cs/public-evidence/).

## Ke kterým datům může Lazurio přistupovat?

Rozsah přístupu není pro všechna nasazení stejný. Závisí na identitě
Principála, použitém zařízení, oprávněních k repozitářům a zapnutých nástrojích.
Před nasazením zmapujte těchto pět míst:

1. Git repozitáře a Teamy dostupné přihlášené identitě.
2. Lokální soubory v aktivním pracovním prostředí i jiné soubory, které klient dokáže přečíst.
3. Externí aplikace připojené přes schválený MCP server nebo nástroj příkazové
   řádky nebo schválený postup v prohlížeči.
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

### Kde se jednotlivé akce skutečně omezují

Lazurio nemění text pravidel v univerzální technickou zábranu. Rozhoduje
systém, který daný přístup poskytuje:

| Akce | Účinná kontrola |
| --- | --- |
| Čtení lokálního souboru | Oprávnění operačního systému, výběr pracovního prostředí a případný sandbox klienta. Čitelný soubor může klient odeslat poskytovateli modelu jako kontext úkolu. |
| Push větve nebo otevření pull requestu | Právo zápisu v GitHubu. Jde o návrh určený ke kontrole, ale soubory už byly přeneseny do GitHubu. |
| Sloučení nebo nasazení přesné revize | Pravidla větví, povinné kontroly, review, právo sloučit změny a schvalovací podmínky nasazení daného modulu. |
| Vytvoření nebo odeslání obsahu v externí službě | Přihlašovací údaj, rozsahy oprávnění a potvrzení u poskytovatele. Už návrh uložený u poskytovatele může znamenat přenos dat; pokud poskytovatel omezení technicky nevynucuje, výslovný souhlas zůstává procesním pravidlem. |

## Co si vyžádat před schválením

Před produkčním nasazením by měl provozovatel doložit:

- seznam Organizací, repozitářů, Teamů a zapnutých služeb zahrnutých do nasazení;
- konkrétní lidské nebo servisní identity a jejich oprávnění v GitHubu;
- minimální požadavky na zabezpečení zařízení a lokálních dat;
- poskytovatele modelu a podmínky zpracování dat pro zvoleného klienta;
- seznam integrací včetně rozsahu oprávnění a vlastníka jejich odebrání;
- postupy pro správu citlivých údajů, zálohy, mazání dat a ukončení přístupu;
- pravidla chráněných větví a určení osob oprávněných ke schválení výsledku;
- zdroje auditních záznamů, dobu jejich uchování a kontakt pro incidenty;
- postup návratu k předchozí verzi a omezený pilot, který ověří běžný úkol i skutečné zamítnutí nepovolených akcí.

Pokud některý z těchto bodů není známý, patří mezi otevřené otázky konkrétního
nasazení. Architektonický záměr sám o sobě není důkazem, že je opatření opravdu
zapnuté.

## Doporučený postup

Začněte omezeným pilotem, pokud lze jednoznačně určit a otestovat identity,
repozitáře, integrace, poskytovatele modelu a schvalování výsledků. Plošné
nasazení neschvalujte pouze na základě tohoto přehledu. Pilot ze zdrojové
pracovní kopie má jiná rizika podpory a správy změn než spravovaný produkt.
Podrobnosti najdete na
stránkách [Přístup k datům a bezpečnost](/cs/data-access-security/) a
[Nasazení a provoz](/cs/deployment-operations/).
