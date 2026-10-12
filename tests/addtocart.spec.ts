import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { testData } from '../data/testData';

test.describe('Add to Cart & Checkout Flow', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);

    await loginPage.goto();
    const { username, password } = testData.users.standard;
    await loginPage.login(username, password);
  });

  test('TC-001 : Add to Cart & Complete Checkout Positive', async () => {
    const productName = testData.products.backpack;
    const { firstName, lastName, postalCode } = testData.checkout;

    // 1. Tambah produk ke keranjang belanja
    await inventoryPage.addItemToCart(productName);
    await expect(inventoryPage.cartBadge).toHaveText('1');

    // 2. Masuk ke keranjang belanja dan verifikasi item
    await inventoryPage.goToCart();
    await expect(cartPage.getItem(productName)).toBeVisible();

    // 3. Masuk ke tahap checkout dan isi data pengiriman
    await cartPage.proceedToCheckout();
    await checkoutPage.fillInformation(firstName, lastName, postalCode);
    await checkoutPage.continue();

    // 4. Selesaikan pesanan dan verifikasi pesan sukses
    await checkoutPage.finish();
    await expect(checkoutPage.completeHeader).toBeVisible();
    await expect(checkoutPage.completeHeader).toHaveText(testData.successMessages.orderComplete);
  });

  test('TC-002 : Checkout Negative - Blank Information Form', async () => {
    const productName = testData.products.backpack;

    await inventoryPage.addItemToCart(productName);
    await inventoryPage.goToCart();
    await cartPage.proceedToCheckout();

    // Klik continue tanpa mengisi form data diri
    await checkoutPage.continue();

    await expect(checkoutPage.errorMessage).toBeVisible();
    await expect(checkoutPage.errorMessage).toContainText(testData.errorMessages.firstNameRequired);
  });

  test('TC-003 : Checkout Negative - Last Name Kosong', async () => {
    const productName = testData.products.backpack;
    const { firstName, postalCode } = testData.checkout;

    await inventoryPage.addItemToCart(productName);
    await inventoryPage.goToCart();
    await cartPage.proceedToCheckout();

    // Isi First Name & Postal Code, tapi Last Name dibiarkan kosong
    await checkoutPage.fillInformation(firstName, undefined, postalCode);
    await checkoutPage.continue();

    await expect(checkoutPage.errorMessage).toBeVisible();
    await expect(checkoutPage.errorMessage).toContainText(testData.errorMessages.lastNameRequired);
  });

  test('TC-004 : Checkout Negative - Postal Code Kosong', async () => {
    const productName = testData.products.backpack;
    const { firstName, lastName } = testData.checkout;

    await inventoryPage.addItemToCart(productName);
    await inventoryPage.goToCart();
    await cartPage.proceedToCheckout();

    // Isi First Name & Last Name, tapi Postal Code dibiarkan kosong
    await checkoutPage.fillInformation(firstName, lastName, undefined);
    await checkoutPage.continue();

    await expect(checkoutPage.errorMessage).toBeVisible();
    await expect(checkoutPage.errorMessage).toContainText(testData.errorMessages.postalCodeRequired);
  });

  test('TC-005 : Remove Item from Inventory Page', async () => {
    const productName = testData.products.backpack;

    // Add item dulu
    await inventoryPage.addItemToCart(productName);
    await expect(inventoryPage.cartBadge).toHaveText('1');

    // Remove item dari inventory
    await inventoryPage.removeItemFromCart(productName);

    // Bukti: badge cart hilang setelah item di-remove
    await expect(inventoryPage.cartBadge).not.toBeVisible();
  });

  test('TC-006 : Remove Item from Cart Page', async () => {
    const productName = testData.products.backpack;

    // Add item dan masuk ke cart
    await inventoryPage.addItemToCart(productName);
    await inventoryPage.goToCart();
    await expect(cartPage.getItem(productName)).toBeVisible();

    // Remove dari cart page
    await cartPage.removeItem(productName);

    // Bukti: item tidak lagi tampil di cart
    await expect(cartPage.getItem(productName)).not.toBeVisible();
  });

  test('TC-007 : Add Multiple Items to Cart', async () => {
    const backpack = testData.products.backpack;
    const bikeLight = testData.products.bikeLight;

    // Tambah 2 produk berbeda
    await inventoryPage.addItemToCart(backpack);
    await inventoryPage.addItemToCart(bikeLight);

    // Bukti: badge cart menunjukkan angka 2
    await expect(inventoryPage.cartBadge).toHaveText('2');

    // Bukti: kedua item ada di cart
    await inventoryPage.goToCart();
    await expect(cartPage.getItem(backpack)).toBeVisible();
    await expect(cartPage.getItem(bikeLight)).toBeVisible();
  });
});