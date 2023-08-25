export default {
  type: "object",
  properties: {
    customerID: { type: "string" },
    storeID: { type: "string" },
    cartID: { type: "string" },
  },
  required: ["customerID", "storeID", "cartID"],
  additionalProperties: false,
};
