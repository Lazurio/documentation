import assert from 'node:assert/strict'
import { test } from 'node:test'
import { queryContentIndex } from './query-content-index.mjs'

test('agent index returns the IT briefing for an access query', async () => {
  const results = await queryContentIndex('IT access boundaries')
  assert.ok(results.length > 0)
  assert.equal(results[0].stableId, 'lazurio-doc-it-administrators')
})

test('agent index returns the comparison for a Copilot query', async () => {
  const results = await queryContentIndex('Microsoft Copilot comparison')
  assert.ok(results.some((document) => document.stableId === 'lazurio-doc-copilot-comparison'))
})
