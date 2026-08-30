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

for (const pathname of [
  '/en/',
  '/en/it-administrators/',
  '/en/public-evidence/',
  '/diagrams/company-to-github.svg',
  '/diagrams/company-to-github-mobile.svg',
  '/diagrams/human-directed-work.svg',
  '/diagrams/human-directed-work-mobile.svg',
  '/diagrams/lazurio-data-flow.svg',
  '/diagrams/draft-publication-flow.svg',
  '/diagrams/draft-publication-flow-mobile.svg',
]) {
  await request(pathname)
}

const index = await request('/content-index.json')
const payload = await index.json()
if (payload.sourceCommit !== expectedCommit) {
  throw new Error(`Expected content-index sourceCommit ${expectedCommit}, got ${payload.sourceCommit ?? '<missing>'}.`)
}

console.log(`Production smoke passed at ${baseUrl.origin} for source commit ${expectedCommit}.`)
