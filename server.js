const express = require("express");
const mongoose = require("mongoose"); //connect to MongoDB
const articleRouter = require("./routes/articles");
const app = express();

mongoose.connect("mongodb://localhost/blog", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));
// tell Express how to get data from mongoDB, extended: false => any parameter in the article form is accessible.
app.use("/articles", articleRouter);
//this should come after article route is set

app.get("/", (req, res) => {
  const articles = [
    {
      title: "test article",
      createdAt: new Date(),
      description: "Test description",
    },
    {
      title: "test article2",
      createdAt: new Date(),
      description: "Test description2",
    },
  ];
  res.render("articles/index", { articles: articles });
});

app.listen(5000);
