---
title: "Device approval"
description: "Why a registered device still does not reach your Environments, who approves it and what to do when you lose one."
stableId: lazurio-doc-guide-device-approval
locale: en
summary: "Why a registered device still does not reach your Environments, who approves it and what to do when you lose one."
updatedAt: "2026-11-05"
reviewedAt: "2026-11-05"
reviewOwner: Matej Suchanek
secondReviewOwner: Pablo AI
trustCritical: true
sourceRefs:
  - lazurio-decision-register-admin-ai
  - lazurio-environment-access-model
audience:
  - builder
  - decision-maker
  - it-admin
  - agent
---

An Organization that reaches its Environments through a tailnet lets in only
devices its Admin approved
([decision 0192](https://github.com/Lazurio/LazurioPlatform/blob/b62383756209f13b7d4113ada969e6fa3d32f1a3/docs/decision-register.md#0192--entry-with-a-lazurio-account-and-an-admin-approved-device-sharing-inside-the-organization)).
Entry takes three things: the network, membership of the Organization and
access to the Environment. An approved device is the network part.

## What you do

Register the device yourself: sign in to your Organization's tailnet in the
Tailscale app with your Lazurio account, as [Reach an Environment through
Tailscale](/en/guide/tailscale/) describes. **Registration alone gives no
access.** Until the Admin approves the device, the Environment's address does
not open on it.

Then ask the Admin to approve it. Say which device it is and its name in
Tailscale: see [How to ask the Admin](/en/guide/ask-the-admin/).

You do not need approval for:

- a phone paired through the ChatGPT app ([Phone and
  computer](/en/guide/phone-and-computer/)), which reaches the Environment
  through your ChatGPT account;
- an Organization that switched to public addresses
  ([decision 0213](https://github.com/Lazurio/LazurioPlatform/blob/b62383756209f13b7d4113ada969e6fa3d32f1a3/docs/decision-register.md#0213--network-for-people-an-organization-may-switch-from-tailnet-to-public-dns)),
  where you enter with your Lazurio account alone.

## When you lose a device

Tell the Admin at once, so they remove it. Under decision 0192 you will also
be able to remove your own lost device yourself. Until Lazurio offers that,
the Admin does it.

## For the Admin

- Approve a specific device by its record in the tailnet (node, key, owner),
  never by its name alone. A name can be changed and proves nothing.
- Approving a device for the Organization's Environments opens nothing in a
  person's Personal Environment.
- As the target you approve and remove devices with a click in the
  Organization's Dashboard. Until that is deployed, your Organization does it
  by a reviewed change to its server configuration.
