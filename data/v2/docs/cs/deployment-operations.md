---
title: "Nasazení a provoz"
description: "Jak připravit nasazení, určit správce a ověřit obnovu i odebrání přístupu."
stableId: lazurio-doc-deployment-operations
locale: cs
summary: "Jak připravit nasazení, určit správce a ověřit obnovu i odebrání přístupu."
updatedAt: "2026-10-28"
reviewedAt: "2026-10-28"
reviewOwner: Anna Blazickova
secondReviewOwner: Pablo AI
trustCritical: true
sourceRefs:
  - lazurio-readme
  - lazurio-architecture
  - lazurio-collaboration-model
  - lazurio-external-apps
  - lazurio-secret-custody
  - lazurio-platform-release-current
  - lazurio-platform-content-sync
  - lazurio-platform-recovery-current
audience:
  - it-admin
  - builder
  - agent
---

Lazurio může běžet na vašem počítači nebo v hostovaném Prostředí. Provozovatel spravuje instalovaný produkt, pracovní kopie a moduly. Sepište zařízení, repozitáře, AI nástroje, poskytovatele modelů a připojené
služby. U každé položky určete správce.

## Dostupné součásti a budoucí cíle

Výchozím bodem je Platform v0.1.14 z 27. října 2026. Před použitím návodu
ověřte instalovanou verzi a zapnuté služby.

| Součást | Dostupné chování | Co ověřit |
| --- | --- | --- |
| Instalované CLI a Apps | Jeden vydaný program s diagnostikou a generováním instrukcí pro agenty. | Podporovaný systém a architekturu, ověření vydání a spuštění. |
| Repozitáře Organizací a moduly | Samostatný verzovaný obsah; čisté deklarované kopie lze synchronizovat. | Oprávnění k repozitářům, deklarované moduly, sestavení a případné migrace dat. |
| Lokální adresy | Apps a moduly mohou naslouchat na loopbacku. Naslouchání na loopback adrese samo neověřuje identitu volajícího. | Vstup do hostovaného Prostředí nebo místní kontroly přístupu konkrétního nasazení. |
| Účet, hostované služby a Buddy | Samostatné služby s vlastní dostupností. | Provozovatele, identitu, síť, úložiště a podmínky služby. |

Instalovaný produkt pro každodenní práci nevyžaduje kopii zdrojového kódu Platformu.

## Součásti nasazení

1. **Zařízení uživatele:** počítač uživatele nebo hostované Prostředí s určeným vlastníkem a odpovědným uživatelem.
2. **Lokální root Lazuria:** rozhraní a spouštěcí prostředí nad povolenými
   pracovními kopiemi Organizací.
3. **Repozitář Organizace:** hranice jedné firmy, její konfigurace a sdílené
   autoritativní podklady.
4. **Workspace Moduly:** aplikace s vlastními technickými podmínkami,
   závislostmi, kontrolami a cílem nasazení.
5. **GitHub:** systém identit a oprávnění pro repozitáře, Teamy, historii
   kontrol a vynucování pravidel větví v dokumentovaném výchozím modelu.
6. **Klient a poskytovatel AI modelu:** jejich výběr závisí na konkrétním
   nasazení a každý z nich má vlastní obchodní a datové podmínky.
7. **Externí aplikace:** jednotlivě povolené MCP servery, nástroje příkazové
   řádky nebo řízené postupy v prohlížeči s oprávněními u daného poskytovatele.

Ne každý modul musí běžet na veřejném serveru. Některé jsou lokální nástroje,
jiné interní služby a další zpřístupňují veřejný web, například tuto
dokumentaci. O způsobu provozu a návratu k předchozí verzi se rozhoduje pro
každý modul samostatně.

## Postup zavedení

### 1. Vymezte Organizaci

Určete organizaci v GitHubu, repozitáře, Teamy, administrátory a vlastníka
procesu pro odebírání přístupů. Zároveň stanovte, která firemní data do
Organizace patří a která jsou z ní výslovně vyloučená.

### 2. Stanovte minimální zabezpečení zařízení

Zdokumentujte vlastnictví zařízení, šifrování, aktualizace, dohled nad
koncovými zařízeními, lokální zálohy, vzdálené smazání a reakci na incident.
Rozumným výchozím bodem je jedna Organizace na zařízení. Více Organizací na
jednom zařízení je vědomá výjimka uvnitř jedné domény důvěry, ne tvrdé oddělení
tenantů. I zařízení vlastněné uživatelem musí při práci s firemními daty
splňovat pravidla Organizace.
Přihlášení k poskytovatelům musí být samostatně pojmenovaná a odvolatelná.

### 3. Vyberte klienta a poskytovatele modelu

Zaznamenejte používaného klienta, poskytovatele modelu, typ účtu, způsob
přihlášení, pravidla pro zpracování a uchovávání dat, telemetrii a smluvního
vlastníka. Posouzení zopakujte při změně klienta, poskytovatele nebo typu účtu.

### 4. Povolte jen potřebné repozitáře a integrace

Začněte jedním jasně vymezeným scénářem. Uživatel má mít přístup pouze k
repozitářům a rozsahům oprávnění, které pro něj potřebuje. Postupujte podle
veřejného [standardu pro externí aplikace](https://github.com/HumanAndMachines/Lazurio/blob/b41fc7d01f748ebc4724535ce811ffceded38fdb/manual/external-app-integrations.md)
a vyzkoušejte také odebrání přístupu.

### 5. Nastavte schvalování výsledků

Pro každý repozitář nastavte ochranu větví, povinné kontroly a review. U zpráv,
infrastruktury, plateb, tajných údajů a nevratných operací pojmenujte skutečné
oprávnění nebo potvrzení na straně poskytovatele. Pokud žádné neexistuje,
uveďte, že schválení musí zajistit pracovní postup, nikoli software.

### 6. Proveďte přejímací testy

Ověřte běžný průběh úkolu, zamítnutý přístup k repozitáři, hranici přístupu
klienta k lokálním souborům, odvolání přihlašovacího údaje, selhání CI, návrat
k předchozí verzi, odebrání přístupů a eskalaci incidentu.
Výsledky testů uložte spolu s rozhodnutím o nasazení.

## Aktualizace a návrat k předchozí verzi

Příkaz `lazurio update` řeší instalovaný produkt i deklarovaný pracovní
obsah. Nejprve synchronizuje čisté primární kopie, obstará verzi Bunu předepsanou
změněnými moduly, sestaví změněné aplikace a potom aktualizuje Lazurio.
Jednotlivé části hlásí výsledky zvlášť: selhání jedné nedokazuje úspěch ani
selhání ostatních. Rozpracované repozitáře zachová. `lazurio organization sync`
spouští výslovně synchronizaci obsahu; synchronizace na pozadí sama neaktualizuje
produkt.

Aktualizace produktu postupují dopředu. Nezdařená příprava zachová aktivní
verzi; po aktivaci neexistuje `lazurio update rollback`. Pokud se Apps běžně
nespustí, použijte [Recovery mode](https://github.com/Lazurio/LazurioPlatform/blob/v0.1.14/docs/recovery-mode.md)
a opravu pojmenovanou diagnostikou nebo novější vydání. Návrat zdrojů či
nasazení modulu k ověřené verzi je samostatný postup daného modulu. Nesmí
obnovit odvolané přihlašovací údaje ani zastaralá oprávnění.

Přesný rozsah synchronizovaných repozitářů a operací uvádí [kontrakt synchronizace](https://github.com/Lazurio/LazurioPlatform/blob/v0.1.14/docs/content-sync.md).

## Otázky, které musí zodpovědět provozovatel

- Kdo spravuje koncová zařízení, Teamy v GitHubu, závislosti a externí integrace?
- Který poskytovatel modelu a jaké podmínky účtu platí?
- Kde běží jednotlivé moduly a ze kterých sítí jsou dostupné?
- Jaké auditní záznamy vznikají, jak dlouho se uchovávají a kdo řeší incidenty?
- Jak se lokální data a přihlašovací údaje zálohují, mažou a obnovují?
- Které součásti jsou stabilní, experimentální, volitelné nebo zatím pouze plánované?
- Kdo poskytuje podporu a jaká doba reakce je případně smluvně přislíbená?

Odpovědi uložte k podkladům pro schválení nasazení. Pokud některá chybí,
určete, kdo ji doplní, ještě před zahájením produkčního provozu.
