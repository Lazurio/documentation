const isoDate = /^\d{4}-\d{2}-\d{2}$/

// updatedAt is the date of the document's latest change; reviewedAt is the date
// of its latest full fact review. An editorial update may be newer than the fact
// review and does not move reviewedAt, so the two dates are not ordered.
export function findDocumentDateErrors(relativePath, frontmatter) {
  const errors = []
  for (const field of ['updatedAt', 'reviewedAt']) {
    const value = frontmatter[field]
    if (value === undefined || value === '') continue
    if (typeof value !== 'string' || !isoDate.test(value)) {
      errors.push(`${relativePath}: ${field} must be a quoted date in the form YYYY-MM-DD`)
    }
  }
  return errors
}
