const apiRouter = require('express').Router();
const { getTopics } = require('../controllers/topics.controllers');
const articlesRouter = require('./articles.router');
const commentsRouter = require('./comments.router');
const { getEndpoints } = require('../controllers/api.controllers');
apiRouter.route('/topics').get(getTopics);
apiRouter.route('/').get(getEndpoints);
apiRouter.use('/articles', articlesRouter);
apiRouter.use('/comments', commentsRouter);

module.exports = apiRouter;
