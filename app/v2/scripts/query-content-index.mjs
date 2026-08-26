import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url))
const defaultIndexPath = path.resolve(scriptDirectory, '../../../data/v2/public/content-index.json')

async function readContentIndex(indexPath) {
  return JSON.parse(await readFile(indexPath, 'utf8'))
}

export async function queryContentIndex(query, indexPath = defaultIndexPath) {
  const index = await readContentIndex(indexPath)
  const terms = query.toLocaleLowerCase('en').split(/\s+/).filter(Boolean)
  return index.documents
    .map((document) => {
      const haystack = [document.title, document.summary, document.markdown, ...document.audience]
        .join('\n')
        .toLocaleLowerCase('en')
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
  return (
    index.documents.find(
      (document) =>
        document.route === identifier ||
        (document.stableId === identifier && document.locale === locale),
    ) ?? null
  )
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const query = process.argv.slice(2).join(' ').trim()
  if (!query) {
    console.error('Usage: bun scripts/query-content-index.mjs <query>')
    process.exitCode = 2
  } else {
    const results = await queryContentIndex(query)
    console.log(JSON.stringify(results, null, 2))
  }
}
