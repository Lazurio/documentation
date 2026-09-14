import assert from 'node:assert/strict'
import { once } from 'node:events'
import { createServer } from 'node:http'
import { spawn } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import test from 'node:test'

const scriptPath = fileURLToPath(new URL('./smoke-public-release.mjs', import.meta.url))

function runSmoke(environment) {
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [scriptPath], {
      env: { ...process.env, ...environment },
      stdio: ['ignore', 'pipe', 'pipe'],
    })
    let stdout = ''
    let stderr = ''
    child.stdout.on('data', (chunk) => { stdout += chunk })
    child.stderr.on('data', (chunk) => { stderr += chunk })
    child.once('error', reject)
    child.once('close', (code) => resolve({ code, stdout, stderr }))
  })
}


const { guideRoutes, guideAssets, guideMatrix, smokePaths, verifyGuideCoverage } = await import('./release-smoke-matrix.mjs')

test('derived matrix preserves the minimum public Guide contract', () => {
  for (const locale of ['en', 'cs']) {
    for (const slug of ['', 'glossary/', 'recommended-apps/', 'work-tips/']) {
      assert.ok(guideRoutes.includes(`/${locale}/guide/${slug}`))
    }
  }
  for (const asset of [
    '/guide-assets/wispr-flow.svg', '/guide-assets/codexbar.svg', '/guide-assets/mattycus-idle.png',
    '/module-icons/knowledgebase-96.png', '/module-icons/guide-96.png', '/module-icons/settings-96.png',
  ]) assert.ok(guideAssets.includes(asset), `Missing required asset ${asset}`)
  for (const omitted of guideMatrix) {
    assert.throws(() => verifyGuideCoverage(smokePaths.filter((path) => path !== omitted)),
      { message: `Smoke matrix omits ${omitted}` })
  }
})

async function fixture(t, missing) {
  const expectedCommit = 'a'.repeat(40)
  const requestedPaths = []
  const known = new Set(smokePaths)
  const server = createServer((request, response) => {
    const pathname = new URL(request.url ?? '/', 'http://localhost').pathname
    requestedPaths.push(pathname)
    if (pathname === '/') {
      response.writeHead(302, { location: '/en/' }); response.end(); return
    }
    if (pathname === '/content-index.json') {
      response.writeHead(200, { 'content-type': 'application/json' })
      response.end(JSON.stringify({ sourceCommit: expectedCommit })); return
    }
    response.writeHead(known.has(pathname) && pathname !== missing ? 200 : 404)
    response.end('fixture')
  })
  t.after(() => server.close())
  server.listen(0, '127.0.0.1')
  await once(server, 'listening')
  const base = `http://127.0.0.1:${server.address().port}`
  return { base, requestedPaths, environment: {
    LAZURIO_DOCUMENTATION_SMOKE_URL: base,
    LAZURIO_DOCUMENTATION_EXPECTED_SHA: expectedCommit,
  } }
}

test('fixture rejects unknown routes and assets', async (t) => {
  const { base } = await fixture(t)
  for (const path of ['/en/guide/not-a-page/', '/guide-assets/not-an-asset.svg', '/module-icons/not-an-icon.png']) {
    assert.equal((await fetch(`${base}${path}`)).status, 404, `Fixture must reject ${path}`)
  }
})

test('production smoke requests every derived route and asset', async (t) => {
  const { requestedPaths, environment } = await fixture(t)
  const result = await runSmoke(environment)
  assert.equal(result.code, 0, result.stderr)
  assert.match(result.stdout, /Production smoke passed/)
  verifyGuideCoverage(requestedPaths)
  for (const path of smokePaths) assert.ok(requestedPaths.includes(path))
  assert.ok(requestedPaths.includes('/content-index.json'))
})

for (const missing of guideMatrix) {
  test(`production smoke fails on 404 for ${missing}`, async (t) => {
    const { environment } = await fixture(t, missing)
    const result = await runSmoke(environment)
    assert.notEqual(result.code, 0)
    assert.ok(result.stderr.includes(`${missing} returned 404.`), result.stderr)
  })
}
