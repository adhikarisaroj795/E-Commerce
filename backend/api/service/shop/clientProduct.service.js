const productModel = require("../../models/products/product.model");
const ErrorHandler = require("../../utils/ErrorHandler");

class ClientProductService {
  static filteredProducts = async (category, brand, sortBy) => {
    try {
      let filters = {};
      if (category?.length) {
        filters.category = { $in: category.split(",") };
      }
      if (brand?.length) {
        filters.brand = { $in: brand.split(",") };
      }

      let sort = {};

      if (!sortBy) {
        sort.price = 1;
      } else {
        switch (sortBy) {
          case "price-lowtohigh":
            sort.price = 1;
            break;
          case "price-hightolow":
            sort.price = -1;
            break;
          case "title-atoz":
            sort.title = 1;
            break;
          case "title-ztoa":
            sort.title = -1;
            break;
          default:
            sort.price = 1;
            break;
        }
      }

      console.log("Sort object:", sort);

      const products = await productModel.find(filters).sort(sort);
      console.log(products);

      if (products.length === 0) {
        throw new ErrorHandler("No products found", 404);
      }

      return products;
    } catch (error) {
      throw error;
    }
  };

  static getDetails = async (id) => {
    const product = await productModel.findById(id);
    if (!product) {
      throw new ErrorHandler("Product not found", 404);
    }
    return product;
  };
}

module.exports = ClientProductService;
