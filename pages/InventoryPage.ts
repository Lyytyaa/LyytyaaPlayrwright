import { Page, Locator } from '@playwright/test';
import { inventoryLocators } from '../locators/inventoryLocators';

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
    this.title = page.locator(inventoryLocators.title);
    this.cartLink = page.locator(inventoryLocators.cartLink);
    this.cartBadge = page.locator(inventoryLocators.cartBadge);
    this.sortDropdown = page.locator(inventoryLocators.sortDropdown);
    this.itemNames = page.locator(inventoryLocators.itemName);
    this.itemPrices = page.locator(inventoryLocators.itemPrice);
  }

  getProductContainer(productName: string): Locator {
    return this.page
      .locator(inventoryLocators.inventoryItem)
      .filter({ hasText: productName });
  }

  async addItemToCart(productName: string) {
    const product = this.getProductContainer(productName);
    await product.getByRole('button', { name: inventoryLocators.addToCartButton }).click();
  }

  async removeItemFromCart(productName: string) {
    const product = this.getProductContainer(productName);
    await product.getByRole('button', { name: inventoryLocators.removeButton }).click();
  }

  async clickProductName(productName: string) {
    await this.page.locator(inventoryLocators.itemName, { hasText: productName }).click();
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
