// EDIT THIS FILE TO COMPLETE ASSIGNMENT QUESTION 1
const { isSortedByAge } = require("./modules/validation.js");
const { fetchArticles } = require("./modules/scraper.js");

async function sortHackerNewsArticles() {
  const articles = await fetchArticles(100);
  const isSorted = isSortedByAge(articles);

  console.log(
    `The first 100 articles are ${
      isSorted ? `correctly` : `not correctly`
    } sorted by age.`
  );

  return isSorted;
}

sortHackerNewsArticles();

module.exports = { sortHackerNewsArticles };
