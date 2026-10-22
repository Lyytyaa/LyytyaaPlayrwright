import { Page, Locator } from '@playwright/test';
import { checkoutLocators } from '../locators/checkoutLocators';

export class CheckoutPage {
  readonly page: Page;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly finishButton: Locator;
  readonly completeHeader: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = page.locator(checkoutLocators.firstNameInput);
    this.lastNameInput = page.locator(checkoutLocators.lastNameInput);
    this.postalCodeInput = page.locator(checkoutLocators.postalCodeInput);
    this.continueButton = page.locator(checkoutLocators.continueButton);
    this.finishButton = page.locator(checkoutLocators.finishButton);
    this.completeHeader = page.locator(checkoutLocators.completeHeader);
    this.errorMessage = page.locator(checkoutLocators.errorMessage);
  }

  async fillInformation(firstName?: string, lastName?: string, postalCode?: string) {
    if (firstName) await this.firstNameInput.fill(firstName);
    if (lastName) await this.lastNameInput.fill(lastName);
    if (postalCode) await this.postalCodeInput.fill(postalCode);
  }

  async continue() {
    await this.continueButton.click();
  }

  async finish() {
    await this.finishButton.click();
  }
}
