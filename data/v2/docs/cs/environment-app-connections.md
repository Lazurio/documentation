---
title: "Napojení Prostředí na aplikace"
description: "Jak vybrat propojení, schválit oprávnění a později přístup odvolat."
stableId: lazurio-doc-environment-app-connections
locale: cs
summary: "Jak vybrat propojení, schválit oprávnění a později přístup odvolat."
updatedAt: "2026-11-08"
reviewedAt: "2026-11-08"
reviewOwner: Matej Suchanek
secondReviewOwner: Pablo AI
trustCritical: true
sourceRefs:
  - lazurio-external-apps-current
  - lazurio-decision-0162
  - lazurio-external-apps-0162
  - lazurio-composio-runbook
  - lazurio-platform-tools-decisions
  - lazurio-platform-environment-tools
  - lazurio-platform-decision-f19
  - lazurio-platform-release-v0-1-7
  - lazurio-platform-release-v0-1-8-rc-35
  - lazurio-platform-release-current
  - lazurio-platform-release-v0-1-9
  - lazurio-platform-tools-screen-review
  - lazurio-platform-composio-write-gate-question
  - lazurio-platform-composio-custody-question
  - lazurio-platform-composio-shared-connections-question
  - composio-authentication
  - composio-token-custody
  - composio-data-retention
  - composio-zero-data-retention
  - composio-pricing
audience:
  - builder
  - it-admin
  - decision-maker
  - agent
---

Vy rozhodujete, ke kterým aplikacím se vaše Prostředí připojí. Agenti v něm
jednají všude, kam sahají přihlášení na jeho zařízení. Organizace může pro svá
Prostředí vypnout Composio; nic dalšího Lazurio centrálně nevynucuje. Před
prvním připojením si přečtěte [podmínky a rizika](#co-přijímáte-před-prvním-připojením)
a ověřte [stav popsaných funkcí](#co-je-dostupné-dnes).

**Prostředí** je místo, kde pro vás pracují agenti. Může běžet na vašem
počítači nebo být hostované jako Osobní, Pracovní či Týmové Prostředí.
**Machine** je technické označení počítače nebo virtuálního počítače, na kterém
Prostředí běží. **Uživatel** je člověk, pro kterého a se kterým agenti pracují
a který Prostředí a jeho agenty ovládá. **Integrace** je aplikace nebo služba
připojená k Prostředí. Pravidla níže platí pro každý druh Prostředí.

## Model v kostce

Příkaz `lazurio` a rozhraní Apps (ve zdrojích Launchpad) používají stejné
jádro. Spravují nástroje Prostředí a připravují instrukce pro agenty.
Codex, Claude Code, `gh`, Composio i další nástroje jsou programy příkazové
řádky nainstalované a přihlášené na zařízení. Jedno Prostředí může sloužit pro
práci ve více Organizacích. Agenti v něm pracují s plným přístupem: smějí
všechno, co jim Prostředí dovolí, bez sandboxu a bez schvalování jednotlivých
příkazů. Potřebujete-li užší práva nebo oddělené kontexty, založte další
Prostředí a přihlaste v něm jiné účty.

## Kterou cestou aplikace jde

Každá Integrace má právě jednu cestu. GitHub CLI `gh` je povinné v každém
Prostředí.

1. **Vlastní nástroj** z Nastavení → Nástroje, třeba `gh` pro GitHub nebo
   `wacli` pro WhatsApp.
2. **Přímo přes Executor**, MCP bránu Prostředí. Lazurio ji instaluje
   a provozuje a odpovídá jen na localhostu. Tudy jde aplikace, u které je stejně
   snadný její oficiální MCP server, nebo firemní aplikace, kterou nastavila vaše
   Organizace.
3. **Přes Composio** s vaším vlastním účtem Composia, kde to Organizace dovolí.

Agenti je používají v tomto pořadí a dostanou je všichni agenti a boti
Prostředí. Aplikace, která už je připojená, si svou cestu ponechá. Kde Prostředí
Executor nemá, jako dnes na vašem počítači, jde aplikace další cestou.

Agenti Integraci nikdy nepřipojují sami, protože přihlášení je váš souhlas.
Pošlou vám odkaz na její kartu v **Apps → Integrace**. Vlastní MCP server patří
do Executoru Prostředí a přidává se jen na váš výslovný pokyn.

Firemní aplikace je volbou celé Organizace a pak se připojuje přímo. Dnes je to
Microsoft 365, který Lazurio podporuje od vydání v0.1.9. Jeho nastavení se
přidává pull requestem s review do repozitáře Organizace, protože úprava
v Přehledu Organizace je rozhodnutá, ale zatím nenasazená. Viz
[Microsoft 365 pro IT a Admina Organizace](/cs/microsoft-365/). Google Workspace jako firemní
aplikace je rozhodnutý, ale zatím neimplementovaný, takže aplikace Googlu jdou
cestami výše.

U připojení, které Apps → Integrace nenabízí, navrhuje standard integrací Lazuria
toto pořadí. Vyhrává první cesta, která funguje, a poslední slovo máte vy:

1. **oficiální MCP server** poskytovatele, vzdálený nebo vlastní, přidaný do
   Executoru;
2. **oficiální CLI** poskytovatele;
3. **Composio**, když poskytovatel nemá vhodný oficiální MCP server ani CLI
   a Composio je povolené;
4. **prověřený open-source MCP server nebo CLI**, připnutý na konkrétní vydání
   nebo commit, s ověřeným vydavatelem a licencí;
5. **prohlížeč** pod vaším dohledem, když nic z předchozího neexistuje.

V žádném kroku nejsou dovolené: scraping webu, opakované použití cookies
z prohlížeče, jiné sdílené brokery než Composio, klíče a tokeny v chatu, Gitu
nebo logu a nové konektory ChatGPT nebo claude.ai.

**Pravidlo.** Aplikace, pluginy a konektory ChatGPT, které harness nabízí, agenti
nepoužívají, dokud je nepovolí Organizace, v Osobním Prostředí vy, a i pak jen pro
aplikace mimo Integrace. Pravidlo dostávají v instrukcích Folderu. Přepínač
Organizace je rozhodnutý, ale zatím nenasazený.

**Co Lazurio dělá technicky.** Kde povolené nejsou, přidá Lazurio v Prostředí na
serveru do konfigurace Codexu dvě vlastní nastavení: aplikace ve výchozím stavu
vypnuté a žádné návrhy pluginů. Je to pojistka, ne záruka:

- Aplikace, kterou konfigurace zapíná jménem, zůstává zapnutá. Lazurio ji hlásí
  jako výjimku.
- Konfiguraci, kterou Lazurio neumí přečíst nebo nepodporuje, třeba soubor, který
  nejde zpracovat, nezmění a nahlásí.
- Kde jsou aplikace povolené, Lazurio svá nastavení zase odebere.
- Týká se to jen Codexu v Prostředí na serveru. Váš vlastní počítač Lazurio nikdy
  nemění, konektor tam může běžet dál.

Skutečný stav ukazuje spodní část Apps → Integrace → Vše, která varuje, když
aplikace povolené nejsou a Codex je přesto má. Pro IT a agenty vypíše totéž
`lazurio integrations chatgpt-apps`.

## Katalog nástrojů

Katalog uvádí nástroje, které lze agentům určit k používání. Každý má
**úroveň** a **způsob nastavení**.

| Nástroj | Příkaz | Úroveň | Způsob nastavení |
| --- | --- | --- | --- |
| GitHub CLI | `gh` | Povinný: vždy zapnutý, nejde vypnout | Launchpad |
| Executor | `executor` | Povinný; nabízí se v Prostředí na serveru s Linuxem | Vlastní nastavení Lazuria |
| Composio | `composio` | Doporučený | Launchpad |
| Bitwarden CLI | `bw` | Doporučený; nabízí se v Prostředí na serveru s Linuxem | Vlastní postup |
| wacli | `wacli` | Volitelný | Launchpad |
| gogcli | `gog` | Volitelný; nabízí se na počítači a v Osobním Prostředí na serveru, ne v Pracovním | Agent |
| Neon CLI | `neon` | Volitelný | Agent |

- **Nastavení v Launchpadu** má připravenou instalaci a přihlášení, v Launchpadu
  i na příkazové řádce. Viz [Připojení nástroje](#připojení-nástroje).
- **Nastavení agentem** vám dá připravený prompt. Zkopírujete ho do nového chatu
  s agentem; ten nástroj nainstaluje a provede vás přihlášením.

Každá položka katalogu říká agentovi, jak má být nainstalovaný nástroj nastavený.
Když připravená instalace selže, Lazurio nabídne prompt, kterým ji dokončí agent.
Nástroj, který Prostředí nenabízí, se do instrukcí agentů nedostane a nejde
zapnout.

V Prostředí Organizace mají přednost nastavení Organizace. Kde Composio nepovolují,
agenti ho nepoužívají, ať jste zvolili cokoli: Nastavení → Nástroje ukáže jeho
přepínač zamčený a nenabídne přidání ani přihlášení.

## Připojení nástroje

V Launchpadu otevřete **Nastavení → Nástroje**. Každý nástroj má řádek se svým
skutečným názvem, jednou větou o tom, k čemu slouží, a stavem: **Připojeno jako**
účet, nebo **Nepřipojeno**. Řádek nabízí jednu akci:

- **Přidat a připojit**, když nástroj ještě není nainstalovaný;
- **Připojit**, když je nainstalovaný, ale nepřihlášený;
- **Propojit SSH klíč**, když je `gh` přihlášené, ale klíč zařízení není propojený;
- **Odpojit**, když je přihlášený;
- **Připojit s pomocí agenta** u nástroje, který nastavuje agent.

Pro IT a agenty: stejný postup běží na příkazové řádce přes
`lazurio tools install <tool>`, `lazurio tools login <tool>`
a `lazurio tools logout <tool>`.

Instalace proběhne pro aktuálního uživatele, bez administrátorských práv,
z oficiálního zdroje nástroje; Composio se instaluje jako vlastní sestavení jeho
CLI od Lazuria. Nástroje, který už funguje, se nedotkne. API klíč nikdy
nekopírujete a přihlášení můžete dokončit na libovolném zařízení:

- **`gh`** ukáže jednorázový kód a stránku GitHubu pro přihlášení zařízení.
  Otevřete stránku a kód zadejte. Lazurio pak propojí SSH klíč zařízení
  s vaším účtem.
- **`composio`** ukáže odkaz. Otevřete ho a přihlaste se. Prostředí Organizace
  pak pracuje v organizaci Composia pojmenované po této Organizaci: Lazurio ji
  vybere samo, a když ještě neexistuje, ukáže jeden krok, kterým ji založíte.
  Osobní Prostředí používá výchozí organizaci účtu, kterou zvolíte při přihlášení.
- **`wacli`** ukáže QR kód, který naskenujete ve WhatsAppu, nebo se místo toho
  spáruje přes vaše telefonní číslo.

Odpojení `gh` nebo `composio` zapomene přihlášení jen na tomto zařízení. Má-li
přístup skončit i u poskytovatele, zrušte ho i tam. Odpojení `wacli` zařízení
od účtu odpojí. Každé přihlášení na zařízení jde ukončit samostatně.

Připravené postupy běží na Linuxu a macOS. Na Windows se odmítnou a místo nich
se nabídne připravený prompt pro agenta.

## Co dělá přepínač „Používají agenti“

Každý řádek má přepínač **Používají agenti**. Nástroj, který v Launchpadu
připojíte, ho zapne sám, aby ho agenti mohli rovnou použít; vypnout ho můžete
kdykoli. Pro IT a agenty: na příkazové řádce ho ovládají `lazurio tools enable`
a `lazurio tools disable`.

Nástroj, který agenti používají, se zapíše do instrukcí pro agenty v Lazurio
Folderu na tomto zařízení. **Lazurio Folder** je složka, jejíž vygenerované
instrukce a manuál agenti čtou při startu. Executor spravuje MCP servery
a zpřístupňuje je agentům. Kde Prostředí Executor nemá, agenti používají MCP
servery dostupné v jejich klientovi.

Přepínač mění instrukce pro agenty. Neuděluje přístup, nic neinstaluje,
nepřihlašuje účet ani nepřipíná verzi. Vypnutí nástroj z instrukcí odebere.
Neodhlásí vás a neodpojí žádnou aplikaci: přístup odeberete odpojením aplikace
v Apps → Integrace nebo odpojením nástroje.

K nástroji, který agenti používají, můžete v jeho podrobnostech přidat krátkou
poznámku, třeba „pošta zákazníků jen ke čtení“. Agenti ji čtou v manuálu Folderu.
Poznámka agenty instruuje, ale přístup technicky neomezuje. Vypnutím nástroje
se poznámka odebere.

## Připojení aplikace

1. Rozhodněte, které Prostředí připojujete. V Pracovním a Týmovém Prostředí platí
   pravidla Organizace, v Osobním rozhodujete vy.
2. Otevřete **Apps → Integrace** a najděte aplikaci. Odkaz na její kartu vám může
   poslat agent.
3. Zvolte **Připojit**. Když aplikace jde přes Composio a to ještě není přihlášené,
   přihlásíte se nejdřív do Composia.

   <figure class="lz-app-step lz-app-step--wide">
     <img src="/guide-assets/integrations/integrations-all-cs.png" alt="Stránka Apps → Integrace se záložkami Vše, Připojené a Vlastní. Každá aplikace má kartu, která říká, jak je připojená, třeba přímo, přes gh nebo přes Composio. Tlačítko Připojit u Google Kalendáře je zvýrazněné." width="930" height="554" loading="lazy" />
     <figcaption>Karta ukazuje cestu aplikace. Účty na obrázku jsou příklady.</figcaption>
   </figure>

4. Přihlaste se přímo v aplikaci účtem, který mají agenti používat.
5. Na kartě ověřte, že je připojený správný účet.

   <figure class="lz-app-step">
     <img src="/guide-assets/integrations/integrations-connected-cs.png" alt="Karta aplikace Notion: Připojeno přímo, s příkladovým účtem jana@example.com a tlačítky Přidat účet a Odpojit." width="312" height="198" loading="lazy" />
     <figcaption>Připojená aplikace ukazuje svou cestu a účet.</figcaption>
   </figure>

6. Pokud agenti nemají mít celou aplikaci, omezte připojení dřív, než jim
   předáte práci.

[Lekce 6 úvodního kurzu](/cs/guide/course/connected-apps/) vysvětluje záložky a co
smějí agenti s připojenou aplikací dělat a [Propojení
nástrojů](/cs/guide/tool-connections/) provede běžnými připojeními.

<span id="účet-environmentu"></span>

### Účet Prostředí

Připojení přes Composio patří účtu Composia a jeho organizaci, ne zařízení. Dvě
Prostředí přihlášená stejným účtem a stejnou organizací v Composiu sdílejí svá
připojení. Plyne to z dokumentace Composia a zdrojového kódu jeho CLI, [ověřeno
7. 10. 2026](https://github.com/Lazurio/LazurioPlatform/issues/45) bez živého
testu. Samostatné zařízení proto neberte jako oddělení připojených účtů. Když se
mají přístupy lišit, použijte samostatný účet Composia.

<span id="týmové-environmenty"></span>

### Týmové Prostředí

Týmové Prostředí sdílejí členové Teamu, takže účty v něm přihlášené
patří celému Prostředí. Může je používat každý člen Teamu i každý agent v něm.

- **GitHub.** Týmové Prostředí pracuje v GitHubu přes GitHub App Organizace,
  Lazurio for GitHub. Osobní účty GitHubu se v něm nepřihlašují.
- **Composio.** Týmové Prostředí se přihlašuje týmovým účtem Composia, nikdy
  osobním účtem člověka.
- **Ostatní aplikace.** Přihlašujte jen týmové účty, třeba sdílenou schránku nebo
  kalendář, které smí používat celý Team. Osobní účty připojujte ve svém
  Prostředí. Launchpad na to před přihlášením upozorní a agent se před připojením
  aplikace zeptá, který týmový účet připojit.

## Doporučení pro Adminy Organizace

Kromě nastavení Organizace Lazurio nevynucuje ani nesleduje, jak uživatel své
Prostředí připojuje.

- **Nastavení Organizace.** Zda je Composio povolené, je nastavení Organizace.
  Kde říká ne, žádná aplikace jejích Prostředí přes Composio nejde.
- **Účty a organizace v Composiu.** Každý uživatel se přihlašuje vlastním účtem
  Composia a pracuje ve své vlastní organizaci Composia pojmenované po Organizaci
  Lazuria, ve které nikdo další není. Týmové Prostředí používá týmový účet.
  Lazurio nedrží žádný klíč organizace Composia a nezakládá sdílené organizace.
  Názvy pomáhají vybrat správné připojení; skutečný přístup ověřte u poskytovatele.
- **Integrace sdílené celou Organizací** patří do sledovaného katalogu integrací
  Organizace přes pull request s review. Katalog drží příkazy, adresy a názvy
  proměnných prostředí, nikdy jejich hodnoty. Je to doporučení a sdílená definice,
  ne brána: nástroj, který uživatel používá jen ve svém Prostředí, se do něj
  nezapisuje.

## Zápisy a Publikace

Připojená aplikace je agentům dostupná celá, včetně zápisu a mazání, dokud ji
neomezíte. Možnost zapisovat není souhlas s publikací. Navenek viditelný zápis,
třeba odeslání e-mailu nebo změnu sdíleného kalendáře, agent udělá jen na váš
pokyn. Plný přístup uvnitř Prostředí na tom nic nemění.

Dnes je to pracovní pravidlo, které agenti dodržují. Lazurio zápis přes připojenou
aplikaci neblokuje. Executor umí volání pozastavit ke schválení, ale znovu ho
spustí sám agent, podle stejného pravidla. Zda vlastní filtry Composia platí na
všech cestách, je [otevřená otázka](https://github.com/Lazurio/LazurioPlatform/issues/39).
Firemní aplikace Microsoft 365 má jeden technický limit: nemá oprávnění
`Mail.Send`, takže agent přes ni připraví koncept, ale poštu neodešle. Odesílání
by Organizace musela vědomě přidat jako samostatné oprávnění se souhlasem správce;
nastavení pro to je rozhodnuté, ale zatím nenasazené.

## Co přijímáte před prvním připojením

Před připojením si projděte tyto podmínky a rizika:

- **Tokeny a obsah volání drží třetí strana.** U Composia drží tokeny aplikací
  a obsah volání Composio, pokud Organizace neprovozuje vlastní instalaci.
  [Dokumentace Composia ke správě tokenů](https://docs.composio.dev/docs/security/token-custody)
  říká, že ve výchozím cloudovém nasazení má přihlašovací údaje v držení Composio.
  Jako alternativy popisuje privátní VPC, vlastní hostování a klíče spravované
  zákazníkem a uvádí, že i s vlastní OAuth aplikací Composio tokeny připojených
  účtů ukládá. Lazurio tyto možnosti, jejich podmínky ani cenu neověřilo.
- **Composio si drží logy.** Jeho [stránka o uchování
  dat](https://docs.composio.dev/docs/security/data-retention), přečtená 6. 11.
  2026, říká, že logy spuštění nástrojů zůstávají až rok na všech tarifech a že
  soubory připravené pro nástroj se mažou po 24 hodinách. [Zero Data
  Retention](https://docs.composio.dev/docs/security/zero-data-retention) přestane
  ukládat obsah krytých volání. Je dostupné na placených tarifech za cenu podle
  využití, v Enterprise je v ceně a nezastavuje zpracování během volání. Aplikace
  připojené přes vlastní OAuth aplikaci Composia kryje jen v Enterprise.
- **Kde data jsou a za jakých podmínek.** Veřejné stránky Composia přečtené téhož
  dne neuvádějí region hostování a pro seznam subdodavatelů a podmínky zpracování
  odkazují na jeho Trust Center. [Ceník](https://composio.dev/pricing) uvádí
  Data Processing Addendum u tarifů Pro a Enterprise, ne u Hobby. Lazurio tyto
  podmínky neprověřilo a zda Organizacím doporučit Zero Data Retention, je
  [stále otevřené](https://github.com/Lazurio/LazurioPlatform/issues/40).
- **Přihlášení sahá všude, kam sahá účet.** Agenti mohou použít všechno, co smí
  přihlášený účet, nejen to, co potřebuje aktuální úkol.
- **Více Organizací na jednom zařízení je jedno Prostředí.** Agenti volí nástroj
  té Organizace, pro kterou pracují, a data mezi Organizacemi nepřenášejí. Je to
  pracovní pravidlo, ne technická hranice. Kde hranice platit musí, použijte
  oddělená Prostředí.
- **Organizace do vaší organizace v Composiu nevidí.** Nikdo další v ní není
  a Lazurio k ní nedrží žádný klíč.

<span id="co-je-dostupné-dnes"></span>

## Stav vydání k 6. listopadu 2026

Poslední finální vydání [LazurioPlatform](https://github.com/Lazurio/LazurioPlatform)
je [v0.1.20](https://github.com/Lazurio/LazurioPlatform/releases/tag/v0.1.20)
ze 4. 11. 2026.

| Funkce | Stav | Doklad |
| --- | --- | --- |
| Katalog s úrovněmi a způsoby nastavení; `lazurio tools list`, `enable`, `disable`, `note` a `prompt`; nástroje v instrukcích Folderu | Vydáno od v0.1.7 (27. 9. 2026) | [Rozhodnutí F18](https://github.com/Lazurio/LazurioPlatform/blob/5edbc2b7ebf53aec4e116663db60021d24593dbe/docs/decisions.md#f18--enabled-tools-of-the-environment), [vydání v0.1.7](https://github.com/Lazurio/LazurioPlatform/releases/tag/v0.1.7) |
| Připravená instalace a přihlášení nástrojů `gh`, `composio` a `wacli` na Linuxu a macOS | Vydáno od v0.1.7 (27. 9. 2026) | [Rozhodnutí F19](https://github.com/Lazurio/LazurioPlatform/blob/5edbc2b7ebf53aec4e116663db60021d24593dbe/docs/decisions.md#f19--curated-installation-and-login-of-catalog-tools), [nástroje Prostředí](https://github.com/Lazurio/LazurioPlatform/blob/5edbc2b7ebf53aec4e116663db60021d24593dbe/docs/environment-tools.md) |
| **Nastavení → Nástroje** s akcemi Připojit a Odpojit, přihlášení, které zapne přepínač **Používají agenti**, propojení SSH klíče zařízení přes `gh`, `gh` v Týmovém Prostředí přes Lazurio for GitHub | Poprvé v kandidátech v0.1.8 ([v0.1.8-rc.35](https://github.com/Lazurio/LazurioPlatform/releases/tag/v0.1.8-rc.35), 6. 10. 2026); ve v0.1.20 | [Sekce Nástroje](https://github.com/Lazurio/LazurioPlatform/blob/5edbc2b7ebf53aec4e116663db60021d24593dbe/docs/launchpad-development.md#tools-section) |
| **Apps → Integrace**, Executor v Prostředí na serveru, sestavení Composia od Lazuria, nastavení Composia v Organizaci, dvě nastavení Codexu proti aplikacím ChatGPT v Prostředí na serveru, s výjimkami popsanými výše | Ve v0.1.20 | [Integrace](https://github.com/Lazurio/LazurioPlatform/blob/5edbc2b7ebf53aec4e116663db60021d24593dbe/docs/integrations.md) |
| Firemní aplikace Microsoft 365 (Outlook, OneDrive, SharePoint) bez `Mail.Send`, nastavená pull requestem s review | Podporováno od [v0.1.9](https://github.com/Lazurio/LazurioPlatform/releases/tag/v0.1.9) (19. 10. 2026), s [otevřenými kontrolami](/cs/microsoft-365/) | [Integrace](https://github.com/Lazurio/LazurioPlatform/blob/5edbc2b7ebf53aec4e116663db60021d24593dbe/docs/integrations.md#the-microsoft-365-company-app) |
| Přepínač Organizace pro aplikace ChatGPT; nastavení Microsoftu 365 v Přehledu Organizace včetně odesílání pošty | Rozhodnuto, zatím nenasazeno | [Rozhodnutí 0162](https://github.com/Lazurio/LazurioPlatform/blob/5edbc2b7ebf53aec4e116663db60021d24593dbe/docs/decision-register.md#0162--integrations-applications-connected-to-an-environment-one-path-each) |
| Google Workspace jako firemní aplikace | Rozhodnuto, zatím neimplementováno | [Integrace](https://github.com/Lazurio/LazurioPlatform/blob/5edbc2b7ebf53aec4e116663db60021d24593dbe/docs/integrations.md), [rozhodnutí 0162](https://github.com/Lazurio/LazurioPlatform/blob/5edbc2b7ebf53aec4e116663db60021d24593dbe/docs/decision-register.md#0162--integrations-applications-connected-to-an-environment-one-path-each) |
| Předání připraveného promptu nástroje rovnou do chatu s agentem (dnes se ukáže ke zkopírování); připravené postupy na Windows | Plánováno, není postaveno | [Rozhodnutí F19](https://github.com/Lazurio/LazurioPlatform/blob/5edbc2b7ebf53aec4e116663db60021d24593dbe/docs/decisions.md#f19--curated-installation-and-login-of-catalog-tools) |

Ověřte, kterou verzi vaše Prostředí skutečně používá. Starší verze může tyto akce
pojmenovávat jinak nebo je nemít: v0.1.7 je nazývá **Nainstalovat a přihlásit**,
**Přihlásit** a **Odhlásit** a přepínač sama nezapne.

## Zdroje

- [Rejstřík rozhodnutí Lazuria](https://github.com/Lazurio/LazurioPlatform/blob/5edbc2b7ebf53aec4e116663db60021d24593dbe/docs/decision-register.md) ve vydání v0.1.20: rozhodnutí 0162 s dodatky, 0170 (Prostředí), 0172 (plný přístup uvnitř Prostředí) a 0175 (uživatel).
- [Integrace](https://github.com/Lazurio/LazurioPlatform/blob/5edbc2b7ebf53aec4e116663db60021d24593dbe/docs/integrations.md) ve vydání v0.1.20: pravidlo cest, organizace Composia v Prostředí, aplikace ChatGPT a schvalování v Executoru.
- [Standard napojení externích aplikací](https://github.com/HumanAndMachines/Lazurio/blob/46867061e6d0abf7781f9f9d0b93791be32da4d9/manual/external-app-integrations.md): pořadí cest, co zůstává vyloučené a katalog integrací Organizace.
- [Rozhodnutí F17, F18 a F19 v LazurioPlatform](https://github.com/Lazurio/LazurioPlatform/blob/5edbc2b7ebf53aec4e116663db60021d24593dbe/docs/decisions.md#f18--enabled-tools-of-the-environment) s jejich dodatky: nástroje uživatele, katalog, instrukce Folderu, poznámka, připravené přihlášení, `gh` v Týmovém Prostředí a týmové účty.
- [Nástroje Prostředí](https://github.com/Lazurio/LazurioPlatform/blob/5edbc2b7ebf53aec4e116663db60021d24593dbe/docs/environment-tools.md): katalog, kde se nástroj nabízí, co rozhoduje Organizace a příkazy `lazurio tools`.
- [Sekce Nástroje v Launchpadu](https://github.com/Lazurio/LazurioPlatform/blob/5edbc2b7ebf53aec4e116663db60021d24593dbe/docs/launchpad-development.md#tools-section): co sekce ukazuje a jaké nabízí akce.
- LazurioPlatform [vydání v0.1.20](https://github.com/Lazurio/LazurioPlatform/releases/tag/v0.1.20), [vydání v0.1.7](https://github.com/Lazurio/LazurioPlatform/releases/tag/v0.1.7) a [kandidát vydání v0.1.8-rc.35](https://github.com/Lazurio/LazurioPlatform/releases/tag/v0.1.8-rc.35).
- [Přihlášení v Composiu](https://docs.composio.dev/docs/authentication), [správa tokenů](https://docs.composio.dev/docs/security/token-custody), [uchování dat](https://docs.composio.dev/docs/security/data-retention), [Zero Data Retention](https://docs.composio.dev/docs/security/zero-data-retention) a [ceník](https://composio.dev/pricing): jak přihlášení, přihlašovací údaje, logy a podmínky popisuje samo Composio.
