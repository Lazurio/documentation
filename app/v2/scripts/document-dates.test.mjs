import assert from 'node:assert/strict'
import test from 'node:test'
import { findDocumentDateErrors } from './document-dates.mjs'

test('an editorial update newer than the fact review is valid', () => {
  assert.deepEqual(findDocumentDateErrors('en/page.md', { updatedAt: '2026-11-08', reviewedAt: '2026-11-05' }), [])
})

test('a fact review on or after the latest update is valid', () => {
  assert.deepEqual(findDocumentDateErrors('en/page.md', { updatedAt: '2026-11-05', reviewedAt: '2026-11-05' }), [])
  assert.deepEqual(findDocumentDateErrors('en/page.md', { updatedAt: '2026-11-01', reviewedAt: '2026-11-05' }), [])
})

test('a date that is not a quoted YYYY-MM-DD string is rejected', () => {
  const errors = findDocumentDateErrors('en/page.md', { updatedAt: new Date('2026-11-08'), reviewedAt: '5. 11. 2026' })
  assert.equal(errors.length, 2)
  assert.ok(errors.every((error) => error.startsWith('en/page.md: ')))
})
