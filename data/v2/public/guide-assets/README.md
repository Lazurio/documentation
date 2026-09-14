# Guide assets

- `wispr-flow.svg`, `codexbar.svg` — official marks of the
  recommended applications, used unchanged; sources are listed in
  `data/v2/source-map.json`.
- `mattycus-idle.png` — Mattyčus, the approved default Guide companion from
  the Lazurio design system (`content/brand/buddy/mattycus-idle.png`,
  192 × 208 px, SHA-256
  `5ea4b58dececcac9aad2d83000734e551320bd043c6a1e6358b3a5559a48b5bc`).
  It is shown only on Guide surfaces, at an integer scale with
  `image-rendering: pixelated`, and is never redrawn or resampled.
  `app/v2/scripts/verify-brand-assets.test.mjs` checks the digest at build.
