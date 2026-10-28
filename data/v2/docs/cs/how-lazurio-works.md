---
title: "Jak Lazurio funguje"
description: "Kdo zadává práci, jak agent připraví návrh a kdo schvaluje zveřejnění."
stableId: lazurio-doc-how-it-works
locale: cs
summary: "Kdo zadává práci, jak agent připraví návrh a kdo schvaluje zveřejnění."
updatedAt: "2026-10-28"
reviewedAt: "2026-10-28"
reviewOwner: Anna Blazickova
sourceRefs:
  - lazurio-readme
  - lazurio-architecture
  - lazurio-collaboration-model
  - lazurio-platform-release-current
  - lazurio-platform-content-sync
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

Aktuální názvy Prostředí, Buddyho a Apps najdete ve [slovníčku](/cs/guide/glossary/). Starší technické zdroje používají také označení Principál a Personalspace.

## Základní pojmy

**Uživatel** je člověk, pro kterého se práce dělá. Jeho skutečná oprávnění a zadání určují, co agent smí. Starší zdroje pro tuto identitu používají pojem Principál.

**Task Agent** je právě běžící pracovní relace s AI nástrojem. Pracuje pro
uživatele a nemá vlastní oprávnění. Umí navrhnout a připravit práci; prompt z
něj administrátora neudělá.

**Organizace** je hranice repozitářů a přístupů jedné firmy. V popsaném modelu
odpovídá GitHub organizaci a samostatnému kořeni repozitářů. Více Organizací
může být na jednom zařízení, zařízení je však stále jedna sdílená doména
důvěry, nikoli sada oddělených operačních prostředí.

**Workspace modul** je aplikace nebo jasně vymezená pracovní oblast uvnitř
Organizace. Má vlastní pravidla pro spuštění, testy a nasazení. Lze jej
samostatně upravovat a vrátit na předchozí verzi.

**Osobní Workspace** je soukromý obsah jednoho uživatele v Osobním Prostředí. Starší technické zdroje mu říkají Personalspace. Neslouží ke sdílení
firemních informací ani k obcházení hranic mezi Organizacemi.

## Od zadání ke zveřejněnému výsledku

1. **Vymezte práci:** určete Organizaci, modul a očekávaný výsledek.
2. **Ověřte oprávnění:** pracujte se skutečným přístupem uživatele. Textové
   zadání nová práva nevytváří.
3. **Vyberte kontext:** načtěte jen repozitáře a nástroje potřebné pro úkol.
4. **Připravte Návrh a podklady:** práce zůstává vratná a upravitelná, obvykle
   na větvi v Gitu; zároveň přibývají kontroly a důkazy pro review.
5. **Rozhodněte:** oprávněný uživatel schválí nebo odmítne přesný výsledek.
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

Agent si načte podklady pro daný úkol; nemusíte je kopírovat do jedné AI databáze. Přístupy měňte v systému, který je spravuje: odeberte oprávnění
k repozitáři nebo odvolejte připojený účet. Přejmenování role v dokumentu
samo nic neomezí.

## Co běží dnes

Platform v0.1.14 obsahuje CLI, Apps, diagnostiku a součást, která připravuje
instrukce pro agenty v pracovní složce Lazuria. Uživatel instaluje vydání
produktu. Repozitáře Organizací a moduly zůstávají samostatným verzovaným
obsahem. `lazurio update` synchronizuje čisté pracovní kopie, sestaví změněné
moduly a aktualizuje produkt; každá část hlásí vlastní výsledek.

Požadavky na model se řídí podmínkami zvoleného klienta AI a poskytovatele.
Lazurio účet, Přehled Organizace, hosting a Buddy mají vlastní podmínky
provozu a dostupnosti. Nejsou skrytými závislostmi každé vlastní instalace.
Podrobnosti najdete v [nasazení a provozu](/cs/deployment-operations/).
