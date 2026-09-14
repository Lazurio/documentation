---
title: Slovníček pojmů
description: Praktická vysvětlení základních a pokročilých pojmů v Lazuriu.
stableId: lazurio-doc-guide-glossary
locale: cs
summary: Jednoduchá a praktická vysvětlení pojmů, které potkáte při používání, správě nebo vývoji Lazuria.
updatedAt: "2026-09-14"
reviewedAt: "2026-09-14"
reviewOwner: Anna Blazickova
secondReviewOwner: Pablo AI
trustCritical: true
sourceRefs:
  - lazurio-readme
  - lazurio-architecture
  - lazurio-collaboration-model
audience:
  - it-admin
  - decision-maker
  - builder
  - agent
---

Začněte základními pojmy. Do pokročilé části se podívejte, když řešíte
správu, vývoj nebo schvalování změn.

## Základní pojmy

<div class="lz-glossary">

**Lazurio** Společné pracovní prostředí pro lidi a AI Kolegy. Pomáhá Vám
najít aplikace, práci a potřebné informace.

**Launchpad** Domovská obrazovka Lazuria. Odtud si vyberete Organizaci a
otevřete aplikaci, ve které chcete pracovat.

**Guide** Praktická nápověda k Lazuriu. Když nevíte, co něco znamená nebo
jak pokračovat, začněte tady.

**GitHub** Účet, kterým se přihlašujete do Lazuria. Zároveň určuje, do
kterých Organizací a projektů máte přístup a co v nich smíte dělat.

**Předplatné** Určuje, kolik AI služeb můžete využívat a kolik tokenů máte
k dispozici. Nemusí být propojené s Vaším GitHub účtem — přihlášení a placení
jsou dvě oddělené věci.

**Tokeny** Jednotky, podle kterých se počítá využití AI. Spotřebovávají se
při čtení zadání i vytváření odpovědi; nejde o hesla ani přístupové klíče.

**Organizace** Oddělený pracovní prostor jedné firmy. Má vlastní lidi,
aplikace, data a přístupy.

**Team** Skupina lidí a AI Kolegů, kteří společně pracují na určité oblasti,
například na obchodu nebo produktu.

**Workspace** Část Organizace s aplikacemi pro každodenní práci.

**Modul** Jedna konkrétní aplikace v Organizaci, například Mission Control
nebo Knowledgebase.

**Marketplace** Místo, kde můžete objevit další aplikace a rozšíření pro
Lazurio.

**Mission Control** Místo pro řízení práce. Uvidíte zde, co se řeší, kdo za
to odpovídá a co má následovat.

**Knowledgebase** Firemní knihovna znalostí. Obsahuje postupy, rozhodnutí,
zkušenosti a další informace důležité pro Organizaci.

**Personalspace** Váš soukromý prostor. Patří pouze Vám a případně Vašemu
Buddymu.

**Kolega** Člověk, který pracuje v Organizaci.

**AI Kolega** Digitální člen týmu s vlastní pracovní rolí, odpovědností a
přístupy.

**Buddy** Váš osobní AI pomocník. Může Vám pomáhat nebo Vás zastupovat pouze
v rozsahu, který mu dovolíte.

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

**Principál** Člověk nebo AI Kolega, pro kterého Agent právě pracuje a který
má poslední slovo.

**Task Agent** Dočasný AI pomocník pro konkrétní úkol nebo konverzaci. Nemá
vlastní oprávnění a pracuje pouze v rámci přístupů svého Principála.

**Skill** Ověřený pracovní postup pro určitý typ úkolu. Pomáhá AI postupovat
správně a opakovatelně, například při tvorbě prezentace, práci s dokumenty
nebo kontrole změn.

**MCP server** Spojení, přes které může AI používat konkrétní nástroj nebo
pracovat s jeho daty, například s GitHubem. Sám AI nedává další oprávnění —
použije jen přístupy dostupné na dané Mašině.

**Plugin** Instalovatelný balíček, který rozšíří Codex o nové možnosti. Může
obsahovat Skilly, MCP servery nebo napojení na aplikace; instalací ale
automaticky nezíská přístup do Vašich účtů.

**Opatrovník** Určený člověk, který může pomoci s obnovou nebo servisním
zásahem u AI Kolegy. Neřídí jeho každodenní práci.

**Draft** Rozpracovaný návrh, který ještě není oficiální. Můžete ho
kontrolovat, měnit nebo zahodit.

**Publikace** Okamžik, kdy se Draft stane oficiálním nebo viditelným
ostatním. Agent ji provede pouze po výslovném souhlasu oprávněného Principála.

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

**Mašina** Zařízení nebo oddělené pracovní prostředí, ve kterém Lazurio
běží. Tvoří také hranici pro zabezpečení, přístupy a obnovu.

**Přístup** Skutečné oprávnění něco zobrazit nebo změnit. V pracovních
Organizacích ho určuje GitHub, nikoli pouze název Vaší role.

</div>
