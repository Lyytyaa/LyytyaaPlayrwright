import { Page, expect } from '@playwright/test';

export async function runlogin(
    page: Page,
    username:string,
    password:string
) 
{
    await page.getByPlaceholder('Username').fill(username);
    await page.getByPlaceholder('Password').fill(password);
    await page.getByText('Login').click();
}