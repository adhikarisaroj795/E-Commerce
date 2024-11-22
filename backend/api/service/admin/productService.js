const productModel = require("../../models/products/product.model");
const { imageUploadUtil } = require("../../utils/cloudinary");
const ErrorHandler = require("../../utils/ErrorHandler");

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

  static addNewProduct = async (
    image,
    title,
    description,
    category,
    brand,
    price,
    salePrice,
    totalStock
  ) => {
    try {
      const newProduct = new productModel({
        image,
        title,
        description,
        category,
        brand,
        price,
        salePrice,
        totalStock,
      });
      await newProduct.save();
      return newProduct;
    } catch (error) {
      throw error;
    }
  };

  static getAllProducts = async () => {
    try {
      const listOfProduct = await productModel.find({});
      if (!listOfProduct) {
        throw new ErrorHandler("No product Found", 404);
      }
      return listOfProduct;
    } catch (error) {
      throw error;
    }
  };

  static editProd = async (
    id,
    image,
    title,
    description,
    category,
    brand,
    price,
    salePrice,
    totalStock
  ) => {
    try {
      let findProduct = await productModel.findById(id);
      if (!findProduct) {
        throw new ErrorHandler("No products Found", 404);
      }
      findProduct.title = title || findProduct.title;
      findProduct.description = description || findProduct.description;
      findProduct.category = category || findProduct.category;
      findProduct.brand = brand || findProduct.brand;
      findProduct.price = price === "" ? 0 : price || findProduct.price;
      findProduct.totalStock = totalStock || findProduct.totalStock;
      findProduct.salePrice =
        salePrice === "" ? 0 : salePrice || findProduct.salePrice;
      findProduct.image = image || findProduct.image;

      await findProduct.save();
      return findProduct;
    } catch (error) {
      throw error;
    }
  };

  static deleteProduct = async (id) => {
    try {
      const product = await productModel.findByIdAndDelete(id);

      if (!product) {
        throw new ErrorHandler("No product found to delete");
      }
      return product;
    } catch (error) {
      throw error;
    }
  };
}
module.exports = ProductService;
