---
title: "Add a new device to the tailnet"
description: "Install Tailscale, enter your Organization's login server, name the device and wait for an Admin to approve it."
stableId: lazurio-doc-guide-tailscale-add-device
locale: en
summary: "Install Tailscale, enter your Organization's login server, name the device and wait for an Admin to approve it."
updatedAt: "2026-11-03"
reviewedAt: "2026-11-03"
reviewOwner: Matej Suchanek
secondReviewOwner: Pablo AI
trustCritical: true
sourceRefs:
  - lazurio-environment-access-model-device-approval
  - lazurio-device-node-names
  - headscale-project
  - headscale-connect-apple
  - headscale-connect-android
  - headscale-connect-windows
  - tailscale-custom-control-server
  - tailscale-cli
  - tailscale-machine-names
  - tailscale-install-ios
  - tailscale-install-android
  - tailscale-install-macos
  - tailscale-install-windows
audience:
  - builder
  - it-admin
  - agent
---

You add a new device to your Organization's tailnet yourself: **install
Tailscale, enter your Organization's login server in it, sign in with your
Lazurio account and wait for an Admin of the Organization to approve the
device.** Until then, the Organization's Environments do not open from it.
Each device (phone, tablet, computer) is added and approved separately.

If the device is already in the tailnet and you only cannot connect, follow
[Reach an Environment through Tailscale](/en/guide/tailscale/).

## Before you start

You need two things:

1. **The address of your Organization's login server.** Lazurio runs its
   tailnets on [Headscale](https://github.com/juanfont/headscale), a
   self-hosted server that the Tailscale app signs in to instead of Tailscale's
   own server. The address usually looks like
   `https://headscale.<organization>.lazurio.io`. Dashboard shows the exact
   address, or the Admin of your Organization gives it to you. Do not guess
   it: with a different address you sign in to someone else's network, or
   not at all.
2. **A device name** in the form `<login>-<device>`, for example
   `jannovak-iphone` or `jannovak-macbook`.

### How to name the device

- `<login>` is your login in lowercase. If your Lazurio account is linked to
  GitHub, it is your GitHub login. If it is not, use the label your Admin
  gives you.
- `<device>` is a short, stable label such as `iphone`, `ipad`, `pixel`,
  `android`, `macbook` or `windows`. Choose it once and use the same one in
  every tailnet. If you have two devices of the same kind, tell them apart
  permanently, for example `macbook-air` and `macbook-pro`.
- Use only lowercase letters, digits and hyphens. Do not add the
  Organization's name.
- Do not rename a device that is already approved just to follow this rule.
  The name is part of its approval, and an Admin has to prepare the change.

The name is only a label and grants no access. It helps the Admin recognise
whose device they are approving.

## Add the device

The steps below follow the official Tailscale and Headscale documentation as
of 3 November 2026. The iPhone and Android apps change their menus between
versions. If you cannot find an item under the name given here, look for a
similar option for a custom or alternate server.

### iPhone and iPad

1. Install [Tailscale from the App Store](https://apps.apple.com/app/tailscale/id1470499037).
   It works on iOS 15 or later.
2. Open it, choose **Get Started** and allow the VPN configuration to be
   added. Do not sign in yet.
3. Tap the profile icon at the top right. Settings open.
4. If you are not signed in to another tailnet in Tailscale, tap **Log in**.
   Otherwise, tap your signed-in account.
5. Open the menu at the top right and choose **Use a custom coordination
   server**.
6. Enter your Organization's login server address and tap **Log in**.
7. The Lazurio sign-in opens. Sign in with your Lazurio account and return to
   the Tailscale app.

**Device name.** The official Tailscale documentation does not say how to set
the device name on an iPhone or iPad, and the iOS app has no command line. The
device may therefore appear in the tailnet under a generic name. Tell your
Admin what it should be called; see
[Ask your Admin for approval](#ask-your-admin-for-approval).

### Android

1. Install
   [Tailscale from Google Play](https://play.google.com/store/apps/details?id=com.tailscale.ipn).
   It works on Android 8.0 or later.
2. Open it, choose **Get Started** and allow the VPN configuration to be
   added. Do not use **Sign in with Google** or **Sign in with other**: they
   lead to Tailscale's own server.
3. Tap the profile icon at the top right. Settings open.
4. If you are not signed in to another tailnet in Tailscale, tap **Log in**.
   Otherwise, tap your signed-in account.
5. Open the menu at the top right (three dots) and choose **Use an alternate
   server**. An older description in the Headscale documentation reaches the
   same option through **Accounts**.
6. Enter your Organization's login server address and tap **Log in**.
7. Sign in with your Lazurio account and return to the Tailscale app.

**Device name.** For Android, too, the official documentation does not say how
to set the device name, and the app has no command line. Tell your Admin what
the device should be called.

### macOS

Tailscale for macOS needs macOS Ventura 13.0 or later. Signing in from
Terminal is the recommended way, because it sets the device name at the same
time.

1. Install Tailscale: the
   [Standalone variant from Tailscale's website](https://tailscale.com/download)
   (which Tailscale recommends), or the Mac App Store variant.
2. Start the app, go through the onboarding and allow the VPN configuration.
   Do not sign in yet.
3. Open Terminal and run (replace the address and the name with yours):

   ```sh
   /Applications/Tailscale.app/Contents/MacOS/Tailscale login --login-server=https://headscale.<organization>.lazurio.io --hostname=jannovak-macbook
   ```

   Tailscale documents this full path for the App Store variant. In the
   Standalone variant you can install the `tailscale` command (Tailscale app →
   **Settings** → **CLI integration** → **Show me how** → **Install Now**) and
   then type only `tailscale login …`.
4. The Lazurio sign-in opens in your browser. Sign in with your Lazurio
   account.

If you are already signed in to another tailnet in Tailscale, you can add the
server without Terminal: Tailscale icon in the menu bar → **Settings** →
**Accounts** tab → down arrow at the bottom left → enter the address → **Add
account**. This does not set the device name; tell it to your Admin.

### Windows

The Tailscale app for Windows does not offer a custom server in its window, so
you sign in with a command.

1. Download and run the
   [Tailscale installer for Windows](https://tailscale.com/download/windows)
   (Windows 10 or later). Do not sign in yet.
2. Open PowerShell or Command Prompt and run (replace the address and the
   name with yours):

   ```powershell
   tailscale login --login-server=https://headscale.<organization>.lazurio.io --hostname=jannovak-windows
   ```

3. The Lazurio sign-in opens in your browser. Sign in with your Lazurio
   account.

## What happens next

After you sign in, the device is registered in the tailnet but **waits for
approval by an Admin of the Organization**. Registration alone grants no
access: Lazurio's access model (decision 0192) requires the Admin of each
Organization to approve each device for that Organization. Approval for one
Organization does not open another.

**You are waiting when** the Organization's tailnet is in Tailscale's account
list and the app may show that it is connected, but the addresses of the
Organization's Environments do not open.

**You are approved when** the Admin tells you so and the addresses of the
Environments you have access to open. Check with Tailscale on and the
Organization's tailnet chosen (see [Reach an Environment through
Tailscale](/en/guide/tailscale/)).

### If nothing happens

- **Sign-in ended with an error.** Your Lazurio account may not be allowed
  into this Organization's tailnet yet, or you entered a different server
  address. Check the address and write to your Admin.
- **The tailnet is missing from the account list.** The sign-in did not
  finish. Go through the steps again from entering the server.
- **The device is still waiting.** Your Admin may not know about it. Write to
  them as described in the next section.
- **The device appeared in the tailnet under another name or with a `-1`
  suffix.** Do not delete anything or sign in again yourself; write to your
  Admin. They will agree the next step with you.

### Ask your Admin for approval

Write to the Admin of your Organization and include:

- your login;
- the device name you want (`<login>-<device>`) and, if it differs, the name
  the device shows in the Tailscale app;
- the kind of device (iPhone, Android, Mac, Windows);
- the login server address you entered;
- when you signed in.

The Admin approves a device only when they know you are the one asking. Write
to them through a channel they recognise you by.

## For the Organization's Admin

The Admin approves devices in the Organization's Dashboard. An approval is a
relationship between a specific device, its owner's account and your
Organization. On a tailnet that serves more than one Organization, each
Organization approves separately.

**How it works today (as of 3 November 2026).** In the target design, a
service on the Conglomerate Host, the server that runs the tailnet, records
approvals from Dashboard and changes the network rules within tens of seconds.
Until that service runs, an approval in Dashboard prepares a change to the
Organization's network configuration that goes through review. Several
waiting devices can go in one batch. The device gets access only once that
change is approved and deployed, so approval can take longer than a few
minutes. The same reviewed change is also the fallback when the service is
down.

Before approving, check:

1. that the device's owner is asking for it, through a channel you trust;
2. that the device in the tailnet belongs to that person's account;
3. the device name. It should have the form `<login>-<device>`, but iPhones,
   iPads and Android devices may arrive with a generic name because their apps
   cannot set one. This guide does not yet describe how to rename such a
   device: agree with the person which device it is, and tell them the name
   you approve it under;
4. that it is a fresh registration the person actually made. Do not approve
   a device you do not recognise.

When a person loses a device or stops using it, remove its approval the same
way you granted it. The rules for who may approve and what an approved device
can reach change through a reviewed change to the Organization's
configuration, not by approving a single device.
