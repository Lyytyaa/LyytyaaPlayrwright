import { Page, expect } from '@playwright/test';

export async function checkout(page: Page,firstname: string,lastname: string,zipcode: string) 
{
    await page.getByText('Checkout').first().click();
    await page.getByPlaceholder('First Name').fill(firstname);
    await page.getByPlaceholder('Last Name').fill(lastname);
    await page.getByPlaceholder('Zip/Postal Code').fill(zipcode);
}