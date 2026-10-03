import { test, expect } from '@playwright/test';
import { runlogin } from '../Fixtures/login-demo';

test.describe('Test Case Login',() => {
    test.beforeEach(async({page})=>{
        await page.goto('https://www.saucedemo.com/'); 
        await page.waitForLoadState('domcontentloaded');
    });
    test('TC-001 : Login Positive',async({page})=>{
        await runlogin(page,'standard_user','secret_sauce');
        await expect(page.getByText('Swag Labs').first()).toBeVisible();
    });
     test('TC-002 : Login Negative Password',async({page})=>{
        await runlogin(page,'standard_user','asal');
        await expect(page.getByText('Epic sadface: Username and password do not match any user in this service').first()).toBeVisible();
    });
     test('TC-003 : Login Negative User',async({page})=>{
        await runlogin(page,'Asal','secret_sauce');
        await expect(page.getByText('Epic sadface: Username and password do not match any user in this service').first()).toBeVisible();
    });
});