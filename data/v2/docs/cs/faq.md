---
title: Časté otázky
description: Přímé odpovědi na první otázky lidí a IT administrátorů o Lazuriu.
stableId: lazurio-doc-faq
locale: cs
summary: Odpovědi o tom, co Lazurio je, zda nahrazuje Copilot, jak fungují data, lokální nasazení, schvalování, audit a budoucí MCP server.
updatedAt: "2026-08-31"
reviewedAt: "2026-08-31"
reviewOwner: Matej Suchanek
secondReviewOwner: Pablo AI
trustCritical: true
sourceRefs:
  - lazurio-readme
  - lazurio-license
  - lazurio-architecture
  - lazurio-collaboration-model
  - lazurio-external-apps
  - lazurio-secret-custody
  - microsoft-copilot-architecture
audience:
  - it-admin
  - decision-maker
  - builder
  - agent
---

## Je Lazurio vlastní AI model?

Ne. Lazurio je pracovní prostředí a provozní model pro lidi, agenty,
repozitáře, moduly a schválené nástroje. Každá instalace používá konkrétního
klienta agenta a poskytovatele modelu; jejich obchodní, bezpečnostní a datové
podmínky je potřeba posoudit samostatně.

## Je Lazurio hotový balíčkovaný produkt?

Ne. Lazurio je ve vývoji. Dnes podporované nasazení je veřejná zdrojová
pracovní kopie s Gitem a Bunem a CLI v0 je experimentální. Balíčkovaná
instalace je cíl do budoucna. Lazurio je momentálně dostupné pod licencí
[FSL-1.1-Apache-2.0](https://github.com/HumanAndMachines/Lazurio/blob/3c5bda5d54c5556a0e54f3c339d988aa911fda60/LICENSE.md);
podrobnosti o licenci a zralosti produktu najdete v části [Bezpečnost a
podklady k ověření](/cs/public-evidence/#podoba-produktu-a-jeho-zralost).

## Nahrazuje Lazurio Microsoft Copilot?

Ne ve všech situacích. Microsoft Copilot je určený především pro práci v
prostředí Microsoft 365. Lazurio se soustředí na řízenou a dohledatelnou práci
napříč repozitáři a dalšími nástroji. Organizace může používat jedno řešení,
nebo obě s jasně oddělenými rolemi. Podrobnosti najdete ve [srovnání Lazuria a
Microsoft Copilotu](/cs/lazurio-vs-microsoft-copilot/).

## Dostane se agent ke všemu, kam se dostane uživatel?

Nepředpokládejte ani jednu krajnost. Prompt nevytváří nové oprávnění, ale
pravidlo v textu samo neodebere přístup, který už vidí proces klienta. Skutečný
dosah závisí na oprávněních operačního systému, sandboxu klienta, vybraném
pracovním prostoru, právech k repozitářům a přihlašovacích údajích u
poskytovatelů. Otestujte povolené i zamítnuté cesty.

## Jsou všechna data Lazuria uložená lokálně?

Ne vždy. Kořen Lazuria a pracovní kopie repozitářů jsou v popsaném modelu
lokální. Git repozitáře, požadavky odesílané poskytovateli modelu, externí
aplikace a nasazené Moduly však mohou využívat infrastrukturu dalších
poskytovatelů. Mapa datových toků proto musí být součástí schválení konkrétního
nasazení.

## Kde Lazurio ukládá tajné a přihlašovací údaje?

Skutečné tajné údaje se nemají ukládat do Gitu. Patří do vyhrazených lokálních
úložišť mimo verzované soubory nebo do schváleného úložiště poskytovatele.
Repozitář obsahuje pouze schémata, požadované názvy proměnných a pokyny. Více
uvádí veřejný [standard správy tajných údajů](https://github.com/HumanAndMachines/Lazurio/blob/3c5bda5d54c5556a0e54f3c339d988aa911fda60/manual/security/local-secret-custody.md).

## Co brání agentovi zveřejnit škodlivou změnu?

Lazurio odděluje editovatelný návrh od jeho zveřejnění nebo nasazení. U změn v
Gitu rozhodují oprávnění k repozitáři, pravidla větví, povinné kontroly a
schválení. Ostatní služby musí mít odpovídající oprávnění a schvalovací
mechanismy na straně poskytovatele. Tato opatření snižují riziko, ale
nezaručují, že člověk nikdy neschválí škodlivý výsledek.

## Splňuje Lazurio konkrétní normu nebo certifikaci?

Tato dokumentace žádnou konkrétní certifikaci ani obecnou shodu s regulatorním
rámcem netvrdí. Organizace musí posoudit skutečnou podobu svého nasazení,
použité dodavatele, zavedená opatření a vlastní právní povinnosti.

## Existuje auditní stopa?

Pro změny v Gitu ano: lze je spojit s commity, pull requesty, schváleními a
záznamy o nasazení. Akce provedené u poskytovatelů nebo na koncových zařízeních
vyžadují vlastní auditní záznamy. Organizace by proto měla určit, který systém
zaznamenává každou důležitou akci a jak dlouho se záznam uchovává.

## Jsou Organizace na jednom zařízení od sebe izolované?

Jsou to samostatné hranice repozitářů a GitHubu, nikoli tvrdě oddělené OS
tenancy. Jedno zařízení je jedna doména důvěry. Pokud kompromitovaný proces
nesmí přejít z jedné firmy do druhé, použijte oddělená zařízení nebo
rovnocennou infrastrukturu.

## Má dokumentace vlastní MCP server?

Zatím ne. AI agenti mohou už dnes použít [llms.txt](/llms.txt) a strukturovaný
[content-index.json](/content-index.json). Plánovaný MCP server bude pouze
zpřístupňovat stejný veřejný obsah pro čtení; nemá se stát druhým zdrojem
dokumentace.

## Kde má IT s posouzením začít?

Začněte [přehledem pro správce IT](/cs/it-administrators/). Potom porovnejte
stránky [Přístup k datům a bezpečnost](/cs/data-access-security/) a [Nasazení a
provoz](/cs/deployment-operations/) s navrhovanou konfigurací vaší organizace.
