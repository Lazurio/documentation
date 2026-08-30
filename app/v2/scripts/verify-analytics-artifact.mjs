import { readdir, readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const distRoot = fileURLToPath(new URL('../dist/', import.meta.url))
const configuredScriptUrl = process.env.PUBLIC_PLAUSIBLE_SCRIPT_URL?.trim()

async function listHtmlFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true })
  const files = []

  for (const entry of entries) {
    const path = join(directory, entry.name)
    if (entry.isDirectory()) files.push(...await listHtmlFiles(path))
    if (entry.isFile() && entry.name.endsWith('.html')) files.push(path)
  }

  return files
}

const htmlFiles = await listHtmlFiles(distRoot)
if (htmlFiles.length === 0) throw new Error('No built HTML files found for analytics verification.')

for (const path of htmlFiles) {
  const html = await readFile(path, 'utf8')
  const hasPlausibleBootstrap = html.includes('window.plausible.init()')
  const hasPlausibleScript = html.includes('plausible.io/js/pa-')

  if (configuredScriptUrl) {
    if (!html.includes(configuredScriptUrl) || !hasPlausibleBootstrap) {
      throw new Error(`Configured Plausible bootstrap is missing from ${path}.`)
    }
  } else if (hasPlausibleScript || hasPlausibleBootstrap) {
    throw new Error(`Plausible must not be present in a build without PUBLIC_PLAUSIBLE_SCRIPT_URL: ${path}.`)
  }
}

console.log(
  configuredScriptUrl
    ? `Plausible production bootstrap verified in ${htmlFiles.length} HTML files.`
    : `Plausible correctly absent from ${htmlFiles.length} non-production HTML files.`,
)
