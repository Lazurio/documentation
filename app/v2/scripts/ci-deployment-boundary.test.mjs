import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import test from 'node:test'
import { fileURLToPath } from 'node:url'

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url))
const repositoryRoot = path.resolve(scriptDirectory, '../../..')
const workflow = (name) => readFileSync(path.join(repositoryRoot, '.github/workflows', name), 'utf8')

test('pull request verification cannot access deployment credentials', () => {
  const source = workflow('verify.yml')

  assert.doesNotMatch(source, /secrets\./)
  assert.doesNotMatch(source, /wrangler-action/)
  assert.match(source, /ref: \$\{\{ github\.event\.pull_request\.head\.sha \}\}/)
  assert.match(source, /name: pages-preview/)
})

test('trusted deployment consumes only the completed workflow artifact', () => {
  const source = workflow('deploy.yml')

  assert.match(source, /workflow_run:/)
  assert.match(source, /head_repository\.full_name == github\.repository/)
  assert.equal(source.match(/name: cloudflare-pages-credentials/g)?.length, 2)
  assert.equal(source.match(/deployment: false/g)?.length, 2)
  assert.match(source, /run-id: \$\{\{ github\.event\.workflow_run\.id \}\}/)
  assert.match(source, /path: \$\{\{ runner\.temp \}\}\/pages/)
  assert.match(source, /content-index\.json/)
  assert.match(source, /payload\.sourceCommit !== process\.env\.EXPECTED_SHA/)
  assert.match(source, /github\.rest\.repos\.getBranch/)
  assert.match(source, /branch\.data\.commit\.sha !== process\.env\.SOURCE_SHA/)
  assert.match(source, /secrets\.CLOUDFLARE_API_TOKEN/)
  assert.match(source, /secrets\.CLOUDFLARE_ACCOUNT_ID/)
  assert.match(source, /bun install --frozen-lockfile/)
})
