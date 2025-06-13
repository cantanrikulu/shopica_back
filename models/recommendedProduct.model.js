const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recommendedProductSchema = new Schema(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    context: {
      type: String,
      enum: ["homepage", "cart", "checkout", "related", "custom"],
      default: "homepage", //nerede kullanılacaksa onun için bir alan
    },
    priority: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true, autoIndex: true, minimize: true }
);

const RecommendedProduct = mongoose.model(
  "RecommendedProduct",
  recommendedProductSchema,
  "recommended_products"
);

module.exports = RecommendedProduct;
