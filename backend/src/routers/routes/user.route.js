const express = require("express");
const userControllers = require("../../controllers/user.controllers");
const catchAsync = require("../../handlers/asyncHandlers");

const userRoute = express.Router();
userRoute.get("/users", userControllers.getAllUsers);
userRoute.post("/users", catchAsync(userControllers.registerUser));
userRoute.post("/login", catchAsync(userControllers.loginUser));
//reset password:
userRoute.post("/users/verify", catchAsync(userControllers.verifyUser));
userRoute.post(
  "/users/request-password-reset",
  catchAsync(userControllers.requestPasswordReset)
);
userRoute.post(
  "/users/reset-password/:id/:token",
  catchAsync(userControllers.resetPassword)
);
module.exports = userRoute;
