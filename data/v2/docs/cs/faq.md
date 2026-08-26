---
title: Časté otázky
description: Stručné odpovědi na otázky o fungování, datech, bezpečnosti, provozu a auditu Lazuria.
stableId: lazurio-doc-faq
locale: cs
summary: Co Lazurio je, jak se liší od Copilotu, k jakým datům může přistupovat, kde běží a jak se schvalují a auditují výsledky.
updatedAt: "2026-08-26"
reviewedAt: "2026-08-26"
reviewOwner: Matej Suchanek
secondReviewOwner: Pablo AI
trustCritical: true
sourceRefs:
  - lazurio-readme
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

Ne. Lazurio je pracovní prostředí a provozní model, který propojuje lidi, AI
agenty, repozitáře, Moduly a připojené nástroje. Konkrétní instalace používá
zvoleného klienta a poskytovatele AI modelu. Jejich obchodní, bezpečnostní a
datové podmínky je potřeba posoudit samostatně.

## Nahrazuje Lazurio Microsoft Copilot?

Ne ve všech situacích. Microsoft Copilot je určený především pro práci v
prostředí Microsoft 365. Lazurio se soustředí na řízenou a dohledatelnou práci
napříč repozitáři a dalšími nástroji. Organizace může používat jedno řešení,
nebo obě s jasně oddělenými rolemi. Podrobnosti najdete ve [srovnání Lazuria a
Microsoft Copilotu](/cs/lazurio-vs-microsoft-copilot/).

## Může agent přistupovat ke všemu, k čemu má přístup uživatel?

Ne nutně. Skutečný přístup závisí na konkrétní relaci, použitém nástroji,
zpřístupněném pracovním prostoru a přihlašovacích údajích dané služby. Task
Agent nezískává žádná další práva samotným zadáním a má dostat jen podklady
potřebné pro úkol. Při nasazení je nutné ověřit skutečně přidělená oprávnění i
to, že zakázané přístupy systém opravdu odmítne.

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
uvádí veřejný [standard správy tajných údajů](https://github.com/HumanAndMachines/Lazurio/blob/69c53ec342124aef48cb9d04fd109f9886ec242e/manual/security/local-secret-custody.md).

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

## Má dokumentace vlastní MCP server?

Zatím ne. AI agenti mohou už dnes použít [llms.txt](/llms.txt) a strukturovaný
[content-index.json](/content-index.json). Plánovaný MCP server bude pouze
zpřístupňovat stejný veřejný obsah pro čtení; nemá se stát druhým zdrojem
dokumentace.

## Kde začít s posouzením za IT?

Začněte [přehledem pro správce IT](/cs/it-administrators/). Potom porovnejte
stránky [Přístup k datům a bezpečnost](/cs/data-access-security/) a [Nasazení a
provoz](/cs/deployment-operations/) s navrhovanou konfigurací vaší organizace.
