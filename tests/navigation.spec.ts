import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { SidebarMenu } from '../pages/SidebarMenu';
import { testData } from '../data/testData';

test.describe('Sidebar Navigation & Dynamic Catalog Tests', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;
  let sidebarMenu: SidebarMenu;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    sidebarMenu = new SidebarMenu(page);

    // Login terlebih dahulu sebelum mengakses fitur sidebar
    await loginPage.goto();
    const { username, password } = testData.users.standard;
    await loginPage.login(username, password);
  });

  // --- 1. Skenario Menu Utama Sidebar ---

  test('TC-001 : Logout via Sidebar Menu', async ({ page }) => {
    await sidebarMenu.open();
    await sidebarMenu.clickLogout();

    // Bukti: diarahkan kembali ke halaman login dan tombol login terlihat
    await expect(page).toHaveURL('/');
    await expect(loginPage.loginButton).toBeVisible();
  });

  test('TC-002 : Navigate to All Items from Cart Page', async ({ page }) => {
    await inventoryPage.goToCart();
    await expect(page).toHaveURL(/cart.html/);

    await sidebarMenu.open();
    await sidebarMenu.clickAllItems();

    // Bukti: kembali ke halaman katalog produk (/inventory.html)
    await expect(page).toHaveURL(/inventory.html/);
    await expect(inventoryPage.title).toHaveText('Products');
  });

  test('TC-003 : Reset App State via Sidebar Menu', async () => {
    const productName = testData.products.backpack;

    // Tambah barang ke keranjang (badge cart menunjukkan angka 1)
    await inventoryPage.addItemToCart(productName);
    await expect(inventoryPage.cartBadge).toHaveText('1');

    // Lakukan Reset App State
    await sidebarMenu.open();
    await sidebarMenu.clickResetAppState();
    await sidebarMenu.close();

    // Bukti: badge cart hilang (keranjang kembali kosong)
    await expect(inventoryPage.cartBadge).not.toBeVisible();
  });

  test('TC-004 : Verify About Link in Sidebar Menu', async () => {
    await sidebarMenu.open();

    // Bukti: link About mengarah ke situs resmi Sauce Labs
    await expect(sidebarMenu.aboutLink).toBeVisible();
    await expect(sidebarMenu.aboutLink).toHaveAttribute('href', 'https://saucelabs.com/');
  });

  test('TC-005 : Open and Close Sidebar Menu', async () => {
    await sidebarMenu.open();
    await expect(sidebarMenu.allItemsLink).toBeVisible();

    await sidebarMenu.close();

    // Bukti: menu sidebar kembali tersembunyi
    await expect(sidebarMenu.allItemsLink).not.toBeVisible();
  });

  // --- 2. Skenario Submenu Dynamic Catalog ---

  test('TC-006 : Dynamic Catalog - Lazy Load (Infinite Scroll)', async ({ page }) => {
    await sidebarMenu.open();
    await sidebarMenu.openDynamicCatalogSubmenu();
    await sidebarMenu.clickLazyLoad();

    await expect(page).toHaveURL(/dynamic-catalog-lazy-load.html/);
    await expect(sidebarMenu.title).toHaveText('Dynamic Catalog - Lazy Load');

    // Hitung jumlah item awal
    const initialCount = await sidebarMenu.getLazyLoadItemCount();
    expect(initialCount).toBeGreaterThan(0);

    // Scroll ke bawah untuk memicu lazy load
    await sidebarMenu.scrollToBottom();

    // Bukti: jumlah produk bertambah secara dinamis
    await expect.poll(async () => {
      return await sidebarMenu.getLazyLoadItemCount();
    }, { timeout: 7000 }).toBeGreaterThan(initialCount);
  });

  test('TC-007 : Dynamic Catalog - Spinner Loading State', async ({ page }) => {
    await sidebarMenu.open();
    await sidebarMenu.openDynamicCatalogSubmenu();
    await sidebarMenu.clickSpinner();

    await expect(page).toHaveURL(/dynamic-catalog-spinner.html/);
    await expect(sidebarMenu.title).toHaveText('Dynamic Catalog - Spinner');

    // Tunggu hingga spinner loading selesai (detached)
    await sidebarMenu.waitForSpinnerToDisappear();

    // Bukti: produk katalog muncul setelah spinner selesai
    await expect(sidebarMenu.spinnerItems.first()).toBeVisible();
    const count = await sidebarMenu.spinnerItems.count();
    expect(count).toBeGreaterThan(0);
  });

  test('TC-008 : Dynamic Catalog - Slider Dot Navigation', async ({ page }) => {
    await sidebarMenu.open();
    await sidebarMenu.openDynamicCatalogSubmenu();
    await sidebarMenu.clickSlider();

    await expect(page).toHaveURL(/dynamic-catalog-slider.html/);
    await expect(sidebarMenu.title).toHaveText('Dynamic Catalog - Slider');

    const firstProduct = await sidebarMenu.getCurrentSlideProductName();
    expect(firstProduct).toBeTruthy();

    // Klik dot navigasi kedua
    await sidebarMenu.clickDot(1);

    // Bukti: tampilan produk bergeser ke produk lain
    await expect.poll(async () => {
      return await sidebarMenu.getCurrentSlideProductName();
    }, { timeout: 5000 }).not.toBe(firstProduct);
  });

  test('TC-009 : Dynamic Catalog - Slider Auto Slide', async ({ page }) => {
    await sidebarMenu.open();
    await sidebarMenu.openDynamicCatalogSubmenu();
    await sidebarMenu.clickSlider();

    const initialProduct = await sidebarMenu.getCurrentSlideProductName();

    // Bukti: produk bergeser otomatis tanpa klik
    await expect.poll(async () => {
      return await sidebarMenu.getCurrentSlideProductName();
    }, { timeout: 8000 }).not.toBe(initialProduct);
  });
});
