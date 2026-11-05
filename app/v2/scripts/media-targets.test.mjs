import assert from 'node:assert/strict'
import test from 'node:test'
import { mediaTargets } from './media-targets.mjs'

test('finds the poster of a video and the src of its source', () => {
  const markdown = `<figure class="lz-diagram"><video controls playsinline preload="none" poster="/videos/modules-en.webp" aria-describedby="caption"><source src="/videos/modules-en.mp4" type="video/mp4" /></video></figure>`
  assert.deepEqual(mediaTargets(markdown), ['/videos/modules-en.webp', '/videos/modules-en.mp4'])
})

test('leaves the srcset of a picture and images to their own checks', () => {
  const markdown = `<picture><source media="(max-width: 640px)" srcset="/diagrams/a-mobile.svg" /><img src="/diagrams/a.svg" alt="" /></picture>`
  assert.deepEqual(mediaTargets(markdown), [])
})
