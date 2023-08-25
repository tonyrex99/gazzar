import mongoose from "mongoose";

import { handleDuplicateKeyError } from "./error.js";

const schema = new mongoose.Schema(
  {
    customerID: {
      type: String,
      required: true,
    },
    storeID: {
      type: String,
      required: true,
    },
    cartID: {
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

const Cart = mongoose.model("Cart", schema);

export default Cart;
