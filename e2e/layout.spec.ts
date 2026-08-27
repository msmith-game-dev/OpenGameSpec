import { expect, test } from '@playwright/test'

/**
 * DESIGN.md commits the site to 360px. This is what enforces it.
 *
 * Horizontal overflow is the failure mode worth guarding: it is invisible in unit tests, invisible
 * at desktop width, and it does not throw. It shows up as a page that scrolls sideways and elements
 * that collide — which is exactly how it reached production the first time.
 */

const WIDTHS = [360, 390, 768, 1280, 1440] as const
const ROUTES = ['/', '/specifications', '/specifications/openquest', '/specifications/opendialog']

test.describe('no horizontal overflow', () => {
  for (const width of WIDTHS) {
    for (const route of ROUTES) {
      test(`${route} at ${width}px`, async ({ page }) => {
        await page.setViewportSize({ width, height: 900 })
        await page.goto(route)
        await page.evaluate(() => document.fonts.ready)

        const { scrollWidth, clientWidth } = await page.evaluate(() => ({
          scrollWidth: document.documentElement.scrollWidth,
          clientWidth: document.documentElement.clientWidth,
        }))

        expect(
          scrollWidth,
          `${route} scrolls horizontally at ${width}px — something is wider than the viewport`,
        ).toBeLessThanOrEqual(clientWidth)
      })
    }
  }
})

test.describe('the nav survives narrow viewports', () => {
  test('wordmark and links never collide', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 900 })
    await page.goto('/')
    await page.evaluate(() => document.fonts.ready)

    const collision = await page.evaluate(() => {
      const brand = document.querySelector('header a')?.getBoundingClientRect()
      const links = document.querySelector('header nav > div:last-child')?.getBoundingClientRect()
      if (!brand || !links) return null
      return brand.right > links.left + 0.5
    })

    expect(collision, 'the brand overlaps the nav links').toBe(false)
  })
})

test.describe('the figure stays inside its box', () => {
  test('the JSON tab is visible, not clipped by the scroll track', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 })
    await page.goto('/')

    const tab = page.getByText('JSON', { exact: true })
    await expect(tab).toBeInViewport()

    // The tab must sit within the bordered figure, not at the scrolling content's right edge.
    const inside = await page.evaluate(() => {
      const el = [...document.querySelectorAll('span')].find((s) => s.textContent === 'JSON')
      const box = el?.closest('figure')?.querySelector('div')
      if (!el || !box) return null
      const t = el.getBoundingClientRect()
      const b = box.getBoundingClientRect()
      return t.right <= b.right + 1 && t.left >= b.left - 1
    })

    expect(inside, 'the JSON tab escapes the figure').toBe(true)
  })
})

test.describe('specifications without a schema do not overpromise', () => {
  test('a scaffolded spec says so, and never says coming soon', async ({ page }) => {
    await page.goto('/specifications/opendialog')

    // The repository is real, so the link belongs. The format is not, so the page must say it.
    await expect(page.getByText('No schema yet').first()).toBeVisible()
    await expect(page.getByRole('link', { name: 'View the repository' })).toHaveCount(1)
    await expect(page.locator('body')).not.toContainText(/coming soon/i)
  })

  test('the landing page counts only specifications with a schema as published', async ({
    page,
  }) => {
    await page.goto('/')
    await expect(page.getByText(/1 published · 2 without a schema/)).toBeVisible()
  })
})
