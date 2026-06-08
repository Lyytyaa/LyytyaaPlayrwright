import { test, expect } from '@playwright/test';

test('get started link', async ({ page }) => {
  await page.goto('https://testing.co.id/');

  await expect(page.getByRole('link', { name: 'TENTANG KAMI' }).first()).toBeVisible();

  await page.getByRole('link', { name: 'TENTANG KAMI' }).first().click();
});

test('Tentang Kami Page', async ({ page }) => {

  await page.goto('https://testing.co.id/info');

  await expect(page.getByRole('heading', { name: 'PT. Inti Jaya Presisi' }).first()).toBeVisible();
});

test('Klik Product', async ({ page }) => {
  await page.goto('https://testing.co.id/');

  const product = page
    .locator('a', {
      hasText: /Fire Resistance Test Single Cable Wire IEC 60332-1/i
    })
    .first();

  await product.scrollIntoViewIfNeeded();
  await expect(product).toBeVisible();

  await product.click();

  await expect(page.getByRole('heading', { name: 'Fire Resistance Test Single Cable Wire IEC 60332-1 - Alat Tester Kabel' }).first()).toBeVisible();
});

test('Hardness', async({page})=>{
  await page.goto('https://testing.co.id');
  
  const hardness = page.
   locator('a',{
    hasText: /Vickers Hardness Tester for Metallurgical Testing/
   })
   .first();

  await hardness.scrollIntoViewIfNeeded();
  await expect(hardness).toBeVisible();
  await hardness.click();
  await expect(page.getByRole('heading',{name: 'Vickers Hardness Tester for Metallurgical Testing'}).first()).toBeVisible();

}
);