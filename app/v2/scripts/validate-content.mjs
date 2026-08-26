import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { loadDocuments } from './content-library.mjs'

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url))
const moduleRoot = path.resolve(scriptDirectory, '../../..')
const docsRoot = path.join(moduleRoot, 'data/v2/docs')
const sourceMap = JSON.parse(await readFile(path.join(moduleRoot, 'data/v2/source-map.json'), 'utf8'))
const documents = await loadDocuments(docsRoot)
const sourceIds = new Set(sourceMap.sources.map((source) => source.id))
const identities = new Set()
const errors = []
const required = ['title', 'stableId', 'summary', 'updatedAt', 'reviewedAt', 'reviewOwner', 'sourceRefs', 'audience']
const today = new Date().toISOString().slice(0, 10)

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
}

if (!documents.some((document) => document.relativePath === 'en/index.mdx')) {
  errors.push('English documentation entry point is missing')
}

if (errors.length > 0) {
  console.error(errors.join('\n'))
  process.exit(1)
}
console.log(`Validated ${documents.length} documents and ${sourceMap.sources.length} evidence sources.`)
