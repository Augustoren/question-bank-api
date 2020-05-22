const routes = require("express").Router();
const UserController = require("../controllers/UserController");

routes.post("/api/users", UserController.create);

module.exports = routes;
