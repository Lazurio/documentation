import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { loadDocuments } from './content-library.mjs'
import { findLocaleParityErrors } from './locale-parity.mjs'

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url))
const moduleRoot = path.resolve(scriptDirectory, '../../..')
const docsRoot = path.join(moduleRoot, 'data/v2/docs')
const sourceMap = JSON.parse(await readFile(path.join(moduleRoot, 'data/v2/source-map.json'), 'utf8'))
const documentation = JSON.parse(await readFile(path.join(moduleRoot, 'data/v2/documentation.json'), 'utf8'))
const documents = await loadDocuments(docsRoot)
const sourceIds = new Set(sourceMap.sources.map((source) => source.id))
const identities = new Set()
const documentsByStableId = new Map()
const errors = []
const supportedLocales = Array.isArray(documentation.locales) ? documentation.locales : []
const required = ['title', 'stableId', 'locale', 'summary', 'updatedAt', 'reviewedAt', 'reviewOwner', 'sourceRefs', 'audience']
const today = new Date().toISOString().slice(0, 10)

if (!Array.isArray(documentation.locales) || supportedLocales.length !== new Set(supportedLocales).size) {
  errors.push('documentation.json locales must be a unique array')
}
if (!supportedLocales.includes(documentation.default_locale)) {
  errors.push('documentation.json default_locale must be included in locales')
}

for (const source of sourceMap.sources) {
  if (!source.id || !source.title || !source.url || !source.publisher || !source.reviewDueAt) {
    errors.push(`Source map entry is incomplete: ${JSON.stringify(source)}`)
  }
  if (source.reviewDueAt < today) errors.push(`Evidence source ${source.id} expired on ${source.reviewDueAt}`)
}

for (const document of documents) {
  const { frontmatter, relativePath, markdown } = document
  for (const field of required) {
    if (frontmatter[field] === undefined || frontmatter[field] === '') {
      errors.push(`${relativePath}: missing ${field}`)
    }
  }
  const locale = relativePath.split(path.sep)[0]
  if (!supportedLocales.includes(locale)) errors.push(`${relativePath}: unsupported locale directory ${locale}`)
  if (frontmatter.locale !== locale) {
    errors.push(`${relativePath}: frontmatter locale ${frontmatter.locale ?? 'missing'} must match ${locale}`)
  }
  const identity = `${locale}:${frontmatter.stableId}`
  if (identities.has(identity)) errors.push(`${relativePath}: duplicate ${identity}`)
  identities.add(identity)
  if (!/^lazurio-doc-[a-z0-9-]+$/.test(frontmatter.stableId ?? '')) {
    errors.push(`${relativePath}: invalid stableId`)
  }
  if (!Array.isArray(frontmatter.sourceRefs) || frontmatter.sourceRefs.length === 0) {
    errors.push(`${relativePath}: sourceRefs must not be empty`)
  } else {
    for (const ref of frontmatter.sourceRefs) {
      if (!sourceIds.has(ref)) errors.push(`${relativePath}: unknown sourceRef ${ref}`)
    }
  }
  if (!Array.isArray(frontmatter.audience) || frontmatter.audience.length === 0) {
    errors.push(`${relativePath}: audience must not be empty`)
  }
  if (frontmatter.updatedAt > frontmatter.reviewedAt) {
    errors.push(`${relativePath}: reviewedAt must cover the latest update`)
  }
  if (frontmatter.trustCritical && frontmatter.secondReviewOwner !== 'Pablo AI') {
    errors.push(`${relativePath}: trust-critical content requires Pablo AI as secondReviewOwner`)
  }
  if (markdown.length < 200) errors.push(`${relativePath}: document is too short to be useful`)
  const localizedDocuments = documentsByStableId.get(frontmatter.stableId) ?? []
  localizedDocuments.push(document)
  documentsByStableId.set(frontmatter.stableId, localizedDocuments)
}

for (const locale of supportedLocales) {
  if (!documents.some((document) => document.relativePath === `${locale}/index.mdx`)) {
    errors.push(`${locale}: documentation entry point is missing`)
  }
}

for (const [stableId, localizedDocuments] of documentsByStableId) {
  errors.push(...findLocaleParityErrors(stableId, localizedDocuments, supportedLocales))
}

if (errors.length > 0) {
  console.error(errors.join('\n'))
  process.exit(1)
}
console.log(`Validated ${documents.length} documents and ${sourceMap.sources.length} evidence sources.`)
