---
title: Napojení prostředí na externí aplikace
description: Jak provozovatel napojí prostředí Lazuria na e-mail, kalendář a další aplikace, co s nimi pak agenti smějí dělat a jaké kompromisy s tím přijímá.
stableId: lazurio-doc-environment-app-connections
locale: cs
summary: O tom, kam prostředí dosáhne, rozhoduje jeho provozovatel. Doporučenou cestou je Composio, přihlášení sahá všude, kam sahá účet, a část nastavení zatím není vydaná.
updatedAt: "2026-09-28"
reviewedAt: "2026-09-28"
reviewOwner: Matej Suchanek
secondReviewOwner: Pablo AI
trustCritical: true
sourceRefs:
  - lazurio-decision-0162
  - lazurio-external-apps-0162
  - lazurio-platform-tools-decisions
  - lazurio-platform-environment-tools
  - lazurio-platform-release-v0-1-6
  - lazurio-platform-tools-screen-review
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

Na které externí aplikace vaše prostředí dosáhne, rozhodujete vy. Agenti
v prostředí jednají všude, kam sahají přihlášení na jeho Mašině. Centrálně se
nic nevynucuje. Než připojíte první aplikaci, přečtěte si,
[co tím přijímáte](#co-přijímáte-před-prvním-připojením), a ověřte si,
[co je dnes vydané](#co-je-dostupné-dnes).

**Prostředí** je místo, kde pro vás pracují agenti. **Vzdálené prostředí**
(Remote Environment) je hostovaný virtuální počítač: osobní VM, nebo pracovní
VM Organizace. **Místní prostředí** (Local Environment) je počítač, u kterého
právě sedíte. **Mašina** je počítač nebo virtuální počítač, na kterém
prostředí běží. Pravidla na této stránce platí pro oba druhy.

## Model v kostce

Lazurio stojí na příkazové řádce. Příkaz `lazurio` a Launchpad jsou jeden
produkt nad jedním jádrem: starají se o nástroje prostředí a říkají agentům,
jak se v něm pohybovat. Codex, Claude Code, `gh`, Composio i další nástroje
jsou programy příkazové řádky nainstalované a přihlášené na Mašině. Prostředí
proto zrcadlí svého provozovatele: pracujete-li pro více Organizací, pracuje
pro ně i vaše prostředí. Potřebujete-li oddělit kontexty nebo přístupy,
založte další prostředí a přihlaste v něm jiné účty.

## Tři cesty k napojení aplikace

Cestu volíte vy. GitHub CLI `gh` volitelný není; potřebuje ho každé
prostředí.

| Cesta | Co to je | Jak se přihlásíte |
| --- | --- | --- |
| **Composio** (doporučené) | Hostovaná služba, která jedním přihlášením napojí řadu běžných aplikací. Agenti používají příkazovou řádku `composio`. Zapíná se jen na vaše přání. | V prohlížeči, stejně jako u `gh`. Žádný API klíč se nikdy nekopíruje. |
| **Další podporované CLI** | Otestovaný nástroj příkazové řádky z katalogu Launchpadu. Zapíná se jen na vaše přání. | V prohlížeči nebo ověřovacím kódem. |
| **MCP server** | Server podle protokolu Model Context Protocol, který vám na požádání nastaví agent. | Podle dokumentace poskytovatele serveru. |

Nabízí-li poskytovatel aplikace vlastní oficiální CLI nebo MCP server, standard
integrací Lazuria ho při novém napojení řadí na první místo. Composio je
jednoduchá cesta pro všechno ostatní. Rozhodnutí 0162 z 27. 9. 2026 určilo
Composio jako jediného schváleného zprostředkovatele. Nová napojení přes
konektory ChatGPT nebo claude.ai, jiní sdílení zprostředkovatelé, scraping
a servery založené na cookie relacích zůstávají vyloučené. Klíče a tokeny
nikdy nepatří do chatu, Gitu ani logu.

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

- **Nastavení v Launchpadu** má dostat připravený postup instalace
  a přihlášení přímo v Launchpadu.
- **Nastavení s agentem** vám dá připravený prompt. Agent nástroj nainstaluje
  a provede vás přihlášením.

Každá položka katalogu popisuje cílový stav své instalace. Ten popis je
návodem pro agenta: když připravený instalátor selže, má podle něj instalaci
dokončit agent.

## Co zapnutí nástroje udělá

Zapnutý nástroj se zapíše do návodů pro agenty v Lazurio Folderu dané Mašiny.
**Lazurio Folder** je složka, jejíž vygenerované instrukce a manuál agenti čtou
při startu. Agenti pak nejdřív použijí zapnuté nástroje z katalogu a teprve
potom MCP servery. MCP servery se do Folderu nikdy nezapisují; agenti je
zjišťují ve svém vlastním nástroji.

Zapnutí je kontext, ne oprávnění. Nedává žádný přístup, nic neinstaluje,
nikam nepřihlašuje a neurčuje verzi. Vypnutí nástroj z návodů odebere.
Neodhlásí vás ani neodpojí žádnou aplikaci: přístup odeberete odpojením
aplikace v Composiu nebo odhlášením z nástroje.

Ke každému nástroji půjde připsat krátkou poznámku, třeba „zákaznickou poštu
jen číst“. Agenti ji čtou v manuálu Folderu. Poznámka je pokyn pro agenty, ne
technické omezení, a zatím prochází kontrolou.

## Napojení aplikací přes Composio

Takhle má postup vypadat. Než se na něj spolehnete, ověřte si,
[co je dostupné dnes](#co-je-dostupné-dnes).

1. Rozhodněte, které prostředí napojujete a jaký účet a jaká organizace
   v Composiu k němu patří.
2. Zapněte pro toto prostředí Composio.
3. Přihlaste se příkazem `composio login` a vrácený odkaz otevřete
   v prohlížeči.
4. Každou aplikaci připojte příkazem `composio link <toolkit>`. Otevřete
   vrácený odkaz a přihlaste se přímo v aplikaci.
5. Příkazem `composio whoami` ověřte, že je přihlášený zamýšlený účet.
6. Pokud agenti nemají mít k aplikaci plný přístup, omezte připojení dřív,
   než jim svěříte práci.

### Účet prostředí

U Composia patří připojené aplikace účtu a jeho organizaci v Composiu, ne
Mašině. Dvě Mašiny přihlášené stejným účtem a stejnou organizací by měly vidět
stejná připojení. Dokumentace Composia tomu nasvědčuje; Lazurio to zatím
neověřilo testem (viz [otevřená otázka](https://github.com/Lazurio/LazurioPlatform/issues/45)).
Berte proto přihlášení jako účet prostředí. Má-li Mašina dosáhnout na méně,
přihlaste na ní jiný účet nebo jinou organizaci v Composiu.

### Sdílená prostředí

V prostředí, které používá více provozovatelů, například ve Vzdáleném prostředí
Teamu, patří přihlášené účty celému prostředí. Může je použít každý
provozovatel a každý agent v něm. Lazurio při zapnutí nástroje v takovém
prostředí upozorní. Přihlašujte jen účty, které smí používat každý, kdo v něm
pracuje.

## Doporučení pro správce Organizace

Lazurio nevynucuje ani nesleduje, jak provozovatel prostředí napojí. Organizace,
která chce přehled, si založí vlastní organizaci v Composiu, podobně jako
zakládá organizaci na GitHubu, a požádá své provozovatele, aby se přihlašovali
do ní. Taková organizace v Composiu je samostatně spravovaná služba mimo
Lazurio Dashboard. Centrální přehled připojených účtů není cílem Lazuria,
protože provozovatelé mohou aplikace napojit i jinými cestami. Správa
oprávnění jednotlivých Mašin z Dashboardu je pozdější záměr pro `gh`
i Composio; zatím neexistuje.

## Zápisy a Publikace

Připojená aplikace je agentům k dispozici celá, včetně zápisu a mazání, dokud
ji neomezíte. Možnost zapisovat ale není souhlas s Publikací. Navenek viditelný
zápis, například odeslání e-mailu nebo změnu sdíleného kalendáře, provede agent
jen na pokyn Principála. **Principál** je ten, pro koho agent pracuje.

Dnes je to pravidlo práce, které agenti dodržují. Zápis přes připojenou
aplikaci nezablokuje žádný mechanismus Lazuria.

## Co přijímáte před prvním připojením

Tyto kompromisy jsou součástí modelu a jsou přijaté vědomě.

- **Tokeny a obsah volání drží třetí strana.** U Composia drží tokeny aplikací
  a obsah volání Composio, pokud Organizace neprovozuje vlastní instalaci.
  [Dokumentace Composia ke správě tokenů](https://docs.composio.dev/docs/security/token-custody),
  čtená 28. 9. 2026, uvádí, že ve výchozím cloudovém nasazení má přihlašovací
  údaje ve správě Composio, a jako podnikové možnosti popisuje nasazení
  v privátní síti VPC, vlastní provoz a šifrovací klíče ve správě zákazníka.
  Lazurio tyto možnosti, jejich podmínky ani cenu neověřilo. Doba uchování
  logů, region provozu a podmínky zpracování dat jsou
  [otevřené otázky](https://github.com/Lazurio/LazurioPlatform/issues/40),
  na které Lazurio zatím neodpovědělo.
- **Přihlášení sahá všude, kam sahá účet.** Agenti mohou použít všechno, co
  přihlášený účet smí, nejen to, co potřebuje aktuální úkol.
- **Více Organizací na jedné Mašině je jedno prostředí.** Agenti volí nástroj
  Organizace, pro kterou pracují, a nepřenášejí data mezi Organizacemi. Je to
  pravidlo práce, ne technická hranice. Kde hranice držet musí, použijte
  oddělená prostředí.
- **Organizace nemá vynucený přehled.** Vidí jen to, co ukáže její vlastní
  organizace v Composiu, a to jen tehdy, když se do ní její provozovatelé
  přihlásí.

## Co je dostupné dnes

Stav k 28. 9. 2026 podle veřejného repozitáře
[LazurioPlatform](https://github.com/Lazurio/LazurioPlatform).

| Schopnost | Stav | Doklad |
| --- | --- | --- |
| `lazurio tools status` a `lazurio tools update <tool>`: přehled nástrojů provozovatele (Codex, Claude Code, `gh`, Git, Node.js, npm, Bun) a na požádání spuštění oficiální aktualizace jednoho nástroje | Vydáno ve verzi v0.1.6 (26. 9. 2026) | [Vydání v0.1.6](https://github.com/Lazurio/LazurioPlatform/releases/tag/v0.1.6) |
| Katalog s úrovněmi a způsoby nastavení; `lazurio tools list`, `enable`, `disable` a `prompt`; zapnuté nástroje v návodech Folderu; upozornění ve sdílených prostředích; `tools status` i pro Composio, wacli, gog a Neon | Začleněno do `main` 27. 9. 2026, zatím v žádném vydání | [Rozhodnutí F18](https://github.com/Lazurio/LazurioPlatform/blob/3926999cc186d7388565a0c570748012c8b253bb/docs/decisions.md#f18--enabled-tools-of-the-environment) |
| Sekce Nástroje v nastavení Launchpadu: skupiny, stav, zapnutí a vypnutí, připravené prompty pro agenta; poznámka provozovatele ke každému nástroji; stav přihlášení jednotlivých nástrojů | Prochází kontrolou, nezačleněno | [Otevřený pull request](https://github.com/Lazurio/LazurioPlatform/pull/51) |
| Instalace nástrojů z katalogu a přihlášení k nim z Launchpadu; předání připraveného promptu rovnou do chatu s agentem; správa oprávnění jednotlivých Mašin z Dashboardu | Plánováno, zatím nevzniklo | [Rozhodnutí 0162](https://github.com/HumanAndMachines/Lazurio/blob/12497f462fbdc0eece31be88b5bc2e3d155d5171/manual/decision-register.md) |

Dokud sekce Nástroje v Launchpadu nevyjde, zřizuje se Composio jen v omezeném
pilotu. Mimo něj ho agenti sami nezřizují a použijí ostatní cesty podle
[standardu integrací](https://github.com/HumanAndMachines/Lazurio/blob/12497f462fbdc0eece31be88b5bc2e3d155d5171/manual/external-app-integrations.md).

Až se zapnuté nástroje dostanou do vydání, pamatujte na jedno omezení: starší
vydání neumí přečíst Folder se zapnutými nástroji. Než produkt vrátíte na verzi
starší než toto vydání, nástroje vypněte.

## Zdroje

- [Rozhodnutí Lazuria 0162](https://github.com/HumanAndMachines/Lazurio/blob/12497f462fbdc0eece31be88b5bc2e3d155d5171/manual/decision-register.md): model, cesty napojení a přijaté kompromisy.
- [Standard napojení externích aplikací](https://github.com/HumanAndMachines/Lazurio/blob/12497f462fbdc0eece31be88b5bc2e3d155d5171/manual/external-app-integrations.md): pořadí cest a co zůstává vyloučené.
- [Rozhodnutí F17 a F18 v LazurioPlatform](https://github.com/Lazurio/LazurioPlatform/blob/3926999cc186d7388565a0c570748012c8b253bb/docs/decisions.md#f17--operator-tools-belong-to-the-operator-the-rollout-pins-the-baseline-and-repairs): nástroje provozovatele, katalog a návody ve Folderu.
- [Nástroje prostředí](https://github.com/Lazurio/LazurioPlatform/blob/3926999cc186d7388565a0c570748012c8b253bb/docs/environment-tools.md): příkazy `lazurio tools`.
- [Přihlášení v Composiu](https://docs.composio.dev/docs/authentication) a [správa tokenů](https://docs.composio.dev/docs/security/token-custody): jak přihlášení a správu přihlašovacích údajů popisuje samo Composio.
