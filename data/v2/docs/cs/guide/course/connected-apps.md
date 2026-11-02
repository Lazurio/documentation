---
title: "Lekce 6: Připojené aplikace"
description: "Co je Integrace, kdo ji připojuje a co smějí agenti s vaší poštou nebo kalendářem."
stableId: lazurio-doc-guide-course-connected-apps
locale: cs
summary: "Co je Integrace, kdo ji připojuje a co smějí agenti s vaší poštou nebo kalendářem."
updatedAt: "2026-11-01"
reviewedAt: "2026-11-01"
reviewOwner: Anna Blazickova
secondReviewOwner: Pablo AI
trustCritical: true
sourceRefs:
  - lazurio-onboarding-decision-register
  - lazurio-platform-folder-agent-rules
  - lazurio-platform-onboarding-decisions
  - lazurio-platform-launchpad-texts
  - lazurio-external-apps-current
audience:
  - decision-maker
  - builder
  - agent
---

**Co se naučíte:** co je Integrace, kdo ji připojuje a co s ní agenti
smějí.

**Integrace** je aplikace nebo služba připojená k vašemu Prostředí, třeba
pošta, kalendář nebo chat. Najdete je v Apps → **Integrace**, v záložkách
**Vše**, **Připojené** a **Vlastní**. Každá aplikace má právě jednu cestu:
nástroj z Nastavení → Nástroje (například `gh` pro GitHub), Executor
Prostředí, nebo Composio s vaším vlastním účtem tam, kde ho vaše Organizace
povolila.

**Aplikace připojujete vy.** Přihlášení je váš souhlas, takže agent
aplikaci nikdy nepřipojí sám; místo toho vám pošle odkaz na její kartu.
Jakmile je aplikace připojená, může v ní každý agent a bot tohoto Prostředí
číst, zapisovat i mazat, dokud přístup nezúžíte.

**Možnost zapisovat není souhlas s Publikací.** Odeslání e-mailu nebo
zprávy, pozvánka na schůzku nebo odeslání formuláře je Publikace. Agent
takový krok připraví, například jako koncept ve vaší schránce, a dokončí ho,
až když mu to dovolíte. „Odpověz na ten e-mail“ je zadání připravit
koncept, ne pokyn k odeslání. Dnes je to pravidlo, které agenti dodržují;
zápis přes připojenou aplikaci žádný mechanismus Lazuria neblokuje
([Napojení Prostředí na aplikace](/cs/environment-app-connections/)).

Hesla, tokeny ani ověřovací kódy nikdy nevkládejte do chatu. Když má
Prostředí trezor a agent potřebuje heslo nebo klíč, požádá o něj
v Apps → **Trezor**, kde ho vyplníte vy.

## Váš úkol

1. Otevřete Apps → **Integrace** → **Připojené**.
2. V Chatu pošlete:

   ```text
   Které aplikace jsou v tomto Prostředí připojené a jakou cestou?
   Nic v nich nečti ani neměň.
   ```

3. Porovnejte odpověď se stránkou.

**Hotovo poznáte takto:** víte, ke kterým aplikacím tu agenti dosáhnou,
a víte, že odeslání, pozvánka nebo odeslání formuláře čeká na váš souhlas.
Poštu nebo kalendář připojíte podle návodu
[Propojení nástrojů](/cs/guide/tool-connections/).
