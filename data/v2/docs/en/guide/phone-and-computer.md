---
title: "Phone and computer"
description: "Open Lazurio in your phone’s browser, see when experimental ChatGPT pairing is available, or connect your computer."
stableId: lazurio-doc-guide-phone-and-computer
locale: en
summary: "Open Lazurio in your phone’s browser, see when experimental ChatGPT pairing is available, or connect your computer."
updatedAt: "2026-11-27"
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

To continue working on your phone, open your Environment’s address in the browser. You can use the web interface without pairing your phone with the ChatGPT app.

## Phone

If your Organization uses a private network (tailnet), turn on Tailscale on your phone and open your Environment’s address. For a new phone, follow the [iPhone or Android setup instructions](/en/guide/tailscale-add-device/). Access requirements currently vary between networks. Check your Organization’s rules or ask its Admin whether your phone needs [device approval](/en/guide/device-approval/).

### When pairing is possible

ChatGPT phone pairing is experimental. It lets you control Codex chats from the ChatGPT app on your phone. Even if **Settings → Connections → Phone** shows **Pair a phone**, pairing may not complete.

To try it, first open the Environment on a device that already has access. Sign in to ChatGPT on your phone with the same account that Codex uses in the Environment (ChatGPT Plus or higher). Lazurio offers pairing only where it detects remote control. Pairing is unavailable in Team Environments or when using the [Organization’s AI pool](/en/guide/ai-source/).

1. In the Environment, choose **Pair a phone**.
2. On the phone, open **Codex → Add computer** in ChatGPT and scan the QR code.
3. Wait for **Your phone is paired**. Displaying a code alone does not confirm pairing.

If the button is missing, the app has no option to scan or the connection is never confirmed, use the phone’s browser as described above. **Restart Codex** ends chats currently running in Codex.

You can find paired devices under **Paired phones**. If you lose your phone, choose **Remove access** for that device. If the phone was also approved for your Organization’s network, follow the [lost device instructions](/en/guide/device-approval/#when-you-lose-a-device).

## Computer

If **Settings → Connections → Computer** offers **Connect a computer**, the
page gives you a prompt: copy it, open ChatGPT Desktop, paste it to the agent
and click **Add to Codex**. If the page does not offer it, work in the web
interface in your browser.

**SSH from your devices** on the same page is an advanced option. It is
offered only where SSH into the Environment is allowed.

A computer that connects this way also needs Tailscale and the access your Organization requires: see [Add a new device to the tailnet](/en/guide/tailscale-add-device/)
and [Device approval](/en/guide/device-approval/).
