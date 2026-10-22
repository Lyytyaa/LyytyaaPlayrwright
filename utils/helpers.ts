import { Page } from '@playwright/test';

/**
 * Utility helper functions shared across tests.
 */

/**
 * Parses a price string like "$29.99" and returns the numeric value.
 */
export function parsePriceString(priceText: string): number {
  return parseFloat(priceText.replace('$', '').trim());
}

/**
 * Returns true if the given array is sorted in ascending order.
 */
export function isSortedAscending(arr: (string | number)[]): boolean {
  return arr.every((val, i) => i === 0 || val >= arr[i - 1]);
}

/**
 * Returns true if the given array is sorted in descending order.
 */
export function isSortedDescending(arr: (string | number)[]): boolean {
  return arr.every((val, i) => i === 0 || val <= arr[i - 1]);
}

/**
 * Scrolls the page to the bottom to trigger lazy-loading.
 */
export async function scrollToBottom(page: Page): Promise<void> {
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
}

/**
 * Waits for a locator count to exceed a threshold within a timeout.
 * Used for polling-based assertions (e.g. lazy load count growth).
 */
export async function waitForCountToExceed(
  page: Page,
  selector: string,
  threshold: number,
  timeout: number = 7000,
): Promise<number> {
  const start = Date.now();
  while (Date.now() - start < timeout) {
    const count = await page.locator(selector).count();
    if (count > threshold) return count;
    await page.waitForTimeout(300);
  }
  throw new Error(`Count did not exceed ${threshold} within ${timeout}ms`);
}
