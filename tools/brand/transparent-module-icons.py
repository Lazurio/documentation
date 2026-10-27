"""Remove only the edge-connected canvas from the documented source PNGs.

Requires Pillow. Run from any directory; originals stay byte-identical.
The alpha fringe is un-matted against the near-white source canvas so it
also works on dark pages. Interior whites (books, documents) stay opaque.
"""
from collections import deque
from hashlib import sha256
from pathlib import Path
import json
from PIL import Image

ROOT = Path(__file__).resolve().parents[2]
SOURCE = ROOT / 'data/v2/public/module-icons'
TARGET = SOURCE / 'transparent'
TARGET.mkdir(exist_ok=True)
manifest = {'operation': 'Remove edge-connected canvas; retain interior whites and dimensions.', 'files': {}}
for source in sorted(SOURCE.glob('*-96.png')):
    image = Image.open(source).convert('RGBA')
    width, height = image.size
    pixels = image.load()
    outside = set()
    queue = deque((x, y) for x in range(width) for y in [0, height - 1])
    queue.extend((x, y) for y in range(height) for x in [0, width - 1])
    while queue:
        x, y = queue.popleft()
        if (x, y) in outside or not (0 <= x < width and 0 <= y < height):
            continue
        rgb = pixels[x, y][:3]
        if min(rgb) < 215 or max(rgb) - min(rgb) > 32:
            continue
        outside.add((x, y))
        queue.extend(((x-1, y), (x+1, y), (x, y-1), (x, y+1)))
    assert outside, source
    result = image.copy()
    output = result.load()
    for x, y in outside:
        output[x, y] = (0, 0, 0, 0)
    # The first retained contour may contain light antialiasing. Use nearby
    # interior color to estimate alpha without erasing white drawing details.
    for y in range(height):
        for x in range(width):
            if (x, y) in outside:
                continue
            if not any((x+dx, y+dy) in outside for dx, dy in [(1,0),(-1,0),(0,1),(0,-1)]):
                continue
            color = pixels[x, y][:3]
            candidates = []
            for dy in range(-2, 3):
                for dx in range(-2, 3):
                    xx, yy = x+dx, y+dy
                    if not (0 <= xx < width and 0 <= yy < height) or (xx, yy) in outside:
                        continue
                    value = pixels[xx, yy][:3]
                    candidates.append((min(value), dx*dx+dy*dy, value))
            foreground = min(candidates)[2]
            background = (251, 250, 249)
            delta = [foreground[i] - background[i] for i in range(3)]
            denominator = sum(v*v for v in delta)
            alpha = max(0.0, min(1.0, sum((color[i]-background[i])*delta[i] for i in range(3))/denominator)) if denominator else 1.0
            if alpha < 0.02:
                output[x, y] = (0, 0, 0, 0)
            else:
                output[x, y] = (*[max(0, min(255, round((color[i]-(1-alpha)*background[i])/alpha))) for i in range(3)], round(alpha*255))
    result.save(TARGET / source.name, optimize=True)
    manifest['files'][source.name] = {'sourceSha256': sha256(source.read_bytes()).hexdigest(), 'transparentSha256': sha256((TARGET/source.name).read_bytes()).hexdigest()}
(TARGET / 'provenance.json').write_text(json.dumps(manifest, indent=2)+'\n')
print(f'Prepared {len(manifest["files"])} transparent module icons.')
