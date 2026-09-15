---
title: Data access and security
description: Which data agents can access and what to test before deployment.
stableId: lazurio-doc-data-access-security
locale: en
summary: Review identity, Organization isolation, local files, integrations, secrets, model providers, audit evidence, and residual risks.
updatedAt: "2026-09-15"
reviewedAt: "2026-09-15"
reviewOwner: Matej Suchanek
secondReviewOwner: Pablo AI
trustCritical: true
sourceRefs:
  - lazurio-architecture
  - lazurio-collaboration-model
  - lazurio-external-apps
  - lazurio-secret-custody
audience:
  - it-admin
  - decision-maker
  - agent
---

Before deployment, check which account the agent uses, which files and
services it can access, and who approves its results. Chat instructions alone
do not restrict access. Technical protection comes from OS, repository and
service permissions, plus any sandbox provided by the AI tool. Lazurio does
not add a universal sandbox of its own.

## Boundary map

A trust boundary limits how far access or a compromised process can reach.
Separate folders organize work, but do not by themselves stop a program with
the same permissions from reading their contents.

### Identity and session

A task agent works for the signed-in principal and owns no separate rights. A
prompt creates no repository or provider grant. At the same time, policy text
cannot remove a capability already available to the process: a readable file,
active session or exposed credential may be usable by the client.

### Machine and Organization

An Organization is one company's GitHub and repository boundary. Company data,
secrets and strategy must not cross into another Organization. One machine,
however, is one trust domain. Directory and repository boundaries are not
kernel or cryptographic isolation from another process with the same OS access.
Use separate machines or equivalent infrastructure when a compromise must not
cross company boundaries.

### Personalspace

Personalspace is private to one principal, not a shared company store. Company
knowledge needed by colleagues belongs in an authorized Organization source of
truth rather than another person's private context.

### External tools and secrets

The [integration standard](https://github.com/HumanAndMachines/Lazurio/blob/3c5bda5d54c5556a0e54f3c339d988aa911fda60/manual/external-app-integrations.md)
prefers an official machine-local MCP server, then an official CLI, then a
reviewed pinned implementation, with browser interaction as fallback. New
ChatGPT or claude.ai connectors and shared hosted brokers sit outside that
per-machine custody model. A provider-operated remote MCP can fit when its
configuration and token remain separately revocable for the machine.

A workflow that needs writes may require read-and-write provider scopes. That
grant is a real capability; calling the output a Draft does not stop data from
reaching the provider. Real credentials stay outside Git in scoped ignored
paths or approved provider stores. Endpoint, backup, rotation and incident
controls must protect the actual custody location.

## Threats to test

| Threat | Acceptance test |
| --- | --- |
| Access to another company | Confirm GitHub denial for an identity without the grant, then separately test the chosen client's local filesystem boundary. |
| Unapproved publication | Attempt a protected merge or deployment without the required permission, check or review. |
| Credential copied into source | Read back the scanning actually enabled and run an approved safe-canary exercise in a test repository. |
| Over-broad integration | Inspect live scopes and revoke one credential without affecting unrelated access. |
| Prompt injection | Seed a harmless canary and confirm the agent neither expands scope nor publishes without the relevant gate. |
| Lost endpoint | Exercise device lockout, credential revocation, recovery and offboarding. |
| Documentation drift | Expire or change a source reference in a test branch and confirm validation fails. |

The documentation repository's own checks include a narrow denylist for known
private markers and local-path patterns. They are not general secret scanning,
SAST or DLP for every Organization. Record the live controls rather than
promoting one repository's test into a product-wide claim.

## Model and hosted-service boundaries

The agent client and model provider—not Lazurio—carry selected prompts, files
and tool results. The operator must name the client, provider, account tier,
authentication, telemetry, retention and region where relevant. This site
makes no universal training or retention claim across providers.

Dashboard, hosted team workspaces and per-owner Resident/Buddy services are
optional or separately deployed. If enabled, each needs its own operator,
identity, storage, network path, processor list, logs, retention, backup,
deletion and incident controls. Source code being present does not prove that a
service is active.

## Audit and residual risk

Git records file changes, pull requests and approvals. Deployment records
show which version went live. These records do not automatically cover local
file reads, model requests or external API calls.

For each type of action, identify where the account, target and result are
logged and how long the record is kept. Note any missing logs in the deployment
review.

An authorized identity can still expose data or approve a harmful change. A
model can follow malicious content. A machine can be compromised, and a Draft
branch or provider draft may already move data before final publication.
Lazurio narrows and exposes these decisions; it does not replace least
privilege, endpoint security, provider review, testing or accountability. See
the [security and control evidence](/en/public-evidence/) for the exact public-source
basis of these claims.
