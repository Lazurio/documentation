---
title: "Schválení zařízení"
description: "Proč zaregistrované zařízení nemusí hned dosáhnout na vaše Prostředí, kdo o přístupu rozhoduje a co dělat, když zařízení ztratíte."
stableId: lazurio-doc-guide-device-approval
locale: cs
summary: "Proč zaregistrované zařízení nemusí hned dosáhnout na vaše Prostředí, kdo o přístupu rozhoduje a co dělat, když zařízení ztratíte."
updatedAt: "2026-11-05"
reviewedAt: "2026-11-05"
reviewOwner: Matej Suchanek
secondReviewOwner: Pablo AI
trustCritical: true
sourceRefs:
  - lazurio-decision-register-admin-ai
  - lazurio-environment-access-model
audience:
  - builder
  - decision-maker
  - it-admin
  - agent
---

V cílovém modelu Lazuria pouští Organizace, která vstupuje do svých Prostředí
přes tailnet, dovnitř jen zařízení schválená jejím Adminem
([rozhodnutí 0192](https://github.com/Lazurio/LazurioPlatform/blob/b62383756209f13b7d4113ada969e6fa3d32f1a3/docs/decision-register.md#0192--entry-with-a-lazurio-account-and-an-admin-approved-device-sharing-inside-the-organization)).
Rozhodnutí platí jako cíl, ale přechod na něj zatím není dokončený. **Jak
zařízení dnes získá přístup, se může mezi tailnety lišit**, jak píše
i [Připojení přes Tailscale](/cs/guide/tailscale/). Jak je to u vás, řekne
váš Admin nebo pravidla vaší Organizace.

## Co uděláte vy

Postup najdete v návodu [Přidání nového zařízení do
tailnetu](/cs/guide/tailscale-add-device/): instalace Tailscale, přihlášení
Lazurio účtem, jak poznáte, že zařízení čeká nebo je schválené,
a [co poslat Adminovi](/cs/guide/tailscale-add-device/#požádejte-admina-o-schválení).
Samotná registrace přístup nezaručuje; když se adresa Prostředí pořád
neotevře, požádejte Admina podle tohoto návodu.

## Kdy zařízení v tailnetu nepotřebujete

- **Organizace s veřejnými adresami**
  ([rozhodnutí 0213](https://github.com/Lazurio/LazurioPlatform/blob/b62383756209f13b7d4113ada969e6fa3d32f1a3/docs/decision-register.md#0213--network-for-people-an-organization-may-switch-from-tailnet-to-public-dns))
  tailnet ani schválení zařízení nepotřebuje. Přihlásíte se Lazurio účtem,
  ale jen do webového rozhraní: Launchpad, chat, MausBot a Buddy. SSH ani
  párování telefonu tam lidé nemají.
- **Telefon spárovaný přes aplikaci ChatGPT**, pokud ho vaše Prostředí
  nabízí ([Telefon a počítač](/cs/guide/phone-and-computer/)). Telefon tailnet
  nepotřebuje. Párovací kód ale vytvoříte uvnitř Prostředí, takže ho už
  musíte umět otevřít.

## Když zařízení ztratíte

Hned to řekněte Adminovi, ať zařízení odebere přístup. Pokud jste ztracený
telefon spárovali přes ChatGPT, odeberte ho i v seznamu **Spárované telefony**
v Nastavení → Připojení. V cílovém modelu budete moct ztracené zařízení
odebrat i sami (rozhodnutí 0192). Dokud to Lazurio nenabízí, dělá to Admin.

## Pro Admina

Jak zařízení dnes schválit, co předtím ověřit a jaký je cíl v Přehledu
Organizace, popisuje [Pro Admina
Organizace](/cs/guide/tailscale-add-device/#pro-admina-organizace). Schválení
zařízení pro Prostředí Organizace neotevírá nic v Osobním Prostředí člověka.
