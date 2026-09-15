---
title: Lazurio a Microsoft Copilot
description: Věcné srovnání dvou řešení, která využívají AI při práci, ale liší se účelem i způsobem správy.
stableId: lazurio-doc-copilot-comparison
locale: cs
summary: Věcné srovnání Lazuria a Microsoft Copilotu podle účelu, kontextu, oprávnění, provádění práce, rozšiřitelnosti, správy a nasazení.
updatedAt: "2026-09-15"
reviewedAt: "2026-09-15"
reviewOwner: Matej Suchanek
secondReviewOwner: Pablo AI
trustCritical: true
sourceRefs:
  - lazurio-readme
  - lazurio-architecture
  - lazurio-collaboration-model
  - lazurio-external-apps
  - microsoft-copilot-architecture
  - microsoft-copilot-data-protection
  - microsoft-copilot-privacy
  - microsoft-copilot-requirements
  - microsoft-copilot-extensibility
audience:
  - it-admin
  - decision-maker
  - agent
---

Volba záleží na tom, jakou práci chcete s AI dělat a kdo ji bude spravovat.
Microsoft Copilot pomáhá především v Microsoft 365. Lazurio se zaměřuje na
práci nad firemními repozitáři a propojenými nástroji, včetně kontroly změn
a jejich schvalování. V jedné firmě se mohou doplňovat.

V obou případech záleží na oprávněních. Copilot používá pracovní data dostupná
přihlášenému uživateli Microsoft 365. Agent v Lazuriu pracuje s vybranými
repozitáři a nástroji, ke kterým má skutečný přístup.

Na této stránce používáme obecné označení „Microsoft Copilot“, přestože
odkazovaná dokumentace dodavatele místy mluví konkrétně o produktu „Microsoft
365 Copilot“. Údaje o produktech Microsoftu vycházejí z aktuální dokumentace
Microsoft Learn. Popis Lazuria vychází z jeho veřejných zdrojů; závěry a
doporučení jsou naším hodnocením.

## Hlavní rozdíly

| Oblast | Microsoft Copilot | Lazurio |
| --- | --- | --- |
| Hlavní účel | Pomoc s prací v aplikacích a službách Microsoft 365. | Řízená práce lidí a AI agentů nad verzovanými firemními podklady a nástroji. |
| Běžně dostupný kontext | Microsoft Graph a obsah Microsoft 365, ke kterému má uživatel oprávnění; další zdroje lze připojit pomocí agentů a konektorů. | Vybrané repozitáře Organizace, lokální pracovní prostředí a jednotlivě schválené externí nástroje. |
| Oprávnění | Vycházejí z identity a oprávnění přihlášeného uživatele v Microsoft 365 a z pravidel služby. | Vycházejí z oprávnění přihlášeného Principála v GitHubu a dalších systémech. Samotné zadání žádná práva neuděluje. |
| Typický výstup | Odpověď, souhrn, návrh nebo akce v aplikacích Microsoftu a v prostředích Copilotu. | Zkontrolovatelná změna, plán, znalostní podklad, aplikace nebo akce připravená k výslovnému schválení. |
| Správa | Cloudová služba spravovaná Microsoftem, doplněná o licence, Entra, Purview a administraci Microsoft 365. | Git repozitáře vlastněné Organizací, její zařízení, pravidla Modulů a samostatná správa každého připojeného poskytovatele. |
| Rozšíření | Agenti Microsoftu, konektory Microsoft Graph, Copilot API a SDK. | Workspace Moduly, připravené role pro agenty, MCP servery, oficiální nástroje příkazové řádky a řízené postupy v prohlížeči. |
| Nasazení | Cloudová služba Microsoftu s publikovanými požadavky na tenant. | Konkrétní podobu nasazení volí každá Organizace. Veřejně popsaný model vychází z lokálních repozitářů a samostatně nasazovaných Modulů. |
| Kdy dává největší smysl | Když je většina kancelářské a znalostní práce soustředěná v Microsoft 365. | Když práce prochází více repozitáři nebo nástroji a má zůstat verzovaná, testovatelná a výslovně schvalovaná. |

Microsoft uvádí, že Copilot pracuje uvnitř hranice služby Microsoft 365,
využívá Microsoft Graph a uživateli zpřístupňuje jen data, ke kterým má daný
uživatel oprávnění. Podrobnosti najdete v [přehledu architektury Microsoft
365 Copilotu](https://learn.microsoft.com/en-us/microsoft-365/copilot/microsoft-365-copilot-architecture)
a na stránce věnované [ochraně dat a auditu](https://learn.microsoft.com/en-us/microsoft-365/copilot/microsoft-365-copilot-architecture-data-protection-auditing).

Veřejná pravidla Lazuria určují GitHub jako autoritu pro přístup k
repozitářům, oddělují jednotlivé Organizace a považují výstup agenta za návrh,
dokud jej oprávněná osoba neschválí. Viz [pravidla spolupráce](https://github.com/HumanAndMachines/Lazurio/blob/3c5bda5d54c5556a0e54f3c339d988aa911fda60/AGENTS.md)
a [architekturu Lazuria](https://github.com/HumanAndMachines/Lazurio/blob/3c5bda5d54c5556a0e54f3c339d988aa911fda60/ARCHITECTURE.md).

## Data a soukromí

Microsoft uvádí, že výzvy, odpovědi a data z Microsoft Graphu použitá
Microsoft 365 Copilotem neslouží k trénování jeho základních modelů. Zároveň
popisuje ukládání historie interakcí, možnosti správy pomocí Microsoft Purview
a potřebu samostatně posoudit agenty, konektory a poskytovatele modelů třetích
stran. Přesné a aktuální podmínky jsou uvedené v dokumentaci Microsoftu k
[ochraně soukromí a bezpečnosti](https://learn.microsoft.com/en-us/microsoft-365/copilot/microsoft-365-copilot-privacy).

U Lazuria nelze stejné tvrzení vztáhnout na všechny instalace, protože není
vázané na jediný účet ani jediného poskytovatele AI. Datové toky závisejí na
zvoleném klientovi, poskytovateli modelu, oprávněních Organizace a připojených
integracích. Před schválením je proto nutné vytvořit seznam poskytovatelů a
rozsahů oprávnění pro konkrétní nasazení. Možnost volby přináší větší
přizpůsobitelnost, ale také větší odpovědnost za správné nastavení.

## Správa a technické předpoklady

Microsoft zveřejňuje požadavky na tenant, například podporované licence, účty
Microsoft Entra ID, aktualizační kanály a síťové adresy. V rámci přípravy
doporučuje věnovat pozornost také SharePointu a Microsoft Purview. Aktuální
seznam uvádí stránka s [požadavky Microsoft 365 Copilotu](https://learn.microsoft.com/en-us/microsoft-365/copilot/microsoft-365-copilot-minimum-requirements).

U Lazuria musí organizace spravovat vlastní strukturu v GitHubu, požadavky na
koncová zařízení, zvoleného poskytovatele AI, pravidla repozitářů a zapnuté
integrace. Získává tím přímější kontrolu nad pracovními podklady a schvalováním
výsledků, ale více provozních rozhodnutí zůstává na ní.

## Rozšiřitelnost

Microsoft Copilot lze rozšiřovat pomocí agentů, konektorů Microsoft Graph,
Copilot API a SDK. Možnosti popisuje [dokumentace k rozšiřitelnosti](https://learn.microsoft.com/en-us/microsoft-365/copilot/extensibility/).
Tato cesta je přirozená, pokud má pracovní postup zůstat uvnitř produktového a
správního prostředí Microsoftu.

Lazurio se rozšiřuje pomocí Workspace Modulů a samostatně vymezených integrací.
Veřejný [standard pro externí aplikace](https://github.com/HumanAndMachines/Lazurio/blob/3c5bda5d54c5556a0e54f3c339d988aa911fda60/manual/external-app-integrations.md)
upřednostňuje oficiální MCP servery nebo nástroje příkazové řádky a samostatně
odvolatelné identity pro jednotlivá zařízení. To se hodí tam, kde práce
vychází z repozitářů, prochází více službami nebo vyžaduje vlastní testy a
schválení.

## Které řešení zvolit?

### Microsoft Copilot je přirozenější volbou, pokud

- většina důležité práce probíhá v Outlooku, Teams, Wordu, Excelu, PowerPointu
  a SharePointu;
- oprávnění a správa identit v tenantovi Microsoft 365 jsou dobře nastavené;
- chcete službu spravovanou dodavatelem s administračními a kontrolními
  nástroji Microsoftu;
- vlastní pracovní postupy mohou zůstat v ekosystému agentů a konektorů
  Microsoftu.

### Lazurio je přirozenější volbou, pokud

- výsledkem má být zkontrolovaná změna repozitáře, Modul, provozní plán nebo
  trvalý firemní podklad;
- práce prochází GitHubem, lokálními zdrojovými podklady a více službami mimo
  Microsoft;
- potřebujete důsledně oddělit firmy a výslovně schvalovat zveřejnění nebo
  nasazení výsledku;
- organizace je připravená spravovat zařízení, repozitáře, poskytovatele a
  integrace.

### Obě řešení se mohou doplňovat

Microsoft Copilot může sloužit jako asistent pro práci v Microsoft 365,
zatímco Lazurio řídí verzované změny a práci napříč dalšími nástroji.
Odpovědnosti a přihlašovací údaje je nutné držet odděleně. Schválení ani
datové hranice jednoho řešení se automaticky nepřenášejí do druhého.

## Závěr

Vyzkoušejte obě možnosti na konkrétním úkolu. Vedle kvality výsledku porovnejte
potřebné přístupy, kontrolu změn a čas na správu. Pokud pracujete hlavně
v Microsoft 365, začněte Copilotem. Pokud potřebujete verzovat a schvalovat
práci napříč repozitáři a nástroji, vyzkoušejte Lazurio.
