# Launchpad module icons

Unmodified public Lazurio Launchpad assets from
`HumanAndMachines/Lazurio`, `launchpad/public/app-icons/lazurio/`, source commit
`b85c511ca4da9965a7e40b9bbc52d901849ee97f`.

The documentation uses these 96px PNGs as a decorative composition. The
Launchpad set remains the canonical source; replace these copies from that
source when the shared visual set changes. Do not edit the icons here.

## Transparent documentation variants

`transparent/` contains background-only derivatives requested for the public
documentation. The original PNGs above remain unchanged. Run
`python tools/brand/transparent-module-icons.py` from the repository (requires
Pillow) to reproduce them. The script removes only the edge-connected canvas,
preserves white details inside the drawings, and writes source/output digests
to `transparent/provenance.json`. Do not substitute these derivatives into the
canonical Launchpad asset set.
