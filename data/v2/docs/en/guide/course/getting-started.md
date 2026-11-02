---
title: "Lesson 2: Finish Getting started"
description: "Connect AI and GitHub and download your Organization, in this order."
stableId: lazurio-doc-guide-course-getting-started
locale: en
summary: "Connect AI and GitHub and download your Organization, in this order."
updatedAt: "2026-11-01"
reviewedAt: "2026-11-01"
reviewOwner: Anna Blazickova
secondReviewOwner: Pablo AI
trustCritical: true
sourceRefs:
  - lazurio-onboarding-decision-register
  - lazurio-platform-getting-started
  - lazurio-platform-launchpad-texts
  - lazurio-platform-shell-column-head
audience:
  - decision-maker
  - builder
  - agent
---

**In this lesson:** what your Environment needs before agents can work for
you, and in which order.

**Getting started** is the first section of the Environment's Settings. It
lists the steps that make the Environment ready for work. It checks each
step against the Environment's own state, not against your browser, so it
shows the same wherever you open it
([`start-view.ts`](https://github.com/Lazurio/LazurioPlatform/blob/a2927744b5a87113425f93f5e1517ac97b2f6c06/src/launchpad/start-view.ts)).
While a required step is missing, the header of the left column shows
**Finish setting up**, for example **(1 of 3)**, and leads you there
([`view.ts`](https://github.com/Lazurio/LazurioPlatform/blob/a2927744b5a87113425f93f5e1517ac97b2f6c06/src/shell/view.ts)).

The required steps go in this order:

1. **Connect AI.** Sign in with your ChatGPT or Claude account, or with both.
   On an Environment on a server, the sign-in page opens in the browser in the
   right panel; passkeys and your computer's password manager do not work
   there. If your Organization provides AI, the step says **Provided by your
   Organization.**
2. **GitHub.** **Connect** becomes available once AI is connected. Confirm the
   one-time code on github.com with the GitHub account that has access to your
   Organization.
3. **Download** your Organization. It starts by itself once GitHub is connected
   and downloads the Organization's Modules.

AI comes first so that an agent in Chat can help you with the rest. When a
step stops, it says what to do next. **Solve in Chat** opens a new Chat thread
with a prepared request that is not sent yet. **The Organization's Admin
prepares it.** means that your Admin has to act, not you.

Below the required steps are optional ones, such as Composio for mail and
calendars, SSH from your own computer and a tour of the app. You can add them
at any time. A Team Environment has its required steps prepared in advance.

## Your task

1. Open Settings → **Getting started**.
2. Complete the required steps until the page says **The Environment is ready.**
3. Under **App tour**, choose **Start the tour** and click through Apps, Chat
   and Automate.

**Done means:** every required step is done, the page says **The Environment
is ready.** and the row **Apps, Chat and Automate** shows **Seen**.
