import { defineConfig, devices } from '@playwright/test'

const port = Number.parseInt(process.env.PLAYWRIGHT_PORT ?? '4321', 10)

if (!Number.isInteger(port) || port < 1 || port > 65_535) {
  throw new Error('PLAYWRIGHT_PORT must be a valid local TCP port.')
}

const baseURL = `http://127.0.0.1:${port}`

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? 'github' : 'list',
  use: {
    baseURL,
    trace: 'retain-on-failure',
  },
  webServer: {
    command: `wrangler pages dev dist --ip 127.0.0.1 --port ${port}`,
    url: `${baseURL}/en/`,
    env: {
      ...process.env,
      // Exercise the runtime hostname guard: the bootstrap is rendered on the
      // test host, but it must never request Plausible outside production.
      PUBLIC_PLAUSIBLE_SCRIPT_URL: 'https://plausible.io/js/pa-browser-test.js',
    },
    reuseExistingServer: false,
    timeout: 120_000,
  },
  projects: [
    { name: 'desktop-chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile-chromium', use: { ...devices['Pixel 7'] } },
  ],
})
