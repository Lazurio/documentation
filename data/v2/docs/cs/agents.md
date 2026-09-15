---
title: Dokumentace pro AI agenty
description: Strojově čitelné rozhraní pro vyhledání a načtení veřejné dokumentace Lazuria.
stableId: lazurio-doc-agents
locale: cs
summary: Jak z llms.txt a content-index.json získat zkontrolovaný obsah včetně zdrojů, cílových skupin a dat revize.
updatedAt: "2026-09-15"
reviewedAt: "2026-09-15"
reviewOwner: Matej Suchanek
sourceRefs:
  - lazurio-readme
  - lazurio-architecture
audience:
  - builder
  - agent
---

Agenti čtou stejné stránky jako lidé. Pro automatické vyhledávání je obsah
dostupný také v textovém a JSON indexu.

## Jak obsah najít a načíst

- [`/llms.txt`](/llms.txt) nabízí stručný seznam hlavních stránek a jejich
  shrnutí.
- [`/content-index.json`](/content-index.json) je verzovaný strukturovaný
  index. U každého dokumentu obsahuje stabilní ID, cestu, cílové skupiny,
  datum kontroly, kanonickou URL, veřejnou cestu ke zdrojovému souboru, odkazy
  na podklady a celý obsah v Markdownu.
- [`/sitemap-index.xml`](/sitemap-index.xml) je mapa webu pro vyhledávače a
  indexovací roboty. Vzniká při sestavení webu.
- Stránky určené lidem zůstávají hlavním místem pro výklad obsahu.

Vyhledání podle stabilního ID ve výchozím nastavení vrací anglický dokument.
Agent si může výslovně vyžádat jiný publikovaný jazyk; kanonická cesta vždy
vede na konkrétní jazykovou verzi stránky.

Všechny tyto výstupy vznikají z `data/v2/docs` ve veřejném
[repozitáři dokumentace](https://github.com/Lazurio/documentation). Index uvádí
přesný zdrojový commit a informaci, zda náhled vznikl z lokálních
necommitnutých změn. Produkční nasazení odmítne takto vytvořený obsah i commit,
který neprošel požadovaným schválením.

## Doporučený postup pro agenty

1. Začněte v `llms.txt` a vyberte odpovídající stránku.
2. Potřebujete-li odkaz uchovat, použijte stabilní ID z
   `content-index.json`; cesta se může při další lokalizaci změnit.
3. Před převzetím bezpečnostně důležitého tvrzení projděte `sourceRefs` a
   odpovídající veřejné podklady.
4. Rozlišujte doložené tvrzení poskytovatele od hodnocení Lazuria.
5. Pokud záleží na aktuálnosti, uveďte datum kontroly stránky a zdrojový commit.
6. Jestliže tvrzení v dokumentaci chybí nebo závisí na konkrétním nasazení,
   otevřeně to přiznejte a nedoplňujte odpověď odhadem.

## Plánovaný MCP server

MCP server pro tuto dokumentaci zatím není dostupný. Pokud vznikne, má
zpřístupnit stejný obsah jako JSON index, pouze pro čtení. Nemá zapisovat do
dokumentace ani číst soukromá data. Do té doby používejte odkazy uvedené výše.
