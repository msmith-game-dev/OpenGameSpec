import { defineConfig, devices } from '@playwright/test'

/**
 * End-to-end layout checks.
 *
 * These exist because the site shipped a horizontal-overflow bug that every unit test passed
 * through: `min-width: auto` on a grid child let the annotated document widen the whole page, which
 * collided the nav wordmark with the links at 360px. DESIGN.md claims the site is responsive to
 * 360px, and nothing enforced it.
 *
 * Runs against a production build rather than the dev server, so what is asserted is what deploys.
 *
 * Chromium is the default. Where its download is blocked, set PLAYWRIGHT_CHANNEL=msedge (or chrome)
 * to drive an already-installed browser instead.
 */
const channel = process.env.PLAYWRIGHT_CHANNEL

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? 'github' : 'list',

  use: {
    baseURL: 'http://localhost:4173',
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], ...(channel ? { channel } : {}) },
    },
  ],

  webServer: {
    command: 'npm run build && npx vite preview --port 4173 --strictPort',
    url: 'http://localhost:4173',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
})
