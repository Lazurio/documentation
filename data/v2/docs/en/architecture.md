---
title: "Architecture"
description: "How people, devices, Environments, Organizations, modules and outside services fit together, what goes to GitHub and where a module keeps its data."
stableId: lazurio-doc-architecture
locale: en
summary: "How people, devices, Environments, Organizations, modules and outside services fit together, what goes to GitHub and where a module keeps its data."
updatedAt: "2026-11-11"
reviewedAt: "2026-11-05"
reviewOwner: Matej Suchanek
secondReviewOwner: Pablo AI
trustCritical: true
sourceRefs:
  - lazurio-register-production-applications-0239
  - lazurio-platform-module-standard-v0-1-20
  - lazurio-platform-module-standard-v0-1-21
  - lazurio-platform-module-parts-f14
  - lazurio-platform-decision-f52
  - lazurio-platform-content-sync-v0-1-20
  - lazurio-platform-release-v0-1-20
  - lazurio-platform-release-v0-1-21-rc-1
  - lazurio-platform-marketplace-v0-1-21
  - lazurio-platform-stack-profiles
  - lazurio-platform-register-modules
  - lazurio-platform-environment-access-v0-1-21
  - lazurio-platform-app-database-connection-question
  - lazurio-documentation-readme
  - lazurio-decision-register-admin-ai
audience:
  - it-admin
  - decision-maker
  - agent
---

This page is for IT and Organization Admins. A person reaches an
**Environment** from an approved device. The Environment is the computer where
agents work. An **Organization** is one GitHub organization, and each **module**
in it is a repository of its own. [Modules](/en/guide/modules/) explains the
same model without technical terms.

<figure class="lz-diagram">
  <picture>
    <source media="(max-width: 640px)" srcset="/diagrams/lazurio-architecture-mobile.svg" />
    <img src="/diagrams/lazurio-architecture.svg" alt="A person on a device in the tailnet reaches an Environment, the computer where agents work. The Environment keeps copies of the modules of an Organization, which is a GitHub organization with a root repository and a repository for each module. Around the Environment are Integrations, the vault and the AI provider. Server services with a database for modules are decided and not deployed." />
  </picture>
  <figcaption>Solid parts run today. Dashed parts are decided and not deployed.</figcaption>
</figure>

## The layers

**Person and device.** By default, entry has three conditions: the network
(Tailscale on the right Headscale tailnet, from a device the Organization
Admin approved), active membership of the Organization, and a grant to the whole
Environment or to one app. This is the target model of
[decision 0192](https://github.com/Lazurio/LazurioPlatform/blob/d1d8917cdf1afdf49c5091115ca9d615abc0c376/docs/environment-access.md),
and the transition is not complete: how a device gets in today can still differ
between tailnets. An Organization in public DNS mode (decision 0213, partly
deployed) drops the network condition and device approval. People then reach the
web interface through the server's entry with a Lazurio account.

**Environment.** The computer where agents work: a Personal, Work or Team
Environment. Agents work there with full access, without a sandbox or approval of
single commands (decision 0172). The Environment is the boundary, so narrower rights
mean a separate Environment with its own sign-ins and GitHub grants. The apps of
modules run here, and **Files** is this Environment's Documents folder.

**Organization.** One GitHub organization. Its root repository declares the
modules: each module is a slot in `modules.manifest.json`, and a Team is a
declaration on the slot, not a directory.

**Module.** One Git repository with `lazurio.module.json` at its root. Its
process is `AGENTS.md` with skills in `.agents/skills/`. Its app is a package in
`app/v<N>/`. Where its data lies follows from its generation, [below](#where-a-module-keeps-its-data).
A module can have no app at all. An Organization's module is a private repository
`<GitHub Organization>/<module>`. A personal module is a private repository
`<login>/<module>` on the person's own account, without an Organization or Teams.

**Around the Environment.**

- **Integrations** are apps connected to an Environment, one path each
  (decision 0162).
- **The vault** holds secrets. Each Environment has its own vault identity, and
  values never go into chat, Git, logs or pull requests (decisions 0193, 0198
  and 0203).
- **The AI provider** runs the models. [Where your AI comes
  from](/en/guide/ai-source/) describes the two sources.
- **Server services** run on one services Machine on each Organization server,
  with one container per service. Only Organization Admins enter them; an
  Organization Owner who is not also an Organization Admin does not (decisions
  0209 and 0228). Their
  status is decided, not yet deployed.

## One source, synchronized copies

GitHub holds the one source of a module. Every Environment that can read the
module keeps a checkout of it. The number of checkouts follows the Environments,
not the people: twenty people in one Team Environment share one checkout. However
many there are, they are checkouts of one repository, not separate sets of data.

The installed Lazurio fast-forwards clean checkouts at its start and then every
hour. Since release v0.1.20 the same synchronization also clones a declared
module or data repository once this Environment's identity can read it, unless
the slot is restricted to Organization Admins or the Environment is a Team
Environment. A restricted slot is not cloned this way even for an Organization
Admin; it stays an explicit installation. Each round is an attempt: a root that
does not end current stops its Organization, and a denied or failed operation
leaves that repository as it is until the next round.

A change goes the other way as a Publication: a merged pull request, or for
repository-db data a commit and push of the unpublished change.

## Access by Team

Which Teams reach a module is decided by the live grant on GitHub (decision
0186). `teams` in the Organization's manifest is only the default when a module
is created, and creating a module grants Write to each Team named. Organization
overview changes a grant through the GitHub app Lazurio Administration Access,
with the acting person's own rights, so GitHub's audit names that person. A
change that a Module Maintainer asks for is a request that an Organization
Admin approves.

Revoking access stops the operations on that repository but does not delete what
an Environment already has. The checkout stays, an agent with access to that
Environment can still read it, and it stops updating. The Organization's manifest
names every module, so a name alone is not hidden.

Lazurio controls entry to a module and passes it a verified identity. What each
person may do inside is the Organization's own rules in its code and data
(decision 0196).

## What goes to GitHub and what does not

| What | Where it lives | On GitHub |
| --- | --- | --- |
| Process, skills and app code | The module's repository | Yes |
| Content of a `v2` module | `data/v2/` in the module's repository | Yes |
| Records of a `v3` module | The data repository `<module>-data` | Yes |
| Schema of a `v4` module | The module's repository | Yes, once deployed |
| Rows of a `v4` module | The database in the Server services | No, once deployed |
| Secrets | The vault | No |
| Files | The Documents folder of one Environment | No |
| Sign-ins of tools | The Machine under the Environment | No |
| Data in connected apps | Those apps | No, unless an agent copies it into a module |

## Where a module keeps its data

The generation of an app, the directory `app/v<N>`, names where the data lies,
not the app's quality (decision F69, in release candidate v0.1.21-rc.1).

| Generation | Where the data lies | When it fits | Public example | Status |
| --- | --- | --- | --- | --- |
| `v1` | Content is part of the app. There is no data layer. | The module has no records of its own. | Design System and Presentations templates | Available |
| `v2` | Content lies beside the app in the same repository, in `data/v2/`. There is no data layer of its own. | There is a lot of content, it changes now and then and agents edit it. | [This documentation](https://github.com/Lazurio/documentation) | Available |
| `v3` | Records lie in a data repository `<owner>/<module>-data`, managed by repository-db and checked out as `db/`. A person's edit is an unpublished change; publishing it is one commit and push. | Records change daily and you want history and approval. This is the default for a new module with data. | Mission Control template | Available |
| `v4` | Records lie in a Dolt database in the Server services of the Organization's server. GitHub holds the app, the process and the schema, not the rows. | Many people write at once, access differs inside the data, personal data must be deletable, or an outside service writes. | None yet | **Decided, not deployed** |

Three things about the table:

- **Before v0.1.21.** In release v0.1.20, a new module with data starts in
  `app/v1`, with its data in repository-db. From v0.1.21 it starts in `app/v3`.
  An existing module keeps its directory and moves at its next planned
  transition.
- **Moving up.** A module starts as low as it can. A transition is a planned
  step: a new generation beside the old one, the data converted, then the
  default app switched by a Module Maintainer or the user. A module keeps
  at most two generations.
- **`v4` today.** No template exists, `lazurio module create` has no stack for
  it, and how an app gets its connection without `.env` is an [open
  question](https://github.com/Lazurio/LazurioPlatform/issues/818). The decided
  design is a primary on one server, a hot standby on a second server where
  there is one, and a copy of the whole database every 15 minutes to Google Cloud
  Storage in the Organization's own project in the EU. An Environment connects
  only to the services of its own server. A Dolt database outside the server is
  a connection setting of `v4`, not a `v5`.

## Module or Integration

An outside system stays where it is. An agent reaches it as an Integration, for
example through a custom MCP server in Executor, and sees what that connection
allows. The data stay in that system. The November 11, 2026 amendment of 0209 makes the `v4` database service
an accepted target for workspace and production applications, with separate
databases, identities and grants: workspace and preview identities gain no
production write access. Production applications run on a separate application
host (0239). This amendment is not evidence of a deployed database or production entry.

Our assessment, not a technical limit: build a module when you want your own
process and app, and connect an Integration when you mostly use someone else's
app.


## Organization production applications: accepted target

Decision 0239 separates a released application from its builder's Environment.
The Organization runs it on its own Proxmox server, and its Organization Admin
approves every publication and exact released version through a pull request to
the Deployment Repo. An employee signs in with a Lazurio account as an
Application User or Application Admin, without receiving an Environment, shell
or source access. Sharing from a Work Environment is a separate path that follows later.

The application host is not an Environment and has no Assigned User. It runs
only released builds. Server Services carries the public entry and DNS-01.
The future address is `<module>.<organization>.lazurio.app`, without the host's
name; domain ownership and DNS delegation must be verified before use.
The accepted design also includes MCP on the application origin with the same
Lazurio sign-in and role. **This is an accepted target, not a claim of deployment.**

The amendment of 0216 makes a new slot 4 vCPU, 8 GiB RAM and **50 GiB disk**.
Two slots have 100 GiB, four have 200 GiB. The 32 GB class is removed;
Server Services and the application host are outside people's slots:

| Server class | Slots | Server Services RAM / disk | Application host RAM / disk |
| --- | --- | --- | --- |
| 64 GB RAM, 2×512 GB NVMe | 6 | 4 / 40 GiB | 2 / 20 GiB |
| 128 GB RAM, 2×1 TB NVMe | 12 | 8 / 80 GiB | 8 / 40 GiB |

The two disks form a mirror. This decision never shrinks existing disks:
they need a new smaller guest and a separately approved data move. Production
data has one writer; builders and previews do not write it.

## Who did what

A change to a repository is a Git commit with its author, and a pull request
keeps its review. GitHub's audit names the person who changed a Team's grant
(decision 0186). For `v4`, a Dolt commit with its author and message is the
planned publication; the stack profile calls that mapping a design to prove on a
prototype, not verified behaviour.

## Sources

- [Lazurio Module Standard](https://github.com/Lazurio/LazurioPlatform/blob/5edbc2b7ebf53aec4e116663db60021d24593dbe/docs/module-standard.md) at release v0.1.20, and [at v0.1.21-rc.1](https://github.com/Lazurio/LazurioPlatform/blob/d1d8917cdf1afdf49c5091115ca9d615abc0c376/docs/module-standard.md) for the generations.
- [Stack profiles](https://github.com/Lazurio/LazurioPlatform/blob/d1d8917cdf1afdf49c5091115ca9d615abc0c376/docs/stack-profiles.md) at v0.1.21-rc.1: the data layer of each generation, `app-data` and `app-database`.
- [Content synchronization](https://github.com/Lazurio/LazurioPlatform/blob/5edbc2b7ebf53aec4e116663db60021d24593dbe/docs/content-sync.md) at release v0.1.20.
- [Environment access](https://github.com/Lazurio/LazurioPlatform/blob/d1d8917cdf1afdf49c5091115ca9d615abc0c376/docs/environment-access.md) at v0.1.21-rc.1.
- [Decision register](https://github.com/Lazurio/LazurioPlatform/blob/d1d8917cdf1afdf49c5091115ca9d615abc0c376/docs/decision-register.md) at v0.1.21-rc.1: decisions 0162, 0171, 0172, 0186, 0192, 0193, 0196, 0198, 0203, 0209, 0213 and 0228.
- [Decision F14](https://github.com/Lazurio/LazurioPlatform/blob/5edbc2b7ebf53aec4e116663db60021d24593dbe/docs/decisions.md#f14--agent-manuals-live-in-the-lazurio-folder) (what a module holds) and [F52](https://github.com/Lazurio/LazurioPlatform/blob/5edbc2b7ebf53aec4e116663db60021d24593dbe/docs/decisions.md#f52--one-module-generator-in-the-platform-a-persons-own-modules-in-their-personalspace) (one generator, personal modules).

- [0239, 0216 and 0209 — production applications and capacity, 2026-11-11](https://github.com/Lazurio/LazurioPlatform/blob/1838ab74a5a0f0a8eb6acfa5281522561ca4a75a/docs/decision-register.md).
