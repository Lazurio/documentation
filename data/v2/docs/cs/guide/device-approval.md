---
title: "Schválení zařízení"
description: "Proč zaregistrované zařízení pořád nedosáhne na vaše Prostředí, kdo ho schvaluje a co dělat, když zařízení ztratíte."
stableId: lazurio-doc-guide-device-approval
locale: cs
summary: "Proč zaregistrované zařízení pořád nedosáhne na vaše Prostředí, kdo ho schvaluje a co dělat, když zařízení ztratíte."
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

Organizace, která vstupuje do svých Prostředí přes tailnet, pustí dovnitř jen
zařízení schválená jejím Adminem
([rozhodnutí 0192](https://github.com/Lazurio/LazurioPlatform/blob/b62383756209f13b7d4113ada969e6fa3d32f1a3/docs/decision-register.md#0192--entry-with-a-lazurio-account-and-an-admin-approved-device-sharing-inside-the-organization)).
Ke vstupu jsou potřeba tři věci: síť, členství v Organizaci a přístup
k Prostředí. Schválené zařízení je ta síťová část.

## Co uděláte vy

Zařízení zaregistrujete sami: v aplikaci Tailscale se svým Lazurio účtem
přihlásíte do tailnetu své Organizace, jak popisuje [Připojení přes
Tailscale](/cs/guide/tailscale/). **Samotná registrace přístup nedává.** Dokud
zařízení Admin neschválí, adresa Prostředí se na něm neotevře.

Potom požádejte Admina o schválení. Napište, o jaké zařízení jde a jak se
jmenuje v Tailscale; viz [Jak požádat Admina](/cs/guide/ask-the-admin/).

Schválení nepotřebujete:

- pro telefon spárovaný přes aplikaci ChatGPT ([Telefon a
  počítač](/cs/guide/phone-and-computer/)), protože do Prostředí vstupuje
  přes váš účet ChatGPT;
- v Organizaci, která přešla na veřejné adresy
  ([rozhodnutí 0213](https://github.com/Lazurio/LazurioPlatform/blob/b62383756209f13b7d4113ada969e6fa3d32f1a3/docs/decision-register.md#0213--network-for-people-an-organization-may-switch-from-tailnet-to-public-dns));
  tam vstupujete jen Lazurio účtem.

## Když zařízení ztratíte

Hned to řekněte Adminovi, ať ho odebere. Podle rozhodnutí 0192 budete moct
ztracené zařízení odebrat i sami. Dokud to Lazurio nenabízí, dělá to Admin.

## Pro Admina

- Schvalujte konkrétní zařízení podle jeho záznamu v tailnetu (uzel, klíč,
  vlastník), nikdy jen podle jména. Jméno jde změnit a nic nedokazuje.
- Schválení zařízení pro Prostředí Organizace neotevírá nic v Osobním
  Prostředí člověka.
- Cílově zařízení schvalujete a odebíráte kliknutím v Přehledu Organizace.
  Dokud to nasazené není, dělá to vaše Organizace reviewovanou úpravou svého
  serverového nastavení.
