const apiRouter = require('express').Router();
const { getTopics } = require('../controllers/topics.controllers');
const articlesRouter = require('./articles.router');
const commentsRouter = require('./comments.router');
apiRouter.route('/topics').get(getTopics);
apiRouter.use('/articles', articlesRouter);
apiRouter.use('/comments', commentsRouter);
module.exports = apiRouter;
