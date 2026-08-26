# Documentation data

`docs/` is the reviewed authoring source. `source-map.json` owns public evidence
and freshness metadata; `documentation.json` owns the stable discovery
contract. Files generated under `public/` are ignored read models and must be
rebuilt with `bun run prepare:data` from `app/v2`.

`docs/en/` and `docs/cs/` are curated locale peers. Matching pages keep the
same filename, stable ID, source references, audiences and trust-review
metadata. The content validator rejects missing or structurally divergent
pairs; it does not replace factual review of the translation.
