const {
  selectArticleById,
  updateArticleById,
  selectCommentById,
  updateComment,
  selectArticles,
} = require('../models/articles.models');

exports.getArticles = (req, res, next) => {
  const para = {};
  para.sort_by = `${req.query.sort_by || 'created_at'}`;
  para.order = req.query.order || 'asc';
  para.topic = req.query.topic;
  selectArticles(para).then((response) => {
    res.status(200).send(response);
  });
};

exports.getArticleById = (req, res, next) => {
  const para = {};
  para.id = req.query.article_id;
  para.sort_by = `${req.query.sort_by || 'created_at'}`;
  para.order = req.query.order || 'asc';
  para.topic = req.query.topic;

  //console.log(para.topic, '<-----');

  selectArticleById(para)
    .then((article) => {
      res.status(200).send({ article: { article } });
    })
    .catch(next);
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
  selectCommentById(id).then((response) => {
    res.status(200).send(response);
  });
};

exports.postCommentById = (req, res, next) => {
  const newInput = {};
  newInput.id = req.params.article_id;
  newInput.username = req.body.username;
  newInput.body = req.body.body;
  updateComment(newInput).then((response) => {
    res.status(200).send(response);
  });
};
