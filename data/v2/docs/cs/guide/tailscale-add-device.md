---
title: "Přidání nového zařízení do tailnetu"
description: "Nainstalujte Tailscale, zadejte přihlašovací server Organizace, přihlaste se účtem Lazurio a počkejte na schválení Adminem Organizace."
stableId: lazurio-doc-guide-tailscale-add-device
locale: cs
summary: "Nainstalujte Tailscale, zadejte přihlašovací server Organizace, přihlaste se účtem Lazurio a počkejte na schválení Adminem Organizace."
updatedAt: "2026-11-05"
reviewedAt: "2026-11-05"
reviewOwner: Matej Suchanek
secondReviewOwner: Pablo AI
trustCritical: true
sourceRefs:
  - lazurio-environment-access-model-device-approval
  - lazurio-agent-manual-device-enrollment
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
  - tailscale-install-windows-msi
  - tailscale-cli-login-output
  - microsoft-powershell-call-operator
  - microsoft-windows-terminal-interaction
audience:
  - builder
  - it-admin
  - agent
---

Nové zařízení si do tailnetu Organizace přidáte sami: **nainstalujte
Tailscale, zadejte v něm přihlašovací server své Organizace, přihlaste se
účtem Lazurio a počkejte, až vám Admin Organizace napíše, že je zařízení
schválené.** Do té doby nečekejte, že se z něj Prostředí Organizace otevřou. Každé zařízení (telefon, tablet,
počítač) se přidává zvlášť a zvlášť se i schvaluje. Na iPhonu, Androidu
a Macu se celý postup dělá klikáním v aplikaci. Ve Windows je potřeba jeden
řádek v PowerShellu; obrázky ukazují každé kliknutí a tento krok můžete předat
i svému agentovi.

Když už zařízení v tailnetu máte a jen se nemůžete připojit, pokračujte
návodem [Připojení k Prostředí přes Tailscale](/cs/guide/tailscale/).

## Než začnete

Připravte si **adresu přihlašovacího serveru vaší Organizace**. Lazurio
provozuje tailnety na [Headscale](https://github.com/juanfont/headscale),
vlastním serveru, ke kterému se aplikace Tailscale přihlašuje místo serveru
společnosti Tailscale. Adresa má obvykle tvar
`https://headscale.<organizace>.lazurio.io`. Přesnou adresu dostanete od
Admina Organizace. Adresu nehádejte:
s jinou se přihlásíte do cizí sítě, nebo vůbec.

Rozmyslete si také, jak se má zařízení jmenovat: `<login>-<zařízení>`,
například `jannovak-iphone` nebo `jannovak-macbook`. Jméno v aplikaci
nenastavujete, jen ho napíšete Adminovi Organizace (viz [Jméno
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

   <figure class="lz-app-step">
     <img src="/guide-assets/tailscale-android/android-1-vpn.png" alt="Dialog Connection request: Tailscale chce nastavit připojení VPN. Tlačítko OK je zvýrazněné." width="540" height="470" loading="lazy" />
     <figcaption>Povolte připojení VPN. Tím se zatím k žádné síti nepřipojíte.</figcaption>
   </figure>

3. Neklepejte na velké tlačítko **Log in**: vede na server společnosti
   Tailscale. Klepněte na ozubené kolo vpravo nahoře.

   <figure class="lz-app-step">
     <img src="/guide-assets/tailscale-android/android-2-settings.png" alt="Úvodní obrazovka Tailscale s tlačítkem Log in. Ozubené kolo vpravo nahoře je zvýrazněné." width="540" height="785" loading="lazy" />
     <figcaption>Nastavení otevřete ozubeným kolem, ne tlačítkem Log in.</figcaption>
   </figure>

4. V nastavení klepněte na **Accounts**.

   <figure class="lz-app-step">
     <img src="/guide-assets/tailscale-android/android-3-accounts.png" alt="Nastavení Tailscale. Položka Accounts nahoře je zvýrazněná." width="540" height="485" loading="lazy" />
   </figure>

5. Vpravo nahoře klepněte na tři tečky a zvolte **Use an alternate server**.

   <figure class="lz-app-step">
     <img src="/guide-assets/tailscale-android/android-4-alternate-server.png" alt="Obrazovka Accounts s otevřenou nabídkou. Položka Use an alternate server je zvýrazněná." width="540" height="385" loading="lazy" />
   </figure>

6. Do pole **Custom control server URL** zadejte adresu přihlašovacího
   serveru Organizace a klepněte na **Add account**.

   <figure class="lz-app-step">
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

Aplikace Tailscale pro Windows vlastní přihlašovací server v okně zadat
neumí (uvádí to dokumentace Tailscale). Ve Windows ho proto zadáte **jedním
řádkem ve Windows PowerShellu**. Je to jediný příkaz v tomto návodu. Obrázky
níže ukazují každé kliknutí, a když chcete, [nechte to na
agentovi](#nechte-to-na-agentovi).

1. Nainstalujte [Tailscale pro Windows](https://tailscale.com/download/windows)
   (Windows 10 nebo novější) a dokončete instalaci. V aplikaci Tailscale se
   **nepřihlašujte**: její tlačítko Log in vede na server společnosti
   Tailscale, ne do vaší Organizace.
2. Klikněte na **Start**, napište **PowerShell** a otevřete **Windows
   PowerShell**. **Spustit jako správce** nepotřebujete.

   <figure class="lz-app-step lz-app-step--wide">
     <img src="/guide-assets/tailscale-windows/windows-1-start-cs.png" alt="Ilustrační maketa: hledání ve Windows s napsaným PowerShell. Výsledek Windows PowerShell, Aplikace, je zvýrazněný; vpravo akce Otevřít a Spustit jako správce." width="1280" height="788" loading="lazy" />
     <figcaption>Ilustrační maketa, ne snímek obrazovky. Windows PowerShell otevřete obyčejným kliknutím.</figcaption>
   </figure>

3. Zkopírujte celý tento řádek. Místo `<přihlašovací server>` dejte
   přihlašovací server své Organizace, například
   `https://headscale.example.lazurio.io`:

   ```powershell
   & "C:\Program Files\Tailscale\tailscale.exe" login --login-server=<přihlašovací server>
   ```

   Vložte ho do okna PowerShellu klávesami **Ctrl+V** nebo pravým tlačítkem
   myši a stiskněte **Enter**. Znak `&` a uvozovky na začátku nechte: bez `&`
   PowerShell cestu v uvozovkách jen vypíše a Tailscale nespustí.

   <figure class="lz-app-step lz-app-step--wide">
     <img src="/guide-assets/tailscale-windows/windows-2-paste-cs.png" alt="Ilustrační maketa: okno Windows PowerShell s vloženým řádkem, který začíná znakem & a končí ukázkovou adresou https://headscale.example.lazurio.io." width="1280" height="486" loading="lazy" />
     <figcaption>Ilustrační maketa s ukázkovou adresou. Řádek se v okně může zalomit, to nevadí.</figcaption>
   </figure>

4. Okno napíše **To authenticate, visit:** a adresu, která začíná vaším
   přihlašovacím serverem. Podržte **Ctrl** a na adresu klikněte. Když se nic
   neotevře, označte celou adresu myší, pravým tlačítkem ji zkopírujte a vložte
   do adresního řádku prohlížeče. V okně nemačkejte **Ctrl+C**: bez označeného
   textu příkaz zastaví.

   <figure class="lz-app-step lz-app-step--wide">
     <img src="/guide-assets/tailscale-windows/windows-3-link-cs.png" alt="Ilustrační maketa: PowerShell ukazuje To authenticate, visit: a přihlašovací adresu na ukázkovém serveru. Adresa je zvýrazněná s nápovědou Podržte Ctrl a klikněte." width="1280" height="522" loading="lazy" />
     <figcaption>Ilustrační maketa. Vaše adresa bude pokaždé jiná.</figcaption>
   </figure>

5. V prohlížeči se otevře přihlášení Lazuria. Přihlaste se svým účtem Lazurio
   a po dokončení kartu prohlížeče zavřete. Okno PowerShellu mezitím nechte
   otevřené.
6. V PowerShellu se objeví **Success.** Okno pak můžete zavřít. Zařízení je
   v tailnetu vaší Organizace a čeká na schválení (viz [Co se stane
   potom](#co-se-stane-potom)).

   <figure class="lz-app-step lz-app-step--wide">
     <img src="/guide-assets/tailscale-windows/windows-4-success-cs.png" alt="Ilustrační maketa: po přihlášení PowerShell ukazuje Success. a nový řádek pro příkaz." width="1280" height="560" loading="lazy" />
     <figcaption>Ilustrační maketa. Success. znamená, že je přihlášení hotové, ne že je zařízení schválené.</figcaption>
   </figure>

Když PowerShell červeně odpoví, že výraz nezná (is not recognized), Tailscale
není nainstalovaný ve své obvyklé složce: nainstalujte ho (krok 1) a řádek
vložte znovu. Když jen zopakuje cestu v uvozovkách, chybí na začátku `&`.

Obrázky jsou ilustrační makety podle dokumentace Microsoftu a Tailscale
a podle hlášek ve zdrojovém kódu Tailscale; na skutečném počítači s Windows
jsme je zatím nepořídili.

#### Nechte to na agentovi

Když na tomto počítači s Windows pracujete s agentem (ChatGPT Desktop, Codex
nebo Claude), zkopírujte mu do nového chatu prompt níže a místo
`<přihlašovací server>` doplňte přihlašovací server své Organizace. Agent
řádek spustí, přečte adresu a řekne vám, kam kliknout. Přihlášení zůstává na
vás a zařízení agent schválit nemůže.

```text
Připoj tento počítač s Windows do tailnetu mé Organizace v Tailscale. Přihlašovací server Organizace je <přihlašovací server>.

1. Ověř, že je Tailscale nainstalovaný: existuje C:\Program Files\Tailscale\tailscale.exe. Když neexistuje, zastav se a řekni mi, ať ho nainstaluji z https://tailscale.com/download/windows. Sám ho neinstaluj.
2. V PowerShellu spusť přesně tento řádek, bez administrátorských práv, a tak, abys mohl číst jeho výstup, zatímco dál čeká (třeba v samostatném okně nebo na pozadí):
   & "C:\Program Files\Tailscale\tailscale.exe" login --login-server=<přihlašovací server>
3. Výstup napíše „To authenticate, visit:“ a adresu. Dej mi tu adresu jako klikací odkaz a jednou dvěma větami mi řekni: otevřete ji, přihlaste se svým účtem Lazurio a pak se vraťte do tohoto chatu. Přihlášení sám neotevírej, nevyplňuj ani nepotvrzuj a nikdy po mně nechtěj heslo ani kód.
4. Až výstup napíše „Success.“, řekni mi srozumitelně, že tento počítač je v tailnetu toho přihlašovacího serveru a čeká na schválení Adminem Organizace. Zjisti jméno tohoto počítače v tailnetu (tailscale status --json, Self.HostName) a řekni mi, ať ho pošlu Adminovi Organizace spolu se svým loginem.

Pravidla: nepoužívej auth key, neměň registr Windows ani zásady Tailscale, ostatní účty Tailscale na tomto počítači nech, jak jsou, Tailscale nevypínej a zařízení se nepokoušej schválit. Když něco selže, řekni mi, co okno napsalo, a zastav se.
```

## Jméno zařízení

Tailscale pojmenuje zařízení podle systému: počítač podle jeho názvu,
telefon obvykle jen podle výrobce nebo modelu. Aplikace Tailscale pro Android
nastavení jména nemá (ověřeno ve verzi 1.104.5) a dokumentace Tailscale
klikací nastavení jména neuvádí ani pro ostatní systémy. Na zařízení proto nic
nepřejmenovávejte a jméno, které chcete, napište Adminovi Organizace.
Podle něj pozná, které zařízení je vaše.

Jméno má tvar `<login>-<zařízení>`:

- `<login>` je váš login malými písmeny. Máte-li k účtu Lazurio propojený
  GitHub, je to váš GitHub login. Nemáte-li ho, použijte označení, které vám
  sdělí Admin Organizace.
- `<zařízení>` je krátké stálé označení, třeba `iphone`, `ipad`, `pixel`,
  `android`, `macbook` nebo `windows`. Zvolte ho jednou a používejte stejné
  ve všech tailnetech. Máte-li dvě zařízení stejného druhu, rozlište je
  natrvalo, třeba `macbook-air` a `macbook-pro`.
- Jen malá písmena, číslice a spojovníky, bez názvu Organizace.

Zařízení, které už je schválené, kvůli tomuto pravidlu nepřejmenovávejte.
Jméno je součástí jeho schválení a jeho změnu musí připravit Admin
Organizace. Jméno je
jen popis, přístup nedává.

## Co se stane potom

Po přihlášení je zařízení v tailnetu zaregistrované a **čeká na schválení
Adminem Organizace**. Podle pravidel Lazuria schvaluje každé zařízení pro svou
Organizaci Admin Organizace a schválení pro jednu Organizaci neotevře jinou. Jak se
schvaluje dnes, popisuje část [Pro Admina Organizace](#pro-admina-organizace).
Návod neslibuje, že zařízení, které ještě schválené není, je zablokované:
o tom rozhodují pravidla sítě Organizace, která spravuje Admin Organizace
s provozovatelem sítě.

**Poznáte, že čekáte:** tailnet Organizace je v Tailscale v seznamu účtů
a aplikace může ukazovat připojení, ale adresy Prostředí Organizace se
neotevřou.

**Poznáte, že jste schválení:** Admin Organizace vám dá vědět a adresy Prostředí, ke
kterým máte přístup, se otevřou. Ověřte to se zapnutým Tailscale a vybraným
tailnetem Organizace (návod [Připojení k Prostředí přes
Tailscale](/cs/guide/tailscale/)).

### Když se nic neděje

- **Přihlášení skončilo chybou.** Váš účet Lazurio zatím do tailnetu této
  Organizace nesmí, nebo jste zadali jinou adresu serveru. Zkontrolujte
  adresu a napište Adminovi Organizace.
- **Tailnet v seznamu účtů chybí.** Přihlášení se nedokončilo. Projděte
  postup znovu od zadání serveru.
- **Zařízení pořád čeká.** Admin Organizace o něm možná neví. Napište mu
  podle další části.
- **Zařízení se v tailnetu objevilo pod jiným jménem nebo s příponou `-1`.**
  To je běžné. Nic sami nemažte ani nepřihlašujte znovu a napište Adminovi
  Organizace.

### Požádejte Admina Organizace o schválení

Napište Adminovi Organizace a uveďte:

- svůj login;
- jméno zařízení, které chcete (`<login>-<zařízení>`);
- druh zařízení (iPhone, Android, Mac, Windows);
- adresu přihlašovacího serveru, kterou jste zadali;
- kdy jste se přihlásili.

Admin Organizace zařízení schválí jen tehdy, když ví, že o ně žádáte vy. Proto mu pište
kanálem, podle kterého vás pozná.

## Pro Admina Organizace

Každé zařízení schvaluje Admin Organizace. Schválení je vztah konkrétního
zařízení, účtu jeho vlastníka a vaší Organizace. Na tailnetu, který obsluhuje
víc Organizací, schvaluje každá Organizace zvlášť.

**Jak to funguje dnes (stav k 5. listopadu 2026).** Admin Organizace
schvaluje konkrétní zařízení a Prostředí, kam smí, v řízeném postupu
provozovatele sítě, který provozuje server, na kterém tailnet běží. Tato změna projde kontrolou
a nasazením a teprve potom zařízení dosáhne na nová místa. Několik čekajících
zařízení může jít v jedné dávce, proto může schválení trvat déle než pár
minut. Dashboard čekající zařízení zatím neukazuje: s člověkem se přímo
domluvte, které zařízení je jeho, a postup podání schválení si vyžádejte od
provozovatele sítě.

**Cíl.** Model přístupu Lazuria (rozhodnutí 0192) popisuje zaregistrované
zařízení, které nikam nedosáhne, dokud ho Admin Organizace neschválí v Dashboardu,
a službu na Conglomerate Hostu, která schválení provede během desítek sekund.
To se teprve staví (`issue-2026-11-03-002`). Návod netvrdí, že to už pro vaši
Organizaci běží.

Před schválením ověřte:

1. že o zařízení žádá jeho vlastník kanálem, kterému věříte;
2. že zařízení v tailnetu patří účtu tohoto člověka;
3. jméno zařízení. Zařízení přichází se jménem, které mu dal systém, a člověk
   ho v aplikaci Tailscale klikáním změnit nemůže. Domluvte se s ním, o které
   zařízení jde, a jméno, pod kterým ho schvalujete, mu sdělte. Jak jméno
   při schválení nastavit, tento návod zatím nepopisuje;
4. že jde o čerstvou registraci, kterou člověk opravdu udělal. Neznámé
   zařízení neschvalujte.

Člověk s Windows zadá přihlašovací server jedním řádkem v PowerShellu, nebo to
nechá na svém agentovi (viz [Windows](#windows)). Klikací cesta pro Windows
pořád chybí (`issue-2026-11-03-003`).

Když člověk zařízení ztratí nebo ho už nepoužívá, nechte schválení odebrat
stejnou cestou, jakou vzniklo. Pravidla, kdo smí schvalovat a kam
schválené zařízení dosáhne, se mění reviewovanou změnou konfigurace
Organizace, ne schválením jednoho zařízení.
