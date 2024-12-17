const crt_svc = require("../../service/shop/cart.service");
class CartController {
  static addToCart = async (req, res, next) => {
    try {
      const { userId, productId, quantity } = req.body;

      const newCart = await crt_svc.addCart(userId, productId, quantity);
      res.status(200).json({
        status: true,
        data: newCart,
        message: "Cart created successfully",
      });
    } catch (error) {
      next(error);
    }
  };
  static fetchCartItems = async (req, res, next) => {
    try {
      const { userId } = req.params;

      const { cart, populateCartItems } = await crt_svc.cartItem(userId);
      res.status(200).json({
        status: true,
        data: {
          ...cart._doc,
          items: populateCartItems,
        },
      });
    } catch (error) {
      next(error);
    }
  };
  static upDateCartItemQty = async (req, res, next) => {
    try {
      const { userId, productId, quantity } = req.body;

      const { cart, populateCartItems } = await crt_svc.updatedCart(
        userId,
        productId,
        quantity
      );
      res.status(200).json({
        status: true,
        data: {
          ...cart._doc,
          items: populateCartItems,
        },
      });
    } catch (error) {
      next(error);
    }
  };
  static deleteCartItem = async (req, res, next) => {
    try {
      const { userId, productId } = req.params;
      const deletedItem = await crt_svc.deleteItem(userId, productId);
    } catch (error) {
      next(error);
    }
  };
}
module.exports = CartController;
