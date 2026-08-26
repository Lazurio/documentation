---
title: Přístup k datům a bezpečnost
description: Vysvětlení hranic důvěry v Lazuriu a kontrol potřebných pro skutečné nasazení s ohledem na hrozby.
stableId: lazurio-doc-data-access-security
locale: cs
summary: Prověřte identitu, oddělení Organizací, lokální soubory, integrace, secrets, poskytovatele modelu, auditní důkazy a zbytková rizika.
updatedAt: "2026-08-26"
reviewedAt: "2026-08-26"
reviewOwner: Matej Suchanek
secondReviewOwner: Pablo AI
trustCritical: true
sourceRefs:
  - lazurio-architecture
  - lazurio-collaboration-model
  - lazurio-external-apps
  - lazurio-secret-custody
audience:
  - it-admin
  - decision-maker
  - agent
---

Bezpečnostní model Lazuria začíná záměrně omezeným tvrzením: samotným zněním
promptu nelze zajistit bezpečnost Agenta. Bezpečnost vytváří identita, zařízení,
oprávnění k repozitářům, ohraničené nástroje, správa secrets a publikační
kontroly okolo relace. Veřejný [model spolupráce](https://github.com/HumanAndMachines/Lazurio/blob/69c53ec342124aef48cb9d04fd109f9886ec242e/AGENTS.md)
popisuje zamýšlenou hranici; konkrétní nasazení je stále nutné ověřit.

## Hranice důvěry

### Principál a Task Agent

Task Agent pracuje pro přihlášeného Principála. Nesmí získat práva jen proto,
že o ně žádá prompt. Skutečný přístup vychází z relací na zařízení Principála,
oprávnění k repozitářům a přihlašovacích údajů poskytovatelů. Offboarding a
revize přístupů proto musí zahrnout i tyto podkladové systémy.

### Organizace

Organizace je hranice dat a přístupů na úrovni jedné firmy. Jednotlivé
Organizace zůstávají oddělenými repozitáři a GitHub organizacemi. Přenášet lze
veřejné obecné vzory; secrets, klientská data, obchodní strategii a privátní
overlaye nikoli.

### Personalspace

Personalspace je privátní prostor jednoho Principála a není sdíleným firemním
úložištěm. Jeho soukromí má přednost před pohodlím. Firemní znalosti potřebné
pro Kolegy patří do autorizovaného úložiště Organizace, ne do cizího soukromého
kontextu.

### Externí aplikace

[Standard integrací](https://github.com/HumanAndMachines/Lazurio/blob/69c53ec342124aef48cb9d04fd109f9886ec242e/manual/external-app-integrations.md)
upřednostňuje lokálně kurátorovaný oficiální MCP server, potom oficiální CLI a
poté zrevidovanou a připnutou open-source implementaci. Ovládání browseru je
fallback. Každá mašina používá samostatně odvolatelné přihlášení a katalog
nasazení má obsahovat názvy a požadované scope — nikdy hodnoty secrets.

### Secrets

[Standard správy secrets](https://github.com/HumanAndMachines/Lazurio/blob/69c53ec342124aef48cb9d04fd109f9886ec242e/manual/security/local-secret-custody.md)
udržuje skutečné přihlašovací údaje mimo Git. Lokální ignorované cesty jsou
ohraničené vlastníkem nebo Organizací a verzovaný source obsahuje jen schémata,
názvy proměnných a instrukce. Skutečné lokální úložiště musí chránit pravidla
pro endpointy a zálohy dané organizace.

## Hrozby, které je potřeba otestovat

| Hrozba | Zamýšlená kontrola | Akceptační test |
| --- | --- | --- |
| Prompt žádá data jiné firmy | Oddělení Organizací a ohraničený kontext | Pokuste se o přístup bez oprávnění a potvrďte zamítnutí i použitelnou auditní stopu. |
| Agent se pokouší o chráněnou Publikaci | Oprávnění GitHubu nebo poskytovatele a výslovný souhlas Principála | Pokuste se o merge či deploy bez potřebného oprávnění nebo review. |
| Přihlašovací údaj se dostane do source | Ignorované custody cesty, public-safety scan a review | Vložte bezpečný canary odpovídající formátu tokenu a potvrďte selhání pipeline. |
| Integrace má příliš široký přístup | Scope u poskytovatele a samostatné odvolání | Načtěte živé OAuth/app granty a jeden odvolejte bez ovlivnění ostatních přístupů. |
| Lokální zařízení se ztratí | Ochrana zařízení, šifrování, odvolání přístupů a recovery postup | Proveďte cvičení organizace pro offboarding nebo ztracené zařízení. |
| Generované vysvětlení se rozejde s chováním | Přesné odkazy na veřejný source, data revize a CI validace | Změňte nebo nechte expirovat zdroj důkazu a potvrďte selhání buildu dokumentace. |

## Hranice poskytovatele modelu

Lazurio lze používat přes různé execution klienty a poskytovatele modelů. Tato
dokumentace nedává jedno univerzální tvrzení o uchovávání dat ani trénování pro
všechny z nich. Provozovatel musí uvést zvoleného poskytovatele, úroveň účtu,
případně region, zapnutou telemetrii, podmínky retence a případnou dohodu o
nulové retenci dat. Tyto podmínky jsou součástí konkrétního nasazení, nikoli
automaticky zděděnou vlastností Lazuria.

## Očekávání od auditu

Git historie, pull requesty, schválení přesného HEADu a záznamy o deployi
poskytují silné důkazy pro změny source. Automaticky ale nepokrývají každý
požadavek na model, čtení lokálního souboru ani volání API třetí strany.
Vytvořte auditní mapu, která pro každý zapnutý povrch určí, který systém
zaznamenává identitu, akci, cíl, výsledek a dobu uchování.

## Zbytkové riziko

Autorizovaná identita může stále zveřejnit informace, schválit škodlivou změnu
nebo dát nástroji příliš široký přístup. Procesní hranice může být použita
chybně. Model může vygenerovat nesprávný obsah a lokální endpoint může být
napaden. Přínosem Lazuria je zúžit tato rozhodnutí a usnadnit jejich kontrolu;
nenahrazuje princip nejmenších oprávnění, zabezpečení endpointů, posouzení
poskytovatelů, testování ani lidskou odpovědnost.
