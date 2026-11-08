---
title: "Lesson 4: Who works with you"
description: "You as the user, agents, colleagues and their roles, Henry and Buddy: who decides what."
stableId: lazurio-doc-guide-course-who-works-with-you
locale: en
summary: "You as the user, agents, colleagues and their roles, Henry and Buddy: who decides what."
updatedAt: "2026-11-08"
reviewedAt: "2026-11-08"
reviewOwner: Anna Blazickova
secondReviewOwner: Pablo AI
trustCritical: true
sourceRefs:
  - lazurio-onboarding-decision-register
  - lazurio-decision-0234-role-names
  - lazurio-platform-folder-manual
audience:
  - decision-maker
  - builder
  - agent
---

**In this lesson:** who decides what in your Environment and in your
Organization.

**You are the user.** The agents in your Environment work for you and act
with your rights. You give the instruction to publish their work and you
have the last word.

**An agent** (Task Agent) is a working session of an AI tool such as Codex
or Claude Code, for example one thread in Chat. It has no authority of its
own, and no prompt gives it any. Inside the Environment it works with full
access, without a sandbox and without approval of each command: the
Environment is the boundary (decision 0172). Whatever is signed in to your
Environment, its agents can use. Full access is a capability, not consent:
Publication stays with you.

**A colleague** (Kolega) is a user in an Organization. Their roles and Teams
say what they may do. Every role names its level (decision 0234):

- **Organization:** the **Organization Owner** owns its GitHub Organization
  and appoints the Organization Admins, the **Organization Admin** manages
  the Organization's members, Teams, access and Environments, and everyone
  else is an **Organization Member**.
- **Module:** a **Module Reader** reads it and changes nothing, a **Module
  Contributor** builds it and proposes changes, and a **Module Maintainer**
  may also merge its protected `main` and release it.
- **Application:** an **Application Admin** and an **Application User** may
  do what the Organization's rule in the Module allows.

A role name authorizes nothing by itself; the live grant decides, today on
GitHub (decisions 0062 and 0231).

**Henry** is the name of an Organization's Work Environment with
automations. A team of bots works there under the Organization's persona,
and one responsible user, an Organization Owner or an Organization Admin,
answers for it (decision 0169). Where your Organization runs Henry, you meet it
mostly on GitHub, for example in a review of a pull request.

**Buddy** is your personal representative. Buddy runs in your Personal
Environment, if you have one, and acts only within your rights and the
mandates you give. Billing and ownership, recovery, secrets, changes of
access and destructive steps always need your consent to that exact step,
and so do a merge, a publication or a release that no explicit mandate
covers (decision 0089).

A persona is an Organization's agent account, such as Henry's. Like the name
you give your Buddy, it is not a user and holds no authority of its own. The
decision numbers refer to the public
[Lazurio decision register](https://github.com/Lazurio/LazurioPlatform/blob/4d5ee62a963a0ae2fc98287f0072e739ff6d2cd8/docs/decision-register.md).

## Your task

In a new Chat thread, send:

```text
Check what I may do in our Organization on GitHub. For the Organization's
root repository and for the repository where we keep shared knowledge,
tell me whether I can write to them or only read them, and who can merge
changes there. Only read; do not change anything.
```

**Done means:** you know whether you can write to the repository where your
first task will go and, if you cannot, who publishes changes there.
