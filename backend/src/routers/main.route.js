const express = require("express");
const userRoute = require("./routes/user.route");
const questionRoute = require("./routes/question.route");
const testRoute = require("./routes/test.route");
const classRoute = require("./routes/class.route");

const mainRouter = express.Router();
mainRouter.use("/api/v1", userRoute);
mainRouter.use("/api/v1/", questionRoute);
mainRouter.use("/api/v1/", testRoute);
mainRouter.use("/api/v1/", classRoute);

module.exports = mainRouter;
