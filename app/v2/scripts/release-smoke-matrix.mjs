import assert from 'node:assert/strict'
import { access } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { loadDocuments } from './content-library.mjs'
import { sidebar } from '../../../data/v2/sidebar.mjs'

const docsRoot = fileURLToPath(new URL('../../../data/v2/docs/', import.meta.url))
const publicRoot = new URL('../../../data/v2/public/', import.meta.url)
const documents = await loadDocuments(docsRoot)
const publicDocuments = documents.filter(({ frontmatter }) => !frontmatter.draft)
const documentRoutes = new Set(publicDocuments.map(({ route }) => route))
const guideDocuments = publicDocuments.filter(({ route }) => /^\/(en|cs)\/guide\//u.test(route))
const guideSlugs = []
function visit(items) {
  for (const item of items) {
    if (item.slug === 'guide' || item.slug?.startsWith('guide/')) guideSlugs.push(item.slug)
    if (item.items) visit(item.items)
  }
}
visit(sidebar)
const locales = [...new Set(publicDocuments.map(({ frontmatter }) => frontmatter.locale))]
const sidebarRoutes = locales.flatMap((locale) => guideSlugs.map((slug) => `/${locale}/${slug}/`))
export const guideRoutes = guideDocuments.map(({ route }) => route).sort()
assert.ok(guideRoutes.length, 'Guide must not be empty')
assert.deepEqual([...new Set(sidebarRoutes)].sort(), guideRoutes, 'Guide sidebar and public documents must agree')

const assets = new Set()
for (const { markdown } of guideDocuments) {
  const links = [
    ...Array.from(markdown.matchAll(/(?:src|href)\s*=\s*["'](\/[^"'#?]+)(?:[?#][^"']*)?["']/gu), (match) => match[1]),
    ...Array.from(markdown.matchAll(/\[[^\]]*\]\((\/[^)\s?#]+)(?:[?#][^)\s]*)?\)/gu), (match) => match[1]),
  ]
  for (const link of links) {
    if (documentRoutes.has(link)) continue
    assert.ok(!link.includes('..') && !link.startsWith('//'), `Invalid public asset: ${link}`)
    await access(new URL(link.slice(1), publicRoot))
    assets.add(link)
  }
}
export const guideAssets = [...assets].sort()
export const guideMatrix = [...guideRoutes, ...guideAssets]
export function verifyGuideCoverage(paths) {
  const actual = new Set(paths)
  for (const pathname of guideMatrix) assert.ok(actual.has(pathname), `Smoke matrix omits ${pathname}`)
}
export const smokePaths = [...new Set([
  '/en/', ...guideMatrix, '/en/it-administrators/', '/en/public-evidence/',
  '/diagrams/company-to-github.svg', '/diagrams/company-to-github-mobile.svg',
  '/diagrams/human-directed-work.svg', '/diagrams/human-directed-work-mobile.svg',
  '/diagrams/lazurio-data-flow.svg', '/diagrams/draft-publication-flow.svg',
  '/diagrams/draft-publication-flow-mobile.svg',
])]
verifyGuideCoverage(smokePaths)
