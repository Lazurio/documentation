---
title: "Lekce 4: Kdo s vámi pracuje"
description: "Vy jako uživatel, agenti, Kolegové a jejich role, Henry a Buddy: kdo o čem rozhoduje."
stableId: lazurio-doc-guide-course-who-works-with-you
locale: cs
summary: "Vy jako uživatel, agenti, Kolegové a jejich role, Henry a Buddy: kdo o čem rozhoduje."
updatedAt: "2026-11-01"
reviewedAt: "2026-11-01"
reviewOwner: Anna Blazickova
secondReviewOwner: Pablo AI
trustCritical: true
sourceRefs:
  - lazurio-onboarding-decision-register
  - lazurio-platform-folder-manual
audience:
  - decision-maker
  - builder
  - agent
---

**Co se naučíte:** kdo o čem rozhoduje ve vašem Prostředí a ve vaší
Organizaci.

**Vy jste uživatel.** Agenti ve vašem Prostředí pracují pro vás a jednají ve
vašich právech. Pokyn k Publikaci jejich práce dáváte vy a poslední slovo
máte vy.

**Agent** (Task Agent) je pracovní relace AI nástroje, jako je Codex nebo
Claude Code, třeba jedno vlákno v Chatu. Nemá žádné vlastní pravomoce
a žádný prompt mu je nedá. Uvnitř Prostředí pracuje s plným přístupem, bez
sandboxu a bez schvalování jednotlivých příkazů: hranicí je Prostředí
(rozhodnutí 0172). Co je ve vašem Prostředí přihlášené, mohou jeho agenti
použít. Plný přístup je schopnost, ne souhlas: Publikace zůstává vám.

**Kolega** je uživatel v Organizaci. Co smí, určují jeho role a Teamy.
Organizace zná čtyři role: **Admin** spravuje přístupy Organizace a její
Prostředí, **Steward** kontroluje změny a merguje je tam, kde je větev
chráněná, **Builder** vyvíjí moduly a **User** pracuje s aplikacemi
Organizace. Název role sám nic neopravňuje; rozhodují živá práva na GitHubu
(rozhodnutí 0062).

**Henry** je jméno Pracovního Prostředí Organizace s automatizacemi.
Pracuje v něm tým botů pod personou Organizace a odpovídá za něj jeden
odpovědný uživatel, Owner nebo Admin Organizace (rozhodnutí 0169). Kde vaše
Organizace Henryho provozuje, potkáte ho hlavně na GitHubu, třeba v review
pull requestu.

**Buddy** je váš osobní zástupce. Běží ve vašem Osobním Prostředí, pokud ho
máte, a jedná jen ve vašich právech a v rámci mandátů, které mu dáte. Platby
a vlastnictví, obnova, tajné údaje, změny přístupů a ničivé kroky vždy
potřebují váš souhlas s přesně tímto krokem, stejně jako merge, Publikace
nebo Release, na které se nevztahuje výslovný mandát (rozhodnutí 0089).

Persona, třeba Henry nebo jméno, které dáte svému Buddymu, je jen jméno
a povaha. Není to uživatel a nemá žádnou vlastní pravomoc. Čísla rozhodnutí
odkazují na veřejný
[rejstřík rozhodnutí Lazuria](https://github.com/Lazurio/LazurioPlatform/blob/4d5ee62a963a0ae2fc98287f0072e739ff6d2cd8/docs/decision-register.md).

## Váš úkol

V novém vlákně v Chatu pošlete:

```text
Zjisti, co v naší Organizaci smím na GitHubu. U kořenového repozitáře
Organizace a u repozitáře, kde máme sdílené znalosti, mi řekni, jestli
do nich můžu zapisovat, nebo je jen číst, a kdo v nich smí mergovat
změny. Jen čti, nic neměň.
```

**Hotovo poznáte takto:** víte, jestli můžete zapisovat do repozitáře, kam
půjde váš první úkol, a pokud ne, kdo v něm změny publikuje.
