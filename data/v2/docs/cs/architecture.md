---
title: "Architektura"
description: "Jak do sebe zapadají lidé, zařízení, Prostředí, Organizace, moduly a služby okolo, co jde na GitHub a kde má modul data."
stableId: lazurio-doc-architecture
locale: cs
summary: "Jak do sebe zapadají lidé, zařízení, Prostředí, Organizace, moduly a služby okolo, co jde na GitHub a kde má modul data."
updatedAt: "2026-11-12"
reviewedAt: "2026-11-05"
reviewOwner: Matej Suchanek
secondReviewOwner: Pablo AI
trustCritical: true
sourceRefs:
  - lazurio-decision-0243
  - lazurio-platform-module-standard-v0-1-20
  - lazurio-platform-module-standard-v0-1-21
  - lazurio-platform-module-parts-f14
  - lazurio-platform-decision-f52
  - lazurio-platform-content-sync-v0-1-20
  - lazurio-platform-release-v0-1-20
  - lazurio-platform-release-v0-1-21-rc-1
  - lazurio-platform-marketplace-v0-1-21
  - lazurio-platform-stack-profiles
  - lazurio-platform-register-modules
  - lazurio-platform-environment-access-v0-1-21
  - lazurio-platform-app-database-connection-question
  - lazurio-documentation-readme
  - lazurio-decision-register-admin-ai
audience:
  - it-admin
  - decision-maker
  - agent
---

Tato stránka je pro IT a Adminy Organizace. Člověk vstupuje do **Prostředí**
ze schváleného zařízení. Prostředí je počítač, na kterém pracují agenti.
**Organizace** je jedna GitHub organizace a každý **modul** v ní má vlastní
repozitář. Stejný model bez technických pojmů vysvětluje stránka
[Moduly](/cs/guide/modules/).

<figure class="lz-diagram">
  <picture>
    <source media="(max-width: 640px)" srcset="/diagrams/lazurio-architecture-cs-mobile.svg" />
    <img src="/diagrams/lazurio-architecture-cs.svg" alt="Člověk na zařízení v tailnetu vstupuje do Prostředí, počítače, na kterém pracují agenti. Prostředí drží kopie modulů Organizace, tedy GitHub organizace s kořenovým repozitářem a repozitářem každého modulu. Okolo Prostředí jsou Integrace, trezor a poskytovatel AI. Služby serveru s databází pro moduly jsou rozhodnuté, ale nenasazené." />
  </picture>
  <figcaption>Plné části fungují dnes. Přerušované části jsou rozhodnuté, ale nenasazené.</figcaption>
</figure>

## Vrstvy

**Člověk a zařízení.** Vstup má tři podmínky: síť (Tailscale
ve správném tailnetu Headscale, ze zařízení schváleného Adminem Organizace),
aktivní členství v Organizaci a oprávnění k celému Prostředí nebo k jedné
aplikaci. Takový je cílový model
[rozhodnutí 0192](https://github.com/Lazurio/LazurioPlatform/blob/d1d8917cdf1afdf49c5091115ca9d615abc0c376/docs/environment-access.md)
a přechod na něj není dokončený: jak se zařízení dostane dovnitř dnes, se může
v jednotlivých tailnetech lišit.
[Rozhodnutí 0243](https://github.com/Lazurio/LazurioPlatform/blob/bf5a83d95e59ad3eb40abc91e20e4877de50c678/docs/decision-register.md#0243--every-environment-is-entered-only-through-a-tailnet-personal-environments-outside-a-conglomerate-are-in-lazurios-personal-tailnet)
(rozhodnuté, zatím nenasazené) dělá z tailnetu jedinou cestu do každého
Prostředí. Veřejný vstup bez tailnetu dnes zbývá jen u referenční Organizace
Lazuria, do jejího návratu do tailnetu: podmínku sítě a schválení zařízení tam
lidé nemají, do webového rozhraní se dostanou přes vstup serveru a přihlásí se
účtem Lazuria.

**Prostředí.** Počítač, na kterém pracují agenti: Osobní, Pracovní nebo Týmové
Prostředí. Agenti v něm pracují s plným přístupem, bez sandboxu a bez
schvalování jednotlivých příkazů (rozhodnutí 0172). Hranicí je Prostředí, takže užší práva
znamenají samostatné Prostředí s vlastními přihlášeními a GitHub granty. Běží
tu aplikace modulů a **Soubory** jsou složka Dokumenty tohoto Prostředí.

**Organizace.** Jedna GitHub organizace. Její kořenový repozitář deklaruje
moduly: každý modul je položka v `modules.manifest.json` a Team je údaj u této
položky, ne složka.

**Modul.** Jeden Git repozitář se souborem `lazurio.module.json` v kořeni.
Postup je `AGENTS.md` se skilly v `.agents/skills/`. Aplikace je balíček
v `app/v<N>/`. Kde leží data, plyne z generace, viz [níže](#kde-má-modul-data).
Modul nemusí mít aplikaci vůbec. Modul Organizace je soukromý repozitář
`<GitHub organizace>/<modul>`. Osobní modul je soukromý repozitář
`<login>/<modul>` na vlastním účtu člověka, bez Organizace a bez Teamů.

**Okolo Prostředí.**

- **Integrace** jsou aplikace připojené k Prostředí, každá právě jednou cestou
  (rozhodnutí 0162).
- **Trezor** drží tajné údaje. Každé Prostředí má v trezoru vlastní identitu
  a hodnoty nikdy nejdou do chatu, Gitu, logů ani pull requestů (rozhodnutí
  0193, 0198 a 0203).
- **Poskytovatel AI** provozuje modely. Oba zdroje popisuje stránka
  [Zdroj AI](/cs/guide/ai-source/).
- **Služby serveru** má každý server Organizace jen jedny a každá služba má svůj
  kontejner. Vstupují do nich jen Admini Organizace; Vlastník Organizace,
  který není zároveň Adminem Organizace, ne (rozhodnutí 0209 a 0228). Stav:
  rozhodnuto, zatím
  nenasazeno.

## Jeden zdroj, synchronizované kopie

Jediným zdrojem modulu je GitHub. Každé Prostředí, které modul smí číst, drží
jeho pracovní kopii. Počet kopií odpovídá Prostředím, ne lidem: dvacet lidí
v jednom Týmovém Prostředí sdílí jednu kopii. Ať je jich kolik chce, jsou to kopie
jednoho repozitáře, ne oddělené sady dat.

Nainstalované Lazurio aktualizuje čisté kopie při startu a potom každou hodinu. Od
vydání v0.1.20 stejná synchronizace naklonuje i deklarovaný modul nebo datový
repozitář, jakmile ho identita tohoto Prostředí smí číst. Výjimkou je položka
vyhrazená Adminům Organizace a Týmové Prostředí. Vyhrazenou položku takto nedostane
ani Admin Organizace, zůstává výslovnou instalací. Každé kolo je pokus: kořen,
který neskončí aktuální, zastaví svou Organizaci a odepřená nebo neúspěšná operace
nechá repozitář beze změny do dalšího kola.

Opačným směrem jde změna jako Publikace:
sloučený pull request, u dat v repository-db commit a push nepublikované změny.

## Přístupy po Teamech

Které Teamy k modulu dosáhnou, určuje živý grant na GitHubu (rozhodnutí 0186).
`teams` v manifestu Organizace je jen výchozí nastavení při založení modulu
a založení dá každému uvedenému Teamu právo Write. Přehled Organizace mění grant
přes GitHub aplikaci Lazurio Administration Access s vlastními právy člověka,
který změnu dělá, takže ho audit GitHubu jmenuje. Změna, o kterou požádá
Správce modulu, je žádost, kterou schvaluje Admin Organizace.

Odebrání přístupu zastaví operace s repozitářem, ale nesmaže, co už Prostředí má.
Kopie zůstane, agent s přístupem do tohoto Prostředí ji přečte a přestane se
aktualizovat. Manifest Organizace uvádí všechny moduly, takže samotné jméno skryté
není.

Lazurio řídí vstup do modulu a předává mu ověřenou identitu. Co smí který člověk
uvnitř, jsou vlastní pravidla Organizace v jejím kódu a datech (rozhodnutí 0196).

## Co jde na GitHub a co ne

| Co | Kde to je | Na GitHubu |
| --- | --- | --- |
| Postup, skilly a kód aplikace | Repozitář modulu | Ano |
| Obsah modulu `v2` | `data/v2/` v repozitáři modulu | Ano |
| Záznamy modulu `v3` | Datový repozitář `<modul>-data` | Ano |
| Schéma modulu `v4` | Repozitář modulu | Ano, po nasazení |
| Řádky modulu `v4` | Databáze ve Službách serveru | Ne, po nasazení |
| Tajné údaje | Trezor | Ne |
| Soubory | Složka Dokumenty jednoho Prostředí | Ne |
| Přihlášení nástrojů | Počítač, na kterém Prostředí běží | Ne |
| Data v připojených aplikacích | Tyto aplikace | Ne, pokud je agent nezkopíruje do modulu |

## Kde má modul data

Generace aplikace, tedy složka `app/v<N>`, říká, kde leží data, ne jak je
aplikace dobrá (rozhodnutí F69, v kandidátu vydání v0.1.21-rc.1).

| Generace | Kde data leží | Kdy se to hodí | Veřejný příklad | Stav |
| --- | --- | --- | --- | --- |
| `v1` | Obsah je součástí aplikace. Datová vrstva není. | Modul nemá vlastní záznamy. | Šablony Design System a Prezentace | K dispozici |
| `v2` | Obsah leží vedle aplikace ve stejném repozitáři, v `data/v2/`. Vlastní datová vrstva není. | Obsahu je hodně, mění se občas a upravují ho agenti. | [Tato dokumentace](https://github.com/Lazurio/documentation) | K dispozici |
| `v3` | Záznamy leží v datovém repozitáři `<owner>/<modul>-data`, spravuje je repository-db a je připojený jako `db/`. Úprava člověka je nepublikovaná změna; publikace je jeden commit a push. | Záznamy se mění denně a chcete historii a schvalování. Výchozí volba pro nový modul s daty. | Šablona Mission Control | K dispozici |
| `v4` | Záznamy leží v databázi Dolt ve Službách serveru Organizace. Na GitHubu je aplikace, postup a schéma, řádky ne. | Zapisuje mnoho lidí najednou, přístup se liší uvnitř dat, osobní údaje se musí dát smazat nebo zapisuje služba zvenku. | Zatím žádný | **Rozhodnuto, nenasazeno** |

K tabulce tři poznámky:

- **Před v0.1.21.** Ve vydání v0.1.20 začíná nový modul s daty v `app/v1`, data
  má v repository-db. Od v0.1.21 začíná v `app/v3`. Existující modul si složku
  ponechá a posune se při nejbližším plánovaném přechodu.
- **Posun výš.** Modul začíná co nejníž. Přechod je plánovaný krok: nová generace
  vedle staré, převod dat a nakonec přepnutí výchozí aplikace, o kterém rozhoduje
  Správce modulu nebo uživatel. Modul drží nejvýš dvě generace.
- **`v4` dnes.** Šablona neexistuje, `lazurio module create` pro ni nemá stack
  a jak aplikace dostane připojení bez `.env`, je [otevřená
  otázka](https://github.com/Lazurio/LazurioPlatform/issues/818). Rozhodnutý
  návrh počítá s primární databází na jednom serveru, horkou zálohou na druhém
  serveru, pokud ho Organizace má, a s kopií celé databáze každých 15 minut do
  Google Cloud Storage ve vlastním projektu Organizace v EU. Prostředí se
  připojuje jen ke službám svého serveru. Databáze Dolt mimo server je nastavení
  připojení `v4`, ne `v5`.

## Modul, nebo Integrace

Cizí systém zůstává tam, kde je. Agent se k němu dostane jako k Integraci,
například přes vlastní MCP server v Executoru, a vidí to, co mu připojení
dovolí. Data zůstávají v tomto systému. Databáze `v4` slouží vnitřní práci
Organizace; produkční aplikace a databáze, které obsluhují její zákazníky, jsou
samostatné systémy mimo ni (rozhodnutí 0209).

Naše hodnocení, ne technický limit: vlastní modul se vyplatí, když chcete vlastní
postup a aplikaci, Integrace, když z velké části používáte cizí aplikaci.

## Kdo co udělal

Změna v repozitáři je Git commit s autorem a pull request si drží své review.
Audit GitHubu jmenuje člověka, který změnil grant Teamu (rozhodnutí 0186). U `v4`
je plánovanou publikací commit v Doltu s autorem a zprávou; stack profil to
označuje za návrh, který je třeba ověřit na prototypu, ne za ověřené chování.

## Zdroje

- [Lazurio Module Standard](https://github.com/Lazurio/LazurioPlatform/blob/5edbc2b7ebf53aec4e116663db60021d24593dbe/docs/module-standard.md) ve vydání v0.1.20 a [ve verzi v0.1.21-rc.1](https://github.com/Lazurio/LazurioPlatform/blob/d1d8917cdf1afdf49c5091115ca9d615abc0c376/docs/module-standard.md) pro generace.
- [Stack profily](https://github.com/Lazurio/LazurioPlatform/blob/d1d8917cdf1afdf49c5091115ca9d615abc0c376/docs/stack-profiles.md) ve verzi v0.1.21-rc.1: datová vrstva každé generace, `app-data` a `app-database`.
- [Synchronizace obsahu](https://github.com/Lazurio/LazurioPlatform/blob/5edbc2b7ebf53aec4e116663db60021d24593dbe/docs/content-sync.md) ve vydání v0.1.20.
- [Přístup k Prostředí](https://github.com/Lazurio/LazurioPlatform/blob/d1d8917cdf1afdf49c5091115ca9d615abc0c376/docs/environment-access.md) ve verzi v0.1.21-rc.1.
- [Rejstřík rozhodnutí](https://github.com/Lazurio/LazurioPlatform/blob/d1d8917cdf1afdf49c5091115ca9d615abc0c376/docs/decision-register.md) ve verzi v0.1.21-rc.1: rozhodnutí 0162, 0171, 0172, 0186, 0192, 0193, 0196, 0198, 0203, 0209, 0213 a 0228.
- [Rozhodnutí 0243](https://github.com/Lazurio/LazurioPlatform/blob/bf5a83d95e59ad3eb40abc91e20e4877de50c678/docs/decision-register.md#0243--every-environment-is-entered-only-through-a-tailnet-personal-environments-outside-a-conglomerate-are-in-lazurios-personal-tailnet), rozhodnuté 2026-11-12, zatím nenasazené: do každého Prostředí jen přes tailnet.
- [Rozhodnutí F14](https://github.com/Lazurio/LazurioPlatform/blob/5edbc2b7ebf53aec4e116663db60021d24593dbe/docs/decisions.md#f14--agent-manuals-live-in-the-lazurio-folder) (co modul drží) a [F52](https://github.com/Lazurio/LazurioPlatform/blob/5edbc2b7ebf53aec4e116663db60021d24593dbe/docs/decisions.md#f52--one-module-generator-in-the-platform-a-persons-own-modules-in-their-personalspace) (jeden generátor, osobní moduly).
