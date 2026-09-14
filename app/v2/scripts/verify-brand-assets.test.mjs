import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { test } from 'node:test'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..')

// Vendored brand rasters must stay byte-identical to their approved source.
const approved = {
  'data/v2/public/guide-assets/mattycus-idle.png':
    '5ea4b58dececcac9aad2d83000734e551320bd043c6a1e6358b3a5559a48b5bc',
}

for (const [file, digest] of Object.entries(approved)) {
  test(`${file} matches the approved design-system digest`, async () => {
    const bytes = await readFile(path.join(root, file))
    assert.equal(createHash('sha256').update(bytes).digest('hex'), digest)
  })
}
