---
title: "Servers and the Conglomerate Host"
description: "Conventions for an Organization that runs its own servers: names, the tailnet's address range, how Organization Owners administer the Conglomerate Host, and when a Remote Environment and its user are ready."
stableId: lazurio-doc-servers-conglomerate-host
locale: en
summary: "Server and services names, one IPv4 prefix per Conglomerate Host, the Organization Owner's administration path with named identities, exact grants and a recovery route, and the two separate outcomes of handing over a Remote Environment."
updatedAt: "2026-11-14"
reviewedAt: "2026-11-02"
reviewOwner: Matej Suchanek
secondReviewOwner: Pablo AI
trustCritical: true
sourceRefs:
  - lazurio-decision-register-access-0245-0247
  - lazurio-root-operator-machine-access
  - lazurio-root-conglomerate-owner-administration
  - lazurio-root-hosted-machine-handover
  - lazurio-decision-register-gen4
  - lazurio-decision-register-admin-ai
  - lazurio-decision-0234-role-names
audience:
  - it-admin
  - agent
---

This page is for the Organization Owners, Organization Admins and IT of an Organization that runs its own servers for Lazurio. A **Conglomerate Host** is the server that runs the private network (Headscale) and the vault (Vaultwarden) for the Remote Environments of one or more Organizations.

Where a rule below is a convention, nothing checks it: it grants nothing, and existing servers are not renamed or renumbered for it.

## Names

- **Virtualization host:** `<org>-proxmox-NN`, for example `example-proxmox-01`. `<org>` is a short label the Organization Owner chooses once. It does not change when the Organization's GitHub login or DNS name changes, so whoever administers several Organizations can tell their hosts apart in the provider's console, in SSH and in the tailnet. Numbering starts at `01` and may grow past two digits. This is a convention.
- **Services Environment:** each server of an Organization has exactly one `services-NN`, numbered after its server (`<org>-proxmox-01` has `services-01`). It is a Work Environment for Organization Admins only (decision 0245, not yet deployed), and each service runs in its own container. When it runs short of capacity it grows; a second one on the same server is not created (decision 0209).
- **People's devices in the tailnet:** `<login>-<device>`, for example `<login>-macbook`. `<login>` is the label of the person's network user: for an account linked to GitHub, their GitHub login in lowercase, frozen, so a later rename on GitHub does not rename the network user. `<device>` is a short label chosen once and used in every tailnet. A second, headless client on the same device is `<login>-<device>-cli`, and a person's hosted Personal Environment is `<login>-personal-vm`. The owner sets the name on the device itself. The name grants nothing.

## The tailnet's address range

- Every Conglomerate Host gets its own range inside `100.64.0.0/10` that overlaps no other Conglomerate the same operator uses (the GEN3 manual on access between one person's Environments, under Sources). Otherwise every tailnet hands out the same `100.64.0.x` addresses, and the computer of whoever administers them cannot tell them apart.
- The operator that founds Conglomerates keeps the list of ranges it has assigned, as an aid for itself. The list is not a central authority or a registry of other operators' networks.
- A new Conglomerate Host must declare its range when it is created. An existing one keeps its range until a managed migration renumbers it.

## Administering the Conglomerate Host

Administering the host affects every Organization it serves. The rules below are a standard: by itself it grants nothing and does not prove that an Organization has deployed it. The concrete accounts, devices, keys, network bindings and evidence belong in the infrastructure repository of the Organization that owns the host. These rules hold for every Organization Owner who administers it:

- **Own path, own keys, named sources.** The host is administered by its holder, never through the Organization Admin role (decision 0245, the target model; the transition is not complete). Where an Organization runs the host on its own infrastructure, as this page assumes, the holder is each live Organization Owner of the Organization that owns the host; where Lazurio runs the servers, the holder is Lazurio's operator. After an approved onboarding, the holder administers the host only from sources specifically approved for it:
  - their own personal computer, explicitly allowed for administration;
  - their Personal Environment.

  An Organization Admin's Work Environment, the administrative station, leads into the Organization's Environments and never into administration of the host or of the servers under the Environments (decision 0247). The Organization Owner role by itself gives no entry into any Environment and never stands in for the Organization Admin role.

  A phone, a Work Environment and a work laptop get no administration, even when they are approved for other access. The Organization Owner uses their own named identity over the private network and native SSH, and their keys can be revoked one by one. The path never depends on another Organization Owner's or a vendor's IP address, computer, sign-in or private key, and the private key stays on its device.
- **Only GitHub proves the role.** Membership in the tailnet, a shared network user, an Environment tag or a server name is no proof of the Organization Owner role. The live GitHub role and the exact binding of the source to that Organization Owner decide, and access is never given to all of the Organization's nodes at once.
- **Exact grants only.** The host has named SSH accounts, exact network grants and only the administrative rights the work needs. A reply on an established connection is no right to open the opposite one. A new IP address or a re-enrollment is fixed by a reviewed change of the exact binding, never by a broader grant.
- **Onboarding ends with a change, not with a login.** A working SSH login alone does not finish an Organization Owner's onboarding. Under their own account, the Organization Owner can:
  - read the network's state and the configuration they need;
  - reach the Organization's infrastructure repository;
  - propose, validate and apply an authorized change through the normal deployment process with their own access;
  - explain publication, review and recovery, with a recovery path of their own.
- **Administrator rights do not bypass the process.** The desired state stays in the infrastructure repository, and every change goes through review and the deployment process, for an Organization Owner as for an agent. An independent check may need another authorized Colleague, but never a secret that only a vendor holds.
- **Revocation is a step of its own.** When an Organization Owner leaves, changes role or loses a device, revoke their grants and keys and, where possible, end live sessions. Record whether that happened automatically or by hand. The role is checked when access is deployed, not at every SSH login.
- **A shared host has many tenants.** Being an Organization Owner of one Organization gives no automatic right to administer another Organization's host: the approval follows the host's ownership and its whole shared boundary. Administration never grants reading anyone's Personalspace.
- **Remote control reaches further than the network.** Full control of a person's computer from a Work Environment can lend that computer's administrative access indirectly, and a network rule against the direct path does not stop it. Keep the scope of remote control deliberate and documented, and do not promise strict isolation.
- **The private network first, the provider's rescue for emergencies.** Administration goes over the private network. The provider's console and rescue mode are the emergency route. Before you close a public SSH fallback, prove that the private entry works, that the provider's recovery rights work, the host's identity and the way back to a normal boot. Rescue can interrupt shared services, so bring every emergency change back into the infrastructure repository and its records.
- **Deployed means proven.** The infrastructure repository of the Organization that owns the host records the allowed sources and their binding to current Organization Owners. It also records the deployed version, the deployment evidence and both kinds of test: a real SSH and administrator login from every allowed source, and a refused connection from a source that is not allowed. A standard, a plan, an open pull request and a live deployment are four different states.

## Two outcomes of handing over a Remote Environment

This is the target contract for handing over a Remote Environment, and its implementation is not finished yet: a running Environment can still differ from it. What is deployed, its evidence and the order of fixes belong in the infrastructure repository of the Environment's owner. Handing over has two results, and each is proven separately.

**The Remote Environment is ready for handover** when:

- its resources, operating system, identity, administration, network and isolation are verified;
- its web entry has a valid certificate, correct DNS and a working gateway;
- a clean Lazurio and the basic work entry run without an Organization checkout, without a personal GitHub token and without the user's sign-in to AI tools;
- Lazurio shows a truthful empty state, and a missing checkout causes no crash, no automatic clone and no access to another Organization;
- a repeated installation keeps the identity and existing work data;
- backup and restore have their own verified result. Where a pilot explicitly postpones it, the report names that limit and does not call restore verified.

**The user is ready to work** in an individual Environment, which has one assigned user, when they have:

- entered from their own device and signed in to GitHub (`gh`) with their own account;
- chosen and set up the Organizations they need from those they can access, each as a separate checkout and access boundary;
- found their checkouts without a change of the hosting configuration, with modules still inside their Organization's boundary and live rights;
- set up their own tools, sign-ins and project dependencies;
- verified real work. A successful web sign-in proves neither SSH, Git access, every module nor an application's restore.

**A shared Team Environment** has no personal user, so the rule of an individual Environment, where the user signs in their own account and connects any of their Organizations, does not apply to it. It works on GitHub through the Organization's Lazurio for GitHub app with a limited Organization and Team scope, never with the personal token of whoever signed in last (decision 0147). Installing Lazurio needs no checkout of the Organization's data there either, and setting up the Team's content is a separate step under the Team's identity.

Waiting for a person's sign-in is `onboarding pending`, not a provisioning failure; the name describes the state and is not a value in any system. A report never merges the infrastructure, the base Lazurio and the user's acceptance into one green field.

## Sources

- Lazurio: the [decision register](https://github.com/Lazurio/LazurioPlatform/blob/4d5ee62a963a0ae2fc98287f0072e739ff6d2cd8/docs/decision-register.md) (decisions 0147 and 0209; [decision 0245](https://github.com/Lazurio/LazurioPlatform/blob/25c72bcf6428cdb321d26b8b8d792a526c97c20b/docs/decision-register.md#0245--who-is-who-in-an-organization-its-deployment-repo-holds-the-boundaries-of-trust-and-lazurio-auth-holds-their-use) for the Organization Admin and the holder of the host, [decision 0247](https://github.com/Lazurio/LazurioPlatform/blob/25c72bcf6428cdb321d26b8b8d792a526c97c20b/docs/decision-register.md#0247--entry-into-an-environment-and-its-record-normal-service-and-break-glass-entries-and-what-is-not-guaranteed) for the administrative station, and [decision 0234](https://github.com/Lazurio/LazurioPlatform/blob/753cca123df45721c3c1395a16a3a0df9a04dbcd/docs/decision-register.md#0234--the-names-of-access-roles-one-vocabulary-for-every-text-screen-and-agent) for the names of roles) and three GEN3 manuals, in Czech: [access between one person's Environments](https://github.com/HumanAndMachines/Lazurio/blob/621d657a593fdca8b6c462ebe7fbec9d5d70a677/manual/operator-machine-access.md), the full text of decision 0155 with the names, the services Environment and the IPv4 ranges; [administration of a Conglomerate Host by the Organization's Owners](https://github.com/HumanAndMachines/Lazurio/blob/621d657a593fdca8b6c462ebe7fbec9d5d70a677/manual/conglomerate-owner-administration.md); and [handover of a hosted Environment and the user's onboarding](https://github.com/HumanAndMachines/Lazurio/blob/621d657a593fdca8b6c462ebe7fbec9d5d70a677/manual/hosted-machine-handover.md) with the two separate outcomes.
