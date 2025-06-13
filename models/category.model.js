const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    slug: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true, autoIndex: true, minimize: true }
);

const Category = mongoose.model("Category", categorySchema, "categories");

module.exports = Category;
