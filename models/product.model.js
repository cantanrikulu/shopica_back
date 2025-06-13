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
    slug: { type: String },
    category: { type: Schema.Types.ObjectId, ref: "Category" }, //obje olarak alınacak(name,slugi,image)
    subcategory: { type: Schema.Types.ObjectId, ref: "Subcategory" }, //obje olarak alınacak
    isPopular: { type: Boolean, default: false },
  },
  { timestamps: true, autoIndex: true, minimize: true }
);

const Product = mongoose.model("Product", productSchema, "products");
 //slug oluşturucu 
module.exports = Product;
