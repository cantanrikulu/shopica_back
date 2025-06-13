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
    image: { type: String },
    subCategories: [
      {
        name: { type: String },
        subId: { type: Schema.Types.ObjectId, ref: "Subcategory" },
      },
    ],
  },
  { timestamps: true, autoIndex: true, minimize: true }
);
// slug oluşturucu eklenecek

const Category = mongoose.model("Category", categorySchema, "categories");

module.exports = Category;
