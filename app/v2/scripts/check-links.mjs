import { access } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { loadDocuments } from './content-library.mjs'

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url))
const moduleRoot = path.resolve(scriptDirectory, '../../..')
const docsRoot = path.join(moduleRoot, 'data/v2/docs')
const publicRoot = path.join(moduleRoot, 'data/v2/public')
const documents = await loadDocuments(docsRoot)
const routes = new Set(documents.map((document) => document.route))
const generatedRoutes = new Set(['/sitemap-index.xml'])
const errors = []
const linkPattern = /\[[^\]]*\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g

for (const document of documents) {
  for (const match of document.markdown.matchAll(linkPattern)) {
    const href = match[1]
    if (href.startsWith('#') || href.startsWith('mailto:')) continue
    if (/^https:\/\//.test(href)) {
      try {
        new URL(href)
      } catch {
        errors.push(`${document.relativePath}: invalid URL ${href}`)
      }
      continue
    }
    if (href.startsWith('/')) {
      const target = href.split('#')[0]
      if (routes.has(target) || generatedRoutes.has(target) || target === '/') continue
      try {
        await access(path.join(publicRoot, target.replace(/^\//, '')))
      } catch {
        errors.push(`${document.relativePath}: unknown internal target ${href}`)
      }
      continue
    }
    errors.push(`${document.relativePath}: relative links are forbidden; use a canonical route (${href})`)
  }
}

if (errors.length > 0) {
  console.error(errors.join('\n'))
  process.exit(1)
}
console.log(`Checked links in ${documents.length} documents.`)
