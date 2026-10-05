import { Page, expect } from '@playwright/test';
import { runlogin } from './login-demo';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../.env') });    

export async function truerunlogin(page:Page) 
{
    await runlogin(page,process.env.user_emailpositive!,process.env.user_passwordpositive!);
}