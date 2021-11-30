const articlesRouter = require("express").Router();
const { getArticleById } = require("../controllers/articles.controllers");
articlesRouter.route("/").get(getArticleById);

module.exports = articlesRouter;
