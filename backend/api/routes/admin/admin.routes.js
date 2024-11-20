const express = require("express");
const { upload } = require("../../utils/cloudinary");

const prod_ctrl = require("../../controllers/admin/ProductsController");
const router = express.Router();

router
  .route("/upload-image")
  .post(upload.single("my_file"), prod_ctrl.handleImageUpload);

module.exports = router;
