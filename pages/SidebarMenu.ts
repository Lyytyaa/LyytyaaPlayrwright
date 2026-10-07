import { Page, Locator } from '@playwright/test';

export class SidebarMenu {
  readonly page: Page;

  // Header & Drawer Buttons
  readonly openButton: Locator;
  readonly closeButton: Locator;

  // Main Menu Links
  readonly allItemsLink: Locator;
  readonly aboutLink: Locator;
  readonly logoutLink: Locator;
  readonly resetAppStateLink: Locator;

  // Dynamic Catalog Submenu Links
  readonly dynamicCatalogLink: Locator;
  readonly dynamicCatalogSubmenu: Locator;
  readonly lazyLoadLink: Locator;
  readonly spinnerLink: Locator;
  readonly sliderLink: Locator;

  // Dynamic Catalog Page Elements
  readonly title: Locator;
  readonly lazyLoadContainer: Locator;
  readonly lazyLoadItems: Locator;
  readonly spinnerContainer: Locator;
  readonly spinner: Locator;
  readonly spinnerItems: Locator;
  readonly sliderContainer: Locator;
  readonly sliderItem: Locator;
  readonly sliderItemName: Locator;
  readonly sliderItemPrice: Locator;
  readonly sliderDots: Locator;

  constructor(page: Page) {
    this.page = page;

    // Header & Drawer
    this.openButton = page.locator('#react-burger-menu-btn');
    this.closeButton = page.locator('#react-burger-cross-btn');

    // Main Menu
    this.allItemsLink = page.locator('[data-test="inventory-sidebar-link"]');
    this.aboutLink = page.locator('[data-test="about-sidebar-link"]');
    this.logoutLink = page.locator('[data-test="logout-sidebar-link"]');
    this.resetAppStateLink = page.locator('[data-test="reset-sidebar-link"]');

    // Dynamic Catalog Submenu
    this.dynamicCatalogLink = page.locator('[data-test="dynamic-catalog-sidebar-link"]');
    this.dynamicCatalogSubmenu = page.locator('[data-test="dynamic-catalog-submenu"]');
    this.lazyLoadLink = page.locator('[data-test="dynamic-catalog-lazy-load-link"]');
    this.spinnerLink = page.locator('[data-test="dynamic-catalog-spinner-link"]');
    this.sliderLink = page.locator('[data-test="dynamic-catalog-slider-link"]');

    // Dynamic Catalog Page Elements
    this.title = page.locator('[data-test="title"]');
    this.lazyLoadContainer = page.locator('[data-test="dynamic-catalog-lazy-load-container"]');
    this.lazyLoadItems = page.locator('[data-test^="lazy-load-item-"]');
    this.spinnerContainer = page.locator('[data-test="dynamic-catalog-spinner-container"]');
    this.spinner = page.locator('[data-test="dynamic-catalog-spinner"]');
    this.spinnerItems = page.locator('[data-test^="spinner-item-"]');
    this.sliderContainer = page.locator('[data-test="dynamic-catalog-slider-container"]');
    this.sliderItem = page.locator('[data-test="dynamic-catalog-slider-item"]');
    this.sliderItemName = page.locator('[data-test="dynamic-catalog-slider-item-name"]');
    this.sliderItemPrice = page.locator('[data-test="dynamic-catalog-slider-item-price"]');
    this.sliderDots = page.locator('[data-test^="dynamic-catalog-slider-dot-"]');
  }

  // --- Drawer Actions ---
  async open() {
    await this.openButton.click();
    await this.allItemsLink.waitFor({ state: 'visible' });
  }

  async close() {
    await this.closeButton.click();
    await this.allItemsLink.waitFor({ state: 'hidden' });
  }

  async clickAllItems() {
    await this.allItemsLink.click();
  }

  async clickAbout() {
    await this.aboutLink.click();
  }

  async clickLogout() {
    await this.logoutLink.click();
  }

  async clickResetAppState() {
    await this.resetAppStateLink.click();
  }

  // --- Dynamic Catalog Submenu Actions ---
  async openDynamicCatalogSubmenu() {
    await this.dynamicCatalogLink.click();
    await this.dynamicCatalogSubmenu.waitFor({ state: 'visible' });
  }

  async clickLazyLoad() {
    await this.lazyLoadLink.click();
  }

  async clickSpinner() {
    await this.spinnerLink.click();
  }

  async clickSlider() {
    await this.sliderLink.click();
  }

  // --- Dynamic Catalog Page Actions ---
  async scrollToBottom() {
    await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  }

  async getLazyLoadItemCount(): Promise<number> {
    return await this.lazyLoadItems.count();
  }

  async waitForSpinnerToDisappear(timeout: number = 10000) {
    await this.spinner.waitFor({ state: 'detached', timeout });
  }

  async clickDot(index: number) {
    await this.page.locator(`[data-test="dynamic-catalog-slider-dot-${index}"]`).click();
  }

  async getCurrentSlideProductName(): Promise<string> {
    return await this.sliderItemName.innerText();
  }
}
