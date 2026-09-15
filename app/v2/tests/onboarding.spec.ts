import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

for (const locale of ['cs', 'en']) {
  test(`onboarding navigation, illustration and examples: ${locale}`, async ({ page }) => {
    await page.goto(`/${locale}/guide/`)
    await expect(page.locator('.lz-directory a').first()).toHaveAttribute('href', `/${locale}/guide/start-here/`)
    for (const route of ['start-here', 'first-steps']) {
      await page.goto(`/${locale}/guide/${route}/`)
      const examples = page.locator('details.lz-learning-chat')
      for (const example of await examples.all()) {
        await example.locator('summary').focus()
        await page.keyboard.press('Enter')
        await expect(example).toHaveAttribute('open', '')
        await expect(example.locator('p').first()).toBeVisible()
      }
      await expect(page.locator('main')).not.toContainText(/plugin/i)
      for (const width of [320, 375, 768, 1024, 1440, 1920]) {
        await page.setViewportSize({ width, height: 900 })
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
      }
      for (const theme of ['light', 'dark']) {
        await page.evaluate(theme => document.documentElement.dataset.theme = theme, theme)
        expect((await new AxeBuilder({ page }).include('main').analyze()).violations).toEqual([])
      }
    }
  })
  test(`onboarding is usable without JavaScript: ${locale}`, async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 375, height: 900 } })
    const page = await context.newPage()
    await page.goto(`/${locale}/guide/start-here/`)
    await expect(page.locator('.lz-assistant-map')).toBeVisible()
    await page.locator('.lz-learning-chat summary').click()
    await expect(page.locator('.lz-learning-chat p').first()).toBeVisible()
    await context.close()
  })
}
