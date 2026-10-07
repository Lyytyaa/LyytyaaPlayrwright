# SauceDemo Playwright E2E Automation

Repositori ini berisi pengujian otomatis *End-to-End* (E2E) untuk website [SauceDemo](https://www.saucedemo.com/) menggunakan **Playwright** dan **TypeScript** dengan arsitektur **Page Object Model (POM)**.

---

## 📁 Struktur Project

```text
abdulPlaywrightTest/
├── data/                    # Data testing (users, checkout info, pesan ekspektasi)
│   └── testData.ts
├── pages/                   # Page Object Model (abstraksi elemen & aksi per halaman)
│   ├── LoginPage.ts
│   ├── InventoryPage.ts
│   ├── CartPage.ts
│   ├── CheckoutPage.ts
│   └── SidebarMenu.ts
├── tests/                   # File spesifikasi pengujian (test suites)
│   ├── login.spec.ts
│   ├── addtocart.spec.ts
│   ├── sort.spec.ts
│   └── navigation.spec.ts
├── backup/                  # Arsip file eksperimen / lama
│   ├── example.spec.ts
│   ├── intijaya.spec.ts
│   └── Fixtures_legacy/
├── .env                     # Konfigurasi environment lokal (di-ignore oleh git)
├── .env.example             # Template konfigurasi environment
├── playwright.config.ts     # Konfigurasi utama Playwright
└── package.json
```

---

## 🚀 Cara Menjalankan Pengujian

### 1. Prasyarat & Instalasi
Pastikan sudah menginstal dependensi:
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

Menjalankan dengan antarmuka UI interaktif:
```bash
npx playwright test --ui
```

Melihat laporan hasil test (HTML Report):
```bash
npx playwright show-report
```
