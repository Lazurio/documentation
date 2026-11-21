---
title: "Bezpečnost a podklady k ověření"
description: "Veřejné zdroje k produktovým a bezpečnostním tvrzením a hranice jejich platnosti."
stableId: lazurio-doc-public-evidence
locale: cs
summary: "Veřejné zdroje k produktovým a bezpečnostním tvrzením a hranice jejich platnosti."
updatedAt: "2026-11-21"
reviewedAt: "2026-11-06"
reviewOwner: Matej Suchanek
secondReviewOwner: Pablo AI
trustCritical: true
sourceRefs:
  - lazurio-user-roles-current
  - lazurio-onboarding-decision-register
  - lazurio-external-apps-0162
  - lazurio-decision-0162
  - lazurio-platform-folder-manual
  - lazurio-readme
  - lazurio-license
  - lazurio-platform-license
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

Vydaná Lazurio Platform místo toho používá
[Elastic License 2.0](https://github.com/Lazurio/LazurioPlatform/blob/fe72f68721e3f9968e8e52cee390af106f4e319c/LICENSE). Na Apache se automaticky nepřevádí.
Nabízet třetím stranám hostovanou nebo spravovanou službu, která zpřístupňuje
podstatnou část funkcí nebo funkcionality softwaru, vyžaduje samostatnou
smlouvu s poskytovatelem licence, i když je služba zdarma. Popis rozsahu
licence výslovně uvádí, že nejde o zákaz každého hostingu: osobní i interní
firemní použití, včetně pronajatého serveru nebo nasazení v interním cloudu,
je za podmínek licence povolené ([rozsah a oznámení](https://github.com/Lazurio/LazurioPlatform/blob/fe72f68721e3f9968e8e52cee390af106f4e319c/docs/licensing.md)).

## Identita a oprávnění

Současné [názvosloví uživatele a agentů](https://github.com/Lazurio/LazurioPlatform/blob/4681f49720fa7a6a7ceaac6ec07f8bd05d4e2193/docs/decisions.md#f30--the-operator-replaces-the-principal)
označuje jako uživatele člověka, se kterým a pro kterého agenti pracují. Má
poslední slovo. Podle [rozhodnutí 0089](https://github.com/Lazurio/LazurioPlatform/blob/fe72f68721e3f9968e8e52cee390af106f4e319c/docs/decision-register.md#0089--buddy-is-the-persons-trusted-personal-representative)
(anglicky) ho Buddy zastupuje v jeho oprávněních a v mandátech, které mu dá.
Task Agent je dočasná pracovní relace a nemá vlastní nezávislá oprávnění. Prompt nemůže udělit přístup k repozitáři ani schopnost poskytovatele:
rozhodující jsou živá oprávnění v GitHubu, operačním systému a jednotlivých
službách.

Agent může použít soubory a přihlášení dostupné jeho procesu. Pravidla
Lazuria určují, kdy je to dovoleno; technická omezení zajišťují operační
systém, poskytovatel a případný sandbox AI nástroje. V Prostředí Lazuria
pracují agenti s plným přístupem a bez sandboxu: podle
[rozhodnutí 0172](https://github.com/Lazurio/LazurioPlatform/blob/fe72f68721e3f9968e8e52cee390af106f4e319c/docs/decision-register.md#0172--agents-work-with-full-access-the-environment-is-the-boundary)
(anglicky) je hranicí Prostředí.

## Hranice zařízení a Organizace

[README](https://github.com/HumanAndMachines/Lazurio/blob/3c5bda5d54c5556a0e54f3c339d988aa911fda60/README.md)
a [architektura](https://github.com/HumanAndMachines/Lazurio/blob/3c5bda5d54c5556a0e54f3c339d988aa911fda60/ARCHITECTURE.md)
pracují s jedním zařízením jako s jednou doménou důvěry. Organizace představuje
jednu firmu, jednu GitHub organizaci a samostatnou hranici repozitářů a
přístupů. Na jednom zařízení může být více Organizací, jejich adresáře však
nejsou oddělená prostředí operačního systému: proces se stejným účinným přístupem k souborům
může hranici adresářů překročit. Kde firmy nemají sdílet hranici operačního
systému, je potřeba oddělené zařízení nebo rovnocenná infrastruktura.

Personalspace patří jednomu uživateli. Není to společné úložiště Organizace
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

Každá připojená aplikace má právě jednu cestu: vlastní nástroj, Executor
Prostředí, nebo Composio tam, kde je povolené, a agenti je používají v tomto
pořadí ([Integrace ve vydání v0.1.22](https://github.com/Lazurio/LazurioPlatform/blob/4e9c6b9bc25b4bc22d8555e1a2364a90dce8acbd/docs/integrations.md#the-path-rule)). Aplikaci připojuje
uživatel sám; agent připojení nikdy sám nezahajuje a vlastní MCP server patří
do Executoru jen na výslovný pokyn uživatele.

Composio je jedinou povolenou výjimkou ze zákazu sdílených brokerů a musí být
pro dané Prostředí povolené. Uchovává tokeny a zpracovává obsah volání;
propojení patří účtu a organizaci v Composiu, nikoli automaticky jednomu
zařízení. Nové konektory ChatGPT nebo claude.ai, jiné sdílené brokery
a scraping či cookie-session servery rozhodnutí 0162 nepovoluje. Aplikace a konektory ChatGPT
v harnessu agenti podle pravidla nepoužívají, dokud je nepovolí Organizace,
v Osobním Prostředí uživatel. V Prostředí na serveru pravidlo Lazurio podpírá
dvěma nastaveními v konfiguraci Codexu; aplikace zapnutá jménem a konfigurace,
kterou neumí přečíst, zůstávají beze změny a Lazurio je hlásí.

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
hostovaná Osobní Prostředí. V Osobním Prostředí běží Buddy uvnitř Lazuria jako
vlákno ve stejném T3 Code jako Chat, s nástroji Prostředí a pamětí v Brainu;
není to samostatná služba. Nasazení, které některou z
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
