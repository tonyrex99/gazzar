export default {
  type: "object",
  properties: {
    orderID: { type: "string" },
    productID: { type: "string" },
    quantity: { type: "number" },
    storeID: { type: "string" },
  },
  required: ["orderID", "productID", "quantity", "storeID"],
  additionalProperties: false,
};
