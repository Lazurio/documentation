---
title: "Telefon a počítač"
description: "Kdy můžete ovládat chaty svého Prostředí z aplikace ChatGPT v telefonu nebo z ChatGPT Desktopu v počítači, a co použít, když to Připojení nenabízí."
stableId: lazurio-doc-guide-phone-and-computer
locale: cs
summary: "Kdy můžete ovládat chaty svého Prostředí z aplikace ChatGPT v telefonu nebo z ChatGPT Desktopu v počítači, a co použít, když to Připojení nenabízí."
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

Co vám Prostředí nabízí, ukazuje **Nastavení → Připojení**. Řiďte se tím, co
tam stránka ukáže. Tady najdete, co který případ znamená.

## Kdy jde párování

Párování propojí aplikaci ChatGPT s vaším Prostředím přes váš účet ChatGPT
([rozhodnutí 0215](https://github.com/Lazurio/LazurioPlatform/blob/b62383756209f13b7d4113ada969e6fa3d32f1a3/docs/decision-register.md#0215--chatgpt-apps-pair-with-an-environment-through-the-chatgpt-account-ssh-stays-a-hidden-option-for-advanced-users)).
Funguje jen tehdy, když platí všechno z tohoto:

- vaše Prostředí používá **váš vlastní účet ChatGPT**, ne AI pool Organizace
  ([Odkud bere vaše Prostředí AI](/cs/guide/ai-source/), rozhodnutí 0229);
- Lazurio ve vašem Prostředí rozpoznalo funkci vzdáleného ovládání. Ta je
  zatím experimentální, proto ji Lazurio ověřuje a párování nabídne jen tam,
  kde ji najde;
- vaše Organizace **nepoužívá** veřejné adresy (rozhodnutí 0213). Tam se
  párování ukazuje jako nedostupné a pracujete ve webovém rozhraní: Launchpad,
  chat, MausBot a Buddy.

Aplikace ChatGPT musí být přihlášená stejným účtem jako Codex ve vašem
Prostředí, ChatGPT Plus a vyšší.

## Telefon

Když **Nastavení → Připojení → Telefon** nabízí **Spárovat telefon**:

1. Zvolte **Spárovat telefon**.
2. V telefonu otevřete aplikaci ChatGPT, zvolte **Codex → Přidat počítač**
   a naskenujte QR kód.
3. Hotovo je, když stránka ukáže **Telefon je spárovaný**.

Svoje telefony najdete v seznamu **Spárované telefony**. **Odebrat přístup**
telefonu přístup hned ukončí, třeba když ho ztratíte.

Když stránka místo toho ukáže hlášku:

| Stránka hlásí | Co to znamená |
| --- | --- |
| **Nejdřív se přihlaste svým účtem ChatGPT.** | Nejdřív se přihlaste v Nastavení → Začínáme → Připojit AI. |
| **Pro Prostředí s AI Organizace telefon připravujeme.** | Vaše Prostředí používá AI pool Organizace a párování potřebuje váš vlastní účet. Požádejte Admina Organizace o přechod na vlastní účet, nebo se zeptejte, jestli má vaše Organizace pro telefon jinou cestu; viz [Jak požádat Admina Organizace](/cs/guide/ask-the-admin/). |
| **Týmové Prostředí párování telefonu nemá.** | Sdílené Týmové Prostředí se s telefonem jednoho člověka nepáruje. |
| **Párování teď není dostupné.** | Párování v tomto Prostředí teď nejde, například v Organizaci s veřejnými adresami. Použijte webové rozhraní v prohlížeči telefonu, nebo to zkuste později. |

**Restartovat Codex** na této stránce ukončí chaty, které v Codexu právě běží.
Použijte ho, jen když nic důležitého neběží.

## Počítač

Když **Nastavení → Připojení → Počítač** nabízí **Připojit počítač**, dá vám
stránka prompt: zkopírujte ho, otevřete ChatGPT Desktop, vložte ho agentovi
a klikněte na **Přidat do Codexu**. Když to stránka nenabízí, pracujte ve
webovém rozhraní v prohlížeči.

**SSH ze zařízení** na téže stránce je pokročilá možnost. Nabízí se jen tam,
kde je SSH do Prostředí povolené, nikdy v Organizaci s veřejnými adresami.

Pokud vaše Organizace vstupuje do svých Prostředí přes tailnet, potřebuje
počítač, který se takto připojuje, ještě Tailscale a přístup, který vaše
Organizace vyžaduje; viz [Přidání nového zařízení do
tailnetu](/cs/guide/tailscale-add-device/) a [Schválení
zařízení](/cs/guide/device-approval/).
