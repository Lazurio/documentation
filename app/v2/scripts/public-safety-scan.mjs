import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { walkDocumentation } from './content-library.mjs'

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url))
const moduleRoot = path.resolve(scriptDirectory, '../../..')
const targets = [
  ...(await walkDocumentation(path.join(moduleRoot, 'data/v2/docs'))),
  path.join(moduleRoot, 'data/v2/source-map.json'),
  path.join(moduleRoot, 'data/v2/documentation.json'),
  path.join(moduleRoot, 'README.md'),
  path.join(moduleRoot, 'ARCHITECTURE.md'),
  path.join(moduleRoot, 'AGENTS.md'),
  path.join(moduleRoot, 'SECURITY.md'),
  path.join(moduleRoot, 'ISSUES.open.json'),
  path.join(moduleRoot, 'TODO.tasks.json'),
  path.join(moduleRoot, 'DONE.tasks.json'),
]
const forbidden = [
  ['/Users/', 'local user path'],
  ['personalspace/', 'Personalspace path'],
  ['Concept Line', 'client identity'],
  ['Spectoda', 'external Organization reference'],
  ['ghp_', 'GitHub token shape'],
  ['sk-proj-', 'API key shape'],
  ['AKIA', 'AWS access key shape'],
  ['100% secure', 'absolute security claim'],
  ['GDPR compliant', 'unsupported compliance claim'],
  ['SOC 2 certified', 'unsupported certification claim'],
  ['ISO 27001 certified', 'unsupported certification claim'],
]
const forbiddenPatterns = [
  [/\bDEV-\d+\b/, 'internal tracker identifier'],
  [/\bPR #\d+\b/, 'internal pull request identifier'],
  [/organizations\/[^/\s]+_GEN3/, 'internal Organization checkout identifier'],
]
const errors = []

for (const file of targets) {
  const content = await readFile(file, 'utf8')
  for (const [needle, label] of forbidden) {
    if (content.includes(needle)) errors.push(`${path.relative(moduleRoot, file)}: ${label}`)
  }
  for (const [pattern, label] of forbiddenPatterns) {
    if (pattern.test(content)) errors.push(`${path.relative(moduleRoot, file)}: ${label}`)
  }
}

if (errors.length > 0) {
  console.error(errors.join('\n'))
  process.exit(1)
}
console.log(`Public-safety scan passed for ${targets.length} source files.`)
