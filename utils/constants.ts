/**
 * Application-wide constants for SauceDemo.
 */
export const URLS = {
  base: 'https://www.saucedemo.com',
  inventory: '/inventory.html',
  cart: '/cart.html',
  checkout: '/checkout-step-one.html',
  checkoutOverview: '/checkout-step-two.html',
  checkoutComplete: '/checkout-complete.html',
  inventoryItem: '/inventory-item.html',
} as const;

export const SORT_VALUES = {
  nameAsc: 'az',
  nameDesc: 'za',
  priceAsc: 'lohi',
  priceDesc: 'hilo',
} as const;

export const TIMEOUTS = {
  short: 3000,
  default: 5000,
  long: 10000,
  spinner: 10000,
  lazyLoad: 7000,
  autoSlide: 8000,
} as const;
