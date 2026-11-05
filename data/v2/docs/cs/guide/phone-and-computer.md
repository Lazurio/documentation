---
title: "Telefon a počítač"
description: "Ovládejte chaty svého Prostředí z aplikace ChatGPT v telefonu nebo z ChatGPT Desktopu v počítači, a co dělat, když párování není nabídnuté."
stableId: lazurio-doc-guide-phone-and-computer
locale: cs
summary: "Ovládejte chaty svého Prostředí z aplikace ChatGPT v telefonu nebo z ChatGPT Desktopu v počítači, a co dělat, když párování není nabídnuté."
updatedAt: "2026-11-05"
reviewedAt: "2026-11-05"
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

Obojí najdete v **Nastavení → Připojení** svého Prostředí.

## Telefon

Telefon spárujete s aplikací ChatGPT. Potřebujete ChatGPT Plus a vyšší,
přihlášené stejným účtem jako Codex ve vašem Prostředí
([rozhodnutí 0215](https://github.com/Lazurio/LazurioPlatform/blob/b62383756209f13b7d4113ada969e6fa3d32f1a3/docs/decision-register.md#0215--chatgpt-apps-pair-with-an-environment-through-the-chatgpt-account-ssh-stays-a-hidden-option-for-advanced-users)).
Telefon nepotřebuje Tailscale ani heslo.

1. Ve svém Prostředí otevřete **Nastavení → Připojení → Telefon** a zvolte
   **Spárovat telefon**.
2. V telefonu otevřete aplikaci ChatGPT, zvolte **Codex → Přidat počítač**
   a naskenujte QR kód.
3. Hotovo je, když stránka ukáže **Telefon je spárovaný**.

Svoje telefony najdete v seznamu **Spárované telefony**. **Odebrat přístup**
telefonu přístup hned ukončí, třeba když ho ztratíte.

### Když párování nabídnuté není

| Stránka hlásí | Co to znamená |
| --- | --- |
| **Nejdřív se přihlaste svým účtem ChatGPT.** | Nejdřív se přihlaste v Nastavení → Začínáme → Připojit AI. |
| **Pro Prostředí s AI Organizace telefon připravujeme.** | Vaše Prostředí používá AI pool Organizace a párování potřebuje váš vlastní účet. Požádejte Admina o přechod na vlastní účet, nebo se zeptejte, jestli má vaše Organizace pro telefon jinou cestu; viz [Jak požádat Admina](/cs/guide/ask-the-admin/). |
| **Týmové Prostředí párování telefonu nemá.** | Sdílené Týmové Prostředí se s telefonem jednoho člověka nepáruje. |
| **Párování teď není dostupné.** | Zkuste to později. |

**Restartovat Codex** na této stránce ukončí chaty, které v Codexu právě běží.
Použijte ho, jen když nic důležitého neběží.

## Počítač

Chcete-li Prostředí ovládat z ChatGPT Desktopu ve svém počítači, otevřete
**Nastavení → Připojení → Počítač** a zvolte **Připojit počítač**. Stránka vám
dá prompt: zkopírujte ho, otevřete ChatGPT Desktop, vložte ho agentovi
a klikněte na **Přidat do Codexu**. **SSH ze zařízení** na téže stránce je
pokročilá možnost.

Pokud vaše Organizace vstupuje do svých Prostředí přes tailnet, potřebuje
počítač ještě Tailscale a schválené zařízení; viz [Schválení
zařízení](/cs/guide/device-approval/) a [Připojení přes
Tailscale](/cs/guide/tailscale/).
