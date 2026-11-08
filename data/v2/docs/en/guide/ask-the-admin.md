---
title: "How to ask the Organization Admin"
description: "What only your Organization Admin does, how to ask them today and what a request must and must never contain."
stableId: lazurio-doc-guide-ask-the-admin
locale: en
summary: "What only your Organization Admin does, how to ask them today and what a request must and must never contain."
updatedAt: "2026-11-08"
reviewedAt: "2026-11-08"
reviewOwner: Matej Suchanek
secondReviewOwner: Pablo AI
trustCritical: true
sourceRefs:
  - lazurio-decision-register-admin-ai
  - lazurio-decision-0230-request
  - lazurio-decision-0234-role-names
audience:
  - builder
  - decision-maker
  - it-admin
  - agent
---

Some things in your Organization only its Organization Admin does. Ask them
with a request they can act on without asking back.

## What only the Organization Admin does

- Moves your Environment between the Organization's AI pool and your own
  account ([Where your AI comes from](/en/guide/ai-source/)).
- Approves or removes a device ([Device approval](/en/guide/device-approval/)).
- Arranges a new Environment or more memory or disk.
- Gives you a Module role in another Team's module, or access to its
  application. Under decision 0231, not yet deployed, that module's Module
  Contributors and Module Maintainers will also give application roles.
- Connects an Integration for the whole Organization, such as a shared mailbox.
- Changes a server.

What you can do yourself is in Settings. Examples are signing in to AI off the
pool, pairing a phone where Connections offers it and connecting your own
Integrations.

## How to ask today

Until Lazurio carries requests itself, decision 0230 names two ways. Both
carry the same content (next section):

1. **An issue in your Organization's root repository on GitHub**, titled
   "Request for the Admin: …" (in Czech "Žádost pro Admina: …"), that
   mentions the Organization Admins. Use it if you have access to that
   repository. The title is the fixed form that decision 0230 and the agents'
   skill use.
2. **A message to the Organization Admin**, sent the way your team usually
   reaches them.

In a **public Environment**, one that anyone with a Lazurio account may try,
no request is filed. It has no Organization Admin of yours to ask.

### With your agent

Lazurio teaches agents to file such a request with the skill
`admin-request`. It reaches your Environment with the Lazurio release that
includes it ([LazurioPlatform#860](https://github.com/Lazurio/LazurioPlatform/pull/860),
not yet released). In an Environment with that version, say for example "Ask
the Organization Admin to move me to my own ChatGPT account". The agent then:

1. checks that the matter really is the Organization Admin's;
2. collects what the Organization Admin needs;
3. files the issue;
4. gives you the link, or, without access to the repository, a text for you
   to send.

Until then, your agent can prepare the request text with you by this page,
and you file or send it yourself.

## What a request contains

- **What:** one action.
- **For whom and where:** your name, the Environment, and the device or module
  if it concerns one.
- **Why:** what you need it for.
- **State now:** what you see, for example in Getting started.
- **When:** a time that suits you, and what the change interrupts.

**Never** put a password, token, pairing code or verification code in a
request.

## Who the Organization Admin is

The Organization Admin is a role of Lazurio that an Organization Owner
(GitHub's owner role) appoints
([decision 0228](https://github.com/Lazurio/LazurioPlatform/blob/b62383756209f13b7d4113ada969e6fa3d32f1a3/docs/decision-register.md#0228--the-organization-admin-is-a-lazurio-role-and-the-admin-also-enters-every-environment-of-their-organization-in-the-browser),
not yet deployed). Until it is deployed, an active Organization Owner is the
Organization Admin. The role names follow
[decision 0234](https://github.com/Lazurio/LazurioPlatform/blob/753cca123df45721c3c1395a16a3a0df9a04dbcd/docs/decision-register.md#0234--the-names-of-access-roles-one-vocabulary-for-every-text-screen-and-agent).

## What is coming

Under decision 0230 you will ask the Organization Admin right in Lazurio. You
will file the request where the matter shows, and it reaches every
Organization Admin in the Organization's Dashboard. You will see its state and may withdraw it while it waits.
The first such request is the AI source in Getting started (decision 0229).
Until Lazurio carries requests, the ways above apply.

## For the Organization Admin

Open requests are the issues titled "Request for the Admin" or "Žádost pro
Admina" in the Organization's root repository, and the messages your
colleagues send you. Check that a request is the requester's own and ask for
anything missing where it arrived. Agree a time for a change that interrupts
work, and write the progress and the result back. A request grants nothing by
itself and replaces no review.
