import mongoose from "mongoose";

import { handleDuplicateKeyError } from "./error.js";

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    dateCreated: {
      type: Date,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    tier: {
      type: String,
      required: true,
    },
    data: {
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

const StoreTemplate = mongoose.model("StoreTemplate", schema);

export default StoreTemplate;
