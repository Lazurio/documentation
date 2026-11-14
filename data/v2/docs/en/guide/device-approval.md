---
title: "Device approval"
description: "Why a registered device may still not reach your Environments, who decides about access and what to do when you lose a device."
stableId: lazurio-doc-guide-device-approval
locale: en
summary: "Why a registered device may still not reach your Environments, who decides about access and what to do when you lose a device."
updatedAt: "2026-11-14"
reviewedAt: "2026-11-05"
reviewOwner: Matej Suchanek
secondReviewOwner: Pablo AI
trustCritical: true
sourceRefs:
  - lazurio-decision-register-access-0245-0247
  - lazurio-decision-register-admin-ai
  - lazurio-environment-access-model
audience:
  - builder
  - decision-maker
  - it-admin
  - agent
---

In Lazurio's target model, an Organization that reaches its Environments
through a tailnet lets in only devices its Organization Admin approved
([decision 0245](https://github.com/Lazurio/LazurioPlatform/blob/25c72bcf6428cdb321d26b8b8d792a526c97c20b/docs/decision-register.md#0245--who-is-who-in-an-organization-its-deployment-repo-holds-the-boundaries-of-trust-and-lazurio-auth-holds-their-use)).
That decision is in force as the target, but the transition is not complete.
**How a device gets access today can still differ between tailnets**, as
[Reach an Environment through Tailscale](/en/guide/tailscale/) says. Your
Organization Admin, or your Organization's own rules, tell you how it works
in yours.

## What you do

[Add a new device to the tailnet](/en/guide/tailscale-add-device/) walks you
through it: installing Tailscale, signing in with your Lazurio account, how
to tell waiting from approved, and [what to send your Organization
Admin](/en/guide/tailscale-add-device/#ask-your-organization-admin-for-approval).
Registration alone does not guarantee access; if the Environment's address
still does not open, ask the Organization Admin as that guide says.

## When you need no device in the tailnet

- **Lazurio's reference Organization in its public entry**
  ([decision 0213](https://github.com/Lazurio/LazurioPlatform/blob/b62383756209f13b7d4113ada969e6fa3d32f1a3/docs/decision-register.md#0213--network-for-people-an-organization-may-switch-from-tailnet-to-public-dns))
  needs no tailnet and no device approval until it returns to its tailnet. You
  sign in with your Lazurio account, but only to the web interface: Launchpad,
  chat, MausBot and Buddy. There is no SSH and no phone pairing for people
  there. No other Organization can switch to a public entry.
- **A phone paired through the ChatGPT app**, where your Environment offers
  pairing ([Phone and computer](/en/guide/phone-and-computer/)). The phone
  needs no tailnet. You create the pairing code inside the Environment,
  though, so you must already be able to open it.

## When you lose a device

Tell the Organization Admin at once, so they remove its access. If you paired the lost
phone through ChatGPT, also remove it under **Paired phones** in Settings →
Connections. In the target model you will be able to remove your own lost
device yourself (decision 0245). Until Lazurio offers that, the Organization
Admin does it.

## For the Organization Admin

How to approve a device today, what to check first and the target in the
Dashboard are in [For the Organization
Admin](/en/guide/tailscale-add-device/#for-the-organization-admin).
Approving a device for the Organization's Environments opens nothing in a
person's Personal Environment.
