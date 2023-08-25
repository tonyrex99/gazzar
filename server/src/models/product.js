import mongoose from "mongoose";

import { handleDuplicateKeyError } from "./error.js";

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    deliveryDuration: {
      type: String,
      default: "1",
      maxLength: 20,
    },
    deliveryUnit: {
      type: String,
      default: "Days",
      maxLength: 256,
    },
    quantityValue: {
      type: String,
      default: "1",
      maxLength: 20,
    },
    quantityUnit: {
      type: String,
      default: "Pieces",
      maxLength: 256,
    },
    description: {
      type: String,
      required: true,
      unique: true,
    },
    deliveryActive: {
      type: Boolean,
    },
    qtyLeft: {
      type: Number,
    },
    qtySold: {
      type: Number,
    },
    visibility: {
      type: Boolean,
      default: true,
    },
    productID: {
      type: String,
      required: true,
      index: true,
      unique: true,
    },
    images: {
      type: Object,
      required: true,
    },
    storeID: {
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

const Product = mongoose.model("Product", schema);

export default Product;
