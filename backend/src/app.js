const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const db = require("./dbs/connect.db");
const mainRouter = require("./routers/main.route");
const app = express();

app.use(express.json());
app.use(mainRouter);

app.use((error, req, res, next) => {
  const statusCode = error.status || 500;
  return res.status(statusCode).json({
    status: "error",
    code: statusCode,
    stack: error.stack,
    error: error.message || "Internal Server Error",
  });
});
module.exports = app;
