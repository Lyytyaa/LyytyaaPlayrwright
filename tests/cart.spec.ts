import { expect } from '@playwright/test';
import { authenticatedTest as test } from '../fixtures/baseTest';
import { testData } from '../data/testData';

test.describe('Cart Management Tests', () => {
  test('TC-001 : Cart Kosong - Tidak Ada Item di Cart', async ({ page, inventoryPage, cartPage }) => {
    // Langsung masuk ke cart tanpa add item
    await inventoryPage.goToCart();

    await expect(page).toHaveURL(/cart.html/);

    // Bukti: tidak ada item di cart
    const itemCount = await cartPage.cartItems.count();
    expect(itemCount).toBe(0);

    // Bukti: badge cart tidak terlihat
    await expect(inventoryPage.cartBadge).not.toBeVisible();
  });

  test('TC-002 : Continue Shopping dari Cart Kembali ke Inventory', async ({ page, inventoryPage, cartPage }) => {
    // Masuk ke cart
    await inventoryPage.goToCart();
    await expect(page).toHaveURL(/cart.html/);

    // Klik Continue Shopping
    await cartPage.continueShopping();

    // Bukti: kembali ke halaman inventory
    await expect(page).toHaveURL(/inventory.html/);
    await expect(inventoryPage.title).toHaveText('Products');
  });

  test('TC-003 : Add 2 Item Lalu Remove 1 - Badge Update', async ({ inventoryPage }) => {
    const backpack = testData.products.backpack;
    const bikeLight = testData.products.bikeLight;

    // Tambah 2 item
    await inventoryPage.addItemToCart(backpack);
    await inventoryPage.addItemToCart(bikeLight);
    await expect(inventoryPage.cartBadge).toHaveText('2');

    // Remove 1 item
    await inventoryPage.removeItemFromCart(backpack);

    // Bukti: badge berkurang menjadi 1
    await expect(inventoryPage.cartBadge).toHaveText('1');
  });

  test('TC-004 : Add 3 Item - Badge Menunjukkan Angka 3', async ({ inventoryPage }) => {
    const backpack = testData.products.backpack;
    const bikeLight = testData.products.bikeLight;
    const boltTShirt = testData.products.boltTShirt;

    // Tambah 3 produk berbeda
    await inventoryPage.addItemToCart(backpack);
    await inventoryPage.addItemToCart(bikeLight);
    await inventoryPage.addItemToCart(boltTShirt);

    // Bukti: badge cart menunjukkan angka 3
    await expect(inventoryPage.cartBadge).toHaveText('3');
  });

  test('TC-005 : Verify Cart Persists After Navigation', async ({ inventoryPage, cartPage }) => {
    const productName = testData.products.backpack;

    // Add item ke cart
    await inventoryPage.addItemToCart(productName);
    await expect(inventoryPage.cartBadge).toHaveText('1');

    // Navigate ke cart lalu kembali ke inventory via Continue Shopping
    await inventoryPage.goToCart();
    await cartPage.continueShopping();

    // Bukti: badge cart masih tetap ada setelah navigasi
    await expect(inventoryPage.cartBadge).toHaveText('1');
  });
});
