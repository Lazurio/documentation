import assert from 'node:assert/strict'
import test from 'node:test'

import { assertProductionSource } from './production-source-gate.mjs'

const head = 'a'.repeat(40)
const local = {
  head,
  approvedHead: head,
  status: '',
  branch: 'main',
  environment: {},
}
const actions = {
  ...local,
  branch: '',
  environment: {
    GITHUB_ACTIONS: 'true',
    GITHUB_REPOSITORY: 'Lazurio/documentation',
    GITHUB_EVENT_NAME: 'push',
    GITHUB_REF: 'refs/heads/main',
    GITHUB_REF_PROTECTED: 'true',
    GITHUB_SHA: head,
  },
}

test('accepts a clean, explicitly approved local main checkout', () => {
  assert.doesNotThrow(() => assertProductionSource(local))
})

test('accepts the matching protected main push in GitHub Actions', () => {
  assert.doesNotThrow(() => assertProductionSource(actions))
})

for (const [name, input, message] of [
  ['dirty tree', { ...local, status: ' M README.md' }, /clean Git tree/],
  ['unapproved head', { ...local, approvedHead: 'b'.repeat(40) }, /exact reviewed HEAD/],
  ['local feature branch', { ...local, branch: 'codex/change' }, /main branch/],
  ['wrong repository', { ...actions, environment: { ...actions.environment, GITHUB_REPOSITORY: 'fork/documentation' } }, /Lazurio\/documentation/],
  ['pull request event', { ...actions, environment: { ...actions.environment, GITHUB_EVENT_NAME: 'pull_request' } }, /push event/],
  ['non-main ref', { ...actions, environment: { ...actions.environment, GITHUB_REF: 'refs/heads/feature' } }, /refs\/heads\/main/],
  ['unprotected ref', { ...actions, environment: { ...actions.environment, GITHUB_REF_PROTECTED: 'false' } }, /protected main branch/],
  ['mismatched event SHA', { ...actions, environment: { ...actions.environment, GITHUB_SHA: 'b'.repeat(40) } }, /event SHA/],
]) {
  test(`rejects ${name}`, () => {
    assert.throws(() => assertProductionSource(input), message)
  })
}
