const { Types } = require("mongoose");
const testModel = require("../models/test.model");
const QuestionService = require("../services/question.services");

class QuestionController {
  // admin functions
  getAllQuestions = async (req, res, next) => {
    const results = await QuestionService.getAllQuestions();
    return res.status(200).json({
      message: "Get all questions success",
      metadata: results,
    });
  };
  // also add questions to test id // require: testId
  createQuestion = async (req, res, next) => {
    const { quizId, text, options } = req.body;
    const quest = { quizId, text, options };
    const test = await testModel.findById(new Types.ObjectId(quizId));
    // create a new question
    const result = await QuestionService.createQuestion(quest);
    if (!result) throw new Error("Error in creating question");
    // add new question to the test (quizId)
    test.questions.push(result.newQuestion._id);
    test.save();
    return res.status(200).json({
      message: "Create questions success",
      metadata: result,
    });
  };
  // if you remove questions, you also have to remove in the array, provide the id
  removeQuestion = async (req, res, next) => {
    const {} = req.body;
  };
  updateQuestion = async (req, res, next) => {
    const {} = req.body;
  };
}
module.exports = new QuestionController();
