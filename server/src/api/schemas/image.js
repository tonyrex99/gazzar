export default {
  type: "object",
  properties: {
    imageID: { type: "string" },
    productID: { type: "string" },
    url: { type: "string", format: "uri" },
    storeID: { type: "string" },
  },
  required: ["imageID", "url", "storeID"],
  additionalProperties: false,
};
