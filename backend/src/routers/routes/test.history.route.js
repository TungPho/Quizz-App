const express = require("express");
const testHistoryController = require("../../controllers/test.history.controller");

const testHistoryRoute = express.Router();

testHistoryRoute.post("/test_history", testHistoryController.createTestHistory);
testHistoryRoute.get(
  "/test_history/:teacherId",
  testHistoryController.getAllTestHistoryByTeacherId
);

module.exports = testHistoryRoute;
