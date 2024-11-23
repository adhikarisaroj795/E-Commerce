const clt_prod_svc = require("../../service/shop/clientProduct.service");
class ClientProductController {
  static getFilteredProducts = async (req, res, next) => {
    try {
      const products = await clt_prod_svc.filteredProducts();
      res.status(200).json({
        status: true,
        data: products,
        message: "product fetch success",
      });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = ClientProductController;

// 5: 53
