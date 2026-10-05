import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

// 🔑 SUSAH-SUSAH DAHULU, LOAD .ENV DENGAN BENAR DAHULU!
dotenv.config({ path: path.resolve(__dirname, '.env') });

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