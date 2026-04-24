import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  // API tests don't need UI
  use: {
    baseURL: 'https://petstore.swagger.io/v2',

    // No browser needed
    extraHTTPHeaders: {
      'Content-Type': 'application/json',
    },
  },

  // Faster execution for API
  fullyParallel: true,

  // Fail fast in CI
  forbidOnly: !!process.env.CI,

  retries: process.env.CI ? 2 : 0,

  workers: process.env.CI ? 2 : undefined,

  reporter: [
    ['list'],
    ['html']
  ],

  timeout: 15000,
});