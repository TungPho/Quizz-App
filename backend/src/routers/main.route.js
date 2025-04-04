const express = require("express");
const userRoute = require("./routes/user.route");
const questionRoute = require("./routes/question.route");
const testRoute = require("./routes/test.route");
const classRoute = require("./routes/class.route");
const submissionRoute = require("./routes/submission.route");
const examProgressRoute = require("./routes/exam.progress.route");
const documentRoute = require("./routes/document.routes");

const mainRouter = express.Router();
mainRouter.use("/api/v1", userRoute);
mainRouter.use("/api/v1", questionRoute);
mainRouter.use("/api/v1", testRoute);
mainRouter.use("/api/v1", classRoute);
mainRouter.use("/api/v1", submissionRoute);
mainRouter.use("/api/v1", examProgressRoute);
mainRouter.use("/api/v1", documentRoute);

module.exports = mainRouter;
