const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const db = require("./dbs/connect.db");
const mainRouter = require("./routers/main.route");
const app = express();

app.use(express.json());
app.use(mainRouter);
module.exports = app;
