import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

test('the site root selects the accepted English locale', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveURL(/\/en\/$/)
  await expect(
    page.getByRole('heading', { level: 1, name: 'Lazurio: product, architecture and controls' }),
  ).toBeVisible()
})

test('a configured local host still does not load production analytics', async ({ page }) => {
  const plausibleRequests: string[] = []
  page.on('request', (request) => {
    if (request.url().startsWith('https://plausible.io/')) plausibleRequests.push(request.url())
  })

  await page.goto('/en/')

  await expect(page.locator('script[data-plausible-script-url]')).toHaveAttribute(
    'data-plausible-script-url',
    'https://plausible.io/js/pa-browser-test.js',
  )
  expect(plausibleRequests).toEqual([])
})

test('the IT decision path is readable and navigable', async ({ page }) => {
  await page.goto('/en/')
  await expect(
    page.getByRole('heading', { level: 1, name: 'Lazurio: product, architecture and controls' }),
  ).toBeVisible()

  await page.getByRole('link', { name: 'For IT administrators' }).first().click()
  await expect(page).toHaveURL(/\/en\/it-administrators\/$/)
  await expect(page.getByRole('heading', { level: 1, name: 'Approval briefing for IT administrators' })).toBeVisible()

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

test('diagram labels stay inside their nodes and arrowheads remain compact', async ({ page }) => {
  for (const route of [
    '/diagrams/lazurio-data-flow.svg',
    '/diagrams/draft-publication-flow.svg',
  ]) {
    const response = await page.goto(route)
    expect(response?.ok()).toBe(true)

    const nodes = await page.locator('g[data-node]').evaluateAll((groups) =>
      groups.map((group) => {
        const rect = group.querySelector('rect')
        const texts = [...group.querySelectorAll('text')]

        if (!(rect instanceof SVGRectElement)) {
          throw new Error('Diagram node is missing its bounding rectangle.')
        }

        return {
          id: group.getAttribute('data-node'),
          rect: {
            left: rect.x.baseVal.value,
            top: rect.y.baseVal.value,
            right: rect.x.baseVal.value + rect.width.baseVal.value,
            bottom: rect.y.baseVal.value + rect.height.baseVal.value,
          },
          texts: texts.map((text) => {
            const box = text.getBBox()
            return {
              value: text.textContent?.trim(),
              left: box.x,
              top: box.y,
              right: box.x + box.width,
              bottom: box.y + box.height,
            }
          }),
        }
      }),
    )

    expect(nodes.length).toBeGreaterThan(0)
    for (const node of nodes) {
      for (const text of node.texts) {
        expect(text.left, `${node.id}: "${text.value}" starts outside its node`).toBeGreaterThanOrEqual(
          node.rect.left + 12,
        )
        expect(text.right, `${node.id}: "${text.value}" overflows its node`).toBeLessThanOrEqual(
          node.rect.right - 12,
        )
        expect(text.top, `${node.id}: "${text.value}" starts above its node`).toBeGreaterThanOrEqual(
          node.rect.top + 8,
        )
        expect(text.bottom, `${node.id}: "${text.value}" overflows below its node`).toBeLessThanOrEqual(
          node.rect.bottom - 8,
        )
      }
    }

    const marker = page.locator('marker#arrow')
    await expect(marker).toHaveAttribute('markerUnits', 'userSpaceOnUse')
    await expect(marker).toHaveAttribute('markerWidth', /\S+/)
    await expect(marker).toHaveAttribute('markerHeight', /\S+/)
    expect(Number(await marker.getAttribute('markerWidth'))).toBeLessThanOrEqual(12)
    expect(Number(await marker.getAttribute('markerHeight'))).toBeLessThanOrEqual(12)
  }
})

test('documentation tables keep readable cell spacing', async ({ page }) => {
  await page.goto('/en/it-administrators/')
  const table = page.locator('.sl-markdown-content table').first()
  const cells = table.locator('th, td')

  await expect(table).toBeVisible()
  await expect(table).toHaveAttribute('tabindex', '0')
  await expect(table).toHaveAttribute('aria-label', 'Scrollable documentation table')
  expect(await cells.count()).toBeGreaterThan(0)

  const cellStyles = await cells.evaluateAll((elements) =>
    elements.map((cell) => {
      const computed = getComputedStyle(cell)
      return {
        paddingInlineStart: Number.parseFloat(computed.paddingInlineStart),
        paddingInlineEnd: Number.parseFloat(computed.paddingInlineEnd),
        lineHeight: Number.parseFloat(computed.lineHeight),
      }
    }),
  )
  const tableStyles = await table.evaluate((element) => {
    const computed = getComputedStyle(element)
    return {
      borderRadius: Number.parseFloat(computed.borderRadius),
      overflowX: computed.overflowX,
    }
  })

  for (const styles of cellStyles) {
    expect(styles.paddingInlineStart).toBeGreaterThanOrEqual(16)
    expect(styles.paddingInlineEnd).toBeGreaterThanOrEqual(16)
    expect(styles.lineHeight).toBeGreaterThan(20)
  }
  expect(tableStyles.borderRadius).toBeGreaterThanOrEqual(6)
  expect(tableStyles.overflowX).toBe('auto')
})

test('FAQ answers expand only after the reader opens them', async ({ page }) => {
  await page.goto('/en/faq/')
  const firstQuestion = page.locator('.sl-markdown-content details').first()
  const firstSummary = firstQuestion.getByText('Is Lazurio an AI model?', { exact: true })
  const firstAnswer = firstQuestion.getByText(/Lazurio is the working environment/)

  await expect(firstQuestion).not.toHaveAttribute('open', '')
  await expect(firstAnswer).not.toBeVisible()

  await firstSummary.click()
  await expect(firstQuestion).toHaveAttribute('open', '')
  await expect(firstAnswer).toBeVisible()
})

test('unknown documentation routes fail clearly', async ({ page }) => {
  const response = await page.goto('/en/not-a-document/')
  expect(response?.status()).toBe(404)
  await expect(page.getByText(/Page not found|404/i).first()).toBeVisible()
})
