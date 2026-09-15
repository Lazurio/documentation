import { expect, test } from '@playwright/test'

for (const locale of ['cs', 'en']) {
  test(`approved MCP is the default and broker scope is explicit: ${locale}`, async ({ page }) => {
    await page.goto(`/${locale}/guide/tool-connections/`)
    await expect(page.locator('[data-method]')).toHaveValue('mcp')
    await expect(page.locator('[data-method] option').first()).toHaveValue('mcp')
    await page.locator('[data-method]').selectOption('composio')
    await expect(page.locator('[data-scenario]:visible .scenario-intro')).toContainText(
      locale === 'cs' ? 'mimo standard Lazuria' : 'outside the Lazurio standard')
  })
}

for (const latestSucceeds of [true, false]) {
  test(`older clipboard completion cannot override latest attempt: ${latestSucceeds}`, async ({ page }) => {
    await page.addInitScript(() => {
      const pending: { resolve: () => void; reject: () => void }[] = []
      Reflect.set(window, 'pendingCopies', pending)
      Object.defineProperty(navigator, 'clipboard', { configurable: true, value: {
        writeText: () => new Promise<void>((resolve, reject) => {
          pending.push({ resolve, reject: () => reject(new Error('denied')) })
        }),
      } })
    })
    await page.goto('/en/guide/tool-connections/')
    await page.locator('[data-copy]').click()
    await page.locator('[data-copy]').click()
    await page.evaluate(success => Reflect.get(window, 'pendingCopies')[1][success ? 'resolve' : 'reject'](), latestSucceeds)
    const expected = await page.locator('connection-guide').getAttribute(latestSucceeds ? 'data-copied' : 'data-failed')
    await expect(page.locator('[data-status]')).toHaveText(expected!)
    const selection = await page.evaluate(() => getSelection()?.toString())
    await page.evaluate(success => Reflect.get(window, 'pendingCopies')[0][success ? 'reject' : 'resolve'](), latestSucceeds)
    await expect(page.locator('[data-status]')).toHaveText(expected!)
    expect(await page.evaluate(() => getSelection()?.toString())).toBe(selection)
  })
}
