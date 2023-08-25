export default {
  type: "object",
  properties: {
    orderID: { type: "string" },
    dateCreated: { type: "string", format: "date-time" },
    customerID: { type: "string" },
    status: { type: "string" },
    shippingType: { type: "string" },
    expectedDeliveryDate: { type: "string", format: "date-time" },
    orderType: { type: "string" },
    storeID: { type: "string" },
  },
  required: [
    "orderID",
    "dateCreated",
    "customerID",
    "status",
    "shippingType",
    "orderType",
    "storeID",
  ],
  additionalProperties: false,
};
