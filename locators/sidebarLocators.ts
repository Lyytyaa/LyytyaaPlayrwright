/**
 * Centralized locator selectors for the Sidebar Menu and Dynamic Catalog pages.
 */
export const sidebarLocators = {
  // Drawer toggle buttons
  openButton: '#react-burger-menu-btn',
  closeButton: '#react-burger-cross-btn',

  // Main menu links
  allItemsLink: '[data-test="inventory-sidebar-link"]',
  aboutLink: '[data-test="about-sidebar-link"]',
  logoutLink: '[data-test="logout-sidebar-link"]',
  resetAppStateLink: '[data-test="reset-sidebar-link"]',

  // Dynamic Catalog submenu
  dynamicCatalogLink: '[data-test="dynamic-catalog-sidebar-link"]',
  dynamicCatalogSubmenu: '[data-test="dynamic-catalog-submenu"]',
  lazyLoadLink: '[data-test="dynamic-catalog-lazy-load-link"]',
  spinnerLink: '[data-test="dynamic-catalog-spinner-link"]',
  sliderLink: '[data-test="dynamic-catalog-slider-link"]',

  // Dynamic Catalog page elements
  title: '[data-test="title"]',
  lazyLoadContainer: '[data-test="dynamic-catalog-lazy-load-container"]',
  lazyLoadItems: '[data-test^="lazy-load-item-"]',
  spinnerContainer: '[data-test="dynamic-catalog-spinner-container"]',
  spinner: '[data-test="dynamic-catalog-spinner"]',
  spinnerItems: '[data-test^="spinner-item-"]',
  sliderContainer: '[data-test="dynamic-catalog-slider-container"]',
  sliderItem: '[data-test="dynamic-catalog-slider-item"]',
  sliderItemName: '[data-test="dynamic-catalog-slider-item-name"]',
  sliderItemPrice: '[data-test="dynamic-catalog-slider-item-price"]',
  sliderDots: '[data-test^="dynamic-catalog-slider-dot-"]',
  sliderDotByIndex: (index: number) => `[data-test="dynamic-catalog-slider-dot-${index}"]`,
} as const;
