const { test, expect } = require("@playwright/test");
// require('../app/Login/page')

test("test the Login form", async ({ page }) => {
  await page.goto("http://localhost:3001/Login");
  await expect(page).toHaveTitle("Library Management");
  await page.fill('input[name="username"]', 'your_username');
  await page.fill('input[name="password"]', 'your_password');

  await page.click('button[type="submit"]');

  const welcomeMessage = await page.textContent(".welcome-message"); 
  expect(welcomeMessage).toContain("Welcome");

  const currentURL = page.url();
  expect(currentURL).toBe("http://localhost:3001/Listing"); 
});
