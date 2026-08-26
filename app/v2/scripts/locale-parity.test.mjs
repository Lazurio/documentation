import assert from 'node:assert/strict'
import test from 'node:test'
import { findLocaleParityErrors } from './locale-parity.mjs'

function localizedDocument(locale, overrides = {}) {
  return {
    relativePath: `${locale}/example.md`,
    frontmatter: {
      locale,
      sourceRefs: ['source-a'],
      audience: ['it-admin'],
      reviewOwner: 'Matej Suchanek',
      reviewedAt: '2026-08-26',
      trustCritical: true,
      secondReviewOwner: 'Pablo AI',
      ...overrides,
    },
  }
}

test('locale peers preserve review ownership and freshness', () => {
  const english = localizedDocument('en')
  const czech = localizedDocument('cs')
  assert.deepEqual(findLocaleParityErrors('example', [english, czech], ['en', 'cs']), [])

  assert.ok(
    findLocaleParityErrors(
      'example',
      [english, localizedDocument('cs', { reviewOwner: 'Someone Else' })],
      ['en', 'cs'],
    ).some((error) => error.includes('reviewOwner')),
  )
  assert.ok(
    findLocaleParityErrors(
      'example',
      [localizedDocument('en', { reviewedAt: '2026-08-26' }), localizedDocument('cs', { reviewedAt: '2026-08-25' })],
      ['en', 'cs'],
    ).some((error) => error.includes('reviewedAt')),
  )
})
