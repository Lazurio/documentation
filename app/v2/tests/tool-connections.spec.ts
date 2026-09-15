import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

test('window dots stay level and centered with the title', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('/cs/guide/tool-connections/')
  const dots = page.locator('connection-guide .window-dots > i')
  await expect(dots).toHaveCount(3)
  const boxes = await dots.evaluateAll(items => items.map(item => {
    const box = item.getBoundingClientRect()
    return { x: box.x, y: box.y, width: box.width, height: box.height }
  }))
  for (const box of boxes) {
    expect(box.width).toBe(9)
    expect(box.height).toBe(9)
    expect(box.y).toBeCloseTo(boxes[0].y, 1)
  }
  expect(boxes[1].x - boxes[0].x).toBe(15)
  expect(boxes[2].x - boxes[1].x).toBe(15)
  const title = await page.locator('connection-guide .chat-header > strong').boundingBox()
  expect(Math.abs(title!.y + title!.height / 2 - boxes[0].y - 4.5)).toBeLessThan(1)
})

for (const locale of ['cs', 'en']) {
  test(`connection walkthrough: six scenarios, navigation and clipboard in ${locale}`, async ({ page }) => {
    const errors: string[] = []
    page.on('pageerror', error => errors.push(error.message))
    await page.addInitScript(() => {
      Object.defineProperty(navigator, 'clipboard', { configurable: true, value: {
        writeText: async (text: string) => { Reflect.set(window, 'copiedPrompt', text) },
      } })
    })
    await page.goto(`/${locale}/guide/tool-connections/`)
    const guide = page.locator('connection-guide')
    await expect(guide.locator('[data-app]')).toBeVisible()
    for (const app of ['gmail', 'calendar']) {
      for (const method of ['composio', 'plugin', 'mcp']) {
        await guide.locator('[data-app]').selectOption(app)
        await guide.locator('[data-method]').selectOption(method)
        await expect(guide.locator('[data-scenario]:visible')).toHaveCount(1)
        const scenario = guide.locator('[data-scenario]:visible')
        await expect(scenario).toHaveAttribute('data-app-id', app)
        await expect(scenario).toHaveAttribute('data-method-id', method)
        for (let step = 0; step < 3; step++) {
          await expect(scenario.locator('[data-step]:visible')).toHaveAttribute('data-step', String(step))
          const prompt = (await scenario.locator('[data-step]:visible [data-prompt]').textContent())!.trim()
          await guide.locator('[data-copy]').click()
          expect(await page.evaluate(() => Reflect.get(window, 'copiedPrompt'))).toBe(prompt)
          if (step < 2) await guide.locator('[data-next]').click()
        }
        await guide.locator('[data-back]').click()
        await expect(scenario.locator('[data-step]:visible')).toHaveAttribute('data-step', '1')
        await guide.locator('[data-next]').click()
        await guide.locator('[data-restart]').click()
        await expect(scenario.locator('[data-step]:visible')).toHaveAttribute('data-step', '0')
      }
    }
    const result = await new AxeBuilder({ page }).include('connection-guide').analyze()
    expect(result.violations).toEqual([])
    await page.evaluate(() => document.documentElement.dataset.theme = 'dark')
    expect((await new AxeBuilder({ page }).include('connection-guide').analyze()).violations).toEqual([])
    expect(errors).toEqual([])
  })
}

test('clipboard failure offers selectable text and switching resets progress', async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'clipboard', { value: {
      writeText: async () => { throw new Error('Clipboard denied') },
    } })
  })
  await page.goto('/cs/guide/tool-connections/')
  const guide = page.locator('connection-guide')
  await guide.locator('[data-copy]').click()
  await expect(guide.locator('[data-status]')).toContainText('ručně')
  expect(await page.evaluate(() => getSelection()?.toString())).toContain('Gmail')
  await guide.locator('[data-next]').click()
  await guide.locator('[data-app]').selectOption('calendar')
  await expect(guide.locator('[data-step]:visible')).toHaveAttribute('data-step', '0')
  await expect(guide.locator('[data-status]')).toBeEmpty()
})

test('walkthrough fits narrow and wide viewports with reduced motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/cs/guide/tool-connections/')
  for (const width of [320, 390, 768, 1024, 1440, 1920]) {
    await page.setViewportSize({ width, height: 900 })
    await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth - innerWidth), { message: `No horizontal overflow at ${width}px` }).toBeLessThanOrEqual(1)
    expect(await page.locator('[data-step]:visible').evaluate(el => getComputedStyle(el).animationName)).toBe('none')
  }
})

test('all instructions remain readable without JavaScript', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false })
  const page = await context.newPage()
  await page.goto(baseURL + '/en/guide/tool-connections/')
  await expect(page.locator('connection-guide [data-scenario]:visible')).toHaveCount(6)
  await expect(page.locator('connection-guide [data-prompt]:visible')).toHaveCount(18)
  await expect(page.locator('[data-copy]')).toBeHidden()
  await context.close()
})
