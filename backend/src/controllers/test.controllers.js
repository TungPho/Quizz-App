const TestService = require("../services/test.service");

class TestController {
  getAllTests = async (req, res, next) => {
    const results = await TestService.getAllTests();
    return res.status(200).json({
      message: "Get all tests success",
      metadata: results,
    });
  };
  createTest = async (req, res, next) => {
    const { title, classId, teacherId, timeLimit } = req.body;
    const test = { title, classId, teacherId, timeLimit };
    const results = await TestService.createTest(test);
    return res.status(200).json({
      message: "Create a tests success",
      metadata: results,
    });
  };

  updateTest = async (req, res, next) => {
    const results = await TestService.updateTest();
    return res.status(200).json({
      message: "Update a tests success",
      metadata: results,
    });
  };
  deleteTest = async (req, res, next) => {
    const results = await TestService.deleteTest();
    return res.status(200).json({
      message: "Delete a tests success",
      metadata: results,
    });
  };
}
module.exports = new TestController();
