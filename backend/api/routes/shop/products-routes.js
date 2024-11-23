const express = require("express");


const prod_ctrl = require("../../controllers/shop/productController");
const router = express.Router();

router.route("/get").get(prod_ctrl.getFilteredProducts)
module.exports = router;
