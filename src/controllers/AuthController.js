const { validateAuth } = require("../database/models/Auth");
const { User } = require("../database/models/User");
const bcrypt = require("bcrypt");
const _ = require("lodash");

module.exports = {
  async auth(req, res) {
    const { error } = validateAuth(req.body);
    if (error) res.status(400).send(error.details[0].message);

    const user = await User.findOne({ email: req.body.email });
    if (!user) res.status(400).send("Invalid email or password!");

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!validPassword) res.status(400).send("Invalid email or password!");

    const token = await user.generateAuthToken();

    return res.header("x-auth-token", token).send(token);
  },
};
