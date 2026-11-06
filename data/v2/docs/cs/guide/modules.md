---
title: "Moduly"
description: "Co je modul, kde ho najdete, jak vzniká, kdo ho dostane a kde leží jeho data."
stableId: lazurio-doc-guide-modules
locale: cs
summary: "Co je modul, kde ho najdete, jak vzniká, kdo ho dostane a kde leží jeho data."
updatedAt: "2026-11-05"
reviewedAt: "2026-11-05"
reviewOwner: Matej Suchanek
secondReviewOwner: Pablo AI
trustCritical: true
sourceRefs:
  - lazurio-platform-module-standard-v0-1-20
  - lazurio-platform-module-standard-v0-1-21
  - lazurio-platform-module-parts-f14
  - lazurio-platform-decision-f52
  - lazurio-platform-content-sync-v0-1-20
  - lazurio-platform-new-module-tile-v0-1-20
  - lazurio-platform-texts-v0-1-20
  - lazurio-platform-prompt-handoff-v0-1-20
  - lazurio-platform-release-v0-1-20
  - lazurio-platform-release-v0-1-21-rc-1
  - lazurio-platform-marketplace-v0-1-21
  - lazurio-marketplace-registry
  - lazurio-template-adoption
  - lazurio-platform-stack-profiles
  - lazurio-platform-register-modules
  - lazurio-platform-folder-manual
audience:
  - decision-maker
  - builder
  - agent
---

**Modul je jedna oblast vaší práce, třeba zakázky, web nebo receptury.
Drží pohromadě postup, podle kterého agenti pracují, data, se kterými se
pracuje, a aplikaci, ve které je vidíte a měníte.**

<figure class="lz-diagram">
  <video controls playsinline preload="none" poster="/videos/modules-cs.webp" aria-describedby="modules-video-words">
    <source src="/videos/modules-cs.mp4" type="video/mp4" />
  </video>
  <figcaption id="modules-video-words">Modul je jedna oblast vaší práce. Postup, data a aplikace v jednom balíčku. Agenti pracují podle postupu, lidé v aplikaci. Admin rozhodne, kdo modul dostane. Nový postavíte s agentem, nebo ze šablony.</figcaption>
</figure>

## Tři části modulu

| Část | Pro koho | Co to je |
| --- | --- | --- |
| **Postup** | agenti | Jak se v oblasti pracuje: kroky, pravidla a návody, podle kterých se agenti řídí. |
| **Data** | lidé i agenti | Záznamy a obsah oblasti: zakázky, stránky webu, receptury. |
| **Aplikace** | lidé | Obrazovka, ve které data vidíte a měníte: přehled, formulář, nástěnka, web. Modul může začít i bez ní. |

Pod těmito třemi částmi je repozitář na GitHubu. Každá změna má historii a jde
vrátit, takže se nebojte zkoušet.

## Příklad, který má každá firma

Vezměte si **web firmy**. Postup říká, jak píšete texty a jaké používáte barvy.
Data jsou stránky, texty a obrázky. Aplikace je web sám a jeho náhled. Proto
agentovi stačí poslat snímek obrazovky a napsat „oprav tuhle větu“: modul webu
mu řekne, kde text leží a jak změnu publikovat.

Další dva příklady:

- **Zakázky:** postup přijetí zakázky, zakázky samotné a jejich přehled.
- **Finance bez aplikace:** postup a tabulky. Aplikaci přidáte, až ji budete
  chtít.

Modul není složka. I modul bez aplikace má svůj postup a data a agenti s nimi
pracují.

## Kde modul najdete

Otevřete **Apps**. V části **Workspace** vidíte každý modul své Organizace, ke
kterému se vaše Prostředí dostane, a to každý jednou. Dlaždice otevře aplikaci
modulu v prohlížeči; samotná aplikace běží ve vašem Prostředí.

Když Kolega zmíní modul, který nevidíte, možná k němu nemáte přístup. Zeptejte
se svého Admina.

## Jak modul vzniká

**S agentem.** V Apps v části **Workspace** zvolte **Nový modul**. Otevře se
Chat v novém vlákně s připraveným zadáním, zatím neodeslaným. Popíšete, co má
modul řešit, agent se doptá na to, co mu chybí, a technické věci zvolí sám.
Ukáže vám plán a modul založí až po vašem souhlasu.

Kdo to může udělat, záleží na tom, kam modul patří:

- **V Organizaci zakládá moduly Admin.** Dlaždici **Nový modul** vidí jen on.
  Z modulu se stane soukromý repozitář Organizace.
- **Když Adminem nejste,** popište, co potřebujete, a
  [požádejte Admina](/cs/guide/ask-the-admin/).
- **V Osobním Prostředí si zakládáte moduly sami.** Stejnou dlaždici najdete ve
  svém osobním prostoru. Z modulu se stane soukromý repozitář na vašem vlastním
  GitHub účtu. Patří jen vám a do žádné Organizace nejde.

**Ze šablony.** Verze 0.1.21, k 5. listopadu 2026 kandidát vydání, přináší
šablony do **Marketplace** dole v Apps: Mission Control, Design System
a Prezentace. Tlačítko **Přidat do Organizace** předá zadání vašemu agentovi,
který vám ukáže plán a připraví soukromou kopii ve vaší Organizaci. Založí ji
i tady Admin; když jím nejste, agent mu připraví žádost.

Ať modul vznikne jakkoli, je to váš modul. Začněte malou první verzí. Modul
roste dalšími zadáními v Chatu.

## Jak se modul mění

Napište do Chatu, co chcete změnit. Agent změnu připraví a ukáže vám ji v panelu
vpravo. Když vám vyhovuje, napište „publikuj“. Na GitHub nikdo chodit nemusí.
Poslední krok vysvětluje [Kontrola a Publikace](/cs/guide/course/review/).

## Kdo modul dostane a kdy se objeví

Organizace sdílí moduly po Teamech. Admin rozhoduje, které Teamy k modulu
dosáhnou, a to v Přehledu Organizace nebo přímo na GitHubu. Kdo modul nedostane,
ten ho v Apps nevidí a jeho agent ho nepřečte.

Od verze 0.1.20 k vám modul dorazí sám, jakmile k němu máte přístup. Lazurio
každou hodinu kontroluje přístupy a modul stáhne do vašeho Prostředí, takže ho
v Apps uvidíte nejpozději do hodiny. Nikdo nemusí nic instalovat.

Jinak je to ve dvou případech:

- **Týmové Prostředí** nový modul tímto způsobem nedostane. Požádejte Admina.
- **Modul vyhrazený Adminům** dostanou jen Admini.

Osobní modul zůstává ve vašem Osobním Prostředí.

## Moduly, Soubory a Integrace

| | Co to je | Co to pro vás znamená |
| --- | --- | --- |
| **Modul** | Sdílená oblast práce vaší Organizace. | Má historii a k lidem se dostává podle přístupů. |
| **Soubory** | Složka Dokumenty jednoho Prostředí: pracovní stůl, na kterém agentům předáváte podklady a od nich si berete hotové soubory. | Zůstává v tomto jednom Prostředí a nemá historii změn. |
| **Integrace** | Cizí aplikace, kterou agenti používají zvenku, třeba e-mail nebo kalendář. | Pracujete s tím, co připojení nabízí. Kód aplikace není váš. |

Dvě pravidla, která doporučujeme:

- Co má sdílet tým nebo přežít jedno Prostředí, patří do modulu.
- Vlastní modul se vyplatí, když chcete vlastní postup a aplikaci. Integrace,
  když většinu práce zvládne hotová aplikace.

## Kde leží data

Moduly se liší tím, kde mají data. Vybírat nemusíte: agent zvolí nejjednodušší
místo, které stačí, a modul se posune dál, až když to používání opravdu
potřebuje.

| Kde data leží | Kdy se to hodí | Příklad |
| --- | --- | --- |
| Přímo v aplikaci | Modul nemá vlastní záznamy. | Sada prezentací |
| Vedle aplikace ve stejném repozitáři | Obsahu je hodně, mění se občas a upravují ho agenti. | Tato dokumentace |
| Ve vlastním datovém repozitáři | Záznamy se mění denně a chcete historii a schvalování. Změna počká, až ji člověk publikuje. | Plány v Mission Controlu |
| V databázi na serveru vaší Organizace | Zapisuje mnoho lidí najednou, přístup se liší uvnitř dat nebo se musí dát smazat osobní údaje. **Rozhodnuto, zatím není k dispozici.** | CRM celého obchodu |

Stejnou tabulku s technickými názvy pro IT najdete v části
[Architektura](/cs/architecture/).

## Časté otázky

**Když modul používá dvacet lidí, jsou data dvacetkrát?**
Ne. Zdroj je jeden, na GitHubu. Každé Prostředí s přístupem má jeho kopii
a Lazurio ji udržuje aktuální.

**Má každý svůj repozitář, nebo je jeden pro celou Organizaci?**
Ani jedno. Organizace má jeden kořenový repozitář a každý modul má vlastní.
Lidé pracují s kopií ve svém Prostředí.

**Jsou to naše vlastní moduly, nebo ty vaše?**
Vždycky vaše. I šablona se přidá jako vaše vlastní soukromá kopie.

**Je Apps něco jiného než modul?**
Ano. Apps je stránka v Lazuriu, na které moduly najdete. Modul je to, co otevře
její dlaždice.

**Musím nový modul přesunout do nějaké složky?**
Ne. Agent ho založí na správné místo a v Apps se objeví sám.

**Postaví jedno zadání celé CRM?**
Najednou ne. Zadejte malou první verzi, která dělá dobře jednu věc, a v Chatu
ji pak rozšiřujte.

**Musím kvůli změně modulu něco mergovat na GitHubu?**
Ne. Napište změnu do Chatu, zkontrolujte ji v panelu vpravo a napište
„publikuj“.

**Dosáhne agent na naši stávající databázi nebo jiný systém?**
Ano, jako Integrace, pokud se k systému dá připojit. Podrobnosti pro IT jsou
v části [Architektura](/cs/architecture/#modul-nebo-integrace).
