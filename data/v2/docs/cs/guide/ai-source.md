---
title: "Odkud bere vaše Prostředí AI"
description: "AI pool Organizace, nebo váš vlastní účet ChatGPT: kde uvidíte, který zdroj Prostředí používá, kdo ho přepíná a co přepnutí přeruší."
stableId: lazurio-doc-guide-ai-source
locale: cs
summary: "AI pool Organizace, nebo váš vlastní účet ChatGPT: kde uvidíte, který zdroj Prostředí používá, kdo ho přepíná a co přepnutí přeruší."
updatedAt: "2026-11-08"
reviewedAt: "2026-11-08"
reviewOwner: Matej Suchanek
secondReviewOwner: Pablo AI
trustCritical: true
sourceRefs:
  - lazurio-decision-register-admin-ai
  - lazurio-platform-launchpad-texts-pairing
audience:
  - builder
  - decision-maker
  - it-admin
  - agent
---

Agenti ve vašem Prostředí potřebují AI: Codex a podle vaší volby i Claude
Code. Odkud ji Prostředí bere, ukazuje **Nastavení → Začínáme → Připojit AI**.

## Dva zdroje

V Osobním Prostředí se vždy přihlašujete vlastním účtem.

Pracovní Prostředí na serveru, kde Organizace provozuje AI pool, bere AI
z jednoho ze dvou zdrojů:

| Zdroj | Co to znamená | Co ukazuje Připojit AI |
| --- | --- | --- |
| **AI pool Organizace** | Agenti používají předplatné, které Organizace přihlásila jednou za všechny. Sami nic nepřihlašujete. | **Zajišťuje vaše Organizace.** |
| **Váš vlastní účet** | Přihlásíte se svým účtem ChatGPT, pracovním místem v ChatGPT Business vaší Organizace nebo osobním účtem, a pokud chcete, i účtem Claude. | **Připojeno:** s vaším účtem |

Organizace může oba zdroje kombinovat a lidi přesouvat po jednom, oběma
směry ([rozhodnutí 0229](https://github.com/Lazurio/LazurioPlatform/blob/b62383756209f13b7d4113ada969e6fa3d32f1a3/docs/decision-register.md#0229--the-organization-admin-sets-where-each-work-environment-takes-its-ai-from)).

## Co uděláte sami

V Prostředí, které není na poolu, otevřete **Nastavení → Začínáme → Připojit
AI** a zvolte **Přihlásit ChatGPT** nebo **Přihlásit Claude**. Krok je hotový,
když ukazuje váš účet.

Na poolu se vlastním účtem nepřihlašujte. Přepnutí zdroje je práce Admina
Organizace.

## Kdo zdroj přepíná

Mezi poolem a vlastním účtem Prostředí přesouvá jen Admin Organizace.
Když chcete druhý zdroj, požádejte ho; postup je v části [Jak požádat
Admina Organizace](/cs/guide/ask-the-admin/). Napište mu, jaký účet byste používali
(místo v ChatGPT Business, nebo osobní účet), jestli používáte Claude Code
a kdy se vám změna hodí.

Po změně:

- **S vlastním účtem** se přihlaste v Začínáme. Agenti budou znovu pracovat,
  až se přihlásíte.
- **Po návratu na pool** ukáže Začínáme **Zajišťuje vaše Organizace.**

## Co přepnutí přeruší

- Rozběhnuté chaty ve vašem Prostředí skončí. Potom začněte nová vlákna.
- Na chvíli přijdou o rozběhnuté chaty i všichni ostatní na stejném poolu,
  protože se pool restartuje. Admin Organizace s vámi proto domluví termín a ostatní
  předem upozorní.
- Claude Code odchází z poolu spolu s Codexem. Pokud ho používáte, přihlaste
  i Claude.
- Telefon se pak připojuje jinak; viz [Telefon a
  počítač](/cs/guide/phone-and-computer/).

## Co se teprve chystá

Rozhodnutí 0229 je přijaté, ale zatím není nasazené. Až bude, nastaví Admin Organizace
zdroj pro jednotlivá Prostředí v Přehledu Organizace. Vy o druhý zdroj
požádáte přímo v Začínáme a tam také uvidíte, že změna probíhá. Do té doby
Admin Organizace změnu provede reviewovanou úpravou serverového nastavení Organizace.
