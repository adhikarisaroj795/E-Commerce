const productModel = require("../../models/products/product.model");
const ErrorHandler = require("../../utils/ErrorHandler");

class ClientProductService {
  static filteredProducts = async () => {
    try {
      const products = await productModel.find({});
      if (!products) {
        throw new ErrorHandler("no products found", 404);
      }
      return product;
    } catch (error) {
      throw error;
    }
  };
}

module.exports = ClientProductService;
