const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    stock: { type: Number, default: 0 },
    images: {
      type: String,
    },
    category: { type: Schema.Types.ObjectId, ref: "Category" },
    subcategory: { type: Schema.Types.ObjectId, ref: "Subcategory" },
    isPopular: { type: Boolean, default: false },
  },
  { timestamps: true, autoIndex: true, minimize: true }
);

const Product = mongoose.model("Product", productSchema, "products");

module.exports = Product;
