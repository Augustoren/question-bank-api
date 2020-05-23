const connection = require("../connection");
const Joi = require("joi");

const questionSchema = new connection.Schema({
  author: {
    type: connection.Schema.Types.ObjectId,
    ref: "User",
  },
  category: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
    trim: true,
  },
  title: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 256,
    trim: true,
    unique: true,
  },
  options: [String],
});

function validateQuestion(question) {
  const schema = {
    author: Joi.required(),
    category: Joi.string().min(3).max(50).required(),
    title: Joi.string().min(5).max(256).required(),
    options: Joi.array().required().min(2),
  };
  return Joi.validate(question, schema);
}

const Question = connection.model("Question", questionSchema);

module.exports = {
  Question,
  validateQuestion,
};
