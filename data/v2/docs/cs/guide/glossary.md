---
title: "Slovníček pojmů"
description: "Pojmy pro každodenní práci, správu a vývoj Lazuria."
stableId: lazurio-doc-guide-glossary
locale: cs
summary: "Pojmy pro každodenní práci, správu a vývoj Lazuria."
updatedAt: "2026-11-11"
reviewedAt: "2026-11-05"
reviewOwner: Anna Blazickova
secondReviewOwner: Pablo AI
trustCritical: true
sourceRefs:
  - lazurio-product-vocabulary
  - lazurio-readme
  - lazurio-architecture
  - lazurio-collaboration-model
  - lazurio-onboarding-decision-register
  - lazurio-decision-0234-role-names
  - lazurio-decision-0236-mission-control-readers
  - lazurio-platform-folder-manual
  - lazurio-platform-launchpad-texts
  - lazurio-platform-module-standard-v0-1-20
  - lazurio-platform-module-parts-f14
  - lazurio-platform-marketplace-v0-1-21
  - lazurio-marketplace-registry
  - github-about-pull-requests
  - github-protected-branches
audience:
  - it-admin
  - decision-maker
  - builder
  - agent
---

Základní pojmy potkáte při běžné práci. Pokročilá část vysvětluje správu,
vývoj a schvalování změn.

## Základní pojmy

<div class="lz-glossary">

**Lazurio** Společné pracovní prostředí pro lidi a AI agenty. Pomáhá vám
najít aplikace, práci a potřebné informace.

**Prostředí** Místo, kde pro vás pracují agenti. U hostovaných Prostředí
rozlišujeme tři druhy: Osobní, Pracovní a Týmové.

**Osobní Prostředí** Vaše Prostředí s Buddym a Osobním Workspace.

**Pracovní Prostředí** Prostředí Organizace přiřazené konkrétnímu uživateli.
Mohou v něm běžet automatizace; ty netvoří samostatný čtvrtý druh.

**Týmové Prostředí** Sdílené Prostředí členů Teamu. Připojené účty v něm
smějí používat všichni oprávnění členové, proto do něj patří týmová přihlášení.

**Váš počítač** Vlastní zařízení s místním Lazuriem. Není čtvrtým druhem
hostovaného Prostředí.

**Apps (ve starších zdrojích Launchpad)** Část Lazuria, kde otevíráte
aplikace Organizace. Uvnitř Prostředí mezi částmi přepínáte přes Chat,
Apps a Automate.

**Chat** Část Prostředí pro práci s agenty, na každý úkol jedno vlákno.
V Prostředí je to T3 Code.

**Automate** Část Prostředí pro pravidelné úkoly a automatizaci.

**Začínáme** První oddíl Nastavení Prostředí. Ukazuje kroky, které Prostředí
připraví k práci: AI, GitHub a obsah Organizace, v tomto pořadí.

**Guide** Praktická nápověda k Lazuriu. Když nevíte, co něco znamená nebo
jak pokračovat, začněte tady.

**GitHub** Služba pro repozitáře a jejich oprávnění. Určuje, které
repozitáře můžete číst a upravovat. Přihlášení k AI poskytovateli a jeho
předplatné se řeší samostatně.

**Předplatné AI služby** Tarif zvoleného poskytovatele určuje dostupné
modely a limity. Je oddělený od oprávnění k repozitářům v GitHubu.

**Tokeny** Jednotky, podle kterých se počítá využití AI. Spotřebovávají se
při čtení zadání i vytváření odpovědi; nejde o hesla ani přístupové klíče.

**Organizace** Oddělený pracovní prostor jedné firmy. Má vlastní lidi,
aplikace, data a přístupy.

**Team** Skupina lidí, kteří společně pracují na určité oblasti,
například na obchodu nebo produktu.

**Workspace** Část Organizace s aplikacemi pro každodenní práci.

**Modul** Jedna oblast vaší práce, třeba zakázky, web nebo receptury.
Drží pohromadě postup, podle kterého agenti pracují, data, se kterými se
pracuje, a aplikaci, ve které je vidíte a měníte. Moduly jsou například Mission
Control a Knowledgebase. Víc na stránce [Moduly](/cs/guide/modules/).

**Marketplace** Místo dole v Apps se šablonami modulů. Šablona se do vaší
Organizace přidá jako vaše vlastní soukromá kopie. Od verze 0.1.21, která je
k 5. listopadu 2026 kandidát vydání, nabízí šablony z veřejného seznamu Lazuria.

**Mission Control** Místo pro řízení práce. Uvidíte zde, co se řeší, kdo za
to odpovídá a co má následovat.

**Knowledgebase** Společný firemní notýsek s postupy a souvislostmi pro další
práci. Agent z něj může čerpat, pokud k němu má přístup a načte si příslušný
zápis. Obsah chatu se do něj neukládá automaticky.

**Integrace** Aplikace nebo služba připojená k Prostředí, třeba pošta nebo
kalendář. Připojujete ji vy v Apps → Integrace; potom ji může používat každý
agent tohoto Prostředí. Odeslání nebo Publikace přes ni dál potřebuje váš
souhlas.

**Osobní Workspace** Váš soukromý pracovní obsah v Osobním Prostředí.
Slouží vám a vašemu Buddymu; není sdíleným úložištěm Organizace.
Ve starších technických zdrojích se objevuje název Personalspace.

**Kolega** Uživatel v Organizaci. Co smí, určují jeho role a Teamy.

**AI Kolega** Starší označení dlouhodobé AI role. Automatizace dnes
popisujeme jako práci agentů v Pracovním Prostředí, za kterou odpovídá
uživatel. Název role sám žádná oprávnění neuděluje.

**Henry** Jméno Pracovního Prostředí Organizace s automatizacemi. Pracuje
v něm tým botů pod personou Organizace a odpovídá za něj jeden odpovědný
uživatel. Není to samostatný druh Prostředí.

**Buddy** Jméno osobního produktu Lazuria a vašeho osobního AI zástupce.
Buddy patří k vašemu Osobnímu Prostředí a jedná jen ve vašich právech
a v rámci mandátů, které mu dáte. Platby, tajné údaje, změny přístupů
a merge nebo Publikace mimo výslovný mandát vždy potřebují váš souhlas
s přesně tímto krokem.

**Prompt** Zadání, které napíšete AI. Například: „Připravte mi přehled
nezaplacených faktur a vysvětlete, co mám řešit jako první.“

**Spustit** Zapnout aplikaci, aby ji bylo možné používat.

**Otevřít** Přejít do vybrané aplikace. Pokud ještě neběží, Launchpad ji
může nejprve spustit.

**Zastavit** Vypnout lokálně spuštěnou aplikaci. Její data se tím nemažou.

**Synchronizovat** Načíst aktuální stav projektů a aplikací, abyste
pracovali s nejnovějšími změnami.

</div>

## Pokročilé pojmy

<div class="lz-glossary">

**Uživatel** Člověk, pro kterého agenti pracují a který má poslední slovo.
Samotné slovo uživatel roli neoznačuje. Když má někdo dostat roli „admina“
nebo „uživatele“, vždy se upřesní, jestli jde o Organizaci, nebo o kterou
aplikaci.

**Role** Pojmenovaný přístup člověka na jedné úrovni: v Organizaci, v modulu,
v aplikaci nebo v Prostředí. Píše se s velkým písmenem a vždy s úrovní, třeba
Admin Organizace nebo Uživatel aplikace. Samotný název role nic neopravňuje;
rozhoduje skutečný přístup.

**Vlastník Organizace** Vlastní GitHub Organization, ve které Organizace
žije (na GitHubu role owner). Jmenuje a odvolává Adminy Organizace. Sám tím
do Prostředí přístup nemá.

**Admin Organizace** Spravuje členy, Teamy, přístupy a Prostředí Organizace;
tím ale nezískává přístup do cizího Personalspace. Je to role Lazuria, kterou
jmenuje Vlastník Organizace (zatím nenasazená); do jejího nasazení je Adminem
Organizace aktivní Vlastník Organizace.

**Člen Organizace** Každý další člověk v Organizaci. Co smí, plyne z jeho
rolí v modulech a aplikacích. Cílově ho určuje členství v Lazuriu, které účet
na GitHubu nepotřebuje; zatím rozhoduje živé členství v GitHub Organization.
V Mission Control Organizace je každý Člen Organizace aspoň Čtenář modulu
(rozhodnutí 0236, zatím nenasazené).

**Čtenář modulu** Čte zdrojový kód modulu a nic nemění. Na GitHubu oprávnění
`pull`. Sama tato role nedává žádnou roli v aplikaci modulu.

**Přispěvatel modulu** Staví modul a navrhuje změny. Na GitHubu oprávnění
`push` v repozitáři, který smí mít pravidla větví.

**Správce modulu** Navíc smí mergovat chráněnou `main` modulu a vydat ho. Na
GitHubu oprávnění `maintain`, nebo `push` tam, kde repozitář pravidla větví
mít nemůže. Slovem Správce označuje Lazurio jen tuto roli.

**Přístup k modulu** Nastavení, které drží roli člověka nebo Teamu v modulu.
Samo roli neoznačuje. Kdo žádnou roli v modulu nemá, k modulu přístup nemá.

**Admin aplikace** Role v aplikaci modulu, rozhodnutá a zatím nenasazená
(rozhodnutí 0231). Co smí, určuje pravidlo Organizace v kódu modulu. Bez dalšího nastavení je Adminem aplikace každý Přispěvatel
modulu a Správce modulu, Admin Organizace a ten, kdo má celé Prostředí, kde
aplikace běží.

**Uživatel aplikace** Druhá role v aplikaci modulu, také zatím nenasazená. Co
smí, určuje také pravidlo Organizace v kódu modulu.

**Přidělený uživatel** Člověk, kterému je přidělené Pracovní Prostředí.

**Servisní vstup** Vstup do Prostředí pro někoho jiného, než je jeho
Přidělený uživatel. Není to role. Podle rozhodnutí 0228, které zatím není
nasazené, bude mít Admin Organizace servisní vstup do každého Prostředí své
Organizace, kdokoli jiný jen tehdy, když mu ho někdo udělí pro jedno
Prostředí.

**Persona** Účet agenta Organizace, třeba Henryho. Nikdy neoznačuje roli
člověka.

**Principál** Označení odpovědné identity ve starších zdrojích Lazuria.
Aktuální texty mluví o uživateli jako o člověku, který práci zadává a má
poslední slovo.

**Task Agent** Pracovní relace AI nástroje pro konkrétní úkol. Nemá vlastní
oprávnění; používá přístupy dostupné v Prostředí a řídí se zadáním uživatele.

**Skill** Uložený návod pro agenta k určitému typu práce, například přípravě
prezentace nebo kontrole změn. Může obsahovat instrukce, šablony a skripty.
Nenahrazuje kontrolu výsledku.

**MCP server** Spojení, přes které může AI používat konkrétní nástroj nebo
pracovat s jeho daty, například s GitHubem. Sám AI nedává další oprávnění —
použije jen přístupy dostupné na daném zařízení.

**Opatrovník** Ve starších zdrojích určený člověk, který pomáhá s obnovou
nebo servisním zásahem u AI Kolegy. Tato role sama neuděluje obecný přístup.

**Draft** Rozpracovaný návrh, který ještě není oficiální. Můžete ho
kontrolovat, měnit nebo zahodit.

**Publikace** Okamžik, kdy se Draft stane oficiálním nebo viditelným
ostatním, třeba merge pull requestu nebo odeslání e-mailu či zprávy. Agent ji
provede pouze po výslovném souhlasu uživatele; co smí publikovat, určují jeho
živá práva.

**Handoff** Závěr práce agenta: odkaz na ni, co Publikace zavede, co agent
ověřil, a otázka, kdo změny publikuje.

**Release** Oficiální vydání označené verze produktu nebo aplikace,
například nové verze pro zákazníky.

**Pull request (PR)** Návrh změn čekající na kontrolu a schválení před
zařazením do oficiální verze.

**Draft pull request** Pull request, který je ještě rozpracovaný. GitHub ho
nikomu nedovolí mergnout, dokud ho někdo nepřepne na Ready for review.
Agenti v Lazuriu ho otevírají hned, jak začnou na změně pracovat.

**Review** Kontrola pull requestu někým jiným než autorem, než se mergne.
U chráněné větve může GitHub schvalující review vyžadovat.

**Main** Hlavní, aktuálně platná verze projektu. Rozpracované změny se do ní
dostanou až po potřebných kontrolách.

**Worktree** Oddělená pracovní kopie projektu. Agent nebo vývojář v ní může
bezpečně připravovat změny bez zásahu do hlavní verze.

**Productionspace** Technická část Organizace pro zdrojové kódy a systémy,
které nejsou běžnými pracovními aplikacemi.

**Folder (Lazurio Folder)** Složka v Prostředí, ve které Lazurio drží
instrukce, manuály a skilly pro agenty, vedle vašich Organizací. Každé nové
vlákno v Chatu začíná v ní. Soubory v ní generuje Lazurio, takže ruční
úprava v nich zablokuje jejich aktualizace.

**Bun** Technický nástroj používaný k instalaci, spouštění a testování
aplikací. Pokud nejste vývojář, obvykle s ním nemusíte pracovat přímo.

**Zařízení (Machine)** Zařízení nebo izolované prostředí operačního systému,
ve kterém Lazurio běží. Tvoří hranici pro zabezpečení, přístupy a obnovu.

**Přístup** Skutečné oprávnění něco zobrazit nebo změnit. Oprávnění
k repozitářům určuje GitHub. Samotný název role přístup neuděluje.

</div>

Pojmenování odpovídá veřejným [rozhodnutím Lazuria](https://github.com/Lazurio/LazurioPlatform/blob/4d5ee62a963a0ae2fc98287f0072e739ff6d2cd8/docs/decision-register.md),
zejména 0170 a 0207 s jejich dodatky, 0169 pro Henryho a 0089 pro Buddyho.
Názvy rolí určuje [rozhodnutí 0234](https://github.com/Lazurio/LazurioPlatform/blob/753cca123df45721c3c1395a16a3a0df9a04dbcd/docs/decision-register.md#0234--the-names-of-access-roles-one-vocabulary-for-every-text-screen-and-agent)
(anglicky) a čtení Mission Control [rozhodnutí 0236](https://github.com/Lazurio/LazurioPlatform/blob/cfbd1b3cf2887f4f254f2fa63a20f5f90e8ef26f/docs/decision-register.md#0236--mission-control-is-every-members-each-organization-member-reads-it-and-proposes-through-issues)
(anglicky); dřívější názvy Builder, Steward a User už role neoznačují.
Konkrétní instalace může používat starší popisky; technické názvy a příkazy
zůstávají přesné. Pojmy krok za krokem používá [Úvodní kurz](/cs/guide/course/).
