---
title: Jak Lazurio funguje
description: Jak Lazurio propojuje lidi, AI agenty, firemní data a schvalování výsledků.
stableId: lazurio-doc-how-it-works
locale: cs
summary: Vysvětlení základních pojmů Lazuria a postupu od zadání práce po schválený výsledek.
updatedAt: "2026-08-26"
reviewedAt: "2026-08-26"
reviewOwner: Matej Suchanek
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

Lazurio přistupuje k práci s AI stejně jako k jiné firemní práci: musí být
jasné, kdo ji zadal, k jakým podkladům lze přistupovat a kdo smí výsledek
schválit. AI agent může projít povolený kontext, připravit návrh a ověřit jej,
ale tím nezískává další oprávnění. Ta vždy vycházejí z přihlášené identity a
ze systémů, ve kterých se práce skutečně provádí.

Současný veřejný model definuje [architektura Lazuria](https://github.com/HumanAndMachines/Lazurio/blob/69c53ec342124aef48cb9d04fd109f9886ec242e/ARCHITECTURE.md)
a [kontrakt spolupráce s Agenty](https://github.com/HumanAndMachines/Lazurio/blob/69c53ec342124aef48cb9d04fd109f9886ec242e/AGENTS.md).

## Základní pojmy

**Principál** je člověk nebo AI Kolega, jehož jménem práce probíhá. Používají
se jeho oprávnění a on také rozhoduje o výsledku.

**Task Agent** je konkrétní relace s AI nástrojem. Pracuje pro Principála a
nemá vlastní oprávnění. Může připravovat návrhy a provádět povolené kroky;
samotné zadání z něj administrátora neudělá.

**Organizace** je přístupová hranice jedné firmy. V dokumentovaném modelu
odpovídá GitHub organizaci a samostatnému kořeni repozitářů. Data a strategie
konkrétní firmy zůstávají uvnitř této Organizace.

**Workspace Modul** je aplikace nebo jasně vymezená pracovní oblast uvnitř
Organizace. Každý Modul má vlastní technické podmínky a lze jej samostatně
vyvíjet, kontrolovat, nasazovat i vrátit na předchozí verzi.

**Personalspace** je soukromý prostor jednoho Principála. Neslouží ke sdílení
firemních informací ani k obcházení hranic mezi Organizacemi.

## Od zadání ke schválenému výsledku

1. **Vymezení práce:** určete Organizaci, Modul a očekávaný výsledek.
2. **Oprávnění:** vycházejte ze skutečného přístupu přihlášeného Principála.
   Textové zadání žádná nová práva nevytváří.
3. **Kontext:** zpřístupněte jen repozitáře a nástroje potřebné pro daný úkol.
4. **Návrh:** připravte výsledek ve vratné podobě, obvykle na samostatné větvi
   a v pull requestu. Lazurio pro tuto fázi používá pojem Draft.
5. **Ověření:** spusťte kontroly, popište praktický dopad a přiložte podklady
   potřebné k posouzení změny.
6. **Rozhodnutí:** oprávněný Principál konkrétní výsledek schválí, nebo zamítne.
7. **Publikace:** teprve potom lze změnu sloučit, nasadit, odeslat nebo jinak
   uvést do praxe.
8. **Uzavření:** aktualizujte plán, zapište nevyřešené otázky a odstraňte
   dočasné pracovní prostředí.

Díky tomu se nekontroluje pouze vygenerovaný text. Posuzující člověk vidí
konkrétní změnu, jejího vlastníka, výsledky ověření i to, kdo rozhoduje o
jejím zveřejnění nebo nasazení.

## Zdroje pravdy místo jedné obří databáze

Lazurio nevyžaduje kopírovat všechny informace do jediného úložiště pro AI.
Kód zůstává v repozitářích, plány v Mission Control dané Organizace, trvalé
znalosti v její Knowledgebase a data poskytovatelů za konkrétními integracemi.
Pracovní prostředí pro konkrétní úkol propojí potřebné části a zachová jejich
přirozené vlastníky.

Tento rozdíl je důležitý v provozu. Odebrání přístupu k repozitáři nebo
odvolání integrace změní, k čemu Principál a jeho Agent dosáhnou; úprava názvu
role v dokumentaci nikoli.

## Současný stav a cílový směr

Veřejná architektura rozlišuje cílový model od aktuálně nasazené konfigurace.
Ne každá instalace zpřístupňuje každou plánovanou schopnost. Při posouzení
konkrétního nasazení proto vycházejte ze skutečné konfigurace a ověřte
nastavení přímo u příslušných poskytovatelů. [Přehled pro správce
IT](/cs/it-administrators/) uvádí, jaké podklady si před schválením vyžádat.
