import { test, expect } from "playwright/test";
import { sortHackerNewsArticles } from "..";

test("returns true", async () => {
  //Arrange
  const isValid = sortHackerNewsArticles();

  // Assert
  expect(isValid).toBeTruthy();
});
