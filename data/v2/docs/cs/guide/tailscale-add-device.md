---
title: "Přidání nového zařízení do tailnetu"
description: "Nainstalujte Tailscale, zadejte přihlašovací server Organizace, přihlaste se účtem Lazurio a počkejte na schválení Adminem."
stableId: lazurio-doc-guide-tailscale-add-device
locale: cs
summary: "Nainstalujte Tailscale, zadejte přihlašovací server Organizace, přihlaste se účtem Lazurio a počkejte na schválení Adminem."
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
  - tailscale-custom-control-server
  - tailscale-machine-names
  - tailscale-system-policies
  - tailscale-android-package
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
počítač) se přidává zvlášť a zvlášť se i schvaluje. Celý postup se dělá
klikáním v aplikaci; příkazový řádek nepotřebujete.

Když už zařízení v tailnetu máte a jen se nemůžete připojit, pokračujte
návodem [Připojení k Prostředí přes Tailscale](/cs/guide/tailscale/).

## Než začnete

Připravte si **adresu přihlašovacího serveru vaší Organizace**. Lazurio
provozuje tailnety na [Headscale](https://github.com/juanfont/headscale),
vlastním serveru, ke kterému se aplikace Tailscale přihlašuje místo serveru
společnosti Tailscale. Adresa má obvykle tvar
`https://headscale.<organizace>.lazurio.io`. Přesnou adresu vám ukáže
Dashboard nebo ji dostanete od Admina své Organizace. Adresu nehádejte:
s jinou se přihlásíte do cizí sítě, nebo vůbec.

Rozmyslete si také, jak se má zařízení jmenovat: `<login>-<zařízení>`,
například `jannovak-iphone` nebo `jannovak-macbook`. Jméno v aplikaci
nenastavujete, jen ho napíšete Adminovi (viz [Jméno
zařízení](#jméno-zařízení)).

## Přidejte zařízení

Postup vychází z oficiální dokumentace Tailscale a Headscale ke dni
3. listopadu 2026. Kroky pro Android jsme téhož dne prošli ve skutečné
aplikaci Tailscale 1.104.5 a obrázky pocházejí z ní. Aplikace pro iPhone
a Android nabídky mezi verzemi mění. Když položku nenajdete pod uvedeným
názvem, hledejte podobnou nabídku pro vlastní (custom nebo alternate) server.

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

Vlastní obrázky z iPhonu zatím nemáme. Postup s popisem obrazovek je na
stránce Tailscale [Configure Tailscale clients to use a custom control
server](https://tailscale.com/docs/how-to/set-up-custom-control-server).

### Android

1. Nainstalujte aplikaci
   [Tailscale z Google Play](https://play.google.com/store/apps/details?id=com.tailscale.ipn).
   Funguje na Androidu 8.0 a novějším.
2. Otevřete ji. Android se zeptá, jestli Tailscale smí nastavit připojení VPN.
   Klepněte na **OK**.

   <figure>
     <img src="/guide-assets/tailscale-android/android-1-vpn.png" alt="Dialog Connection request: Tailscale chce nastavit připojení VPN. Tlačítko OK je zvýrazněné." width="540" height="470" loading="lazy" />
     <figcaption>Povolte připojení VPN. Tím se zatím k žádné síti nepřipojíte.</figcaption>
   </figure>

3. Neklepejte na velké tlačítko **Log in**: vede na server společnosti
   Tailscale. Klepněte na ozubené kolo vpravo nahoře.

   <figure>
     <img src="/guide-assets/tailscale-android/android-2-settings.png" alt="Úvodní obrazovka Tailscale s tlačítkem Log in. Ozubené kolo vpravo nahoře je zvýrazněné." width="540" height="785" loading="lazy" />
     <figcaption>Nastavení otevřete ozubeným kolem, ne tlačítkem Log in.</figcaption>
   </figure>

4. V nastavení klepněte na **Accounts**.

   <figure>
     <img src="/guide-assets/tailscale-android/android-3-accounts.png" alt="Nastavení Tailscale. Položka Accounts nahoře je zvýrazněná." width="540" height="485" loading="lazy" />
   </figure>

5. Vpravo nahoře klepněte na tři tečky a zvolte **Use an alternate server**.

   <figure>
     <img src="/guide-assets/tailscale-android/android-4-alternate-server.png" alt="Obrazovka Accounts s otevřenou nabídkou. Položka Use an alternate server je zvýrazněná." width="540" height="385" loading="lazy" />
   </figure>

6. Do pole **Custom control server URL** zadejte adresu přihlašovacího
   serveru Organizace a klepněte na **Add account**.

   <figure>
     <img src="/guide-assets/tailscale-android/android-5-address.png" alt="Obrazovka Add another account s polem Custom control server URL, ve kterém je ukázková adresa https://headscale.example.lazurio.io, a tlačítkem Add account." width="540" height="485" loading="lazy" />
     <figcaption>Na obrázku je ukázková adresa. Zadejte adresu své Organizace.</figcaption>
   </figure>

7. Otevře se přihlášení Lazuria. Přihlaste se svým účtem Lazurio a vraťte se
   do aplikace Tailscale.

### macOS

Tailscale pro macOS potřebuje macOS Ventura 13.0 nebo novější.

1. Nainstalujte Tailscale: verzi
   [Standalone ze stránek Tailscale](https://tailscale.com/download) (Tailscale
   ji doporučuje), nebo verzi z Mac App Store.
2. Spusťte aplikaci, projděte úvodní kroky a povolte konfiguraci VPN.
   Zatím se nepřihlašujte.
3. Podržte klávesu **Option** (⌥) a klikněte na ikonu Tailscale v horní
   liště. Najeďte na **Debug** a v části **Custom Login Server** zvolte
   **Add Account…**.
4. Zadejte adresu přihlašovacího serveru Organizace a klikněte na **Add
   Account**.
5. V prohlížeči se otevře přihlášení Lazuria. Přihlaste se svým účtem Lazurio.

Jste-li už v Tailscale přihlášení k jinému tailnetu, Tailscale uvádí i druhou
cestu: ikona Tailscale v horní liště → **Settings** → záložka **Accounts** →
šipka vlevo dole → zadejte adresu → **Add account**.

Kroky 3 a 4 popisuje dokumentace Headscale; vlastní obrázky z Macu zatím
nemáme.

### Windows

Aplikace Tailscale pro Windows zadání vlastního serveru v okně nenabízí
(uvádí to oficiální dokumentace Tailscale) a jiný klikací postup Lazurio pro
Windows zatím nemá. **Nainstalujte
[Tailscale pro Windows](https://tailscale.com/download/windows) (Windows 10
nebo novější), nepřihlašujte se a napište Adminovi své Organizace**, že
potřebujete zařízení s Windows přidat. Pomůže vám s nastavením serveru.

## Jméno zařízení

Tailscale pojmenuje zařízení podle systému: počítač podle jeho názvu,
telefon obvykle jen podle výrobce nebo modelu. Aplikace Tailscale pro Android
nastavení jména nemá (ověřeno ve verzi 1.104.5) a dokumentace Tailscale
klikací nastavení jména neuvádí ani pro ostatní systémy. Na zařízení proto nic
nepřejmenovávejte a jméno, které chcete, napište Adminovi.
Podle něj pozná, které zařízení je vaše.

Jméno má tvar `<login>-<zařízení>`:

- `<login>` je váš login malými písmeny. Máte-li k účtu Lazurio propojený
  GitHub, je to váš GitHub login. Nemáte-li ho, použijte označení, které vám
  sdělí Admin.
- `<zařízení>` je krátké stálé označení, třeba `iphone`, `ipad`, `pixel`,
  `android`, `macbook` nebo `windows`. Zvolte ho jednou a používejte stejné
  ve všech tailnetech. Máte-li dvě zařízení stejného druhu, rozlište je
  natrvalo, třeba `macbook-air` a `macbook-pro`.
- Jen malá písmena, číslice a spojovníky, bez názvu Organizace.

Zařízení, které už je schválené, kvůli tomuto pravidlu nepřejmenovávejte.
Jméno je součástí jeho schválení a jeho změnu musí připravit Admin. Jméno je
jen popis, přístup nedává.

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
  To je běžné. Nic sami nemažte ani nepřihlašujte znovu a napište Adminovi.

### Požádejte Admina o schválení

Napište Adminovi své Organizace a uveďte:

- svůj login;
- jméno zařízení, které chcete (`<login>-<zařízení>`);
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
a pravidla sítě změní během desítek sekund. Dokud tato služba neběží, připraví
schválení z Dashboardu změnu konfigurace sítě Organizace, která prochází
review. Několik čekajících zařízení může jít v jedné dávce. Zařízení dostane
přístup až po schválení a nasazení této změny, proto může schválení trvat
déle než pár minut. Stejná reviewovaná změna je i záložní cestou, když služba
neběží.

Před schválením ověřte:

1. že o zařízení žádá jeho vlastník kanálem, kterému věříte;
2. že zařízení v tailnetu patří účtu tohoto člověka;
3. jméno zařízení. Zařízení přichází se jménem, které mu dal systém, a člověk
   ho v aplikaci Tailscale klikáním změnit nemůže. Domluvte se s ním, o které
   zařízení jde, a jméno, pod kterým ho schvalujete, mu sdělte. Jak jméno
   při schválení nastavit, tento návod zatím nepopisuje;
4. že jde o čerstvou registraci, kterou člověk opravdu udělal. Neznámé
   zařízení neschvalujte.

Člověku s Windows pomozte se zadáním přihlašovacího serveru; klikací postup
pro Windows Lazurio zatím nemá.

Když člověk zařízení ztratí nebo ho už nepoužívá, schválení odeberte
stejnou cestou, jakou jste ho udělili. Pravidla, kdo smí schvalovat a kam
schválené zařízení dosáhne, se mění reviewovanou změnou konfigurace
Organizace, ne schválením jednoho zařízení.
