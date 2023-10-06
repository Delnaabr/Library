const { test, expect } = require("@playwright/test");

// test("test the Register form", async ({ page }) => {
//   await page.goto("http://localhost:3001/Register");
//   await page.waitForSelector('input[name="username"]');
//   await page.fill('input[name="username"]', "delna");

//   await page.fill('input[name="email"]', "testuser@example.com");
//   await page.fill('input[name="password"]', "password123");
//   await page.fill('input[name="phone"]', "1234567890");
//   await page.fill('input[name="address"]', "123 Street, City");
//   await page.check('input[value="male"]');
//   await page.click('button[type="submit"]');

//   await page.waitForNavigation();

//   const currentURL = page.url();
//   expect(currentURL).toBe("http://localhost:3001/Login");
// });

test("Register form should submit successfully", async ({ page }) => {
  await page.goto("http://localhost:3001/Register");
  
  await expect(page).toHaveTitle(/Library Management/);
  const pageTitle = await page.textContent("h2");

  const expectedTitle = "Registration";

  expect(pageTitle).toBe(expectedTitle)
});

test("All text fields should accept user input", async ({ page }) => {
  await page.goto("http://localhost:3001/Register");

  const fieldNames = ["username", "email", "password", "phone", "address"];

  for (const fieldName of fieldNames) {
    const textField = await page.waitForSelector(`input[name="${fieldName}"]`);

    await textField.type(`test${fieldName}`);

    const fieldValue = await textField.inputValue();

    expect(fieldValue).toBe(`test${fieldName}`);
  }
});


