---
title: "Lesson 6: Connected apps"
description: "What an Integration is, who connects it and what agents may do with your mail or calendar."
stableId: lazurio-doc-guide-course-connected-apps
locale: en
summary: "What an Integration is, who connects it and what agents may do with your mail or calendar."
updatedAt: "2026-11-01"
reviewedAt: "2026-11-01"
reviewOwner: Anna Blazickova
secondReviewOwner: Pablo AI
trustCritical: true
sourceRefs:
  - lazurio-onboarding-decision-register
  - lazurio-platform-folder-agent-rules
  - lazurio-platform-onboarding-decisions
  - lazurio-platform-launchpad-texts
  - lazurio-external-apps-current
audience:
  - decision-maker
  - builder
  - agent
---

**In this lesson:** what an Integration is, who connects it and what agents
may do with it.

An **Integration** is an app or service connected to your Environment, such
as mail, a calendar or a chat. You find them in Apps → **Integrations**, in
the tabs **All**, **Connected** and **Custom**. Each app has exactly one
route: a tool from Settings → Tools (for example `gh` for GitHub), the
Environment's Executor, or Composio with your own account where your
Organization allows it.

**You connect apps yourself.** Signing in is your consent, so an agent never
connects an app on its own; it sends you a link to the app's card instead.
Once an app is connected, every agent and bot of this Environment can read,
write and delete there until you narrow it.

**Being able to write is not consent to publish.** Sending an email or a
message, inviting people to a meeting or submitting a form is Publication.
An agent prepares such a step, for example as a draft in your mailbox, and
finishes it only when you allow it. "Reply to that email" asks for a draft,
not for sending. Today this is a rule that agents follow; no Lazurio mechanism
blocks a write through a connected app
([Connecting an Environment to apps](/en/environment-app-connections/)).

Never paste passwords, tokens or verification codes into a chat. If the
Environment has a vault and an agent needs a password or a key, it asks for
it in Apps → **Vault**, where you fill it in yourself.

## Your task

1. Open Apps → **Integrations** → **Connected**.
2. In Chat, send:

   ```text
   Which apps are connected in this Environment and through which route?
   Do not read or change anything in them.
   ```

3. Compare the answer with the page.

**Done means:** you know which apps agents can reach here, and that sending,
inviting or submitting waits for your consent. To connect your mail or
calendar, continue with [Connect your tools](/en/guide/tool-connections/).
