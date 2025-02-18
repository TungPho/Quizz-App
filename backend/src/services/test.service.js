const { Types } = require("mongoose");
const testModel = require("../models/test.model");

class TestService {
  static getAllTests = async () => {
    const tests = await testModel.find();
    return tests;
  };
  static findTestById = async (testId) => {
    const foundTest = await testModel.findById(new Types.ObjectId(testId));
    return foundTest;
  };
  static createTest = async (test) => {
    const newTest = await testModel.create(test);
    return { newTest };
  };
  static updateTest = async (data, id) => {
    const updatedTest = await testModel.findOneAndUpdate(
      {
        _id: new Types.ObjectId(id),
      },
      data
    );
    return { updatedTest };
  };
  static deleteTest = async () => {
    return {};
  };
}
module.exports = TestService;
