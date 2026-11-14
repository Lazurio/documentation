---
title: "Servery a Conglomerate Host"
description: "Konvence pro Organizaci, která provozuje vlastní servery: jména, rozsah adres tailnetu, jak Owneři spravují Conglomerate Host a kdy jsou Prostředí na serveru i jeho uživatel připravení."
stableId: lazurio-doc-servers-conglomerate-host
locale: cs
summary: "Jména serverů a Prostředí služeb, jeden IPv4 prefix na Conglomerate Host, správa Vlastníkem Organizace se jmenovitou identitou, přesnými granty a cestou obnovy a dva samostatné výsledky předání Prostředí na serveru."
updatedAt: "2026-11-14"
reviewedAt: "2026-11-02"
reviewOwner: Matej Suchanek
secondReviewOwner: Pablo AI
trustCritical: true
sourceRefs:
  - lazurio-decision-register-access-0245-0247
  - lazurio-root-operator-machine-access
  - lazurio-root-conglomerate-owner-administration
  - lazurio-root-hosted-machine-handover
  - lazurio-decision-register-gen4
  - lazurio-decision-register-admin-ai
  - lazurio-decision-0234-role-names
audience:
  - it-admin
  - agent
---

Tato stránka je pro Vlastníky Organizace, Adminy Organizace a IT Organizace, která pro Lazurio provozuje vlastní servery. **Conglomerate Host** je server, na kterém běží soukromá síť (Headscale) a trezor (Vaultwarden) pro Prostředí na serveru jedné nebo více Organizací.

Kde je níže pravidlo jen konvence, nic ho nekontroluje: nic neuděluje a kvůli němu se existující servery nepřejmenovávají ani nepřečíslují.

## Jména

- **Virtualizační host:** `<org>-proxmox-NN`, například `example-proxmox-01`. `<org>` je krátký štítek, který Vlastník Organizace zvolí jednou. Nemění se, když se změní GitHub login nebo DNS jméno Organizace, takže kdo spravuje víc Organizací, rozliší své hosty v konzoli poskytovatele, v SSH i v tailnetu. Číslování začíná `01` a smí přerůst dvě číslice. Je to konvence.
- **Prostředí služeb:** každý server Organizace má právě jedno `services-NN` s číslem svého serveru (`<org>-proxmox-01` má `services-01`). Je to Pracovní Prostředí jen pro Adminy Organizace (pro GEN4 to určuje rozhodnutí 0245, zatím nenasazené) a každá služba v něm běží ve vlastním kontejneru. Když mu nestačí výkon, zvětší se; druhé na tomtéž serveru nevzniká (rozhodnutí 0209).
- **Zařízení lidí v tailnetu:** `<login>-<zařízení>`, například `<login>-macbook`. `<login>` je štítek síťového uživatele člověka: u účtu propojeného s GitHubem jeho GitHub login malými písmeny, zmrazený, takže pozdější přejmenování na GitHubu síťového uživatele nepřejmenuje. `<zařízení>` je krátký štítek zvolený jednou a stejný ve všech tailnetech. Druhý, headless klient na tomtéž zařízení je `<login>-<zařízení>-cli` a Osobní Prostředí na serveru `<login>-personal-vm`. Jméno nastavuje majitel na zařízení samém. Jméno nic neuděluje.

## Rozsah adres tailnetu

- Každý Conglomerate Host dostane vlastní rozsah uvnitř `100.64.0.0/10`, který se nepřekrývá s žádným jiným Conglomerate téhož provozovatele (manuál GEN3 o přístupu mezi Prostředími jednoho člověka, viz Zdroje). Jinak by každý tailnet rozdával stejné adresy `100.64.0.x` a počítač toho, kdo je spravuje, by je nerozlišil.
- Provozovatel, který Conglomeraty zakládá, si vede seznam rozsahů, které přidělil, jako pomůcku pro sebe. Není to centrální autorita ani registr cizích sítí.
- Nový Conglomerate Host musí svůj rozsah určit při založení. Existující si rozsah ponechá, dokud ho nepřečísluje řízená migrace.

## Správa Conglomerate Hostu

Správa hostu se dotýká všech Organizací, které obsluhuje. Pravidla níže jsou standard: sám nic neuděluje a nedokazuje, že ho Organizace nasadila. Konkrétní účty, zařízení, klíče, síťové vazby a důkazy patří do infrastrukturního repozitáře Organizace, která host vlastní. Pro každého Vlastníka Organizace, který host spravuje, platí:

- **Vlastní cesta, vlastní klíče, schválená zařízení.** Host spravuje jeho držitel, nikdy role Admina Organizace (rozhodnutí 0245, cílový model; přechod není dokončený). Kde Organizace provozuje host na vlastní infrastruktuře, jak předpokládá tato stránka, je držitelem každý živý Vlastník Organizace, která host vlastní; kde servery provozuje Lazurio, je držitelem operátor Lazuria. Po schváleném onboardingu spravuje držitel host jen ze zařízení, která jsou pro správu výslovně schválená: ze svého osobního počítače výslovně povoleného pro správu. Osobní Prostředí není zařízení a takovým zdrojem není (rozhodnutí 0246).

  Pracovní Prostředí Admina Organizace, správní stanoviště, vede do Prostředí Organizace a nikdy do správy hostu ani serverů pod Prostředími (rozhodnutí 0247). Role Vlastníka Organizace sama nedává vstup do žádného Prostředí (rozhodnutí 0234).

  Telefon, Osobní Prostředí, Pracovní Prostředí ani pracovní laptop správu nedostanou, ani když jsou schválené pro jiný přístup. Vlastník Organizace používá vlastní jmenovitou identitu přes soukromou síť a nativní SSH a jeho klíče jdou odvolat jednotlivě. Cesta nikdy nezávisí na IP adrese, počítači, přihlášení ani soukromém klíči jiného Vlastníka Organizace nebo dodavatele a soukromý klíč zůstává na svém zařízení.
- **Roli dokazuje jen GitHub.** Členství v tailnetu, sdílený síťový uživatel, štítek Prostředí ani jméno serveru roli Vlastníka Organizace nedokazují. Rozhoduje živá role na GitHubu a přesná vazba zdroje na daného Vlastníka Organizace a přístup se nikdy nedává všem uzlům Organizace najednou.
- **Jen přesné granty.** Host má jmenovité SSH účty, přesné síťové granty a jen ta administrátorská práva, která práce potřebuje. Odpověď na navázané spojení neopravňuje otevřít spojení opačným směrem. Novou IP adresu nebo novou registraci zařízení opravuje schválená změna přesné vazby, nikdy širší grant.
- **Onboarding končí změnou, ne přihlášením.** Samotné funkční přihlášení přes SSH onboarding Vlastníka Organizace nedokončuje. Vlastník Organizace pod vlastním účtem umí:
  - přečíst stav sítě a konfiguraci, kterou potřebuje;
  - dostat se do infrastrukturního repozitáře Organizace;
  - navrhnout, ověřit a provést schválenou změnu běžným postupem nasazení s vlastními přístupy;
  - vysvětlit publikaci, review a obnovu a mít vlastní cestu k obnově.
- **Administrátorská práva neobcházejí postup.** Požadovaný stav zůstává v infrastrukturním repozitáři a každá změna prochází review a postupem nasazení, u Vlastníka Organizace stejně jako u agenta. Nezávislá kontrola může potřebovat dalšího oprávněného Kolegu, nikdy ale tajný údaj, který má jen dodavatel.
- **Odvolání je samostatný krok.** Když Vlastník Organizace odchází, mění roli nebo ztratí zařízení, odvolejte jeho granty a klíče a kde to jde, ukončete i živé relace. Zapište, jestli to proběhlo automaticky, nebo ručně. Role se kontroluje při nasazení přístupu, ne při každém přihlášení přes SSH.
- **Sdílený host má víc nájemců.** Kdo je Vlastníkem Organizace u jedné Organizace, nemá tím automaticky právo spravovat host jiné Organizace: schválení odpovídá vlastnictví hostu a celé jeho sdílené hranici. Správa nikdy neopravňuje číst cizí Personalspace.
- **Vzdálené ovládání sahá dál než síť.** Plné ovládání počítače člověka z Pracovního Prostředí může nepřímo zpřístupnit administrátorské přístupy toho počítače a síťové pravidlo proti přímé cestě to nezastaví. Rozsah vzdáleného ovládání držte vědomý a zdokumentovaný a neslibujte přísnou izolaci.
- **Nejdřív soukromá síť, záchrana poskytovatele pro nouzi.** Správa jde přes soukromou síť. Konzole poskytovatele a jeho záchranný režim jsou nouzová cesta. Než zavřete veřejnou záložní cestu přes SSH, ověřte, že funguje soukromý vstup, oprávnění k obnově u poskytovatele, identita hostu i návrat do běžného startu. Záchranný režim může přerušit sdílené služby, proto každou nouzovou změnu promítněte zpět do infrastrukturního repozitáře a jeho záznamů.
- **Nasazené znamená prokázané.** Infrastrukturní repozitář Organizace, která host vlastní, zaznamenává povolená zařízení a jejich vazbu na současné Vlastníky Organizace. Zaznamenává i nasazenou verzi, důkaz nasazení a oba druhy testu: skutečné přihlášení přes SSH a s administrátorskými právy z každého povoleného zdroje a odmítnuté spojení ze zdroje, který povolený není. Standard, plán, otevřený pull request a živé nasazení jsou čtyři různé stavy.

## Dva výsledky předání Prostředí na serveru

Toto je cílový kontrakt předání Prostředí na serveru a jeho implementace ještě není dokončená: běžící Prostředí se od něj může lišit. Co je nasazené, důkazy a pořadí oprav patří do infrastrukturního repozitáře vlastníka Prostředí. Předání má dva výsledky a každý se prokazuje zvlášť.

**Prostředí na serveru je připravené k předání**, když:

- jsou ověřené jeho prostředky, operační systém, identita, správa, síť a izolace;
- webový vstup má platný certifikát, správné DNS a funkční bránu;
- čisté Lazurio a základní pracovní vstup běží bez checkoutu Organizace, bez osobního GitHub tokenu a bez přihlášení uživatele k nástrojům AI;
- Lazurio ukazuje pravdivý prázdný stav a chybějící checkout nezpůsobí pád, automatické klonování ani přístup k jiné Organizaci;
- opakovaná instalace zachová identitu a existující pracovní data;
- záloha a obnova mají vlastní ověřený výsledek. Pokud pilot obnovu výslovně odloží, report to omezení uvede a obnovu za ověřenou neoznačí.

**Uživatel je připravený pracovat** v individuálním Prostředí, které má jednoho přiděleného uživatele, když:

- má za sebou vstup ze svého zařízení a přihlášení vlastním účtem do GitHubu (`gh`);
- má vybrané a nastavené Organizace, které potřebuje a ke kterým má přístup, každou jako samostatný checkout a hranici přístupu;
- své checkouty najde bez změny konfigurace hostingu a moduly přitom zůstávají v hranici své Organizace a živých práv;
- má nastavené vlastní nástroje, přihlášení a závislosti projektů;
- má ověřenou skutečnou práci. Úspěšné přihlášení na web nedokazuje SSH, přístup do Gitu, funkci každého modulu ani obnovu aplikace.

**Sdílené Týmové Prostředí** osobního uživatele nemá, a proto pro něj neplatí pravidlo individuálního Prostředí, kde se uživatel přihlásí vlastním účtem a připojí kteroukoli svou Organizaci. Na GitHubu pracuje přes aplikaci Lazurio for GitHub Organizace s omezeným rozsahem Organizace a Teamu, nikdy s osobním tokenem toho, kdo se přihlásil naposledy (rozhodnutí 0147). Ani instalace Lazuria tam nepotřebuje checkout dat Organizace a nastavení obsahu Teamu je samostatný krok pod identitou Teamu.

Čekání na přihlášení člověka je `onboarding pending`, ne porucha zřizování; název popisuje stav, není to hodnota v žádném systému. Report nikdy nesloučí infrastrukturu, základní Lazurio a přijetí uživatelem do jednoho zeleného políčka.

## Zdroje

- Lazurio: [rejstřík rozhodnutí](https://github.com/Lazurio/LazurioPlatform/blob/4d5ee62a963a0ae2fc98287f0072e739ff6d2cd8/docs/decision-register.md) (rozhodnutí 0147 a 0209; [rozhodnutí 0245](https://github.com/Lazurio/LazurioPlatform/blob/25c72bcf6428cdb321d26b8b8d792a526c97c20b/docs/decision-register.md#0245--who-is-who-in-an-organization-its-deployment-repo-holds-the-boundaries-of-trust-and-lazurio-auth-holds-their-use) pro Admina Organizace a držitele hostu, [rozhodnutí 0247](https://github.com/Lazurio/LazurioPlatform/blob/25c72bcf6428cdb321d26b8b8d792a526c97c20b/docs/decision-register.md#0247--entry-into-an-environment-and-its-record-normal-service-and-break-glass-entries-and-what-is-not-guaranteed) pro správní stanoviště a [rozhodnutí 0234](https://github.com/Lazurio/LazurioPlatform/blob/753cca123df45721c3c1395a16a3a0df9a04dbcd/docs/decision-register.md#0234--the-names-of-access-roles-one-vocabulary-for-every-text-screen-and-agent) pro názvy rolí; anglicky) a tři manuály GEN3: [přístupy mezi Prostředími jednoho uživatele](https://github.com/HumanAndMachines/Lazurio/blob/621d657a593fdca8b6c462ebe7fbec9d5d70a677/manual/operator-machine-access.md), plné znění rozhodnutí 0155 se jmény, Prostředím služeb a IPv4 rozsahy; [správa Conglomerate Hostu Ownery Organizace](https://github.com/HumanAndMachines/Lazurio/blob/621d657a593fdca8b6c462ebe7fbec9d5d70a677/manual/conglomerate-owner-administration.md); a [předání Prostředí na serveru a onboarding uživatele](https://github.com/HumanAndMachines/Lazurio/blob/621d657a593fdca8b6c462ebe7fbec9d5d70a677/manual/hosted-machine-handover.md) se dvěma samostatnými výsledky.
