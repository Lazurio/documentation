---
title: "GitHub pro novou Organizaci"
description: "Co musí mít GitHub Organization, než v ní začne pracovat Lazurio: role a Teamy, aplikace Lazurio for GitHub, přístup k repozitářům, ochrana main a kdo merguje."
stableId: lazurio-doc-github-baseline
locale: cs
summary: "Nastavení GitHubu, které Vlastník Organizace připraví a ověří před prvním Přispěvatelem modulu: aplikace, výchozí oprávnění none, Team builders, infra jen pro Adminy Organizace, chráněná main a merge."
updatedAt: "2026-11-08"
reviewedAt: "2026-11-08"
reviewOwner: Matej Suchanek
secondReviewOwner: Pablo AI
trustCritical: true
sourceRefs:
  - lazurio-decision-register-gen4
  - lazurio-decision-register-admin-ai
  - lazurio-decision-0234-role-names
  - lazurio-first-organization-rollout
  - lazurio-organization-install
  - lazurio-root-agent-rules
  - lazurio-platform-folder-roles
  - lazurio-platform-decision-f31
  - lazurio-platform-team-github
  - lazurio-github-app-broker
  - github-organization-roles
  - github-base-permissions
  - github-install-app
  - github-protected-branches
  - github-rulesets
  - github-code-owners
  - github-repository-collaborators
  - github-rest-pull-requests
audience:
  - it-admin
  - decision-maker
  - agent
---

O přístupu ke zdrojovému kódu Organizace rozhoduje v Lazuriu jen GitHub.
Členství, Teamy, granty k repozitářům a pravidla větví určují, kdo čte,
zapisuje, schvaluje a merguje; Lazurio žádný druhý seznam přístupů nevede.
Jedna Organizace v Lazuriu je jedna GitHub Organization a jedna hranice
přístupů. Než první Přispěvatel modulu nainstaluje Lazurio pro novou
Organizaci, Vlastník Organizace nastaví základ popsaný níže a ověří ho proti
manifestu Organizace (rozhodnutí 0150).

Do Prostředí lidé vstupují Lazurio účtem a účet na GitHubu k tomu
nepotřebují. O tom, co se s repozitáři smí dělat a co se smí publikovat, ale
dál rozhoduje GitHub. U účtů propojených s GitHubem odpovídá členství
v Organizaci v Lazuriu živému členství v GitHub Organization. Tento model
vstupu je cílem rozhodnutí 0192; přechod na něj zatím není dokončený.

## Základ

| Položka | Požadovaný stav | Co ho vynucuje |
| --- | --- | --- |
| GitHub Organization | Jedna pro každou Organizaci v Lazuriu. Dnes jsou Admini Organizace její aktivní Vlastníci Organizace. Cílově Vlastníci Organizace jmenují Adminy Organizace jako roli Lazuria (rozhodnutí 0228, zatím nenasazené). | Dnes role owner v GitHubu; cílovou roli Admina Organizace bude držet Lazurio Auth (rozhodnutí 0228, zatím nenasazené) |
| Kořenový repozitář | Kořenový repozitář Organizace na `main`, podle konvence `<login>/<login>_GEN3`, s manifestem `lazurio.organization.json`. | Lazurio ho čte, přístup řídí GitHub |
| Lazurio for GitHub | Vlastník Organizace aplikaci nainstaluje s přístupem ke **All repositories**. „Only select repositories“ je podporovaná výjimka; musí zahrnout kořenový repozitář a každý repozitář, který Lazurio obsluhuje, a nikdy se nevydává za celou Organizaci. | Rozsah instalace v GitHubu |
| Výchozí oprávnění k repozitářům | `none` (v API `default_repository_permission`). Samotné členství neotevře žádný soukromý repozitář. | GitHub |
| Team `builders` | Zápis do repozitářů Organizace dává schváleným lidem právě jeden Team. Jeho úplný seznam členů se rovná schválenému seznamu a každý je aktivním členem GitHub Organization, ne čekající pozvánkou. | Členství v GitHubu |
| Granty Teamu `builders` | Výslovný zápis (Write, v API `push`) do kořenového repozitáře a do každého aktivního repozitáře, který není omezený. Nový repozitář dostane grant ve stejném kroku, ve kterém vznikne nebo se aktivuje. | Granty v GitHubu |
| Omezené repozitáře | Žádný grant pro `builders` ani pro jeho členy, kteří nejsou Admini Organizace, k `infra` ani k žádnému repozitáři, který manifest deklaruje jako `default_access: restricted` nebo `private`. | Granty v GitHubu |
| Design Systemy | Každý člověk i účet v Organizaci včetně účtů Prostředí s automatizacemi má k Design Systemům Organizace alespoň Read. | Proces: kontroluje Admin Organizace |

GitHub neumí vyjádřit „všechny současné i budoucí repozitáře kromě `infra`“,
proto každý nový běžný repozitář potřebuje vlastní grant pro `builders`. Zda je
repozitář omezený, plyne jen z jeho deklarace v manifestu, nikdy z názvu nebo
cesty (rozhodnutí 0143). Vlastníci Organizace na omezené repozitáře dosáhnou
díky roli owner v GitHubu; Lazurio to eviduje jako výjimku této role, nikdy
jako grant Teamu `builders`.
Změna členů, Teamů, grantů nebo instalací aplikací je zápis do GitHubu, který
potřebuje výslovný pokyn uživatele; agent ji připraví a stav ověří.

Organizace, která provozuje automatizovanou práci v Prostředí
s automatizacemi (Henry), přidá svou personu: strojový účet s dvoufázovým
ověřením, Člena Organizace a nikdy Vlastníka Organizace, v každé Organizaci
jiný. Pracuje přes Team `steward` s oprávněním Maintain, tedy jako Správce
modulu, ke všem repozitářům kromě `infra`. K `infra` smí dostat jen přímý
zápis, nikdy přes Team a nikdy oprávnění `admin` v GitHubu, jako jmenovaný
reviewer pull requestů do `infra`, až na to Organizace přepne svá pravidla
review (rozhodnutí 0169 a 0093).

## Ověření před prvním Přispěvatelem modulu

Vlastník Organizace porovná živý stav s aktivními repozitáři v manifestu, ne
s ručně vedeným seznamem. Neznámý stav (`unknown`), neúplná data od GitHubu
nebo člen `builders`, který chybí nebo přebývá, instalaci zastaví
(rozhodnutí 0150).

```sh
gh api "orgs/<org>" --jq '{login, id, default_repository_permission}'
gh api "orgs/<org>/teams/builders" --jq '{name, slug, id, privacy}'
gh api --paginate "orgs/<org>/teams/builders/members?role=all&per_page=100" \
  --jq '.[].login'
gh api --paginate "orgs/<org>/teams/builders/repos?per_page=100" \
  --jq '.[] | {name, push: .permissions.push}'
gh api --paginate "repos/<org>/infra/collaborators?affiliation=all&per_page=100" \
  --jq '.[] | {login, role_name}'
```

Poslední příkaz zopakujte pro každý omezený repozitář. Seznam collaboratorů
v GitHubu zahrnuje i Vlastníky Organizace a členy GitHub Organization, kteří
mají přístup přes Team nebo výchozí oprávnění, takže ukazuje výsledný
přístup, ne jeho původ. Porovnejte ho s rolí každého člověka v Organizaci:
kdo není Vlastník Organizace, se v něm objevit nesmí, kromě přímého zápisu
persony do `infra` popsaného výše.

Když Organizaci instaluje Pracovní Prostředí nebo počítač člověka, příkaz
`lazurio organization install <login>` nejdřív ověří živou roli tohoto
člověka na GitHubu. Přispěvatel modulu i Správce modulu přeskočí repozitáře
jen pro Adminy Organizace a role, kterou nejde ověřit, instalaci zastaví
(rozhodnutí 0188).

## Role

Samotný název role nic neopravňuje; rozhodují živá práva člověka na GitHubu
(rozhodnutí 0062). Každá role říká svou úroveň a její český a anglický název,
identifikátor i nasazenou hodnotu, na kterou se mapuje, určuje rozhodnutí 0234.

| Role | Co role dělá | Na GitHubu dnes |
| --- | --- | --- |
| Vlastník Organizace | Vlastní GitHub Organization a jmenuje a odvolává Adminy Organizace. Sám tím do Prostředí přístup nemá (rozhodnutí 0228). | Role owner |
| Admin Organizace | Role Lazuria, kterou jmenuje Vlastník Organizace (rozhodnutí 0228, zatím nenasazené); do nasazení je Adminem Organizace aktivní Vlastník Organizace. Spravuje členy, Teamy, granty, omezené repozitáře, instalace aplikací a pravidla větví a také Prostředí, zařízení a zdroj AI Organizace. Svůj pull request smí mergnout, kde to GitHub dovolí (rozhodnutí 0095). | Role owner |
| Člen Organizace | Každý další člověk v Organizaci. Co smí, plyne z jeho rolí v modulech a aplikacích; bez role v modulu nic neinstaluje a používá aplikace, které mu někdo zpřístupnil (rozhodnutí 0060 a 0231). | Členství v GitHub Organization |
| Čtenář modulu | Čte zdrojový kód modulu a nic nemění. Sama tato role nedává žádnou roli v aplikaci. | `pull` |
| Přispěvatel modulu | Staví modul a navrhuje změny a smí mergovat mladou `main`, která je zatím vědomě otevřená. | `push` tam, kde repozitář smí mít pravidla větví |
| Správce modulu | Navíc smí mergovat chráněnou `main` modulu a typicky ho vydává. | `maintain`, nebo `push` tam, kde repozitář pravidla větví mít nemůže (rozhodnutí 0232) |
| Admin aplikace, Uživatel aplikace | Dvě role v aplikaci modulu. Co smějí, určuje pravidlo Organizace v kódu modulu (rozhodnutí 0231). | Žádná; modulový kit Lazuria hlásí `appRole: "admin"` nebo `"user"` |

Slugy Teamů `builders` a `steward` a hodnoty volby instalace `--role builder`,
`--role steward` a `--role reader` jsou identifikátory a jména si nechávají;
role už neoznačují.

## Ochrana `main` a kdo merguje

Agenti dodávají každou změnu jako pull request. Merge je Publikace: proběhne
jen na výslovný pokyn uživatele, předáním přes assignee nebo podle stálého
mandátu, který zapisuje rozhodnutí, a co se smí mergnout, určují živá práva
uživatele na GitHubu. Před merge agent ověří, že schválení patří přesně
poslednímu commitu (headu), a merguje s `--match-head-commit` (rozhodnutí
0103). Každý pull request má assignee, který ho dotáhne do `main`
(rozhodnutí 0222; jeho automatická kontrola zatím není nasazená).

`main` se zamyká postupně. `main` mladého Modulu smí zůstat otevřená, aby
Přispěvatel modulu mohl publikovat; Admin Organizace ji vědomě zamkne
pravidly větví, když na tom záleží. Admin Organizace také určuje, kdo musí
schválit: v GitHubu zakládají
pravidla ochrany větví a rulesety lidé s administrátorským přístupem
k repozitáři a povinné review od code ownerů vyžaduje oprávnění admin nebo
owner. Vlastníci Organizace mají úplný administrátorský přístup.

Co GitHub skutečně vynutí, závisí na vašem plánu. Pravidla ochrany větví,
rulesety a code owneři fungují v soukromých repozitářích jen s GitHub Pro,
GitHub Team nebo GitHub Enterprise; GitHub Free je nabízí pro veřejné
repozitáře. Ochrana větve ve výchozím stavu neplatí pro lidi
s administrátorským přístupem, dokud nezapnete „Do not allow bypassing the
above settings“. Kde pravidlo GitHub nevynucuje, drží ho proces a `AGENTS.md`
Organizace. Kde plán nenabízí GitHub Draft pull requesty, třeba v soukromých
repozitářích na GitHub Free, otevřou agenti běžný pull request a stav práce
napíšou do popisu (rozhodnutí 0103).

Naše doporučení pro zamčenou `main` na placeném plánu:

- vyžadujte pull request s alespoň jedním schválením;
- vyžadujte review od code ownerů uvedených v `CODEOWNERS`;
- při novém pushi zahazujte stará schválení, aby schválení k přezkoumanému
  headu vázal i sám GitHub;
- vyžadujte vyřešené konverzace a kontroly (status checks) repozitáře;
- obcházení pravidel nedovolte.

Na tomto nastavení stojí tři pravidla Lazuria:

- **Týmové Prostředí nikdy nemerguje.** Jeho pull requesty přicházejí od
  `lazurio-for-github[bot]` se štítkem `team:<slug>` a schvaluje a publikuje
  je jmenovaný člověk pod vlastním účtem (rozhodnutí 0148). Je to pracovní
  pravidlo na každém plánu. Ochrana větve, která vyžaduje schválení
  a kontroly, aplikaci nezastaví: jakmile jsou splněné, může její token
  s právem zápisu obsahu repozitáře mergnout. Pravidlo by vynutilo jen
  omezení, které merge povolí jmenovaným lidem nebo Teamům a aplikaci
  vynechá; Admin Organizace, který na takové omezení spoléhá, si ho na
  repozitáři ověří.
- **Pull requesty persony schvaluje člověk**: Vlastník Organizace, Admin
  Organizace nebo Správce modulu.
  Persona merguje jen pull requesty, jejichž je assignee, nikdy nespouští
  apply infrastruktury, nevydává Release a nemění přístupy, tajemství ani
  fakturaci (rozhodnutí 0169). Na placeném plánu schválení vynucují pravidla
  větví, na bezplatném je to dohoda.
- **Release není Publikace.** Release vydává jen ten, komu to dovolují práva
  na GitHubu, a jen na výslovný pokyn uživatele nebo podle stálého mandátu,
  který zapisuje rozhodnutí.

Každý text, který agent napíše na GitHub, končí podpisem
`Agent: environment <UUID> · T3 thread <UUID>`, u bota Lazurio MausBotu
`bot <UUID>` (rozhodnutí 0218). Je to pravidlo, které agenti dodržují, ne
kontrola GitHubu.

## Co smí aplikace Lazurio for GitHub

Týmové Prostředí, které sdílejí členové Teamu, pracuje na GitHubu přes
aplikaci Lazurio for GitHub a token broker Organizace. Osobní účty GitHubu se
v něm nepřihlašují a Lazurio takové přihlášení odmítne. V Osobním a Pracovním
Prostředí se uživatel přihlásí na GitHub vlastním účtem a agenti jednají
v živých právech tohoto účtu (rozhodnutí 0165).

[Veřejný zdrojový kód brokeru](https://github.com/Lazurio/github-app/blob/751eef11a285dea625c1d3fd4e286e396c5ab1d9/README.md),
vydání 0.14.0 z 21. 10. 2026, vydává krátkodobý instalační token vždy pro
jeden repozitář. Oprávnění tokenu určuje živý grant Teamu k tomuto
repozitáři:

| Grant Teamu | Oprávnění tokenu |
| --- | --- |
| Write, Maintain nebo Admin | `actions: write`, `checks: read`, `contents: write`, `members: read`, `pull_requests: write` a navíc `workflows: write` a `issues: write`, pokud je deklaruje politika brokeru Organizace |
| Read nebo Triage | `actions: read`, `checks: read`, `contents: read`, `members: read`, `pull_requests: read` a navíc `issues: write`, pokud ho politika deklaruje |

Token nikdy nedostane správu repozitáře ani změny členství. Soukromý klíč
aplikace existuje jen v brokeru, nikdy v Prostředí. Dokumentace GitHubu
k tomu dodává, že nainstalovaná aplikace má vždy alespoň přístup pro čtení ke
všem veřejným repozitářům na GitHubu. Rejstřík rozhodnutí Lazuria zatím vede
kontrolu každého tokenu proti Teamu jako cíl, který ještě nevznikl (rozhodnutí
0147), veřejný zdrojový kód brokeru ji ale už obsahuje. Veřejný kód nedokazuje,
co běží v konkrétním nasazení, proto se provozovatele vašeho nasazení Lazuria
zeptejte, které vydání brokeru vaši Organizaci obsluhuje.

Změny grantu Teamu z Přehledu Organizace má podle rozhodnutí 0186 provádět
samostatná úzká aplikace Lazurio Administration Access s jednorázovým tokenem
člověka, který změnu dělá, takže audit GitHubu jmenuje tohoto člověka;
Lazurio for GitHub ani broker přístupy měnit nemohou. Změna, o kterou požádá
Správce modulu, je žádost, kterou schvaluje Admin Organizace.

V GEN3 spouští počítač Přispěvatele modulu `lazurio organization install <login> --role builder`,
který odmítne klonovat, když chybí zápis do kořenového repozitáře nebo do
některého repozitáře Teamu `builders`, a na GitHubu nic nemění (rozhodnutí 0141).

## Zdroje

- Lazurio: [rejstřík rozhodnutí](https://github.com/Lazurio/LazurioPlatform/blob/4d5ee62a963a0ae2fc98287f0072e739ff6d2cd8/docs/decision-register.md) (rozhodnutí 0060, 0062, 0093, 0095, 0103, 0141, 0143, 0147, 0148, 0150, 0165, 0169, 0186, 0188, 0192, 0218 a 0222, anglicky) a pro názvy rolí [rozhodnutí 0234](https://github.com/Lazurio/LazurioPlatform/blob/753cca123df45721c3c1395a16a3a0df9a04dbcd/docs/decision-register.md#0234--the-names-of-access-roles-one-vocabulary-for-every-text-screen-and-agent) s 0231 a 0232 (anglicky), runbooky GEN3 [zavedení Organizace](https://github.com/HumanAndMachines/Lazurio/blob/66e437f7e563574ea35b79dd1bdd193fd0f6b4b6/manual/first-client-organization-rollout.md) a [instalace Organizace](https://github.com/HumanAndMachines/Lazurio/blob/66e437f7e563574ea35b79dd1bdd193fd0f6b4b6/manual/organization-install.md), [pravidla pro agenty](https://github.com/HumanAndMachines/Lazurio/blob/66e437f7e563574ea35b79dd1bdd193fd0f6b4b6/AGENTS.md), [popis rolí ve Folderu](https://github.com/Lazurio/LazurioPlatform/blob/a2927744b5a87113425f93f5e1517ac97b2f6c06/src/folder/manual.ts#L888-L904), [rozhodnutí F31](https://github.com/Lazurio/LazurioPlatform/blob/a2927744b5a87113425f93f5e1517ac97b2f6c06/docs/decisions.md#f31--a-team-environment-publishes-under-the-teams-identity), [gh v Týmovém Prostředí](https://github.com/Lazurio/LazurioPlatform/blob/a2927744b5a87113425f93f5e1517ac97b2f6c06/docs/environment-tools.md#gh-on-a-team-environment) a [broker Lazurio for GitHub](https://github.com/Lazurio/github-app/blob/751eef11a285dea625c1d3fd4e286e396c5ab1d9/README.md).
- GitHub, přečteno 1. 11. 2026: [role v organizaci](https://docs.github.com/en/organizations/managing-peoples-access-to-your-organization-with-roles/roles-in-an-organization), [výchozí oprávnění](https://docs.github.com/en/organizations/managing-user-access-to-your-organizations-repositories/managing-repository-roles/setting-base-permissions-for-an-organization), [instalace GitHub App](https://docs.github.com/en/apps/using-github-apps/installing-a-github-app-from-a-third-party), [chráněné větve](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches), [rulesety](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/about-rulesets), [code owneři](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners), [collaboratoři repozitáře](https://docs.github.com/en/rest/collaborators/collaborators) a [Draft pull requesty podle plánu](https://docs.github.com/en/rest/pulls/pulls).
