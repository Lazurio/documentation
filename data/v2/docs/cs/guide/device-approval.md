---
title: "Schválení zařízení"
description: "Proč zaregistrované zařízení nemusí hned dosáhnout na vaše Prostředí, kdo o přístupu rozhoduje a co dělat, když zařízení ztratíte."
stableId: lazurio-doc-guide-device-approval
locale: cs
summary: "Proč zaregistrované zařízení nemusí hned dosáhnout na vaše Prostředí, kdo o přístupu rozhoduje a co dělat, když zařízení ztratíte."
updatedAt: "2026-11-14"
reviewedAt: "2026-11-05"
reviewOwner: Matej Suchanek
secondReviewOwner: Pablo AI
trustCritical: true
sourceRefs:
  - lazurio-decision-register-access-0245-0247
  - lazurio-decision-register-admin-ai
  - lazurio-environment-access-model
audience:
  - builder
  - decision-maker
  - it-admin
  - agent
---

V cílovém modelu Lazuria pouští Organizace, která vstupuje do svých Prostředí
přes tailnet, dovnitř jen zařízení schválená jejím Adminem Organizace
([rozhodnutí 0245](https://github.com/Lazurio/LazurioPlatform/blob/25c72bcf6428cdb321d26b8b8d792a526c97c20b/docs/decision-register.md#0245--who-is-who-in-an-organization-its-deployment-repo-holds-the-boundaries-of-trust-and-lazurio-auth-holds-their-use)).
Rozhodnutí platí jako cíl, ale přechod na něj zatím není dokončený. **Jak
zařízení dnes získá přístup, se může mezi tailnety lišit**, jak píše
i [Připojení přes Tailscale](/cs/guide/tailscale/). Jak je to u vás, řekne
Admin Organizace nebo pravidla vaší Organizace.

## Co uděláte vy

Postup najdete v návodu [Přidání nového zařízení do
tailnetu](/cs/guide/tailscale-add-device/): instalace Tailscale, přihlášení
Lazurio účtem, jak poznáte, že zařízení čeká nebo je schválené,
a [co poslat Adminovi Organizace](/cs/guide/tailscale-add-device/#požádejte-admina-organizace-o-schválení).
Samotná registrace přístup nezaručuje; když se adresa Prostředí pořád
neotevře, požádejte Admina Organizace podle tohoto návodu.

## Kdy zařízení v tailnetu nepotřebujete

- **Referenční Organizace Lazuria ve veřejném vstupu**
  ([rozhodnutí 0213](https://github.com/Lazurio/LazurioPlatform/blob/b62383756209f13b7d4113ada969e6fa3d32f1a3/docs/decision-register.md#0213--network-for-people-an-organization-may-switch-from-tailnet-to-public-dns))
  tailnet ani schválení zařízení nepotřebuje, dokud se nevrátí do tailnetu.
  Přihlásíte se Lazurio účtem, ale jen do webového rozhraní: Launchpad, chat,
  MausBot a Buddy. SSH ani párování telefonu tam lidé nemají. Jiná Organizace
  na veřejný vstup přejít nemůže.
- **Telefon spárovaný přes aplikaci ChatGPT**, pokud ho vaše Prostředí
  nabízí ([Telefon a počítač](/cs/guide/phone-and-computer/)). Telefon tailnet
  nepotřebuje. Párovací kód ale vytvoříte uvnitř Prostředí, takže ho už
  musíte umět otevřít.

## Když zařízení ztratíte

Hned to řekněte Adminovi Organizace, ať zařízení odebere přístup. Pokud jste ztracený
telefon spárovali přes ChatGPT, odeberte ho i v seznamu **Spárované telefony**
v Nastavení → Připojení. V cílovém modelu budete moct ztracené zařízení
odebrat i sami (rozhodnutí 0245). Dokud to Lazurio nenabízí, dělá to Admin
Organizace.

## Pro Admina Organizace

Jak zařízení dnes schválit, co předtím ověřit a jaký je cíl v Přehledu
Organizace, popisuje [Pro Admina
Organizace](/cs/guide/tailscale-add-device/#pro-admina-organizace). Schválení
zařízení pro Prostředí Organizace neotevírá nic v Osobním Prostředí člověka.
