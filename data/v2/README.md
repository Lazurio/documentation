# Documentation data

`docs/` is the reviewed authoring source. `source-map.json` owns public evidence
and freshness metadata; `documentation.json` owns the stable discovery
contract. Files generated under `public/` are ignored read models and must be
rebuilt with `bun run prepare:data` from `app/v2`.

`docs/en/` and `docs/cs/` are curated locale peers. Matching pages keep the
same filename, stable ID, source references, audiences and trust-review
metadata. The content validator rejects missing or structurally divergent
pairs; it does not replace factual review of the translation.

## Video in a figure

A video lives in `public/videos/`, with its origin in that folder's README. Use
one file per language and write the captions in the figure, so that the page says
the same without the video:

```html
<figure class="lz-diagram">
  <video controls playsinline preload="none" poster="/videos/modules-en.webp" aria-describedby="modules-video">
    <source src="/videos/modules-en.mp4" type="video/mp4" />
  </video>
  <figcaption id="modules-video">The steps of the video, in words.</figcaption>
</figure>
```

`bun run test:links` and the release smoke check `src` and `poster`.
