---
title: "GitHub baseline for a new Organization"
description: "What a GitHub Organization needs before Lazurio works in it: roles and Teams, the Lazurio for GitHub app, repository access, protection of main and who merges."
stableId: lazurio-doc-github-baseline
locale: en
summary: "The GitHub settings an Organization Owner prepares and reads back before the first Module Contributor: the app, base permission none, the builders Team, infra only for Organization Owners, protected main and merging."
updatedAt: "2026-11-18"
reviewedAt: "2026-11-05"
reviewOwner: Matej Suchanek
secondReviewOwner: Pablo AI
trustCritical: true
sourceRefs:
  - lazurio-decision-0250-henry
  - lazurio-decision-register-access-0245-0247
  - lazurio-decision-register-gen4
  - lazurio-decision-register-admin-ai
  - lazurio-decision-0234-role-names
  - lazurio-first-organization-rollout
  - lazurio-organization-install
  - lazurio-root-agent-rules
  - lazurio-platform-folder-release
  - lazurio-platform-folder-roles
  - lazurio-platform-decision-f31
  - lazurio-platform-team-github
  - lazurio-github-app-broker
  - github-organization-roles
  - github-base-permissions
  - github-install-app
  - github-protected-branches
  - github-rulesets
  - github-code-owners
  - github-repository-collaborators
  - github-rest-pull-requests
audience:
  - it-admin
  - decision-maker
  - agent
---

GitHub is the only authority for access to an Organization's source code in
Lazurio. Membership, Teams, repository grants and branch rules decide who
reads, writes, reviews and merges; Lazurio keeps no second access list. One
Lazurio Organization is one GitHub Organization and one access boundary. Before
the first Module Contributor installs Lazurio for a new Organization, an
Organization Owner sets up the baseline below and reads it back against the
Organization's manifest (decision 0150).

People enter Environments with a Lazurio account and need no GitHub account for
that. GitHub still decides what can be done with the repositories and what may
be published, and for accounts linked to GitHub, live membership of the GitHub
Organization mirrors membership of the Lazurio Organization. This entry model
is Lazurio's target under decision 0245; the transition is not complete.

## The baseline

| Item | Required state | What enforces it |
| --- | --- | --- |
| GitHub Organization | One per Lazurio Organization. Its Organization Owners hold GitHub's owner role. Today an active Organization Owner performs the Organization Admin's administrative acts (approving devices, the AI source, answering requests, application roles) and gets no access to any Environment by them (decision 0234). For GEN4 the Organization Admin is decided as a role of Lazurio that an Organization Owner appoints in the Organization's Deployment Repo and that Lazurio Auth holds (decision 0245, not yet deployed). | GitHub's owner role for the Organization Owner; in GEN4 the Organization Admin role will be held by Lazurio Auth (decision 0245, not yet deployed) |
| Root repository | The Organization's root repository on `main`, by convention `<login>/<login>_GEN3`, with the manifest `lazurio.organization.json`. | Lazurio reads it; GitHub controls access |
| Lazurio for GitHub | An Organization Owner installs the app with access to **All repositories**. "Only select repositories" is a supported exception; it must include the root and every repository Lazurio serves, and it is never presented as the full Organization. | GitHub installation scope |
| Base repository permission | `none` (API `default_repository_permission`). Membership alone opens no private repository. | GitHub |
| Team `builders` | Exactly one Team gives the approved people their Write on the Organization's repositories. Its complete roster equals the approved list, and each is an active member of the GitHub Organization, not a pending invitation. | GitHub membership |
| Grants of `builders` | Explicit Write (API `push`) on the root and on every active repository that is not restricted. A new repository gets this grant in the same step that creates or activates it. | GitHub grants |
| Restricted repositories | No grant for `builders` on `infra` or on any repository the manifest declares `default_access: restricted` or `private`. The `infra` repository, the Organization's Deployment Repo, belongs to its Organization Owners: only they see and change it, beside the named machines of decision 0245 (decisions 0093 and 0245). An Organization Admin's changes there are to go through the Dashboard; until that is deployed, an Organization Admin who works in the repository keeps the grant they hold today. | GitHub grants |
| Design Systems | Every person and account in the Organization, including the accounts of Environments with automations, has at least Read on the Organization's Design Systems. | Process: a rule of the Organization template and of the GEN3 Lazurio Root that the Organization Admin checks; no Lazurio decision requires it |

GitHub cannot express "every current and future repository except `infra`",
so each new regular repository needs its own grant for `builders`. Whether a
repository is restricted follows only from its declaration in the manifest,
never from its name or path (decision 0143). Organization Owners reach
restricted repositories through GitHub's owner role; Lazurio records that as
an owner-role exception, never as a grant of `builders`. Changing members, Teams, grants or app
installations is a write to GitHub that needs the user's explicit instruction;
an agent prepares it and reads it back.

An Organization that runs automated work in an Environment with automations
(Henry) adds its Organization's Henry: a machine user account with two-factor
authentication, an Organization Member with exact rights and never an
Organization Owner, different in every Organization. It works through a Team `steward` with
Maintain, the Module Maintainer role, on all repositories except `infra`. On
`infra` it may get only a direct Write, never through a Team and never GitHub's
`admin` permission, as the named reviewer of infra pull requests once the Organization
switches its review policy to it (decisions 0169, 0093 and 0250).

## Read it back before the first Module Contributor

The Organization Owner compares the live state with the manifest's active
repositories, not with a hand-kept list. An `unknown` status, incomplete
provider data or a member of `builders` who is missing or extra blocks the
installation (decision 0150).

```sh
gh api "orgs/<org>" --jq '{login, id, default_repository_permission}'
gh api "orgs/<org>/teams/builders" --jq '{name, slug, id, privacy}'
gh api --paginate "orgs/<org>/teams/builders/members?role=all&per_page=100" \
  --jq '.[].login'
gh api --paginate "orgs/<org>/teams/builders/repos?per_page=100" \
  --jq '.[] | {name, push: .permissions.push}'
gh api --paginate "repos/<org>/infra/collaborators?affiliation=all&per_page=100" \
  --jq '.[] | {login, role_name}'
```

Repeat the last command for every restricted repository. GitHub's list of
collaborators includes Organization Owners and members who have access through
a Team or the base permission, so it shows effective access and does not say
where it comes from. Compare it with each person's Organization role: a person
who is not an Organization Owner must not appear there, apart from the
Organization's Henry's direct Write on `infra` described above.

When a person's Work Environment or computer installs the Organization,
`lazurio organization install <login>` first verifies that person's live role
on GitHub. Module Contributors and Module Maintainers skip the repositories
only for Organization Admins, and a role that cannot be verified stops the
installation (decision 0188).

## Roles

A role name authorizes nothing by itself; the person's live rights on GitHub
decide (decision 0062). Every role names its level, and its English and Czech
names, identifier and the deployed value it maps to are fixed by decision 0234.

| Role | What the role does | On GitHub today |
| --- | --- | --- |
| Organization Owner | Owns the GitHub Organization and appoints and removes the Organization Admins. Gets no access to Environments by that alone (decision 0245). | GitHub's owner role |
| Organization Admin | Administers members, Teams, grants, restricted repositories and branch rules, and the Organization's Environments, devices and AI source. Today an active Organization Owner performs the Organization Admin's administrative acts (approving devices, the AI source, answering requests, application roles), and those acts give that Owner no access to any Environment (decision 0234). For GEN4 it is decided as a role of Lazurio that an Organization Owner appoints in the Organization's Deployment Repo and that Lazurio Auth holds, and there the Organization Owner role never stands in for it for access (decision 0245, not yet deployed). May merge their own pull request where GitHub allows it (decision 0095). | Today GitHub's owner role performs the administrative acts; in GEN4 the role itself will be held by Lazurio Auth |
| Organization Member | Everyone else in the Organization. What they may do follows from their Module and application roles; without a Module role they install nothing and use the applications made available to them (decisions 0060 and 0231). | Membership of the GitHub Organization |
| Module Reader | Reads a Module's source and changes nothing. Gives no application role by itself. | `pull` |
| Module Contributor | Builds the Module and proposes changes, and may merge a young `main` that is still deliberately open. | `push` where the repository can have branch rules |
| Module Maintainer | May also merge the Module's protected `main` and typically releases it. | `maintain`, or `push` where the repository cannot have branch rules (decision 0232) |
| Application Admin, Application User | The two roles in a Module's application. What they may do is the Organization's rule in the Module's code (decision 0231, not yet deployed). | None; Lazurio's module kit will report `appRole: "admin"` or `"user"` |

The Team slugs `builders` and `steward` are identifiers and keep their names;
they no longer name roles. The install option takes `--role module-contributor`,
`--role module-maintainer` and, in GEN4, `--role module-reader`; the former
values `builder`, `steward` and, in GEN4, `reader` work only as deprecated
aliases with a warning.

## Protecting `main` and who merges

Agents deliver every change as a pull request. A merge is a Publication: it
happens only on the user's explicit instruction, through an assignee handover
or under a standing mandate that a decision records, and the user's live GitHub
rights decide what may be merged. Before merging, the agent checks that the
approval belongs to the exact head commit and merges with
`--match-head-commit` (decision 0103). Every pull request has an assignee who
takes it to `main` (decision 0222; its automatic check is not deployed yet).

`main` locks progressively. A young Module's `main` may stay open so that a
Module Contributor can publish; the Organization Admin locks it deliberately
with branch rules when it matters. The Organization Admin also decides who
must approve: in GitHub,
branch protection rules and rulesets are created by people with admin access to
the repository, and requiring a review from code owners needs admin or owner
permissions. Organization Owners have complete administrative access.

Your GitHub plan decides what GitHub enforces. Branch protection rules,
rulesets and code owners work in private repositories only with GitHub Pro,
GitHub Team or GitHub Enterprise; GitHub Free offers them for public
repositories. By default, branch protection does not apply to people with admin
access unless "Do not allow bypassing the above settings" is on. Where GitHub
does not enforce a rule, it is held by process and by the Organization's
`AGENTS.md`. Where the plan offers no GitHub Draft pull requests, as in private
repositories on GitHub Free, agents open a regular pull request and state its
progress in the description (decision 0103).

Our recommendation for a locked `main` on a paid plan:

- require a pull request with at least one approval;
- require a review from the code owners named in `CODEOWNERS`;
- dismiss stale approvals when new commits are pushed, so GitHub itself keeps
  the approval tied to the reviewed changes;
- require conversation resolution and the repository's status checks;
- do not allow bypassing the rules.

Four Lazurio rules depend on this:

- **A Team Environment never merges.** Its pull requests come from
  `lazurio-for-github[bot]` with the label `team:<slug>`, and a named person
  approves and publishes them under their own account (decision 0148). This
  is a working rule on every plan. Branch protection that requires an
  approval and checks does not stop the app: once they are met, its token,
  which may write repository contents, can merge. Only a restriction that
  allows merging to named people or Teams and leaves the app out would
  enforce the rule, and an Organization Admin who relies on one verifies it on
  the repository.
- **The Organization's Henry's own pull requests are approved by a person**:
  an Organization Owner, an Organization Admin or a Module Maintainer, or that
  person's bot under the person's own account. Henry merges only pull
  requests it is assigned to. It runs no infrastructure apply apart from
  deploying an access change under the next rule, issues no Release and
  changes no secrets or billing (decision 0169). On a paid plan branch rules enforce the approval; on a free one it is an
  agreement. GitHub cannot tell a person's bot from the person, so the bot's
  limits (a scope the person recorded, never a Deployment Repo, a signature
  that shows a bot approved) are held by process, not by branch rules.
- **An Organization Owner opens an access change.** Only an Organization
  Owner opens an access change (membership, roles, Teams, people's devices)
  as a pull request in `infra`. The Organization's Henry reviews it as a
  second pair of eyes against Lazurio's principles and, when it holds up, may
  approve it and deploy it after the merge, within the gates that decisions
  0205 and 0245 and the contract of Lazurio Machines set for a deployment,
  including a person's approval where they require one. Who merges such a
  pull request, and how its deployment meets the rule of 0205 that the
  Organization's Henry never approves an apply, decision 0250 does not
  decide; until then 0205 and 0245 hold for the merge and the apply. The
  permission comes from this rule, not from an assignment: an assignment
  alone never authorizes the Organization's Henry to approve an access
  change, and it never opens one itself. Where an Organization has no Henry
  of its own, the integrator's Henry does this until it has one. Any other
  agent only proposes an access change and never approves it itself. In a Free
  Organization an agreement holds this; in a paid one the rules of the
  `infra` repository do, and while their enforcement in paid Organizations is
  still being introduced, the agreement holds there too (decision 0250).
  This rule covers an access change by a pull request in `infra`, that is a
  change of the Organization's boundaries. What decision 0245 leaves to an
  Organization Admin inside those boundaries, for example approving a
  person's device on the fast path once it is deployed, does not go through
  this pull request, and decision 0250 does not change it.
- **A Release is not a Publication.** Only someone whose GitHub rights allow it
  issues a Release, and only on the user's explicit instruction or under a
  standing mandate that a decision records.

Every text an agent writes on GitHub ends with
`Agent: environment <UUID> · T3 thread <UUID>`, or `bot <UUID>` for a bot of
Lazurio MausBot (decision 0218). This is a rule agents follow, not a GitHub
control.

## What Lazurio for GitHub can do

A Team Environment, shared by the members of a Team, works on GitHub through the
Lazurio for GitHub app via the Organization's token broker. People's personal
GitHub accounts are not signed in there, and Lazurio refuses such a sign-in.
On Personal and Work Environments the user signs in to GitHub with their own
account, and agents act with that account's live rights (decision 0165).

The broker's [public source](https://github.com/Lazurio/github-app/blob/56975c96615887520dddc20db60a4b647d4d344d/README.md),
release 0.16.0 of 14 November 2026, issues a short-lived installation token for
one repository at a time. The Team's live grant on that repository chooses the
permissions:

| Team's grant | Token permissions |
| --- | --- |
| Write, Maintain or Admin | `actions: write`, `checks: read`, `contents: write`, `members: read`, `pull_requests: write`, plus `workflows: write` and `issues: write` where the Organization's broker policy declares them |
| Read or Triage | `actions: read`, `checks: read`, `contents: read`, `members: read`, `pull_requests: read`, plus `issues: write` where the policy declares it |

The Organization's broker policy can also cap the tokens of one Team
Environment below its grant: with the `read` ceiling every grant gets the read
set with each permission at `read`, and with the `contents` ceiling (since
0.16.0) a token carries only `contents: write` or `contents: read` and no
Actions, Checks, issue, membership, pull request or workflow permission. A
ceiling never adds a repository.

The token never gets administration or membership changes. The app's private
key exists only in the broker, never on the Environment. GitHub's
documentation adds that an installed app always has at least read-only access
to all public repositories on GitHub.
Lazurio's decision register still lists the Team-bound check of every token as
a target that is not built (decision 0147), while the broker's public source
already implements it; public source is not proof of what a deployment runs, so
ask the operator of your Lazurio deployment which broker release serves your
Organization.

Changing a Team's grant from Organization overview is assigned to a separate
narrow app, Lazurio Administration Access, which uses the acting person's own
one-time token, so GitHub's audit log names that person; neither Lazurio for
GitHub nor the broker can change access (decision 0186). A change that a
Module Maintainer asks for is a request that an Organization Admin approves.

In GEN3, a Module Contributor's computer runs `lazurio organization install <login> --role module-contributor`,
which refuses to clone when Write is missing on the root or on any repository
of the `builders` Team and changes nothing on GitHub (decision 0141).

## Sources

- Lazurio: the [decision register](https://github.com/Lazurio/LazurioPlatform/blob/fe72f68721e3f9968e8e52cee390af106f4e319c/docs/decision-register.md) (decisions 0060, 0062, 0093, 0095, 0103, 0141, 0143, 0147, 0148, 0150, 0165, 0169, 0186, 0188, 0218 and 0222), [decision 0245](https://github.com/Lazurio/LazurioPlatform/blob/25c72bcf6428cdb321d26b8b8d792a526c97c20b/docs/decision-register.md#0245--who-is-who-in-an-organization-its-deployment-repo-holds-the-boundaries-of-trust-and-lazurio-auth-holds-their-use) for the Organization Owner, the Organization Admin and the `infra` repository and, for the names of roles, [decision 0234](https://github.com/Lazurio/LazurioPlatform/blob/7db84856de0181645884f18893aa9579804c20eb/docs/decision-register.md#0234--the-names-of-access-roles-one-vocabulary-for-every-text-screen-and-agent) with 0231 and 0232, the GEN3 [Organization rollout](https://github.com/HumanAndMachines/Lazurio/blob/31028d51893b2f7caa4a723dbe0081b4f17fbada/manual/first-client-organization-rollout.md#L293-L434) and [Organization install](https://github.com/HumanAndMachines/Lazurio/blob/31028d51893b2f7caa4a723dbe0081b4f17fbada/manual/organization-install.md#L131-L275) runbooks (in Czech), the GEN3 Root's [rules for agents](https://github.com/HumanAndMachines/Lazurio/blob/31028d51893b2f7caa4a723dbe0081b4f17fbada/AGENTS.md) (in Czech), the Folder's [access roles](https://github.com/Lazurio/LazurioPlatform/blob/fe72f68721e3f9968e8e52cee390af106f4e319c/src/folder/manual.ts#L1095-L1206) and its [Release rule](https://github.com/Lazurio/LazurioPlatform/blob/8c11468b8f7d90c91ea3a6c618af4b38563c3a56/src/folder/manual.ts#L691-L694), [decision F31](https://github.com/Lazurio/LazurioPlatform/blob/a2927744b5a87113425f93f5e1517ac97b2f6c06/docs/decisions.md#f31--a-team-environment-publishes-under-the-teams-identity), [gh on a Team Environment](https://github.com/Lazurio/LazurioPlatform/blob/a2927744b5a87113425f93f5e1517ac97b2f6c06/docs/environment-tools.md#gh-on-a-team-environment) and the [Lazurio for GitHub broker](https://github.com/Lazurio/github-app/blob/56975c96615887520dddc20db60a4b647d4d344d/README.md).
- GitHub, read on 1 November 2026 and again on 17 November 2026: [roles in an organization](https://docs.github.com/en/organizations/managing-peoples-access-to-your-organization-with-roles/roles-in-an-organization), [base permissions](https://docs.github.com/en/organizations/managing-user-access-to-your-organizations-repositories/managing-repository-roles/setting-base-permissions-for-an-organization), [installing a GitHub App](https://docs.github.com/en/apps/using-github-apps/installing-a-github-app-from-a-third-party), [protected branches](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches), [rulesets](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/about-rulesets), [code owners](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners), [repository collaborators](https://docs.github.com/en/rest/collaborators/collaborators) and [draft pull requests by plan](https://docs.github.com/en/rest/pulls/pulls).
