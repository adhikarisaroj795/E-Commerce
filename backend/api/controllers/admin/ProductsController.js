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

  static addNewProduct = async (req, res, next) => {
    try {
      const {
        image,
        title,
        description,
        category,
        brand,
        price,
        salePrice,
        totalStock,
      } = req.body;

      const newProduct = await prod_svc.addNewProduct(
        image,
        title,
        description,
        category,
        brand,
        price,
        salePrice,
        totalStock
      );

      res.status(201).json({
        status: true,
        product: newProduct,
        message: "product added success",
      });
    } catch (error) {
      next(error);
    }
  };
  static fetchAllProduct = async (req, res, next) => {
    try {
      const listOfProduct = await prod_svc.getAllProducts();
      res.status(200).json({
        status: true,
        data: listOfProduct,
        message: "product fetch success",
      });
    } catch (error) {
      next(error);
    }
  };
  static editProduct = async (req, res, next) => {
    try {
      const { id } = req.params;
      const {
        image,
        title,
        description,
        category,
        brand,
        price,
        salePrice,
        totalStock,
      } = req.body;

      const editedProduct = await prod_svc.editProd(
        id,
        image,
        title,
        description,
        category,
        brand,
        price,
        salePrice,
        totalStock
      );
      res.status(201).json({
        status: true,
        data: editedProduct,
        message: "product edited success",
      });
    } catch (error) {
      next(error);
    }
  };
  static deleteProduct = async (req, res, next) => {
    try {
      const { id } = req.params;
      const deletedProduct = await prod_svc.deleteProduct(id);
      res.status(200).json({
        status: true,
        deletedProduct: deletedProduct,
        message: "Product deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  };
}
module.exports = AdminProductController;
