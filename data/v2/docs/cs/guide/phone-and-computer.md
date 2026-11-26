---
title: "Telefon a počítač"
description: "Jak otevřít Lazurio v prohlížeči telefonu, kdy lze vyzkoušet experimentální párování s ChatGPT a jak připojit počítač."
stableId: lazurio-doc-guide-phone-and-computer
locale: cs
summary: "Jak otevřít Lazurio v prohlížeči telefonu, kdy lze vyzkoušet experimentální párování s ChatGPT a jak připojit počítač."
updatedAt: "2026-11-26"
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

Chcete na telefonu pokračovat v práci? Otevřete v prohlížeči adresu svého Prostředí. Pro práci na webu nepotřebujete párovat telefon s aplikací ChatGPT.

## Telefon

Prostředí se otevírá přes soukromou síť (tailnet): zapněte na telefonu Tailscale a otevřete adresu Prostředí. Při prvním připojení postupujte podle [návodu pro iPhone a Android](/cs/guide/tailscale-add-device/). Podmínky vstupu se zatím mezi sítěmi liší. V pravidlech vaší Organizace nebo u jejího Admina si ověřte, zda telefon potřebuje [schválení zařízení](/cs/guide/device-approval/).

### Kdy jde párování

Párování přes ChatGPT je experimentální. Slouží k ovládání chatů Codexu z aplikace ChatGPT v telefonu. I když se v **Nastavení → Připojení → Telefon** objeví tlačítko **Spárovat telefon**, spojení se nemusí podařit dokončit.

Pokud párování chcete vyzkoušet, nejdřív otevřete Prostředí na zařízení, ze kterého už máte přístup. V telefonu musíte být v aplikaci ChatGPT přihlášeni stejným účtem jako Codex v Prostředí (ChatGPT Plus nebo vyšší). Lazurio nabídne párování jen tam, kde rozpozná funkci vzdáleného ovládání. V Týmovém Prostředí ani při použití [AI poolu Organizace](/cs/guide/ai-source/) tuto možnost nemáte.

1. V Prostředí zvolte **Spárovat telefon**.
2. V aplikaci ChatGPT v telefonu otevřete **Codex → Přidat počítač** a naskenujte zobrazený QR kód.
3. Počkejte na stav **Telefon je spárovaný**. Samotné zobrazení kódu párování nepotvrzuje.

Pokud tlačítko chybí, aplikace skenování nenabízí nebo se spojení nepotvrdí, pokračujte v prohlížeči telefonu podle návodu výše. **Restartovat Codex** ukončí běžící chaty v Codexu.

Spárovaný telefon najdete v seznamu **Spárované telefony**. Pokud ho ztratíte, zvolte u něj **Odebrat přístup** a u zařízení schváleného do sítě Organizace postupujte také podle [návodu pro ztracené zařízení](/cs/guide/device-approval/#když-zařízení-ztratíte).

## Počítač

Když **Nastavení → Připojení → Počítač** nabízí **Připojit počítač**, dá vám
stránka prompt: zkopírujte ho, otevřete ChatGPT Desktop, vložte ho agentovi
a klikněte na **Přidat do Codexu**. Když to stránka nenabízí, pracujte ve
webovém rozhraní v prohlížeči.

**SSH ze zařízení** na téže stránce je pokročilá možnost. Nabízí se jen tam,
kde je SSH do Prostředí povolené.

Počítač, který se takto připojuje, potřebuje ještě Tailscale a přístup, který
vaše Organizace vyžaduje; viz [Přidání nového zařízení do
tailnetu](/cs/guide/tailscale-add-device/) a [Schválení
zařízení](/cs/guide/device-approval/).
