import { readdirSync } from 'node:fs'
import { expect, test } from '@playwright/test'

const root = new URL('../../../data/v2/docs/', import.meta.url)
const routes = readdirSync(root, { recursive: true, withFileTypes: true })
  .filter(entry => entry.isFile() && /\.mdx?$/.test(entry.name))
  .map(entry => {
    const path = new URL(entry.name, `file://${entry.parentPath}/`).pathname
    const relative = path.slice(root.pathname.length).replace(/\.mdx?$/, '').replace(/\/index$/, '')
    return `/${relative}/`
  })

test('every edited documentation page remains readable at phone and laptop widths', async ({ page }) => {
  test.setTimeout(120_000)
  expect(routes).toHaveLength(36)
  for (const width of [375, 1280]) {
    await page.setViewportSize({ width, height: 900 })
    for (const route of routes) {
      const response = await page.goto(route)
      expect(response?.status(), route).toBe(200)
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${route} at ${width}px`).toBe(true)
    }
  }
})
