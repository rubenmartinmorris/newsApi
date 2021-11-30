const apiRouter = require("express").Router();
const { getTopics } = require("../controllers/topics.controllers");
const articlesRouter = require("./articles.router");

apiRouter.route("/topics").get(getTopics);
apiRouter.use("/articles", articlesRouter);

module.exports = apiRouter;
