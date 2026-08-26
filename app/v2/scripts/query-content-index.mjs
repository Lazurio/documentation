import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url))
const defaultIndexPath = path.resolve(scriptDirectory, '../../../data/v2/public/content-index.json')

export async function queryContentIndex(query, indexPath = defaultIndexPath) {
  const index = JSON.parse(await readFile(indexPath, 'utf8'))
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
