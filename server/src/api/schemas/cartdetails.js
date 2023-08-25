export default {
  type: "object",
  properties: {
    storeID: { type: "string" },
    customerID: { type: "string" },
    productID: { type: "string" },
  },
  required: ["storeID", "customerID", "productID"],
  additionalProperties: false,
};
