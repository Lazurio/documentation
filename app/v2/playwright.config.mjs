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
      // Render the production-shaped consent bootstrap. Tests prove that the
      // ordinary local host remains analytics-free and use an explicit fake
      // documentation hostname when exercising consent behavior.
      PUBLIC_GOOGLE_ANALYTICS_ID: 'G-TEST123456',
      PUBLIC_ANALYTICS_TEST_HOST: 'true',
    },
    reuseExistingServer: false,
    timeout: 120_000,
  },
  projects: [
    { name: 'desktop-chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile-chromium', use: { ...devices['Pixel 7'] } },
  ],
})
