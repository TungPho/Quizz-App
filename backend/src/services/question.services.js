const { Types } = require("mongoose");
const questionModel = require("../models/question.model");

class QuestionService {
  static getAllQuestions = async () => {
    const questions = await questionModel.find();
    return questions;
  };
  static findQuestionById = async (testId) => {
    const foundTest = await questionModel.findById(new Types.ObjectId(testId));
    return foundTest;
  };
  // also add questions to test
  static createQuestion = async (question) => {
    const newQuestion = await questionModel.create(question);

    return { newQuestion };
  };
}
module.exports = QuestionService;
