export const testData = {
  users: {
    standard: {
      username: 'standard_user',
      password: 'secret_sauce',
    },
    invalid: {
      username: 'asal_user',
      password: 'asal_password',
    },
  },
  checkout: {
    firstName: 'Abdul',
    lastName: 'Malik',
    postalCode: '12345',
  },
  products: {
    backpack: 'Sauce Labs Backpack',
  },
  errorMessages: {
    invalidCredentials: 'Epic sadface: Username and password do not match any user in this service',
    firstNameRequired: 'Error: First Name is required',
  },
  successMessages: {
    orderComplete: 'Thank you for your order!',
  },
  sortOptions: {
    nameAsc: 'Name (A to Z)',
    nameDesc: 'Name (Z to A)',
    priceAsc: 'Price (low to high)',
    priceDesc: 'Price (high to low)',
  },
};
