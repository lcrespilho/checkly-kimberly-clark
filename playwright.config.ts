import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testMatch: '**/*.spec.ts',
  fullyParallel: true,
  workers: 4,
  reporter: 'html',
  use: {
    viewport: { width: 1440, height: 1080 },
    // trace: 'on',
    // video: 'on',
    // screenshot: 'on'
  }
})
