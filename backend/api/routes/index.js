const express = require("express");
const app = express();
const auth_route = require("./auth/auth.routes");
const admin_product_route = require("./admin/admin.Product.routes");

const shop_product_route = require("./shop/products-routes");

app.use("/api/v1/auth", auth_route);
app.use("/api/v1/admin/products", admin_product_route);
app.use("/api/v1/shop/products", shop_product_route);

module.exports = app;
