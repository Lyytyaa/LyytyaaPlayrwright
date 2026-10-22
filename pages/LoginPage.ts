import { Page, Locator } from '@playwright/test';
import { loginLocators } from '../locators/loginLocators';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator(loginLocators.usernameInput);
    this.passwordInput = page.locator(loginLocators.passwordInput);
    this.loginButton = page.locator(loginLocators.loginButton);
    this.errorMessage = page.locator(loginLocators.errorMessage);
  }

  async goto() {
    await this.page.goto('/');
  }

  async login(username?: string, password?: string) {
    if (username) {
      await this.usernameInput.fill(username);
    }
    if (password) {
      await this.passwordInput.fill(password);
    }
    await this.loginButton.click();
  }
}
