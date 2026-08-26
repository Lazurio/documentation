import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url))
const defaultIndexPath = path.resolve(scriptDirectory, '../../../data/v2/public/content-index.json')

async function readContentIndex(indexPath) {
  return JSON.parse(await readFile(indexPath, 'utf8'))
}

function normalizeOptions(options) {
  return typeof options === 'string' ? { indexPath: options } : options
}

function supportsLocale(index, locale) {
  const supportedLocales = index.supportedLocales ?? [
    ...new Set(index.documents.map((document) => document.locale)),
  ]
  return supportedLocales.includes(locale)
}

export async function queryContentIndex(query, options = {}) {
  const { locale = 'en', indexPath = defaultIndexPath } = normalizeOptions(options)
  const index = await readContentIndex(indexPath)
  if (!supportsLocale(index, locale)) return []
  const terms = query.toLocaleLowerCase(locale).split(/\s+/).filter(Boolean)
  return index.documents
    .filter((document) => document.locale === locale)
    .map((document) => {
      const haystack = [document.title, document.summary, document.markdown, ...document.audience]
        .join('\n')
        .toLocaleLowerCase(locale)
      return { document, score: terms.reduce((score, term) => score + (haystack.includes(term) ? 1 : 0), 0) }
    })
    .filter(({ score }) => score > 0)
    .sort((left, right) => right.score - left.score || left.document.title.localeCompare(right.document.title))
    .map(({ document }) => document)
}

export async function getContentDocument(
  identifier,
  { locale = 'en', indexPath = defaultIndexPath } = {},
) {
  if (
    typeof identifier !== 'string' ||
    identifier.length === 0 ||
    identifier.includes('..') ||
    identifier.includes('\\') ||
    identifier.includes('\0')
  ) {
    return null
  }
  const index = await readContentIndex(indexPath)
  if (!supportsLocale(index, locale)) return null
  return (
    index.documents.find(
      (document) =>
        document.route === identifier ||
        (document.stableId === identifier && document.locale === locale),
    ) ?? null
  )
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2)
  const localeFlag = args.indexOf('--locale')
  const locale = localeFlag >= 0 ? args.splice(localeFlag, 2)[1] : 'en'
  const query = args.join(' ').trim()
  if (!query) {
    console.error('Usage: bun scripts/query-content-index.mjs [--locale en|cs] <query>')
    process.exitCode = 2
  } else {
    const results = await queryContentIndex(query, { locale })
    console.log(JSON.stringify(results, null, 2))
  }
}
