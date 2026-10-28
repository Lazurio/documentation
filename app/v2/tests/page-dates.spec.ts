import { expect, test } from '@playwright/test'

test('every published page shows its own update and fact-check dates', async ({ page, request }) => {
  const response = await request.get('/content-index.json')
  expect(response.ok()).toBe(true)
  const { documents } = await response.json()
  for (const document of documents) {
    await page.goto(document.route)
    const updated = page.locator('time[data-updated]')
    const reviewed = page.locator('time[data-reviewed]')
    await expect(updated).toBeVisible()
    await expect(updated).toHaveAttribute('datetime', document.updatedAt)
    await expect(reviewed).toBeVisible()
    await expect(reviewed).toHaveAttribute('datetime', document.reviewedAt)
    await expect(page.locator('.page-dates')).toContainText(
      document.locale === 'cs' ? 'Věcně ověřeno' : 'Facts checked',
    )
  }
})
