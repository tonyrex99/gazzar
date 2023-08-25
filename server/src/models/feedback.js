import mongoose from "mongoose";
import validator from "validator";

import { handleDuplicateKeyError } from "./error.js";

const schema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: true,
    },
    dateAdded: {
      type: Date,
      required: true,
    },
    customerEmail: {
      type: String,
      required: true,
      lowercase: true,
      validate: {
        validator: validator.isEmail,
        message: "Invalid email",
      },
    },
    rating: {
      type: Number,
      required: true,
    },
    productID: {
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

const Feedback = mongoose.model("Feedback", schema);

export default Feedback;
