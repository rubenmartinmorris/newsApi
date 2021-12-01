const commentsRouter = require('express').Router();
const { deleteCommentsById } = require('../controllers/comments.cotrollers');

commentsRouter.route('/:comment_id').delete(deleteCommentsById);

module.exports = commentsRouter;
