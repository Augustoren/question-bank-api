const routes = require("express").Router();
const UserController = require("../controllers/UserController");

routes.get("/api/users", UserController.list);
routes.post("/api/users", UserController.create);

module.exports = routes;
