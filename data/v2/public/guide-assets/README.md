# Guide assets

- `wispr-flow.svg`, `codexbar.svg`, `amphetamine.svg` — official marks of the
  recommended applications, used unchanged; sources are listed in
  `data/v2/source-map.json`.
- `mattycus-idle.png` — Mattyčus, the approved default Guide companion from
  the Lazurio design system (`content/brand/buddy/mattycus-idle.png`,
  192 × 208 px, SHA-256
  `5ea4b58dececcac9aad2d83000734e551320bd043c6a1e6358b3a5559a48b5bc`).
  It is shown only on Guide surfaces, at an integer scale with
  `image-rendering: pixelated`, and is never redrawn or resampled.
  `app/v2/scripts/verify-brand-assets.test.mjs` checks the digest at build.
- `tailscale-android/android-1-vpn.png` … `android-5-address.png` — own
  screenshots of the official Tailscale for Android app 1.104.5
  (`tailscale-android-universal-1.104.5.apk` from Tailscale's package server,
  SHA-256 `a517f94006b90a9dbd7383221cbd05ff4acf5ea680335b9b0318e3fbf086d4c9`),
  taken on 2026-11-03 in an Android 16 emulator with no Google or Tailscale
  account. Nothing was signed in; the address field shows the example
  `https://headscale.example.lazurio.io`. Cropped to the relevant part,
  scaled to 540 px wide, with an added orange ring marking where to tap.
  Status bars are cropped away.
