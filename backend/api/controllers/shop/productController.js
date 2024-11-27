const clt_prod_svc = require("../../service/shop/clientProduct.service");
class ClientProductController {
  static getFilteredProducts = async (req, res, next) => {
    try {
      const {
        category = [],
        brand = [],
        sortBy = "price-lowtohigh",
      } = req.query;

      const products = await clt_prod_svc.filteredProducts(
        category,
        brand,
        sortBy
      );
      res.status(200).json({
        status: true,
        data: products,
        message: "product fetch success",
      });
    } catch (error) {
      next(error);
    }
  };

  st;

  static getProductDetails = async (req, res, next) => {
    try {
      const { id } = req.params;

      const produt = await clt_prod_svc.getDetails(id);

      res.status(200).json({
        status: true,
        data: produt,
        message: "product fetch success",
      });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = ClientProductController;

// 5: 53
