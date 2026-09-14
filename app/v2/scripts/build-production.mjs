import { fileURLToPath } from 'node:url'

const appRoot = fileURLToPath(new URL('../', import.meta.url))
const wranglerConfigPath = fileURLToPath(new URL('../wrangler.jsonc', import.meta.url))
const wranglerConfig = Bun.JSONC.parse(await Bun.file(wranglerConfigPath).text())
const measurementId = wranglerConfig?.env?.production?.vars
  ?.PUBLIC_GOOGLE_ANALYTICS_ID

if (typeof measurementId !== 'string' || !/^G-[A-Z0-9]+$/u.test(measurementId.trim())) {
  throw new Error(
    'wrangler.jsonc must define a valid env.production.vars.PUBLIC_GOOGLE_ANALYTICS_ID before a production build.',
  )
}

const build = Bun.spawn(['bun', 'run', 'build'], {
  cwd: appRoot,
  env: {
    ...process.env,
    PUBLIC_GOOGLE_ANALYTICS_ID: measurementId.trim(),
  },
  stdin: 'inherit',
  stdout: 'inherit',
  stderr: 'inherit',
})

const exitCode = await build.exited
if (exitCode !== 0) process.exit(exitCode)
