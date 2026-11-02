---
title: "Servery a Conglomerate Host"
description: "Konvence pro Organizaci, která provozuje vlastní servery: jména, rozsah adres tailnetu, jak Owneři spravují Conglomerate Host a kdy jsou Prostředí na serveru i jeho uživatel připravení."
stableId: lazurio-doc-servers-conglomerate-host
locale: cs
summary: "Jména serverů a Prostředí služeb, jeden IPv4 prefix na Conglomerate Host, správa Ownerem se jmenovitou identitou, přesnými granty a cestou obnovy a dva samostatné výsledky předání Prostředí na serveru."
updatedAt: "2026-11-02"
reviewedAt: "2026-11-02"
reviewOwner: Matej Suchanek
secondReviewOwner: Pablo AI
trustCritical: true
sourceRefs:
  - lazurio-root-operator-machine-access
  - lazurio-root-conglomerate-owner-administration
  - lazurio-root-hosted-machine-handover
  - lazurio-decision-register-gen4
audience:
  - it-admin
  - agent
---

Tato stránka je pro Ownery a IT Organizace, která pro Lazurio provozuje vlastní servery. **Conglomerate Host** je server, na kterém běží soukromá síť (Headscale) a trezor (Vaultwarden) pro Prostředí na serveru jedné nebo více Organizací.

Kde je níže pravidlo jen konvence, nic ho nekontroluje: nic neuděluje a kvůli němu se existující servery nepřejmenovávají ani nepřečíslují.

## Jména

- **Virtualizační host:** `<org>-proxmox-NN`, například `example-proxmox-01`. `<org>` je krátký štítek, který Owner zvolí jednou. Nemění se, když se změní GitHub login nebo DNS jméno Organizace, takže správce více Organizací rozliší své hosty v konzoli poskytovatele, v SSH i v tailnetu. Číslování začíná `01` a smí přerůst dvě číslice. Je to konvence.
- **Prostředí služeb:** každý server Organizace má právě jedno `services-NN` s číslem svého serveru (`<org>-proxmox-01` má `services-01`). Je to Pracovní Prostředí jen pro Ownery a Adminy a každá služba v něm běží ve vlastním kontejneru. Když mu nestačí výkon, zvětší se; druhé na tomtéž serveru nevzniká (rozhodnutí 0209).
- **Zařízení lidí v tailnetu:** `<login>-<zařízení>`, například `<login>-macbook`. `<login>` je síťový uživatel člověka, u účtu propojeného s GitHubem jeho GitHub login malými písmeny, a `<zařízení>` je krátký štítek zvolený jednou a stejný ve všech tailnetech. Druhý, headless klient na tomtéž zařízení je `<login>-<zařízení>-cli` a Osobní Prostředí na serveru `<login>-personal-vm`. Jméno nastavuje majitel na zařízení samém. Jméno nic neuděluje.

## Rozsah adres tailnetu

- Každý Conglomerate Host dostane vlastní rozsah uvnitř `100.64.0.0/10`, který se nepřekrývá s žádným jiným Conglomerate téhož provozovatele (rozhodnutí 0155). Jinak by každý tailnet rozdával stejné adresy `100.64.0.x` a počítač správce by je nerozlišil.
- Provozovatel, který Conglomeraty zakládá, si vede seznam rozsahů, které přidělil, jako pomůcku pro sebe. Není to centrální autorita ani registr cizích sítí.
- Nový Conglomerate Host musí svůj rozsah určit při založení. Existující si rozsah ponechá, dokud ho nepřečísluje řízená migrace.

## Správa Conglomerate Hostu

Správa hostu se dotýká všech Organizací, které obsluhuje. Pro každého Ownera platí:

- **Vlastní cesta, vlastní klíče.** Po schváleném onboardingu může host spravovat každý aktivní GitHub Owner Organizace, která ho vlastní. Používá vlastní jmenovitou identitu, ze zařízení výslovně povolených pro správu, přes soukromou síť a nativní SSH. Jeho klíče jdou odvolat jednotlivě. Cesta nikdy nezávisí na IP adrese, počítači, přihlášení ani soukromém klíči jiného Ownera nebo dodavatele a soukromý klíč zůstává na svém zařízení.
- **Roli dokazuje jen GitHub.** Členství v tailnetu, sdílený síťový uživatel, štítek Prostředí ani jméno serveru roli Ownera nedokazují. Rozhoduje živá role na GitHubu a přesná vazba zařízení na daného Ownera. Telefon ani Pracovní Prostředí samy správu nezískají. Výjimkou je jmenované Pracovní Prostředí Ownera (rozhodnutí 0202).
- **Jen přesné granty.** Host má jmenovité SSH účty, přesné síťové granty a jen ta správcovská práva, která práce potřebuje. Odpověď na navázané spojení neopravňuje otevřít spojení opačným směrem. Novou IP adresu nebo novou registraci zařízení opravuje schválená změna přesné vazby, nikdy širší grant.
- **Onboarding končí změnou, ne přihlášením.** Samotné funkční přihlášení přes SSH onboarding Ownera nedokončuje. Owner pod vlastním účtem umí:
  - přečíst stav sítě a konfiguraci, kterou potřebuje;
  - dostat se do infrastrukturního repozitáře Organizace;
  - navrhnout, ověřit a provést schválenou změnu běžným postupem nasazení s vlastními přístupy;
  - vysvětlit publikaci, review a obnovu a mít vlastní cestu k obnově.
- **Správcovská práva neobcházejí postup.** Požadovaný stav zůstává v infrastrukturním repozitáři a každá změna prochází review a postupem nasazení, u Ownera stejně jako u agenta. Nezávislá kontrola může potřebovat dalšího oprávněného Kolegu, nikdy ale tajný údaj, který má jen dodavatel.
- **Odvolání je samostatný krok.** Když Owner odchází, mění roli nebo ztratí zařízení, odvolejte jeho granty a klíče a kde to jde, ukončete i živé relace. Zapište, jestli to proběhlo automaticky, nebo ručně. Role se kontroluje při nasazení přístupu, ne při každém přihlášení přes SSH.
- **Sdílený host má víc nájemců.** Owner jedné Organizace nemá automaticky právo spravovat host jiné Organizace: schválení odpovídá vlastnictví hostu a celé jeho sdílené hranici. Správa nikdy neopravňuje číst cizí Personalspace.
- **Vzdálené ovládání sahá dál než síť.** Plné ovládání počítače člověka z Pracovního Prostředí může nepřímo zpřístupnit správcovské přístupy toho počítače a síťové pravidlo proti přímé cestě to nezastaví. Rozsah vzdáleného ovládání držte vědomý a zdokumentovaný a neslibujte přísnou izolaci.
- **Nejdřív soukromá síť, záchrana poskytovatele pro nouzi.** Správa jde přes soukromou síť. Konzole poskytovatele a jeho záchranný režim jsou nouzová cesta. Než zavřete veřejnou záložní cestu přes SSH, ověřte, že funguje soukromý vstup, oprávnění k obnově u poskytovatele, identita hostu i návrat do běžného startu. Záchranný režim může přerušit sdílené služby, proto každou nouzovou změnu promítněte zpět do infrastrukturního repozitáře a jeho záznamů.
- **Nasazené znamená prokázané.** Infrastrukturní repozitář vlastníka hostu zaznamenává povolená zařízení a jejich vazbu na současné Ownery. Zaznamenává i nasazenou verzi, důkaz nasazení a oba druhy testu: skutečné přihlášení přes SSH a se správcovskými právy z každého povoleného zdroje a odmítnuté spojení ze zdroje, který povolený není. Standard, plán, otevřený pull request a živé nasazení jsou čtyři různé stavy.

## Dva výsledky předání Prostředí na serveru

Předání Prostředí na serveru má dva výsledky a každý se prokazuje zvlášť.

**Prostředí na serveru je připravené k předání**, když:

- jsou ověřené jeho prostředky, operační systém, identita, správa, síť a izolace;
- webový vstup má platný certifikát, správné DNS a funkční bránu;
- čisté Lazurio a základní pracovní vstup běží bez checkoutu Organizace, bez osobního GitHub tokenu a bez přihlášení uživatele k nástrojům AI;
- Lazurio ukazuje pravdivý prázdný stav a chybějící checkout nezpůsobí pád, automatické klonování ani přístup k jiné Organizaci;
- opakovaná instalace zachová identitu a existující pracovní data;
- záloha a obnova mají vlastní ověřený výsledek. Pokud pilot obnovu výslovně odloží, report to omezení uvede a obnovu za ověřenou neoznačí.

**Uživatel je připravený pracovat**, když:

- má za sebou vstup ze svého zařízení a přihlášení vlastním GitHub účtem;
- má vybrané a nastavené Organizace, které potřebuje;
- své checkouty najde bez změny konfigurace hostingu a moduly přitom zůstávají v hranici své Organizace a živých práv;
- má nastavené vlastní nástroje, přihlášení a závislosti projektů;
- má ověřenou skutečnou práci. Úspěšné přihlášení na web nedokazuje SSH, přístup do Gitu, funkci každého modulu ani obnovu aplikace.

Čekání na přihlášení člověka je `onboarding pending`, ne porucha zřizování. Report nikdy nesloučí infrastrukturu, základní Lazurio a přijetí uživatelem do jednoho zeleného políčka.

## Zdroje

- Lazurio: [rejstřík rozhodnutí](https://github.com/Lazurio/LazurioPlatform/blob/4d5ee62a963a0ae2fc98287f0072e739ff6d2cd8/docs/decision-register.md) (rozhodnutí 0155, 0202 a 0209, anglicky) a tři manuály GEN3: [přístupy mezi Prostředími jednoho uživatele](https://github.com/HumanAndMachines/Lazurio/blob/621d657a593fdca8b6c462ebe7fbec9d5d70a677/manual/operator-machine-access.md), plné znění rozhodnutí 0155 se jmény, Prostředím služeb a IPv4 rozsahy; [správa Conglomerate Hostu Ownery Organizace](https://github.com/HumanAndMachines/Lazurio/blob/621d657a593fdca8b6c462ebe7fbec9d5d70a677/manual/conglomerate-owner-administration.md); a [předání Prostředí na serveru a onboarding uživatele](https://github.com/HumanAndMachines/Lazurio/blob/621d657a593fdca8b6c462ebe7fbec9d5d70a677/manual/hosted-machine-handover.md) se dvěma samostatnými výsledky.
