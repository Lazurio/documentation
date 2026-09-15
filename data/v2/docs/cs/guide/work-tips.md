---
title: Tipy pro práci
description: Praktické postupy, které Vám usnadní práci s AI Kolegou.
stableId: lazurio-doc-guide-work-tips
locale: cs
summary: Jak AI Kolega používá vestavěný prohlížeč svého nástroje (Browser Use) pro práci na webu, zatímco Vy držíte kontrolu nad přístupy a důležitými kroky.
updatedAt: "2026-09-15"
reviewedAt: "2026-09-15"
reviewOwner: Anna Blazickova
secondReviewOwner: Pablo AI
trustCritical: true
sourceRefs:
  - lazurio-collaboration-model
  - lazurio-external-apps
  - openai-browser
audience:
  - decision-maker
  - builder
  - agent
---

## Když má AI Kolega pracovat na webu

**Browser Use** znamená práci přímo v rozhraní webové stránky: agent otevírá stránky,
kliká a vyplňuje pole. Není to totéž jako pouhé vyhledávání odkazů a nejde
o součást Lazuria. Dostupnost závisí na konkrétním AI nástroji.

<figure>
  <a href="/guide-assets/chatgpt-browser-illustration-cs.png" aria-label="Otevřít ilustrační maketu v plné velikosti">
    <img src="/guide-assets/chatgpt-browser-illustration-cs.png" alt="Ilustrační maketa: vlevo chat ChatGPT s promptem @Browser, vpravo panel Browser s fiktivní kontaktní stránkou." width="1605" height="980" loading="lazy" />
  </a>
  <figcaption>Ilustrační maketa vytvořená pomocí AI, nikoli skutečný screenshot. Vlevo zadáváte úkol, vpravo sledujete otevřený web. Údaje i web jsou smyšlené; skutečné rozhraní se může lišit. Kliknutím obrázek zvětšíte.</figcaption>
</figure>

## Jak začít v ChatGPT

V desktopové aplikaci ChatGPT můžete mít chat a vestavěný prohlížeč vedle sebe.
Otevřete ho z lišty nebo zkratkou **Cmd + Shift + B** na Macu
(**Ctrl + Shift + B** ve Windows). V zadání použijte **`@Browser`**
a vyberte nabízenou zmínku prohlížeče. Stejné rozhraní nečekejte v Codex CLI
nebo IDE rozšíření.

1. **Zadejte adresu a cíl.** Co má agent najít nebo připravit?
2. **Určete hranice.** Co může číst a co nesmí měnit nebo odeslat?
3. **Sledujte otevřenou stránku.** Zkontrolujte web a případné žádosti o přístup.
4. **Přihlaste se osobně.** Vestavěný prohlížeč má vlastní profil; vaše běžné přihlášení se automaticky nepřenáší.
5. **Ověřte výsledek.** Nechte si ukázat zdroj nebo připravený formulář.

## Prompt: najdi informace na webu

Zkopírujte text do svého chatu a nahraďte hranaté závorky konkrétními údaji.

```text
@Browser Použij vestavěný prohlížeč a otevři [adresa webu].
Na stránce zjisti [co potřebuji vědět].
Pracuj přímo s otevřenou stránkou, ne jen s výsledky vyhledávání.
Nic neodesílej, nenakupuj a neměň nastavení.
Na konci shrň zjištění a přidej odkazy na použité stránky.
Pokud Browser Use nemáš, řekni to. Nepředstírej ovládání stránky.
```

## Prompt: připrav formulář, ale neodesílej ho

```text
@Browser Otevři [adresa webu] a pomoz mi připravit [název formuláře].
Nejprve prohlédni pole a řekni mi, jaké údaje potřebuješ.
Pokud je nutné přihlášení, zastav se a nech mě přihlásit osobně.
Vyplň pouze údaje, které ti pro tento úkol poskytnu.
Před odesláním zastav a ukaž mi vyplněný formulář ke kontrole.
Neodesílej ho bez mého výslovného souhlasu s tímto odesláním.
Hesla ani ověřovací kódy po mně v chatu nechtěj.
```

## Jak agenta nasměrovat

Pište konkrétně, například: **„Pracuj v právě otevřené kartě. Ukaž mi sekci
Kontakty a zatím na nic neklikej.“** Pokud rozhraní nabízí komentáře ke stránce,
označte přímo problematické místo. Když nástroj není dostupný, požádejte
o vysvětlení podporované varianty; prompt sám chybějící nástroj nenainstaluje.

:::note[Mějte na paměti]
Přístup na web není souhlas se všemi akcemi. Obsah stránky může obsahovat
zavádějící pokyny a nemá přepsat vaše zadání. Citlivé, destruktivní a publikační
kroky schvalujte zvlášť. Hesla a tajné údaje nezadávejte do běžného chatu.
:::

Podklad pro ovládání a dostupnost: [OpenAI — Browser](https://learn.chatgpt.com/docs/browser).
Rozhraní se může měnit podle verze aplikace a nastavení pracovního prostředí.
