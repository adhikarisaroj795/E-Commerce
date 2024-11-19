const { imageUploadUtil } = require("../../utils/cloudinary");
const prod_svc = require("../../service/admin/productService");

class AdminProductController {
  static handleImageUpload = async (req, res, next) => {
    try {
      const result = await prod_svc.handleImageUpload(req);

      res.json({
        status: true,
        result: result,
        message: "image upload success",
      });
    } catch (error) {
      next(error);
    }
  };
}
module.exports = AdminProductController;
