import { Page, expect } from '@playwright/test';
import { runlogin } from './login-demo';

export async function truerunlogin(page:Page) 
{
    await runlogin(page,'standard_user','secret_sauce');
}