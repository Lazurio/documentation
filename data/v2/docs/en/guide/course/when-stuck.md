---
title: "Lesson 9: When something does not work"
description: "Where to turn when something stops, how to describe a problem and what never to send."
stableId: lazurio-doc-guide-course-when-stuck
locale: en
summary: "Where to turn when something stops, how to describe a problem and what never to send."
updatedAt: "2026-11-01"
reviewedAt: "2026-11-01"
reviewOwner: Anna Blazickova
secondReviewOwner: Pablo AI
trustCritical: true
sourceRefs:
  - lazurio-platform-launchpad-texts
  - lazurio-platform-folder-manual
  - lazurio-onboarding-decision-register
audience:
  - decision-maker
  - builder
  - agent
---

**In this lesson:** where to turn when something stops, and how to describe
a problem so that someone can help.

| What happens | What to do |
| --- | --- |
| The Environment's address does not open | Follow [Reach an Environment through Tailscale](/en/guide/tailscale/). |
| A step in Getting started stops | Read what the step says. Once AI is connected, **Solve in Chat** opens a new thread with a prepared request; read it and send it. If the step says that the Organization's Admin prepares it, contact your Organization Admin. |
| The app of a Module does not open | Its overview in Apps says why. Ask an agent in Chat to look at it. |
| An agent seems stuck | First look for a question it is waiting for you to answer. Then ask it what it has verified, what it is waiting for and what is missing. |
| Lazurio itself reports a fault | Settings → **Recovery** shows Lazurio's own checks. When one fails, it offers a prepared prompt for a repair agent and a prepared issue. |

When an agent finds a problem it cannot fix now, it records it as a GitHub
Issue in the repository concerned, gives you the link and goes on with the
rest of the work.

Describe a problem in three parts: what you wanted to do, what happened and
what you see, with a screenshot if it helps. Remove passwords, tokens, codes
and other people's data from it first, and never send them in a chat. Do not
keep clicking when you do not know what is happening.

## Your task

1. Open Settings → **Recovery** and read whether Lazurio in this Environment
   is healthy. Do not start anything.
2. In the thread of your first task, send:

   ```text
   Summarize what you have verified, what you are waiting for and what is missing.
   ```

**Done means:** you know where to turn in each situation in the table, and
you have a status summary of your first task.

This is the end of the course. Continue with the links in
[After the course](/en/guide/course/#after-the-course).
