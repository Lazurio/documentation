---
title: Desetiminutový přehled pro IT
description: Otázky, které by měl správce IT položit před schválením Lazuria.
stableId: lazurio-doc-it-administrators
locale: cs
summary: Stručné IT posouzení účelu Lazuria, identity, přístupů, dat, integrací, provozu a schvalovacích hranic.
updatedAt: "2026-08-26"
reviewedAt: "2026-08-26"
reviewOwner: Matej Suchanek
secondReviewOwner: Pablo AI
trustCritical: true
sourceRefs:
  - lazurio-readme
  - lazurio-architecture
  - lazurio-collaboration-model
  - lazurio-external-apps
  - lazurio-secret-custody
audience:
  - it-admin
  - decision-maker
  - agent
---

Lazurio je verzované pracovní prostředí pro lidi a AI Agenty. Je navržené
tak, aby při práci s pomocí Agentů zviditelnilo organizační hranice, pravomoci
a publikační rozhodnutí. Veřejný source lze zkontrolovat v
[repozitáři Lazuria](https://github.com/HumanAndMachines/Lazurio/tree/69c53ec342124aef48cb9d04fd109f9886ec242e).

Správná schvalovací otázka není pouze „Vidí AI data?“. Zní:
**Která identita pracuje, na které mašině, v jaké Organizaci, přes kterou
schválenou integraci, nad kterými daty a kdo smí výsledek Publikovat?**

## Stručně

| Oblast | Dokumentovaná pozice Lazuria | Co má IT ověřit pro své nasazení |
| --- | --- | --- |
| Identita | Pravomoc dává přihlášený Principál; Task Agent nezískává z promptu samostatná práva. | Správnost lidské nebo servisní identity, členství v repozitářích a vlastníka zařízení. |
| Hranice Organizace | Jedna firma odpovídá jedné Organizaci a jedné GitHub organization/access hranici. Data různých Organizací se nesmí míchat. | Připojené a dostupné jsou jen zamýšlené repozitáře a Teamy. |
| Lokální workspace | Práce začíná z checkoutnutého, verzovaného source na mašině vlastněné Principálem. | Hardening zařízení, šifrování disku, endpoint monitoring, zálohy a offboarding odpovídají pravidlům. |
| Publikace | Práce Agenta je vratný Draft. Merge, deploy, odeslání a další externí Publikace vyžadují explicitní pravomoc. | Pravidla repozitáře, povinná review a oprávnění k deployi vynucují zamýšlený gate. |
| Externí aplikace | Integrace jsou lokální pro danou mašinu, zrevidované a samostatně odvolatelné; dokumentovanou předností je oficiální MCP a potom oficiální CLI. | Každý zapnutý poskytovatel, OAuth scope, datový tok, pravidla retence a cesta k odvolání jsou přijaté. |
| Secrets | Secrets patří do ignorovaných, ohraničených custody cest — ne do Gitu ani veřejné dokumentace. | Zvolené úložiště secrets, rotace, incident response a kontrola úniků skutečně fungují. |
| Audit | Git commity, pull requesty, review a logy poskytovatelů vytvářejí důkazy, ale pokrytí závisí na použitých nástrojích. | Potřebné logy existují napříč GitHubem, endpointem, poskytovatelem modelu, aplikacemi a deployment infrastrukturou. |

Jde o dokumentované návrhové a procesní hranice, nikoli o certifikaci. Základní
kontrakty tvoří veřejný [model spolupráce](https://github.com/HumanAndMachines/Lazurio/blob/69c53ec342124aef48cb9d04fd109f9886ec242e/AGENTS.md),
[standard integrací](https://github.com/HumanAndMachines/Lazurio/blob/69c53ec342124aef48cb9d04fd109f9886ec242e/manual/external-app-integrations.md)
a [standard správy secrets](https://github.com/HumanAndMachines/Lazurio/blob/69c53ec342124aef48cb9d04fd109f9886ec242e/manual/security/local-secret-custody.md).

## Ke kterým datům lze přistupovat?

Jedna univerzální odpověď by nebyla poctivá, protože konkrétní dosah Lazuria
závisí na Principálovi, mašině, oprávněních k repozitářům a zapnutých
nástrojích. Při posouzení nasazení inventarizujte čtyři povrchy:

1. Git repozitáře a Teamy viditelné pro pracující identitu.
2. Lokální soubory záměrně umístěné uvnitř aktivního workspace.
3. Externí aplikace zapnuté přes schválený MCP server nebo CLI.
4. Poskytovatele modelu a hostingu použité zvoleným execution klientem a Moduly.

Pouhá existence integrace v ekosystému nedokazuje, že je zapnutá. Vyžadujte
živý seznam pro konkrétní nasazení s poskytovatelem, scope, vlastníkem a
postupem odvolání.

## Co brání nechtěné Publikaci?

[Kontrakt spolupráce Lazuria](https://github.com/HumanAndMachines/Lazurio/blob/69c53ec342124aef48cb9d04fd109f9886ec242e/AGENTS.md)
odděluje editovatelnou práci Agenta od Publikace. Běžný vývoj probíhá na větvi
a přes pull request. Oprávnění GitHubu a pravidla větví zůstávají přístupovou
autoritou; text v promptu není grantem. U akcí mimo Git, například odeslání
zprávy nebo změny u poskytovatele, se stejný princip provádí explicitní
autorizací a oprávněními poskytovatele.

Procesní kontroly potřebují technické protějšky všude, kde je platforma umí
vynutit. V akceptačním testu se pokuste o přístup k zamítnutému repozitáři,
neschválenému externímu nástroji, chráněný merge a použití odvolaného
přihlašovacího údaje — nestačí pouze přečíst pravidla.

## Minimální schvalovací balíček

Před produkčním rolloutem si od provozovatele vyžádejte:

- inventář Organizace a repozitářů;
- jmenovité lidské nebo servisní identity a GitHub Team granty;
- minimální standard ochrany zařízení a lokálních dat;
- poskytovatele modelu a podmínky zpracování dat pro zvoleného klienta;
- katalog integrací s přesnými scope a vlastníky odvolání;
- postupy pro správu secrets, zálohy, mazání a offboarding;
- ochranu větví a pravomoc k Publikaci;
- zdroje logů, dobu uchování a kontakt pro incidenty;
- ohraničený pilot s daty reprezentujícími skutečný use case.

Pokud některá odpověď není známá, zapište ji jako implementační issue místo
toho, abyste architektonický záměr vydávali za bezpečnostní vlastnost.

## Doporučené rozhodnutí

Schvalte ohraničený pilot, když jsou identity, repozitáře, integrace,
poskytovatel modelu a publikační gate konkrétní a otestovatelné. Neschvalujte
plošné nasazení pouze z tohoto přehledu. Pro hlubší kontrolu pokračujte na
[přístup k datům a bezpečnost](/cs/data-access-security/) a [nasazení a
provoz](/cs/deployment-operations/).
