const express = require("express");
const { upload } = require("../../utils/cloudinary");

const prod_ctrl = require("../../controllers/admin/ProductsController");
const router = express.Router();

router
  .route("/upload-image")
  .post(upload.single("my_file"), prod_ctrl.handleImageUpload);

router.route("/add").post(prod_ctrl.addNewProduct);
router.route("/edit/:id").put(prod_ctrl.editProduct);
router.route("/delete/:id").delete(prod_ctrl.deleteProduct);
router.route("/get").get(prod_ctrl.fetchAllProduct);
module.exports = router;
