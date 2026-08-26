---
title: Dokumentace pro Agenty
description: Stabilní rozhraní pro discovery a načítání dokumentace Agenty, kteří potřebují porozumět Lazuriu.
stableId: lazurio-doc-agents
locale: cs
summary: Pomocí llms.txt a content indexu najdete zrevidované stránky Lazuria, zdroje důkazů, cílové skupiny, data revize a stabilní identity.
updatedAt: "2026-08-26"
reviewedAt: "2026-08-26"
reviewOwner: Matej Suchanek
sourceRefs:
  - lazurio-readme
  - lazurio-architecture
audience:
  - builder
  - agent
---

Agenti mají číst stejný zrevidovaný zdroj jako lidé. Tento web neudržuje
skrytou „AI verzi“ dokumentace Lazuria.

## Rozhraní pro nalezení obsahu

- [`/llms.txt`](/llms.txt) je stručná mapa kanonických stránek a jejich shrnutí.
- [`/content-index.json`](/content-index.json) je verzovaný strukturovaný
  index. Obsahuje stabilní ID dokumentů, cesty, cílové skupiny, metadata
  revize, kanonické URL, veřejné cesty ke zdrojovým souborům, odkazy na důkazy
  a obsah v Markdownu.
- [`/sitemap-index.xml`](/sitemap-index.xml) je mapa webu pro crawlery,
  kterou vytváří build dokumentace.
- Stránky určené lidem zůstávají kanonickou interpretační vrstvou.

Načtení podle stabilního ID ve výchozím stavu vrací anglický dokument. Agent
může explicitně požádat o jiný publikovaný jazyk; kanonická cesta vždy
vybere přesnou lokalizovanou stránku.

Všechny artefakty vznikají z `data/v2/docs` ve veřejném
[repozitáři dokumentace](https://github.com/Lazurio/documentation). Index uvádí
přesný zdrojový commit a také to, zda vznikl ze špinavého lokálního preview.
Produkční nasazení odmítne špinavý nebo neschválený commit.

## Doporučený postup načítání

1. Začněte v `llms.txt` a vyberte stránku.
2. Když potřebujete uchovat odkaz, upřednostněte stabilní ID z
   `content-index.json`; cesty se mohou později lokalizovat.
3. Před zopakováním bezpečnostně kritického tvrzení přečtěte `sourceRefs` a
   odpovídající veřejné záznamy zdrojů.
4. Rozlišujte doložená fakta poskytovatele od hodnocení Lazuria.
5. Když záleží na aktuálnosti, uvádějte datum revize stránky a zdrojový commit.
6. Pokud tvrzení chybí nebo závisí na konkrétním nasazení, přiznejte to místo
   doplnění mezery odhadem.

## Budoucí MCP server

Pozdější read-only MCP server může nad stejným content indexem zpřístupnit
discovery a načítání dokumentace. Nestane se writerem, privátním overlayem ani
druhým úložištěm obsahu. Současný JSON kontrakt je kompatibilní rozhraní pro
tuto budoucí práci; web na budoucím serveru nezávisí.
