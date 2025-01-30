const express = require("express");

const userRoute = express.Router();
userRoute.get("/users", (req, res, next) => {
  res.status(200).json({
    message: "Users",
  });
});
module.exports = userRoute;
