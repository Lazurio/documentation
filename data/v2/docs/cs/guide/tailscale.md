---
title: "Připojení k Prostředí přes Tailscale"
description: "Zapněte Tailscale, vyberte správnou síť a ověřte, proč se adresa neotevírá."
stableId: lazurio-doc-guide-tailscale
locale: cs
summary: "Zapněte Tailscale, vyberte správnou síť a ověřte, proč se adresa neotevírá."
updatedAt: "2026-10-08"
reviewedAt: "2026-10-08"
reviewOwner: Matej Suchanek
secondReviewOwner: Pablo AI
trustCritical: true
sourceRefs:
  - lazurio-environment-network-decisions
  - lazurio-environment-access-model
  - lazurio-platform-decision-f41
  - lazurio-platform-release-v0-1-8-rc-41
  - headscale-project
  - tailscale-fast-user-switching
  - tailscale-install-windows
  - google-chrome-secure-dns
  - tailscale-android-private-dns-request
  - webkit-storage-cap
audience:
  - builder
  - decision-maker
  - it-admin
  - agent
---

Pokud se adresa Prostředí neotevírá, ověřte nejdřív připojení zařízení
do správné soukromé sítě. **Zapněte
Tailscale, vyberte tailnet, který Prostředí potřebuje, a otevřete adresu
znovu.** Stránka Lazuria **Zapni Tailscale** vás přesměruje automaticky,
jakmile Prostředí odpoví. Když se adresa ani pak neotevře, pokračujte
částí [Pořád to nejde?](#pořád-to-nejde)

## Proč Tailscale

**Tailnet** je soukromá síť zařízení propojených přes
[Tailscale](https://tailscale.com/). Aplikace Prostředí na serveru, třeba jeho
Launchpad, Chat nebo Automate, mají adresy, které fungují jen uvnitř tailnetu,
který je obsluhuje. Žádná veřejná cesta k nim nevede: mimo tento tailnet je
prohlížeč neotevře a adresu obvykle ani nenajde. Ukáže chybu, třeba „Tento web
není dostupný“.

K Prostředí tak vaše zařízení potřebuje tři věci:

1. zapnutou aplikaci Tailscale;
2. v ní vybraný správný tailnet;
3. přístup tohoto zařízení do tailnetu, který zařídí Admin vaší Organizace.

Lazurio provozuje své tailnety na
[Headscale](https://github.com/juanfont/headscale), open-source serveru, ke
kterému se aplikace Tailscale připojuje. Proto aplikace Tailscale takový
tailnet pojmenuje adresou jeho serveru, třeba `headscale.example.com`, a ne
názvem firmy. Přesný název, který potřebujete, ukazuje stránka Lazuria **Zapni
Tailscale**.

## Zapněte Tailscale a vyberte tailnet

### macOS

1. Klikněte na ikonu Tailscale v horní liště.
2. Zapněte přepínač **Tailscale**.
3. Najeďte na svůj účet a v seznamu vyberte tailnet.

### Windows

1. Klikněte pravým tlačítkem na ikonu Tailscale vpravo dole na hlavním
   panelu. Když ji nevidíte, klikněte nejdřív na šipku nahoru (**^**).
2. Najeďte na svůj účet a v seznamu vyberte tailnet.
3. Když Tailscale není připojený, zvolte **Connect**.

### iPhone a iPad

1. Otevřete aplikaci Tailscale.
2. Klepněte na obrázek svého účtu vpravo nahoře, pak na svůj účet a v seznamu
   vyberte tailnet.
3. Zapněte přepínač Tailscale.

### Android

1. Otevřete aplikaci Tailscale.
2. Klepněte na ikonu účtu vpravo nahoře, pak na svůj účet a v seznamu vyberte
   tailnet.
3. Zapněte přepínač Tailscale.

Když tailnet v seznamu není, zařízení se do něj ještě nepřipojilo. Pokračujte
částí [Pořád to nejde?](#pořád-to-nejde)

## Víc tailnetů

Pracujete-li pro víc Organizací, jejich Prostředí mohou být v různých
tailnetech. Aplikace Tailscale má na zařízení aktivní vždy jen jeden účet, takže
dokud je aktivní jeden tailnet, Prostředí jiného se neotevřou. Přepněte,
kdykoli mezi nimi přecházíte. Přepnutí nevyžaduje nové přihlášení, pokud klíči
zařízení pro daný tailnet nevypršela platnost.

## Pořád to nejde?

Kde si prohlížeč stránku Lazuria podržel (viz
[Kdy Lazurio ukáže vlastní stránku](#kdy-lazurio-ukáže-vlastní-stránku)), ukáže
ji pokaždé, když adresa není dostupná, ať je důvod jakýkoli, nejen při vypnutém
Tailscale. Se zapnutým Tailscale a správným tailnetem ověřte tyto příčiny
v tomto pořadí:

1. **Zařízení v tailnetu není, nebo ještě není schválené.** Když tailnet
   v seznamu účtů chybí, zařízení se do něj nikdy nepřipojilo. Když tam je a je
   aktivní, ale žádné Prostředí Organizace se neotevře, zařízení možná ještě
   nemá přístup. Požádejte Admina své Organizace, aby ho přidal nebo schválil.
   Schválený model přístupu Lazuria počítá s tím, že každé zařízení pro každou
   Organizaci schvaluje Admin (rozhodnutí 0192 ze 6. října 2026); jak se
   zařízení do tailnetu dostane dnes, se ale může mezi tailnety ještě lišit.
2. **Prostředí neodpovídá.** Když se jiná Prostředí ve stejném tailnetu
   otevřou, toto je možná zastavené nebo se restartuje. Počkejte pár minut
   a zkuste to znovu. Když se nevrátí, dejte vědět Adminovi jeho Organizace.
   U svého Osobního Prostředí na serveru se obraťte na podporu svého týmu.
3. **Prohlížeč používá vlastní zabezpečené DNS.** Prohlížeč může adresy
   vyhledávat u vlastního poskytovatele DNS místo vašeho zařízení. Ten jména
   tailnetu nezná. Když má Chrome v nastavení zabezpečeného DNS (Use secure
   DNS) vybraného vlastního poskytovatele, na běžné vyhledávání zařízení se
   nevrátí. Nastavení vypněte, nebo vyberte svého současného poskytovatele
   služeb. Jiné prohlížeče mají podobná nastavení.
4. **Android používá vlastní soukromé DNS.** Když je **Soukromé DNS** (Private
   DNS) nastavené na hostname poskytovatele, jména Tailscale nemusí fungovat;
   tento konflikt nahlásil Tailscale jeden z uživatelů ve veřejném issue. Pro
   vyzkoušení přepněte v nastavení sítě telefonu Soukromé DNS na **Vypnuto**
   nebo **Automaticky** a zkuste to znovu.
5. **Nejste připojení k internetu.** Tailscale potřebuje internet. Když se
   neotevírají ani jiné weby, opravte nejdřív připojení.

## Kdy Lazurio ukáže vlastní stránku

Jakmile v prohlížeči jednou otevřete Launchpad, Chat nebo Automate
Prostředí, které běží na Lazurio Platform v0.1.8-rc.41 nebo novější,
prohlížeč si pro tuto adresu podrží stránku Lazuria **Zapni Tailscale**. Když
pak adresa není dostupná, prohlížeč na téže adrese ukáže tuto
stránku místo vlastní chyby. Stránka jmenuje Prostředí, jeho Organizaci
a tailnet a sama na adresu pokračuje, jakmile adresa odpoví.

Vlastní chybu prohlížeče v těchto případech uvidíte i tak a postup výše platí
stejně:

- když Prostředí v prohlížeči otevíráte poprvé, a v anonymním okně;
- u aplikací modulů, které mají vlastní adresy;
- v Safari po sedmi dnech používání Safari bez interakce se stránkami
  Prostředí, kdy Safari uložená data webu smaže;
- po 30 dnech, kdy se prohlížeč k Prostředí nedostal. Stránka se pak sama
  odstraní, takže po přejmenovaném nebo zrušeném Prostředí nic nezůstane.

Stránka patří k vlastní adrese Prostředí a komunikuje jen s ní. Při každém
otevření Prostředí ověří, jestli nemá novou verzi, sama se aktualizuje
a odstraní se, jakmile ji Prostředí přestane nabízet. Lazurio Platform tuto
stránku přidala ve verzi v0.1.8-rc.41 (kandidát vydání z 8. října 2026).
Prostředí ji ukáže, jakmile běží na této nebo novější verzi.
