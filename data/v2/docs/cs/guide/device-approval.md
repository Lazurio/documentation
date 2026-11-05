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

Zařízení zaregistrujete sami: v aplikaci Tailscale se svým Lazurio účtem
přihlásíte do tailnetu své Organizace, jak popisuje průvodce Tailscale.

Samotná registrace přístup nezaručuje. Když se adresa Prostředí pořád
neotevře, zařízení možná přístup ještě nemá. Požádejte Admina, ať ho schválí
nebo přidá, a napište, o jaké zařízení jde a jak se jmenuje v Tailscale; viz
[Jak požádat Admina](/cs/guide/ask-the-admin/).

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

- Schvalujte konkrétní zařízení podle jeho záznamu v tailnetu (uzel, klíč,
  vlastník), nikdy jen podle jména. Jméno jde změnit a nic nedokazuje.
- Schválení zařízení pro Prostředí Organizace neotevírá nic v Osobním
  Prostředí člověka.
- V cílovém modelu zařízení schvalujete a odebíráte kliknutím v Přehledu
  Organizace. Do té doby záleží cesta na vaší Organizaci. Kde už platí, je to
  reviewovaná úprava serverového nastavení Organizace. Která cesta platí, říkají
  pravidla vaší Organizace.
