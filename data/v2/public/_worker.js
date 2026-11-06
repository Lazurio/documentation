// Cloudflare Pages answers its static assets without byte ranges, and Safari and
// iOS play a video only from a server that has them. This worker answers
// /videos/* the way Lazurio answers its guide videos (LazurioPlatform,
// src/launchpad/guide-video-files.ts and http-conditions.ts): one range is 206,
// a start past the end is 416, anything else is the whole file.
//
// _routes.json sends only /videos/* here. It holds no secrets and no bindings
// other than the assets themselves.

const videoPath = '/videos/'

/** Whether a request's If-None-Match names etag (*, or the tag, weak or strong). */
export function notModified(request, etag) {
  const asked = request.headers.get('if-none-match')
  if (asked === null) return false
  const tag = etag.replace(/^W\//, '')
  return asked
    .split(',')
    .map((value) => value.trim())
    .some((value) => value === '*' || value.replace(/^W\//, '') === tag)
}

/**
 * The one byte range of a request (RFC 9110 14.2), inclusive. A missing,
 * malformed or multiple range, another unit, or an If-Range that names another
 * version of the file is the whole file; a start past its end is unsatisfiable.
 */
export function selectRange(range, ifRange, size, etag) {
  if (range === null) return { kind: 'full' }
  if (ifRange !== null && ifRange.trim() !== etag) return { kind: 'full' }
  const match = /^bytes=(\d*)-(\d*)$/.exec(range.trim())
  if (match === null) return { kind: 'full' }
  const [, first, last] = match
  if (first === '' && last === '') return { kind: 'full' }
  if (size === 0) return { kind: 'unsatisfiable' }
  if (first === '') {
    const suffix = Number(last)
    return suffix === 0
      ? { kind: 'unsatisfiable' }
      : { kind: 'range', start: Math.max(0, size - suffix), end: size - 1 }
  }
  const start = Number(first)
  if (last !== '' && Number(last) < start) return { kind: 'full' }
  if (start >= size) return { kind: 'unsatisfiable' }
  return { kind: 'range', start, end: last === '' ? size - 1 : Math.min(Number(last), size - 1) }
}

async function answerVideo(request, env) {
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    return new Response('method-not-allowed', { status: 405, headers: { Allow: 'GET, HEAD' } })
  }

  // Without a range the assets answer as they always do, conditions included.
  const range = request.headers.get('range')
  if (range === null) {
    const asset = await env.ASSETS.fetch(request)
    if (asset.status !== 200) return asset
    const whole = new Response(asset.body, asset)
    whole.headers.set('Accept-Ranges', 'bytes')
    return whole
  }

  const asset = await env.ASSETS.fetch(new Request(request.url, { method: 'GET' }))
  if (asset.status !== 200) return asset

  const etag = asset.headers.get('etag') ?? ''
  const headers = new Headers(asset.headers)
  headers.set('Accept-Ranges', 'bytes')
  if (etag !== '' && notModified(request, etag)) {
    headers.delete('Content-Length')
    return new Response(null, { status: 304, headers })
  }

  const bytes = new Uint8Array(await asset.arrayBuffer())
  const size = bytes.byteLength
  const selected = selectRange(range, request.headers.get('if-range'), size, etag)
  if (selected.kind === 'unsatisfiable') {
    headers.delete('Content-Length')
    headers.set('Content-Range', `bytes */${size}`)
    return new Response(null, { status: 416, headers })
  }

  const [start, end] = selected.kind === 'range' ? [selected.start, selected.end + 1] : [0, size]
  headers.set('Content-Length', String(end - start))
  if (selected.kind === 'range') headers.set('Content-Range', `bytes ${start}-${end - 1}/${size}`)
  return new Response(request.method === 'HEAD' ? null : bytes.subarray(start, end), {
    status: selected.kind === 'range' ? 206 : 200,
    headers,
  })
}

export default {
  fetch(request, env) {
    const { pathname } = new URL(request.url)
    return pathname.startsWith(videoPath) ? answerVideo(request, env) : env.ASSETS.fetch(request)
  },
}
