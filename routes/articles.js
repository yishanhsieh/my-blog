const express = require("express");
const Article = require("./../models/article");
const router = express.Router();

router.get("/new", (req, res) => {
  res.render("articles/new");
});

router.get("/:id", (req, res) => {});

router.post("/", async (req, res) => {
  const article = new Article({
    title: req.body.title,
    description: req.body.description,
    markdown: req.body.markdown,
  });
  try {
    article = await article.save();
    res.redirect(`/articles/${article.id}`);
    //everytime when pass in a route that has ariticles/xxx, if xxx is not `new`, it will go to `/:id`
  } catch (e) {
    res.render("articles/new", { article: article });
    //if fail, render out the page we were just on.
    //{ article: article }: pre-fill all different fields with the article information passed previously
  }
});

module.exports = router;
