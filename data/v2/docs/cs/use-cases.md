---
title: "Kdy dává Lazurio smysl"
description: "Příklady práce s agentem, od přípravy porady po změnu aplikace. Podle čeho vybrat první úkol pro váš tým."
stableId: lazurio-doc-use-cases
locale: cs
summary: "Příklady práce s agentem, od přípravy porady po změnu aplikace. Podle čeho vybrat první úkol pro váš tým."
updatedAt: "2026-11-23"
reviewedAt: "2026-09-15"
reviewOwner: Matej Suchanek
sourceRefs:
  - lazurio-user-roles-current
  - lazurio-readme
  - lazurio-architecture
  - lazurio-collaboration-model
  - lazurio-external-apps-0162
audience:
  - it-admin
  - decision-maker
  - builder
  - agent
---

Každý týden sestavujete program týmové porady. Z poznámek potřebujete vybrat, co zjistit předem a o čem má tým rozhodnout společně. V Lazuriu můžete s agentem připravit program, upravit ho a po schválení uložit postup do společné Knowledgebase. Příště z něj může vyjít i kolega, který u původního rozhovoru nebyl.

[Vyzkoušejte si přípravu porady na ukázkových poznámkách](/cs/guide/first-steps/).

## Kde může Lazurio pomoci

### Vývoj produktů a softwaru

Tým potřebuje upravit formulář v aplikaci. Popište, které pole lidem chybí a na jakém příkladu poznáte, že funguje správně. Agent s přístupem k modulu může změnu připravit, spustit testy a předložit návrh ke kontrole v pull requestu. Před přijetím změny si v něm tým prohlédne úpravy i výsledky testů. Git uchová historii změn.

### Provozní postupy napříč nástroji

Máte návrh v repozitáři a připomínky ve složce na SharePointu. Zadání může znít: „Porovnej návrh s připomínkami v této složce. Vypiš, co ještě potřebujeme rozhodnout, a ke každému bodu přidej odkaz na zdroj. Dokumenty zatím neupravuj.“

Nejdřív ověřte, ke které složce a pod jakým účtem má agent přístup. Každá připojená aplikace má jednu cestu přes nástroj, Executor nebo Composio, pokud ho Organizace povolí. Přihlášení nástroje a Executoru zůstávají v Prostředí a lze je jednotlivě odvolat. U Composia patří připojení účtu Composia, který můžete používat na více zařízeních. Composio uchovává tokeny i obsah volání. [Jak ověřit a odvolat přístup aplikace](/cs/environment-app-connections/).

### Trvalé organizační znalosti

Kolega se ptá, jak má připravit příští poradu. Pošlete mu odkaz na schválený postup v Knowledgebase. Pokud pravidla zatím existují jen ve vašem chatu, požádejte agenta, ať z nich připraví návrh a zkontroluje, zda už podobný postup máte. Před zveřejněním ověřte, že pravidla odpovídají tomu, jak tým pracuje.

### Opakované agentní role

Když agent pravidelně připravuje třeba přehled otevřených úkolů, zapište do postupu, odkud má úkoly číst, jak pozná uzavřený úkol a kdo přehled před sdílením kontroluje. Při příštím zadání odkažte na schválený postup. Výsledek můžete zkontrolovat podle stejných pravidel.

### Více firem na zařízení jednoho uživatele

Lazurio může na jednom zařízení zpřístupnit několik povolených Organizací a
každou zachovat jako samostatnou hranici v GitHubu i v lokálních repozitářích.
To je užitečné pro zakladatele, konzultanty a provozní role, které pracují pro
více firem a nesmějí míchat jejich neveřejná data. Nejde ale o tvrdé OS
oddělení; kde je potřeba silnější izolace, použijte jinou hranici zařízení.

## Kde jsou nutná další opatření

Práce s regulovanými daty, produkční infrastrukturou, finančními operacemi,
hromadnou komunikací, přihlašovacími údaji nebo nevratnými zásahy vyžaduje
opatření odpovídající konkrétnímu riziku. Lazurio nenahrazuje právní
povinnosti, certifikaci, oddělení rolí ani bezpečnostní posouzení dodavatele.

## Kdy Lazurio nemusí být nejlepší první volbou

- Potřebujete pouze osobního asistenta v jedné kancelářské sadě a neřešíte
  verzované změny ani práci napříč nástroji.
- Organizace nechce spravovat přístupy k repozitářům, zabezpečení zařízení a
  pravidla pro kontrolu změn.
- Úkol nelze rozumně vymezit, otestovat ani vrátit zpět a není jasné, kdo smí
  rozhodnout o výsledku.
- Celý pracovní postup už spolehlivě pokrývá zavedený produkt s jednodušší
  správou.

Pro osobní produktivitu soustředěnou v Microsoftu si přečtěte srovnání
[Lazurio vs Microsoft Copilot](/cs/lazurio-vs-microsoft-copilot/). Rozumným
výsledkem může být Copilot, Lazurio nebo obě řešení s oddělenými
odpovědnostmi.
