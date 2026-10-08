---
title: Připojení k Environmentu přes Tailscale
description: Co dělat, když se adresa Environmentu neotevře, jak na macOS, Windows, iPhonu a Androidu zapnout Tailscale a vybrat správný tailnet a co ověřit dál.
stableId: lazurio-doc-guide-tailscale
locale: cs
summary: Adresa Remote Environmentu se otevře jen v tailnetu, který ji obsluhuje. Zapněte Tailscale, vyberte tailnet, který jmenuje stránka Lazuria, a adresa sama pokračuje. Když se ani pak neotevře, ověřte schválení zařízení, samotný Environment, vlastní zabezpečené DNS prohlížeče a připojení k internetu.
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

Když se adresa Environmentu neotevře, vaše zařízení není připojené do
soukromé sítě, ve které Environment je. **Zapněte Tailscale a vyberte tailnet,
který Environment potřebuje.** Adresa se pak otevře. Ukazuje-li prohlížeč
stránku Lazuria **Zapni Tailscale**, ta pokračuje sama.

## Proč Tailscale

**Tailnet** je soukromá síť zařízení propojených přes
[Tailscale](https://tailscale.com/). Aplikace Remote Environmentu, třeba jeho
Launchpad, Chat nebo Automate, mají adresy, které fungují jen uvnitř tailnetu,
který je obsluhuje. Žádná veřejná cesta k nim nevede, takže mimo tento tailnet
prohlížeč adresu ani nenajde. Ukáže chybu, třeba „Tento web není dostupný“.

K Environmentu tak vaše zařízení potřebuje tři věci:

1. zapnutou aplikaci Tailscale;
2. v ní vybraný správný tailnet;
3. schválení tohoto zařízení Adminem.

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

Pracujete-li pro víc Organizací, jejich Environmenty mohou být v různých
tailnetech. Aplikace Tailscale má na zařízení aktivní vždy jen jeden účet, takže
dokud je aktivní jeden tailnet, Environmenty jiného se neotevřou. Přepněte,
kdykoli mezi nimi přecházíte. Přepnutí nevyžaduje nové přihlášení, pokud klíči
zařízení pro daný tailnet nevypršela platnost.

## Pořád to nejde?

Stránka Lazuria se ukáže pokaždé, když adresa není dostupná, ať je důvod
jakýkoli. Se zapnutým Tailscale a správným tailnetem ověřte tyto příčiny
v tomto pořadí:

1. **Zařízení v tailnetu není, nebo ještě není schválené.** Když tailnet
   v seznamu účtů chybí, zařízení se do něj nikdy nepřipojilo. Když tam je a je
   aktivní, ale žádný Environment Organizace se neotevře, zařízení možná ještě
   čeká na schválení. Každé zařízení musí schválit Admin, než dosáhne na
   Environmenty Organizace. Obraťte se na Admina své Organizace.
2. **Environment neodpovídá.** Když se jiné Environmenty ve stejném tailnetu
   otevřou, tento je možná zastavený nebo se restartuje. Počkejte pár minut
   a zkuste to znovu. Když se nevrátí, dejte vědět Adminovi jeho Organizace.
   U svého osobního Remote Environmentu se obraťte na podporu svého týmu.
3. **Prohlížeč používá vlastní zabezpečené DNS.** Prohlížeč může adresy
   vyhledávat u vlastního poskytovatele DNS místo vašeho zařízení. Ten jména
   tailnetu nezná. Když má Chrome v nastavení zabezpečeného DNS (Use secure
   DNS) vybraného vlastního poskytovatele, na běžné vyhledávání zařízení se
   nevrátí. Nastavení vypněte, nebo vyberte svého současného poskytovatele
   služeb. Jiné prohlížeče mají podobná nastavení.
4. **Android používá vlastní soukromé DNS.** Když je **Soukromé DNS** (Private
   DNS) nastavené na hostname poskytovatele, jména Tailscale nemusí fungovat.
   Tento konflikt je známý a nahlášený Tailscale. V nastavení sítě telefonu
   přepněte Soukromé DNS na **Vypnuto** nebo **Automaticky**.
5. **Nejste připojení k internetu.** Tailscale potřebuje internet. Když se
   neotevírají ani jiné weby, opravte nejdřív připojení.

## Kdy Lazurio ukáže vlastní stránku

Jakmile v prohlížeči jednou otevřete Launchpad, Chat nebo Automate
Environmentu, prohlížeč si pro tuto adresu podrží stránku Lazuria **Zapni
Tailscale**. Když pak adresa není dostupná, prohlížeč na téže adrese ukáže tuto
stránku místo vlastní chyby. Stránka jmenuje Environment, jeho Organizaci
a tailnet a sama na adresu pokračuje, jakmile adresa odpoví.

Vlastní chybu prohlížeče v těchto případech uvidíte i tak a postup výše platí
stejně:

- když Environment v prohlížeči otevíráte poprvé, a v anonymním okně;
- u aplikací modulů, které mají vlastní adresy;
- v Safari po sedmi dnech používání Safari bez návštěvy, kdy Safari uložená
  data webu smaže;
- po 30 dnech, kdy se prohlížeč k Environmentu nedostal. Stránka se pak sama
  odstraní, takže po přejmenovaném nebo zrušeném Environmentu nic nezůstane.

Stránka patří k vlastní adrese Environmentu a komunikuje jen s ní. Při každém
otevření Environmentu ověří, jestli nemá novou verzi, sama se aktualizuje
a odstraní se, jakmile ji Environment přestane nabízet. Lazurio Platform tuto
stránku přidala ve verzi v0.1.8-rc.41 (kandidát vydání z 8. října 2026).
Environment ji ukáže, jakmile běží na této nebo novější verzi.
