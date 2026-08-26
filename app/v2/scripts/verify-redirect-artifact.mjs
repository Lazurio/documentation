import { readFile } from 'node:fs/promises'

const redirects = await readFile(new URL('../dist/_redirects', import.meta.url), 'utf8')
const rules = redirects
  .split('\n')
  .map((line) => line.trim().split(/\s+/))
  .filter((parts) => parts.length >= 3 && !parts[0].startsWith('#'))

const rootRule = rules.find(([source]) => source === '/')

if (!rootRule || rootRule[1] !== '/en/' || rootRule[2] !== '302') {
  throw new Error('Production build must redirect / to /en/ with status 302')
}

console.log('Verified production redirect: / -> /en/ (302)')
