---
title: "Přidání nového zařízení do tailnetu"
description: "Nainstalujte Tailscale, zadejte přihlašovací server Organizace, pojmenujte zařízení a počkejte na schválení Adminem."
stableId: lazurio-doc-guide-tailscale-add-device
locale: cs
summary: "Nainstalujte Tailscale, zadejte přihlašovací server Organizace, pojmenujte zařízení a počkejte na schválení Adminem."
updatedAt: "2026-11-03"
reviewedAt: "2026-11-03"
reviewOwner: Matej Suchanek
secondReviewOwner: Pablo AI
trustCritical: true
sourceRefs:
  - lazurio-environment-access-model-device-approval
  - lazurio-device-node-names
  - headscale-project
  - headscale-connect-apple
  - headscale-connect-android
  - headscale-connect-windows
  - tailscale-custom-control-server
  - tailscale-cli
  - tailscale-machine-names
  - tailscale-install-ios
  - tailscale-install-android
  - tailscale-install-macos
  - tailscale-install-windows
audience:
  - builder
  - it-admin
  - agent
---

Nové zařízení si do tailnetu Organizace přidáte sami: **nainstalujte
Tailscale, zadejte v něm přihlašovací server své Organizace, přihlaste se
účtem Lazurio a počkejte, až zařízení schválí Admin Organizace.** Do té doby
se z něj Prostředí Organizace neotevřou. Každé zařízení (telefon, tablet,
počítač) se přidává zvlášť a zvlášť se i schvaluje.

Když už zařízení v tailnetu máte a jen se nemůžete připojit, pokračujte
návodem [Připojení k Prostředí přes Tailscale](/cs/guide/tailscale/).

## Než začnete

Budete potřebovat dvě věci:

1. **Adresu přihlašovacího serveru vaší Organizace.** Lazurio provozuje
   tailnety na [Headscale](https://github.com/juanfont/headscale), vlastním
   serveru, ke kterému se aplikace Tailscale přihlašuje místo serveru
   společnosti Tailscale. Adresa má obvykle tvar
   `https://headscale.<organizace>.lazurio.io`. Přesnou adresu vám ukáže
   Dashboard nebo ji dostanete od Admina své Organizace. Adresu nehádejte:
   s jinou se přihlásíte do cizí sítě, nebo vůbec.
2. **Jméno zařízení** ve tvaru `<login>-<zařízení>`, například
   `jannovak-iphone` nebo `jannovak-macbook`.

### Jak zařízení pojmenovat

- `<login>` je váš login malými písmeny. Máte-li k účtu Lazurio propojený
  GitHub, je to váš GitHub login. Nemáte-li ho, použijte označení, které vám
  sdělí Admin.
- `<zařízení>` je krátké stálé označení, třeba `iphone`, `ipad`, `pixel`,
  `android`, `macbook` nebo `windows`. Zvolte ho jednou a používejte stejné
  ve všech tailnetech. Máte-li dvě zařízení stejného druhu, rozlište je
  natrvalo, třeba `macbook-air` a `macbook-pro`.
- Používejte jen malá písmena, číslice a spojovníky. Název Organizace do jména
  nepřidávejte.
- Zařízení, které už je schválené, kvůli tomuto pravidlu nepřejmenovávejte.
  Jméno je součástí jeho schválení a jeho změnu musí připravit Admin.

Jméno je jen popis, přístup nedává. Pomáhá ale Adminovi poznat, čí zařízení
schvaluje.

## Přidejte zařízení

Postup níže vychází z oficiální dokumentace Tailscale a Headscale ke dni
3. listopadu 2026. Aplikace pro iPhone a Android nabídky mezi verzemi mění.
Když položku nenajdete pod uvedeným názvem, hledejte podobnou nabídku pro
vlastní (custom nebo alternate) server.

### iPhone a iPad

1. Nainstalujte aplikaci [Tailscale z App Store](https://apps.apple.com/app/tailscale/id1470499037).
   Funguje na iOS 15 a novějším.
2. Otevřete ji, zvolte **Get Started** a povolte přidání konfigurace VPN.
   Zatím se nepřihlašujte.
3. Klepněte na ikonu profilu vpravo nahoře. Otevře se nastavení.
4. Nejste-li v Tailscale přihlášení k jinému tailnetu, klepněte na **Log in**.
   Jinak klepněte na svůj přihlášený účet.
5. Vpravo nahoře otevřete nabídku a zvolte **Use a custom coordination
   server**.
6. Zadejte adresu přihlašovacího serveru Organizace a klepněte na **Log in**.
7. Otevře se přihlášení Lazuria. Přihlaste se svým účtem Lazurio a vraťte se
   do aplikace Tailscale.

**Jméno zařízení.** Oficiální dokumentace Tailscale neuvádí, jak na iPhonu
nebo iPadu nastavit jméno zařízení, a aplikace pro iOS nemá příkazovou
řádku. Zařízení se proto může v tailnetu objevit pod obecným jménem. Napište
Adminovi, jak se má jmenovat, viz [Požádejte Admina o schválení](#požádejte-admina-o-schválení).

### Android

1. Nainstalujte aplikaci
   [Tailscale z Google Play](https://play.google.com/store/apps/details?id=com.tailscale.ipn).
   Funguje na Androidu 8.0 a novějším.
2. Otevřete ji, zvolte **Get Started** a povolte přidání konfigurace VPN.
   Nepřihlašujte se tlačítkem **Sign in with Google** ani **Sign in with
   other**: ta vedou na server společnosti Tailscale.
3. Klepněte na ikonu profilu vpravo nahoře. Otevře se nastavení.
4. Nejste-li v Tailscale přihlášení k jinému tailnetu, klepněte na **Log in**.
   Jinak klepněte na svůj přihlášený účet.
5. Vpravo nahoře otevřete nabídku (tři tečky) a zvolte **Use an alternate
   server**. Starší popis v dokumentaci Headscale vede k téže volbě přes
   **Accounts**.
6. Zadejte adresu přihlašovacího serveru Organizace a klepněte na **Log in**.
7. Přihlaste se svým účtem Lazurio a vraťte se do aplikace Tailscale.

**Jméno zařízení.** Ani pro Android oficiální dokumentace nastavení jména
zařízení neuvádí a aplikace nemá příkazovou řádku. Napište Adminovi, jak se
má zařízení jmenovat.

### macOS

Tailscale pro macOS potřebuje macOS Ventura 13.0 nebo novější. Doporučený
postup je přihlášení v Terminálu, protože v něm rovnou nastavíte jméno
zařízení.

1. Nainstalujte Tailscale: verzi
   [Standalone ze stránek Tailscale](https://tailscale.com/download) (Tailscale
   ji doporučuje), nebo verzi z Mac App Store.
2. Spusťte aplikaci, projděte úvodní kroky a povolte konfiguraci VPN.
   Zatím se nepřihlašujte.
3. Otevřete Terminál a spusťte (adresu a jméno nahraďte svými):

   ```sh
   /Applications/Tailscale.app/Contents/MacOS/Tailscale login --login-server=https://headscale.<organizace>.lazurio.io --hostname=jannovak-macbook
   ```

   Celou cestu k aplikaci uvádí Tailscale pro verzi z App Store. Ve verzi
   Standalone si můžete zapnout příkaz `tailscale` (aplikace Tailscale →
   **Settings** → **CLI integration** → **Show me how** → **Install Now**)
   a pak psát jen `tailscale login …`.
4. V prohlížeči se otevře přihlášení Lazuria. Přihlaste se svým účtem Lazurio.

Jste-li už v Tailscale přihlášení k jinému tailnetu, můžete server přidat
i bez Terminálu: ikona Tailscale v horní liště → **Settings** → záložka
**Accounts** → šipka vlevo dole → zadejte adresu → **Add account**. Tak ale
jméno zařízení nenastavíte; napište ho Adminovi.

### Windows

Aplikace Tailscale pro Windows zadání vlastního serveru v okně nenabízí,
přihlásíte se proto příkazem.

1. Stáhněte a spusťte
   [instalátor Tailscale pro Windows](https://tailscale.com/download/windows)
   (Windows 10 nebo novější). Zatím se nepřihlašujte.
2. Otevřete PowerShell nebo příkazový řádek a spusťte (adresu a jméno
   nahraďte svými):

   ```powershell
   tailscale login --login-server=https://headscale.<organizace>.lazurio.io --hostname=jannovak-windows
   ```

3. V prohlížeči se otevře přihlášení Lazuria. Přihlaste se svým účtem Lazurio.

## Co se stane potom

Po přihlášení je zařízení v tailnetu zaregistrované, ale **čeká na schválení
Adminem Organizace**. Registrace sama přístup nedává: model přístupu Lazuria
(rozhodnutí 0192) vyžaduje, aby každé zařízení pro každou Organizaci schválil
její Admin. Schválení pro jednu Organizaci neotevře jinou.

**Poznáte, že čekáte:** tailnet Organizace je v Tailscale v seznamu účtů
a aplikace může ukazovat připojení, ale adresy Prostředí Organizace se
neotevřou.

**Poznáte, že jste schválení:** Admin vám dá vědět a adresy Prostředí, ke
kterým máte přístup, se otevřou. Ověřte to se zapnutým Tailscale a vybraným
tailnetem Organizace (návod [Připojení k Prostředí přes
Tailscale](/cs/guide/tailscale/)).

### Když se nic neděje

- **Přihlášení skončilo chybou.** Váš účet Lazurio zatím do tailnetu této
  Organizace nesmí, nebo jste zadali jinou adresu serveru. Zkontrolujte
  adresu a napište Adminovi.
- **Tailnet v seznamu účtů chybí.** Přihlášení se nedokončilo. Projděte
  postup znovu od zadání serveru.
- **Zařízení pořád čeká.** Admin o něm možná neví. Napište mu podle další
  části.
- **Zařízení se v tailnetu objevilo pod jiným jménem nebo s příponou `-1`.**
  Nic sami nemažte ani nepřihlašujte znovu a napište Adminovi. Domluví
  s vámi, jak dál.

### Požádejte Admina o schválení

Napište Adminovi své Organizace a uveďte:

- svůj login;
- jméno zařízení, které chcete (`<login>-<zařízení>`), a jméno, pod kterým se
  zařízení ukazuje v aplikaci Tailscale, pokud se liší;
- druh zařízení (iPhone, Android, Mac, Windows);
- adresu přihlašovacího serveru, kterou jste zadali;
- kdy jste se přihlásili.

Admin zařízení schválí jen tehdy, když ví, že o ně žádáte vy. Proto mu pište
kanálem, podle kterého vás pozná.

## Pro Admina Organizace

Admin schvaluje zařízení v Dashboardu Organizace. Schválení je vztah
konkrétního zařízení, účtu jeho vlastníka a vaší Organizace. Na tailnetu, který
obsluhuje víc Organizací, schvaluje každá Organizace zvlášť.

**Jak to funguje dnes (stav k 3. listopadu 2026).** Cílově zapisuje schválení
z Dashboardu služba na Conglomerate Hostu, serveru, který tailnet provozuje,
a pravidla sítě změní během desítek sekund. Dokud tato služba neběží, připraví schválení z Dashboardu
změnu konfigurace sítě Organizace, která prochází review. Několik čekajících
zařízení může jít v jedné dávce. Zařízení dostane přístup až po schválení
a nasazení této změny, proto může schválení trvat déle než pár minut. Stejná
reviewovaná změna je i záložní cestou, když služba neběží.

Před schválením ověřte:

1. že o zařízení žádá jeho vlastník kanálem, kterému věříte;
2. že zařízení v tailnetu patří účtu tohoto člověka;
3. jméno zařízení. Má odpovídat tvaru `<login>-<zařízení>`; iPhone, iPad
   a zařízení s Androidem ale mohou přijít s obecným jménem, protože jejich
   aplikace jméno nastavit neumí. Jak takové zařízení přejmenovat, tento
   návod zatím nepopisuje: domluvte se s člověkem, o které zařízení jde,
   a jméno, pod kterým ho schvalujete, mu sdělte;
4. že jde o čerstvou registraci, kterou člověk opravdu udělal. Neznámé
   zařízení neschvalujte.

Když člověk zařízení ztratí nebo ho už nepoužívá, schválení odeberte
stejnou cestou, jakou jste ho udělili.
Pravidla, kdo smí schvalovat a kam schválené zařízení dosáhne, se mění
reviewovanou změnou konfigurace Organizace, ne schválením jednoho zařízení.
