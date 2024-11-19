const { imageUploadUtil } = require("../../utils/cloudinary");

class ProductService {
  static handleImageUpload = async (req) => {
    try {
      const b64 = Buffer.from(req.file.buffer).toString("base64");
      const url = "data:" + req.file.mimetype + ";base64," + b64;
      const result = await imageUploadUtil(url);
      return result;
    } catch (error) {
      throw error;
    }
  };
}
module.exports = ProductService;
