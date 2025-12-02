import { test, expect } from "@playwright/test";

// test suite assumes basic end-to-end testing has been done for website, thus tests only pertain specifically to the assignment.

test.describe("navigation", () => {
  //Arrange
  test.beforeEach(async ({ page }) => {
    await page.goto("https://news.ycombinator.com/newest");
  });

  test("main navigation", async ({ page }) => {
    await expect(page).toHaveURL("https://news.ycombinator.com/newest");
  });

  test("more button navigates correctly", async ({ page }) => {
    // wait for url to load (assumes button render has already been tested)
    await Promise.all([
      page.locator("a.morelink").click(),
      page.waitForURL(/n=31/),
    ]);

    await expect(page).toHaveURL(/n=31/); // first click

    await Promise.all([
      page.locator("a.morelink").click(),
      page.waitForURL(/n=61/),
    ]);

    await expect(page).toHaveURL(/n=61/); // second click

    await Promise.all([
      page.locator("a.morelink").click(),
      page.waitForURL(/n=91/),
    ]);

    await expect(page).toHaveURL(/n=91/); // third click
  });
});
