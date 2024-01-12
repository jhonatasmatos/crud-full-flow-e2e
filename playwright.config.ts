import { defineConfig } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  reporter: 'html',
  timeout: 30 * 1000,
  expect: {
    timeout: 5000
  },

  use: {
    browserName: 'chromium',
    headless: true,
    screenshot: 'on',
    trace: 'on'
  },
});
