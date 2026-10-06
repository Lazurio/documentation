---
title: Napojení Environmentu na externí aplikace
description: Jak operátor napojí Environment Lazuria na e-mail, kalendář a další aplikace, co s nimi pak agenti smějí dělat a jaké kompromisy s tím přijímá.
stableId: lazurio-doc-environment-app-connections
locale: cs
summary: O tom, kam Environment dosáhne, rozhoduje jeho operátor. Composio je součástí Lazuria všude, kde ho operátor zapne v Nastavení, přihlášení sahá všude, kam sahá účet, a možnost zapisovat není souhlas s Publikací.
updatedAt: "2026-10-06"
reviewedAt: "2026-10-06"
reviewOwner: Matej Suchanek
secondReviewOwner: Pablo AI
trustCritical: true
sourceRefs:
  - lazurio-decision-0162
  - lazurio-external-apps-0162
  - lazurio-composio-runbook
  - lazurio-platform-tools-decisions
  - lazurio-platform-environment-tools
  - lazurio-platform-decision-f19
  - lazurio-platform-release-v0-1-7
  - lazurio-platform-release-v0-1-8-rc-35
  - lazurio-platform-tools-screen-review
  - lazurio-platform-composio-write-gate-question
  - lazurio-platform-composio-custody-question
  - lazurio-platform-composio-shared-connections-question
  - composio-authentication
  - composio-token-custody
audience:
  - builder
  - it-admin
  - decision-maker
  - agent
---

Na které externí aplikace váš Environment dosáhne, rozhodujete vy. Agenti
v Environmentu jednají všude, kam sahají přihlášení na jeho Mašině. Centrálně se
nic nevynucuje. Než připojíte první aplikaci, přečtěte si,
[co tím přijímáte](#co-přijímáte-před-prvním-připojením), a ověřte si,
[co je dostupné dnes](#co-je-dostupné-dnes).

**Environment** je místo, kde pro vás pracují agenti. **Remote Environment**
je hostovaný Environment: váš osobní Remote Environment, nebo pracovní či
týmový Remote Environment Organizace. **Místní Environment** (Local
Environment) je počítač, u kterého právě sedíte. **Mašina** je počítač nebo
virtuální počítač, na kterém Environment běží. **Operátor** je člověk, který
Environment ovládá, a tím i agenty, kteří v něm pracují. Pravidla na této
stránce platí pro všechny druhy Environmentu.

## Model v kostce

Lazurio stojí na příkazové řádce. Příkaz `lazurio` a Launchpad jsou jeden
produkt nad jedním jádrem: starají se o nástroje Environmentu a říkají agentům,
jak se v něm pohybovat. Codex, Claude Code, `gh`, Composio i další nástroje
jsou programy příkazové řádky nainstalované a přihlášené na Mašině.
Environment proto zrcadlí svého operátora: pracujete-li pro více Organizací,
pracuje pro ně i váš Environment. Agenti v něm pracují s plným přístupem:
smějí všechno, co jim Environment dovolí, bez sandboxu a bez schvalování
jednotlivých příkazů. Potřebujete-li užší práva nebo oddělené kontexty,
založte další Environment a přihlaste v něm jiné účty.

## Kterou cestu zvolit

Cestu volíte vy a poslední slovo máte vy. GitHub CLI `gh` volitelný není;
potřebuje ho každý Environment.

Pro nové napojení navrhuje standard integrací Lazuria toto pořadí; vyhrává
první cesta, která funguje:

1. **oficiální MCP server** poskytovatele, vzdálený nebo provozovaný u vás;
2. **oficiální CLI** poskytovatele;
3. **Composio**, jediný schválený zprostředkovatel, když poskytovatel vhodný
   oficiální MCP server ani CLI nemá a Composio máte pro Environment zapnuté;
4. **prověřený open-source MCP server nebo CLI**, ukotvený na přesné vydání
   nebo commit, s ověřeným vydavatelem a licencí;
5. **prohlížeč** pod vaším dohledem, když nic z předchozího neexistuje.

V žádném kroku nejsou dovolené servery, které stahují obsah webu (scraping)
nebo znovu používají cookie relace prohlížeče, jiní sdílení zprostředkovatelé
než Composio, klíče a tokeny v chatu, Gitu nebo logu a nové konektory ChatGPT
nebo claude.ai. Konektor, který už je nainstalovaný, se používat smí.

Při práci agenti nejdřív použijí nástroje z katalogu, které jsou pro
Environment zapnuté, tak jak jim to říkají návody Folderu, a teprve potom MCP
servery.

## Katalog nástrojů

Katalog obsahuje nástroje, které smějí návody agentům jmenovat. Každý má
**úroveň** a **způsob nastavení**.

| Nástroj | Příkaz | Úroveň | Způsob nastavení |
| --- | --- | --- | --- |
| GitHub CLI | `gh` | Povinný: vždy zapnutý, nejde vypnout | Launchpad |
| Composio | `composio` | Doporučený | Launchpad |
| wacli | `wacli` | Volitelný | Launchpad |
| gogcli | `gog` | Volitelný | Agent |
| Neon CLI | `neon` | Volitelný | Agent |

- **Nastavení v Launchpadu** má připravenou instalaci a přihlášení, a to
  v Launchpadu i na příkazové řádce. Viz
  [připojení nástroje](#připojení-nástroje).
- **Nastavení s agentem** vám dá připravený prompt. Zkopírujete ho do nového
  chatu s agentem; agent nástroj nainstaluje a provede vás přihlášením.

Každá položka katalogu popisuje cílový stav své instalace. Ten popis je
návodem pro agenta: když připravená instalace selže, Lazurio nabídne
připravený prompt a agent podle něj instalaci dokončí.

## Připojení nástroje

V Launchpadu otevřete **Nastavení → Nástroje**. Každý nástroj tu má řádek se
svým skutečným názvem, jednou větou o tom, k čemu slouží, a stavem:
**Připojeno jako** a účet, nebo **Nepřipojeno**. Řádek nabízí jednu akci:

- **Přidat a připojit**, když nástroj ještě není nainstalovaný;
- **Připojit**, když je nainstalovaný, ale nepřihlášený;
- **Odpojit**, když je přihlášený;
- **Připojit s pomocí agenta** u nástroje, který nastavuje agent.

Stejný postup běží na příkazové řádce přes `lazurio tools install <tool>`,
`lazurio tools login <tool>` a `lazurio tools logout <tool>`.

Instalace proběhne pro aktuálního uživatele, bez administrátorských práv,
z oficiálního zdroje nástroje. Nástroje, který už funguje, se nedotkne. API
klíč nikdy nekopírujete a přihlášení můžete dokončit na libovolném zařízení:

- **`gh`** ukáže jednorázový kód a stránku GitHubu pro přihlášení zařízení.
  Otevřete stránku a kód zadejte. Lazurio pak propojí SSH klíč Mašiny
  s vaším účtem.
- **`composio`** ukáže odkaz. Otevřete ho a přihlaste se; potom zvolte
  organizaci v Composiu, která k tomuto Environmentu patří.
- **`wacli`** ukáže QR kód, který naskenujete ve WhatsAppu, nebo se místo toho
  spáruje přes vaše telefonní číslo.

Odpojení `gh` nebo `composio` zapomene přihlášení jen na této Mašině. Má-li
přístup skončit i u poskytovatele, zrušte ho i tam. Odpojení `wacli` zařízení
od účtu odpojí. Každé přihlášení na Mašině jde ukončit samostatně.

Připravené postupy běží na Linuxu a macOS. Na Windows se odmítnou a místo nich
se nabídne připravený prompt pro agenta.

## Co dělá přepínač „Používají agenti“

Každý řádek má přepínač **Používají agenti**. Nástroj, který v Launchpadu
připojíte, ho zapne sám, aby ho agenti mohli rovnou použít; vypnout ho můžete
zase vy. Na příkazové řádce mu odpovídají `lazurio tools enable`
a `lazurio tools disable`.

Nástroj, který agenti používají, se zapíše do návodů pro agenty v Lazurio
Folderu dané Mašiny. **Lazurio Folder** je složka, jejíž vygenerované
instrukce a manuál agenti čtou při startu. MCP servery se do Folderu nikdy
nezapisují; agenti je zjišťují ve svém vlastním nástroji.

Přepínač je kontext, ne oprávnění. Nedává žádný přístup, nic neinstaluje,
nikam nepřihlašuje a neurčuje verzi. Vypnutí nástroj z návodů odebere.
Neodhlásí vás ani neodpojí žádnou aplikaci: přístup odeberete odpojením
aplikace v Composiu nebo odpojením nástroje.

K nástroji, který agenti používají, můžete připsat krátkou poznámku, třeba
„zákaznickou poštu jen číst“, v podrobnostech nástroje nebo příkazem
`lazurio tools note`. Agenti ji čtou v manuálu Folderu. Poznámka je pokyn pro
agenty, ne technické omezení. Vypnutím nástroje se jeho poznámka odebere.

## Napojení aplikací přes Composio

Composio je součástí Lazuria na každém Environmentu, kde ho jeho operátor
zapne. Kde zapnuté není, agenti ho sami nezřizují: nabídnou vám jeho zapnutí,
nebo použijí ostatní cesty.

1. Rozhodněte, který Environment napojujete a jaký účet a jaká organizace
   v Composiu k němu patří.
2. V **Nastavení → Nástroje** zvolte na řádku Composia **Přidat a připojit**
   nebo **Připojit**, případně spusťte `lazurio tools login composio`.
   Otevřete zobrazený odkaz a přihlaste se do Composia. Žádný klíč se
   nezobrazí ani nekopíruje.
3. Zvolte organizaci v Composiu, která k tomuto Environmentu patří. Launchpad
   vám volbu nabídne po přihlášení; na příkazové řádce organizace vypíše
   `lazurio tools composio-org` a přepne je
   `lazurio tools composio-org switch <id>`.
4. Zkontrolujte, že je u Composia zapnutý přepínač **Používají agenti**.
5. Připojte jednotlivé aplikace. Požádejte agenta, který vám vrátí odkaz, nebo
   spusťte vlastní příkaz Composia `composio link <toolkit>`. Otevřete odkaz
   a přihlaste se přímo v aplikaci.
6. Ověřte, že je přihlášený zamýšlený účet a organizace. Ukáže je řádek
   Composia i příkaz `composio whoami`.
7. Pokud agenti nemají mít k aplikaci plný přístup, omezte připojení dřív,
   než jim svěříte práci.

### Účet Environmentu

U Composia patří připojené aplikace účtu a jeho organizaci v Composiu, ne
Mašině. Dvě Mašiny přihlášené stejným účtem a stejnou organizací by měly vidět
stejná připojení. Dokumentace Composia tomu nasvědčuje; Lazurio to zatím
neověřilo testem (viz [otevřená otázka](https://github.com/Lazurio/LazurioPlatform/issues/45)).
Berte proto přihlášení jako účet Environmentu. Má-li Mašina dosáhnout na méně,
přihlaste na ní jiný účet nebo jinou organizaci v Composiu.

### Týmové Environmenty

Týmový Remote Environment sdílejí členové Teamu, takže účty v něm přihlášené
patří celému Environmentu. Může je použít každý člen Teamu a každý agent
v něm.

- **GitHub.** Týmový Environment pracuje v GitHubu přes GitHub App Organizace,
  Lazurio for GitHub. Osobní účty GitHubu se v něm nepřihlašují.
- **Ostatní aplikace.** Přihlašujte jen týmové účty, třeba sdílenou schránku
  nebo kalendář, které smí používat každý v Teamu. Osobní účty připojte ve
  svém vlastním Environmentu. Launchpad na to před přihlášením upozorní
  a agent se před připojením aplikace zeptá, který týmový účet má připojit.

## Doporučení pro správce Organizace

Lazurio nevynucuje ani nesleduje, jak operátor Environment napojí.

- **Přehled o Composiu.** Organizace, která ho chce, si založí vlastní
  organizaci v Composiu, podobně jako zakládá organizaci na GitHubu, a požádá
  své operátory, aby se přihlašovali do ní. Taková organizace v Composiu je
  samostatně spravovaná služba mimo Lazurio Dashboard. Centrální přehled
  připojených účtů není cílem Lazuria, protože operátoři mohou aplikace
  napojit i jinými cestami.
- **Integrace sdílené celou Organizací** patří do jejího verzovaného katalogu
  integrací, a to přes pull request s kontrolou. Katalog drží příkazy, adresy
  a jména proměnných prostředí, nikdy jejich hodnoty. Je to doporučení
  a sdílená definice, ne povolovací brána: nástroj, který operátor používá jen
  ve svém Environmentu, se do něj nezapisuje.
- **Oprávnění jednotlivých Mašin.** Jejich správa z Dashboardu je pozdější
  záměr pro `gh` i Composio; zatím neexistuje.

## Zápisy a Publikace

Připojená aplikace je agentům k dispozici celá, včetně zápisu a mazání, dokud
ji neomezíte. Možnost zapisovat ale není souhlas s Publikací. Navenek viditelný
zápis, například odeslání e-mailu nebo změnu sdíleného kalendáře, provede agent
jen na pokyn operátora. Plný přístup uvnitř Environmentu na tom nic nemění.

Dnes je to pravidlo práce, které agenti dodržují. Zápis přes připojenou
aplikaci nezablokuje žádný mechanismus Lazuria; zda vlastní filtry Composia
platí na každé cestě, je
[otevřená otázka](https://github.com/Lazurio/LazurioPlatform/issues/39).

## Co přijímáte před prvním připojením

Tyto kompromisy jsou součástí modelu a jsou přijaté vědomě.

- **Tokeny a obsah volání drží třetí strana.** U Composia drží tokeny aplikací
  a obsah volání Composio, pokud Organizace neprovozuje vlastní instalaci.
  [Dokumentace Composia ke správě tokenů](https://docs.composio.dev/docs/security/token-custody),
  čtená 6. 10. 2026, uvádí, že ve výchozím cloudovém nasazení má přihlašovací
  údaje ve správě Composio. Jako alternativy popisuje nasazení v privátní síti
  VPC, vlastní provoz a šifrovací klíče ve správě zákazníka a uvádí, že
  s vlastní OAuth aplikací Composio tokeny připojených účtů dál ukládá. Lazurio
  tyto možnosti, jejich podmínky ani cenu neověřilo. Doba uchování logů, region
  provozu a podmínky zpracování dat jsou
  [otevřené otázky](https://github.com/Lazurio/LazurioPlatform/issues/40),
  na které Lazurio zatím neodpovědělo.
- **Přihlášení sahá všude, kam sahá účet.** Agenti mohou použít všechno, co
  přihlášený účet smí, nejen to, co potřebuje aktuální úkol.
- **Více Organizací na jedné Mašině je jeden Environment.** Agenti volí nástroj
  Organizace, pro kterou pracují, a nepřenášejí data mezi Organizacemi. Je to
  pravidlo práce, ne technická hranice. Kde hranice držet musí, použijte
  oddělené Environmenty.
- **Organizace nemá vynucený přehled.** Vidí jen to, co ukáže její vlastní
  organizace v Composiu, a to jen tehdy, když se do ní její operátoři
  přihlásí.

## Co je dostupné dnes

Stav k 6. 10. 2026 podle veřejného repozitáře
[LazurioPlatform](https://github.com/Lazurio/LazurioPlatform). Poslední
finální vydání je v0.1.7; verze v0.1.8 je ve fázi kandidátů na vydání.

| Schopnost | Stav | Doklad |
| --- | --- | --- |
| Katalog s úrovněmi a způsoby nastavení; `lazurio tools list`, `enable`, `disable`, `note` a `prompt`; nástroje v návodech Folderu; sekce Nástroje se stavem, přepínačem, poznámkou a připravenými prompty pro agenta ke zkopírování | Vydáno ve verzi v0.1.7 (27. 9. 2026) | [Rozhodnutí F18](https://github.com/Lazurio/LazurioPlatform/blob/1a4a99b2c586359e80e1663a3d66ee3d61730f2f/docs/decisions.md#f18--enabled-tools-of-the-environment), [vydání v0.1.7](https://github.com/Lazurio/LazurioPlatform/releases/tag/v0.1.7) |
| Připravená instalace a přihlášení nástrojů `gh`, `composio` a `wacli` na Linuxu a macOS: `lazurio tools install`, `login`, `logout` a `composio-org` | Vydáno ve verzi v0.1.7 (27. 9. 2026); používá se v Remote Environmentech | [Rozhodnutí F19](https://github.com/Lazurio/LazurioPlatform/blob/1a4a99b2c586359e80e1663a3d66ee3d61730f2f/docs/decisions.md#f19--curated-installation-and-login-of-catalog-tools), [nástroje Environmentu](https://github.com/Lazurio/LazurioPlatform/blob/1a4a99b2c586359e80e1663a3d66ee3d61730f2f/docs/environment-tools.md#curated-installation-and-login-decision-f19) |
| **Nastavení → Nástroje** s akcemi Připojit a Odpojit, přihlášení, které zapne přepínač **Používají agenti**, propojení SSH klíče Mašiny přes `gh`, `gh` v týmovém Environmentu přes Lazurio for GitHub, upozornění na týmové účty v týmovém Environmentu | V kandidátech na vydání v0.1.8 (v0.1.8-rc.35, 6. 10. 2026); finální v0.1.8 zatím nevyšla | [Sekce Nástroje](https://github.com/Lazurio/LazurioPlatform/blob/1a4a99b2c586359e80e1663a3d66ee3d61730f2f/docs/launchpad-development.md#tools-section), [gh v týmovém Environmentu](https://github.com/Lazurio/LazurioPlatform/blob/1a4a99b2c586359e80e1663a3d66ee3d61730f2f/docs/environment-tools.md#gh-on-a-team-environment), [v0.1.8-rc.35](https://github.com/Lazurio/LazurioPlatform/releases/tag/v0.1.8-rc.35) |
| Předání připraveného promptu nástroje rovnou do chatu s agentem (dnes se zobrazí ke zkopírování); připravené postupy na Windows; správa oprávnění jednotlivých Mašin z Dashboardu | Plánováno, zatím nevzniklo | [Rozhodnutí F19](https://github.com/Lazurio/LazurioPlatform/blob/1a4a99b2c586359e80e1663a3d66ee3d61730f2f/docs/decisions.md#f19--curated-installation-and-login-of-catalog-tools), [rozhodnutí 0162](https://github.com/HumanAndMachines/Lazurio/blob/3b95c80048b234c267031495be54927aa3d5cc43/manual/decision-register.md) |

Vydání ještě neznamená stav vašeho Environmentu. Kandidát na vydání se dostane
jen do Environmentů, které si řeknou o jeho přesnou verzi; místní Environment
aktualizovaný příkazem `lazurio update` dostane poslední finální vydání. Popisky
výše jsou z verze v0.1.8; verze v0.1.7 tytéž akce jmenuje **Nainstalovat
a přihlásit**, **Přihlásit** a **Odhlásit** a přepínač sama nezapíná.

Pilot Composia, který rozhodnutí 0162 stanovilo do vydání sekce Nástroje,
skončil 2. 10. 2026. Composio je teď aktivní součástí Lazuria na každém
Environmentu, kde ho jeho operátor zapne; kde zapnuté není, platí ostatní cesty
[standardu integrací](https://github.com/HumanAndMachines/Lazurio/blob/3b95c80048b234c267031495be54927aa3d5cc43/manual/external-app-integrations.md).

## Zdroje

- [Registr rozhodnutí Lazuria](https://github.com/HumanAndMachines/Lazurio/blob/3b95c80048b234c267031495be54927aa3d5cc43/manual/decision-register.md): rozhodnutí 0162 s dodatkem z 2. 10. 2026 (model, cesty, kompromisy a konec pilotu), 0170 (Environment), 0172 (plný přístup uvnitř Environmentu) a 0175 (operátor).
- [Standard napojení externích aplikací](https://github.com/HumanAndMachines/Lazurio/blob/3b95c80048b234c267031495be54927aa3d5cc43/manual/external-app-integrations.md): pořadí cest, co zůstává vyloučené, a katalog integrací Organizace.
- [Runbook Composia](https://github.com/HumanAndMachines/Lazurio/blob/3b95c80048b234c267031495be54927aa3d5cc43/manual/integrations/composio.md): co agent s Composiem smí.
- [Rozhodnutí F17, F18 a F19 v LazurioPlatform](https://github.com/Lazurio/LazurioPlatform/blob/1a4a99b2c586359e80e1663a3d66ee3d61730f2f/docs/decisions.md#f18--enabled-tools-of-the-environment) s jejich dodatky: nástroje operátora, katalog, návody ve Folderu, poznámka, připravené přihlášení, `gh` v týmovém Environmentu a týmové účty v týmovém Environmentu.
- [Nástroje Environmentu](https://github.com/Lazurio/LazurioPlatform/blob/1a4a99b2c586359e80e1663a3d66ee3d61730f2f/docs/environment-tools.md): příkazy `lazurio tools`.
- [Sekce Nástroje v Launchpadu](https://github.com/Lazurio/LazurioPlatform/blob/1a4a99b2c586359e80e1663a3d66ee3d61730f2f/docs/launchpad-development.md#tools-section): co sekce ukazuje a jaké nabízí akce.
- LazurioPlatform [vydání v0.1.7](https://github.com/Lazurio/LazurioPlatform/releases/tag/v0.1.7) a [kandidát na vydání v0.1.8-rc.35](https://github.com/Lazurio/LazurioPlatform/releases/tag/v0.1.8-rc.35).
- [Přihlášení v Composiu](https://docs.composio.dev/docs/authentication) a [správa tokenů](https://docs.composio.dev/docs/security/token-custody): jak přihlášení a správu přihlašovacích údajů popisuje samo Composio.
