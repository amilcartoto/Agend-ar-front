import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,              // <── añade esta línea
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.js'],
  },
})
