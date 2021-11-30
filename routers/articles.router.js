const articlesRouter = require("express").Router();
const {
  getArticleById,
  postArticleById,
} = require("../controllers/articles.controllers");
articlesRouter.route("/").get(getArticleById).post(postArticleById);

module.exports = articlesRouter;
