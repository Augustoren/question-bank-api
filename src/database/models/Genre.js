const connection = require("../connection");
const Joi = require("joi");

const genreSchema = new connection.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
    trim: true,
  },
});

function validateGenre(genre) {
  const schema = {
    name: Joi.string().min(3).max(50).required(),
  };
  return Joi.validate(genre, schema);
}

const Genre = connection.model("Genre", genreSchema);

module.exports = {
  Genre,
  validateGenre,
};
