---
title: Example Organization
description: A public-safe Lazurio Organization from provider identity and manifests to Workspace Modules and Launchpad.
stableId: lazurio-doc-example-organization
summary: Inspect the canonical Example Organization identity, generated root files, repository layout, Module discovery and safe lifecycle commands.
updatedAt: "2026-08-29"
reviewedAt: "2026-08-29"
reviewOwner: Matej Suchanek
sourceRefs:
  - lazurio-example-fixture
  - lazurio-organization-schema
  - lazurio-map
  - lazurio-launchpad
  - lazurio-module-lifecycle
audience:
  - builder
  - agent
  - it-admin
---

The public source tests one canonical, synthetic Organization identity:

| Field | Value |
| --- | --- |
| GitHub Organization login | `ExampleOrganization` |
| Lazurio slug | `lazurio-example-organization` |
| Display name | Lazurio Example Organization |
| Root repository | `ExampleOrganization/ExampleOrganization_GEN3` |
| Local mount shape | `organizations/<organization-checkout>` |

These identifiers contain no customer data. They are used by the Organization
installer tests and are safe for documentation, demos and agent evaluation.

## 1. The generated Organization root

Activation creates an Organization shell, not a collection of pretend apps:

```text
organizations/<organization-checkout>/
├── AGENTS.md
├── README.md
├── company.gen3.json
├── modules.manifest.json
├── TODO.tasks.json
├── DONE.tasks.json
├── ISSUES.open.json
├── company/
│   └── colleagues/
├── manual/
├── workspace/
│   └── README.md
└── productionspace/
    └── README.md
```

The root is one Git repository. Repositories mounted below `workspace/` or
`productionspace/` remain separate checkouts and must not become Git
submodules or gitlinks in the root repository.

## 2. What the manifests own

`company.gen3.json` is the current compatibility projection of the
Organization identity and governance. The canonical v1 schema models the same
Organization with immutable GitHub bindings, a Module manifest pointer and an
explicit compatibility hash.

The generated example records:

```json
{
  "organization_generation": "gen3",
  "organization_kind": "organization",
  "company": {
    "slug": "lazurio-example-organization",
    "display_name": "Lazurio Example Organization",
    "github_org": "ExampleOrganization",
    "root_repository": "ExampleOrganization/ExampleOrganization_GEN3"
  },
  "governance": {
    "default_branch": "main",
    "access_authority": "github"
  }
}
```

`modules.manifest.json` declares repository slots and Team membership. The
fresh fixture intentionally starts with an empty `module_slots` array.
Activation does not invent Modules or reserve application ports.

## 3. Add real Modules as separate repositories

A useful demonstration Organization can then mount independently owned
repositories:

```text
workspace/
├── website/          # public product website Module
├── knowledgebase/    # Organization knowledge application Module
└── mission-control/  # Organization planning application Module

productionspace/
└── documentation/    # public documentation with its own release contract
```

Each Workspace Module owns its own `lazurio.module.json` and any runnable
`lazurio.runtime.v1` declaration. The Organization manifest says where the
repository belongs and which Teams it serves. The Module contract says how its
application runs. GitHub grants decide who can read or change it.

## 4. See the Organization in Launchpad

![Launchpad showing the synthetic Lazurio Example Organization](/images/launchpad-example-organization.jpg)

The screenshot is rendered from synthetic public-safe data against the real
Launchpad UI. It demonstrates the product surface, not access to a real
company.

After a valid Organization root and Module manifests are mounted, select
**Synchronize** or restart Launchpad. Discovery scans the manifest-backed
mounts; `launchpad.gen3.json` is not an Organization allowlist.

## 5. Inspect and open a Module

With the Launchpad Server running:

```sh
lazurio module status --json
lazurio module status ExampleOrganization/website --json
lazurio module open ExampleOrganization/website --json
```

If a Module exposes more than one App, pass the exact declared package path.
The CLI never guesses the first App. If another Organization owns the same
listener lease, takeover requires explicit confirmation naming the exact App
that would be replaced.

## 6. Follow the boundaries

- Put shared Organization work in the Organization root or a declared Module.
- Put durable Organization knowledge in its Knowledgebase, not this public
  example and not a personal chat.
- Keep every person's Personalspace outside the Organization.
- Keep production runtime, ingress, secrets, backup and rollback in a
  production contract owned by the deployed application.
- Use the [glossary](/en/glossary/) in manifests, prompts and diagrams.
