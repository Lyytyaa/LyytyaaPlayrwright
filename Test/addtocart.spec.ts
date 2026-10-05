import { test, expect } from '@playwright/test';
import { truerunlogin } from '../Fixtures/trueloginflow';
import { addtocart } from '../Fixtures/addtocartflow';
import dotenv from 'dotenv';
import path from 'path';
import { checkout } from '../Fixtures/checkout';

dotenv.config({ path: path.resolve(__dirname, '../.env') });    

const itempurchase: string = process.env.itempurchase!;
const firstname: string = process.env.user_firstname!;
const lastname: string = process.env.user_lastname!;
const zipcode: string = process.env.user_zipcode!;

test.describe('Test Case Add to Cart and Checkout',() => {
    test.beforeEach(async({page})=>{
        await page.goto('https://www.saucedemo.com/'); 
        await page.waitForLoadState('domcontentloaded');
        await truerunlogin(page);
    });
    test('TC-001 : Add to cart Positive',async({page})=>{
        await addtocart (page,itempurchase);
        await expect(page.getByText(itempurchase).first()).toBeVisible();
        await checkout(page,firstname,lastname,zipcode);
        await page.getByText('Continue').first().click();
        await page.getByText('Finish').first().click();
        await expect(page.getByText('THANK YOU FOR YOUR ORDER').first()).toBeVisible();
    });
    test('TC-002 : Add to cart Negative : Information Blank',async({page})=>{
        await addtocart (page,itempurchase);
        await expect(page.getByText(itempurchase).first()).toBeVisible();
        await checkout(page,'','','');
        await page.getByText('Continue').first().click();
        await expect(page.getByText('Error: First Name is required').first()).toBeVisible();
    });
});