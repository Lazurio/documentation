---
title: Časté otázky
description: Přímé odpovědi na první otázky lidí a správců IT o Lazuriu.
stableId: lazurio-doc-faq
locale: cs
summary: Odpovědi na to, co je Lazurio, zda nahrazuje Copilot, k jakým datům přistupuje, kde běží, jak funguje schvalování, audit a budoucí MCP server.
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

## Je Lazurio AI model?

Ne. Lazurio je pracovní prostředí a provozní model okolo lidí, Agentů,
repozitářů, Modulů a připojených nástrojů. Konkrétní instalace používá zvolený
execution klient a poskytovatele modelu, jejichž podmínky je nutné posoudit
samostatně.

## Nahrazuje Lazurio Microsoft Copilot?

Ne obecně. Microsoft Copilot přirozeně pomáhá s prací založenou na Microsoft
365. Lazurio se soustředí na řízenou, source-controlled práci napříč
repozitáři a nástroji. Mnoho organizací může používat obojí. Přečtěte si
[podrobné srovnání](/cs/lazurio-vs-microsoft-copilot/).

## Může Agent přistupovat ke všemu, k čemu uživatel?

Nepředpokládejte to. Skutečný přístup závisí na relaci, nástroji, lokálním
workspace a přihlašovacím údaji poskytovatele. Návrhový princip říká, že Task
Agent nezískává práva z promptu a má dostat jen kontext potřebný pro úkol.
Konkrétní nasazení musí ověřit skutečné granty i zamítnuté cesty.

## Jsou všechna data Lazuria uložená lokálně?

Takové univerzální tvrzení nedáváme. Dokumentovaný root a pracovní checkouty
jsou lokální, zatímco Git repozitáře, požadavky na model, externí aplikace a
nasazené Moduly mohou používat infrastrukturu poskytovatelů. Konkrétní mapa
datových toků patří do akceptačního balíčku nasazení.

## Jak Lazurio zachází se secrets?

Skutečné secrets zůstávají mimo Git v ohraničených ignorovaných custody
cestách nebo ve schváleném úložišti poskytovatele. Verzované soubory obsahují
jen schémata, požadované názvy proměnných a instrukce. Přečtěte si veřejný
[standard správy secrets](https://github.com/HumanAndMachines/Lazurio/blob/69c53ec342124aef48cb9d04fd109f9886ec242e/manual/security/local-secret-custody.md).

## Co brání Agentovi publikovat škodlivou změnu?

Provozní model rozlišuje editovatelný Draft a Publikaci. Oprávnění k
repozitáři, pravidla větví, required checks a review vynucují Git Publikaci;
ostatní systémy potřebují odpovídající oprávnění na straně poskytovatele a
výslovnou autorizaci. Tyto kontroly snižují riziko, ale nezaručují
neomylnost lidského schválení.

## Má Lazurio certifikaci pro konkrétní compliance framework?

Tato dokumentace netvrdí žádnou certifikaci ani univerzální shodu. Organizace
musí posoudit své skutečné nasazení, poskytovatele, kontroly a právní
povinnosti.

## Existuje auditní stopa?

Změny v Gitu lze spojit s commity, pull requesty, review a deploymenty. Akce u
poskytovatelů a na endpointech vyžadují vlastní logy. Vyžádejte si auditní
mapu, která určuje, který systém zaznamenává každou relevantní akci a jak
dlouho ji uchovává.

## Má dokumentace vlastní MCP server?

Zatím ne. Agenti mohou už dnes použít [`llms.txt`](/llms.txt) a strukturovaný
[`content-index.json`](/content-index.json). Budoucí MCP server je plánovaný
jako read-only pohled nad stejným veřejným obsahem, ne jako druhý zdroj.

## Kde mám začít s IT posouzením?

Začněte [desetiminutovým přehledem pro IT](/cs/it-administrators/), potom
porovnejte [přístup k datům a bezpečnost](/cs/data-access-security/) a
[nasazení a provoz](/cs/deployment-operations/) s navrženou konfigurací.
