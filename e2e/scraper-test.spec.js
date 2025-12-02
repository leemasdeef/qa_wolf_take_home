import { test, expect } from "@playwright/test";
import { fetchArticles } from "../modules/scraper";

test("returns correct number of articles", async () => {
  // Arrange
  const articles = await fetchArticles(100);
  //Assert
  expect(articles).toHaveLength(100);
});

test("returns array of non-empty objects with id and age as key-value pairs", async () => {
  //Arrange
  const articles = await fetchArticles(100);
  //Assert
  for (const article of articles) {
    expect("id" in article);
    expect("age" in article);
    expect(article.id).toBeTruthy();
    expect(article.age).toBeTruthy();
  }
});

test("returns valid ISO timestamps", async () => {
  //Arrange
  const articles = await fetchArticles(100);
  const articleTimeStamps = articles.map((article) => article.age);
  const iso8601Regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/;

  //Assert
  for (const timestamp of articleTimeStamps) {
    expect(timestamp).toBeTruthy();
    expect(typeof timestamp).toBe("string");
    expect(timestamp).toMatch(iso8601Regex); // matches ISO date-time format
  }
});

test("returns a 100 unique articles", async () => {
  //Arrange
  const articles = await fetchArticles(100);
  const articleIds = articles.map((article) => article.id);
  const articleSet = new Set(articleIds);
  //Assert
  expect(articleSet.size).toEqual(articles.length);
});
