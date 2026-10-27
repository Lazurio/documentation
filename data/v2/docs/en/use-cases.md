---
title: "What Lazurio is good for"
description: "Work that suits Lazurio, the controls it needs and when to choose another tool."
stableId: lazurio-doc-use-cases
locale: en
summary: "Work that suits Lazurio, the controls it needs and when to choose another tool."
updatedAt: "2026-09-15"
reviewedAt: "2026-09-15"
reviewOwner: Matej Suchanek
sourceRefs:
  - lazurio-readme
  - lazurio-architecture
  - lazurio-collaboration-model
audience:
  - it-admin
  - decision-maker
  - builder
  - agent
---

Lazurio fits work whose results need to be kept, reviewed and shared: an
application change, a procedure or material for a decision. In the examples below, the agent prepares the work and the team reviews it.

## Strong-fit use cases

### Product and software delivery

Give the agent a specific application change. It can inspect the module,
edit the code, run tests and prepare a pull request. The team reviews the diff
and test results before accepting the change. Git keeps the history.

### Operational workflows across tools

A task may need both repository files and an approved external application.
Each connection is configured for the machine and can be revoked separately.
The setup does not rely on a single cloud broker with access to every tool.

### Durable organizational knowledge

A conversation can produce a procedure, plan or proposed decision. Have it
saved to the right place in the Organization and reviewed. Other people can
then find the information without searching your chat.

### Repeated agent roles

For recurring work, save the instructions, tools, tests and approval
requirements as a reviewed procedure. The next task can use that procedure
without relying on assumptions hidden in a copied prompt.

### Work across several companies

A founder, consultant or operator can mount several authorized Organizations
while keeping their repositories and GitHub access separate. This is an
exception inside one shared machine trust domain, not hard tenant isolation.
Keep provider sessions separately named and revocable. Use separate machines
or equivalent infrastructure when a compromise must not cross company
boundaries.

## Use cases that need additional controls

Regulated data, production infrastructure, financial actions, bulk messaging,
credential administration and destructive operations need provider-specific
access, approval and audit controls. Lazurio's operating model does not replace
applicable law, certification, segregation of duties or provider review.

## When another product may be the better start

- You only need personal drafting inside one productivity suite.
- The organization will not own repository access, endpoint controls or review
  rules.
- The task cannot be bounded, tested or reversed and has no authorized decision
  point.
- A mature product already solves the whole workflow with a simpler supported
  control plane.

For Microsoft-centric productivity, read the [Lazurio vs Microsoft
Copilot](/en/lazurio-vs-microsoft-copilot/) guide. The sensible result may be
Copilot, Lazurio, or both with distinct responsibilities.
