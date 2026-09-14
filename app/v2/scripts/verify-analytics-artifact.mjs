import { readdir, readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const distRoot = fileURLToPath(new URL('../dist/', import.meta.url))
const configuredMeasurementId = process.env.PUBLIC_GOOGLE_ANALYTICS_ID?.trim()

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
  const hasGaBootstrap = html.includes('data-ga-consent-bootstrap')
  const hasMeasurementId = configuredMeasurementId && html.includes(configuredMeasurementId)
  const hasPlausible = html.includes('plausible.io') || html.includes('window.plausible')
  const staticallyLoadsGoogle = /<script[^>]+src=["']https:\/\/www\.googletagmanager\.com/iu.test(html)

  if (hasPlausible) throw new Error(`Plausible must not be present in ${path}.`)
  if (staticallyLoadsGoogle) throw new Error(`Google Analytics must not load before consent in ${path}.`)

  if (configuredMeasurementId) {
    if (!hasGaBootstrap || !hasMeasurementId) {
      throw new Error(`Configured consent-gated GA4 bootstrap is missing from ${path}.`)
    }
    if (!html.includes("window.location.pathname") || !html.includes("'launchpad'")) {
      throw new Error(`Privacy-safe page attribution is missing from ${path}.`)
    }
  } else if (hasGaBootstrap || html.includes('googletagmanager.com/gtag/js')) {
    throw new Error(`GA4 must not be present in a build without PUBLIC_GOOGLE_ANALYTICS_ID: ${path}.`)
  }
}

console.log(
  configuredMeasurementId
    ? `Consent-gated GA4 bootstrap verified in ${htmlFiles.length} HTML files.`
    : `GA4 correctly absent from ${htmlFiles.length} non-production HTML files.`,
)
