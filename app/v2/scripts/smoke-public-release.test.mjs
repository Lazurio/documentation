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

test('production smoke checks the Guide endpoint and source commit', async (t) => {
  const expectedCommit = 'a'.repeat(40)
  const requestedPaths = []
  const server = createServer((request, response) => {
    const pathname = new URL(request.url ?? '/', 'http://localhost').pathname
    requestedPaths.push(pathname)

    if (pathname === '/') {
      response.writeHead(302, { location: '/en/' })
      response.end()
      return
    }
    if (pathname === '/content-index.json') {
      response.writeHead(200, { 'content-type': 'application/json' })
      response.end(JSON.stringify({ sourceCommit: expectedCommit }))
      return
    }
    response.writeHead(200)
    response.end('ok')
  })
  t.after(() => server.close())
  server.listen(0, '127.0.0.1')
  await once(server, 'listening')
  const address = server.address()
  assert(address && typeof address !== 'string')

  const result = await runSmoke({
    LAZURIO_DOCUMENTATION_SMOKE_URL: `http://127.0.0.1:${address.port}`,
    LAZURIO_DOCUMENTATION_EXPECTED_SHA: expectedCommit,
  })

  assert.equal(result.code, 0, result.stderr)
  assert.match(result.stdout, /Production smoke passed/)
  assert.deepEqual(
    requestedPaths.includes('/en/guide/'),
    true,
    'production smoke must request the English Guide endpoint',
  )
  assert.deepEqual(
    requestedPaths.includes('/cs/guide/'),
    true,
    'production smoke must request the Czech Guide endpoint',
  )
  for (const pathname of [
    '/en/guide/recommended-apps/',
    '/cs/guide/recommended-apps/',
    '/en/guide/work-tips/',
    '/cs/guide/work-tips/',
    '/guide-assets/wispr-flow.svg',
    '/guide-assets/codexbar.svg',
    '/guide-assets/composio.svg',
    '/guide-assets/browser-use.svg',
  ]) {
    assert.deepEqual(
      requestedPaths.includes(pathname),
      true,
      `production smoke must request ${pathname}`,
    )
  }
})
