const express = require("express");

const prod_ctrl = require("../../controllers/shop/productController");
const router = express.Router();

router.route("/get").get(prod_ctrl.getFilteredProducts);
router.route("/get/:id").get(prod_ctrl.getProductDetails);
module.exports = router;
