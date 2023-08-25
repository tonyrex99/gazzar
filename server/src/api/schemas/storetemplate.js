export default {
  type: "object",
  properties: {
    name: { type: "string" },
    dateCreated: { type: "string", format: "date-time" },
    price: { type: "number" },
    tier: { type: "string" },
    data: { type: "string" },
    storeID: { type: "string" },
  },
  required: ["name", "dateCreated", "price", "tier", "data", "storeID"],
  additionalProperties: false,
};
