const { User, validateUser } = require("../database/models/User");
const _ = require("lodash");
const bcrypt = require("bcrypt");

module.exports = {
  async create(req, res) {
    const { error } = validateUser(req.body);
    if (error) res.status(400).send(error.details[0].message);

    const user = new User(_.pick(req.body, ["name", "email", "password"]));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    try {
      const result = await user.save();
      return res.send(_.pick(result, ["_id", "name", "email"]));
    } catch (err) {
      return res.status(400).send(err.message);
    }
  },
};
