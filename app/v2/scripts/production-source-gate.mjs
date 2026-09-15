const expectedRepository = 'Lazurio/documentation'

function assert(condition, message) {
  if (!condition) throw new Error(message)
}

export function assertProductionSource({ head, approvedHead, status, branch, environment }) {
  assert(status === '', 'Production deployment requires a clean Git tree.')
  assert(
    approvedHead === head,
    `Set LAZURIO_DOCUMENTATION_APPROVED_SHA to the exact reviewed HEAD (${head}) before production deployment.`,
  )

  if (environment.GITHUB_ACTIONS !== 'true') {
    assert(branch === 'main', 'Production deployment requires the main branch.')
    return
  }

  assert(
    environment.GITHUB_REPOSITORY === expectedRepository,
    `Production automation must run in ${expectedRepository}.`,
  )
  assert(environment.GITHUB_EVENT_NAME === 'push', 'Production automation requires a GitHub push event.')
  assert(environment.GITHUB_REF === 'refs/heads/main', 'Production automation requires refs/heads/main.')
  assert(environment.GITHUB_REF_PROTECTED === 'true', 'Production automation requires a protected main branch.')
  assert(environment.GITHUB_SHA === head, 'GitHub event SHA must match the checked-out production source.')
}
