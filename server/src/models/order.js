import mongoose from "mongoose";

import { handleDuplicateKeyError } from "./error.js";

const schema = new mongoose.Schema(
  {
    orderID: {
      type: String,
      required: true,
      unique: true,
    },
    dateCreated: {
      type: Date,
      required: true,
    },
    customerID: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    shippingType: {
      type: String,
      required: true,
    },
    expectedDeliveryDate: {
      type: Date,
    },
    orderType: {
      type: String,
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

const Order = mongoose.model("Order", schema);

export default Order;
