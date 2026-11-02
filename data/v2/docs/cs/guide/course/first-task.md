---
title: "Lekce 7: První úkol"
description: "Zadejte práci agentovi v Chatu a nechte výsledek uložit jako návrh ke kontrole."
stableId: lazurio-doc-guide-course-first-task
locale: cs
summary: "Zadejte práci agentovi v Chatu a nechte výsledek uložit jako návrh ke kontrole."
updatedAt: "2026-11-01"
reviewedAt: "2026-11-01"
reviewOwner: Anna Blazickova
secondReviewOwner: Pablo AI
trustCritical: true
sourceRefs:
  - lazurio-platform-folder-agent-rules
  - lazurio-platform-folder-manual
  - lazurio-onboarding-decision-register
  - github-about-pull-requests
  - github-protected-branches
audience:
  - decision-maker
  - builder
  - agent
---

**Co se naučíte:** jak zadat práci agentovi v Chatu a jak agent výsledek
uloží, abyste ho mohli zkontrolovat.

Založte v Chatu nové vlákno. Každé nové vlákno začíná v Lazurio
**Folderu**, složce, ve které Lazurio drží instrukce pro agenty vedle vašich
Organizací; odtud agent najde vaši Organizaci (rozhodnutí 0189). V zadání
jmenujte Organizaci a práci.

Popište úkol vlastními slovy: co chcete, proč, z jakých podkladů, co se
nesmí změnit a že chcete návrh ke kontrole. Technické názvy znát nemusíte;
agent si pojmy vaší Organizace dohledá v jejích vlastních dokumentech.
Zadání můžete i nadiktovat (viz [Doporučené aplikace](/cs/guide/recommended-apps/)).
Víc o dobrém zadání najdete v návodu
[Jak přemýšlet o Lazuriu a agentech](/cs/guide/start-here/).

## Co agent udělá

Instrukce, které Lazurio pro agenty generuje, tedy `AGENTS.md` ve Folderu,
každému agentovi ukládají
([`render.ts`](https://github.com/Lazurio/LazurioPlatform/blob/a2927744b5a87113425f93f5e1517ac97b2f6c06/src/folder/render.ts)):

1. pracovat ve **worktree**, oddělené pracovní kopii repozitáře, aby platná
   verze v `main` zůstala netknutá;
2. dát práci hned na GitHub jako **Draft pull request**, navrženou změnu,
   kterou GitHub nikomu nedovolí mergnout, dokud je to Draft. Kde plán GitHubu
   pro repozitář Drafty nenabízí, otevře agent běžný pull request a do jeho
   popisu napíše, že je práce rozpracovaná;
3. zeptat se vás otázkou s volbami, kdykoli potřebuje rozhodnutí. Dokud
   neodpovíte, tato část práce čeká;
4. až je práce hotová a ověřená, přepnout pull request na **Ready for
   review** a skončit **handoffem**: odkazem, tím, co Publikace zavede, co
   agent ověřil, a otázkou, jestli má změny Publikovat vaším jménem, nebo
   požádat jiného Kolegu.

Když repozitář můžete jen číst, agent místo toho zapíše návrh jako issue.
Soubor, který nepatří do žádného repozitáře, uloží do Souborů a pošle vám na
něj odkaz.

Jsou to pravidla v instrukcích agentů, ne technické zámky. Pravidla pro
review a merge vynucuje GitHub jen tam, kde má vaše Organizace větev
chráněnou.

## Váš úkol

Nechte uložit práci z lekce 5. V novém vlákně v Chatu pošlete:

```text
V naší Organizaci [název] přidej tohle do [místa, na kterém jsme se
domluvili] jako návrh ke kontrole: [vaše dvě nebo tři věty].
Nejdřív ověř, jestli už něco podobného neexistuje a jestli tam můžu
zapisovat. Když můžu, připrav pull request; když to můžu jen číst,
zapiš návrh jako issue. Když ti něco nebude jasné, zeptej se. Nic
nepublikuj. Na konci mi dej odkaz.
```

Na otázky agenta odpovídejte, jakmile se objeví.

**Hotovo poznáte takto:** agent vám dal odkaz na pull request ve stavu Ready
for review, nebo na issue; samotná změna je tam vidět; a nic se
nepublikovalo. U pull requestu na vaši odpověď čeká závěrečná otázka. Zatím
na ni neodpovídejte: změnu nejdřív zkontrolujte v lekci 8. Issue končí bez
této otázky, protože o změně rozhodnou Kolegové, které v něm agent zmínil.
