const { Question, validateQuestion } = require("../database/models/Question");
const { User } = require("../database/models/User");
const _ = require("lodash");

module.exports = {
  async list(req, res) {
    const questions = await Question.find(req.query)
      .populate("author", "name -_id")
      .select("-_id -__v");
    return res.send(questions);
  },

  async create(req, res) {
    const { error } = validateQuestion(req.body);
    if (error) res.status(400).send(error.details[0].message);

    const question = new Question(req.body);

    try {
      const result = await question.save();
      return res.send(
        _.pick(result, ["category", "title", "options", "author"])
      );
    } catch (err) {
      return res.status(400).send(err.message);
    }
  },
};
