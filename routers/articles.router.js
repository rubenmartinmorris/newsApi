const articlesRouter = require('express').Router();
const {
  getArticleById,
  postArticleById,
  getCommentById,
} = require('../controllers/articles.controllers');
articlesRouter.route('/').get(getArticleById).post(postArticleById);
articlesRouter.route('/:article_id/comments').get(getCommentById);

module.exports = articlesRouter;
