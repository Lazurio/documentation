---
title: Data access and security
description: A threat-aware explanation of Lazurio's trust boundaries and the checks a real deployment needs.
stableId: lazurio-doc-data-access-security
summary: Review identity, Organization isolation, local files, integrations, secrets, model providers, audit evidence, and residual risks.
updatedAt: "2026-08-26"
reviewedAt: "2026-08-26"
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
controls around the session. The public [collaboration model](https://github.com/HumanAndMachines/Lazurio/blob/69c53ec342124aef48cb9d04fd109f9886ec242e/AGENTS.md)
defines the intended boundary; a concrete deployment still needs verification.

## Trust boundaries

### Principal and task agent

The task agent operates for the signed-in principal. It must not acquire rights
merely because a prompt asks it to. Effective access is supplied by the
principal's device sessions, repository grants and provider credentials. This
means offboarding and access review must include those underlying systems.

### Organization

An Organization is the company-level data and access boundary. Separate
organizations remain separate repositories and GitHub organizations. Public
patterns can move between them; secrets, client data, business strategy and
private overlays cannot.

### Personalspace

Personalspace is private to one principal and is not a shared company data
store. Its privacy boundary has priority over convenience. Company knowledge
needed by colleagues belongs in an authorized Organization store, not in
someone else's private context.

### External applications

The [integration standard](https://github.com/HumanAndMachines/Lazurio/blob/69c53ec342124aef48cb9d04fd109f9886ec242e/manual/external-app-integrations.md)
prefers a locally curated official MCP server, then an official CLI, then a
reviewed and pinned open-source implementation. Browser interaction is a
fallback. Each machine uses a separately revocable login, and the deployment's
catalogue should contain names and required scopes—not secret values.

### Secrets

The [secret custody standard](https://github.com/HumanAndMachines/Lazurio/blob/69c53ec342124aef48cb9d04fd109f9886ec242e/manual/security/local-secret-custody.md)
keeps real credentials out of Git. Local ignored paths are scoped by owner or
Organization, and tracked source contains only schemas, variable names and
instructions. Your endpoint and backup controls must protect the actual local
custody location.

## Threats to test

| Threat | Intended control | Acceptance test |
| --- | --- | --- |
| Prompt requests data from another company | Organization isolation and scoped context | Attempt access with no grant and confirm denial and useful audit evidence. |
| Agent attempts a protected publication | GitHub/provider permissions plus explicit principal approval | Attempt merge/deploy without required permission or review. |
| Credential is copied into source | Ignored custody paths, public-safety scanning and review | Seed a safe canary matching a token pattern and confirm the pipeline fails. |
| Integration has excessive access | Provider-side scopes and separate revocation | Read live OAuth/app grants and revoke one without affecting unrelated access. |
| Local machine is lost | Device controls, encryption, credential revocation and recovery procedure | Run the organization's offboarding or lost-device exercise. |
| Generated explanation drifts from behavior | Exact public source links, review dates and CI validation | Change or expire an evidence reference and confirm the documentation build fails. |

## Model-provider boundary

Lazurio can be used through different execution clients and model providers.
This documentation does not make one universal data-retention or training
claim for all of them. The operator must disclose the selected provider,
account tier, region where relevant, enabled telemetry, retention terms and any
zero-data-retention arrangement. Treat those provider terms as part of the
deployment—not as an inherited property of Lazurio.

## Audit expectations

Git history, pull requests, exact-head approvals and deployment records provide
strong evidence for source changes. They do not automatically cover every
model request, local file read or third-party API call. Build an audit map that
states which system records identity, action, target, result and retention for
each enabled surface.

## Residual risk

An authorized identity can still expose information, approve a harmful change,
or grant a tool too much access. A process boundary can be misapplied. A model
can generate incorrect content. A local endpoint can be compromised. Lazurio's
value is to make these decisions narrower and more inspectable; it does not
remove the need for least privilege, endpoint security, provider review,
testing and human accountability.
