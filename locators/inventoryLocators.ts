/**
 * Centralized locator selectors for the Inventory (Products) page.
 */
export const inventoryLocators = {
  title: '[data-test="title"]',
  cartLink: '[data-test="shopping-cart-link"]',
  cartBadge: '[data-test="shopping-cart-badge"]',
  sortDropdown: '[data-test="product-sort-container"]',
  inventoryItem: '[data-test="inventory-item"]',
  itemName: '[data-test="inventory-item-name"]',
  itemPrice: '[data-test="inventory-item-price"]',
  addToCartButton: 'Add to cart',
  removeButton: /remove/i,
} as const;
