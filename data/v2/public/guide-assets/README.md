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
- `tailscale-windows/windows-1-start-{cs,en}.png` … `windows-4-success-{cs,en}.png`
  — illustrative mockups, not screenshots, with the visible label
  "ILUSTRAČNÍ MAKETA" / "ILLUSTRATIVE MOCKUP". Drawn on 2026-11-05 as HTML
  and rendered with headless Chromium 1187 at 1280 px wide, because no
  Windows test machine was available. They follow Microsoft's documentation
  (PowerShell call operator, Windows Terminal: Ctrl+click on a detected URL)
  and the messages of `tailscale login` in Tailscale 1.104.5
  (`cmd/tailscale/cli/up.go`: "To authenticate, visit:", "Success."). The
  Start menu, window frame, icons and fonts (Inter, DejaVu Sans Mono) are
  approximations, not Microsoft's artwork. The address is the example
  `https://headscale.example.lazurio.io`, the user name `jana` and the
  register path are fictional. An orange ring marks where to click. Replace
  them with real screenshots once a Windows 11 test machine exists
  (`issue-2026-11-03-003`).
