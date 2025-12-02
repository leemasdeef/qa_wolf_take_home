const { chromium } = require("playwright");

async function fetchArticles(target = 100) {
  // launch browser
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  // go to Hacker News
  try {
    await page.goto("https://news.ycombinator.com/newest");
  } catch (error) {
    console.error("Failed to load website: ", error);
  }

  await page.waitForTimeout(500); // wait 0.5s between page loads so I dont throttle hacker news :x

  const articleArray = [];
  // track already scraped ids to avoid duplciates in the case that a new post is added during the scraper's runtime
  const scrapedIds = new Set();

  while (articleArray.length < target) {
    try {
      const rows = page.locator("tr.athing"); // get all table rows
      // extract id and age, id to be used in tests to validate uniqueness
      const articles = await rows.evaluateAll((rows) =>
        rows.map((row) => {
          const id = row.getAttribute("id");
          const age = row.nextElementSibling
            ?.querySelector("td span.age")
            ?.getAttribute("title")
            ?.split(" ")[0];
          return { id, age };
        })
      );

      //duplicate handling

      const uniqueArticles = articles.filter((article) => {
        //omit broken links and duplicates
        if (!article.id || scrapedIds.has(article.id)) {
          console.warn(`Broken link or duplicate id: ${article.id} `);
          return false;
        }
        scrapedIds.add(article.id);
        return true;
      });

      articleArray.push(...uniqueArticles);
      const moreBtn = page.locator("a.morelink");
      await moreBtn.click();
    } catch (error) {
      console.error("Failed to fetch articles: ", error);
      break;
    }
  }

  await browser.close();
  // handle empty array
  if (!articleArray) {
    console.warn("scraper function returned empty array");
    return [];
  }
  return articleArray.slice(0, target);
}

module.exports = { fetchArticles };
