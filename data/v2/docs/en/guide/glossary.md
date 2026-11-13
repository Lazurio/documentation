---
title: "Glossary"
description: "Terms for everyday work, administration and development in Lazurio."
stableId: lazurio-doc-guide-glossary
locale: en
summary: "Terms for everyday work, administration and development in Lazurio."
updatedAt: "2026-11-08"
reviewedAt: "2026-11-05"
reviewOwner: Anna Blazickova
secondReviewOwner: Pablo AI
trustCritical: true
sourceRefs:
  - lazurio-user-roles-current
  - lazurio-product-vocabulary
  - lazurio-readme
  - lazurio-architecture
  - lazurio-collaboration-model
  - lazurio-onboarding-decision-register
  - lazurio-decision-0234-role-names
  - lazurio-platform-folder-manual
  - lazurio-platform-launchpad-texts
  - lazurio-platform-module-standard-v0-1-20
  - lazurio-platform-module-parts-f14
  - lazurio-platform-marketplace-v0-1-21
  - lazurio-marketplace-registry
  - github-about-pull-requests
  - github-protected-branches
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

**Chat** The part of an Environment where you work with agents, one thread
per task. In an Environment it is T3 Code.

**Automate** The part of an Environment for regular tasks and automation.

**Getting started** The first section of an Environment's Settings. It shows
the steps that make the Environment ready for work: AI, GitHub and the
Organization's content, in this order.

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

**Module** One area of your work, such as orders, the website or
recipes. It keeps together the process agents follow, the data the work is
about, and the app in which you see and change it. Mission Control and
Knowledgebase are modules. See [Modules](/en/guide/modules/).

**Marketplace** The place at the bottom of Apps for module templates. A
template is added to your Organization as your own private copy. From version
0.1.21, a release candidate on 5 November 2026, it offers the templates of
Lazurio's public registry.

**Mission Control** The place for managing work. It shows what is being
addressed, who is responsible, and what should happen next.

**Knowledgebase** A shared company notebook with procedures and context for
future work. An agent can use an entry if it has access and loads it. Chat
content is not saved there automatically.

**Integration** An app or service connected to an Environment, such as mail
or a calendar. You connect it yourself in Apps → Integrations; every agent
of that Environment can then use it. Sending or publishing through it still
needs your consent.

**Personal Workspace** Your private working content in a Personal
Environment. It serves you and your Buddy, rather than the Organization.
Older technical sources call it Personalspace.

**Colleague (Kolega)** A user in an Organization. Their roles and Teams
decide what they may do.

**AI Colleague** An older name for a long-running AI role. Current
documentation describes automation as agents working in a Work Environment
with a responsible user. A role name grants no permissions by itself.

**Henry** The name of an Organization's Work Environment with automations.
A team of bots works in it under the Organization's persona, and one
responsible user answers for it. It is not a separate kind of Environment.

**Buddy** The name of Lazurio's personal product and of your personal AI
representative. Buddy belongs to your Personal Environment and acts only
within your rights and the mandates you give. Billing, secrets, access
changes, and a merge or publication outside an explicit mandate always need
your consent to that exact step.

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

**User** The person agents work with and for, who has the final say. Agents
act on their behalf within their live rights and the task they were given.
The bare word user names no role. When someone is to be made an "admin" or a
"user", say whether the Organization or which application is meant.

**Role** A named access of a person at one level: in the Organization, in a
module, in an application or in an Environment. It is written with a capital
initial and always names its level, such as Organization Admin or
Application User. A role name authorizes nothing by itself; actual access
decides.

**Organization Owner** Owns the GitHub Organization in which the
Organization lives (GitHub's owner role). Appoints and removes Organization
Admins. Gets no access to Environments by that alone.

**Organization Admin** Manages the Organization's members, Teams, access and
Environments; this does not grant access to another person's Personalspace.
It is a role of Lazurio that an Organization Owner appoints (not yet
deployed); until it is deployed, an active Organization Owner is the
Organization Admin.

**Organization Member** Every other person in the Organization. What they may
do follows from their roles in modules and applications. As the target,
membership in Lazurio decides, which needs no GitHub account; for now, live
membership of the GitHub Organization decides.

**Module Reader** Reads a module's source code and changes nothing. GitHub's
`pull` permission. This role by itself gives no role in the module's
application.

**Module Contributor** Builds the module and proposes changes. GitHub's
`push` permission on a repository that can have branch rules.

**Module Maintainer** May also merge the module's protected `main` and
release it. GitHub's `maintain` permission, or `push` where the repository
cannot have branch rules.

**Module access** The setting that holds a person's or a Team's role in a
module. It is not a role itself. Whoever has no role in a module has no
access to it.

**Application Admin** A role in a module's application, decided and not yet
deployed (decision 0231). What it may do is the Organization's rule in the
module's code. Without any setting, the
Application Admins are the Module Contributors, the Module Maintainers, the
Organization Admin and whoever has the whole Environment where the
application runs.

**Application User** The other role in a module's application, also not yet
deployed. What it may do is also the Organization's rule in the module's code.

**Assigned User** The person a Work Environment is assigned to.

**Service entry** Entry to an Environment for someone other than its
Assigned User. It is not a role. As decided and not yet deployed (decision
0228), the Organization Admin will have service entry to every Environment of
their Organization; anyone else only when it is granted for one Environment.

**Persona** An Organization's agent account, such as Henry's. It never names
a person's role.

**Principal** A term for the responsible identity in older Lazurio sources.
Current copy uses “user” for the person who assigns work and has the final say.

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

**Publication** The moment a Draft becomes official or visible to others,
such as merging a pull request or sending an email or a message. An agent
publishes only with the explicit approval of the user, whose live rights
decide what may be published.

**Handoff** How an agent ends a piece of work: the link to it, what
Publication would introduce, what the agent verified and the question who
publishes it.

**Release** An official, labeled version of a product or application, such
as a new version for customers.

**Pull request (PR)** A proposed set of changes awaiting review and approval
before it enters the official version.

**Draft pull request** A pull request that is still in progress. GitHub does
not let anyone merge it until it is marked ready for review. Agents in
Lazurio open one as soon as they start a change.

**Review** A check of a pull request by someone other than its author before
it is merged. On a protected branch, GitHub can require an approving review.

**Main** The project's primary, currently valid version. Work in progress
enters it only after the required checks.

**Worktree** A separate working copy of a project. An Agent or developer can
safely prepare changes there without affecting the main version.

**Productionspace** The technical part of an Organization for source code
and systems that are not ordinary work applications.

**Folder (Lazurio Folder)** The folder in an Environment where Lazurio keeps
the agents' instructions, manuals and skills, next to your Organizations.
Every new Chat thread starts there. Lazurio generates these files, so a
change made in them by hand blocks Lazurio's updates of them.

**Bun** A technical tool used to install, run, and test applications. If you
are not a developer, you usually do not need to use it directly.

**Machine** A device or isolated work environment in which Lazurio runs. It
also forms a boundary for security, access, and recovery.

**Access** Actual permission to view or change something. GitHub determines
repository permissions. A role name alone grants no access.

</div>

These names follow the public [Lazurio decisions](https://github.com/Lazurio/LazurioPlatform/blob/4d5ee62a963a0ae2fc98287f0072e739ff6d2cd8/docs/decision-register.md),
especially 0170 and 0207 with their addenda, 0169 for Henry and 0089 for
Buddy. [Decision 0234](https://github.com/Lazurio/LazurioPlatform/blob/753cca123df45721c3c1395a16a3a0df9a04dbcd/docs/decision-register.md#0234--the-names-of-access-roles-one-vocabulary-for-every-text-screen-and-agent)
sets the names of roles; the earlier names Builder, Steward and User no
longer name roles. A particular installation may still show older labels; technical
names and commands stay unchanged. The [onboarding course](/en/guide/course/)
uses these terms step by step.
