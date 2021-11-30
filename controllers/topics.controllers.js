const { selectTopics } = require("../models/topics.models");

exports.getTopics = (req, res, next) => {
  selectTopics().then((topics) => {
    //console.log(topics);

    res.status(200).send({ topics });
  });
};
