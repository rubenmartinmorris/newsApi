const articlesRouter = require('express').Router();
const {
  getArticleById,
  postArticleById,
  getCommentById,
  postCommentById,
  getArticles,
} = require('../controllers/articles.controllers');
articlesRouter.route('/').get(getArticles).post(postArticleById);
articlesRouter.route('/:article_id').get(getArticleById);

articlesRouter
  .route('/:article_id/comments')
  .get(getCommentById)
  .post(postCommentById);

module.exports = articlesRouter;
