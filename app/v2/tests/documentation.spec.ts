import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

test('the IT decision path is readable and navigable', async ({ page }) => {
  await page.goto('/en/')
  await expect(
    page.getByRole('heading', { level: 1, name: 'Understand Lazurio before you approve it' }),
  ).toBeVisible()

  await page.getByRole('link', { name: 'For IT administrators' }).first().click()
  await expect(page).toHaveURL(/\/en\/it-administrators\/$/)
  await expect(page.getByRole('heading', { level: 1, name: 'A ten-minute IT briefing' })).toBeVisible()

  await page.getByRole('link', { name: 'Lazurio vs Microsoft Copilot' }).first().click()
  await expect(page).toHaveURL(/\/en\/lazurio-vs-microsoft-copilot\/$/)
})

test('critical pages have no serious accessibility violations', async ({ page }) => {
  for (const route of ['/en/', '/en/it-administrators/', '/en/lazurio-vs-microsoft-copilot/']) {
    await page.goto(route)
    const results = await new AxeBuilder({ page }).analyze()
    const serious = results.violations.filter((violation) =>
      ['serious', 'critical'].includes(violation.impact ?? ''),
    )
    expect(serious).toEqual([])
  }
})

test('unknown documentation routes fail clearly', async ({ page }) => {
  const response = await page.goto('/en/not-a-document/')
  expect(response?.status()).toBe(404)
  await expect(page.getByText(/Page not found|404/i).first()).toBeVisible()
})
