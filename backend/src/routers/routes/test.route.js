const express = require("express");
const catchAsync = require("../../handlers/asyncHandlers");
const testControllers = require("../../controllers/test.controllers");
const testRoute = express.Router();
testRoute.get("/tests", catchAsync(testControllers.getAllTests));
testRoute.get("/tests/:id", catchAsync(testControllers.findTestById));

testRoute.post("/tests", catchAsync(testControllers.createTest));
testRoute.put("/tests/:id", catchAsync(testControllers.updateTest));

testRoute.delete("/tests", catchAsync(testControllers.getAllTests));

module.exports = testRoute;
