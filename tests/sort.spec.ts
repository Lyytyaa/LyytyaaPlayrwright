import { expect } from '@playwright/test';
import { authenticatedTest as test } from '../fixtures/baseTest';
import { testData } from '../data/testData';

test.describe('Inventory Sorting Tests', () => {
  test('TC-001 : Sort Products by Name (A to Z)', async ({ inventoryPage }) => {
    await inventoryPage.sortProducts(testData.sortOptions.nameAsc);
    const productNames = await inventoryPage.getAllProductNames();
    const expectedNames = [...productNames].sort((a, b) => a.localeCompare(b));
    expect(productNames).toEqual(expectedNames);
  });

  test('TC-002 : Sort Products by Name (Z to A)', async ({ inventoryPage }) => {
    await inventoryPage.sortProducts(testData.sortOptions.nameDesc);
    const productNames = await inventoryPage.getAllProductNames();
    const expectedNames = [...productNames].sort((a, b) => b.localeCompare(a));
    expect(productNames).toEqual(expectedNames);
  });

  test('TC-003 : Sort Products by Price (low to high)', async ({ inventoryPage }) => {
    await inventoryPage.sortProducts(testData.sortOptions.priceAsc);
    const productPrices = await inventoryPage.getAllProductPrices();
    const expectedPrices = [...productPrices].sort((a, b) => a - b);
    expect(productPrices).toEqual(expectedPrices);
  });

  test('TC-004 : Sort Products by Price (high to low)', async ({ inventoryPage }) => {
    await inventoryPage.sortProducts(testData.sortOptions.priceDesc);
    const productPrices = await inventoryPage.getAllProductPrices();
    const expectedPrices = [...productPrices].sort((a, b) => b - a);
    expect(productPrices).toEqual(expectedPrices);
  });
});