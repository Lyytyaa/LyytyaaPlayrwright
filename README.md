# SauceDemo Playwright E2E Automation

Repositori ini berisi pengujian otomatis *End-to-End* (E2E) untuk website [SauceDemo](https://www.saucedemo.com/) menggunakan **Playwright** dan **TypeScript** dengan arsitektur **Page Object Model (POM)** yang scalable, maintainable, dan reusable.

---

## 📁 Struktur Project

```text
abdulPlaywrightTest/
├── tests/                   # File spesifikasi pengujian (test suites)
│   ├── login.spec.ts        # Authentication tests (5 TCs)
│   ├── product.spec.ts      # Product detail page tests (4 TCs)
│   ├── cart.spec.ts         # Cart management tests (5 TCs)
│   ├── addtocart.spec.ts    # Add to cart & checkout flow tests (7 TCs)
│   ├── sort.spec.ts         # Inventory sorting tests (4 TCs)
│   └── navigation.spec.ts   # Sidebar navigation & dynamic catalog tests (9 TCs)
│
├── pages/                   # Page Object Model (abstraksi elemen & aksi per halaman)
│   ├── LoginPage.ts
│   ├── InventoryPage.ts
│   ├── ProductDetailPage.ts
│   ├── CartPage.ts
│   ├── CheckoutPage.ts
│   └── SidebarMenu.ts
│
├── fixtures/                # Reusable test setup & custom fixtures
│   └── baseTest.ts          # test (base POM) + authenticatedTest (auto-login)
│
├── locators/                # Centralized element selectors (data-test attributes)
│   ├── loginLocators.ts
│   ├── inventoryLocators.ts
│   ├── productDetailLocators.ts
│   ├── cartLocators.ts
│   ├── checkoutLocators.ts
│   └── sidebarLocators.ts
│
├── utils/                   # Utility functions & constants
│   ├── constants.ts         # URLS, SORT_VALUES, TIMEOUTS
│   └── helpers.ts           # parsePriceString, isSortedAscending, scrollToBottom, dll
│
├── data/                    # Data testing (users, checkout info, pesan ekspektasi)
│   └── testData.ts
│
├── backup/                  # Arsip file eksperimen / lama
├── .env                     # Konfigurasi environment lokal (di-ignore oleh git)
├── .env.example             # Template konfigurasi environment
├── playwright.config.ts     # Konfigurasi utama Playwright
└── package.json
```

---

## ✅ Test Coverage

| Suite | File | Total TCs |
|---|---|---|
| Authentication | `login.spec.ts` | 5 |
| Product Detail | `product.spec.ts` | 4 |
| Cart Management | `cart.spec.ts` | 5 |
| Add to Cart & Checkout | `addtocart.spec.ts` | 7 |
| Inventory Sorting | `sort.spec.ts` | 4 |
| Sidebar & Dynamic Catalog | `navigation.spec.ts` | 9 |
| **Total** | | **34** |

---

## 🏗️ Arsitektur

### Fixtures (`fixtures/baseTest.ts`)
Menghilangkan boilerplate `beforeEach` di setiap spec. Cukup import dan langsung pakai:
- **`test`** — semua page object sudah terinisialisasi
- **`authenticatedTest`** — otomatis login sebagai `standard_user` sebelum tiap test

```ts
import { authenticatedTest as test } from '../fixtures/baseTest';

test('TC-001', async ({ inventoryPage, cartPage }) => {
  // Langsung aksi, tanpa setup manual
});
```

### Locators (`locators/`)
Semua selector `[data-test="..."]` dipusatkan di sini. Jika ada perubahan selector di aplikasi, cukup ubah **satu file** — tidak perlu menyentuh page object maupun spec file.

### Utils (`utils/`)
Fungsi-fungsi pembantu yang dapat digunakan ulang lintas test, seperti parsing harga, validasi pengurutan, dan scroll halaman.

---

## 🚀 Cara Menjalankan Pengujian

### 1. Prasyarat & Instalasi
```bash
npm install
npx playwright install chromium
```

### 2. Konfigurasi Environment (Opsional)
Salin `.env.example` menjadi `.env` jika ingin mengubah URL atau kredensial default:
```bash
cp .env.example .env
```

### 3. Eksekusi Test

Menjalankan seluruh pengujian:
```bash
npx playwright test
```

Menjalankan file tertentu:
```bash
npx playwright test tests/login.spec.ts
```

Menjalankan dengan antarmuka UI interaktif:
```bash
npx playwright test --ui
```

Melihat laporan hasil test (HTML Report):
```bash
npx playwright show-report
```
