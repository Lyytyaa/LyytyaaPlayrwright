import { expect } from '@playwright/test';
import { authenticatedTest as test } from '../fixtures/baseTest';
import { testData } from '../data/testData';

test.describe('Product Detail Page Tests', () => {
  test('TC-001 : Klik Nama Produk Masuk ke Halaman Detail', async ({ page, inventoryPage, productDetailPage }) => {
    const productName = testData.products.backpack;

    // Klik nama produk dari halaman inventory
    await inventoryPage.clickProductName(productName);

    // Bukti: URL berubah ke halaman detail produk
    await expect(page).toHaveURL(/inventory-item.html/);

    // Bukti: nama dan harga produk tampil di halaman detail
    await expect(productDetailPage.productName).toBeVisible();
    await expect(productDetailPage.productName).toHaveText(productName);
    await expect(productDetailPage.productPrice).toBeVisible();
  });

  test('TC-002 : Add to Cart dari Halaman Detail Produk', async ({ inventoryPage, productDetailPage }) => {
    const productName = testData.products.backpack;

    // Masuk ke halaman detail
    await inventoryPage.clickProductName(productName);

    // Add to cart dari halaman detail
    await productDetailPage.addToCart();

    // Bukti: badge cart menunjukkan angka 1
    await expect(productDetailPage.cartBadge).toHaveText('1');

    // Bukti: tombol berubah menjadi "Remove"
    await expect(productDetailPage.removeButton).toBeVisible();
  });

  test('TC-003 : Tombol Back to Products Berfungsi', async ({ page, inventoryPage, productDetailPage }) => {
    const productName = testData.products.backpack;

    // Masuk ke halaman detail
    await inventoryPage.clickProductName(productName);
    await expect(page).toHaveURL(/inventory-item.html/);

    // Klik tombol back
    await productDetailPage.goBackToProducts();

    // Bukti: kembali ke halaman inventory
    await expect(page).toHaveURL(/inventory.html/);
    await expect(inventoryPage.title).toHaveText('Products');
  });

  test('TC-004 : Halaman Detail Tampilkan Deskripsi Produk', async ({ inventoryPage, productDetailPage }) => {
    const productName = testData.products.backpack;

    // Masuk ke halaman detail
    await inventoryPage.clickProductName(productName);

    // Bukti: deskripsi produk tampil
    await expect(productDetailPage.productDescription).toBeVisible();
    const descriptionText = await productDetailPage.productDescription.textContent();
    expect(descriptionText?.trim().length).toBeGreaterThan(0);
  });
});
