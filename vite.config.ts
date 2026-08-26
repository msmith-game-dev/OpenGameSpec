import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'],
    // e2e/ is Playwright's. Vitest's default include would otherwise pick up *.spec.ts
    // and try to run browser tests in jsdom.
    exclude: ['**/node_modules/**', '**/dist/**', 'e2e/**'],
  },
})
