const { test, expect } = require("@playwright/test");

test("AddNewEntryDialog should add a new entry", async ({ page }) => {
  await page.goto("http://localhost:3001/Listing");

  await page.click("button:has-text('Add New Entry')");

  await page.waitForSelector("dialog");

  await page.fill('input[label="Roll No"]', "123");
  await page.fill('input[label="Student Name"]', "Mathew Doe");
  await page.select('select[id="department-select"]', "BBA");
  await page.select('select[id="batch-select"]', "2023 - 2026");
  await page.fill('input[label="Book Name"]', "Sample Book");

  await page.click("button:has-text('Add Entry')");
//   await page.waitForSelector("dialog:gone");
  const addedRow = await page.textContent('tr:has-text("Mathew Doe")');

  expect(addedRow).toContain("123");
  expect(addedRow).toContain("Mathew Doe");
  expect(addedRow).toContain("BBA");
  expect(addedRow).toContain("2023 - 2026");
  expect(addedRow).toContain("Sample Book");
});
