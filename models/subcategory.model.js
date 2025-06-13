const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subcategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  { timestamps: true, autoIndex: true, minimize: true }
);

const Subcategory = mongoose.model("Subcategory", subcategorySchema, "subcategories");

module.exports = Subcategory;
