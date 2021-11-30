const apiRouter = require("express").Router();

apiRouter.route("/topics").get(getTopics);
console.log(`In the api Router`);

module.exports = apiRouter;
