import mongoose from "mongoose";
import validator from "validator";

import { handleDuplicateKeyError } from "./error.js";

const schema = new mongoose.Schema(
  {
    storeID: {
      type: String,
      required: true,
      unique: true,
    },
    storeName: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: {
        validator: validator.isEmail,
        message: "Invalid email",
      },
    },
    facebook: {
      type: String,
    },
    twitter: {
      type: String,
    },
    instagram: {
      type: String,
    },
    whatsapp: {
      type: String,
    },
    walletBalance: {
      type: Number,
    },
    bankAccount: {
      type: Number,
      required: true,
    },
    bankName: {
      type: String,
      required: true,
    },
    sellerName: {
      type: String,
      required: true,
    },
    plan: {
      type: String,
      required: true,
    },
    storeLink: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

schema.post("save", handleDuplicateKeyError);
schema.post("update", handleDuplicateKeyError);
schema.post("findOneAndUpdate", handleDuplicateKeyError);
schema.post("insertMany", handleDuplicateKeyError);

const StoreProfile = mongoose.model("StoreProfile", schema);

export default StoreProfile;
