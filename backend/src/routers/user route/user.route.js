const express = require("express");
const userControllers = require("../../controllers/user.controllers");
const catchAsync = require("../../handlers/asyncHandlers");

const userRoute = express.Router();
userRoute.get("/users", userControllers.getAllUsers);
userRoute.post("/users", catchAsync(userControllers.registerUser));
userRoute.post("/login", catchAsync(userControllers.loginUser));

module.exports = userRoute;
