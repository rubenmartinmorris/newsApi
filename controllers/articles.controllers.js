const {
  selectArticleById,
  updateArticleById,
} = require("../models/articles.models");

exports.getArticleById = (req, res, next) => {
  const id = req.query.article_id;
  selectArticleById(id).then((article) => {
    res.status(200).send({ article: { article } });
  });
};

exports.postArticleById = (req, res, next) => {
  const id = req.query.article_id;
  const inc_votes = req.body.inc_votes;
  console.log(`in postARticleById id is ${id}  inc_votes = ${inc_votes}`);
  updateArticleById(id, inc_votes).then((article) => {
    res.status(200).send(article);
  });
};
