const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
          default: 1,
        },
        priceAtPurchase : {
          type: Number,
          required: true,
        }, 
      },
    ],
    coupon: {
      type: Schema.Types.ObjectId,
      ref: "Coupon",
      default: null,
    },
    isOrdered: {
      type: Boolean,
      default: false,
    }, 
  },
  { timestamps: true, autoIndex: true, minimize: true }
);

const Cart = mongoose.model("Cart", cartSchema, "carts");

module.exports = Cart;
