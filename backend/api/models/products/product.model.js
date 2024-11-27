const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    image: String,
    title: String,
    description: String,
    category: String,
    brand: String,
    price: Number,
    salePrice: Number,
    totalStock: Number,
  },
  {
    timestamps: true,
  }
);
productSchema.index({ title: 1 });

const productModel = mongoose.model("Product", productSchema);

module.exports = productModel;
