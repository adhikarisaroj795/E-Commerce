const cartModel = require("../../models/products/carts.model");
const productModel = require("../../models/products/product.model");
const ErrorHandler = require("../../utils/ErrorHandler");

class CartService {
  static addCart = async (userId, productId, quantity) => {
    try {
      if (
        !userId ||
        userId.trim() === "" ||
        !productId ||
        productId.trim() === "" ||
        !quantity ||
        quantity.trim() === "" ||
        quantity <= 0
      ) {
        throw new ErrorHandler("All fields are required", 400);
      }

      const product = await productModel.findById(productId);
      if (!product) {
        throw new ErrorHandler("Product not available", 404);
      }

      let cart = await cartModel.findOne({ userId });

      if (!cart) {
        cart = new cartModel({
          userId,
          items: [],
        });
      }

      const findCurrentProductIndex = cart.items.findIndex(
        (item) => item.productId.toString() === productId
      );

      if (findCurrentProductIndex === -1) {
        cart.items.push({
          productId,
          quantity,
        });
      } else {
        cart.items[findCurrentProductIndex].quantity += quantity;
      }
      await cartModel.save();
      return cart;
    } catch (error) {
      throw error;
    }
  };
}
module.exports = CartService;
