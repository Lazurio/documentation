---
title: "Slovníček pojmů"
description: "Pojmy pro každodenní práci, správu a vývoj Lazuria."
stableId: lazurio-doc-guide-glossary
locale: cs
summary: "Pojmy pro každodenní práci, správu a vývoj Lazuria."
updatedAt: "2026-10-24"
reviewedAt: "2026-10-24"
reviewOwner: Anna Blazickova
secondReviewOwner: Pablo AI
trustCritical: true
sourceRefs:
  - lazurio-product-vocabulary
  - lazurio-readme
  - lazurio-architecture
  - lazurio-collaboration-model
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

**Modul** Jedna konkrétní aplikace v Organizaci, například Mission Control
nebo Knowledgebase.

**Marketplace** Místo, kde můžete objevit další aplikace a rozšíření pro
Lazurio.

**Mission Control** Místo pro řízení práce. Uvidíte zde, co se řeší, kdo za
to odpovídá a co má následovat.

**Knowledgebase** Společný firemní notýsek s postupy a souvislostmi pro další
práci. Agent z něj může čerpat, pokud k němu má přístup a načte si příslušný
zápis. Obsah chatu se do něj neukládá automaticky.

**Osobní Workspace** Váš soukromý pracovní obsah v Osobním Prostředí.
Slouží vám a vašemu Buddymu; není sdíleným úložištěm Organizace.
Ve starších technických zdrojích se objevuje název Personalspace.

**Kolega** Člověk, který pracuje v Organizaci.

**AI Kolega** Starší označení dlouhodobé AI role. Automatizace dnes
popisujeme jako práci agentů v Pracovním Prostředí, za kterou odpovídá
uživatel. Název role sám žádná oprávnění neuděluje.

**Buddy** Jméno osobního produktu Lazuria a vašeho osobního AI zástupce.
Schválený model nového osobního produktu počítá s Buddym vždy a se vstupem
přes web s účtem Lazuria, bez tailnetu a SSH. Dostupnost ověřte ve své instalaci.
Starší osobní instalace v tailnetu si mohou zachovat původní přístup. Buddy
jedná jen v rozsahu vašich oprávnění a uděleného zadání.

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

**User** Uživatel Organizace. Používá zpřístupněné aplikace, ale běžně
nemění jejich zdrojový kód ani nastavení Organizace.

**Builder** Člen Organizace, který vytváří a upravuje aplikace. Jeho přesné
možnosti určují skutečná oprávnění na GitHubu.

**Steward** Správce kvality a pořádku v Organizaci. Kontroluje změny, pomáhá
je dotahovat a podle svých oprávnění je může publikovat.

**Admin** Správce Organizace s rozšířenými oprávněními. Řídí přístupy a
důležitá nastavení; tím ale nezískává přístup do cizího Personalspace.

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
ostatním. Agent ji provede pouze po výslovném souhlasu oprávněného uživatele.

**Release** Oficiální vydání označené verze produktu nebo aplikace,
například nové verze pro zákazníky.

**Pull request (PR)** Návrh změn čekající na kontrolu a schválení před
zařazením do oficiální verze.

**Main** Hlavní, aktuálně platná verze projektu. Rozpracované změny se do ní
dostanou až po potřebných kontrolách.

**Worktree** Oddělená pracovní kopie projektu. Agent nebo vývojář v ní může
bezpečně připravovat změny bez zásahu do hlavní verze.

**Productionspace** Technická část Organizace pro zdrojové kódy a systémy,
které nejsou běžnými pracovními aplikacemi.

**Bun** Technický nástroj používaný k instalaci, spouštění a testování
aplikací. Pokud nejste vývojář, obvykle s ním nemusíte pracovat přímo.

**Zařízení (Machine)** Zařízení nebo izolované prostředí operačního systému,
ve kterém Lazurio běží. Tvoří hranici pro zabezpečení, přístupy a obnovu.

**Přístup** Skutečné oprávnění něco zobrazit nebo změnit. Oprávnění
k repozitářům určuje GitHub. Samotný název role přístup neuděluje.

</div>

Pojmenování odpovídá veřejným [rozhodnutím Lazuria](https://github.com/HumanAndMachines/Lazurio/blob/6416d27786296583baf08b75526cff225e2673f7/manual/decision-register.md),
zejména 0170 a 0207 s jejich dodatky. Konkrétní instalace může používat starší
popisky; technické názvy a příkazy zůstávají přesné.
