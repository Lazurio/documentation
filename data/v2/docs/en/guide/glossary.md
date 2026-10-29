---
title: "Glossary"
description: "Terms for everyday work, administration and development in Lazurio."
stableId: lazurio-doc-guide-glossary
locale: en
summary: "Terms for everyday work, administration and development in Lazurio."
updatedAt: "2026-10-29"
reviewedAt: "2026-10-24"
reviewOwner: Anna Blazickova
secondReviewOwner: Pablo AI
trustCritical: true
sourceRefs:
  - lazurio-user-roles-current
  - lazurio-product-vocabulary
  - lazurio-readme
  - lazurio-architecture
  - lazurio-collaboration-model
audience:
  - it-admin
  - decision-maker
  - builder
  - agent
---

The basic terms cover everyday work. The advanced section explains
administration, development and change approval.

## Basic terms

<div class="lz-glossary">

**Lazurio** A shared work environment for people and AI agents. It helps
you find applications, work, and the information you need.

**Environment** The place where agents work for you. Hosted Environments
have three kinds: Personal, Work and Team.

**Personal Environment** Your Environment with Buddy and a Personal Workspace.

**Work Environment** An Organization Environment assigned to a particular
user. It may run automations; these do not create a separate fourth kind.

**Team Environment** An Environment shared by Team members. Every authorized
member can use its connected accounts, so connect team accounts there.

**Your computer** Your own device running Lazurio locally. It is not a fourth
kind of hosted Environment.

**Apps (called Launchpad in older sources)** The part of Lazurio where
you open Organization applications. Within an Environment, switch between
Chat, Apps and Automate.

**Guide** Practical help for Lazurio. When you are unsure what something
means or how to continue, start here.

**GitHub** The service that hosts repositories and manages their
permissions. It determines which repositories you can read or change.
Your AI provider account and subscription are separate.

**AI subscription** Your provider's plan determines available models and
usage limits. It is separate from GitHub repository permissions.

**Tokens** Units used to measure AI usage. They are consumed when reading
requests and generating responses; they are not passwords or access keys.

**Organization** A separate workspace for one company. It has its own
people, applications, data, and access.

**Team** A group of people who work together in a specific
area, such as sales or product.

**Workspace** The part of an Organization that contains applications for
day-to-day work.

**Module** One specific application in an Organization, such as Mission
Control or Knowledgebase.

**Marketplace** A place to discover additional applications and extensions
for Lazurio.

**Mission Control** The place for managing work. It shows what is being
addressed, who is responsible, and what should happen next.

**Knowledgebase** A shared company notebook with procedures and context for
future work. An agent can use an entry if it has access and loads it. Chat
content is not saved there automatically.

**Personal Workspace** Your private working content in a Personal
Environment. It serves you and your Buddy, rather than the Organization.
Older technical sources call it Personalspace.

**User** The person agents work with and for. The user has the final say;
agents act on their behalf within their live permissions and authorized task.
This describes the relationship with agents, not the Organization User role.

**Colleague** A user who works in an Organization.

**AI Colleague** An older name for a long-running AI role. Current
documentation describes automation as agents working in a Work Environment
with a responsible user. A role name grants no permissions by itself.

**Buddy** The name of Lazurio's personal product and your personal AI
representative. The approved design of the new personal product always includes Buddy,
with web access through a Lazurio account and no tailnet or SSH. Check
availability in your installation. Older personal installations in a
tailnet may retain their earlier access. Buddy acts only within your
permissions and the task you authorize.

**Prompt** A request you write for AI. For example: “Prepare an overview of
unpaid invoices and explain what I should address first.”

**Start** Turn an application on so it can be used.

**Open** Go to the selected application. If it is not running yet, Launchpad
may start it first.

**Stop** Turn off a locally running application. This does not delete its
data.

**Sync** Load the current state of projects and applications so you work
with the latest changes.

</div>

## Advanced terms

<div class="lz-glossary">

**Organization User** The Organization role for using available applications
without normally changing their source code or Organization settings. A user
working with agents can instead hold Builder, Steward or Admin permissions.

**Builder** An Organization member who creates and changes applications.
Their exact capabilities are determined by actual GitHub permissions.

**Steward** Reviews changes, helps complete them and may publish them
within their permissions. This role looks after quality in an Organization.

**Admin** An Organization administrator with extended permissions. They
manage access and important settings, but this does not grant access to
another person's Personalspace.

**Task Agent** An AI tool session for a particular task. It has no
permissions of its own; it uses access available in the Environment and
follows the user's instructions.

**Skill** A saved guide for an agent doing a particular kind of work, such as
preparing a presentation or reviewing changes. It may contain instructions,
templates and scripts. You still need to check the result.

**MCP server** A connection through which AI can use a specific tool or work
with its data, such as GitHub. It does not grant AI extra permission — it uses
only the access available on that Machine.

**Guardian** In older sources, a designated person who helps with recovery
or a service intervention for an AI Colleague. This does not grant general access.

**Draft** Work in progress that is not official yet. You can review, change,
or discard it.

**Publication** The moment a Draft becomes official or visible to others.
An agent publishes only with the explicit approval of an authorized user.

**Release** An official, labeled version of a product or application, such
as a new version for customers.

**Pull request (PR)** A proposed set of changes awaiting review and approval
before it enters the official version.

**Main** The project's primary, currently valid version. Work in progress
enters it only after the required checks.

**Worktree** A separate working copy of a project. An Agent or developer can
safely prepare changes there without affecting the main version.

**Productionspace** The technical part of an Organization for source code
and systems that are not ordinary work applications.

**Bun** A technical tool used to install, run, and test applications. If you
are not a developer, you usually do not need to use it directly.

**Machine** A device or isolated work environment in which Lazurio runs. It
also forms a boundary for security, access, and recovery.

**Access** Actual permission to view or change something. GitHub determines
repository permissions. A role name alone grants no access.

</div>

These names follow the public [Lazurio decisions](https://github.com/HumanAndMachines/Lazurio/blob/6416d27786296583baf08b75526cff225e2673f7/manual/decision-register.md),
especially 0170 and 0207 with their addenda. A particular installation may
still show older labels; technical names and commands stay unchanged.
