---
title: "Lekce 2: Dokončete Začínáme"
description: "Připojte AI a GitHub a stáhněte svou Organizaci, v tomto pořadí."
stableId: lazurio-doc-guide-course-getting-started
locale: cs
summary: "Připojte AI a GitHub a stáhněte svou Organizaci, v tomto pořadí."
updatedAt: "2026-11-01"
reviewedAt: "2026-11-01"
reviewOwner: Anna Blazickova
secondReviewOwner: Pablo AI
trustCritical: true
sourceRefs:
  - lazurio-onboarding-decision-register
  - lazurio-platform-getting-started
  - lazurio-platform-launchpad-texts
  - lazurio-platform-shell-column-head
audience:
  - decision-maker
  - builder
  - agent
---

**Co se naučíte:** co Prostředí potřebuje, než pro vás agenti mohou
pracovat, a v jakém pořadí.

**Začínáme** je první oddíl Nastavení Prostředí. Ukazuje kroky, které
Prostředí připraví k práci. Každý krok ověřuje podle stavu samotného
Prostředí, ne podle vašeho prohlížeče, takže vypadá stejně, ať ho otevřete
kdekoli
([`start-view.ts`](https://github.com/Lazurio/LazurioPlatform/blob/a2927744b5a87113425f93f5e1517ac97b2f6c06/src/launchpad/start-view.ts)).
Dokud některý povinný krok chybí, ukazuje hlavička levého sloupce
**Dokončit nastavení**, například **(1 ze 3)**, a dovede vás tam
([`view.ts`](https://github.com/Lazurio/LazurioPlatform/blob/a2927744b5a87113425f93f5e1517ac97b2f6c06/src/shell/view.ts)).

Povinné kroky jdou v tomto pořadí:

1. **Připojit AI.** Přihlaste se svým účtem ChatGPT nebo Claude, případně
   oběma. V Prostředí na serveru se přihlašovací stránka otevře v prohlížeči
   v pravém panelu; přístupové klíče (passkeys) ani správce hesel vašeho
   počítače v něm nefungují. Když AI zajišťuje vaše Organizace, krok ukáže
   **Zajišťuje vaše Organizace.**
2. **GitHub.** Tlačítko **Připojit** se zpřístupní, jakmile je AI připojené.
   Jednorázový kód potvrďte na github.com účtem GitHubu, který má přístup
   k vaší Organizaci.
3. **Stáhnout** vaši Organizaci. Krok se spustí sám po připojení GitHubu
   a stáhne moduly Organizace.

AI je na řadě první proto, aby vám se zbytkem mohl pomoct agent v Chatu.
Když se krok zastaví, řekne, co dál. **Vyřešit v Chatu** otevře v Chatu nové
vlákno s připraveným zadáním, které ještě není odeslané. **Organizaci
připravuje Admin.** znamená, že jednat musí váš Admin, ne vy.

Pod povinnými kroky jsou volitelné, například Composio pro poštu
a kalendář, SSH z vlastního počítače a prohlídka aplikace. Přidat je můžete
kdykoli. Týmové Prostředí má povinné kroky připravené předem.

## Váš úkol

1. Otevřete Nastavení → **Začínáme**.
2. Dokončete povinné kroky, dokud stránka neukáže **Prostředí je
   připravené.**
3. V části **Prohlídka aplikace** zvolte **Spustit prohlídku** a proklikejte
   Apps, Chat a Automate.

**Hotovo poznáte takto:** všechny povinné kroky jsou hotové, stránka ukazuje
**Prostředí je připravené.** a řádek **Apps, Chat a Automate** ukazuje
**Prohlédnuto**.
