import { expect, test } from 'bun:test'
import {
  loadModuleListener,
  parseModuleListener,
  resolveModuleListener,
  withModuleListener,
} from './runtime-listener.mjs'

const manifest = {
  schema_version: 'lazurio.module.v1',
  port_leases: [{ id: 'main', host: '127.0.0.1', port: 43123 }],
}
const moduleListener = parseModuleListener(manifest)

test('valid module manifest owns the listener', () => {
  expect(resolveModuleListener({}, { manifest })).toEqual(moduleListener)
})

test('a missing descriptor can be tolerated only by non-runtime checks', () => {
  expect(loadModuleListener({ allowMissing: true, manifestUrl: new URL('file:///missing.json') })).toBeNull()
  expect(() => loadModuleListener({ manifestUrl: new URL('file:///missing.json') })).toThrow()
})

test('generic HOST and PORT cannot move the listener', () => {
  expect(resolveModuleListener({ HOST: '0.0.0.0', PORT: '65000' }, { manifest })).toEqual(
    moduleListener,
  )
})

test('Lazurio injection must match the lease', () => {
  expect(
    resolveModuleListener(
      {
        LAZURIO_RUNTIME_LISTENER_APP_HOST: moduleListener.host,
        LAZURIO_RUNTIME_LISTENER_APP_PORT: String(moduleListener.port),
      },
      { manifest },
    ),
  ).toEqual(moduleListener)
  expect(() =>
    resolveModuleListener(
      {
        LAZURIO_RUNTIME_LISTENER_APP_HOST: moduleListener.host,
        LAZURIO_RUNTIME_LISTENER_APP_PORT: '65000',
      },
      { manifest },
    ),
  ).toThrow('does not match')
})

test('Vite configuration is pinned to the module-owned lease', () => {
  const config = withModuleListener(
    { server: { allowedHosts: ['module.example'] }, preview: { open: false } },
    { HOST: '0.0.0.0', PORT: '65000' },
    { manifest },
  )
  expect(config.server).toEqual({
    allowedHosts: ['module.example'],
    host: moduleListener.host,
    port: moduleListener.port,
    strictPort: true,
  })
  expect(config.preview).toEqual({
    open: false,
    host: moduleListener.host,
    port: moduleListener.port,
    strictPort: true,
  })
})
