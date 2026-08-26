import { defineConfig, devices } from '@playwright/test'
import { resolveModuleListener } from '../../runtime-listener.mjs'

const listener = resolveModuleListener(process.env, {
  manifestUrl: process.env.CI
    ? new URL('./tests/fixtures/lazurio.module.json', import.meta.url)
    : undefined,
})
const baseURL = `http://${listener.host}:${listener.port}`

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
    command: 'bun run dev',
    url: `${baseURL}/en/`,
    reuseExistingServer: false,
    timeout: 120_000,
  },
  projects: [
    { name: 'desktop-chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile-chromium', use: { ...devices['Pixel 7'] } },
  ],
})
