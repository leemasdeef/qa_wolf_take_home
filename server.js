console.log("🚀 server.js file loaded");

const express = require("express");
const { sortHackerNewsArticles } = require("./index");

const app = express();

app.use(express.static("public"));

app.post("/run", async (req, res) => {
  try {
    await sortHackerNewsArticles();
    res.sendStatus(200);
  } catch (error) {
    console.error("Error running sortHackerNewsArticles: ", error);
    res.sendStatus(500);
  }
});

app.listen(3000, () => console.log("👉 Open http://localhost:3000"));
