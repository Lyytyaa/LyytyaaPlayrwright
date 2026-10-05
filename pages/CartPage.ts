import { Page, Locator } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkoutButton = page.locator('[data-test="checkout"]');
  }

  getItem(productName: string): Locator {
    return this.page
      .locator('[data-test="inventory-item"]')
      .filter({ hasText: productName });
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }
}
