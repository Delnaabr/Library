const { test, expect } = require("@playwright/test");

test("should render the Students List component", async ({ page }) => {
  await page.goto("http://localhost:3001/Admin/studentsList"); 
  const studentsList = await page.waitForSelector(".admin-table-container");
  expect(studentsList).not.toBeNull();
});

test("should open the Send Notification dialog", async ({ page }) => {
  await page.click(".send-button");
  const dialog = await page.waitForSelector("dialog[open]");
  expect(dialog).not.toBeNull();
});

test("should send a notification", async ({ page }) => {
  await page.click(".send-button");
  await page.fill('input[aria-label="Message"]', "Test notification message");
  await page.click(".send-button");

  const dialog = await page.waitForSelector("dialog[open]", { state: "hidden" });
  expect(dialog).toBeNull();
});
