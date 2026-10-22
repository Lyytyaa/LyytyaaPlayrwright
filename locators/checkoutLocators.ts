/**
 * Centralized locator selectors for the Checkout pages.
 */
export const checkoutLocators = {
  firstNameInput: '[data-test="firstName"]',
  lastNameInput: '[data-test="lastName"]',
  postalCodeInput: '[data-test="postalCode"]',
  continueButton: '[data-test="continue"]',
  finishButton: '[data-test="finish"]',
  completeHeader: '[data-test="complete-header"]',
  errorMessage: '[data-test="error"]',
} as const;
