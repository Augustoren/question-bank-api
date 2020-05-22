const routes = require("express").Router();
const AuthController = require("../controllers/AuthController");

routes.post("/api/auth", AuthController.auth);

module.exports = routes;
