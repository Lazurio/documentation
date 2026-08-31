---
title: Jak Lazurio funguje
description: Základní provozní model Lazuria — od Principála a Organizace až po Návrh a zveřejnění.
stableId: lazurio-doc-how-it-works
locale: cs
summary: Seznamte se s Principály, agenty, Organizacemi, repozitáři, moduly, Návrhy, review a cestou ke zveřejnění.
updatedAt: "2026-08-30"
reviewedAt: "2026-08-30"
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

Lazurio bere práci s AI jako běžnou firemní práci s jasným vlastníkem. Člověk
nejdřív určí výsledek. Agent si projde povolený kontext, připraví upravitelný
výstup, ověří ho a předloží ke kontrole. Pravomoc nevzniká z jistoty agenta;
plyne z přihlášené identity a ze systémů, které vlastní jednotlivé akce.

Současný veřejný model popisuje [architektura Lazuria](https://github.com/HumanAndMachines/Lazurio/blob/3c5bda5d54c5556a0e54f3c339d988aa911fda60/ARCHITECTURE.md)
a [pravidla spolupráce s Agenty](https://github.com/HumanAndMachines/Lazurio/blob/3c5bda5d54c5556a0e54f3c339d988aa911fda60/AGENTS.md).

## Základní pojmy

**Principál** je člověk nebo dlouhodobější AI Kolega, pro něhož se práce dělá.
Drží skutečná oprávnění a má poslední slovo.

**Task Agent** je právě běžící pracovní relace s AI nástrojem. Pracuje pro
Principála a nemá vlastní oprávnění. Umí navrhnout a připravit práci; prompt z
něj administrátora neudělá.

**Organizace** je hranice repozitářů a přístupů jedné firmy. V popsaném modelu
odpovídá GitHub organizaci a samostatnému kořeni repozitářů. Více Organizací
může být na jednom zařízení, zařízení je však stále jedna sdílená doména
důvěry, nikoli sada tvrdě oddělených OS tenantů.

**Workspace modul** je aplikace nebo jasně vymezená pracovní oblast uvnitř
Organizace. Vlastní svůj runtime kontrakt a lze jej samostatně vyvíjet,
kontrolovat, nasazovat i vrátit na předchozí verzi.

**Personalspace** je soukromý prostor jednoho Principála. Neslouží ke sdílení
firemních informací ani k obcházení hranic mezi Organizacemi.

## Od zadání ke zveřejněnému výsledku

1. **Vymezte práci:** určete Organizaci, modul a očekávaný výsledek.
2. **Ověřte oprávnění:** pracujte se skutečným přístupem Principála. Textové
   zadání nová práva nevytváří.
3. **Vyberte kontext:** načtěte jen repozitáře a nástroje potřebné pro úkol.
4. **Připravte Návrh a podklady:** práce zůstává vratná a upravitelná, obvykle
   na větvi v Gitu; zároveň přibývají kontroly a důkazy pro review.
5. **Rozhodněte:** oprávněný Principál schválí nebo odmítne přesný výsledek.
6. **Zveřejněte:** až potom lze změnu sloučit, nasadit, odeslat nebo jinak
   uvést v účinnost.
7. **Uzavřete práci:** aktualizujte zdroj pravdy, zapište, co zbývá, a ukliďte
   dočasné pracovní prostředí.

Bez provozního slovníku je to stejné: člověk určí cíl, agent připraví změnu a
než se něco projeví, musí přesnou akci dovolit jak cílový systém, tak člověk,
který za ni nese odpovědnost.

## Zdroje pravdy místo jedné obří databáze

Lazurio nevyžaduje kopírovat všechny informace do jediného úložiště pro AI.
Kód zůstává v repozitářích, plány v Mission Control dané Organizace, trvalé
znalosti v její Knowledgebase a data poskytovatelů za konkrétními integracemi.
Pracovní prostředí pro konkrétní úkol propojí potřebné části a zachová jejich
přirozené vlastníky.

Tento rozdíl je důležitý v provozu. Odebrání přístupu k repozitáři nebo
odvolání integrace změní, k čemu Principál a jeho Agent dosáhnou; úprava názvu
role v dokumentaci nikoli.

## Co běží dnes

Dnes podporované nasazení je veřejná zdrojová pracovní kopie s Gitem a Bunem.
Obsahuje Launchpad, CLI/Core v0, Doctor, provozní manuály a kontrakty pro
připojené Organizace a moduly. CLI v0 je experimentální; balíčkované CLI a
automaticky generovaný root bez Gitu jsou cíle do budoucna.

Vybraný klient agenta a poskytovatel modelu zpracovávají požadavky podle
vlastních podmínek. Dashboard, hostované týmové workspaces a služby
Resident/Buddy jsou volitelné, ne skrytá součást každé instalace. Co má
konkrétní nasazení doložit, shrnuje [Deset minut pro IT](/cs/it-administrators/).
