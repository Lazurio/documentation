import { expect, test } from '@playwright/test'

test('every published page shows a single last-updated date', async ({ page, request }) => {
  test.setTimeout(60_000)
  const response = await request.get('/content-index.json')
  expect(response.ok()).toBe(true)
  const { documents } = await response.json()
  for (const document of documents) {
    await page.goto(document.route)
    const updated = page.locator('time[data-updated]')
    await expect(page.locator('.page-dates time')).toHaveCount(1)
    await expect(updated).toBeVisible()
    await expect(updated).toHaveAttribute('datetime', document.updatedAt)
    await expect(page.locator('time[data-reviewed]')).toHaveCount(0)
    await expect(page.locator('.page-dates')).toContainText(
      document.locale === 'cs' ? 'Poslední aktualizace' : 'Last updated',
    )
  }
})
