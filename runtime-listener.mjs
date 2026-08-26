import { readFileSync } from 'node:fs'

const defaultManifestUrl = new URL('./lazurio.module.json', import.meta.url)

export function parseModuleListener(manifest) {
  const candidate = manifest?.port_leases?.find((lease) => lease.id === 'main')
  if (
    manifest?.schema_version !== 'lazurio.module.v1' ||
    !candidate ||
    typeof candidate.host !== 'string' ||
    !Number.isInteger(candidate.port) ||
    candidate.port < 1024 ||
    candidate.port > 65535
  ) {
    throw new Error('lazurio.module.json must declare a valid main listener lease.')
  }
  return Object.freeze({ host: candidate.host, port: candidate.port })
}

export function loadModuleListener({ allowMissing = false, manifestUrl = defaultManifestUrl } = {}) {
  try {
    return parseModuleListener(JSON.parse(readFileSync(manifestUrl, 'utf8')))
  } catch (error) {
    if (allowMissing && error?.code === 'ENOENT') return null
    throw error
  }
}

function validatePair(listener, host, rawPort, source) {
  if (host === undefined && rawPort === undefined) return
  if (!host || !rawPort) throw new Error(`${source} must provide both host and port.`)
  if (host !== listener.host || Number(rawPort) !== listener.port) {
    throw new Error(
      `${source} listener ${host}:${rawPort} does not match the module-owned lease ${listener.host}:${listener.port}.`,
    )
  }
}

export function resolveModuleListener(
  env = process.env,
  { allowMissing = false, manifest, manifestUrl } = {},
) {
  const listener = manifest
    ? parseModuleListener(manifest)
    : loadModuleListener({ allowMissing, manifestUrl })
  if (!listener) return null
  validatePair(listener, env.LAZURIO_RUNTIME_HOST, env.LAZURIO_RUNTIME_PORT, 'Lazurio runtime')
  validatePair(
    listener,
    env.LAZURIO_RUNTIME_LISTENER_APP_HOST,
    env.LAZURIO_RUNTIME_LISTENER_APP_PORT,
    'Lazurio app listener',
  )
  return listener
}

export function withModuleListener(config = {}, env = process.env, options = {}) {
  const listener = resolveModuleListener(env, options)
  if (!listener) return config
  return {
    ...config,
    server: {
      ...(config.server ?? {}),
      host: listener.host,
      port: listener.port,
      strictPort: true,
    },
    preview: {
      ...(config.preview ?? {}),
      host: listener.host,
      port: listener.port,
      strictPort: true,
    },
  }
}
