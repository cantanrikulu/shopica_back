const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const popularProductSchema = new Schema(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    priority: {
      type: Number,
      default: 0, // admin panelde sıralama için isteğe bağlı
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true, autoIndex: true, minimize: true }
);

const PopularProduct = mongoose.model("PopularProduct", popularProductSchema, "popular_products");

module.exports = PopularProduct;
