const accountId = process.env.CLOUDFLARE_ACCOUNT_ID
const apiToken = process.env.CLOUDFLARE_API_TOKEN
const deploymentId = process.env.LAZURIO_DOCUMENTATION_ROLLBACK_DEPLOYMENT_ID
const confirmation = process.env.LAZURIO_DOCUMENTATION_ROLLBACK_CONFIRMATION
const projectName = 'lazurio-documentation'

if (!accountId || !apiToken || !deploymentId) {
  throw new Error(
    'Set CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_API_TOKEN and LAZURIO_DOCUMENTATION_ROLLBACK_DEPLOYMENT_ID.',
  )
}
if (confirmation !== `ROLLBACK:${deploymentId}`) {
  throw new Error(`Set LAZURIO_DOCUMENTATION_ROLLBACK_CONFIRMATION=ROLLBACK:${deploymentId}.`)
}

const endpoint = `https://api.cloudflare.com/client/v4/accounts/${encodeURIComponent(accountId)}/pages/projects/${projectName}/deployments/${encodeURIComponent(deploymentId)}`
const headers = { Authorization: `Bearer ${apiToken}`, 'Content-Type': 'application/json' }

const parseCloudflare = async (response) => {
  const payload = await response.json()
  if (!response.ok || payload.success !== true) {
    const messages = [...(payload.errors ?? []), ...(payload.messages ?? [])]
      .map((entry) => entry.message)
      .filter(Boolean)
      .join('; ')
    throw new Error(`Cloudflare API returned ${response.status}${messages ? `: ${messages}` : '.'}`)
  }
  return payload.result
}

const target = await parseCloudflare(await fetch(endpoint, { headers }))
const commit = target.deployment_trigger?.metadata?.commit_hash
if (target.environment !== 'production' || target.latest_stage?.status !== 'success' || !commit) {
  throw new Error('Rollback target must be a successful production deployment with an exact source commit.')
}

const result = await parseCloudflare(await fetch(`${endpoint}/rollback`, {
  method: 'POST',
  headers,
  body: '{}',
}))

console.log(`Cloudflare Pages now points production to deployment ${result.id} from source commit ${commit}.`)
console.log(`Verify it with LAZURIO_DOCUMENTATION_EXPECTED_SHA=${commit} bun run smoke:production.`)
