const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    isApproved: {
      type: Boolean,
      default: false, // Admin onayı gerekiyorsa
    },
  },
  { timestamps: true, autoIndex: true, minimize: true }
);

const Comment = mongoose.model("Comment", commentSchema, "comments");

module.exports = Comment;
