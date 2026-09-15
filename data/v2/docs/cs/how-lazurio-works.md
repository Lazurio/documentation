---
title: Jak Lazurio funguje
description: Základní provozní model Lazuria — od Principála a Organizace až po Návrh a zveřejnění.
stableId: lazurio-doc-how-it-works
locale: cs
summary: Seznamte se s Principály, agenty, Organizacemi, repozitáři, moduly, Návrhy, review a cestou ke zveřejnění.
updatedAt: "2026-09-15"
reviewedAt: "2026-09-15"
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

V Lazuriu zadáte agentovi úkol, dáte mu potřebné podklady a zkontrolujete
výsledek. Agent může připravit dokument, změnu aplikace nebo jinou práci.
Zveřejnění či nasazení pak schvaluje ten, kdo k tomu má oprávnění.
Agent si tuto pravomoc nemůže udělit sám.

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
důvěry, nikoli sada oddělených operačních prostředí.

**Workspace modul** je aplikace nebo jasně vymezená pracovní oblast uvnitř
Organizace. Má vlastní pravidla pro spuštění, testy a nasazení. Lze jej
samostatně upravovat a vrátit na předchozí verzi.

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

I příprava návrhu může přenášet data. Například odeslání pracovní větve do
GitHubu zpřístupní její obsah lidem s přístupem k repozitáři, přestože změna
ještě není v hlavní větvi. Schvalování výsledku nenahrazuje kontrolu toho,
kam během práce posíláte podklady.

## Zdroje pravdy místo jedné obří databáze

Podklady mají své určené místo:

- kód v repozitářích;
- plány v Mission Control organizace;
- firemní znalosti v její Knowledgebase;
- e-maily a další data v původních službách, dostupných přes schválená propojení.

Agent si pro úkol načte potřebné podklady. Nemusíte vše kopírovat do jedné
AI databáze. Přístupy měňte v systému, který je spravuje: odeberte oprávnění
k repozitáři nebo odvolejte připojený účet. Přejmenování role v dokumentu
samo nic neomezí.

## Co běží dnes

Verze popsaná v odkazovaných zdrojích běží ze zdrojové pracovní kopie s Gitem a Bunem.
Obsahuje Launchpad, CLI/Core v0, Doctor, provozní manuály a kontrakty pro
připojené Organizace a moduly. CLI v0 je experimentální; balíčkované CLI a
automaticky generovaný root bez Gitu jsou cíle do budoucna.

Vybraný klient agenta a poskytovatel modelu zpracovávají požadavky podle
vlastních podmínek. Dashboard, hostované týmové workspaces a služby
Resident/Buddy jsou volitelné, ne skrytá součást každé instalace. Co má
konkrétní nasazení doložit, shrnuje [Deset minut pro IT](/cs/it-administrators/).
