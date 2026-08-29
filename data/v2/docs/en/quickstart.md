---
title: Quickstart
description: Verify a Lazurio source checkout and open Launchpad using the current supported development path.
stableId: lazurio-doc-quickstart
summary: Install the current prerequisites, clone the public source, verify context and Doctor output, and start the builder-first Launchpad.
updatedAt: "2026-08-29"
reviewedAt: "2026-08-29"
reviewOwner: Matej Suchanek
sourceRefs:
  - lazurio-readme
  - lazurio-cli
  - lazurio-launchpad
audience:
  - builder
  - agent
  - it-admin
---

The current supported development setup is a **Source Root**: a trusted Git
checkout of Lazurio that also acts as the local working Root. The packaged CLI
and generated Managed Root remain a target and should not be simulated by
manually creating a partial directory tree.

## Prerequisites

- Git
- [Bun](https://bun.sh/)
- GitHub CLI (`gh`) for provider-backed Organization operations
- a supported AI app or terminal session for Task Agent work

## 1. Clone and inspect

```sh
git clone https://github.com/HumanAndMachines/Lazurio.git
cd Lazurio

bun run lazurio -- context --json
bun run lazurio -- doctor
```

`context` projects a safe description of the current working scope. `doctor`
checks the actual checkout, toolchain and mounted resources. Read each warning
according to its named owner and next action; do not “fix” an empty Root by
copying Organization or Personalspace data into the public source.

## 2. Start Launchpad

```sh
bun run launchpad
```

Launchpad reports the address of the running instance. Use that exact URL;
the port is runtime-owned and must not be guessed or hard-coded.

A fresh checkout with no Organization mounted is valid. Launchpad discovers
Organizations from local, Git-ignored mounts and their manifests.

## 3. Optionally install the desktop launcher

From the primary Source Root on macOS or Windows:

```sh
bun run lazurio -- launchpad install
```

Linux does not currently have this desktop-installer slice. The command does
not register the CLI in `PATH` and does not modify the Git checkout.

To expose the current checkout's CLI explicitly:

```sh
bun run lazurio -- cli install
lazurio cli status
```

## 4. Attach an existing Organization

An already active and readable Lazurio Organization can be materialized from
its GitHub Organization login:

```sh
lazurio organization install <github-login> --json
```

The operation verifies the provider identity and expected root repository
before materialization. GitHub access remains authoritative. Do not replace
this with a manually authored access list.

## 5. Verify Module lifecycle

With Launchpad running and an Organization Module already declared:

```sh
lazurio module status --json
lazurio module status ExampleOrganization/website --json
```

Start, open and stop require a real Module App declaration. See the
[Example Organization](/en/example-organization/) and the source-backed
[module lifecycle contract](https://github.com/HumanAndMachines/Lazurio/blob/08d21803d4d4011304e1181ecf02ab9c5bfbad58/manual/module-lifecycle.md)
before automating these commands.

## Guided installation

[Rozjedeme.ai](https://rozjedeme.ai/) is the official Lazurio integrator for
teams that want a guided Organization setup, integration work or production
rollout. Product support and service levels belong to the concrete engagement;
they are not implied by the public source.
