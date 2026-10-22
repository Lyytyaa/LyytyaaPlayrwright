import { expect } from '@playwright/test';
import { test } from '../fixtures/baseTest';
import { testData } from '../data/testData';

test.describe('Authentication Tests', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test('TC-001 : Login Positive - Standard User', async ({ loginPage, inventoryPage }) => {
    const { username, password } = testData.users.standard;
    await loginPage.login(username, password);

    await expect(inventoryPage.title).toBeVisible();
    await expect(inventoryPage.title).toHaveText('Products');
  });

  test('TC-002 : Login Negative - Invalid Password', async ({ loginPage }) => {
    const { username } = testData.users.standard;
    const { password } = testData.users.invalid;
    await loginPage.login(username, password);

    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText(testData.errorMessages.invalidCredentials);
  });

  test('TC-003 : Login Negative - Invalid Username', async ({ loginPage }) => {
    const { username, password } = testData.users.invalid;
    await loginPage.login(username, password);

    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText(testData.errorMessages.invalidCredentials);
  });

  test('TC-004 : Login Negative - Empty Username & Password', async ({ loginPage }) => {
    // Klik login tanpa mengisi username dan password
    await loginPage.loginButton.click();

    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText(testData.errorMessages.emptyCredentials);
  });

  test('TC-005 : Login Negative - Locked Out User', async ({ loginPage }) => {
    const { username, password } = testData.users.lockedOut;
    await loginPage.login(username, password);

    // Bukti: user yang di-lock mendapat pesan error khusus
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText(testData.errorMessages.lockedOutUser);
  });
});