---
title: "Phone and computer"
description: "Control your Environment's chats from the ChatGPT app on your phone or from ChatGPT Desktop on your computer, and what to do when pairing is not offered."
stableId: lazurio-doc-guide-phone-and-computer
locale: en
summary: "Control your Environment's chats from the ChatGPT app on your phone or from ChatGPT Desktop on your computer, and what to do when pairing is not offered."
updatedAt: "2026-11-05"
reviewedAt: "2026-11-05"
reviewOwner: Matej Suchanek
secondReviewOwner: Pablo AI
trustCritical: true
sourceRefs:
  - lazurio-decision-register-admin-ai
  - lazurio-platform-launchpad-texts-pairing
audience:
  - builder
  - decision-maker
  - it-admin
  - agent
---

Both connections live in **Settings → Connections** of your Environment.

## Phone

You pair your phone with the ChatGPT app. It needs ChatGPT Plus or higher,
signed in with the same account as Codex in your Environment
([decision 0215](https://github.com/Lazurio/LazurioPlatform/blob/b62383756209f13b7d4113ada969e6fa3d32f1a3/docs/decision-register.md#0215--chatgpt-apps-pair-with-an-environment-through-the-chatgpt-account-ssh-stays-a-hidden-option-for-advanced-users)).
The phone needs neither Tailscale nor a password.

1. In your Environment, open **Settings → Connections → Phone** and choose
   **Pair a phone**.
2. On your phone, open the ChatGPT app, go to **Codex → Add computer** and
   scan the QR code.
3. Done when the page says **Your phone is paired**.

Your phones are listed under **Paired phones**. **Remove access** ends a
phone's access at once, for example when you lose it.

### When pairing is not offered

| The page says | What it means |
| --- | --- |
| **First sign in with your ChatGPT account.** | Sign in at Settings → Getting started → Connect AI first. |
| **Coming soon for Environments on the Organization's AI.** | Your Environment uses the Organization's AI pool. Pairing needs your own account. Ask the Admin to move you to your own account, or whether your Organization has another way for your phone: see [How to ask the Admin](/en/guide/ask-the-admin/). |
| **A Team Environment has no phone pairing.** | Shared Team Environments are not paired with a person's phone. |
| **Pairing is not available right now.** | Try again later. |

**Restart Codex** on that page ends the chats running in Codex. Use it only
when nothing important is running.

## Computer

To control your Environment from ChatGPT Desktop on your computer, open
**Settings → Connections → Computer** and choose **Connect a computer**. The
page gives you a prompt: copy it, open ChatGPT Desktop, paste it to the agent
and click **Add to Codex**. **SSH from your devices** on the same page is an
advanced option.

If your Organization reaches its Environments through a tailnet, your computer
also needs Tailscale and an approved device: see [Device
approval](/en/guide/device-approval/) and [Reach an Environment through
Tailscale](/en/guide/tailscale/).
