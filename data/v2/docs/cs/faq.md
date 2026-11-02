---
title: "Časté otázky"
description: "Odpovědi k produktu, přístupům, datům a schvalování výsledků."
stableId: lazurio-doc-faq
locale: cs
summary: "Odpovědi k produktu, přístupům, datům a schvalování výsledků."
updatedAt: "2026-10-28"
reviewedAt: "2026-10-28"
reviewOwner: Anna Blazickova
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
  - lazurio-platform-release-current
  - lazurio-platform-vault-current
audience:
  - it-admin
  - decision-maker
  - builder
  - agent
---

## Je Lazurio vlastní AI model?

Ne. Lazurio poskytuje prostředí pro práci s firemními podklady a aplikacemi.
Samotnou AI zajišťuje zvolený nástroj a poskytovatel modelu. Jejich ceny,
zabezpečení a podmínky zpracování dat posuzujte samostatně.

## Je Lazurio hotový balíčkovaný produkt?

Ano. Současný Platform se distribuuje jako instalovatelná vydání. Verze
v0.1.14 vyšla 27. října 2026 a obsahuje CLI, Apps i generované instrukce pro
agenty. Vydaný balíček sám nepřislibuje jednotné SLA ani certifikované nasazení.
Platform používá [Elastic License 2.0](https://github.com/Lazurio/LazurioPlatform/blob/v0.1.14/LICENSE);
starší kód, cizí součásti a volitelné služby mají samostatné podmínky.
Podrobnosti uvádí [přehled licence a produktu](/cs/public-evidence/#podoba-produktu-a-jeho-zralost).

## Nahrazuje Lazurio Microsoft Copilot?

Ne ve všech situacích. Microsoft Copilot je určený především pro práci v
prostředí Microsoft 365. Lazurio se soustředí na řízenou a dohledatelnou práci
napříč repozitáři a dalšími nástroji. Organizace může používat jedno řešení,
nebo obě s jasně oddělenými rolemi. Podrobnosti najdete ve [srovnání Lazuria a
Microsoft Copilotu](/cs/lazurio-vs-microsoft-copilot/).

## Dostane se agent ke všemu, kam se dostane uživatel?

Záleží na nastavení. Agent může použít soubory, účty a nástroje dostupné
jeho běžícímu procesu. Rozhodují oprávnění operačního systému, sandbox AI
nástroje, pracovní prostor a přístupy ke službám. Prompt nová práva neudělí
a sám ani neodebere ta existující. Otestujte, co agent smí i co má být zamítnuto.

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
uvádí veřejný [standard správy tajných údajů](https://github.com/HumanAndMachines/Lazurio/blob/b41fc7d01f748ebc4724535ce811ffceded38fdb/manual/security/local-secret-custody.md).

V podporovaném nastaveném Prostředí použijte Apps → Trezor a stránku žádosti o tajný údaj. Hodnoty nepatří do chatu. Podrobnosti uvádí [přístup k datům a trezor](/cs/data-access-security/#použijte-trezor-prostředí).

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
záznamy o nasazení. Akce u poskytovatelů a na zařízeních vyžadují vlastní logy. Lazurio
automaticky nezaznamenává přečtení lokálních souborů ani požadavky na model. Organizace by proto měla určit, který systém
zaznamenává každou důležitou akci a jak dlouho se záznam uchovává.

## Jsou Organizace na jednom zařízení od sebe izolované?

Jsou to samostatné hranice repozitářů a GitHubu, nikoli oddělená prostředí operačního systému. Jedno zařízení je jedna doména důvěry. Pokud kompromitovaný proces
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
