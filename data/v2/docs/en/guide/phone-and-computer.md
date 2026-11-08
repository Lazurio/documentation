---
title: "Phone and computer"
description: "When you can control your Environment's chats from the ChatGPT app on your phone or from ChatGPT Desktop on your computer, and what to use when Connections does not offer it."
stableId: lazurio-doc-guide-phone-and-computer
locale: en
summary: "When you can control your Environment's chats from the ChatGPT app on your phone or from ChatGPT Desktop on your computer, and what to use when Connections does not offer it."
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

**Settings → Connections** in your Environment shows what it offers you.
Follow what the page shows. This page explains each case.

## When pairing is possible

Pairing connects the ChatGPT app with your Environment through your ChatGPT
account
([decision 0215](https://github.com/Lazurio/LazurioPlatform/blob/b62383756209f13b7d4113ada969e6fa3d32f1a3/docs/decision-register.md#0215--chatgpt-apps-pair-with-an-environment-through-the-chatgpt-account-ssh-stays-a-hidden-option-for-advanced-users)).
It works only when all of these hold:

- your Environment uses **your own ChatGPT account**, not the Organization's
  AI pool ([Where your AI comes from](/en/guide/ai-source/), decision 0229);
- Lazurio has recognized the remote-control feature in your Environment. The
  feature is experimental, so Lazurio checks for it and offers pairing only
  where it finds it;
- your Organization does **not** use public addresses (decision 0213). There
  pairing shows as unavailable, and you use the web interface instead:
  Launchpad, chat, MausBot and Buddy.

The ChatGPT app must be signed in with the same account as Codex in your
Environment, ChatGPT Plus or higher.

## Phone

If **Settings → Connections → Phone** offers **Pair a phone**:

1. Choose **Pair a phone**.
2. On your phone, open the ChatGPT app, go to **Codex → Add computer** and
   scan the QR code.
3. Done when the page says **Your phone is paired**.

Your phones are listed under **Paired phones**. **Remove access** ends a
phone's access at once, for example when you lose it.

If the page shows a message instead:

| The page says | What it means |
| --- | --- |
| **First sign in with your ChatGPT account.** | Sign in at Settings → Getting started → Connect AI first. |
| **Coming soon for Environments on the Organization's AI.** | Your Environment uses the Organization's AI pool. Pairing needs your own account. Ask your Organization Admin to move you to your own account, or whether your Organization has another way for your phone: see [How to ask the Organization Admin](/en/guide/ask-the-admin/). |
| **A Team Environment has no phone pairing.** | Shared Team Environments are not paired with a person's phone. |
| **Pairing is not available right now.** | Pairing is not available in this Environment now, for example in an Organization with public addresses. Use the web interface in your phone's browser, or try again later. |

**Restart Codex** on that page ends the chats running in Codex. Use it only
when nothing important is running.

## Computer

If **Settings → Connections → Computer** offers **Connect a computer**, the
page gives you a prompt: copy it, open ChatGPT Desktop, paste it to the agent
and click **Add to Codex**. If the page does not offer it, work in the web
interface in your browser.

**SSH from your devices** on the same page is an advanced option. It is
offered only where SSH into the Environment is allowed, never in an
Organization with public addresses.

If your Organization reaches its Environments through a tailnet, a computer
that connects to it also needs Tailscale and the access your Organization
requires: see [Add a new device to the tailnet](/en/guide/tailscale-add-device/)
and [Device approval](/en/guide/device-approval/).
