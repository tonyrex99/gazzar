import mongoose from "mongoose";

import { handleDuplicateKeyError } from "./error.js";

const schema = new mongoose.Schema(
  {
    tagline: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    headerImages: {
      type: Object,
      required: true,
    },
    productPerPage: {
      type: Number,
      required: true,
    },
    storeID: {
      type: String,
      required: true,
    },
    logo: {
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

const StoreData = mongoose.model("StoreData", schema);

export default StoreData;
