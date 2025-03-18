const submissonModel = require("../models/submisson.model");
const testModel = require("../models/test.model");
const { userModel } = require("../models/user.model");
class SubmissionService {
  static getAllSubmisionByUserId = async (userId) => {
    const foundUser = await userModel.findById(userId);
    if (!foundUser) throw new Error("Can't find this user id");
    const submissions = await submissonModel.find({ userId: userId });
    console.log(submissions);
    return { submissions };
  };
  static createSubmission = async ({
    testId,
    userId,
    answers,
    score,
    submitted_at = new Date(),
    number_of_correct_options,
    number_of_wrong_options,
    roomId,
  }) => {
    const foundTest = testModel.findById(testId);
    if (!foundTest) throw new Error("Can't find this test to add");
    const foundUser = userModel.findById(userId);
    if (!foundUser) throw new Error("Can't find this user");
    const foundQuizSubmission = await submissonModel.find({
      testId,
    });
    if (foundQuizSubmission.length !== 0)
      throw new Error("You already submitted this quiz!");
    const newSubmision = await submissonModel.create({
      testId,
      userId,
      answers,
      score,
      submitted_at,
      number_of_correct_options,
      number_of_wrong_options,
      roomId,
    });
    return newSubmision;
  };
}
module.exports = SubmissionService;
