import assert from 'node:assert/strict'
import { mkdtemp, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { test } from 'node:test'
import { getContentDocument, queryContentIndex } from './query-content-index.mjs'

test('agent index returns the IT briefing for an access query', async () => {
  const results = await queryContentIndex('IT access boundaries')
  assert.ok(results.length > 0)
  assert.equal(results[0].stableId, 'lazurio-doc-it-administrators')
})

test('agent index returns the comparison for a Copilot query', async () => {
  const results = await queryContentIndex('Microsoft Copilot comparison')
  assert.ok(results.some((document) => document.stableId === 'lazurio-doc-copilot-comparison'))
})

test('agent index searches only the requested locale', async () => {
  const czechResults = await queryContentIndex('správce přístup oprávnění', { locale: 'cs' })
  assert.ok(czechResults.length > 0)
  assert.ok(czechResults.every((document) => document.locale === 'cs'))
  assert.ok(czechResults.some((document) => document.stableId === 'lazurio-doc-it-administrators'))

  assert.deepEqual(await queryContentIndex('access', { locale: 'unsupported' }), [])
})

test('agent retrieval resolves stable IDs and canonical routes', async () => {
  const byId = await getContentDocument('lazurio-doc-it-administrators')
  const byRoute = await getContentDocument('/en/it-administrators/')
  assert.equal(byId?.canonicalUrl, 'https://documentation.lazurio.ai/en/it-administrators/')
  assert.equal(byRoute?.sourcePath, 'data/v2/docs/en/it-administrators.md')
})

test('agent retrieval selects a deterministic locale for shared stable IDs', async () => {
  const directory = await mkdtemp(path.join(tmpdir(), 'lazurio-content-index-'))
  const indexPath = path.join(directory, 'content-index.json')
  await writeFile(
    indexPath,
    JSON.stringify({
      supportedLocales: ['en', 'cs'],
      documents: [
        { stableId: 'shared-id', locale: 'cs', route: '/cs/shared/' },
        { stableId: 'shared-id', locale: 'en', route: '/en/shared/' },
      ],
    }),
  )

  try {
    assert.equal(
      (await getContentDocument('shared-id', { indexPath }))?.route,
      '/en/shared/',
    )
    assert.equal(
      (await getContentDocument('shared-id', { locale: 'cs', indexPath }))?.route,
      '/cs/shared/',
    )
    assert.equal(
      await getContentDocument('shared-id', { locale: 'unsupported', indexPath }),
      null,
    )
  } finally {
    await rm(directory, { recursive: true })
  }
})

test('agent retrieval rejects unknown and traversal identifiers', async () => {
  assert.equal(await getContentDocument('/en/unknown/'), null)
  assert.equal(await getContentDocument('../../ISSUES.open.json'), null)
  assert.equal(await getContentDocument('..\\..\\private'), null)
})
