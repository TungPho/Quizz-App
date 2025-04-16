const testHistoryModel = require("../models/test.history.model");

class TestHistoryController {
  getAllTestHistoryByTeacherId = async (req, res, next) => {
    const { teacherId } = req.params;
    console.log(teacherId);
    return res.status(200).json({
      message: "get all Test History Successful",
      metadata: {},
    });
  };

  createTestHistory = async (req, res, next) => {
    const newTestHistory = req.body;
    console.log(newTestHistory);

    const createdTestHistory = await testHistoryModel.create(newTestHistory);
    console.log(createdTestHistory);
    return res.status(200).json({
      message: "Create Test History Successful",
      metadata: createdTestHistory,
    });
  };
}
module.exports = new TestHistoryController();
