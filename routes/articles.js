const express = require("express");
const Article = require("./../models/article");
const router = express.Router();

router.get("/new", (req, res) => {
  res.render("articles/new", { article: new Article() });
});

// get article by view/articles/edit
router.get("/edit/:id", async (req, res) => {
  const article = await Article.findById(req.params.id);
  res.render("articles/edit", { article: article });
});

router.get("/:slug", async (req, res) => {
  const article = await Article.findOne({ slug: req.params.slug });
  // if only use Article.find==> return an array
  if (article == null) {
    res.redirect("/");
  } else {
    res.render("articles/show", { article: article });
  }
});

//create a new article
router.post(
  "/",
  async (req, res, next) => {
    req.article = new Article();
    next(); //after create a new article, run `saveArticleAndRedirect`
  },
  saveArticleAndRedirect("new")
);

// to post the edited article
router.put(
  "/:id",
  async (req, res, next) => {
    req.article = await Article.findById(req.params.id);
    next();
  },
  saveArticleAndRedirect("edit")
);

//to use 'delete' as a function, we have to install a library override
router.delete("/:id", async (req, res) => {
  await Article.findByIdAndDelete(req.params.id);
  res.redirect("/");
});

//since create a new article and post an edited article is identical, we can create a function dealing with the overlapped logic.
function saveArticleAndRedirect(path) {
  return async (req, res) => {
    let article = req.article;
    article.title = req.body.title;
    article.description = req.body.description;
    article.markdown = req.body.markdown;

    try {
      article = await article.save(); //get the id of an article
      res.redirect(`/articles/${article.slug}`);
      //everytime when pass in a route that has ariticles/xxx, if xxx is not `new`, it will go to `/:id`
    } catch (e) {
      console.log(e);
      res.render(`articles/${path}`, { article: article });
      //if fail, render out the page we were just on.
      //{ article: article }: pre-fill all different fields with the article information passed previously
    }
  };
}

module.exports = router;
