export default {
  type: "object",
  properties: {
    storeID: { type: "string" },
    locationName: { type: "string" },
    fee: { type: "string" },
    description: { type: "string" },
  },
  required: ["storeID", "locationName", "fee", "description"],
  additionalProperties: false,
};
