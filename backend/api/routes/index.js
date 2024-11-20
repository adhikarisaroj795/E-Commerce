const express = require("express");
const app = express();
const auth_route = require("./auth/auth.routes");
const admin_route = require("./admin/admin.routes");

app.use("/api/v1/auth", auth_route);
app.use("/api/v1/admin/products", admin_route);

module.exports = app;
