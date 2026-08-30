import { defineConfig, devices } from '@playwright/test'

const baseURL = 'http://127.0.0.1:4321'

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
    command: 'bun run dev -- --host 127.0.0.1 --port 4321',
    url: `${baseURL}/en/`,
    env: {
      ...process.env,
      // Exercise the runtime hostname guard: the bootstrap is rendered on the
      // test host, but it must never request Plausible outside production.
      PUBLIC_PLAUSIBLE_SCRIPT_URL: 'https://plausible.io/js/pa-ltzsxuYqcCwGVNf3CSHxF.js',
    },
    reuseExistingServer: false,
    timeout: 120_000,
  },
  projects: [
    { name: 'desktop-chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile-chromium', use: { ...devices['Pixel 7'] } },
  ],
})
