---
title: "Lazurio a Microsoft Copilot"
description: "Jak vybrat AI pro tým podle modelů, aplikací a práce, kterou chcete předat kolegům."
stableId: lazurio-doc-copilot-comparison
locale: cs
summary: "Jak vybrat AI pro tým podle modelů, aplikací a práce, kterou chcete předat kolegům."
updatedAt: "2026-11-24"
reviewedAt: "2026-11-05"
reviewOwner: Matej Suchanek
secondReviewOwner: Pablo AI
trustCritical: true
sourceRefs:
  - lazurio-decision-register-admin-ai
  - lazurio-platform-launchpad-texts-pairing
  - lazurio-user-roles-current
  - lazurio-readme
  - lazurio-architecture
  - lazurio-collaboration-model
  - lazurio-external-apps
  - lazurio-external-apps-0162
  - microsoft-copilot-architecture
  - microsoft-copilot-data-protection
  - microsoft-copilot-privacy
  - microsoft-copilot-requirements
  - microsoft-copilot-extensibility
audience:
  - it-admin
  - decision-maker
  - agent
---

Potřebujete z e-mailového vlákna v Outlooku připravit odpověď? Microsoft Copilot vám ji může navrhnout přímo tam, kde ji budete upravovat. Pokud ale tým každý týden skládá podklady z pošty, sdílené složky a vlastní aplikace, stojí za vyzkoušení Lazurio. Sami určíte, které služby agent smí použít, podle jakého postupu má pracovat a komu má předat návrh.

Srovnáváme Lazurio s pracovním Copilotem pro Microsoft 365. Následující doporučení vycházejí z toho, jakou práci má váš tým před sebou.

## Jakou AI může tým používat?

V Lazuriu můžete zvolit nástroj i poskytovatele podle úkolu. Například můžete v Prostředí používat Codex s účtem ChatGPT nebo připojit Claude a pracovat s Claude Code. Které **modely** můžete skutečně vybrat, záleží na nástroji, účtu a nastavení Organizace. Společný postup pro přípravu nabídky si přitom můžete ponechat v Knowledgebase. I když příště zvolíte jiný nástroj, může z postupu vycházet, pokud k němu má přístup. [Jak zjistit, odkud vaše Prostředí bere AI](/cs/guide/ai-source/).

Také Microsoft nabízí více modelů, včetně modelů Anthropic ve vybraných funkcích. Nabídku určuje Microsoft a záleží na licenci i na tom, co správce povolil. Při výběru si proto ověřte konkrétní kombinaci: který model chcete používat, v jaké aplikaci a pod jakým účtem. [Přehled Microsoft Copilotu a licencí](https://learn.microsoft.com/en-us/copilot/plan/copilot-overview).

## Když podklady leží v několika aplikacích

Před poradou máte otázky od kolegů v e-mailu, návrh ve sdílené složce a pravidla týmu v Knowledgebase. V Chatu v Lazuriu můžete zadat: „Porovnej otázky s návrhem. Podle našeho postupu připrav program porady. U každého otevřeného bodu přidej odkaz na podklad. Zatím nic neposílej.“ Určíte, kterou složku a které zprávy smí agent číst. Potřebuje k nim také skutečný přístup přes povolené účty a nástroje.

Do takového úkolu můžete zapojit služby Microsoftu, služby jiných poskytovatelů i vlastní aplikaci týmu. Opakovaný úkol pak můžete předat kolegovi spolu s postupem a příkladem výsledku. [Jak se připojují aplikace](/cs/environment-app-connections/) · [Vyzkoušejte přípravu porady](/cs/guide/first-steps/).

Pokud máte celou poradu v Teams a podklady ve Wordu nebo Outlooku, Copilot může ušetřit přenášení podkladů mezi aplikacemi. Rozsah práce s obsahem Organizace závisí na licenci a oprávněních uživatele. I Copilot umí pracovat s externími zdroji přes nakonfigurované konektory a agenty. Při porovnání vyzkoušejte právě ty služby a úkony, které váš tým potřebuje. [Rozšíření Copilotu](https://learn.microsoft.com/en-us/plugins/overview).

## Kdo vlastně pracuje v GitHubu?

Program porady zadáte agentovi v Chatu a tam si také přečtete návrh. GitHub přichází na řadu například ve chvíli, kdy chcete změnit **společný postup** uložený v repozitáři Organizace. Agent s právem zápisu připraví návrh změny a pošle vám odkaz. Člověk, který má změnu schválit, si může přečíst rozdíl proti dosavadnímu postupu. Po přijetí změny tým dohledá, co se změnilo a kdy.

Člověk, který si příště podle postupu připraví poradu, může začít zase v Chatu. Kvůli tomuto způsobu práce nemusí tým přesouvat e-mail ani účetnictví do GitHubu. [Od zadání ke schválení výsledku](/cs/how-lazurio-works/).

## Co prověřit s IT

U **Microsoft Copilotu** ověřte licenci a oprávnění k dokumentům v Microsoft 365. Microsoft uvádí, že prompty, odpovědi a data získaná přes Microsoft Graph nepoužívá k trénování základních modelů. Historii interakcí spravuje podle pravidel služby. Pro další modely a připojené agenty mohou platit zvláštní podmínky. [Soukromí a zabezpečení](https://learn.microsoft.com/en-us/copilot/plan/microsoft-365-copilot-privacy) · [Požadavky Microsoftu](https://learn.microsoft.com/en-us/copilot/plan/microsoft-copilot-requirements).

U **Lazuria** zkontrolujte celý konkrétní postup. Které podklady smí agent číst? Který poskytovatel modelu je zpracuje? Kdo smí výsledek zveřejnit a kdo může přístup odebrat? Výběrem modelu a propojených služeb určujete také to, ke komu data putují. Přístup ke sdílenému postupu sám o sobě nedává přístup k poště. [Přístup k datům a bezpečnost](/cs/data-access-security/).

## Jak se rozhodnout na vlastní práci

Vyberte jeden úkol, který jste minulý týden skutečně řešili. Pro odpověď v Outlooku nebo úpravu dokumentu ve Wordu vyzkoušejte nejdřív Copilot přímo v aplikaci. Pokud potřebujete vybrat model pro danou práci, propojit různé služby nebo předat opakovaný postup dalšímu člověku, vyzkoušejte stejný úkol v Lazuriu.

Při zkoušce sledujte, které podklady musíte přenést ručně, jestli dohledáte zdroj odpovědi a zda kolega postup příště zvládne zopakovat. Oba nástroje můžete využít i vedle sebe: třeba upravit text nabídky ve Wordu s Copilotem a v Lazuriu připravit podklady podle týmového postupu.
