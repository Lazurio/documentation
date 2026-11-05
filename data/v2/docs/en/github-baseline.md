---
title: "GitHub baseline for a new Organization"
description: "What a GitHub Organization needs before Lazurio works in it: roles and Teams, the Lazurio for GitHub app, repository access, protection of main and who merges."
stableId: lazurio-doc-github-baseline
locale: en
summary: "The GitHub settings an Owner prepares and reads back before the first Builder: the app, base permission none, the builders Team, Admin-only infra, protected main and merging."
updatedAt: "2026-11-05"
reviewedAt: "2026-11-05"
reviewOwner: Matej Suchanek
secondReviewOwner: Pablo AI
trustCritical: true
sourceRefs:
  - lazurio-decision-register-gen4
  - lazurio-decision-register-admin-ai
  - lazurio-first-organization-rollout
  - lazurio-organization-install
  - lazurio-root-agent-rules
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
the first Builder installs Lazurio for a new Organization, an Owner of the
GitHub Organization sets up the baseline below and reads it back against the
Organization's manifest (decision 0150).

People enter Environments with a Lazurio account and need no GitHub account for
that. GitHub still decides what can be done with the repositories and what may
be published, and for accounts linked to GitHub, live membership of the GitHub
Organization mirrors membership of the Lazurio Organization. This entry model
is Lazurio's target under decision 0192; the transition is not complete.

## The baseline

| Item | Required state | What enforces it |
| --- | --- | --- |
| GitHub Organization | One per Lazurio Organization. Today its active Owners are the Organization's Admins. As the target, its Owners appoint the Admins as a role of Lazurio (decision 0228, not yet deployed). | Today GitHub's Owner role; the target Admin role will be held by Lazurio Auth (decision 0228, not yet deployed) |
| Root repository | The Organization's root repository on `main`, by convention `<login>/<login>_GEN3`, with the manifest `lazurio.organization.json`. | Lazurio reads it; GitHub controls access |
| Lazurio for GitHub | An Organization Owner installs the app with access to **All repositories**. "Only select repositories" is a supported exception; it must include the root and every repository Lazurio serves, and it is never presented as the full Organization. | GitHub installation scope |
| Base repository permission | `none` (API `default_repository_permission`). Membership alone opens no private repository. | GitHub |
| Team `builders` | Exactly one Team holds the Builder role. Its complete roster equals the approved Builders, and each is an active member, not a pending invitation. | GitHub membership |
| Grants of `builders` | Explicit Write (API `push`) on the root and on every active repository that is not restricted. A new repository gets this grant in the same step that creates or activates it. | GitHub grants |
| Restricted repositories | No grant for `builders` or for Builders who are not Admins on `infra` or on any repository the manifest declares `default_access: restricted` or `private`. | GitHub grants |
| Design Systems | Every active member, including the accounts of Environments with automations, has at least Read on the Organization's Design Systems. | Process: the Admin checks it |

GitHub cannot express "every current and future repository except `infra`",
so each new regular repository needs its own grant for `builders`. Whether a
repository is restricted follows only from its declaration in the manifest,
never from its name or path (decision 0143). Owners reach restricted
repositories through their Owner role; Lazurio records that as an owner-role
exception, never as a Builder grant. Changing members, Teams, grants or app
installations is a write to GitHub that needs the user's explicit instruction;
an agent prepares it and reads it back.

An Organization that runs automated work in an Environment with automations
(Henry) adds its persona: a machine user account with two-factor
authentication, a member and never an Owner, different in every Organization.
It works through a Team `steward` with Maintain on all repositories except
`infra`. On `infra` it may get only a direct Write, never through a Team and
never Admin, as the named reviewer of infra pull requests once the Organization
switches its review policy to it (decisions 0169 and 0093).

## Read it back before the first Builder

The Owner compares the live state with the manifest's active repositories, not
with a hand-kept list. An `unknown` status, incomplete provider data or a
Builder who is missing or extra blocks the installation (decision 0150).

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
where it comes from. Compare it with each person's Organization role: a member
who is not an Owner must not appear there, apart from the persona's direct
Write on `infra` described above.

When a person's Work Environment or computer installs the Organization,
`lazurio organization install <login>` first verifies that person's live role
on GitHub. Builders and Stewards skip the Admin-only repositories, and a role
that cannot be verified stops the installation (decision 0188).

## Roles

A role name authorizes nothing by itself; the person's live rights on GitHub
decide (decision 0062).

| Role | What the role does |
| --- | --- |
| Organization Admin | A role of Lazurio that an Owner of the GitHub Organization appoints (decision 0228, not yet deployed); until it is deployed, an active Owner of the GitHub Organization is the Admin. Administers members, Teams, grants, restricted repositories, app installations and branch rules, and the Organization's Environments, devices and AI source. May merge their own pull request where GitHub allows it (decision 0095). |
| Steward | The review seat. Merges a locked `main` where the branch rules allow it and typically issues a Release. |
| Builder | Develops Modules with Write on the active Builder repositories and may merge a young `main` that is still deliberately open. |
| User | Uses the Organization's production applications and installs nothing (decision 0060). |

## Protecting `main` and who merges

Agents deliver every change as a pull request. A merge is a Publication: it
happens only on the user's explicit instruction, through an assignee handover
or under a standing mandate that a decision records, and the user's live GitHub
rights decide what may be merged. Before merging, the agent checks that the
approval belongs to the exact head commit and merges with
`--match-head-commit` (decision 0103). Every pull request has an assignee who
takes it to `main` (decision 0222; its automatic check is not deployed yet).

`main` locks progressively. A young Module's `main` may stay open so that a
Builder can publish; the Organization's Admin locks it deliberately with branch
rules when it matters. The Admin also decides who must approve: in GitHub,
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
  the approval tied to the reviewed head;
- require conversation resolution and the repository's status checks;
- do not allow bypassing the rules.

Three Lazurio rules depend on this:

- **A Team Environment never merges.** Its pull requests come from
  `lazurio-for-github[bot]` with the label `team:<slug>`, and a named person
  approves and publishes them under their own account (decision 0148). This
  is a working rule on every plan. Branch protection that requires an
  approval and checks does not stop the app: once they are met, its token,
  which may write repository contents, can merge. Only a restriction that
  allows merging to named people or Teams and leaves the app out would
  enforce the rule, and an Admin who relies on one verifies it on the
  repository.
- **The persona's own pull requests are approved by a person**: an Owner, Admin
  or Steward. The persona merges only pull requests it is assigned to, never
  runs an infrastructure apply, issues no Release and changes no access,
  secrets or billing (decision 0169). On a paid plan branch rules enforce the
  approval; on a free one it is an agreement.
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

The broker's [public source](https://github.com/Lazurio/github-app/blob/751eef11a285dea625c1d3fd4e286e396c5ab1d9/README.md),
release 0.14.0 of 21 October 2026, issues a short-lived installation token for
one repository at a time. The Team's live grant on that repository chooses the
permissions:

| Team's grant | Token permissions |
| --- | --- |
| Write, Maintain or Admin | `actions: write`, `checks: read`, `contents: write`, `members: read`, `pull_requests: write`, plus `workflows: write` and `issues: write` where the Organization's broker policy declares them |
| Read or Triage | `actions: read`, `checks: read`, `contents: read`, `members: read`, `pull_requests: read`, plus `issues: write` where the policy declares it |

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
GitHub nor the broker can change access (decision 0186). A Steward's change is
a request that an Admin approves.

In GEN3, a Builder's computer runs `lazurio organization install <login> --role builder`,
which refuses to clone when Write is missing on the root or any Builder
repository and changes nothing on GitHub (decision 0141).

## Sources

- Lazurio: the [decision register](https://github.com/Lazurio/LazurioPlatform/blob/4d5ee62a963a0ae2fc98287f0072e739ff6d2cd8/docs/decision-register.md) (decisions 0060, 0062, 0093, 0095, 0103, 0141, 0143, 0147, 0148, 0150, 0165, 0169, 0186, 0188, 0192, 0218 and 0222), the GEN3 [Organization rollout](https://github.com/HumanAndMachines/Lazurio/blob/66e437f7e563574ea35b79dd1bdd193fd0f6b4b6/manual/first-client-organization-rollout.md) and [Organization install](https://github.com/HumanAndMachines/Lazurio/blob/66e437f7e563574ea35b79dd1bdd193fd0f6b4b6/manual/organization-install.md) runbooks (in Czech), the [rules for agents](https://github.com/HumanAndMachines/Lazurio/blob/66e437f7e563574ea35b79dd1bdd193fd0f6b4b6/AGENTS.md) (in Czech), the Folder's [role descriptions](https://github.com/Lazurio/LazurioPlatform/blob/a2927744b5a87113425f93f5e1517ac97b2f6c06/src/folder/manual.ts#L888-L904), [decision F31](https://github.com/Lazurio/LazurioPlatform/blob/a2927744b5a87113425f93f5e1517ac97b2f6c06/docs/decisions.md#f31--a-team-environment-publishes-under-the-teams-identity), [gh on a Team Environment](https://github.com/Lazurio/LazurioPlatform/blob/a2927744b5a87113425f93f5e1517ac97b2f6c06/docs/environment-tools.md#gh-on-a-team-environment) and the [Lazurio for GitHub broker](https://github.com/Lazurio/github-app/blob/751eef11a285dea625c1d3fd4e286e396c5ab1d9/README.md).
- GitHub, read on 1 November 2026: [roles in an organization](https://docs.github.com/en/organizations/managing-peoples-access-to-your-organization-with-roles/roles-in-an-organization), [base permissions](https://docs.github.com/en/organizations/managing-user-access-to-your-organizations-repositories/managing-repository-roles/setting-base-permissions-for-an-organization), [installing a GitHub App](https://docs.github.com/en/apps/using-github-apps/installing-a-github-app-from-a-third-party), [protected branches](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches), [rulesets](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/about-rulesets), [code owners](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners), [repository collaborators](https://docs.github.com/en/rest/collaborators/collaborators) and [draft pull requests by plan](https://docs.github.com/en/rest/pulls/pulls).
