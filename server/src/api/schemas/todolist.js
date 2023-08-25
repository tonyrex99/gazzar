export default {
  type: "object",
  properties: {
    storeID: { type: "string" },
    data: { type: "string" },
  },
  required: ["storeID", "data"],
  additionalProperties: false,
};
