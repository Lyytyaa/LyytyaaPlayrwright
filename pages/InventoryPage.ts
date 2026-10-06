import { Page, Locator } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly title: Locator;
  readonly cartLink: Locator;
  readonly cartBadge: Locator;
  readonly sortDropdown: Locator;
  readonly itemNames: Locator;
  readonly itemPrices: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator('[data-test="title"]');
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.itemNames = page.locator('[data-test="inventory-item-name"]');
    this.itemPrices = page.locator('[data-test="inventory-item-price"]');
  }

  getProductContainer(productName: string): Locator {
    return this.page
      .locator('[data-test="inventory-item"]')
      .filter({ hasText: productName });
  }

  async addItemToCart(productName: string) {
    const product = this.getProductContainer(productName);
    await product.getByRole('button', { name: 'Add to cart' }).click();
  }

  async goToCart() {
    await this.cartLink.click();
  }

  async sortProducts(sortOption: string) {
    await this.sortDropdown.selectOption(sortOption);
  }

  async getAllProductNames(): Promise<string[]> {
    return await this.itemNames.allTextContents();
  }

  async getAllProductPrices(): Promise<number[]> {
    const prices = await this.itemPrices.allTextContents();
    return prices.map((price) => parseFloat(price.replace('$', '')));
  }
}
