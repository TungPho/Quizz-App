const express = require("express");
const userRoute = require("./user route/user.route");

const mainRouter = express.Router();
mainRouter.use("/api/v1", userRoute);
module.exports = mainRouter;
