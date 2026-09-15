---
title: Glossary
description: Practical explanations of basic and advanced Lazurio terms.
stableId: lazurio-doc-guide-glossary
locale: en
summary: Plain and practical explanations of terms you will encounter when using, administering, or developing Lazurio.
updatedAt: "2026-09-15"
reviewedAt: "2026-09-15"
reviewOwner: Anna Blazickova
secondReviewOwner: Pablo AI
trustCritical: true
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

The basic terms cover everyday work. The advanced section explains
administration, development and change approval.

## Basic terms

<div class="lz-glossary">

**Lazurio** A shared work environment for people and AI Colleagues. It helps
you find applications, work, and the information you need.

**Launchpad** Lazurio's home screen. From here, you choose an Organization
and open the application you want to work in.

**Guide** Practical help for Lazurio. When you are unsure what something
means or how to continue, start here.

**GitHub** The account you use to sign in to Lazurio. It also determines
which Organizations and projects you can access and what you may do in them.

**Subscription** Determines how much you can use AI services and how many
tokens are available. It does not have to be linked to your GitHub account —
signing in and paying are separate concerns.

**Tokens** Units used to measure AI usage. They are consumed when reading
requests and generating responses; they are not passwords or access keys.

**Organization** A separate workspace for one company. It has its own
people, applications, data, and access.

**Team** A group of people and AI Colleagues who work together in a specific
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

**Personalspace** Your private space. It belongs only to you and,
optionally, your Buddy.

**Colleague** A person who works in an Organization.

**AI Colleague** A digital team member with its own work role,
responsibilities, and access.

**Buddy** Your personal AI assistant. It may help or represent you only
within the scope you allow.

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

**User** An Organization user. They use available applications but do not
normally change their source code or Organization settings.

**Builder** An Organization member who creates and changes applications.
Their exact capabilities are determined by actual GitHub permissions.

**Steward** A custodian of quality and order in an Organization. They review
changes, help complete them, and may publish them when their permissions allow
it.

**Admin** An Organization administrator with extended permissions. They
manage access and important settings, but this does not grant access to
another person's Personalspace.

**Principal** The person or AI Colleague for whom the Agent is currently
working and who has the final say.

**Task Agent** A temporary AI assistant for a specific task or conversation.
It has no permissions of its own and works only within its Principal's access.

**Skill** A saved guide for an agent doing a particular kind of work, such as
preparing a presentation or reviewing changes. It may contain instructions,
templates and scripts. You still need to check the result.

**MCP server** A connection through which AI can use a specific tool or work
with its data, such as GitHub. It does not grant AI extra permission — it uses
only the access available on that Machine.

**Guardian** A designated person who can help with recovery or a service
intervention for an AI Colleague. They do not manage its day-to-day work.

**Draft** Work in progress that is not official yet. You can review, change,
or discard it.

**Publication** The moment a Draft becomes official or visible to others.
An Agent publishes only with the explicit approval of an authorized Principal.

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

**Access** Actual permission to view or change something. In work
Organizations, GitHub determines it — a role name alone does not.

</div>
