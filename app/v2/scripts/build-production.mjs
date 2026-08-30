import { fileURLToPath } from 'node:url'

const appRoot = fileURLToPath(new URL('../', import.meta.url))
const wranglerConfigPath = fileURLToPath(new URL('../wrangler.jsonc', import.meta.url))
const wranglerConfig = Bun.JSONC.parse(await Bun.file(wranglerConfigPath).text())
const plausibleScriptUrl = wranglerConfig?.env?.production?.vars
  ?.PUBLIC_PLAUSIBLE_SCRIPT_URL

if (typeof plausibleScriptUrl !== 'string' || !plausibleScriptUrl.trim()) {
  throw new Error(
    'wrangler.jsonc must define env.production.vars.PUBLIC_PLAUSIBLE_SCRIPT_URL before a production build.',
  )
}

const build = Bun.spawn(['bun', 'run', 'build'], {
  cwd: appRoot,
  env: {
    ...process.env,
    PUBLIC_PLAUSIBLE_SCRIPT_URL: plausibleScriptUrl.trim(),
  },
  stdin: 'inherit',
  stdout: 'inherit',
  stderr: 'inherit',
})

const exitCode = await build.exited
if (exitCode !== 0) process.exit(exitCode)
