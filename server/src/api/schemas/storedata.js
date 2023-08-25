export default {
  type: "object",
  properties: {
    tagline: { type: "string" },
    description: { type: "string" },
    headerImages: { type: "object" },
    productPerPage: { type: "number" },
    storeID: { type: "string" },
    logo: { type: "string" },
  },
  required: [
    "tagline",
    "description",
    "headerImages",
    "productPerPage",
    "storeID",
    "logo",
  ],
  additionalProperties: false,
};
