---
title: "Napojení Prostředí na aplikace"
description: "Jak vybrat propojení, schválit oprávnění a později přístup odvolat."
stableId: lazurio-doc-environment-app-connections
locale: cs
summary: "Jak vybrat propojení, schválit oprávnění a později přístup odvolat."
updatedAt: "2026-10-28"
reviewedAt: "2026-10-28"
reviewOwner: Anna Blazickova
secondReviewOwner: Pablo AI
trustCritical: true
sourceRefs:
  - lazurio-external-apps-current
  - lazurio-platform-release-current
  - lazurio-platform-integrations-current
  - lazurio-platform-chatgpt-apps-policy
  - lazurio-platform-chatgpt-apps-main
  - composio-token-custody
  - composio-retention-current
  - composio-zdr-current
  - composio-consumer-boundaries
  - lazurio-platform-composio-write-gate-question
  - lazurio-platform-composio-custody-question
  - lazurio-platform-composio-shared-connections-question
audience:
  - builder
  - it-admin
  - decision-maker
  - agent
---

E-mail, kalendář nebo jinou službu připojíte v **Apps → Integrace**.
Otevřete kartu aplikace, ověřte účet a požadovaná oprávnění a přihlášení
dokončete sami. Agent může kartu dohledat a vysvětlit, co chybí;
připojení za vás nezakládá.

**Prostředí** je místo, kde pro vás pracují agenti. Může běžet na vašem
počítači nebo být hostované jako Osobní, Pracovní či Týmové Prostředí.
Jeho agenti mohou používat dostupné účty v mezích vašeho zadání a skutečných
oprávnění poskytovatele. Před připojením ověřte, k čím datům účet dosáhne.

## Model v kostce

Každá aplikace má jednu zaznamenanou cestu: vlastní nástroj CLI, Executor
Prostředí nebo povolené Composio. Lidé vidí cesty a účty v Apps → Integrace.
Agent čte stejný katalog příkazem `lazurio integrations list --json`
a existující připojení používá v pořadí **nástroj aplikace → Executor → Composio**.
Nedostupný zdroj neznamená, že nic není připojené. Nechte si říct, co agent
skutečně dokázal ověřit.

## Kterou cestu zvolit

Začněte kartou aplikace v katalogu. Lazurio vybere podporovanou cestu pro dané
Prostředí. Pro novou cestu mimo katalog standard upřednostňuje oficiální MCP
server, oficiální CLI, povolené Composio, prověřenou připnutou open-source
implementaci a nakonec řízenou práci v prohlížeči. Toto pořadí neopravňuje
agenta zahájit přihlášení.

Vlastní MCP server se přidává jen na váš výslovný pokyn v **Apps → Integrace →
Vlastní**, do Executoru. Případný klíč zadáte zde. Nenastavujte samostatný
server pro každého AI klienta a neposílejte přihlašovací údaje do chatu.
Jiní sdílení brokeři, scraping a servery využívající relaci prohlížeče zůstávají
mimo standard. Samostatné pravidlo mají [aplikace z ChatGPT](#aplikace-z-chatgpt).

## Katalog nástrojů

**Nastavení → Nástroje** slouží instalaci a přihlášení nástrojů příkazové
řádky, například GitHub CLI (`gh`). Apps → Integrace naproti tomu ukazují
připojené aplikace. Přepínač nástroje „Používají agenti“ mění instrukce;
jeho vypnutí neodvolá účet ani neodpojí aplikaci. Přístup zrušte u připojení
a podle potřeby také u poskytovatele.

## Připojení nástroje

Používá-li aplikace CLI, její karta ukáže potřebné nastavení. Postupujte přes
přihlášení nástroje v Nastavení → Nástroje; odpovídající podporované příkazy
jsou `lazurio tools install <tool>`, `login <tool>` a `logout <tool>`.
Přihlášení u poskytovatele dokončíte vy. Hesla, klíče ani jednorázové kódy
agentovi neposílejte. Instalace nástroje sama nedokládá funkční připojení aplikace.

## Napojení aplikací přes Composio

Composio použijte jen tam, kde ho dovoluje Organizace nebo vy v Osobním
Prostředí. Na kartě aplikace ověřte, že má cestu přes Composio. Potřebuje-li
účet Composia přihlášení, nejprve projděte nastavení z karty a potom na kartě
připojte aplikaci. Agent vám předá její odkaz; nespouští za vás `composio link`.

Organizace Composia závisí na Prostředí. Ve v0.1.14 umí Osobní Prostředí
vybrat nejstarší výchozí organizaci podle dat podporovaného CLI. Když data
chybějí nebo nejsou jednoznačná, zůstává volba uživateli. Pracovní a Týmové
Prostředí se řídí pravidlem Organizace; vlastní počítač si volbu ponechává.
Ověřte skutečně zobrazený účet a organizaci. Nepředpokládejte, že má každé
zařízení samostatná připojení.

### Účet Prostředí

Připojení Composia patří účtu a projektu, nikoli názvu zařízení. Veřejný
výzkum zdrojů CLI zjistil sdílení consumer připojení mezi dvěma zařízeními se
stejným účtem a organizací Composia. Jde o závěr ze zdrojů a dokumentace,
**nikoli o živý test izolace**. Připojení vývojářských projektů a consumer
projektu jsou samostatné prostory. Mají-li se přístupy lišit, použijte oddělené účty Composia a ověřte přihlášení každého Prostředí. Samostatná zařízení přihlášená ke stejné identitě Composia tato připojení neoddělují.

### Týmové Prostředí

Týmové Prostředí je sdílené: dostupné účty může použít každý oprávněný člen
Teamu a jeho agent. Připojujte týmové účty, které smějí používat všichni;
osobní poštu a kalendář ponechte v příslušném individuálním Prostředí.
GitHub v Týmovém Prostředí používá GitHub App Organizace, nikoli osobní
přihlášení člena.

## Doporučení pro správce Organizace

Zaznamenejte povolené poskytovatele, oprávnění, vlastníka účtu, úložiště
přihlašovacích údajů a postup odvolání. Povolení Composia řídí nastavení
Organizace; místní přepínač nástroje je nenahrazuje. Vyzkoušejte skutečný
přístup i odvolání u poskytovatele. Nastavená cesta Lazuria nezabrání procesu
s širšími údaji dostupnými v operačním systému použít jinou cestu.

## Zápisy a Publikace

Účet může dovolovat čtení, zápisy i mazání. Tato schopnost není souhlasem
s Publikací. Agent připraví práci; odeslání, sloučení nebo jiné uvedení
v účinnost výslovně schválí oprávněný uživatel. Už návrh uložený u poskytovatele
může přenášet data.

Executor umí pozastavit volání přes svou vykonávací cestu: výslovně
destruktivně označené MCP nástroje, zápisové operace OpenAPI, GraphQL mutations
a volání podléhající schvalovací politice. Vrátí `waiting_for_interaction`.
Ve výchozím režimu `model` **pokračování potvrdí nebo odmítne sám agent**;
uživateli se automaticky otázka nezobrazí. MCP nástroj bez potřebného označení
může běžet rovnou. Přímé řídicí API a jiné cesty přes CLI toto pozastavení
nepokrývá. Není to obecná technická záruka souhlasu člověka. Účinnost filtrů
Composia na všech cestách zůstává [samostatnou otevřenou otázkou](https://github.com/Lazurio/LazurioPlatform/issues/39).

## Co přijímáte před prvním připojením

U cloudového Composia uchovává přihlašovací údaje aplikací a zpracovává obsah
volání třetí strana. Jeho současná [dokumentace retence](https://docs.composio.dev/docs/security/data-retention)
uvádí, že výchozí logy mohou obsahovat argumenty a výsledky volání a zůstat
uložené až rok. Dočasné soubory připravené pro nástroje se mažou po 24 hodinách.
Vypršení odkazu samo soubor nesmaže.

[Zero Data Retention](https://docs.composio.dev/docs/security/zero-data-retention)
je dostupná na placených plánech a zahrnutá v Enterprise. Má výjimky podle
funkce a spravované aplikace. Některé starší Hobby projekty si ponechávají již
zapnuté ZDR; nové zapnutí vyžaduje placený plán. Nepředpokládejte, že ho váš
projekt má nebo že znamená nulové ukládání všech dat. Ověřte skutečné nastavení
a podmínky. Region a smluvní schválení je stále potřeba doložit pro vybrané
nasazení.

Issues [#40](https://github.com/Lazurio/LazurioPlatform/issues/40) a
[#45](https://github.com/Lazurio/LazurioPlatform/issues/45) už obsahují výzkum.
Zbývající rozhodnutí a chybějící živé testy neznamenají, že jsou všechny otázky
nezodpovězené. Stránky poskytovatele zde byly ověřeny 28. října 2026.

## Aplikace z ChatGPT

Schválené pravidlo z 27. října vypíná aplikace, pluginy a konektory účtu
ChatGPT uvnitř Prostředí ve výchozím stavu. Pracovnímu a Týmovému Prostředí je
může povolit Admin Organizace, Osobnímu uživatel. I povolené slouží pouze
aplikacím, které katalog Integrací nemá. Existující konektor na vašem počítači
má samostatné přechodné pravidlo; není obecným povolením uvnitř Prostředí.
Nové napojení přes konektory ChatGPT nebo claude.ai standard dál nepovoluje.

**Omezení verze:** implementace tohoto pravidla je na hlavní větvi Platformu
po v0.1.14, nikoli v tomto vydání. Nepředpokládejte, že starší nasazení tyto
nástroje technicky blokuje. Novější implementace také zachovává jmenovité
výjimky a neodebírá nástroje již běžícím chatům.

<span id="what-is-available-today"></span>

## Stav vydání k 28. říjnu 2026

Současné finální vydání je Platform v0.1.14. Apps → Integrace, společný katalog,
cesty přes Executor a popsané pozastavení volání s pokračováním přes agenta
jsou součástí jeho vydaného kontraktu. Omezení aplikací z ChatGPT je novější
přijatá změna. Před použitím postupu pro konkrétní verzi ověřte instalované
vydání a dostupné zdroje.

## Zdroje

- [Vydaný kontrakt Integrací včetně schvalování](https://github.com/Lazurio/LazurioPlatform/blob/v0.1.14/docs/integrations.md)
- [Současné finální vydání](https://github.com/Lazurio/LazurioPlatform/releases/tag/v0.1.14)
- [Schválený integrační standard](https://github.com/HumanAndMachines/Lazurio/blob/b41fc7d01f748ebc4724535ce811ffceded38fdb/manual/external-app-integrations.md)
- [Novější implementace pravidla aplikací z ChatGPT](https://github.com/Lazurio/LazurioPlatform/blob/c94cf947a8c7b388f75a12e5f0e3e0f9338426cd/docs/integrations.md#chatgpt-apps-aplikace-z-chatgpt)
- [Úschova tokenů Composia](https://docs.composio.dev/docs/security/token-custody) a [hranice projektů](https://docs.composio.dev/kb/guide/consumer-project-boundaries-and-auth-selection)
