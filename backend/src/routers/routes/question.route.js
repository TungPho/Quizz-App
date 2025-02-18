const express = require("express");
const catchAsync = require("../../handlers/asyncHandlers");
const questionController = require("../../controllers/question.controllers");
const questionRoute = express.Router();
questionRoute.get("/questions", catchAsync(questionController.getAllQuestions));
questionRoute.get(
  "/questions/:id",
  catchAsync(questionController.findQuestionById)
);
questionRoute.post("/questions", catchAsync(questionController.createQuestion));
questionRoute.put("/questions", catchAsync(questionController.updateQuestion));

questionRoute.delete(
  "/questions/:id",
  catchAsync(questionController.removeQuestionById)
);

module.exports = questionRoute;
