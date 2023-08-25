export default {
  type: "object",
  properties: {
    review: { type: "string" },
    dateAdded: { type: "string", format: "date-time" },
    customerEmail: { type: "string", format: "email" },
    rating: { type: "number" },
    productID: { type: "string" },
    storeID: { type: "string" },
  },
  required: [
    "review",
    "dateAdded",
    "customerEmail",
    "rating",
    "productID",
    "storeID",
  ],
  additionalProperties: false,
};
