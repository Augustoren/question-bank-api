const connection = require("../connection");
const Joi = require("joi");

// const authSchema = new connection.Schema({
//   email: {
//     type: String,
//     required: true,
//     minlength: 5,
//     maxlength: 100,
//     trim: true,
//     unique: true,
//   },
//   password: {
//     type: String,
//     required: true,
//     minlength: 8,
//     maxlength: 256,
//   },
// });

function validateAuth(user) {
  const schema = {
    email: Joi.string().min(5).max(100).required(),
    password: Joi.string().min(8).max(256).required(),
  };
  return Joi.validate(user, schema);
}

module.exports = {
  validateAuth,
};
