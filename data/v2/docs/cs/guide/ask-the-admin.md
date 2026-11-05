---
title: "Jak požádat Admina"
description: "Co ve vaší Organizaci dělá jen Admin, jak ho za vás požádá agent a co do žádosti patří a co nikdy."
stableId: lazurio-doc-guide-ask-the-admin
locale: cs
summary: "Co ve vaší Organizaci dělá jen Admin, jak ho za vás požádá agent a co do žádosti patří a co nikdy."
updatedAt: "2026-11-05"
reviewedAt: "2026-11-05"
reviewOwner: Matej Suchanek
secondReviewOwner: Pablo AI
trustCritical: true
sourceRefs:
  - lazurio-decision-register-admin-ai
  - lazurio-decision-0230-request
audience:
  - builder
  - decision-maker
  - it-admin
  - agent
---

Některé věci ve vaší Organizaci dělá jen její Admin. Váš agent je za vás
neudělá a nehledá cestu kolem. Připraví žádost, podle které Admin může jednat
bez doptávání.

## Co dělá jen Admin

- Přesouvá vaše Prostředí mezi AI poolem Organizace a vaším vlastním účtem
  ([Odkud bere vaše Prostředí AI](/cs/guide/ai-source/)).
- Schvaluje a odebírá zařízení ([Schválení zařízení](/cs/guide/device-approval/)).
- Zařizuje nové Prostředí nebo víc paměti či disku.
- Dává přístup k modulu nebo aplikaci jiného Teamu.
- Připojuje Integraci pro celou Organizaci, třeba sdílenou schránku.
- Mění server.

Co zvládnete sami, najdete v Nastavení: například přihlášení AI mimo pool,
spárování telefonu s vlastním účtem nebo připojení vlastních Integrací.

## Jak požádat

Řekněte agentovi, co potřebujete, třeba „Požádej Admina, ať mě přepne na můj
účet ChatGPT“. Agent:

1. ověří, že věc opravdu patří Adminovi;
2. sebere údaje, které Admin potřebuje;
3. zapíše jednu žádost jako issue do kořenového repozitáře vaší Organizace na
   GitHubu s názvem „Žádost pro Admina: …“ a zmíní v ní Adminy;
4. dá vám odkaz a řekne, co bude dál.

Když do toho repozitáře přístup nemáte, dá vám agent místo issue krátký text.
Ten pošlete Adminovi sami, tak jak ho ve vašem týmu běžně kontaktujete.

## Co v žádosti je

- **Co:** jedna akce.
- **Pro koho a kde:** vaše jméno, Prostředí, a pokud jde o zařízení nebo
  modul, tak i ono.
- **Proč:** k čemu to potřebujete.
- **Stav teď:** co vidíte, třeba v Začínáme.
- **Kdy:** kdy se vám změna hodí a co přeruší.

Heslo, token, párovací ani ověřovací kód do žádosti **nikdy** nepatří.

## Kdo je Admin

Admin Organizace je role Lazuria, kterou jmenuje Owner GitHub Organizace
([rozhodnutí 0228](https://github.com/Lazurio/LazurioPlatform/blob/b62383756209f13b7d4113ada969e6fa3d32f1a3/docs/decision-register.md#0228--the-organization-admin-is-a-lazurio-role-and-the-admin-also-enters-every-environment-of-their-organization-in-the-browser),
zatím nenasazené). Dokud nasazená není, je Adminem aktivní Owner vaší GitHub
Organizace. Agent to ověřuje živě, ne podle jména.

## Co se chystá

Podle rozhodnutí 0230 budete Admina žádat přímo v Lazuriu. Žádost podáte tam,
kde se věc ukazuje, a dostane se ke všem Adminům Organizace v Přehledu
Organizace. Uvidíte, v jakém je stavu, a dokud čeká, můžete ji stáhnout.
Prvním případem je zdroj AI v Začínáme (rozhodnutí 0229). Dokud Lazurio
žádosti neumí, platí cesta přes issue popsaná výš.

## Pro Admina

Otevřené žádosti jsou issues s názvem „Žádost pro Admina“ nebo „Request for
the Admin“ v kořenovém repozitáři Organizace. Ověřte, že žádost podal sám
žadatel, a chybějící údaje doptejte přímo v issue. Termín změny, která
přeruší práci, s ním domluvte. Průběh a výsledek pište do issue. Žádost sama
nic neopravňuje a nenahrazuje žádné review.
