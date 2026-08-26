import { readdir, readFile } from 'node:fs/promises'
import path from 'node:path'
import matter from 'gray-matter'

export async function walkDocumentation(directory) {
  const entries = await readdir(directory, { withFileTypes: true })
  const files = []
  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name)
    if (entry.isDirectory()) files.push(...(await walkDocumentation(fullPath)))
    if (entry.isFile() && /\.mdx?$/.test(entry.name)) files.push(fullPath)
  }
  return files.sort()
}

export function documentRoute(relativePath) {
  const withoutExtension = relativePath.replace(/\.mdx?$/, '')
  const segments = withoutExtension.split(path.sep)
  if (segments.at(-1) === 'index') segments.pop()
  return `/${segments.join('/')}/`.replace(/\/+/g, '/')
}

export function plainMarkdown(value) {
  return value
    .replace(/^import\s.+$/gm, '')
    .replace(/<\/?(?:CardGrid|Card|LinkButton)[^>]*>/g, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

export async function loadDocuments(docsRoot) {
  const files = await walkDocumentation(docsRoot)
  return Promise.all(
    files.map(async (file) => {
      const raw = await readFile(file, 'utf8')
      const parsed = matter(raw)
      const relativePath = path.relative(docsRoot, file)
      return {
        file,
        relativePath,
        route: documentRoute(relativePath),
        frontmatter: parsed.data,
        markdown: plainMarkdown(parsed.content),
      }
    }),
  )
}
