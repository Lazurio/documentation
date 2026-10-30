import assert from 'node:assert/strict'
import { copyFile, mkdir, mkdtemp, rm, symlink, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import test from 'node:test'

const scripts = path.dirname(fileURLToPath(import.meta.url))

async function fixture(t, { reviewedAt = '2026-10-28', reviewDueAt = '2099-12-31' } = {}) {
  const root = await mkdtemp(path.join(tmpdir(), 'documentation-content-validation-'))
  t.after(() => rm(root, { recursive: true, force: true }))
  const targetScripts = path.join(root, 'app/v2/scripts')
  await mkdir(targetScripts, { recursive: true })
  for (const file of ['validate-content.mjs', 'content-library.mjs', 'locale-parity.mjs']) {
    await copyFile(path.join(scripts, file), path.join(targetScripts, file))
  }
  await symlink(path.resolve(scripts, '../node_modules'), path.join(root, 'app/v2/node_modules'), 'dir')
  await mkdir(path.join(root, 'data/v2'), { recursive: true })
  await writeFile(path.join(root, 'data/v2/documentation.json'), JSON.stringify({
    locales: ['en', 'cs'], default_locale: 'en',
  }))
  await writeFile(path.join(root, 'data/v2/source-map.json'), JSON.stringify({
    sources: [{ id: 'fixture', title: 'Public source', url: 'https://example.com/', publisher: 'Example', reviewDueAt }],
  }))
  for (const locale of ['en', 'cs']) {
    const directory = path.join(root, 'data/v2/docs', locale)
    await mkdir(directory, { recursive: true })
    const metadata = {
      title: 'Reference', stableId: 'lazurio-doc-reference', locale,
      summary: 'Public evidence and its review dates.', updatedAt: '2026-10-30',
      ...(reviewedAt ? { reviewedAt } : {}),
      reviewOwner: 'Review owner', sourceRefs: ['fixture'], audience: ['builder'],
      trustCritical: true, secondReviewOwner: 'Pablo AI',
    }
    const frontmatter = Object.entries(metadata).map(([key, value]) => `${key}: ${JSON.stringify(value)}`).join('\n')
    await writeFile(path.join(directory, 'index.mdx'), `---\n${frontmatter}\n---\n${'Public guidance with traceable evidence. '.repeat(8)}`)
  }
  return () => spawnSync(process.execPath, [path.join(targetScripts, 'validate-content.mjs')], { encoding: 'utf8' })
}

test('an editorial update can retain an earlier factual review date', async (t) => {
  const validate = await fixture(t)
  const result = validate()
  assert.equal(result.status, 0, result.stderr)
  assert.match(result.stdout, /Validated 2 documents/)
})

test('an editorial update still requires a factual review date', async (t) => {
  const validate = await fixture(t, { reviewedAt: null })
  const result = validate()
  assert.equal(result.status, 1)
  assert.match(result.stderr, /missing reviewedAt/)
})

test('an editorial update cannot renew expired source evidence', async (t) => {
  const validate = await fixture(t, { reviewDueAt: '2000-01-01' })
  const result = validate()
  assert.equal(result.status, 1)
  assert.match(result.stderr, /Evidence source fixture expired/)
})
