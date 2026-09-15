import assert from 'node:assert/strict'
import test from 'node:test'
import { findLocaleParityErrors } from './locale-parity.mjs'
// Reviewed bilingual claims, not a general semantic-translation validator.
// Intentional wording changes require reviewing both excerpts together.
import { readFileSync } from 'node:fs'
const safetyClaims = [
  [
    "data-access-security",
    "broker boundary",
    "New ChatGPT or claude.ai connectors and shared hosted brokers sit outside that per-machine custody model.",
    "Nové konektory ChatGPT nebo claude.ai a sdílené hostované zprostředkovatele tento model správy přístupů pro jednotlivá zařízení nepokrývá."
  ],
  [
    "data-access-security",
    "remote MCP",
    "A provider-operated remote MCP can fit when its configuration and token remain separately revocable for the machine.",
    "Vzdálený MCP provozovaný poskytovatelem může model splnit, pokud lze jeho konfiguraci a token pro dané zařízení samostatně odvolat."
  ],
  [
    "data-access-security",
    "filesystem acceptance",
    "Confirm GitHub denial for an identity without the grant, then separately test the chosen client's local filesystem boundary.",
    "Ověřte zamítnutí v GitHubu pro identitu bez oprávnění a zvlášť otestujte hranici přístupu zvoleného klienta k lokálním souborům."
  ],
  [
    "data-access-security",
    "scan limits",
    "They are not general secret scanning, SAST or DLP for every Organization.",
    "Nejde o obecné vyhledávání tajných údajů, statickou analýzu kódu (SAST) ani ochranu před únikem dat (DLP) pro všechny Organizace."
  ],
  [
    "data-access-security",
    "hosted custody",
    "If enabled, each needs its own operator, identity, storage, network path, processor list, logs, retention, backup, deletion and incident controls.",
    "U každé zapnuté služby určete provozovatele, identitu, úložiště, síťovou cestu, zpracovatele dat, logy, dobu uchování, zálohy, mazání a postup při incidentu."
  ],
  [
    "deployment-operations",
    "loopback",
    "Loopback listeners are not caller authentication.",
    "Naslouchání na loopback adrese samo neověřuje identitu volajícího."
  ],
  [
    "deployment-operations",
    "experimental CLI",
    "| CLI v0 | Experimental | Pin versions and test any production automation that depends on it. |",
    "| CLI v0 | Experimentální | Používejte pevně určené verze a otestujte produkční automatizaci, která na CLI závisí. |"
  ],
  [
    "deployment-operations",
    "target only",
    "| Packaged CLI and generated non-Git root | Future target | Do not include them in a current bill of materials. |",
    "| Balíčkované CLI a generovaný root bez Gitu | Budoucí cíl | Nezahrnujte je do seznamu dnes nasazovaných součástí. |"
  ],
  [
    "deployment-operations",
    "filesystem acceptance",
    "Prove the normal task, a repository denial, the client's local filesystem boundary, credential revocation, failed CI, rollback, offboarding and incident escalation.",
    "Ověřte běžný průběh úkolu, zamítnutý přístup k repozitáři, hranici přístupu klienta k lokálním souborům, odvolání přihlašovacího údaje, selhání CI, návrat k předchozí verzi, odebrání přístupů a eskalaci incidentu."
  ],
  [
    "deployment-operations",
    "maturity decision",
    "Which components are stable, experimental, optional or target-only?",
    "Které součásti jsou stabilní, experimentální, volitelné nebo zatím pouze plánované?"
  ],
  [
    "it-administrators",
    "assurance",
    "No certification, universal service level, retention period or deployment topology is claimed.",
    "Nepřislibujeme certifikaci, univerzální úroveň služby, dobu uchování dat ani jednotné uspořádání nasazení."
  ],
  [
    "it-administrators",
    "hosted inventory",
    "Optional hosted services are separate services and belong in the inventory only when a deployment enables them.",
    "Volitelné hostované služby jsou samostatné služby; do seznamu součástí patří jen tehdy, když je konkrétní nasazení zapne."
  ],
  [
    "it-administrators",
    "file transmission",
    "A readable file may be sent to the model provider as task context.",
    "Čitelný soubor může klient odeslat poskytovateli modelu jako kontext úkolu."
  ],
  [
    "it-administrators",
    "provider draft",
    "A provider draft may already transmit data; where no provider-enforced restriction exists, explicit authorization remains a process control.",
    "Už návrh uložený u poskytovatele může znamenat přenos dat; pokud poskytovatel omezení technicky nevynucuje, výslovný souhlas zůstává procesním pravidlem."
  ]
]
const normalizeClaim = text => text.replace(/\s+/g, ' ').trim()
for (const [page, claim, en, cs] of safetyClaims) {
  for (const [locale, expected] of [['en', en], ['cs', cs]]) {
    test(`trust-critical content: ${page}/${locale} preserves ${claim}`, () => {
      const source = readFileSync(new URL(`../../../data/v2/docs/${locale}/${page}.md`, import.meta.url), 'utf8')
      const body = source.replace(/^---[\s\S]*?\n---\n/, '').replace(/<!--[\s\S]*?-->/g, '')
      assert.ok(normalizeClaim(body).includes(normalizeClaim(expected)), `${page}/${locale}: missing or changed reviewed claim: ${claim}`)
    })
  }
}

function localizedDocument(locale, overrides = {}) {
  return {
    relativePath: `${locale}/example.md`,
    frontmatter: {
      locale,
      sourceRefs: ['source-a'],
      audience: ['it-admin'],
      reviewOwner: 'Matej Suchanek',
      reviewedAt: '2026-08-26',
      trustCritical: true,
      secondReviewOwner: 'Pablo AI',
      ...overrides,
    },
  }
}

test('locale peers preserve review ownership and freshness', () => {
  const english = localizedDocument('en')
  const czech = localizedDocument('cs')
  assert.deepEqual(findLocaleParityErrors('example', [english, czech], ['en', 'cs']), [])

  assert.ok(
    findLocaleParityErrors(
      'example',
      [english, localizedDocument('cs', { reviewOwner: 'Someone Else' })],
      ['en', 'cs'],
    ).some((error) => error.includes('reviewOwner')),
  )
  assert.ok(
    findLocaleParityErrors(
      'example',
      [localizedDocument('en', { reviewedAt: '2026-08-26' }), localizedDocument('cs', { reviewedAt: '2026-08-25' })],
      ['en', 'cs'],
    ).some((error) => error.includes('reviewedAt')),
  )
})

test('locale peers report a missing configured locale before comparing metadata', () => {
  const english = localizedDocument('en')
  const unsupportedGerman = localizedDocument('de')

  assert.deepEqual(
    findLocaleParityErrors('example', [english, unsupportedGerman], ['en', 'cs']),
    ['example: missing cs document'],
  )
})
