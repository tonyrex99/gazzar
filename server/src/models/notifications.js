import mongoose from "mongoose";

import { handleDuplicateKeyError } from "./error.js";

const schema = new mongoose.Schema(
  {
    storeID: {
      type: String,
      required: true,
      unique: true,
    },
    dateAdded: {
      type: Date,
      required: true,
    },
    details: {
      type: Object,
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

const Notifications = mongoose.model("Notifications", schema);

export default Notifications;
