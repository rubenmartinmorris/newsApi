const {
  selectArticleById,
  updateArticleById,
  selectCommentById,
} = require('../models/articles.models');

exports.getArticleById = (req, res, next) => {
  const para = {};
  para.id = req.query.article_id;
  para.sort_by = `${req.query.sort_by || 'created_at'}`;
  para.order = req.query.order || 'asc';
  para.topic = req.query.topic;

  //console.log(para.topic, '<-----');

  selectArticleById(para).then((article) => {
    res.status(200).send({ article: { article } });
  });
};

exports.postArticleById = (req, res, next) => {
  const id = req.query.article_id;
  const inc_votes = req.body.inc_votes;

  updateArticleById(id, inc_votes).then((article) => {
    res.status(200).send(article);
  });
};

exports.getCommentById = (req, res, next) => {
  const id = req.params.article_id;
  console.log(id, 'in getCommentById <---- id');
  selectCommentById(id).then((response) => {
    console.log(response);

    res.status(200).send(response);
  });
};
