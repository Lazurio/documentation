---
title: "Add a new device to the tailnet"
description: "Install Tailscale, enter your Organization's login server, sign in with your Lazurio account and wait for an Admin to approve the device."
stableId: lazurio-doc-guide-tailscale-add-device
locale: en
summary: "Install Tailscale, enter your Organization's login server, sign in with your Lazurio account and wait for an Admin to approve the device."
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
  - tailscale-custom-control-server
  - tailscale-machine-names
  - tailscale-system-policies
  - tailscale-android-package
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
Each device (phone, tablet, computer) is added and approved separately. The
whole procedure is done by clicking in the app; you do not need a command
line.

If the device is already in the tailnet and you only cannot connect, follow
[Reach an Environment through Tailscale](/en/guide/tailscale/).

## Before you start

Have **the address of your Organization's login server** ready. Lazurio runs
its tailnets on [Headscale](https://github.com/juanfont/headscale), a
self-hosted server that the Tailscale app signs in to instead of Tailscale's
own server. The address usually looks like
`https://headscale.<organization>.lazurio.io`. Dashboard shows the exact
address, or the Admin of your Organization gives it to you. Do not guess it:
with a different address you sign in to someone else's network, or not at all.

Also decide what the device should be called: `<login>-<device>`, for example
`jannovak-iphone` or `jannovak-macbook`. You do not set the name in the app;
you only tell it to your Admin (see [Device name](#device-name)).

## Add the device

The steps follow the official Tailscale and Headscale documentation as of
3 November 2026. We went through the Android steps the same day in the real
Tailscale app, version 1.104.5, and the pictures come from it. The iPhone and
Android apps change their menus between versions. If you cannot find an item
under the name given here, look for a similar option for a custom or
alternate server.

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

We do not have our own iPhone pictures yet. Tailscale describes the screens
on [Configure Tailscale clients to use a custom control
server](https://tailscale.com/docs/how-to/set-up-custom-control-server).

### Android

1. Install
   [Tailscale from Google Play](https://play.google.com/store/apps/details?id=com.tailscale.ipn).
   It works on Android 8.0 or later.
2. Open it. Android asks whether Tailscale may set up a VPN connection. Tap
   **OK**.

   <figure class="lz-app-step">
     <img src="/guide-assets/tailscale-android/android-1-vpn.png" alt="Connection request dialog: Tailscale wants to set up a VPN connection. The OK button is highlighted." width="540" height="470" loading="lazy" />
     <figcaption>Allow the VPN connection. This does not connect you to any network yet.</figcaption>
   </figure>

3. Do not tap the large **Log in** button: it leads to Tailscale's own
   server. Tap the gear at the top right.

   <figure class="lz-app-step">
     <img src="/guide-assets/tailscale-android/android-2-settings.png" alt="Tailscale welcome screen with the Log in button. The gear at the top right is highlighted." width="540" height="785" loading="lazy" />
     <figcaption>Open settings with the gear, not with the Log in button.</figcaption>
   </figure>

4. In settings, tap **Accounts**.

   <figure class="lz-app-step">
     <img src="/guide-assets/tailscale-android/android-3-accounts.png" alt="Tailscale settings. The Accounts item at the top is highlighted." width="540" height="485" loading="lazy" />
   </figure>

5. Tap the three dots at the top right and choose **Use an alternate server**.

   <figure class="lz-app-step">
     <img src="/guide-assets/tailscale-android/android-4-alternate-server.png" alt="Accounts screen with its menu open. The item Use an alternate server is highlighted." width="540" height="385" loading="lazy" />
   </figure>

6. In **Custom control server URL**, enter your Organization's login server
   address and tap **Add account**.

   <figure class="lz-app-step">
     <img src="/guide-assets/tailscale-android/android-5-address.png" alt="Add another account screen with the field Custom control server URL containing the example address https://headscale.example.lazurio.io, and the Add account button." width="540" height="485" loading="lazy" />
     <figcaption>The picture shows an example address. Enter your Organization's address.</figcaption>
   </figure>

7. The Lazurio sign-in opens. Sign in with your Lazurio account and return to
   the Tailscale app.

### macOS

Tailscale for macOS needs macOS Ventura 13.0 or later.

1. Install Tailscale: the
   [Standalone variant from Tailscale's website](https://tailscale.com/download)
   (which Tailscale recommends), or the Mac App Store variant.
2. Start the app, go through the onboarding and allow the VPN configuration.
   Do not sign in yet.
3. Hold the **Option** key (⌥) and click the Tailscale icon in the menu bar.
   Point at **Debug** and, under **Custom Login Server**, choose **Add
   Account…**.
4. Enter your Organization's login server address and click **Add Account**.
5. The Lazurio sign-in opens in your browser. Sign in with your Lazurio
   account.

If you are already signed in to another tailnet in Tailscale, Tailscale also
documents a second way: Tailscale icon in the menu bar → **Settings** →
**Accounts** tab → down arrow at the bottom left → enter the address → **Add
account**.

Steps 3 and 4 are described in the Headscale documentation; we do not have
our own Mac pictures yet.

### Windows

The Tailscale app for Windows does not offer a custom server in its window
(Tailscale's official documentation says so), and Lazurio does not have
another clickable procedure for Windows yet. **Install
[Tailscale for Windows](https://tailscale.com/download/windows) (Windows 10 or
later), do not sign in, and write to the Admin of your Organization** that you
need to add a Windows device. They will help you set the server.

## Device name

Tailscale names a device after the system: a computer after its name, a phone
usually only after its manufacturer or model. The Tailscale app for Android
has no setting for the name (checked in version 1.104.5), and Tailscale's
documentation does not describe a clickable name setting for the other systems
either. So do not rename anything on the device; tell your Admin the name you
want. It helps them recognise which device is yours.

The name has the form `<login>-<device>`:

- `<login>` is your login in lowercase. If your Lazurio account is linked to
  GitHub, it is your GitHub login. If it is not, use the label your Admin
  gives you.
- `<device>` is a short, stable label such as `iphone`, `ipad`, `pixel`,
  `android`, `macbook` or `windows`. Choose it once and use the same one in
  every tailnet. If you have two devices of the same kind, tell them apart
  permanently, for example `macbook-air` and `macbook-pro`.
- Only lowercase letters, digits and hyphens, without the Organization's name.

Do not rename a device that is already approved just to follow this rule. The
name is part of its approval, and an Admin has to prepare the change. The name
is only a label and grants no access.

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
  suffix.** That is normal. Do not delete anything or sign in again yourself;
  write to your Admin.

### Ask your Admin for approval

Write to the Admin of your Organization and include:

- your login;
- the device name you want (`<login>-<device>`);
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
3. the device name. A device arrives with the name its system gave it, and
   the person cannot change it by clicking in the Tailscale app. Agree with
   them which device it is, and tell them the name you approve it under. This
   guide does not yet describe how to set the name during approval;
4. that it is a fresh registration the person actually made. Do not approve
   a device you do not recognise.

Help a person with Windows enter the login server; Lazurio does not have a
clickable procedure for Windows yet.

When a person loses a device or stops using it, remove its approval the same
way you granted it. The rules for who may approve and what an approved device
can reach change through a reviewed change to the Organization's
configuration, not by approving a single device.
