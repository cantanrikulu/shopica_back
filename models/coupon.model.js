const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const couponSchema = new Schema(
  {
    code: { type: String, required: true, unique: true },
    discountType: { type: String, enum: ["percentage", "fixed"], required: true },
    value: { type: Number, required: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true, autoIndex: true, minimize: true }
);

const Coupon = mongoose.model("Coupon", couponSchema, "coupons");

module.exports = Coupon;
