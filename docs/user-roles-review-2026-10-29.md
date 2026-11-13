# User and agent terminology review — 29 October 2026

The public documentation still used the retired term as the active role name,
including definitions that allowed an AI identity to be the user. Platform
F30 and its 20–21 October addenda name the person agents work with and for the
user. The public source was read at revision
`4681f49720fa7a6a7ceaac6ec07f8bd05d4e2193`.

This editorial pass replaces that vocabulary in both authored locales and
three SVGs. The cooperation page explains the user, Buddy and the task agent,
and that the bare word user names no access role. Technical source URL anchors
retain their exact names.

## Rebase onto main — 13 November 2026

The branch was rebased onto `main` after the glossary, the role names of
decision 0234 and the date rules had changed there.

- **Glossary.** Taken from `main`, which already defines the user, the
  Colleague as a user in an Organization and the access roles by level. The
  earlier proposal of an "Organization User" entry was dropped because
  decision 0234 retires that role name. The user entry now also says that
  agents act within the user's live rights and the task they were given. The
  entry that maps the older term to "user" stays, like the entries for AI
  Colleague and Guardian: pages still link pinned older sources that use it,
  and decision 0175 does not rename verbatim quotations or historical records.
  Rendered prose and SVG copy otherwise use only "user".
- **Cooperation page.** The user paragraph names roles by level (Organization
  Admin, Module Contributor, Application User) instead of the retired Builder,
  Steward and User. The introduction says which terms follow the current
  vocabulary and which still describe the older source model.
- **Buddy.** The statement that Buddy acts within the user's rights and
  mandates cites decision 0089 in the decision register already in the
  evidence map, because F30 does not state it.
- **Data-flow diagram.** The boundary is labelled and described as the user's
  machine, one trust domain, not as an Environment. The deployment page and
  the IT briefing treat the machine as the shared trust domain, and the
  glossary separates the user's computer from hosted Environments. Both pages
  now give the image an alt text that says this.
- **Dates.** Under the date rule now on `main`, this terminology change moves
  only `updatedAt`. Each page keeps the `reviewedAt` it has on `main`; no new
  fact review, provider verification or security audit is claimed.
- **Overlap with PR #48.** #48 is still open. Both PRs change the same lines
  on the cooperation, IT, deployment, data, Copilot comparison, evidence and
  use-case pages in both locales. They agree on "user"; #48 also adds notes
  that older sources say Principal. With this PR the glossary holds that one
  mapping, so whichever PR merges second can keep #48's v0.1.14 content and
  point to the glossary instead of repeating the older term in prose.

Publication and release prerequisites still apply.
