import { Page, expect } from '@playwright/test';

export async function addtocart(page:Page,barang:string) 
{
    await page.getByText(barang).click();
    await page.getByText('Add to cart').first().click();
    await page.locator('[data-test="shopping-cart-link"]').click();
}