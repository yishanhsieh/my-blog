const express = require("express");
const mongoose = require("mongoose"); //connect to MongoDB
const Article = require("./models/article");
const articleRouter = require("./routes/articles");
const methodOverride = require("method-override");
const app = express();

mongoose.connect("mongodb://0.0.0.0:27017/blog", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method")); //whenever we set the parameter _method in any type of form, it will override the method.

// tell Express how to get data from mongoDB, extended: false => any parameter in the article form is accessible.

app.get("/", async (req, res) => {
  const articles = await Article.find().sort({ createdAt: "desc" });
  res.render("articles/index", { articles: articles });
});

app.use("/articles", articleRouter);
//this should come after article route is set

app.listen(5001);
