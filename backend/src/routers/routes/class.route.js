const express = require("express");
const catchAsync = require("../../handlers/asyncHandlers");
const classControllers = require("../../controllers/class.controllers");
const classRoute = express.Router();
classRoute.get("/classes", catchAsync(classControllers.getAllClasses));
classRoute.post("/classes", catchAsync(classControllers.createClass));
classRoute.put("/classes", catchAsync(classControllers.updateClass));
classRoute.delete("/classes", catchAsync(classControllers.deleteClass));
module.exports = classRoute;
