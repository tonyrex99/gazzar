import mongoose from "mongoose";
import validator from "validator";

import { handleDuplicateKeyError } from "./error.js";

const schema = new mongoose.Schema(
  {
    imageID: {
      type: String,
      required: true,
      unique: true,
    },
    productID: {
      type: String,
    },
    url: {
      type: String,
      required: true,
      validate: {
        validator: validator.isURL,
        message: "A valid URL is required",
      },
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

const Image = mongoose.model("Image", schema);

export default Image;
