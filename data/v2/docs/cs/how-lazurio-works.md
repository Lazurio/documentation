---
title: Jak Lazurio funguje
description: Základní provozní model od Principála a Organizace až po Draft a Publikaci.
stableId: lazurio-doc-how-it-works
locale: cs
summary: Poznejte Principály, Agenty, Organizace, repozitáře, Workspace Moduly, Drafty, review a publikační tok Lazuria.
updatedAt: "2026-08-26"
reviewedAt: "2026-08-26"
reviewOwner: Matej Suchanek
sourceRefs:
  - lazurio-readme
  - lazurio-architecture
  - lazurio-collaboration-model
audience:
  - it-admin
  - decision-maker
  - builder
  - agent
---

Lazurio považuje práci s pomocí AI za běžnou organizační práci s explicitním
vlastnictvím a hranicemi. Člověk začne požadovaným výsledkem; Agent může
prohlédnout autorizovaný kontext, vytvořit editovatelný Draft, ověřit ho a
připravit k review. Pravomoc nevychází ze sebejistoty Agenta. Vychází z
přihlášené identity a systémů, které danou akci vlastní.

Současný veřejný model definuje [architektura Lazuria](https://github.com/HumanAndMachines/Lazurio/blob/69c53ec342124aef48cb9d04fd109f9886ec242e/ARCHITECTURE.md)
a [kontrakt spolupráce s Agenty](https://github.com/HumanAndMachines/Lazurio/blob/69c53ec342124aef48cb9d04fd109f9886ec242e/AGENTS.md).

## Pět užitečných pojmů

**Principál** je člověk nebo AI Kolega, pro kterého se práce dělá. Drží
skutečná oprávnění a poslední slovo.

**Task Agent** je aktivní nástrojová relace. Pracuje pro Principála a nemá
vlastní pravomoc. Může navrhovat a připravovat; prompt z něj neudělá
administrátora.

**Organizace** je přístupová hranice jedné firmy. V dokumentovaném modelu
odpovídá GitHub organizaci a samostatnému kořeni repozitářů. Data a strategie
konkrétní firmy zůstávají uvnitř této Organizace.

**Workspace Modul** je aplikace nebo ohraničená pracovní oblast uvnitř
Organizace. Modul vlastní svůj runtime kontrakt a lze ho samostatně vyvíjet,
revidovat, nasazovat i vracet zpět.

**Personalspace** je privátní prostor jednoho Principála. Není úložištěm pro
organizační spolupráci ani zkratkou pro přesun firemních dat přes přístupové
hranice.

## Od požadavku k publikovanému výsledku

1. **Scope:** určete Organizaci, Modul a požadovaný výsledek.
2. **Pravomoc:** použijte živý přístup přihlášeného Principála; nevymýšlejte
   druhý systém oprávnění v textu.
3. **Kontext:** načtěte jen repozitáře a nástroje potřebné pro daný task.
4. **Draft:** vytvořte práci ve vratné podobě, obvykle na Git větvi a v pull
   requestu.
5. **Důkazy:** spusťte kontroly, ukažte praktický dopad a zachovejte kontext
   pro review.
6. **Rozhodnutí:** oprávněný Principál přesný výsledek schválí nebo zamítne.
7. **Publikace:** proveďte merge, deploy, odeslání nebo jinak uveďte výsledek
   v účinnost.
8. **Uzavření:** aktualizujte autoritativní plán, zapište zbývající issues a
   ukliďte dočasné pracovní prostory.

Díky tomuto tvaru má lidské review význam: reviewer nevidí jen vygenerovaný
text, ale přesnou změnu, důkazy, vlastníka a publikační rozhodnutí.

## Zdroje pravdy místo jedné obří databáze

Lazurio nevyžaduje kopírování všech druhů informací do jediného AI úložiště.
Kód zůstává v repozitářích, plány v Mission Control dané Organizace, trvalé
znalosti v její Knowledgebase a data poskytovatelů za ohraničenou integrací.
Pracovní prostředí pro daný task spojí relevantní části a zachová jejich
přirozené vlastníky.

Tento rozdíl je důležitý v provozu. Odebrání přístupu k repozitáři nebo
odvolání integrace změní, k čemu Principál a jeho Agent dosáhnou; úprava názvu
role v dokumentaci nikoli.

## Současný stav a cílový směr

Veřejná architektura rozlišuje cílový model od aktuálně nasazené konfigurace.
Ne každá instalace zpřístupňuje každou plánovanou schopnost. Při posouzení
konkrétního nasazení vyžadujte živou konfiguraci a readback od poskytovatele.
[Přehled pro IT](/cs/it-administrators/) uvádí minimální důkazy očekávané pro
schválení.
