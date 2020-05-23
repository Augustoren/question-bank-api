const connection = require("../connection");
const Joi = require("joi");
const Jwt = require("jsonwebtoken");
const config = require("config");

const userSchema = new connection.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
    trim: true,
    lowercase: true,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 100,
    trim: true,
    unique: true,
    pattern: "/.*@.*/",
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 256,
  },
  isAdmin: Boolean,
});

userSchema.methods.generateAuthToken = function () {
  return Jwt.sign(
    { _id: this._id, isAdmin: this.isAdmin },
    config.get("JWTPK")
  );
};

function validateUser(user) {
  const schema = {
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string()
      .min(5)
      .max(100)
      .required()
      .regex(/.*@.*/i)
      .error(() => "Invalid email"),
    password: Joi.string().min(8).max(256).required(),
  };
  return Joi.validate(user, schema);
}

const User = connection.model("User", userSchema);

module.exports = {
  User,
  validateUser,
};
