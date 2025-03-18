const express = require("express");
const userRoute = require("./routes/user.route");
const questionRoute = require("./routes/question.route");
const testRoute = require("./routes/test.route");
const classRoute = require("./routes/class.route");
const submissionRoute = require("./routes/submission.route");

const mainRouter = express.Router();
mainRouter.use("/api/v1", userRoute);
mainRouter.use("/api/v1", questionRoute);
mainRouter.use("/api/v1", testRoute);
mainRouter.use("/api/v1", classRoute);
mainRouter.use("/api/v1", submissionRoute);

module.exports = mainRouter;
