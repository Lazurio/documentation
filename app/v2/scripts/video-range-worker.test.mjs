import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

// The worker ships as a plain _worker.js beside the public assets, in a folder
// with no package.json, so it is loaded by its text and not by its path.
const source = readFileSync(new URL('../../../data/v2/public/_worker.js', import.meta.url))
const { default: worker, selectRange } = await import(`data:text/javascript;base64,${source.toString('base64')}`)

const size = 5000
const bytes = Uint8Array.from({ length: size }, (_, index) => index % 251)
const etag = '"abc123"'
const url = 'https://documentation.example/videos/modules-en.mp4'

function assets() {
  const seen = []
  return {
    seen,
    fetch: async (input) => {
      const request = new Request(input)
      seen.push(request)
      if (new URL(request.url).pathname.endsWith('/missing.mp4')) return new Response('not found', { status: 404 })
      if (request.headers.get('if-none-match') === etag) return new Response(null, { status: 304, headers: { ETag: etag } })
      return new Response(request.method === 'HEAD' ? null : bytes, {
        status: 200,
        headers: { 'Content-Type': 'video/mp4', 'Content-Length': String(size), ETag: etag },
      })
    },
  }
}

const answer = (headers = {}, init = {}) => {
  const ASSETS = assets()
  return worker.fetch(new Request(init.url ?? url, { method: init.method ?? 'GET', headers }), { ASSETS })
}

test('one range is 206 with exactly those bytes', async () => {
  const response = await answer({ Range: 'bytes=0-1023' })
  assert.equal(response.status, 206)
  assert.equal(response.headers.get('content-range'), `bytes 0-1023/${size}`)
  assert.equal(response.headers.get('content-length'), '1024')
  assert.equal(response.headers.get('accept-ranges'), 'bytes')
  assert.equal(response.headers.get('content-type'), 'video/mp4')
  assert.deepEqual(new Uint8Array(await response.arrayBuffer()), bytes.subarray(0, 1024))
})

test('the two bytes Safari asks for first', async () => {
  const response = await answer({ Range: 'bytes=0-1' })
  assert.equal(response.status, 206)
  assert.equal(response.headers.get('content-range'), `bytes 0-1/${size}`)
  assert.equal((await response.arrayBuffer()).byteLength, 2)
})

test('an open end and a suffix reach the last byte', async () => {
  const open = await answer({ Range: 'bytes=4000-' })
  assert.equal(open.headers.get('content-range'), `bytes 4000-4999/${size}`)
  assert.deepEqual(new Uint8Array(await open.arrayBuffer()), bytes.subarray(4000))

  const suffix = await answer({ Range: 'bytes=-500' })
  assert.equal(suffix.headers.get('content-range'), `bytes 4500-4999/${size}`)
  assert.deepEqual(new Uint8Array(await suffix.arrayBuffer()), bytes.subarray(4500))
})

test('an end past the file is cut at its last byte', async () => {
  const response = await answer({ Range: `bytes=4990-${size * 2}` })
  assert.equal(response.status, 206)
  assert.equal(response.headers.get('content-range'), `bytes 4990-4999/${size}`)
})

test('a start past the end is 416 and names the size', async () => {
  for (const range of [`bytes=${size}-`, `bytes=${size + 1}-${size + 5}`, 'bytes=-0']) {
    const response = await answer({ Range: range })
    assert.equal(response.status, 416, range)
    assert.equal(response.headers.get('content-range'), `bytes */${size}`, range)
    assert.equal((await response.arrayBuffer()).byteLength, 0, range)
  }
})

test('several ranges, another unit, a malformed range or another version are the whole file', async () => {
  for (const headers of [
    { Range: 'bytes=0-1,4-5' },
    { Range: 'items=0-1' },
    { Range: 'bytes=abc' },
    { Range: 'bytes=9-3' },
    { Range: 'bytes=-' },
    { Range: 'bytes=0-1', 'If-Range': '"another"' },
  ]) {
    const response = await answer(headers)
    assert.equal(response.status, 200, JSON.stringify(headers))
    assert.equal(response.headers.get('content-range'), null)
    assert.equal(response.headers.get('content-length'), String(size))
    assert.equal((await response.arrayBuffer()).byteLength, size)
  }
})

test('an If-Range that names this version keeps the range', async () => {
  const response = await answer({ Range: 'bytes=0-9', 'If-Range': etag })
  assert.equal(response.status, 206)
})

test('a browser that holds this version gets 304, with or without a range', async () => {
  assert.equal((await answer({ 'If-None-Match': etag })).status, 304)
  assert.equal((await answer({ 'If-None-Match': etag, Range: 'bytes=0-9' })).status, 304)
})

test('HEAD gives the headers of the range and no body', async () => {
  const response = await answer({ Range: 'bytes=10-19' }, { method: 'HEAD' })
  assert.equal(response.status, 206)
  assert.equal(response.headers.get('content-length'), '10')
  assert.equal((await response.arrayBuffer()).byteLength, 0)
})

test('without a range the assets answer, and the file announces its ranges', async () => {
  const ASSETS = assets()
  const incoming = new Request(url)
  const response = await worker.fetch(incoming, { ASSETS })
  assert.equal(response.status, 200)
  assert.equal(response.headers.get('accept-ranges'), 'bytes')
  assert.equal((await response.arrayBuffer()).byteLength, size)
  assert.equal(ASSETS.seen.length, 1)
})

test('the assets are asked for the whole file, not for the range', async () => {
  const ASSETS = assets()
  await worker.fetch(new Request(url, { headers: { Range: 'bytes=0-9' } }), { ASSETS })
  assert.equal(ASSETS.seen[0].headers.get('range'), null)
  assert.equal(ASSETS.seen[0].method, 'GET')
})

test('a missing file stays the 404 of the assets, with a range too', async () => {
  const missing = 'https://documentation.example/videos/missing.mp4'
  assert.equal((await answer({}, { url: missing })).status, 404)
  assert.equal((await answer({ Range: 'bytes=0-9' }, { url: missing })).status, 404)
})

test('other methods are refused', async () => {
  const response = await answer({}, { method: 'POST' })
  assert.equal(response.status, 405)
  assert.equal(response.headers.get('allow'), 'GET, HEAD')
})

test('everything outside /videos/ goes straight to the assets', async () => {
  const ASSETS = assets()
  const incoming = new Request('https://documentation.example/en/guide/modules/', { headers: { Range: 'bytes=0-9' } })
  await worker.fetch(incoming, { ASSETS })
  assert.equal(ASSETS.seen.length, 1)
  assert.equal(ASSETS.seen[0].headers.get('range'), 'bytes=0-9')
})

test('selectRange matches the Platform on an empty file', () => {
  assert.deepEqual(selectRange('bytes=0-1', null, 0, etag), { kind: 'unsatisfiable' })
  assert.deepEqual(selectRange(null, null, 0, etag), { kind: 'full' })
})
