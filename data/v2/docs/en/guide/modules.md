---
title: "Modules"
description: "What a module is, where you find it, how it comes to be, who gets it and where its data lies."
stableId: lazurio-doc-guide-modules
locale: en
summary: "What a module is, where you find it, how it comes to be, who gets it and where its data lies."
updatedAt: "2026-11-08"
reviewedAt: "2026-11-08"
reviewOwner: Matej Suchanek
secondReviewOwner: Pablo AI
trustCritical: true
sourceRefs:
  - lazurio-platform-module-standard-v0-1-20
  - lazurio-platform-module-standard-v0-1-21
  - lazurio-platform-module-parts-f14
  - lazurio-platform-decision-f52
  - lazurio-platform-content-sync-v0-1-20
  - lazurio-platform-new-module-tile-v0-1-20
  - lazurio-platform-texts-v0-1-20
  - lazurio-platform-prompt-handoff-v0-1-20
  - lazurio-platform-release-v0-1-20
  - lazurio-platform-release-v0-1-21-rc-1
  - lazurio-platform-marketplace-v0-1-21
  - lazurio-marketplace-registry
  - lazurio-template-adoption
  - lazurio-platform-stack-profiles
  - lazurio-platform-register-modules
  - lazurio-platform-folder-manual
  - lazurio-decision-0234-role-names
audience:
  - decision-maker
  - builder
  - agent
---

**A module is one area of your work, such as orders, the website or
recipes. It keeps together the process agents follow, the data the work is
about, and the app in which you see and change it.**

<figure class="lz-diagram">
  <video controls playsinline preload="none" poster="/videos/modules-en.webp" aria-describedby="modules-video-words">
    <source src="/videos/modules-en.mp4" type="video/mp4" />
  </video>
  <figcaption id="modules-video-words">A module is one area of your work. A process, data and an app in one package. Agents follow the process, people work in the app. The Organization Admin decides who gets the module. Build yours with an agent or from a template.</figcaption>
</figure>

## The three parts

| Part | For whom | What it is |
| --- | --- | --- |
| **Process** | agents | How the work is done: the steps, rules and instructions agents follow. |
| **Data** | people and agents | The records and content of the work: orders, the pages of your website, recipes. |
| **App** | people | The screen where you see and change the data: an overview, a form, a board, a website. A module can start without one. |

Under the three parts is a repository on GitHub. Changes in a module have a
history and can be taken back, so you can try things without worry. That does
not cover records in a database or what an agent sent out, such as an e-mail.

## An example every company has

Take your **website**. The process says how you write texts and which colours
you use. The data are the pages, texts and images. The app is the website
itself and its preview. That is why it is enough to send an agent a screenshot
and write "fix this sentence": the website's module tells the agent where the
text lies and how to publish the change.

Two more examples:

- **Orders:** the process of taking an order, the orders themselves and an
  overview of them.
- **Finance without an app:** the process and the tables. You add an app when
  you want one.

A module is not a folder. A module without an app still has its process and
data, and agents work with them.

## Where you find a module

Open **Apps**. Under **Workspace** you see every module of your Organization
that your Environment can reach, each once. A tile opens the module's app in
your browser; the app itself runs in your Environment.

If a colleague mentions a module you do not see, you may not have access to it.
Ask your Organization Admin.

## How a module comes to be

**With an agent.** Under **Workspace** in Apps, choose **New module**. Chat
opens in a new thread with a prepared brief, not sent. You describe what the
module should do, the agent asks about what it still needs and chooses the
technical details itself. It shows you a plan and creates the module only after
you confirm it.

Who can do this depends on where the module goes:

- **In an Organization, the Organization Admin creates modules.** Only they see the
  **New module** tile. The module becomes a private repository of the
  Organization.
- **If you are not the Organization Admin,** describe what you need and
  [ask them](/en/guide/ask-the-admin/).
- **In your Personal Environment, you create your own.** The same tile is in
  your personal space. The module becomes a private repository on your own
  GitHub account, belongs only to you and does not go into any Organization.

**From a template.** Version 0.1.21, a release candidate on 5 November 2026,
brings templates to the **Marketplace** at the bottom of Apps: Mission Control,
Design System and Presentations. **Add to Organization** hands a brief to your
agent, who shows you a plan and prepares a private copy in your Organization.
The Organization Admin creates it here too; otherwise your agent prepares a
request for them.

However a module comes to be, it is your module. Start with a small first
version. A module grows in further requests in Chat.

## How a module changes

Write what you want changed in Chat. The agent prepares the change and shows it
to you in the panel on the right. When you are happy with it, write "publish".
Nobody has to go to GitHub. [Review and
Publication](/en/guide/course/review/) explains that last step.

## Who gets a module and when it appears

An Organization shares its modules by Team. The Organization Admin decides which
Teams reach a module, in Organization overview or directly on GitHub. A Team's
access to a module has a level, one of the Module roles: Module Reader, Module
Contributor or Module Maintainer (decisions 0232 and 0234). A module
is delivered to an Environment: what is not in the Environment does not show in
Apps, and an agent there cannot read it. The agent can still see its name in the
Organization's manifest.

What counts is what the Environment actually holds. Whoever has full access to a
shared Environment works with its modules too, even without their own access to
the module. And taking access away does not delete the copy an Environment
already has: it stays there, an agent in that Environment can still read it, and
it only stops updating.

Since version 0.1.20, a module you have been given access to comes by itself.
Lazurio tries to bring it to your Environment when it starts and then every hour,
so it usually appears in Apps within an hour and nobody has to install anything.
That is an attempt, not a guarantee. If your Environment's copy of the
Organization's root repository cannot be updated, or GitHub refuses the operation
or it fails, the module does not arrive and Lazurio tries again in the next round.
If a module you expect stays away, ask your Organization Admin.

Two cases work differently:

- **A Team Environment** does not receive a new module this way. Ask your
  Organization Admin.
- **A module restricted to Organization Admins** does not arrive by itself, not
  even for them. It is installed separately.

A personal module stays in your Personal Environment.

## Modules, Files and Integrations

| | What it is | What it means for you |
| --- | --- | --- |
| **Module** | A shared area of work of your Organization. | It has a history and reaches people by their access. |
| **Files** | The Documents folder of one Environment: a desk where you hand materials to agents and collect finished files. | It stays in that one Environment and has no change history. |
| **Integration** | Someone else's app that agents use from outside, such as e-mail or a calendar. | You work with what the connection offers. The app's code is not yours. |

Two rules of thumb, which are our recommendation:

- What your team should share, or what must outlive one Environment, belongs in
  a module.
- Build a module when you want your own process and app. Connect an Integration
  when a ready-made app does most of the job.

## Where the data lies

Modules differ in where they keep their data. You do not have to choose: the
agent picks the simplest place that fits, and a module moves on only when real
use needs it.

| Where the data lies | When it fits | Example |
| --- | --- | --- |
| In the app itself | The module has no records of its own. | A set of presentations |
| Beside the app, in the same repository | There is a lot of content, it changes now and then and agents edit it. | This documentation |
| In a data repository of its own | Records change daily and you want history and approval. A change waits until a person publishes it. | Plans in Mission Control |
| In a database on your Organization's server | Many people write at once, access differs inside the data, or personal data must be deletable. **Decided, not available yet.** | A CRM for a whole sales team |

[Architecture](/en/architecture/) gives the same table with its technical names
for IT.

## Frequently asked questions

**If twenty people use a module, are there twenty sets of data?**
No. There is one source on GitHub. Each Environment with access keeps a copy,
and Lazurio updates it regularly.

**Does everyone have their own repository, or is there one for the whole
Organization?**
Neither. The Organization has one root repository and each module has a
repository of its own. People work on a copy in their Environment.

**Are these our own modules, or yours?**
Always yours. A template is added as your own private copy.

**Is Apps something other than a module?**
Yes. Apps is the page in Lazurio where you find modules. A module is what its
tile opens.

**Do I have to put a new module into a folder?**
No. The agent creates it in its place, and it appears in Apps.

**Can one request build a complete CRM?**
Not in one go. Ask for a small first version that does one thing well, then add
to it in Chat.

**Do I have to merge anything on GitHub to change a module?**
No. Write the change in Chat, check it in the panel on the right and write
"publish".

**Can an agent reach our existing database or another system?**
Yes, as an Integration, if the system offers a way to connect. IT will find the
details in [Architecture](/en/architecture/#module-or-integration).
