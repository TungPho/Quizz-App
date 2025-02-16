const testModel = require("../models/test.model");

class TestService {
  static getAllTests = async () => {
    const tests = await testModel.find();
    return tests;
  };
  static createTest = async (test) => {
    const newTest = await testModel.create(test);
    return { newTest };
  };
  static updateTest = async () => {
    return {};
  };
  static deleteTest = async () => {
    return {};
  };
}
module.exports = TestService;
