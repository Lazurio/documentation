# Documentation data

`docs/` is the reviewed authoring source. `source-map.json` owns public evidence
and freshness metadata; `documentation.json` owns the stable discovery
contract. Files generated under `public/` are ignored read models and must be
rebuilt with `bun run prepare:data` from `app/v2`.
