---
title: "Bezpečnost a podklady k ověření"
description: "Veřejné zdroje k produktovým a bezpečnostním tvrzením a hranice jejich platnosti."
stableId: lazurio-doc-public-evidence
locale: cs
summary: "Veřejné zdroje k produktovým a bezpečnostním tvrzením a hranice jejich platnosti."
updatedAt: "2026-10-24"
reviewedAt: "2026-10-24"
reviewOwner: Matej Suchanek
secondReviewOwner: Pablo AI
trustCritical: true
sourceRefs:
  - lazurio-external-apps-current
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

Části o produktu a architektuře vycházejí z revize zdrojů Lazuria
[`3c5bda5d54c5556a0e54f3c339d988aa911fda60`](https://github.com/HumanAndMachines/Lazurio/tree/3c5bda5d54c5556a0e54f3c339d988aa911fda60).
Zdrojové dokumenty této revize jsou v češtině. Níže najdete jejich shrnutí
a odkazy pro kontrolu. Nejde o nezávislý audit ani potvrzení bezpečnosti
konkrétní instalace.

Popis produktu níže se vztahuje k uvedené revizi, ne automaticky k nejnovějšímu
vydání. Při nasazení porovnejte tyto podklady s verzí, kterou skutečně používáte.

## Podoba produktu a jeho zralost

[README](https://github.com/HumanAndMachines/Lazurio/blob/3c5bda5d54c5556a0e54f3c339d988aa911fda60/README.md)
popisuje Lazurio jako lokální pracovní systém a koordinační vrstvu, nikoli jako
AI model nebo sdílené cloudové úložiště dat. Projekt je ve vývoji. V této revizi se
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

Agent může použít soubory a přihlášení dostupné jeho procesu. Pravidla
Lazuria určují, kdy je to dovoleno; technická omezení zajišťují operační
systém, sandbox AI nástroje a poskytovatel.

## Hranice zařízení a Organizace

[README](https://github.com/HumanAndMachines/Lazurio/blob/3c5bda5d54c5556a0e54f3c339d988aa911fda60/README.md)
a [architektura](https://github.com/HumanAndMachines/Lazurio/blob/3c5bda5d54c5556a0e54f3c339d988aa911fda60/ARCHITECTURE.md)
pracují s jedním zařízením jako s jednou doménou důvěry. Organizace představuje
jednu firmu, jednu GitHub organizaci a samostatnou hranici repozitářů a
přístupů. Na jednom zařízení může být více Organizací, jejich adresáře však
nejsou oddělená prostředí operačního systému: proces se stejným účinným přístupem k souborům
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

Tato část vychází z novějšího [standardu integrací](https://github.com/HumanAndMachines/Lazurio/blob/6416d27786296583baf08b75526cff225e2673f7/manual/external-app-integrations.md),
ověřeného 24. 10. 2026. Pro nové propojení stanovuje pořadí: oficiální MCP,
oficiální CLI, povolené Composio, prověřené open-source řešení a prohlížeč.
Executor spravuje MCP servery Prostředí; při práci s již připojenou aplikací
má její nástroj přednost před Executorem a Composiem.

Composio je jedinou povolenou výjimkou ze zákazu sdílených brokerů a musí být
pro dané Prostředí povolené. Uchovává tokeny a zpracovává obsah volání;
propojení patří účtu a organizaci v Composiu, nikoli automaticky jednomu
zařízení. Nové cloudové konektory, jiné sdílené brokery a scraping či
cookie-session servery standard nepovoluje. Už nasazený konektor může zůstat
přechodovým stavem.

Přístup k zápisu není souhlas se zveřejněním. OAuth token může použít proces,
který na něj dosáhne; schvalování v MCP neomezuje automaticky CLI ani shell.
Podrobnosti a otevřené otázky uvádí [návod k propojení aplikací](/cs/environment-app-connections/).

[Standard úschovy tajných údajů](https://github.com/HumanAndMachines/Lazurio/blob/3c5bda5d54c5556a0e54f3c339d988aa911fda60/manual/security/local-secret-custody.md)
udržuje skutečné přihlašovací údaje mimo Git. Netvrdí, že Lazurio samo šifruje
zařízení, obměňuje všechny údaje nebo nahrazuje zálohy a reakci na incident.

## Lokální a hostované služby

Zdrojová pracovní kopie obsahuje lokální root, Launchpad, Guide, CLI/Core,
Doctor a připojené moduly Organizací. Launchpad a spustitelné moduly používají
lokální HTTP listenery na loopbacku s dynamicky zvoleným nebo modulem vlastněným
portem. Vazba na loopback není ověření volajícího: jiné procesy na stejném
zařízení se k těmto službám mohou dostat. Lokální Guide obsažený v této revizi
Lazuria nabízí i zápis souborů; nejde o tento veřejný web dokumentace ani
o bezpečnostní kontrolu. Doctor v popsané revizi předpokládá Git,
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
