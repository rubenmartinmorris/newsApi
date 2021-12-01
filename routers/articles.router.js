const articlesRouter = require('express').Router();
const {
  getArticleById,
  postArticleById,
  getCommentById,
  postCommentById,
} = require('../controllers/articles.controllers');
articlesRouter.route('/').get(getArticleById).post(postArticleById);
articlesRouter
  .route('/:article_id/comments')
  .get(getCommentById)
  .post(postCommentById);

module.exports = articlesRouter;
