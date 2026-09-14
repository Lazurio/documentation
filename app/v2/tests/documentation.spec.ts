import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

test('the site root selects the accepted English locale', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveURL(/\/en\/$/)
  const siteTitle = page.getByRole('link', { name: 'Lazurio Docs' })
  await expect(siteTitle).toBeVisible()
  await expect(siteTitle.getByRole('img', { name: 'Lazurio' })).toBeVisible()
  await expect(
    page.getByRole('heading', { level: 1, name: 'Lazurio documentation' }),
  ).toBeVisible()
})

test('a configured local host still does not load production analytics', async ({ page }) => {
  const analyticsRequests: string[] = []
  page.on('request', (request) => {
    if (request.url().includes('googletagmanager.com')) analyticsRequests.push(request.url())
  })

  await page.goto('/en/')

  await expect(page.locator('script[data-ga-consent-bootstrap]')).toHaveCount(1)
  expect(analyticsRequests).toEqual([])
})

test('GA4 loads only after consent and strips arbitrary URL data', async ({ page }) => {
  const analyticsRequests: string[] = []
  await page.route('https://www.googletagmanager.com/**', async (route) => {
    analyticsRequests.push(route.request().url())
    await route.fulfill({ status: 204, body: '' })
  })

  await page.goto('/en/guide/?utm_source=launchpad&utm_medium=product&utm_campaign=guide&private=never-send&__analytics_test=1')

  await expect(page.getByRole('dialog', { name: 'Help us improve the documentation?' })).toBeVisible()
  expect(analyticsRequests).toEqual([])

  await page.getByRole('button', { name: 'Allow all' }).click()
  await expect.poll(() => analyticsRequests.length).toBe(1)
  const expectedCleanLocation = `${new URL(page.url()).origin}/en/guide/`
  const [config, pageView] = await page.evaluate(() => {
    const dataLayer = (window as Window & { dataLayer?: unknown[][] }).dataLayer ?? []
    return [
      dataLayer.find((entry) => entry[0] === 'config'),
      dataLayer.find((entry) => entry[0] === 'event' && entry[1] === 'page_view'),
    ]
  })
  expect(config?.[2]).toMatchObject({
    page_location: expectedCleanLocation,
    page_path: '/en/guide/',
    page_referrer: '',
    send_page_view: false,
  })
  expect(JSON.stringify(config)).not.toContain('private')
  expect(JSON.stringify(config)).not.toContain('never-send')
  expect(JSON.stringify(config)).not.toContain('__analytics_test')
  expect(pageView?.[2]).toMatchObject({
    page_location: expect.not.stringContaining('?'),
    page_path: '/en/guide/',
    page_referrer: '',
    content_group: 'guide',
    campaign_source: 'launchpad',
    campaign_medium: 'product',
    campaign_name: 'guide',
    entry_point: 'launchpad',
  })
  expect(JSON.stringify(pageView)).not.toContain('private')
  expect(JSON.stringify(pageView)).not.toContain('never-send')
  expect(JSON.stringify(pageView)).not.toContain('__analytics_test')

  await page.getByRole('button', { name: 'Cookie settings' }).click()
  await page.getByRole('button', { name: 'Decline all' }).click()
  expect(await page.evaluate(() => Reflect.get(window, 'ga-disable-G-TEST123456'))).toBe(true)
  expect(await page.evaluate(() => {
    const dataLayer = (window as Window & { dataLayer?: unknown[][] }).dataLayer ?? []
    return dataLayer.some((entry) => {
      const parameters = entry[2]
      return entry[0] === 'consent'
        && entry[1] === 'update'
        && typeof parameters === 'object'
        && parameters !== null
        && 'analytics_storage' in parameters
        && parameters.analytics_storage === 'denied'
    })
  })).toBe(true)
})

test('the consent dialog offers three choices immediately and keeps cookie settings available', async ({ page }) => {
  await page.goto('/en/guide/?__analytics_test=1')

  const dialog = page.getByRole('dialog', { name: 'Help us improve the documentation?' })
  await expect(dialog).toBeVisible()
  await expect(dialog.getByRole('button', { name: 'Allow all' })).toBeVisible()
  await expect(dialog.getByRole('button', { name: 'Only necessary' })).toBeVisible()
  await expect(dialog.getByRole('button', { name: 'Decline all' })).toBeVisible()
  await expect(dialog.getByText('Necessary cookies', { exact: true })).toBeVisible()
  await expect(dialog.getByText('Analytics cookies', { exact: true })).toBeVisible()

  await dialog.getByRole('button', { name: 'Allow all' }).focus()
  await page.keyboard.press('Tab')
  await expect(dialog.getByRole('link', { name: 'Privacy policy' })).toBeFocused()
  await page.keyboard.press('Shift+Tab')
  await expect(dialog.getByRole('button', { name: 'Allow all' })).toBeFocused()

  await dialog.getByRole('button', { name: 'Only necessary' }).click()
  await expect(dialog).toBeHidden()
  await expect(page.getByRole('button', { name: 'Cookie settings' })).toBeVisible()

  await page.getByRole('button', { name: 'Cookie settings' }).click()
  await expect(dialog).toBeVisible()
  await dialog.getByRole('button', { name: 'Decline all' }).click()
  await expect(dialog).toBeHidden()
  expect(await page.evaluate(() => localStorage.getItem('lazurio_documentation_analytics_consent_v1'))).toContain('rejected')
})

test('the Guide, work tips and real application visuals are available in both locales', async ({ page }) => {
  for (const locale of ['en', 'cs']) {
    await page.goto(`/${locale}/guide/`)
    await expect(page.getByRole('heading', { level: 1, name: 'Guide' })).toBeVisible()

    const glossaryName = locale === 'cs' ? 'Slovníček pojmů' : 'Glossary'
    await page.getByRole('link', { name: new RegExp(`^${glossaryName}`) }).first().click()
    await expect(page.getByText('MCP server', { exact: true })).toBeVisible()

    await page.goto(`/${locale}/guide/`)
    const tipsName = locale === 'cs' ? 'Tipy pro práci' : 'Tips for working'
    await page.getByRole('link', { name: new RegExp(`^${tipsName}`) }).first().click()
    await expect(page).toHaveURL(new RegExp(`/${locale}/guide/work-tips/$`))
    await expect(page.getByText('Browser Use', { exact: true })).toBeVisible()

    await page.goto(`/${locale}/guide/recommended-apps/`)
    for (const app of ['Wispr Flow', 'CodexBar', 'Amphetamine']) {
      const image = page.getByRole('img', { name: app })
      await expect(image).toBeVisible()
      await expect.poll(() => image.evaluate((element) => (element as HTMLImageElement).naturalWidth)).toBeGreaterThan(0)
    }
    await expect(page.getByRole('heading', { name: 'Browser Use' })).toHaveCount(0)
  }
})

test('consented Guide app clicks include Amphetamine but not Browser Use tips', async ({ page }) => {
  await page.route('https://www.googletagmanager.com/**', (route) => route.fulfill({ status: 204, body: '' }))
  await page.goto('/en/guide/recommended-apps/?__analytics_test=1')
  await page.getByRole('button', { name: 'Allow all' }).click()

  const appEvent = await page.evaluate(() => {
    const link = document.querySelector('a[data-analytics-app="amphetamine"]')
    if (!(link instanceof HTMLAnchorElement)) throw new Error('Amphetamine link is missing')
    link.addEventListener('click', (event) => event.preventDefault(), { once: true })
    link.click()
    const dataLayer = (window as Window & { dataLayer?: unknown[][] }).dataLayer ?? []
    return dataLayer.find((entry) => entry[0] === 'event' && entry[1] === 'guide_app_click')
  })
  expect(appEvent?.[2]).toMatchObject({ app: 'amphetamine', content_group: 'guide' })

  // Browser Use is a capability of the Colleague's own tool, not a product:
  // the work tip must not link out to a third-party site or carry a click event.
  await page.goto('/en/guide/work-tips/?__analytics_test=1')
  await expect(page.getByText('Browser Use', { exact: true })).toBeVisible()
  await expect(page.locator('a[href*="browser-use.com"]')).toHaveCount(0)
  await expect(page.locator('main a[data-analytics-event]')).toHaveCount(0)
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
    'Guide',
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
  const languageMenu = page.locator('lz-language-menu:visible')
  await languageMenu.locator('summary').click()
  await languageMenu.getByRole('link', { name: 'Čeština', exact: true }).click()

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

  const czechMenu = page.locator('lz-language-menu:visible')
  await czechMenu.locator('summary').click()
  await expect(czechMenu.getByRole('link', { name: 'Čeština', exact: true })).toHaveAttribute('aria-current', 'true')
  await czechMenu.getByRole('link', { name: 'English', exact: true }).click()

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
    'Guide',
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


test('GA4 redacts unknown paths and referrers on synthetic 404 pages', async ({ page }) => {
  const marker = 'person%40example.invalid'
  const requests: string[] = []
  await page.route('https://www.googletagmanager.com/**', async (route) => {
    requests.push(route.request().url())
    await route.fulfill({ status: 204, body: '' })
  })
  const response = await page.goto(`/en/guide/${marker}/?__analytics_test=1#${marker}`, {
    referer: `https://example.invalid/private/${marker}`,
  })
  expect(response?.status()).toBe(404)
  expect(requests).toEqual([])
  await page.getByRole('button', { name: 'Allow all' }).click()
  await expect.poll(() => requests.length).toBe(1)
  const entries = await page.evaluate(() =>
    Array.from((window as Window & { dataLayer?: unknown[][] }).dataLayer ?? [], (entry) => Array.from(entry)),
  )
  const config = entries.find((entry) => entry[0] === 'config')
  const view = entries.find((entry) => entry[0] === 'event' && entry[1] === 'page_view')
  const safe = { page_location: `${new URL(page.url()).origin}/404`, page_path: '/404', page_referrer: '' }
  expect(config?.[2]).toMatchObject({ ...safe, send_page_view: false })
  expect(view?.[2]).toMatchObject(safe)
  expect(JSON.stringify(entries)).not.toContain(marker)
  expect(JSON.stringify(entries)).not.toContain('person@example.invalid')
})

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

test('theme toggles directly and language disclosure supports keyboard dismissal', async ({ page }, testInfo) => {
  await page.emulateMedia({ colorScheme: 'light' })
  await page.goto('/cs/')
  const openMobileMenu = async () => {
    if (testInfo.project.name.startsWith('mobile')) {
      await page.locator('button[aria-controls="starlight__sidebar"]').click()
    }
  }
  await openMobileMenu()
  const theme = page.locator('lz-theme-toggle:visible button')
  const language = page.locator('lz-language-menu:visible')
  await expect(theme).toHaveAccessibleName('Přepnout na tmavý režim')
  await expect(page.locator('starlight-theme-select:visible')).toHaveCount(0)
  await theme.click()
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
  await expect(theme).toHaveAccessibleName('Přepnout na světlý režim')
  await expect(page.locator('.lz-theme-dark:visible')).toHaveCount(1)
  await page.reload()
  await openMobileMenu()
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
  await theme.press('Enter')
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light')
  await theme.press('Tab')
  await expect(language.locator('summary')).toBeFocused()
  await language.locator('summary').press('Enter')
  const selected = language.getByRole('link', { name: 'Čeština', exact: true })
  await expect(selected).toHaveAttribute('aria-current', 'true')
  await expect(selected).toBeInViewport()
  await selected.focus()
  await selected.press('Escape')
  await expect(language.locator('details')).not.toHaveAttribute('open', '')
  await expect(language.locator('summary')).toBeFocused()
  await language.locator('summary').click()
  await theme.click()
  await expect(language.locator('details')).not.toHaveAttribute('open', '')
  const results = await new AxeBuilder({ page }).analyze()
  expect(results.violations.filter((v) => ['serious', 'critical'].includes(v.impact ?? ''))).toEqual([])
})

test('articles align with the content edge across viewport sizes', async ({ page }) => {
  for (const width of [320, 390, 768, 1024, 1440, 1920, 2560]) {
    await page.setViewportSize({ width, height: 900 })
    for (const route of ['/cs/', '/cs/guide/', '/cs/lazurio-vs-microsoft-copilot/', '/en/it-administrators/', '/cs/guide/recommended-apps/']) {
      await page.goto(route)
      const layout = await page.locator('.content-panel').first().evaluate((panel) => {
        const container = panel.querySelector('.sl-container')!
        return {
          inset: container.getBoundingClientRect().left - panel.getBoundingClientRect().left,
          padding: parseFloat(getComputedStyle(panel).paddingLeft),
          overflow: document.documentElement.scrollWidth - window.innerWidth,
        }
      })
      expect(Math.abs(layout.inset - layout.padding), `${width}: ${route}`).toBeLessThan(2)
      expect(layout.overflow, `${width}: ${route}`).toBeLessThanOrEqual(1)
    }
  }
})

test('article contents stay in a right column on laptops and collapse on mobile', async ({ page }, testInfo) => {
  if (testInfo.project.name.startsWith('mobile')) {
    await page.goto('/cs/agents/')
    await expect(page.locator('.right-sidebar-panel')).not.toBeVisible()
    await page.locator('#starlight__on-this-page--mobile').click()
    await page.locator('mobile-starlight-toc').getByRole('link', { name: 'Plánovaný MCP server' }).click()
    await expect(page.getByRole('heading', { name: 'Plánovaný MCP server', exact: true })).toBeInViewport()
    return
  }

  for (const width of [1024, 1440]) {
    await page.setViewportSize({ width, height: 900 })
    await page.goto('/cs/agents/')
    const toc = page.locator('.right-sidebar-panel')
    await expect(toc).toBeVisible()
    await expect(page.locator('mobile-starlight-toc')).not.toBeVisible()
    const articleBox = await page.locator('main').boundingBox()
    const tocBox = await toc.boundingBox()
    expect(tocBox!.x).toBeGreaterThanOrEqual(articleBox!.x + articleBox!.width)
    await toc.getByRole('link', { name: 'Jak obsah najít a načíst' }).click()
    await expect(page.getByRole('heading', { name: 'Jak obsah najít a načíst', exact: true })).toBeInViewport()
    await expect(toc.getByRole('link', { name: 'Jak obsah najít a načíst' })).toHaveAttribute('aria-current', 'true')
    await expect(toc).toBeInViewport()
  }
})
