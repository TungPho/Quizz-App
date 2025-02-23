const express = require("express");
const catchAsync = require("../../handlers/asyncHandlers");
const classControllers = require("../../controllers/class.controllers");
const classRoute = express.Router();
classRoute.get("/classes", catchAsync(classControllers.getAllClasses));
classRoute.get("/classes/:id", catchAsync(classControllers.getClassById));

classRoute.post("/classes/:id", catchAsync(classControllers.addStudentToClass));

classRoute.post("/classes", catchAsync(classControllers.createClass));
classRoute.put("/classes/:id", catchAsync(classControllers.updateClass));
classRoute.delete("/classes/:id", catchAsync(classControllers.deleteClass));
module.exports = classRoute;
