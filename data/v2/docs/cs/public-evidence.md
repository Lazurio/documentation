---
title: Bezpečnost a podklady k ověření
description: Veřejné zdroje, na nichž stojí tvrzení dokumentace o produktu, bezpečnosti a provozu Lazuria.
stableId: lazurio-doc-public-evidence
locale: cs
summary: Aktuální podoba produktu, hranice důvěry, oprávnění, integrace, hostované služby a limity toho, co lze z veřejných zdrojů doložit.
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
  - builder
  - agent
---

Tato stránka propojuje tvrzení dokumentace s revizí zdrojů Lazuria
[`3c5bda5d54c5556a0e54f3c339d988aa911fda60`](https://github.com/HumanAndMachines/Lazurio/tree/3c5bda5d54c5556a0e54f3c339d988aa911fda60).
Kanonické dokumenty jsou dnes v češtině. Tady je jejich srozumitelný průvodce
po bezpečnostně důležitých důsledcích — ne samostatný bezpečnostní audit ani
záruka pro konkrétní nasazení.

## Podoba produktu a jeho zralost

[README](https://github.com/HumanAndMachines/Lazurio/blob/3c5bda5d54c5556a0e54f3c339d988aa911fda60/README.md)
popisuje Lazurio jako lokální pracovní systém a koordinační vrstvu, nikoli jako
AI model nebo sdílené cloudové úložiště dat. Projekt je ve vývoji. Dnes se
spouští ze zdrojové pracovní kopie pomocí Gitu a Bunu; CLI v0 je experimentální
a jednoduchá balíčkovaná instalace i generovaný root bez Gitu patří do cílové
architektury.

Repozitář používá licenci
[FSL-1.1-Apache-2.0](https://github.com/HumanAndMachines/Lazurio/blob/3c5bda5d54c5556a0e54f3c339d988aa911fda60/LICENSE.md).
Povoluje interní použití, nekomerční vzdělávání a výzkum i profesionální služby
pro držitele odpovídající licence. Při povoleném použití lze software kopírovat,
měnit a šířit, pokud zůstane odkaz na licenci a autorská oznámení. „Competing
Use“ znamená komerční produkt nebo službu, která Lazurio, jiný produkt či službu
poskytovatele nahrazuje nebo nabízí stejnou či podstatně podobnou funkci.
Každá vydaná verze přechází po dvou letech na Apache 2.0 a software je
poskytován bez záruky. Licenční oznámení uvádí HumanAndMachine s.r.o. jako
držitele autorských práv. Samotná licence neslibuje hosting, podporu ani úroveň
služeb pro konkrétní nasazení.

## Identita a oprávnění

[Model spolupráce](https://github.com/HumanAndMachines/Lazurio/blob/3c5bda5d54c5556a0e54f3c339d988aa911fda60/AGENTS.md)
označuje jako Principála člověka nebo dlouhodobější AI identitu, pro niž se
práce vykonává. Task Agent je dočasná pracovní relace a nemá vlastní nezávislá
oprávnění. Prompt nemůže udělit přístup k repozitáři ani schopnost poskytovatele:
rozhodující jsou živá oprávnění v GitHubu, operačním systému a jednotlivých
službách.

To neznamená, že Task Agent nic nezmůže. Přihlašovací údaj, repozitář nebo
soubor, který už jeho proces vidí, může využít v mezích zvoleného klienta a
operačního systému. Pravidla Lazuria vymezují zamýšlené použití; technické
vynucení zajišťuje sandbox klienta a kontroly poskytovatele.

## Hranice zařízení a Organizace

[README](https://github.com/HumanAndMachines/Lazurio/blob/3c5bda5d54c5556a0e54f3c339d988aa911fda60/README.md)
a [architektura](https://github.com/HumanAndMachines/Lazurio/blob/3c5bda5d54c5556a0e54f3c339d988aa911fda60/ARCHITECTURE.md)
pracují s jedním zařízením jako s jednou doménou důvěry. Organizace představuje
jednu firmu, jednu GitHub organizaci a samostatnou hranici repozitářů a
přístupů. Na jednom zařízení může být více Organizací, jejich adresáře však
nejsou samostatné OS tenancy: proces se stejným účinným přístupem k souborům
může hranici adresářů překročit. Kde firmy nemají sdílet hranici operačního
systému, je potřeba oddělené zařízení nebo rovnocenná infrastruktura.

Personalspace patří jednomu Principálovi. Není to společné úložiště Organizace
ani zkratka pro přesun firemních dat přes přístupové hranice. Jde o hranici
přístupu a procesu; bez dalšího opatření konkrétního nasazení se nemá popisovat
jako kryptografické oddělení.

## Návrh a zveřejnění

[Model spolupráce](https://github.com/HumanAndMachines/Lazurio/blob/3c5bda5d54c5556a0e54f3c339d988aa911fda60/AGENTS.md)
rozlišuje Návrh — vratnou, upravitelnou práci — a Zveřejnění, tedy okamžik, kdy
se výsledek stává účinným navenek nebo se těžko vrací. Agent smí vytvořit větev,
commit a pull request, pokud mu to dovolují práva repozitáře. Zveřejnění do
chráněné větve může GitHub technicky bránit pomocí oprávnění, povinných kontrol
a review. Odeslání zprávy nebo změna nastavení u jiného poskytovatele závisí na
jeho skutečných kontrolách a na klientovi; tam, kde technická závora neexistuje,
je výslovné schválení pouze procesní pravidlo.

## Externí aplikace a přihlašovací údaje

[Standard integrací](https://github.com/HumanAndMachines/Lazurio/blob/3c5bda5d54c5556a0e54f3c339d988aa911fda60/manual/external-app-integrations.md)
upřednostňuje oficiální MCP server běžící lokálně na zařízení, potom oficiální
CLI a následně prověřenou implementaci s pevně určenou verzí; prohlížeč je
záložní cesta. Každé zařízení má mít samostatně odvolatelné přihlašovací údaje
u poskytovatele. Nové konektory ChatGPT či claude.ai a sdílení přes hostovaný
broker do standardu nepatří, dříve nasazený konektor ale může být zaznamenán
jako přechodový stav. OAuth token je schopnost dané relace či zařízení a
schválení v MCP samo neomezuje přístup přes CLI ani shell.

[Standard úschovy tajných údajů](https://github.com/HumanAndMachines/Lazurio/blob/3c5bda5d54c5556a0e54f3c339d988aa911fda60/manual/security/local-secret-custody.md)
udržuje skutečné přihlašovací údaje mimo Git, v ignorovaných cestách vymezených
podle vlastníka nebo v povoleném úložišti poskytovatele. Netvrdí, že Lazurio
samo šifruje zařízení, obměňuje každý secret nebo nahrazuje zálohování a reakci
na incident.

## Lokální a hostované plochy

Zdrojová pracovní kopie obsahuje lokální root, Launchpad, Guide, CLI/Core,
Doctor a připojené moduly Organizací. Launchpad a spustitelné moduly používají
lokální HTTP listenery na loopbacku s dynamicky zvoleným nebo modulem vlastněným
portem. Vazba na loopback není ověření volajícího: jiné procesy na stejném
zařízení se k této ploše mohou dostat. Guide je výuková aplikace s lokálním
zápisem souborů, nikoli bezpečnostní kontrola. Současný Doctor předpokládá Git,
GitHub CLI a Codex CLI; nasazení s jiným klientem agenta musí otestovat vlastní
cestu přes Doctor a repair, nemá předpokládat stejnou funkčnost.

Zdrojová kopie obsahuje i kód pro bridge a provisionování samostatně
nasazovaných profilů; samotná přítomnost ve zdroji neznamená aktivaci. Mezi
volitelné části architektury patří Dashboard, hostované týmové workspaces a
služby Resident/Buddy pro jednotlivé vlastníky. Nasazení, které některou z
těchto služeb zapne, ji musí uvést jako samostatnou službu s vlastním
provozovatelem, identitou, úložištěm, sítí, zpracovateli, logy, retencí,
zálohami a pravidly mazání.

## Co tyto podklady nedokazují

- Nepotvrzují konkrétní nasazení zákazníka ani to, že má kontroly skutečně
  zapnuté.
- Nedávají univerzální příslib retence, trénování modelů ani regionu zpracování.
- Nezaznamenávají každé přečtení lokálního souboru, prompt ani volání API.
- Nemění adresáře Organizací na jednom zařízení v tvrdě oddělené tenancy.
- Neztotožňují procesní schválení s technickou kontrolou poskytovatele.

Pro promítnutí těchto podkladů do schválení konkrétního nasazení použijte
[přehled pro správce IT](/cs/it-administrators/).
