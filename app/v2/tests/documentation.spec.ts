import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

test('the site root selects the accepted English locale', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveURL(/\/en\/$/)
  await expect(
    page.getByRole('heading', { level: 1, name: 'Lazurio documentation' }),
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

test('the IT decision path is readable and navigable', async ({ page }, testInfo) => {
  await page.goto('/en/')
  await expect(
    page.getByRole('heading', { level: 1, name: 'Lazurio documentation' }),
  ).toBeVisible()

  await expect(page.getByRole('img', { name: /Company work is translated by Lazurio/ })).toBeVisible()
  await expect(page.getByRole('img', { name: /People direct the work/ })).toBeVisible()

  await page.getByRole('navigation', { name: 'Documentation sections' }).getByRole('link', { name: /^For IT administrators/ }).click()
  await expect(page).toHaveURL(/\/en\/it-administrators\/$/)
  await expect(page.getByRole('heading', { level: 1, name: 'A ten-minute IT briefing' })).toBeVisible()

  if (testInfo.project.name.startsWith('mobile')) {
    await page.locator('button[aria-controls="starlight__sidebar"]').click()
  }
  await page.locator('#starlight__sidebar').getByRole('link', { name: 'Lazurio vs Microsoft Copilot', exact: true }).click()
  await expect(page).toHaveURL(/\/en\/lazurio-vs-microsoft-copilot\/$/)
})

test('the homepage offers a neutral route into every documentation section', async ({ page }) => {
  await page.goto('/en/')

  await page.getByRole('link', { name: 'Browse documentation' }).click()
  await expect(page).toHaveURL(/\/en\/#browse-the-documentation$/)
  await expect(page.getByRole('heading', { name: 'Browse the documentation' })).toBeVisible()
  const directory = page.getByRole('navigation', { name: 'Documentation sections' })

  for (const title of [
    'How Lazurio works',
    'Use cases',
    'For IT administrators',
    'Data access and security',
    'Deployment and operations',
    'Lazurio vs Microsoft Copilot',
    'For agents',
    'FAQ',
    'Security and control evidence',
    'Public references',
  ]) {
    await expect(directory.getByRole('link', { name: new RegExp(`^${title}`) })).toBeVisible()
  }

  await directory.getByRole('link', { name: /^How Lazurio works/ }).click()
  await expect(page).toHaveURL(/\/en\/how-lazurio-works\/$/)
})

test('the language switch keeps the current page and localizes navigation', async ({ page }, testInfo) => {
  await page.goto('/en/it-administrators/')
  await page.waitForFunction(() => Boolean(customElements.get('starlight-lang-select')))

  if (testInfo.project.name.startsWith('mobile')) {
    await page.locator('button[aria-controls="starlight__sidebar"]').click()
  }
  const englishLanguageSelect = page.locator('starlight-lang-select:visible select')
  await expect(englishLanguageSelect).toBeVisible()
  await englishLanguageSelect.selectOption({ label: 'Čeština' })

  await expect(page).toHaveURL(/\/cs\/it-administrators\/$/)
  await expect(page.locator('html')).toHaveAttribute('lang', 'cs')
  await expect(page.getByRole('heading', { level: 1, name: 'Deset minut pro IT' })).toBeVisible()

  // Navigating to the localized route reloads the mobile page and closes the
  // drawer. Re-open it before asserting localized sidebar content or using
  // the Czech selector for the return journey.
  if (testInfo.project.name.startsWith('mobile')) {
    const sidebarToggle = page.locator('button[aria-controls="starlight__sidebar"]')
    if ((await sidebarToggle.getAttribute('aria-expanded')) !== 'true') await sidebarToggle.click()
  }
  await expect(page.getByRole('link', { name: 'Přístup k datům a zabezpečení' }).first()).toBeVisible()
  await page.waitForFunction(() => Boolean(customElements.get('starlight-lang-select')))

  const czechLanguageSelect = page.locator('starlight-lang-select:visible select')
  await expect(czechLanguageSelect).toHaveValue('/cs/it-administrators/')
  await czechLanguageSelect.selectOption({ label: 'English' })
  await expect(page).toHaveURL(/\/en\/it-administrators\/$/)
})

test('the Czech homepage gives every reader a clear way into the documentation', async ({ page }) => {
  await page.goto('/cs/')

  const browseDocumentation = page.getByRole('link', { name: 'Projít dokumentaci' })
  const startHeading = page.getByRole('heading', { name: 'Kde začít' })

  await expect(browseDocumentation).toHaveAttribute('href', '#kde-začít')
  await browseDocumentation.click()
  await expect
    .poll(() => page.evaluate(() => decodeURIComponent(location.hash)))
    .toBe('#kde-začít')
  await expect(startHeading).toHaveAttribute('id', 'kde-začít')
  await expect(startHeading).toBeInViewport()
  const directory = page.getByRole('navigation', { name: 'Části dokumentace' })

  for (const title of [
    'Jak Lazurio funguje',
    'Kdy dává Lazurio smysl',
    'Přehled pro správce IT',
    'Přístup k datům a zabezpečení',
    'Nasazení a provoz',
    'Lazurio a Microsoft Copilot',
    'Pro AI agenty',
    'Časté otázky',
    'Bezpečnost a podklady k ověření',
    'Použité zdroje',
  ]) {
    await expect(directory.getByRole('link', { name: new RegExp(`^${title}`) })).toBeVisible()
  }

  await directory.getByRole('link', { name: /^Jak Lazurio funguje/ }).click()
  await expect(page).toHaveURL(/\/cs\/how-lazurio-works\/$/)
})

test('critical pages have no serious accessibility violations', async ({ page }) => {
  for (const route of [
    '/en/',
    '/en/it-administrators/',
    '/en/lazurio-vs-microsoft-copilot/',
    '/cs/',
    '/cs/it-administrators/',
    '/cs/lazurio-vs-microsoft-copilot/',
  ]) {
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
    '/diagrams/company-to-github.svg',
    '/diagrams/company-to-github-mobile.svg',
    '/diagrams/human-directed-work.svg',
    '/diagrams/human-directed-work-mobile.svg',
    '/diagrams/lazurio-data-flow.svg',
    '/diagrams/draft-publication-flow.svg',
    '/diagrams/draft-publication-flow-mobile.svg',
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

test('Czech tables expose a localized scroll label', async ({ page }) => {
  await page.goto('/cs/it-administrators/')
  await expect(page.locator('.sl-markdown-content table').first()).toHaveAttribute(
    'aria-label',
    'Posuvná tabulka dokumentace',
  )
})

test('unknown documentation routes fail clearly', async ({ page }) => {
  const response = await page.goto('/en/not-a-document/')
  expect(response?.status()).toBe(404)
  await expect(page.getByText(/Page not found|404/i).first()).toBeVisible()
})

for (const path of ['/en/', '/cs/', '/en/agents/', '/cs/agents/']) {
  test(`link preview is present in crawler HTML at ${path}`, async ({ request }) => {
    const response = await request.get(path)
    expect(response.status()).toBe(200)
    const html = await response.text()
    expect(html.match(/name="twitter:card"/g)).toHaveLength(1)
    expect(html).toContain('name="twitter:card" content="summary"')
    for (const key of ['og:image', 'twitter:image']) {
      expect(html).toMatch(new RegExp(`(?:property|name)="${key}" content="https://documentation.lazurio.ai/social-preview-v1.png"`))
    }
    const image = await request.get('/social-preview-v1.png')
    expect(image.status()).toBe(200)
    expect(image.headers()['content-type']).toContain('image/png')
    const bytes = await image.body()
    expect([...bytes.subarray(0, 8)]).toEqual([137, 80, 78, 71, 13, 10, 26, 10])
    expect(bytes.readUInt32BE(16)).toBe(1024)
    expect(bytes.readUInt32BE(20)).toBe(1024)
  })
}

for (const locale of ['en', 'cs']) {
  test(`${locale} overview exposes topic navigation on desktop and mobile`, async ({ page }, testInfo) => {
    await page.goto(`/${locale}/`)
    await expect(page.locator('main h1')).toHaveText(locale === 'cs' ? 'Dokumentace Lazuria' : 'Lazurio documentation')
    const stones = page.locator('.lz-module-composition img')
    await expect(stones).toHaveCount(5)
    expect(await stones.evaluateAll((images) => images.every((image) => image instanceof HTMLImageElement && image.complete && image.naturalWidth === 96))).toBe(true)
    if (testInfo.project.name.startsWith('mobile')) {
      const toggle = page.locator('button[aria-controls="starlight__sidebar"]')
      await toggle.click()
      await expect(page.locator('#starlight__sidebar')).toBeVisible()
    }
    const sidebar = page.locator('#starlight__sidebar')
    await expect(sidebar.getByRole('link', { name: locale === 'cs' ? 'Přehled' : 'Overview', exact: true })).toHaveAttribute('aria-current', 'page')
    await sidebar.locator(`a[href="/${locale}/faq/"]`).click()
    await expect(page).toHaveURL(new RegExp(`/${locale}/faq/$`))
    await expect(page.locator('main h1')).toBeVisible()
  })
}

test('icon controls retain labels, keyboard access and persistent theme choices', async ({ page }, testInfo) => {
  await page.goto('/cs/')
  const openMobileMenu = async () => {
    if (testInfo.project.name.startsWith('mobile')) {
      const toggle = page.locator('button[aria-controls="starlight__sidebar"]')
      if (await toggle.getAttribute('aria-expanded') !== 'true') await toggle.click()
    }
  }
  await openMobileMenu()
  const theme = page.locator('starlight-theme-select:visible select')
  await expect(theme).toHaveAccessibleName('Vyberte motiv')
  await expect(page.locator('starlight-lang-select:visible select')).toHaveAccessibleName('Vyberte jazyk')
  const size = await theme.boundingBox()
  expect(size?.width).toBeGreaterThanOrEqual(44)
  expect(size?.height).toBeGreaterThanOrEqual(44)
  await theme.selectOption('dark')
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
  await expect(page.locator('.lz-theme-dark:visible')).toHaveCount(1)
  await expect(page.locator('.lz-theme-light:visible')).toHaveCount(0)
  await page.reload()
  await openMobileMenu()
  await expect(theme).toHaveValue('dark')
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
  await theme.focus()
  await theme.press('Tab')
  await expect(page.locator('starlight-lang-select:visible select')).toBeFocused()
  await theme.selectOption('light')
  await expect(theme).toHaveValue('light')
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light')
  await expect(page.locator('.lz-theme-light:visible')).toHaveCount(1)
  await page.emulateMedia({ colorScheme: 'dark' })
  await theme.selectOption('auto')
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
  await page.emulateMedia({ colorScheme: 'light' })
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light')
  const results = await new AxeBuilder({ page }).analyze()
  expect(results.violations.filter((v) => ['serious', 'critical'].includes(v.impact ?? ''))).toEqual([])
})
