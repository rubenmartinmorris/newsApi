const { DELETECommentsById } = require('../models/comments.model');

exports.deleteCommentsById = (req, res, next) => {
  const comment_id = req.params.comment_id;

  DELETECommentsById(comment_id).then((response) => {
    res.status(204).send(response);
  });
};
