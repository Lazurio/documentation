---
title: "How to ask the Admin"
description: "What only your Organization's Admin does, how to ask them today and what a request must and must never contain."
stableId: lazurio-doc-guide-ask-the-admin
locale: en
summary: "What only your Organization's Admin does, how to ask them today and what a request must and must never contain."
updatedAt: "2026-11-05"
reviewedAt: "2026-11-05"
reviewOwner: Matej Suchanek
secondReviewOwner: Pablo AI
trustCritical: true
sourceRefs:
  - lazurio-decision-register-admin-ai
  - lazurio-decision-0230-request
audience:
  - builder
  - decision-maker
  - it-admin
  - agent
---

Some things in your Organization only its Admin does. Ask the Admin with a
request they can act on without asking back.

## What only the Admin does

- Moves your Environment between the Organization's AI pool and your own
  account ([Where your AI comes from](/en/guide/ai-source/)).
- Approves or removes a device ([Device approval](/en/guide/device-approval/)).
- Arranges a new Environment or more memory or disk.
- Gives access to another Team's module or application.
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
   mentions the Admins. Use it if you have access to that repository.
2. **A message to the Admin**, sent the way your team usually reaches them.

In a **public Environment**, one that anyone with a Lazurio account may try,
no request is filed. It has no Organization Admin of yours to ask.

### With your agent

Lazurio teaches agents to file such a request with the skill
`admin-request`. It reaches your Environment with the Lazurio release that
includes it ([LazurioPlatform#860](https://github.com/Lazurio/LazurioPlatform/pull/860),
not yet released). In an Environment with that version, say for example "Ask
the Admin to move me to my own ChatGPT account". The agent then:

1. checks that the matter really is the Admin's;
2. collects what the Admin needs;
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

## Who the Admin is

The Organization Admin is a role of Lazurio that an Owner of the GitHub
Organization appoints
([decision 0228](https://github.com/Lazurio/LazurioPlatform/blob/b62383756209f13b7d4113ada969e6fa3d32f1a3/docs/decision-register.md#0228--the-organization-admin-is-a-lazurio-role-and-the-admin-also-enters-every-environment-of-their-organization-in-the-browser),
not yet deployed). Until it is deployed, an active Owner of your GitHub
Organization is the Admin.

## What is coming

Under decision 0230 you will ask the Admin right in Lazurio. You will file the
request where the matter shows, and it reaches every Admin of the Organization
in its Dashboard. You will see its state and may withdraw it while it waits.
The first such request is the AI source in Getting started (decision 0229).
Until Lazurio carries requests, the ways above apply.

## For the Admin

Open requests are the issues titled "Request for the Admin" or "Žádost pro
Admina" in the Organization's root repository, and the messages your
colleagues send you. Check that a request is the requester's own and ask for
anything missing where it arrived. Agree a time for a change that interrupts
work, and write the progress and the result back. A request grants nothing by
itself and replaces no review.
