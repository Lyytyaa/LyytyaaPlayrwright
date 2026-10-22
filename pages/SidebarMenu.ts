import { Page, Locator } from '@playwright/test';
import { sidebarLocators } from '../locators/sidebarLocators';

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
    this.openButton = page.locator(sidebarLocators.openButton);
    this.closeButton = page.locator(sidebarLocators.closeButton);

    // Main Menu
    this.allItemsLink = page.locator(sidebarLocators.allItemsLink);
    this.aboutLink = page.locator(sidebarLocators.aboutLink);
    this.logoutLink = page.locator(sidebarLocators.logoutLink);
    this.resetAppStateLink = page.locator(sidebarLocators.resetAppStateLink);

    // Dynamic Catalog Submenu
    this.dynamicCatalogLink = page.locator(sidebarLocators.dynamicCatalogLink);
    this.dynamicCatalogSubmenu = page.locator(sidebarLocators.dynamicCatalogSubmenu);
    this.lazyLoadLink = page.locator(sidebarLocators.lazyLoadLink);
    this.spinnerLink = page.locator(sidebarLocators.spinnerLink);
    this.sliderLink = page.locator(sidebarLocators.sliderLink);

    // Dynamic Catalog Page Elements
    this.title = page.locator(sidebarLocators.title);
    this.lazyLoadContainer = page.locator(sidebarLocators.lazyLoadContainer);
    this.lazyLoadItems = page.locator(sidebarLocators.lazyLoadItems);
    this.spinnerContainer = page.locator(sidebarLocators.spinnerContainer);
    this.spinner = page.locator(sidebarLocators.spinner);
    this.spinnerItems = page.locator(sidebarLocators.spinnerItems);
    this.sliderContainer = page.locator(sidebarLocators.sliderContainer);
    this.sliderItem = page.locator(sidebarLocators.sliderItem);
    this.sliderItemName = page.locator(sidebarLocators.sliderItemName);
    this.sliderItemPrice = page.locator(sidebarLocators.sliderItemPrice);
    this.sliderDots = page.locator(sidebarLocators.sliderDots);
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
    await this.page.locator(sidebarLocators.sliderDotByIndex(index)).click();
  }

  async getCurrentSlideProductName(): Promise<string> {
    return await this.sliderItemName.innerText();
  }
}
