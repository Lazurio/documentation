// <video> and its <source> keep their files in src and poster, outside any
// markdown link. A <source> of a <picture> uses srcset and is not a video file.
const mediaTag = /<(?:video|source)\b[^>]*>/giu
const mediaAttribute = /\s(?:src|poster)\s*=\s*["']([^"']+)["']/giu

export function mediaTargets(markdown) {
  return Array.from(markdown.matchAll(mediaTag), ([tag]) =>
    Array.from(tag.matchAll(mediaAttribute), (match) => match[1]),
  ).flat()
}
