const routes = require("express").Router();
const QuestionsController = require("../controllers/QuestionController");

routes.get("/api/questions", QuestionsController.list);
routes.post("/api/questions", QuestionsController.create);

module.exports = routes;
