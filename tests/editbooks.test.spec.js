const { test, expect } = require("@playwright/test");

test("EditBookPopup should update book details", async ({ page }) => {
  await page.goto("http://localhost:3001/Admin/booksList");

  await page.click("button:has-text('Edit')");

  await page.waitForSelector("dialog");

  await page.fill('input[label="Book Name"]', "New Book Name");
  await page.fill('input[label="Author"]', "New Author");
  await page.fill('input[label="Stock"]', "50");
  await page.select('select[id="category-select"]', "Novel");

  await page.click("button:has-text('Update')");

  await page.waitForSelector("dialog:gone");

  const updatedBookName = await page.textContent(".book-name");
  const updatedAuthor = await page.textContent(".author");
  const updatedStock = await page.textContent(".stock");
  const updatedCategory = await page.textContent(".category");

  expect(updatedBookName).toBe("New Book Name");
  expect(updatedAuthor).toBe("New Author");
  expect(updatedStock).toBe("50");
  expect(updatedCategory).toBe("Novel");
});
