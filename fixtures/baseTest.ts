import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { ProductDetailPage } from '../pages/ProductDetailPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { SidebarMenu } from '../pages/SidebarMenu';
import { testData } from '../data/testData';

/**
 * Type definition for all page-object fixtures.
 */
export type PageFixtures = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  productDetailPage: ProductDetailPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  sidebarMenu: SidebarMenu;
};

/**
 * Base test with all page objects pre-initialized.
 * Use this in spec files that do NOT require auto-login.
 */
export const test = base.extend<PageFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },
  productDetailPage: async ({ page }, use) => {
    await use(new ProductDetailPage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },
  sidebarMenu: async ({ page }, use) => {
    await use(new SidebarMenu(page));
  },
});

/**
 * Authenticated test fixture — automatically navigates to the login page
 * and logs in as the standard user before each test.
 * Use this for any test that requires being logged in.
 */
export const authenticatedTest = base.extend<PageFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },
  productDetailPage: async ({ page }, use) => {
    await use(new ProductDetailPage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },
  sidebarMenu: async ({ page }, use) => {
    await use(new SidebarMenu(page));
  },

  // Override the page fixture to auto-login before each test
  page: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    const { username, password } = testData.users.standard;
    await loginPage.login(username, password);
    await use(page);
  },
});

export { expect } from '@playwright/test';
