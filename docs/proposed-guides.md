# Suggested documentation additions

These are proposals for subsequent guides, not claims that every deployment already exposes the same account or network model.

## Start and share an Environment

Help a new user choose Personal, Work or Team, understand which accounts colleagues can use, and find the actual entry method. Explain which permissions come from Lazurio, GitHub and the network. Show how to check access and revoke sharing. Publish only against evidence of the implemented admission flow; keep the approved access model separate from older deployments.

## Give an agent a secret safely

Expand the new vault summary into a short lesson: prepare a secret request, open it in Apps → Vault, enter the value there, and confirm availability without echoing it in chat. Show the distinction between the human Organization vault, the Environment vault and Personal Bitwarden. Screenshots must use synthetic data. The F53/F54 contract is the public starting point.

## Recover when Apps will not start

Provide a user-facing path through version/status, Recovery mode, a failed content build and a newer product release. Explain what is preserved and when the operator needs to intervene. Distinguish product repair from reverting an application's source. Use the released recovery and content-sync contracts, with supported deployment examples.

## Check and revoke a connected account

Use a small email/calendar example to show the actual account, available operations and revocation result. Explain shared Composio consumer connections versus developer projects, and which disconnect only removes the local sign-in. Verify the provider's current screen and use test accounts; do not imply that a UI switch restricts all processes on a machine.

## What changed in Lazurio

Add short release notes for readers: the release date, the task that now works differently, a link to its guide and any rollout limit. Use released features as the main list; label approved but unreleased policy separately. Keep per-page dates as the source of freshness rather than updating every page merely because a release shipped.
