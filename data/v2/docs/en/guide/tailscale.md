---
title: Reach an Environment through Tailscale
description: What to do when an Environment's address does not open, how to turn on Tailscale and choose the right tailnet on macOS, Windows, iPhone and Android, and what else to check.
stableId: lazurio-doc-guide-tailscale
locale: en
summary: A Remote Environment's address opens only inside the tailnet that serves it. Turn on Tailscale and choose the tailnet the Lazurio page names, and the address continues by itself. If it still does not open, check the device's approval, the Environment, your browser's own secure DNS and the internet connection.
updatedAt: "2026-10-08"
reviewedAt: "2026-10-08"
reviewOwner: Matej Suchanek
secondReviewOwner: Pablo AI
trustCritical: true
sourceRefs:
  - lazurio-environment-network-decisions
  - lazurio-environment-access-model
  - lazurio-platform-decision-f41
  - lazurio-platform-release-v0-1-8-rc-41
  - headscale-project
  - tailscale-fast-user-switching
  - tailscale-install-windows
  - google-chrome-secure-dns
  - tailscale-android-private-dns-request
  - webkit-storage-cap
audience:
  - builder
  - decision-maker
  - it-admin
  - agent
---

When an Environment's address does not open, the most common reason is that
your device is not connected to the private network the Environment is in.
**Turn on Tailscale, choose the tailnet the Environment needs and open the
address again.** If your browser shows the Lazurio page **Turn on Tailscale**,
that page continues to the address by itself once the address answers. If it
still does not open, see [Still not working?](#still-not-working)

## Why Tailscale

A **tailnet** is a private network of devices connected with
[Tailscale](https://tailscale.com/). The apps of a Remote Environment, such as
its Launchpad, Chat or Automate, have addresses that work only inside the
tailnet that serves them. No public route leads to them: outside that tailnet
your browser cannot open them, and usually cannot even find the address. It
shows an error such as "This site can't be reached".

To reach an Environment, your device needs three things:

1. the Tailscale app, turned on;
2. the right tailnet chosen in it;
3. access for this device to that tailnet, which an Admin of your Organization
   arranges.

Lazurio runs its tailnets on [Headscale](https://github.com/juanfont/headscale),
an open-source server that the Tailscale app connects to. That is why the
Tailscale app names such a tailnet by the address of its server, for example
`headscale.example.com`, rather than by the name of a company. The Lazurio page
**Turn on Tailscale** shows the exact name you need.

## Turn on Tailscale and choose the tailnet

### macOS

1. Click the Tailscale icon in the menu bar.
2. Turn on the **Tailscale** switch.
3. Point at your account and choose the tailnet in the list.

### Windows

1. Right-click the Tailscale icon at the bottom right of the taskbar. If you
   do not see it, select the up arrow (**^**) first.
2. Point at your account and choose the tailnet in the list.
3. If Tailscale is not connected, choose **Connect**.

### iPhone and iPad

1. Open the Tailscale app.
2. Tap your account picture at the top right, then your account, and choose
   the tailnet in the list.
3. Turn on the Tailscale switch.

### Android

1. Open the Tailscale app.
2. Tap the account icon at the top right, then your account, and choose the
   tailnet in the list.
3. Turn on the Tailscale switch.

If the tailnet is not in the list, this device has not joined it yet. See
[Still not working?](#still-not-working)

## More than one tailnet

If you work for more than one Organization, their Environments may be in
different tailnets. The Tailscale app keeps one account active on a device at a
time, so while one tailnet is active, the Environments of another do not open.
Switch whenever you move between them. Switching does not ask you to sign in
again unless the device's key for that tailnet has expired.

## Still not working?

Where your browser keeps the Lazurio page (see
[When Lazurio shows its own page](#when-lazurio-shows-its-own-page)), it shows
that page whenever the address cannot be reached, for any reason, not only when
Tailscale is off. With Tailscale on and the right tailnet chosen, check these
causes in order:

1. **This device is not in the tailnet, or not approved yet.** If the tailnet
   is missing from your account list, the device has never joined it. If it is
   there and active but no Environment of the Organization opens, the device
   may not have access yet. Ask the Admin of your Organization to add or
   approve it. Lazurio's approved access model has an Admin approve each device
   for each Organization (decision 0192 of 6 October 2026); how a device gets
   in today can still differ between tailnets.
2. **The Environment does not answer.** If other Environments in the same
   tailnet open, this one may be stopped or restarting. Wait a few minutes and
   try again. If it does not come back, tell the Admin of its Organization. For
   your personal Remote Environment, contact your team's support.
3. **Your browser uses its own secure DNS.** A browser can look up addresses
   with its own DNS provider instead of your device. That provider does not
   know the tailnet's names. When Chrome's **Use secure DNS** is set to a
   provider you chose, Chrome does not fall back to your device's ordinary
   lookup. Turn the setting off, or select your current service provider.
   Other browsers have similar settings.
4. **Android uses its own Private DNS.** If **Private DNS** is set to a
   provider's hostname, Tailscale's names may not work; a user has reported
   this conflict to Tailscale in a public issue. As a troubleshooting step,
   set Private DNS to **Off** or **Automatic** in your phone's network
   settings and try again.
5. **There is no internet connection.** Tailscale needs the internet. If other
   websites do not open either, fix the connection first.

## When Lazurio shows its own page

Once you have opened the Launchpad, Chat or Automate of an Environment that
runs Lazurio Platform v0.1.8-rc.41 or later, the browser keeps the Lazurio page
**Turn on Tailscale** for that address. When
the address cannot be reached later, the browser shows that page at the same
address instead of its own error. The page names the Environment, its
Organization and the tailnet, and continues to the address by itself once the
address answers.

You still see the browser's own error in these cases, and the steps above
apply all the same:

- the first time you open an Environment in a browser, and in private windows;
- for apps of modules, which have addresses of their own;
- in Safari, after seven days of Safari use without interacting with the
  Environment's pages, when Safari removes the website data it keeps;
- after 30 days in which this browser has not reached the Environment. The page
  then removes itself, so a renamed or removed Environment leaves nothing
  behind.

The page belongs to the Environment's own address and talks only to it. It
checks for a new version whenever you open the Environment, updates itself, and
removes itself when the Environment stops offering it. Lazurio Platform added
the page in release candidate v0.1.8-rc.41 (8 October 2026). An Environment
shows it once it runs that version or a later one.
