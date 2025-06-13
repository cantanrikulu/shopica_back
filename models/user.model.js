const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    birthDate: {
      type: Date,
      required: true,
    },
    avatar: {
      type: String,
    },
    gender: {
      type: String,
      enum: ["kadın", "erkek"],
      required: true,
    },
    address: {
      country: String,
      city: String,
      district: String,
      neighborhood: String,
      street: String,
      apartment: String,
      floor: String,
      doorNumber: String,
      zipCode: String,
    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  { timestamps: true, autoIndex: true, minimize: true }
);

const User = mongoose.model("User", userSchema, "users");

module.exports = User;
