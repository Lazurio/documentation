export function findLocaleParityErrors(stableId, localizedDocuments, supportedLocales) {
  const errors = []
  const byLocale = new Map(localizedDocuments.map((document) => [document.frontmatter.locale, document]))
  for (const locale of supportedLocales) {
    if (!byLocale.has(locale)) errors.push(`${stableId}: missing ${locale} document`)
  }
  if (byLocale.size !== supportedLocales.length) return errors

  const english = byLocale.get('en')
  const czech = byLocale.get('cs')
  for (const field of ['sourceRefs', 'audience']) {
    const englishValue = JSON.stringify([...(english.frontmatter[field] ?? [])].sort())
    const czechValue = JSON.stringify([...(czech.frontmatter[field] ?? [])].sort())
    if (englishValue !== czechValue) errors.push(`${stableId}: ${field} differs between en and cs`)
  }
  for (const field of ['reviewOwner', 'trustCritical', 'secondReviewOwner']) {
    if ((english.frontmatter[field] ?? null) !== (czech.frontmatter[field] ?? null)) {
      errors.push(`${stableId}: ${field} differs between en and cs`)
    }
  }
  if (czech.frontmatter.reviewedAt < english.frontmatter.reviewedAt) {
    errors.push(`${stableId}: cs reviewedAt must not be older than en reviewedAt`)
  }
  const englishPath = english.relativePath.replace(/^en\//, '')
  const czechPath = czech.relativePath.replace(/^cs\//, '')
  if (englishPath !== czechPath) errors.push(`${stableId}: localized source paths must share the same slug`)
  return errors
}
