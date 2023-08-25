export default {
  type: "object",
  properties: {
    storeID: { type: "string" },
    dateAdded: { type: "string", format: "date-time" },
    details: { type: "object" },
  },
  required: ["storeID", "dateAdded", "details"],
  additionalProperties: false,
};
