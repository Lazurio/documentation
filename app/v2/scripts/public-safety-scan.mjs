import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { walkDocumentation } from './content-library.mjs'

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url))
const moduleRoot = path.resolve(scriptDirectory, '../../..')
const forbidden = [
  ['/Users/', 'local user path'],
  ['personalspace/', 'Personalspace path'],
  ['Concept Line', 'client identity'],
  ['EXTERNAL_ORGANIZATION_FIXTURE', 'external Organization reference'],
  ['ghp_', 'GitHub token shape'],
  ['sk-proj-', 'API key shape'],
  ['AKIA', 'AWS access key shape'],
]
const forbiddenPatterns = [
  [/\bDEV-\d+\b/, 'internal tracker identifier'],
  [/\bPR #\d+\b/, 'internal pull request identifier'],
  [/organizations\/[^/\s]+_GEN3/, 'internal Organization checkout identifier'],
  [/100\s*%\s*(?:secure|bezpečn(?:ý|á|é))/iu, 'absolute security claim'],
  [/(?:GDPR\s+compliant|v\s+souladu\s+s\s+GDPR)/iu, 'unsupported compliance claim'],
  [/(?:SOC\s*2\s+certified|certifikov\p{L}*\s+(?:podle\s+)?SOC\s*2|má\s+certifikaci\s+SOC\s*2)/iu, 'unsupported certification claim'],
  [/(?:ISO\s*27001\s+certified|certifikov\p{L}*\s+(?:podle\s+)?ISO\s*27001|má\s+certifikaci\s+ISO\s*27001)/iu, 'unsupported certification claim'],
]

export function findPublicSafetyErrors(content, sourcePath) {
  const errors = []
  for (const [needle, label] of forbidden) {
    if (content.includes(needle)) errors.push(`${sourcePath}: ${label}`)
  }
  for (const [pattern, label] of forbiddenPatterns) {
    if (pattern.test(content)) errors.push(`${sourcePath}: ${label}`)
  }
  return errors
}

export async function publicSafetyTargets() {
  return [
    ...(await walkDocumentation(path.join(moduleRoot, 'data/v2/docs'))),
    path.join(moduleRoot, 'data/v2/source-map.json'),
    path.join(moduleRoot, 'data/v2/documentation.json'),
    path.join(moduleRoot, 'data/v2/sidebar.ts'),
    path.join(moduleRoot, 'README.md'),
    path.join(moduleRoot, 'ARCHITECTURE.md'),
    path.join(moduleRoot, 'AGENTS.md'),
    path.join(moduleRoot, 'SECURITY.md'),
    path.join(moduleRoot, 'ISSUES.open.json'),
    path.join(moduleRoot, 'TODO.tasks.json'),
    path.join(moduleRoot, 'DONE.tasks.json'),
  ]
}

export async function scanPublicSafety() {
  const targets = await publicSafetyTargets()
  const errors = []
  for (const file of targets) {
    const content = await readFile(file, 'utf8')
    errors.push(...findPublicSafetyErrors(content, path.relative(moduleRoot, file)))
  }
  return { errors, targetCount: targets.length }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const { errors, targetCount } = await scanPublicSafety()
  if (errors.length > 0) {
    console.error(errors.join('\n'))
    process.exit(1)
  }
  console.log(`Public-safety scan passed for ${targetCount} source files.`)
}
