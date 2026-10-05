import { test, expect } from '@playwright/test';
import { runlogin } from '../Fixtures/login-demo';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const emailpositive: string = process.env.user_emailpositive!;
const emailnegative: string = process.env.user_emailnegative!;
const passpositive: string = process.env.user_passwordpositive!;
const passnegative: string = process.env.user_passwordnegative!;

test.describe('Test Case Login',() => {
    test.beforeEach(async({page})=>{
        await page.goto('https://www.saucedemo.com/'); 
        await page.waitForLoadState('domcontentloaded');
    });
    test('TC-001 : Login Positive',async({page})=>{
        await runlogin(page,emailpositive,passpositive);
        await expect(page.getByText('Swag Labs').first()).toBeVisible();
    });
     test('TC-002 : Login Negative Password',async({page})=>{
        await runlogin(page,emailpositive,passnegative);
        await expect(page.getByText('Epic sadface: Username and password do not match any user in this service').first()).toBeVisible();
    });
     test('TC-003 : Login Negative User',async({page})=>{
        await runlogin(page,emailnegative,passpositive);
        await expect(page.getByText('Epic sadface: Username and password do not match any user in this service').first()).toBeVisible();
    });
});