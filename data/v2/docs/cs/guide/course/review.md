---
title: "Lekce 8: Kontrola a Publikace"
description: "Zkontrolujte, co agent uložil, řekněte si o úpravy a rozhodněte, kdo změnu publikuje."
stableId: lazurio-doc-guide-course-review
locale: cs
summary: "Zkontrolujte, co agent uložil, řekněte si o úpravy a rozhodněte, kdo změnu publikuje."
updatedAt: "2026-11-01"
reviewedAt: "2026-11-01"
reviewOwner: Anna Blazickova
secondReviewOwner: Pablo AI
trustCritical: true
sourceRefs:
  - lazurio-platform-folder-manual
  - lazurio-platform-folder-agent-rules
  - lazurio-onboarding-decision-register
  - github-reviewing-pull-requests
  - github-protected-branches
audience:
  - decision-maker
  - builder
  - agent
---

**Co se naučíte:** jak zkontrolovat, co agent uložil, a jak funguje
Publikace.

Otevřete odkaz z handoffu. Když se stránka neotevře, ověřte, že je
v prohlížeči přihlášený účet GitHubu, který máte připojený v Začínáme.
Pull request má popis a na záložce **Files changed** přesnou změnu. Čtěte
samotnou změnu, ne jen shrnutí od agenta, a ověřte, že:

- je na správném místě a říká, co máte na mysli;
- každý údaj má zdroj a nic není vymyšlené: uhlazený text, za kterým nic
  není, vraťte agentovi;
- neobsahuje soukromá data ani nic z jiné Organizace;
- nový Kolega mu porozumí.

Když něco nesedí, napište to ve stejném vlákně v Chatu, konkrétně: „Odstraň
termín, zdroj ho nepotvrzuje.“ Agent opravu přidá do stejného pull
requestu nebo issue. Vy i vaši Kolegové můžete komentovat i přímo na
GitHubu.

## Publikace

**Publikace** je krok, kterým se práce stane těžko vratnou nebo viditelnou
pro ostatní: merge pull requestu, odeslání e-mailu nebo zprávy, odeslání
formuláře, platba. Do té doby je práce návrh, který jde ještě změnit nebo
zahodit. Agent publikuje, jen když mu to dovolíte: volbou **Publikovat vaším
jménem** v jeho závěrečné otázce, slovem „publikuj“, nebo předem pro úkol či
celé vlákno. Platí vaše poslední slovo.

Jestli merge smí proběhnout, rozhodují vaše živá práva na GitHubu. Když
mergovat nesmíte, nebo chcete, aby práci zkontroloval ještě někdo další,
zvolte **Požádat jiného Kolegu**: agent tohoto Kolegu požádá o review,
přiřadí mu pull request a zmíní ho na GitHubu. V Týmovém Prostředí se agent
místo toho zeptá, komu má změnu předat.

Když Publikaci dovolíte, instrukce agentovi ukládají mergnout přesně
poslední verzi pull requestu, a když mezitím přibude další změna, GitHub
takový merge odmítne. Před souhlasem proto zkontrolujte poslední verzi.
Pravidlo, že agent publikuje jen s vaším souhlasem, je v jeho instrukcích;
pravidla pro merge, například povinné review, vynucuje GitHub jen
u chráněných větví.

## Váš úkol

1. Přečtěte si změnu z lekce 7 na záložce **Files changed**, nebo si
   přečtěte issue.
2. Řekněte si alespoň o jednu konkrétní úpravu a ověřte, že se objevila ve
   stejném pull requestu nebo issue.
3. U pull requestu odpovězte na závěrečnou otázku. Když nevíte jistě, jestli
   rozhodnutí patří vám, zvolte **Požádat jiného Kolegu**. U issue ověřte,
   že jmenuje, kdo může změnu provést.

**Hotovo poznáte takto:** samotnou změnu máte přečtenou, vaše připomínka je
v ní zapracovaná a na závěrečnou otázku máte odpověď, nebo víte, kdo
o issue rozhodne. Váš první úkol je uložený a zkontrolovaný.
