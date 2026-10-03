import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './test', // Mengarah ke folder test kamu
  timeout: 60000,
  use: {
    headless: false, // Set true kalau mau running tanpa buka browser
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});