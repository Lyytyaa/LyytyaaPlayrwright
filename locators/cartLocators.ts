/**
 * Centralized locator selectors for the Cart page.
 */
export const cartLocators = {
  checkoutButton: '[data-test="checkout"]',
  continueShoppingButton: '[data-test="continue-shopping"]',
  inventoryItem: '[data-test="inventory-item"]',
  removeButton: /remove/i,
} as const;
