---
title: "Jak požádat Admina Organizace"
description: "Co ve vaší Organizaci dělá jen Admin Organizace, jak ho dnes požádat a co do žádosti patří a co nikdy."
stableId: lazurio-doc-guide-ask-the-admin
locale: cs
summary: "Co ve vaší Organizaci dělá jen Admin Organizace, jak ho dnes požádat a co do žádosti patří a co nikdy."
updatedAt: "2026-11-08"
reviewedAt: "2026-11-08"
reviewOwner: Matej Suchanek
secondReviewOwner: Pablo AI
trustCritical: true
sourceRefs:
  - lazurio-decision-register-admin-ai
  - lazurio-decision-0230-request
  - lazurio-decision-0234-role-names
audience:
  - builder
  - decision-maker
  - it-admin
  - agent
---

Některé věci ve vaší Organizaci dělá jen Admin Organizace. Požádejte ho
žádostí, podle které může jednat bez doptávání.

## Co dělá jen Admin Organizace

- Přesouvá vaše Prostředí mezi AI poolem Organizace a vaším vlastním účtem
  ([Odkud bere vaše Prostředí AI](/cs/guide/ai-source/)).
- Schvaluje a odebírá zařízení ([Schválení zařízení](/cs/guide/device-approval/)).
- Zařizuje nové Prostředí nebo víc paměti či disku.
- Dává vám roli v modulu jiného Teamu nebo přístup k jeho aplikaci. Podle
  rozhodnutí 0231, které zatím není nasazené, budou role v aplikaci dávat
  i Přispěvatelé modulu a Správci modulu tohoto modulu.
- Připojuje Integraci pro celou Organizaci, třeba sdílenou schránku.
- Mění server.

Co zvládnete sami, najdete v Nastavení: například přihlášení AI mimo pool,
spárování telefonu tam, kde ho Připojení nabízí, nebo připojení vlastních
Integrací.

## Jak požádat dnes

Dokud Lazurio žádosti samo neumí, uvádí rozhodnutí 0230 dvě cesty. Obsah je
v obou stejný (další oddíl):

1. **Issue v kořenovém repozitáři vaší Organizace na GitHubu** s názvem
   „Žádost pro Admina: …“, ve kterém zmíníte Adminy Organizace. Použijte ho,
   pokud do repozitáře máte přístup. Název je pevný tvar, se kterým počítá
   rozhodnutí 0230 i skill agentů.
2. **Zprávu Adminovi Organizace**, tak jak ho ve vašem týmu běžně
   kontaktujete.

Ve **veřejném Prostředí**, které si může vyzkoušet kdokoli s Lazurio účtem, se
žádná žádost nepodává. Nemáte tam svého Admina Organizace.

### S vaším agentem

Lazurio agenty naučí žádost podat skillem `admin-request`. Do vašeho Prostředí
přijde s verzí Lazuria, která ho obsahuje
([LazurioPlatform#860](https://github.com/Lazurio/LazurioPlatform/pull/860),
zatím nevydané). V Prostředí s touto verzí stačí říct třeba „Požádej Admina
Organizace, ať mě přepne na můj účet ChatGPT“. Agent pak:

1. ověří, že věc opravdu patří Adminovi Organizace;
2. sebere údaje, které Admin Organizace potřebuje;
3. zapíše issue;
4. dá vám odkaz, nebo bez přístupu do repozitáře text, který pošlete sami.

Do té doby vám agent může text žádosti podle této stránky připravit a podáte
nebo pošlete ho sami.

## Co v žádosti je

- **Co:** jedna akce.
- **Pro koho a kde:** vaše jméno, Prostředí, a pokud jde o zařízení nebo
  modul, tak i ono.
- **Proč:** k čemu to potřebujete.
- **Stav teď:** co vidíte, třeba v Začínáme.
- **Kdy:** kdy se vám změna hodí a co přeruší.

Heslo, token, párovací ani ověřovací kód do žádosti **nikdy** nepatří.

## Kdo je Admin Organizace

Admin Organizace je role Lazuria, kterou jmenuje Vlastník Organizace (na
GitHubu role owner)
([rozhodnutí 0228](https://github.com/Lazurio/LazurioPlatform/blob/b62383756209f13b7d4113ada969e6fa3d32f1a3/docs/decision-register.md#0228--the-organization-admin-is-a-lazurio-role-and-the-admin-also-enters-every-environment-of-their-organization-in-the-browser),
zatím nenasazené). Dokud nasazená není, je Adminem Organizace aktivní
Vlastník Organizace. Názvy rolí určuje
[rozhodnutí 0234](https://github.com/Lazurio/LazurioPlatform/blob/753cca123df45721c3c1395a16a3a0df9a04dbcd/docs/decision-register.md#0234--the-names-of-access-roles-one-vocabulary-for-every-text-screen-and-agent)
(anglicky).

## Co se chystá

Podle rozhodnutí 0230 budete Admina Organizace žádat přímo v Lazuriu. Žádost podáte tam,
kde se věc ukazuje, a dostane se ke všem Adminům Organizace v Přehledu
Organizace. Uvidíte, v jakém je stavu, a dokud čeká, můžete ji stáhnout.
Prvním případem je zdroj AI v Začínáme (rozhodnutí 0229). Dokud Lazurio
žádosti neumí, platí cesty popsané výš.

## Pro Admina Organizace

Otevřené žádosti jsou issues s názvem „Žádost pro Admina“ nebo „Request for
the Admin“ v kořenovém repozitáři Organizace a zprávy, které vám kolegové
pošlou. Ověřte, že žádost podal sám žadatel, a chybějící údaje doptejte tam,
kudy žádost přišla. Termín změny, která přeruší práci, domluvte a průběh
a výsledek napište zpátky. Žádost sama nic neopravňuje a nenahrazuje žádné
review.
