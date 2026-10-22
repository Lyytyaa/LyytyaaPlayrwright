import { Page, Locator } from '@playwright/test';
import { productDetailLocators } from '../locators/productDetailLocators';

export class ProductDetailPage {
  readonly page: Page;
  readonly productName: Locator;
  readonly productDescription: Locator;
  readonly productPrice: Locator;
  readonly addToCartButton: Locator;
  readonly removeButton: Locator;
  readonly backButton: Locator;
  readonly cartBadge: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productName = page.locator(productDetailLocators.productName);
    this.productDescription = page.locator(productDetailLocators.productDescription);
    this.productPrice = page.locator(productDetailLocators.productPrice);
    this.addToCartButton = page.locator(productDetailLocators.addToCartButton);
    this.removeButton = page.locator(productDetailLocators.removeButton);
    this.backButton = page.locator(productDetailLocators.backButton);
    this.cartBadge = page.locator(productDetailLocators.cartBadge);
  }

  async addToCart() {
    await this.addToCartButton.click();
  }

  async goBackToProducts() {
    await this.backButton.click();
  }
}
