import { Page, Locator } from '@playwright/test';
import { cartLocators } from '../locators/cartLocators';

export class CartPage {
  readonly page: Page;
  readonly checkoutButton: Locator;
  readonly continueShoppingButton: Locator;
  readonly cartItems: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkoutButton = page.locator(cartLocators.checkoutButton);
    this.continueShoppingButton = page.locator(cartLocators.continueShoppingButton);
    this.cartItems = page.locator(cartLocators.inventoryItem);
  }

  getItem(productName: string): Locator {
    return this.page
      .locator(cartLocators.inventoryItem)
      .filter({ hasText: productName });
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }

  async continueShopping() {
    await this.continueShoppingButton.click();
  }

  async removeItem(productName: string) {
    const item = this.getItem(productName);
    await item.getByRole('button', { name: cartLocators.removeButton }).click();
  }
}
