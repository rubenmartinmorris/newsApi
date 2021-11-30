const { selectArticleById } = require("../models/articles.models");

exports.getArticleById = (req, res, next) => {
  const id = req.query.article_id;
  console.log(id);

  selectArticleById(id).then((article) => {
    console.log(`after selectARticleById`);

    res.status(200).send({ article: { article } });
  });
};
