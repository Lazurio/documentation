---
title: "Bezpečnost a podklady k ověření"
description: "Veřejné zdroje k produktovým a bezpečnostním tvrzením a hranice jejich platnosti."
stableId: lazurio-doc-public-evidence
locale: cs
summary: "Veřejné zdroje k produktovým a bezpečnostním tvrzením a hranice jejich platnosti."
updatedAt: "2026-10-28"
reviewedAt: "2026-10-28"
reviewOwner: Anna Blazickova
secondReviewOwner: Pablo AI
trustCritical: true
sourceRefs:
  - lazurio-readme
  - lazurio-license
  - lazurio-architecture
  - lazurio-collaboration-model
  - lazurio-external-apps-current
  - lazurio-platform-release-current
  - lazurio-platform-integrations-current
  - lazurio-platform-content-sync
  - lazurio-platform-vault-current
  - lazurio-platform-chatgpt-apps-main
audience:
  - it-admin
  - decision-maker
  - builder
  - agent
---

Tato stránka vysvětluje veřejné podklady k současnému produktu. Vychází
z **Platformu v0.1.14, vydaného 27. října 2026**. Zdrojový kontrakt dokládá
návrh a implementaci funkce. Sám nepotvrzuje její zapnutí ani nezávislý audit
konkrétního nasazení.

## Podoba produktu a jeho zralost

[Vydání](https://github.com/Lazurio/LazurioPlatform/releases/tag/v0.1.14)
obsahuje instalovatelné CLI a Apps. [README](https://github.com/Lazurio/LazurioPlatform/blob/v0.1.14/README.md)
popisuje instalovaný produkt a součást, která připravuje instrukce v pracovní
složce Lazuria. Uživatel ke každodenní práci nepotřebuje kopii zdrojového kódu
Platformu. Volitelné služby účtu a spravovaného hostingu mají vlastní podmínky.
Označené vydání samo nepřislibuje certifikaci, podporu ani SLA.

Současný Platform má dostupný zdrojový kód pod [Elastic License 2.0](https://github.com/Lazurio/LazurioPlatform/blob/v0.1.14/LICENSE),
nejde o open source podle OSI. **Po dvou letech automaticky nepřechází pod Apache.**
Osobní a interní firemní použití dovoluje za podmínek licence. Nabízet třetím
stranám hostovanou či spravovanou službu s podstatnou částí jeho funkcí vyžaduje
samostatnou dohodu. Není to zákaz veškerého hostingu.

[Vysvětlení licence](https://github.com/Lazurio/LazurioPlatform/blob/v0.1.14/docs/licensing.md)
rozlišuje vlastní nový kód, výjimku MIT pro kontrakt prohlížeče, cizí součásti,
šablony a volitelné neveřejné služby. Generátor nemění licenci obsahu, který
vytvoří uživatel. Podmínky FSL staršího zdrojového kódu Lazuria platí pro tento
historický kód; nejsou současnou licencí Platformu. Poskytovatelem licence
současného Platformu je Human and Machine s.r.o.

## Identita a oprávnění

Agent používá identitu a nástroje dostupné v Prostředí. Instrukce nevytvářejí
oprávnění k repozitáři ani poskytovateli. Ověřte přihlášený účet a jeho živý
přístup. GitHub určuje možnosti práce s repozitáři, operační systém a připojené
služby přístup ke svým prostředkům.

Nový model účtu a vstupu do Prostředí má vlastní podmínky zavedení. Schválený
návrh přístupů není důkazem, že na něj přešla každá starší instalace.

## Hranice zařízení a Organizace

Repozitáře a oprávnění Organizace oddělují firemní práci. Složky na jednom
zařízení ale nejsou oddělené operační systémy: proces se stejným přístupem
k souborům může číst napříč nimi. Kde kompromitace nesmí zasáhnout jinou
Organizaci, použijte oddělená zařízení nebo rovnocennou infrastrukturu.

Osobní Workspace patří jednomu uživateli v Osobním Prostředí. Firemní podklady,
které potřebují kolegové, patří do povoleného zdroje Organizace. Samotný název
složky není kryptografické omezení přístupu.

## Návrh a zveřejnění

Agent připravuje upravitelnou práci, o Publikaci rozhoduje oprávněný uživatel.
Už odeslání větve ke kontrole přenese její obsah do GitHubu. Hlavní větev mohou
chránit pravidla větví, kontroly, review a právo sloučit změnu. Také návrh
uložený u poskytovatele může přenášet data před odesláním zprávy nebo uvedením
změny v účinnost. Ověřte skutečné kontroly každého poskytovatele.

## Externí aplikace a přihlašovací údaje

[Vydaný integrační kontrakt](https://github.com/Lazurio/LazurioPlatform/blob/v0.1.14/docs/integrations.md)
zavádí jeden katalog v Apps → Integrace. Agent zjistí stejné nastavené cesty
příkazem `lazurio integrations list --json`. Aplikace připojuje uživatel na
jejich kartách; agent připojení nezahajuje. Vlastní MCP server patří na výslovný
pokyn uživatele do Executoru. Nastavení → Nástroje dál spravuje nástroje CLI.

Executor umí některá volání pozastavit, například výslovně destruktivně
popsané MCP nástroje a zápisy přes API. Ve výchozím režimu `model` ale
**pokračování potvrzuje agent**. Není to obecná záruka souhlasu člověka.
Přímé řídicí API a jiné cesty přes CLI nejsou automaticky pokryté. Podrobnosti
uvádí [kontroly integrací](/cs/environment-app-connections/).

Composio lze používat pouze podle pravidel daného Prostředí. Uchovává
přihlašovací údaje a zpracovává obsah volání. Hranice účtů a projektů,
uchovávání logů i podmínky Zero Data Retention vysvětluje stejná stránka.
Samostatné zařízení samo nedokládá oddělený účet Composia.

[Aktuální integrační standard](https://github.com/HumanAndMachines/Lazurio/blob/b41fc7d01f748ebc4724535ce811ffceded38fdb/manual/external-app-integrations.md)
zahrnuje také schválené pravidlo aplikací z ChatGPT z 27. října. Jeho technická
implementace je novější než v0.1.14; pravidlo a instalované vynucování se musí
rozlišovat. Již existující konektor není obecnou výjimkou uvnitř Prostředí.

## Lokální a hostované služby

Apps a spustitelné moduly mohou používat lokální loopback adresy. Samotný
loopback neověřuje volajícího. Vstup do hostovaného Prostředí, síťovou
dostupnost a oprávnění účtu ověřte pro konkrétní nasazení. Tailscale se týká
soukromých nasazení v tailnetu, ne všech možných Prostředí.

Vydaný model trezoru dává podporovaným Prostředím vlastní trezor pro agenty.
Firemní trezor lidí a osobní účty mají samostatné hranice. Použijte Apps →
Trezor a podporovanou žádost o tajný údaj v Prostředí, nikoli chat. Trezor
neodstraňuje rizika správy hostitele, záloh ani incidentů.

## Co tyto podklady nedokazují

- Zapnutí kontrol ani nezávislou certifikaci zákaznického nasazení.
- Stejné podmínky trénování, uchovávání a regionu u všech poskytovatelů modelů.
- Záznam každého lokálního čtení, požadavku na model nebo volání externího API.
- Izolaci Organizací jako samostatných tenantů na jednom zařízení.
- Rovnost mezi pozastavením, které obnoví agent, a pokynem uživatele k Publikaci.

[Přehled pro IT](/cs/it-administrators/) pomůže určit, co má zamýšlené nasazení
ještě doložit.
