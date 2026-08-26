import assert from 'node:assert/strict'
import path from 'node:path'
import test from 'node:test'
import { findPublicSafetyErrors, publicSafetyTargets } from './public-safety-scan.mjs'

test('public-safety targets include localized navigation copy', async () => {
  const targets = await publicSafetyTargets()
  assert.ok(targets.some((target) => target.endsWith(path.join('data', 'v2', 'sidebar.ts'))))
})

test('public-safety rules reject unsupported English and Czech trust claims', () => {
  for (const claim of [
    'This product is 100% secure.',
    'Tento produkt je 100% bezpečný.',
    'The service is GDPR compliant.',
    'Služba je v souladu s GDPR.',
    'The service is SOC 2 certified.',
    'Služba má certifikaci SOC 2.',
    'The service is ISO 27001 certified.',
    'Služba je certifikována podle ISO 27001.',
  ]) {
    assert.ok(findPublicSafetyErrors(claim, 'example.md').length > 0, claim)
  }
})

test('public-safety rules allow qualified descriptions of the review boundary', () => {
  assert.deepEqual(
    findPublicSafetyErrors(
      'Dokumentace netvrdí žádnou certifikaci ani univerzální shodu.',
      'example.md',
    ),
    [],
  )
})
