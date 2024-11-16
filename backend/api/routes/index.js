const express = require("express");
const app = express();
const auth_route = require("./auth.routes");

app.use("/api/v1/auth", auth_route);

module.exports = app;
