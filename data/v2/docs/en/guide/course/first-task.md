---
title: "Lesson 7: Your first task"
description: "Brief an agent in Chat and have the result saved as a draft for your review."
stableId: lazurio-doc-guide-course-first-task
locale: en
summary: "Brief an agent in Chat and have the result saved as a draft for your review."
updatedAt: "2026-11-02"
reviewedAt: "2026-11-02"
reviewOwner: Anna Blazickova
secondReviewOwner: Pablo AI
trustCritical: true
sourceRefs:
  - lazurio-platform-folder-agent-rules
  - lazurio-platform-folder-manual
  - lazurio-onboarding-decision-register
  - github-about-pull-requests
  - github-protected-branches
audience:
  - decision-maker
  - builder
  - agent
---

**In this lesson:** how to brief an agent in Chat and how it saves the
result for your review.

Start a new thread in Chat. Every new thread starts in the Lazurio
**Folder**, the folder in which Lazurio keeps the agents' instructions next
to your Organizations; from there the agent finds your Organization
(decision 0189). Name the Organization and the work in your request.

Describe the task in your own words: what you want, why, from which
materials, what must not change, and that you want a draft for your review.
You do not need technical names; the agent looks up your Organization's
terms in its own documents. You can also dictate the request (see
[Recommended applications](/en/guide/recommended-apps/)). More about good
briefs is in [How to think about Lazurio and agents](/en/guide/start-here/).

## What the agent does

The instructions Lazurio generates for agents, the Folder's `AGENTS.md`,
tell every agent to
([`render.ts`](https://github.com/Lazurio/LazurioPlatform/blob/a2927744b5a87113425f93f5e1517ac97b2f6c06/src/folder/render.ts)):

1. work in a **worktree**, a separate working copy of the repository, so that
   the valid version on `main` stays untouched;
2. put the work on GitHub right away as a **Draft pull request**, a proposed
   change that GitHub does not let anyone merge while it is a draft. Where the
   repository's GitHub plan offers no drafts, the agent opens an ordinary pull
   request and writes in its description that the work is in progress;
3. ask you with a question that offers options whenever it needs a decision.
   Until you answer, that part of the work waits;
4. when the work is finished and checked, mark the pull request **Ready for
   review** and end with a **handoff**: the link, what Publication would
   introduce, what it has verified, and the question whether to publish in
   your name or to ask another colleague.

If you can only read the repository, the agent writes the proposal as an
issue there instead. A file that belongs in no repository goes to Files,
and you get a link to it; the task below uses the repository or issue you
chose in lesson 5.

These are rules in the agents' instructions, not technical locks. GitHub
enforces review and merge rules only where your Organization has protected
the branch.

## Your task

Have the piece of work from lesson 5 saved. Send in a new Chat thread:

```text
In our Organization [name], add this to [the place we agreed on] as a
draft for my review: [your two or three sentences].
First check whether something similar already exists and whether I can
write there. If I can, prepare a pull request; if I can only read it,
write the proposal as an issue. Ask me if anything is unclear. Do not
publish anything. At the end, give me the link.
```

Answer the agent's questions when they appear.

**Done means:** the agent has given you a link to a pull request marked Ready
for review, or to an issue; the change itself is visible there; and nothing
has been published. For a pull request, the closing question is waiting for
your answer. Do not answer it yet: review the change first in lesson 8. An
issue ends without that question, because the colleagues mentioned in it
decide on the change.
