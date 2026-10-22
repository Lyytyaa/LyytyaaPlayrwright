/**
 * Centralized locator selectors for the Product Detail page.
 */
export const productDetailLocators = {
  productName: '[data-test="inventory-item-name"]',
  productDescription: '[data-test="inventory-item-desc"]',
  productPrice: '[data-test="inventory-item-price"]',
  addToCartButton: '[data-test^="add-to-cart"]',
  removeButton: '[data-test^="remove"]',
  backButton: '[data-test="back-to-products"]',
  cartBadge: '[data-test="shopping-cart-badge"]',
} as const;
