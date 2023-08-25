import mongoose from "mongoose";

import { handleDuplicateKeyError } from "./error.js";

const schema = new mongoose.Schema(
  {
    orderID: {
      type: String,
      required: true,
    },
    productID: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
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

const OrderDetails = mongoose.model("OrderDetails", schema);

export default OrderDetails;
