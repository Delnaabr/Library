import { test, expect } from "@playwright/test";

test("should render the Listing component", async ({ page }) => {
  await page.goto("http://localhost:3001/Listing");
  await page.waitForSelector("h1:has-text('Library Management')");
  await page.waitForSelector(".btn-class-listing:has-text('Students List')");
  await page.waitForSelector(".btn-class-listing:has-text('Book List')");
});

test("should switch between Students and Books tabs", async ({ page }) => {
  await page.goto("http://localhost:3001/Listing");
  await page.waitForSelector(".btn-class-listing:has-text('Students List')");
  await page.click(".btn-class-listing:has-text('Students List')");
  await page.waitForSelector("h1:has-text('Library Management')");
  await page.waitForSelector(".btn-class-listing:has-text('Book List')");
  await page.click(".btn-class-listing:has-text('Book List')");
  await page.waitForSelector("h1:has-text('Library Management')");
  await page.waitForSelector(".btn-class-listing:has-text('Students List')");
});


test("should filter table data by Category", async ({ page }) => {
  await page.goto("http://localhost:3001/Listing");
  await page.waitForSelector(".category-select");
  await page.selectOption(".category-select", "Travel");
  await page.waitForSelector("h1:has-text('Library Management')");
  await page.waitForSelector(".btn:has-text('Add New Entry')");
});
