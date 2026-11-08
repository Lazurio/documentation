---
title: "Ověřené poznatky o poskytovatelích"
description: "Chování poskytovatelů, na které Lazurio narazilo při napojování aplikací a které platí pro každou Organizaci: kroky administrátora, životnost tokenů, limity a potřebné role."
stableId: lazurio-doc-provider-notes
locale: cs
summary: "Datované poznatky o Google Workspace, Slacku, Atlassianu, Canvě, LinkedInu, GitHubu a Composiu, každý ověřený ve vlastní dokumentaci poskytovatele."
updatedAt: "2026-11-08"
reviewedAt: "2026-11-08"
reviewOwner: Matej Suchanek
secondReviewOwner: Pablo AI
trustCritical: true
sourceRefs:
  - lazurio-external-apps-org-steps
  - lazurio-provider-runbooks
  - lazurio-github-app-broker
  - lazurio-github-app-public-issues
  - composio-create-organization-request
  - google-oauth-audience
  - google-oauth2-refresh-token-expiration
  - google-workspace-mcp-servers
  - slack-mcp-server
  - atlassian-mcp-get-started
  - atlassian-mcp-settings
  - canva-mcp-access
  - canva-mcp-tools
  - linkedin-api-access
  - linkedin-authorization-code-flow
  - linkedin-share-api
  - linkedin-user-agreement
audience:
  - it-admin
  - builder
  - agent
---

Tyto poznatky zachycují chování poskytovatelů, na které Lazurio narazilo při
napojování aplikací a které platí pro každou Organizaci. U každého je uvedené,
kdy ho Lazurio zapsalo, a odkaz na stránku poskytovatele, kde byl znovu
ověřený 1. 11. 2026. Poskytovatelé své produkty mění, proto si před použitím
poznatku otevřete odkazovanou stránku. Microsoft 365 má vlastní stránku
[Microsoft 365 pro IT a Admina Organizace](/cs/microsoft-365/) a obecná pravidla volby
napojení najdete v [napojení Prostředí na aplikace](/cs/environment-app-connections/).

## Co administrátor udělá nejdřív

Někteří poskytovatelé potřebují jednorázový krok na straně Organizace dřív,
než se k nim může připojit jakékoli Prostředí.

| Poskytovatel | První krok na straně poskytovatele |
| --- | --- |
| Google Workspace | Vlastní projekt v Google Cloudu se zapnutými API, nastavenou obrazovkou souhlasu OAuth a vlastním klientem OAuth. |
| Slack | Administrátor workspace schválí aplikaci MCP klienta standardním schvalováním aplikací ve Slacku. |
| Atlassian | Administrátor organizace v Atlassianu určí, které domény se smějí připojit přes OAuth 2.1 a zda jsou povolené API tokeny. |
| LinkedIn | Vývojářská aplikace LinkedIn s produktem Share on LinkedIn. |
| Microsoft 365 | Jedna aplikace ve vašem tenantu Entra a jeden souhlas správce; viz [stránka o Microsoftu 365](/cs/microsoft-365/). |

## Google Workspace

Lazurio tyto poznatky zapsalo 7. 8. 2026; sedmidenní vypršení jeho runbook
uvádí jako nejčastější opakovaný problém.

- **Přihlášení na sedm dní.** V projektu Google Cloudu, jehož obrazovka
  souhlasu OAuth má typ uživatelů External a stav publikování Testing,
  vyprší autorizace testovacího uživatele sedm dní po souhlasu, včetně
  obnovovacího tokenu. Výjimkou je jen aplikace, která nežádá nic víc než
  jméno, e-mailovou adresu a profil, takže se to týká Gmailu, Disku
  i ostatních rozsahů Workspace. Pro integraci, kterou používají jen vaše
  účty, použijte projekt ve vaší organizaci Google Cloudu s typem uživatelů
  Internal, nebo aplikaci publikujte jako In production; to může vyžadovat
  ověření od Googlu.
- **Další důvody konce obnovovacího tokenu.** Google uvádí tyto: uživatel
  přístup odvolal, token se šest měsíců nepoužil, uživatel změnil heslo
  a token má rozsahy Gmailu, účet překročil limit 100 živých obnovovacích
  tokenů na jednoho klienta OAuth, což bez varování zneplatní ten nejstarší,
  a administrátor nastavil požadovanou službu jako Restricted. Přihlášení každého
  Prostředí je samostatný grant, takže se do limitu počítá každé přihlášení
  téhož účtu přes stejného klienta.
- **Oficiální MCP servery.** MCP servery Googlu pro Gmail, Disk, Dokumenty,
  Tabulky, Prezentace, Kalendář, Chat a Classroom jsou ve stavu Developer
  Preview. Potřebují zapnutá API a služby MCP ve vašem vlastním projektu
  Google Cloudu, obrazovku souhlasu OAuth a vlastní ID a tajný klíč klienta
  OAuth. Google Meet mezi nimi není.

## Slack

Lazurio tyto poznatky zapsalo 2. 9. 2026: oficiální adresa s interaktivním
přihlášením bez ID a tajného klíče aplikace ve Slacku nestačí.

- Oficiální MCP server je `https://mcp.slack.com/mcp` přes Streamable HTTP.
  Slack nepodporuje SSE ani dynamickou registraci klienta.
- MCP klient musí stát na zaregistrované aplikaci ve Slacku, publikované ve
  Slack Marketplace nebo interní pro váš workspace; nezveřejněné aplikace MCP
  používat nesmějí. Tok OAuth je důvěrný: klient používá ID a tajný klíč
  aplikace, takže tajný klíč patří do trezoru, nikdy do Gitu.
- Administrátoři workspace aplikace MCP klientů schvalují a spravují standardním
  schvalováním aplikací ve Slacku.
- Limity platí pro každý nástroj zvlášť, stejně jako pro odpovídající metody
  Web API, a seznam povolených IP adres aplikace platí i pro její požadavky
  přes MCP.

## Atlassian: Jira a Confluence

Lazurio tyto poznatky zapsalo 2. 9. 2026. K 1. 11. 2026 uvádí Atlassian jinou
adresu, než má runbook Lazuria.

- Návod Atlassianu nyní uvádí `https://mcp.atlassian.com/v2/mcp`. Adresu
  berte z aktuálního návodu Atlassianu, ne ze starší poznámky.
- Přihlášení používá ve výchozím stavu OAuth 2.1 a akce respektují stávající
  oprávnění uživatele v Atlassianu. Přihlášení API tokenem je volitelné;
  administrátor organizace v Atlassianu ho zapíná nebo vypíná v Atlassian Administration →
  Connectors → Atlassian MCP server.
- Povolené domény platí jen pro nástroje, které používají OAuth 2.1. Nástroje
  s API tokenem omezuje seznam povolených IP adres a rozsah tokenu a seznam
  povolených IP adres platí pro každý požadavek přes MCP server.
- Některá volání nástrojů, třeba sjednocené vyhledávání a kontext Teamwork
  Graph, čerpají Rovo kredity.

## Canva

Lazurio zapsalo nastavení Canvy 2. 9. 2026.

- Každý uživatel se přihlašuje samostatně a dostupné operace odpovídají jeho
  vlastnímu přístupu v Canvě.
- Canva omezuje každý nástroj zvlášť, na 20 až 100 požadavků za minutu.
- Změna rozměrů návrhů, autofill, brand kity a brand šablony vyžadují Canva Pro
  nebo vyšší plán.
- Mezi nástroji je i vytvoření a publikování brand šablony. Publikování brand
  šablony je v Lazuriu Publikace a potřebuje pokyn uživatele.

## LinkedIn

Lazurio tyto poznatky zapsalo 24. 7. 2026.

- Bez schválení má každý vývojář k dispozici jen otevřená oprávnění: Sign in
  with LinkedIn using OpenID Connect a `w_member_social` z produktu Share on
  LinkedIn. Většina ostatních oprávnění a partnerských programů potřebuje
  výslovné schválení od LinkedInu.
- Přístupové tokeny platí 60 dní a programové obnovovací tokeny má jen omezený
  okruh partnerů. Integrace pro publikování příspěvků proto potřebuje nové
  přihlášení nejméně každých 60 dní.
- Share API dovoluje 150 požadavků na člena a 100 000 na aplikaci za den podle
  UTC.
- Uživatelská smlouva LinkedInu zakazuje scraping i boty a jiné nepovolené
  automatizované metody. Lazurio proto dovoluje jen publikování přes oficiální
  API a agenti LinkedIn čtou jen v prohlížeči pod dohledem uživatele.

## GitHub

Lazurio tento poznatek zapsalo 17. 10. 2026 při stavbě brokeru aplikace
Lazurio for GitHub; doklady jsou v
[issue 23 jeho veřejného repozitáře](https://github.com/Lazurio/github-app/issues/23).

- U instalace, která přijala oprávnění Issues, mohl každý testovaný instalační
  token otevřít issue ve veřejném repozitáři bez ohledu na to, o jaká
  oprávnění žádal a na který repozitář byl omezený, a to i ve veřejném
  repozitáři úplně jiného vlastníka. GitHub uvedl jako přijaté oprávnění
  `issues=write`, ale nevynutil ho. Komentování GitHub odmítl u všech
  takových tokenů a úpravu, zavření a znovuotevření u tokenu jen pro čtení.
  Instalace bez oprávnění Issues testovaná nebyla. Token jen pro čtení proto
  nezabrání tomu, kdo ho má, otevírat issues ve veřejných repozitářích.

## Composio

Lazurio tento poznatek zapsalo 17. 10. 2026.

- CLI Composia nemá příkaz, který by založil organizaci. Organizaci Composia
  pojmenovanou podle vaší Organizace v Lazuriu založte na webu Composia.
  Lazurio o tento příkaz Composio požádalo v
  [issue 4949](https://github.com/ComposioHQ/composio/issues/4949), které bylo
  k 1. 11. 2026 stále otevřené.

## Zdroje

- Lazurio: [standard napojení externích aplikací](https://github.com/HumanAndMachines/Lazurio/blob/66e437f7e563574ea35b79dd1bdd193fd0f6b4b6/manual/external-app-integrations.md), [runbooky poskytovatelů](https://github.com/HumanAndMachines/Lazurio/tree/66e437f7e563574ea35b79dd1bdd193fd0f6b4b6/manual/integrations) a [broker Lazurio for GitHub](https://github.com/Lazurio/github-app/blob/751eef11a285dea625c1d3fd4e286e396c5ab1d9/README.md#opening-issues-in-public-repositories) (anglicky).
- Google: [typ uživatelů a stav publikování OAuth](https://support.google.com/cloud/answer/15549945), [vypršení obnovovacího tokenu](https://developers.google.com/identity/protocols/oauth2#expiration), [MCP servery Workspace](https://developers.google.com/workspace/guides/configure-mcp-servers).
- Slack: [MCP server Slacku](https://docs.slack.dev/ai/slack-mcp-server/).
- Atlassian: [začátek s MCP serverem Atlassianu](https://support.atlassian.com/atlassian-ai-gateway/docs/get-started-with-the-atlassian-remote-mcp-server/) a [nastavení pro administrátory](https://support.atlassian.com/security-and-access-policies/docs/control-atlassian-mcp-server-settings/).
- Canva: [přístup a oprávnění](https://www.canva.dev/docs/apps/mcp/access/) a [nástroje a limity](https://www.canva.dev/docs/apps/mcp/tools/).
- LinkedIn: [přístup k API](https://learn.microsoft.com/en-us/linkedin/shared/authentication/getting-access), [tok autorizačního kódu](https://learn.microsoft.com/en-us/linkedin/shared/authentication/authorization-code-flow), [Share on LinkedIn](https://learn.microsoft.com/en-us/linkedin/consumer/integrations/self-serve/share-on-linkedin), [uživatelská smlouva](https://www.linkedin.com/legal/user-agreement).
- Composio: [žádost o zakládání organizací](https://github.com/ComposioHQ/composio/issues/4949).
