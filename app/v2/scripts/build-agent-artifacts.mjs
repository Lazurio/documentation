import { execFileSync } from 'node:child_process'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { loadDocuments } from './content-library.mjs'

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url))
const moduleRoot = path.resolve(scriptDirectory, '../../..')
const docsRoot = path.join(moduleRoot, 'data/v2/docs')
const publicRoot = path.join(moduleRoot, 'data/v2/public')
const sourceMapPath = path.join(moduleRoot, 'data/v2/source-map.json')

function git(args, fallback = 'unknown') {
  try {
    return execFileSync('git', args, { cwd: moduleRoot, encoding: 'utf8' }).trim() || fallback
  } catch {
    return fallback
  }
}

export async function buildAgentArtifacts() {
  const documents = await loadDocuments(docsRoot)
  const sourceMap = JSON.parse(await readFile(sourceMapPath, 'utf8'))
  const commit = git(['rev-parse', 'HEAD'])
  const dirty = git(['status', '--porcelain'], '') !== ''
  const generatedAt = git(['show', '-s', '--format=%cI', 'HEAD'], new Date(0).toISOString())

  const entries = documents.map(({ frontmatter, markdown, relativePath, route }) => ({
    stableId: frontmatter.stableId,
    locale: relativePath.split(path.sep)[0],
    route,
    title: frontmatter.title,
    summary: frontmatter.summary,
    audience: frontmatter.audience,
    updatedAt: frontmatter.updatedAt,
    reviewedAt: frontmatter.reviewedAt,
    reviewOwner: frontmatter.reviewOwner,
    secondReviewOwner: frontmatter.secondReviewOwner ?? null,
    trustCritical: frontmatter.trustCritical ?? false,
    sourceRefs: frontmatter.sourceRefs,
    markdown,
  }))

  const contentIndex = {
    schema: 'lazurio.documentation.content-index.v1',
    canonicalBaseUrl: 'https://documentation.lazurio.ai',
    sourceRepository: 'https://github.com/Lazurio/documentation',
    sourceCommit: commit,
    sourceTreeDirty: dirty,
    generatedAt,
    sources: sourceMap.sources.map(({ id, title, url, publisher }) => ({ id, title, url, publisher })),
    documents: entries,
  }

  const lines = [
    '# Lazurio documentation',
    '',
    '> Public, evidence-backed documentation explaining how Lazurio works, what it is good for, and how to evaluate it.',
    '',
    `Source commit: ${commit}${dirty ? ' (local dirty preview)' : ''}`,
    '',
    '## Documentation',
    '',
    ...entries.flatMap((entry) => [
      `- [${entry.title}](https://documentation.lazurio.ai${entry.route}): ${entry.summary}`,
    ]),
    '',
    '## Machine-readable index',
    '',
    '- [content-index.json](https://documentation.lazurio.ai/content-index.json)',
    '- [sitemap.xml](https://documentation.lazurio.ai/sitemap-index.xml)',
    '',
  ]

  await mkdir(publicRoot, { recursive: true })
  await Promise.all([
    writeFile(path.join(publicRoot, 'content-index.json'), `${JSON.stringify(contentIndex, null, 2)}\n`),
    writeFile(path.join(publicRoot, 'llms.txt'), lines.join('\n')),
    writeFile(
      path.join(publicRoot, 'robots.txt'),
      'User-agent: *\nAllow: /\n\nSitemap: https://documentation.lazurio.ai/sitemap-index.xml\n',
    ),
  ])
  return contentIndex
}

const isDirectExecution =
  process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)

if (isDirectExecution) {
  buildAgentArtifacts()
    .then((index) => console.log(`Built agent artifacts for ${index.documents.length} documents.`))
    .catch((error) => {
      console.error(error instanceof Error ? error.message : error)
      process.exitCode = 1
    })
}
