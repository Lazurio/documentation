---
title: "Microsoft 365 pro IT a Admina Organizace"
description: "Co Lazurio potřebuje od tenantu Microsoft 365, o čem rozhoduje IT, postup Admina Organizace a jak přístup odvolat."
stableId: lazurio-doc-microsoft-365
locale: cs
summary: "Jedna aplikace Entra pro jediný tenant s delegovanými oprávněními Graphu a bez tajného klíče: co schvaluje IT, postup Admina Organizace, podmíněný přístup, audit a odvolání."
updatedAt: "2026-11-08"
reviewedAt: "2026-11-01"
reviewOwner: Matej Suchanek
secondReviewOwner: Pablo AI
trustCritical: true
sourceRefs:
  - lazurio-microsoft-365-company-app
  - lazurio-microsoft-365-for-it
  - lazurio-platform-microsoft-365-company-app
  - lazurio-platform-decision-f45
  - lazurio-platform-release-v0-1-9
  - lazurio-manifest-family-settings
  - lazurio-decision-register-gen4
  - microsoft-entra-permissions-consent
  - microsoft-graph-permissions-reference
  - microsoft-entra-app-consent-policies
  - microsoft-entra-grant-admin-consent
  - microsoft-entra-delegate-app-roles
  - microsoft-entra-register-app
  - microsoft-entra-add-redirect-uri
  - microsoft-entra-enterprise-app-properties
  - microsoft-entra-redirect-uri
  - microsoft-entra-desktop-app-configuration
  - microsoft-entra-auth-code-flow
  - microsoft-entra-access-tokens
  - microsoft-entra-refresh-tokens
  - microsoft-entra-revoke-user-access
  - microsoft-graph-revoke-sign-in-sessions
  - microsoft-entra-session-lifetime
  - microsoft-entra-error-codes
  - microsoft-entra-noninteractive-sign-ins
  - microsoft-purview-audit
  - microsoft-entra-publisher-verification
  - microsoft-graph-create-event
  - microsoft-graph-event-cancel
  - microsoft-graph-driveitem-createlink
  - microsoft-graph-driveitem-invite
  - microsoft-work-iq-permissions
  - microsoft-work-iq-overview
audience:
  - it-admin
  - decision-maker
  - agent
---

Lazurio napojuje poštu a kalendář v Outlooku, OneDrive a SharePoint přes jednu
aplikaci, kterou vaše IT zaregistruje ve vašem vlastním tenantu Microsoft Entra.
Rozhraní Lazuria jí říká firemní aplikace. Aplikace přijímá jen účty vašeho
tenantu, má jen delegovaná oprávnění Microsoft Graph a žádný klientský tajný
klíč. IT k ní jednou udělí souhlas za všechny. Lazurio dostane id tenantu a id
aplikace (client ID), které tajné nejsou. Každý uživatel pak připojí svůj
pracovní účet a agenti v jeho Prostředí dosáhnou jen tam, kam dosáhne tento
účet.

**Stav k 1. 11. 2026.** Lazurio Platform aplikaci Organizace podporuje od
[vydání v0.1.9](https://github.com/Lazurio/LazurioPlatform/releases/tag/v0.1.9)
z 19. 10. 2026. Dvě části hotové nejsou. Admin Organizace zatím nemůže nastavení upravit
v Přehledu Organizace, proto se přidává pull requestem do repozitáře
Organizace, který projde kontrolou. Lazurio celý postup ještě neprošlo na
skutečném tenantu: výměna přihlašovacího kódu bez tajného klíče na návratové
adrese HTTPS, obnova po vypršení přístupového tokenu a odvolání přes
„Assignment required“ jsou zatím otevřené kontroly. Rejstřík rozhodnutí
Lazuria vede nastavení Microsoftu 365 z rozhodnutí 0162 jako rozhodnuté,
zatím nenasazené. Nastavení u první Organizace proto plánujte jako pilot.

## Co potřebuje tenant

| Položka | Nastavení |
| --- | --- |
| Registrace aplikace | Jedna aplikace ve vašem tenantu, například „Lazurio (&lt;Organizace&gt;)“. Podporované typy účtů: jen tento tenant („Single tenant only“, `AzureADMyOrg`). |
| Oprávnění | Jen delegovaná oprávnění Microsoft Graph uvedená níže. Žádná aplikační oprávnění a žádná oprávnění k adresáři ani ke správě. |
| Typ klienta | Veřejný klient. Uživatelé se přihlašují tokem autorizačního kódu s PKCE. Aplikace nemá klientský tajný klíč ani certifikát. |
| Návratové adresy | Platforma „Mobile and desktop applications“: návratová adresa každého Prostředí Organizace na serveru, `https://launchpad.<machine>.<github-org-login>.lazurio.io/api/integrations/oauth/callback`, a `http://localhost/api/oauth/callback`. |
| Souhlas | Souhlas správce za celý tenant, udělený jednou. |
| Co dostane Lazurio | Directory (tenant) ID a Application (client) ID. |

Microsoft dovoluje u aplikace pro pracovní a školní účty nejvýš 256 návratových
adres. U adresy `localhost` port nebere v úvahu, cesta se ale shodovat musí.
Jedna registrace `http://localhost/api/oauth/callback` proto pokryje i místní
návrat Executoru v Prostředí. Nastavení Lazuria přijme nejvýš 255 návratových
adres Prostředí a žádné zástupné znaky.

## Oprávnění a co dovolují

Všechna oprávnění jsou delegovaná. Microsoft uvádí, že s delegovaným
oprávněním aplikace nedosáhne na nic, k čemu nemá přístup přihlášený uživatel.
Aplikace nežádá nic k adresáři, uživatelům, skupinám ani nastavení tenantu.
Připojený účet administrátora proto dosáhne jen na poštu, kalendáře, soubory a weby,
tam ale na všechno, k čemu má přístup tento účet.

| Oprávnění | Popis Microsoftu | Co to znamená pro agenty |
| --- | --- | --- |
| `openid`, `profile`, `email`, `User.Read` | Přihlášení a čtení profilu přihlášeného uživatele | Jméno a adresa účtu označují připojení. |
| `offline_access` | Zachovat přístup k datům, ke kterým ho uživatel udělil; žádná další oprávnění nepřidává | Executor obnovuje přístup bez nového přihlášení. |
| `Mail.ReadWrite` | Vytvářet, číst, upravovat a mazat poštu v poštovních schránkách uživatelů; nezahrnuje odesílání pošty | Agenti čtou, třídí, přesouvají a mažou poštu a vytvářejí koncepty. Odeslat nemohou. |
| `Calendars.ReadWrite` | Vytvářet, číst, upravovat a mazat události v kalendářích uživatelů | Když agent založí událost s účastníky, Microsoft jim pošle pozvánky; vypnout to nejde. Zrušení schůzky organizátorem pošle účastníkům zprávu o zrušení. |
| `Files.ReadWrite.All` | Číst, vytvářet, upravovat a mazat všechny soubory, ke kterým má přihlášený uživatel přístup | Platí pro OneDrive i knihovny SharePointu, včetně odkazů ke sdílení a pozvání lidí k souboru. |
| `Sites.Read.All` | Číst dokumenty a položky seznamů ve všech kolekcích webů jménem přihlášeného uživatele | Agenti najdou weby, jejich knihovny a seznamy. |

Aplikace nemá `Mail.Send`: odesílání pošty zůstává vypnuté, dokud ho
Organizace vědomě nepřidá jako samostatné oprávnění se souhlasem správce.
Nežádá ani `MailboxSettings.ReadWrite`, oprávnění ke sdíleným schránkám
(`.Shared`) ani žádné oprávnění pro Teams; Teams přijdou ve druhé fázi, pro
čtení a koncepty.

Seznam `apps` v nastavení vybírá části, které Lazurio používá: `outlook` (pošta
a kalendář), `one_drive` (soubory) a `share_point` (soubory a weby). Přihlášení
žádá jen oprávnění vybraných částí a oprávnění k přihlášení. Když vydání
Lazuria požádá o oprávnění, ke kterému váš tenant souhlas nedal, přihlášení
ohlásí, že je potřeba schválení správce (`AADSTS65001` nebo `AADSTS90094`).
Admin Organizace požádá IT o doplnění souhlasu a uživatel se připojí znovu.

## Proč musí souhlas udělit IT

Nové tenanty používají výchozí nastavení souhlasu Microsoftu „Let Microsoft
manage your consent settings“. K 1. 11. 2026 Microsoft uvádí, že podle něj
uživatelé smějí souhlasit s delegovanými oprávněními kromě seznamu, ve kterém
jsou i `Mail.ReadWrite`, `Calendars.ReadWrite`, `Files.ReadWrite.All`
a `Sites.Read.All`. Aplikace, která vyžaduje přiřazení uživatelů, navíc podle
Microsoftu potřebuje souhlas správce vždy. Jeden souhlas správce za celý tenant
platí pro všechny uživatele a nikoho dalšího se aplikace na souhlas neptá.

Souhlas za celý tenant s delegovanými oprávněními Microsoft Graph smí podle
Microsoftu udělit Cloud Application Administrator, Application Administrator,
AI Administrator nebo Privileged Role Administrator. Aplikaci ve výchozím stavu
smí zaregistrovat každý uživatel tenantu; pokud to váš tenant omezuje, smí to
role Application Developer.

## Kdo o čem rozhoduje

| Kdo | Rozhoduje |
| --- | --- |
| IT, administrátoři tenantu | Zda aplikace existuje, její oprávnění a souhlas; kdo se smí připojit („Assignment required“ a skupina); podmíněný přístup; vypnutí nebo smazání aplikace. Vypínačem je Entra. |
| Admin Organizace v Lazuriu | Zapíše id tenantu, id aplikace, zvolené části a zaregistrované návratové adresy do nastavení Organizace a požádá IT o registraci adresy každého nového Prostředí. |
| Každý uživatel | Připojí svůj pracovní účet v Apps → Integrace, může přidat další účty a odpojuje je. |
| Agenti | Používají připojené účty. Účet nikdy nepřipojují sami a změny, které uvidí ostatní, dělají jen na pokyn uživatele. Je to pravidlo práce, které agenti dodržují, ne technická zábrana. |

## Postup Admina Organizace

IT pracuje ve vlastním prohlížeči. Do Prostředí se nikdo nepřihlašuje účtem
administrátora.

1. **Sepište návratové adresy.** Admin Organizace, třeba s pomocí agenta,
   sepíše návratovou adresu každého Prostředí Organizace na serveru podle vzoru
   výše.
2. **Zaregistrujte aplikaci.** V Microsoft Entra admin center otevřete
   Entra ID → App registrations → New registration. Pojmenujte aplikaci
   „Lazurio (&lt;Organizace&gt;)“, zvolte typ účtů pro jediný tenant („Single
   tenant only“, v manifestu `AzureADMyOrg`) a aplikaci zaregistrujte.
3. **Authentication.** Na stránce Authentication přidejte návratovou adresu,
   zvolte platformu „Mobile and desktop applications“ a jako vlastní návratové
   adresy (custom redirect URIs) zadejte všechny adresy z kroku 1
   a `http://localhost/api/oauth/callback`. Volbu „Allow public client flows“
   nechte vypnutou: Microsoft ji používá pro toky bez návratové adresy, třeba
   pro přihlášení kódem zařízení. Platformu Web ani Single-page application
   nepřidávejte.
4. **API permissions.** Přidejte devět delegovaných oprávnění Microsoft Graph
   z tabulky a zvolte „Grant admin consent for &lt;tenant&gt;“.
5. **Certificates & secrets.** Nic nepřidávejte. Microsoft uvádí, že veřejný
   klient při výměně autorizačního kódu tajný klíč ani certifikát používat
   nesmí.
6. **Omezte, kdo se smí připojit (doporučeno).** V Enterprise apps → aplikace →
   Properties nastavte „Assignment required“ na Yes a v Users and groups
   přiřaďte skupinu lidí, kteří se smějí připojit. Ostatní Microsoft odmítne
   chybou `AADSTS50105`. Microsoft upozorňuje, že uživatelé s rolí Global
   Administrator se přihlásí bez ohledu na toto nastavení.
7. **Předejte identifikátory.** Z Overview zkopírujte Application (client) ID
   a Directory (tenant) ID a předejte je Adminovi Organizace.
8. **Ověřte nastavení.** Zkontrolujte, že typ účtů je `AzureADMyOrg`, návratové
   adresy jsou přesně ty zamýšlené, platforma Web neexistuje, aplikace nemá
   tajné klíče ani certifikáty a souhlas je udělený pro všech devět oprávnění.
   Skutečným důkazem je až první připojení.
9. **Zapište nastavení.** Admin Organizace schválí pull request, který do
   souboru `lazurio.organization.json` Organizace přidá
   `settings.integrations.microsoft365`: `tenant_id`, `client_id`, `apps`
   a `callbacks`, tedy přesně zaregistrované návratové adresy Prostředí bez
   adresy `localhost`. Nastavení jiný klíč nepřijme, takže tajemství obsahovat
   nemůže. Před prvním nastavením ověřte, že všechna Prostředí Organizace
   běží na vydání Lazuria, které nastavení umí přečíst: starší čtenář odmítne
   celou sekci `settings`. Každé Prostředí Organizace pak nastavení použije
   samo a v Apps → Integrace ukáže jednu kartu „Microsoft 365“; Prostředí,
   které se na nastavení ptá Přehledu Organizace, se ptá každé dvě minuty.
10. **Uživatelé se připojí.** Každý uživatel otevře Apps → Integrace →
    Microsoft 365, zvolí Připojit, později Přidat účet, a jednou se přihlásí
    pracovním účtem. Kde je návratová adresa Prostředí zaregistrovaná, otevře
    se přihlášení ve vlastním prohlížeči uživatele. Jinak se otevře v prohlížeči
    Prostředí, který sdílejí agenti tohoto Prostředí; Lazurio v něm po skončení
    přihlášení smaže přihlašovací cookies Microsoftu. Účtem administrátora se
    v prohlížeči Prostředí nepřihlašujte.
11. **Nové Prostředí.** IT doplní jeho návratovou adresu v Authentication
    a stejná adresa jde pull requestem do `callbacks`. Do té doby se uživatelé
    tohoto Prostředí přihlašují v prohlížeči Prostředí.

Kroky 2 až 5 může IT místo admin centra udělat i přes Azure CLI v Azure Cloud
Shellu ve vlastním prohlížeči; ověření v kroku 8 zůstává stejné.

## Podmíněný přístup

- Interaktivní přihlášení se vyhodnocuje tam, kde je prohlížeč uživatele.
  Obnova tokenu a každé volání Graphu přicházejí z odchozí adresy Prostředí.
  Pokud máte zásady podle lokality, vyžádejte si od provozovatele vašeho
  nasazení Lazuria odchozí adresy Prostředí Organizace.
- Zásada, která vyžaduje vyhovující zařízení, zablokuje přihlášení
  v prohlížeči Prostředí chybou `AADSTS53000`. Přihlášení ve vlastním
  prohlížeči uživatele na spravovaném zařízení projít může; pozdější obnova
  z Prostředí ale na zásadu narazit může.
- Frekvence přihlášení (sign-in frequency) ukončí připojení po uplynutí
  intervalu chybou `AADSTS70043`. Microsoft odkládá frekvenci přihlášení
  u neinteraktivních přihlášení jen u důvěrných klientů a tato aplikace je
  veřejný klient. Uživatel se pak připojí znovu.
- Změna hesla zneplatní obnovovací tokeny z přihlášení heslem, ne
  z přihlášení bez hesla. Přístup ukončíte zablokováním účtu nebo odvoláním
  jeho relací.

## Data a tokeny

- Microsoft Graph komunikuje přímo s Executorem v Prostředí uživatele, tedy
  s místní MCP bránou, kterou Lazurio provozuje v každém Prostředí na serveru.
  Žádná další služba Lazuria mezi nimi není.
- Co agent při práci přečte, odchází k poskytovateli AI modelu, se kterým
  Prostředí pracuje.
- Executor drží tokeny připojení v Prostředí v souboru, který smí číst jen účet
  operačního systému Prostředí (`0600`). Soubor není šifrovaný. Tokeny může
  použít každý agent v tomto Prostředí (rozhodnutí 0172), ten, kdo spravuje
  server, na kterém Prostředí Organizace běží, a každý, kdo má zálohu
  Prostředí.
- V Týmovém Prostředí slouží připojený účet všem členům a agentům tohoto
  Prostředí.
- Executor každé zapisující volání (POST, PUT, PATCH, DELETE) pozastaví ke
  schválení, schválení ale dává sám agent. Pokyny Lazuria agentům říkají, ať
  ho přijmou jen pro koncept nebo pro Publikaci, kterou uživatel výslovně
  schválil. Je to pravidlo práce, ne technická zábrana.

## Odvolání přístupu

| Rozsah | Jak | Kdy to platí |
| --- | --- | --- |
| Jeden uživatel, i při odchodu z Organizace | Zablokujte účet nebo odvolejte relace uživatele (Microsoft Entra admin center → uživatel → Revoke sessions, nebo Graph `revokeSignInSessions`). | Další obnova selže a Executor pak ukáže připojení jako vypršelé. Už vydaný přístupový token platí do vypršení: Microsoft ve výchozím stavu přiděluje 60 až 90 minut a samotné odvolání může trvat několik minut. |
| Celá Organizace | Enterprise apps → aplikace → Properties → „Enabled for users to sign in?“ na No, nebo odeberte souhlas, nebo aplikaci smažte. | Microsoft pro aplikaci nevydá žádné další tokeny, ani přiřazeným uživatelům. Už vydané tokeny vyprší jako výše. |
| Jedno připojení, uživatelem | Apps → Integrace → ⋯ → Odpojit. | Připojení se smaže z Executoru Prostředí. |

Lazurio samo nic neodpojí a na jeho straně nic nevyprší. Odebrání nastavení
z nastavení Organizace přestane aplikaci nabízet, existující připojení ale
zůstanou; vypínačem proto zůstává Entra. Když Prostředí přechází k jinému
člověku, účty, které se v něm už používat nemají, odpojí ten, kdo ho předává,
nebo ten, kdo ho přebírá. U člověka, který z Organizace odchází, je
spolehlivým odstřižením blokace účtu v IT. Microsoft dává obnovovacím tokenům
výchozí životnost 90 dní a při každém použití je nahradí novými, takže
připojení, které se tak dlouho nepoužije, potřebuje nové přihlášení.

## Kde aktivitu uvidíte

- **Přihlašovací protokoly Microsoft Entra** (sign-in logs) ukazují
  interaktivní přihlášení uživatele do aplikace i neinteraktivní přihlášení,
  při kterých klient obnovovacím tokenem získává přístupový token, včetně
  adres.
- **Audit Microsoft Purview** (jednotný protokol auditu) zaznamenává operace
  uživatelů a administrátorů v Exchange Online, SharePointu a OneDrivu pod účtem
  uživatele. Co se zaznamená a jak dlouho se to uchová, závisí na vašich
  licencích auditu.

## Proč u aplikace stojí „Unverified“

Aplikaci zaregistrovala vaše Organizace ve vlastním tenantu, takže vydavatelem
je vaše Organizace, ne Lazurio. Microsoft popisuje ověření vydavatele hlavně
jako věc aplikací pro více tenantů. Naše hodnocení: u aplikace pro jediný
tenant se souhlasem správce tento štítek nic nemění.

## Co Lazurio nepoužívá

- **Work IQ MCP.** Oficiální MCP server Microsoftu pro data Microsoftu 365 není
  výchozí cestou Lazuria. Jeho jediné delegované oprávnění `WorkIQAgent.Ask`
  zahrnuje čtení i zápis ve zdrojích Microsoftu 365, na které agenti Work IQ za
  uživatele dosáhnou, administrátor musí Work IQ nejdřív zapnout a účtuje se podle
  využití. Naše hodnocení: Organizace, která ho chce, ho může později přidat
  k téže aplikaci a do Executoru.
- **Nové konektory ChatGPT nebo claude.ai** a aplikace zaregistrované jiným
  vydavatelem: souhlas správce patří vaší vlastní aplikaci.
- **Komunitní MCP servery**, které vedle Executoru drží vlastní cache tokenů.
- **Composio pro pracovní účty**, jakmile je aplikace Organizace nastavená.
  Osobní účty Microsoftu (Outlook.com) aplikaci Organizace použít nemohou;
  v Osobním Prostředí zůstávají na Composiu. Viz
  [napojení Prostředí na aplikace](/cs/environment-app-connections/).

V GEN3, tedy v Lazurio Rootu na počítači uživatele, karta aplikace Organizace
není; runbook GEN3 připojí účet přes Executor jen na výslovný pokyn uživatele,
se stejnou registrací aplikace.

## Zdroje

Stránky Microsoft Learn byly přečtené 1. 11. 2026.

- Microsoft: [oprávnění a souhlas](https://learn.microsoft.com/en-us/entra/identity-platform/permissions-consent-overview), [přehled oprávnění Graphu](https://learn.microsoft.com/en-us/graph/permissions-reference), [zásady souhlasu](https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/manage-app-consent-policies), [souhlas správce za celý tenant](https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/grant-admin-consent), [kdo smí registrovat aplikace](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/delegate-app-roles), [registrace aplikace](https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app), [přidání návratové adresy](https://learn.microsoft.com/en-us/entra/identity-platform/how-to-add-redirect-uri), [vlastnosti podnikové aplikace](https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/application-properties), [pravidla návratových adres](https://learn.microsoft.com/en-us/entra/identity-platform/reply-url), [toky veřejného klienta](https://learn.microsoft.com/en-us/entra/identity-platform/scenario-desktop-app-configuration), [tok autorizačního kódu](https://learn.microsoft.com/en-us/entra/identity-platform/v2-oauth2-auth-code-flow).
- Microsoft: [přístupové tokeny](https://learn.microsoft.com/en-us/entra/identity-platform/access-tokens), [obnovovací tokeny](https://learn.microsoft.com/en-us/entra/identity-platform/refresh-tokens), [odvolání přístupu uživatele](https://learn.microsoft.com/en-us/entra/identity/users/users-revoke-access), [`revokeSignInSessions`](https://learn.microsoft.com/en-us/graph/api/user-revokesigninsessions), [frekvence přihlášení](https://learn.microsoft.com/en-us/entra/identity/conditional-access/concept-session-lifetime), [chybové kódy](https://learn.microsoft.com/en-us/entra/identity-platform/reference-error-codes), [neinteraktivní přihlášení](https://learn.microsoft.com/en-us/entra/identity/monitoring-health/concept-noninteractive-sign-ins), [audit v Purview](https://learn.microsoft.com/en-us/purview/audit-solutions-overview), [ověření vydavatele](https://learn.microsoft.com/en-us/entra/identity-platform/publisher-verification-overview).
- Microsoft: [vytvoření události](https://learn.microsoft.com/en-us/graph/api/user-post-events), [zrušení události](https://learn.microsoft.com/en-us/graph/api/event-cancel), [odkazy ke sdílení](https://learn.microsoft.com/en-us/graph/api/driveitem-createlink), [pozvání k souboru](https://learn.microsoft.com/en-us/graph/api/driveitem-invite), [přehled Work IQ](https://learn.microsoft.com/en-us/microsoft-365/copilot/extensibility/work-iq/) a [oprávnění Work IQ](https://learn.microsoft.com/en-us/microsoft-365/copilot/extensibility/work-iq/permissions).
- Lazurio: [runbook Microsoft 365](https://github.com/HumanAndMachines/Lazurio/blob/66e437f7e563574ea35b79dd1bdd193fd0f6b4b6/manual/integrations/microsoft-365.md) a [stránka pro IT](https://github.com/HumanAndMachines/Lazurio/blob/66e437f7e563574ea35b79dd1bdd193fd0f6b4b6/manual/integrations/microsoft-365-for-it.md), [tvar nastavení a pořadí čtenářů](https://github.com/HumanAndMachines/Lazurio/blob/66e437f7e563574ea35b79dd1bdd193fd0f6b4b6/manual/lazurio-manifest-family.md#microsoft-365-company-app-settingsintegrationsmicrosoft365), v Lazurio Platform [aplikace Organizace](https://github.com/Lazurio/LazurioPlatform/blob/a2927744b5a87113425f93f5e1517ac97b2f6c06/docs/integrations.md#the-microsoft-365-company-app) a [rozhodnutí F45](https://github.com/Lazurio/LazurioPlatform/blob/a2927744b5a87113425f93f5e1517ac97b2f6c06/docs/decisions.md#f45--organization-settings-reach-the-environment-asked-through-its-relay-recorded-in-the-folder-reported-back) (anglicky) a [rejstřík rozhodnutí](https://github.com/Lazurio/LazurioPlatform/blob/4d5ee62a963a0ae2fc98287f0072e739ff6d2cd8/docs/decision-register.md) (rozhodnutí 0162, 0172 a 0194, anglicky).
