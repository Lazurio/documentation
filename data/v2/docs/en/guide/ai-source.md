---
title: "Where your AI comes from"
description: "The Organization's AI pool or your own ChatGPT account: where you see which one your Environment uses, who switches it and what a switch interrupts."
stableId: lazurio-doc-guide-ai-source
locale: en
summary: "The Organization's AI pool or your own ChatGPT account: where you see which one your Environment uses, who switches it and what a switch interrupts."
updatedAt: "2026-11-08"
reviewedAt: "2026-11-08"
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

The agents in your Environment need AI: Codex and, if you want it, Claude
Code. **Settings → Getting started → Connect AI** shows where your
Environment takes it from.

## Two sources

In a Personal Environment you always sign in with your own account.

A Work Environment on a server where your Organization runs an AI pool takes
its AI from one of two sources:

| Source | What it means | What Connect AI shows |
| --- | --- | --- |
| **The Organization's pool** | Agents use subscriptions the Organization signed in once for everyone. You sign in nothing. | **Provided by your Organization.** |
| **Your own account** | You sign in with your own ChatGPT account, a work seat in your Organization's ChatGPT Business or a personal account, and with Claude if you want it. | **Connected:** with your account |

Your Organization may mix both and move people one by one, in either
direction ([decision 0229](https://github.com/Lazurio/LazurioPlatform/blob/b62383756209f13b7d4113ada969e6fa3d32f1a3/docs/decision-register.md#0229--the-organization-admin-sets-where-each-work-environment-takes-its-ai-from)).

## What you do yourself

In an Environment that is not on the pool, open **Settings → Getting started
→ Connect AI** and choose **Sign in to ChatGPT** or **Sign in to Claude**.
The step is done when it shows your account.

On the pool, do not sign in with your own account. Switching sources is the
Organization Admin's job.

## Who switches the source

Only your Organization Admin moves an Environment between the pool and an
own account. If you want the other source, ask them: see
[How to ask the Organization Admin](/en/guide/ask-the-admin/). Tell them which account you
would use, a seat in ChatGPT Business or a personal account, whether you use
Claude Code, and a time that suits you.

Once the change is done:

- **On your own account**, sign in at Getting started. Agents work again after
  you sign in.
- **Back on the pool**, Getting started shows **Provided by your
  Organization.**

## What a switch interrupts

- Running chats in your Environment end. Start new threads afterwards.
- Everyone else on the same pool loses their running chats briefly too,
  because the pool restarts. The Organization Admin therefore agrees a time with you and
  warns the others.
- Claude Code leaves the pool together with Codex. If you use it, sign in to
  Claude as well.
- Your phone connects differently: see [Phone and
  computer](/en/guide/phone-and-computer/).

## What is still coming

Decision 0229 is decided but not yet deployed. When it is, the Organization Admin will set
the source per Environment in the Organization's Dashboard. You will ask for
the other source right in Getting started, and you will see there when a
change is under way. Until then the Organization Admin makes the change by a reviewed
change to the Organization's server configuration.
