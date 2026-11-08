---
title: "Lesson 1: Sign in to your Environment"
description: "What an Environment is, which kind you work in and how you get in."
stableId: lazurio-doc-guide-course-first-sign-in
locale: en
summary: "What an Environment is, which kind you work in and how you get in."
updatedAt: "2026-11-08"
reviewedAt: "2026-11-08"
reviewOwner: Anna Blazickova
secondReviewOwner: Pablo AI
trustCritical: true
sourceRefs:
  - lazurio-onboarding-decision-register
  - lazurio-platform-folder-manual
  - lazurio-platform-shell-column-head
  - lazurio-platform-launchpad-texts
audience:
  - decision-maker
  - builder
  - agent
---

**In this lesson:** what an Environment is, which kind you work in and how
you get in.

An **Environment** is the computer on which agents work for you. Lazurio is
your window into it: in the browser you see its Chat, Apps and Automate,
while the agents, their files and the sign-ins stay on the Environment.
People see three kinds of hosted Environment:

- **Work Environment.** Your Organization owns it and assigns it to you.
  Agents in it act for you, within your rights. It serves only work:
  conversations from every client you use are stored in it, so personal
  matters do not belong there.
- **Team Environment.** The members of a Team share it. Everyone with access
  uses the accounts signed in there, so only team accounts belong in it.
- **Personal Environment.** It belongs to you alone. Every new one comes
  with Buddy, your personal representative.

Lazurio on your own computer has no kind; it is simply **your computer**.
An Environment with automations is an ordinary Work Environment, named Henry
where it needs a name. This course uses a Work Environment.

## How you get in

Lazurio's approved access model keeps three conditions apart
([decision 0192](https://github.com/Lazurio/LazurioPlatform/blob/4d5ee62a963a0ae2fc98287f0072e739ff6d2cd8/docs/decision-register.md)):
the network, active membership of the Organization and a grant to the
Environment or to one of its apps. Your Organization Admin arranges the
membership and the grant. Where the Environment is reachable only in the
Organization's tailnet, your device also needs Tailscale and the Organization
Admin's approval. The transition to this model is not complete, so how a device is
approved today can still differ between Organizations.

Sign in to Lazurio in your own browser. The browser in the right panel of an
Environment belongs to the Environment, and every agent there shares its
sign-ins. Never sign in to Lazurio in it.

## Your task

1. Open the address of your Environment and sign in with your Lazurio account.
2. In the header of the left column, find the name of the Environment and
   whom it serves. The gear beside it opens the Settings of exactly this
   Environment.
3. In Settings, open the section named after the Environment, for example
   **This Work Environment**, and read **Kind**, **Owner** and **Assignment**.

If the address does not open, follow
[Reach an Environment through Tailscale](/en/guide/tailscale/).

**Done means:** you are signed in, you see the switch Chat · Apps · Automate
at the top of the left column, and you can say which kind of Environment this
is, who owns it and to whom it is assigned.
