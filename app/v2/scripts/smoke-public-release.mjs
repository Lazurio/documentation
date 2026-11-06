import { smokePaths, verifyGuideCoverage } from './release-smoke-matrix.mjs'

const baseUrl = new URL(process.env.LAZURIO_DOCUMENTATION_SMOKE_URL ?? 'https://documentation.lazurio.ai')
const expectedCommit = process.env.LAZURIO_DOCUMENTATION_EXPECTED_SHA

if (!expectedCommit || !/^[0-9a-f]{40}$/.test(expectedCommit)) {
  throw new Error('Set LAZURIO_DOCUMENTATION_EXPECTED_SHA to the exact 40-character source commit.')
}

const request = async (pathname, init) => {
  const response = await fetch(new URL(pathname, baseUrl), init)
  if (!response.ok && !(pathname === '/' && response.status >= 300 && response.status < 400)) {
    throw new Error(`${pathname} returned ${response.status}.`)
  }
  return response
}

const root = await request('/', { redirect: 'manual' })
if (root.status !== 302 || root.headers.get('location') !== '/en/') {
  throw new Error(`Expected 302 / -> /en/, got ${root.status} ${root.headers.get('location') ?? '<no location>'}.`)
}

verifyGuideCoverage(smokePaths)
for (const pathname of smokePaths) {
  await request(pathname)
  console.log(`Verified ${pathname}`)
}

// Safari and iOS play a video only with byte ranges, which the Pages assets do not answer.
const range = await request('/videos/modules-en.mp4', { headers: { Range: 'bytes=0-1' } })
if (range.status !== 206 || !/^bytes 0-1\/\d+$/u.test(range.headers.get('content-range') ?? '')) {
  throw new Error(`Expected a byte range of the video, got ${range.status} ${range.headers.get('content-range') ?? '<no Content-Range>'}.`)
}
await range.arrayBuffer()
console.log('Verified the byte range of /videos/modules-en.mp4')

const index = await request('/content-index.json')
const payload = await index.json()
if (payload.sourceCommit !== expectedCommit) {
  throw new Error(`Expected content-index sourceCommit ${expectedCommit}, got ${payload.sourceCommit ?? '<missing>'}.`)
}

console.log(`Production smoke passed at ${baseUrl.origin} for source commit ${expectedCommit}.`)
