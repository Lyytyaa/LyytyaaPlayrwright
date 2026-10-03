import { test, expect } from '@playwright/test';
import { truerunlogin } from '../Fixtures/trueloginflow';
import { addtocart } from '../Fixtures/addtocartflow';

test.describe('Test Case Add to Cart',() => {
    test.beforeEach(async({page})=>{
        await page.goto('https://www.saucedemo.com/'); 
        await page.waitForLoadState('domcontentloaded');
        await truerunlogin(page);
    });
    test('TC-001 : Add to cart Positive',async({page})=>{
        await addtocart (page,'Sauce Labs Backpack');
        await expect(page.getByText('Sauce Labs Backpack').first()).toBeVisible();
    });
});