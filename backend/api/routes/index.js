const express = require("express");
const app = express();
const usr_route = require("../routes/user.routes");

app.use("/api/v1/user/", usr_route);

module.exports = app;
