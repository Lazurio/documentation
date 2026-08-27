---
title: Data access and security
description: A threat-aware explanation of Lazurio's trust boundaries and the checks a real deployment needs.
stableId: lazurio-doc-data-access-security
summary: Review identity, Organization isolation, local files, integrations, secrets, model providers, audit evidence, and residual risks.
updatedAt: "2026-08-27"
reviewedAt: "2026-08-27"
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

Lazurio's security model starts with a deliberately limited claim: an agent
cannot be made safe by prompt wording alone. Security comes from the identity,
machine, repository permissions, scoped tools, secret custody and publication
controls around the session. Lazurio does not add a universal sandbox around
the selected execution client. The [English evidence summary](/en/public-evidence/)
maps these claims to the exact public source; a concrete deployment still needs
verification.

## Trust boundaries

### Principal and task agent

The task agent operates for the signed-in principal. It must not acquire rights
merely because a prompt asks it to. Effective access is supplied by the
principal's device sessions, repository grants and provider credentials. This
means offboarding and access review must include those underlying systems.
If a client process can read a credential or file, policy language does not
remove that capability.

### Machine

One machine is one Lazurio trust domain. Multiple Organizations may be mounted
on it, but folders and repository boundaries do not provide kernel, account or
cryptographic isolation from another process with the same effective OS
access. A compromised endpoint or over-broad agent workspace can therefore
become a cross-Organization incident. Use separate machines or equivalent
infrastructure where the risk model requires a hard isolation boundary.

### Organization

An Organization is the company-level data and access boundary. Separate
organizations remain separate repositories and GitHub organizations. Public
patterns can move between them; secrets, client data, business strategy and
private overlays cannot. On a shared machine, this is enforced by repository
grants, workspace selection, client sandboxing where available and process
discipline—not by Lazurio creating another OS boundary.

### Personalspace

Personalspace is private to one principal and is not a shared company data
store. Its privacy boundary has priority over convenience. Company knowledge
needed by colleagues belongs in an authorized Organization store, not in
someone else's private context.

### External applications

The [integration standard](https://github.com/HumanAndMachines/Lazurio/blob/2bc6784226ffc629df2ecf16dbd0693994c3a970/manual/external-app-integrations.md)
prefers a locally curated official MCP server, then an official CLI, then a
reviewed and pinned open-source implementation. Browser interaction is a
fallback. MCP approval modes do not automatically constrain a CLI or arbitrary
shell command. Each machine uses a separately revocable login, and the
deployment catalogue should contain names and required scopes—not secret
values.

### Secrets

The [secret custody standard](https://github.com/HumanAndMachines/Lazurio/blob/2bc6784226ffc629df2ecf16dbd0693994c3a970/manual/security/local-secret-custody.md)
keeps real credentials out of Git. Local ignored paths are scoped by owner or
Organization, and tracked source contains only schemas, variable names and
instructions. Your endpoint and backup controls must protect the actual local
custody location.

## Threats to test

| Threat | Intended control | Acceptance test |
| --- | --- | --- |
| Prompt requests data from another company | GitHub denial for repositories without a grant; workspace selection and client sandbox/process rules for local paths | Confirm GitHub-side denial with an identity that lacks the grant. Separately test the chosen client's local filesystem boundary; do not claim a local audit event unless a named endpoint/client control records it. |
| Agent attempts a protected publication | GitHub/provider permissions plus explicit principal approval | Attempt merge/deploy without required permission or review. |
| Credential is copied into source | Ignored custody paths, public-safety scanning and review | Seed a safe canary matching a token pattern and confirm the pipeline fails. |
| Integration has excessive access | Provider-side scopes and separate revocation | Read live OAuth/app grants and revoke one without affecting unrelated access. |
| Local machine is lost | Device controls, encryption, credential revocation and recovery procedure | Run the organization's offboarding or lost-device exercise. |
| Prompt or retrieved content manipulates the agent | Scoped context, untrusted-input handling, review and least-privilege tools | Seed a harmless prompt-injection canary and confirm the agent neither expands scope nor publishes without the relevant provider gate. |
| Generated explanation drifts from behavior | Exact public source links, review dates and CI validation | Change or expire an evidence reference and confirm the documentation build fails. |

## Model-provider boundary

Lazurio can be used through agent clients such as Codex, Cursor, Claude Code or
another client approved by the operator. These clients and their model
providers—not Lazurio—carry the model request. Selected files, prompts and tool
results may leave the machine under their terms. This documentation therefore
makes no universal retention or training claim. The operator must disclose the
exact client, model provider, account tier, authentication, enabled telemetry,
region where relevant, retention terms and any zero-data-retention
arrangement.

## Optional hosted surfaces

The broader architecture also defines optional or separately deployed
surfaces: Lazurio Dashboard, hosted team workspaces, and a per-owner
Resident/Buddy service that may use communication or memory stores. They are
not enabled by every source-checkout installation and are not hidden inside
the local root. If any is enabled, add it to the deployment data-flow, processor
inventory, network policy, logging, retention, backup, deletion and incident
review.

## Audit expectations

Git history, pull requests, exact-head approvals and deployment records provide
strong evidence for source changes. They do not automatically cover every
model request, local file read or third-party API call. Build an audit map that
states which system records identity, action, target, result and retention for
each enabled surface. A missing log must be recorded as missing; policy text is
not audit evidence.

## Residual risk

An authorized identity can still expose information, approve a harmful change,
or grant a tool too much access. A process boundary can be misapplied. A model
can follow prompt injection or generate incorrect content. A local endpoint can
be compromised, exposing more than one mounted Organization. A draft branch,
provider draft or model request can already move data before final publication.
Lazurio's value is to make these decisions narrower and more inspectable; it
does not remove the need for least privilege, endpoint isolation, provider
review, testing and human accountability.
